# Developer Guide

## Overview

This guide covers extending Wbcom Essential through hooks, filters, and custom block development.

---

## Plugin Architecture

```
wbcom-essential/
├── admin/                    # Admin functionality
├── assets/                   # Shared assets (CSS, JS, icons)
│   └── vendor/               # Third-party libraries
├── build/                    # Compiled Gutenberg blocks
├── includes/                 # Core functionality
├── languages/                # Translations
├── plugins/
│   ├── elementor/            # Elementor integration
│   │   ├── assets/           # Widget CSS/JS
│   │   ├── widgets/          # Widget classes
│   │   └── Plugins.php       # Widget registration
│   └── gutenberg/            # Gutenberg blocks
│       ├── blocks/           # Block source files
│       └── wbcom-gutenberg.php
└── wbcom-essential.php       # Main plugin file
```

---

## Constants

```php
// Plugin version
WBCOM_ESSENTIAL_VERSION  // '4.0.2'

// Plugin paths
WBCOM_ESSENTIAL_PATH     // /path/to/wbcom-essential/
WBCOM_ESSENTIAL_URL      // https://site.com/wp-content/plugins/wbcom-essential/

// Elementor paths
WBCOM_ESSENTIAL_ELEMENTOR_PATH  // /path/to/plugins/elementor/
WBCOM_ESSENTIAL_ELEMENTOR_URL   // URL to elementor folder
```

---

## Hooks & Filters

### Elementor Widgets

#### Register Custom Widget Category

```php
add_action( 'elementor/elements/categories_registered', function( $elements_manager ) {
    $elements_manager->add_category(
        'my-custom-category',
        [
            'title' => __( 'My Custom Widgets', 'my-plugin' ),
            'icon'  => 'fa fa-plug',
        ]
    );
} );
```

#### Modify Widget Controls

```php
add_action( 'elementor/element/wbcom-accordion/section_content/before_section_end', function( $widget, $args ) {
    $widget->add_control(
        'custom_option',
        [
            'label'   => __( 'Custom Option', 'my-plugin' ),
            'type'    => \Elementor\Controls_Manager::SWITCHER,
            'default' => 'no',
        ]
    );
}, 10, 2 );
```

#### Filter Widget Output

```php
add_filter( 'wbcom_essential_accordion_item_html', function( $html, $item, $settings ) {
    // Modify accordion item HTML
    return $html;
}, 10, 3 );
```

### Gutenberg Blocks

#### Filter Block Attributes

```php
add_filter( 'wbcom_essential_block_attributes', function( $attributes, $block_name ) {
    if ( 'wbcom-essential/accordion' === $block_name ) {
        $attributes['customAttribute'] = [
            'type'    => 'string',
            'default' => '',
        ];
    }
    return $attributes;
}, 10, 2 );
```

#### Modify Block Render Output

```php
add_filter( 'render_block_wbcom-essential/accordion', function( $block_content, $block ) {
    // Modify the block output
    return $block_content;
}, 10, 2 );
```

#### Add Custom Block Category

```php
add_filter( 'block_categories_all', function( $categories ) {
    return array_merge(
        [
            [
                'slug'  => 'my-custom-blocks',
                'title' => __( 'My Custom Blocks', 'my-plugin' ),
                'icon'  => 'admin-generic',
            ],
        ],
        $categories
    );
} );
```

### Query Filters

#### Modify Post Carousel Query

```php
add_filter( 'wbcom_essential_post_carousel_query_args', function( $args, $settings ) {
    // Add custom query parameters
    $args['meta_key'] = 'featured';
    $args['meta_value'] = '1';
    return $args;
}, 10, 2 );
```

#### Filter Members Query (BuddyPress)

```php
add_filter( 'wbcom_essential_members_query_args', function( $args, $attributes ) {
    // Modify BuddyPress members query
    $args['type'] = 'online';
    return $args;
}, 10, 2 );
```

---

## Creating Custom Blocks

### Block File Structure

```
blocks/my-block/
├── my-block.php           # PHP registration
├── src/
│   ├── block.json         # Block metadata
│   ├── index.js           # Entry point
│   ├── edit.js            # Editor component
│   ├── save.js            # Save component (or null for SSR)
│   ├── render.php         # Server-side render
│   ├── view.js            # Frontend JavaScript
│   ├── style.scss         # Frontend + editor styles
│   └── editor.scss        # Editor-only styles
```

### block.json Template

```json
{
    "$schema": "https://schemas.wp.org/trunk/block.json",
    "apiVersion": 3,
    "name": "wbcom-essential/my-block",
    "version": "1.0.0",
    "title": "My Block",
    "category": "wbcom-essential",
    "icon": "admin-generic",
    "description": "My custom block description",
    "keywords": ["custom", "block"],
    "textdomain": "wbcom-essential",
    "attributes": {
        "title": {
            "type": "string",
            "default": ""
        },
        "showIcon": {
            "type": "boolean",
            "default": true
        }
    },
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
        }
    },
    "editorScript": "file:./index.js",
    "editorStyle": "file:./index.css",
    "style": "file:./style-index.css",
    "viewScript": "file:./view.js",
    "render": "file:./render.php"
}
```

### PHP Registration

```php
<?php
/**
 * My Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Register the block.
 */
function wbcom_essential_my_block_init() {
    $build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/my-block/';
    if ( file_exists( $build_path . 'block.json' ) ) {
        register_block_type( $build_path );
    }
}
add_action( 'init', 'wbcom_essential_my_block_init' );
```

### Edit Component (edit.js)

