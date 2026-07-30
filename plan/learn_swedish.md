# Learn Swedish — Family Course for a Stockholm Trip

## TL;DR
We're building a **static website** that teaches a family (two parents + two kids, ages 10–12) enough
Swedish to feel confident on a two-week Stockholm trip, while picking up Swedish traditions and fun
facts along the way. It's a **learning path** (Units → Modules → Lessons) that starts from zero and
grows steadily, is **vocabulary-first** with light grammar, uses **images** to keep exercises lively,
plays **audio** so learners hear the sounds, and **remembers where you left off** via `localStorage`.
It ships as plain HTML/CSS/JS (no build step) hosted on **GitHub Pages** at
`www.xavieranguera.com/learn-swedish`.

This doc is the permanent spec. It is written to be verified before we build, and reviewed after.

---

## Decisions (confirmed with the user)
- **Learners:** 2 kids aged **10–12** + 2 adults. Design for a confident 10–12 reader (spelling,
  fill-in-the-blank, short sentences are fine). Keep tone friendly, not childish; adults ride along.
- **Instruction language:** **English** (assumption — easy to change later).
- **Audio:** the **user generates & uploads** the clips. We provide an exact **filename manifest**
  (`assets/audio/manifest.json`) and an **optional** helper script (`scripts/generate_audio.sh`,
  macOS `say -v Alva`) as a convenience. The site references clips by a stable `audio` id.
- **Offline:** not required. **Online is fine** → images are hotlinked from open repositories; only
  audio (small MP3s the user uploads) lives in the repo. (A PWA/offline pass is a possible later add.)
- **Scope:** **Standard — 6 units**, ~19 lessons total.
- **Stack:** Vanilla **HTML + CSS + JS**, content in **JSON**. No framework, no bundler, no build.
- **Hosting:** repo named **`learn-swedish`**, self-contained `index.html` at root, GitHub Pages
  → `www.xavieranguera.com/learn-swedish`. Linked from the home page as "Learn Swedish".

---

## Architecture

### File structure
```
learn-swedish/
├── index.html              # App shell (single page; JS renders views)
├── css/
│   └── styles.css          # Mobile-first, responsive, themeable
├── js/
│   ├── app.js              # Router + view rendering (home, unit, lesson, exercise, review)
│   ├── data.js             # Loads /data JSON, builds the course graph
│   ├── progress.js         # localStorage: completed lessons, resume, stars/streak, SRS queue
│   ├── exercises.js        # Exercise engines (flashcard, MC, matching, fill-blank, listen)
│   └── audio.js            # Small helper to play clips by id, with graceful missing-file fallback
├── data/
│   ├── course.json         # Units → modules → lessons ordering & metadata
│   ├── vocab.json          # Master vocabulary list (source of truth for words)
│   ├── lessons/            # One JSON per lesson (teach items + exercises)
│   │   ├── l01-greetings.json
│   │   └── ...
│   └── culture.json        # "Visste du?" culture/fun-fact cards
├── assets/
│   ├── audio/
│   │   ├── manifest.json   # Every clip we need: {id, swedish, english, file}
│   │   └── sv/             # <-- user drops MP3s here (e.g. hej.mp3)
│   └── img/                # (only if we later decide to self-host images)
├── scripts/
│   └── generate_audio.sh   # OPTIONAL macOS `say` generator (user may ignore)
├── favicon + manifest bits
└── README.md               # How to add content, generate audio, deploy
```

