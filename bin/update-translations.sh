#!/usr/bin/env bash
#
# Partial automation of updating sim and extension translations.
#
# Updates sim and extension translations. 
# 
# New languages require code change below and in:
# 1. Sim to add language in simx/src/messages/TranslationProvider.tsx.
# 2. Extension config to include the file path in pxt.json.
#

set -euxo pipefail

if [ $# -eq 0 ]; then
  echo Missing argument to extracted Crowdin ZIP >&1
  exit 1
fi

languages="es-ES ja ko nl pl pt-BR zh-TW"

for language in $languages; do
    lower="${language,,}"
    prefix="${1}/${language}"
    cp "${prefix}/ui.en.json" "simx/lang/ui.${lower}.json"

    mkdir -p "_locales/${language}"
    cp "${prefix}/machine-learning-jsdoc-strings.json" "_locales/${language}"
    cp "${prefix}/machine-learning-strings.json" "_locales/${language}"

    mkdir -p "docs/_locales/${language}"
    cp -r "${prefix}/docs/." "docs/_locales/${language}"
done

cd simx
npm run i18n:compile
cd -