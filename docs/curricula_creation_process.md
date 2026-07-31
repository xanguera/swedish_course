# Curriculum Creation Process

How the Swedish course was designed and built, written as a **reproducible playbook** so the same
result can be recreated for another mother tongue (**L1**) or another language pair (**L1 → L2**).

- **L1** = the learner's mother tongue (the language of instruction). e.g. English, Português.
- **L2** = the language being learned (the *target*). e.g. Swedish (`sv`).

The reference implementation is a family course: English/Portuguese speakers learning survival
Swedish for a two-week Stockholm trip, tuned for confident 10–12-year-old readers plus adults.

---

## 1. Design principles (the rules)

These are the non-negotiable rules every curriculum must follow.

1. **Start from zero, grow steadily.** Assume no prior knowledge of the L2. Each lesson introduces a
   small, digestible set and builds on the last. Never front-load grammar.
2. **Vocabulary-first.** The bulk of every lesson is words and ready-to-use phrases. Grammar appears
   only as light, pattern-based touches (see §6.5), never as rule dumps.
3. **Purpose-driven syllabus.** Units are themed around what the learner will actually *do* on the
   trip, in the order they'll need them (arrive → greet → meet people → pay → eat → move → sightsee).
   Every word must earn its place by being useful on the ground.
4. **Teach → Practice → Review, every lesson.** Show new items (with picture + audio + meaning),
   drill them through mixed exercises of rising difficulty, then a short mixed review.
5. **Spaced repetition.** Earlier words resurface in later practice so they stick; the app tracks a
   per-word memory box and a Practice hub pulls the weakest words first.
6. **Gated progression.** A lesson unlocks only when the previous one is complete — a single, clear path.
7. **Culture woven in, not bolted on.** Short "Did you know?" cards (traditions, fun facts) appear
   between lessons and in a dedicated tab, written in the L1 with the key L2 word highlighted.
8. **Reliable, playful visuals.** Use emoji illustrations, not hotlinked photos (never break, work
   offline, on-brand). Every vocabulary item has one emoji that reads instantly.
9. **Audio for everything.** Every word is hearable. The browser's L2 speech synthesis is the instant
   fallback; bundled recordings (OmniVoice / TTS) are preferred when present.
10. **Kid-appropriate but not childish.** Friendly tone; no hard-fail/punishment mechanics (hearts are
    soft — you never get locked out). Reading level matches the target age.
11. **L2 content is language-neutral; L1 is a translation layer.** The course structure, ids, L2 text,
    emoji, and culture *facts* are shared across all mother tongues. Only L1-facing text is localized
    (see §3). This is what makes a new L1 cheap to add.

---

## 2. Scope & sizing rules

Calibrate to the trip and the learners, but the reference "standard" scope is a good default:

| Dimension | Rule of thumb | Swedish reference |
|---|---|---|
| Units | 5–8, one theme each | 6 |
| Lessons | 2–4 per unit; ~15–20 total | 18 |
| New items / lesson (`teach`) | 3–6 (numbers may be more, split into 2 flashcard sets) | 3–6 |
| Vocab items total | ~90–130 | 94 |
| Exercises / lesson | 3–5, mixed types, rising difficulty | 3–5 |
| Culture cards | ~1–2 per couple of lessons, distributed thematically | 12 |
| Grammar | 2–4 gentle patterns across the whole course | en/ett, question order, pronouns |

---

## 3. Information architecture

### 3.1 Course content (language-neutral) — `data/`
- `data/vocab.js` — master word list. One entry per id: `{ id, sv, en, img, note, tags }`.
  `sv` is the L2 text; `en` is the **source-language** meaning; `img` is one emoji; `tags` drive
  distractor selection and grouping.
- `data/lessons.js` — each lesson: `{ id, unit, icon, teach:[ids], exercises:[…], culture:[ids] }`.
- `data/course.js` — ordering: `units[] → modules[] → lessons[]`, plus per-unit `icon`, `color`,
  `colorDark`.
- `data/culture.js` — "Did you know?" cards: `{ id, emoji, title, sv, body }` (`sv` = highlighted L2 keyword).

### 3.2 Localization (per mother tongue) — `js/i18n.js` + `data/i18n_*.js`
- **English is the source language**: its strings live inline in the `data/*.js` above and act as the
  automatic fallback. There is no English content pack, only English UI strings in `data/i18n_en.js`.
