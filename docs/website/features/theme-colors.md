# Theme Colors

Theme Colors Guide

All 45 Gutenberg blocks in WBcom Essential support automatic theme color inheritance. This guide shows you how to use this feature to keep your site visually consistent.

What Are Theme Colors?

Theme Colors is a toggle that makes blocks automatically use your theme's color scheme instead of custom colors. When enabled:

Block text uses your theme's text color
Block backgrounds use your theme's background color
Accent colors match your theme's primary color
Buttons follow your theme's button styling

This means you can add blocks without manually matching colors every time.

How to Enable Theme Colors

Step 1: Add a Block

Edit a page or post
Click + to add a block
Search for any "Starter Pack" block
Add it to your content

Step 2: Find the Toggle

Select the block you just added
Look at the right sidebar (Block settings)
Find the Color Settings panel
You'll see a toggle labeled Use Theme Colors

Step 3: Enable the Toggle

Turn on Use Theme Colors
The block immediately updates to use your theme's colors
Custom color pickers become disabled (they're not needed)

When to Use Theme Colors

Use Theme Colors When:

ScenarioWhy It HelpsBuilding a consistent siteAll blocks match automaticallyUsing a theme with defined colorsBlocks inherit those colorsWorking with Full Site EditingColors stay consistent across templatesCreating reusable patternsPatterns adapt to any theme

Use Custom Colors When:

ScenarioWhy It's BetterCreating a standout sectionCustom colors draw attentionBuilding a sale bannerRed/orange for urgencyMatching a specific brand elementExact hex values neededCreating contrast sectionsDifferent from main theme

Theme Color Variables

When you enable theme colors, blocks use CSS custom properties. Here's what each variable controls:

Primary Colors

VariableWhat It AffectsDefault--wbcom-color-primaryButtons, links, accents#0073aa--wbcom-color-secondarySecondary buttons, badges#6c757d

Background Colors

VariableWhat It AffectsDefault--wbcom-color-baseMain backgrounds#ffffff--wbcom-color-base-2Secondary backgrounds#f8f9fa--wbcom-card-bgCard backgroundsSame as base

Text Colors

VariableWhat It AffectsDefault--wbcom-color-contrastPrimary text#212529--wbcom-color-contrast-2Secondary text#495057--wbcom-heading-colorHeadingsInherit from contrast--wbcom-text-colorBody textInherit from contrast--wbcom-link-colorLinksSame as primary

Button Colors

VariableWhat It AffectsDefault--wbcom-button-bgButton backgroundSame as contrast--wbcom-button-textButton textSame as base--wbcom-button-hover-bgButton hover stateSame as primary

Border Colors

VariableWhat It AffectsDefault--wbcom-card-borderCard borders#dddddd

Setting Up Your Theme

For best results, define these CSS variables in your theme. Add this to your theme's CSS or Customizer:

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

Replace the color values with your brand colors.

Block-by-Block Examples

Pricing Table

Without Theme Colors:

Manually set header color, price color, feature text, button colors
6+ color decisions per table

With Theme Colors:

Enable toggle
Header uses --wbcom-color-primary
Text uses --wbcom-color-contrast
Button uses --wbcom-button-bg
Done

Members Grid (BuddyPress)

Without Theme Colors:

Set card background, name color, role color, button colors
Match to existing theme manually

With Theme Colors:

Enable toggle
Cards use --wbcom-card-bg
Names use --wbcom-heading-color
Buttons use --wbcom-button-bg
Instant consistency

Product Grid (WooCommerce)

Without Theme Colors:

Set product title color, price color, sale badge, button colors
Risk of mismatched add-to-cart button

With Theme Colors:

Enable toggle
Titles use --wbcom-heading-color
Prices use --wbcom-color-contrast
Sale badges use --wbcom-color-primary
Add to cart matches theme buttons

Troubleshooting

Colors Not Changing

Check if toggle is on - Select the block and verify the toggle is enabled
Clear cache - Caching plugins may serve old CSS
Check theme variables - Your theme may not define the CSS variables

Colors Look Wrong

Check variable definitions - Make sure your theme defines the variables correctly
Check specificity - Some themes have CSS that overrides the variables
Inspect in browser - Use DevTools to see which CSS is being applied

Toggle Not Appearing

Update the plugin - Theme colors requires v4.2.0 or later
Check block type - Only "Starter Pack" blocks have this feature
Try another block - If one block has issues, try a different one

Best Practices

Do:

Enable theme colors on most blocks for consistency
Define CSS variables in your theme for best results
Test with both light and dark backgrounds
Preview on mobile devices

Don't:

Mix theme colors and custom colors randomly
Forget to define fallback colors in your CSS
Ignore contrast ratios for accessibility

Compatibility

Theme Colors works best with themes that define CSS custom properties. Compatible themes include:

BuddyX and BuddyX Pro
Starter Templates Theme
Most modern block themes
Any theme with CSS custom property support

For older themes without CSS variables, blocks will use sensible fallback colors.
