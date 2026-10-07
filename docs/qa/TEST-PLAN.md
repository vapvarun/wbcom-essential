# wbcom-essential — Per-Block / Per-Widget Test Plan

**Scope:** 35 Gutenberg blocks + 43 Elementor widgets = **78 testable surfaces**
**Written against:** branch `4.7.0` @ `216d7b2`, plugin version 4.7.0
**Status:** plan only — none of this is implemented yet

---

## 1. Current state (verified, not assumed)

| Layer | State |
|---|---|
| PHPUnit | Absent. No `tests/`, no `phpunit.xml`, phpunit not in `composer require-dev` |
| JS unit (jest) | Absent. `package.json` scripts are build-only: `build:blocks`, `dev:blocks`, `clean:blocks`, `i18n`, `dist`, `release` |
| E2E / Playwright | Absent |
| `docs/qa/` | Did not exist before this file. No `qa-config.json`, so **`/wp-plugin-smoke` cannot run on this plugin** |
| CI (`.github/workflows/ci.yml`) | `php -l` on PHP 8.1–8.4 (real gate). PHPStan + WPCS present but **cannot fail** — each has `continue-on-error: true` *and* ends in `\|\| echo "completed with warnings"` |
| CI triggers | `push`/`pull_request` on `main`/`master` only — the `4.7.0` branch has never been CI-tested |
| Contract audit | `.contract-audit-baseline.json` present, 2 suppressions, both verified at code level |
| Fixtures | EDD only — `scripts/seed-edd-testbed.php`, `seed-edd-scale.php`, `seed-edd-license-actions.php`, `seed-bundle-testcase.php`. No BuddyPress / bbPress / WooCommerce / blog seeders |

**Net: 78 surfaces, 0 executable test cases.**

---

## 2. Risk findings surfaced while building this inventory

These are not test cases — they are defects or gaps found during the audit. Sized so you can decide what blocks the release.

### R1 — 14 static blocks have zero deprecation handlers (HIGH)

Static blocks serialize markup via `save.js` into post content. Change an attribute or the saved markup and every existing instance on every customer site throws *"This block contains unexpected or invalid content."*

Confirmed: none of the 14 static blocks has a `deprecated.js`.

```
countdown-timer  cta  faq-accordion  feature-grid  flip-box  hero
pricing-table  progress-bar  promo-banner  stats-counter  tabs
testimonial-carousel  text-rotator  timeline
```

Consequence: these 14 blocks are effectively **frozen** — any markup or attribute edit is a breaking change for existing content, silently, on the customer's site. This is the single highest-value thing to guard, and Tier 2 (save() snapshots) is the guard.

### R2 — CI's quality gates are decorative (HIGH)

PHPStan and WPCS are double-suppressed (`continue-on-error` + `|| echo`). They produce green checks regardless of findings. Anyone reading the CI badge is being misled about code quality.

### R3 — CI never ran on this release branch (MEDIUM)

Triggers are `main`/`master`; work happens on version branches like `4.7.0`. Even the one real gate (`php -l`) has not run against these commits.

### R4 — 16 features exist twice, once per engine, with no parity guarantee (MEDIUM)

Same capability shipped as both a block and a widget, in separate codebases:

`flip-box` · `tabs` · `timeline` · `pricing-table` · `progress-bar` · `text-rotator` · `testimonial-carousel` · `post-carousel` · `posts-ticker` · `portfolio-grid` · `login-form` · `countdown-timer` · `members-grid` · `members-carousel` · `groups-grid` · `group-carousel`

A bug fixed in the block does not reach the widget, and vice versa. Tier 3 needs an explicit parity axis or these drift permanently.

### R5 — Probable duplicate/dead widgets (LOW, needs a decision)

`wbcom-post-carousel` vs `wbcom-posts-carousel` — two registered widgets, near-identical names.
`wbcom-post-slider` vs `wbcom-slider` vs `wbcom-posts-revolution` — three slider-family widgets.

