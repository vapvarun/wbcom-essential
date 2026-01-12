# Wbcom Essential - Claude Code Instructions

## Project Overview

**Plugin**: Wbcom Essential
**Version**: 4.0.2 (development branch)
**Purpose**: Companion plugin for BuddyX theme providing Elementor widgets and Gutenberg blocks for BuddyPress, WooCommerce, and general WordPress functionality.

## Project Management

### Basecamp Card Table Columns

| Column | URL | Purpose |
|--------|-----|---------|
| **Ready for Development** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110488 | Tasks ready to be picked up |
| **Bugs** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110477 | Bug reports and issues |
| **Ready for Testing** | https://3.basecamp.com/5798509/buckets/37595336/card_tables/columns/7416110490 | Completed work awaiting QA |

## Current Initiative: Elementor to Block 1-to-1 Mapping

Convert all 43 Elementor widgets to Gutenberg blocks while maintaining feature parity and consistent patterns.

---

## Directory Structure

```
wbcom-essential/
├── admin/                      # Admin panel functionality
├── build/                      # Compiled block assets (generated)
│   └── blocks/                 # Built block JS/CSS
├── includes/                   # Core plugin functionality
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
│       ├── blocks/             # Block source files
│       │   ├── accordion/
│       │   ├── advanced-tabs/
│       │   ├── branding/
│       │   ├── dropdown-button/
│       │   ├── heading/
│       │   ├── post-carousel/
│       │   ├── slider/
│       │   └── smart-menu/
│       └── wbcom-gutenberg.php # Block registration
├── languages/                  # Translations
├── node_modules/               # NPM dependencies
├── src/                        # Shared source files
├── package.json                # NPM configuration
├── webpack.blocks.js           # Block build configuration
└── wbcom-essential.php         # Main plugin file
```

---

## Widget to Block Mapping Status

### Legend
- ✅ Block exists
- ⚠️ Block exists but needs review/rebuild
- ❌ Block needed

### General Widgets (27 total)

| # | Widget | Elementor File | Block Status | Priority |
|---|--------|----------------|--------------|----------|
| 1 | Accordion | `General/Accordion.php` | ⚠️ Review | - |
| 2 | Branding | `General/Branding.php` | ⚠️ Review | - |
| 3 | Countdown | `General/Countdown.php` | ❌ Needed | P1 |
| 4 | Dropdown Button | `General/DropdownButton.php` | ⚠️ Review | - |
| 5 | Flip Box | `General/FlipBox.php` | ❌ Needed | P3 |
| 6 | Heading | `General/Heading.php` | ⚠️ Review | - |
| 7 | Login Form | `General/LoginForm.php` | ❌ Needed | P3 |
| 8 | Notification Area | `General/NotificationArea.php` | ❌ Needed | P3 |
| 9 | Portfolio Grid | `General/PortfolioGrid.php` | ❌ Needed | P2 |
| 10 | Post Carousel | `General/PostCarousel.php` | ⚠️ Review | - |
| 11 | Posts Carousel | `General/PostsCarousel.php` | ❌ Needed | P2 |
| 12 | Post Slider | `General/PostSlider.php` | ❌ Needed | P2 |
| 13 | Posts Revolution | `General/PostsRevolution.php` | ❌ Needed | P2 |
| 14 | Posts Ticker | `General/PostsTicker.php` | ❌ Needed | P2 |
| 15 | Post Timeline | `General/PostTimeline.php` | ❌ Needed | P2 |
| 16 | Pricing Table | `General/PricingTable.php` | ❌ Needed | P1 |
| 17 | Progress Bar | `General/ProgressBar.php` | ❌ Needed | P1 |
| 18 | Shape | `General/Shape.php` | ❌ Needed | P3 |
| 19 | Site Logo | `General/SiteLogo.php` | ❌ Needed | P3 |
| 20 | Slider | `General/Slider.php` | ⚠️ Review | - |
| 21 | Smart Menu | `General/SmartMenu.php` | ⚠️ Review | - |
| 22 | Tabs | `General/Tabs.php` | ⚠️ Review (Advanced Tabs) | - |
| 23 | Team Carousel | `General/TeamCarousel.php` | ❌ Needed | P1 |
| 24 | Testimonial | `General/Testimonial.php` | ❌ Needed | P1 |
| 25 | Testimonial Carousel | `General/TestimonialCarousel.php` | ❌ Needed | P1 |
| 26 | Text Rotator | `General/TextRotator.php` | ❌ Needed | P3 |
| 27 | Timeline | `General/Timeline.php` | ❌ Needed | P1 |

