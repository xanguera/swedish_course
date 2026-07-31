/* vocab.js — master word/phrase list (source of truth).
   Each entry: id, sv (Swedish), en (English), ipa (IPA transcription),
   img (emoji), note, tags.
   The audio file for an item is assets/audio/sv/<id>.mp3 (optional;
   falls back to browser Swedish speech). Add/edit freely. */
(function () {
  "use strict";
  var V = {};
  function add(o) { V[o.id] = o; }

  /* ============================ UNIT 1 — Survival basics ============ */
  add({ id: "hej",            sv: "hej",            en: "hi / hello",             ipa: "hɛj",                        img: "👋", note: "The all-purpose greeting, any time of day.", tags: ["u1","greetings"] });
  add({ id: "god_morgon",     sv: "god morgon",     en: "good morning",           ipa: "ɡuːd ˈmɔrːɔn",               img: "🌅", note: "Used until about 10–11 a.m.", tags: ["u1","greetings"] });
  add({ id: "god_kvall",      sv: "god kväll",      en: "good evening",           ipa: "ɡuːd ˈkvɛlː",                img: "🌆", note: "'kväll' = evening. The ä sounds like 'e' in 'bed'.", tags: ["u1","greetings"] });
  add({ id: "hej_da",         sv: "hej då",         en: "goodbye",                ipa: "hɛj ˈdɔː",                   img: "🖐️", note: "The everyday 'bye'. 'å' sounds like 'oa' in 'oar'.", tags: ["u1","greetings"] });
  add({ id: "tack",           sv: "tack",           en: "thank you",              ipa: "tak",                        img: "🙏", note: "Also means 'please' when ordering: 'en kaffe, tack'.", tags: ["u1","politeness"] });
  add({ id: "tack_sa_mycket", sv: "tack så mycket", en: "thank you very much",    ipa: "tak sɔ ˈmʏkːə",              img: "💐", note: "A warmer, fuller thanks.", tags: ["u1","politeness"] });
  add({ id: "varsagod",       sv: "varsågod",       en: "you're welcome / here you go", ipa: "ˌvasːɔˈɡuːd",          img: "🤲", note: "Said when giving something or replying to thanks.", tags: ["u1","politeness"] });
  add({ id: "ja",             sv: "ja",             en: "yes",                    ipa: "jaː",                        img: "✅", note: "Sounds like 'yah'.", tags: ["u1","politeness"] });
  add({ id: "nej",            sv: "nej",            en: "no",                     ipa: "nɛj",                        img: "🚫", note: "Sounds like 'ney'.", tags: ["u1","politeness"] });
  add({ id: "ursakta",        sv: "ursäkta",        en: "excuse me / sorry",      ipa: "ʉːˈʂɛkta",                   img: "🙋", note: "To get attention or squeeze past someone.", tags: ["u1","politeness"] });
  add({ id: "forlat",         sv: "förlåt",         en: "sorry (apology)",        ipa: "fœrˈlɔːt",                   img: "😟", note: "A real apology, stronger than 'ursäkta'.", tags: ["u1","politeness"] });
  add({ id: "snalla",         sv: "snälla",         en: "please (pleading)",      ipa: "ˈsnɛlːa",                    img: "🥺", note: "Used when really asking a favour.", tags: ["u1","politeness"] });
  add({ id: "talar_du_engelska", sv: "Talar du engelska?", en: "Do you speak English?", ipa: "ˈtɑːlar dʉ ˈɛŋɛlska", img: "🗣️", note: "Your lifesaver phrase — most Swedes do!", tags: ["u1","phrases"] });
  add({ id: "jag_forstar_inte",  sv: "Jag förstår inte",   en: "I don't understand",    ipa: "jɑː fœˈʂtɔːr ˈɪntɛ",  img: "🤔", note: "'inte' = not.", tags: ["u1","phrases"] });
  add({ id: "jag_heter",         sv: "Jag heter…",         en: "My name is…",           ipa: "jɑː ˈheːtɛr",         img: "🪪", note: "'heter' = am called. Add your name after.", tags: ["u1","phrases"] });

  /* ============================ UNIT 2 — Meeting people ============= */
  add({ id: "jag",  sv: "jag", en: "I",   ipa: "jɑː",  img: "🙋", note: "Pronounced 'yah'.", tags: ["u2","people"] });
  add({ id: "du",   sv: "du",  en: "you", ipa: "dʉː",  img: "👉", note: "Swedes use the informal 'du' with almost everyone.", tags: ["u2","people"] });
  add({ id: "han",  sv: "han", en: "he",  ipa: "han",  img: "👦", note: "", tags: ["u2","people"] });
  add({ id: "hon",  sv: "hon", en: "she", ipa: "hɔn",  img: "👧", note: "", tags: ["u2","people"] });
  add({ id: "vad_heter_du", sv: "Vad heter du?", en: "What's your name?", ipa: "vɑː ˈheːtɛr dʉː", img: "❓", note: "Reply with 'Jag heter…'.", tags: ["u2","phrases"] });
  add({ id: "mamma",  sv: "mamma",  en: "mom",     ipa: "ˈmamːa",  img: "👩", note: "", tags: ["u2","family"] });
  add({ id: "pappa",  sv: "pappa",  en: "dad",     ipa: "ˈpapːa",  img: "👨", note: "", tags: ["u2","family"] });
  add({ id: "syster", sv: "syster", en: "sister",  ipa: "ˈsʏstɛr", img: "👧", note: "", tags: ["u2","family"] });
  add({ id: "bror",   sv: "bror",   en: "brother", ipa: "broːr",   img: "👦", note: "", tags: ["u2","family"] });
  add({ id: "familj", sv: "familj", en: "family",  ipa: "faˈmilj", img: "👪", note: "The 'j' sounds like English 'y'.", tags: ["u2","family"] });
  add({ id: "hur_mar_du", sv: "Hur mår du?", en: "How are you?", ipa: "hʉːr mɔːr dʉː", img: "😊", note: "'mår' = feel/fare.", tags: ["u2","phrases"] });
  add({ id: "bra", sv: "bra", en: "good / fine", ipa: "brɑː", img: "👍", note: "Reply: 'Bra, tack!' = Fine, thanks!", tags: ["u2","phrases"] });
  add({ id: "var_kommer_du_ifran", sv: "Var kommer du ifrån?", en: "Where are you from?", ipa: "vɑːr ˈkɔmːɛr dʉː ɪˈfrɔːn", img: "🌍", note: "", tags: ["u2","phrases"] });
  add({ id: "jag_kommer_fran", sv: "Jag kommer från…", en: "I come from…", ipa: "jɑː ˈkɔmːɛr frɔːn", img: "🧭", note: "Add your country: '…Spanien / Katalonien'.", tags: ["u2","phrases"] });

  /* ============================ UNIT 3 — Numbers, money & shopping = */
  add({ id: "noll",  sv: "noll",  en: "zero",  ipa: "nɔlː",       img: "0", note: "", tags: ["u3","numbers"] });
  add({ id: "ett",   sv: "ett",   en: "one",   ipa: "ɛtː",        img: "1", note: "Also the 'ett-word' article.", tags: ["u3","numbers"] });
  add({ id: "tva",   sv: "två",   en: "two",   ipa: "tvoː",       img: "2", note: "", tags: ["u3","numbers"] });
  add({ id: "tre",   sv: "tre",   en: "three", ipa: "treː",       img: "3", note: "", tags: ["u3","numbers"] });
  add({ id: "fyra",  sv: "fyra",  en: "four",  ipa: "ˈfyːra",     img: "4", note: "", tags: ["u3","numbers"] });
  add({ id: "fem",   sv: "fem",   en: "five",  ipa: "fɛm",        img: "5", note: "", tags: ["u3","numbers"] });
  add({ id: "sex",   sv: "sex",   en: "six",   ipa: "sɛks",       img: "6", note: "", tags: ["u3","numbers"] });
  add({ id: "sju",   sv: "sju",   en: "seven", ipa: "ɧʉː",        img: "7", note: "The 'sju' sound is a soft 'hw' — very Swedish!", tags: ["u3","numbers"] });
  add({ id: "atta",  sv: "åtta",  en: "eight", ipa: "ˈɔtːa",      img: "8", note: "", tags: ["u3","numbers"] });
  add({ id: "nio",   sv: "nio",   en: "nine",  ipa: "ˈniːɔ",      img: "9", note: "", tags: ["u3","numbers"] });
  add({ id: "tio",   sv: "tio",   en: "ten",  ipa: "ˈtiːɔ",      img: "10", note: "", tags: ["u3","numbers"] });
  add({ id: "elva",    sv: "elva",    en: "eleven",    ipa: "ˈɛlːva",   img: "11", note: "", tags: ["u3","numbers2"] });
  add({ id: "tolv",    sv: "tolv",    en: "twelve",    ipa: "tɔlv",     img: "12", note: "", tags: ["u3","numbers2"] });
  add({ id: "tretton", sv: "tretton", en: "thirteen",  ipa: "ˈtrɛtːɔn", img: "13", note: "-ton = teen.", tags: ["u3","numbers2"] });
  add({ id: "fjorton", sv: "fjorton", en: "fourteen",  ipa: "ˈfjʊrtɔn", img: "14", note: "", tags: ["u3","numbers2"] });
  add({ id: "femton",  sv: "femton",  en: "fifteen",   ipa: "ˈfɛmtɔn",  img: "15", note: "", tags: ["u3","numbers2"] });
  add({ id: "sexton",  sv: "sexton",  en: "sixteen",   ipa: "ˈsɛkstɔn", img: "16", note: "", tags: ["u3","numbers2"] });
  add({ id: "sjutton", sv: "sjutton", en: "seventeen", ipa: "ˈɧɵtːɔn",  img: "17", note: "", tags: ["u3","numbers2"] });
  add({ id: "arton",   sv: "arton",   en: "eighteen",  ipa: "ˈɑːʈɔn",   img: "18", note: "", tags: ["u3","numbers2"] });
  add({ id: "nitton",  sv: "nitton",  en: "nineteen",  ipa: "ˈnitːɔn",  img: "19", note: "", tags: ["u3","numbers2"] });
  add({ id: "tjugo",   sv: "tjugo",   en: "twenty",    ipa: "ˈɕʉːɡʊ",   img: "20", note: "The 'tj' is a soft 'sh/ch' sound.", tags: ["u3","numbers2"] });
  add({ id: "trettio", sv: "trettio", en: "thirty",    ipa: "ˈtrɛtːiɔ", img: "30", note: "", tags: ["u3","numbers2"] });
  add({ id: "fyrtio",  sv: "fyrtio",  en: "forty",     ipa: "ˈfœʈːiɔ",  img: "40", note: "", tags: ["u3","numbers2"] });
  add({ id: "hundra",  sv: "hundra",  en: "hundred",  ipa: "ˈhɵndra",  img: "💯", note: "'ett hundra' = one hundred.", tags: ["u3","numbers2"] });
  add({ id: "hur_mycket_kostar_det", sv: "Hur mycket kostar det?", en: "How much is it?", ipa: "hʉːr ˈmʏkːɛ ˈkɔstar deː", img: "💰", note: "Your key shopping question.", tags: ["u3","shopping","phrases"] });
  add({ id: "kronor", sv: "kronor", en: "kronor (SEK)", ipa: "ˈkruːnɔr", img: "💵", note: "Sweden's currency. 1 krona, many kronor.", tags: ["u3","shopping"] });
  add({ id: "dyrt",   sv: "dyrt",   en: "expensive",   ipa: "dyːʈ",      img: "💸", note: "", tags: ["u3","shopping"] });
  add({ id: "billigt", sv: "billigt", en: "cheap",     ipa: "ˈbilːɪkt",  img: "🏷️", note: "", tags: ["u3","shopping"] });
  add({ id: "jag_vill_ha", sv: "Jag vill ha…", en: "I want…", ipa: "jɑː vɪl hɑː", img: "🫴", note: "'ha' = to have. Add what you want.", tags: ["u3","shopping","phrases"] });
  add({ id: "en", sv: "en", en: "a / an (en-word)", ipa: "eːn", img: "🔵", note: "About 75% of nouns are 'en' words: en bulle, en buss.", tags: ["u3","grammar"] });
  add({ id: "ett_art", sv: "ett", en: "a / an (ett-word)", ipa: "ɛtː", img: "🟠", note: "The rest are 'ett' words: ett tåg, ett foto.", tags: ["u3","grammar"] });
  add({ id: "det_har", sv: "det här", en: "this (one)", ipa: "deː hɛːr", img: "👇", note: "Point and say it while shopping.", tags: ["u3","shopping"] });

  /* ============================ UNIT 4 — Food & fika ================ */
  add({ id: "kaffe",      sv: "kaffe",      en: "coffee",        ipa: "ˈkafːɛ",        img: "☕", note: "The fuel of Swedish life.", tags: ["u4","drink","fika"] });
  add({ id: "te",         sv: "te",         en: "tea",           ipa: "teː",           img: "🍵", note: "", tags: ["u4","drink","fika"] });
  add({ id: "bulle",      sv: "bulle",      en: "bun",           ipa: "ˈbɵlːɛ",        img: "🥯", note: "A sweet bun.", tags: ["u4","food","fika"] });
  add({ id: "kanelbulle", sv: "kanelbulle", en: "cinnamon bun",  ipa: "kaˈneːlˌbɵlːɛ",  img: "🥐", note: "The star of Swedish fika. 'kanel' = cinnamon.", tags: ["u4","food","fika"] });
  add({ id: "kaka",       sv: "kaka",       en: "cookie / cake", ipa: "ˈkɑːka",        img: "🍪", note: "", tags: ["u4","food","fika"] });
  add({ id: "jag_skulle_vilja_ha", sv: "Jag skulle vilja ha…", en: "I would like…", ipa: "jɑː ˈskɵlːɛ ˈvɪlja hɑː", img: "🙏", note: "Politer than 'jag vill ha'.", tags: ["u4","food","phrases"] });
  add({ id: "en_kaffe_tack", sv: "En kaffe, tack", en: "A coffee, please", ipa: "eːn ˈkafːɛ tak", img: "☕", note: "Simple café ordering.", tags: ["u4","food","phrases"] });
  add({ id: "frukost", sv: "frukost", en: "breakfast", ipa: "ˈfrʉːkɔst", img: "🍳", note: "", tags: ["u4","food"] });
  add({ id: "lunch",   sv: "lunch",   en: "lunch",     ipa: "lɵnʃ",      img: "🥪", note: "", tags: ["u4","food"] });
  add({ id: "middag",  sv: "middag",  en: "dinner",    ipa: "ˈmɪdːaɡ",   img: "🍽️", note: "Also means 'midday' historically, but today = dinner.", tags: ["u4","food"] });
  add({ id: "vatten",  sv: "vatten",  en: "water",     ipa: "ˈvatːɛn",   img: "💧", note: "Tap water is excellent and free.", tags: ["u4","drink"] });
  add({ id: "mjolk",   sv: "mjölk",   en: "milk",      ipa: "mjœlk",     img: "🥛", note: "'mj' sounds like 'my'.", tags: ["u4","drink"] });
  add({ id: "notan_tack", sv: "Notan, tack", en: "The bill, please", ipa: "ˈnuːtan tak", img: "🧾", note: "Ask for this at a restaurant.", tags: ["u4","food","phrases"] });
  add({ id: "smaklig_maltid", sv: "Smaklig måltid", en: "Enjoy your meal", ipa: "ˈsmɑːklɪɡ ˈmoːltiːd", img: "😋", note: "Sweden's 'bon appétit'.", tags: ["u4","food","phrases"] });

  /* ============================ UNIT 5 — Getting around ============ */
  add({ id: "tunnelbana", sv: "tunnelbana", en: "metro / subway", ipa: "ˈtɵnːɛlˌbɑːna", img: "🚇", note: "Locals call it 'T-bana'.", tags: ["u5","transport"] });
  add({ id: "buss",       sv: "buss",       en: "bus",            ipa: "bɵsː",          img: "🚌", note: "", tags: ["u5","transport"] });
  add({ id: "tag",        sv: "tåg",        en: "train",          ipa: "toːɡ",          img: "🚆", note: "An 'ett' word: ett tåg.", tags: ["u5","transport"] });
  add({ id: "sparvagn",   sv: "spårvagn",   en: "tram",           ipa: "ˈspoːrvaŋn",    img: "🚊", note: "Line 7 goes to Djurgården.", tags: ["u5","transport"] });
  add({ id: "biljett",    sv: "biljett",    en: "ticket",         ipa: "bɪlˈjɛtː",      img: "🎫", note: "Buy the SL app before you ride.", tags: ["u5","transport"] });
  add({ id: "var_ar",   sv: "Var är…?", en: "Where is…?", ipa: "vɑːr ɛː", img: "📍", note: "Follow with a place.", tags: ["u5","directions","phrases"] });
  add({ id: "till",     sv: "till",     en: "to",   ipa: "tɪlː",  img: "➡️", note: "", tags: ["u5","directions"] });
  add({ id: "fran",     sv: "från",     en: "from", ipa: "frɔːn", img: "⬅️", note: "", tags: ["u5","directions"] });
  add({ id: "hoger",    sv: "höger",    en: "right", ipa: "ˈhøːɡɛr",  img: "👉", note: "", tags: ["u5","directions"] });
  add({ id: "vanster",  sv: "vänster",  en: "left",  ipa: "ˈvɛnstɛr", img: "👈", note: "", tags: ["u5","directions"] });
  add({ id: "rakt_fram", sv: "rakt fram", en: "straight ahead", ipa: "rɑːkt fram", img: "⬆️", note: "", tags: ["u5","directions"] });

  /* ============================ UNIT 6 — Sightseeing =============== */
  add({ id: "gamla_stan", sv: "Gamla stan", en: "the Old Town", ipa: "ˈɡamːla staːn", img: "🏘️", note: "Stockholm's beautiful medieval centre.", tags: ["u6","places"] });
  add({ id: "slottet",    sv: "slottet",    en: "the palace",   ipa: "ˈslɔtːɛt",      img: "🏰", note: "The Royal Palace — see the guard change!", tags: ["u6","places"] });
  add({ id: "museet",     sv: "museet",     en: "the museum",   ipa: "mʉˈseːɛt",      img: "🏛️", note: "Vasa and Skansen are must-sees.", tags: ["u6","places"] });
  add({ id: "kyrka",      sv: "kyrka",      en: "church",       ipa: "ˈɕʏrka",        img: "⛪", note: "", tags: ["u6","places"] });
  add({ id: "torg",       sv: "torg",       en: "square",       ipa: "tɔrj",          img: "⛲", note: "Stortorget is the main square in Gamla stan.", tags: ["u6","places"] });
  add({ id: "oppettider", sv: "öppettider", en: "opening hours", ipa: "ˈœpːɛtˌtiːdɛr", img: "🕒", note: "Check before you go.", tags: ["u6","places"] });
  add({ id: "var_ar_toaletten", sv: "Var är toaletten?", en: "Where is the toilet?", ipa: "vɑːr ɛː tuaˈlɛtːɛn", img: "🚻", note: "Public toilets often cost 5–10 kronor.", tags: ["u6","places","phrases"] });
  add({ id: "kan_jag_ta_ett_foto", sv: "Kan jag ta ett foto?", en: "Can I take a photo?", ipa: "kan jɑː tɑː ɛtː ˈfuːtu", img: "📷", note: "Polite to ask indoors or of people.", tags: ["u6","places","phrases"] });

  LSV.data.vocab = V;
})();
