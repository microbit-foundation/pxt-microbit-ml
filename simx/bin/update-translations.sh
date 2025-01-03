#!/usr/bin/env bash
#
# Partial automation of updating translations.
# 
# New languages require code change in below and in simx/src/messages/TranslationProvider.tsx.
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
    cp "${prefix}/ui.en.json" "lang/ui.${lower}.json"
done

npm run i18n:compile