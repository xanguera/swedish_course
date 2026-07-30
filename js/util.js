/* util.js — namespace + tiny DOM/helper toolkit (no dependencies) */
(function () {
  "use strict";

  window.LSV = window.LSV || {};
  LSV.data = LSV.data || {};

  var U = {
    /* DOM helpers ------------------------------------------------------- */
    el: function (tag, attrs, children) {
      var node = document.createElement(tag);
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          var v = attrs[k];
          if (v == null || v === false) return;
          if (k === "class") node.className = v;
          else if (k === "html") node.innerHTML = v;
          else if (k === "text") node.textContent = v;
          else if (k === "on" && typeof v === "object") {
            Object.keys(v).forEach(function (ev) { node.addEventListener(ev, v[ev]); });
          } else if (k.indexOf("data-") === 0 || k === "role" || k === "aria-label" || k === "title") {
            node.setAttribute(k, v);
          } else {
            node[k] = v;
          }
        });
      }
      (children || []).forEach(function (c) {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
      return node;
    },
    qs: function (sel, root) { return (root || document).querySelector(sel); },
    qsa: function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); },
    clear: function (node) { while (node.firstChild) node.removeChild(node.firstChild); return node; },

    /* array helpers ----------------------------------------------------- */
    shuffle: function (arr) {
      var a = arr.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    },
    sample: function (arr, n) { return U.shuffle(arr).slice(0, n); },
    uniq: function (arr) { return arr.filter(function (v, i) { return arr.indexOf(v) === i; }); },

    /* vocab lookups ----------------------------------------------------- */
    v: function (id) {
      var w = LSV.data.vocab[id];
      if (!w) console.warn("Missing vocab id:", id);
      return w;
    },
    allVocab: function () { return Object.keys(LSV.data.vocab).map(function (k) { return LSV.data.vocab[k]; }); },

    /* misc -------------------------------------------------------------- */
    today: function () {
      var d = new Date();
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    },
    daysBetween: function (a, b) {
      var ms = new Date(b + "T00:00:00") - new Date(a + "T00:00:00");
      return Math.round(ms / 86400000);
    }
  };

  LSV.util = U;
})();
