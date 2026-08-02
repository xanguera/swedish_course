/* vocab_ca.js — master word/phrase list for the Catalan (ca) course.
   Central Catalan (Barcelona). Each entry: id, l2 (Catalan), en (English source
   meaning), ipa (Central-Catalan IPA), img (emoji), note, tags.
   Audio: assets/audio/ca/<id>.mp3 (optional; falls back to the browser ca voice).
   Registered under the "ca" target. See docs/profiles/ca/. */
(function () {
  "use strict";
  var V = {};
  function add(o) { V[o.id] = o; }

  /* ============================ UNIT 1 — Survival basics ============ */
  add({ id: "hola",        l2: "hola",        en: "hi / hello",        ipa: "ˈɔlə",        img: "👋", note: "The all-purpose greeting, any time of day.", tags: ["u1","greetings"] });
  add({ id: "bon_dia",     l2: "bon dia",     en: "good morning / good day", ipa: "bɔn ˈdiə", img: "🌅", note: "Literally 'good day' — used all morning.", tags: ["u1","greetings"] });
  add({ id: "bona_tarda",  l2: "bona tarda",  en: "good afternoon",    ipa: "ˈbɔnə ˈtaɾðə", img: "🌆", note: "From about 1 p.m. until dark.", tags: ["u1","greetings"] });
  add({ id: "adeu",        l2: "adéu",        en: "goodbye",           ipa: "əˈðɛw",       img: "🖐️", note: "The everyday 'bye'.", tags: ["u1","greetings"] });

  add({ id: "gracies",     l2: "gràcies",     en: "thank you",         ipa: "ˈɡɾasiəs",    img: "🙏", note: "The 'à' is stressed; ends in a soft 'es'.", tags: ["u1","politeness"] });
  add({ id: "moltes_gracies", l2: "moltes gràcies", en: "thank you very much", ipa: "ˈmoltəs ˈɡɾasiəs", img: "💐", note: "A warmer, fuller thanks.", tags: ["u1","politeness"] });
  add({ id: "de_res",      l2: "de res",      en: "you're welcome",    ipa: "də ˈres",     img: "🤲", note: "The reply to 'gràcies'.", tags: ["u1","politeness"] });
  add({ id: "si",          l2: "sí",          en: "yes",               ipa: "ˈsi",         img: "✅", note: "With an accent, to tell it from 'si' = if.", tags: ["u1","politeness"] });
  add({ id: "no",          l2: "no",          en: "no",                ipa: "ˈno",         img: "🚫", note: "Same as English in meaning, not in sound.", tags: ["u1","politeness"] });

  add({ id: "perdo",       l2: "perdó",       en: "sorry / excuse me", ipa: "pərˈðo",      img: "🙇", note: "To apologise or get past someone.", tags: ["u1","politeness"] });
  add({ id: "perdoni",     l2: "perdoni",     en: "excuse me (polite)", ipa: "pərˈðɔni",   img: "🙋", note: "Politely getting a stranger's attention.", tags: ["u1","politeness"] });
  add({ id: "si_us_plau",  l2: "si us plau",  en: "please",            ipa: "ˌsius ˈplaw", img: "🙏", note: "Three words said as one: 'si-us-plau'.", tags: ["u1","politeness","phrases"] });

  add({ id: "parla_angles", l2: "Parla anglès?", en: "Do you speak English?", ipa: "ˈparlə əŋˈɡlɛs", img: "🗣️", note: "Your lifesaver phrase in Barcelona.", tags: ["u1","phrases"] });
  add({ id: "no_ho_entenc", l2: "No ho entenc", en: "I don't understand", ipa: "no w ənˈteŋ", img: "😕", note: "'ho' = it; 'entenc' = I understand.", tags: ["u1","phrases"] });
  add({ id: "em_dic",      l2: "Em dic…",     en: "My name is…",       ipa: "əm ˈdik",     img: "🙋", note: "Literally 'I call myself…'. Add your name.", tags: ["u1","phrases"] });

  /* ============================ UNIT 2 — Meeting people ============ */
  add({ id: "jo",          l2: "jo",          en: "I",                 ipa: "ˈʒɔ",         img: "🙋", note: "The 'j' sounds like the 's' in 'measure'.", tags: ["u2","pronouns"] });
  add({ id: "tu",          l2: "tu",          en: "you",               ipa: "ˈtu",         img: "👉", note: "Informal 'you' — the friendly default.", tags: ["u2","pronouns"] });
  add({ id: "ell",         l2: "ell",         en: "he",                ipa: "ˈeʎ",         img: "👨", note: "'ll' is like the 'lli' in 'million'.", tags: ["u2","pronouns"] });
  add({ id: "ella",        l2: "ella",        en: "she",               ipa: "ˈeʎə",        img: "👩", note: "Same 'll' sound as 'ell'.", tags: ["u2","pronouns"] });
  add({ id: "com_et_dius", l2: "Com et dius?", en: "What's your name?", ipa: "kɔm ət ˈdiws", img: "❓", note: "Reply with 'Em dic…'.", tags: ["u2","phrases"] });

  add({ id: "mare",        l2: "mare",        en: "mother",            ipa: "ˈmaɾə",       img: "👩", note: "", tags: ["u2","family"] });
  add({ id: "pare",        l2: "pare",        en: "father",            ipa: "ˈpaɾə",       img: "👨", note: "", tags: ["u2","family"] });
  add({ id: "germana",     l2: "germana",     en: "sister",            ipa: "ʒərˈmanə",    img: "👧", note: "'g' before 'e' sounds like 's' in 'measure'.", tags: ["u2","family"] });
  add({ id: "germa",       l2: "germà",       en: "brother",           ipa: "ʒərˈma",      img: "👦", note: "Same word as 'germana', masculine.", tags: ["u2","family"] });
  add({ id: "familia",     l2: "família",     en: "family",            ipa: "fəˈmiliə",    img: "👨‍👩‍👧‍👦", note: "", tags: ["u2","family"] });

  add({ id: "com_estas",   l2: "Com estàs?",  en: "How are you?",      ipa: "kɔm əsˈtas",  img: "🙂", note: "Reply: 'Molt bé, gràcies!'", tags: ["u2","phrases"] });
  add({ id: "molt_be",     l2: "molt bé",     en: "very well / great",  ipa: "mol ˈβe",     img: "👍", note: "Also the everyday 'Great!'.", tags: ["u2","phrases"] });
  add({ id: "don_ets",     l2: "D'on ets?",   en: "Where are you from?", ipa: "ˈðɔn ˈets",  img: "🌍", note: "'d'on' = from where.", tags: ["u2","phrases"] });
  add({ id: "soc_de",      l2: "Sóc de…",     en: "I'm from…",         ipa: "ˈsɔɡ ðə",     img: "📍", note: "Add your city: '…Lisboa'.", tags: ["u2","phrases"] });

  /* ============================ UNIT 3 — Numbers & shopping ======== */
  add({ id: "zero",  l2: "zero",  en: "zero",  ipa: "ˈzeɾu",   img: "0️⃣", note: "", tags: ["u3","numbers"] });
  add({ id: "u",     l2: "u",     en: "one",   ipa: "ˈu",      img: "1️⃣", note: "For counting; 'un/una' before a noun.", tags: ["u3","numbers"] });
  add({ id: "dos",   l2: "dos",   en: "two",   ipa: "ˈdɔs",    img: "2️⃣", note: "'dues' with feminine nouns.", tags: ["u3","numbers"] });
  add({ id: "tres",  l2: "tres",  en: "three", ipa: "ˈtɾes",   img: "3️⃣", note: "", tags: ["u3","numbers"] });
  add({ id: "quatre", l2: "quatre", en: "four", ipa: "ˈkwatɾə", img: "4️⃣", note: "", tags: ["u3","numbers"] });
  add({ id: "cinc",  l2: "cinc",  en: "five",  ipa: "ˈsiŋ",    img: "5️⃣", note: "Final 'c' sounds like 'ng'.", tags: ["u3","numbers"] });
  add({ id: "sis",   l2: "sis",   en: "six",   ipa: "ˈsis",    img: "6️⃣", note: "", tags: ["u3","numbers"] });
  add({ id: "set",   l2: "set",   en: "seven", ipa: "ˈsɛt",    img: "7️⃣", note: "Also means 'thirst' — context tells them apart.", tags: ["u3","numbers"] });
  add({ id: "vuit",  l2: "vuit",  en: "eight", ipa: "ˈbujt",   img: "8️⃣", note: "'v' sounds like 'b' in Barcelona.", tags: ["u3","numbers"] });
  add({ id: "nou",   l2: "nou",   en: "nine",  ipa: "ˈnɔw",    img: "9️⃣", note: "Also means 'new'.", tags: ["u3","numbers"] });
  add({ id: "deu",   l2: "deu",   en: "ten",   ipa: "ˈdɛw",    img: "🔟", note: "", tags: ["u3","numbers"] });

  add({ id: "onze",    l2: "onze",    en: "eleven",   ipa: "ˈonzə",    img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "dotze",   l2: "dotze",   en: "twelve",   ipa: "ˈdodzə",   img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "tretze",  l2: "tretze",  en: "thirteen", ipa: "ˈtɾedzə",  img: "🔢", note: "13–16 all end in '-tze'.", tags: ["u3","numbers"] });
  add({ id: "catorze", l2: "catorze", en: "fourteen", ipa: "kəˈtorzə", img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "quinze",  l2: "quinze",  en: "fifteen",  ipa: "ˈkinzə",   img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "setze",   l2: "setze",   en: "sixteen",  ipa: "ˈsedzə",   img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "disset",  l2: "disset",  en: "seventeen", ipa: "diˈsɛt",  img: "🔢", note: "17–19 are 'di-' + 7/8/9.", tags: ["u3","numbers"] });
  add({ id: "divuit",  l2: "divuit",  en: "eighteen", ipa: "diˈβujt",  img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "dinou",   l2: "dinou",   en: "nineteen", ipa: "diˈnɔw",   img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "vint",    l2: "vint",    en: "twenty",   ipa: "ˈbin",     img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "trenta",  l2: "trenta",  en: "thirty",   ipa: "ˈtɾentə",  img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "quaranta", l2: "quaranta", en: "forty",  ipa: "kwəˈɾantə", img: "🔢", note: "", tags: ["u3","numbers"] });
  add({ id: "cent",    l2: "cent",    en: "one hundred", ipa: "ˈsen",  img: "💯", note: "", tags: ["u3","numbers"] });

  add({ id: "quant_costa", l2: "Quant costa?", en: "How much is it?", ipa: "ˈkwan ˈkɔstə", img: "💰", note: "Your key shopping question.", tags: ["u3","shopping","phrases"] });
  add({ id: "euros",   l2: "euros",   en: "euros",     ipa: "ˈewɾus",   img: "💶", note: "The currency in Barcelona.", tags: ["u3","shopping"] });
  add({ id: "car",     l2: "car",     en: "expensive", ipa: "ˈkar",     img: "💸", note: "'cara' with a feminine noun.", tags: ["u3","shopping"] });
  add({ id: "barat",   l2: "barat",   en: "cheap",     ipa: "bəˈɾat",    img: "🪙", note: "'barata' with a feminine noun.", tags: ["u3","shopping"] });
  add({ id: "voldria", l2: "voldria", en: "I would like", ipa: "bulˈdɾiə", img: "🙋", note: "Polite way to ask for something.", tags: ["u3","shopping","phrases"] });

  add({ id: "un",   l2: "un",   en: "a / one (masc.)", ipa: "ˈun",  img: "🔵", note: "Before masculine nouns: un cafè.", tags: ["u3","shopping","grammar"] });
  add({ id: "una",  l2: "una",  en: "a / one (fem.)",  ipa: "ˈunə", img: "🔴", note: "Before feminine nouns: una cervesa.", tags: ["u3","shopping","grammar"] });
  add({ id: "aixo", l2: "això", en: "this",            ipa: "əˈʃɔ", img: "👉", note: "Point and say it when shopping.", tags: ["u3","shopping"] });

  /* ============================ UNIT 4 — Food & the local ritual === */
  add({ id: "cafe",     l2: "cafè",     en: "coffee",   ipa: "kəˈfɛ",    img: "☕", note: "A plain 'cafè' is an espresso.", tags: ["u4","food"] });
  add({ id: "tallat",   l2: "tallat",   en: "espresso with a little milk", ipa: "təˈʎat", img: "☕", note: "Like a Portuguese 'garoto'.", tags: ["u4","food"] });
  add({ id: "cafe_amb_llet", l2: "cafè amb llet", en: "coffee with milk", ipa: "ˈkafə əm ˈʎɛt", img: "☕", note: "'amb' = with; 'llet' = milk.", tags: ["u4","food"] });
  add({ id: "canya",    l2: "canya",    en: "small draught beer", ipa: "ˈkaɲə", img: "🍺", note: "The little glass of draught beer locals order.", tags: ["u4","food"] });
  add({ id: "croissant", l2: "croissant", en: "croissant", ipa: "kɾwəˈsan", img: "🥐", note: "A café classic with your coffee.", tags: ["u4","food"] });

  add({ id: "un_cafe_si_us_plau", l2: "Un cafè, si us plau", en: "A coffee, please", ipa: "uŋ kəˈfɛ ˌsius ˈplaw", img: "☕", note: "A simple café order.", tags: ["u4","phrases"] });
  add({ id: "per_emportar", l2: "per emportar", en: "to take away", ipa: "pəɾ əm.purˈta", img: "🥡", note: "Add it to any order to go.", tags: ["u4","phrases"] });

  add({ id: "esmorzar", l2: "esmorzar", en: "breakfast", ipa: "əz.murˈza", img: "🍳", note: "", tags: ["u4","food"] });
  add({ id: "dinar",    l2: "dinar",    en: "lunch",     ipa: "diˈna",     img: "🍽️", note: "Usually around 2 p.m. in Barcelona.", tags: ["u4","food"] });
  add({ id: "sopar",    l2: "sopar",    en: "dinner",    ipa: "suˈpa",     img: "🌙", note: "Often 9 p.m. or later.", tags: ["u4","food"] });
  add({ id: "aigua",    l2: "aigua",    en: "water",     ipa: "ˈajɣwə",    img: "💧", note: "Tap water is 'aigua de l'aixeta'.", tags: ["u4","food"] });
  add({ id: "vi",       l2: "vi",       en: "wine",      ipa: "ˈbi",       img: "🍷", note: "'v' sounds like 'b'.", tags: ["u4","food"] });
  add({ id: "el_compte", l2: "el compte", en: "the bill", ipa: "əl ˈkontə", img: "🧾", note: "Ask: 'El compte, si us plau'.", tags: ["u4","food","phrases"] });
  add({ id: "bon_profit", l2: "bon profit", en: "enjoy your meal", ipa: "bɔm pɾuˈfit", img: "😋", note: "The Catalan 'bon appétit'.", tags: ["u4","phrases"] });

  /* ============================ UNIT 5 — Getting around ============ */
  add({ id: "metro",    l2: "metro",    en: "metro / subway", ipa: "ˈmɛtɾu", img: "🚇", note: "Fast way across Barcelona.", tags: ["u5","transport"] });
  add({ id: "autobus",  l2: "autobús",  en: "bus",        ipa: "əwtuˈβus",  img: "🚌", note: "", tags: ["u5","transport"] });
  add({ id: "tren",     l2: "tren",     en: "train",      ipa: "ˈtɾen",     img: "🚆", note: "Rodalies trains reach the airport & coast.", tags: ["u5","transport"] });
  add({ id: "tramvia",  l2: "tramvia",  en: "tram",       ipa: "tɾəmˈbiə",  img: "🚊", note: "", tags: ["u5","transport"] });
  add({ id: "bitllet",  l2: "bitllet",  en: "ticket",     ipa: "biˈʎɛt",    img: "🎫", note: "A 'T-casual' card covers 10 rides.", tags: ["u5","transport"] });

  add({ id: "on_es",    l2: "On és…?",  en: "Where is…?", ipa: "ˈon ˈes",   img: "🧭", note: "Then say the place.", tags: ["u5","directions","phrases"] });
  add({ id: "a",        l2: "a",        en: "to",         ipa: "ə",         img: "➡️", note: "'a' + 'el' becomes 'al'.", tags: ["u5","directions"] });
  add({ id: "de",       l2: "de",       en: "from / of",  ipa: "də",        img: "⬅️", note: "'de' + 'el' becomes 'del'.", tags: ["u5","directions"] });
  add({ id: "dreta",    l2: "dreta",    en: "right",      ipa: "ˈdɾetə",    img: "👉", note: "'a la dreta' = to the right.", tags: ["u5","directions"] });
  add({ id: "esquerra", l2: "esquerra", en: "left",       ipa: "əsˈkɛrə",   img: "👈", note: "'a l'esquerra' = to the left.", tags: ["u5","directions"] });
  add({ id: "tot_recte", l2: "tot recte", en: "straight ahead", ipa: "tot ˈrektə", img: "⬆️", note: "", tags: ["u5","directions"] });

  /* ============================ UNIT 6 — Sightseeing ============== */
  add({ id: "barri_gotic", l2: "Barri Gòtic", en: "the Gothic Quarter", ipa: "ˈbari ˈɣɔtik", img: "🏘️", note: "Barcelona's medieval old town.", tags: ["u6","places"] });
  add({ id: "sagrada_familia", l2: "Sagrada Família", en: "the Sagrada Família", ipa: "səˈɣɾaðə fəˈmiliə", img: "⛪", note: "Gaudí's basilica — still unfinished.", tags: ["u6","places"] });
  add({ id: "museu",    l2: "museu",    en: "museum",     ipa: "muˈzɛw",    img: "🏛️", note: "The Picasso museum is in the Born.", tags: ["u6","places"] });
  add({ id: "mercat",   l2: "mercat",   en: "market",     ipa: "mərˈkat",   img: "🛒", note: "La Boqueria is the famous one.", tags: ["u6","places"] });
  add({ id: "placa",    l2: "plaça",    en: "square",     ipa: "ˈplasə",    img: "⛲", note: "Plaça de Catalunya is the city's heart.", tags: ["u6","places"] });
  add({ id: "horari",   l2: "horari",   en: "opening hours", ipa: "uˈɾaɾi", img: "🕒", note: "Many shops close for lunch.", tags: ["u6","places"] });

  add({ id: "on_es_el_lavabo", l2: "On és el lavabo?", en: "Where is the toilet?", ipa: "ˈon ˈes əl ləˈβaβu", img: "🚻", note: "'lavabo' = toilet / restroom.", tags: ["u6","places","phrases"] });
  add({ id: "puc_fer_una_foto", l2: "Puc fer una foto?", en: "Can I take a photo?", ipa: "ˈpuɡ fe ˈunə ˈfɔtu", img: "📷", note: "Polite to ask indoors or of people.", tags: ["u6","places","phrases"] });

  LSV.data.registerCourse("ca", { vocab: V });
})();
