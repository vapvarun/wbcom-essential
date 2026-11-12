# WBcom Essential

**Part of Reign, BuddyX and BuddyX Pro**

35 production-grade Gutenberg blocks. 43 Elementor widgets (42 on any theme, plus a Reign-only Notification Area). 5 BuddyPress blocks. A free plugin that makes Theme Reign, BuddyX, and BuddyX Pro even more powerful.

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL--2.0%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Overview

WBcom Essential provides production-ready blocks and widgets that inherit your theme's colors automatically. Built by the team behind BuddyX and Theme Reign, it's designed to work seamlessly with our themes, but works beautifully on any WordPress site.

### Key Features

- **35 Gutenberg Blocks** - Built on one shared set of components, controls and design tokens
- **43 Elementor Widgets** - Same features in Elementor widget format
- **5 BuddyPress Blocks** - Built specifically for community sites (activity, members, groups)
- **3 WooCommerce Blocks** + **8 EDD Blocks** - Show their content when WooCommerce or Easy Digital Downloads is active
- **Responsive 3-Breakpoint** - Desktop/Tablet/Mobile controls on every block
- **Theme Colors** - Blocks read your theme's `--wbcom-*` CSS custom properties, with built-in fallbacks
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

- Elementor 3.5+ (for Elementor widgets)
- BuddyPress 10.0+ (for BuddyPress blocks)
- WooCommerce 7.0+ (for WooCommerce blocks)
- bbPress 2.6+ (for the Forums Elementor widgets)

## Installation

### With Reign

Go to **Reign Settings > Extend** and install Wbcom Essential from the list.

### Manual Installation

1. Download the plugin from [wbcomdesigns.com](https://wbcomdesigns.com/downloads/wbcom-essential/)
2. Go to **Plugins → Add New → Upload Plugin**
3. Choose the downloaded ZIP file
4. Click **Install Now** then **Activate**

### Via WP-CLI

```bash
wp plugin install /path/to/wbcom-essential.zip --activate
```

## Block Categories

All 35 blocks are organized into 7 categories:

| Category | Block Count |
|----------|-------------|
| Essential - Marketing | 7 |
| Essential - Content | 5 |
| Essential - Blog | 3 |
| Essential - Design | 4 |
| Essential - BuddyPress *(needs BuddyPress or BuddyBoss Platform)* | 5 |
| Essential - WooCommerce *(needs WooCommerce)* | 3 |
| Essential - EDD *(needs Easy Digital Downloads)* | 8 |

All 43 Elementor widgets appear in the Elementor panel under **Wbcom Essential**.

## Theme Compatibility

### Optimized For

Wbcom Essential is part of these themes, so everything it offers comes with them:

- **Reign** - Full color integration and matched component designs. Install it from **Reign Settings > Extend**.
- **BuddyX** - Free theme from WordPress.org
- **BuddyX Pro** - Premium version with additional features

You can also download it from the [Wbcom store](https://wbcomdesigns.com/downloads/wbcom-essential/).

### Universal Compatibility

Works with any properly coded WordPress theme. Blocks pick up theme colours from the `--wbcom-*` CSS custom properties that Reign, BuddyX and BuddyX Pro set; other themes can define the same properties.

## Documentation

- **User Documentation**: [docs.wbcomdesigns.com](https://docs.wbcomdesigns.com)
- **Developer Documentation**: See `docs/` folder
- **Architecture Reference**: See `docs/architecture/PLUGIN_ARCHITECTURE.md`

## Development

### Build Commands

> **Do NOT run `npm run build` or `wp-scripts build` directly.** This plugin
> uses custom Node scripts driven by `scripts/build-blocks.js`. The default
> `wp-scripts` entry is `./src`, which doesn't exist in this repo, so block
> sources live in `plugins/gutenberg/src/blocks/`.

```bash
# Install dependencies (first time only)
npm install

# --- Block build ---
npm run build:blocks     # Production build of all 35 blocks
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
│   ├── elementor/              # Elementor integration (42 widgets + 1 Reign-only)
│   └── gutenberg/              # Gutenberg blocks (35 blocks)
│       ├── src/
│       │   ├── shared/         # Shared infrastructure (components, hooks, utils, tokens)
│       │   └── blocks/         # 35 block source folders
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

**Version**: 4.7.1
**Requires WordPress**: 6.0+
**Requires PHP**: 8.0+
**Tested up to**: WordPress 7.1
