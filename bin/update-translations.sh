#!/usr/bin/env bash
#
# Partial automation of updating sim and extension translations.
#
# Adding a language, and the version the help pages pin, need changes by hand.
# See the Translations section of the README.
#

set -euxo pipefail

if [ $# -eq 0 ]; then
  echo Missing argument to extracted Crowdin ZIP >&1
  exit 1
fi

languages="ca es-ES fr ja ko lo nl pl pt-BR vi zh-TW"

for language in $languages; do
    lower="${language,,}"
    prefix="${1}/${language}/new/makecode-extensions/pxt-microbit-ml"
    cp "${prefix}/ui.en.json" "simx/lang/ui.${lower}.json"

    mkdir -p "_locales/${language}"
    cp "${prefix}/machine-learning-jsdoc-strings.json" "_locales/${language}"
    cp "${prefix}/machine-learning-strings.json" "_locales/${language}"

    mkdir -p "docs/_locales/${language}"
    cp -r "${prefix}/docs/." "docs/_locales/${language}"
done

# The docs' package pin is part of the translated content, but the copy in
# Crowdin is far behind what we release, so realign each translated doc with
# its English original.
for doc in docs/ml_*.md; do
    pin=$(grep -m1 '^machine-learning=' "${doc}")
    perl -pi -e "s{^machine-learning=.*}{${pin}}" "docs/_locales"/*/"$(basename "${doc}")"
done

cd simx
npm run i18n:compile
cd -