- **Every other L1 is a translation pack** (`data/i18n_pt.js`, …) that overrides L1-facing text:
  - `ui` — all chrome strings (buttons, prompts, hero, tabs, celebration, onboarding).
  - `content.vocab[id] = { t, note }` — the meaning + learner note in that L1.
  - `content.lessons[id]` — a title string, or `{ title, fill }` when the lesson has a fill-in-the-blank
    (the `fill` is the L1 hint for that sentence).
  - `content.units[id]`, `content.modules[id]` — titles.
  - `content.culture[id] = { title, body }`.
- The engine (`js/i18n.js`) exposes `t()`, `word()/tr()`, `lessonTitle()`, `fillHint()`,
  `unitTitle()`, `moduleTitle()`, `cultureTitle()`, `cultureBody()`, all falling back to English.
- `registerLang / registerTarget / registerUI / registerContent` populate the registries.
- The learner's choice (L1, L2, onboarded) persists in `localStorage` under `lsv:settings`, chosen on
  a first-run welcome + selector and changeable via the top-bar flag button.

### 3.3 Audio
- Files live at `assets/audio/sv/<id>.mp3` (or `.wav`). The filename **is** the vocab id.
- `assets/audio/manifest.json` (generated) lists every clip to produce.
- Audio is L2-specific (folder is the L2 code). See §9 and the L2 limitation in §8.

---

## 4. Naming conventions

- **Vocab id**: lowercase ASCII slug, `snake_case`, **no diacritics** — transliterate L2 special
  letters. e.g. `god_kvall` (god kväll), `atta` (åtta), `mjolk` (mjölk), `hoger` (höger),
  `forlat` (förlåt). Phrases use a short readable slug: `jag_heter`, `hur_mycket_kostar_det`.
  The `sv` field keeps the correct diacritics; only the *id* is ASCII.
- **Ids never change** once shipped — audio files, SRS history, and translation packs key off them.
- **Lesson ids**: `l01`, `l02`, … (zero-padded, global order). **Unit ids**: `u1`… **Module ids**: `m1`…
- **Tags**: always include the unit tag (`u1`…) plus one category (`greetings`, `numbers`, `food`,
  `transport`, `directions`, `places`, `family`, `phrases`, `grammar`, …). Categories are the
  distractor pools, so tag deliberately.

---

## 5. Curriculum design rules (syllabus & sequencing)

1. **Order units by the trip's timeline / need.** Reference sequence:
   1. Survival basics (greetings, thanks, yes/no, politeness, "do you speak…")
   2. Meeting people (pronouns, names, family, small talk)
   3. Numbers, money & shopping
   4. Food & local ritual (fika)
   5. Getting around (transport, directions)
   6. Sightseeing (places, useful questions)
2. **Within a unit, group into modules** of 1–3 lessons around a sub-theme.
3. **Sequence small → large within a lesson**: recognition first (flashcards, picture→word), then
   recall (word→meaning, listen), then production-ish (matching, fill-in-the-blank, say-it-aloud).
4. **Reuse forward.** Later lessons should re-touch earlier words (the review step + SRS handle this;
   also fine to include an earlier word as a distractor or in a match set).
5. **Anchor to the destination.** Prefer locally-true, immediately-usable items (e.g. the transport
   words the city actually uses, the local café ritual, the real landmarks).

---

## 6. Content authoring rules by type

### 6.1 Vocabulary
- 4–6 new items per lesson (numbers excepted — split the flashcard step).
- Each item: correct L2 `sv` (with diacritics), an ASCII `id`, exactly one `img` emoji that reads at a
  glance, an optional one-line `note` (a pronunciation tip or usage note — the "why/how"), and tags.
- Choose emoji that are unambiguous; for abstract words/phrases pick a gesture or symbol (👋 hej, 🙏 tack,
  ❓ question, 🧭 directions). Numbers use the numeral as the "emoji".
- Don't repeat the numeral in the translation text (e.g. `en: "one"`, not `"one (1)"`) — the `img` field
  already carries it, and echoing it in `en`/L1 text just leaks the answer into `mc_word_en`, flashcards,
  and `match_pairs`.

### 6.2 Exercises (the 7 engines)
Author a lesson's `exercises` as a mixed list. Types (see `js/exercises.js`):
| type | prompt → answer | graded | notes |
|---|---|---|---|
| `flashcards` | learn set (flip, audio) | no | 4–6 ids; split big sets |
| `mc_img_word` | picture → pick L2 word | yes | distractors auto from same tag |
| `mc_word_en` | L2 word → pick meaning | yes | |
| `listen_choose` | audio → pick word | yes | trains the ear |
| `match_pairs` | match L2 ↔ meaning | yes | 4–5 pairs max |
| `fill_blank` | tap the missing word in a sentence | yes | see §6.4 |
| `listen_repeat` | hear it, say it aloud (self-mark) | no | for phrases |