Either they are genuinely distinct (then the titles must say how) or some are dead weight to retire. Testing all of them before answering that wastes effort — resolve first.

---

## 3. Test architecture — four tiers

Tiers run cheapest-first. A tier only earns its place if it catches something the tier below cannot.

### Tier 0 — Static gates (CI, every commit, no browser, seconds)

No WordPress boot required.

| ID | Gate | Catches |
|---|---|---|
| T0.1 | `php -l` matrix 8.1–8.4 | Syntax errors (already exists) |
| T0.2 | WPCS `WordPress-Extra`, **blocking** | Escaping, sanitization, nonce, i18n violations |
| T0.3 | PHPStan level 5 + WP stubs, **blocking** with baseline | Undefined methods, wrong arg types, null derefs |
| T0.4 | `block.json` schema validation ×35 | Malformed metadata, bad `apiVersion`, missing `textdomain` |
| T0.5 | Asset-handle resolution ×35 | Every `script`/`style`/`viewScript`/`render` path in `block.json` resolves to a file that exists in `build/blocks/` |
| T0.6 | `grunt checktextdomain` | Wrong/missing text domain (already available, not enforced) |
| T0.7 | Widget-name uniqueness ×43 | Two widgets claiming one `get_name()` |

T0.4/T0.5 are the ones worth writing fresh — a block whose `viewScript` points at a file the build didn't emit registers fine and then does nothing on the frontend. That is exactly the silent-failure class no current gate catches.

### Tier 1 — PHP unit (PHPUnit + WP test suite)

Targets the **21 dynamic blocks** (`render.php`) and the **43 widget** `render()` methods. Fast, deterministic, no browser.

Per dynamic block, the standard six:

1. **Defaults** — render with attribute defaults, assert non-empty and wrapper class present
2. **Empty data** — zero members/groups/products/posts → renders the empty state, *not* a fatal, *not* silence
3. **Dependency absent** — BuddyPress/Woo/EDD/bbPress deactivated → degrades to notice or nothing, never fatal
4. **Escaping** — inject `<script>alert(1)</script>` and `" onload="` into every string attribute; assert escaped in output
5. **Query shape** — assert `LIMIT` is applied and no unbounded `SELECT *` (big-site rule 1)
6. **N+1** — wrap render in `$wpdb->num_queries` delta; assert query count does not scale with row count (big-site rule 3)

Cases 5 and 6 are where the big-site checklist becomes executable instead of aspirational.

### Tier 2 — JS unit / snapshot (jest)

**Purpose: the R1 guard.** For each of the 14 static blocks, snapshot `save()` output for the default attribute set plus 2–3 representative variants.

Any change to serialized markup then fails CI with a diff, forcing the author to either revert or write a `deprecated.js`. This converts a silent customer-site breakage into a loud build failure. Highest value-per-hour in the whole plan.

Also snapshot `edit.js` render for the same blocks to catch editor-side regressions cheaply.

### Tier 3 — E2E browser (Playwright MCP)

The only tier that proves a surface actually *looks* right. Per project rule: MCP tools directly, never standalone Playwright scripts.

Per surface, the standard flow:

1. Insert the block/widget into a page in the editor
2. Assert it appears in the inserter under its declared category
3. Configure the 3–5 highest-traffic controls
4. Save, view on frontend
5. Screenshot across the sampled matrix
6. Assert no console errors, no PHP notices

---

## 4. The matrix, and how to not drown in it

Full axes:

| Axis | Values |
|---|---|
| Viewport | 390 / 768 / 1440 |
| Theme | Twenty Twenty-Five (generic), BuddyX, Reign |
| Color scheme | light / dark |
| Direction | LTR / RTL |
| Data state | empty / normal / large (2000+) / error |
| Role | logged out / subscriber / admin |

Cartesian product is 3×3×2×2×4×3 = **432 runs per surface**. 78 surfaces = 33,696 runs. Not a plan, a fantasy.

