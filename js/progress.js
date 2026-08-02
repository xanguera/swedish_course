/* progress.js — persistent learner state in localStorage.
   Tracks: completed lessons (+stars), XP, day-streak, resume point,
   and a lightweight spaced-repetition (SRS) box per vocab id. */
(function () {
  "use strict";
  var U = LSV.util;

  var DEFAULT = {
    version: 1,
    completed: {},   // lessonId -> { stars: 0-3, best: 0-100, ts: "yyyy-mm-dd" }
    xp: 0,
    streak: { count: 0, lastDay: null },
    lastRoute: null, // resume point (hash)
    srs: {}          // vocabId -> { box: 0-5, seen: n }
  };

  /* Progress is per learner profile (see profiles.js) — each profile gets
     its own storage key, so switching profiles switches progress too. */
  function key() { return LSV.profiles.progressKey(); }

  function load() {
    try {
      var raw = localStorage.getItem(key());
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT));
      var s = JSON.parse(raw);
      // shallow-merge defaults for forward-compat
      Object.keys(DEFAULT).forEach(function (k) { if (s[k] == null) s[k] = DEFAULT[k]; });
      return s;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT));
    }
  }

  var state = load();

  function save() {
    try { localStorage.setItem(key(), JSON.stringify(state)); } catch (e) {}
  }

  /* --- lesson ordering / gating ------------------------------------- */
  function orderedLessonIds() {
    var ids = [];
    (LSV.data.course.units || []).forEach(function (u) {
      (u.modules || []).forEach(function (m) {
        (m.lessons || []).forEach(function (lid) { ids.push(lid); });
      });
    });
    return ids;
  }

  var P = {
    get: function () { return state; },

    isComplete: function (lessonId) { return !!state.completed[lessonId]; },
    stars: function (lessonId) { return state.completed[lessonId] ? state.completed[lessonId].stars : 0; },

    /* A lesson is unlocked if it's the first, or the previous one is complete. */
    isUnlocked: function (lessonId) {
      var order = orderedLessonIds();
      var i = order.indexOf(lessonId);
      if (i <= 0) return true;
      return P.isComplete(order[i - 1]);
    },

    /* The first not-yet-complete lesson = the learner's current target. */
    currentLessonId: function () {
      var order = orderedLessonIds();
      for (var i = 0; i < order.length; i++) {
        if (!P.isComplete(order[i])) return order[i];
      }
      return order[order.length - 1] || null;
    },

    orderedLessonIds: orderedLessonIds,

    completedCount: function () { return Object.keys(state.completed).length; },
    totalLessons: function () { return orderedLessonIds().length; },

    /* --- recording results ------------------------------------------- */
    finishLesson: function (lessonId, accuracy, xpGained) {
      var stars = accuracy >= 100 ? 3 : accuracy >= 80 ? 2 : accuracy >= 50 ? 1 : 1;
      var prev = state.completed[lessonId];
      state.completed[lessonId] = {
        stars: prev ? Math.max(prev.stars, stars) : stars,
        best: prev ? Math.max(prev.best, accuracy) : accuracy,
        ts: U.today()
      };
      state.xp += xpGained || 0;
      P.bumpStreak();
      save();
      return state.completed[lessonId];
    },

    addXp: function (n) { state.xp += n; save(); },

    bumpStreak: function () {
      var t = U.today();
      var s = state.streak;
      if (s.lastDay === t) return;
      if (s.lastDay && U.daysBetween(s.lastDay, t) === 1) s.count += 1;
      else s.count = 1;
      s.lastDay = t;
      save();
    },

    /* --- resume ------------------------------------------------------ */
    setRoute: function (hash) {
      // don't store transient lesson routes as resume; store the section
      if (hash && hash.indexOf("#/lesson/") !== 0) { state.lastRoute = hash; save(); }
    },
    lastRoute: function () { return state.lastRoute; },

    /* --- spaced repetition ------------------------------------------- */
    touchSrs: function (vocabId, correct) {
      var s = state.srs[vocabId] || { box: 0, seen: 0 };
      s.seen += 1;
      s.box = correct ? Math.min(5, s.box + 1) : Math.max(0, s.box - 1);
      state.srs[vocabId] = s;
      save();
    },
    /* Words the learner has met, weakest first — for the Practice hub. */
    reviewPool: function (limit) {
      var seen = Object.keys(state.srs);
      seen.sort(function (a, b) { return (state.srs[a].box - state.srs[b].box); });
      return seen.slice(0, limit || 15);
    },
    seenVocabIds: function () { return Object.keys(state.srs); },

    reset: function () { state = JSON.parse(JSON.stringify(DEFAULT)); save(); },

    /* Re-read state from storage — call after switching the active profile. */
    reload: function () { state = load(); }
  };

  LSV.progress = P;
})();
