# Frequently Asked Questions

Common questions and troubleshooting for WBcom Essential.

---

## General Questions

### What is WBcom Essential?

WBcom Essential provides 45 Gutenberg blocks and 43 Elementor widgets for building WordPress sites. It works especially well with BuddyPress communities and WooCommerce stores.

### Do I need both Elementor and Gutenberg?

No. Choose whichever editor you prefer:

- **Gutenberg only**: Use the 45 native WordPress blocks
- **Elementor only**: Use the 43 Elementor widgets
- **Both**: Mix and match based on what works best for each page

### Which themes work with WBcom Essential?

WBcom Essential works with any properly coded WordPress theme. It pairs best with:

- BuddyX Theme (community features)
- Starter Templates Theme (clean starter)
- Any theme that follows WordPress coding standards

### Is WBcom Essential compatible with Full Site Editing?

Yes. All 45 Gutenberg blocks work in the Site Editor. You can use them in templates, template parts, and patterns.

---

## Installation

### Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| WordPress | 6.0+ | Latest |
| PHP | 8.0+ | 8.2+ |
| Elementor | 3.0+ | Latest |
| BuddyPress | 10.0+ | Latest |
| WooCommerce | 7.0+ | Latest |

### How do I install WBcom Essential?

1. Download the plugin ZIP file
2. Go to Plugins → Add New → Upload Plugin
3. Select the ZIP file and click Install Now
4. Activate the plugin

### After installation, I don't see any blocks

Try these steps:

1. Clear your browser cache
2. Refresh the editor page
3. Search for "Starter Pack" in the block inserter
4. Check that the plugin is activated

---

## Blocks

### Where are the blocks located?

In the block inserter (+ button), search for "Starter Pack" or scroll to find these categories:

- Starter Pack - Header
- Starter Pack - Design
- Starter Pack - Content
- Starter Pack - Blog
- Starter Pack - Marketing
- Starter Pack - BuddyPress (if BuddyPress active)
- Starter Pack - WooCommerce (if WooCommerce active)

### Why don't I see BuddyPress blocks?

BuddyPress blocks only appear when BuddyPress is installed and activated:

1. Go to Plugins → Installed Plugins
2. Check that BuddyPress shows as "Active"
3. Refresh the editor
4. Search for "Members Grid" or "Groups Grid"

### Why don't I see WooCommerce blocks?

WooCommerce blocks (Product Grid, Mini Cart) only appear when WooCommerce is active:

1. Verify WooCommerce is activated
2. Ensure you have at least one product published
3. Refresh the editor

### How do I use Theme Colors?

1. Select any block from WBcom Essential
2. Open the Color Settings panel in the sidebar
3. Enable "Use Theme Colors"
4. The block will inherit your theme's color scheme

This works best with themes that define CSS custom properties.

### Carousel blocks aren't scrolling

Check these settings:

1. **Autoplay disabled**: Enable autoplay in block settings
2. **Loop disabled**: Enable loop for continuous scrolling
3. **Not enough items**: Add more items than visible per view
4. **JavaScript error**: Check browser console for errors

### Block shows "This block has encountered an error"

This usually means something changed. Try:

1. Select the block and click "Attempt Block Recovery"
2. If that fails, delete and re-add the block
3. Clear any caching plugins
4. Check for plugin conflicts (disable other plugins temporarily)

---

## Elementor Widgets

### Where are the widgets?

In Elementor's widget panel:

1. Open any page with Elementor
2. Search for "Starter Templates" in the widget panel
3. Or scroll to find the widget categories

### Widgets not appearing in Elementor

1. Verify Elementor is activated
2. Check that WBcom Essential is activated
3. Refresh the Elementor editor
4. Clear Elementor's cache: Elementor → Tools → Regenerate CSS

### Widget styling looks wrong

1. **Clear caches**: Browser cache, any caching plugins, Elementor cache
2. **Check for conflicts**: Disable other plugins temporarily
3. **Update Elementor**: Ensure you're on the latest version
4. **Regenerate CSS**: Elementor → Tools → Regenerate CSS & Data

---

## BuddyPress Features

### Members Grid shows no members

1. Check that you have registered users
2. Verify users have logged in at least once
3. Check your filter settings (not too restrictive)
4. Try setting "Member Type" to "All"

### Groups blocks show no groups

1. Verify groups exist in BuddyPress
2. Check that groups are public (not hidden)
3. Ensure groups have at least one member
4. Try setting "Group Type" to "Public"

### Profile Completion not showing

The Profile Completion block only shows for logged-in users with incomplete profiles:

1. Log in as a user
2. Check that user has incomplete profile fields
3. Verify xProfile component is active in BuddyPress

### Forums blocks not working

Forums blocks require bbPress:

1. Install and activate bbPress plugin
2. Create at least one forum
3. The Forums and Forums Activity blocks will then appear

---

## WooCommerce Features

### Product Grid shows no products

1. Verify you have published products (not drafts)
2. Check that products are "In Stock"
3. Review your filter settings
4. Try selecting "All" categories

