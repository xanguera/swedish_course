/* profiles.js — multiple named learner profiles on one device.
   Each profile has its own name, L1/L2 language pair and its own progress
   (see progress.js, which keys its storage by the active profile id).
   Everything lives in localStorage only — nothing is shared between devices. */
(function () {
  "use strict";
  var PKEY = "lsv:profiles";
  var LEGACY_SETTINGS_KEY = "lsv:settings";
  var LEGACY_PROGRESS_KEY = "lsv:v1";

  function uid() {
    return "p_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  }

  function readJson(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; }
  }

  function saveStore() {
    try { localStorage.setItem(PKEY, JSON.stringify(store)); } catch (e) {}
  }

  /* One-time migration: a pre-profiles install had a single global course
     (lsv:settings) and a single global progress blob (lsv:v1). Turn that
     into the device's first (unnamed) profile so nobody loses progress. */
  function migrateLegacy() {
    var legacySettings = readJson(LEGACY_SETTINGS_KEY);
    if (!legacySettings || !legacySettings.onboarded) return { activeId: null, list: [] };

    var id = uid();
    var profile = {
      id: id, name: "", l1: legacySettings.l1 || "en", l2: legacySettings.l2 || "sv",
      createdAt: new Date().toISOString()
    };
    try {
      var legacyProgress = localStorage.getItem(LEGACY_PROGRESS_KEY);
      if (legacyProgress) localStorage.setItem(LEGACY_PROGRESS_KEY + ":" + id, legacyProgress);
    } catch (e) {}
    return { activeId: id, list: [profile] };
  }

  var store = readJson(PKEY);
  if (!store) { store = migrateLegacy(); saveStore(); }

  var Pf = {
    list: function () { return store.list.slice(); },
    activeId: function () { return store.activeId; },
    active: function () { return Pf.get(store.activeId); },
    get: function (id) {
      for (var i = 0; i < store.list.length; i++) if (store.list[i].id === id) return store.list[i];
      return null;
    },
    hasAny: function () { return store.list.length > 0; },

    /* Creates a new profile, makes it the active one, and returns it. */
    create: function (name, l1, l2) {
      var p = { id: uid(), name: (name || "").trim(), l1: l1 || "en", l2: l2 || "sv", createdAt: new Date().toISOString() };
      store.list.push(p);
      store.activeId = p.id;
      saveStore();
      return p;
    },

    switchTo: function (id) {
      if (!Pf.get(id)) return false;
      store.activeId = id;
      saveStore();
      return true;
    },

    update: function (id, patch) {
      var p = Pf.get(id);
      if (!p) return;
      Object.keys(patch).forEach(function (k) { p[k] = patch[k]; });
      saveStore();
    },

    /* Storage key progress.js should read/write for a given profile
       (defaults to the active one). */
    progressKey: function (id) { return LEGACY_PROGRESS_KEY + ":" + (id || store.activeId); },

    initials: function (name) {
      var parts = (name || "").trim().split(/\s+/).filter(Boolean);
      if (!parts.length) return "?";
      if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
  };

  LSV.profiles = Pf;
})();
