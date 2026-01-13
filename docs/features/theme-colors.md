# Theme Colors Guide

All 45 Gutenberg blocks in WBcom Essential support automatic theme color inheritance. This guide shows you how to use this feature to keep your site visually consistent.

## What Are Theme Colors?

Theme Colors is a toggle that makes blocks automatically use your theme's color scheme instead of custom colors. When enabled:

- Block text uses your theme's text color
- Block backgrounds use your theme's background color
- Accent colors match your theme's primary color
- Buttons follow your theme's button styling

This means you can add blocks without manually matching colors every time.

---

## How to Enable Theme Colors

### Step 1: Add a Block

1. Edit a page or post
2. Click **+** to add a block
3. Search for any "Starter Pack" block
4. Add it to your content

### Step 2: Find the Toggle

1. Select the block you just added
2. Look at the right sidebar (Block settings)
3. Find the **Color Settings** panel
4. You'll see a toggle labeled **Use Theme Colors**

### Step 3: Enable the Toggle

1. Turn on **Use Theme Colors**
2. The block immediately updates to use your theme's colors
3. Custom color pickers become disabled (they're not needed)

---

## When to Use Theme Colors

### Use Theme Colors When:

| Scenario | Why It Helps |
|----------|--------------|
| Building a consistent site | All blocks match automatically |
| Using a theme with defined colors | Blocks inherit those colors |
| Working with Full Site Editing | Colors stay consistent across templates |
| Creating reusable patterns | Patterns adapt to any theme |

### Use Custom Colors When:

| Scenario | Why It's Better |
|----------|-----------------|
| Creating a standout section | Custom colors draw attention |
| Building a sale banner | Red/orange for urgency |
| Matching a specific brand element | Exact hex values needed |
| Creating contrast sections | Different from main theme |

---

## Theme Color Variables

When you enable theme colors, blocks use CSS custom properties. Here's what each variable controls:

### Primary Colors

| Variable | What It Affects | Default |
|----------|-----------------|---------|
| `--wbcom-color-primary` | Buttons, links, accents | `#0073aa` |
| `--wbcom-color-secondary` | Secondary buttons, badges | `#6c757d` |

### Background Colors

| Variable | What It Affects | Default |
|----------|-----------------|---------|
| `--wbcom-color-base` | Main backgrounds | `#ffffff` |
| `--wbcom-color-base-2` | Secondary backgrounds | `#f8f9fa` |
| `--wbcom-card-bg` | Card backgrounds | Same as base |

### Text Colors

| Variable | What It Affects | Default |
|----------|-----------------|---------|
| `--wbcom-color-contrast` | Primary text | `#212529` |
| `--wbcom-color-contrast-2` | Secondary text | `#495057` |
| `--wbcom-heading-color` | Headings | Inherit from contrast |
| `--wbcom-text-color` | Body text | Inherit from contrast |
| `--wbcom-link-color` | Links | Same as primary |

### Button Colors

| Variable | What It Affects | Default |
|----------|-----------------|---------|
| `--wbcom-button-bg` | Button background | Same as contrast |
| `--wbcom-button-text` | Button text | Same as base |
| `--wbcom-button-hover-bg` | Button hover state | Same as primary |

### Border Colors

| Variable | What It Affects | Default |
|----------|-----------------|---------|
| `--wbcom-card-border` | Card borders | `#dddddd` |

---

## Setting Up Your Theme

For best results, define these CSS variables in your theme. Add this to your theme's CSS or Customizer:

```css
:root {
  /* Primary colors */
  --wbcom-color-primary: #your-primary-color;
  --wbcom-color-secondary: #your-secondary-color;

  /* Background colors */
  --wbcom-color-base: #ffffff;
  --wbcom-color-base-2: #f5f5f5;

  /* Text colors */
  --wbcom-color-contrast: #333333;
  --wbcom-color-contrast-2: #666666;

  /* Headings */
  --wbcom-heading-color: #222222;

  /* Buttons */
  --wbcom-button-bg: #333333;
  --wbcom-button-text: #ffffff;
  --wbcom-button-hover-bg: #your-primary-color;

  /* Cards */
  --wbcom-card-bg: #ffffff;
  --wbcom-card-border: #e0e0e0;
}
```

Replace the color values with your brand colors.

---

## Block-by-Block Examples

### Pricing Table

**Without Theme Colors:**
- Manually set header color, price color, feature text, button colors
- 6+ color decisions per table

**With Theme Colors:**
- Enable toggle
- Header uses `--wbcom-color-primary`
- Text uses `--wbcom-color-contrast`
- Button uses `--wbcom-button-bg`
- Done

### Members Grid (BuddyPress)

**Without Theme Colors:**
- Set card background, name color, role color, button colors
- Match to existing theme manually

**With Theme Colors:**
- Enable toggle
- Cards use `--wbcom-card-bg`
- Names use `--wbcom-heading-color`
- Buttons use `--wbcom-button-bg`
- Instant consistency

### Product Grid (WooCommerce)

**Without Theme Colors:**
- Set product title color, price color, sale badge, button colors
- Risk of mismatched add-to-cart button

**With Theme Colors:**
- Enable toggle
- Titles use `--wbcom-heading-color`
- Prices use `--wbcom-color-contrast`
- Sale badges use `--wbcom-color-primary`
- Add to cart matches theme buttons

---

## Troubleshooting

### Colors Not Changing

1. **Check if toggle is on** - Select the block and verify the toggle is enabled
2. **Clear cache** - Caching plugins may serve old CSS
3. **Check theme variables** - Your theme may not define the CSS variables

### Colors Look Wrong

1. **Check variable definitions** - Make sure your theme defines the variables correctly
2. **Check specificity** - Some themes have CSS that overrides the variables
3. **Inspect in browser** - Use DevTools to see which CSS is being applied

### Toggle Not Appearing

1. **Update the plugin** - Theme colors requires v4.0.2 or later
2. **Check block type** - Only "Starter Pack" blocks have this feature
3. **Try another block** - If one block has issues, try a different one

---

## Best Practices

### Do:

- Enable theme colors on most blocks for consistency
- Define CSS variables in your theme for best results
- Test with both light and dark backgrounds
- Preview on mobile devices

### Don't:

- Mix theme colors and custom colors randomly
- Forget to define fallback colors in your CSS
- Ignore contrast ratios for accessibility

---

## Compatibility

Theme Colors works best with themes that define CSS custom properties. Compatible themes include:

- BuddyX and BuddyX Pro
- Starter Templates Theme
- Most modern block themes
- Any theme with CSS custom property support

For older themes without CSS variables, blocks will use sensible fallback colors.
