# FAQ Content - WBcom Essential

Website FAQ section content.

---

## General Questions

### What is WBcom Essential?

WBcom Essential is a free WordPress plugin that provides 45 Gutenberg blocks and 43 Elementor widgets. It includes blocks for sliders, carousels, pricing tables, testimonials, and 11 blocks specifically designed for BuddyPress community sites.

The plugin is built by the team behind Theme Reign, BuddyX, and BuddyX Pro themes. It's designed as a companion to these themes but works with any properly coded WordPress theme.

---

### Is WBcom Essential really free?

Yes, completely free. All 45 blocks and 43 widgets are included. There's no premium version, no feature restrictions, and no upsells within the plugin.

We built WBcom Essential to make our themes (Theme Reign, BuddyX, BuddyX Pro) more powerful. Happy theme users build better sites—that's the business model.

---

### Do I need both Elementor and Gutenberg?

No. Choose whichever editor you prefer:

- **Gutenberg only**: Use the 45 native WordPress blocks
- **Elementor only**: Use the 43 Elementor widgets
- **Both**: Mix and match based on what works best for each page

The plugin doesn't require both editors—it simply supports both.

---

### Will it work with my theme?

Yes, with any properly coded WordPress theme.

WBcom Essential is **optimized for**:
- Theme Reign
- BuddyX (free theme from WordPress.org)
- BuddyX Pro

The "Theme Colors" feature works best with themes that define CSS custom properties (like our themes), but blocks provide sensible default colors for any theme.

---

### Do I need BuddyPress?

No. BuddyPress is optional.

The 11 BuddyPress blocks only appear when BuddyPress is installed and activated. The other 34 blocks work on any WordPress site without BuddyPress.

---

### What about WooCommerce?

Same as BuddyPress—optional. The 2 WooCommerce blocks (Product Grid, Mini Cart) only appear when WooCommerce is active. All other blocks work without WooCommerce.

---

## Technical Questions

### What are the requirements?

| Requirement | Minimum Version |
|-------------|-----------------|
| WordPress | 6.0+ |
| PHP | 8.0+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

**Optional:**
- Elementor 3.0+ (for Elementor widgets)
- BuddyPress 10.0+ (for BuddyPress blocks)
- WooCommerce 7.0+ (for WooCommerce blocks)
- bbPress 2.6+ (for Forums blocks)

---

### How does Theme Colors work?

Every block includes a "Use Theme Colors" toggle in its settings.

**When disabled (default):**
You pick colors manually using color pickers.

**When enabled:**
The block reads CSS custom properties from your theme and applies them automatically.

For Theme Reign, BuddyX, and BuddyX Pro users, this means blocks automatically match your theme's color scheme. For other themes, the plugin provides fallback colors if CSS variables aren't defined.

---

### Will blocks slow down my site?

No. WBcom Essential uses conditional loading:

- BuddyPress blocks only load when BuddyPress is active
- WooCommerce blocks only load when WooCommerce is active
- Block assets only load on pages that use them

The carousels use Swiper v11, which is lightweight and optimized for performance.

---

### Is it compatible with Full Site Editing?

Yes. All 45 Gutenberg blocks work in the Site Editor. You can use them in templates, template parts, and patterns.

---

### Does it support RTL languages?

Yes. All blocks include RTL (right-to-left) support for languages like Arabic and Hebrew.

---

## Features Questions

### What's the difference between Post Carousel and Posts Carousel?

**Post Carousel**: Shows one post at a time in a slideshow format. Good for featured or hero sections.

**Posts Carousel**: Shows multiple posts visible at once, sliding through in groups. Good for "Related Posts" or "Recent Articles" sections.

---

### Which blocks are included for BuddyPress?

11 blocks built specifically for community sites:

1. **Members Grid** - Display members in a grid layout
2. **Members Carousel** - Members in sliding carousel
3. **Members Lists** - Members in list format
4. **Groups Grid** - Show BuddyPress groups
5. **Group Carousel** - Groups in carousel
6. **Groups Lists** - Groups in list format
7. **Profile Completion** - Progress bar for profile fields
8. **Forums** - Display bbPress forums
9. **Forums Activity** - Recent forum posts
10. **Dashboard Intro** - Welcome section for members
11. **Header Bar** - Community navigation component

---

### What are the bonus blocks?

7 blocks created specifically for Gutenberg (no Elementor widget equivalent):

