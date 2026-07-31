/* lessons.js — each lesson = teach items + a sequence of exercises.
   Exercise types:
     flashcards      {items:[ids]}                 (learn, ungraded)
     mc_img_word     {items:[ids]}                 (see picture → pick Swedish)
     mc_word_en      {items:[ids]}                 (see Swedish → pick English)
     listen_choose   {items:[ids]}                 (hear it → pick the word)
     match_pairs     {items:[ids]}                 (match Swedish ↔ English)
     fill_blank      {sv, en, answer, bank:[...]}   (tap the missing word)
     listen_repeat   {items:[ids]}                 (say it aloud, ungraded)
   Distractors for MC/listen are generated from vocab that shares a tag. */
(function () {
  "use strict";
  var L = {};
  function add(o) { L[o.id] = o; }

  /* ---------------------------- UNIT 1 ---------------------------- */
  add({ id: "l01", unit: "u1", title: "Saying hello", icon: "👋",
    teach: ["hej", "god_morgon", "god_kvall", "hej_da"],
    exercises: [
      { type: "flashcards", items: ["hej", "god_morgon", "god_kvall", "hej_da"] },
      { type: "mc_img_word", items: ["hej", "god_morgon"] },
      { type: "listen_choose", items: ["hej_da", "god_kvall"] },
      { type: "match_pairs", items: ["hej", "god_morgon", "god_kvall", "hej_da"] }
    ],
    culture: ["lagom"] });

  add({ id: "l02", unit: "u1", title: "Thanks, yes & no", icon: "🙏",
    teach: ["tack", "tack_sa_mycket", "varsagod", "ja", "nej"],
    exercises: [
      { type: "flashcards", items: ["tack", "tack_sa_mycket", "varsagod", "ja", "nej"] },
      { type: "mc_word_en", items: ["ja", "nej", "tack"] },
      { type: "listen_choose", items: ["tack", "varsagod"] },
      { type: "match_pairs", items: ["tack", "varsagod", "ja", "nej"] }
    ] });

  add({ id: "l03", unit: "u1", title: "Excuse me & sorry", icon: "🙋",
    teach: ["ursakta", "forlat", "snalla"],
    exercises: [
      { type: "flashcards", items: ["ursakta", "forlat", "snalla"] },
      { type: "mc_word_en", items: ["ursakta", "forlat", "snalla"] },
      { type: "listen_choose", items: ["ursakta", "forlat", "snalla"] },
      { type: "match_pairs", items: ["ursakta", "forlat", "snalla", "tack"] }
    ] });

  add({ id: "l04", unit: "u1", title: "Your first phrases", icon: "🗣️",
    teach: ["talar_du_engelska", "jag_forstar_inte", "jag_heter"],
    exercises: [
      { type: "flashcards", items: ["talar_du_engelska", "jag_forstar_inte", "jag_heter"] },
      { type: "mc_word_en", items: ["talar_du_engelska", "jag_forstar_inte", "jag_heter"] },
      { type: "listen_repeat", items: ["talar_du_engelska", "jag_heter"] },
      { type: "match_pairs", items: ["talar_du_engelska", "jag_forstar_inte", "jag_heter", "hej"] }
    ] });

  /* ---------------------------- UNIT 2 ---------------------------- */
  add({ id: "l05", unit: "u2", title: "I and you", icon: "🙋",
    teach: ["jag", "du", "han", "hon", "vad_heter_du"],
    exercises: [
      { type: "flashcards", items: ["jag", "du", "han", "hon", "vad_heter_du"] },
      { type: "mc_img_word", items: ["jag", "du", "han", "hon"] },
      { type: "listen_choose", items: ["jag", "du", "han", "hon"] },
      { type: "match_pairs", items: ["jag", "du", "han", "hon"] }
    ] });

  add({ id: "l06", unit: "u2", title: "Family", icon: "👪",
    teach: ["mamma", "pappa", "syster", "bror", "familj"],
    exercises: [
      { type: "flashcards", items: ["mamma", "pappa", "syster", "bror", "familj"] },
      { type: "mc_img_word", items: ["mamma", "pappa", "syster", "bror"] },
      { type: "listen_choose", items: ["mamma", "pappa", "syster", "bror"] },
      { type: "match_pairs", items: ["mamma", "pappa", "syster", "bror", "familj"] }
    ],
    culture: ["pippi"] });

  add({ id: "l07", unit: "u2", title: "Small talk", icon: "😊",
    teach: ["hur_mar_du", "bra", "var_kommer_du_ifran", "jag_kommer_fran"],
    exercises: [
      { type: "flashcards", items: ["hur_mar_du", "bra", "var_kommer_du_ifran", "jag_kommer_fran"] },
      { type: "mc_word_en", items: ["hur_mar_du", "bra", "var_kommer_du_ifran"] },
      { type: "listen_repeat", items: ["hur_mar_du", "jag_kommer_fran"] },
      { type: "match_pairs", items: ["hur_mar_du", "bra", "var_kommer_du_ifran", "jag_kommer_fran"] }
    ] });

  /* ---------------------------- UNIT 3 ---------------------------- */
  add({ id: "l08", unit: "u3", title: "Numbers 0–10", icon: "🔢",
    teach: ["noll", "ett", "tva", "tre", "fyra", "fem", "sex", "sju", "atta", "nio", "tio"],
    exercises: [
      { type: "flashcards", items: ["noll", "ett", "tva", "tre", "fyra", "fem"] },
      { type: "flashcards", items: ["sex", "sju", "atta", "nio", "tio"] },
      { type: "mc_img_word", items: ["tre", "fem", "sju", "atta"] },
      { type: "listen_choose", items: ["ett", "tva", "fyra", "sex", "nio"] },
      { type: "match_pairs", items: ["noll", "tre", "fem", "atta", "tio"] }
    ] });

  add({ id: "l09", unit: "u3", title: "Numbers 11–100", icon: "🔢",
    teach: ["elva", "tolv", "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton", "tjugo", "trettio", "fyrtio", "hundra"],
    exercises: [
      { type: "flashcards", items: ["elva", "tolv", "tretton", "fjorton", "femton", "sexton"] },
      { type: "flashcards", items: ["sjutton", "arton", "nitton", "tjugo", "trettio", "fyrtio", "hundra"] },
      { type: "mc_img_word", items: ["elva", "femton", "tjugo", "hundra"] },
      { type: "listen_choose", items: ["tolv", "fjorton", "arton", "trettio"] },
      { type: "match_pairs", items: ["elva", "femton", "tjugo", "trettio", "hundra"] }
    ] });

  add({ id: "l10", unit: "u3", title: "Shopping talk", icon: "💰",
    teach: ["hur_mycket_kostar_det", "kronor", "dyrt", "billigt"],
    exercises: [
      { type: "flashcards", items: ["hur_mycket_kostar_det", "kronor", "dyrt", "billigt"] },
      { type: "mc_word_en", items: ["kronor", "dyrt", "billigt"] },
      { type: "listen_choose", items: ["dyrt", "billigt", "kronor"] },
      { type: "match_pairs", items: ["hur_mycket_kostar_det", "kronor", "dyrt", "billigt"] }
    ],
    culture: ["cashless"] });

  add({ id: "l11", unit: "u3", title: "I want this — en / ett", icon: "🛍️",
    teach: ["jag_vill_ha", "en", "ett_art", "det_har"],
    exercises: [
      { type: "flashcards", items: ["jag_vill_ha", "en", "ett_art", "det_har"] },
      { type: "mc_word_en", items: ["jag_vill_ha", "det_har"] },
      { type: "match_pairs", items: ["jag_vill_ha", "en", "ett_art", "det_har"] }
    ],
    culture: ["pant"] });

  /* ---------------------------- UNIT 4 ---------------------------- */
  add({ id: "l12", unit: "u4", title: "Fika time", icon: "☕",
    teach: ["kaffe", "te", "bulle", "kanelbulle", "kaka"],
    exercises: [
      { type: "flashcards", items: ["kaffe", "te", "bulle", "kanelbulle", "kaka"] },
      { type: "mc_img_word", items: ["kaffe", "te", "kanelbulle", "kaka"] },
      { type: "listen_choose", items: ["kaffe", "te", "bulle", "kanelbulle"] },
      { type: "match_pairs", items: ["kaffe", "te", "bulle", "kanelbulle", "kaka"] }
    ],
    culture: ["fika"] });

  add({ id: "l13", unit: "u4", title: "Ordering at a café", icon: "🧾",
    teach: ["jag_skulle_vilja_ha", "en_kaffe_tack", "notan_tack", "smaklig_maltid"],
    exercises: [
      { type: "flashcards", items: ["jag_skulle_vilja_ha", "en_kaffe_tack", "notan_tack", "smaklig_maltid"] },
      { type: "fill_blank", sv: "En ___, tack", en: "A coffee, please", ipa: "eːn ˈkafːɛ tak", answer: "kaffe", bank: ["kaffe", "te", "vatten", "mjölk"] },
      { type: "mc_word_en", items: ["notan_tack", "smaklig_maltid", "jag_skulle_vilja_ha"] },
      { type: "listen_repeat", items: ["en_kaffe_tack", "notan_tack"] }
    ],
    culture: ["kanelbullens_dag"] });

  add({ id: "l14", unit: "u4", title: "Meals & drinks", icon: "🍽️",
    teach: ["frukost", "lunch", "middag", "vatten", "mjolk"],
    exercises: [
      { type: "flashcards", items: ["frukost", "lunch", "middag", "vatten", "mjolk"] },
      { type: "mc_img_word", items: ["frukost", "lunch", "middag", "vatten"] },
      { type: "listen_choose", items: ["frukost", "lunch", "vatten", "mjolk"] },
      { type: "match_pairs", items: ["frukost", "lunch", "middag", "vatten", "mjolk"] }
    ],
    culture: ["semla", "surstromming"] });

  /* ---------------------------- UNIT 5 ---------------------------- */
  add({ id: "l15", unit: "u5", title: "Getting around", icon: "🚇",
    teach: ["tunnelbana", "buss", "tag", "sparvagn", "biljett"],
    exercises: [
      { type: "flashcards", items: ["tunnelbana", "buss", "tag", "sparvagn", "biljett"] },
      { type: "mc_img_word", items: ["tunnelbana", "buss", "tag", "sparvagn"] },
      { type: "listen_choose", items: ["tunnelbana", "buss", "tag", "biljett"] },
      { type: "match_pairs", items: ["tunnelbana", "buss", "tag", "sparvagn", "biljett"] }
    ],
    culture: ["tbana_art"] });

  add({ id: "l16", unit: "u5", title: "Directions", icon: "🧭",
    teach: ["var_ar", "till", "fran", "hoger", "vanster", "rakt_fram"],
    exercises: [
      { type: "flashcards", items: ["var_ar", "till", "fran", "hoger", "vanster", "rakt_fram"] },
      { type: "mc_img_word", items: ["hoger", "vanster", "rakt_fram", "till"] },
      { type: "fill_blank", sv: "Var ___ tunnelbanan?", en: "Where is the metro?", ipa: "vɑːr ɛː ˈtɵnːɛlˌbɑːnan", answer: "är", bank: ["är", "till", "från", "kommer"] },
      { type: "match_pairs", items: ["var_ar", "till", "fran", "hoger", "vanster", "rakt_fram"] }
    ],
    culture: ["allemansratten"] });

  /* ---------------------------- UNIT 6 ---------------------------- */
  add({ id: "l17", unit: "u6", title: "Places to see", icon: "🏰",
    teach: ["gamla_stan", "slottet", "museet", "kyrka", "torg"],
    exercises: [
      { type: "flashcards", items: ["gamla_stan", "slottet", "museet", "kyrka", "torg"] },
      { type: "mc_img_word", items: ["slottet", "museet", "kyrka", "torg"] },
      { type: "listen_choose", items: ["gamla_stan", "slottet", "museet", "kyrka"] },
      { type: "match_pairs", items: ["gamla_stan", "slottet", "museet", "kyrka", "torg"] }
    ],
    culture: ["vasa"] });

  add({ id: "l18", unit: "u6", title: "Useful questions", icon: "❓",
    teach: ["oppettider", "var_ar_toaletten", "kan_jag_ta_ett_foto"],
    exercises: [
      { type: "flashcards", items: ["oppettider", "var_ar_toaletten", "kan_jag_ta_ett_foto"] },
      { type: "mc_word_en", items: ["oppettider", "var_ar_toaletten", "kan_jag_ta_ett_foto"] },
      { type: "fill_blank", sv: "Var är ___?", en: "Where is the toilet?", ipa: "vɑːr ɛː tuaˈlɛtːɛn", answer: "toaletten", bank: ["toaletten", "slottet", "museet", "torget"] },
      { type: "listen_repeat", items: ["var_ar_toaletten", "kan_jag_ta_ett_foto"] }
    ],
    culture: ["midsommar"] });

  LSV.data.lessons = L;
})();
