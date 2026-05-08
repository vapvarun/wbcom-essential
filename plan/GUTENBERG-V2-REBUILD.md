# WBcom Essential — Gutenberg Blocks v2 Rebuild Plan

**Branch:** `4.5.0` (from 4.3.1)
**Date:** 2026-04-04
**Quality Standard:** `plan/audit/QUALITY-STANDARD.md`
**Competitive Audit:** `plan/audit/COMPETITIVE-SUMMARY.md`
**Full Audit Reports:** `plan/audit/` (8 individual plugin audits + index)

---

## Why Rebuild

4.3.1 has 51 blocks. **Zero** meet the quality standard derived from auditing Kadence (63+15), Stackable (46+2), Spectra (35+9), Otter (47+17).

| Gap | 51 Existing Blocks | Standard Requires |
|-----|-------------------|-------------------|
| Responsive attributes | 10 partial, 41 zero | ALL blocks, 3 breakpoints |
| Unique ID scoping | 0 / 51 | Every block |
| Device visibility | 0 / 51 | Every block |
| Design tokens (--wbe-*) | 0 / 51 | Every block |
| Per-side spacing objects | 0 / 51 | Every block |
| Per-corner border radius | 0 / 51 | Every block |
| Box shadow (consistent) | 0 / 51 | Every block |
| Shared editor components | None exist | Required foundation |

Patching 51 inconsistent blocks is slower than rebuilding 30 clean ones from shared infrastructure.

---

## Architecture

```
plugins/gutenberg/
├── src/
│   ├── shared/                          ← BUILD FIRST — all blocks inherit
│   │   ├── design-tokens.css            ← --wbe-* CSS variables (spacing, colors, radius, shadow)
│   │   ├── base.css                     ← Block reset + shared styles + responsive visibility
│   │   ├── components/
│   │   │   ├── ResponsiveControl.js     ← Desktop/Tablet/Mobile switcher
│   │   │   ├── SpacingControl.js        ← Per-side padding/margin with linked toggle
│   │   │   ├── TypographyControl.js     ← Font family/size/weight/line-height (responsive)
│   │   │   ├── BoxShadowControl.js      ← Shadow editor (blur/spread/offset/color)
│   │   │   ├── BorderRadiusControl.js   ← Per-corner radius control
│   │   │   ├── ColorHoverControl.js     ← Color picker with hover state tab
│   │   │   ├── DeviceVisibility.js      ← Hide on desktop/tablet/mobile toggles
│   │   │   └── index.js                 ← Re-export all
│   │   ├── hooks/
│   │   │   ├── useUniqueId.js           ← Auto-generate unique ID on insert
│   │   │   └── useResponsiveValue.js    ← Get value for current preview device
│   │   └── utils/
│   │       ├── attributes.js            ← Standard attribute schemas (spacing, typography, shadow, border)
│   │       └── css.js                   ← Generate inline CSS from attributes (responsive media queries)
│   │
│   └── blocks/                          ← 30 blocks, each follows identical pattern
│       ├── hero/
│       │   ├── block.json              ← Uses standard attribute schemas
│       │   ├── index.js
│       │   ├── edit.js                 ← Uses shared components
│       │   ├── save.js
│       │   ├── style.scss              ← Uses design tokens
│       │   ├── editor.scss
│       │   └── view.js                 ← (only if interactive)
│       ├── ...29 more blocks
│
├── includes/
│   ├── WBE_CSS.php                      ← PHP CSS utility (per-instance CSS generation)
│   ├── WBE_Schema.php                   ← JSON-LD schema output (FAQ, HowTo)
│   └── WBE_Fonts.php                    ← Google Fonts enqueue (local option)
│
├── blocks/                              ← PHP registration (one file per block)
│   ├── accordion.php
│   ├── members-grid.php                 ← BP conditional: if (!function_exists('buddypress')) return;
│   └── ...
│
├── patterns/                            ← Keep existing 13 patterns, update to use new blocks
├── build/                               ← Compiled output
├── BlockRegistrar.php
├── gutenberg.php
└── package.json
```

---

## Phase 0: Shared Infrastructure (build once)

### 0A. Design Tokens (`src/shared/design-tokens.css`)
CSS variables for spacing, colors, radius, shadows, typography — used by every block.

### 0B. Shared Editor Components (`src/shared/components/`)
React components every block uses in InspectorControls:
- `ResponsiveControl` — Desktop/Tablet/Mobile tab switcher wrapping any control
- `SpacingControl` — 4-side padding/margin with linked/unlinked toggle
- `TypographyControl` — Font family, size (responsive), weight, line-height, letter-spacing, transform
- `BoxShadowControl` — Enable toggle + horizontal/vertical/blur/spread/color
- `BorderRadiusControl` — 4-corner radius with linked toggle
- `ColorHoverControl` — Color picker with Normal/Hover tabs
- `DeviceVisibility` — 3 toggles: hideOnDesktop, hideOnTablet, hideOnMobile

