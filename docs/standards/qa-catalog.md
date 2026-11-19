# WordPress Plugin QA Catalog (ALL plugins — normative)

> The single source of truth for **what gets checked, how, and in what order**
> before any card moves to Ready for Testing or any release ships. Applies to
> every Wbcom plugin/theme (100+). Per-plugin repos hold **data only**; the
> process is defined here, once. Each plugin keeps a synced copy at
> `docs/standards/qa-catalog.md`.

## Priority (non-negotiable)

**Tier 1 is presentation & functional flow — what a site owner or member SEES
and DOES in a real browser.** Code audits (WPCS, PHPStan, PHPUnit, coding rules)
are SECONDARY: they run automatically at commit/push, cost zero attention, and
never substitute for a browser pass. Rationale: the Eventonomy 2026-07-02 cycle
produced 17 QA bounces — every one was presentation or flow (theme-fit, dead UI,
SSR↔JS drift, missing entry points); zero were static-analysis catchable. Static
gates were already green the whole time.

**Core flows are checked at two levels, every release (owner rule, 2026-10-10).**
"Code audit is secondary" means the linters, not the flow. For each core path,
trace the code flow (entry points on frontend/admin/REST, the permission/privacy
gate on every read and write, counters, caches, every surface that renders it)
AND walk it in the browser as every role, on two environments when the plugin
has more than one storage/server mode. Anything seen at one level and not
explained at the other is a gap, not a pass. Each core path keeps a journey with
a "Code flow to confirm" block, tagged in REQUIRED-COVERS so CI notices if it
goes missing. Reference: WPMediaVerse `audit/journeys/customer/72`, `73`.

```
Tier 1  PRESENTATION & FLOW   (browser — the primary gate)
Tier 2  PRODUCT COMPLETENESS  (no dead UI, 3 entry points, honest upsell)
Tier 3  FUNCTIONAL LOGIC      (REST live, money, roles, scale)
Tier 4  CONTRACT & WIRING     (settings, hooks, REST↔JS, enums)
Tier 5  CODE QUALITY          (secondary — automatic, silent when green)
Tier 6  I18N · DOCS · RELEASE
```

## The one pipeline (wired — every check has a named runner)

One entry point runs everything in order and emits one verdict. No step is
optional; a SKIPPED without written reason = FAIL.

