# Wbcom Essential - Capabilities

Buyer-level roll-up of what Wbcom Essential can do, verified against code at **4.7.3**
(2026-11-19). The manifest (`audit/manifest.json`) lists the parts; this file names the whole:
what a site owner installs Wbcom Essential to do. Free plugin; built for Reign, BuddyX and
BuddyX Pro, and works on block themes such as Twenty Twenty-Five.

## Page building

| Can it... | Status | Delivered by |
|---|---|---|
| Add marketing sections in the block editor (hero, CTA, feature grid, pricing table, promo banner, testimonials, countdown, stats)? | YES | 35 blocks under `plugins/gutenberg/src/blocks/`, registered by `plugins/gutenberg/BlockRegistrar.php:18` |
| Add the same kinds of sections in Elementor? | YES | 43 widgets under `plugins/elementor/widgets/` (General, BuddyPress, WooCommerce) |
| Show blog posts as grids, carousels, tickers and timelines? | YES | Post Carousel, Posts Ticker, Category Grid blocks; Posts Revolution, Post Slider, Posts Carousel, Post Timeline widgets |
| Give content structure (tabs, accordion with FAQ schema, timeline, flip box, portfolio)? | YES | Tabs, FAQ Accordion (one FAQPage schema per page), Timeline, Flip Box, Portfolio Grid blocks and widgets |
| Follow the theme's colours, fonts and dark mode unless the owner picks a colour? | YES | Theme colour tokens in block and widget styles; tested on Reign, BuddyX, BuddyX Pro and Twenty Twenty-Five |
| Keep one block's styles from leaking into another or into the page? | YES | Per-block style ids, render-time scoping for blocks saved without an id (`BlockRegistrar::scope_blocks_without_id`, `plugins/gutenberg/BlockRegistrar.php:83`), theme isolation for dynamic blocks |
| Set spacing per device? | YES | Desktop, Tablet and Mobile tabs on block Padding and Margin |
| Insert ready-made layouts? | YES | Block patterns in `plugins/gutenberg/patterns/` (Magazine and Single Post categories) |
| Ship an AI-readable index of every block and widget? | PLANNED | 4.7.4 (card 10528071402) |

## Community (BuddyPress)

| Can it... | Status | Delivered by |
|---|---|---|
| Show members and groups as grids or carousels anywhere? | YES | Members Grid, Members Carousel, Groups Grid, Group Carousel blocks and widgets; on Reign 8.1.1+ the widgets print Reign's own directory cards |
| Show the activity stream on any page? | YES | Activity Feed block |
| Put a community header bar (notifications, messages, avatar) in a page builder header? | YES | Header Bar and Notification Area widgets |
| Show forums, profile completion and dashboard intros? | YES | Forums, Forums Activity, Profile Completion, Dashboard Intro widgets |
| Respect group privacy? | YES | Hidden groups never listed; join buttons follow the group type |

## Selling

| Can it... | Status | Delivered by |
|---|---|---|
| Show WooCommerce products, categories and reviews? | YES | Product Grid, Product Carousel, Customer Reviews blocks; Universal Product, Product Tab, Add Banner, Customer Review widgets; lists match what the shop lists |
| Build an Easy Digital Downloads account area and checkout? | YES | EDD Account Dashboard, Checkout Progress, Trust Badges, Social Proof, Recommendations, Order Success, Product Catalog blocks; REST `wbcom/v1/edd-account/*` and `wbcom/v1/products` |
| Let customers claim free downloads from their account? | YES | `POST /wbcom/v1/edd-account/claim-free` (`includes/edd-account-marketing-functions.php:581`) |

## Login

| Can it... | Status | Delivered by |
|---|---|---|
| Put a branded login form on any page? | YES | Login Form block and widget, AJAX login `wbcom_ajax_login` |
| Resist brute force and spam on that form? | YES | Lockout by IP, honeypot, same message for unknown user and wrong password; trusted proxies via `wbcom_essential_login_security_trusted_proxies` (`includes/edd-account-login-security.php:75`) |

## Platform

| Can it... | Status | Delivered by |
|---|---|---|
| Update itself with signed packages? | YES | Bundled EDD SL SDK (`loader.php:55`), update server updates.wbcomdesigns.com with fallback |
| Show dates in the site's timezone? | YES | `includes/time-functions.php` |
| Run in any language? | YES (fr_FR, nl_NL bundled) | `languages/`; 8 more languages planned for 4.7.4 (card 10528071587) |
| Add database tables? | NO | None; `audit/tables.lock` is empty |

## Explicitly not Wbcom Essential's job

| Not a capability | Why |
|---|---|
| Being a theme or a theme builder | It adds blocks and widgets; headers, footers and templates belong to the theme |
| Being the community, shop or LMS engine | BuddyPress, WooCommerce and EDD own the data; Essential renders it |
| Importing demo sites | Wbcom Demo Installer |

---

*Regenerate with `/wp-plugin-onboard --refresh` whenever the code surface changes.*