```javascript
/**
 * My Block - Edit Component
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
    const { title, showIcon } = attributes;
    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'wbcom-essential' ) }>
                    <TextControl
                        label={ __( 'Title', 'wbcom-essential' ) }
                        value={ title }
                        onChange={ ( value ) => setAttributes( { title: value } ) }
                    />
                    <ToggleControl
                        label={ __( 'Show Icon', 'wbcom-essential' ) }
                        checked={ showIcon }
                        onChange={ ( value ) => setAttributes( { showIcon: value } ) }
                    />
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
                <div className="wbcom-essential-my-block">
                    { showIcon && <span className="icon">★</span> }
                    <h3>{ title || __( 'Enter title...', 'wbcom-essential' ) }</h3>
                </div>
            </div>
        </>
    );
}
```

### Server-Side Render (render.php)

```php
<?php
/**
 * Server-side render for My Block.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

$title     = $attributes['title'] ?? '';
$show_icon = $attributes['showIcon'] ?? true;

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wbcom-essential-my-block',
] );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
    <?php if ( $show_icon ) : ?>
        <span class="icon">★</span>
    <?php endif; ?>
    <h3><?php echo esc_html( $title ); ?></h3>
</div>
```

### Frontend JavaScript (view.js)

```javascript
/**
 * My Block - Frontend Script
 */
document.addEventListener( 'DOMContentLoaded', function() {
    const blocks = document.querySelectorAll( '.wbcom-essential-my-block' );

    blocks.forEach( function( block ) {
        // Add interactivity
        block.addEventListener( 'click', function() {
            this.classList.toggle( 'active' );
        } );
    } );
} );
```

---

## Creating Custom Elementor Widgets

### Widget Template

```php
<?php
namespace WBComEssential\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class My_Widget extends Widget_Base {

    public function get_name() {
        return 'wbcom-my-widget';
    }

    public function get_title() {
        return __( 'My Widget', 'wbcom-essential' );
    }

    public function get_icon() {
        return 'eicon-code';
    }

    public function get_categories() {
        return [ 'wbcom-essential' ];
    }

    public function get_keywords() {
        return [ 'custom', 'widget' ];
    }

    protected function register_controls() {
        // Content Section
        $this->start_controls_section(
            'section_content',
            [
                'label' => __( 'Content', 'wbcom-essential' ),
            ]
        );

        $this->add_control(
            'title',
            [
                'label'   => __( 'Title', 'wbcom-essential' ),
                'type'    => Controls_Manager::TEXT,
                'default' => __( 'My Title', 'wbcom-essential' ),
            ]
        );

        $this->end_controls_section();

        // Style Section
        $this->start_controls_section(
            'section_style',
            [
                'label' => __( 'Style', 'wbcom-essential' ),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'title_color',
            [
                'label'     => __( 'Title Color', 'wbcom-essential' ),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .my-widget-title' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->end_controls_section();
    }

    protected function render() {
        $settings = $this->get_settings_for_display();
        ?>
        <div class="wbcom-my-widget">
            <h3 class="my-widget-title">
                <?php echo esc_html( $settings['title'] ); ?>
            </h3>
        </div>
        <?php
    }
}
```

### Register Custom Widget

```php
add_action( 'elementor/widgets/register', function( $widgets_manager ) {
    require_once __DIR__ . '/widgets/class-my-widget.php';
    $widgets_manager->register( new \WBComEssential\Widgets\My_Widget() );
} );
```

---

## JavaScript APIs

### Carousel Initialization

```javascript
// Initialize Swiper carousel
const swiper = new Swiper( '.wbcom-carousel', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
} );
```

### Accordion Toggle

```javascript
// Accordion functionality
document.querySelectorAll( '.wbcom-accordion-trigger' ).forEach( trigger => {
    trigger.addEventListener( 'click', function() {
        const item = this.closest( '.wbcom-accordion-item' );
        const content = item.querySelector( '.wbcom-accordion-content' );
        const isOpen = item.classList.contains( 'active' );

        // Close others (optional)
        document.querySelectorAll( '.wbcom-accordion-item.active' )
            .forEach( i => i.classList.remove( 'active' ) );

        // Toggle current
        if ( ! isOpen ) {
            item.classList.add( 'active' );
        }
    } );
} );
```

---

## CSS Custom Properties

The plugin uses CSS custom properties for theming:

```css
:root {
    /* Colors */
    --wbcom-primary-color: #007bff;
    --wbcom-secondary-color: #6c757d;
    --wbcom-text-color: #333333;
    --wbcom-border-color: #dee2e6;

    /* Spacing */
    --wbcom-spacing-sm: 8px;
    --wbcom-spacing-md: 16px;
    --wbcom-spacing-lg: 24px;

    /* Border radius */
    --wbcom-border-radius: 4px;

    /* Transitions */
    --wbcom-transition: 0.3s ease;
}
```

Override in your theme:

```css
:root {
    --wbcom-primary-color: #ff6600;
}
```

---

## Testing

### PHPUnit Setup

```bash
# Install test dependencies
composer install --dev

# Run tests
./vendor/bin/phpunit
```

### JavaScript Testing

```bash
# Run JS tests
npm test
```

---

## Build Process

### Development

```bash
# Watch for changes
npm run dev:blocks
```

### Production

```bash
# Build all blocks
npm run build:blocks

# Create distribution
grunt dist
```

---

## Coding Standards

### PHP

- Follow [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)
- Escape all output
- Sanitize all input
- Use nonces for forms

### JavaScript

- ES6+ syntax
- Use WordPress packages (`@wordpress/element`, etc.)
- No jQuery in new blocks

### CSS

- BEM naming: `.block__element--modifier`
- Mobile-first responsive
- Prefix classes: `wbcom-essential-`
