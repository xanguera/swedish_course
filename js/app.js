/* app.js — router, views, lesson runner, onboarding, mascot & celebration. */
(function () {
  "use strict";
  var U = LSV.util, A = LSV.audio, P = LSV.progress, EX = LSV.exercises, D = LSV.data, I18N = LSV.i18n;

  LSV.offline.register();

  // Point the active data slices (D.vocab/lessons/course/culture) at the chosen
  // target's course. Called at boot and whenever the learner switches L2.
  function applyTarget() { D.useTarget(I18N.L2); }
  applyTarget();

  var view = U.qs("#view");
  var topbar = U.qs("#topbar");
  var tabbar = U.qs("#tabbar");

  /* ------------------------------------------------ Mascot (our own moose) */
  function moose(cls) {
    var wrap = U.el("div");
    wrap.className = "mascot " + (cls || "");
    wrap.innerHTML =
      '<svg viewBox="0 0 120 120" width="100%" height="100%" role="img" aria-label="Älgot the moose">' +
      '<g fill="#a9743f">' +
      '<path d="M40 36 C30 22 16 24 12 10 C26 16 30 8 36 20 C38 10 44 14 46 28 Z"/>' +
      '<path d="M80 36 C90 22 104 24 108 10 C94 16 90 8 84 20 C82 10 76 14 74 28 Z"/>' +
      '</g>' +
      '<ellipse cx="30" cy="54" rx="12" ry="9" fill="#6b4423"/>' +
      '<ellipse cx="90" cy="54" rx="12" ry="9" fill="#6b4423"/>' +
      '<ellipse cx="60" cy="62" rx="34" ry="32" fill="#8a5a2b"/>' +
      '<ellipse cx="60" cy="84" rx="23" ry="18" fill="#c98a52"/>' +
      '<ellipse cx="51" cy="86" rx="3.4" ry="4.4" fill="#5a3a1a"/>' +
      '<ellipse cx="69" cy="86" rx="3.4" ry="4.4" fill="#5a3a1a"/>' +
      '<circle cx="48" cy="58" r="7.5" fill="#fff"/><circle cx="72" cy="58" r="7.5" fill="#fff"/>' +
      '<circle cx="49" cy="59" r="4" fill="#2a1a0a"/><circle cx="73" cy="59" r="4" fill="#2a1a0a"/>' +
      '<path d="M50 92 Q60 100 70 92" stroke="#5a3a1a" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '</svg>';
    return wrap;
  }

  function toast(msg) {
    var t = U.el("div", { text: msg });
    t.style.cssText = "position:fixed;left:50%;bottom:96px;transform:translateX(-50%);background:#3c3c3c;color:#fff;padding:12px 18px;border-radius:14px;font-weight:800;z-index:80;box-shadow:0 6px 20px rgba(0,0,0,.25);max-width:80%;text-align:center";
    document.body.appendChild(t);
    setTimeout(function () { t.style.transition = "opacity .3s"; t.style.opacity = "0"; }, 1800);
    setTimeout(function () { t.remove(); }, 2200);
  }

  /* ------------------------------------------------ Chrome / stats */
  function chrome(show) { topbar.hidden = !show; tabbar.hidden = !show; }

  function localizeChrome() {
    [["learn", "tab_learn"], ["practice", "tab_practice"], ["culture", "tab_culture"], ["phrasebook", "tab_phrases"]]
      .forEach(function (p) {
        var el = U.qs('.tab[data-tab="' + p[0] + '"] .tab__label');
        if (el) el.textContent = I18N.t(p[1]);
      });
    var lb = U.qs("#lang-btn"); if (lb) lb.textContent = I18N.currentFlag();
  }

  function updateStats() {
    var s = P.get();
    U.qs("#stat-streak").textContent = s.streak.count || 0;
    U.qs("#stat-xp").textContent = s.xp || 0;
    var heartsEl = U.qs(".stat--hearts");
    heartsEl.querySelector(".stat__icon").textContent = "🏆";
    heartsEl.querySelector(".stat__val").textContent = P.completedCount() + "/" + P.totalLessons();
  }
  function setTab(name) {
    U.qsa(".tab").forEach(function (t) { t.classList.toggle("is-active", t.getAttribute("data-tab") === name); });
  }

  function mount(node) {
    chrome(true);
    localizeChrome();
    updateStats();
    U.clear(view).appendChild(node);
    window.scrollTo(0, 0);
  }

  /* ================================================ ONBOARDING =========== */
  function viewWelcome() {
    chrome(false);
    var flags = I18N.langList().map(function (l) { return l.flag; }).join(" ") + " → 🇸🇪";
    var scr = U.el("div", { class: "onboard onboard--center fadein" }, [
      U.el("div", { class: "onboard__flags", text: flags }),
      moose("mascot--lg"),
      U.el("h1", { text: I18N.t("welcome_title") }),
      U.el("p", { class: "lead", text: I18N.t("welcome_sub") }),
      U.el("div", { class: "onboard__footer" }, [
        (function () {
          var b = U.el("button", { class: "btn", text: I18N.t("welcome_btn") });
          b.addEventListener("click", function () { location.hash = "#/setup"; });
          return b;
        })()
      ])
    ]);
    U.clear(view).appendChild(scr);
    window.scrollTo(0, 0);
  }

  /* -------- Offline download (Settings) -------- */
  function viewOfflineGroup() {
    var group = U.el("div", { class: "setup-group" }, [
      U.el("div", { class: "setup-group__label", text: I18N.t("offline_title") })
    ]);
    var ready = LSV.offline.isReady();
    var status = U.el("div", { class: "muted", text: I18N.t(ready ? "offline_ready" : "offline_not_ready") });
    group.appendChild(status);

    if (!LSV.offline.supported()) {
      group.appendChild(U.el("div", { class: "muted", text: I18N.t("offline_unsupported") }));
      return group;
    }

    var btn = U.el("button", { class: "btn btn--blue btn--sm btn--auto", text: I18N.t("offline_btn") });
    if (ready) btn.hidden = true;
    btn.addEventListener("click", function () {
      btn.disabled = true;
      status.textContent = I18N.t("offline_progress", { done: 0, total: "…" });
      LSV.offline.download(function (done, total) {
        status.textContent = I18N.t("offline_progress", { done: done, total: total });
      }).then(function () {
        status.textContent = I18N.t("offline_done");
        btn.hidden = true;
      }).catch(function () {
        status.textContent = I18N.t("offline_error");
        btn.disabled = false;
      });
    });
    group.appendChild(btn);
    return group;
  }

  function viewSetup() {
    chrome(false);
    var chosenL1 = I18N.L1 || "en";
    var chosenL2 = I18N.L2 || "sv";
    var onboarded = I18N.isOnboarded();

    var head = U.el("div", { class: "setup-head" }, [
      U.el("h1", { text: onboarded ? I18N.t("settings_title") : I18N.t("setup_title") })
    ]);
    if (onboarded) {
      var x = U.el("button", { class: "setup-close", text: "✕", "aria-label": I18N.t("setup_close") });
      x.addEventListener("click", function () { location.hash = "#/"; });
      head.appendChild(x);
    }

    var l1group = U.el("div", { class: "setup-group" }, [U.el("div", { class: "setup-group__label", text: I18N.t("setup_l1") })]);
    I18N.langList().forEach(function (lang) {
      var opt = U.el("button", { class: "lang-option" + (lang.code === chosenL1 ? " is-selected" : ""), type: "button" }, [
        U.el("span", { class: "lang-option__flag", text: lang.flag }),
        U.el("span", { class: "lang-option__meta" }, [
          U.el("span", { text: lang.endonym }),
          U.el("span", { class: "lang-option__sub", text: lang.name })
        ]),
        U.el("span", { class: "lang-option__check", text: lang.code === chosenL1 ? "✓" : "" })
      ]);
      opt.addEventListener("click", function () {
        chosenL1 = lang.code;
        U.qsa(".lang-option", l1group).forEach(function (o) { o.classList.remove("is-selected"); o.querySelector(".lang-option__check").textContent = ""; });
        opt.classList.add("is-selected"); opt.querySelector(".lang-option__check").textContent = "✓";
      });
      l1group.appendChild(opt);
    });

    var l2group = U.el("div", { class: "setup-group" }, [U.el("div", { class: "setup-group__label", text: I18N.t("setup_l2") })]);
    I18N.targetList().forEach(function (tg) {
      var opt = U.el("button", { class: "lang-option" + (tg.code === chosenL2 ? " is-selected" : ""), type: "button" }, [
        U.el("span", { class: "lang-option__flag", text: tg.flag }),
        U.el("span", { class: "lang-option__meta" }, [
          U.el("span", { text: tg.endonym }),
          U.el("span", { class: "lang-option__sub", text: tg.name })
        ]),
        U.el("span", { class: "lang-option__check", text: tg.code === chosenL2 ? "✓" : "" })
      ]);
      opt.addEventListener("click", function () {
        chosenL2 = tg.code;
        U.qsa(".lang-option", l2group).forEach(function (o) { o.classList.remove("is-selected"); o.querySelector(".lang-option__check").textContent = ""; });
        opt.classList.add("is-selected"); opt.querySelector(".lang-option__check").textContent = "✓";
      });
      l2group.appendChild(opt);
    });
    l2group.appendChild(U.el("div", { class: "muted", text: I18N.t("setup_l2_note") }));

    var confirm = U.el("button", { class: "btn", text: I18N.t("setup_btn") });
    confirm.addEventListener("click", function () {
      I18N.completeOnboarding(chosenL1, chosenL2);
      applyTarget();
      localizeChrome();
      if (location.hash === "#/" || location.hash === "") render();
      else location.hash = "#/";
    });

    var groups = [head, l1group, l2group];
    if (onboarded) groups.push(viewOfflineGroup());
    groups.push(U.el("div", { class: "onboard__footer" }, [confirm]));

    var scr = U.el("div", { class: "onboard fadein" }, groups);

    if (onboarded) {
      var resetBtn = U.el("button", { class: "btn btn--red btn--sm", text: I18N.t("settings_reset_btn") });
      resetBtn.addEventListener("click", function () {
        if (!window.confirm(I18N.t("settings_reset_confirm"))) return;
        P.reset();
        toast(I18N.t("settings_reset_done"));
        location.hash = "#/";
      });
      scr.appendChild(U.el("div", { class: "setup-danger" }, [
        U.el("div", { class: "setup-danger__label", text: I18N.t("settings_reset_title") }),
        U.el("div", { class: "setup-danger__desc", text: I18N.t("settings_reset_desc") }),
        resetBtn
      ]));
    }

    U.clear(view).appendChild(scr);
    window.scrollTo(0, 0);
  }

  /* ================================================ VIEWS ================ */

  /* -------- Home (learning path) -------- */
  function viewHome() {
    setTab("learn");
    var root = U.el("div", { class: "fadein" });

    var current = P.currentLessonId();
    var done = P.completedCount(), total = P.totalLessons();
    var msg, sub;
    if (done === 0) { msg = I18N.t("hero_hi_t"); sub = I18N.t("hero_hi_s"); }
    else if (done >= total) { msg = I18N.t("hero_done_t"); sub = I18N.t("hero_done_s"); }
    else { msg = I18N.t("hero_keep_t"); sub = I18N.t("hero_keep_s", { done: done, total: total }); }

    root.appendChild(U.el("div", { class: "home-hero" }, [
      moose("mascot--sm"),
      U.el("div", { class: "speech" }, [U.el("span", { text: msg }), U.el("small", { text: sub })])
    ]));

    if (!A.available()) root.appendChild(U.el("div", { class: "legal", text: I18N.t("audio_tip") }));

    var path = U.el("div", { class: "path" });
    var gidx = 0;
    var offsets = [0, 44, 66, 44, 0, -44, -66, -44];

    D.course.units.forEach(function (unit, ui) {
      var banner = U.el("div", { class: "unit-banner" }, [
        U.el("div", { class: "unit-banner__meta" }, [
          U.el("span", { class: "unit-banner__kicker", text: I18N.t("unit_word") + " " + (ui + 1) }),
          U.el("span", { class: "unit-banner__title", text: I18N.unitTitle(unit.id) })
        ]),
        U.el("span", { class: "unit-banner__icon", text: unit.icon })
      ]);
      banner.style.background = unit.color;
      banner.style.boxShadow = "0 4px 0 " + unit.colorDark;
      path.appendChild(banner);

      var firstInUnit = true;
      unit.modules.forEach(function (mod) {
        mod.lessons.forEach(function (lid) {
          var lesson = D.lessons[lid];
          if (!lesson) return;
          var unlocked = P.isUnlocked(lid);
          var complete = P.isComplete(lid);
          var isActive = lid === current;

          var node = U.el("button", { class: "node", type: "button" });
          node.style.setProperty("--node", complete ? "var(--gold)" : (unlocked ? unit.color : "var(--locked)"));
          node.style.setProperty("--node-dark", complete ? "var(--gold-dark)" : (unlocked ? unit.colorDark : "var(--locked-dark)"));
          if (!unlocked) node.classList.add("node--locked");
          if (complete) node.classList.add("node--done");
          if (isActive && !complete) node.classList.add("node--active");
          node.appendChild(U.el("span", { class: "node__icon", text: unlocked ? lesson.icon : "🔒" }));

          node.addEventListener("click", function () {
            if (!unlocked) { toast(I18N.t("toast_locked_path")); return; }
            location.hash = "#/lesson/" + lid;
          });

          var wrap = U.el("div", { class: "node-wrap" });
          wrap.style.transform = "translateX(" + offsets[gidx % offsets.length] + "px)";
          if (isActive && !complete) {
            wrap.appendChild(U.el("div", { class: "start-bubble", text: done === 0 ? I18N.t("node_start") : I18N.t("node_continue") }));
          }
          wrap.appendChild(node);
          var starLabel = complete ? " " + "⭐".repeat(P.stars(lid)) : "";
          wrap.appendChild(U.el("div", { class: "node__label", text: I18N.lessonTitle(lid) + starLabel }));

          path.appendChild(U.el("div", { class: "node-row" + (firstInUnit ? " node-row--first" : "") }, [wrap]));
          firstInUnit = false;
          gidx++;
        });
      });
    });

    root.appendChild(path);
    var legal = U.el("div", { class: "legal" });
    legal.appendChild(document.createTextNode(I18N.t("made_with") + " · "));
    var link = U.el("a", { href: "#/phrasebook", text: I18N.t("phrasebook_link") });
    link.style.color = "inherit";
    legal.appendChild(link);
    root.appendChild(legal);
    mount(root);
  }

  /* -------- Culture -------- */
  function viewCulture() {
    setTab("culture");
    var root = U.el("div", { class: "fadein" });
    root.appendChild(U.el("div", { class: "section-title", text: I18N.t("culture_title") }));
    root.appendChild(U.el("div", { class: "section-sub", text: I18N.t("culture_sub") }));
    D.culture.forEach(function (c) {
      root.appendChild(U.el("div", { class: "card" }, [
        U.el("div", { class: "card__row" }, [
          U.el("div", { class: "card__emoji", text: c.emoji }),
          U.el("div", {}, [
            U.el("div", { class: "card__title", text: I18N.cultureTitle(c.id) }),
            U.el("div", { class: "card__sub", text: c.l2 })
          ])
        ]),
        U.el("div", { class: "card__body", html: I18N.cultureBody(c.id) })
      ]));
    });
    mount(root);
  }

  /* -------- Phrasebook -------- */
  function viewPhrasebook() {
    setTab("phrasebook");
    var root = U.el("div", { class: "fadein" });
    root.appendChild(U.el("div", { class: "section-title", text: I18N.t("phrase_title") }));
    root.appendChild(U.el("div", { class: "section-sub", text: I18N.t("phrase_sub") }));

    var anyLearned = false;
    D.course.units.forEach(function (unit) {
      var ids = [];
      unit.modules.forEach(function (m) { m.lessons.forEach(function (lid) {
        if (!P.isComplete(lid)) return;
        var l = D.lessons[lid]; if (l) l.teach.forEach(function (id) { if (ids.indexOf(id) < 0) ids.push(id); });
      }); });
      if (!ids.length) return;
      anyLearned = true;
      root.appendChild(U.el("div", { class: "section-title", text: unit.icon + " " + I18N.unitTitle(unit.id) }));
      ids.forEach(function (id) {
        var w = I18N.word(id); if (!w) return;
        var play = U.el("button", { class: "vrow__play", text: "🔊", "aria-label": "Play" });
        play.addEventListener("click", function () { A.play(id); });
        root.appendChild(U.el("div", { class: "vrow" }, [
          U.el("div", { class: "vrow__emoji", text: w.img }),
          U.el("div", { class: "vrow__text" }, [
            U.el("div", { class: "vrow__sv", text: w.l2 }),
            U.el("div", { class: "ipa", text: "[" + w.ipa + "]" }),
            U.el("div", { class: "vrow__en", text: w.t })
          ]),
          play
        ]));
      });
    });
    if (!anyLearned) {
      root.appendChild(U.el("div", { class: "empty" }, [moose("mascot"), U.el("p", { text: I18N.t("phrase_empty") })]));
    }
    mount(root);
  }

  /* -------- Practice hub -------- */
  function viewPractice() {
    setTab("practice");
    var root = U.el("div", { class: "fadein" });
    root.appendChild(U.el("div", { class: "section-title", text: I18N.t("practice_title") }));
    var pool = P.reviewPool(12);
    var body = U.el("div", { class: "wrap" });

    if (pool.length < 4) {
      body.appendChild(U.el("div", { class: "empty" }, [moose("mascot"), U.el("p", { text: I18N.t("practice_empty") })]));
      var goBtn = U.el("button", { class: "btn", text: I18N.t("practice_go") });
      goBtn.addEventListener("click", function () { location.hash = "#/"; });
      body.appendChild(goBtn);
    } else {
      body.appendChild(U.el("p", { class: "muted center", text: I18N.t("practice_intro") }));
      var start = U.el("button", { class: "btn btn--gold", text: I18N.t("practice_start", { n: pool.length }) });
      start.addEventListener("click", function () { startReview(pool); });
      body.appendChild(start);
      body.appendChild(U.el("div", { class: "spacer" }));
      pool.slice(0, 8).forEach(function (id) {
        var w = I18N.word(id); if (!w) return;
        var play = U.el("button", { class: "vrow__play", text: "🔊" });
        play.addEventListener("click", function () { A.play(id); });
        body.appendChild(U.el("div", { class: "vrow" }, [
          U.el("div", { class: "vrow__emoji", text: w.img }),
          U.el("div", { class: "vrow__text" }, [
            U.el("div", { class: "vrow__sv", text: w.l2 }),
            U.el("div", { class: "ipa", text: "[" + w.ipa + "]" }),
            U.el("div", { class: "vrow__en", text: w.t })
          ]),
          play
        ]));
      });
    }
    root.appendChild(body);
    mount(root);
  }

  /* ================================================ LESSON RUNNER ======= */
  function startReview(pool) {
    var items = U.shuffle(pool).slice(0, 10);
    var half = Math.ceil(items.length / 2);
    runLesson({
      id: "__review", title: "Practice", icon: "🔁", review: true, teach: [], culture: [],
      exercises: [
        { type: "mc_word_en", items: items.slice(0, half) },
        { type: "listen_choose", items: items.slice(half) }
      ]
    });
  }

  function runLesson(lesson) {
    chrome(false);
    var steps = EX.buildSteps(lesson);
    (lesson.culture || []).forEach(function (cid) { steps.push({ kind: "culture", id: cid, graded: false }); });

    var idx = 0, correct = 0, gradedTotal = 0, hearts = 5;
    var controller = null, phase = "answer", checkedRes = null;

    var overlay = U.el("div", { class: "lesson" });
    var closeBtn = U.el("button", { class: "lesson__close", text: "✕", "aria-label": "Close" });
    closeBtn.addEventListener("click", function () { cleanup(); location.hash = "#/"; });
    var fill = U.el("div", { class: "progress-fill" });
    var track = U.el("div", { class: "progress-track" }, [fill]);
    var heartsEl = U.el("div", { class: "lesson__hearts" });
    var header = U.el("div", { class: "lesson__header" }, [closeBtn, track, heartsEl]);

    var body = U.el("div", { class: "lesson__body" });
    var stage = U.el("div", { class: "ex" });
    body.appendChild(stage);

    var feedback = U.el("div", { class: "feedback" });
    var footBtn = U.el("button", { class: "btn", text: I18N.t("foot_check") });
    var foot = U.el("div", { class: "footbar" }, [footBtn]);

    overlay.appendChild(header); overlay.appendChild(body); overlay.appendChild(foot);
    document.body.appendChild(overlay);

    var ctx = { ready: function (ok) { footBtn.disabled = !ok; footBtn.classList.toggle("btn--disabled", !ok); } };
    function paintHearts() { heartsEl.textContent = "❤️ " + Math.max(0, hearts); }
    function setProgress() { fill.style.width = Math.round((idx / steps.length) * 100) + "%"; }

    function showStep() {
      phase = "answer"; checkedRes = null;
      foot.className = "footbar";
      U.clear(feedback);
      if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
      U.clear(stage);
      setProgress(); paintHearts();

      var step = steps[idx];
      if (step.kind === "culture") {
        renderCulture(stage, step);
        footBtn.textContent = I18N.t("foot_continue"); ctx.ready(true); controller = { graded: false };
        return;
      }
      controller = EX.render[step.kind](stage, step, ctx);
      if (controller.check) { footBtn.textContent = I18N.t("foot_check"); ctx.ready(false); }
      else { footBtn.textContent = I18N.t("foot_continue"); }
    }

    function renderCulture(host, step) {
      var c = D.cultureById[step.id]; if (!c) return;
      host.appendChild(U.el("div", { class: "ex__title", text: "Visste du? · " + I18N.t("didyouknow") }));
      host.appendChild(U.el("div", { class: "ex__stage" }, [U.el("div", { class: "ex__image", text: c.emoji })]));
      host.appendChild(U.el("div", { class: "card__title center", text: I18N.cultureTitle(step.id) }));
      host.appendChild(U.el("div", { class: "card__body", html: I18N.cultureBody(step.id) }));
    }

    function applyFeedback(res) {
      gradedTotal++;
      if (res.correct) { correct++; A.sfx.correct(); } else { hearts = Math.max(0, hearts - 1); A.sfx.wrong(); }
      paintHearts();
      foot.className = "footbar " + (res.correct ? "footbar--correct" : "footbar--wrong");
      U.clear(feedback);
      feedback.appendChild(U.el("div", { class: "feedback__icon", text: res.correct ? "✓" : "✕" }));
      var texts = [U.el("div", { class: "feedback__title", text: res.correct ? praise() : I18N.t("fb_notquite") })];
      if (res.answer) texts.push(U.el("div", { class: "feedback__answer", text: (res.correct ? "" : I18N.t("fb_answer")) + res.answer }));
      feedback.appendChild(U.el("div", {}, texts));
      foot.insertBefore(feedback, footBtn);
    }
    function praise() { var p = ["Bra! 🎉", "Snyggt! 👏", "Perfekt!", "Rätt! ✅"]; return p[Math.floor(Math.random() * p.length)]; }

    footBtn.addEventListener("click", function () {
      if (phase === "answer" && controller && controller.check) {
        checkedRes = controller.check();
        applyFeedback(checkedRes);
        phase = "feedback";
        footBtn.textContent = I18N.t("foot_continue"); ctx.ready(true);
      } else {
        idx++;
        if (idx >= steps.length) finish();
        else showStep();
      }
    });

    function finish() {
      var accuracy = gradedTotal ? Math.round((correct / gradedTotal) * 100) : 100;
      var xpGained = 10 + correct * 2;
      var rec;
      if (lesson.review) { P.addXp(xpGained); P.bumpStreak(); rec = { stars: 3 }; }
      else { rec = P.finishLesson(lesson.id, accuracy, xpGained); }
      cleanup();
      celebrate(lesson, accuracy, xpGained, rec.stars);
    }
    function cleanup() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }

    setProgress(); showStep();
  }

  /* ------------------------------------------------ Celebration */
  function celebrate(lesson, accuracy, xp, stars) {
    A.sfx.complete();
    confettiBurst();
    var scr = U.el("div", { class: "celebrate fadein" });
    scr.appendChild(moose("mascot--lg"));
    scr.appendChild(U.el("h1", { text: lesson.review ? I18N.t("celebrate_review_t") : I18N.t("celebrate_t") }));
    scr.appendChild(U.el("div", { class: "sv", text: lesson.review ? I18N.t("celebrate_review_s") : I18N.t("celebrate_s") }));
    scr.appendChild(U.el("div", { class: "stars", text: "⭐".repeat(stars || 1) + "☆".repeat(3 - (stars || 1)) }));
    scr.appendChild(U.el("div", { class: "reward-row" }, [
      U.el("div", { class: "reward" }, [U.el("div", { class: "reward__label", text: I18N.t("reward_xp") }), U.el("div", { class: "reward__val", text: "+" + xp })]),
      U.el("div", { class: "reward" }, [U.el("div", { class: "reward__label", text: I18N.t("reward_acc") }), U.el("div", { class: "reward__val", text: accuracy + "%" })])
    ]));
    var cont = U.el("button", { class: "btn", text: I18N.t("foot_continue") });
    cont.addEventListener("click", function () {
      scr.remove(); stopConfetti();
      if (location.hash === "#/" || location.hash === "") render();
      else location.hash = "#/";
    });
    scr.appendChild(cont);
    document.body.appendChild(scr);
  }

  /* ------------------------------------------------ Confetti */
  var confCanvas = U.qs("#confetti"), confCtx = null, confAnim = null, confParts = [];
  function confettiBurst() {
    if (!confCanvas) return;
    confCanvas.classList.add("is-on");
    confCanvas.width = window.innerWidth; confCanvas.height = window.innerHeight;
    confCtx = confCanvas.getContext("2d");
    var colors = ["#58cc02", "#1cb0f6", "#ffc800", "#ff4b4b", "#ce82ff"];
    confParts = [];
    for (var i = 0; i < 120; i++) {
      confParts.push({
        x: Math.random() * confCanvas.width, y: -20 - Math.random() * confCanvas.height * 0.4,
        r: 4 + Math.random() * 6, c: colors[i % colors.length],
        vy: 2 + Math.random() * 3, vx: -1.5 + Math.random() * 3,
        rot: Math.random() * 6, vr: -0.2 + Math.random() * 0.4
      });
    }
    var start = Date.now();
    function frame() {
      confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
      confParts.forEach(function (p) {
        p.x += p.vx; p.y += p.vy; p.rot += p.vr;
        confCtx.save(); confCtx.translate(p.x, p.y); confCtx.rotate(p.rot);
        confCtx.fillStyle = p.c; confCtx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
        confCtx.restore();
      });
      if (Date.now() - start < 2600) confAnim = requestAnimationFrame(frame);
      else stopConfetti();
    }
    frame();
  }
  function stopConfetti() {
    if (confAnim) cancelAnimationFrame(confAnim);
    if (confCtx) confCtx.clearRect(0, 0, confCanvas.width, confCanvas.height);
    if (confCanvas) confCanvas.classList.remove("is-on");
  }

  /* ================================================ ROUTER ============== */
  function render() {
    var hash = location.hash || "#/";

    if (!I18N.isOnboarded()) {
      if (hash === "#/setup") return viewSetup();
      return viewWelcome();
    }
    if (hash === "#/setup") return viewSetup();

    P.setRoute(hash);
    if (hash.indexOf("#/lesson/") === 0) {
      var id = hash.slice("#/lesson/".length);
      var lesson = D.lessons[id];
      if (!lesson) { location.hash = "#/"; return; }
      if (!P.isUnlocked(id)) { toast(I18N.t("toast_locked")); location.hash = "#/"; return; }
      runLesson(lesson);
      return;
    }
    if (hash === "#/culture") return viewCulture();
    if (hash === "#/phrasebook") return viewPhrasebook();
    if (hash === "#/practice") return viewPractice();
    return viewHome();
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-nav]");
    if (t) { e.preventDefault(); location.hash = t.getAttribute("data-nav"); }
  });

  window.addEventListener("hashchange", render);
  render();
})();
