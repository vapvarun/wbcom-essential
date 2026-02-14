# FAQ

Frequently Asked Questions

Common questions and troubleshooting for WBcom Essential.

General Questions

What is WBcom Essential?

WBcom Essential provides 45 Gutenberg blocks and 43 Elementor widgets for building WordPress sites. It works especially well with BuddyPress communities and WooCommerce stores.

Do I need both Elementor and Gutenberg?

No. Choose whichever editor you prefer:

Gutenberg only: Use the 45 native WordPress blocks
Elementor only: Use the 43 Elementor widgets
Both: Mix and match based on what works best for each page

Which themes work with WBcom Essential?

WBcom Essential works with any properly coded WordPress theme. It pairs best with:

BuddyX Theme (community features)
Starter Templates Theme (clean starter)
Any theme that follows WordPress coding standards

Is WBcom Essential compatible with Full Site Editing?

Yes. All 45 Gutenberg blocks work in the Site Editor. You can use them in templates, template parts, and patterns.

Installation

Requirements

RequirementMinimumRecommendedWordPress6.0+LatestPHP8.0+8.2+Elementor3.0+LatestBuddyPress10.0+LatestWooCommerce7.0+Latest

How do I install WBcom Essential?

Download the plugin ZIP file
Go to Plugins → Add New → Upload Plugin
Select the ZIP file and click Install Now
Activate the plugin

After installation, I don't see any blocks

Try these steps:

Clear your browser cache
Refresh the editor page
Search for "Starter Pack" in the block inserter
Check that the plugin is activated

Blocks

Where are the blocks located?

In the block inserter (+ button), search for "Starter Pack" or scroll to find these categories:

Starter Pack - Header
Starter Pack - Design
Starter Pack - Content
Starter Pack - Blog
Starter Pack - Marketing
Starter Pack - BuddyPress (if BuddyPress active)
Starter Pack - WooCommerce (if WooCommerce active)

Why don't I see BuddyPress blocks?

BuddyPress blocks only appear when BuddyPress is installed and activated:

Go to Plugins → Installed Plugins
Check that BuddyPress shows as "Active"
Refresh the editor
Search for "Members Grid" or "Groups Grid"

Why don't I see WooCommerce blocks?

WooCommerce blocks (Product Grid, Mini Cart) only appear when WooCommerce is active:

Verify WooCommerce is activated
Ensure you have at least one product published
Refresh the editor

How do I use Theme Colors?

Select any block from WBcom Essential
Open the Color Settings panel in the sidebar
Enable "Use Theme Colors"
The block will inherit your theme's color scheme

This works best with themes that define CSS custom properties.

Carousel blocks aren't scrolling

Check these settings:

Autoplay disabled: Enable autoplay in block settings
Loop disabled: Enable loop for continuous scrolling
Not enough items: Add more items than visible per view
JavaScript error: Check browser console for errors

Block shows "This block has encountered an error"

This usually means something changed. Try:

Select the block and click "Attempt Block Recovery"
If that fails, delete and re-add the block
Clear any caching plugins
Check for plugin conflicts (disable other plugins temporarily)

Elementor Widgets

Where are the widgets?

In Elementor's widget panel:

Open any page with Elementor
Search for "Starter Templates" in the widget panel
Or scroll to find the widget categories

Widgets not appearing in Elementor

Verify Elementor is activated
Check that WBcom Essential is activated
Refresh the Elementor editor
Clear Elementor's cache: Elementor → Tools → Regenerate CSS

Widget styling looks wrong

Clear caches: Browser cache, any caching plugins, Elementor cache
Check for conflicts: Disable other plugins temporarily
Update Elementor: Ensure you're on the latest version
Regenerate CSS: Elementor → Tools → Regenerate CSS & Data

BuddyPress Features

Members Grid shows no members

Check that you have registered users
Verify users have logged in at least once
Check your filter settings (not too restrictive)
Try setting "Member Type" to "All"

Groups blocks show no groups

Verify groups exist in BuddyPress
Check that groups are public (not hidden)
Ensure groups have at least one member
Try setting "Group Type" to "Public"

Profile Completion not showing

The Profile Completion block only shows for logged-in users with incomplete profiles:

Log in as a user
Check that user has incomplete profile fields
Verify xProfile component is active in BuddyPress

Forums blocks not working

Forums blocks require bbPress:

Install and activate bbPress plugin
Create at least one forum
The Forums and Forums Activity blocks will then appear

