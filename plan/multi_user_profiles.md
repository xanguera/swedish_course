# Multi-user (per-device learner profiles)

## TL;DR
In a previous session I built a "multiple named learner profiles per device"
feature — a circular avatar button (active user's initials) in the topbar that
opens Settings, where you can rename yourself, switch to another family member,
or add a new one. Each profile stores its own name, language pair, and progress,
all offline in `localStorage`. **That work was committed only to the unmerged
remote branch `claude/multi-user-device-profiles-ghoxz3` (commit `ea456f8`) and
was never merged into `main` or `pt-catalan-course`.** That branch was also cut
from an *old* base (`12dbd45`, before the multilingual/multi-course refactor), so
we can't just cherry-pick it. This plan re-applies the feature onto the current
`pt-catalan-course` branch, adapting the one real difference: the app now lets
users pick the **target** language too, so each profile stores its own L1→L2 pair
(the original hardcoded Swedish as the target).

## Why it's missing
- Feature lives in `ea456f8` on `origin/claude/multi-user-device-profiles-ghoxz3`.
- `git merge-base --is-ancestor ea456f8 HEAD` → **not** an ancestor. Never merged.
- `js/profiles.js` absent on current branch; `app.js` has 0 refs to "profile".

## Design (unchanged from original, plus multi-target)
- **`js/profiles.js`** (`LSV.profiles`): store `{activeId, list:[{id,name,l1,l2,createdAt}]}`
  under `lsv:profiles`. One-time migration of a legacy single-profile install
  (`lsv:settings` + `lsv:v1`) into the first profile. API: `list/activeId/active/
  get/hasAny/create/switchTo/update/progressKey/initials`.
- **Progress keyed per profile**: `lsv:v1:<activeId>` (was global `lsv:v1`).
  Switching profile → different progress blob. Adds `P.reload()`.
- **i18n reads pair from active profile**: `syncFromActiveProfile()` /
  `persistActive()` replace `loadSettings`/`saveSettings`. `completeOnboarding`
  gains a `name` arg; `isOnboarded` = `profiles.hasAny()`; new `switchProfile(id)`.
- **Topbar**: replace `.lang-btn` flag (`#lang-btn` 🇬🇧) with `.avatar-btn`
  (`#profile-btn`) circular initials avatar; still `data-nav="#/setup"`.
- **Settings screen** (`#/setup` when onboarded): family-member list (tap to
  switch), rename field, L1 + L2 pickers, offline group, danger/reset.
- **Add-member form** (`#/setup/new`): name + L1 + L2 pickers → creates & switches.
- **Onboarding** (first run): name + L1 + L2 pickers.

### Adaptation vs. the original
Original hardcoded `l2 = "sv"` and only offered an L1 picker. Current app already
has a working L2 (target) picker in `viewSetup`. The re-applied `viewProfileForm`
and `viewSettings` keep **both** pickers, and profile create/save persists the
chosen L2. Switching a profile calls `applyTarget()` (`D.useTarget(L2)`) so the
course content reloads for that profile's target — then `P.reload()` for progress.

## Switch/create flow (the one tricky bit)
```
switch:  I18N.switchProfile(id) → applyTarget() → P.reload() → localizeChrome() → render
create:  I18N.completeOnboarding(name,l1,l2) → applyTarget() → P.reload() → localizeChrome() → render
```
`applyTarget()` must run before `P.reload()` isn't required (independent), but both
must run before render. progress.js `load()` runs at module init, so **profiles.js
must load before progress.js and before i18n.js** in index.html.

## Tasks
- [x] Investigate: confirm feature exists only on unmerged branch — DONE
- [ ] Add `js/profiles.js` (port from `ea456f8`, verbatim — already multi-l2 safe)
- [ ] `index.html`: add `<script src="js/profiles.js">` after util.js (before i18n);
      swap topbar `.lang-btn`🇬🇧 → `.avatar-btn` `#profile-btn`
- [ ] `js/i18n.js`: sync/persist from active profile; `completeOnboarding(name,l1,l2)`;
      `isOnboarded`→`hasAny`; add `switchProfile`
- [ ] `js/progress.js`: key by `profiles.progressKey()`; add `reload()`
- [ ] `js/app.js`: avatar in `localizeChrome`; refactor `viewSetup` into
      `buildLangPicker` + `nameInputGroup` + `viewProfileForm(isNew)` +
      `viewSettings` + router (`#/setup`, `#/setup/new`); keep L2 picker + applyTarget
- [ ] `css/styles.css`: `.avatar-btn`, `.text-input`, `.profile-row*`
- [ ] `data/i18n_en.js` + `data/i18n_pt.js`: add setup_name(_placeholder),
      settings_save_btn, profile_section_label/unnamed/add_btn/add_title,
      toast_profile_switched
- [ ] Verify in browser: onboard w/ name → avatar shows initials → add 2nd member
      (different course) → switch → progress & course swap → reload persists → reset

## Review
Implemented all tasks. Verified end-to-end in a headless Chromium (Playwright)
against `python3 -m http.server`, driving the real app — not tests:

**New-user flow** (`drive.py`, ALL CHECKS PASSED):
- Welcome → onboarding now requires a name; empty name is rejected (error state).
- Onboarded as "Anna Berg" → topbar shows round **AB** avatar (screenshot `home_anna.png`).
- Settings (via avatar) shows "Family members on this device" list + rename +
  L1 + L2 pickers (screenshot `settings.png`).
- Added 2nd member "Ravi" → avatar becomes **RA**; store has 2 profiles;
  Ravi's progress is a fresh blob (xp 0, does **not** inherit Anna's 42).
