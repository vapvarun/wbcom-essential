# Wbcom Essential - Role Matrix

The plugin registers **no custom capabilities**. Every gate uses a WordPress or WooCommerce
capability, or "logged in". Derived from `current_user_can` and REST `permission_callback`
calls (stub packs, vendor and build excluded), 2026-11-19 at 4.7.3.

Legend: **R** = read, **U** = update, **-** = no access, **(own)** = own data only.

## Admin surfaces

| Surface | Admin (`manage_options`) | Editor | Author / Contributor | Subscriber | Visitor |
|---|---|---|---|---|---|
| Wbcom Designs > Essential (widget showcase, settings) | R/U | - | - | - | - |
| Shared Wbcom dashboard, licence and plugin cards | R/U (install/activate/update plugins caps for those actions) | - | - | - | - |
| Elementor out-of-date notice dismiss (AJAX `wbcom_essential_dismiss_elementor_notice`) | U | - | - | - | - |
| Block editor: all 35 blocks | R/U | R/U | R/U (own posts; `edit_posts`) | - | - |
| Elementor: all 43 widgets | per Elementor's own role manager | | | | |

## REST

| Route | Admin | Editor / Author | Subscriber / Customer | Visitor | Notes |
|---|---|---|---|---|---|
| `GET /wbcom-essential/v1/xprofile-groups` | R | R | - | - | `edit_posts`; feeds block editor controls |
| `GET /wbcom/v1/products`, `/wbcom/v1/product-categories` | R | R | R | R | Public catalog of published EDD downloads; filter `wbcom_essential_product_catalog_public_permission` can close it |
| `/wbcom/v1/edd-account/(?P<tab>)` | R (own) | R (own) | R (own) | - | Logged in; returns the current user's EDD account tab |
| `/wbcom/v1/edd-account/states/(?P<country>)` | R | R | R | - | Logged in; state list for the address form |
| `/wbcom/v1/edd-account/claim-free` | U (own) | U (own) | U (own) | - | Logged in; claims a free download for the current user |

## Front end

| Action | Visitor | Logged in | Notes |
|---|---|---|---|
| AJAX login (`wbcom_ajax_login`, Elementor Login Form) | yes | - | nonce, honeypot, lockout by IP (trusted proxies filterable) |
| BuddyPress blocks and widgets (members, groups, activity, forums) | what BuddyPress shows a visitor | what BuddyPress shows that member | Read through BuddyPress's own APIs; hidden groups never listed |
| EDD blocks (account, checkout, order success) | checkout only | own orders, licences, subscriptions | Order Success shows details only for an order the visitor may see |
| "Show in account" flag on an EDD discount (Downloads > Discounts edit screen) | - | `manage_shop_discounts` | EDD shop managers only; saved with a nonce |