### Data model
`vocab.json` — the single source of truth for a word/phrase:
```json
{
  "id": "hej",
  "sv": "hej",
  "en": "hello / hi",
  "audio": "hej",
  "image": "https://commons.wikimedia.org/...jpg",
  "image_attr": "Photo — CC BY 2.0, author, source URL",
  "pos": "interjection",
  "notes": "Most common greeting, any time of day.",
  "tags": ["greetings", "unit1"]
}
```
`data/lessons/lNN-*.json` — a lesson references vocab ids and declares exercises:
```json
{
  "id": "l01-greetings",
  "title": "Saying hello",
  "teach": ["hej", "god_morgon", "god_kvall", "hej_da"],
  "exercises": [
    { "type": "flashcards", "items": ["hej", "god_morgon", "god_kvall", "hej_da"] },
    { "type": "mc_image_to_word", "items": ["hej", "god_morgon"] },
    { "type": "listen_choose", "items": ["hej_da", "god_kvall"] },
    { "type": "match_pairs", "items": ["hej", "god_morgon", "god_kvall", "hej_da"] }
  ],
  "culture": ["fika_intro"]
}
```
`course.json` — ordering + gating:
```json
{
  "units": [
    { "id": "u1", "title": "Survival basics", "modules": [
      { "id": "m1", "title": "Greetings", "lessons": ["l01-greetings", "l02-thanks"] }
    ]}
  ]
}
```

### Audio contract (important, since the user supplies audio)
- Every vocab item has a stable `audio` id (a safe slug, ASCII, e.g. `jag_heter`).
- Expected file path: `assets/audio/sv/<audio>.mp3`.
- `assets/audio/manifest.json` is generated from `vocab.json` and lists **exactly** what to record:
  `[{ "id": "hej", "swedish": "hej", "english": "hello", "file": "assets/audio/sv/hej.mp3" }, ...]`
- The UI shows a 🔊 button; if a file is missing it stays disabled (never breaks the page), so the
  site is fully usable before all audio is uploaded and improves as clips land.
- Optional `scripts/generate_audio.sh` loops the manifest and runs
  `say -v Alva -o assets/audio/sv/<id>.aiff "<swedish>"` then converts to mp3 — the user can run,
  edit, or ignore it and use their own TTS.

### Progress & pedagogy engine (`progress.js`)
- `localStorage` key `learnsv:v1` holds: `completedLessons[]`, `lastLocation` (resume point),
  `stars` per lesson, `streakDays`, and a lightweight **SRS queue** (word id → next-review index).
