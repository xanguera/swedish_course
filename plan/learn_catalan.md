# Step 2 — Portuguese → Catalan course (Barcelona tourist)

## TL;DR

Author a beginner **Catalan** course for European-Portuguese-speaking visitors to Barcelona, following
`docs/rules/curriculum_rules.md` and the two profiles in `docs/profiles/ca/`. Because the app now hosts
courses per target, this is *additive* — except one necessary engine change: **content and the
course-flavoured UI strings must be namespaced by target** (lesson/unit/module ids `l01`/`u1`/`m1` and
the mascot/hero/culture strings collide with Swedish otherwise).

Deliverables: `data/vocab_ca.js`, `lessons_ca.js`, `course_ca.js`, `culture_ca.js` (target `ca`, English
inline); a European-Portuguese pack for the `ca` course; EN/PT UI overrides; `registerTarget("ca", …)`;
a per-target mascot; verify + audio + test.

## Engine changes this step needs (i18n target-namespacing)

1. **Content by target:** `I.content[l1]` → `I.content[l1][l2]`. `registerContent(l1, l2, obj)`.
   Update lookups in `js/i18n.js` (`word`, `lessonEntry`, `unitTitle`, `moduleTitle`, `cultureTitle`,
   `cultureBody`, `fillHint`) to read the active `[L1][L2]` bucket. Update `data/i18n_pt.js` call to
   `registerContent("pt", "sv", …)`.
2. **Course-flavoured UI by target:** add `I.registerUITarget(l1, l2, obj)` + `I.uiTarget[l1][l2]`.
   `I.t()` resolves: `uiTarget[L1][L2]` → `ui[L1]` → `uiTarget[en][L2]` → `ui[en]` → key. Move the
   ~11 course-specific keys (hero_hi_t/s, hero_keep_t, hero_done_t, audio_tip, made_with,
   culture_title, culture_sub, welcome_title, welcome_sub, celebrate_t) out of `ui[*]` into
   `uiTarget[*][sv]`, so each course supplies its own.
3. **Per-target mascot:** target registry gains `mascot` (emoji) + `mascotName`. `moose()` in app.js
   renders the built-in SVG for `sv`, else the target's mascot emoji. (sv keeps Älgot the moose.)
4. **verify_content.js:** loop over `Object.keys(LSV.data.courses)`, `useTarget(code)`, and run the
   existing checks per target (each L1 pack must fully cover each course).

## Course brief (from the profiles)

- **Learners:** European-Portuguese speakers, adults + confident kids, short Barcelona trip.
- **L2:** Central Catalan (`ca`, `ca-ES`). **Mascot:** 🐉 **en Drac** (Park Güell lizard / Sant Jordi
  dragon — a Catalan double-hook). **Selector flag:** `🟨🟥` (senyera stand-in; no emoji exists).
- **Scope:** 6 units, 18 lessons, ~94 vocab, 12 culture cards — mirror the Swedish structure and ids.

## Syllabus (units → modules → lessons) — ids mirror the sv course

- **u1 Survival basics** — m1 Greetings (l01 hello, l02 thanks/yes/no), m2 Politeness (l03 sorry/excuse,
  l04 first phrases: do you speak English / I don't understand / my name is)
- **u2 Meeting people** — m3 You & me (l05 pronouns, l06 family), m4 Small talk (l07 how are you / where
  from)
- **u3 Numbers & shopping** — m5 Counting (l08 0–10, l09 11–100), m6 Shopping (l10 how much/money,
  l11 "I'd like this" + gender el/la)
- **u4 Food & local ritual** — m7 Café/vermut (l12 coffee & bar, l13 ordering — fill "Un cafè, si us
  plau"), m8 Meals (l14 meals & drinks)
- **u5 Getting around** — m9 Transport & directions (l15 metro/transport, l16 directions — fill "On és
  el metro?")
- **u6 Sightseeing** — m10 Around Barcelona (l17 places, l18 useful questions — fill "On és el lavabo?")

## Light-grammar picks (per L2 profile §5, narrowed by contrastive §6)

Gender & articles **el/la, un/una**; question openers **On és…? / Quant costa…?**; contractions
**al/del** — all *familiar concepts* for a PT speaker, so taught as light "Catalan forms" touches.

## Vocabulary id convention (per L2 profile §2 transliteration)

Catalan slug, ASCII, no diacritics, `ç→c`, `l·l→ll`, drop apostrophes, spaces→`_`. E.g. `hola`,
`bon_dia`, `si_us_plau`, `gracies`, `adeu`, `cafe`, `un_cafe_si_us_plau`, `on_es`, `quant_costa`.

## Steps

- [x] Engine: content+UI target-namespacing (`content[l1][l2]`, `registerUITarget`), per-target mascot,
      verify loop over all courses (§ above)
- [x] `data/vocab_ca.js` — 94 items, Catalan `l2` + IPA + English inline `en` + note + tags
- [x] `data/lessons_ca.js` — teach + mixed exercises + culture refs + 3 fill-blanks (en hints)
- [x] `data/course_ca.js` — units/modules order, icons, colours
- [x] `data/culture_ca.js` — 12 Barcelona "Sabies que?" cards (from L2 profile §7 bank)
- [x] `data/i18n_ca_pt.js` — European-Portuguese pack for the ca course (content + UI overrides)
- [x] `data/i18n_ca.js` — `registerTarget("ca",…)` + EN UI overrides (`registerUITarget("en","ca",…)`)
- [x] `index.html` — include the new scripts
- [x] Verify (0 errors, 2 targets), regenerate manifest (188 clips), smoke test

## Review (done)

- `node scripts/verify_content.js` → **0 errors** for both sv and ca: all references resolve, PT fully
  covers the ca course, and every course-flavoured UI key is overridden for ca (no Swedish leaks).
- Extended smoke test: `useTarget("ca")` → 94/6/12; `word("hola").l2==="hola"`; PT terms resolve
  (`tallat`→"garoto / pingo", `tren`→"comboio"); target-scoped UI resolves (`welcome_title`→
  "Benvinguts!", `celebrate_t`→"Molt bé!"); São João hook present; mascot 🐉; Swedish intact after.
- All 19 touched/new JS files pass `node --check`.
- Manifest: 188 clips (94 sv + 94 ca); sv paths unchanged; ca paths `assets/audio/ca/…`. Offline
  pre-cache tolerates the not-yet-recorded ca clips (`cache.add().catch()`), so no regression.

## Remaining (not blockers, follow-ups)

- **Browser eyeball:** no jsdom/Playwright available in this env; open the app, pick *Català*, and
  visually confirm the 🐉 mascot sizing, the 🟨🟥 flag stand-in, and a full unit play-through.
- **Native PT/CA review** (profiles' open risks): false-friend list, EP equivalences
  (garoto/imperial), and place-name pronunciation.
- **`ca-ES` audio:** browser voice is unreliable (L2 profile §9) → record/synthesize the 94 ca clips
  (`assets/audio/ca/`); TTS is the interim fallback. Consider a proper senyera flag asset.
