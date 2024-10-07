#!/usr/bin/env bash
#
# Partial automation of updating translations.
#
# New languages adding below and code change in settings.tsx
# 

set -euxo pipefail

if [ $# -eq 0 ]; then
  echo Missing argument to extracted Crowdin ZIP >&1
  exit 1
fi

languages=""

mkdir -p crowdin/translated
for language in $languages; do
    lower="${language,,}"
    prefix="${1}/${language}/new/apps/makecode-ml-simulator"
    cp "${prefix}/ui.en.json" "lang/ui.${lower}.json"
done
npm run i18n:compile