- **Resume:** home screen shows a "Continue" button jumping to `lastLocation`.
- **Gating:** a lesson unlocks when the previous one is complete (kids get a clear path; a "practice
  freely" mode lets adults jump around).
- **Spaced repetition:** ~20% of each lesson's practice pulls due words from earlier lessons so
  vocabulary is reinforced, not just seen once.
- **Rewards:** stars for completing, a gentle streak counter — motivating for the kids, unobtrusive.

---

## Pedagogical design
Each lesson follows **Teach → Practice → Review**:
1. **Teach:** show 4–6 new items, each as image + Swedish + 🔊 audio + English + a one-line note.
2. **Practice:** 3–5 exercises mixing types (below), increasing in challenge within the lesson.
3. **Review:** a quick mixed quiz including a couple of earlier (SRS) words; award stars.

**Exercise types** (vocab-heavy, light grammar):
- `flashcards` — tap to reveal; hear audio. (recognition, low pressure)
- `mc_image_to_word` — see image, pick the Swedish word (4 options).
- `mc_word_to_en` — see Swedish, pick the English meaning.
- `listen_choose` — hear audio, pick the matching word/image. (crucial for "hearing how it sounds")
- `match_pairs` — match Swedish ↔ English (or ↔ image) tiles.
- `fill_blank` — type/select the missing word in a short phrase (age 10–12 appropriate).
- `listen_repeat` — play audio, prompt to say it aloud, self-mark (no mic needed).

**Grammar, kept light and pattern-based** (never rule-dumps):
- `en`/`ett` articles (Unit 3) — taught as "words come in two flavors," with color cues.
- Simple question word order (Unit 2 & 5) — "Var är…?", "Hur mycket kostar…?"
- Pronouns jag/du/han/hon (Unit 2).

**Culture — "Visste du?" cards** appear between lessons: short, illustrated, in English with the key
Swedish word highlighted.

---

## Content outline (6 units, ~19 lessons)

**Unit 1 — Survival basics**
- M1 Greetings: L01 `hej, god morgon, god kväll, hej då`; L02 `tack, tack så mycket, varsågod, ja, nej`
- M2 Politeness: L03 `ursäkta, förlåt, snälla`; L04 `Talar du engelska?, Jag förstår inte, Jag heter…`
- Culture: *fika*, *lagom*.

**Unit 2 — Meeting people**
- M1 Introductions: L05 pronouns + `Vad heter du? / Jag heter…`; L06 family `mamma, pappa, syster, bror, familj`
- M2 Small talk: L07 `Hur mår du? Bra, tack. / Var kommer du ifrån? Jag kommer från…`
- Culture: Swedish names/name days, Pippi Långstrump (kid-friendly).

**Unit 3 — Numbers, money & shopping**
- M1 Numbers: L08 `0–10`; L09 `11–20, 30, 40, 100`
- M2 Shopping: L10 `Hur mycket kostar det?, kronor, dyrt/billigt`; L11 `Jag vill ha…, en/ett, det här` (en/ett grammar)
- Culture: `pant` (bottle recycling), card-only Sweden (nearly cashless).

**Unit 4 — Food & fika**
- M1 Fika: L12 `kaffe, te, bulle, kanelbulle, kaka`; L13 `Jag skulle vilja ha…, En kaffe tack`
- M2 Meals: L14 `frukost, lunch, middag, vatten, mjölk`; L15 restaurant `Notan tack, Smaklig måltid`
- Culture: *kanelbullens dag*, *semla*, *surströmming* (fun/gross for kids).

**Unit 5 — Getting around Stockholm**
- M1 Transport: L16 `tunnelbana, buss, tåg, spårvagn, biljett`; L17 `Var är…?, till, från, höger, vänster, rakt fram`
- Culture: SL/tunnelbana "art gallery", *allemansrätten*.

**Unit 6 — Sightseeing**
- M1 Places: L18 `Gamla Stan, slottet, museet, kyrka, torg`; L19 `Öppettider, Var är toaletten?, Kan jag ta ett foto?`
- Culture: Vasa ship, Skansen, Djurgården, Nobel, ABBA museum.

*(Exact word lists finalized as each lesson JSON is authored; ~110–130 vocab items total.)*

---

## Images (open sources, hotlinked)
- Sources: **Wikimedia Commons**, **Openverse**, **Pexels/Unsplash** (all free-to-use).
- Each image stored with an `image` URL + `image_attr` string; an **Attributions** page lists them all.
- Fallback: if an image fails to load, show a clean colored tile with the word (never a broken image).
- (If hotlinking proves flaky, we can flip to self-hosting a curated set in `assets/img/` later.)

---

## Deployment
1. Create GitHub repo **`learn-swedish`** (root-level `index.html`, self-contained).
2. Push the site.
3. Settings → Pages → Deploy from branch → `main`, folder `/ (root)` → Save.
4. Live at `www.xavieranguera.com/learn-swedish` in ~1 min.
5. Add a "Learn Swedish" link/card on the home page (`xanguera.github.io`).

---

## Build phases (checklist)
- [x] **P0 — Skeleton:** `index.html` shell, CSS design system, hash router, home learning-path.
- [x] **P1 — Data & engine:** vocab/lesson/course/culture data, `progress.js` (resume + gating + localStorage + SRS).
- [x] **P2 — Exercise engines:** all 7 exercise types (flashcards, mc_img_word, mc_word_en, listen_choose, match_pairs, fill_blank, listen_repeat).
- [x] **P3 — Content Unit 1:** L01–L04 + culture cards, emoji illustrations, audio manifest.
- [x] **P4 — Content Units 2–6:** all 18 lessons + 12 culture cards authored.
- [x] **P5 — Audio manifest & optional script:** `manifest.json` (94 clips) + `generate_audio.sh` + `build_manifest.js`.
- [x] **P6 — Polish:** SRS Practice hub, stars/streak/XP, celebration + confetti, moose mascot, Phrasebook, README.
- [ ] **P7 — Deploy:** *user action* — create `learn-swedish` repo, enable Pages, link from home page.

## Deviations from the original plan (deliberate, for quality/reliability)
1. **Visuals = emoji illustrations, not hotlinked photos.** Random Wikimedia/Unsplash URLs break and
   look broken; illustration-forward is also more Duolingo-like. Reliable, instant, offline-friendly.
   Photos can be layered on later per vocab item (`image` field) without engine changes.
2. **Audio has an instant fallback:** browser Swedish speech synthesis (`sv-SE`) plays every word today;
   user-supplied MP3s are preferred automatically when present. Best of both worlds.
3. **Data lives in `.js` files (globals), not fetched `.json`.** Removes all CORS/`fetch` friction — the
   site even runs from `file://` — while staying trivially editable. `manifest.json` is still emitted for
   the audio workflow.

## Verification plan → results
- [x] **Content integrity** — `node scripts/verify_content.js`: 94 vocab, 18 lessons, 6 units, 12 culture
      cards; **all references resolve, 0 warnings**.
- [x] **JS syntax** — `node --check` on all 9 JS/data files: clean.
- [x] **Full functional smoke test** (jsdom, `scratchpad/smoke.js`): renders home path (18 nodes, 17 locked,
      START bubble), opens L01, **plays every step type to the celebration screen**, records completion +XP
      in localStorage, unlocks the next lesson, and renders Culture/Phrasebook/Practice — **no runtime errors**.
- [x] **Visual check** (headless Chrome screenshots): home path, unit banners, mascot, and lesson flashcard
      screen render correctly at proper width (Chrome headless has a 500px min-width; earlier right-edge
      "clipping" was a screenshot-canvas artifact, not real overflow — `docScrollW == innerW`, confirmed).

## Update (2026-07-31) — Multilingual (L1 → L2) support + onboarding
Added European Portuguese as a mother tongue and a first-run language chooser, refactored so more
L1/L2 pairs can be added later.

**Architecture**
- The Swedish course (word ids, `sv`, lesson structure, culture facts) is **language-neutral**.
- Each mother tongue (**L1**) is a **translation pack**; English is the *source* (inline in `data/*.js`),
  every other language overrides L1-facing text with automatic fallback to English.
- `js/i18n.js` — engine: `registerLang/registerTarget/registerUI/registerContent`, `t()` for UI
  strings, `word()/tr()/lessonTitle()/unitTitle()/moduleTitle()/cultureTitle()/cultureBody()/fillHint()`,
  plus settings (`lsv:settings` = `{l1, l2, onboarded}`).
- `data/i18n_en.js` — language registry + English UI strings. `data/i18n_pt.js` — full European
  Portuguese pack (UI + all content). Uses EP vocabulary (autocarro, comboio, elétrico,
  pequeno-almoço, casa de banho, dezasseis…), not Brazilian.
- **Onboarding**: first visit → welcome screen → L1/L2 selector. Flag button in the top bar changes
  language live afterwards. `exercises.js` and `app.js` route all L1-facing text through i18n.

**Verification (results)**
- `verify_content.js` extended to enforce **complete** coverage for every non-English language
  (UI keys, vocab, lessons, units, modules, culture, fill hints) → **PT 100% covered, 0 errors**.
- jsdom smoke test extended: drives welcome → selector (pick Português) → home in PT
  ("Sobrevivência básica", "COMEÇAR") → full L01 play-through → celebration in PT → phrasebook shows
  EP ("olá", "autocarro") → switch back to English re-renders live. **18/18 assertions pass, no errors.**
- Chrome screenshots confirm welcome, selector, and Portuguese home render correctly.

## Review
Delivered a complete, self-contained Duolingo-style course: 6 units / 18 lessons / ~94 words & phrases /
12 culture cards, with 7 exercise types, spaced-repetition Practice, resume + gating + stars/XP/streak in
localStorage, an original Swedish moose mascot (**Älgot**), celebration confetti, a full Phrasebook, and
audio that works immediately (speech synthesis) and upgrades to bundled MP3s. Verified by content-integrity
check, an end-to-end jsdom play-through, and Chrome screenshots. Remaining: user creates the GitHub repo and
enables Pages (P7), and optionally records MP3s.
