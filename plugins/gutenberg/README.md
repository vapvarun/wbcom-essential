# WBCOM Essential Gutenberg Blocks

This directory contains the Gutenberg blocks for the WBCOM Essential plugin, built with a modern monorepo structure using npm workspaces.

## 🚀 Quick Navigation

- **[Adding New Blocks](#-adding-new-blocks)** - Step-by-step guide for developers
- **[Available Blocks](#-available-blocks)** - List of current blocks
- **[Development Workflow](#-development-workflow)** - Build and development commands
- **[Directory Structure](#-directory-structure)** - File organization
- **[Troubleshooting](#-troubleshooting)** - Common issues and solutions

## 🏗️ Architecture Overview

### NPM Workspaces
This project uses **npm workspaces** to manage multiple blocks efficiently:
- **Shared Dependencies**: All blocks share common dependencies from the root `package.json`
- **Centralized Builds**: All build outputs are collected in a single `build/blocks/` directory
- **Simplified Maintenance**: Dependencies and scripts are managed centrally

### Key Features
- ✅ **Automated Block Discovery**: Drop blocks in `blocks/` directory - they're automatically loaded
- ✅ **Centralized Builds**: All build artifacts in one location (`build/blocks/`)
- ✅ **Workspace Management**: Single `node_modules` with shared dependencies
- ✅ **Modern Tooling**: Uses `@wordpress/scripts` with latest WordPress standards
- ✅ **Clean Structure**: Source and build files are clearly separated
- ✅ **Developer-Friendly**: Comprehensive documentation and standardized patterns

## 📁 Directory Structure

```
wbcom-essential/
├── build/blocks/                    # 🏗️ Centralized build outputs
│   ├── branding/                    # Built branding block files
│   └── dropdown-button/             # Built dropdown-button block files
├── plugins/gutenberg/
│   ├── blocks/                      # 📦 Block source directories
│   │   ├── branding/
│   │   │   ├── src/                 # Source files
│   │   │   │   ├── block.json       # Block metadata & attributes
│   │   │   │   ├── index.js         # Main block registration
│   │   │   │   ├── edit.js          # Editor React component
│   │   │   │   ├── save.js          # Save component
│   │   │   │   ├── style.scss       # Frontend styles
│   │   │   │   └── editor.scss      # Editor-only styles
│   │   │   ├── branding.php         # PHP registration & render
│   │   │   ├── package.json         # Minimal block config
│   │   │   └── render.php           # Server-side rendering
│   │   └── dropdown-button/
│   │       ├── src/                 # Source files
│   │       │   ├── block.json
│   │       │   ├── index.js
│   │       │   ├── edit.js
│   │       │   ├── save.js
│   │       │   ├── style.scss
│   │       │   ├── editor.scss
│   │       │   └── view.js          # Frontend JavaScript
│   │       ├── dropdown-button.php  # PHP registration
│   │       └── package.json         # Minimal block config
│   ├── wbcom-gutenberg.php          # Main Gutenberg integration
│   └── README.md                    # This documentation
└── package.json                     # 🏠 Root workspace config
```

## 🚀 Development Workflow

### Prerequisites
- **Node.js 16+**
- **npm** (comes with Node.js)

### Quick Start
```bash
# Install all dependencies (workspace-aware)
npm install

# Build all blocks
npm run build:blocks

# Start development mode for all blocks
npm run dev:blocks
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies for root + all workspaces |
| `npm run build:blocks` | Build all blocks to `build/blocks/` |
| `npm run dev:blocks` | Start development servers for all blocks |
| `npm run clean:blocks` | Remove all build artifacts |

### Individual Block Development
```bash
# Navigate to specific block
cd plugins/gutenberg/blocks/[block-name]

# Install block-specific deps (usually not needed due to workspaces)
npm install

# Start development for this block only
npm run start

# Build this block only
npm run build
```

## 🛠️ Build System

### How It Works
1. **Source Files**: All development happens in `blocks/[name]/src/`
2. **Build Process**: `npm run build:blocks` compiles all blocks individually
3. **File Copying**: Built files are copied to centralized `build/blocks/[name]/` location
3. **Cleanup**: Individual block build directories are automatically removed
5. **PHP Registration**: Blocks register from the centralized build location

### Build Process Details
Each block uses `@wordpress/scripts` which provides:
- **ES6+ Compilation**: Modern JavaScript with webpack & Babel
- **SCSS Processing**: Sass compilation with PostCSS & Autoprefixer
- **RTL Support**: Automatic right-to-left stylesheet generation
- **Asset Management**: WordPress dependency tracking via `.asset.php` files
- **Optimization**: Minification and code splitting for production
- **Clean Builds**: Individual build artifacts are automatically cleaned up after copying to centralized location

### Build Output Structure
```
build/blocks/[block-name]/
├── block.json           # Processed block metadata
├── index.js             # Minified editor JavaScript
├── index.css            # Editor styles
├── index-rtl.css        # RTL editor styles
├── style-index.css      # Frontend styles
├── style-index-rtl.css  # RTL frontend styles
├── *.asset.php          # WordPress asset dependencies
└── view.js              # Frontend JavaScript (if used)
```

## 🆕 Adding New Blocks

This section provides a comprehensive guide for developers to add new Gutenberg blocks following WordPress standards and our monorepo architecture.

### 📋 Quick Start Checklist

- [ ] Choose block type (Static vs Dynamic)
- [ ] Plan block attributes and functionality
- [ ] Create block directory structure
- [ ] Implement block files
- [ ] Test block functionality
- [ ] Update documentation

### 🏗️ Step-by-Step Block Creation

#### Step 1: Plan Your Block
Before coding, define:
- **Block Purpose**: What problem does it solve?
- **Block Type**: Static (content saved to database) or Dynamic (server-rendered)
- **Attributes**: What data needs to be stored?
- **UI Components**: What controls appear in the editor?
- **Styling**: How should it look on frontend/backend?

#### Step 2: Create Block Directory Structure
```bash
# Create block directory
mkdir plugins/gutenberg/blocks/your-block-name

# Create source directory
mkdir plugins/gutenberg/blocks/your-block-name/src
```

#### Step 3: Create Required Files

##### 📄 `src/block.json` (Block Metadata)
```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "wbcom-essential/your-block-name",
  "version": "1.0.0",
  "title": "Your Block Title",
  "category": "wbcom-essential",
  "icon": "star-filled",
  "description": "Clear, concise description of what this block does",
  "keywords": ["keyword1", "keyword2"],
  "textdomain": "wbcom-essential",
  "attributes": {
    "content": {
      "type": "string",
      "default": ""
    },
    "alignment": {
      "type": "string",
      "enum": ["left", "center", "right"],
      "default": "left"
    }
  },
  "supports": {
    "align": ["left", "center", "right"],
    "typography": {
      "fontSize": true,
      "lineHeight": true,
      "__experimentalFontFamily": true,
      "__experimentalTextDecoration": true
    },
    "color": {
      "text": true,
      "background": true,
      "gradients": true
    },
    "spacing": {
      "margin": true,
      "padding": true
    },
    "html": false
  },
  "styles": [
    {
      "name": "default",
      "label": "Default",
      "isDefault": true
    },
    {
      "name": "alternative",
      "label": "Alternative Style"
    }
  ],
  "example": {
    "attributes": {
      "content": "Example content",
      "alignment": "center"
    }
  }
}
```

##### ⚛️ `src/index.js` (Main Block Registration)
```javascript
/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';
import './editor.scss';

// Register the block
registerBlockType(metadata.name, {
  ...metadata,
  edit: Edit,
  save,
  // Add any additional configuration here
});
```

##### 🎨 `src/edit.js` (Editor Component)
```javascript
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  InspectorControls,
  RichText,
  BlockControls,
} from '@wordpress/block-editor';
import {
  PanelBody,
  SelectControl,
  ToolbarGroup,
  ToolbarButton,
} from '@wordpress/components';

/**
 * Edit component for the block
 */
export default function Edit({ attributes, setAttributes }) {
  const { content, alignment } = attributes;
  const blockProps = useBlockProps({
    className: `wp-block-wbcom-essential-your-block align${alignment}`,
  });

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="align-left"
            title={__('Align Left', 'wbcom-essential')}
            isActive={alignment === 'left'}
            onClick={() => setAttributes({ alignment: 'left' })}
          />
          <ToolbarButton
            icon="align-center"
            title={__('Align Center', 'wbcom-essential')}
            isActive={alignment === 'center'}
            onClick={() => setAttributes({ alignment: 'center' })}
          />
          <ToolbarButton
            icon="align-right"
            title={__('Align Right', 'wbcom-essential')}
            isActive={alignment === 'right'}
            onClick={() => setAttributes({ alignment: 'right' })}
          />
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__('Settings', 'wbcom-essential')}>
          <SelectControl
            label={__('Alignment', 'wbcom-essential')}
            value={alignment}
            options={[
              { label: __('Left', 'wbcom-essential'), value: 'left' },
              { label: __('Center', 'wbcom-essential'), value: 'center' },
              { label: __('Right', 'wbcom-essential'), value: 'right' },
            ]}
            onChange={(value) => setAttributes({ alignment: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <RichText
          tagName="p"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__('Enter your content...', 'wbcom-essential')}
          allowedFormats={['core/bold', 'core/italic', 'core/link']}
        />
      </div>
    </>
  );
}
```

##### 💾 `src/save.js` (Save Component - Static Blocks)
```javascript
/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for the block
 */
export default function save({ attributes }) {
  const { content, alignment } = attributes;
  const blockProps = useBlockProps.save({
    className: `wp-block-wbcom-essential-your-block align${alignment}`,
  });

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName="p"
        value={content}
      />
    </div>
  );
}
```

##### 🎭 `src/render.php` (Server-Side Rendering - Dynamic Blocks)
```php
<?php
/**
 * Server-side rendering for the Your Block block
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_your_block($attributes) {
  // Sanitize attributes
  $content = isset($attributes['content']) ? wp_kses_post($attributes['content']) : '';
  $alignment = isset($attributes['alignment']) ? sanitize_html_class($attributes['alignment']) : 'left';

  // Build CSS classes
  $classes = array(
    'wp-block-wbcom-essential-your-block',
    'align' . $alignment,
  );

  // Generate HTML
  $html = sprintf(
    '<div class="%s"><p>%s</p></div>',
    esc_attr(implode(' ', $classes)),
    $content
  );

  return $html;
}
```

##### 🔧 `your-block-name.php` (PHP Registration)
```php
<?php
/**
 * Your Block Name Block Registration
 *
 * @package WBCOM_Essential
 * @since 1.0.0
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
  exit;
}

/**
 * Register the Your Block Name block
 *
 * @return bool|WP_Block_Type|false The registered block type on success, or false on failure.
 */
function wbcom_essential_register_your_block() {
  // Define the build path for this block
  $build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/your-block-name/';

  // Check if the block.json file exists (block is built)
  if (file_exists($build_path . 'block.json')) {
    // Register the block from the build directory
    $result = register_block_type($build_path);

    // For dynamic blocks, register the render callback
    if (function_exists('wbcom_essential_render_your_block')) {
      register_block_type('wbcom-essential/your-block-name', array(
        'render_callback' => 'wbcom_essential_render_your_block',
      ));
    }

    return $result;
  }

  return false;
}

// Hook into WordPress init action with priority 10
add_action('init', 'wbcom_essential_register_your_block', 10);
```

##### 📦 `package.json` (Block Configuration)
```json
{
  "name": "block-your-block-name",
  "version": "1.0.0",
  "description": "Your block description for the WBCOM Essential plugin",
  "author": "WBCOM Essential Team",
  "license": "GPL-2.0-or-later",
  "main": "build/index.js",
  "scripts": {
    "build": "wp-scripts build --webpack-copy-php",
    "start": "wp-scripts start --blocks-manifest",
    "lint:js": "wp-scripts lint-js",
    "lint:css": "wp-scripts lint-style",
    "format": "wp-scripts format"
  },
  "keywords": [
    "wordpress",
    "gutenberg",
    "block",
    "wbcom-essential"
  ],
  "wp-env": {
    "plugin-dir": "wbcom-essential",
    "plugin-name": "WBCOM Essential"
  }
}
```

#### Step 4: Add Styling Files

##### 🎨 `src/style.scss` (Frontend Styles)
```scss
// Frontend styles for Your Block
.wp-block-wbcom-essential-your-block {
  // Base styles
  margin-bottom: 1em;

  // Alignment classes
  &.alignleft {
    text-align: left;
  }

  &.aligncenter {
    text-align: center;
  }

  &.alignright {
    text-align: right;
  }

  // Content styles
  p {
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    color: inherit;
  }

  // Alternative style variant
  &.is-style-alternative {
    background: #f0f0f0;
    padding: 1em;
    border-radius: 4px;
  }
}
```

##### 🎨 `src/editor.scss` (Editor-Only Styles)
```scss
// Editor-only styles for Your Block
.wp-block-wbcom-essential-your-block {
  // Editor-specific styles
  border: 1px dashed #ccc;
  padding: 1em;

  // Placeholder styles
  .components-placeholder {
    min-height: 100px;
  }

  // Rich text editor styles
  .block-editor-rich-text__editable {
    outline: none;
  }
}
```

#### Step 5: Build and Test

```bash
# Build the new block
npm run build:blocks

# Or build just this block
cd plugins/gutenberg/blocks/your-block-name
npm run build

# Start development mode
npm run dev:blocks
```

#### Step 6: Automatic Block Loading

The `wbcom-gutenberg.php` file automatically:
- **Discovers** all blocks in the `blocks/` directory
- **Includes** `[block-name].php` registration files
- **Loads** `render.php` files for dynamic blocks
- **Registers** the "Wbcom Essential" block category

**No manual updates needed!** Just create your block files and rebuild.

#### Step 7: Verify Block Registration

1. **Check Block Appears**: The block should appear in the "WBCOM Essential" category
2. **Test Functionality**: Add the block to a post and test all features
3. **Check Frontend**: Publish and verify frontend rendering
4. **Test Responsiveness**: Ensure it works on mobile devices
5. **Verify Console**: Check browser console for any JavaScript errors

### 🏷️ Block Types & Patterns

#### Static Blocks (Content Saved to Database)
- **Use Case**: Blocks with fixed content structure
- **Examples**: Buttons, quotes, call-to-action blocks
- **Files Required**: `edit.js`, `save.js`
- **Pros**: Faster, content stored in post_content
- **Cons**: Content structure changes require migration

#### Dynamic Blocks (Server-Side Rendering)
- **Use Case**: Blocks with dynamic content or complex logic
- **Examples**: Latest posts, user profiles, custom queries
- **Files Required**: `edit.js`, `render.php`
- **Pros**: Flexible, can change output without migration
- **Cons**: Slightly slower, requires PHP knowledge

#### Interactive Blocks (Frontend JavaScript)
- **Use Case**: Blocks needing client-side interactivity
- **Examples**: Forms, sliders, interactive charts
- **Files Required**: `edit.js`, `save.js`, `view.js`
- **Additional**: Add `"viewScript": "file:./view.js"` to block.json

### 📚 WordPress Standards Compliance

#### Naming Conventions
- **Block Name**: `wbcom-essential/your-block-name`
- **Functions**: `wbcom_essential_your_function_name`
- **Classes**: `wp-block-wbcom-essential-your-block`
- **Files**: `kebab-case.php`, `camelCase.js`

#### Security Best Practices
- **Escape Output**: Use `esc_attr()`, `esc_html()`, `wp_kses_post()`
- **Sanitize Input**: Use `sanitize_text_field()`, `wp_kses_post()`
- **Validate Data**: Check data types and ranges
- **Nonces**: Use for AJAX requests and form submissions

#### Accessibility Standards
- **Semantic HTML**: Use appropriate HTML elements
- **ARIA Labels**: Add when needed for screen readers
- **Keyboard Navigation**: Ensure all interactive elements work with keyboard
- **Color Contrast**: Meet WCAG 2.1 AA standards
- **Focus Management**: Proper focus indicators and management

#### Performance Guidelines
- **Bundle Size**: Keep JavaScript bundles under 100KB
- **Lazy Loading**: Use for heavy components
- **Code Splitting**: Split large blocks into chunks
- **Image Optimization**: Compress and serve appropriate sizes

### 🧪 Testing Checklist

- [ ] Block appears in block inserter
- [ ] Block can be added to posts/pages
- [ ] All attributes save correctly
- [ ] Frontend renders properly
- [ ] Responsive design works
- [ ] Accessibility standards met
- [ ] Cross-browser compatibility
- [ ] Performance benchmarks met

### 📖 Advanced Patterns

#### Using WordPress Data Stores
```javascript
import { useSelect, useDispatch } from '@wordpress/data';

function Edit({ attributes, setAttributes }) {
  const { posts } = useSelect((select) => ({
    posts: select('core').getEntityRecords('postType', 'post', { per_page: 10 }),
  }), []);

  // Use posts data in your component
}
```

#### Custom Block Variations
```javascript
import { registerBlockVariation } from '@wordpress/blocks';

registerBlockVariation('wbcom-essential/your-block', {
  name: 'special-layout',
  title: 'Special Layout',
  attributes: {
    layout: 'special',
  },
});
```

#### Block Transforms
```javascript
import { createBlock } from '@wordpress/blocks';

transforms: {
  from: [
    {
      type: 'block',
      blocks: ['core/paragraph'],
      transform: (attributes) => {
        return createBlock('wbcom-essential/your-block', {
          content: attributes.content,
        });
      },
    },
  ],
},
```

### 🔗 Resources for Block Development

- [Official Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)
- [Components Reference](https://github.com/WordPress/gutenberg/tree/trunk/packages/components)
- [Data Module Documentation](https://developer.wordpress.org/block-editor/reference-guides/data/)
- [Block Patterns Directory](https://wordpress.org/patterns/)

## Available Blocks

WBcom Essential ships **35 Gutenberg blocks** in 7 inserter categories. Each block's `block.json` in `src/blocks/<slug>/` is the source of truth; this list is generated from those files.

### Design Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### Content Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### Blog Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### Marketing Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### BuddyPress Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### WooCommerce Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### Easy Digital Downloads Blocks (0)

| Block | Slug | Description |
|-------|------|-------------|

### essential-buddypress Blocks (5)

| Block | Slug | Description |
|-------|------|-------------|
| **Activity Feed** | `activity-feed` | Premium BuddyPress activity stream with card layout, type icons, human-readable timestamps, and interaction counts. |
| **Group Carousel** | `group-carousel` | Display BuddyPress groups in an interactive Swiper carousel with configurable slides, autoplay, and card styles. |
| **Groups Grid** | `groups-grid` | Display BuddyPress groups in a responsive grid layout. |
| **Members Carousel** | `members-carousel` | Display BuddyPress members in an interactive Swiper carousel. |
| **Members Grid** | `members-grid` | Display BuddyPress members in a responsive grid layout. |

### essential-blog Blocks (3)

| Block | Slug | Description |
|-------|------|-------------|
| **Category Grid** | `category-grid` | Display WordPress categories in a customizable grid layout with images, post counts, and hover effects. |
| **Post Carousel** | `post-carousel` | Display WordPress posts in a carousel, slider, or grid with category filter and flexible card design. |
| **Posts Ticker** | `posts-ticker` | Horizontally scrolling news ticker with configurable speed, direction, label, and separator styles. |

### essential-marketing Blocks (7)

| Block | Slug | Description |
|-------|------|-------------|
| **Countdown Timer** | `countdown-timer` | Animated live countdown to a target date and time with expiry message. |
| **CTA Section** | `cta` | Call-to-action section with heading, description, and a single CTA button. Supports stacked and inline layouts. |
| **Feature Grid** | `feature-grid` | Display feature cards in a responsive grid with icon/emoji, title, and description. Supports elevated, bordered, and flat card styles. |
| **Hero Section** | `hero` | Full-width hero section with gradient or image background, heading, subheading, and two CTA buttons. |
| **Pricing Table** | `pricing-table` | Pricing comparison table with 1–4 plan columns, featured plan highlighting, and per-plan CTA buttons. |
| **Promo Banner** | `promo-banner` | Promotional image banner with text overlay and CTA button. Supports overlay and split layout styles. |
| **Testimonial Carousel** | `testimonial-carousel` | Testimonial quotes in a Swiper.js carousel with dots, arrows, and autoplay. |

### essential-woocommerce Blocks (3)

| Block | Slug | Description |
|-------|------|-------------|
| **Customer Reviews** | `customer-reviews` | Display WooCommerce product reviews in a Swiper carousel with avatar, star rating, reviewer name, and product link. |
| **Product Carousel** | `product-carousel` | Display WooCommerce products in a Swiper carousel with autoplay, navigation arrows, dots, and responsive slides-per-view. |
| **Product Grid** | `product-grid` | Display WooCommerce products in a responsive CSS Grid with category filter, sale badge, star rating, and add-to-cart button. |

### essential-edd Blocks (8)

| Block | Slug | Description |
|-------|------|-------------|
| **EDD Account Dashboard** | `edd-account-dashboard` | A unified My Account dashboard for Easy Digital Downloads with sidebar navigation, orders, downloads, licenses, and subscriptions. |
| **EDD Enhanced Checkout (legacy)** | `edd-checkout-enhanced` | Legacy wrapper kept only so pages saved before 4.7.0 keep rendering. Use the EDD Checkout block with the Wbcom checkout sections inside it instead. |
| **EDD Checkout Progress** | `edd-checkout-progress` | Four-step checkout progress indicator. Designed for the EDD Checkout block, but placeable anywhere. |
| **EDD Checkout Recommendations** | `edd-checkout-recommendations` | Customers Also Purchased suggestions based on the cart. Designed for the EDD Checkout block; renders nothing when the cart is empty. |
| **EDD Checkout Social Proof** | `edd-checkout-social` | Trustpilot rating and customer reviews shown as social proof. Designed for the EDD Checkout block, but works on product and landing pages too. |
| **EDD Checkout Trust Badges** | `edd-checkout-trust` | Security, guarantee and support badges plus accepted-payment icons. Designed for the EDD Checkout block, but placeable anywhere. |
| **EDD Order Success** | `edd-order-success` | Display a purchase confirmation page with a success header, order receipt, and next steps for customers. |
| **Product Catalog** | `product-catalog` | An AJAX-powered product grid with category, price, and search filters for EDD products. |

### essential-content Blocks (5)

| Block | Slug | Description |
|-------|------|-------------|
| **FAQ Accordion** | `faq-accordion` | Collapsible Q&A accordion with JSON-LD FAQPage schema output for SEO. |
| **Login Form** | `login-form` | WordPress login form with customisable colours, redirect URL, and optional register/lost-password links. |
| **Portfolio Grid** | `portfolio-grid` | Filterable portfolio or project grid with category tabs, hover effects, and responsive columns. |
| **Tabs** | `tabs` | Click-to-switch tabbed content panels with underline or boxed styles. Fully ARIA-compliant. |
| **Timeline** | `timeline` | Vertical timeline with alternating sides, icon dots, and date labels. |

### essential-design Blocks (4)

| Block | Slug | Description |
|-------|------|-------------|
| **Flip Box** | `flip-box` | 3D card that flips on hover to reveal a back face with title, description, and button. |
| **Progress Bar** | `progress-bar` | Animated horizontal progress bars that trigger on scroll. Display skills, goals, or any percentage-based data. |
| **Stats Counter** | `stats-counter` | Animated count-up numbers that trigger on scroll. Display up to 6 stats in a responsive grid. |
| **Text Rotator** | `text-rotator` | Animated rotating text with fade, slide, or typewriter effects. Ideal for hero sections and taglines. |

---

### Theme Colors

Only the **Category Grid** block has a **Use Theme Colors** toggle. Several blocks read `--wbcom-*` CSS custom properties (`--wbcom-color-primary`, `--wbcom-card-bg`, `--wbcom-link-color`, `--wbcom-heading-color`, `--wbcom-text-color`) with built-in fallbacks, so a theme that defines them recolours those blocks.

---

### Adding New Blocks

When creating a new block:

1. Follow the step-by-step guide in the [Adding New Blocks](#-adding-new-blocks) section
2. Update this README with the block's purpose and key features

## 🔧 PHP Integration

### Automatic Loading
The `wbcom-gutenberg.php` file automatically:
- Discovers all blocks in `blocks/` directory
- Includes `[block-name].php` files
- Includes `render.php` files for dynamic blocks
- Registers the "Wbcom Essential" block category

### Block Registration
Each block's PHP file:
- Registers the block using `register_block_type($build_path)`
- Points to the centralized build directory
- WordPress automatically enqueues assets based on `block.json`
- Supports server-side rendering for dynamic blocks

## 🎨 Development Guidelines

### Code Style
- Use ES6+ JavaScript features
- Follow WordPress coding standards for PHP
- Use SCSS for styling with BEM methodology
- Include JSDoc comments for functions

### Component Patterns
- Use functional components with hooks
- Follow WordPress component guidelines
- Implement proper prop validation
- Use WordPress data stores when needed

### Accessibility
- Follow WCAG 2.1 guidelines
- Use semantic HTML elements
- Implement proper ARIA attributes
- Test with keyboard navigation

### Performance
- Minimize bundle sizes
- Use code splitting when appropriate
- Optimize images and assets
- Implement lazy loading where beneficial

## 🐛 Troubleshooting

### Block Not Appearing
1. Check if block is built: `ls build/blocks/[block-name]/`
2. Verify PHP registration file exists and is loaded
3. Check browser console for JavaScript errors
4. Ensure block category is registered

### Build Errors
1. Clear node_modules: `rm -rf node_modules && npm install`
2. Clear build directory: `npm run clean:blocks`
3. Check for syntax errors in source files
4. Verify @wordpress/scripts version compatibility

### Development Mode Issues
1. Ensure port 3000+ range is available
2. Check for conflicting development servers
3. Verify source file changes are saved

## 📚 Additional Resources

- [WordPress Block Editor Handbook](https://developer.wordpress.org/block-editor/)
- [Gutenberg Components Reference](https://github.com/WordPress/gutenberg/tree/trunk/packages/components)
- [@wordpress/scripts Documentation](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/)
- [Block API Reference](https://developer.wordpress.org/block-editor/reference-guides/block-api/)

---

**Last Updated**: January 2025
**Version**: 4.2.0
**Maintained by**: WBCOM Designs
**Block Development Standards**: WordPress Gutenberg Best Practices