### 0C. Standard Attribute Schemas (`src/shared/utils/attributes.js`)
Reusable attribute definitions every block imports:
```js
export const spacingAttributes = {
  padding: { type: 'object', default: { top: 24, right: 24, bottom: 24, left: 24 } },
  paddingTablet: { type: 'object' },
  paddingMobile: { type: 'object' },
  paddingUnit: { type: 'string', default: 'px' },
  margin: { type: 'object', default: { top: 0, right: 0, bottom: 0, left: 0 } },
  marginTablet: { type: 'object' },
  marginMobile: { type: 'object' },
  marginUnit: { type: 'string', default: 'px' },
};

export const shadowAttributes = { ... };
export const borderAttributes = { ... };
export const typographyAttributes = { ... };
export const visibilityAttributes = { ... };
export const uniqueIdAttribute = { ... };
```

### 0D. CSS Generation Utility (`src/shared/utils/css.js`)
Frontend function that reads block attributes and outputs scoped CSS with media queries:
```js
export function generateBlockCSS(uniqueId, attributes) {
  // Returns string: .wbe-block-{uniqueId} { ... } @media (max-width: 1024px) { ... } @media (max-width: 767px) { ... }
}
```

### 0E. PHP Infrastructure
- `WBE_CSS.php` — Server-side CSS generation for dynamic blocks (BP/WooCommerce)
- `WBE_Schema.php` — Collects FAQ/HowTo schema from rendered blocks, outputs single JSON-LD in footer
- `WBE_Fonts.php` — Enqueues Google Fonts used by blocks on the page

---

## Phase 1: Core Marketing Blocks (12)

All static save. Uses shared infrastructure.

| # | Block | Elementor Source | Key Features |
|---|-------|-----------------|-------------|
| 1 | `hero` | (new) | Gradient bg, heading, subheading, 2 CTA buttons, bg image + overlay |
| 2 | `cta` | (new) | Stacked/inline layout, heading, text, single CTA button |
| 3 | `pricing-table` | PricingTable | 1-4 plan columns, features list, featured badge, per-plan accent |
| 4 | `testimonial-carousel` | Testimonial + TestimonialCarousel | Carousel with quotes, avatar, name, role. Dots/arrows/autoplay |
| 5 | `faq-accordion` | Accordion | Q&A repeater, single/multi open, icon style, **JSON-LD FAQPage schema** |
| 6 | `feature-grid` | (new) | Icon/emoji + title + desc cards, 1-4 cols, 3 card styles |
| 7 | `countdown-timer` | Countdown | Target date, live countdown, expire message, dark/light theme |
| 8 | `stats-counter` | ProgressBar | Animated count-up on scroll, prefix/suffix, 1-6 cols |
| 9 | `tabs` | Tabs | Click-to-switch, underline/boxed style, ARIA tablist |
| 10 | `flip-box` | FlipBox | Front/back faces, 3D flip on hover, icon/image/text |
| 11 | `timeline` | Timeline + PostTimeline | Vertical timeline, alternating sides, icon dots, responsive stack |
| 12 | `post-carousel` | PostCarousel + PostsCarousel + PostSlider | WP_Query, carousel/grid/slider modes, category filter, pagination |

---

## Phase 2: BuddyPress Blocks (6)

All dynamic render (render.php). Conditional on `function_exists('buddypress')`.

| # | Block | Elementor Source | Render |
|---|-------|-----------------|--------|
| 13 | `members-grid` | MembersGrid + MembersLists | Server: BP_User_Query, avatar, name, last_active, friend btn |
| 14 | `members-carousel` | MemberCarousel | Server: same data, carousel viewScript |
| 15 | `groups-grid` | GroupGrid + GroupsLists | Server: BP_Groups_Group::get(), avatar, member count, join btn |
| 16 | `group-carousel` | GroupCarousel | Server: same data, carousel viewScript |
| 17 | `activity-feed` | (new) | Server: bp_has_activities() loop, dynamic stream |
| 18 | `profile-completion` | ProfileCompletion | Server: xprofile fields, progress bar + checklist |

---

## Phase 3: WooCommerce + EDD Blocks (10)

Dynamic render. Conditional on WooCommerce/EDD active.
Full EDD audit: `plan/audit/edd-existing-blocks.md`

