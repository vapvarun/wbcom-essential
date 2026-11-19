# Wbcom Essential: first-hour walk

> The owner's, editor's and member's first hour on a FRESH install.
> QA walks this independently at every cycle start and before every release gate,
> at 1440 and 390, light and dark, on Reign and on Twenty Twenty-Five.
> Standard: `~/.claude/skills/wp-card-qa/references/first-hour-walk.md`.
> Every escaped defect adds a step or a check line here, tagged `card:<id>`.

Last confirmed: DRAFT 2026-11-19, awaiting the owner.

## Site admin (minutes 0-60)

| # | Step | Where (route / screen) | Must be true | Emails |
|---|---|---|---|---|
| A1 | Install and activate (alone, then with Elementor, BuddyPress, WooCommerce, EDD) | Plugins | No notice beyond the Elementor version note when Elementor is old; no fatal when a companion plugin is missing | |
| A2 | First look at the plugin screen | Wbcom Designs > Essential | Lists blocks and widgets; links work | |
| A3 | Insert a Hero, Feature Grid, Pricing Table and CTA on a new page | Block editor | Look finished on defaults; follow the theme; 0 invalid blocks after reload | |
| A4 | Same sections with Elementor widgets | Elementor | Render on defaults with no placeholder copy for visitors (`card:10526933067`) | |
| A5 | Visitor view at 390 and 1440, light and dark | front end | No overflow, text readable, the theme's header and forms keep their spacing (`card:10526057369`) | |
| A6 | Duplicate and edit a block | Block editor | The copy changes alone (`card:10526057464`) | |
| A7 | Community page: Members Grid, Groups Grid, Activity Feed | Block editor, front end | Real members and groups show; hidden groups never listed | |
| A8 | Shop or downloads page: Product Grid or EDD Product Catalog | Block editor, front end | Lists what the shop lists | |
| A9 | Deactivate and reactivate | Plugins | Pages keep their content; blocks still valid | |

## Editor or author (minutes 0-60)

| # | Step | Where | Must be true | Emails |
|---|---|---|---|---|
| C1 | Adds a Posts Ticker and an FAQ to a post | Block editor | Saves; FAQ schema once per page | |
| C2 | Cannot reach admin-only screens or editor-only REST | Wbcom Designs menu, `/wbcom-essential/v1/xprofile-groups` as subscriber | Refused | |

## Member (minutes 0-60)

| # | Step | Where | Must be true | Emails |
|---|---|---|---|---|
| M1 | Logs in through the Login Form block | page with the block | Signs in; wrong password and unknown user give the same message | |
| M2 | Opens the community page | front end | Header Bar links go to their own profile; no deprecation in debug.log (`card:10526057418`) | |
| M3 | Opens the EDD account page | Account Dashboard block | Own purchases, licences and subscriptions only | Purchase receipt from EDD |
| M4 | Reads a ticker on a phone | front end at 390 | Every headline readable, with or without featured images (`card:10526932897`) | |
| M5 | Cannot read another buyer's order | Order Success with another key, REST `edd-account/purchases` as member2 | Refused | |

## Break it (every step above that sends a request)

| Step | Request (route) | Dropped | 502 page | Slow | Double | Refusal |
|---|---|---|---|---|---|---|
| M1 | `admin-ajax.php` action `wbcom_ajax_login` | | | | | |
| M3 | `GET /wbcom/v1/edd-account/(?P<tab>)` | | | | | |
| M3 | `POST /wbcom/v1/edd-account/claim-free` | | | | | |

## Decided (not bugs)

| Behaviour | Decision | Who / when |
|---|---|---|
| Owner-picked colours are rendered as saved | Owner choice wins over contrast | owner, 4.7.2 |

## Escapes (every miss adds a line)

| Card | Step | Check that would have caught it |
|---|---|---|
| 10526933067 | A4 | `defaults.shape-icon` (runbook E.defaults) |
| 10526057369 | A5 | `ticker.page-spacing` (C.ticker) |
| 10526057464 | A6 | `blocks.duplicate`, `blocks.no-id` (C.blocks-insert) |
| 10526057418 | M2 | `bp.header-bar` (C.bp-directories) |
| 10526932897 | M4 | `ticker.phone-no-image` (C.ticker) |