### BuddyPress Widgets (11 total)

| # | Widget | Elementor File | Block Status | Priority |
|---|--------|----------------|--------------|----------|
| 28 | Dashboard Intro | `Buddypress/DashboardIntro.php` | ❌ Needed | P3 |
| 29 | Forums | `Buddypress/Forums.php` | ❌ Needed | P3 |
| 30 | Forums Activity | `Buddypress/ForumsActivity.php` | ❌ Needed | P3 |
| 31 | Group Carousel | `Buddypress/GroupCarousel.php` | ❌ Needed | P3 |
| 32 | Groups Grid | `Buddypress/GroupGrid.php` | ❌ Needed | P3 |
| 33 | Groups Lists | `Buddypress/GroupsLists.php` | ❌ Needed | P3 |
| 34 | Header Bar | `Buddypress/HeaderBar.php` | ❌ Needed | P3 |
| 35 | Members Grid | `Buddypress/MembersGrid.php` | ❌ Needed | P3 |
| 36 | Members Lists | `Buddypress/MembersLists.php` | ❌ Needed | P3 |
| 37 | Members Carousel | `Buddypress/MemeberCarousel.php` | ❌ Needed | P3 |
| 38 | Profile Completion | `Buddypress/ProfileCompletion.php` | ❌ Needed | P3 |

### WooCommerce Widgets (5 total)

| # | Widget | Elementor File | Block Status | Priority |
|---|--------|----------------|--------------|----------|
| 39 | Add Banner | `WooCommerce/AddBanner.php` | ❌ Needed | P4 |
| 40 | Customer Review | `WooCommerce/CustomerReview.php` | ❌ Needed | P4 |
| 41 | Product Tab | `WooCommerce/ProductTab.php` | ❌ Needed | P4 |
| 42 | Universal Product | `WooCommerce/UniversalProduct.php` | ❌ Needed | P4 |
| 43 | WC Testimonial | `WooCommerce/WcTestimonial.php` | ❌ Needed | P4 |

### Summary

| Category | Total | Exists (Review) | Needed |
|----------|-------|-----------------|--------|
| General | 27 | 8 | 19 |
| BuddyPress | 11 | 0 | 11 |
| WooCommerce | 5 | 0 | 5 |
| **Total** | **43** | **8** | **35** |

---

## Block Development Standards

### File Structure (per block)

```
blocks/
└── {block-name}/
    ├── {block-name}.php      # PHP registration & server-side render
    ├── src/
    │   ├── block.json        # Block metadata
    │   ├── index.js          # Block registration
    │   ├── edit.js           # Editor component
    │   ├── save.js           # Save component (or null for dynamic)
    │   ├── render.php        # Server-side render template
    │   ├── editor.scss       # Editor-only styles
    │   ├── style.scss        # Frontend + editor styles
    │   └── view.js           # Frontend JavaScript (if needed)
    └── README.md             # Block documentation
```

### block.json Standard

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "wbcom-essential/{block-name}",
  "version": "1.0.0",
  "title": "Block Title",
  "category": "wbcom-essential",
  "icon": "icon-name",
  "description": "Block description",
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "wbcom-essential",
  "supports": {
    "html": false,
    "align": ["wide", "full"],
    "color": {
      "background": true,
      "text": true
    },
    "spacing": {
      "margin": true,
      "padding": true
    },
    "typography": {
      "fontSize": true,
      "lineHeight": true
    }
  },
  "attributes": {},
  "editorScript": "file:../../../build/blocks/{block-name}/index.js",
  "editorStyle": "file:../../../build/blocks/{block-name}/index.css",
  "style": "file:../../../build/blocks/{block-name}/style-index.css",
  "viewScript": "file:../../../build/blocks/{block-name}/view.js",
  "render": "file:./render.php"
}
```

### PHP Registration Standard

```php
<?php
/**
 * {Block Name} Block
 *
 * @package Wbcom_Essential
 * @since 4.1.0
 */

namespace Jestarter\Starter\Starter\Starter\Starter\WbcomEssential\Blocks;

defined( 'ABSPATH' ) || exit;

/**
 * Register the block.
 */
function register_{block_name}_block() {
    register_block_type( __DIR__ . '/src' );
}
add_action( 'init', __NAMESPACE__ . '\\register_{block_name}_block' );
```

### JavaScript Standards

```javascript
/**
 * {Block Name} Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

import './style.scss';
import './editor.scss';

registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Block name | `wbcom-essential/{block-name}` | `wbcom-essential/countdown` |
| PHP namespace | `WbcomEssential\Blocks` | - |
| CSS class prefix | `.wbcom-essential-{block}` | `.wbcom-essential-countdown` |
| JS function prefix | `wbcomEssential` | `wbcomEssentialCountdown` |
| Handle prefix | `wbcom-essential-` | `wbcom-essential-countdown-editor` |

### Block Categories

Register custom category for all blocks:

```php
add_filter( 'block_categories_all', function( $categories ) {
    return array_merge(
        array(
            array(
                'slug'  => 'wbcom-essential',
                'title' => __( 'Wbcom Essential', 'wbcom-essential' ),
                'icon'  => 'admin-generic',
            ),
            array(
                'slug'  => 'wbcom-essential-buddypress',
                'title' => __( 'Wbcom BuddyPress', 'wbcom-essential' ),
                'icon'  => 'groups',
            ),
            array(
                'slug'  => 'wbcom-essential-woocommerce',
                'title' => __( 'Wbcom WooCommerce', 'wbcom-essential' ),
                'icon'  => 'cart',
            ),
        ),
        $categories
    );
} );
```

---

## Development Workflow

### Building Blocks

```bash
# Development with watch
npm run start

# Production build
npm run build

# Build specific block
npm run build -- --block={block-name}
```

### Creating a New Block

1. Create directory: `plugins/gutenberg/blocks/{block-name}/`
2. Create files following the standard structure above
3. Register in `wbcom-gutenberg.php`
4. Run `npm run build`
5. Test in editor and frontend
6. Move card to "Ready for Testing" in Basecamp

### Testing Checklist

- [ ] Block appears in inserter under correct category
- [ ] All controls work in editor
- [ ] Preview matches frontend
- [ ] Responsive behavior correct
- [ ] No console errors
- [ ] Accessibility (keyboard navigation, ARIA)
- [ ] RTL support
- [ ] Translation ready (all strings wrapped)

---

## Standardized Block Template

### File Structure
```
blocks/{block-name}/
├── {block-name}.php         # Block registration
├── src/
│   ├── block.json           # Block metadata
│   ├── index.js             # Entry point
│   ├── edit.js              # Editor component
│   ├── save.js              # Save (null for SSR)
│   ├── render.php           # Server-side render
│   ├── view.js              # Frontend JS
│   ├── style.scss           # Frontend + Editor
│   └── editor.scss          # Editor only
└── package.json             # Optional, for standalone dev
```

### {block-name}.php Template
```php
<?php
/**
 * {Block Title} Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_{block_name}_block_init() {
    $build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/{block-name}/';
    if ( file_exists( $build_path . 'block.json' ) ) {
        register_block_type( $build_path );
    }
}
add_action( 'init', 'wbcom_essential_{block_name}_block_init' );
```

### src/index.js Template
```javascript
/**
 * {Block Title} Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
    edit: Edit,
    save,
} );
```

### src/save.js Template (for SSR blocks)
```javascript
/**
 * Save component - returns null for server-side rendered blocks.
 */
