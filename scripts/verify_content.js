#!/usr/bin/env node
/* verify_content.js — checks that every reference in the course resolves.
   Run: node scripts/verify_content.js  (exit code 1 on any error) */
"use strict";
const path = require("path");
global.window = {};
global.LSV = { data: {} };
require(path.join(__dirname, "..", "js", "i18n.js"));
require(path.join(__dirname, "..", "js", "coredata.js"));
["vocab", "culture", "lessons", "course"].forEach((f) =>
  require(path.join(__dirname, "..", "data", f + ".js")));
["i18n_en", "i18n_pt"].forEach((f) => require(path.join(__dirname, "..", "data", f + ".js")));

// Activate the target course to verify. (One target today; when more courses are
// registered, wrap the checks below in a loop over Object.keys(LSV.data.courses).)
LSV.data.useTarget("sv");
const { vocab, lessons, course, cultureById } = LSV.data;
const errs = [];
const warns = [];
const E = (m) => errs.push(m);

// 1. Every lesson referenced by the course exists; collect order + dupes.
const referenced = [];
const unitIds = new Set();
course.units.forEach((u) => {
  unitIds.add(u.id);
  u.modules.forEach((m) =>
    m.lessons.forEach((lid) => {
      referenced.push(lid);
      if (!lessons[lid]) E(`course references missing lesson '${lid}'`);
    }));
});
referenced.forEach((lid, i) => {
  if (referenced.indexOf(lid) !== i) E(`lesson '${lid}' referenced more than once`);
});
Object.keys(lessons).forEach((lid) => {
  if (referenced.indexOf(lid) < 0) warns.push(`lesson '${lid}' is defined but not in any unit`);
});

// 2. Each lesson's ids resolve.
const idRefTypes = { mc_img_word: 1, mc_word_en: 1, listen_choose: 1, match_pairs: 1, flashcards: 1, listen_repeat: 1 };
Object.keys(lessons).forEach((lid) => {
  const l = lessons[lid];
  if (!unitIds.has(l.unit)) E(`lesson '${lid}' has unknown unit '${l.unit}'`);
  (l.teach || []).forEach((id) => { if (!vocab[id]) E(`lesson '${lid}' teaches missing vocab '${id}'`); });
  (l.exercises || []).forEach((ex, xi) => {
    if (idRefTypes[ex.type]) {
      (ex.items || []).forEach((id) => { if (!vocab[id]) E(`lesson '${lid}' ex#${xi} (${ex.type}) missing vocab '${id}'`); });
      if (!ex.items || ex.items.length === 0) E(`lesson '${lid}' ex#${xi} (${ex.type}) has no items`);
    } else if (ex.type === "fill_blank") {
      if (!ex.answer) E(`lesson '${lid}' fill_blank missing answer`);
      if (!ex.bank || ex.bank.indexOf(ex.answer) < 0) E(`lesson '${lid}' fill_blank answer '${ex.answer}' not in bank`);
      if ((ex.l2 || "").indexOf("___") < 0) E(`lesson '${lid}' fill_blank l2 has no '___' blank`);
    } else {
      E(`lesson '${lid}' ex#${xi} has unknown type '${ex.type}'`);
    }
  });
  (l.culture || []).forEach((cid) => { if (!cultureById[cid]) E(`lesson '${lid}' references missing culture card '${cid}'`); });
});

// 3. Enough distractors: every MC/listen target must share a tag with >=3 others (else we pad — warn only).
const all = Object.values(vocab);
Object.keys(lessons).forEach((lid) => {
  (lessons[lid].exercises || []).forEach((ex) => {
    if (["mc_img_word", "mc_word_en", "listen_choose"].indexOf(ex.type) < 0) return;
    (ex.items || []).forEach((id) => {
      const t = vocab[id]; if (!t) return;
      const sameTag = all.filter((w) => w.id !== id && w.tags.some((tag) => t.tags.indexOf(tag) >= 0));
      if (sameTag.length < 3) warns.push(`'${id}' has only ${sameTag.length} same-tag distractors (will pad from all vocab)`);
    });
  });
});

// 4. Vocab sanity: required fields.
Object.keys(vocab).forEach((id) => {
  const w = vocab[id];
  ["l2", "en", "img", "tags"].forEach((k) => { if (w[k] == null) E(`vocab '${id}' missing '${k}'`); });
  if (!Array.isArray(w.tags) || !w.tags.length) E(`vocab '${id}' has no tags`);
});

// 5. Translation-pack completeness for every non-English language.
const I = LSV.i18n;
const uiKeys = Object.keys(I.ui.en || {});
const moduleIds = [];
course.units.forEach((u) => u.modules.forEach((m) => moduleIds.push(m.id)));
Object.keys(I.langs).filter((code) => code !== "en").forEach((code) => {
  const c = I.content[code] || {};
  const ui = I.ui[code] || {};
  uiKeys.forEach((k) => { if (ui[k] == null) E(`[${code}] missing UI string '${k}'`); });
  Object.keys(vocab).forEach((id) => { if (!c.vocab || c.vocab[id] == null || c.vocab[id].t == null) E(`[${code}] missing vocab translation '${id}'`); });
  Object.keys(lessons).forEach((id) => { if (!c.lessons || c.lessons[id] == null) E(`[${code}] missing lesson title '${id}'`); });
  course.units.forEach((u) => { if (!c.units || c.units[u.id] == null) E(`[${code}] missing unit title '${u.id}'`); });
  moduleIds.forEach((mid) => { if (!c.modules || c.modules[mid] == null) E(`[${code}] missing module title '${mid}'`); });
  LSV.data.culture.forEach((cc) => { if (!c.culture || !c.culture[cc.id] || !c.culture[cc.id].title || !c.culture[cc.id].body) E(`[${code}] missing/incomplete culture card '${cc.id}'`); });
  // fill-blank hints must exist for lessons that have a fill_blank
  Object.keys(lessons).forEach((id) => {
    const hasFill = (lessons[id].exercises || []).some((ex) => ex.type === "fill_blank");
    if (hasFill) { const v = c.lessons && c.lessons[id]; if (!v || typeof v !== "object" || v.fill == null) E(`[${code}] lesson '${id}' has a fill_blank but no localized 'fill' hint`); }
  });
});

// Report
console.log(`Vocab: ${Object.keys(vocab).length}  Lessons: ${Object.keys(lessons).length}  Units: ${course.units.length}  Culture: ${LSV.data.culture.length}  Languages: ${Object.keys(I.langs).join("+")}`);
if (warns.length) { console.log("\nWARNINGS:"); warns.forEach((w) => console.log("  ⚠ " + w)); }
if (errs.length) { console.log("\nERRORS:"); errs.forEach((e) => console.log("  ✗ " + e)); process.exit(1); }
console.log("\n✓ All references resolve. Content is consistent.");
