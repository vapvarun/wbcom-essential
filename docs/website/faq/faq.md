# Frequently Asked Questions

## Is Wbcom Essential free?

Yes. It is free and part of the Reign, BuddyX and BuddyX Pro themes.

## Where do I download it?

Download it from [wbcomdesigns.com/downloads/wbcom-essential](https://wbcomdesigns.com/downloads/wbcom-essential/). It is not on WordPress.org, so it does not appear in **Plugins > Add New** searches. In Reign, install it from **Reign Settings > Extend**. See the [Installation Guide](../installation/installation-guide.md).

## Do I need Elementor?

No. The 35 Gutenberg blocks work without Elementor. Install Elementor only if you want the 43 widgets, which appear in the **Wbcom Essential** category of the Elementor panel. Without Elementor, the plugin shows a dismissible notice that you can ignore.

## Does it work with any theme?

Yes. Blocks and widgets work with any properly coded theme. Reign, BuddyX and BuddyX Pro include the plugin. One widget, Header Notification Area, appears only with Reign.

## Does it work with BuddyBoss Platform?

Yes. The BuddyPress blocks build their data requests from the platform's own REST namespace, so they work with BuddyPress and BuddyBoss Platform. See [BuddyPress Integration](../themes/buddypress-integration.md).

## What if BuddyPress, WooCommerce or EDD is not active?

The block still exists, but it shows a short notice such as "BuddyPress is required for this block" instead of content. Activate the plugin it needs. Elementor widgets for BuddyPress and WooCommerce do not load at all until those plugins are active. Forums widgets also need bbPress.

| Plugin | Blocks | Widgets |
|--------|--------|---------|
| BuddyPress or BuddyBoss Platform | 5 | 11 |
| WooCommerce | 3 | 5 |
| Easy Digital Downloads | 8 | - |

## Does it work with the Site Editor (FSE)?

The blocks are standard WordPress blocks, so you can insert them in block themes and Site Editor templates. Elementor widgets work only inside Elementor.

## Can I use blocks and widgets on the same site?

Yes. Use blocks on pages built in the block editor and widgets on pages built in Elementor.

## Will blocks look right on phones?

Every block has Desktop, Tablet and Mobile controls. See [Responsive Design](../features/responsive-design.md).

## How do blocks pick up my theme colours?

Blocks use the `--wbcom-link-color` CSS variable for accents and fall back to a default blue. See [Theme Colors](../features/theme-colors.md).

## Which block should I use?

See the [Solution Finder](../features/solution-finder.md) or [Blocks Overview](../blocks/blocks-overview.md).

## Something is not working

See [Troubleshooting](../troubleshooting/troubleshooting.md). For further help, contact [Wbcom support](https://wbcomdesigns.com/support/).
