/* offline.js — registers the service worker (sw.js) so the app shell works
   offline after the first visit, and drives the explicit "download for
   offline" action (Settings) that eagerly caches every audio clip. */
(function () {
  "use strict";

  var STORAGE_KEY = "lsv:offline";

  function supported() {
    return "serviceWorker" in navigator &&
      (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1");
  }

  function register() {
    if (!supported()) return;
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  function readState() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function writeState(s) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch (e) {}
  }

  /* Has the user completed a full offline (audio) download? */
  function isReady() { return !!readState().ready; }

  /* Ask the service worker to cache every audio clip. onProgress(done, total)
     fires as clips land; the returned promise resolves once all are tried. */
  function download(onProgress) {
    if (!supported()) return Promise.reject(new Error("unsupported"));
    return navigator.serviceWorker.ready.then(function (reg) {
      return new Promise(function (resolve, reject) {
        var worker = reg.active;
        if (!worker) { reject(new Error("not-active")); return; }
        var channel = new MessageChannel();
        channel.port1.onmessage = function (e) {
          var msg = e.data || {};
          if (msg.type === "OFFLINE_PROGRESS") { if (onProgress) onProgress(msg.done, msg.total); }
          else if (msg.type === "OFFLINE_DONE") { writeState({ ready: true }); resolve(); }
          else if (msg.type === "OFFLINE_ERROR") reject(new Error("cache-failed"));
        };
        worker.postMessage({ type: "CACHE_AUDIO" }, [channel.port2]);
      });
    });
  }

  LSV.offline = { supported: supported, register: register, isReady: isReady, download: download };
})();