**Sampling rule — apply per surface:**

- **Baseline (every surface, always):** 1440 + Twenty Twenty-Five + light + LTR + normal + the role the surface is built for. One run. 78 runs total.
- **Responsive (every surface with layout):** add 390. Non-negotiable per the project's 390px rule. +78 runs.
- **Risk-driven extras**, added only where the axis can actually break the surface:
  - *Dark mode* → surfaces with their own color tokens (all 35 blocks, since each ships `style.css`)
  - *RTL* → surfaces with directional layout: carousels, grids, timeline, tabs, progress bars, ticker
  - *Empty/large data* → the 21 dynamic blocks + 20 data-driven widgets only. Static blocks have no data state
  - *Role* → login-form, edd-account-dashboard, activity-feed, header-bar, notification-area, profile-completion, dashboard-intro
  - *Theme sweep (BuddyX + Reign)* → only surfaces that override theme markup: header-bar, smart-menu, notification-area, dashboard-intro, and the BuddyPress family

That lands around **420–480 total runs**, which is a real week of work, not a fantasy.

**Generic theme first.** Per the project standard: most site owners do not run BuddyX or Reign. Twenty Twenty-Five is the baseline; our own themes are the extra axis, not the default.

---

## 5. Per-item test case template

Every one of the 78 surfaces gets a record in this shape. This is what "we have test cases for each block" will mean when it's true.

```markdown
### BLK-hero — wbcom-essential/hero

- Engine:      Gutenberg (static, save.js)
- Category:    essential-marketing
- Attributes:  42
- Deps:        none
- Risk:        HIGH (static, no deprecation)
- Fixtures:    none

| ID | Tier | Case | Expected | Status |
|----|------|------|----------|--------|
| BLK-hero-T0-1 | 0 | block.json validates, assets resolve | pass | ☐ |
| BLK-hero-T2-1 | 2 | save() snapshot, default attrs | matches baseline | ☐ |
| BLK-hero-T2-2 | 2 | save() snapshot, bg image + overlay | matches baseline | ☐ |
| BLK-hero-T3-1 | 3 | insert from inserter under Marketing | appears, inserts clean | ☐ |
| BLK-hero-T3-2 | 3 | frontend @1440 light LTR | matches design | ☐ |
| BLK-hero-T3-3 | 3 | frontend @390 | stacks, CTA ≥40px tap target | ☐ |
| BLK-hero-T3-4 | 3 | dark mode | tokens resolve, text readable | ☐ |
| BLK-hero-T3-5 | 3 | long heading (200 chars) | wraps, no overflow | ☐ |
```

---

## 6. Full inventory with risk and priority

### 6a. Gutenberg blocks — 35 (21 dynamic, 14 static)

**EDD — 8 blocks** *(P0: 4.7.0 changed this area)*

| Block | Type | Attrs | Deps | Risk | Notes |
|---|---|---|---|---|---|
| `product-catalog` | dynamic | 28 | EDD | **P0** | 4.7.0 server-rendered page 1; 4.7.0 fixed failed-request-as-empty. Needs: error state ≠ empty state, pagination at 2000 products, server/client first-page consistency |
| `edd-checkout-progress` | dynamic | 20 | EDD | **P0** | 4.7.0 dropped contradictory ARIA state. Needs a11y assertion, not just visual |
| `edd-checkout-trust` | dynamic | 24 | EDD | **P0** | 4.7.0 stopped default claims about the store; money-back default now 30 days. Assert defaults assert nothing false |
| `edd-checkout-social` | dynamic | 27 | EDD | **P0** | 4.7.0 ships Trustpilot section empty; editor restored after section split. Assert empty-by-default |
| `edd-checkout-enhanced` | dynamic | 35 | EDD | **P0** | Highest attr count in EDD family; 4.7.0 dropped the wrapper, sections now blocks inside `edd/checkout` |
| `edd-checkout-recommendations` | dynamic | 21 | EDD | **P0** | Inserter findability was a 4.7.0 fix — assert it |
| `edd-account-dashboard` | dynamic | 27 | EDD | P1 | Role-sensitive; large-order-history state |
| `edd-order-success` | dynamic | 24 | EDD | P1 | Post-purchase state, hard to reach — needs seeded order |

