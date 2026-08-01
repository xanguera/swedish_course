# L2 Language Profile — `<L2 name>` (`<code>`)

> **What this is.** Everything the curriculum needs to know about the **target language itself**,
> independent of any mother tongue. Filled once per L2 and reused for every L1 that learns it.
> Output of Step 1. Consumed by Step 2 (`docs/rules/curriculum_rules.md`).
>
> **How to fill.** Answer every section. If a section doesn't apply, write "n/a — <reason>" (don't
> delete it — a downstream author needs to know it was considered). Keep it factual and concrete;
> this is a decision record, not prose. Delete these blockquotes when filling.

---

## 1. Identity & codes
- **Language name (English):**
- **Endonym (native name):**
- **BCP-47 / ISO code:** `<code>` (e.g. `ca`, `sv`, `ja`)
- **Regional variant chosen & why:** (e.g. *Central Catalan — the Barcelona standard*; Valencian/Balearic excluded)
- **Flag / emoji for the selector:**

## 2. Writing system & orthography
- **Script:** (Latin / Cyrillic / Arabic / Hanzi / … )
- **Text direction:** LTR / RTL / vertical — *if not LTR, note layout & font implications.*
- **Casing:** has upper/lowercase? capitalization conventions (nouns, days, months, "I")?
- **Special characters / diacritics used:** (list them, e.g. `à è é í ï ò ó ú ü ç l·l`)
- **`id` transliteration rule** (how special letters become ASCII in vocab ids — *this is the
  per-language rule §6 of the generic rules defers to*). Give the mapping + examples:
  | L2 letter | id spelling | example word → id |
  |---|---|---|
  |  |  |  |
- **Input notes:** anything special for typing the language (dead keys, IMEs) — relevant only if you
  later add typed-production exercises.

## 3. Phonology & pronunciation
- **Sounds that are notably tricky or non-obvious from spelling:** (list, with a plain description)
- **Stress / tone / vowel-length rules** a beginner must know:
- **Respelling convention for the `note` field** — pick ONE and use it consistently across all vocab
  notes (plain-English respelling *or* IPA). Give 3 examples in the chosen convention.
- **Minimal pairs worth an ear-training drill** (feeds `listen_choose`): (optional list)
- **Reduction/liaison/sandhi** that changes how words sound in connected speech (phrases):

## 4. Grammar surface that shows up early
Only what a *beginner tourist* meets in the first ~100 words. For each: present? and how it surfaces.
- **Noun gender:** (none / masc-fem / masc-fem-neut …) and the articles (definite/indefinite):
- **Number / plural formation** (enough to recognize):
- **Case system** (if any) — which cases a beginner can't avoid:
- **Verb formality / T–V distinction** (informal vs polite "you") — what a tourist should default to:
- **Question word order** (the pattern to teach): e.g. "Where is…?", "How much is…?"
- **Personal pronouns** (the set to teach):
- **Contractions / fused forms** a beginner will see (e.g. preposition+article):

## 5. Light-grammar picks (2–4 patterns for the whole course)
Choose the 2–4 gentle patterns to teach (generic rules §5). Bias toward high-frequency, tourist-useful
features. List them in the order they should appear:
1.
2.
3.

## 6. Register & sociolinguistics
- **Monolingual, or diglossic / co-official / minority?** (Is another language dominant in daily use?)
- **When will the learner actually use the L2 vs. a fallback language?** Be honest — this drives the
  value framing and the culture cards.
- **Politeness expectations for a visitor** (how formal by default):
- **Any sensitivities** (identity, politics of the language) worth handling with care:

## 7. Destination anchor & culture bank
Raw material for culture cards and for choosing "locally-true" vocab. Every fact here must be
**verified** (cite where useful) — culture cards draw only from this bank.
- **Destination (city/region):**
- **Local rituals & etiquette** (greetings, café/meal customs, tipping, queueing):
- **Transport the destination actually uses** (names locals say):
- **Real landmarks / places** worth naming:
- **Food & drink** a visitor will meet:
- **Holidays / seasonal notes** relevant to the trip window:
- **Fun "did you know?" facts** (5–12 candidates), each 1–2 sentences, with the key L2 word:

## 8. Lexical selection guidance
- **Must-have survival words/phrases** specific to this language/place:
- **Words to prefer** because they're what locals really say (vs textbook forms):
- **Words to avoid / de-prioritize** for a beginner tourist:

## 9. Audio & TTS
- **Browser speech-synthesis voice for `<code>` exists?** yes/no — *if no, recordings are mandatory
  (generic rules §7).*
- **Quality of that voice** (if any):
- **OmniVoice / recording plan:** reference-clip source for a consistent voice (OS voice? a supplied
  `--ref-audio`? a human reference?):
- **Pronunciation gotchas the TTS gets wrong** (so we can catch them in QA):

## 10. Visuals / emoji notes
- **Concepts in this course that resist a clear emoji** and the agreed fallback:
- **Culture-specific emoji choices** (a symbol locals would recognize):

## 11. Open risks & notes
- Anything unresolved, ambiguous, or needing a native-speaker check before Step 2:
