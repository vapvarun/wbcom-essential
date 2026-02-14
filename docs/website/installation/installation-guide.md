# Installation Guide

Installation Guide

Requirements

Before installing Wbcom Essential, ensure your environment meets these requirements:

RequirementMinimum VersionWordPress6.0+PHP8.0+MySQL5.7+ / MariaDB 10.3+

Optional Dependencies

PluginRequired ForElementorElementor widgetsBuddyPressBuddyPress widgets & blocksbbPressForums widgets & blocksWooCommerceWooCommerce widgets

Installation Methods

Method 1: WordPress Dashboard (Recommended)

Go to Plugins → Add New
Click Upload Plugin
Choose the wbcom-essential-4.2.0.zip file
Click Install Now
Click Activate

Method 2: FTP Upload

Extract wbcom-essential-4.2.0.zip
Upload the wbcom-essential folder to /wp-content/plugins/
Go to Plugins in WordPress admin
Find "Wbcom Essential" and click Activate

Method 3: WP-CLI

# Upload and activate
wp plugin install wbcom-essential-4.2.0.zip --activate

Post-Installation Setup

1. Verify Installation

After activation, verify the plugin is working:

Elementor: Edit a page with Elementor → Look for "Wbcom Essential" widget category
Gutenberg: Add a new block → Look for "Wbcom Essential" block category

2. Configure Settings

Go to Appearance → Starter Sites (if using BuddyX theme)
Or configure individual widgets/blocks as you use them

Troubleshooting

Plugin Conflicts

If widgets don't appear:

Deactivate other plugins temporarily
Switch to a default theme (Twenty Twenty-Four)
Re-check if Wbcom Essential widgets appear
Re-activate plugins one by one to identify conflicts

JavaScript Errors

If interactive features don't work:

Check browser console for errors (F12)
Clear any caching plugins
Ensure jQuery is loaded (required for Elementor widgets)

BuddyPress Widgets Not Showing

BuddyPress widgets only appear when BuddyPress is active:

// Check if BuddyPress is active
if ( function_exists( &#039;buddypress&#039; ) ) {
    // BuddyPress widgets are available
}

WooCommerce Widgets Not Showing

WooCommerce widgets only appear when WooCommerce is active:

// Check if WooCommerce is active
if ( class_exists( &#039;WooCommerce&#039; ) ) {
    // WooCommerce widgets are available
}

Updating the Plugin

Automatic Updates

If installed from WordPress.org, updates appear automatically in Dashboard → Updates.

Manual Updates

Download the latest version
Deactivate the current version
Delete the old wbcom-essential folder via FTP
Upload the new version
Activate

Note: Your widget/block settings are stored in the database and will be preserved during updates.

Uninstallation

Go to Plugins
Deactivate "Wbcom Essential"
Click Delete

Warning: Pages using Wbcom Essential widgets/blocks will show fallback content or errors after uninstallation. Replace with alternative content before uninstalling.

Related Documentation

Getting Started - Build your first page
Gutenberg Blocks - All 45 blocks reference
Elementor Widgets - All 43 widgets reference
FAQ & Troubleshooting - Common issues and fixes