- Switched back to Anna → avatar **AB**, and her per-profile XP (42) is restored live.
- Full reload → still Anna, XP 42 → **persists offline in localStorage**.
- Zero console/page errors.

**Existing-user migration** (`migrate.py`, MIGRATION OK):
- Seeded a legacy pre-profiles install (`lsv:settings` pt→ca + `lsv:v1` xp 777),
  reloaded → migrated into one (unnamed) profile, pair preserved, progress copied
  to `lsv:v1:<id>`, XP 777 shown on home, onboarding correctly skipped. No data loss.

**Also handled:** added `js/profiles.js` to the service-worker precache list and
bumped `CACHE_VERSION` v3→v4 so installed PWAs pick up the new shell (otherwise the
new script would only be runtime-cached).

## Follow-up: per-session "who's playing" gate
Requested after the first pass: every new **browser session** should force a
learner choice before the app opens.

- **Model:** the active profile still persists in `localStorage`; a new
  `sessionStorage` key (`lsv:session`) records which learner was chosen *this
  browser session*. Cleared when the tab/session ends → next session re-gates.
  In-memory fallback where storage is unavailable.
- **Router (`js/app.js` `render`):**
  - No profiles → first-time visitor → Welcome → create-only form (unchanged).
  - Profiles exist but `!sessionReady()` → `viewProfilePicker()` ("Who's
    learning?": tap an existing learner, or "+ New user" → create form).
  - `sessionReady()` → normal app.
- Picking, creating, or switching a profile all call `setSessionId(id)` so a
  same-tab reload does **not** re-gate.

### Follow-up verification (`drive2.py`, ALL SESSION-GATE CHECKS PASSED)
- First-time visitor: create-only form, **no** picker shown. ✓
- New browser tab (fresh `sessionStorage`, confirmed `null`): lands on the
  picker with all existing profiles, not the app. ✓ (screenshot `picker.png`)
- Pick "Anna Berg" → her per-profile XP (42) goes live. ✓
- Same-tab reload → **no** re-gate, still Anna. ✓
- "+ New user" from the picker → create form → new profile → straight into app. ✓
- Zero console/page errors.

### Note for the user
The original feature branch `claude/multi-user-device-profiles-ghoxz3` (commit
`ea456f8`) is now superseded by this re-applied + multi-target-adapted version and
can be deleted once this lands.