```
VERIFY (pre-RFT / pre-release)
│
├─ 0  BOOT        wp plugin activate + debug.log diff · npm run build ·
│                 RTL parity · migrations idempotent · debug.log stays clean
│                 through the ENTIRE G3 run (diff at end) · G4: upgrade-path —
│                 install PREVIOUS released zip + seed real data → upgrade to
│                 current → data intact, migrations fire (activation hooks do
│                 NOT run on update; the runtime version-gate must). Free
│                 only / Pro only / both orders, equal row counts, migration
│                 resumes after a mid-batch kill · G4: uninstall: data
│                 removed or kept per the setting, no orphan tables/options/
│                 cron (wppqa_check_database) · every release smoke runs the
│                 escape-class checks (see "Escape classes" below)
│
├─ 1  PRESENTATION & FLOW  ←——— the gate that decides RFT
│     1a  Journeys        audit/journeys/*.md, walked by an AGENT (Playwright
│                         MCP + curl + mysql, per-step assertions). bin/run-
│                         journeys.sh only builds the runbook and fails if the
│                         last recorded run had a FAIL; it executes nothing.
│                         NOT in the pre-push hook (that runs ci:no-journeys)
│     1b  Smoke walk      /wp-plugin-smoke (reads docs/qa/qa-config.json,
│                         walks AGENT_SMOKE_RUNBOOK.md in a real browser)
│     1c  Block matrix    scripted page w/ EVERY block → non-empty DOM +
│                         screenshot   (Playwright MCP)
│     1d  Theme-fit       key surfaces × the ONE matrix below ("Theme,
│                         viewport and environment matrix") — computed-style
│                         asserts: font inherits theme, accent chain resolves,
│                         no theme button-bleed, no raw hex (Playwright MCP) ·
│                         wppqa_check_css_contract (class / custom property
│                         used in markup but defined by no shipped stylesheet)
│     1e  SSR↔JS parity   DOM-diff server render vs view.js re-render for
│                         every block with client re-render (Playwright MCP)
│     1f  States          hover/focus/disabled probes · empty/error/loading
│                         forced per async surface · per-field 422 errors
│                         render AT the field           (Playwright MCP)
│     1g  A11y            wppqa_check_a11y + keyboard pass + role=status
│     1h  Console clean   zero JS errors on every visited page
│     1i  390px           every touched surface screenshot-verified
│     1j  Editor side     every block INSERTED in Gutenberg — no crash, preview
│                         renders, inspector controls change output (Playwright)
│     1k  Legacy surfaces every shortcode / widget / template override renders
│                         (BP-era + Woo plugins — not everything is a block) ·
│                         wppqa_check_templates (override paths, lifecycle
│                         hooks) + wppqa_check_template_contract (a template
│                         reads a variable no loader passes)
│     1l  Emails render   every outgoing email opened from the log — branded
│                         shell, placeholders resolved, links work
│
├─ 2  PRODUCT COMPLETENESS
│     2a  Click-everything   every visible tab/button/setting clicked once —
│                            leads somewhere real (no dead UI; a "Saved" tab
│                            requires a Save button)      (journey)
│     2b  3 entry points     every data store: frontend + admin view + REST
│                            (manifest cross-check; exceptions documented)
│     2c  Schema↔UI parity   every meaningful column surfaced (featured →
│                            badge, counts → stats)
│     2d  Free/Pro states    dual-state journey: Pro off (locked upsells
│                            visible) / Pro on (everything live)
│     2e  Owner expectation  settings placement vs WooCommerce/TEC norms;
│                            no one-control sections; 3rd-party under
│                            Integrations              (review checklist)
│
├─ 3  FUNCTIONAL LOGIC
│     3a  REST live       wppqa_check_api — CRUD each resource on the seeded
│                         site; envelope uniform {items,total,…}
│     3b  Role probe      wppqa_probe_roles vs audit/ROLE_MATRIX.md
│     3c  Money exact     checkout journey asserts subtotal/tax/fee/coupon/
│                         total to the cent (incl. inclusive-tax, absorb-fee)
│     3d  State machines  order/RSVP/event transitions; webhook idempotency
│     3e  Background jobs cron/AS fire (wp cron event run probe)
│     3f  Concurrency     two-session "already taken/deleted" journey steps
│     3g  SCALE           wp <plugin> seed --scale (2000+ rows of every
│                         listed thing: posts, users, the plugin's own records):
│                         pagination + COUNT(*) + indexes + no N+1 (query
│                         budget) + filter/sort usable   (benchmark stage) ·
│                         wppqa_check_scale (static: missing index, unbounded
│                         read) + wppqa_check_database (tables, schema)
│     3h  Notifications   every email/SMS/web notification fires EXACTLY ONCE
│                         on its trigger, respects its settings toggle
│                         (trigger journey; plus bin/email-coverage-check.sh
│                         where the plugin has one, see "Plugin-local gate
│                         scripts" below)
│     3i  Degradation     external API down (gateway, geocoder, SMS, updater)
│                         → graceful user-visible error, no fatal, no data
│                         corruption            (mocked-failure journey)
│     3j  Round-trip      export → reimport (CSV/ICS/JSON) → data equal
│     3k  Time handling   timezone + DST correctness wherever dates matter
│                         (site TZ ≠ event TZ journey data). Site at UTC+13:45
│                         and at UTC-11, record made at 23:30 local: the same
│                         date on list, single, email, chart and the edit
│                         round trip (~/.claude/workflows/wbcom-time-standard.md)
│
├─ 3E ENVIRONMENT & COMPAT
│     3E-a  Min versions   activates + G1 journeys pass on min WP / min PHP
│                          (PHPCompatibility sniff at G2; live matrix at G4)
│     3E-b  Multisite      network activate + subsite: no fatals, per-site
│                          tables/options correct
│     3E-c  Object cache   Redis/persistent cache ON — invalidation on writes
│                          still correct (last_changed keys)
│     3E-d  Page cache     cached pages + expired nonces → REST writes still
│                          succeed or re-auth gracefully (classic cache bug)
│     3E-e  Host plugins   addons: BuddyPress / WooCommerce / host theme at
│                          min supported AND latest — integration surfaces
│                          (tabs, activity, checkout) render on both
│     3E-f  Conflict smoke activate alongside the common stack (Elementor,
│                          Yoast, LiteSpeed/W3TC, WooCommerce, BuddyPress) —
│                          no fatals, journeys still pass       (G4)
│     3E-g  Cross-browser  key journeys on WebKit + Firefox     (G4)
│     3E-h  Asset scoping  plugin CSS/JS enqueued ONLY on surfaces that need
│                          them (network-tab probe on an unrelated page)
│
├─ 4  CONTRACT & WIRING
│     4a  Settings wiring    wppqa_check_wiring_completeness + camelCase-aware
│                            trace (render.php, Store→state.config→view.js,
│                            functions.php — naive greps false-positive)
│     4b  Key/hook contract  /wp-contract-audit (+ baseline): orphan keys,
│                            dual keys, consumed-never-fired, dead hide-CSS
│     4c  REST↔JS contract   wppqa_check_rest_js_contract
│     4d  Field parity       editor ↔ REST write: the `parity` check class
│                            of wppqa_run_checks (plus bin/field-parity-
│                            check.sh where the plugin has one, see below)
│     4e  Enums              wppqa_check_enum_consistency ('published' etc.)
│     4f  Action audit       /action-audit + the dev-rules section of
│                            wppqa_audit_plugin (nonce+cap on every write;
│                            WP_Error not false)
│     4g  Secrets            tokens/keys never in REST/admin/CSV/HTML
│                            (grep + security journeys as sentinels)
│
├─ 5  CODE QUALITY  (secondary — runs at G1/G2 automatically, silent when green)
│     5a  php -l · WPCS · PHPStan(+baseline) · JS lint      composer lint/analyse
│     5b  Coding rules       bin/coding-rules-check.sh
│     5c  Arch invariants    bin/architecture-checks.sh + plan/INVARIANTS.yaml
│                            (EP1: Pro→Free via contracts/hooks only)
│     5d  Unit tests         phpunit tests/unit (pure services: money,
│                            recurrence, container)
│     5e  Asset budgets      npm run size
│
├─ C  COVERAGE LEDGER  (fresh-buyer audits, pre-release deep pass, perf audits)
│     Every shipped file gets a verdict (covered % / needs scenario / dead /
│     referenced-but-missing), filled by Xdebug line coverage + Chrome CSS/JS
│     coverage + template log across a role × viewport × LTR/RTL × dark ×
│     settings-scenario crawl. Matrix first, screenshots decide, control theme
│     for every claim. Full method: references/full-coverage-audit.md
│
└─ 6  I18N · DOCS · RELEASE  (G4 only)
      6a  i18n            WPCS sniff (domain, translator comments, _n) ·
                          make-pot diff empty · date_i18n/number_format_i18n ·
                          logical CSS props · no em-dash in customer strings
      6b  Docs coverage   every block/screen/setting/feature has a dedicated
                          doc (coverage audit vs manifest) · screenshots current
                          · wppqa_check_qa_coverage (every REST route, AJAX
                          handler, cron and CLI command in the manifest has
                          a test or journey)
      6c  Dev-friendly    manifest fresh (±5% vs greps) · EXTENDING.md lists
                          every seam · REST-API.md parity · CLAUDE.md current
      6d  Packaging       version triangulation · action-prefix changelog ·
                          dist zip clean · licensing/updater answers ·
                          Free/Pro lockstep · boot-smoke the BUILT ZIP ·
                          readme "Tested up to" current
      6e  Privacy/GDPR    WP personal-data exporter + eraser registered for
                          every PII store (emails, phones, orders) · no PII
                          in logs · privacy-policy snippet registered
      6f  SEO output      structured data (schema.org) validates where the
                          plugin emits it · noindex flags honored
```

