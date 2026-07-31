/* sw.js — offline cache for "Lär dig svenska".
   Precaches the app shell on install; caches audio/other GETs at runtime as
   they're fetched, so anything the user has visited/played works offline.
   A page can also ask (via postMessage) to eagerly cache every audio clip
   for full offline readiness ahead of a trip. */
"use strict";

var CACHE_VERSION = "lsv-v2";
var STATIC_CACHE = CACHE_VERSION + "-static";
var RUNTIME_CACHE = CACHE_VERSION + "-runtime";

var APP_SHELL = [
  "./",
  "index.html",
  "manifest.json",
  "css/styles.css",
  "js/util.js",
  "js/i18n.js",
  "js/audio.js",
  "js/progress.js",
  "js/exercises.js",
  "js/app.js",
  "data/vocab.js",
  "data/culture.js",
  "data/lessons.js",
  "data/course.js",
  "data/i18n_en.js",
  "data/i18n_pt.js",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (k) { return k.indexOf(CACHE_VERSION) !== 0; })
              .map(function (k) { return caches.delete(k); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) return cached;
      return fetch(req)
        .then(function (res) {
          if (res && res.ok) {
            var copy = res.clone();
            caches.open(RUNTIME_CACHE).then(function (cache) { cache.put(req, copy); });
          }
          return res;
        })
        .catch(function () {
          if (req.mode === "navigate") return caches.match("index.html");
        });
    })
  );
});

/* Explicit "download for offline": fetch+cache every clip in the audio
   manifest, reporting progress back over the MessageChannel port. */
function cacheAllAudio(port) {
  return fetch("assets/audio/manifest.json")
    .then(function (r) { return r.json(); })
    .then(function (clips) {
      var files = clips.map(function (c) { return c.file; });
      var total = files.length;
      var done = 0;
      return caches.open(RUNTIME_CACHE).then(function (cache) {
        return Promise.all(files.map(function (f) {
          return cache.add(f).catch(function () {}).then(function () {
            done++;
            if (port) port.postMessage({ type: "OFFLINE_PROGRESS", done: done, total: total });
          });
        }));
      });
    });
}

self.addEventListener("message", function (event) {
  if (!event.data || event.data.type !== "CACHE_AUDIO") return;
  var port = event.ports && event.ports[0];
  event.waitUntil(
    cacheAllAudio(port)
      .then(function () { if (port) port.postMessage({ type: "OFFLINE_DONE" }); })
      .catch(function () { if (port) port.postMessage({ type: "OFFLINE_ERROR" }); })
  );
});
