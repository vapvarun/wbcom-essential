# WBcom Essential

**The Essential Companion for Your WordPress Theme**

32 production-grade Gutenberg V2 blocks. 43 Elementor widgets. 5 BuddyPress blocks. A free plugin that makes Theme Reign, BuddyX, and BuddyX Pro even more powerful.

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL--2.0%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Overview

WBcom Essential provides production-ready blocks and widgets that inherit your theme's colors automatically. Built by the team behind BuddyX and Theme Reign, it's designed to work seamlessly with our themes—but works beautifully on any WordPress site.

### Key Features

- **32 Gutenberg V2 Blocks** - Rebuilt from a shared infrastructure to a competitive-audit quality standard
- **43 Elementor Widgets** - Same features in Elementor widget format
- **5 BuddyPress Blocks** - Built specifically for community sites (activity, members, groups)
- **4 WooCommerce Blocks** + **2 EDD Blocks** - Conditional, loaded only when plugins are active
- **Responsive 3-Breakpoint** - Desktop/Tablet/Mobile controls on every block
- **Theme Colors Toggle** - Blocks inherit your theme's color scheme automatically
- **Accessibility Built-in** - ARIA, keyboard navigation, `prefers-reduced-motion`
- **Conditional Loading** - Only loads assets when needed
- **RTL Support** - Full right-to-left language support
- **FSE Compatible** - Works with Full Site Editing

## Requirements

| Requirement | Minimum Version |
|-------------|-----------------|
| WordPress   | 6.0+            |
| PHP         | 8.0+            |
| MySQL       | 5.7+ / MariaDB 10.3+ |

### Optional

- Elementor 3.0+ (for Elementor widgets)
- BuddyPress 10.0+ (for BuddyPress blocks)
- WooCommerce 7.0+ (for WooCommerce blocks)
- bbPress 2.6+ (for Forums blocks)

## Installation

### From WordPress Admin

1. Go to **Plugins → Add New**
2. Search for "WBcom Essential"
3. Click **Install Now** then **Activate**

### Manual Installation

1. Download the plugin from [wbcomdesigns.com](https://wbcomdesigns.com/downloads/wbcom-essential/)
2. Go to **Plugins → Add New → Upload Plugin**
3. Choose the downloaded ZIP file
4. Click **Install Now** then **Activate**

### Via WP-CLI

```bash
wp plugin install wbcom-essential --activate
```

## Block Categories

All 32 V2 blocks are organized into 7 categories:

| Category | Block Count |
|----------|-------------|
| Essential - Marketing | 7 |
| Essential - Content | 5 |
| Essential - Blog | 3 |
| Essential - Design | 6 |
| Essential - BuddyPress | 5 |
| Essential - WooCommerce | 4 |
| Essential - EDD *(conditional)* | 2 |

## Theme Compatibility

### Optimized For

- **Theme Reign** - Full color integration and matched component designs
- **BuddyX** - Free theme from WordPress.org
- **BuddyX Pro** - Premium version with additional features

### Universal Compatibility

Works with any properly coded WordPress theme. The Theme Colors feature adapts to themes that use CSS custom properties.

## Documentation

- **User Documentation**: [docs.wbcomdesigns.com](https://docs.wbcomdesigns.com)
- **Developer Documentation**: See `docs/` folder
- **Architecture Reference**: See `docs/architecture/PLUGIN_ARCHITECTURE.md`

## Development

### Build Commands

> **Do NOT run `npm run build` or `wp-scripts build` directly.** This plugin
> uses custom Node scripts driven by `scripts/build-blocks.js`. The default
> `wp-scripts` entry is `./src`, which doesn't exist in this repo — block
> sources live in `plugins/gutenberg/src/blocks/`.

```bash
# Install dependencies (first time only)
npm install

# --- Block build ---
npm run build:blocks     # Production build of all 32 V2 blocks
npm run dev:blocks       # Watch mode for development
npm run clean:blocks     # Remove build/blocks/

# --- Distribution zip ---
# Builds blocks, then runs grunt to assemble a clean plugin zip in dist/
# excluding /docs, /marketing, /plan, /scripts, /node_modules, *.md,
# composer/grunt/phpcs/phpstan/phpunit tooling, and block source files.
npm run dist             # dist/wbcom-essential-<version>.zip
npm run release          # Same as dist, but also regenerates .pot/i18n

# --- i18n only ---
npm run i18n             # checktextdomain + makepot
```

After running `npm run dist`, the releasable zip is at:

```
dist/wbcom-essential-<pluginVersion>.zip
```

where `<pluginVersion>` is set in `gruntfile.js` (keep it in sync with
`loader.php` and `readme.txt` when releasing).

### Directory Structure

```
wbcom-essential/
├── admin/                      # Admin panel functionality
├── build/                      # Compiled block assets
├── includes/                   # Core plugin functionality
├── plugins/
│   ├── elementor/              # Elementor integration (43 widgets)
│   └── gutenberg/              # Gutenberg V2 blocks (32 blocks)
│       ├── src/
│       │   ├── shared/         # Shared infrastructure (components, hooks, utils, tokens)
│       │   └── blocks/         # 32 V2 block source files
│       ├── BlockRegistrar.php  # Auto-register from build/blocks/
│       └── gutenberg.php       # Loader, categories, REST routes
├── languages/                  # Translations
└── docs/                       # Documentation
```

## Support

- **Support Forums**: [wbcomdesigns.com/support](https://wbcomdesigns.com/support)
- **Documentation**: [docs.wbcomdesigns.com](https://docs.wbcomdesigns.com)
- **GitHub Issues**: [Report bugs](https://github.com/vapvarun/wbcom-essential/issues)

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This plugin is licensed under the [GPL-2.0+](https://www.gnu.org/licenses/gpl-2.0.html).

## Credits

Built with care by [Wbcom Designs](https://wbcomdesigns.com/) - the team behind Theme Reign, BuddyX, and BuddyX Pro themes.

---

**Version**: 4.5.0
**Requires WordPress**: 6.0+
**Requires PHP**: 8.0+
**Tested up to**: WordPress 6.9
