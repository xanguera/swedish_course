#!/usr/bin/env node
/* verify_content.js — checks that every reference in every course resolves and
   that each L1 fully covers each target course.  Run: node scripts/verify_content.js
   (exit code 1 on any error) */
"use strict";
const path = require("path");
global.window = {};
global.LSV = { data: {} };
const R = (rel) => require(path.join(__dirname, "..", rel));
R("js/i18n.js");
R("js/coredata.js");
// Course data — each file registers its slices under a target code.
["data/vocab.js", "data/culture.js", "data/lessons.js", "data/course.js",
 "data/vocab_ca.js", "data/culture_ca.js", "data/lessons_ca.js", "data/course_ca.js"].forEach(R);
// Language registry + content/UI packs.
["data/i18n_en.js", "data/i18n_pt.js", "data/i18n_ca.js", "data/i18n_ca_pt.js"].forEach(R);

const I = LSV.i18n;
const errs = [], warns = [];

// Course-flavoured UI keys: for the base target (sv) they live in ui[L1]; every
// other target must override them per (L1, target) or the UI leaks another course.
const FLAVORED = ["hero_hi_t", "hero_hi_s", "hero_keep_t", "hero_done_t", "audio_tip",
  "made_with", "culture_title", "culture_sub", "welcome_title", "welcome_sub", "celebrate_t"];
const BASE_TARGET = "sv";

function verifyTarget(target) {
  LSV.data.useTarget(target);
  const { vocab, lessons, course, cultureById } = LSV.data;
  const E = (m) => errs.push(`{${target}} ${m}`);
  const W = (m) => warns.push(`{${target}} ${m}`);

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
    if (referenced.indexOf(lid) < 0) W(`lesson '${lid}' is defined but not in any unit`);
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

  // 3. Enough distractors: every MC/listen target should share a tag with >=3 others.
  const all = Object.values(vocab);
  Object.keys(lessons).forEach((lid) => {
    (lessons[lid].exercises || []).forEach((ex) => {
      if (["mc_img_word", "mc_word_en", "listen_choose"].indexOf(ex.type) < 0) return;
      (ex.items || []).forEach((id) => {
        const t = vocab[id]; if (!t) return;
        const sameTag = all.filter((w) => w.id !== id && w.tags.some((tag) => t.tags.indexOf(tag) >= 0));
        if (sameTag.length < 3) W(`'${id}' has only ${sameTag.length} same-tag distractors (will pad from all vocab)`);
      });
    });
  });

  // 4. Vocab sanity: required fields.
  Object.keys(vocab).forEach((id) => {
    const w = vocab[id];
    ["l2", "en", "img", "tags"].forEach((k) => { if (w[k] == null) E(`vocab '${id}' missing '${k}'`); });
    if (!Array.isArray(w.tags) || !w.tags.length) E(`vocab '${id}' has no tags`);
  });

  // 5. Content-pack completeness for every non-English L1 against THIS target.
  const uiKeys = Object.keys(I.ui.en || {});
  const moduleIds = [];
  course.units.forEach((u) => u.modules.forEach((m) => moduleIds.push(m.id)));
  Object.keys(I.langs).filter((code) => code !== "en").forEach((code) => {
    const c = (I.content[code] && I.content[code][target]) || {};
    const ui = I.ui[code] || {};
    uiKeys.forEach((k) => { if (ui[k] == null) E(`[${code}] missing UI string '${k}'`); });
    Object.keys(vocab).forEach((id) => { if (!c.vocab || c.vocab[id] == null || c.vocab[id].t == null) E(`[${code}] missing vocab translation '${id}'`); });
    Object.keys(lessons).forEach((id) => { if (!c.lessons || c.lessons[id] == null) E(`[${code}] missing lesson title '${id}'`); });
    course.units.forEach((u) => { if (!c.units || c.units[u.id] == null) E(`[${code}] missing unit title '${u.id}'`); });
    moduleIds.forEach((mid) => { if (!c.modules || c.modules[mid] == null) E(`[${code}] missing module title '${mid}'`); });
    LSV.data.culture.forEach((cc) => { if (!c.culture || !c.culture[cc.id] || !c.culture[cc.id].title || !c.culture[cc.id].body) E(`[${code}] missing/incomplete culture card '${cc.id}'`); });
    Object.keys(lessons).forEach((id) => {
      const hasFill = (lessons[id].exercises || []).some((ex) => ex.type === "fill_blank");
      if (hasFill) { const v = c.lessons && c.lessons[id]; if (!v || typeof v !== "object" || v.fill == null) E(`[${code}] lesson '${id}' has a fill_blank but no localized 'fill' hint`); }
    });
  });

  // 6. Course-flavoured UI: non-base targets must override every FLAVORED key per L1,
  //    else the screen leaks the base course's mascot/hero/culture text.
  if (target !== BASE_TARGET) {
    Object.keys(I.langs).forEach((code) => {
      const ut = (I.uiTarget[code] && I.uiTarget[code][target]) || {};
      FLAVORED.forEach((k) => { if (ut[k] == null) E(`[${code}] missing course UI override '${k}' for target '${target}'`); });
    });
  }

  return { v: Object.keys(vocab).length, l: Object.keys(lessons).length, u: course.units.length, c: LSV.data.culture.length };
}

const targets = Object.keys(LSV.data.courses);
targets.forEach((t) => {
  const s = verifyTarget(t);
  console.log(`[${t}]  Vocab: ${s.v}  Lessons: ${s.l}  Units: ${s.u}  Culture: ${s.c}`);
});
console.log(`Languages: ${Object.keys(I.langs).join("+")}   Targets: ${targets.join("+")}`);
if (warns.length) { console.log("\nWARNINGS:"); warns.forEach((w) => console.log("  ⚠ " + w)); }
if (errs.length) { console.log("\nERRORS:"); errs.forEach((e) => console.log("  ✗ " + e)); process.exit(1); }
console.log("\n✓ All references resolve. Every course is consistent.");