**BuddyPress — 5 blocks**

| Block | Type | Attrs | Deps | Risk |
|---|---|---|---|---|
| `activity-feed` | dynamic | 39 | BuddyPress | P1 |
| `members-carousel` | dynamic | 38 | BuddyPress | P1 |
| `group-carousel` | dynamic | 37 | BP + groups | P1 |
| `groups-grid` | dynamic | 35 | BP + groups | P1 |
| `members-grid` | dynamic | 33 | BuddyPress | P1 |

**WooCommerce — 3 blocks**

| Block | Type | Attrs | Deps | Risk |
|---|---|---|---|---|
| `product-carousel` | dynamic | 40 | WooCommerce | P1 |
| `product-grid` | dynamic | 38 | WooCommerce | P1 |
| `customer-reviews` | dynamic | 34 | WooCommerce | P1 |

**Blog — 3 blocks**

| Block | Type | Attrs | Deps | Risk |
|---|---|---|---|---|
| `post-carousel` | dynamic | 41 | core | P1 |
| `posts-ticker` | dynamic | 35 | core | P1 |
| `category-grid` | dynamic | 38 | core | P1 |

**Content — 5 blocks**

| Block | Type | Attrs | Deps | Risk |
|---|---|---|---|---|
| `portfolio-grid` | dynamic | 36 | core | P1 |
| `login-form` | dynamic | 31 | core | P1 (role axis) |
| `faq-accordion` | static | 30 | — | **P2 (R1)** |
| `tabs` | static | 28 | — | **P2 (R1)** |
| `timeline` | static | 29 | — | **P2 (R1)** |

**Marketing — 7 blocks**

| Block | Type | Attrs | Risk |
|---|---|---|---|
| `hero` | static | 42 | **P2 (R1)** — highest attr count in plugin |
| `promo-banner` | static | 33 | **P2 (R1)** |
| `countdown-timer` | static | 32 | **P2 (R1)** — time-dependent, needs frozen clock |
| `cta` | static | 32 | **P2 (R1)** |
| `testimonial-carousel` | static | 32 | **P2 (R1)** |
| `pricing-table` | static | 30 | **P2 (R1)** |
| `feature-grid` | static | 27 | **P2 (R1)** |

**Design — 4 blocks**

| Block | Type | Attrs | Risk |
|---|---|---|---|
| `flip-box` | static | 34 | **P2 (R1)** — hover/touch; needs an explicit touch case |
| `text-rotator` | static | 32 | **P2 (R1)** — animation, `prefers-reduced-motion` |
| `progress-bar` | static | 29 | **P2 (R1)** |
| `stats-counter` | static | 26 | **P2 (R1)** — animation on scroll |

### 6b. Elementor widgets — 43

**BuddyPress — 11** *(gated on `class_exists('BuddyPress')`; group widgets additionally on `bp_is_active('groups')`; forums on `class_exists('bbPress')`)*

| Widget | Name | Gate | Risk |
|---|---|---|---|
| HeaderBar | `wbcom-header-bar` | BP | **P1** — 7 sub-templates (cart, friends, messages, notifications, nav, aside); theme-sensitive |
| ProfileCompletion | `wbcom-profile-completion` | BP | P1 — role axis |
| DashboardIntro | `wbcom-dashboard-intro` | BP | P1 — role + theme axis |
| ActivityFeed via Forums | `wbcom-forums` | bbPress | P2 |
| ForumsActivity | `wbcom-forums-activity` | bbPress | P2 |
| MembersGrid | `wbcom-members-grid` | BP | P2 — **parity with `members-grid` block** |
| MemberCarousel | `wbcom-members-carousel` | BP | P2 — **parity** |
| MembersLists | `wbcom-members-lists` | BP | P2 |
| GroupGrid | `wbcom-groups-grid` | BP+groups | P2 — **parity** |
| GroupCarousel | `wbcom-group-carousel` | BP+groups | P2 — **parity** |
| GroupsLists | `wbcom-groups-lists` | BP+groups | P2 |

