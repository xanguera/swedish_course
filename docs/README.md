# Creating a new language — the 2-step process

This folder documents how to add a new language pair (**L1 → L2**) to the course engine.

The core idea: **separate what changes per language from what never changes.**

```
                 Step 1: PROFILE                        Step 2: GENERATE
                 ───────────────                        ────────────────
   brief ──▶  L2 Language Profile ────┐
                                      ├──▶  generic rules  ──▶  data/*.js course
   brief ──▶  L1→L2 Contrastive  ─────┘   (curriculum_rules.md)   + audio + i18n
              Profile
```

- **Language-dependent knowledge** lives in **profile documents** (Step 1 output).
- **Language-independent pedagogy** lives in **one generic rules file**, `rules/curriculum_rules.md`.
- Course content is then `content = f(profiles, generic_rules)` — Step 2.

Adding a language is therefore: **(1)** write two profile docs, **(2)** author the course by following
the generic rules, pulling every language-specific decision from the profiles. Adding a *new mother
tongue for an existing L2* skips straight to a translation pack (see "Adding another L1" below).

> **L1** = the learner's mother tongue (language of instruction). **L2** = the target being learned.
> Deep rationale, the schema, and the Swedish worked example: `curricula_creation_process.md`.

---

## Drive it with an LLM (the fast path)

You don't have to run the steps by hand. `prompts/new_language_pair.md` is a ready-to-paste prompt that
drives the **entire** job in a Claude Code session — brief → profiles → course → packs → verify → audio
→ test — pausing at checkpoints for your confirmation.

1. Open a fresh Claude Code session **at the repo root**.
2. Paste the contents of the `PROMPT` block in `docs/prompts/new_language_pair.md`.
3. Answer the Phase-0 brief questions (L1, L2, destination, scope, variants, mascot). The assistant then
   writes the profiles (pause for your review), authors the course + packs, verifies, generates audio,
   and helps you test.

Use it for a brand-new pair *or* for adding a new mother tongue to an existing course (it detects the
cheap path automatically). The prompt is just an operator wrapper around the same docs below — read them
if you want to understand or intervene.

---

## Files in this folder

| Path | Role | When it's written |
|---|---|---|
| `README.md` | This orchestrator | — |
| `prompts/new_language_pair.md` | **Paste-into-Claude prompt** that drives all phases | — |
| `curricula_creation_process.md` | Detailed reference / rationale / Swedish example | — |
| `rules/curriculum_rules.md` | **Generic, language-independent pedagogy + schema** (Step 2 input) | once, stable |
| `templates/L2_language_profile.template.md` | Template for the L2 profile | once, stable |
| `templates/L1_to_L2_contrastive_profile.template.md` | Template for the contrastive profile | once, stable |
| `profiles/<l2>/L2_<l2>_language_profile.md` | **Filled L2 profile** | Step 1, per L2 |
| `profiles/<l2>/<l1>-<l2>_contrastive_profile.md` | **Filled contrastive profile** | Step 1, per pair |

---

## Step 1 — Profile the pair

**Goal:** turn a one-paragraph brief into two decision records that contain every language-specific
choice, so Step 2 needs no further research.

**Inputs:** the brief — learners (ages, L1), destination/goal, target L2, scope, audio source.

**Do:**
1. Create `profiles/<l2>/`.
2. Copy `templates/L2_language_profile.template.md` → `profiles/<l2>/L2_<l2>_language_profile.md` and
   fill **every** section. This is L1-independent — it's reused by every mother tongue that learns L2.
3. Copy `templates/L1_to_L2_contrastive_profile.template.md` →
   `profiles/<l2>/<l1>-<l2>_contrastive_profile.md` and fill it for this specific L1.

**Definition of done (Step 1):**
- [ ] Both files have no unfilled section (every prompt answered or explicitly `n/a — reason`).
- [ ] The L2 profile fixes: regional variant, `id` transliteration rule, respelling convention for
      notes, the 2–4 light-grammar picks, TTS-voice availability, and a verified culture bank.
