# Wbcom Essential - Theme Color Integration

## Overview

This document outlines the architecture for automatic theme color integration in Wbcom Essential blocks. The system allows blocks to automatically inherit colors from any WordPress theme's `theme.json` color palette, ensuring visual consistency across BuddyX, BuddyX Pro, Reign, and any future FSE-compatible theme.

---

## Problem Statement

Wbcom Essential blocks previously used hardcoded colors:
- Buttons: `#1d76da` (blue)
- Text: `#122B46` (dark blue)
- Meta text: `#6c757d` (gray)
- Card backgrounds: `#ffffff` (white)

This caused visual inconsistency when blocks were used on themes with different color schemes (e.g., warm beige/cream colors in BuddyX Pro vs. blue tones in Reign).

---

## Solution Architecture

### Three-Layer CSS Variable System

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: WordPress theme.json Colors                       │
│  --wp--preset--color--primary                               │
│  --wp--preset--color--secondary                             │
│  --wp--preset--color--contrast                              │
│  --wp--preset--color--base                                  │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 2: Wbcom Essential Bridge Variables                  │
│  --wbcom-color-primary: var(--wp--preset--color--primary)   │
│  --wbcom-button-bg: var(--wbcom-color-primary)              │
│  --wbcom-card-bg: var(--wbcom-color-base)                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│  Layer 3: Block-Specific Variables                          │
│  .wbcom-essential-members-grid { --card-bg: ... }           │
│  .wbcom-essential-login-form { --button-bg-color: ... }     │
└─────────────────────────────────────────────────────────────┘
```

### File Structure

```
plugins/gutenberg/
├── assets/
│   └── css/
│       ├── blocks-reset.css      # Existing reset styles
│       └── theme-colors.css      # NEW: Theme color bridge
└── wbcom-gutenberg.php           # Enqueues both CSS files
```

---

## Supported Theme Color Slugs

The system maps to WordPress theme.json color palette slugs:

| Slug | Purpose | Fallback |
|------|---------|----------|
| `primary` | Primary brand color (buttons, links) | `#0073aa` |
| `secondary` | Secondary accent color | `#005177` |
| `contrast` | High contrast (headings, primary text) | `#1a1a1a` |
| `contrast-2` | Secondary contrast (meta text) | `#636363` |
| `contrast-3` | Tertiary contrast (subtle text) | `#8c8c8c` |
| `base` | Light background (cards, containers) | `#ffffff` |
| `base-2` | Alternate light background | `#f5f5f5` |
| `base-3` | Input backgrounds | `#f0f0f0` |
| `neutral` | Neutral gray tones | `#6b7280` |
| `accent-1` | Accent color 1 | `#0073aa` |
| `accent-2` | Accent color 2 | `#005177` |
| `accent-3` | Accent color 3 | `#4caf50` |
| `success` | Success states | `#4caf50` |
| `error` | Error states | `#dc3545` |
| `warning` | Warning states | `#ffc107` |

---

## Theme Compatibility

### BuddyX Pro
Has Theme_Json_Bridge component that syncs Kirki customizer colors to `theme.json`:
- Primary customizer color → `--wp--preset--color--primary`
- Works automatically with this system

### BuddyX (Free)
Uses standard `theme.json` color palette:
- Add color slugs to match the expected slugs above

### Reign Theme
Uses standard `theme.json` color palette:
- Add color slugs to match the expected slugs above

### Generic FSE Themes
Any theme providing `theme.json` colors will work automatically.

---

## Implementation Guide

### For New Blocks

When creating new blocks, follow this pattern in `style.scss`:

```scss
// style.scss - Use CSS custom properties
.wbcom-essential-{block-name} {
    // Reference bridge variables (defined in theme-colors.css)
    --card-bg: var(--wbcom-card-bg);
    --card-border: var(--wbcom-border-color);
    --heading-color: var(--wbcom-heading-color);
    --text-color: var(--wbcom-text-color);
    --meta-color: var(--wbcom-meta-color);
    --button-bg: var(--wbcom-button-bg);
    --button-text: var(--wbcom-button-text);
    --button-hover-bg: var(--wbcom-button-hover-bg);
    --link-color: var(--wbcom-link-color);

    // Use the variables
    background: var(--card-bg);
    color: var(--text-color);

    .heading {
        color: var(--heading-color);
    }

    .meta {
        color: var(--meta-color);
    }

    .button {
        background: var(--button-bg);
        color: var(--button-text);

        &:hover {
            background: var(--button-hover-bg);
        }
    }
}
```

