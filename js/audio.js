/* audio.js — plays Swedish audio.
   Strategy:
     1. If assets/audio/sv/<id>.mp3 exists, play it (best quality, your recordings).
     2. Otherwise fall back to the browser's Swedish speech synthesis (sv-SE).
   Also provides short WebAudio "correct/wrong" sound effects (no asset files). */
(function () {
  "use strict";
  var U = LSV.util;

  var fileCache = {};  // id -> HTMLAudioElement | false (known-missing)
  var EXTS = ["mp3", "wav"];   // prefer mp3, fall back to wav (OmniVoice output)
  var svVoice = null;
  var voicesReady = false;

  function pickSwedishVoice() {
    if (!("speechSynthesis" in window)) return null;
    var voices = window.speechSynthesis.getVoices() || [];
    // Prefer an explicitly Swedish voice.
    var sv = voices.filter(function (v) { return /sv(-|_)?SE|swedish|svenska/i.test(v.lang + " " + v.name); });
    if (!sv.length) sv = voices.filter(function (v) { return /^sv\b/i.test(v.lang); });
    return sv[0] || null;
  }

  if ("speechSynthesis" in window) {
    var load = function () { svVoice = pickSwedishVoice(); voicesReady = true; };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) return false;
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = "sv-SE";
      if (!svVoice) svVoice = pickSwedishVoice();
      if (svVoice) u.voice = svVoice;
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

  /* Try assets/audio/sv/<id>.mp3, then .wav. Resolves on the first that plays. */
  function playFile(id) {
    return new Promise(function (resolve, reject) {
      if (fileCache[id] === false) return reject();
      if (fileCache[id]) return playCached(fileCache[id]).then(resolve, reject);

      var idx = 0;
      (function attempt() {
        if (idx >= EXTS.length) { fileCache[id] = false; return reject(); }
        var a = new Audio("assets/audio/sv/" + id + "." + EXTS[idx++]);
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
      var text = w ? w.sv : id;
      playFile(id).catch(function () { speak(text); });
    },
    /* Speak arbitrary Swedish text (used by phrasebook etc.) */
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
