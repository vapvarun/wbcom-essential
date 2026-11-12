# BuddyPress Integration

Wbcom Essential includes 5 BuddyPress blocks and 11 BuddyPress Elementor widgets. They work with BuddyPress 10.0 or later and with BuddyBoss Platform.

## What You Need

1. Install and activate BuddyPress or BuddyBoss Platform.
2. Go to **Settings > BuddyPress > Components** and enable the components you want to show.
3. Make sure your site has members, groups or activity to display.

If BuddyPress is inactive, a BuddyPress block shows "BuddyPress is required for this block."

## Blocks

| Block | Category | Needs component |
|-------|----------|-----------------|
| Activity Feed | Essential - BuddyPress | Activity |
| Members Grid | Essential - BuddyPress | Members |
| Members Carousel | Essential - BuddyPress | Members (friend button also needs Friends) |
| Groups Grid | Essential - BuddyPress | User Groups |
| Group Carousel | Essential - BuddyPress | User Groups |

Details: [BuddyPress Blocks](../blocks/buddypress-blocks.md).

## Elementor Widgets

All widgets are in the **Wbcom Essential** category.

| Widget | Notes |
|--------|-------|
| Members Grid, Members Lists, Members Carousel | Member displays |
| Groups Grid, Groups Lists, Group Carousel | Appear only when the User Groups component is active |
| Dashboard Intro, Header Bar, Profile Completion | Member dashboard pieces |
| Forums, Forums Activity | Appear only when bbPress is active |

Details: [BuddyPress Widgets](../widgets/buddypress-widgets.md).

## BuddyBoss Platform

The blocks build their data requests from the platform's own REST namespace. They work on BuddyPress (`buddypress/v1`) and BuddyBoss Platform (`buddyboss/v1`) without extra setup.

## Page Ideas

- **Community homepage:** Hero Section, Members Carousel, Groups Grid, Activity Feed, CTA Section.
- **Member showcase:** Members Grid with a heading above it.

See [Community Site Tutorial](community-site-tutorial.md).

## If a Block Is Empty

See [Troubleshooting](../troubleshooting/troubleshooting.md).