### For Existing Blocks (Retrofit)

1. **Identify hardcoded colors** in the block's `style.scss`
2. **Replace with CSS variables** using the bridge variable names
3. **Add block-specific mapping** in `theme-colors.css` if needed

Example retrofit:

```scss
// BEFORE (hardcoded)
.wbcom-essential-login-form {
    button {
        background: #1d76da;
        color: #ffffff;
    }
}

// AFTER (theme-aware)
.wbcom-essential-login-form {
    button {
        background: var(--button-bg-color, var(--wbcom-button-bg));
        color: var(--button-text-color, var(--wbcom-button-text));
    }
}
```

---

## Bridge Variables Reference

### Global Bridge Variables (theme-colors.css)

```css
:root,
.editor-styles-wrapper {
    /* Primary colors */
    --wbcom-color-primary: var(--wp--preset--color--primary, #0073aa);
    --wbcom-color-secondary: var(--wp--preset--color--secondary, #005177);

    /* Text colors */
    --wbcom-heading-color: var(--wp--preset--color--contrast, #1a1a1a);
    --wbcom-text-color: var(--wp--preset--color--contrast-2, #636363);
    --wbcom-meta-color: var(--wp--preset--color--contrast-3, #8c8c8c);

    /* Background colors */
    --wbcom-card-bg: var(--wp--preset--color--base, #ffffff);
    --wbcom-card-bg-alt: var(--wp--preset--color--base-2, #f5f5f5);
    --wbcom-input-bg: var(--wp--preset--color--base-3, #f0f0f0);

    /* Interactive colors */
    --wbcom-button-bg: var(--wbcom-color-primary);
    --wbcom-button-text: #ffffff;
    --wbcom-button-hover-bg: var(--wbcom-color-secondary);
    --wbcom-link-color: var(--wbcom-color-primary);
    --wbcom-link-hover-color: var(--wbcom-color-secondary);

    /* Border colors */
    --wbcom-border-color: var(--wp--preset--color--base-2, #e5e7eb);
    --wbcom-border-color-alt: var(--wp--preset--color--contrast-3, #d1d5db);

    /* Status colors */
    --wbcom-success-color: var(--wp--preset--color--success, #4caf50);
    --wbcom-error-color: var(--wp--preset--color--error, #dc3545);
    --wbcom-warning-color: var(--wp--preset--color--warning, #ffc107);
}
```

---

## Block-Specific Mappings

Each block's existing CSS variables are mapped to bridge variables:

### Members Grid Block
```css
.wbcom-essential-members-grid {
    --card-bg: var(--wbcom-card-bg);
    --card-border: var(--wbcom-border-color);
    --name-color: var(--wbcom-heading-color);
    --meta-color: var(--wbcom-meta-color);
    --button-bg: var(--wbcom-button-bg);
    --button-color: var(--wbcom-button-text);
    --button-hover-bg: var(--wbcom-button-hover-bg);
}
```

### Groups Grid Block
```css
.wbcom-essential-groups-grid {
    --card-bg: var(--wbcom-card-bg);
    --card-border: var(--wbcom-border-color);
    --name-color: var(--wbcom-heading-color);
    --type-color: var(--wbcom-meta-color);
    --count-color: var(--wbcom-text-color);
    --button-bg: var(--wbcom-button-bg);
    --button-color: var(--wbcom-button-text);
}
```

### Login Form Block
```css
.wbcom-essential-login-form-wrapper {
    --button-bg-color: var(--wbcom-button-bg);
    --button-text-color: var(--wbcom-button-text);
    --button-hover-bg-color: var(--wbcom-button-hover-bg);
    --input-bg-color: var(--wbcom-input-bg);
    --input-border-color: var(--wbcom-border-color);
    --label-color: var(--wbcom-text-color);
    --link-color: var(--wbcom-link-color);
}
```

