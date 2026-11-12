# Troubleshooting

Find your problem below. Each item lists the cause and the fix.

## Widgets are missing from the Elementor panel

**Cause:** Elementor is not installed or not active. Widgets load only when Elementor is active.

**Fix:**

1. Go to **Plugins > Installed Plugins** and confirm Elementor is active.
2. If you see an "Elementor is out of date" notice, update Elementor.
3. Open a page with Elementor and look for the **Wbcom Essential** category in the panel.
4. Go to **Elementor > Tools** and click **Regenerate CSS & Data**, then reload the editor.

## One specific widget is missing from Elementor

**Cause:** Some widgets load only when their plugin or theme is active.

**Fix:**

1. BuddyPress widgets need BuddyPress active.
2. Groups Grid, Groups Lists and Group Carousel also need the User Groups component. Enable it at **Settings > BuddyPress > Components**.
3. Forums and Forums Activity need bbPress.
4. WooCommerce widgets need WooCommerce.
5. Header Notification Area needs the Reign theme.

## A block shows "BuddyPress is required" or "WooCommerce plugin is required"

**Cause:** The plugin the block depends on is not active. The block appears in the inserter either way.

**Fix:**

1. Activate BuddyPress (or BuddyBoss Platform), WooCommerce or Easy Digital Downloads, depending on the block.
2. Reload the editor and the page.

## Essential blocks are missing from the inserter

**Cause:** Wbcom Essential is inactive, or the editor is showing an old cached copy.

**Fix:**

1. Confirm **Wbcom Essential** is active at **Plugins > Installed Plugins**.
2. Search the inserter for a block name, such as "Hero Section". Blocks are in categories that start with "Essential -".
3. Hard refresh the editor and clear any caching plugin.
4. Deactivate and reactivate the plugin.

## BuddyPress blocks show "No members found"

**Cause:** The block has nothing to list, or the component is off.

**Fix:**

1. Confirm BuddyPress or BuddyBoss Platform is active.
2. Go to **Settings > BuddyPress > Components** and enable Members, Activity and User Groups as needed.
3. Check that your site has members, groups or activity to display.
4. Check the block settings. A filter or sort option can hide results.

## Groups or Activity Feed block shows nothing

**Cause:** The User Groups or Activity component is disabled, so the block outputs nothing.

**Fix:**

1. Go to **Settings > BuddyPress > Components**.
2. Enable **User Groups** or **Activity Streams**.
3. Reload the page.

## The Friend button is missing on Members Carousel

**Cause:** The Friends component is disabled, or the visitor is logged out.

**Fix:**

1. Enable **Friend Connections** at **Settings > BuddyPress > Components**.
2. Test while logged in.

## A carousel looks stacked or unstyled

**Cause:** A cache or optimisation plugin is deferring, combining or removing the carousel styles or script. Carousels load a shared stylesheet and the Swiper script only on pages that use them.

**Fix:**

1. In your optimisation plugin, exclude files from the `wbcom-essential` plugin folder from CSS and JavaScript delay, deferral, combining and unused-CSS removal.
2. Clear the plugin cache and your CDN cache.
3. Reload the page in a private browser window.

## Product Grid or Customer Reviews is empty

**Cause:** WooCommerce has no matching products or reviews.

**Fix:**

1. Confirm WooCommerce is active and has published products.
2. Check the category filter in the block settings.
3. For Customer Reviews, confirm approved product reviews exist.

## Checkout blocks show nothing on the EDD checkout

**Cause:** The Checkout Recommendations block shows nothing when the cart is empty. Other checkout blocks need Easy Digital Downloads active.

**Fix:**

1. Confirm Easy Digital Downloads is active.
2. Add a download to the cart, then open the checkout page.
3. Place the blocks inside the EDD Checkout block. Use the Checkout Progress, Trust Badges, Social Proof and Recommendations blocks instead of the legacy Enhanced Checkout block.

## Changes are not showing on the site

**Cause:** A cache is serving an old copy of the page.

**Fix:**

1. Save or update the page.
2. Clear your caching plugin, server cache and CDN cache.
3. Hard refresh your browser.
4. In Elementor, click **Regenerate CSS & Data** under **Elementor > Tools**.

## Block styles look different from the editor

**Cause:** Your theme's CSS or an optimisation plugin is overriding block styles.

**Fix:**

1. Switch temporarily to a default theme such as Twenty Twenty-Five to compare.
2. Clear all caches.
3. Check that your optimisation plugin does not remove unused CSS from blocks.

## Debug Mode

Turn on logging to find PHP errors:

1. Open `wp-config.php`.
2. Add `define( 'WP_DEBUG', true );` and `define( 'WP_DEBUG_LOG', true );`.
3. Reproduce the problem.
4. Read `wp-content/debug.log`.

## Still Need Help?

Contact [Wbcom support](https://wbcomdesigns.com/support/) with your WordPress, PHP and plugin versions, the error message and the steps to reproduce.

## Related

- [FAQ](../faq/faq.md)
- [Installation Guide](../installation/installation-guide.md)
- [Common Mistakes](../installation/common-mistakes.md)
