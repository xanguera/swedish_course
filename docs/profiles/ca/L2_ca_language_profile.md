# L2 Language Profile — Catalan (`ca`)

> Target-language facts, independent of the mother tongue. Reused by every L1 that learns Catalan.
> Step-1 output. Consumed by Step 2 (`docs/rules/curriculum_rules.md`).

---

## 1. Identity & codes
- **Language name (English):** Catalan
- **Endonym:** català
- **BCP-47 / ISO code:** `ca` (`ca-ES`; Valencian is `ca-ES-valencia`)
- **Regional variant chosen & why:** **Central Catalan (*català central*)** — the spoken standard of
  Barcelona and the reference for the IEC written norm. Valencian, Balearic and North-Western forms
  are excluded (e.g. use *aquest*, not Valencian *este*).
- **Flag / emoji for the selector:** ⚠️ No standard emoji exists for the Catalan *senyera*. Options:
  a small bundled `senyera` image/SVG (preferred), or the Andorra flag 🇦🇩 (Catalan is Andorra's
  official language) as an emoji stand-in. See §10 / §11.

## 2. Writing system & orthography
- **Script:** Latin
- **Text direction:** LTR
- **Casing:** upper/lowercase. Lowercase for languages, nationalities, days and months
  (*dilluns*, *gener*, *català*).