export default function save() {
    return null;
}
```

### src/block.json Template
```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "wbcom-essential/{block-name}",
    "version": "1.0.0",
    "title": "{Block Title}",
    "category": "wbcom-essential",
    "icon": "{icon-name}",
    "description": "{Block description}",
    "keywords": ["{keyword1}", "{keyword2}"],
    "textdomain": "wbcom-essential",
    "example": {},
    "attributes": {},
    "supports": {
        "html": false,
        "align": ["wide", "full"],
        "color": {
            "background": true,
            "text": true
        },
        "spacing": {
            "margin": true,
            "padding": true
        },
        "typography": {
            "fontSize": true,
            "lineHeight": true
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "viewScript": "file:./view.js",
    "render": "file:./render.php"
}
```

### src/render.php Template
```php
<?php
/**
 * Server-side render for {Block Title} block.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Extract attributes with defaults.
$example_attr = $attributes['exampleAttr'] ?? 'default';

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => 'wbcom-essential-{block-name}',
) );
?>

<div <?php echo $wrapper_attributes; ?>>
    <!-- Block output here -->
</div>
```

---

## Use Theme Colors Pattern

All blocks should support a "Use Theme Colors" toggle that allows users to choose between:
- **Disabled (default)**: Custom colors via ColorPicker controls with inline styles
- **Enabled**: Inherit colors from the active theme's CSS custom properties

### Implementation Checklist

When adding theme colors support to a block:

1. **block.json** - Add attribute
2. **edit.js** - Add toggle and conditional color pickers
3. **render.php** - Add class and conditional inline styles
4. **style.scss** - Add theme color variable mappings

### 1. block.json - Add Attribute

```json
"attributes": {
    "useThemeColors": {
        "type": "boolean",
        "default": false
    },
    // ... other attributes
}
```

### 2. edit.js - Add Toggle Control

```javascript
// Import ToggleControl
import { ToggleControl } from '@wordpress/components';

// Destructure attribute
const { useThemeColors, /* other attrs */ } = attributes;

// Add class to blockProps
const blockProps = useBlockProps( {
    className: `wp-block-wbcom-essential-{block-name}${ useThemeColors ? ' use-theme-colors' : '' }`,
} );

// In InspectorControls, Color Settings panel:
<PanelBody title={ __( 'Color Settings', 'wbcom-essential' ) } initialOpen={ false }>
    <ToggleControl
        label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
        help={ useThemeColors
            ? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
            : __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
        }
        checked={ useThemeColors }
        onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
    />
    { ! useThemeColors && (
        <>
            <hr />
            {/* ColorPicker controls here - only shown when theme colors disabled */}
        </>
    ) }
</PanelBody>

// Conditionally apply inline styles in preview
const elementStyle = {
    // Typography always applied
    fontSize: `${ fontSize }px`,
    // Colors only when NOT using theme colors
    ...( ! useThemeColors && {
        color: textColor,
        backgroundColor: bgColor,
    } ),
};
```

### 3. render.php - Add Class and Conditional Styles

```php
// Extract attribute
$use_theme_colors = isset( $attributes['useThemeColors'] ) ? $attributes['useThemeColors'] : false;

// Add class to wrapper
$wrapper_classes = $use_theme_colors ? 'use-theme-colors' : '';
$wrapper_attributes = get_block_wrapper_attributes( array(
    'class' => $wrapper_classes,
) );

