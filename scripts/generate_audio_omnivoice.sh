#!/usr/bin/env bash
#
# generate_audio_omnivoice.sh — create the course's Swedish MP3s with OmniVoice.
#
# Finds which clips in assets/audio/manifest.json are missing from
# assets/audio/sv/, synthesizes them in Swedish with OmniVoice, converts them to
# MP3, and drops them into assets/audio/sv/<id>.mp3.
#
# It runs the Python worker through OmniVoice's own virtualenv, so you don't need
# to activate anything.
#
#   bash scripts/generate_audio_omnivoice.sh                 # all missing clips
#   bash scripts/generate_audio_omnivoice.sh --limit 5       # try a few first
#   bash scripts/generate_audio_omnivoice.sh --force         # regenerate all
#   bash scripts/generate_audio_omnivoice.sh --ref-audio my.wav --ref-text "…"
#
# Config via env:
#   OMNIVOICE_HOME   path to the OmniVoice checkout (default below)
#   HF_ENDPOINT      set to https://hf-mirror.com if Hugging Face is blocked

set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"

OMNIVOICE_HOME="${OMNIVOICE_HOME:-/Users/xanguera/projects/software/OmniVoice}"
PYTHON="$OMNIVOICE_HOME/.venv/bin/python"

if [ ! -x "$PYTHON" ]; then
  echo "❌ OmniVoice venv python not found at: $PYTHON"
  echo "   Set OMNIVOICE_HOME to your OmniVoice checkout, or create its venv (uv sync)."
  exit 1
fi

# Make sure the manifest is up to date with the current vocabulary.
if command -v node >/dev/null 2>&1; then
  node "$HERE/build_manifest.js" >/dev/null 2>&1 || true
fi

exec "$PYTHON" "$HERE/generate_audio_omnivoice.py" "$@"