**General — 27**

| Widget | Name | Risk | Notes |
|---|---|---|---|
| SmartMenu | `wbcom-smart-menu` | **P1** | Nav; mobile behaviour, keyboard traversal |
| NotificationArea | `wbcom-notification-area` | **P1** | Role axis, theme axis |
| LoginForm | `wbcom-login-form` | **P1** | Role axis; **parity with `login-form` block** |
| PostCarousel | `wbcom-post-carousel` | P1 | **parity**; see R5 |
| PostsCarousel | `wbcom-posts-carousel` | P1 | **R5 — resolve vs PostCarousel before testing** |
| PostSlider | `wbcom-post-slider` | P1 | R5 |
| Slider | `wbcom-slider` | P1 | R5 |
| PostsRevolution | `wbcom-posts-revolution` | P1 | R5 |
| PostsTicker | `wbcom-posts-ticker` | P1 | **parity** |
| PostTimeline | `wbcom-post-timeline` | P1 | data-driven |
| PortfolioGrid | `wbcom-portfolio-grid` | P1 | **parity** |
| TeamCarousel | `wbcom-team-carousel` | P2 | |
| TestimonialCarousel | `wbcom-testimonial-carousel` | P2 | **parity** |
| Testimonial | `wbcom-testimonial` | P2 | |
| Accordion | `wbcom-accordion` | P2 | a11y: keyboard + ARIA |
| Tabs | `wbcom-tabs` | P2 | **parity**; a11y |
| Timeline | `wbcom-timeline` | P2 | **parity** |
| PricingTable | `wbcom-pricing-table` | P2 | **parity** |
| ProgressBar | `wbcom-progress-bar` | P2 | **parity** |
| Countdown | `wbcom-countdown` | P2 | **parity**; frozen clock |
| TextRotator | `wbcom-text-rotator` | P2 | **parity**; reduced-motion |
| FlipBox | `wbcom-flip-box` | P2 | **parity**; touch |
| DropdownButton | `wbcom-dropdown-button` | P2 | a11y |
| Heading | `wbcom-heading` | P3 | presentational |
| Branding | `wbcom-branding` | P3 | presentational |
| SiteLogo | `wbcom-site-logo` | P3 | presentational |
| Shape | `wbcom-shape` | P3 | presentational |

**WooCommerce — 5** *(gated on `class_exists('WooCommerce')`)*

| Widget | Name | Risk |
|---|---|---|
| UniversalProduct | `wbcom-universal-product` | P1 — broadest surface |
| ProductTab | `wbcom-product-tab` | P1 |
| CustomerReview | `wbcom-customer-review` | P2 — **parity with `customer-reviews` block** |
| WcTestimonial | `wbcom-wc-testimonial` | P2 |
| AddBanner | `wbcom-add-banner` | P3 |

---

## 7. Fixtures required

EDD is covered. Everything else needs building.

| Fixture | Feeds | Status |
|---|---|---|
| `seed-edd-testbed.php` | 8 EDD blocks | **exists** |
| `seed-edd-scale.php` | EDD large-data cases | **exists** |
| `seed-bp-testbed.php` | 5 BP blocks + 11 BP widgets | **to write** — members, groups, activity, friendships, notifications, messages |
| `seed-bp-scale.php` | Big-site: 500+ users, 200+ groups, 2000+ activities | **to write** |
| `seed-wc-testbed.php` | 3 Woo blocks + 5 Woo widgets | **to write** — products, categories, reviews, variations |
| `seed-blog-testbed.php` | 3 blog blocks + 8 post widgets | **to write** — 2000+ posts, categories, featured images, long titles |
| `seed-bbpress-testbed.php` | 2 forum widgets | **to write** |
| Edge-content fixture | All surfaces | **to write** — 200-char titles, emoji, RTL Arabic/Hebrew strings, missing featured images, HTML in titles |

