# Community blocks and widgets (BuddyPress integration)

**Also called:** member directory, group directory, social network, community site, activity feed, member grid, BuddyBoss, forum.

## What this does

This page lists the 5 blocks and 11 Elementor widgets that show your community: members, groups, activity and forums. They work with BuddyPress 10.0 or later and with BuddyBoss Platform.

## Before you start

1. Install and activate BuddyPress or BuddyBoss Platform.
2. Go to **Settings > BuddyPress > Components** and enable the components you want to show.
3. Make sure your site has members, groups or activity to display.

If BuddyPress is inactive, a BuddyPress block tells you that BuddyPress is required.


## Steps

Add a block from the **Essential - BuddyPress** category, or an Elementor widget from the **Wbcom Essential** category. Use the tables to see which component each one needs.

### Blocks

| Block | Category | Needs component |
|-------|----------|-----------------|
| Activity Feed | Essential - BuddyPress | Activity |
| Members Grid | Essential - BuddyPress | Members |
| Members Carousel | Essential - BuddyPress | Members (friend button also needs Friends) |
| Groups Grid | Essential - BuddyPress | User Groups |
| Group Carousel | Essential - BuddyPress | User Groups |

Details: [BuddyPress blocks](../blocks/buddypress-blocks.md).

### Elementor widgets

All widgets are in the **Wbcom Essential** category.

| Widget | Notes |
|--------|-------|
| Members Grid, Members Lists, Members Carousel | Member displays |
| Groups Grid, Groups Lists, Group Carousel | Appear only when the User Groups component is active |
| Dashboard Intro, Header Bar, Profile Completion | Member dashboard pieces |
| Forums, Forums Activity | Appear only when bbPress is active |

Details: [Community widgets](../widgets/buddypress-widgets.md).

## You'll know it worked when

The Members Grid, Groups Grid or Activity Feed block shows real members, groups or posts instead of a notice.

## Good to know

### Does it work with BuddyBoss Platform?

Yes, with no extra setup.

### What page ideas can I use?

- **Community home page:** Hero Section, Members Carousel, Groups Grid, Activity Feed, CTA Section.
- **Member showcase:** Members Grid with a heading above it.

See [Community site tutorial](community-site-tutorial.md).

### What if a block is empty?

See [Troubleshooting](../troubleshooting/troubleshooting.md).

## For developers

The blocks build their data requests from the platform's own REST namespace. They work on BuddyPress (`buddypress/v1`) and BuddyBoss Platform (`buddyboss/v1`) without extra setup.
