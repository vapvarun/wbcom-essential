# Installation Guide

## Requirements

Before installing Wbcom Essential, ensure your environment meets these requirements:

| Requirement | Minimum Version |
|-------------|-----------------|
| WordPress | 6.0+ |
| PHP | 8.0+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Optional Dependencies

| Plugin | Required For |
|--------|--------------|
| Elementor | Elementor widgets |
| BuddyPress | BuddyPress widgets & blocks |
| bbPress | Forums widgets & blocks |
| WooCommerce | WooCommerce widgets |

## Installation Methods

### Method 1: WordPress Dashboard (Recommended)

1. Go to **Plugins → Add New**
2. Click **Upload Plugin**
3. Choose the `wbcom-essential-4.0.2.zip` file
4. Click **Install Now**
5. Click **Activate**

### Method 2: FTP Upload

1. Extract `wbcom-essential-4.0.2.zip`
2. Upload the `wbcom-essential` folder to `/wp-content/plugins/`
3. Go to **Plugins** in WordPress admin
4. Find "Wbcom Essential" and click **Activate**

### Method 3: WP-CLI

```bash
# Upload and activate
wp plugin install wbcom-essential-4.0.2.zip --activate
```

## Post-Installation Setup

### 1. Verify Installation

After activation, verify the plugin is working:

- **Elementor:** Edit a page with Elementor → Look for "Wbcom Essential" widget category
- **Gutenberg:** Add a new block → Look for "Wbcom Essential" block category

### 2. Configure Settings

1. Go to **Appearance → Starter Sites** (if using BuddyX theme)
2. Or configure individual widgets/blocks as you use them

## Troubleshooting

### Plugin Conflicts

If widgets don't appear:

1. Deactivate other plugins temporarily
2. Switch to a default theme (Twenty Twenty-Four)
3. Re-check if Wbcom Essential widgets appear
4. Re-activate plugins one by one to identify conflicts

### JavaScript Errors

If interactive features don't work:

1. Check browser console for errors (F12)
2. Clear any caching plugins
3. Ensure jQuery is loaded (required for Elementor widgets)

### BuddyPress Widgets Not Showing

BuddyPress widgets only appear when BuddyPress is active:

```php
// Check if BuddyPress is active
if ( function_exists( 'buddypress' ) ) {
    // BuddyPress widgets are available
}
```

### WooCommerce Widgets Not Showing

WooCommerce widgets only appear when WooCommerce is active:

```php
// Check if WooCommerce is active
if ( class_exists( 'WooCommerce' ) ) {
    // WooCommerce widgets are available
}
```

## Updating the Plugin

### Automatic Updates

If installed from WordPress.org, updates appear automatically in **Dashboard → Updates**.

### Manual Updates

1. Download the latest version
2. Deactivate the current version
3. Delete the old `wbcom-essential` folder via FTP
4. Upload the new version
5. Activate

> **Note:** Your widget/block settings are stored in the database and will be preserved during updates.

## Uninstallation

1. Go to **Plugins**
2. Deactivate "Wbcom Essential"
3. Click **Delete**

> **Warning:** Pages using Wbcom Essential widgets/blocks will show fallback content or errors after uninstallation. Replace with alternative content before uninstalling.

---

## Related Documentation

- [Getting Started](./getting-started.md) - Build your first page
- [Gutenberg Blocks](./blocks/index.md) - All 45 blocks reference
- [Elementor Widgets](./widgets/index.md) - All 43 widgets reference
- [FAQ & Troubleshooting](./faq.md) - Common issues and fixes