---

## Theme Requirements

For themes to be fully compatible, they should define these colors in `theme.json`:

```json
{
  "settings": {
    "color": {
      "palette": [
        { "slug": "primary", "color": "#...", "name": "Primary" },
        { "slug": "secondary", "color": "#...", "name": "Secondary" },
        { "slug": "contrast", "color": "#...", "name": "Contrast" },
        { "slug": "contrast-2", "color": "#...", "name": "Contrast 2" },
        { "slug": "contrast-3", "color": "#...", "name": "Contrast 3" },
        { "slug": "base", "color": "#...", "name": "Base" },
        { "slug": "base-2", "color": "#...", "name": "Base 2" },
        { "slug": "base-3", "color": "#...", "name": "Base 3" }
      ]
    }
  }
}
```

---

## Testing Checklist

### Visual Consistency
- [ ] Buttons match theme primary color
- [ ] Headings match theme contrast color
- [ ] Card backgrounds match theme base color
- [ ] Links match theme link color
- [ ] Borders match theme border color

### Theme Testing
- [ ] BuddyX Pro with customizer colors
- [ ] BuddyX free with default colors
- [ ] Reign with default colors
- [ ] Twenty Twenty-Four (standard FSE theme)

### Block Testing
- [ ] members-grid
- [ ] groups-grid
- [ ] login-form
- [ ] member-profile-card
- [ ] profile-completion
- [ ] xprofile-fields
- [ ] (all other blocks)

### Editor Testing
- [ ] Colors work in block editor preview
- [ ] Colors work in Site Editor
- [ ] No FOUC (flash of unstyled content)

---

## Migration Plan for Existing Blocks

### Phase 1: Core BuddyPress Blocks (Done)
- [x] members-grid
- [x] groups-grid
- [x] login-form
- [x] member-profile-card
- [x] profile-completion
- [x] xprofile-fields

### Phase 2: General Blocks
- [ ] accordion
- [ ] advanced-tabs
- [ ] branding
- [ ] dropdown-button
- [ ] heading
- [ ] post-carousel
- [ ] slider
- [ ] smart-menu

### Phase 3: Future Blocks
- All new blocks must use bridge variables from day one

---

## Filter Hooks (Future)

For advanced customization, these filters will be added:

```php
/**
 * Modify bridge variable mappings.
 *
 * @param array $mappings CSS variable mappings.
 * @return array Modified mappings.
 */
add_filter( 'wbcom_essential_color_mappings', function( $mappings ) {
    // Custom mapping
    $mappings['--wbcom-color-primary'] = 'var(--my-custom-primary)';
    return $mappings;
} );

/**
 * Add additional CSS for theme compatibility.
 *
 * @param string $css Additional CSS.
 * @return string Modified CSS.
 */
add_filter( 'wbcom_essential_theme_colors_css', function( $css ) {
    $css .= '.my-custom-override { ... }';
    return $css;
} );
```

---

## Troubleshooting

### Colors Not Updating

1. Check if theme defines the expected color slugs in `theme.json`
2. Clear any CSS caching (plugin or CDN)
3. Verify `theme-colors.css` is loading (check Network tab)
4. Check CSS specificity - theme styles might be overriding

### Editor vs Frontend Mismatch

1. Ensure `.editor-styles-wrapper` selector is included
2. Check if editor-specific styles are overriding
3. Verify block styles load in both contexts

### Fallback Colors Showing

1. Theme may not have the expected color slug
2. Add missing slugs to theme's `theme.json`
3. Or update fallback colors in `theme-colors.css`

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-12-28 | Initial implementation |

---

## Related Files

- `/plugins/gutenberg/assets/css/theme-colors.css` - Main bridge CSS
- `/plugins/gutenberg/wbcom-gutenberg.php` - Enqueue logic
- `/docs/BLOCK-SPECS-ACTIVITY-SITEWIDE-NOTICE.md` - New block specs with color integration
