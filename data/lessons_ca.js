/* lessons_ca.js — Catalan (ca) course lessons = teach items + exercises + culture.
   Exercise types match the engine (see js/exercises.js). Distractors for MC/listen
   are generated from vocab that shares a tag. Registered under the "ca" target. */
(function () {
  "use strict";
  var L = {};
  function add(o) { L[o.id] = o; }

  /* ---------------------------- UNIT 1 ---------------------------- */
  add({ id: "l01", unit: "u1", title: "Saying hello", icon: "👋",
    teach: ["hola", "bon_dia", "bona_tarda", "adeu"],
    exercises: [
      { type: "flashcards", items: ["hola", "bon_dia", "bona_tarda", "adeu"] },
      { type: "mc_img_word", items: ["hola", "bon_dia"] },
      { type: "mc_word_en", items: ["bona_tarda", "adeu"] },
      { type: "match_pairs", items: ["hola", "bon_dia", "bona_tarda", "adeu"] }
    ],
    culture: ["dos_petons"] });

  add({ id: "l02", unit: "u1", title: "Thanks, yes and no", icon: "🙏",
    teach: ["gracies", "moltes_gracies", "de_res", "si", "no"],
    exercises: [
      { type: "flashcards", items: ["gracies", "moltes_gracies", "de_res", "si", "no"] },
      { type: "mc_word_en", items: ["gracies", "de_res"] },
      { type: "listen_choose", items: ["si", "no", "gracies"] },
      { type: "match_pairs", items: ["gracies", "moltes_gracies", "de_res", "si", "no"] }
    ],
    culture: ["dues_llengues"] });

  add({ id: "l03", unit: "u1", title: "Sorry and excuse me", icon: "🙇",
    teach: ["perdo", "perdoni", "si_us_plau"],
    exercises: [
      { type: "flashcards", items: ["perdo", "perdoni", "si_us_plau"] },
      { type: "mc_word_en", items: ["perdo", "perdoni", "si_us_plau"] },
      { type: "listen_choose", items: ["perdo", "perdoni", "si_us_plau"] }
    ],
    culture: [] });

  add({ id: "l04", unit: "u1", title: "Your first phrases", icon: "🗣️",
    teach: ["parla_angles", "no_ho_entenc", "em_dic"],
    exercises: [
      { type: "flashcards", items: ["parla_angles", "no_ho_entenc", "em_dic"] },
      { type: "mc_word_en", items: ["parla_angles", "no_ho_entenc", "em_dic"] },
      { type: "listen_repeat", items: ["parla_angles", "em_dic"] }
    ],
    culture: ["sant_jordi"] });

  /* ---------------------------- UNIT 2 ---------------------------- */
  add({ id: "l05", unit: "u2", title: "You and me", icon: "🧑",
    teach: ["jo", "tu", "ell", "ella", "com_et_dius"],
    exercises: [
      { type: "flashcards", items: ["jo", "tu", "ell", "ella", "com_et_dius"] },
      { type: "mc_word_en", items: ["jo", "tu", "ell", "ella"] },
      { type: "match_pairs", items: ["jo", "tu", "ell", "ella"] },
      { type: "listen_repeat", items: ["com_et_dius"] }
    ],
    culture: [] });

  add({ id: "l06", unit: "u2", title: "Family", icon: "👨‍👩‍👧‍👦",
    teach: ["mare", "pare", "germana", "germa", "familia"],
    exercises: [
      { type: "flashcards", items: ["mare", "pare", "germana", "germa", "familia"] },
      { type: "mc_img_word", items: ["mare", "pare", "germana", "germa"] },
      { type: "mc_word_en", items: ["familia", "germana"] },
      { type: "match_pairs", items: ["mare", "pare", "germana", "germa"] }
    ],
    culture: ["caga_tio"] });

  add({ id: "l07", unit: "u2", title: "Small talk", icon: "💬",
    teach: ["com_estas", "molt_be", "don_ets", "soc_de"],
    exercises: [
      { type: "flashcards", items: ["com_estas", "molt_be", "don_ets", "soc_de"] },
      { type: "mc_word_en", items: ["com_estas", "molt_be", "don_ets", "soc_de"] },
      { type: "listen_repeat", items: ["com_estas", "soc_de"] }
    ],
    culture: ["sant_joan"] });

  /* ---------------------------- UNIT 3 ---------------------------- */
  add({ id: "l08", unit: "u3", title: "Numbers 0–10", icon: "🔢",
    teach: ["zero", "u", "dos", "tres", "quatre", "cinc", "sis", "set", "vuit", "nou", "deu"],
    exercises: [
      { type: "flashcards", items: ["zero", "u", "dos", "tres", "quatre", "cinc"] },
      { type: "flashcards", items: ["sis", "set", "vuit", "nou", "deu"] },
      { type: "mc_img_word", items: ["tres", "cinc", "vuit"] },
      { type: "listen_choose", items: ["u", "dos", "set", "deu"] },
      { type: "match_pairs", items: ["u", "dos", "tres", "quatre"] }
    ],
    culture: [] });

  add({ id: "l09", unit: "u3", title: "Numbers 11–100", icon: "💯",
    teach: ["onze", "dotze", "tretze", "catorze", "quinze", "setze", "disset", "divuit", "dinou", "vint", "trenta", "quaranta", "cent"],
    exercises: [
      { type: "flashcards", items: ["onze", "dotze", "tretze", "catorze", "quinze", "setze"] },
      { type: "flashcards", items: ["disset", "divuit", "dinou", "vint", "trenta", "quaranta", "cent"] },
      { type: "mc_img_word", items: ["onze", "quinze", "vint"] },
      { type: "listen_choose", items: ["dotze", "setze", "trenta", "cent"] },
      { type: "match_pairs", items: ["vint", "trenta", "quaranta", "cent"] }
    ],
    culture: [] });

  add({ id: "l10", unit: "u3", title: "Talking about shopping", icon: "🛍️",
    teach: ["quant_costa", "euros", "car", "barat", "voldria"],
    exercises: [
      { type: "flashcards", items: ["quant_costa", "euros", "car", "barat", "voldria"] },
      { type: "mc_word_en", items: ["car", "barat", "euros"] },
      { type: "listen_choose", items: ["quant_costa", "euros", "voldria"] },
      { type: "match_pairs", items: ["quant_costa", "euros", "car", "barat"] }
    ],
    culture: [] });

  add({ id: "l11", unit: "u3", title: "I'd like this — un / una", icon: "🔵",
    teach: ["un", "una", "aixo"],
    exercises: [
      { type: "flashcards", items: ["un", "una", "aixo"] },
      { type: "mc_word_en", items: ["un", "una", "aixo"] },
      { type: "listen_repeat", items: ["aixo"] }
    ],
    culture: [] });

  /* ---------------------------- UNIT 4 ---------------------------- */
  add({ id: "l12", unit: "u4", title: "At the café and bar", icon: "☕",
    teach: ["cafe", "tallat", "cafe_amb_llet", "canya", "croissant"],
    exercises: [
      { type: "flashcards", items: ["cafe", "tallat", "cafe_amb_llet", "canya", "croissant"] },
      { type: "mc_img_word", items: ["cafe", "canya", "croissant"] },
      { type: "mc_word_en", items: ["tallat", "cafe_amb_llet"] },
      { type: "match_pairs", items: ["cafe", "tallat", "canya", "croissant"] }
    ],
    culture: ["vermut"] });

  add({ id: "l13", unit: "u4", title: "Ordering at a café", icon: "🧑‍🍳",
    teach: ["un_cafe_si_us_plau", "per_emportar"],
    exercises: [
      { type: "flashcards", items: ["un_cafe_si_us_plau", "per_emportar"] },
      { type: "fill_blank", l2: "Un ___, si us plau", en: "A coffee, please", ipa: "uŋ kəˈfɛ ˌsius ˈplaw", answer: "cafè", bank: ["cafè", "tallat", "aigua", "vi"] },
      { type: "listen_repeat", items: ["un_cafe_si_us_plau", "per_emportar"] }
    ],
    culture: ["pa_amb_tomaquet"] });

  add({ id: "l14", unit: "u4", title: "Meals and drinks", icon: "🍽️",
    teach: ["esmorzar", "dinar", "sopar", "aigua", "vi", "el_compte", "bon_profit"],
    exercises: [
      { type: "flashcards", items: ["esmorzar", "dinar", "sopar", "aigua", "vi", "el_compte", "bon_profit"] },
      { type: "mc_img_word", items: ["aigua", "vi", "sopar"] },
      { type: "mc_word_en", items: ["esmorzar", "dinar", "el_compte"] },
      { type: "match_pairs", items: ["esmorzar", "dinar", "sopar", "aigua"] }
    ],
    culture: ["calcots"] });

  /* ---------------------------- UNIT 5 ---------------------------- */
  add({ id: "l15", unit: "u5", title: "Getting around", icon: "🚇",
    teach: ["metro", "autobus", "tren", "tramvia", "bitllet"],
    exercises: [
      { type: "flashcards", items: ["metro", "autobus", "tren", "tramvia", "bitllet"] },
      { type: "mc_img_word", items: ["metro", "autobus", "tren", "tramvia"] },
      { type: "listen_choose", items: ["metro", "tren", "bitllet"] },
      { type: "match_pairs", items: ["metro", "autobus", "tren", "tramvia"] }
    ],
    culture: [] });

  add({ id: "l16", unit: "u5", title: "Directions", icon: "🧭",
    teach: ["on_es", "a", "de", "dreta", "esquerra", "tot_recte"],
    exercises: [
      { type: "flashcards", items: ["on_es", "dreta", "esquerra", "tot_recte", "a", "de"] },
      { type: "mc_word_en", items: ["dreta", "esquerra", "tot_recte"] },
      { type: "fill_blank", l2: "On és el ___?", en: "Where is the metro?", ipa: "ˈon ˈes əl ˈmɛtɾu", answer: "metro", bank: ["metro", "tren", "mercat", "museu"] },
      { type: "listen_repeat", items: ["on_es"] }
    ],
    culture: ["castellers"] });

  /* ---------------------------- UNIT 6 ---------------------------- */
  add({ id: "l17", unit: "u6", title: "Places to see", icon: "🏛️",
    teach: ["barri_gotic", "sagrada_familia", "museu", "mercat", "placa", "horari"],
    exercises: [
      { type: "flashcards", items: ["barri_gotic", "sagrada_familia", "museu", "mercat", "placa", "horari"] },
      { type: "mc_img_word", items: ["museu", "mercat", "placa"] },
      { type: "mc_word_en", items: ["barri_gotic", "sagrada_familia", "horari"] },
      { type: "match_pairs", items: ["museu", "mercat", "placa", "horari"] }
    ],
    culture: ["gaudi", "fc_barca"] });

  add({ id: "l18", unit: "u6", title: "Useful questions", icon: "❓",
    teach: ["on_es_el_lavabo", "puc_fer_una_foto"],
    exercises: [
      { type: "flashcards", items: ["on_es_el_lavabo", "puc_fer_una_foto"] },
      { type: "mc_word_en", items: ["on_es_el_lavabo", "puc_fer_una_foto"] },
      { type: "fill_blank", l2: "On és el ___?", en: "Where is the toilet?", ipa: "ˈon ˈes əl ləˈβaβu", answer: "lavabo", bank: ["lavabo", "metro", "mercat", "museu"] },
      { type: "listen_repeat", items: ["on_es_el_lavabo", "puc_fer_una_foto"] }
    ],
    culture: ["la_merce"] });

  LSV.data.registerCourse("ca", { lessons: L });
})();
