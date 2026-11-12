# Reign Theme Guide

Wbcom Essential is part of Reign. This page shows which blocks and widgets suit common Reign sites.

## Install Wbcom Essential in Reign

1. Go to **Reign Settings > Extend**.
2. Find **Wbcom Essential**.
3. Install and activate it.

If you prefer, download the ZIP from [wbcomdesigns.com](https://wbcomdesigns.com/downloads/wbcom-essential/) and upload it at **Plugins > Add New > Upload Plugin**.

## Reign-Only Widget

The **Header Notification Area** Elementor widget appears only while Reign is the active theme. On any other theme, 42 of the 43 widgets are available.

## Blocks and Widgets by Site Type

### Social Network

| Goal | Block | Elementor widget |
|------|-------|------------------|
| Show new members | Members Carousel, Members Grid | Members Carousel, Members Grid, Members Lists |
| Show groups | Groups Grid, Group Carousel | Groups Grid, Group Carousel, Groups Lists |
| Show recent updates | Activity Feed | Dashboard Intro |
| Forums | - | Forums, Forums Activity (need bbPress) |
| Profile prompts | - | Profile Completion |

See [BuddyPress Integration](buddypress-integration.md).

### Online Store

| Goal | Block | Elementor widget |
|------|-------|------------------|
| Product listings | Product Grid, Product Carousel | Universal Product, Product Tab |
| Reviews | Customer Reviews | Customer Review, WooCommerce Testimonial |
| Promotions | Promo Banner, Countdown Timer | Add Banner, Countdown |

See [WooCommerce Integration](woocommerce-integration.md).

### Business or Course Site

| Goal | Block | Elementor widget |
|------|-------|------------------|
| Landing section | Hero Section, CTA Section | Slider, Heading |
| Features | Feature Grid | Flip Box |
| Numbers | Stats Counter, Progress Bar | Progress Bar |
| Pricing | Pricing Table | Pricing Table |
| Team | - | Team Carousel |
| Quotes | Testimonial Carousel | Testimonial, Testimonial Carousel |

## Colours in Blocks

Blocks take their accent colour from the `--wbcom-link-color` CSS variable and fall back to a default blue when the variable is not set. Category Grid also has a **Use Theme Colors** toggle in its sidebar. See [Theme Colors](../features/theme-colors.md).

To check how a block looks with your Reign settings, preview the page on the front end.

## Elementor or Gutenberg

- Use blocks in the block editor. They need no extra plugin.
- Use widgets in Elementor. Install Elementor 3.5 or later.

## Related

- [Blocks Overview](../blocks/blocks-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Community Site Tutorial](community-site-tutorial.md)
- [Online Store Tutorial](online-store-tutorial.md)