// Build styles - colors only when theme colors disabled
$element_style = 'font-size: ' . esc_attr( $font_size ) . 'px;';
if ( ! $use_theme_colors ) {
    if ( ! empty( $text_color ) ) {
        $element_style .= ' color: ' . esc_attr( $text_color ) . ';';
    }
    if ( ! empty( $bg_color ) ) {
        $element_style .= ' background-color: ' . esc_attr( $bg_color ) . ';';
    }
}
```

### 4. style.scss - Theme Color Variable Mappings

```scss
.wp-block-wbcom-essential-{block-name} {
    // Default colors (fallbacks when using inline styles)
    --border-color: #ddd;
    --bg-color: #fff;
    --text-color: inherit;
    --heading-color: inherit;
    --link-color: #0073aa;

    /**
     * Theme Colors Mode
     * Maps theme CSS variables to block-specific variables
     */
    &.use-theme-colors {
        --border-color: var(--wbcom-card-border, var(--wbcom-color-border, #ddd));
        --bg-color: var(--wbcom-card-bg, var(--wbcom-color-base, #fff));
        --text-color: var(--wbcom-text-color, var(--wbcom-color-contrast-2, inherit));
        --heading-color: var(--wbcom-heading-color, var(--wbcom-color-contrast, inherit));
        --link-color: var(--wbcom-link-color, var(--wbcom-color-primary, #0073aa));

        // Apply theme colors to elements
        .element-class {
            color: var(--text-color);
            background-color: var(--bg-color);
            border-color: var(--border-color);
        }
    }
}
```

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

### Reference Implementation

See the Accordion block for a complete implementation:
- `blocks/accordion/src/block.json` - Attribute definition
- `blocks/accordion/src/edit.js` - Editor toggle and conditional rendering
- `blocks/accordion/src/render.php` - Server-side conditional styles
- `blocks/accordion/src/style.scss` - Theme color mappings

---

## Shared Dependencies

### JavaScript Libraries

| Library | Purpose | Location |
|---------|---------|----------|
| Swiper | Carousels/Sliders | `node_modules/swiper` |
| @wordpress/scripts | Build tooling | `node_modules` |
| @wordpress/block-editor | Block controls | Core |
| @wordpress/components | UI components | Core |

### PHP Dependencies

| Dependency | Check | Widgets Using |
|------------|-------|---------------|
| BuddyPress | `function_exists('buddypress')` | 11 BuddyPress widgets |
| WooCommerce | `class_exists('WooCommerce')` | 5 WooCommerce widgets |
| bbPress | `class_exists('bbPress')` | Forums widgets |

### Conditional Loading

```php
// Only load BuddyPress blocks when BP active
if ( function_exists( 'buddypress' ) ) {
    // Register BuddyPress blocks
}

// Only load WooCommerce blocks when WC active
if ( class_exists( 'WooCommerce' ) ) {
    // Register WooCommerce blocks
}
```

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
| `DIMENSIONS` | `BoxControl` / `__experimentalBoxControl` |
| `TYPOGRAPHY` | `FontSizePicker` + `FontFamilyControl` |
| `BORDER` | `BorderControl` / `__experimentalBorderControl` |
| `BOX_SHADOW` | Custom control |
| `BACKGROUND` | `ColorGradientControl` |
| `REPEATER` | `InnerBlocks` / Custom repeater |

---

## Code Quality

### PHP Standards

- Follow WordPress Coding Standards
- Use PHPCS with WordPress ruleset
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

## Git Workflow

### Branch Naming

- Feature: `feature/{block-name}-block`
- Bug fix: `fix/{issue-description}`
- Review: `review/{block-name}-block`

### Commit Messages

```
Add {block-name} block with full Elementor parity

- Implement all controls from Elementor widget
- Add server-side render for dynamic content
- Include responsive styling
- Add frontend JavaScript for interactivity

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## Priority Phases

### Phase 1: High Value General Blocks
Countdown, Pricing Table, Testimonial, Testimonial Carousel, Team Carousel, Timeline, Progress Bar

### Phase 2: Post/Content Blocks
Posts Carousel, Post Slider, Posts Revolution, Posts Ticker, Post Timeline, Portfolio Grid

### Phase 3: BuddyPress Blocks
Members Grid, Members Lists, Groups Grid, Groups Lists, Member Carousel, Group Carousel, Dashboard Intro, Profile Completion, Header Bar, Forums, Forums Activity

### Phase 4: Specialized Blocks
Login Form, Flip Box, Text Rotator, Shape, Site Logo, Notification Area

### Phase 5: WooCommerce Blocks
Universal Product, Product Tab, Customer Review, Add Banner, WC Testimonial

---

## Basecamp Card Index

Quick reference for card IDs to update or move cards without fetching the full list.

### Ready for Testing (Completed Blocks)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Accordion | 9304086515 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304086515 |
| Post Carousel | 9303973235 | https://3.basecamp.com/5798509/buckets/37595336/cards/9303973235 |
| Branding | 9300609740 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300609740 |
| Slider | 9304154853 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304154853 |
| Heading | 9308720062 | https://3.basecamp.com/5798509/buckets/37595336/cards/9308720062 |
| Advanced Tabs | 9304116013 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304116013 |
| Dropdown Button | 9304068687 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304068687 |
| Smart Menu | 9304102416 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304102416 |

### Ready for Development (P1 - High Priority)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Countdown | 9409482314 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482314 |
| Pricing Table | 9409482334 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482334 |
| Progress Bar | 9409482364 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482364 |
| Team Carousel | 9409482379 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482379 |
| Testimonial | 9409482391 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482391 |
| Testimonial Carousel | 9409482403 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482403 |
| Timeline | 9409482417 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482417 |

### Ready for Development (P2 - Post Blocks)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Posts Carousel | 9409482977 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482977 |
| Post Slider | 9409482984 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482984 |
| Post Timeline | 9409482992 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409482992 |
| Portfolio Grid | 9409483002 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483002 |

### Ready for Development (P3 - Specialized)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Flip Box | 9409483021 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483021 |
| Shape | 9409483034 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483034 |
| Site Logo | 9409483041 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483041 |
| Text Rotator | 9409483058 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483058 |

### Ready for Development (P3 - BuddyPress)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Header Bar | 9300142521 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300142521 |
| Profile Completion | 9300168957 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300168957 |
| Members Lists | 9300198677 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300198677 |
| Members Grid | 9300226202 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300226202 |
| Members Carousel | 9300330540 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300330540 |
| Groups Lists | 9300436715 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300436715 |
| Groups Grid | 9300396906 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300396906 |
| Group Carousel | 9300462921 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300462921 |
| Dashboard Intro | 9300488491 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300488491 |
| Forums | 9300507328 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300507328 |
| Forums Activity | 9300536294 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300536294 |
| Notification Area | 9300659259 | https://3.basecamp.com/5798509/buckets/37595336/cards/9300659259 |
| Posts Revolution | 9303960344 | https://3.basecamp.com/5798509/buckets/37595336/cards/9303960344 |
| Posts Ticker | 9303992789 | https://3.basecamp.com/5798509/buckets/37595336/cards/9303992789 |
| Login Form | 9304045117 | https://3.basecamp.com/5798509/buckets/37595336/cards/9304045117 |

### Ready for Development (P4 - WooCommerce)

| Block | Card ID | Card URL |
|-------|---------|----------|
| Add Banner | 9409483524 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483524 |
| Customer Review | 9409483538 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483538 |
| Product Tab | 9409483550 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483550 |
| Universal Product | 9409483566 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483566 |
| WC Testimonial | 9409483571 | https://3.basecamp.com/5798509/buckets/37595336/cards/9409483571 |

---

## Notes

- Always check corresponding Elementor widget for feature parity
- Use `ServerSideRender` for dynamic content (BuddyPress, WooCommerce, posts)
- Reuse existing CSS from Elementor widgets where possible
- Test with BuddyX theme for full compatibility
- All strings must be translatable using `__()` or `_e()`
