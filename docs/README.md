# WBcom Essential Documentation

**Version:** 4.7.1
**Requires WordPress:** 6.0+
**Requires PHP:** 8.0+
**License:** GPL v2 or later

## Overview

WBcom Essential is a companion plugin for WordPress themes, providing **43 Elementor widgets** and **35 Gutenberg blocks** for BuddyPress, WooCommerce, Easy Digital Downloads and general WordPress pages.

## What's Included

### Elementor Widgets (43 total)

| Category | Count | Examples |
|----------|-------|----------|
| General | 27 | Sliders, carousels, pricing tables, forms, accordions |
| BuddyPress | 11 | Member grids, group carousels, activity feeds |
| WooCommerce | 5 | Product displays, reviews, banners |

### Gutenberg Blocks (35 total)

See [Block Categories](#block-categories) below for the per-category counts.

## Documentation Index

| Document | Description |
|----------|-------------|
| [Gutenberg Blocks](../plugins/gutenberg/README.md) | Block development guide |
| [Changelog](../readme.txt) | Version history (readme.txt) |
| [CLAUDE.md](../CLAUDE.md) | Developer reference with full widget-to-block mapping |

## Quick Start

### Installation

1. Upload `wbcom-essential` to `/wp-content/plugins/`
2. Activate via **Plugins** menu
3. Elementor widgets appear in "Wbcom Essential" category
4. Gutenberg blocks appear in "Essential" categories

### Using Gutenberg Blocks

1. Add a new post or page
2. Click the **+** button to open block inserter
3. Search for "Essential" or browse categories
4. Add block and configure in sidebar panel

### Theme Colors

Several blocks read your theme's `--wbcom-*` CSS custom properties and fall back to built-in colours. The Category Grid block also has a **Use Theme Colors** toggle. See [Theme Colors](website/features/theme-colors.md).

## Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| WordPress | 6.0 | 6.9+ |
| PHP | 8.0 | 8.2+ |
| Elementor | 3.5 | Latest |
| BuddyPress | 10.0 | Latest |
| WooCommerce | 7.0 | Latest |

## Block Categories

Blocks are organized into 7 categories for easy discovery:

| Category | Display Name | Block Count |
|----------|--------------|-------------|
| essential-design | Essential - Design | 4 |
| essential-content | Essential - Content | 5 |
| essential-blog | Essential - Blog | 3 |
| essential-marketing | Essential - Marketing | 7 |
| essential-buddypress | Essential - BuddyPress | 5 |
| essential-woocommerce | Essential - WooCommerce | 3 |
| essential-edd | Essential - EDD | 8 |

## Conditional Loading

The plugin loads features based on active plugins:

- **BuddyPress blocks** - Only when `buddypress()` function exists
- **WooCommerce blocks** - Only when `WooCommerce` class exists
- **bbPress widgets** - Only when bbPress is active

This keeps your site lean - no unused code is loaded.

## Support

- **Documentation:** https://docs.wbcomdesigns.com/wordpress-family/wbcom-essential/
- **Support:** https://wbcomdesigns.com/support/
- **GitHub:** https://github.com/vapvarun/wbcom-essential

## License

GPL v2 or later. See [LICENSE](../license/LICENSE.txt) for details.