| # | Block | Source | Notes |
|---|-------|--------|-------|
| 19 | `product-grid` | Existing WC block (24 attrs) | Rebuild with standard |
| 20 | `product-carousel` | New | Same WC query, carousel viewScript |
| 21 | `customer-reviews` | CustomerReview + WcTestimonial | WC/EDD reviews, carousel |
| 22 | `promo-banner` | AddBanner | Category/promo image banner |
| 23 | `edd-account-dashboard` | Existing (REST API, 6 tabs, AJAX) | **Migrate** — preserve ALL functionality |
| 24 | `edd-checkout-enhanced` | Existing (progress bar, badges, reviews, recs) | **Migrate** — preserve ALL functionality |
| 25 | `edd-order-success` | Existing (success header, receipt, next steps) | **Migrate** — preserve ALL functionality |
| 26 | `edd-product-catalog` | Existing (AJAX product grid + filters) | **Migrate** — preserve ALL functionality |
| 27 | `edd-product-filter` | Existing (sticky filter bar) | **Migrate** — preserve ALL functionality |
| 28 | `category-grid` | Existing (16 attrs, WP categories) | **Migrate** — preserve ALL functionality |

---

## Phase 4: Nice-to-Have (5)

| # | Block | Priority |
|---|-------|----------|
| 29 | `login-form` | Medium |
| 30 | `progress-bar` | Medium |
| 31 | `text-rotator` | Medium |
| 32 | `portfolio-grid` | Medium |
| 33 | `posts-ticker` | Low |

---

## Blocks to DELETE (not rebuild)

These 21 blocks from 4.3.1 are either covered by core WP, theme-specific, or merged into other blocks:

| Block | Reason |
|-------|--------|
| `heading` | Core Heading block is sufficient |
| `branding` | Theme handles site branding |
| `site-logo` | Core Site Logo block |
| `shape` | Elementor-specific SVG divider |
| `slider` | Covered by post-carousel + core |
| `smart-menu` | Theme navigation |
| `divider` | Core Separator block |
| `social-icons` | Core Social Icons block |
| `star-rating` | Too niche, rarely used standalone |
| `icon-box` | Merged into feature-grid |
| `header-bar` | Theme header component |
| `mini-cart` | WooCommerce Mini Cart block |
| `dashboard-intro` | Too niche (BP admin only) |
| `forums` | Low usage, bbPress-specific |
| `forums-activity` | Low usage |
| `groups-lists` | Merged into groups-grid |
| `members-lists` | Merged into members-grid |
| `dropdown-button` | Low usage |
| `posts-revolution` | Merged into post-carousel |
| `post-slider` | Merged into post-carousel |
| `posts-carousel` | Merged into post-carousel |

---

## Block Patterns (keep + update)

Existing 13 patterns stay. Update to reference new block names after rebuild.

---

## Execution Order

```
Phase 0: Shared Infrastructure          ← ~3 hrs (most critical)
  0A. Design tokens CSS
  0B. 7 shared editor components
  0C. Standard attribute schemas
  0D. CSS generation utility
  0E. PHP classes (WBE_CSS, WBE_Schema, WBE_Fonts)

Phase 1: Core Marketing (12 blocks)     ← ~6 hrs
  Delete old blocks → Create from template using shared infrastructure
  Each block: block.json + edit.js + save.js + style.scss + editor.scss [+ view.js]

Phase 2: BuddyPress (6 blocks)          ← ~4 hrs
  All dynamic render.php + server-side queries

Phase 3: WooCommerce + EDD (10 blocks)  ← ~6 hrs
  6 existing blocks = migrate to new standard (preserve ALL functionality)
  4 new blocks = new dynamic render

Phase 4: Nice-to-Have (5 blocks)        ← ~3 hrs

Final: Build + Test + Patterns           ← ~2 hrs
  npm run build
  Test on 5 themes (TT5, Astra, Kadence, GeneratePress, BuddyX)
  Update patterns
  Version bump
```

---

## Quality Gate (every block must pass)

```
[ ] apiVersion: 3
[ ] Responsive: 3-breakpoint padding/margin/font-size
[ ] Per-side spacing (top/right/bottom/left objects)
[ ] Device visibility (hideOnDesktop/Tablet/Mobile)
[ ] Hover states on all interactive elements
[ ] Box shadow control
[ ] Per-corner border radius
[ ] Unique ID per instance (.wbe-block-{uniqueId})
[ ] BEM class naming (.wbe-{block}__{element})
[ ] Design tokens (--wbe-* CSS variables)
[ ] ARIA attributes on interactive elements
[ ] Keyboard navigable
[ ] prefers-reduced-motion respected
[ ] No jQuery dependency
[ ] Mobile-first responsive CSS
[ ] Works with wide/full alignment
[ ] FAQ blocks: JSON-LD schema output
[ ] Editor: meaningful placeholder state
[ ] InspectorControls panel order: Content → Layout → Style → Advanced
```

---

## File Counts

| What | Count |
|------|-------|
| Blocks to create/rebuild | 33 |
| Blocks to delete (not rebuild) | 18 |
| Shared components | 7 |
| Shared utils | 3 |
| PHP classes | 3 |
| Block patterns | 13 (update) |
| Total JS files | ~165 (33 blocks × 5 files avg) |
| Blocks with REST API | 2 (edd-account-dashboard, activity-feed) |
| Blocks requiring Swiper.js | 4 (members-carousel, group-carousel, product-carousel, testimonial-carousel) |
