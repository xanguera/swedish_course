# 🫎 Lär dig svenska — Learn Swedish for Stockholm

A friendly, from-scratch Swedish course for our family trip to Stockholm — Duolingo-style
learning path, vocabulary and phrases with pictures and audio, plus Swedish traditions and
fun facts. Pure static site (HTML/CSS/JS), **no build step**, hosted on GitHub Pages.

Meet **Älgot** the moose 🫎, your guide.

---

## Run it locally

Because the site uses only plain `<script>` tags and inline data (no `fetch`, no modules), you
can just **open `index.html` in a browser**. Double-click it, or serve it:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## How it works

| Area | File(s) |
|------|---------|
| App shell | `index.html` |
| Look & feel | `css/styles.css` |
| Engine | `js/util.js`, `js/i18n.js`, `js/audio.js`, `js/progress.js`, `js/exercises.js`, `js/offline.js`, `js/app.js` |
| **Course content (Swedish + structure)** | `data/vocab.js`, `data/lessons.js`, `data/course.js`, `data/culture.js` |
| **Language packs (per mother tongue)** | `data/i18n_en.js` (English = source), `data/i18n_pt.js` (Português) |
| Audio | `assets/audio/sv/<id>.mp3` (optional) · `assets/audio/manifest.json` |
| Offline / PWA | `manifest.json`, `sw.js`, `assets/icons/` |
| Helper scripts | `scripts/build_manifest.js`, `scripts/generate_audio.sh`, `scripts/verify_content.js` |

## 🌍 Languages (L1 → L2)

On first visit the site shows a **welcome screen** then a **language selector**: pick your mother
tongue (**L1**) and the language to learn (**L2**, currently Swedish). The choice is saved in
`localStorage` under `lsv:settings`; change it anytime with the **flag button** in the top bar.

The Swedish course (word ids, `sv` text, lesson structure, culture facts) is **language-neutral**.
Each mother tongue is a **translation pack**. English is the *source* language (its text lives inline
in `data/*.js`); every other language is a pack that overrides the L1-facing text, with automatic
fallback to English for anything not yet translated.

### Add a new mother tongue (e.g. Spanish)
1. Copy `data/i18n_pt.js` to `data/i18n_es.js` and translate every value (`ui`, `vocab`, `lessons`,
   `units`, `modules`, `culture`).
2. In `data/i18n_en.js`, register it: `I.registerLang("es", { name: "Spanish", endonym: "Español", flag: "🇪🇸" });`
3. Add `<script src="data/i18n_es.js"></script>` to `index.html` (next to the other packs).
4. Run `node scripts/verify_content.js` — it **fails** if the new pack is missing any key.

(Adding a new *target* language L2 is a bigger job: a parallel course + `registerTarget(...)`.)

- **Progress** (completed lessons, stars, XP, day-streak, spaced-repetition) is saved in your
  browser's `localStorage` under `lsv:v1`. The home path highlights where you left off.
- **Lessons unlock in order** — finish one to open the next.

## 🔊 Audio

Every word already speaks aloud using your **browser's built-in Swedish voice** (Web Speech API,
`sv-SE`) — so audio works today with nothing to install. Works best in Safari and Chrome on Mac.

To bundle your own higher-quality recordings, drop MP3 files into `assets/audio/sv/` named by the
word **id** (see `assets/audio/manifest.json`, e.g. `hej.mp3`, `jag_heter.mp3`). The site prefers
your MP3 when present and falls back to speech otherwise. You never have to record them all — the
site just gets better as you add clips.

### Generate clips with OmniVoice (recommended)

Uses the local [OmniVoice](https://github.com/k2-fsa/OmniVoice) TTS. The script finds which clips are
missing, synthesizes them in Swedish, converts to MP3, and drops them into `assets/audio/sv/`. For a
consistent voice it clones a short Swedish reference it auto-creates with the Mac's `Alva` voice (or
pass your own `--ref-audio`). Runs through OmniVoice's own virtualenv — nothing to activate.

```bash
bash scripts/generate_audio_omnivoice.sh --dry-run     # list what's missing (no model load)
bash scripts/generate_audio_omnivoice.sh --limit 3     # generate 3 to preview the voice
bash scripts/generate_audio_omnivoice.sh               # generate everything missing
bash scripts/generate_audio_omnivoice.sh --force       # regenerate all
# Options: --ref-audio me.wav --ref-text "…" | --instruct "female, medium pitch"
#          --speed 0.95 | --num-step 32 | --language sv | --format mp3|wav
# Env:     OMNIVOICE_HOME=/path/to/OmniVoice   (default: ~/projects/software/OmniVoice)
#          HF_ENDPOINT=https://hf-mirror.com   (if Hugging Face is blocked)
```
The first run downloads the OmniVoice model from Hugging Face (once).

### Or use the Mac's built-in voice (macOS, needs `ffmpeg`)

```bash
node scripts/build_manifest.js          # refresh the list of needed clips
bash scripts/generate_audio.sh          # create MP3s with the Swedish voice "Alva"
bash scripts/generate_audio.sh --force  # regenerate everything
```

Any other TTS works too — just produce `<id>.mp3` (or `<id>.wav`) files; the site plays both.

## 📴 Offline use (PWA)

A service worker (`sw.js`) precaches the whole app shell on first visit, so the site keeps working
without a connection after that (handy on the plane or with no data in Stockholm). It also has a
web app manifest (`manifest.json` + `assets/icons/`), so it can be **added to the home screen** as
a standalone app.

Audio clips are cached automatically as they're played, but to make sure **every** clip is available
before you lose signal, open **Settings** (flag button in the top bar) and tap **Download for
offline** — it fetches and caches all clips from `assets/audio/manifest.json` with a progress
indicator. Requires HTTPS (or `localhost`); service workers don't run over `file://`.

## ✍️ Adding or editing content

1. Add words to `data/vocab.js` (give each a unique `id`, `sv`, `en`, an `img` emoji, tags).
2. Reference those ids from a lesson in `data/lessons.js`.
3. Slot the lesson into a unit in `data/course.js`.
4. (Optional) add a culture card in `data/culture.js` and reference it from a lesson's `culture: []`.
5. Verify everything still resolves:

```bash
node scripts/verify_content.js   # fails loudly if any id/reference is broken
```

## 🚀 Deploy to GitHub Pages (www.xavieranguera.com/learn-swedish)

1. Create a GitHub repo named exactly **`learn-swedish`** and push this folder (with `index.html`
   at the repo root).
2. **Settings → Pages → Build and deployment → Source = Deploy from a branch → branch `main`,
   folder `/ (root)` → Save.**
3. Live at **https://www.xavieranguera.com/learn-swedish** after ~1 minute.
4. Add a "Learn Swedish" link on your home page pointing there.

---

Made with ❤️ for our two weeks in Stockholm. *Lycka till!* (Good luck!)