### Add to Cart button not working

1. Check browser console for JavaScript errors
2. Verify WooCommerce AJAX cart is enabled
3. Test with a default theme to rule out conflicts
4. Clear all caches

### Mini Cart not updating

1. Enable WooCommerce AJAX fragments
2. Clear browser cache
3. Check for JavaScript conflicts
4. Test with fewer plugins active

---

## Performance

### Site is slow after installing

WBcom Essential loads assets conditionally. If you notice slowdown:

1. **Check what's loading**: Use Query Monitor plugin to see loaded assets
2. **Disable unused features**: Don't add blocks you don't need
3. **Optimize images**: Compress images before uploading
4. **Use caching**: Install a caching plugin
5. **Limit carousels**: Keep carousel items under 10

### Carousels are laggy

1. **Reduce items**: Show fewer items in carousel
2. **Optimize images**: Use appropriately sized images
3. **Disable autoplay**: Manual navigation is lighter
4. **Reduce animation**: Simpler transitions load faster

### Many blocks on one page

If you have many blocks on a single page:

1. Consider splitting into multiple pages
2. Use pagination instead of loading all items
3. Lazy load images where possible
4. Test on mobile devices

---

## Styling Issues

### Colors don't match my theme

1. **Enable Theme Colors**: Turn on "Use Theme Colors" in block settings
2. **Check theme support**: Your theme should define CSS custom properties
3. **Manual override**: Set specific colors in block color settings

### Fonts look different

1. WBcom Essential inherits fonts from your theme
2. Check your theme's typography settings
3. Some widgets have typography controls in Style tab
4. Use Additional CSS for specific overrides

### Mobile layout problems

1. **Preview on mobile**: Use responsive preview in editor
2. **Adjust breakpoints**: Check responsive settings per block
3. **Test touch**: Ensure carousels work with touch/swipe
4. **Reduce columns**: 4 columns on desktop → 2 on tablet → 1 on mobile

### Custom CSS not applying

1. **Specificity**: Your CSS may need higher specificity
2. **Cache**: Clear all caches after CSS changes
3. **Inspector**: Use browser dev tools to check what's overriding
4. **Location**: Add CSS to Customizer → Additional CSS

---

## Conflicts

### Conflict with another plugin

If you suspect a plugin conflict:

1. Deactivate all plugins except WBcom Essential
2. Test if the issue persists
3. Reactivate plugins one by one
4. Identify which plugin causes the conflict
5. Contact support with the conflicting plugin name

### Theme conflict

To test for theme conflicts:

1. Switch to Twenty Twenty-Three theme temporarily
2. Test if the issue persists
3. If fixed, the issue is theme-related
4. Contact your theme developer

### JavaScript errors in console

Common causes and fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| "Swiper is not defined" | Carousel script not loaded | Clear cache, reload page |
| "jQuery is not defined" | jQuery loading issue | Check theme jQuery settings |
| "Cannot read property" | Missing element | Check block configuration |

---

## Updates

### How do I update WBcom Essential?

Updates appear in Dashboard → Updates when available:

1. Back up your site first
2. Go to Dashboard → Updates
3. Click "Update Now" for WBcom Essential
4. Clear caches after updating

### Will updates break my pages?

We maintain backward compatibility. After updating:

1. Check pages using WBcom Essential blocks
2. Regenerate Elementor CSS if using widgets
3. Clear all caches
4. Report any issues to support

### Reverting to a previous version

If an update causes issues:

1. Download the previous version from your account
2. Deactivate the current version
3. Delete the current version
4. Install the previous version
5. Report the issue to support

---

## Getting Help

### Before contacting support

Gather this information:

1. WordPress version
2. WBcom Essential version
3. Theme name and version
4. List of active plugins
5. Screenshot or description of the issue
6. Browser and version
7. Any error messages

### Support resources

- **Documentation**: You're reading it
- **Support tickets**: [wbcomdesigns.com/support/](https://wbcomdesigns.com/support/)

### Response time

- Support tickets: 24-48 hours
- Critical issues: Prioritized response

---

## Quick Fixes

### Clear all caches

When something isn't working:

1. Browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. WordPress caching plugin
3. Elementor cache: Elementor → Tools → Regenerate CSS
4. Server cache (if applicable)
5. CDN cache (if using one)

### Reset block to defaults

If a block is misbehaving:

1. Select the block
2. Open the More Options menu (three dots)
3. Click "Reset to Defaults" or delete and re-add

### Test in Incognito mode

To rule out browser extensions and cache:

1. Open an incognito/private window
2. Log into WordPress
3. Test the issue
4. If fixed, clear your regular browser cache

---

## Related Documentation

- [Installation Guide](./installation.md) - Setup and requirements
- [Getting Started](./getting-started.md) - Build your first page
- [Gutenberg Blocks](./blocks/index.md) - All 45 blocks reference
- [Elementor Widgets](./widgets/index.md) - All 43 widgets reference
- [Theme Colors Guide](./features/theme-colors.md) - Color inheritance feature

