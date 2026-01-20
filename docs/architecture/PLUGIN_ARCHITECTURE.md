# Wbcom Essential - Plugin Architecture

**Version**: 4.2.0
**Generated**: 2025-01-19
**Scope**: Hybrid (Conceptual 95%, Reference 50%)

---

## Table of Contents

1. [Overview](#overview)
2. [Directory Structure](#directory-structure)
3. [Core Components](#core-components)
4. [Gutenberg Blocks](#gutenberg-blocks)
5. [Elementor Widgets](#elementor-widgets)
6. [REST API](#rest-api)
7. [AJAX Handlers](#ajax-handlers)
8. [Hooks Reference](#hooks-reference)
9. [Build System](#build-system)
10. [Dependencies](#dependencies)

---

## Overview

Wbcom Essential is a companion plugin for BuddyX/Flavor themes providing:
- **45 Gutenberg blocks** for WordPress block editor
- **43 Elementor widgets** for Elementor page builder
- **BuddyPress integration** (11 BP-specific blocks/widgets)
- **WooCommerce integration** (5 WC widgets, 2 blocks)
- **License management** via EDD Software Licensing

### Key Statistics

| Component | Count |
|-----------|-------|
| Gutenberg Blocks | 45 |
| Elementor Widgets | 43 |
| PHP Classes | 68 |
| REST Endpoints | 5 |
| AJAX Handlers | 12 |
| Custom Hooks | 45+ |

---

## Directory Structure

```
wbcom-essential/
├── admin/                          # Admin panel
│   └── class-wbcom-essential-widget-showcase.php
├── build/                          # Compiled block assets (45 dirs)
│   └── blocks/                     # Built JS/CSS per block
├── docs/                           # Documentation
│   ├── architecture/               # This documentation
│   └── *.md                        # User-facing docs
├── includes/                       # Core functionality
│   ├── shared-admin/               # Shared admin components
│   └── wbcom-essential-function.php
├── languages/                      # i18n translations
├── license/                        # EDD License management
│   ├── class-wbcom-essential-license-manager.php
│   ├── class-wbcom-essential-license-updater.php
│   └── EDD_SL_Plugin_Updater.php
├── plugins/
│   ├── elementor/                  # Elementor integration
│   │   ├── assets/                 # Elementor CSS/JS
│   │   ├── documents/              # Document types
│   │   ├── helper/skins/           # Widget skins
│   │   ├── hooks/                  # Elementor hooks
│   │   ├── templates/              # Template library
│   │   ├── widgets/                # Widget classes (43)
│   │   │   ├── Buddypress/         # BuddyPress widgets (11)
│   │   │   ├── General/            # General widgets (27)
│   │   │   ├── WooCommerce/        # WooCommerce widgets (5)
│   │   │   └── querycontrol/       # Query control helpers
│   │   ├── Plugins.php             # Widget registration
│   │   └── wbcom-essential-elementor.php
│   └── gutenberg/                  # Gutenberg blocks
│       ├── assets/css/             # Shared CSS
│       ├── blocks/                 # Block source files (45)
│       └── wbcom-gutenberg.php     # Block registration
├── scripts/                        # Build scripts
│   ├── build-blocks.js             # Production build
│   └── dev-blocks.js               # Development watch
├── loader.php                      # Autoloader
├── package.json                    # NPM configuration
└── wbcom-essential.php             # Main plugin file
```

---

## Core Components

### Main Plugin Class

**File**: `wbcom-essential.php`

Entry point that initializes:
- Version constants
- Autoloading
- License management
- Elementor integration (if Elementor active)
- Gutenberg integration (always)

### Loader

**File**: `loader.php`

Function `wbcom_essential()` returns singleton instance and initializes:
- Hooks: `wbcom_essential/init`
- Conditional loading based on active plugins

### License Management

**Directory**: `license/`

| Class | Purpose |
|-------|---------|
| `WBCOM_ESSENTIAL_License_Manager` | License activation/deactivation UI |
| `WBCOM_ESSENTIAL_License_Updater` | License status checking |
| `WBCOM_ESSENTIAL_EDD_Updater_Wrapper` | EDD SL API wrapper |
| `EDD_SL_Plugin_Updater` | Core EDD updater class |

---

## Gutenberg Blocks

### Block Categories

| Category | Slug | Block Count |
|----------|------|-------------|
| Header | `starter-header` | 4 |
| Design | `starter-design` | 14 |
| Content | `starter-content` | 8 |
| Blog | `starter-blog` | 8 |
| Marketing | `starter-marketing` | 4 |
| BuddyPress | `starter-buddypress` | 11 |
| WooCommerce | `starter-woocommerce` | 2 |

### All 45 Blocks

#### Design Blocks (14)
- `accordion` - Collapsible content sections
- `advanced-tabs` - Tabbed content panels
- `counter` - Animated number counter
- `divider` - Decorative divider
- `flip-box` - 3D flip card
- `heading` - Styled heading
- `icon-box` - Icon with text
- `progress-bar` - Animated progress bar
- `shape` - Decorative shapes
- `social-icons` - Social media icons
- `star-rating` - Star rating display
- `text-rotator` - Animated text rotation
- `timeline` - Vertical timeline
- `countdown` - Countdown timer

#### Content Blocks (8)
- `branding` - Site logo and branding
- `dropdown-button` - Button with dropdown
- `login-form` - User login form
- `portfolio-grid` - Portfolio items grid
- `pricing-table` - Pricing comparison
- `site-logo` - Site logo block
- `slider` - Image/content slider
- `smart-menu` - Mega menu navigation

#### Blog Blocks (6)
- `post-carousel` - Single post carousel
- `post-slider` - Full-width post slider
- `post-timeline` - Posts in timeline
- `posts-carousel` - Multiple posts carousel
- `posts-revolution` - Posts revolution slider
- `posts-ticker` - Scrolling posts ticker

#### Marketing Blocks (4)
- `cta-box` - Call-to-action box
- `team-carousel` - Team members carousel
- `testimonial` - Single testimonial
- `testimonial-carousel` - Testimonials carousel

#### BuddyPress Blocks (11)
- `dashboard-intro` - BuddyPress dashboard intro
- `forums` - bbPress forums list
- `forums-activity` - bbPress activity feed
- `group-carousel` - BuddyPress groups carousel
- `groups-grid` - BuddyPress groups grid
- `groups-lists` - BuddyPress groups list
- `header-bar` - Header navigation bar
- `members-carousel` - BuddyPress members carousel
- `members-grid` - BuddyPress members grid
- `members-lists` - BuddyPress members list
- `profile-completion` - BuddyPress profile progress

#### WooCommerce Blocks (2)
- `mini-cart` - Mini shopping cart
- `product-grid` - WooCommerce products grid

### Block File Structure

Each block follows this pattern:

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

### Theme Colors System

All blocks support "Use Theme Colors" toggle via CSS custom properties:

```css
/* plugins/gutenberg/assets/css/theme-colors.css */
--wbcom-color-primary
--wbcom-color-secondary
--wbcom-color-base
--wbcom-color-contrast
--wbcom-heading-color
--wbcom-text-color
--wbcom-link-color
--wbcom-card-bg
--wbcom-card-border
```

---

## Elementor Widgets

### Widget Categories

| Category | Widget Count |
|----------|--------------|
| General | 27 |
| BuddyPress | 11 |
| WooCommerce | 5 |
| **Total** | **43** |

### Widget Registration

**File**: `plugins/elementor/Plugins.php`

The `Plugin` class registers:
- Widget categories
- Individual widgets (conditional on plugin availability)
- Custom controls

### General Widgets (27)

| Widget Class | File |
|--------------|------|
| Accordion | widgets/General/Accordion.php |
| Branding | widgets/General/Branding.php |
| Countdown | widgets/General/Countdown.php |
| DropdownButton | widgets/General/DropdownButton.php |
| FlipBox | widgets/General/FlipBox.php |
| Heading | widgets/General/Heading.php |
| LoginForm | widgets/General/LoginForm.php |
| NotificationArea | widgets/General/NotificationArea.php |
| PortfolioGrid | widgets/General/PortfolioGrid.php |
| PostCarousel | widgets/General/PostCarousel.php |
| PostSlider | widgets/General/PostSlider.php |
| PostsCarousel | widgets/General/PostsCarousel.php |
| PostsRevolution | widgets/General/PostsRevolution.php |
| PostsTicker | widgets/General/PostsTicker.php |
| PostTimeline | widgets/General/PostTimeline.php |
| PricingTable | widgets/General/PricingTable.php |
| ProgressBar | widgets/General/ProgressBar.php |
| Shape | widgets/General/Shape.php |
| SiteLogo | widgets/General/SiteLogo.php |
| Slider | widgets/General/Slider.php |
| SmartMenu | widgets/General/SmartMenu.php |
| Tabs | widgets/General/Tabs.php |
| TeamCarousel | widgets/General/TeamCarousel.php |
| Testimonial | widgets/General/Testimonial.php |
| TestimonialCarousel | widgets/General/TestimonialCarousel.php |
| TextRotator | widgets/General/TextRotator.php |
| Timeline | widgets/General/Timeline.php |

### BuddyPress Widgets (11)

| Widget Class | File |
|--------------|------|
| DashboardIntro | widgets/Buddypress/DashboardIntro.php |
| Forums | widgets/Buddypress/Forums.php |
| ForumsActivity | widgets/Buddypress/ForumsActivity.php |
| GroupCarousel | widgets/Buddypress/GroupCarousel.php |
| GroupGrid | widgets/Buddypress/GroupGrid.php |
| GroupsLists | widgets/Buddypress/GroupsLists.php |
| HeaderBar | widgets/Buddypress/HeaderBar.php |
| MembersGrid | widgets/Buddypress/MembersGrid.php |
| MembersLists | widgets/Buddypress/MembersLists.php |
| MemeberCarousel | widgets/Buddypress/MemeberCarousel.php |
| ProfileCompletion | widgets/Buddypress/ProfileCompletion.php |

### WooCommerce Widgets (5)

| Widget Class | File |
|--------------|------|
| AddBanner | widgets/WooCommerce/AddBanner.php |
| CustomerReview | widgets/WooCommerce/CustomerReview.php |
| ProductTab | widgets/WooCommerce/ProductTab.php |
| UniversalProduct | widgets/WooCommerce/UniversalProduct.php |
| WcTestimonial | widgets/WooCommerce/WcTestimonial.php |

---

## REST API

### Endpoints

| Route | Method | Handler | Purpose |
|-------|--------|---------|---------|
| `wbcom-essential/v1/member-types` | GET | `wbcom_essential_get_member_types` | Get BuddyPress member types |
| `wbcom-essential/v1/group-types` | GET | `wbcom_essential_get_group_types` | Get BuddyPress group types |
| `wbcom-essential/v1/post-categories` | GET | `wbcom_essential_get_post_categories` | Get post categories |
| `wbcom-essential/v1/nav-menus` | GET | `wbcom_essential_get_nav_menus` | Get navigation menus |
| `wbcom-essential/v1/blocks` | GET | `WBCOM_Essential_Gutenberg::get_blocks` | Get registered blocks |

---

## AJAX Handlers

### License Management

| Action | Handler | File |
|--------|---------|------|
| `wbcom_essential_activate_license` | `ajax_activate_license` | license/class-wbcom-essential-license-manager.php |
| `wbcom_essential_deactivate_license` | `ajax_deactivate_license` | license/class-wbcom-essential-license-manager.php |
| `wbcom_essential_check_license` | `ajax_check_license` | license/class-wbcom-essential-license-manager.php |
| `save_license_key` | `ajax_save_license_key` | license/class-wbcom-essential-license-manager.php |

### Block Functionality

| Action | Handler | File |
|--------|---------|------|
| `wbcom_essential_ajax_login` | `wbcom_essential_ajax_login` | blocks/login-form/login-form.php |
| `buddypress_mark_notification_read` | `wbcom_essential_mark_notification_read` | blocks/header-bar/header-bar.php |

### Elementor Templates

| Action | Handler | File |
|--------|---------|------|
| `wbcom_essential_elementor_sections_get_templates` | `get_templates` | templates/classes/manager.php |
| `wbcom_essential_elementor_sections_inner_template` | `insert_inner_template` | templates/classes/manager.php |
| `wbcom_essential_dismiss_elementor_notice` | `wbcom_essential_dismiss_elementor_notice` | wbcom-essential-elementor.php |

---

## Hooks Reference

### Action Hooks

#### Core
- `wbcom_essential/init` - Plugin initialization

#### Widget Settings
- `wbcom_essential/widget/branding/settings`
- `wbcom_essential/widget/groups-grid/settings`
- `wbcom_essential/widget/groups-listing/settings`
- `wbcom_essential/widget/members-listing/settings`

#### Header Bar
- `wbcom_essential_header_user_menu_items`

#### WooCommerce
- `wbcom_addon_after_price`
- `wbcom_universal_before_title`
- `wbcom_universal_after_title`
- `wbcom_universal_before_price`
- `wbcom_universal_after_price`

### Filter Hooks

#### Templates
- `wbcom_essential_locate_template`
- `wbcom_essential/members-loop/before/template`
- `wbcom_essential/members-loop/after/template`
- `wbcom_essential/groups-loop/before/template`
- `wbcom_essential/groups-loop/after/template`

#### Login
- `wbcom_essential_login_lost_password_url`
- `wbcom_essential_login_register_url`

#### Profile
- `wbcom_essential_user_progress_formatted`

#### WooCommerce
- `wbcom_product_query_args`
- `wbcom_sale_badge_text`
- `wbcom_shop_out_of_stock_text`
- `wbcom_custom_saleflash_text`

---

## Build System

### NPM Scripts

```bash
# Production build (all blocks)
npm run build:blocks

# Development with watch
npm run dev:blocks

# Clean build directory
npm run clean:blocks
```

### Build Process

**File**: `scripts/build-blocks.js`

1. Scans `plugins/gutenberg/blocks/*/src/block.json`
2. Runs `@wordpress/scripts build` for each block
3. Outputs to `build/blocks/{block-name}/`

### Output Structure

```
build/blocks/{block-name}/
├── block.json
├── index.js
├── index.asset.php
├── style-index.css
├── style-index-rtl.css
├── render.php (if exists)
└── view.js (if exists)
```

---

## Dependencies

### PHP Requirements
- WordPress 5.8+
- PHP 7.4+
- Elementor 3.0+ (optional)
- BuddyPress (optional)
- WooCommerce (optional)

### JavaScript Dependencies

| Package | Purpose |
|---------|---------|
| `@wordpress/scripts` | Build tooling |
| `@wordpress/block-editor` | Block controls |
| `@wordpress/components` | UI components |
| `swiper` | Carousels/sliders (shared) |

### Conditional Loading

Blocks are conditionally loaded:

```php
// BuddyPress blocks - only when BP active
function_exists('buddypress')

// WooCommerce blocks - only when WC active
class_exists('WooCommerce')
```

---

## Manifest Files

Full enumeration data available in `docs/architecture/manifest/`:

- `PROGRESS.md` - Coverage tracking
- `classes.txt` - All PHP classes
- `blocks.txt` - All Gutenberg blocks
- `rest-endpoints.txt` - REST API endpoints
- `ajax-handlers.txt` - AJAX handlers
- `hooks.txt` - Action and filter hooks
