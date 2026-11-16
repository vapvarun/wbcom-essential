# REST API, AJAX and Shortcode

The plugin registers a few REST routes, one AJAX action and one shortcode. There are no WP-CLI commands.

## REST routes

| Route | Method | Who can call it | What it does |
|-------|--------|-----------------|--------------|
| `/wbcom-essential/v1/xprofile-groups` | GET | Users who can edit posts | Lists BuddyPress profile field groups (`id`, `name`) for the block editor. Returns an empty list when BuddyPress is not active. |
| `/wbcom/v1/products` | GET | Public by default | Returns EDD products for the Product Catalog block. Parameters: `category`, `search`, `orderby` (`title`, `date`, `price`, `popular`), `order` (`ASC`, `DESC`), `per_page` (default 12), `page` and `price_range` (`all`, `free`, `under25`, `25to99`, `100plus`). |
| `/wbcom/v1/product-categories` | GET | Public by default | Lists EDD download categories for the catalog filter. |
| `/wbcom/v1/edd-account/{tab}` | GET | Logged-in users | Returns the HTML of one Account Dashboard tab. `tab` is one of `dashboard`, `subscriptions`, `downloads`, `free-plugins`, `licenses`, `purchases`, `profile`. |
| `/wbcom/v1/edd-account/states/{country}` | GET | Logged-in users | Lists the states for a two-letter country code, for the profile form. |
| `/wbcom/v1/edd-account/claim-free` | POST | Logged-in users | Claims a free download for the current user. Takes `download_id`. |

The two `/wbcom/v1/edd-account` routes and the catalog routes exist only when Easy Digital Downloads is active.

To restrict the catalog routes, filter `wbcom_essential_product_catalog_public_permission`. See [Hooks and Filters](hooks-and-filters.md).

### Claiming a free download

`POST /wp-json/wbcom/v1/edd-account/claim-free` with `download_id`. It succeeds only for a published, flat-price, free download that is not password-protected. If the user already owns it, no new order is made. A user can make 10 new claims per hour (filterable). It returns:

| Status | Code | Message |
|--------|------|---------|
| 400 | `wbcom_invalid_download` | This product cannot be claimed. |
| 429 | `wbcom_claim_limit` | Claim limit reached. Please try again later. |
| 500 | `wbcom_claim_failed` | Could not record your claim. Please try again. |

## AJAX

| Action | Who | What it does |
|--------|-----|--------------|
| `wbcom_ajax_login` | Logged-out visitors | Signs a visitor in from the Elementor Login Form widget. It needs the widget's nonce and answers with a success or error message. It applies the [login lockout](../features/login-security.md). The action is not registered when Paid Memberships Pro is active. |
| `wbcom_essential_dismiss_elementor_notice` | Admins | Dismisses the notice that Elementor is not installed. The dismissal is stored for the whole site. |

## Shortcode

`[wbcombtn url="https://example.com" target="_blank"]Button text[/wbcombtn]` prints a styled link button. `url` is the link, `target` is `_self` by default, and `style` adds a style class. Wbcom Essential also stops WordPress from wrapping this shortcode in stray paragraph tags.

## Related

- [Hooks and Filters](hooks-and-filters.md)
- [Login Security](../features/login-security.md)