WooCommerce Features

Product Grid shows no products

Verify you have published products (not drafts)
Check that products are "In Stock"
Review your filter settings
Try selecting "All" categories

Add to Cart button not working

Check browser console for JavaScript errors
Verify WooCommerce AJAX cart is enabled
Test with a default theme to rule out conflicts
Clear all caches

Mini Cart not updating

Enable WooCommerce AJAX fragments
Clear browser cache
Check for JavaScript conflicts
Test with fewer plugins active

Performance

Site is slow after installing

WBcom Essential loads assets conditionally. If you notice slowdown:

Check what's loading: Use Query Monitor plugin to see loaded assets
Disable unused features: Don't add blocks you don't need
Optimize images: Compress images before uploading
Use caching: Install a caching plugin
Limit carousels: Keep carousel items under 10

Carousels are laggy

Reduce items: Show fewer items in carousel
Optimize images: Use appropriately sized images
Disable autoplay: Manual navigation is lighter
Reduce animation: Simpler transitions load faster

Many blocks on one page

If you have many blocks on a single page:

Consider splitting into multiple pages
Use pagination instead of loading all items
Lazy load images where possible
Test on mobile devices

Styling Issues

Colors don't match my theme

Enable Theme Colors: Turn on "Use Theme Colors" in block settings
Check theme support: Your theme should define CSS custom properties
Manual override: Set specific colors in block color settings

Fonts look different

WBcom Essential inherits fonts from your theme
Check your theme's typography settings
Some widgets have typography controls in Style tab
Use Additional CSS for specific overrides

Mobile layout problems

Preview on mobile: Use responsive preview in editor
Adjust breakpoints: Check responsive settings per block
Test touch: Ensure carousels work with touch/swipe
Reduce columns: 4 columns on desktop → 2 on tablet → 1 on mobile

Custom CSS not applying

Specificity: Your CSS may need higher specificity
Cache: Clear all caches after CSS changes
Inspector: Use browser dev tools to check what's overriding
Location: Add CSS to Customizer → Additional CSS

Conflicts

Conflict with another plugin

If you suspect a plugin conflict:

Deactivate all plugins except WBcom Essential
Test if the issue persists
Reactivate plugins one by one
Identify which plugin causes the conflict
Contact support with the conflicting plugin name

Theme conflict

To test for theme conflicts:

Switch to Twenty Twenty-Three theme temporarily
Test if the issue persists
If fixed, the issue is theme-related
Contact your theme developer

JavaScript errors in console

Common causes and fixes:

ErrorCauseFix"Swiper is not defined"Carousel script not loadedClear cache, reload page"jQuery is not defined"jQuery loading issueCheck theme jQuery settings"Cannot read property"Missing elementCheck block configuration

Updates

How do I update WBcom Essential?

Updates appear in Dashboard → Updates when available:

Back up your site first
Go to Dashboard → Updates
Click "Update Now" for WBcom Essential
Clear caches after updating

Will updates break my pages?

We maintain backward compatibility. After updating:

Check pages using WBcom Essential blocks
Regenerate Elementor CSS if using widgets
Clear all caches
Report any issues to support

Reverting to a previous version

If an update causes issues:

Download the previous version from your account
Deactivate the current version
Delete the current version
Install the previous version
Report the issue to support

Getting Help

Before contacting support

Gather this information:

WordPress version
WBcom Essential version
Theme name and version
List of active plugins
Screenshot or description of the issue
Browser and version
Any error messages

Support resources

Documentation: You're reading it
Support tickets: wbcomdesigns.com/support/

Response time

Support tickets: 24-48 hours
Critical issues: Prioritized response

Quick Fixes

Clear all caches

When something isn't working:

Browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
WordPress caching plugin
Elementor cache: Elementor → Tools → Regenerate CSS
Server cache (if applicable)
CDN cache (if using one)

Reset block to defaults

If a block is misbehaving:

Select the block
Open the More Options menu (three dots)
Click "Reset to Defaults" or delete and re-add

Test in Incognito mode

To rule out browser extensions and cache:

Open an incognito/private window
Log into WordPress
Test the issue
If fixed, clear your regular browser cache

Related Documentation

Installation Guide - Setup and requirements
Getting Started - Build your first page
Gutenberg Blocks - All 45 blocks reference
Elementor Widgets - All 43 widgets reference
Theme Colors Guide - Color inheritance feature
