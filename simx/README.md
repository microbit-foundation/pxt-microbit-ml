# micro:bit Machine Learning MakeCode Simulator

The simulator extension for the micro:bit Machine Learning MakeCode extension.

This is responsible for the user interface that appears below the micro:bit board in the MakeCode simulator.

Bootstrapped with Vite, this app is a minimal implementation which essentially consists of a select element to allow users to simulate ML events using the iframe message protocol supported by MakeCode.

## Building and running the simulator

1. Ensure you have a working [Node.js environment](https://nodejs.org/en/download/). We recommend using the LTS version of Node and NPM.
2. Install the dependencies by running `npm install` on the command line in the checkout folder.

### `npm run dev`

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `npm run build`

Builds the app for production to the `build` folder.

## Translations

We manage translations via Crowdin.

We use react-intl from [FormatJS](https://formatjs.io/) to manage user interface strings. These are stored in this repository.

In development, add strings to `lang/ui.en.json` and run `npm run i18n:compile` to update the strings used by the app.

#### Incorporting changes from Crowdin

Use [update-translations.sh](../bin/update-translations.sh).

Build and download the Crowdin zip and unzip it to a temporary location. Note the zip itself doesn't contain a top-level directory, so on Mac/Linux use e.g. `unzip -d ~/tmp/trans microbit-org.zip`. Run the script passing the directory containing the unzipped translations.

The script will update the UI strings.

#### Updating files in Crowdin

The UI files are updated manually. Please download the existing files and diff locally to ensure the changes are as expected.

### Adding a new language

This process assumes the language is already in Crowdin and has at least some translations.

Steps:

1. Add the language to the update script.
2. Update `supportedLanguages` in [TranslationProvider.tsx](../src/messages/TranslationProvider.tsx).

## Deployments

The editor is deployed by [GitHub actions](./.github/workflows/build.yml).

The `main` branch is deployed to https://microbit-foundation.github.io/makecode-microbit-ml-simulator/ on each push.

## License

This software is under the MIT open source license.

[SPDX-License-Identifier: MIT](LICENSE)
