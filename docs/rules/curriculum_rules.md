# Generic Curriculum Rules (language-independent)

**This file is the single source of pedagogical truth for Step 2 (curriculum generation).**
It contains only rules that hold for *every* language pair. Anything that depends on the target
language or the mother tongue is **not** decided here — it is read from the Step-1 profiles:

- **L2 Language Profile** — target-language facts (`docs/profiles/<l2>/L2_<l2>_language_profile.md`).
- **L1→L2 Contrastive Profile** — pair-specific facts (`docs/profiles/<l2>/<l1>-<l2>_contrastive_profile.md`).

Wherever a rule below says *"per the profile"*, the concrete value comes from those documents, never
from this file. The deep rationale and the Swedish worked example live in
`../curricula_creation_process.md`; this file is the distilled, reusable checklist.

> **Placeholders.** `L2` = the field/language code of the target (e.g. `ca`); `L1` = the mother
> tongue code (e.g. `pt`). In data, the target text field is generically `l2` and audio lives under
> `assets/audio/<L2>/`. (The reference Swedish build still uses a literal `sv` field; new pairs
> should use the generalized `l2` field + target code — see `../curricula_creation_process.md` §11.)

---

## 1. Design principles (never negotiable)

1. **Start from zero, grow steadily.** Assume no prior L2 knowledge. Small digestible set per lesson,
   each building on the last. Never front-load grammar.
2. **Vocabulary-first.** The bulk of every lesson is words and ready-to-use phrases. Grammar appears
   only as light, pattern-based touches (§6), never as rule dumps.
3. **Purpose-driven syllabus.** Units are themed around what the learner will actually *do*, in the
   order they'll need it. Every item earns its place by being useful on the ground.
4. **Teach → Practice → Review, every lesson.** Show new items (picture + audio + meaning), drill them
   through mixed exercises of rising difficulty, then a short mixed review.
5. **Spaced repetition.** Earlier words resurface later; a per-word memory box + Practice hub pull the
   weakest words first.
6. **Gated progression.** A lesson unlocks only when the previous one completes — one clear path.
7. **Culture woven in.** Short "Did you know?" cards between lessons and in a dedicated tab, written in
   L1 with the key L2 word highlighted. (Facts come from the L2 profile.)
8. **Reliable, playful visuals.** Emoji illustrations, not hotlinked photos — never break, work
   offline, on-brand. One emoji per item that reads instantly. (Emoji-resistant concepts: see §5.)
9. **Audio for everything.** Every word is hearable. Bundled recordings preferred; the browser's L2
   speech synthesis is the fallback **only where the profile confirms a voice exists** (§7).
10. **Appropriate, never childish.** Friendly tone; no hard-fail/punishment mechanics (soft hearts —
    never locked out). Reading level matches the target age (from the brief).
11. **L2 content is language-neutral; L1 is a translation layer.** Structure, ids, L2 text, emoji, and
    culture *facts* are shared across all mother tongues. Only L1-facing text is localized.

---

## 2. Scope & sizing (defaults; calibrate to the brief)

| Dimension | Rule of thumb |
|---|---|
| Units | 5–8, one theme each |
| Lessons | 2–4 per unit; ~15–20 total |
| New items / lesson (`teach`) | 3–6 (numbers may be more — split the flashcard step) |
| Vocab items total | ~90–130 |
| Exercises / lesson | 3–5, mixed types, rising difficulty |
| Culture cards | ~1–2 per couple of lessons, distributed thematically |
| Grammar patterns | 2–4 gentle patterns across the whole course (which ones: **per the L2 profile**) |

Each unit should map to a **can-do outcome** (e.g. "order and pay for food"). Write the outcome first.

---

## 3. Progression & scaffolding

1. **Order units by the goal's timeline / need.** Default survival-trip arc (adapt to the brief):
   1. Survival basics (greetings, thanks, yes/no, politeness, "do you speak…")
   2. Meeting people (pronouns, names, family, small talk)
   3. Numbers, money & shopping
   4. Food & the local ritual
   5. Getting around (transport, directions)
   6. Sightseeing (places, useful questions)
2. **Group each unit into modules** of 1–3 lessons around a sub-theme.
3. **Sequence small → large within a lesson:** recognition first (flashcards, picture→word), then
   recall (word→meaning, listen), then production-ish (matching, fill-in-the-blank, say-it-aloud).
4. **Reuse forward.** Later lessons re-touch earlier words (review step + SRS; also as distractors or
   in match sets).
5. **Anchor to the destination.** Prefer locally-true, immediately-usable items — the exact transport
   words, café ritual, and landmarks the destination uses. **Which ones: per the L2 profile's culture
   & lexical-selection sections.**

---

## 4. Exercise engines (the 7 types)

Author each lesson's `exercises` as a mixed list of rising difficulty:

| type | prompt → answer | graded | notes |
|---|---|---|---|
| `flashcards` | learn set (flip, audio) | no | 4–6 ids; split big sets |
| `mc_img_word` | picture → pick L2 word | yes | distractors auto from same tag |
| `mc_word_en` | L2 word → pick meaning | yes | ("en" = the L1/source meaning slot) |
| `listen_choose` | audio → pick word | yes | trains the ear |
| `match_pairs` | match L2 ↔ meaning | yes | 4–5 pairs max |
| `fill_blank` | tap the missing word in a sentence | yes | see §5 |
| `listen_repeat` | hear it, say it aloud (self-mark) | no | for phrases |

**Distractor rule.** MC/listen distractors are generated at runtime from vocab that **shares a tag**
with the target, so each such target needs **≥ 3 same-tag siblings** or verification warns. Tag
deliberately. The contrastive profile may nominate **near-cognate / false-friend** items as
especially good hard distractors — use them.

**Lesson shape.** Open with `flashcards` for the new `teach` items, then 2–4 graded exercises mixing
types, ideally ending in `match_pairs` or `fill_blank`. Attach 0–2 `culture` ids to close.

---

## 5. Content authoring rules

### Vocabulary
- 4–6 new items per lesson (numbers excepted — split the flashcard step).
- Each item: correct L2 text (`l2`, with diacritics), an ASCII `id`, exactly one `img` emoji that
  reads at a glance, an optional one-line `note` (pronunciation/usage — the "why/how", **respelling
  convention per the L2 profile**), and `tags`.
- Emoji must be unambiguous; for abstract words pick a gesture/symbol. Numbers use the numeral.
  **Emoji-resistant concepts** (flagged in the L2 profile) fall back to the documented alternative.
- Don't leak the answer: never echo the numeral in the meaning (`one`, not `one (1)`), etc.

### Fill-in-the-blank
- `{ type:"fill_blank", l2:"…___…", en:"<source hint>", answer:"<id-word>", bank:[…] }`.
- The L2 sentence must contain `___`; `answer` ∈ `bank`; use **already-taught** words.
- `en` is the source-language hint; every non-source L1 pack supplies the localized hint via the
  lesson's `{ title, fill }`.
- **Spaceless / non-concatenative scripts:** if the L2 profile marks the language as not
  space-delimited (e.g. Japanese, Thai), define the blank on a profile-specified token boundary — do
  not assume whitespace tokenization.

### Grammar (light, pattern-based)
- Only 2–4 patterns across the whole course, each as a *"these come in two flavours"* note, never a
  rules table. **Which patterns: per the L2 profile's "light-grammar picks"**, biased toward features
  the contrastive profile marks as *new for this L1*. Features the contrastive profile marks as
  *already familiar* can be assumed silently.

### Culture cards
- `{ id, emoji, title, l2, body }`. `title`/`body` are L1 text; `l2` is the highlighted keyword; wrap
  L2 words in `<b class='sv-hl'>…</b>` inside `body`. Keep to ~2–4 sentences, concrete and fun.
- Distribute thematically. **All facts come from the L2 profile's culture bank** and must be
  factually checked there.

### Localization (writing an L1 pack)
- Translate **meaning**, not word-for-word; natural for that L1's **regional variant** (per the
  contrastive profile).
- **Never translate the L2 word itself.** Localize examples to the learner. Keep short L2 praise
  interjections untranslated for immersion.

---

## 6. Naming conventions

- **Vocab id:** lowercase ASCII `snake_case`, **no diacritics** — transliterate L2 special letters
  **using the rule defined in the L2 profile** (each language spells its own letters differently). The
  `l2` field keeps correct diacritics; only the *id* is ASCII. Phrases use a short readable slug.
- **Ids never change** once shipped — audio, SRS history, and translation packs key off them.
- **Lesson ids:** `l01`, `l02`… (zero-padded, global order). **Units:** `u1`… **Modules:** `m1`…
- **Tags:** always the unit tag (`u1`…) + one category (`greetings`, `numbers`, `food`, `transport`,
  `directions`, `places`, `family`, `phrases`, `grammar`, …). Categories are the distractor pools.

---

## 7. Audio

- `assets/audio/<L2>/<id>.mp3` (or `.wav`); the filename **is** the id. `manifest.json` is generated.
- Preferred: recorded/synthesized clips in a consistent L2 voice (OmniVoice reference clone or TTS).
- **Fallback depends on the profile.** Browser speech synthesis is the instant fallback *only if the
  L2 profile confirms a voice for the L2 code exists*; if not, recordings are **mandatory**, not
  optional — plan for it.
- Never rename an id after audio exists.

---

## 8. Verification & QA (the gate)

- `scripts/verify_content.js` must pass with **0 errors**: references resolve; vocab has required
  fields + enough same-tag distractors; fill-blanks well-formed; **full translation completeness** for
  every non-source L1.
- Headless functional play-through (jsdom): complete a lesson through every exercise type; confirm
  completion/XP/unlock persist and every L1 renders.
- Screenshots at phone width.
- **Profile-driven checks** (manual): pronunciation notes use the profile's respelling convention;
  light-grammar patterns match the profile picks; culture facts trace to the culture bank; no browser
  TTS relied on where the profile says no voice exists.
