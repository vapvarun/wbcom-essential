# Template Overrides

Some Wbcom Essential output is built from template files you can replace from your theme, so you can change the markup without editing the plugin. Other layouts are fixed. This page lists both.

## Templates your theme can override

The Members Grid and Groups Grid Elementor widgets render each member or group from a loop template. To override one, copy it from the plugin's `templates/` folder into your theme (use a child theme so updates do not remove it), keeping the same folder structure. The plugin looks in the child theme, then the parent theme, then its own `templates/` folder.

| Template | Used when | Plugin file | Your theme path |
|----------|-----------|-------------|-----------------|
| Members loop | BuddyX or BuddyX Pro | `templates/buddyx/buddypress/members/members-loop.php` | `buddyx/buddypress/members/members-loop.php` |
| Groups loop | BuddyX or BuddyX Pro | `templates/buddyx/buddypress/groups/groups-loop.php` | `buddyx/buddypress/groups/groups-loop.php` |
| Members loop | Reign, Nouveau template pack | `templates/reign/buddypress/nouveau/members/members-loop.php` | `reign/buddypress/nouveau/members/members-loop.php` |
| Groups loop | Reign, Nouveau template pack | `templates/reign/buddypress/nouveau/groups/groups-loop.php` | `reign/buddypress/nouveau/groups/groups-loop.php` |
| Members loop | Reign, Legacy template pack | `templates/reign/buddypress/legacy/members/members-loop.php` | `reign/buddypress/legacy/members/members-loop.php` |
| Groups loop | Reign, Legacy template pack | `templates/reign/buddypress/legacy/groups/groups-loop.php` | `reign/buddypress/legacy/groups/groups-loop.php` |
| Members loop | Any other theme | `templates/buddypress/members/members-loop.php` | `buddypress/members/members-loop.php` |
| Groups loop | Any other theme | `templates/buddypress/groups/groups-loop.php` | `buddypress/groups/groups-loop.php` |

The plugin also accepts the template at the top of your theme, for example `members/members-loop.php`, after it has checked the path in the table.

To choose the template yourself in code, filter `wbcom_essential_locate_template`. See [Hooks and Filters](hooks-and-filters.md).

## Layouts that are not overridable

These templates ship with the plugin and are loaded from its own folder. Your theme cannot replace them by copying the file:

- The single post templates (Classic, Magazine, Minimal, Modern) and their parts: share buttons, author bio, related posts, post navigation and the table of contents.
- The blog index layouts (Grid, List, Magazine, Newspaper).

You choose between them in **Wbcom Designs > Essential > Settings**. See [Blog Layouts and Post Templates](../features/blog-and-post-templates.md). To restyle them, add CSS from your theme. The body gets these classes so you can target a layout: `wbcom-sp-active` and `wbcom-sp--classic` (or `magazine`, `minimal`, `modern`) on single posts, and `wbcom-blog-active` and `wbcom-blog--grid` (or `list`, `magazine`, `newspaper`) on blog pages.

## Related

- [Hooks and Filters](hooks-and-filters.md)
- [Blog Layouts and Post Templates](../features/blog-and-post-templates.md)
- [BuddyPress Widgets](../widgets/buddypress-widgets.md)
