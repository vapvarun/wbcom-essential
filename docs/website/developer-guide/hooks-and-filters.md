# Hooks and Filters

Wbcom Essential offers actions and filters so you can change its behaviour from a small plugin or your child theme, without editing the plugin. Hook names that start with `wbcom_essential` are the supported ones. A handful of older hooks that start with `wbcom_` are listed at the end.

## Plugin lifecycle

| Hook | Type | When it fires |
|------|------|---------------|
| `wbcom_essential_activated` | Action | After the activation routine. Receives `$previous_version`, empty on a fresh install. |
| `wbcom_essential_deactivated` | Action | After deactivation. Use it to clear your own caches. Options are kept. |
| `wbcom_essential_upgraded` | Action | After upgrade routines finish. Receives `$stored`, the version the site was on before. |
| `wbcom_essential/init` | Action | When the Elementor part of the plugin has loaded. |
| `wbcom_essential/get_elements` | Filter | The list of Elementor widgets to register. Receives and returns the `$elements` array. |

## Login security

See [Login Security](../features/login-security.md) for what these do.

| Hook | Type | Purpose |
|------|------|---------|
| `wbcom_essential_login_security_enabled` | Filter | Return `false` to turn off the lockout and the spam trap. Default `true`. |
| `wbcom_essential_login_security_trusted_proxies` | Filter | Array of proxy IP addresses or CIDR ranges (IPv4 or IPv6) whose forwarded IP headers are trusted. Default empty. |
| `wbcom_essential_login_security_client_ip` | Filter | The IP address used for the lockout. Receives `$ip`. |

## EDD account and checkout

| Hook | Type | Purpose |
|------|------|---------|
| `wbcom_essential_edd_dashboard_top` | Action | Runs at the top of the Account Dashboard tab. Receives `$customer`, an EDD customer or `false`. |
| `wbcom_essential_edd_dashboard_after_greeting` | Action | Runs after the greeting, before the marketing sections. Receives `$customer`. |
| `wbcom_essential_edd_free_plugins_top` | Action | Runs at the top of the Free Plugins tab. Receives `$customer`. |
| `wbcom_essential_edd_free_download_ids` | Filter | The download IDs shown on the Free Plugins tab. Receives an array of IDs. |
| `wbcom_essential_edd_offers_shop_url` | Filter | The shop URL the special-offers banner links to. |
| `wbcom_essential_cancel_feedback_email` | Filter | The email sent to the site admin when a customer cancels a subscription. Receives an array with `to`, `subject` and `body`, then the subscription, the reason key and the comment. |
| `wbcom_essential_edd_login_icon_html` | Filter | The brand mark shown on the Account Dashboard login card. Return your own `<img>`. |
| `wbcom_edd_checkout_trustpilot` | Filter | The Trustpilot data of the Checkout Social Proof block: `enabled`, `rating`, `total`, `url` and `reviews`. |
| `wbcom_essential_edd_free_claim_limit` | Filter | Free claims allowed per user per hour. Default `10`. |
| `wbcom_essential_free_claim` | Action | After a free product is claimed. Receives `$download_id`, `$user_id`, `$payment_id`. |
| `wbcom_essential_product_catalog_public_permission` | Filter | Whether the Product Catalog's product and category routes are public. Default `true`. Return `false` or a `WP_Error` to restrict them. |

## Templates and theme detection

| Hook | Type | Purpose |
|------|------|---------|
| `wbcom_essential_locate_template` | Filter | The resolved template path. Receives `$template`, `$template_name`, `$template_path`, `$default_path`. See [Template Overrides](template-overrides.md). |
| `wbcom_essential_friend_requests_data` | Filter | The friend requests shown in the header widgets. Receives `$requests`, `$user_id`, `$limit`. |
| `wbcom_essential_user_progress_formatted` | Filter | The formatted progress data of the Profile Completion widget. |
| `wbcom_essential_posts_revolution_elementor_thumbs` | Filter | Thumbnail markup in Posts Revolution. Receives `$return`, `$post`. |
| `wbcom_essential_posts_revolution_elementor_format_icon` | Filter | The post format icon in Posts Revolution. Receives `$return`, `$format`. |
| `wbcom_essential_wp_cron_disabled` | Filter | Whether the background licence activation should treat WP-Cron as unusable. Return `false` if you run a real system cron with `DISABLE_WP_CRON`. |
| `wbcom_essential_header_user_menu_items` | Action | Runs inside the Header Bar user menu, so you can add items. |

