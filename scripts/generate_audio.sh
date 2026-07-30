#!/usr/bin/env bash
#
# generate_audio.sh — OPTIONAL helper to create Swedish audio clips.
#
# Reads assets/audio/manifest.json and generates one MP3 per entry into
# assets/audio/sv/ using macOS's built-in Swedish voice (Alva), then converts
# to MP3 with ffmpeg.
#
#   Requirements: macOS `say` (built-in) + `ffmpeg` (brew install ffmpeg)
#   Usage:
#       bash scripts/generate_audio.sh           # skip clips that already exist
#       bash scripts/generate_audio.sh --force   # regenerate everything
#       VOICE=Klara bash scripts/generate_audio.sh   # use a different Swedish voice
#
# Not required — the website already speaks every word via the browser's
# Swedish speech synthesis. Use this only if you want higher-quality, fixed
# audio files bundled with the site. You can equally use any other TTS tool;
# just drop <id>.mp3 files into assets/audio/sv/ (see manifest.json for ids).

set -euo pipefail
cd "$(dirname "$0")/.."

VOICE="${VOICE:-Alva}"        # macOS Swedish voices: Alva, Klara
FORCE="${1:-}"
OUT="assets/audio/sv"
MANIFEST="assets/audio/manifest.json"

command -v say >/dev/null 2>&1 || { echo "❌ 'say' not found (this script needs macOS)."; exit 1; }
command -v ffmpeg >/dev/null 2>&1 || { echo "❌ 'ffmpeg' not found. Install with: brew install ffmpeg"; exit 1; }
[ -f "$MANIFEST" ] || { echo "❌ $MANIFEST missing. Run: node scripts/build_manifest.js"; exit 1; }

mkdir -p "$OUT"

# Pull "id<TAB>swedish" lines out of the JSON manifest with python3.
python3 - "$MANIFEST" <<'PY' | while IFS=$'\t' read -r id text; do
import json, sys
for e in json.load(open(sys.argv[1])):
    print(f"{e['id']}\t{e['swedish']}")
PY
  target="$OUT/$id.mp3"
  if [ -f "$target" ] && [ "$FORCE" != "--force" ]; then
    echo "· skip $id (exists)"
    continue
  fi
  tmp="$(mktemp -t sv).aiff"
  say -v "$VOICE" -o "$tmp" "$text"
  ffmpeg -y -loglevel error -i "$tmp" -codec:a libmp3lame -qscale:a 4 "$target"
  rm -f "$tmp"
  echo "✓ $id  →  $target   ($text)"
done

echo "Done. MP3s are in $OUT/"