- **Special characters / diacritics:** `à è é í ï ò ó ú ü ç`, the geminate **`l·l`** (*ela geminada*,
  written with a *punt volat* `·`), apostrophe elisions (*l'aigua*, *d'aquí*, *m'agrada*), and hyphens
  in enclitic pronouns (*dóna'm*, *anem-hi*).
- **`id` transliteration rule** (strip diacritics; `ç→c`; `l·l→ll`; drop apostrophes; spaces→`_`):
  | L2 word | id | rule shown |
  |---|---|---|
  | gràcies | `gracies` | à→a |
  | cafè | `cafe` | è→e |
  | adéu | `adeu` | é→e |
  | això | `aixo` | ò→o |
  | plaça | `placa` | ç→c |
  | si us plau | `si_us_plau` | spaces→_ |
  | l'aigua | `aigua` | drop `l'` elision (slug the head noun) |
  | novel·la | `novella` | l·l→ll |
  | vostè | `voste` | è→e |
- **Input notes:** the *punt volat* (`·`) and accented vowels need a Catalan/International keyboard;
  relevant only if typed-production exercises are added later (none in the current engine).

## 3. Phonology & pronunciation
- **Notably tricky sounds:**
  - **Vowel reduction (the hallmark):** unstressed *a/e* → schwa **[ə]**; unstressed *o* → **[u]**.
    (*Barcelona* ≈ "bər-sə-LOH-nə".)
  - **Open vs closed** *è/ò* **[ɛ]/[e]**, **[ɔ]/[o]** — meaning-bearing but low priority for beginners.
  - **`ll`** = palatal lateral **[ʎ]**; **`ny`** = **[ɲ]**; **`l·l`** = long/geminate *l* (colloquially
    often a plain [l]).
  - **`x`** is ambiguous: **[ʃ]** (*xocolata*, *caixa*) but **[ks]** (*taxi*, *èxit*); **`tx`**=[tʃ]
    (*cotxe*), final **`-ig`**=[tʃ] (*maig*), **`tg/tj`**=[dʒ] (*formatge*, *platja*).
  - **`j` / `g(e,i)`** = **[ʒ]**; **`ç` / `c(e,i)`** = [s]; intervocalic **`s`** = [z], **`ss`** = [s].
  - **Final-consonant devoicing** (-d→[t], -b→[p], -g→[k]) and frequently **silent final -r**
    (*carrer* ≈ "kə-RRÉ", *anar* ≈ "ə-NÁ").
- **Stress:** marked by the written accent when present; otherwise penultimate for words ending in a
  vowel / *-as* / *-es* / *-en*, final otherwise.
- **Respelling convention for `note`:** canonical source of truth = **light IPA in brackets**
  (e.g. *gràcies* [ˈɡɾasiəs]). Each L1 pack renders the learner-facing note in its own language and may
  substitute L1 sound-analogies (defined in that pair's contrastive profile) — but the underlying
  target pronunciation is this IPA.
- **Minimal pairs worth a drill (`listen_choose`):** open/closed *o* (*sóc* [o] vs *soc* — low
  priority); more useful: telling a Catalan word from the Spanish equivalent the learner also hears
  (*gràcies* vs *gracias*, *si us plau* vs *por favor*).
- **Connected speech:** heavy elision/liaison (*l'home*, *d'aquí*, *se'n va*); final consonants link
  to following vowels. Teach phrases as whole sound-units.

## 4. Grammar surface that shows up early
- **Noun gender:** masculine / feminine. **Definite:** *el / la* (→ *l'* before vowel/h), plural
  *els / les*. **Indefinite:** *un / una*, plural *uns / unes*.
- **Number / plural:** usually +*s* (*gat→gats*); feminine *-a→-es* (*dona→dones*); some *-os*
  (*gos→gossos*). Beginner: just recognize *-s / -es*.
- **Case system:** none.
- **Formality / T–V:** **tu** (informal) vs **vostè** (formal, takes 3rd-person verb, like Spanish
  *usted*). Tourist default: *tu* is widely acceptable in casual settings; *vostè* is the safe polite
  choice with strangers, elderly, formal service. Politeness mostly carried by *si us plau* / *gràcies*.
- **Question word order:** *On és…?* (Where is…?), *Quant costa…?* (How much…?), yes/no via *Que…?*
  or intonation (*Parla anglès?*). Question words: *On, Quant, Què, Com, Quan, Qui, Per què*.
- **Personal pronouns:** *jo, tu, ell/ella, vostè, nosaltres, vosaltres, ells/elles, vostès*.
- **Contractions (fused prep+article):** *a+el=**al***, *de+el=**del***, *per+el=**pel*** (and plurals
  *als, dels, pels*). Not with feminine. Visible immediately (*al costat de*, *del centre*).
- **Weak/clitic pronouns** (*em, et, es, hi, en, li*…) are famously complex — **teach only lexicalized
  ones as fixed phrases** (*em dic*, *es diu*, *m'agrada*, *hi ha*), never as a paradigm.

## 5. Light-grammar picks (2–4 for the whole course)
1. **Gender & articles** — *el/la*, *un/una* ("two flavours"). Highest frequency.
2. **Question openers** — fixed patterns *On és…?* / *Quant costa…?*.
3. **Contractions** — *al / del / pel* (*a+el* etc.), introduced when first met in a phrase.
   *(Optional 4th, if room:* fixed expressions *hi ha* / *m'agrada* as set phrases.)*

## 6. Register & sociolinguistics
- **Diglossic / co-official.** Catalan and Spanish are both official in Catalonia. In Barcelona Spanish
  is universally understood and often the default with foreigners; Catalan is the language of the
  region, schooling, public administration, signage/menus, and many locals' first language.
- **When the learner actually uses Catalan:** greetings, thanks, ordering, reading signs/menus. Service
  staff may reply in Spanish or English, but opening in Catalan signals respect and warmth and marks
  you as more than a passing tourist. **Value = courtesy, connection, cultural respect — not strict
  necessity.** Frame it honestly.
- **Politeness for a visitor:** friendly and light; *bon dia*, *si us plau*, *gràcies* go a long way.
- **Sensitivities:** Catalan is a **distinct Romance language, not a dialect of Spanish** — saying
  otherwise offends. Language is a point of pride with political dimensions (independence debate);
  keep framing cultural and positive, avoid politics.

## 7. Destination anchor & culture bank (Barcelona) — facts for culture cards
- **Rituals & etiquette:** greet *Bon dia* (morning) / *Bona tarda* (afternoon) / *Bona nit*
  (evening); two cheek kisses socially; late meals (*dinar* ~2pm, *sopar* ~9pm+); ask *El compte, si us
  plau* for the bill; tipping small/optional.
- **Café/bar ritual:** *un cafè* (espresso), ***un tallat*** (espresso with a little milk), *un cafè
  amb llet*, ***una canya*** (small draught beer), *un croissant*; *fer el vermut* (weekend pre-lunch
  vermouth).
- **Transport locals name:** el **Metro** (TMB, lines L1–L5…), **FGC**, **Rodalies** (commuter rail),
  **tramvia**, *autobús*, *Aerobús* (airport), the **T-casual / T-usual** travel cards, *Bicing* (bike
  share, residents only); useful words *bitllet*, *targeta*, *andana* (platform), *sortida* (exit).
- **Landmarks:** Sagrada Família, Park Güell, La Rambla, el Barri Gòtic, La Boqueria, Passeig de
  Gràcia, Casa Batlló, La Pedrera, Montjuïc, el Tibidabo, la Barceloneta, Camp Nou, Plaça de Catalunya.
- **Food & drink:** ***pa amb tomàquet***, *botifarra*, *escalivada*, *calçots* (seasonal Jan–Apr,
  with *romesco*), *crema catalana*, *coca*, *cava*, *vermut*, *fideuà*, *esqueixada*, *allioli*,
  *panellets* (Tots Sants), *tortell de Reis* (6 Jan), *torró* (Christmas).
- **Holidays / seasonal:** ***Sant Jordi*** (23 Apr — roses & books), ***La Mercè*** (24 Sep —
  Barcelona's big festival: *castellers*, *correfoc*, *gegants*), ***Sant Joan*** (23 Jun — bonfires &
  firecrackers), *Diada* (11 Sep), *Caga Tió* & *Reis* (Christmas).
- **"Did you know?" candidates:**
  1. **Sant Jordi** — 23 Apr, lovers swap a rose and a book; the dragon-and-knight legend.
  2. **Castellers** — human towers, UNESCO Intangible Heritage.
  3. **Pa amb tomàquet** — bread rubbed with tomato, oil and salt; the everyday Catalan staple.
  4. **La Mercè** — the city's biggest festival, with *correfoc* (fire-runs).
  5. **Caga Tió** — the Christmas log that "delivers" presents when children beat it.
  6. **Gaudí & modernisme** — the Sagrada Família, begun 1882, is still unfinished.
  7. **Calçots** — grilled spring onions dipped in *romesco*; a bib is mandatory.
  8. **Vermut** — the weekend "*fer el vermut*" aperitif ritual.
  9. **Sant Joan** — bonfires, *coca* and fireworks on the shortest night.
  10. **FC Barcelona** — "*més que un club*" (more than a club).
  11. **Two languages** — Catalan is its own Romance language, co-official with Spanish.

## 8. Lexical selection guidance
- **Must-have survival items:** *Hola, Bon dia, Bona tarda, Bona nit, Adéu, Si us plau, Gràcies, De
  res, Perdó/Perdoni, Sí, No, Parla anglès?, No parlo català, Quant costa?, On és…?, El compte si us
  plau, M'agrada, Un cafè si us plau*.
- **Prefer (locally true):** *tallat* (not *cortado*), *adéu*, Catalan transport terms (*bitllet,
  targeta, andana, sortida*), *carrer / plaça / passeig*.
- **De-prioritize / avoid for beginners:** clitic-pronoun paradigms, subjunctive, Valencian forms,
  heavy *vostè* drilling beyond one touch.

## 9. Audio & TTS
- **Browser `ca-ES` voice exists?** **Partially.** Apple platforms ship a `ca-ES` voice
  ("Montserrat"); coverage is spotty on Chrome/Windows/Android (may fall back to Spanish or silence).
  → **Do not rely on the browser fallback; recorded/synth clips are effectively mandatory** for a good
  experience (generic rules §7).
- **Reference-clip source:** macOS `say -v Montserrat` (ca_ES) for an OmniVoice reference, or a human
  reference clip.
- **TTS gotchas to QA:** schwa reduction, open/closed vowels, `l·l`, the `x`=[ʃ]/[ks] split, silent
  final *-r*, and place-name pronunciation.

## 10. Visuals / emoji notes
- **Selector flag:** no *senyera* emoji — use a bundled image or 🇦🇩 stand-in (§1).
- **Emoji-resistant concepts & fallbacks:** *pa amb tomàquet* 🍅🥖, *tallat* ☕, *canya* 🍺, *calçots*
  🧅, *castellers* 🤸, *correfoc* 🔥, *vermut* 🍷, *Sant Jordi* 🌹📖.

## 11. Open risks & notes
- Decide the selector flag asset for Catalan (senyera image vs 🇦🇩).
- Native-speaker check on pronunciation notes and place-name TTS output.
- Confirm `ca-ES` TTS coverage on the devices you actually target; plan recordings accordingly.