**Distractor rule:** MC/listen distractors are generated at runtime from vocab that **shares a tag**
with the target. Each such target therefore needs **≥ 3 same-tag siblings**; `verify_content.js` warns
when it must pad from the global pool. Tag accordingly.

### 6.3 Lesson shape
- Start with a `flashcards` step for the new `teach` items, then 2–4 graded exercises mixing types,
  ideally ending in a `match_pairs` or `fill_blank`. Attach 0–2 `culture` ids to close the lesson.

### 6.4 Fill-in-the-blank
- `{ type:"fill_blank", sv:"En ___, tack", en:"A coffee, please", answer:"kaffe", bank:[…] }`.
- The `sv` sentence must contain `___`; `answer` must be in `bank`; use **already-taught** words.
- `en` is the source-language hint; every non-English pack must supply the localized hint via the
  lesson's `{ title, fill }` (enforced by verification).

### 6.5 Grammar (light, pattern-based)
- Introduce only a few patterns across the course, each as a "these come in two flavours" style note,
  never a rules table. Reference set: article gender (`en`/`ett`), question word order
  (`Var är…?`, `Hur mycket kostar…?`), personal pronouns.

### 6.6 Culture cards
- `{ id, emoji, title, sv, body }`. `title`/`body` are L1 text; `sv` is the highlighted L2 keyword;
  wrap L2 words in `<b class='sv-hl'>…</b>` inside `body`.
- Keep each to ~2–4 sentences, concrete and fun; favour things a family will notice or enjoy.
- Distribute thematically (put the food facts on food lessons, transport facts on transport lessons).

### 6.7 Localization rules (writing an L1 pack)
- Translate **meaning**, not word-for-word; keep it natural for that L1.
- Use the L1's **regional** vocabulary deliberately (e.g. European — *autocarro*, *comboio*,
  *pequeno-almoço*, *casa de banho* — vs Brazilian Portuguese). State the target region up front.
- **Never translate the L2 word itself** — the learner is learning it.
- **Localize examples** to the learner (e.g. change the sample country in "I come from…").
- Keep short L2 interjections used for encouragement (e.g. Swedish "Bra!") **untranslated** for
  immersion — these are UI praise strings, intentionally left in the L2.
- Same rule as §6.1 for numbers: don't append the numeral to the translated word (`t("um")`, not
  `t("um (1)")`) — it's redundant with `img` and leaks the answer into exercises.

---

## 7. Step-by-step process (the pipeline)

Follow in order. Steps A–F build the language-neutral L2 course; G–H the L1 layer; I–K ship it.

- **A. Define the brief.** Learners (ages, L1), destination/goal, L2, scope (§2), audio source.
- **B. Draft the syllabus.** Units → modules → lessons per §5. Write it down first (a plan doc).
- **C. Author vocabulary** in `data/vocab.js` per §6.1 and the naming rules (§4). Tag for distractors.
- **D. Author lessons** in `data/lessons.js`: `teach` lists + a mixed `exercises` sequence (§6.2–6.5)
  + `culture` refs. Add fill-in-the-blanks with `en` hints.
- **E. Author culture cards** in `data/culture.js` (§6.6).
- **F. Wire ordering** in `data/course.js` (unit titles/icons/colours, module→lesson order).
- **G. Source-language UI** in `data/i18n_en.js`: register the languages/targets and all English UI
  strings. (English content stays inline in the `data/*.js` above.)
- **H. Add each non-source L1 pack** (`data/i18n_<code>.js`) with full `ui` + `content` (§3.2, §6.7),
  and add its `<script>` tag in `index.html`.
- **I. Verify:** `node scripts/verify_content.js` — must pass with **0 errors** (see §10).
- **J. Generate audio:** `node scripts/build_manifest.js` then a TTS pass (see §9).
- **K. Test:** a headless play-through (jsdom) + screenshots; click a full unit on desktop and phone
  width; confirm resume/gating, missing-audio fallback, and every L1 renders.

---

## 8. Adding a new mother tongue (L1) — checklist

Cheap: it's a translation pack, no course changes.

1. Copy `data/i18n_pt.js` → `data/i18n_<code>.js`; translate **every** value in `ui` and `content`
   (`vocab.t`+`note`, `lessons` titles + any `fill`, `units`, `modules`, `culture` title+body). Follow §6.7.
2. In `data/i18n_en.js`, register it:
   `I.registerLang("<code>", { name:"…", endonym:"…", flag:"…" });`
3. Add `<script src="data/i18n_<code>.js"></script>` in `index.html` next to the other packs.
4. `node scripts/verify_content.js` — it **fails** if the pack is missing any key.
5. Play-test: pick the new L1 in the selector; confirm home, a lesson, culture, phrasebook all render.

Fallback safety: anything left untranslated falls back to English, so a partial pack still runs — but
ship it complete (verification enforces this).

---

## 9. Generating audio

- `node scripts/build_manifest.js` regenerates `assets/audio/manifest.json` from `data/vocab.js`
  (one entry per id: `{ id, swedish, english, file }`).
- **OmniVoice (recommended):** `bash scripts/generate_audio_omnivoice.sh` finds missing clips,
  synthesizes them in the L2, and writes `assets/audio/<L2>/<id>.mp3`. For a **consistent voice** it
  clones a short reference; the reference is auto-made with the OS L2 voice (macOS `say`) or supplied
  via `--ref-audio`. `--dry-run` lists work; `--limit N` previews; `--force` redoes all.
- **Fallback:** the site speaks every word via the browser's L2 speech synthesis, so audio is never a
  blocker; recordings just improve quality. It plays `.mp3` or `.wav`.
- Rule: **never rename an id** after audio exists — the filename is the id.

---

## 10. Verification & QA

- `scripts/verify_content.js` is the gate. It checks:
  - every course→lesson→vocab/culture reference resolves; no duplicate/orphan lessons;
  - vocab has required fields and enough same-tag distractors (warns on padding);
  - fill-blanks are well-formed (`___` present, answer ∈ bank);
  - **translation completeness for every non-English L1**: all UI keys, vocab meanings, lesson/unit/
    module titles, culture title+body, and fill hints — missing entries are **errors**.
- Run a **headless functional play-through** (jsdom): render the path, complete a lesson through every
  exercise type, confirm completion/XP/unlock persist, and that each L1 renders (see the project's test).
- Eyeball screenshots at phone width (Chrome headless enforces a 500px min-width; crop accordingly).

---

## 11. Adding a new L1 → L2 pair (a different target language)

Bigger than adding an L1, because the L2 content itself changes. Current limitations to address:

1. **New L2 course content.** Re-author `data/vocab.js` (new `sv`→ the new L2 field), `lessons.js`,
   `course.js`, `culture.js` for the new target. Ids and structure can mirror an existing course, but
   the L2 text, emoji choices, culture facts, and useful phrases are target-specific.
2. **Generalize the L2 code.** Today the L2 field is literally `sv` and the audio folder is
   `assets/audio/sv/`. To support multiple targets cleanly, parametrize by L2 code (e.g. a `target`
   field per vocab or per-course namespace, and `assets/audio/<L2>/`). Register the new target with
   `I.registerTarget("<code>", {…})`.
3. **New audio set** under `assets/audio/<L2>/`, generated with the L2 voice (§9).
4. **L1 packs still apply** — the `ui` strings are L2-agnostic; only `content` (meanings, titles,
   culture) is re-pointed at the new course. Re-verify coverage.
5. **Selector** already supports multiple targets via the L2 registry; expose the new one there.

Keep the same design principles (§1) and process (§7) — only the target content and the L2-code
parametrization change.

---

## 12. File map (reference implementation)

```
data/vocab.js       L2 words: id, sv, en(source), img, note, tags
data/lessons.js     teach + exercises + culture per lesson
data/course.js      units → modules → lessons, colours/icons/order
data/culture.js     "Did you know?" cards (id, emoji, title, sv, body)
data/i18n_en.js     language registry + English UI strings (source)
data/i18n_pt.js     European Portuguese pack (ui + content)  ← template for new L1s
js/i18n.js          localization engine + settings (lsv:settings)
js/exercises.js     the 7 exercise engines + distractor generation
js/progress.js      completion, gating, XP, streak, spaced repetition
js/app.js           router, views, onboarding, lesson runner, celebration
scripts/verify_content.js         content + full-translation gate
scripts/build_manifest.js         manifest.json from vocab
scripts/generate_audio_omnivoice.* OmniVoice audio generation
plan/learn_swedish.md             the original design/spec + review
```

---

## 13. Quick recap — the Swedish reference

Brief: EN/PT-speaking family, kids 10–12, two weeks in Stockholm. → 6 units, 18 lessons, 94 words &
phrases, 12 culture cards, 7 exercise types, light grammar (en/ett, question order, pronouns), emoji
visuals, mascot **Älgot** (a moose), audio via OmniVoice voice-cloning of a Swedish reference (with
browser speech-synthesis fallback). English is the source language; European Portuguese is a full
translation pack. Reproduce by following §7, reusing this structure and swapping the brief.
