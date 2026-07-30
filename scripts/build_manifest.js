#!/usr/bin/env node
/* Regenerates assets/audio/manifest.json from data/vocab.js.
   Run whenever you add or change vocabulary:  node scripts/build_manifest.js */
"use strict";
const fs = require("fs");
const path = require("path");

global.window = {};
global.LSV = { data: {} };
require(path.join(__dirname, "..", "data", "vocab.js"));

const vocab = global.LSV.data.vocab;
const list = Object.keys(vocab).map((id) => ({
  id: id,
  swedish: vocab[id].sv,
  english: vocab[id].en,
  file: "assets/audio/sv/" + id + ".mp3"
}));

const out = path.join(__dirname, "..", "assets", "audio", "manifest.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(list, null, 2) + "\n");
console.log("Wrote " + list.length + " entries to assets/audio/manifest.json");
