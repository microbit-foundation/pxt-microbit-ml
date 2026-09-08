# Microsoft MakeCode extension for use with micro:bit CreateAI

This extension is leveraged by micro:bit CreateAI which creates suitable blocks based on the machine learning model you build in the app. It is not useful separate from micro:bit CreateAI.

## Building locally

Ensure you have the required toolchain to build for V1 and V2
(arm-none-eabi-gcc, python, yotta, cmake, ninja, srec_cat) or docker.

```bash
git clone https://github.com/microbit-foundation/pxt-microbit-ml
cd pxt-microbit-ml
npm install pxt --no-save
npx pxt target microbit --no-save
npx pxt install
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 npx pxt
```

For the V1 build Yotta can hit the GitHub rate limits quite easily if the
project is built from a clean state more than once.
A V2-only build can be performed with the `PXT_COMPILE_SWITCHES=csv---mbcodal`
environmental variable.

```
PXT_FORCE_LOCAL=1 PXT_NODOCKER=1 PXT_COMPILE_SWITCHES=csv---mbcodal npx pxt
```

## Build flags

### Model predictions per second

By default the model will run every 250 ms, to change this value the
`ML_INFERENCE_PERIOD_MS` config can be modified.

```json
{
  "yotta": {
    "config": {
      "ML_INFERENCE_PERIOD_MS": 250
    }
  }
}
```

### Debug messages

To enable debug print from this extension, add the following into your
pxt.json file:

```json
{
  "yotta": {
    "config": {
      "ML_DEBUG_PRINT": 1
    }
  }
}
```

## Simulator extension

The `simx/` directory contains a simulator extension (simx) that MakeCode
shows in an iframe alongside the micro:bit simulator when a project uses this
extension.

### How it's deployed

The [build-simx workflow](./.github/workflows/build-simx.yml) builds `simx/`
and commits the output to the `gh-pages` branch. That branch is the deployment
artifact: the MakeCode backend clones it directly (it does not use the GitHub
Pages site) and serves the files from its own origin, e.g.
<https://trg-microbit.userpxt.io/simx/microbit-foundation/pxt-microbit-ml/-/index.html>.

The commit it serves is pinned by a sha in
[pxt-microbit's targetconfig.json](https://github.com/microsoft/pxt-microbit/blob/master/targetconfig.json),
under `packages.approvedRepoLib["microbit-foundation/pxt-microbit-ml"].simx`.
Later pushes to `gh-pages` have no effect on users until the pin is updated,
so the branch history must keep the pinned commit reachable (no force-pushes).

To release an update:

1. Land the change on `main`, then manually run the "Build Simulator
   Extension" workflow against `main` (workflow_dispatch). Only dispatch runs
   publish: the workflow's tag-push runs skip the publish step, which is
   gated on `main`.
2. Note the new commit sha on `gh-pages`.
3. PR pxt-microbit updating `simx.sha` to that commit. It may need to target
   the live release branch as well as `master`.
4. Once merged there's no MakeCode release to wait for, but allow for caching:
   the config is CDN-cached and editors cache it locally for up to a day.

### Local development

Run `npm run dev` in `simx/` (Vite serves on port 5173, matching the `devUrl`
in targetconfig.json), then open a locally served MakeCode editor with `?simxdev`
appended to the URL. The iframe then loads from the dev server instead of the
deployed build.

## Translations

We manage translations via Crowdin, using
[`@microbit/i18n-tools`](https://github.com/microbit-foundation/ui/tree/main/packages/i18n-tools)
configured in [i18n.config.mjs](./i18n.config.mjs). The tool is installed in
`simx/`, the repo's Node project, and its npm scripts there (`i18n:download`,
`i18n:upload`, `i18n:status`, `i18n:tidy`, `i18n:compile`) point at that
config.

Use the GitHub workflows to download or upload translations. The download
workflow runs on a weekly schedule.

### Adding a new language

Neither pxt nor the simx finds new files on its own, so three changes go
alongside the sync:

1. `languages` in [i18n.config.mjs](./i18n.config.mjs).
2. `supportedLanguages` in
   [simx/src/messages/TranslationProvider.tsx](./simx/src/messages/TranslationProvider.tsx),
   plus the matching import — the simx bundles its messages rather than loading
   them on demand.
3. The `files` list in [pxt.json](./pxt.json), for both the `_locales/<lang>/`
   strings and the `docs/_locales/<lang>/` help pages. pxt only ships listed
   files.

Use the language ids MakeCode uses (`availableLocales` in pxt-microbit's
pxtarget.json), otherwise the editor will never ask for them.

### Extension version in the help pages

The `package` blocks in `docs/ml_*.md` and their `docs/_locales/` translations
pin this extension by tag:

```package
machine-learning-help-stubs=github:microbit-foundation/pxt-microbit-ml-help-stubs#v0.0.1
machine-learning=github:microbit-foundation/pxt-microbit-ml#v1.0.13
```

That's what makes the example snippets render as blocks, and the pinned version
is where those blocks get their translations, so it needs bumping for new or
updated ones to show. It necessarily trails the current version: bump it to the
latest tag, then release again to publish that change (see #45 followed by
v1.0.14).

Crowdin treats that line as a string, so a bump would otherwise change the
source of every page and unsettle its translation. Instead the copy in Crowdin
reads `#{version_placeholder_do_not_translate}`: the upload puts the
placeholder in and the download restores the tag from the English page (both
in [i18n.config.mjs](./i18n.config.mjs)), so bumping the pin needs no upload.
Each language's translation of that line should be the placeholder too; when
the line does change, upload without "keep translations" and enter the
placeholder as its translation in Crowdin.

## Releasing

MakeCode consumes the extension by git tag; there are no GitHub releases. Past
releases are a lone commit bumping `version` in [pxt.json](./pxt.json), tagged
`vX.Y.Z`, which is what `pxt bump` produces.

No pxt-microbit change is needed per release — its `approvedRepoLib` entry pins
the repo rather than a version. Two things do need doing by hand:

1. If `simx/` changed, deploy it as described under
   [Simulator extension](#simulator-extension). The tag alone doesn't publish
   it, and a translation update always changes the simx.
2. Update `extensionURL` in micro:bit CreateAI's
   [src/makecode/utils.ts](https://github.com/microbit-foundation/ml-trainer/blob/main/src/makecode/utils.ts)
   to the new tag. That one constant covers both the projects it generates and
   upgrading imported ones.

## License

This software made available under the MIT open source license.

[SPDX-License-Identifier: MIT](/LICENSE)

## Code of Conduct

Trust, partnership, simplicity and passion are our core values we live and breathe in our daily work life and within our projects. Our open-source projects are no exception. We have an active community which spans the globe and we welcome and encourage participation and contributions to our projects by everyone. We work to foster a positive, open, inclusive and supportive environment and trust that our community respects the micro:bit code of conduct. Please see our [code of conduct](https://www.microbit.org/safeguarding/) which outlines our expectations for all those that participate in our community and details on how to report any concerns and what would happen should breaches occur.
