/* vocab.js — master word/phrase list for the Swedish (sv) course (source of truth).
   Each entry: id, l2 (target-language text), en (English source meaning),
   ipa (IPA transcription), img (emoji), note, tags.
   The audio file for an item is assets/audio/<L2>/<id>.mp3 (optional; falls back
   to the browser's L2 speech). Registered under the "sv" target. Add/edit freely. */
(function () {
  "use strict";
  var V = {};
  function add(o) { V[o.id] = o; }

  /* ============================ UNIT 1 — Survival basics ============ */
  add({ id: "hej",            l2: "hej",            en: "hi / hello",             ipa: "hɛj",                        img: "👋", note: "The all-purpose greeting, any time of day.", tags: ["u1","greetings"] });
  add({ id: "god_morgon",     l2: "god morgon",     en: "good morning",           ipa: "ɡuːd ˈmɔrːɔn",               img: "🌅", note: "Used until about 10–11 a.m.", tags: ["u1","greetings"] });
  add({ id: "god_kvall",      l2: "god kväll",      en: "good evening",           ipa: "ɡuːd ˈkvɛlː",                img: "🌆", note: "'kväll' = evening. The ä sounds like 'e' in 'bed'.", tags: ["u1","greetings"] });
  add({ id: "hej_da",         l2: "hej då",         en: "goodbye",                ipa: "hɛj ˈdɔː",                   img: "🖐️", note: "The everyday 'bye'. 'å' sounds like 'oa' in 'oar'.", tags: ["u1","greetings"] });
  add({ id: "tack",           l2: "tack",           en: "thank you",              ipa: "tak",                        img: "🙏", note: "Also means 'please' when ordering: 'en kaffe, tack'.", tags: ["u1","politeness"] });
  add({ id: "tack_sa_mycket", l2: "tack så mycket", en: "thank you very much",    ipa: "tak sɔ ˈmʏkːə",              img: "💐", note: "A warmer, fuller thanks.", tags: ["u1","politeness"] });
  add({ id: "varsagod",       l2: "varsågod",       en: "you're welcome / here you go", ipa: "ˌvasːɔˈɡuːd",          img: "🤲", note: "Said when giving something or replying to thanks.", tags: ["u1","politeness"] });
  add({ id: "ja",             l2: "ja",             en: "yes",                    ipa: "jaː",                        img: "✅", note: "Sounds like 'yah'.", tags: ["u1","politeness"] });
  add({ id: "nej",            l2: "nej",            en: "no",                     ipa: "nɛj",                        img: "🚫", note: "Sounds like 'ney'.", tags: ["u1","politeness"] });
  add({ id: "ursakta",        l2: "ursäkta",        en: "excuse me / sorry",      ipa: "ʉːˈʂɛkta",                   img: "🙋", note: "To get attention or squeeze past someone.", tags: ["u1","politeness"] });
  add({ id: "forlat",         l2: "förlåt",         en: "sorry (apology)",        ipa: "fœrˈlɔːt",                   img: "😟", note: "A real apology, stronger than 'ursäkta'.", tags: ["u1","politeness"] });
  add({ id: "snalla",         l2: "snälla",         en: "please (pleading)",      ipa: "ˈsnɛlːa",                    img: "🥺", note: "Used when really asking a favour.", tags: ["u1","politeness"] });
  add({ id: "talar_du_engelska", l2: "Talar du engelska?", en: "Do you speak English?", ipa: "ˈtɑːlar dʉ ˈɛŋɛlska", img: "🗣️", note: "Your lifesaver phrase — most Swedes do!", tags: ["u1","phrases"] });
  add({ id: "jag_forstar_inte",  l2: "Jag förstår inte",   en: "I don't understand",    ipa: "jɑː fœˈʂtɔːr ˈɪntɛ",  img: "🤔", note: "'inte' = not.", tags: ["u1","phrases"] });
  add({ id: "jag_heter",         l2: "Jag heter…",         en: "My name is…",           ipa: "jɑː ˈheːtɛr",         img: "🪪", note: "'heter' = am called. Add your name after.", tags: ["u1","phrases"] });

  /* ============================ UNIT 2 — Meeting people ============= */
  add({ id: "jag",  l2: "jag", en: "I",   ipa: "jɑː",  img: "🙋", note: "Pronounced 'yah'.", tags: ["u2","people"] });
  add({ id: "du",   l2: "du",  en: "you", ipa: "dʉː",  img: "👉", note: "Swedes use the informal 'du' with almost everyone.", tags: ["u2","people"] });
  add({ id: "han",  l2: "han", en: "he",  ipa: "han",  img: "👦", note: "", tags: ["u2","people"] });
  add({ id: "hon",  l2: "hon", en: "she", ipa: "hɔn",  img: "👧", note: "", tags: ["u2","people"] });
  add({ id: "vad_heter_du", l2: "Vad heter du?", en: "What's your name?", ipa: "vɑː ˈheːtɛr dʉː", img: "❓", note: "Reply with 'Jag heter…'.", tags: ["u2","phrases"] });
  add({ id: "mamma",  l2: "mamma",  en: "mom",     ipa: "ˈmamːa",  img: "👩", note: "", tags: ["u2","family"] });
  add({ id: "pappa",  l2: "pappa",  en: "dad",     ipa: "ˈpapːa",  img: "👨", note: "", tags: ["u2","family"] });
  add({ id: "syster", l2: "syster", en: "sister",  ipa: "ˈsʏstɛr", img: "👧", note: "", tags: ["u2","family"] });
  add({ id: "bror",   l2: "bror",   en: "brother", ipa: "broːr",   img: "👦", note: "", tags: ["u2","family"] });
  add({ id: "familj", l2: "familj", en: "family",  ipa: "faˈmilj", img: "👪", note: "The 'j' sounds like English 'y'.", tags: ["u2","family"] });
  add({ id: "hur_mar_du", l2: "Hur mår du?", en: "How are you?", ipa: "hʉːr mɔːr dʉː", img: "😊", note: "'mår' = feel/fare.", tags: ["u2","phrases"] });
  add({ id: "bra", l2: "bra", en: "good / fine", ipa: "brɑː", img: "👍", note: "Reply: 'Bra, tack!' = Fine, thanks!", tags: ["u2","phrases"] });
  add({ id: "var_kommer_du_ifran", l2: "Var kommer du ifrån?", en: "Where are you from?", ipa: "vɑːr ˈkɔmːɛr dʉː ɪˈfrɔːn", img: "🌍", note: "", tags: ["u2","phrases"] });
  add({ id: "jag_kommer_fran", l2: "Jag kommer från…", en: "I come from…", ipa: "jɑː ˈkɔmːɛr frɔːn", img: "🧭", note: "Add your country: '…Spanien / Katalonien'.", tags: ["u2","phrases"] });

  /* ============================ UNIT 3 — Numbers, money & shopping = */
  add({ id: "noll",  l2: "noll",  en: "zero",  ipa: "nɔlː",       img: "0", note: "", tags: ["u3","numbers"] });
  add({ id: "ett",   l2: "ett",   en: "one",   ipa: "ɛtː",        img: "1", note: "Also the 'ett-word' article.", tags: ["u3","numbers"] });
  add({ id: "tva",   l2: "två",   en: "two",   ipa: "tvoː",       img: "2", note: "", tags: ["u3","numbers"] });
  add({ id: "tre",   l2: "tre",   en: "three", ipa: "treː",       img: "3", note: "", tags: ["u3","numbers"] });
  add({ id: "fyra",  l2: "fyra",  en: "four",  ipa: "ˈfyːra",     img: "4", note: "", tags: ["u3","numbers"] });
  add({ id: "fem",   l2: "fem",   en: "five",  ipa: "fɛm",        img: "5", note: "", tags: ["u3","numbers"] });
  add({ id: "sex",   l2: "sex",   en: "six",   ipa: "sɛks",       img: "6", note: "", tags: ["u3","numbers"] });
  add({ id: "sju",   l2: "sju",   en: "seven", ipa: "ɧʉː",        img: "7", note: "The 'sju' sound is a soft 'hw' — very Swedish!", tags: ["u3","numbers"] });
  add({ id: "atta",  l2: "åtta",  en: "eight", ipa: "ˈɔtːa",      img: "8", note: "", tags: ["u3","numbers"] });
  add({ id: "nio",   l2: "nio",   en: "nine",  ipa: "ˈniːɔ",      img: "9", note: "", tags: ["u3","numbers"] });
  add({ id: "tio",   l2: "tio",   en: "ten",  ipa: "ˈtiːɔ",      img: "10", note: "", tags: ["u3","numbers"] });
  add({ id: "elva",    l2: "elva",    en: "eleven",    ipa: "ˈɛlːva",   img: "11", note: "", tags: ["u3","numbers2"] });
  add({ id: "tolv",    l2: "tolv",    en: "twelve",    ipa: "tɔlv",     img: "12", note: "", tags: ["u3","numbers2"] });
  add({ id: "tretton", l2: "tretton", en: "thirteen",  ipa: "ˈtrɛtːɔn", img: "13", note: "-ton = teen.", tags: ["u3","numbers2"] });
  add({ id: "fjorton", l2: "fjorton", en: "fourteen",  ipa: "ˈfjʊrtɔn", img: "14", note: "", tags: ["u3","numbers2"] });
  add({ id: "femton",  l2: "femton",  en: "fifteen",   ipa: "ˈfɛmtɔn",  img: "15", note: "", tags: ["u3","numbers2"] });
  add({ id: "sexton",  l2: "sexton",  en: "sixteen",   ipa: "ˈsɛkstɔn", img: "16", note: "", tags: ["u3","numbers2"] });
  add({ id: "sjutton", l2: "sjutton", en: "seventeen", ipa: "ˈɧɵtːɔn",  img: "17", note: "", tags: ["u3","numbers2"] });
  add({ id: "arton",   l2: "arton",   en: "eighteen",  ipa: "ˈɑːʈɔn",   img: "18", note: "", tags: ["u3","numbers2"] });
  add({ id: "nitton",  l2: "nitton",  en: "nineteen",  ipa: "ˈnitːɔn",  img: "19", note: "", tags: ["u3","numbers2"] });
  add({ id: "tjugo",   l2: "tjugo",   en: "twenty",    ipa: "ˈɕʉːɡʊ",   img: "20", note: "The 'tj' is a soft 'sh/ch' sound.", tags: ["u3","numbers2"] });
  add({ id: "trettio", l2: "trettio", en: "thirty",    ipa: "ˈtrɛtːiɔ", img: "30", note: "", tags: ["u3","numbers2"] });
  add({ id: "fyrtio",  l2: "fyrtio",  en: "forty",     ipa: "ˈfœʈːiɔ",  img: "40", note: "", tags: ["u3","numbers2"] });
  add({ id: "hundra",  l2: "hundra",  en: "hundred",  ipa: "ˈhɵndra",  img: "💯", note: "'ett hundra' = one hundred.", tags: ["u3","numbers2"] });
  add({ id: "hur_mycket_kostar_det", l2: "Hur mycket kostar det?", en: "How much is it?", ipa: "hʉːr ˈmʏkːɛ ˈkɔstar deː", img: "💰", note: "Your key shopping question.", tags: ["u3","shopping","phrases"] });
  add({ id: "kronor", l2: "kronor", en: "kronor (SEK)", ipa: "ˈkruːnɔr", img: "💵", note: "Sweden's currency. 1 krona, many kronor.", tags: ["u3","shopping"] });
  add({ id: "dyrt",   l2: "dyrt",   en: "expensive",   ipa: "dyːʈ",      img: "💸", note: "", tags: ["u3","shopping"] });
  add({ id: "billigt", l2: "billigt", en: "cheap",     ipa: "ˈbilːɪkt",  img: "🏷️", note: "", tags: ["u3","shopping"] });
  add({ id: "jag_vill_ha", l2: "Jag vill ha…", en: "I want…", ipa: "jɑː vɪl hɑː", img: "🫴", note: "'ha' = to have. Add what you want.", tags: ["u3","shopping","phrases"] });
  add({ id: "en", l2: "en", en: "a / an (en-word)", ipa: "eːn", img: "🔵", note: "About 75% of nouns are 'en' words: en bulle, en buss.", tags: ["u3","grammar"] });
  add({ id: "ett_art", l2: "ett", en: "a / an (ett-word)", ipa: "ɛtː", img: "🟠", note: "The rest are 'ett' words: ett tåg, ett foto.", tags: ["u3","grammar"] });
  add({ id: "det_har", l2: "det här", en: "this (one)", ipa: "deː hɛːr", img: "👇", note: "Point and say it while shopping.", tags: ["u3","shopping"] });

  /* ============================ UNIT 4 — Food & fika ================ */
  add({ id: "kaffe",      l2: "kaffe",      en: "coffee",        ipa: "ˈkafːɛ",        img: "☕", note: "The fuel of Swedish life.", tags: ["u4","drink","fika"] });
  add({ id: "te",         l2: "te",         en: "tea",           ipa: "teː",           img: "🍵", note: "", tags: ["u4","drink","fika"] });
  add({ id: "bulle",      l2: "bulle",      en: "bun",           ipa: "ˈbɵlːɛ",        img: "🥯", note: "A sweet bun.", tags: ["u4","food","fika"] });
  add({ id: "kanelbulle", l2: "kanelbulle", en: "cinnamon bun",  ipa: "kaˈneːlˌbɵlːɛ",  img: "🥐", note: "The star of Swedish fika. 'kanel' = cinnamon.", tags: ["u4","food","fika"] });
  add({ id: "kaka",       l2: "kaka",       en: "cookie / cake", ipa: "ˈkɑːka",        img: "🍪", note: "", tags: ["u4","food","fika"] });
  add({ id: "jag_skulle_vilja_ha", l2: "Jag skulle vilja ha…", en: "I would like…", ipa: "jɑː ˈskɵlːɛ ˈvɪlja hɑː", img: "🙏", note: "Politer than 'jag vill ha'.", tags: ["u4","food","phrases"] });
  add({ id: "en_kaffe_tack", l2: "En kaffe, tack", en: "A coffee, please", ipa: "eːn ˈkafːɛ tak", img: "☕", note: "Simple café ordering.", tags: ["u4","food","phrases"] });
  add({ id: "frukost", l2: "frukost", en: "breakfast", ipa: "ˈfrʉːkɔst", img: "🍳", note: "", tags: ["u4","food"] });
  add({ id: "lunch",   l2: "lunch",   en: "lunch",     ipa: "lɵnʃ",      img: "🥪", note: "", tags: ["u4","food"] });
  add({ id: "middag",  l2: "middag",  en: "dinner",    ipa: "ˈmɪdːaɡ",   img: "🍽️", note: "Also means 'midday' historically, but today = dinner.", tags: ["u4","food"] });
  add({ id: "vatten",  l2: "vatten",  en: "water",     ipa: "ˈvatːɛn",   img: "💧", note: "Tap water is excellent and free.", tags: ["u4","drink"] });
  add({ id: "mjolk",   l2: "mjölk",   en: "milk",      ipa: "mjœlk",     img: "🥛", note: "'mj' sounds like 'my'.", tags: ["u4","drink"] });
  add({ id: "notan_tack", l2: "Notan, tack", en: "The bill, please", ipa: "ˈnuːtan tak", img: "🧾", note: "Ask for this at a restaurant.", tags: ["u4","food","phrases"] });
  add({ id: "smaklig_maltid", l2: "Smaklig måltid", en: "Enjoy your meal", ipa: "ˈsmɑːklɪɡ ˈmoːltiːd", img: "😋", note: "Sweden's 'bon appétit'.", tags: ["u4","food","phrases"] });

  /* ============================ UNIT 5 — Getting around ============ */
  add({ id: "tunnelbana", l2: "tunnelbana", en: "metro / subway", ipa: "ˈtɵnːɛlˌbɑːna", img: "🚇", note: "Locals call it 'T-bana'.", tags: ["u5","transport"] });
  add({ id: "buss",       l2: "buss",       en: "bus",            ipa: "bɵsː",          img: "🚌", note: "", tags: ["u5","transport"] });
  add({ id: "tag",        l2: "tåg",        en: "train",          ipa: "toːɡ",          img: "🚆", note: "An 'ett' word: ett tåg.", tags: ["u5","transport"] });
  add({ id: "sparvagn",   l2: "spårvagn",   en: "tram",           ipa: "ˈspoːrvaŋn",    img: "🚊", note: "Line 7 goes to Djurgården.", tags: ["u5","transport"] });
  add({ id: "biljett",    l2: "biljett",    en: "ticket",         ipa: "bɪlˈjɛtː",      img: "🎫", note: "Buy the SL app before you ride.", tags: ["u5","transport"] });
  add({ id: "var_ar",   l2: "Var är…?", en: "Where is…?", ipa: "vɑːr ɛː", img: "📍", note: "Follow with a place.", tags: ["u5","directions","phrases"] });
  add({ id: "till",     l2: "till",     en: "to",   ipa: "tɪlː",  img: "➡️", note: "", tags: ["u5","directions"] });
  add({ id: "fran",     l2: "från",     en: "from", ipa: "frɔːn", img: "⬅️", note: "", tags: ["u5","directions"] });
  add({ id: "hoger",    l2: "höger",    en: "right", ipa: "ˈhøːɡɛr",  img: "👉", note: "", tags: ["u5","directions"] });
  add({ id: "vanster",  l2: "vänster",  en: "left",  ipa: "ˈvɛnstɛr", img: "👈", note: "", tags: ["u5","directions"] });
  add({ id: "rakt_fram", l2: "rakt fram", en: "straight ahead", ipa: "rɑːkt fram", img: "⬆️", note: "", tags: ["u5","directions"] });

  /* ============================ UNIT 6 — Sightseeing =============== */
  add({ id: "gamla_stan", l2: "Gamla stan", en: "the Old Town", ipa: "ˈɡamːla staːn", img: "🏘️", note: "Stockholm's beautiful medieval centre.", tags: ["u6","places"] });
  add({ id: "slottet",    l2: "slottet",    en: "the palace",   ipa: "ˈslɔtːɛt",      img: "🏰", note: "The Royal Palace — see the guard change!", tags: ["u6","places"] });
  add({ id: "museet",     l2: "museet",     en: "the museum",   ipa: "mʉˈseːɛt",      img: "🏛️", note: "Vasa and Skansen are must-sees.", tags: ["u6","places"] });
  add({ id: "kyrka",      l2: "kyrka",      en: "church",       ipa: "ˈɕʏrka",        img: "⛪", note: "", tags: ["u6","places"] });
  add({ id: "torg",       l2: "torg",       en: "square",       ipa: "tɔrj",          img: "⛲", note: "Stortorget is the main square in Gamla stan.", tags: ["u6","places"] });
  add({ id: "oppettider", l2: "öppettider", en: "opening hours", ipa: "ˈœpːɛtˌtiːdɛr", img: "🕒", note: "Check before you go.", tags: ["u6","places"] });
  add({ id: "var_ar_toaletten", l2: "Var är toaletten?", en: "Where is the toilet?", ipa: "vɑːr ɛː tuaˈlɛtːɛn", img: "🚻", note: "Public toilets often cost 5–10 kronor.", tags: ["u6","places","phrases"] });
  add({ id: "kan_jag_ta_ett_foto", l2: "Kan jag ta ett foto?", en: "Can I take a photo?", ipa: "kan jɑː tɑː ɛtː ˈfuːtu", img: "📷", note: "Polite to ask indoors or of people.", tags: ["u6","places","phrases"] });

  LSV.data.registerCourse("sv", { vocab: V });
})();
