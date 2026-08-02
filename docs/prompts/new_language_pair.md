# Prompt — create a new language pair (paste into a Claude session)

> Copy everything in the "PROMPT" block below into a fresh Claude Code session **from the repo root**.
> It drives the whole job end-to-end: brief → profiles → course → packs → verify → audio → test, with
> checkpoints where you confirm before it spends effort. Replace nothing — it asks you for the brief.

---

## PROMPT

You are working in this repository, a small offline-first web app that teaches a target language (L2)
to speakers of a mother tongue (L1). It already hosts multiple courses at once (Swedish, Catalan). Your
job is to **add a new L1→L2 pair** by following the repo's own playbook. Do not invent a new
architecture — reuse the existing one.

**Read these first, in order, and treat them as the source of truth:**
1. `docs/README.md` — the 2-step process and file map.
2. `docs/rules/curriculum_rules.md` — the language-independent pedagogy + data schema (this governs
   Step 2). Every "per the profile" reference is resolved from the profiles you write in Step 1.
3. `docs/templates/L2_language_profile.template.md` and
   `docs/templates/L1_to_L2_contrastive_profile.template.md` — the Step-1 templates.
4. The reference course for structure: `data/vocab_ca.js`, `lessons_ca.js`, `course_ca.js`,
   `culture_ca.js`, `data/i18n_ca.js`, `data/i18n_ca_pt.js` (Catalan) — mirror this shape exactly.
5. `docs/profiles/ca/` — filled example profiles.

**How the engine already supports multiple courses (so this is additive — do NOT re-architect):**
- Course data registers per target: each data file calls `LSV.data.registerCourse("<l2>", { … })`.
- The active course is chosen with `useTarget(<l2>)`; the app calls it at boot and on L2 switch.
- Content is namespaced by target: `registerContent(l1, l2, obj)` (`I.content[l1][l2]`).
- Course-flavoured UI (mascot, hero, culture header, welcome) is namespaced too:
  `registerUITarget(l1, l2, obj)`. Generic UI stays in `registerUI(l1, …)`.
- Each target registers metadata: `registerTarget("<l2>", { name, endonym, flag, bcp47, mascot, mascotName })`.
- Vocab surface field is `l2`; audio lives in `assets/audio/<l2>/`; ids are ASCII slugs.

Work in these **phases, pausing at each checkpoint** for my confirmation before continuing.

### Phase 0 — Brief (ask me, then STOP for confirmation)
Ask me for: L1 and L2 (+ BCP-47 codes), the destination/goal, learner audience & age, scope
(units/lessons/vocab counts — default 6/18/~94), the **regional variant** of both L1 and L2, the audio
source, and the mascot idea. If I'm adding a **new L1 to an existing L2**, say so — that's the cheap
path (only a contrastive profile + a content pack + `registerUITarget`, no new course data). Write the
brief into `plan/learn_<l2>.md` (start with a `## TL;DR`). Checkpoint.

### Phase 1 — Profiles (Step 1)
Create `docs/profiles/<l2>/`:
- `L2_<l2>_language_profile.md` from the L2 template — fill **every** section (script, the id
  transliteration rule for this language's letters, phonology + a respelling convention, gender/formality,
  the 2–4 light-grammar picks, sociolinguistics, a **verified** culture bank, TTS-voice availability,
  emoji-resistant concepts). L1-independent.
- `<l1>-<l2>_contrastive_profile.md` from the contrastive template — cognates, false friends, sounds
  hard *for this L1*, which grammar is new vs familiar, translation/register guidance, examples
  localization. Then **STOP** and let me review the profiles before you author content.

### Phase 2 — Author the course (Step 2), following `docs/rules/curriculum_rules.md`
Mirror the Catalan files' structure and the shared lesson/unit/module ids (`l01…`, `u1…`, `m1…` — ids
may repeat across courses; content is namespaced, so there's no collision).
1. `data/vocab_<l2>.js` — vocab per §5–6 and the L2 profile's id-transliteration + respelling; tag for
   distractors (each MC/listen target needs ≥3 same-tag siblings). English inline in `en`.
2. `data/lessons_<l2>.js` — `teach` + mixed `exercises` (rising difficulty) + `culture` refs; 3-ish
   `fill_blank`s with `en` hints.
3. `data/course_<l2>.js` — units → modules → lessons, icons/colours.
4. `data/culture_<l2>.js` — culture cards drawn only from the L2 profile's verified bank.
5. `data/i18n_<l2>.js` — `registerTarget("<l2>", {…, bcp47, mascot, mascotName})` +
   `registerUITarget("en","<l2>", {…})` covering the flavoured keys (hero_hi_t/s, hero_keep_t,
   hero_done_t, audio_tip, made_with, culture_title, culture_sub, welcome_title, welcome_sub,
   celebrate_t) — English chrome for this course.
6. `data/i18n_<l2>_<l1>.js` — `registerUITarget("<l1>","<l2>", {…})` (same flavoured keys, in L1) +
   `registerContent("<l1>","<l2>", { vocab, lessons, units, modules, culture })` per the contrastive
   profile (translate meaning, use the L1's regional vocabulary, never translate the L2 word).
7. Add all new `<script>` tags to `index.html` (data files with the other courses; i18n packs with the
   other packs).

### Phase 3 — Verify (must be 0 errors)
Run `node scripts/verify_content.js`. It loops every course and checks references, distractor tags,
fill-blanks, full L1 content coverage, and that every flavoured UI key is overridden for non-base
targets. Fix until it prints 0 errors for every target. Then run the headless data smoke test pattern
(see `plan/multilingual_engine.md` / `plan/learn_catalan.md`) to confirm `useTarget("<l2>")` resolves
word/content/UI with no cross-course leakage. All JS must pass `node --check`.

### Phase 4 — Audio
`node scripts/build_manifest.js` (adds `<l2>` clips). Then generate with OmniVoice:
- Add a `SAY_REF["<l2>"] = ("<macOS voice>", "<a short L2 sentence>")` entry in
  `scripts/generate_audio_omnivoice.py` (find the macOS voice with `say -v '?'`).
- `bash scripts/generate_audio_omnivoice.sh --target <l2> --dry-run` then `--limit 3`, then the full run.
- If no browser TTS voice exists for the L2 (check the profile), recordings are required; otherwise TTS
  is the fallback.

### Phase 5 — Test & wrap up
Serve (`python3 -m http.server 8000`), and either drive a browser yourself or ask me to, to confirm:
onboarding lets me pick the new L2, the home/lesson/culture/phrasebook render, the mascot & flag show,
audio plays, gating/resume work. Update `plan/learn_<l2>.md` with a **Review** section and any
follow-ups (native review, audio, flag asset). Commit on a branch with `[No Ticket]` titles; don't push
unless I ask.

**Guardrails:** never rename a vocab id after audio exists; keep flavoured UI overrides complete (verify
enforces this); flag anything needing a native-speaker check rather than guessing; keep changes minimal
and mirror the existing course's conventions.

---
