# Wbcom Essential - product profile

Every product is a tool a site owner runs their own site with: meet what owners expect and beat the best competitor at it. Used by the product self-audit (`~/.claude/skills/wp-card-qa/references/product-audit.md`). Built from evidence, confirmed once by the owner, then grown by every audit and escape.

Last confirmed: 2026-11-20 by the owner (Varun), as drafted from code, docs and competitor pages on 2026-11-19.

## What it is

- Type: plugin
- Category: block and Elementor widget library for community, shop and marketing pages
- Free / Pro split: free plugin, no Pro. It is the companion of the Reign, BuddyX and BuddyX Pro themes and is installed by their demos.
- Roles: owner/admin (builds pages); editor/author (uses blocks in posts); customers: member (BuddyPress), buyer (EDD, WooCommerce); edge personas: logged-out visitor, member of a private or hidden group, buyer with a pending or failed order

## Competitors

| WordPress peers (plugin or theme) | Source URL, date read |
|---|---|
| Kadence Blocks: row layout, accordion, tabs, tables, testimonials, galleries, query loop, modals, forms, countdown, Lottie; free | liquidweb.com/software/kadence/blocks/, 2026-11-19 |
| Essential Addons for Elementor: 120+ elements claimed (content, dynamic, form styler, creative, marketing, WooCommerce) | essential-addons.com, 2026-11-19 |
| Elementor Pro: 57 widgets on Essential (Loop Grid, Posts, Form, Slides, Flip Box, CTA, Theme Builder), 85 with WooCommerce widgets; from $60 a year | elementor.com/pricing/, 2026-11-19 |
| GenerateBlocks: six core blocks (Container, Headline, Button, Image, Grid, Query Loop), clean HTML | generateblocks.com, 2026-11-19 |
| Spectra: features not read (pages returned only a title) | wpspectra.com, 2026-11-19 |

| SaaS a switcher leaves | Source URL, date read |
|---|---|
| None directly: owners who leave go to a hosted community (Circle, Mighty Networks), which takes the theme too | see Reign's profile |

## Owner expectations

| # | Expectation | Table stakes or differentiator | Best competitor at it (the bar) | Source | Owner control | Last verdict | Evidence |
|---|---|---|---|---|---|---|---|
| E1 | Hero, CTA, pricing table, FAQ and countdown sections that look finished on defaults | Table stakes | Elementor Pro, Kadence | elementor.com/pricing, Kadence blocks page | block and widget settings | | |
| E2 | Post and product grids and carousels that list what the site lists | Table stakes | Kadence query loop, Elementor Loop Grid | as above | query settings | | |
| E3 | Responsive spacing, typography and colour controls | Table stakes | GenerateBlocks | generateblocks.com | Desktop/Tablet/Mobile tabs | | |
| E4 | Clean, light front-end output; styles only where used | Table stakes | GenerateBlocks, Kadence | as above | automatic | | |
| E5 | Blocks follow the theme's colours, fonts and dark mode | Table stakes | Kadence (global palette) | Kadence blocks page | theme tokens; owner colour wins | | |
| E6 | A block never breaks other blocks or the page around it | Table stakes | n/a | escapes this cycle | automatic | | |
| E7 | Login form with spam and brute-force protection | Table stakes | Kadence forms, Elementor Form | as above | block settings, trusted proxies filter | | |
| E8 | WooCommerce widgets | Table stakes | Elementor Pro, Essential Addons | as above | widget settings | | |
| E9 | Works in both the block editor and Elementor from one plugin | Differentiator | none read does both | competitor pages | n/a | | |
| E10 | BuddyPress members, groups and activity blocks that respect privacy | Differentiator | none read | competitor pages | block settings | | |
| E11 | EDD account, checkout and order success blocks | Differentiator | none read | competitor pages | block settings | | |
| E12 | Keyboard and screen reader access (tabs, flip box, carousels, filters) | Table stakes | WCAG 2.1 AA | 4.7.3 changelog | none needed | | |
| E13 | Translated in the owner's language, in the editor too | Table stakes | n/a | readme | languages/ | | |
| E14 | An AI can compose pages from the blocks and widgets | Differentiator | none read | owner request 2026-11-19 | planned 4.7.4 | | |

## Integrations that answer gaps

| Gap | Answered by | Documented where |
|---|---|---|
| Header, footer, page layouts | Reign, BuddyX, BuddyX Pro themes | each theme's docs |
| Demo sites built from these blocks | Wbcom Demo Installer | Reign docs, set-up-your-site |

## Decided, not bugs

| Decision | Who, when | Source |
|---|---|---|
| Owner-picked colours render exactly as saved, even below AA; defaults must reach AA | owner, 4.7.2 | 4.7.2 and 4.7.3 changelogs |
| Saved column counts are a maximum; narrow containers drop columns | 4.7.3 | changelog |
| AI usage index and 8 more languages move to 4.7.4 | owner, 2026-11-19 | cards 10528071402, 10528071587 |
| The #667eea accent at 3.66:1 on 9 blocks, widgets that render nothing on defaults, the unstyled login form | owner decision pending | public-ff regression walk 2026-11-19 |

## Escape classes (from `escape-classes.md`)

| # | Applies? | If N/A, why |
|---|---|---|
| 1 one door only | yes (blocks pasted, imported, duplicated or created by CLI) | |
| 2 upgrade / version skew | yes (BuddyPress 12+ APIs, Elementor cached CSS, saved block markup) | |
| 3 secondary-reader leak | yes (editor preview vs front end) | |
| 4 module off-state | yes (BuddyPress, EDD, WooCommerce, Elementor absent) | |
| 5 theme / builder / SEO conflicts | yes (core risk: CSS leaking either way) | |
| 6 money / counts disagree | partly (EDD order and licence lists) | |
| 7 silent failure | yes (blocks that render nothing) | |
| 8 jobs / cache / scale | partly (Elementor CSS cache, product grid queries) | |
| 9 notifications | partly (Header Bar counts) | |
| 10 time zones | yes (EDD dates) | |
| 11 edge inputs | yes (long words, missing images, empty settings) | |
| 12 packaging / docs drift | yes (POT, built block files, zip excludes) | |
