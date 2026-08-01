/* coredata.js — per-target course registry.
   Each course (one target language, L2) registers its data under its L2 code:
     LSV.data.registerCourse("sv", { vocab: {...} });   // from data/vocab.js
     LSV.data.registerCourse("sv", { lessons: {...} });  // from data/lessons.js
     ... culture, course likewise.
   The active target's slices are exposed as LSV.data.vocab / lessons / course /
   culture / cultureById via LSV.data.useTarget(code), which the app calls at boot
   and whenever the learner switches L2. This is what makes adding a language purely
   additive: drop in its data files + registerTarget(code) — no engine changes. */
(function () {
  "use strict";
  // Reference the same `LSV` global the other modules use: in the browser it is
  // window.LSV (created by util.js); in Node it is global.LSV (set by the scripts).
  LSV.data = LSV.data || {};
  var D = LSV.data;
  D.courses = D.courses || {};

  D.registerCourse = function (code, slice) {
    var c = D.courses[code] || (D.courses[code] = {});
    Object.keys(slice).forEach(function (k) { c[k] = slice[k]; });
    // Derive a by-id culture index if a culture list was provided.
    if (slice.culture) {
      c.cultureById = {};
      slice.culture.forEach(function (x) { c.cultureById[x.id] = x; });
    }
    return c;
  };

  /* Point the active LSV.data.* slices at one target's course. */
  D.useTarget = function (code) {
    var c = D.courses[code] || {};
    D.vocab = c.vocab || {};
    D.lessons = c.lessons || {};
    D.course = c.course || { units: [] };
    D.culture = c.culture || [];
    D.cultureById = c.cultureById || {};
    D.activeTarget = code;
    if (LSV.i18n) LSV.i18n._course = null; // invalidate unit/module cache
    return D;
  };
})();
