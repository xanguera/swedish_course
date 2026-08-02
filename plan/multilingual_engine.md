# Multilingual engine — de-Swedishify the app (intermediate step)

## TL;DR

The app hardcodes Swedish in the engine: the target surface field is literally `sv`, audio is pinned
to `assets/audio/sv/`, and speech synth to `sv-SE`. This blocks adding any second target (e.g.
Catalan). This change makes the **engine language-independent and multi-course-capable** without
altering the Swedish experience:

1. Rename the target surface field `sv → l2` across data + all consumers.
2. Namespace course data **per target** (`registerCourse(code, slice)` + `useTarget(code)`), so a new
   language is *additive* (drop in its data files, register its target) — no engine edits.
3. Parametrize audio folder (`assets/audio/<L2>/`) and TTS lang/voice from the target registry
   (`bcp47`).
4. Wire the L2 selector so targets are switchable the moment a second one is registered.

Swedish stays the only registered target here (its data is untouched behaviourally). **Authoring the
Catalan course data + registering the `ca` target is Step 2** (separate, purely additive).

## Why now / scope boundary

- Necessary to make the app "multilingual" per `docs/curricula_creation_process.md` §11 and the new
  `docs/README.md` Step 2 — which assumes an `l2` field, `assets/audio/<L2>/`, and a target registry.
- **In scope:** engine generalization only. **Out of scope (Step 2):** Catalan vocab/lessons/culture,
  `registerTarget("ca", …)`, the selector's Catalan flag, and making the app title/hero dynamic per
  course (still Swedish-labelled because Swedish is still the only shipped course).

## Changes

- **NEW `js/coredata.js`** — `LSV.data.registerCourse(code, slice)` + `useTarget(code)` + `courses{}`.
  Loaded before the data files (browser) and required first (node scripts).
- **`data/vocab.js` / `lessons.js` / `culture.js`** — field `sv:` → `l2:`; tails call
  `registerCourse("sv", …)` instead of assigning `LSV.data.*` directly.
- **`data/course.js`** — tail wraps course in `registerCourse("sv", { course })`.
- **`js/i18n.js`** — merged word object field `sv → l2`.
- **`js/audio.js`** — folder from active target; `u.lang`/voice from `targets[L2].bcp47`; generic
  voice picker (per-lang cache, re-picks on L2 change); `w.sv → w.l2`.
- **`js/app.js`** — `D.useTarget(I18N.L2)` at boot and after onboarding; wire L2 selector click
  handlers; `c.sv/w.sv → .l2`.
- **`js/exercises.js`** — `.sv → .l2`; step field `sv → l2`; mode `img2sv→img2word`,
  `sv2en→word2meaning`; match side `sv/en → l2/l1`.
- **`data/i18n_en.js`** — `registerTarget("sv", { …, bcp47: "sv-SE" })`.
- **`scripts/build_manifest.js`** — require coredata; iterate registered courses; emit `l2` field and
  `assets/audio/<code>/<id>.mp3`.
- **`scripts/verify_content.js`** — require coredata + `useTarget("sv")`; required field `sv → l2`;
  fill-blank check `ex.sv → ex.l2`.

## Verification

- [x] `node scripts/verify_content.js` → 0 errors (Vocab 94, Lessons 18, Units 6, Culture 12, en+pt — unchanged).
- [x] `node scripts/build_manifest.js` → 94 entries, paths still `assets/audio/sv/…` (existing audio still
      resolves), field renamed `swedish → l2` (+ new `target`).
- [x] Node smoke test (scratchpad `smoke.js`): `useTarget("sv")` populates 94 vocab / 6 units / 12
      culture; `I18N.word("hej").l2 === "hej"`; pt L1 meaning resolves; `buildSteps` over all 18 lessons
      = 147 steps incl. 3 fill steps with `.l2` blanks; unknown target empties slices safely.
- [x] Grep: no `.sv` reads / `sv:` field keys / `sv2en` / `img2sv` / `sv-SE` literals left in the engine.
- [x] Audio-gen scripts updated to read the renamed manifest field (`e['l2']`).

## Review (done)

- **Scope held:** engine generalized; Swedish behaviour unchanged (same verify counts, same audio paths).
- **Gotcha caught:** coredata initially sniffed `window` vs `global`; under the Node scripts' `global.window = {}`
  stub that bound it to the wrong object. Fixed by referencing the bare `LSV` global like every other module.
- **Deferred to Step 2 (noted, not done):** authoring the Catalan course data; `registerTarget("ca", …)` +
  flag; per-target verification loop in `verify_content.js`; fully target-parametrizing the audio-gen
  scripts (still default to `sv`); making `index.html`/PWA title + hero/culture text dynamic per course.

## Rollout note

Runtime course-switching becomes *visible* only when a second target is registered (Step 2). Until
then the selector lists Swedish only — no regression.
