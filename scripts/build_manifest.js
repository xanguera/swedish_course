#!/usr/bin/env node
/* Regenerates assets/audio/manifest.json from every registered course's vocab.
   One entry per clip, across all targets (audio lives in assets/audio/<L2>/).
   Run whenever you add or change vocabulary:  node scripts/build_manifest.js */
"use strict";
const fs = require("fs");
const path = require("path");

global.window = {};
global.LSV = { data: {} };
require(path.join(__dirname, "..", "js", "coredata.js"));
// Every course's vocab (one file per target, each registers under its code).
["vocab", "vocab_ca"].forEach((f) => require(path.join(__dirname, "..", "data", f + ".js")));

const courses = global.LSV.data.courses;
const list = [];
Object.keys(courses).forEach((code) => {
  const vocab = courses[code].vocab || {};
  Object.keys(vocab).forEach((id) => {
    list.push({
      id: id,
      target: code,
      l2: vocab[id].l2,
      en: vocab[id].en,
      file: "assets/audio/" + code + "/" + id + ".mp3"
    });
  });
});

const out = path.join(__dirname, "..", "assets", "audio", "manifest.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(list, null, 2) + "\n");
console.log("Wrote " + list.length + " entries to assets/audio/manifest.json");