The edge-content fixture is the cheap one that finds the most bugs. Build it first.

---

## 8. Sequencing

### Wave 0 — Unblock the release (est. 1–2 days)
- Fix R2: make PHPStan + WPCS blocking (drop `continue-on-error`, drop `|| echo`, add a baseline so existing debt doesn't block)
- Fix R3: add version branches to CI triggers (`4.*`, or just `**`)
- Tier 3 baseline on the 6 **P0** EDD blocks only — @1440 + @390, light + dark, normal + empty + error data
- Pristine-Docker install test of `dist/wbcom-essential-4.7.0.zip`

That is the honest minimum before tagging 4.7.0: it verifies what 4.7.0 actually changed, and stops CI from lying.

### Wave 1 — The R1 guard (est. 2–3 days)
- Add jest + `@wordpress/scripts test-unit-js`
- Tier 2 save() snapshots for all 14 static blocks
- Wire into CI as blocking

Highest value-per-hour in the plan. After this, the 14 frozen blocks are safe to change.

### Wave 2 — Static gates (est. 1–2 days)
- T0.4 block.json schema validation ×35
- T0.5 asset-handle resolution ×35
- T0.7 widget-name uniqueness ×43
- Enforce T0.6 `checktextdomain`

### Wave 3 — PHP unit (est. 4–5 days)
- PHPUnit + WP test suite scaffold
- Tier 1 six-case set for the 21 dynamic blocks
- Widget `render()` smoke ×43 (registration + no-fatal, deps present and absent)

### Wave 4 — Fixtures (est. 3–4 days)
- Edge-content fixture first
- BP, Woo, blog, bbPress seeders + scale variants

### Wave 5 — E2E sweep (est. 5–7 days)
- Tier 3 across the sampled matrix, P1 then P2 then P3
- Parity assertions on the 16 R4 pairs
- Per-surface records committed as they pass

### Wave 6 — Wire to the portfolio standard (est. 1 day)
- `docs/qa/qa-config.json` so `/wp-plugin-smoke` works
- `docs/qa/AGENT_SMOKE_RUNBOOK.md` generated from the Wave 5 records
- `bin/build-release.sh` reading `.last-smoke-pass.json` as a release gate

**Total: roughly 3–4 weeks of focused work.** Waves 0–2 are ~1 week and deliver most of the protection.

---

## 9. Decisions needed before Wave 5

1. **R5** — are `post-carousel` / `posts-carousel` / `post-slider` / `slider` / `posts-revolution` five distinct widgets or three too many? Retiring dead widgets is cheaper than testing them.
2. **Theme sweep depth** — is Reign in scope, or BuddyX + generic only?
3. **Big-site thresholds** — the project standard says 2000+ rows. Confirm that applies to BP activity and Woo products here, or set per-surface numbers.

---

## 10. Definition of done, per surface

A block or widget is "tested" when:

- [ ] Tier 0 gates pass
- [ ] Tier 1 six-case set passes (dynamic surfaces) or Tier 2 snapshot exists (static blocks)
- [ ] Tier 3 baseline + 390px screenshots captured and reviewed **by eye**
- [ ] Empty, error, and large-data states each render correctly
- [ ] Dark mode tokens resolve; no raw hex
- [ ] RTL correct where layout is directional
- [ ] Tap targets ≥40px; keyboard reachable; icon-only controls have ARIA labels
- [ ] No console errors, no PHP notices
- [ ] Its record is committed to `docs/qa/surfaces/<id>.md`

Per project rule: code-quality gates passing does **not** mean a surface is done. The browser check is what closes it.
