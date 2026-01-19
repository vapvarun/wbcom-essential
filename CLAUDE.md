# Wbcom Essential - Claude Code Instructions

## Project Overview

**Plugin**: Wbcom Essential
**Version**: 4.2.0
**Purpose**: Companion plugin for BuddyX theme providing Elementor widgets and Gutenberg blocks for BuddyPress, WooCommerce, and general WordPress functionality.

## Architecture Documentation

Full architecture documentation available in `docs/architecture/`:
- [PLUGIN_ARCHITECTURE.md](docs/architecture/PLUGIN_ARCHITECTURE.md) - Complete reference
- [FINAL_REPORT.md](docs/architecture/FINAL_REPORT.md) - Validation report
- [manifest/](docs/architecture/manifest/) - Index files (classes, blocks, hooks, etc.)

## Recent Changes

| Date | Description |
|------|-------------|
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
│   └── blocks/                 # Built block JS/CSS (45 blocks)
├── includes/                   # Core plugin functionality
│   ├── shared-admin/           # Shared admin components
│   └── wbcom-essential-function.php  # Shared helper functions
├── plugins/
│   ├── elementor/              # Elementor integration
│   │   ├── assets/             # Elementor CSS/JS
│   │   ├── widgets/            # Widget classes
│   │   │   ├── General/        # General purpose widgets (27)
│   │   │   ├── Buddypress/     # BuddyPress widgets (11)
│   │   │   ├── WooCommerce/    # WooCommerce widgets (5)
│   │   │   └── querycontrol/   # Query control helpers
│   │   ├── Plugins.php         # Widget registration
│   │   └── wbcom-essential-elementor.php
│   └── gutenberg/              # Gutenberg blocks
│       ├── assets/css/         # Shared CSS (theme-colors, blocks-reset)
│       ├── blocks/             # Block source files (45 blocks)
│       ├── README.md           # Gutenberg documentation
│       └── wbcom-gutenberg.php # Block registration & REST routes
├── languages/                  # Translations
├── node_modules/               # NPM dependencies
├── scripts/                    # Build scripts
│   ├── build-blocks.js         # Production build
│   └── dev-blocks.js           # Development watch
├── package.json                # NPM configuration
└── wbcom-essential.php         # Main plugin file
```

---

## Widget to Block Mapping Status

**Last Updated**: January 2025

### Legend
- ✅ Block complete with full feature parity
- ⭐ Bonus block (no Elementor widget equivalent)
- ⏭️ Skipped (WooCommerce provides native blocks)
- ❌ Missing

### Summary

| Category | Elementor Widgets | Gutenberg Blocks | Coverage |
|----------|------------------|------------------|----------|
| General | 27 | 26 + 7 bonus | 96% |
| BuddyPress | 11 | 11 | 100% |
| WooCommerce | 5 | 3 (rest skipped) | N/A |
| **Total** | **43** | **45** | **98%** |

### General Widgets (27 total → 26 blocks + 1 gap)

| # | Widget | Block | Status |
|---|--------|-------|--------|
| 1 | Accordion | `accordion` | ✅ Complete |
| 2 | Branding | `branding` | ✅ Complete |
| 3 | Countdown | `countdown` | ✅ Complete |
| 4 | Dropdown Button | `dropdown-button` | ✅ Complete |
| 5 | Flip Box | `flip-box` | ✅ Complete |
| 6 | Heading | `heading` | ✅ Complete |
| 7 | Login Form | `login-form` | ✅ Complete |
| 8 | Notification Area | - | ❌ **Gap** |
| 9 | Portfolio Grid | `portfolio-grid` | ✅ Complete |
| 10 | Post Carousel | `post-carousel` | ✅ Complete |
| 11 | Posts Carousel | `posts-carousel` | ✅ Complete |
| 12 | Post Slider | `post-slider` | ✅ Complete |
| 13 | Posts Revolution | `posts-revolution` | ✅ Complete |
| 14 | Posts Ticker | `posts-ticker` | ✅ Complete |
| 15 | Post Timeline | `post-timeline` | ✅ Complete |
| 16 | Pricing Table | `pricing-table` | ✅ Complete |
| 17 | Progress Bar | `progress-bar` | ✅ Complete |
| 18 | Shape | `shape` | ✅ Complete |
| 19 | Site Logo | `site-logo` | ✅ Complete |
| 20 | Slider | `slider` | ✅ Complete |
| 21 | Smart Menu | `smart-menu` | ✅ Complete |
| 22 | Tabs | `advanced-tabs` | ✅ Complete |
| 23 | Team Carousel | `team-carousel` | ✅ Complete |
| 24 | Testimonial | `testimonial` | ✅ Complete |
| 25 | Testimonial Carousel | `testimonial-carousel` | ✅ Complete |
| 26 | Text Rotator | `text-rotator` | ✅ Complete |
| 27 | Timeline | `timeline` | ✅ Complete |

### BuddyPress Widgets (11 total → 11 blocks = 100%)

| # | Widget | Block | Status |
|---|--------|-------|--------|
| 1 | Dashboard Intro | `dashboard-intro` | ✅ Complete |
| 2 | Forums | `forums` | ✅ Complete |
| 3 | Forums Activity | `forums-activity` | ✅ Complete |
| 4 | Group Carousel | `group-carousel` | ✅ Complete |
| 5 | Groups Grid | `groups-grid` | ✅ Complete |
| 6 | Groups Lists | `groups-lists` | ✅ Complete |
| 7 | Header Bar | `header-bar` | ✅ Complete |
| 8 | Members Grid | `members-grid` | ✅ Complete |
| 9 | Members Lists | `members-lists` | ✅ Complete |
| 10 | Members Carousel | `members-carousel` | ✅ Complete |
| 11 | Profile Completion | `profile-completion` | ✅ Complete |

### WooCommerce Widgets (5 total → Mostly Skipped)

WooCommerce provides native Gutenberg blocks for products, reviews, and tabs. We only created blocks for functionality WooCommerce doesn't offer natively.

| # | Widget | Block | Status |
|---|--------|-------|--------|
| 1 | Add Banner | - | ⏭️ Skipped (use WC blocks) |
| 2 | Customer Review | - | ⏭️ Skipped (use WC Reviews block) |
| 3 | Product Tab | - | ⏭️ Skipped (use WC Product Details) |
| 4 | Universal Product | `product-grid` | ✅ Complete |
| 5 | WC Testimonial | - | ⏭️ Skipped (use testimonial block) |

### Bonus Blocks (7 blocks with no Elementor widget)

These blocks were created specifically for Gutenberg to enhance the block library:

| # | Block | Category | Purpose |
|---|-------|----------|---------|
| 1 | `counter` | Design | Animated number counter with prefix/suffix |
| 2 | `cta-box` | Marketing | Call-to-action box with button |
| 3 | `divider` | Design | Decorative divider with styles |
| 4 | `icon-box` | Design | Icon with title and description |
| 5 | `mini-cart` | WooCommerce | Mini shopping cart for headers |
| 6 | `social-icons` | Design | Social media icon links |
| 7 | `star-rating` | Content | Star rating display |

### All 45 Blocks (Complete List)

```
plugins/gutenberg/blocks/
├── accordion/              # Collapsible content sections
├── advanced-tabs/          # Tabbed content panels
├── branding/               # Site logo and branding
├── countdown/              # Countdown timer
├── counter/                # Animated number counter (bonus)
├── cta-box/                # Call-to-action box (bonus)
├── dashboard-intro/        # BuddyPress dashboard intro
├── divider/                # Decorative divider (bonus)
├── dropdown-button/        # Button with dropdown menu
├── flip-box/               # 3D flip card
├── forums/                 # bbPress forums list
├── forums-activity/        # bbPress activity feed
├── group-carousel/         # BuddyPress groups carousel
├── groups-grid/            # BuddyPress groups grid
├── groups-lists/           # BuddyPress groups list
├── header-bar/             # Header navigation bar
├── heading/                # Styled heading
├── icon-box/               # Icon with text (bonus)
├── login-form/             # User login form
├── members-carousel/       # BuddyPress members carousel
├── members-grid/           # BuddyPress members grid
├── members-lists/          # BuddyPress members list
├── mini-cart/              # WooCommerce mini cart (bonus)
├── portfolio-grid/         # Portfolio items grid
├── post-carousel/          # Single post carousel
├── post-slider/            # Full-width post slider
├── post-timeline/          # Posts in timeline layout
├── posts-carousel/         # Multiple posts carousel
├── posts-revolution/       # Posts revolution slider
├── posts-ticker/           # Scrolling posts ticker
├── pricing-table/          # Pricing comparison table
├── product-grid/           # WooCommerce products grid
├── profile-completion/     # BuddyPress profile progress
├── progress-bar/           # Animated progress bar
├── shape/                  # Decorative shapes
├── site-logo/              # Site logo block
├── slider/                 # Image/content slider
├── smart-menu/             # Mega menu navigation
├── social-icons/           # Social media icons (bonus)
├── star-rating/            # Star rating display (bonus)
├── team-carousel/          # Team members carousel
├── testimonial/            # Single testimonial
├── testimonial-carousel/   # Testimonials carousel
├── text-rotator/           # Animated text rotation
└── timeline/               # Vertical timeline
```

---

## Block Categories

All blocks are organized into 7 categories for easy discovery:

| Category Slug | Display Name | Block Count |
|--------------|--------------|-------------|
| `starter-header` | Starter Pack - Header | 4 |
| `starter-design` | Starter Pack - Design | 14 |
| `starter-content` | Starter Pack - Content | 8 |
| `starter-blog` | Starter Pack - Blog | 8 |
| `starter-marketing` | Starter Pack - Marketing | 4 |
| `starter-buddypress` | Starter Pack - BuddyPress | 11 |
| `starter-woocommerce` | Starter Pack - WooCommerce | 2 |

---

## Technical Features

### Use Theme Colors Pattern

All 45 blocks support the "Use Theme Colors" toggle:
- **Disabled (default)**: Custom colors via ColorPicker controls
- **Enabled**: Inherit colors from theme CSS custom properties

Implementation files:
- `plugins/gutenberg/assets/css/theme-colors.css` - CSS variable mappings
- `plugins/gutenberg/assets/css/blocks-reset.css` - Reset styles

### Block File Structure

Each block follows this standard structure:

```
blocks/{block-name}/
├── {block-name}.php         # Block registration
└── src/
    ├── block.json           # Block metadata
    ├── index.js             # Entry point
    ├── edit.js              # Editor component
    ├── save.js              # Save (null for SSR)
    ├── render.php           # Server-side render
    ├── view.js              # Frontend JS (if needed)
    ├── style.scss           # Frontend + Editor styles
    └── editor.scss          # Editor-only styles
```

### Build System

```bash
# Production build (all blocks)
npm run build:blocks

# Development with watch
npm run dev:blocks

# Clean build directory
npm run clean:blocks
```

### Conditional Loading

Blocks are conditionally loaded based on plugin availability:

```php
// BuddyPress blocks - only when BP active
// Checks: function_exists('buddypress')
// Blocks: dashboard-intro, forums, forums-activity, group-carousel,
//         groups-grid, groups-lists, header-bar, members-grid,
//         members-lists, members-carousel, profile-completion

// WooCommerce blocks - only when WC active
// Checks: class_exists('WooCommerce')
// Blocks: mini-cart, product-grid, header-bar (cart icon)
```

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
