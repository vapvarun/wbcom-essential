# Install the plugin (Installation guide)

**Also called:** install, download, upload plugin, plugin not found, zip file, FTP, requirements, update.

## What this does

Wbcom Essential is free, but it is not listed on WordPress.org. Do not search **Plugins > Add New** for it. Use one of the methods below.

## Before you start

Check that your site meets these minimums.

| Requirement | Minimum |
|-------------|---------|
| WordPress | 6.0 |
| PHP | 8.0 |
| Elementor | 3.5, only if you want the Elementor widgets |
| BuddyPress | 10.0, only for BuddyPress blocks and widgets |
| WooCommerce | 7.0, only for WooCommerce blocks and widgets |

## Steps

### Install with Reign

1. Go to **Reign Settings > Extend**.
2. Find **Wbcom Essential**.
3. Click the install button, then activate the plugin.

### Install from a ZIP file

Use this method for BuddyX, BuddyX Pro, or any other theme.

1. Download the plugin from [wbcomdesigns.com/downloads/wbcom-essential](https://wbcomdesigns.com/downloads/wbcom-essential/).
2. In your admin, go to **Plugins > Add New > Upload Plugin**.
3. Choose the downloaded ZIP file and click **Install Now**.
4. Click **Activate Plugin**.

### Install by FTP

1. Download the plugin and unzip it.
2. Upload the `wbcom-essential` folder to `/wp-content/plugins/`.
3. Go to **Plugins > Installed Plugins** and click **Activate**.

## Good to know

### Which other plugins do I need?

Install these only for the features you need.

| Plugin | Adds |
|--------|------|
| Elementor | The 43 Elementor widgets |
| BuddyPress or BuddyBoss Platform | BuddyPress blocks and widgets |
| WooCommerce | WooCommerce blocks and widgets |
| Easy Digital Downloads | EDD blocks |
| bbPress | Forums widgets |

Blocks work without Elementor. If Elementor is missing, the plugin shows a notice you can dismiss and ignore.

### How do I update it?

Updates appear under **Dashboard > Updates** like any other plugin. You can also reinstall the latest ZIP from the download page.

### Does the plugin contact another server?

Yes, once. Shortly after activation, Wbcom Essential asks the Wbcom Designs update server to authorise updates. It asks again until it succeeds. It sends the plugin's licence key, the product id and your site address (home URL). It sends nothing else, and no visitor or user data.

The licence is used only for updates. No feature depends on it, and the plugin works the same if the request fails. If it keeps failing, an admin notice offers a **Retry** button. See the [privacy policy](https://wbcomdesigns.com/privacy-policy/) and [Plugin updates and licence key](../features/updates-and-licence.md).

## You'll know it worked when

The plugin shows as active under **Plugins > Installed Plugins**, and a **Wbcom Designs** item appears in the admin menu. Then follow [Check that it works](../intro/after-installation.md).

## For developers

Update checks go to `updates.wbcomdesigns.com`. If that server cannot be reached, the plugin falls back to `wbcomdesigns.com`.

## Related

- [Common mistakes](common-mistakes.md)
- [Troubleshooting](../troubleshooting/troubleshooting.md)
