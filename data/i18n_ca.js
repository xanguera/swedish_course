/* i18n_ca.js — registers the Catalan (ca) target and the English course-flavoured
   UI overrides for it (mascot, hero, culture header, welcome). Generic English UI
   strings are inherited from data/i18n_en.js; only the course-specific ones differ. */
(function () {
  "use strict";
  var I = LSV.i18n;

  I.registerTarget("ca", {
    name: "Catalan", endonym: "Català", flag: "🟨🟥", bcp47: "ca-ES",
    mascot: "🐉", mascotName: "en Drac"
  });

  I.registerUITarget("en", "ca", {
    hero_hi_t: "Bon dia! Em dic Drac.", hero_hi_s: "Hi! I'm Drac. Let's learn Catalan!",
    hero_keep_t: "Molt bé! Keep going.",
    hero_done_t: "Felicitats! You did it!",
    audio_tip: "Tip: audio uses your browser's Catalan voice. If you don't hear it, try Safari or Chrome, or add your own recordings later.",
    made_with: "Made with ❤️ for a Barcelona trip",
    culture_title: "Sabies que? 🟨🟥",
    culture_sub: "Did you know? — Catalan traditions & Barcelona facts",
    welcome_title: "Benvinguts!",
    welcome_sub: "Learn a little Catalan for a trip to Barcelona — words, phrases and fun facts, one small step at a time.",
    celebrate_t: "Molt bé!"
  });
})();
