#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$APP_DIR"

OUT="GreenEdu-latest.zip"
rm -f "$OUT"

zip -r "$OUT" . \
  -x 'node_modules/*' \
  -x 'node_modules/**' \
  -x '.next/*' \
  -x '.next/**' \
  -x '.git/*' \
  -x '.git/**' \
  -x '.env' \
  -x '.env.local' \
  -x 'public/hero-eco.svg' \
  -x 'public/hero-eco1.svg' \
  -x 'public/hero-eco2.svg' \
  -x 'public/courses-bg.svg' \
  -x 'public/course-bg.svg' \
  -x 'public/greenLogo.svg' \
  -x 'public/course-icons/*.svg' \
  -x "$OUT"

echo "Created $OUT ($(du -h "$OUT" | cut -f1))"
