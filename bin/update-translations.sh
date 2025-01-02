#!/usr/bin/env bash
#
# Partial automation of updating translations.
#
# Updates sim and extension translations. New languages adding below and code 
# change in simx/src/messages/TranslationProvider.tsx.
# 

set -euxo pipefail

if [ $# -eq 0 ]; then
  echo Missing argument to extracted Crowdin ZIP >&1
  exit 1
fi

languages="es-ES ja ko nl pl pt-BR zh-TW"

mkdir -p crowdin/translated
for language in $languages; do
    lower="${language,,}"
    prefix="${1}/${language}"
    cp "${prefix}/ui.en.json" "simx/lang/ui.${lower}.json"
    mkdir -p "_locales/${language}"
    cp "${prefix}/machine-learning-jsdoc-strings.json" "_locales/${language}/machine-learning-jsdoc-strings.json"
    cp "${prefix}/machine-learning-strings.json" "_locales/${language}/machine-learning-strings.json"
done

cd simx
npm run i18n:compile
cd -