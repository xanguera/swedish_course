/* i18n.js — localization engine + language settings.
   The Swedish course (vocab `sv`, ids, lesson structure, culture facts) is
   language-neutral. Each mother tongue (L1) provides:
     - UI strings           via LSV.i18n.registerUI(code, {...})
     - content translations via LSV.i18n.registerContent(code, {...})
   English is the SOURCE language: its strings live inline in data/*.js and
   are used as the fallback, so a partially-translated language still works.

   To add a new L1 later: registerLang(code, meta) + registerUI + registerContent.
   To add a new L2 (target) later: registerTarget(code, meta) + a parallel course. */
(function () {
  "use strict";
  var SKEY = "lsv:settings";

  var I = {
    L1: "en", L2: "sv", onboarded: false,
    langs: {}, targets: {}, ui: {}, content: {}, _course: null
  };

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem(SKEY) || "null");
      if (s) { I.L1 = s.l1 || "en"; I.L2 = s.l2 || "sv"; I.onboarded = !!s.onboarded; }
    } catch (e) { /* no storage (e.g. node) */ }
  }
  function saveSettings() {
    try { localStorage.setItem(SKEY, JSON.stringify({ l1: I.L1, l2: I.L2, onboarded: !!I.onboarded })); } catch (e) {}
  }
  function interp(s, vars) {
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }

  I.registerLang = function (code, meta) { I.langs[code] = Object.assign({ code: code }, meta); };
  I.registerTarget = function (code, meta) { I.targets[code] = Object.assign({ code: code }, meta); };
  I.registerUI = function (code, obj) { I.ui[code] = Object.assign(I.ui[code] || {}, obj); };
  I.registerContent = function (code, obj) { I.content[code] = obj; };

  /* UI string for the current L1 (fallback: English, then the key itself). */
  I.t = function (key, vars) {
    var s = I.ui[I.L1] && I.ui[I.L1][key];
    if (s == null) s = I.ui.en && I.ui.en[key];
    if (s == null) s = key;
    return interp(s, vars);
  };

  /* Merged vocab view for the current L1: {id, sv, img, tags, t, note}. */
  I.word = function (id) {
    var w = LSV.data.vocab[id];
    if (!w) return null;
    var c = I.content[I.L1], o = c && c.vocab && c.vocab[id];
    return {
      id: id, sv: w.sv, img: w.img, tags: w.tags,
      t: (o && o.t != null) ? o.t : w.en,
      note: (o && o.note != null) ? o.note : (w.note || "")
    };
  };
  I.tr = function (id) { var w = I.word(id); return w ? w.t : id; };

  function lessonEntry(id) {
    var c = I.content[I.L1];
    if (c && c.lessons && c.lessons[id] != null) return c.lessons[id];
    return LSV.data.lessons[id] ? LSV.data.lessons[id].title : id;
  }
  I.lessonTitle = function (id) { var v = lessonEntry(id); return (v && typeof v === "object") ? v.title : v; };
  I.fillHint = function (lessonId, fallback) {
    var v = lessonEntry(lessonId);
    if (v && typeof v === "object" && v.fill != null) return v.fill;
    return fallback;
  };

  function courseMaps() {
    if (I._course) return I._course;
    var u = {}, m = {};
    (LSV.data.course.units || []).forEach(function (unit) {
      u[unit.id] = unit;
      (unit.modules || []).forEach(function (mod) { m[mod.id] = mod; });
    });
    I._course = { u: u, m: m };
    return I._course;
  }
  I.unitTitle = function (id) {
    var c = I.content[I.L1];
    if (c && c.units && c.units[id] != null) return c.units[id];
    var mp = courseMaps(); return mp.u[id] ? mp.u[id].title : id;
  };
  I.moduleTitle = function (id) {
    var c = I.content[I.L1];
    if (c && c.modules && c.modules[id] != null) return c.modules[id];
    var mp = courseMaps(); return mp.m[id] ? mp.m[id].title : id;
  };
  I.cultureTitle = function (id) {
    var c = I.content[I.L1];
    if (c && c.culture && c.culture[id]) return c.culture[id].title;
    var cc = LSV.data.cultureById[id]; return cc ? cc.title : id;
  };
  I.cultureBody = function (id) {
    var c = I.content[I.L1];
    if (c && c.culture && c.culture[id]) return c.culture[id].body;
    var cc = LSV.data.cultureById[id]; return cc ? cc.body : "";
  };

  /* settings */
  I.setL1 = function (code) { if (I.langs[code]) { I.L1 = code; saveSettings(); } };
  I.setL2 = function (code) { if (I.targets[code]) { I.L2 = code; saveSettings(); } };
  I.completeOnboarding = function (l1, l2) { I.L1 = l1 || "en"; I.L2 = l2 || "sv"; I.onboarded = true; saveSettings(); };
  I.isOnboarded = function () { return !!I.onboarded; };
  I.langList = function () { return Object.keys(I.langs).map(function (k) { return I.langs[k]; }); };
  I.targetList = function () { return Object.keys(I.targets).map(function (k) { return I.targets[k]; }); };
  I.currentFlag = function () { return (I.langs[I.L1] && I.langs[I.L1].flag) || "🌐"; };

  loadSettings();
  LSV.i18n = I;
})();
