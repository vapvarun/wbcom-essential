# Template Overrides

Some Wbcom Essential output is built from template files you can replace from your theme, so you can change the markup without editing the plugin. Other layouts are fixed. This page lists both.

## Templates your theme can override

The Members Grid and Groups Grid Elementor widgets render each member or group from a loop template. To override one, copy it from the plugin's `templates/` folder into your theme, keeping the same folder structure. Use a child theme, so theme updates do not remove your copy. The plugin looks in the child theme, then the parent theme, then its own `templates/` folder.

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

## Worked example: show the username on Members Grid cards

This override adds each member's username under their name in the Members Grid widget. It is for a site on the Reign theme with the Nouveau template pack. Tested with Wbcom Essential 4.7.2, Reign 8.1.0 and the Reign child theme.

1. Copy `wbcom-essential/templates/reign/buddypress/nouveau/members/members-loop.php`.
2. Paste it into your child theme as `reign-child-theme/reign/buddypress/nouveau/members/members-loop.php`. Create the folders if they are missing.
3. In your copy, find the closing tag of the member name.

   ```php
   <h2 class="list-title member-name">
   	<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>
   </h2>
   ```

4. Add this line right below `</h2>`.

   ```php
   <p class="my-member-handle"><?php echo esc_html( bp_get_member_user_nicename() ); ?></p>
   ```

5. Save the file and open the page that holds the Members Grid widget.

**You'll know it worked when** every card shows the member's username under their name.

On BuddyX or BuddyX Pro, copy `templates/buddyx/buddypress/members/members-loop.php` to `buddyx/buddypress/members/members-loop.php` instead. With any other theme, use `buddypress/members/members-loop.php`. The table above lists every path.

After a Wbcom Essential update, compare your copy with the new original and bring over any changes.

## Layouts that are not overridable

These templates ship with the plugin and are loaded from its own folder. Your theme cannot replace them by copying the file.

- The single post templates (Classic, Magazine, Minimal, Modern) and their parts: share buttons, author bio, related posts, post navigation and the table of contents.
- The blog index layouts (Grid, List, Magazine, Newspaper).

You choose between them in **Wbcom Designs > Essential > Settings**. See [Blog Layouts and Post Templates](../features/blog-and-post-templates.md). To restyle them, add CSS from your theme. The body gets classes you can target for each layout. Single posts get `wbcom-sp-active` and `wbcom-sp--classic` (or `magazine`, `minimal`, `modern`). Blog pages get `wbcom-blog-active` and `wbcom-blog--grid` (or `list`, `magazine`, `newspaper`).

## Related

- [Hooks and Filters](hooks-and-filters.md)
- [Blog Layouts and Post Templates](../features/blog-and-post-templates.md)
- [BuddyPress Widgets](../widgets/buddypress-widgets.md)
