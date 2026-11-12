# Performance

Wbcom Essential loads its files only where they are needed. This page explains what loads, and when, for blocks and Elementor widgets.

## Block assets load per block

Each block declares its own stylesheet and, where it needs one, its own front-end script. WordPress loads those files only on pages that render the block. A page without a Wbcom Essential block does not load that block's files.

Twenty blocks ship a front-end script, such as the carousels, Tabs, FAQ Accordion, Countdown Timer and Progress Bar. The other blocks do not need a script.

## Shared files for blocks

When a post or page contains any Wbcom Essential block, the plugin also loads three small shared stylesheets: design tokens, a base stylesheet and a theme isolation stylesheet. They load once per page, not once per block.

The check looks at the post content of the current page. If you place a block outside the post content, for example in a site editor part or widget area, the shared files may not load.

The Swiper library used by carousels is registered once and shared by every carousel block. It loads only on pages that render a carousel.

Easy Digital Downloads stores get one extra small stylesheet. It loads only on pages that contain the EDD Checkout block.

## Elementor widget assets

Each Elementor widget names the styles and scripts it needs. Elementor loads them only on pages that use that widget.

Three base stylesheets load on every front-end page while the Elementor module is active: the main widget stylesheet, an animation stylesheet and an icon stylesheet.

## Widgets register only when needed

Elementor widgets register only when the plugin they need is active:

- The BuddyPress widgets need BuddyPress. The group widgets also need the Groups component.
- The forum widgets need bbPress.
- The WooCommerce widgets need WooCommerce.

If a plugin is inactive, its widgets are not registered and add no load.

## Query settings

Several blocks that list posts or products skip the extra pagination count query. These are Post Carousel, Posts Ticker, Portfolio Grid, Product Grid and Product Carousel. Set a sensible item count on each block to keep queries small.

## Images

Post Carousel and Product Grid add native lazy loading to their images, so images below the fold load as visitors scroll.

## Reduced motion

The shared base stylesheet includes a `prefers-reduced-motion` rule for all Wbcom Essential blocks. Visitors who ask their device to reduce motion see animations and transitions cut to almost nothing.

## Caching

The BuddyPress, WooCommerce and Easy Digital Downloads blocks render on the server. Blocks that show per-visitor data, such as Activity Feed or the Header Bar widget, show different content to each logged-in user. Exclude pages that use them from full-page caching for logged-in visitors.

## Related

- [Blocks Overview](../blocks/blocks-overview.md)
- [Widgets Overview](../widgets/widgets-overview.md)
- [Responsive Design](responsive-design.md)