1. **Counter** - Animated number counter
2. **CTA Box** - Call-to-action section
3. **Divider** - Decorative separators
4. **Icon Box** - Icon with title and description
5. **Mini Cart** - WooCommerce cart widget
6. **Social Icons** - Social media links
7. **Star Rating** - Review rating display

These were added because they're commonly needed features that didn't exist in the original Elementor widget set.

---

### How do I find blocks in the editor?

**In Gutenberg:**
1. Click the + button to open the block inserter
2. Search for "Starter Pack" or the block name
3. Or scroll to find these categories:
   - Starter Pack - Header
   - Starter Pack - Design
   - Starter Pack - Content
   - Starter Pack - Blog
   - Starter Pack - Marketing
   - Starter Pack - BuddyPress
   - Starter Pack - WooCommerce

**In Elementor:**
1. Open the widget panel
2. Search for "Starter Templates" or the widget name
3. Drag widgets onto your page

---

## Theme Questions

### Why is this plugin free?

WBcom Essential is a companion plugin for our themes. We want Theme Reign, BuddyX, and BuddyX Pro users to have the best possible experience—so we provide the blocks you need at no extra cost.

It's also good for business: when users build great sites with our themes and plugins, they're more likely to recommend us and use our other products.

---

### Which theme should I use with WBcom Essential?

All three of our themes work great:

**Theme Reign** - Premium WordPress theme with excellent BuddyPress support

**BuddyX (Free)** - Free theme from WordPress.org, perfect for community sites

**BuddyX Pro** - Premium version with additional features and priority support

The plugin also works with other themes, but Theme Colors integration works best with our themes.

---

### Do I need to buy a theme to use WBcom Essential?

No. The plugin works with any WordPress theme, including free themes.

For the best experience with automatic color matching, we recommend BuddyX (free) from WordPress.org.

---

## Troubleshooting

### Blocks aren't appearing in the editor

Try these steps:

1. Clear your browser cache
2. Refresh the editor page
3. Search for "Starter Pack" in the block inserter
4. Verify the plugin is activated in Plugins menu
5. Check for JavaScript errors in browser console (F12)

If blocks still don't appear, try deactivating other plugins temporarily to check for conflicts.

---

### BuddyPress blocks aren't showing

BuddyPress blocks only appear when BuddyPress is active:

1. Go to Plugins → Installed Plugins
2. Check that BuddyPress shows as "Active"
3. Refresh the editor
4. Search for "Members Grid" to test

If BuddyPress is active but blocks don't appear, the BuddyPress component may be disabled. Check BuddyPress settings.

---

### Colors don't match my theme

If "Use Theme Colors" isn't picking up your theme's colors:

1. Your theme may not define CSS custom properties
2. Try setting colors manually in block settings
3. For full theme integration, BuddyX, BuddyX Pro, or Theme Reign are recommended
4. Add custom CSS to define the expected variables

See the Theme Colors documentation for variable names.

---

### Carousel isn't scrolling

Check these settings:

1. **Autoplay disabled**: Enable autoplay in block settings
2. **Loop disabled**: Enable loop for continuous scrolling
3. **Not enough items**: Add more items than visible per view
4. **JavaScript conflict**: Check browser console for errors

If using a caching plugin, clear the cache and try again.

---

### Block shows an error message

If you see "This block has encountered an error":

1. Select the block and click "Attempt Block Recovery"
2. If that fails, delete and re-add the block
3. Clear caching plugins
4. Check for plugin conflicts

This usually happens after updates when block attributes change. Recovery typically fixes it.

---

## Getting Help

### Where can I find documentation?

Full documentation available at [docs.wbcomdesigns.com](https://docs.wbcomdesigns.com)

Includes:
- Installation guide
- Getting started tutorial
- Block-by-block reference
- BuddyPress integration guide
- Troubleshooting

---

### How do I contact support?

**Support forums:** Available at wbcomdesigns.com/support

Include these details for faster help:
- WordPress version
- WBcom Essential version
- Theme name (Theme Reign, BuddyX, BuddyX Pro, or other)
- Active plugins list
- Screenshot or description of issue
- Browser and version

---

### How do I report bugs or request features?

You can submit bug reports and feature requests through:

1. Support at wbcomdesigns.com/support
2. GitHub repository issues (if available)

We regularly review feedback and incorporate improvements into plugin updates.
