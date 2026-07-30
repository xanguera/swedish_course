/* exercises.js — the exercise engines.
   Each renderer: fn(host, step, ctx) -> { graded:Boolean, check:Function|null }
     host  : DOM element to render into
     step  : the step descriptor (from buildSteps)
     ctx   : { ready(bool) }  // enable/disable the lesson's foot button
   For graded steps, check() marks the UI and returns { correct, answer }.
   The lesson runner (app.js) owns the header, foot button and feedback. */
(function () {
  "use strict";
  var U = LSV.util, A = LSV.audio, I18N = LSV.i18n;

  /* Expand a lesson's exercises into a flat queue of atomic steps. */
  function buildSteps(lesson) {
    var steps = [];
    (lesson.exercises || []).forEach(function (ex) {
      switch (ex.type) {
        case "flashcards":
          steps.push({ kind: "flashcards", items: ex.items, graded: false }); break;
        case "mc_img_word":
          ex.items.forEach(function (id) { steps.push({ kind: "choice", mode: "img2sv", target: id, graded: true }); }); break;
        case "mc_word_en":
          ex.items.forEach(function (id) { steps.push({ kind: "choice", mode: "sv2en", target: id, graded: true }); }); break;
        case "listen_choose":
          ex.items.forEach(function (id) { steps.push({ kind: "choice", mode: "listen", target: id, graded: true }); }); break;
        case "match_pairs":
          steps.push({ kind: "match", items: ex.items, graded: true }); break;
        case "fill_blank":
          steps.push({ kind: "fill", sv: ex.sv, hintEn: ex.en, lessonId: lesson.id, answer: ex.answer, bank: ex.bank, graded: true }); break;
        case "listen_repeat":
          steps.push({ kind: "repeat", items: ex.items, graded: false }); break;
      }
    });
    return steps;
  }

  /* Build 3 distractors + the target, using words that share a tag. */
  function optionSet(targetId) {
    var target = U.v(targetId);
    var all = U.allVocab();
    var pool = all.filter(function (w) {
      return w.id !== target.id && w.tags.some(function (t) { return target.tags.indexOf(t) >= 0; });
    });
    if (pool.length < 3) {
      var extra = all.filter(function (w) { return w.id !== target.id && pool.indexOf(w) < 0; });
      pool = pool.concat(U.shuffle(extra));
    }
    var distractors = U.sample(pool, 3);
    return U.shuffle([target].concat(distractors));
  }

  function speaker(id, big) {
    var btn = U.el("button", {
      class: "speaker" + (big ? " speaker--lg" : ""), "aria-label": "Play audio", text: "🔊",
      on: { click: function () { btn.classList.add("is-playing"); A.play(id); setTimeout(function () { btn.classList.remove("is-playing"); }, 450); } }
    });
    return btn;
  }

  /* ---------------------------------------------------- CHOICE question */
  function renderChoice(host, step, ctx) {
    var target = U.v(step.target);
    var options = optionSet(step.target);
    var selected = null, checked = false;

    var stage = U.el("div", { class: "ex__stage" });
    var titleText = step.mode === "sv2en" ? I18N.t("q_meaning")
                  : step.mode === "listen" ? I18N.t("q_listen")
                  : I18N.t("q_which");
    host.appendChild(U.el("div", { class: "ex__title", text: titleText }));

    if (step.mode === "img2sv") {
      stage.appendChild(U.el("div", { class: "ex__image", text: target.img }));
    } else if (step.mode === "sv2en") {
      stage.appendChild(U.el("div", { class: "bigword" }, [
        U.el("span", { class: "bigword__sv", text: target.sv }), speaker(target.id)
      ]));
    } else { /* listen */
      stage.appendChild(speaker(target.id, true));
      stage.appendChild(U.el("div", { class: "flashcard__hint", text: I18N.t("q_listen_hint") }));
    }
    host.appendChild(stage);

    var grid = step.mode === "sv2en";
    var choices = U.el("div", { class: "choices" + (grid ? "" : " choices--grid") });

    options.forEach(function (w) {
      var label = step.mode === "sv2en" ? I18N.tr(w.id) : w.sv;
      var kids = [];
      if (step.mode !== "sv2en") kids.push(U.el("div", { class: "choice__emoji", text: w.img }));
      kids.push(U.el("span", { text: label }));
      var btn = U.el("button", { class: "choice", type: "button" }, kids);
      btn.addEventListener("click", function () {
        if (checked) return;
        selected = w;
        U.qsa(".choice", choices).forEach(function (c) { c.classList.remove("is-selected"); });
        btn.classList.add("is-selected");
        ctx.ready(true);
      });
      btn._w = w;
      choices.appendChild(btn);
    });
    host.appendChild(choices);
    ctx.ready(false);

    if (step.mode === "listen") setTimeout(function () { A.play(target.id); }, 250);

    return {
      graded: true,
      check: function () {
        checked = true;
        var correct = selected && selected.id === target.id;
        U.qsa(".choice", choices).forEach(function (c) {
          c.disabled = true;
          if (c._w.id === target.id) c.classList.add("is-correct");
          else if (selected && c._w.id === selected.id) c.classList.add("is-wrong");
        });
        if (!correct) LSV.progress.touchSrs(target.id, false);
        else LSV.progress.touchSrs(target.id, true);
        var tr = I18N.tr(target.id);
        var ans = step.mode === "sv2en" ? tr : (target.sv + " — " + tr);
        return { correct: !!correct, answer: ans, vocabId: target.id };
      }
    };
  }

  /* ---------------------------------------------------- MATCH pairs */
  function renderMatch(host, step, ctx) {
    host.appendChild(U.el("div", { class: "ex__title", text: I18N.t("q_match") }));
    var words = step.items.map(U.v);
    var mistakes = 0, cleared = 0, firstPick = null;

    var left = U.shuffle(words).map(function (w) { return { w: w, side: "sv" }; });
    var right = U.shuffle(words).map(function (w) { return { w: w, side: "en" }; });

    var grid = U.el("div", { class: "match" });
    var colL = U.el("div", { class: "choices" });
    var colR = U.el("div", { class: "choices" });

    function makeTile(item) {
      var text = item.side === "sv" ? item.w.sv : item.w.en;
      var kids = item.side === "sv" ? [U.el("span", { text: item.w.img + " " }), U.el("span", { text: item.w.sv })]
                                    : [U.el("span", { text: I18N.tr(item.w.id) })];
      var t = U.el("button", { class: "match-tile", type: "button" }, kids);
      t._item = item;
      t.addEventListener("click", function () { pick(t); });
      return t;
    }
    left.forEach(function (it) { colL.appendChild(makeTile(it)); });
    right.forEach(function (it) { colR.appendChild(makeTile(it)); });
    grid.appendChild(colL); grid.appendChild(colR);
    host.appendChild(grid);

    function pick(tile) {
      if (tile.classList.contains("is-cleared")) return;
      if (item_side(tile) && firstPick && sameSide(firstPick, tile)) {
        // switching selection on same side
        firstPick.classList.remove("is-selected");
        firstPick = tile; tile.classList.add("is-selected");
        return;
      }
      if (!firstPick) { firstPick = tile; tile.classList.add("is-selected"); if (tile._item.side === "sv") A.play(tile._item.w.id); return; }
      // second pick
      var a = firstPick, b = tile;
      if (a._item.w.id === b._item.w.id && a._item.side !== b._item.side) {
        a.classList.remove("is-selected");
        a.classList.add("is-cleared"); b.classList.add("is-cleared");
        LSV.progress.touchSrs(a._item.w.id, true);
        cleared++;
        firstPick = null;
        if (cleared === words.length) ctx.ready(true);
      } else {
        mistakes++;
        A.sfx.wrong();
        b.classList.add("is-bad"); a.classList.add("is-bad");
        var aa = a; setTimeout(function () { aa.classList.remove("is-bad", "is-selected"); b.classList.remove("is-bad"); }, 350);
        firstPick = null;
      }
    }
    function item_side(t) { return t._item.side; }
    function sameSide(a, b) { return a._item.side === b._item.side; }

    ctx.ready(false);
    return {
      graded: true,
      check: function () { return { correct: mistakes === 0, answer: mistakes === 0 ? "" : I18N.t("match_praise") }; }
    };
  }

  /* ---------------------------------------------------- FILL blank */
  function renderFill(host, step, ctx) {
    var hint = I18N.fillHint(step.lessonId, step.hintEn);
    host.appendChild(U.el("div", { class: "ex__title", text: I18N.t("q_fill") }));
    host.appendChild(U.el("div", { class: "muted center", text: hint }));
    var checked = false, filled = null;

    var parts = step.sv.split("___");
    var blank = U.el("span", { class: "blank", text: "         " });
    var sentence = U.el("div", { class: "sentence" }, [
      document.createTextNode(parts[0]), blank, document.createTextNode(parts[1] || "")
    ]);
    host.appendChild(sentence);

    var bank = U.el("div", { class: "wordbank" });
    U.shuffle(step.bank).forEach(function (word) {
      var chip = U.el("button", { class: "chip", type: "button", text: word });
      chip.addEventListener("click", function () {
        if (checked) return;
        U.qsa(".chip", bank).forEach(function (c) { c.classList.remove("is-used"); });
        chip.classList.add("is-used");
        filled = word; blank.textContent = word;
        ctx.ready(true);
      });
      bank.appendChild(chip);
    });
    host.appendChild(bank);
    ctx.ready(false);

    return {
      graded: true,
      check: function () {
        checked = true;
        var correct = filled === step.answer;
        blank.style.color = correct ? "#4c8a02" : "#e63f3f";
        if (correct) A.say(step.sv.replace("___", step.answer));
        return { correct: correct, answer: step.sv.replace("___", step.answer) + " — " + hint };
      }
    };
  }

  /* ---------------------------------------------------- FLASHCARDS (learn) */
  function renderFlashcards(host, step, ctx) {
    host.appendChild(U.el("div", { class: "ex__title", text: I18N.t("fc_title") }));
    var ids = step.items, i = 0, maxSeen = 0;

    var card = U.el("div", { class: "flashcard" });
    var front, back;
    var inner = U.el("div", { class: "flashcard__inner" });
    front = U.el("div", { class: "flashcard__face" });
    back = U.el("div", { class: "flashcard__face flashcard__face--back" });
    inner.appendChild(front); inner.appendChild(back);
    card.appendChild(inner);
    card.addEventListener("click", function (e) {
      if (e.target.closest(".speaker")) return;
      card.classList.toggle("is-flipped");
    });

    var dots = U.el("div", { class: "dots" });
    var nav = U.el("div", { class: "choices choices--grid" });
    var prev = U.el("button", { class: "btn btn--ghost", type: "button", text: I18N.t("fc_back") });
    var next = U.el("button", { class: "btn btn--ghost", type: "button", text: I18N.t("fc_next") });
    prev.addEventListener("click", function () { go(i - 1); });
    next.addEventListener("click", function () { go(i + 1); });
    nav.appendChild(prev); nav.appendChild(next);

    host.appendChild(card);
    host.appendChild(dots);
    host.appendChild(nav);

    function paint() {
      var w = U.v(ids[i]);
      card.classList.remove("is-flipped");
      U.clear(front); U.clear(back);
      var tw = I18N.word(w.id);
      front.appendChild(U.el("div", { class: "flashcard__emoji", text: w.img }));
      front.appendChild(U.el("div", { class: "flashcard__sv", text: w.sv }));
      front.appendChild(speaker(w.id, true));
      front.appendChild(U.el("div", { class: "flashcard__hint", text: I18N.t("fc_hint") }));
      back.appendChild(U.el("div", { class: "flashcard__en", text: tw.t }));
      if (tw.note) back.appendChild(U.el("div", { class: "flashcard__hint", text: tw.note }));
      U.clear(dots);
      ids.forEach(function (_, k) { dots.appendChild(U.el("span", { class: "dot" + (k === i ? " is-on" : "") })); });
      prev.disabled = i === 0; next.disabled = i === ids.length - 1;
      LSV.progress.touchSrs(w.id, true);
      setTimeout(function () { A.play(w.id); }, 150);
    }
    function go(n) {
      if (n < 0 || n >= ids.length) return;
      i = n; maxSeen = Math.max(maxSeen, i);
      paint();
      ctx.ready(maxSeen >= ids.length - 1);
    }
    ctx.ready(ids.length === 1);
    paint();

    return { graded: false, check: null };
  }

  /* ---------------------------------------------------- LISTEN & REPEAT */
  function renderRepeat(host, step, ctx) {
    host.appendChild(U.el("div", { class: "ex__title", text: I18N.t("q_repeat") }));
    var ids = step.items, i = 0;

    var stage = U.el("div", { class: "ex__stage" });
    var emoji = U.el("div", { class: "ex__image ex__image--sm" });
    var sv = U.el("div", { class: "bigword__sv" });
    var en = U.el("div", { class: "flashcard__en" });
    var sp = speaker(ids[0], true);
    stage.appendChild(emoji);
    stage.appendChild(U.el("div", { class: "bigword" }, [sv, sp]));
    stage.appendChild(en);
    host.appendChild(stage);

    var dots = U.el("div", { class: "dots" });
    host.appendChild(dots);
    var said = U.el("button", { class: "btn btn--gold", type: "button", text: "I said it! 🎤" });
    said.addEventListener("click", function () { go(i + 1); });
    host.appendChild(said);

    function paint() {
      var w = U.v(ids[i]);
      emoji.textContent = w.img; sv.textContent = w.sv; en.textContent = I18N.tr(w.id);
      var nsp = speaker(w.id, true); sp.replaceWith(nsp); sp = nsp;
      U.clear(dots);
      ids.forEach(function (_, k) { dots.appendChild(U.el("span", { class: "dot" + (k === i ? " is-on" : "") })); });
      said.textContent = i === ids.length - 1 ? I18N.t("said_last") : I18N.t("said");
      setTimeout(function () { A.play(w.id); }, 150);
    }
    function go(n) {
      if (n >= ids.length) { ctx.ready(true); return; }
      i = n; paint();
      if (i === ids.length - 1) { /* still require pressing said on last */ }
    }
    ctx.ready(false);
    paint();

    return { graded: false, check: null };
  }

  LSV.exercises = {
    buildSteps: buildSteps,
    render: {
      choice: renderChoice,
      match: renderMatch,
      fill: renderFill,
      flashcards: renderFlashcards,
      repeat: renderRepeat
    }
  };
})();
