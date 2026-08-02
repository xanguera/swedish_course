/* audio.js — plays target-language (L2) audio.
   Strategy:
     1. If assets/audio/<L2>/<id>.mp3 exists, play it (best quality, your recordings).
     2. Otherwise fall back to the browser's L2 speech synthesis.
   The audio folder and the speech language both come from the active target
   (LSV.i18n.L2 + targets[L2].bcp47), so nothing here is tied to one language.
   Also provides short WebAudio "correct/wrong" sound effects (no asset files). */
(function () {
  "use strict";
  var U = LSV.util;

  var fileCache = {};  // id -> HTMLAudioElement | false (known-missing)
  var EXTS = ["mp3", "wav"];   // prefer mp3, fall back to wav (OmniVoice output)
  var voiceCache = {};         // lang tag -> SpeechSynthesisVoice | null

  function i18n() { return LSV.i18n || {}; }

  /* Active target's audio folder, e.g. "assets/audio/sv/" or "assets/audio/ca/". */
  function audioDir() { return "assets/audio/" + (i18n().L2 || "sv") + "/"; }

  /* Active target's speech-synthesis language tag, e.g. "sv-SE", "ca-ES". */
  function ttsLang() {
    var I = i18n(), code = I.L2 || "sv";
    var t = I.targets && I.targets[code];
    return (t && t.bcp47) || code;
  }

  function pickVoice(langTag) {
    if (!("speechSynthesis" in window)) return null;
    var full = String(langTag || "").toLowerCase();
    var base = full.split("-")[0];
    var voices = window.speechSynthesis.getVoices() || [];
    var m = voices.filter(function (v) {
      var l = String(v.lang || "").replace("_", "-").toLowerCase();
      return l === full || l.split("-")[0] === base;
    });
    return m[0] || null;
  }

  if ("speechSynthesis" in window) {
    // Voices load asynchronously; drop the cache so the next speak() re-picks.
    window.speechSynthesis.addEventListener("voiceschanged", function () { voiceCache = {}; });
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return false;
    try {
      window.speechSynthesis.cancel();
      var lang = ttsLang();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      if (!(lang in voiceCache)) voiceCache[lang] = pickVoice(lang);
      if (voiceCache[lang]) u.voice = voiceCache[lang];
      u.rate = 0.9;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function playCached(a) {
    return new Promise(function (resolve, reject) {
      a.currentTime = 0;
      var p = a.play();
      if (p && p.then) p.then(resolve).catch(reject); else resolve();
    });
  }

  /* Try assets/audio/<L2>/<id>.mp3, then .wav. Resolves on the first that plays. */
  function playFile(id) {
    return new Promise(function (resolve, reject) {
      if (fileCache[id] === false) return reject();
      if (fileCache[id]) return playCached(fileCache[id]).then(resolve, reject);

      var dir = audioDir();
      var idx = 0;
      (function attempt() {
        if (idx >= EXTS.length) { fileCache[id] = false; return reject(); }
        var a = new Audio(dir + id + "." + EXTS[idx++]);
        a.preload = "auto";
        var settled = false;
        a.onerror = function () { if (!settled) { settled = true; attempt(); } };
        var p = a.play();
        if (p && p.then) {
          p.then(function () { if (!settled) { settled = true; fileCache[id] = a; resolve(); } })
           .catch(function () { if (!settled) { settled = true; attempt(); } });
        } else {
          settled = true; fileCache[id] = a; resolve();
        }
      })();
    });
  }

  var Audio_ = {
    /* Play a vocab item by id (mp3 first, then speech synthesis). */
    play: function (id) {
      var w = LSV.data.vocab[id];
      var text = w ? w.l2 : id;
      playFile(id).catch(function () { speak(text); });
    },
    /* Speak arbitrary L2 text (used by phrasebook etc.) */
    say: function (text) { speak(text); },

    /* Does the browser have any way to produce audio? */
    available: function () { return ("speechSynthesis" in window); },

    /* --- sound effects (WebAudio) --- */
    sfx: (function () {
      var ctx = null;
      function ac() {
        if (ctx) return ctx;
        var C = window.AudioContext || window.webkitAudioContext;
        if (!C) return null;
        ctx = new C();
        return ctx;
      }
      function tone(freq, start, dur, type) {
        var c = ac(); if (!c) return;
        var o = c.createOscillator(), g = c.createGain();
        o.type = type || "sine";
        o.frequency.value = freq;
        o.connect(g); g.connect(c.destination);
        var t = c.currentTime + start;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.start(t); o.stop(t + dur + 0.02);
      }
      return {
        correct: function () { tone(660, 0, 0.12); tone(880, 0.1, 0.18); },
        wrong: function () { tone(200, 0, 0.22, "square"); },
        complete: function () { tone(523, 0, 0.14); tone(659, 0.12, 0.14); tone(784, 0.24, 0.3); }
      };
    })()
  };

  LSV.audio = Audio_;
})();
