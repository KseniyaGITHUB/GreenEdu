#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="GreenEdu-latest.zip"
rm -f "$OUT"
zip -r "$OUT" . \
  -x 'node_modules/*' -x 'node_modules/**' \
  -x '.next/*' -x '.next/**' \
  -x '.git/*' -x '.git/**' \
  -x '.env' -x '.env.local' \
  -x 'public/*.svg' -x 'public/course-icons/*.svg' \
  -x "$OUT"
echo "Created $OUT ($(du -h "$OUT" | cut -f1))"