## Widget extension points

| Hook | Type | Purpose |
|------|------|---------|
| `wbcom_essential/widget/branding/settings` | Action | Add controls to the Branding widget. Receives the widget. |
| `wbcom_essential_branding_elementor_controls` | Action | Add controls to the Branding widget. Receives the widget. |
| `wbcom_essential/widget/members-listing/settings` | Action | Add controls to the Members Grid and Members Carousel widgets. |
| `wbcom_essential/widget/groups-listing/settings` | Action | Add controls to the Group Carousel widget. |
| `wbcom_essential/widget/groups-grid/settings` | Action | Add controls to the Groups Grid widget. |
| `wbcom_essential/members-loop/before/template` | Filter | Settings passed to the members loop before it renders. |
| `wbcom_essential/members-loop/after/template` | Filter | Settings passed to the members loop after it renders. |
| `wbcom_essential/groups-loop/before/template` | Filter | Settings passed to the groups loop before it renders. |
| `wbcom_essential/groups-loop/after/template` | Filter | Settings passed to the groups loop after it renders. |

## Older `wbcom_` hooks

These are used by the WooCommerce widgets and a few others and are still supported.

| Hook | Type | Purpose |
|------|------|---------|
| `wbcom_product_query_args` | Filter | Query arguments of the product widgets. |
| `wbcom_sale_badge_text` | Filter | The sale badge text. Default "Sale!". |
| `wbcom_custom_saleflash_text` | Filter | Custom sale flash text. |
| `wbcom_show_custom_product_badge` | Filter | Whether to show the custom product badge. |
| `wbcom_shop_out_of_stock_text` | Filter | The "Out of stock" label. |
| `wbcom_universal_before_title`, `wbcom_universal_after_title`, `wbcom_universal_before_price`, `wbcom_universal_after_price` | Action | Around the title and price in the Universal Product widget. |
| `wbcom_addon_after_price` | Action | After the price in the Product Tab widget. |
| `wbcom_btn_skins` | Filter | The button animation choices in the Flip Box, Pricing Table and Post Timeline widgets. |
| `wbcom_allowed_html_tags`, `wbcom_default_html_tag` | Filter | The heading tags the WooCommerce widgets accept, and the tag used when an invalid one is given. |
| `wbcom_post_name_options`, `wbcom_post_name_query_args`, `wbcom_taxonomy_list_options` | Filter | The post and taxonomy choices offered in widget settings. |
| `wba_number_of_users_per_query` | Filter | How many users the widget settings load at a time. Default 50. |
| `wbcom_submenu_label` | Filter | The label of a plugin's entry in the shared **Wbcom Designs** admin menu. |
| `wbcom_recaptcha_login_form` | Action | Inside the Login Form widget, for a captcha add-on. |
| `wbcom_ele_notification_login_url` | Filter | Login URL in the Header Notification Area widget. |
| `wbcom_ele_notification_registration_url` | Filter | Registration URL in the Header Notification Area widget. |

## Helper functions

| Function | What it does |
|----------|--------------|
| `wbcom_essential_is_theme_active( $slug )` | `true` when the active theme, or its parent, has that folder slug, for example `'reign'`, `'buddyx'` or `'buddyx-pro'`. It compares slugs, not display names, so it works in any site language. |
| `wbcom_essential_product_visibility_tax_query()` | A WooCommerce `tax_query` clause that leaves out products hidden from the catalog, and out-of-stock products when your store hides them. Returns an empty array when there is nothing to exclude. Use it in your own product queries so they match the shop. |
| `wbcom_essential_licence_request( array $params )` | One licence-server request (activate, deactivate or check) through the bundled update library. Returns the decoded reply or `false`. |
| `wbcom_essential_get_template( $name, $args, $path, $default )` | Includes a plugin template, letting your theme override it. See [Template Overrides](template-overrides.md). |
| `wbcom_essential_get_column_class( $type, $viewport )` | The CSS column class for a column count. |

Example: show only visible products in your own query.

```php
$args = array(
	'post_type'  => 'product',
	'tax_query'  => array_filter( array( wbcom_essential_product_visibility_tax_query() ) ),
);
```

`_is_theme_active()` and `_get_column_class()` are older names that still work and are deprecated since 4.7.2. Use the `wbcom_essential_` names.

## Related

- [REST API, AJAX and Shortcode](rest-api-and-ajax.md)
- [Template Overrides](template-overrides.md)
- [Login Security](../features/login-security.md)
