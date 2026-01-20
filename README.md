# WBcom Essential

**The Essential Companion for Your WordPress Theme**

45 Gutenberg blocks. 43 Elementor widgets. 11 BuddyPress integrations. A free plugin that makes Theme Reign, BuddyX, and BuddyX Pro even more powerful.

[![WordPress](https://img.shields.io/badge/WordPress-6.0%2B-blue.svg)](https://wordpress.org/)
[![PHP](https://img.shields.io/badge/PHP-8.0%2B-purple.svg)](https://php.net/)
[![License](https://img.shields.io/badge/License-GPL--2.0%2B-green.svg)](https://www.gnu.org/licenses/gpl-2.0.html)

## Overview

WBcom Essential provides production-ready blocks and widgets that inherit your theme's colors automatically. Built by the team behind BuddyX and Theme Reign, it's designed to work seamlessly with our themes—but works beautifully on any WordPress site.

### Key Features

- **45 Gutenberg Blocks** - Native WordPress blocks built with React
- **43 Elementor Widgets** - Same features in Elementor widget format
- **11 BuddyPress Blocks** - Built specifically for community sites
- **Theme Colors Toggle** - Blocks inherit your theme's color scheme automatically
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

All blocks are organized into 7 categories:

| Category | Block Count |
|----------|-------------|
| Starter Pack - Header | 4 |
| Starter Pack - Design | 14 |
| Starter Pack - Content | 8 |
| Starter Pack - Blog | 8 |
| Starter Pack - Marketing | 4 |
| Starter Pack - BuddyPress | 11 |
| Starter Pack - WooCommerce | 2 |

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

```bash
# Install dependencies
npm install

# Production build (all blocks)
npm run build:blocks

# Development with watch
npm run dev:blocks

# Clean build directory
npm run clean:blocks
```

### Directory Structure

```
wbcom-essential/
├── admin/                      # Admin panel functionality
├── build/                      # Compiled block assets
├── includes/                   # Core plugin functionality
├── plugins/
│   ├── elementor/              # Elementor integration (43 widgets)
│   └── gutenberg/              # Gutenberg blocks (45 blocks)
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

**Version**: 4.2.0
**Requires WordPress**: 6.0+
**Requires PHP**: 8.0+
**Tested up to**: WordPress 6.7
