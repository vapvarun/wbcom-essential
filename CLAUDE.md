# Wbcom Essential - Claude Code Instructions

## Project Overview

**Plugin**: Wbcom Essential
**Version**: 4.5.0
**Purpose**: Companion plugin for BuddyX theme providing Elementor widgets and Gutenberg blocks for BuddyPress, WooCommerce, and general WordPress functionality.
**Branch**: `4.5.0` — V2 block rebuild (competitive audit-driven quality standard)

## Architecture Documentation

Full architecture documentation available in `docs/architecture/`:
- [PLUGIN_ARCHITECTURE.md](docs/architecture/PLUGIN_ARCHITECTURE.md) - Complete reference
- [FINAL_REPORT.md](docs/architecture/FINAL_REPORT.md) - Validation report
- [manifest/](docs/architecture/manifest/) - Index files (classes, blocks, hooks, etc.)

## Recent Changes

| Date | Description |
|------|-------------|
| 2026-04-18 | Drop `product-filter` block (redundant with `product-catalog`'s built-in filters); a11y wrap-up; EDD Invoices button fix on purchases tab; REST permission hardening; uninstall.php + lifecycle hooks; npm transitive CVE overrides |
| 2026-04-08 | UX audit: 14 fixes — XSS, flip-box touch/keyboard, visibility CSS consolidation, focus-visible, EDD empty states + mobile nav + i18n, BP notices, a11y |
| 2026-04-07 | Bug fix: 12 Basecamp cards resolved — block styles, Swiper handle, EDD profile, product filter, BoxShadowControl |
| 2026-04-05 | v4.5.0: V2 block rebuild — 32 blocks rebuilt from shared infrastructure, 21 legacy blocks removed, competitive audit quality standard |
| 2026-03-05 | v4.3.0: Category Grid block, magazine patterns, single post templates, Posts Revolution category mapping UX |
| 2026-02-03 | v4.2.1: Fix PHP 8+ TypeError in Elementor AJAX handler, harden type safety across license and template APIs |
| 2026-01-20 | Fix admin page: block count 38→45, fix URLs (developer.wbcomdesigns.com→correct domains) |
| 2026-01-14 | Fix hover secondary button UI with cta box block |
| 2026-01-14 | Fix block failed during npm run build:blocks |
| 2026-01-14 | Manage header bar friend list action button UI |
| 2026-01-14 | Fix icon is not showing after being changed in backend |
| 2026-01-13 | fix(header-bar): Add AJAX handler for Mark as Read notifications |
| 2026-01-13 | Fix forum box border is not working |
| 2026-01-13 | Manage header bar cart and search UI |
| 2026-01-13 | fix(header-bar): Dark mode icon visibility improvements |
| 2026-01-13 | fix(post-carousel): enable adaptive height for Slick carousel |
| 2026-01-13 | Manage member carousel Slides to Scroll |

## Project Management

### Basecamp Card Table Columns

| Column | URL | Purpose |
|--------|-----|---------|
| **Ready for Development** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110488 | Tasks ready to be picked up |
| **Bugs** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110477 | Bug reports and issues |
| **Ready for Testing** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110490 | Completed work awaiting QA |

---

## Directory Structure

```
wbcom-essential/
├── admin/                      # Admin panel functionality
├── build/                      # Compiled block assets (generated)
│   └── blocks/                 # Built block JS/CSS (32 V2 blocks)
├── includes/                   # Core plugin functionality
│   ├── shared-admin/           # Shared admin components
│   └── wbcom-essential-function.php  # Shared helper functions
├── plugins/
│   ├── elementor/              # Elementor integration
│   │   ├── assets/             # Elementor CSS/JS
│   │   ├── widgets/            # Widget classes
│   │   ├── Plugins.php         # Widget registration
│   │   └── wbcom-essential-elementor.php
│   └── gutenberg/              # Gutenberg V2 blocks
│       ├── src/
│       │   ├── shared/         # Shared infrastructure (components, hooks, utils, tokens)
│       │   └── blocks/         # 32 V2 block source files
│       ├── includes/           # PHP infrastructure (WBE_CSS, WBE_Schema, WBE_Fonts)
│       ├── patterns/           # 13 block patterns
│       ├── BlockRegistrar.php  # Auto-register from build/blocks/
│       ├── gutenberg.php       # Loader, categories, REST routes
│       └── README.md
├── plan/                       # V2 rebuild plan + competitive audit
│   ├── GUTENBERG-V2-REBUILD.md
│   └── audit/                  # Kadence, Stackable, Spectra, Otter audits
├── scripts/                    # Build scripts
│   ├── build-blocks.js         # Production build (src/blocks → build/blocks)
│   └── dev-blocks.js           # Development watch
├── package.json                # NPM configuration
└── wbcom-essential.php         # Main plugin file
```

---

## V2 Block Inventory (31 blocks)

**Last Updated**: April 2026
**Quality Standard**: `plan/audit/QUALITY-STANDARD.md` (derived from Kadence, Stackable, Spectra, Otter audit)
**Shared Infrastructure**: `plugins/gutenberg/src/shared/` (7 components, 2 hooks, 3 utils)

### Summary

| Category | Block Count |
|----------|------------|
| Essential - Marketing | 7 |
| Essential - Content | 5 |
| Essential - Blog | 3 |
| Essential - Design | 6 |
| Essential - BuddyPress | 5 |
| Essential - WooCommerce | 4 |
| Essential - EDD (conditional) | 1 |
| **Total** | **32** |

### V2 Blocks (32 total)

| # | Block Slug | Category | Type |
|---|-----------|----------|------|
| 1 | `hero` | Marketing | Static |
| 2 | `cta` | Marketing | Static |
| 3 | `pricing-table` | Marketing | Static |
| 4 | `testimonial-carousel` | Marketing | Static + viewScript |
| 5 | `feature-grid` | Marketing | Static |
| 6 | `promo-banner` | Marketing | Static |
| 7 | `countdown-timer` | Marketing | Static + viewScript |
| 8 | `faq-accordion` | Content | Static + viewScript + JSON-LD |
| 9 | `tabs` | Content | Static + viewScript |
| 10 | `login-form` | Content | Dynamic (render.php) |
| 11 | `portfolio-grid` | Content | Dynamic |
| 12 | `timeline` | Content | Dynamic |
| 13 | `post-carousel` | Blog | Dynamic + viewScript |
| 14 | `posts-ticker` | Blog | Dynamic + viewScript |
| 15 | `category-grid` | Blog | Dynamic |
| 16 | `flip-box` | Design | Static |
| 17 | `progress-bar` | Design | Static + viewScript |
| 18 | `text-rotator` | Design | Static + viewScript |
| 19 | `stats-counter` | Design | Static + viewScript |
| 20 | `edd-account-dashboard` | Design | Dynamic (REST API) |
| 21 | `edd-checkout-enhanced` | Design | Dynamic |
| 22 | `activity-feed` | BuddyPress | Dynamic (BP REST API) |
| 23 | `members-grid` | BuddyPress | Dynamic |
| 24 | `members-carousel` | BuddyPress | Dynamic + viewScript |
| 25 | `groups-grid` | BuddyPress | Dynamic |
| 26 | `group-carousel` | BuddyPress | Dynamic + viewScript |
| 27 | `product-grid` | WooCommerce | Dynamic |
| 28 | `product-carousel` | WooCommerce | Dynamic + viewScript |
| 29 | `customer-reviews` | WooCommerce | Dynamic |
| 30 | `edd-order-success` | WooCommerce | Dynamic |
| 31 | `product-catalog` | EDD (conditional) | Dynamic + viewScript |

### Blocks Removed in V2 (21 merged/replaced)

`heading`, `branding`, `site-logo`, `shape`, `slider`, `smart-menu`, `divider`, `social-icons`, `star-rating`, `icon-box`, `header-bar`, `mini-cart`, `dashboard-intro`, `forums`, `forums-activity`, `groups-lists`, `members-lists`, `dropdown-button`, `posts-revolution`, `post-slider`, `posts-carousel`, `counter`, `cta-box`, `accordion`, `advanced-tabs`, `countdown`, `post-timeline`, `testimonial`, `team-carousel`, `profile-completion`

---

## Block Categories

| Category Slug | Display Name | Block Count |
|--------------|--------------|-------------|
| `essential-marketing` | Essential - Marketing | 7 |
| `essential-content` | Essential - Content | 5 |
| `essential-blog` | Essential - Blog | 3 |
| `essential-design` | Essential - Design | 6 |
| `essential-buddypress` | Essential - BuddyPress | 5 |
| `essential-woocommerce` | Essential - WooCommerce | 4 |
| `wbcom-essential` | WBcom Essential | (fallback) |

---

## Technical Features (V2)

### Shared Infrastructure

All 31 blocks inherit from shared components in `plugins/gutenberg/src/shared/`:

| Component | Purpose |
|-----------|---------|
| `ResponsiveControl.js` | Desktop/Tablet/Mobile switcher |
| `SpacingControl.js` | Per-side padding/margin with linked toggle |
| `TypographyControl.js` | Font family/size/weight/line-height (responsive) |
| `BoxShadowControl.js` | Shadow editor |
| `BorderRadiusControl.js` | Per-corner radius control |
| `ColorHoverControl.js` | Color picker with Normal/Hover tabs |
| `DeviceVisibility.js` | Hide on desktop/tablet/mobile toggles |
| `useUniqueId.js` | Auto-generate unique ID on insert |
| `useResponsiveValue.js` | Get value for current preview device |
| `attributes.js` | Standard attribute schemas |
| `css.js` | Generate scoped CSS from attributes |
| `design-tokens.css` | `--wbe-*` CSS custom properties |
| `base.css` | Block reset + responsive visibility + prefers-reduced-motion |

PHP classes: `WBE_CSS.php` (per-instance CSS), `WBE_Schema.php` (JSON-LD), `WBE_Fonts.php` (Google Fonts)

### Block File Structure (V2)

```
src/blocks/{block-name}/
├── block.json           # Block metadata (apiVersion 3)
├── index.js             # Entry point
├── edit.js              # Editor component (uses shared components)
├── save.js              # Save component
├── render.php           # Server-side render (dynamic blocks)
├── view.js              # Frontend JS (interactive blocks)
├── style.css            # Frontend styles (design tokens)
└── editor.css           # Editor-only styles
```

### Build System

```bash
npm run build:blocks     # Build all 31 blocks (src/blocks → build/blocks)
npm run dev:blocks       # Development with watch
npm run clean:blocks     # Remove build/blocks
```

### Quality Standard (every block)

- apiVersion 3, responsive 3-breakpoint, per-side spacing, device visibility
- Box shadow, per-corner radius, unique ID scoping (.wbe-block-{uniqueId})
- BEM naming (.wbe-{block}__{element}), design tokens (--wbe-*)
- ARIA attributes, keyboard navigable, prefers-reduced-motion
- No jQuery, mobile-first CSS, tested on 5 themes

---

## Shared Dependencies

### JavaScript Libraries

| Library | Purpose | Location |
|---------|---------|----------|
| Swiper | Carousels/Sliders | Shared with Elementor |
| @wordpress/scripts | Build tooling | `node_modules` |
| @wordpress/block-editor | Block controls | WordPress Core |
| @wordpress/components | UI components | WordPress Core |

### Available Theme CSS Variables

Reference: `/plugins/gutenberg/assets/css/theme-colors.css`

| Variable | Purpose | Fallback |
|----------|---------|----------|
| `--wbcom-color-primary` | Primary accent | `#0073aa` |
| `--wbcom-color-secondary` | Secondary accent | `#6c757d` |
| `--wbcom-color-base` | Background | `#fff` |
| `--wbcom-color-base-2` | Secondary bg | `#f8f9fa` |
| `--wbcom-color-contrast` | Primary text | `#212529` |
| `--wbcom-color-contrast-2` | Secondary text | `#495057` |
| `--wbcom-heading-color` | Headings | `inherit` |
| `--wbcom-text-color` | Body text | `inherit` |
| `--wbcom-link-color` | Links | Primary |
| `--wbcom-card-bg` | Card backgrounds | Base |
| `--wbcom-card-border` | Card borders | `#ddd` |

---

## Control Mapping: Elementor to Gutenberg

| Elementor Control | Gutenberg Equivalent |
|-------------------|---------------------|
| `TEXT` | `TextControl` |
| `TEXTAREA` | `TextareaControl` |
| `NUMBER` | `NumberControl` / `RangeControl` |
| `SLIDER` | `RangeControl` |
| `SELECT` | `SelectControl` |
| `SELECT2` (multi) | `FormTokenField` |
| `SWITCHER` | `ToggleControl` |
| `CHOOSE` | `ButtonGroup` / `ToggleGroupControl` |
| `COLOR` | `ColorPalette` / `ColorPicker` |
| `ICONS` | Custom icon picker |
| `MEDIA` | `MediaUpload` / `MediaUploadCheck` |
| `DIMENSIONS` | `BoxControl` |
| `TYPOGRAPHY` | `FontSizePicker` + `FontFamilyControl` |
| `BORDER` | `BorderControl` |
| `BOX_SHADOW` | Custom control |
| `BACKGROUND` | `ColorGradientControl` |
| `REPEATER` | `InnerBlocks` / Custom repeater |

---

## Code Quality Standards

### PHP Standards
- Follow WordPress Coding Standards (WPCS)
- Run `mcp__wpcs__wpcs_pre_commit` before commits
- Escape all output
- Sanitize all input
- Use nonces for forms

### JavaScript Standards
- ES6+ syntax
- Use WordPress packages where available
- Follow WordPress JS coding standards
- No jQuery in new blocks (vanilla JS or React)

### CSS Standards
- Use SCSS
- BEM naming: `.block__element--modifier`
- Mobile-first responsive
- CSS custom properties for theming
- Prefix all classes with `wbcom-essential-`

---

## Remaining Gap

### NotificationArea Block

**Status**: Not implemented
**Priority**: Low
**Reason**: BuddyPress has native notification handling, and this widget has limited use cases.

If needed in the future, create:
- `blocks/notification-area/`
- Display WordPress/BuddyPress notifications in a dismissible panel

---

## Notes

- All 45 blocks have the "Use Theme Colors" toggle implemented
- Use `ServerSideRender` for dynamic content (BuddyPress, WooCommerce, posts)
- Test with BuddyX theme for full compatibility
- All strings must be translatable using `__()` or `_e()`
- WooCommerce-specific widgets (AddBanner, CustomerReview, ProductTab, WcTestimonial) are intentionally skipped as WooCommerce provides native block equivalents
