# After Installation Checklist

Congratulations on installing WBcom Essential! Follow this checklist to verify everything is working correctly.

---

## Step 1: Verify Plugin is Active

1. Go to **Plugins** in your WordPress admin
2. Find "WBcom Essential" in the list
3. Confirm it shows "Active"

**Troubleshooting**: If the plugin is not active, click "Activate"

---

## Step 2: Find the Blocks in Gutenberg

### How to Access Blocks

1. **Edit any page** (or create a new one)
2. **Click the "+" button** to add a block
3. **Look for "Starter Pack"** categories

You should see these categories:
- Starter Pack - Header
- Starter Pack - Design
- Starter Pack - Content
- Starter Pack - Blog
- Starter Pack - Marketing
- Starter Pack - BuddyPress (if BuddyPress is active)
- Starter Pack - WooCommerce (if WooCommerce is active)

### Quick Test

1. Click "+" to add a block
2. Type "Counter" in the search
3. You should see "Counter" from Starter Pack - Design
4. Add it and see animated numbers counting up

**Troubleshooting**: If you don't see Starter Pack blocks:
- Clear your browser cache
- Deactivate and reactivate the plugin
- Check for JavaScript errors in browser console (F12)

---

## Step 3: Find the Widgets in Elementor

### How to Access Widgets

1. **Edit any page with Elementor**
2. **Look in the left panel** for widget categories
3. **Find "Starter Templates"** section

You should see widgets organized by:
- General (27 widgets)
- BuddyPress (11 widgets - if BuddyPress active)
- WooCommerce (5 widgets - if WooCommerce active)

### Quick Test

1. Open Elementor editor
2. Search for "Counter" in widgets
3. Drag "Counter" widget onto your page
4. See animated counting numbers

**Troubleshooting**: If you don't see Starter Templates widgets:
- Go to Elementor > Settings > Advanced
- Click "Regenerate Files & Data"
- Refresh the editor

---

## Step 4: Check BuddyPress Blocks (If Using BuddyPress)

BuddyPress blocks only appear when BuddyPress is active.

### Verify BuddyPress Integration

1. Confirm BuddyPress is installed and active
2. Go to **Settings > BuddyPress** and enable desired components
3. In the block editor, search for "Members"
4. You should see "Members Carousel", "Members Grid", "Members Lists"

### BuddyPress Blocks Available

- Dashboard Intro
- Forums / Forums Activity
- Group Carousel / Groups Grid / Groups Lists
- Members Carousel / Members Grid / Members Lists
- Profile Completion
- Header Bar (with notifications/messages)

**Not seeing BuddyPress blocks?** Make sure BuddyPress is activated first.

---

## Step 5: Check WooCommerce Blocks (If Using WooCommerce)

WooCommerce blocks only appear when WooCommerce is active.

### Verify WooCommerce Integration

1. Confirm WooCommerce is installed and active
2. In the block editor, search for "Product"
3. You should see "Product Grid" from WBcom Essential

### WooCommerce Blocks Available

- Product Grid
- Mini Cart
- Header Bar (with cart icon)

**Not seeing WooCommerce blocks?** Make sure WooCommerce is activated first.

---

## Step 6: Test Theme Colors Feature

The "Use Theme Colors" feature makes your blocks match your theme automatically.

### How to Test

1. Add any WBcom Essential block (try "CTA Box")
2. In block settings, find "Use Theme Colors" toggle
3. Turn it ON
4. The block should now use your theme's colors

### Best Practice

Enable "Use Theme Colors" for consistent design across your site.

---

## Step 7: Verify on Frontend

Always check how blocks look on the live site:

1. Add a block to any page
2. Click "Preview" or "View Page"
3. Check it looks correct
4. Test on mobile using browser tools (F12 > Toggle Device)

---

## What You Should Now Have

After completing this checklist:

| Item | Status |
|------|--------|
| Plugin shows as "Active" | ✓ |
| 45 Gutenberg blocks in "Starter Pack" categories | ✓ |
| 43 Elementor widgets in "Starter Templates" | ✓ |
| BuddyPress blocks visible (if BP active) | ✓ |
| WooCommerce blocks visible (if WC active) | ✓ |
| Theme Colors toggle working | ✓ |
| Blocks display correctly on frontend | ✓ |

---

## Common Issues

### Blocks Not Appearing

1. **Clear cache** - Browser and any caching plugins
2. **Regenerate CSS** - Elementor > Tools > Regenerate Files
3. **Check conflicts** - Disable other plugins temporarily

### Blocks Look Broken

1. **Enable Theme Colors** - For consistent styling
2. **Check theme compatibility** - Best with BuddyX, BuddyX Pro, Reign
3. **Clear browser cache** - Hard refresh with Ctrl+Shift+R

### BuddyPress/WooCommerce Blocks Missing

These blocks are **conditionally loaded**:
- BuddyPress blocks only appear when BuddyPress is active
- WooCommerce blocks only appear when WooCommerce is active

---

## Next Steps

Now that everything is working:

1. **[Build Your First Page](./getting-started.md)** - Step-by-step guide
2. **[Solution Finder](./solution-finder.md)** - Find the right block for your needs
3. **[Theme Integration](./themes/buddyx.md)** - Optimize for your theme
4. **[Browse All Blocks](./blocks/index.md)** - Complete block reference
5. **[Browse All Widgets](./widgets/index.md)** - Complete widget reference

---

## Need Help?

If you're still having issues:

- **Documentation**: [developer.wbcomdesigns.com/docs/](https://developer.wbcomdesigns.com/docs/)
- **Support**: [developer.wbcomdesigns.com/support/](https://developer.wbcomdesigns.com/support/)
- **Community**: [developer.wbcomdesigns.com/community/](https://developer.wbcomdesigns.com/community/)