## Theme, viewport and environment matrix (the one definition)

Every skill, runbook and `qa-config.json` points here. Do not list themes anywhere else.

| Lane | Members | Runs |
|---|---|---|
| Our themes | BuddyX, BuddyX Pro, Reign | every G3 and G4 |
| Core default | the current Twenty-series block theme | every G3 and G4 |
| Popular third party | Astra or Kadence (no `[hidden]` reset, own button styles) | G4 |
| Builder lane | Elementor and Divi: our blocks/shortcodes placed inside a builder page | G4 |
| SEO-plugin lane | Yoast or Rank Math active: assert a single `og:` / canonical / schema set | G4 |

- **Viewports:** 1440 and 390 are mandatory everywhere. 1024 is added at G4 (`matrix.full`).
- **Colour modes:** light, dark through the theme's own toggle, and OS-dark (`prefers-color-scheme: dark` emulated with the theme toggle untouched).
- **Direction:** RTL on the primary theme at 1440 and 390 at G4 (`matrix.full`).
- `matrix.fast` (push, per card) = primary theme, 1440 + 390, light + dark.

## Fast order (cheapest first, stop at the first red)

| Budget | What runs |
|---|---|
| Seconds | `php -l` on PHP 8.1 to 8.5 · `/wp-contract-audit` script · `core-first-check.php` · `table-lock-check.php` · `time-standard-check.php` (raw `wp_date` / `date_i18n` / `mysql2date` outside the helpers) |
| Under a minute | WPCS · PHPStan · blocking PHPUnit · wppqa static checks (`wppqa_check_wiring_completeness`, `_rest_js_contract`, `_enum_consistency`, `_css_contract`, `_template_contract`, `_scale`, `_qa_coverage`) |
| Minutes, scripted | `wppqa_run_checks` fast · `wppqa_audit` · `wppqa_probe_roles` · `wppqa_check_a11y` · `wppqa_check_api` · `wppqa_check_database` · scripted upgrade, uninstall, multisite and the PHP 8.5 `WP_DEBUG` crawl |
| Agent walk | `/wp-plugin-smoke` on the surfaces derived from the diff (full walk once per release cycle) |
| Release only | full theme matrix · first-hour walk on a fresh install · conflict stack · cross-browser |

