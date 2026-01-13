# WBcom Essential Documentation

**Version:** 4.0.2
**Requires WordPress:** 6.0+
**Requires PHP:** 8.0+
**License:** GPL v2 or later

## Overview

WBcom Essential is a companion plugin for WordPress themes, providing **43 Elementor widgets** and **45 Gutenberg blocks** for BuddyPress, WooCommerce, and general WordPress functionality.

## What's Included

### Elementor Widgets (43 total)

| Category | Count | Examples |
|----------|-------|----------|
| General | 27 | Sliders, carousels, pricing tables, forms, accordions |
| BuddyPress | 11 | Member grids, group carousels, activity feeds |
| WooCommerce | 5 | Product displays, reviews, banners |

### Gutenberg Blocks (45 total)

| Category | Count | Examples |
|----------|-------|----------|
| General | 26 | All Elementor general widgets ported |
| BuddyPress | 11 | Full parity with Elementor BP widgets |
| WooCommerce | 2 | Product grid, mini cart |
| Bonus | 7 | Counter, CTA box, divider, icon box, mini-cart, social icons, star rating |

## Documentation Index

| Document | Description |
|----------|-------------|
| [Gutenberg Blocks](../plugins/gutenberg/README.md) | Block development guide |
| [Changelog](./changelog.md) | Version history |
| [CLAUDE.md](../CLAUDE.md) | Developer reference with full widget-to-block mapping |

## Quick Start

### Installation

1. Upload `wbcom-essential` to `/wp-content/plugins/`
2. Activate via **Plugins** menu
3. Elementor widgets appear in "Starter Templates" category
4. Gutenberg blocks appear in "Starter Pack" categories

### Using Gutenberg Blocks

1. Add a new post or page
2. Click the **+** button to open block inserter
3. Search for "Starter Pack" or browse categories
4. Add block and configure in sidebar panel

### Theme Colors Feature

All 45 blocks support automatic theme color inheritance:

1. Add any block to your content
2. Open block settings (sidebar)
3. Find **Color Settings** panel
4. Enable **Use Theme Colors** toggle
5. Block colors now follow your theme's color scheme

## Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| WordPress | 6.0 | 6.9+ |
| PHP | 8.0 | 8.2+ |
| Elementor | 3.0 | Latest |
| BuddyPress | 10.0 | Latest |
| WooCommerce | 7.0 | Latest |

## Block Categories

Blocks are organized into 7 categories for easy discovery:

| Category | Display Name | Block Count |
|----------|--------------|-------------|
| starter-header | Starter Pack - Header | 4 |
| starter-design | Starter Pack - Design | 14 |
| starter-content | Starter Pack - Content | 8 |
| starter-blog | Starter Pack - Blog | 8 |
| starter-marketing | Starter Pack - Marketing | 4 |
| starter-buddypress | Starter Pack - BuddyPress | 11 |
| starter-woocommerce | Starter Pack - WooCommerce | 2 |

## Conditional Loading

The plugin loads features based on active plugins:

- **BuddyPress blocks** - Only when `buddypress()` function exists
- **WooCommerce blocks** - Only when `WooCommerce` class exists
- **bbPress widgets** - Only when bbPress is active

This keeps your site lean - no unused code is loaded.

## Support

- **Documentation:** https://developer.wbcomdesigns.com/docs/wbcom-essential/
- **Support:** https://developer.wbcomdesigns.com/support/
- **GitHub:** https://github.com/vapvarun/wbcom-essential

## License

GPL v2 or later. See [LICENSE](../license/LICENSE.txt) for details.
