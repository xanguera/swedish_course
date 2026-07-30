/* i18n_en.js — English (source language) UI strings, plus the language registry.
   English content (vocab meanings, lesson/unit titles, culture) lives inline in
   data/*.js and is used as the fallback, so no English content pack is needed. */
(function () {
  "use strict";
  var I = LSV.i18n;

  // Language registry (L1 = mother tongues, L2 = languages you can learn).
  I.registerLang("en", { name: "English", endonym: "English", flag: "🇬🇧" });
  I.registerLang("pt", { name: "Portuguese (European)", endonym: "Português", flag: "🇵🇹" });
  I.registerTarget("sv", { name: "Swedish", endonym: "Svenska", flag: "🇸🇪" });

  I.registerUI("en", {
    // tabs / chrome
    tab_learn: "Learn", tab_practice: "Practice", tab_culture: "Culture", tab_phrases: "Phrases",
    foot_check: "CHECK", foot_continue: "CONTINUE",
    node_start: "START", node_continue: "CONTINUE",

    // exercises
    fc_title: "New words — tap a card to flip",
    fc_hint: "tap card for meaning",
    fc_back: "‹ Back", fc_next: "Next ›",
    q_which: "Which word is this?",
    q_meaning: "What does this mean?",
    q_listen: "Tap what you hear",
    q_listen_hint: "Listen, then choose",
    q_match: "Tap the matching pairs",
    q_fill: "Fill in the blank",
    q_repeat: "Listen, then say it out loud 🎤",
    said: "I said it! 🎤", said_last: "I said it! ✅",
    fb_notquite: "Not quite", fb_answer: "Answer: ",
    match_praise: "You matched them all — nice persistence!",
    didyouknow: "Did you know?",

    // home / hero
    hero_hi_t: "Hej! Jag heter Älgot.", hero_hi_s: "Hi! I'm Älgot. Let's learn Swedish!",
    hero_keep_t: "Bra jobbat! Keep going.", hero_keep_s: "{done} of {total} lessons done",
    hero_done_t: "Grattis! You did it!", hero_done_s: "You finished the whole course 🎉",
    audio_tip: "Tip: audio uses your browser's Swedish voice. If you don't hear it, try Safari or Chrome, or add your own recordings later.",
    made_with: "Made with ❤️ for our Stockholm trip",
    phrasebook_link: "Phrasebook",
    unit_word: "Unit",

    // culture / phrasebook / practice
    culture_title: "Visste du? 🇸🇪", culture_sub: "Did you know? — Swedish traditions & Stockholm facts",
    phrase_title: "Phrasebook 📖", phrase_sub: "Every word & phrase — tap 🔊 to hear it. Great to use on the go!",
    practice_title: "Practice 🔁",
    practice_empty: "Learn a few lessons first, then come back here to review the words you've met.",
    practice_go: "Go to lessons",
    practice_intro: "Refresh the words you've learned — weakest first. Good for the plane!",
    practice_start: "Start review ({n} words)",

    // toasts / celebration
    toast_locked_path: "Finish the earlier lessons first 🔒",
    toast_locked: "That lesson is still locked 🔒",
    celebrate_t: "Bra jobbat!", celebrate_s: "Great job — lesson complete!",
    celebrate_review_t: "Practice done!", celebrate_review_s: "Nice reviewing 🔁",
    reward_xp: "XP", reward_acc: "Accuracy",

    // welcome / setup
    welcome_title: "Välkommen!",
    welcome_sub: "Learn a little Swedish for a family trip to Stockholm — words, phrases and fun facts, one small step at a time.",
    welcome_btn: "Get started",
    setup_title: "Set up your course",
    setup_l1: "I speak",
    setup_l2: "I want to learn",
    setup_l2_note: "More languages coming soon",
    setup_btn: "Start learning",
    setup_close: "Close"
  });
})();
