// Config for @microbit/i18n-tools, installed in simx/ (the repo's only Node
// project) and run from there with `--config ../i18n.config.mjs`; paths here
// are relative to this file.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

// Languages with translations in Crowdin. Use the ids MakeCode uses
// (`availableLocales` in pxt-microbit's pxtarget.json), otherwise the editor
// never asks for them. Adding one also needs the code changes in the README.
const languages = [
  "ca",
  "es-ES",
  "fr",
  "ja",
  "ko",
  "lo",
  "nl",
  "pl",
  "pt-BR",
  "vi",
  "zh-TW",
];

// Each help page's `package` block pins this extension by tag, and Crowdin
// treats that line as a string, so a release would change the source and
// unsettle every translation. Crowdin holds a placeholder instead: the
// upload puts it in, the download restores the tag from the English page.
const pinLine = /^machine-learning=github:microbit-foundation\/pxt-microbit-ml#.*$/m;
const pinPlaceholder =
  "machine-learning=github:microbit-foundation/pxt-microbit-ml#{version_placeholder_do_not_translate}";

/** @type {import("@microbit/i18n-tools").Config} */
export default {
  crowdin: {
    project: "microbitorg",
    branch: "new",
    directory: "makecode-extensions/pxt-microbit-ml",
  },
  languages,
  catalogs: [
    // The simulator extension's UI strings.
    {
      source: "simx/lang/ui.en.json",
      crowdinFile: "ui.en.json",
      out: "simx/src/messages/ui.{lang}.json",
    },
  ],
  files: [
    // The extension's block and JSDoc strings. `pxt gendocs --locs` writes the
    // English; MakeCode only translates its bundled packages, so we upload it.
    {
      source: "_locales/machine-learning-strings.json",
      crowdinFile: "machine-learning-strings.json",
      local: "_locales/{lang}/machine-learning-strings.json",
    },
    {
      source: "_locales/machine-learning-jsdoc-strings.json",
      crowdinFile: "machine-learning-jsdoc-strings.json",
      local: "_locales/{lang}/machine-learning-jsdoc-strings.json",
    },
    // The help pages, a directory of Markdown.
    {
      source: "docs/",
      crowdinFile: "docs/",
      local: "docs/_locales/{lang}/",
      beforeUpload: (text) => text.replace(pinLine, pinPlaceholder),
      afterDownload: (text, { name }) => {
        const english = path.join(root, "docs", name);
        const pin = fs.existsSync(english)
          ? pinLine.exec(fs.readFileSync(english, "utf-8"))?.[0]
          : undefined;
        return pin ? text.replace(pinLine, pin) : text;
      },
    },
  ],
};
