# Language Profile Pipeline — two-step course creation

## TL;DR

Today `docs/curricula_creation_process.md` is one document that mixes **language-independent
pedagogy** (progression, scaffolding, exercise types, schema) with **Swedish-specific knowledge**
(the `sv` field, `en/ett` grammar, `å/ä/ö` transliteration, browser TTS assumptions). That makes a
new language pair expensive and error-prone: the reusable rules and the language facts are tangled.

This plan splits the process into **two steps driven by explicit documents**, so a new language pair
becomes: *(1) write the profile docs, (2) generate the course from profiles + generic rules.*

- **Step 1 — Profile the pair.** Produce two documents:
  - an **L2 Language Profile** (target facts: script, phonology, gender/formality, TTS, culture,
    transliteration) — L1-independent, reused across every mother tongue for that L2.
  - an **L1→L2 Contrastive Profile** (pair facts: cognates, false friends, sounds hard *for this L1*,
    grammar contrasts, translation/register guidance) — one per pair.
- **Step 2 — Generate the curriculum.** Author `data/*.js` by following one **generic rules file**
  (`docs/rules/curriculum_rules.md`) that is 100% language-independent and pulls every
  language-specific decision from the Step-1 profiles.

Deliverables of this plan: a `docs/README.md` orchestrator, the generic rules file, and two profile
templates. Then apply it to **Portuguese → Catalan** (Barcelona tourist).

---

## Why this shape

`content = f(profiles, generic_rules)`.

- Generic rules never change between languages → one reviewed source of pedagogical truth.
- Profiles hold everything that *does* change → a checklist, not a rediscovery, per language.
- The L2 vs L1→L2 split mirrors the existing i18n architecture (L2 content is shared; L1 is a layer),
  so the docs match the code's grain.

## File layout

```
docs/
  README.md                                   # NEW — the 2-step orchestrator + index
  curricula_creation_process.md               # KEEP — detailed reference / rationale / Swedish worked example
  rules/
    curriculum_rules.md                       # NEW — generic, language-independent pedagogy + generalized schema (Step 2 input)
  templates/
    L2_language_profile.template.md           # NEW — Step 1 output #1 template
    L1_to_L2_contrastive_profile.template.md  # NEW — Step 1 output #2 template
  profiles/
    <l2>/                                      # per-target folder (created when a language is added)
      L2_<l2>_language_profile.md             # filled Step-1 output #1
      <l1>-<l2>_contrastive_profile.md        # filled Step-1 output #2 (one per L1)
```

## Steps

- [x] Write `plan/language_profile_pipeline.md` (this doc)
- [x] Write `docs/rules/curriculum_rules.md` — distil the language-independent rules from the process doc; generalize schema (`l2` field, `assets/audio/<l2>/`)
- [x] Write `docs/templates/L2_language_profile.template.md`
- [x] Write `docs/templates/L1_to_L2_contrastive_profile.template.md`
- [x] Write `docs/README.md` — 2-step how-to, inputs/outputs, gates, PT→CA pointer
- [x] (Apply) Step 1 for PT→CA: fill `docs/profiles/ca/L2_ca_language_profile.md` + `docs/profiles/ca/pt-ca_contrastive_profile.md`
- [x] (Intermediate) Multilingual engine — see `plan/multilingual_engine.md` (field `sv→l2`, per-target data, parametrized audio/TTS). Done & verified.
- [x] (Apply) Step 2 for PT→CA: authored `data/*_ca.js` (`ca` course) + PT/EN packs, `registerTarget("ca")`,
      content+UI target-namespacing; verify 0 errors for sv+ca. See `plan/learn_catalan.md`.
      (Remaining: browser eyeball, native PT/CA review, `ca-ES` audio recordings.)

## Non-goals

- Rewriting the app code (`js/*.js`) — the `sv`→`l2` code generalization is tracked in
  `curricula_creation_process.md` §11 and is a separate implementation task.
- Deleting `curricula_creation_process.md` — it stays as the deep reference.

## Verification

- README's two steps each have a checklist and a definition of done.
- The generic rules file contains **no** language-specific literals (no `sv`, no `en/ett`).
- Templates have every section a downstream author needs, each with a one-line "why".
- Applying Step 1 to PT→CA produces two docs that answer every template section without gaps.