- [ ] The contrastive profile fixes: L1 regional variant, cognates/false-friends, which grammar is
      *new vs familiar* for this L1, and translation/register conventions.
- [ ] A native/bilingual check has cleared the "Open risks" sections.

---

## Step 2 — Generate the curriculum

**Goal:** author the actual course by following `rules/curriculum_rules.md`, resolving every
*"per the profile"* reference from the Step-1 documents.

**Inputs:** `rules/curriculum_rules.md` + the two profiles.

**Do** (this is the pipeline from `curricula_creation_process.md` §7, now profile-driven):
1. **Syllabus** — units → modules → lessons per generic rules §2–3; unit ordering & "locally-true"
   items come from the L2 profile's culture/lexical sections. Write it down first (a `plan/` doc).
2. **Vocabulary** (`data/vocab.js`) — ids via the L2 profile's transliteration rule; `note` uses its
   respelling convention; tag for distractors.
3. **Lessons** (`data/lessons.js`) — `teach` + mixed `exercises` + `culture` refs; light-grammar
   touches use the pair's *new-for-this-L1* picks (contrastive §6); fill-blanks per generic rules §5.
4. **Culture cards** (`data/culture.js`) — drawn only from the L2 profile's verified culture bank.
5. **Ordering** (`data/course.js`) — unit titles/icons/colours, module→lesson order.
6. **Source-language UI** (`data/i18n_<source>.js`) — register languages/targets + UI strings.
7. **L1 pack** (`data/i18n_<l1>.js`) — full `ui` + `content`, using the contrastive profile's
   translation/register guidance; add its `<script>` in `index.html`.
8. **Verify:** `node scripts/verify_content.js` → **0 errors**, plus the profile-driven manual checks
   (generic rules §8).
9. **Audio:** `node scripts/build_manifest.js` then a TTS/OmniVoice pass into `assets/audio/<l2>/`;
   if the profile says no browser voice exists, recordings are mandatory.
10. **Test:** headless jsdom play-through + phone-width screenshots; confirm resume/gating,
    missing-audio fallback, every L1 renders.

**Definition of done (Step 2):** verification passes with 0 errors; a full unit plays through on
desktop and phone; audio (or a confirmed fallback) works for every id.

---

## Adding another L1 to an existing L2 (cheap path)

No new course content — just a translation layer:
1. Write only the **contrastive profile** for the new pair (`<l1>-<l2>_contrastive_profile.md`); the
   L2 profile already exists.
2. Copy an existing `data/i18n_<code>.js` → `data/i18n_<newl1>.js`; translate **every** `ui` +
   `content` value per the new contrastive profile; register it and add its `<script>` tag.
3. `node scripts/verify_content.js` (fails on any missing key); play-test the new L1.

See `curricula_creation_process.md` §8 for the full checklist.

---

## Worked example: Portuguese → Catalan (Barcelona tourist)

We apply this process to build a beginner Catalan course for European-Portuguese-speaking visitors to
Barcelona.

- **Step 1** produces:
  - `profiles/ca/L2_ca_language_profile.md` — Central Catalan; `ç`/`l·l`/`à…ú` transliteration; schwa
    & open/closed vowels; `el/la` gender + `tu/vostè`; **Catalan/Spanish diglossia** framing;
    Barcelona culture bank; `ca-ES` TTS-voice check.
  - `profiles/pt/… ` → `profiles/ca/pt-ca_contrastive_profile.md` — European Portuguese; the large
    PT↔CA cognate set (easy wins), the false friends, PT-hard Catalan sounds (schwa, `l·l`), and which
    grammar is already familiar (gender, T–V) vs new (articles/contractions).
- **Step 2** then authors `data/*.js` + `assets/audio/ca/` following `rules/curriculum_rules.md`.

Status: framework in place; PT→CA Step 1 profiles are the next deliverable.