## Escape classes

Every release smoke runs the escape-class checks in
`~/.claude/skills/wp-card-qa/references/escape-classes.md` (the defect classes that
have already reached customers). A release report that does not show them run is not a pass.

## Plugin-local gate scripts

A plugin carries data, plus the standard `bin/` gate scripts scaffolded from
`wp-plugin-onboard/templates/` (`local-ci.sh`, `coding-rules-check.sh`,
`architecture-checks.sh`, `run-journeys.sh`, `qa-coverage-check.php`). Those are required.
What is not allowed is a one-off check script written for a single bug: that check goes
into the wp-plugin-qa MCP or a `checks.*` row (`references/live-guard-gate.md`).

Two scripts cited above have **no template** and exist only in Eventonomy. Copy and adapt
them from `eventonomy/bin/` when the plugin has the same shape; otherwise the journey or
`parity` check covers the step:
- `bin/email-coverage-check.sh`: every notification key the plugin fires maps to a dedicated email template or a contextual-content case, never the generic fallback body.
- `bin/field-parity-check.sh`: every field the REST write path accepts has an input in the editor (the 3-entry-points rule for one resource).

## Gates

| Gate | Trigger | Runs | Attention needed |
|---|---|---|---|
| G1 | pre-commit | 0-boot(lint/build) + 5a/5b | none (automatic) |
| G2 | pre-push hook (`composer ci:no-journeys`) | Tier 4 + 5 (all static; no journeys, no browser) | none (automatic) |
| **G3** | **before ANY card → Ready for Testing** | **Tiers 0–4 (browser included) for touched surfaces; full run per release cycle** | **the primary human/agent gate** |
| G4 | /wp-plugin-release | everything incl. Tier 6 | release owner |

**RFT rule:** no card moves to Ready for Testing unless `wppqa_run_checks` is green
on the branch and Tier 1+2 passed in a real browser for the surfaces it touched
(gate contract: `references/live-guard-gate.md`). "Static green" is never a reason to
move a card.

**Verifying a card already IN Ready for Testing is a different job** — this
pipeline asks "is the plugin healthy?", QA asks "is this specific claim true,
and did fixing it break something else?" That protocol is
[`wp-card-qa`](../../wp-card-qa/references/rft-verification.md) (regular, per-card QA — its own skill): five questions per card, a
comparable verdict format, and the owner-vs-end-user judgement call.

**Regression rule:** every QA bounce = a missing check. The fix commit MUST add
the journey step/assertion that would have caught it. A recurring bug is a
process failure.

## Per-plugin data files (the only thing a plugin owns)

Created by `/wp-plugin-onboard --init` from the templates and kept current by its `--refresh` freshness report (`~/.claude/skills/wp-plugin-onboard/references/qa-data-set.md`); `qa-config.json` and the runbook come from `/wp-plugin-release-qa`.

```
docs/qa/qa-config.json     # site URL, themes, roles, key pages, block list  → scaffolded by /wp-plugin-release-qa
audit/journeys/**/*.md     # runnable walkthroughs (customer/member/admin/security)
audit/manifest.json        # inventory (generated by /wp-plugin-onboard)
audit/ROLE_MATRIX.md       # expected allow/deny per role
plan/INVARIANTS.yaml       # architecture gates
```

`/wp-plugin-onboard`'s bootstrap chain scaffolds these for every plugin it
touches — rollout to the portfolio happens as we work plugins, no big-bang.
The pipeline itself is never copied into a repo.

## Verdict

Every G3/G4 run writes `audit/READINESS.md`: one line per pipeline step —
PASS / FAIL / N-A(reason) / SKIPPED(reason, counts as FAIL). The Basecamp RFT
comment links this verdict. `wppqa_readiness` / `wppqa_certify` provide the
machine-readable equivalent; `wppqa_readiness_portfolio` ranks every plugin
against the same bar (run it when planning which plugin to bring up next).
