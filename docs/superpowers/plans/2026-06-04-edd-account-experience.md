# EDD Account Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Personalized EDD My Account hub (offers, what's new, recommendations, one-click free plugin claims) in wbcom-essential 4.6.0, wired up and Reign-8.0.0-verified on wbcom-edd.local.

**Architecture:** Extend the existing `edd-account-dashboard` block. New server code goes in a NEW file `includes/edd-account-marketing-functions.php` (keeps the 1,635-line functions file from growing). New "Free Plugins" tab + 3 dashboard sections reuse the existing `wbcom/v1/edd-account/(?P<tab>)` REST loader, `wbcom_essential_edd_empty_state()`/`wbcom_essential_edd_tab_header()` helpers, and BEM/`.wbe-` token conventions. Free claims create completed $0 orders via the EDD-3-supported `edd_insert_payment()` compat API. Site-specific presentation lives in reign-child-theme only.

**Tech Stack:** PHP (WPCS), EDD Pro 3.6.8 APIs, @wordpress/scripts block build (`npm run build:blocks`), vanilla-JS `view.js`, Playwright MCP for browser verification. No PHPUnit infra in this repo — verification = `php -l` + WPCS pre-commit + `wp eval` smoke + browser.

**Spec:** `docs/superpowers/specs/2026-06-04-edd-account-experience-design.md`

**Working directory (all tasks):** `/Users/varundubey/Local Sites/wbcom-edd/app/public/wp-content/plugins/wbcom-essential` (branch `4.6.0`). WP root: `/Users/varundubey/Local Sites/wbcom-edd/app/public`.

---

## Phase 0 — Test bed

### Task 1: Seed script

**Files:**
- Create: `scripts/seed-edd-testbed.php` (dev tool, excluded from dist — `scripts/` already isn't shipped)

- [ ] **Step 1: Write the seed script**

```php
<?php
/**
 * Seed wbcom-edd.local with EDD test data for the account-experience work.
 * Run: wp eval-file wp-content/plugins/wbcom-essential/scripts/seed-edd-testbed.php
 * Idempotent: re-running updates rather than duplicates (matched by slug/code/email).
 *
 * @package WBCOM_Essential
 */

defined( 'WP_CLI' ) || exit;

/** Create (or fetch) a download. */
function wbe_seed_download( $title, $slug, $price, $args = array() ) {
	$existing = get_page_by_path( $slug, OBJECT, 'download' );
	$post_id  = $existing ? $existing->ID : wp_insert_post(
		array(
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_type'    => 'download',
			'post_status'  => 'publish',
			'post_excerpt' => $args['excerpt'] ?? 'Test product for the account experience.',
			'post_content' => $args['content'] ?? 'Seeded test product.',
		)
	);

	update_post_meta( $post_id, 'edd_price', edd_sanitize_amount( $price ) );

	// Attach a real downloadable file (tiny zip in uploads).
	$upload_dir = wp_upload_dir();
	$zip_path   = trailingslashit( $upload_dir['basedir'] ) . 'edd/' . $slug . '.zip';
	if ( ! file_exists( $zip_path ) ) {
		wp_mkdir_p( dirname( $zip_path ) );
		$zip = new ZipArchive();
		$zip->open( $zip_path, ZipArchive::CREATE );
		$zip->addFromString( 'readme.txt', $title . ' test package' );
		$zip->close();
	}
	update_post_meta(
		$post_id,
		'edd_download_files',
		array(
			1 => array(
				'index'          => 0,
				'attachment_id'  => 0,
				'name'           => $slug . '.zip',
				'file'           => trailingslashit( $upload_dir['baseurl'] ) . 'edd/' . $slug . '.zip',
				'condition'      => 'all',
				'thumbnail_size' => false,
			),
		)
	);

	if ( ! empty( $args['licensing'] ) ) {
		update_post_meta( $post_id, '_edd_sl_enabled', 1 );
		update_post_meta( $post_id, '_edd_sl_version', '1.0.0' );
		update_post_meta( $post_id, '_edd_sl_limit', 1 );
	}
	if ( ! empty( $args['recurring'] ) ) {
		update_post_meta( $post_id, 'edd_recurring', 'yes' );
		update_post_meta( $post_id, 'edd_period', 'year' );
		update_post_meta( $post_id, 'edd_times', 0 );
		update_post_meta( $post_id, 'edd_signup_fee', 0 );
	}
	if ( ! empty( $args['category'] ) ) {
		wp_set_object_terms( $post_id, $args['category'], 'download_category' );
	}

	return $post_id;
}

/** Create a completed order for a user. */
function wbe_seed_order( $user, $download_id, $price ) {
	$payment_data = array(
		'price'        => (float) $price,
		'date'         => gmdate( 'Y-m-d H:i:s', time() - wp_rand( 86400, 86400 * 60 ) ),
		'user_email'   => $user->user_email,
		'purchase_key' => strtolower( md5( uniqid( '', true ) ) ),
		'currency'     => edd_get_currency(),
		'downloads'    => array( array( 'id' => $download_id, 'options' => array(), 'quantity' => 1 ) ),
		'user_info'    => array(
			'id'         => $user->ID,
			'email'      => $user->user_email,
			'first_name' => $user->first_name ? $user->first_name : 'Test',
			'last_name'  => $user->last_name ? $user->last_name : 'Customer',
			'discount'   => 'none',
			'address'    => array(),
		),
		'cart_details' => array(
			array(
				'name'        => get_the_title( $download_id ),
				'id'          => $download_id,
				'item_number' => array( 'id' => $download_id, 'options' => array(), 'quantity' => 1 ),
				'item_price'  => (float) $price,
				'quantity'    => 1,
				'discount'    => 0.00,
				'subtotal'    => (float) $price,
				'tax'         => 0.00,
				'price'       => (float) $price,
			),
		),
		'gateway'      => 'manual',
		'status'       => 'pending',
	);

	$payment_id = edd_insert_payment( $payment_data );
	if ( $payment_id ) {
		edd_update_payment_status( $payment_id, 'complete' );
	}
	return $payment_id;
}

// --- 1. Categories.
foreach ( array( 'BuddyPress Addons', 'Themes', 'WooCommerce Addons' ) as $cat ) {
	if ( ! term_exists( $cat, 'download_category' ) ) {
		wp_insert_term( $cat, 'download_category' );
	}
}

// --- 2. Free/pro pairs + extras.
$pairs = array(
	array( 'BuddyPress Polls', 'buddypress-polls', 'BuddyPress Polls Pro', 'buddypress-polls-pro', 49, 'BuddyPress Addons' ),
	array( 'BuddyPress Hashtags', 'buddypress-hashtags', 'BuddyPress Hashtags Pro', 'buddypress-hashtags-pro', 39, 'BuddyPress Addons' ),
	array( 'Wbcom Essential', 'wbcom-essential-free', 'BuddyX Pro Theme', 'buddyx-pro-theme', 59, 'Themes' ),
);
$ids = array();
foreach ( $pairs as $p ) {
	list( $free_title, $free_slug, $pro_title, $pro_slug, $pro_price, $cat ) = $p;
	$free_id = wbe_seed_download( $free_title, $free_slug, 0, array( 'category' => $cat ) );
	$pro_id  = wbe_seed_download( $pro_title, $pro_slug, $pro_price, array( 'category' => $cat, 'licensing' => true ) );
	update_post_meta( $free_id, '_wbcom_pro_counterpart', $pro_id );
	$ids[ $free_slug ] = $free_id;
	$ids[ $pro_slug ]  = $pro_id;
}
$ids['club']  = wbe_seed_download( 'Wbcom Club Membership', 'wbcom-club', 199, array( 'category' => 'Themes', 'recurring' => true, 'licensing' => true ) );
$ids['plain'] = wbe_seed_download( 'WooCommerce Reports Addon', 'wc-reports-addon', 29, array( 'category' => 'WooCommerce Addons' ) );

// --- 3. Discounts (1 flagged for the account banner).
if ( ! edd_get_discount_by_code( 'SUMMER20' ) ) {
	$d1 = edd_add_discount(
		array(
			'name'        => 'Summer Sale 20% Off',
			'code'        => 'SUMMER20',
			'status'      => 'active',
			'type'        => 'percent',
			'amount'      => 20,
			'scope'       => 'global',
			'amount_type' => 'percent',
		)
	);
	edd_update_adjustment_meta( $d1, '_wbcom_show_in_account', 1 );
}
if ( ! edd_get_discount_by_code( 'PARTNER50' ) ) {
	// Internal code — intentionally NOT flagged; must never appear in the account UI.
	edd_add_discount(
		array(
			'name'        => 'Partner Internal',
			'code'        => 'PARTNER50',
			'status'      => 'active',
			'type'        => 'percent',
			'amount'      => 50,
			'scope'       => 'global',
			'amount_type' => 'percent',
		)
	);
}

// --- 4. Test customer with history.
$user = get_user_by( 'email', 'customer@test.local' );
if ( ! $user ) {
	$uid = wp_create_user( 'testcustomer', 'testcustomer', 'customer@test.local' );
	wp_update_user( array( 'ID' => $uid, 'first_name' => 'Test', 'last_name' => 'Customer', 'display_name' => 'Test Customer' ) );
	$user = get_user_by( 'id', $uid );
}
if ( ! edd_count_orders( array( 'customer_id' => (int) edd_get_customer_by( 'user_id', $user->ID )->id ?? 0 ) ) ) {
	wbe_seed_order( $user, $ids['buddypress-polls'], 0 );          // Owns a free plugin (→ pro reco).
	wbe_seed_order( $user, $ids['wc-reports-addon'], 29 );          // Paid order.
	wbe_seed_order( $user, $ids['buddyx-pro-theme'], 59 );          // Licensed product.
}

WP_CLI::success( 'Seed complete. Downloads: ' . count( $ids ) . '. Login: testcustomer / customer@test.local' );
```

- [ ] **Step 2: Run it and verify**

```bash
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval-file wp-content/plugins/wbcom-essential/scripts/seed-edd-testbed.php
wp post list --post_type=download --fields=ID,post_title --format=count   # Expect: 8+
wp eval 'var_dump( (bool) edd_get_discount_by_code( "SUMMER20" ) );'       # Expect: bool(true)
wp eval '$c = edd_get_customer_by( "user_id", get_user_by( "email", "customer@test.local" )->ID ); echo $c ? $c->purchase_count : "NO CUSTOMER";'  # Expect: 3
```

If `edd_count_orders` guard errors on first run (customer doesn't exist yet), fix the guard to `$customer = edd_get_customer_by(...); if ( ! $customer || ! $customer->purchase_count )`.

- [ ] **Step 3: Commit**

```bash
git add scripts/seed-edd-testbed.php && git commit -m "chore: add EDD test-bed seed script for account experience work"
```

---

## Phase 1 — wbcom-essential 4.6.0 features

### Task 2: Marketing functions file — skeleton + shared helpers

**Files:**
- Create: `includes/edd-account-marketing-functions.php`
- Modify: `wbcom-essential.php:132` (add require directly below the existing account-functions require)

- [ ] **Step 1: Create the file with helpers**

```php
<?php
/**
 * EDD account marketing features: offers, what's new, recommendations,
 * free-plugin claims. Companions to edd-account-dashboard-functions.php.
 *
 * @package WBCOM_Essential
 * @since   4.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get IDs of all published flat-price free downloads.
 *
 * Variable-priced products are excluded by design: a $0 variant on a paid
 * product is a pricing option, not a free product.
 *
 * @return int[]
 */
function wbcom_essential_edd_get_free_download_ids() {
	$ids = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'fields'         => 'ids',
			'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				array(
					'key'     => 'edd_price',
					'value'   => array( '0', '0.00', '' ),
					'compare' => 'IN',
				),
			),
		)
	);

	// Server-side re-check: edd_is_free_download() is the source of truth.
	$ids = array_filter(
		array_map( 'absint', $ids ),
		static function ( $id ) {
			return edd_is_free_download( $id ) && ! edd_has_variable_prices( $id );
		}
	);

	/**
	 * Filter the free download IDs shown on the account Free Plugins tab.
	 *
	 * @since 4.6.0
	 * @param int[] $ids Download IDs.
	 */
	return apply_filters( 'wbcom_essential_edd_free_download_ids', array_values( $ids ) );
}

/**
 * Whether the current user owns (has purchased/claimed) a download.
 *
 * @param int $download_id Download ID.
 * @return bool
 */
function wbcom_essential_edd_user_owns_download( $download_id ) {
	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return false;
	}
	return (bool) edd_has_user_purchased( $user_id, array( absint( $download_id ) ) );
}

/**
 * Get the pro counterpart download ID for a download, or 0.
 *
 * @param int $download_id Download ID.
 * @return int
 */
function wbcom_essential_edd_get_pro_counterpart( $download_id ) {
	$pro_id = absint( get_post_meta( $download_id, '_wbcom_pro_counterpart', true ) );
	if ( ! $pro_id || 'publish' !== get_post_status( $pro_id ) ) {
		return 0;
	}
	return $pro_id;
}
```

- [ ] **Step 2: Require it in `wbcom-essential.php`**

In `includes()`, directly after line 132:

```php
			require_once WBCOM_ESSENTIAL_PATH . '/includes/edd-account-marketing-functions.php';
```

- [ ] **Step 3: Lint + smoke**

```bash
php -l includes/edd-account-marketing-functions.php   # Expect: No syntax errors
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval 'print_r( wbcom_essential_edd_get_free_download_ids() );'   # Expect: array of 3 free IDs
wp eval 'echo wbcom_essential_edd_get_pro_counterpart( (int) get_page_by_path( "buddypress-polls", OBJECT, "download" )->ID );'  # Expect: the pro ID
```

- [ ] **Step 4: Commit**

```bash
git add includes/edd-account-marketing-functions.php wbcom-essential.php
git commit -m "feat(edd-account): add marketing functions file with free-download helpers"
```

### Task 3: Discount "show in account" flag + offers query

**Files:**
- Modify: `includes/edd-account-marketing-functions.php` (append)

- [ ] **Step 1: Append admin field + save + query**

```php
/**
 * Render "Show in account dashboard" checkbox on the discount add/edit screens.
 *
 * @param int               $discount_id Discount ID (0 on the add screen).
 * @param EDD_Discount|null $discount    Discount object or null.
 */
function wbcom_essential_edd_discount_account_field( $discount_id = 0, $discount = null ) {
	$flagged = $discount_id ? (bool) edd_get_adjustment_meta( $discount_id, '_wbcom_show_in_account', true ) : false;
	wp_nonce_field( 'wbcom_essential_discount_account', 'wbcom_essential_discount_account_nonce' );
	?>
	<tr>
		<th scope="row" valign="top">
			<label for="wbcom-show-in-account"><?php esc_html_e( 'Account Dashboard', 'wbcom-essential' ); ?></label>
		</th>
		<td>
			<input type="checkbox" id="wbcom-show-in-account" name="wbcom_show_in_account" value="1" <?php checked( $flagged ); ?> />
			<label for="wbcom-show-in-account" class="description">
				<?php esc_html_e( 'Show this discount as a special offer on the customer account dashboard.', 'wbcom-essential' ); ?>
			</label>
		</td>
	</tr>
	<?php
}
add_action( 'edd_edit_discount_form_bottom', 'wbcom_essential_edd_discount_account_field', 10, 2 );
add_action( 'edd_add_discount_form_bottom', 'wbcom_essential_edd_discount_account_field', 10, 2 );

/**
 * Persist the flag when a discount is added/updated.
 *
 * @param array $args        Discount args.
 * @param int   $discount_id Discount ID.
 */
function wbcom_essential_edd_save_discount_account_flag( $args, $discount_id ) {
	if ( ! current_user_can( 'manage_shop_discounts' ) ) {
		return;
	}
	if (
		! isset( $_POST['wbcom_essential_discount_account_nonce'] )
		|| ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wbcom_essential_discount_account_nonce'] ) ), 'wbcom_essential_discount_account' )
	) {
		return;
	}
	if ( ! empty( $_POST['wbcom_show_in_account'] ) ) {
		edd_update_adjustment_meta( $discount_id, '_wbcom_show_in_account', 1 );
	} else {
		edd_delete_adjustment_meta( $discount_id, '_wbcom_show_in_account' );
	}
}
add_action( 'edd_post_insert_discount', 'wbcom_essential_edd_save_discount_account_flag', 10, 2 );
add_action( 'edd_post_update_discount', 'wbcom_essential_edd_save_discount_account_flag', 10, 2 );

/**
 * Get active, flagged, still-usable discounts for the account banner.
 *
 * @return EDD_Discount[] Max 2.
 */
function wbcom_essential_edd_get_account_offers() {
	$discounts = edd_get_discounts(
		array(
			'status' => 'active',
			'number' => 20,
		)
	);
	if ( ! is_array( $discounts ) ) {
		return array();
	}

	$offers = array();
	foreach ( $discounts as $discount ) {
		if ( ! edd_get_adjustment_meta( $discount->id, '_wbcom_show_in_account', true ) ) {
			continue;
		}
		// Respect date window + max uses (EDD_Discount helpers).
		if ( method_exists( $discount, 'is_expired' ) && $discount->is_expired( false ) ) {
			continue;
		}
		if ( method_exists( $discount, 'is_maxed_out' ) && $discount->is_maxed_out( false ) ) {
			continue;
		}
		$offers[] = $discount;
		if ( count( $offers ) >= 2 ) {
			break;
		}
	}

	return $offers;
}
```

- [ ] **Step 2: Lint + smoke**

```bash
php -l includes/edd-account-marketing-functions.php
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval '$o = wbcom_essential_edd_get_account_offers(); echo count( $o ) . " offers, first: " . ( $o ? $o[0]->code : "none" );'
# Expect: "1 offers, first: SUMMER20" (PARTNER50 must NOT appear)
```

- [ ] **Step 3: Commit**

```bash
git add includes/edd-account-marketing-functions.php
git commit -m "feat(edd-account): discount show-in-account flag + offers query"
```

### Task 4: Pro counterpart field in Download Settings

**Files:**
- Modify: `includes/edd-account-marketing-functions.php` (append)

- [ ] **Step 1: Append metabox field + save registration**

```php
/**
 * Render "Pro counterpart" select in the Download Settings metabox.
 *
 * @param int $post_id Download post ID.
 */
function wbcom_essential_edd_render_pro_counterpart_row( $post_id ) {
	$current   = absint( get_post_meta( $post_id, '_wbcom_pro_counterpart', true ) );
	$downloads = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 200,
			'orderby'        => 'title',
			'order'          => 'ASC',
			'exclude'        => array( $post_id ),
		)
	);
	?>
	<div class="edd-form-group edd-product-options-wrapper">
		<div class="edd-form-group__control">
			<label for="wbcom_pro_counterpart" class="edd-form-group__label">
				<?php esc_html_e( 'Pro Counterpart', 'wbcom-essential' ); ?>
			</label>
			<select name="_wbcom_pro_counterpart" id="wbcom_pro_counterpart" class="edd-form-group__input">
				<option value=""><?php esc_html_e( '— None —', 'wbcom-essential' ); ?></option>
				<?php foreach ( $downloads as $download ) : ?>
					<option value="<?php echo esc_attr( $download->ID ); ?>" <?php selected( $current, $download->ID ); ?>>
						<?php echo esc_html( $download->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
			<p class="edd-form-group__help description">
				<?php esc_html_e( 'Used by the account dashboard to recommend the pro upgrade to owners of this product.', 'wbcom-essential' ); ?>
			</p>
		</div>
	</div>
	<?php
}
add_action( 'edd_meta_box_settings_fields', 'wbcom_essential_edd_render_pro_counterpart_row', 35 );

/**
 * Register the meta key with EDD's metabox save routine (sanitized as absint).
 *
 * @param array $fields Meta keys EDD persists on save.
 * @return array
 */
function wbcom_essential_edd_register_counterpart_save( $fields ) {
	$fields[] = '_wbcom_pro_counterpart';
	return $fields;
}
add_filter( 'edd_metabox_fields_save', 'wbcom_essential_edd_register_counterpart_save' );

/**
 * Sanitize the counterpart value on save (EDD applies edd_metabox_save_{key}).
 *
 * @param mixed $value Raw value.
 * @return int
 */
function wbcom_essential_edd_sanitize_counterpart( $value ) {
	return absint( $value );
}
add_filter( 'edd_metabox_save__wbcom_pro_counterpart', 'wbcom_essential_edd_sanitize_counterpart' );
```

- [ ] **Step 2: Lint + verify in admin**

```bash
php -l includes/edd-account-marketing-functions.php
```

Browser (Playwright MCP): open `http://wbcom-edd.local/wp-admin/post.php?post=<free-id>&action=edit&autologin=1`, confirm the "Pro Counterpart" select renders in Download Settings and shows the seeded value.

- [ ] **Step 3: Commit**

```bash
git add includes/edd-account-marketing-functions.php
git commit -m "feat(edd-account): pro counterpart field on download settings"
```

### Task 5: Dashboard sections — offers banner, what's new, recommendations

**Files:**
- Modify: `includes/edd-account-marketing-functions.php` (append renderers)
- Modify: `includes/edd-account-dashboard-functions.php:507` (dashboard render signature + section calls)
- Modify: `includes/edd-account-dashboard-functions.php:418-500` (REST callback passes sections)

- [ ] **Step 1: Append the three section renderers**

```php
/**
 * Render the special-offers banner (flagged active discounts).
 */
function wbcom_essential_edd_render_offers_section() {
	$offers = wbcom_essential_edd_get_account_offers();
	if ( empty( $offers ) ) {
		return;
	}
	$shop_url = function_exists( 'edd_get_checkout_uri' ) ? home_url( '/products/' ) : home_url( '/' );
	/**
	 * Filter the "Shop now" URL on the account offers banner.
	 *
	 * @since 4.6.0
	 * @param string $shop_url URL.
	 */
	$shop_url = apply_filters( 'wbcom_essential_edd_offers_shop_url', $shop_url );
	?>
	<div class="wbcom-edd-offers">
		<?php foreach ( $offers as $offer ) : ?>
			<div class="wbcom-edd-offer">
				<div class="wbcom-edd-offer__badge" aria-hidden="true">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
				</div>
				<div class="wbcom-edd-offer__body">
					<strong class="wbcom-edd-offer__title"><?php echo esc_html( $offer->name ); ?></strong>
					<span class="wbcom-edd-offer__desc">
						<?php
						printf(
							/* translators: 1: formatted discount amount, 2: discount code. */
							esc_html__( 'Save %1$s with code %2$s', 'wbcom-essential' ),
							esc_html( edd_format_discount_rate( $offer->type, $offer->amount ) ),
							'<code>' . esc_html( $offer->code ) . '</code>' // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped inline
						);
						?>
					</span>
				</div>
				<div class="wbcom-edd-offer__actions">
					<button type="button" class="wbcom-edd-offer__copy" data-code="<?php echo esc_attr( $offer->code ); ?>">
						<?php esc_html_e( 'Copy Code', 'wbcom-essential' ); ?>
					</button>
					<a class="wbcom-edd-offer__shop" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Shop Now', 'wbcom-essential' ); ?></a>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}

/**
 * Render the "What's New" row: 4 latest downloads the user doesn't own.
 */
function wbcom_essential_edd_render_whats_new_section() {
	$recent = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 8,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
	$cards = array();
	foreach ( $recent as $download ) {
		if ( wbcom_essential_edd_user_owns_download( $download->ID ) ) {
			continue;
		}
		$cards[] = $download;
		if ( count( $cards ) >= 4 ) {
			break;
		}
	}
	if ( empty( $cards ) ) {
		return;
	}
	?>
	<div class="wbcom-edd-dashboard__marketing-section wbcom-edd-whatsnew">
		<h3 class="wbcom-edd-dashboard__section-title"><?php esc_html_e( "What's New", 'wbcom-essential' ); ?></h3>
		<div class="wbcom-edd-card-row">
			<?php foreach ( $cards as $download ) : ?>
				<a class="wbcom-edd-mini-card" href="<?php echo esc_url( get_permalink( $download ) ); ?>">
					<?php if ( has_post_thumbnail( $download ) ) : ?>
						<span class="wbcom-edd-mini-card__thumb"><?php echo get_the_post_thumbnail( $download, 'medium' ); ?></span>
					<?php endif; ?>
					<span class="wbcom-edd-mini-card__title"><?php echo esc_html( get_the_title( $download ) ); ?></span>
					<span class="wbcom-edd-mini-card__price"><?php echo wp_kses_post( edd_price( $download->ID, false ) ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}

/**
 * Render "Recommended for You": pro upsells first, category-match fill. Max 4.
 *
 * @param EDD_Customer|false $customer EDD customer or false.
 */
function wbcom_essential_edd_render_recommendations_section( $customer = false ) {
	if ( ! $customer ) {
		return;
	}
	$user_id = get_current_user_id();
	$owned   = array();
	$orders  = edd_get_orders(
		array(
			'customer_id' => $customer->id,
			'status__in'  => array( 'complete', 'partially_refunded' ),
			'type'        => 'sale',
			'number'      => 100,
		)
	);
	foreach ( (array) $orders as $order ) {
		foreach ( $order->get_items() as $item ) {
			$owned[ (int) $item->product_id ] = true;
		}
	}
	if ( empty( $owned ) ) {
		return;
	}

	$recos = array();

	// Priority 1: pro counterparts of owned products that aren't owned.
	foreach ( array_keys( $owned ) as $owned_id ) {
		$pro_id = wbcom_essential_edd_get_pro_counterpart( $owned_id );
		if ( $pro_id && empty( $owned[ $pro_id ] ) && ! isset( $recos[ $pro_id ] ) ) {
			$recos[ $pro_id ] = 'upgrade';
		}
	}

	// Priority 2: category-match fill.
	if ( count( $recos ) < 4 ) {
		$terms = wp_get_object_terms( array_keys( $owned ), 'download_category', array( 'fields' => 'ids' ) );
		if ( ! is_wp_error( $terms ) && $terms ) {
			$fill = get_posts(
				array(
					'post_type'      => 'download',
					'post_status'    => 'publish',
					'posts_per_page' => 12,
					'post__not_in'   => array_merge( array_keys( $owned ), array_keys( $recos ) ), // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
					'fields'         => 'ids',
					'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						array(
							'taxonomy' => 'download_category',
							'terms'    => $terms,
						),
					),
				)
			);
			foreach ( $fill as $fill_id ) {
				if ( count( $recos ) >= 4 ) {
					break;
				}
				$recos[ $fill_id ] = 'related';
			}
		}
	}

	if ( empty( $recos ) ) {
		return;
	}
	?>
	<div class="wbcom-edd-dashboard__marketing-section wbcom-edd-recos">
		<h3 class="wbcom-edd-dashboard__section-title"><?php esc_html_e( 'Recommended for You', 'wbcom-essential' ); ?></h3>
		<div class="wbcom-edd-card-row">
			<?php foreach ( $recos as $reco_id => $reason ) : ?>
				<a class="wbcom-edd-mini-card<?php echo 'upgrade' === $reason ? ' wbcom-edd-mini-card--upgrade' : ''; ?>" href="<?php echo esc_url( get_permalink( $reco_id ) ); ?>">
					<?php if ( 'upgrade' === $reason ) : ?>
						<span class="wbcom-edd-mini-card__flag"><?php esc_html_e( 'Pro Upgrade', 'wbcom-essential' ); ?></span>
					<?php endif; ?>
					<?php if ( has_post_thumbnail( $reco_id ) ) : ?>
						<span class="wbcom-edd-mini-card__thumb"><?php echo get_the_post_thumbnail( $reco_id, 'medium' ); ?></span>
					<?php endif; ?>
					<span class="wbcom-edd-mini-card__title"><?php echo esc_html( get_the_title( $reco_id ) ); ?></span>
					<span class="wbcom-edd-mini-card__price"><?php echo wp_kses_post( edd_price( $reco_id, false ) ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}
```

- [ ] **Step 2: Wire sections into the dashboard render**

In `includes/edd-account-dashboard-functions.php`, change the signature at line 507 and insert section calls right after the greeting `</h2>` (line 574, before `.wbcom-edd-dashboard__stats`):

```php
function wbcom_essential_edd_render_dashboard_tab( $customer = false, $sections = null ) {
```

Default `$sections = null` means all sections on (back-compat with the two existing call sites that pass only `$customer`).

```php
		<?php
		$sections = is_array( $sections ) ? $sections : array( 'offers', 'whatsnew', 'recommendations' );
		if ( in_array( 'offers', $sections, true ) ) {
			wbcom_essential_edd_render_offers_section();
		}
		if ( in_array( 'whatsnew', $sections, true ) ) {
			wbcom_essential_edd_render_whats_new_section();
		}
		if ( in_array( 'recommendations', $sections, true ) ) {
			wbcom_essential_edd_render_recommendations_section( $customer );
		}
		?>
```

- [ ] **Step 3: REST callback passes sections**

In `wbcom_essential_edd_account_tab_callback()` (line 418), before the switch add:

```php
	// Section toggles travel as a comma list from the block's data attribute.
	$sections_param = $request->get_param( 'sections' );
	$sections       = null;
	if ( null !== $sections_param ) {
		$allowed  = array( 'offers', 'whatsnew', 'recommendations' );
		$sections = array_values( array_intersect( $allowed, array_map( 'sanitize_key', explode( ',', (string) $sections_param ) ) ) );
	}
```

and change the dashboard case to:

```php
			case 'dashboard':
				wbcom_essential_edd_render_dashboard_tab( $customer, $sections );
				break;
```

- [ ] **Step 4: Lint + smoke**

```bash
php -l includes/edd-account-marketing-functions.php && php -l includes/edd-account-dashboard-functions.php
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval 'wp_set_current_user( get_user_by( "email", "customer@test.local" )->ID ); $c = edd_get_customer_by( "user_id", get_current_user_id() ); ob_start(); wbcom_essential_edd_render_dashboard_tab( $c ); $h = ob_get_clean(); echo ( str_contains( $h, "SUMMER20" ) ? "OFFER-OK " : "OFFER-MISS " ), ( str_contains( $h, "Recommended for You" ) ? "RECO-OK " : "RECO-MISS " ), ( str_contains( $h, "Pro Upgrade" ) ? "UPSELL-OK" : "UPSELL-MISS" );'
# Expect: OFFER-OK RECO-OK UPSELL-OK
```

- [ ] **Step 5: Commit**

```bash
git add includes/edd-account-marketing-functions.php includes/edd-account-dashboard-functions.php
git commit -m "feat(edd-account): dashboard offers banner, what's new, recommendations"
```

### Task 6: Free Plugins tab

**Files:**
- Modify: `includes/edd-account-marketing-functions.php` (append tab renderer)
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/render.php:37` (valid tabs), `:139-149` (nav entry), `:181-203` (switch case)
- Modify: `includes/edd-account-dashboard-functions.php:106` (REST validate list) and `:465-484` (switch case)

- [ ] **Step 1: Append the tab renderer**

```php
/**
 * Render the Free Plugins tab: claimable $0 downloads with pro upsell CTAs.
 *
 * @param EDD_Customer|false $customer EDD customer or false (unused; claims key off user).
 */
function wbcom_essential_edd_render_free_plugins_tab( $customer = false ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found -- signature parity with sibling tab renderers.
	wbcom_essential_edd_tab_header(
		__( 'Free Plugins', 'wbcom-essential' ),
		__( 'Add free plugins to your library with one click — updates included.', 'wbcom-essential' )
	);

	$free_ids = wbcom_essential_edd_get_free_download_ids();
	if ( empty( $free_ids ) ) {
		wbcom_essential_edd_empty_state(
			'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
			__( 'No free plugins are available right now.', 'wbcom-essential' )
		);
		return;
	}
	?>
	<div class="wbcom-edd-free">
		<?php foreach ( $free_ids as $download_id ) : ?>
			<?php
			$owned  = wbcom_essential_edd_user_owns_download( $download_id );
			$pro_id = wbcom_essential_edd_get_pro_counterpart( $download_id );
			?>
			<div class="wbcom-edd-free__card" data-download-id="<?php echo esc_attr( $download_id ); ?>">
				<?php if ( has_post_thumbnail( $download_id ) ) : ?>
					<a class="wbcom-edd-free__thumb" href="<?php echo esc_url( get_permalink( $download_id ) ); ?>">
						<?php echo get_the_post_thumbnail( $download_id, 'medium' ); ?>
					</a>
				<?php endif; ?>
				<div class="wbcom-edd-free__body">
					<h3 class="wbcom-edd-free__title">
						<a href="<?php echo esc_url( get_permalink( $download_id ) ); ?>"><?php echo esc_html( get_the_title( $download_id ) ); ?></a>
					</h3>
					<p class="wbcom-edd-free__excerpt"><?php echo esc_html( get_the_excerpt( $download_id ) ); ?></p>
				</div>
				<div class="wbcom-edd-free__actions">
					<?php if ( $owned ) : ?>
						<span class="wbcom-edd-free__owned">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							<?php esc_html_e( 'In your library', 'wbcom-essential' ); ?>
						</span>
						<a class="wbcom-edd-free__goto" href="<?php echo esc_url( add_query_arg( 'tab', 'downloads' ) ); ?>" data-tab-link="downloads"><?php esc_html_e( 'View in Downloads', 'wbcom-essential' ); ?></a>
					<?php else : ?>
						<button type="button" class="wbcom-edd-free__claim" data-download-id="<?php echo esc_attr( $download_id ); ?>">
							<?php esc_html_e( 'Download Free', 'wbcom-essential' ); ?>
						</button>
					<?php endif; ?>
					<?php if ( $pro_id && ! wbcom_essential_edd_user_owns_download( $pro_id ) ) : ?>
						<a class="wbcom-edd-free__upgrade" href="<?php echo esc_url( get_permalink( $pro_id ) ); ?>">
							<?php esc_html_e( 'Upgrade to Pro', 'wbcom-essential' ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}
```

- [ ] **Step 2: Register the tab in `src/.../render.php`**

Line 37 — add to valid tabs:

```php
$valid_tabs = array( 'dashboard', 'subscriptions', 'downloads', 'free-plugins', 'licenses', 'purchases', 'profile' );
```

After the `downloads` nav entry (line 142), insert:

```php
$tabs['free-plugins'] = array(
	'label' => __( 'Free Plugins', 'wbcom-essential' ),
	'icon'  => '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
);
```

In the render switch (line 181), add before `licenses`:

```php
		case 'free-plugins':
			wbcom_essential_edd_render_free_plugins_tab( $customer );
			break;
```

- [ ] **Step 3: Register in REST loader**

`includes/edd-account-dashboard-functions.php` line 106 — add `'free-plugins'` to the validate array. In `wbcom_essential_edd_account_tab_callback()` switch, add:

```php
				case 'free-plugins':
					wbcom_essential_edd_render_free_plugins_tab( $customer );
					break;
```

- [ ] **Step 4: Lint + smoke**

```bash
php -l includes/edd-account-marketing-functions.php && php -l plugins/gutenberg/src/blocks/edd-account-dashboard/render.php
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval 'wp_set_current_user( get_user_by( "email", "customer@test.local" )->ID ); ob_start(); wbcom_essential_edd_render_free_plugins_tab(); $h = ob_get_clean(); echo substr_count( $h, "wbcom-edd-free__card" ) . " cards, owned: " . substr_count( $h, "In your library" ) . ", claims: " . substr_count( $h, "wbcom-edd-free__claim" );'
# Expect: 3 cards, owned: 1 (buddypress-polls), claims: 2
```

- [ ] **Step 5: Commit**

```bash
git add includes/ plugins/gutenberg/src/blocks/edd-account-dashboard/render.php
git commit -m "feat(edd-account): free plugins tab with claim buttons and pro upsells"
```

### Task 7: Claim REST endpoint

**Files:**
- Modify: `includes/edd-account-marketing-functions.php` (append)

- [ ] **Step 1: Append route + handler**

```php
/**
 * Register the free-claim REST route.
 */
function wbcom_essential_edd_claim_rest_route() {
	if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
		return;
	}
	register_rest_route(
		'wbcom/v1',
		'/edd-account/claim-free',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'wbcom_essential_edd_claim_free_callback',
			'permission_callback' => function () {
				return is_user_logged_in();
			},
			'args'                => array(
				'download_id' => array(
					'required'          => true,
					'type'              => 'integer',
					'sanitize_callback' => 'absint',
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'wbcom_essential_edd_claim_rest_route' );

/**
 * Claim a free download: create a completed $0 order, return the file URL.
 *
 * Idempotent (re-claim returns the existing access) and rate-limited.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function wbcom_essential_edd_claim_free_callback( $request ) {
	$download_id = absint( $request->get_param( 'download_id' ) );
	$user        = wp_get_current_user();

	// Server-side truth: must be a published, flat-price, genuinely free product.
	if (
		'download' !== get_post_type( $download_id )
		|| 'publish' !== get_post_status( $download_id )
		|| ! edd_is_free_download( $download_id )
		|| edd_has_variable_prices( $download_id )
	) {
		return new WP_Error( 'wbcom_invalid_download', __( 'This product cannot be claimed.', 'wbcom-essential' ), array( 'status' => 400 ) );
	}

	// Idempotency: already owned → no new order.
	if ( ! edd_has_user_purchased( $user->ID, array( $download_id ) ) ) {

		// Rate limit: 10 claims/hour/user (filterable).
		$limit_key = 'wbcom_free_claims_' . $user->ID;
		$claims    = (int) get_transient( $limit_key );
		/**
		 * Filter the max free claims per user per hour.
		 *
		 * @since 4.6.0
		 * @param int $max Max claims. Default 10.
		 */
		$max_claims = (int) apply_filters( 'wbcom_essential_edd_free_claim_limit', 10 );
		if ( $claims >= $max_claims ) {
			return new WP_Error( 'wbcom_claim_limit', __( 'Claim limit reached. Please try again later.', 'wbcom-essential' ), array( 'status' => 429 ) );
		}
		set_transient( $limit_key, $claims + 1, HOUR_IN_SECONDS );

		$payment_data = array(
			'price'        => 0.00,
			'date'         => gmdate( 'Y-m-d H:i:s' ),
			'user_email'   => $user->user_email,
			'purchase_key' => strtolower( md5( uniqid( '', true ) ) ),
			'currency'     => edd_get_currency(),
			'downloads'    => array( array( 'id' => $download_id, 'options' => array(), 'quantity' => 1 ) ),
			'user_info'    => array(
				'id'         => $user->ID,
				'email'      => $user->user_email,
				'first_name' => $user->first_name,
				'last_name'  => $user->last_name,
				'discount'   => 'none',
				'address'    => array(),
			),
			'cart_details' => array(
				array(
					'name'        => get_the_title( $download_id ),
					'id'          => $download_id,
					'item_number' => array( 'id' => $download_id, 'options' => array(), 'quantity' => 1 ),
					'item_price'  => 0.00,
					'quantity'    => 1,
					'discount'    => 0.00,
					'subtotal'    => 0.00,
					'tax'         => 0.00,
					'price'       => 0.00,
				),
			),
			'gateway'      => 'manual',
			'status'       => 'pending',
		);

		$payment_id = edd_insert_payment( $payment_data );
		if ( ! $payment_id ) {
			return new WP_Error( 'wbcom_claim_failed', __( 'Could not record your claim. Please try again.', 'wbcom-essential' ), array( 'status' => 500 ) );
		}
		edd_update_payment_status( $payment_id, 'complete' );

		/**
		 * Fires after a free download is claimed from the account dashboard.
		 * CRM/automation (e.g. Groundhogg) can hook this for upsell campaigns.
		 *
		 * @since 4.6.0
		 * @param int $download_id Download ID.
		 * @param int $user_id     User ID.
		 * @param int $payment_id  Created order ID.
		 */
		do_action( 'wbcom_essential_free_claim', $download_id, $user->ID, $payment_id );
	}

	// Build a signed file URL from the user's most recent order containing this download.
	$download_url = '';
	$orders       = edd_get_orders(
		array(
			'user_id'    => $user->ID,
			'status__in' => array( 'complete' ),
			'type'       => 'sale',
			'number'     => 100,
		)
	);
	foreach ( (array) $orders as $order ) {
		foreach ( $order->get_items() as $item ) {
			if ( (int) $item->product_id === $download_id ) {
				$files = edd_get_download_files( $download_id );
				if ( $files ) {
					$filekey      = array_key_first( $files );
					$download_url = edd_get_download_file_url( $order->payment_key, $user->user_email, $filekey, $download_id );
				}
				break 2;
			}
		}
	}

	return rest_ensure_response(
		array(
			'claimed'      => true,
			'download_url' => $download_url,
			'message'      => __( 'Added to your library!', 'wbcom-essential' ),
		)
	);
}
```

- [ ] **Step 2: Lint + smoke (claim as a fresh user)**

```bash
php -l includes/edd-account-marketing-functions.php
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp eval '
wp_set_current_user( get_user_by( "email", "customer@test.local" )->ID );
$free = get_page_by_path( "buddypress-hashtags", OBJECT, "download" )->ID;  // NOT yet owned
$req  = new WP_REST_Request( "POST", "/wbcom/v1/edd-account/claim-free" );
$req->set_param( "download_id", $free );
$res = wbcom_essential_edd_claim_free_callback( $req );
$data = $res->get_data();
echo "claimed: " . var_export( $data["claimed"], true ) . ", url: " . ( $data["download_url"] ? "YES" : "EMPTY" ) . ", owned-now: " . var_export( edd_has_user_purchased( get_current_user_id(), array( $free ) ), true );
'
# Expect: claimed: true, url: YES, owned-now: true
wp eval '
wp_set_current_user( get_user_by( "email", "customer@test.local" )->ID );
$free = get_page_by_path( "buddypress-hashtags", OBJECT, "download" )->ID;
$before = edd_count_orders( array( "user_id" => get_current_user_id() ) );
$req = new WP_REST_Request( "POST", "/wbcom/v1/edd-account/claim-free" ); $req->set_param( "download_id", $free );
wbcom_essential_edd_claim_free_callback( $req );
echo ( edd_count_orders( array( "user_id" => get_current_user_id() ) ) === $before ) ? "IDEMPOTENT-OK" : "DUPLICATE-ORDER-BUG";
'
# Expect: IDEMPOTENT-OK
```

- [ ] **Step 3: Commit**

```bash
git add includes/edd-account-marketing-functions.php
git commit -m "feat(edd-account): claim-free REST endpoint with idempotency and rate limit"
```

### Task 8: view.js — claim + copy-code handlers, sections param

**Files:**
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/view.js`

- [ ] **Step 1: Add delegated handlers inside the existing IIFE/init**

Inside the per-container init (after the nav-link wiring, where `restUrl` and `nonce` are in scope), add:

```javascript
		// Sections toggle list from render.php (comma list; empty = all).
		var sections = container.dataset.sections || '';

		/**
		 * Delegated clicks: free-plugin claim + offer copy-code.
		 * Content arrives via REST so handlers must be delegated.
		 */
		container.addEventListener( 'click', function ( event ) {
			var claimBtn = event.target.closest( '.wbcom-edd-free__claim' );
			if ( claimBtn ) {
				event.preventDefault();
				claimFree( claimBtn );
				return;
			}

			var copyBtn = event.target.closest( '.wbcom-edd-offer__copy' );
			if ( copyBtn ) {
				event.preventDefault();
				copyOfferCode( copyBtn );
			}
		} );

		/**
		 * Claim a free download, then start the file download and flip the card UI.
		 *
		 * @param {HTMLElement} button Claim button.
		 */
		function claimFree( button ) {
			if ( button.disabled ) {
				return;
			}
			button.disabled = true;
			var originalLabel = button.textContent;
			button.textContent = button.dataset.busyLabel || '…';

			fetch( restUrl + 'claim-free', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': nonce,
				},
				body: JSON.stringify( { download_id: parseInt( button.dataset.downloadId, 10 ) } ),
			} )
				.then( function ( response ) {
					return response.json().then( function ( data ) {
						return { ok: response.ok, data: data };
					} );
				} )
				.then( function ( result ) {
					if ( ! result.ok || ! result.data.claimed ) {
						throw new Error( ( result.data && result.data.message ) || 'Claim failed' );
					}
					// Flip the button into the owned state.
					var actions = button.closest( '.wbcom-edd-free__actions' );
					if ( actions ) {
						var owned = document.createElement( 'span' );
						owned.className = 'wbcom-edd-free__owned';
						owned.textContent = result.data.message;
						actions.replaceChild( owned, button );
					}
					// Kick off the actual file download.
					if ( result.data.download_url ) {
						window.location.href = result.data.download_url;
					}
				} )
				.catch( function ( error ) {
					button.disabled = false;
					button.textContent = originalLabel;
					window.alert( error.message ); // eslint-disable-line no-alert
				} );
		}

		/**
		 * Copy a discount code to the clipboard with visual feedback.
		 *
		 * @param {HTMLElement} button Copy button.
		 */
		function copyOfferCode( button ) {
			var code = button.dataset.code || '';
			if ( ! code || ! navigator.clipboard ) {
				return;
			}
			navigator.clipboard.writeText( code ).then( function () {
				var original = button.textContent;
				button.textContent = button.dataset.copiedLabel || 'Copied!';
				button.classList.add( 'is-copied' );
				setTimeout( function () {
					button.textContent = original;
					button.classList.remove( 'is-copied' );
				}, 2000 );
			} );
		}
```

- [ ] **Step 2: Append sections to the dashboard tab fetch**

Find the existing tab fetch (`fetch( restUrl + encodeURIComponent( tab ), {` around line 432) and change the URL construction to:

```javascript
			var tabUrl = restUrl + encodeURIComponent( tab );
			if ( 'dashboard' === tab && sections ) {
				tabUrl += ( -1 === tabUrl.indexOf( '?' ) ? '?' : '&' ) + 'sections=' + encodeURIComponent( sections );
			}
			fetch( tabUrl, {
```

(keep the rest of the fetch options unchanged).

- [ ] **Step 3: Commit** (build happens in Task 10)

```bash
git add plugins/gutenberg/src/blocks/edd-account-dashboard/view.js
git commit -m "feat(edd-account): view.js claim + copy-code handlers, sections param"
```

### Task 9: Block attributes, editor controls, render data attr, styles

**Files:**
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/block.json` (attributes)
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/edit.js` (toggles + defaultTab option)
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/render.php` (sections data attr + pass to dashboard render)
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/style.scss` (new components)

- [ ] **Step 1: block.json — add attributes** (next to `showSupport`)

```json
		"showOffers": { "type": "boolean", "default": true },
		"showWhatsNew": { "type": "boolean", "default": true },
		"showRecommendations": { "type": "boolean", "default": true },
```

- [ ] **Step 2: edit.js — destructure + controls + defaultTab option**

Destructure the three new attributes alongside `showSupport` (line ~41). In the InspectorControls panel that holds the `showSupport` toggle, add (using the existing `ToggleControl` import):

```jsx
				<ToggleControl
					label={ __( 'Show special offers banner', 'wbcom-essential' ) }
					checked={ showOffers }
					onChange={ ( value ) => setAttributes( { showOffers: value } ) }
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					label={ __( "Show What's New", 'wbcom-essential' ) }
					checked={ showWhatsNew }
					onChange={ ( value ) => setAttributes( { showWhatsNew: value } ) }
					__nextHasNoMarginBottom
				/>
				<ToggleControl
					label={ __( 'Show recommendations', 'wbcom-essential' ) }
					checked={ showRecommendations }
					onChange={ ( value ) => setAttributes( { showRecommendations: value } ) }
					__nextHasNoMarginBottom
				/>
```

Add `{ label: __( 'Free Plugins', 'wbcom-essential' ), value: 'free-plugins' }` to the `defaultTab` SelectControl options (line ~107). Match the option-object shape already used there.

- [ ] **Step 3: render.php — sections data attribute + initial render**

After the `$default_tab` handling (line ~40), add:

```php
$sections = array();
if ( ! isset( $attributes['showOffers'] ) || $attributes['showOffers'] ) {
	$sections[] = 'offers';
}
if ( ! isset( $attributes['showWhatsNew'] ) || $attributes['showWhatsNew'] ) {
	$sections[] = 'whatsnew';
}
if ( ! isset( $attributes['showRecommendations'] ) || $attributes['showRecommendations'] ) {
	$sections[] = 'recommendations';
}
```

Add to the wrapper attributes array (line ~162):

```php
		'data-sections'   => esc_attr( implode( ',', $sections ) ),
```

Change both `dashboard` switch cases (`case 'dashboard':` and `default:`) to pass sections:

```php
		wbcom_essential_edd_render_dashboard_tab( $customer, $sections );
```

- [ ] **Step 4: style.scss — new component styles** (append; uses existing `--wbe-*`/`--wbcom-*` tokens and BEM conventions; mobile breakpoint included per existing file pattern)

```scss
/* --- Special offers banner ------------------------------------------- */
.wbcom-edd-offers {
	display: grid;
	gap: 12px;
	margin: 0 0 24px;
}

.wbcom-edd-offer {
	display: flex;
	align-items: center;
	gap: 16px;
	padding: 16px 20px;
	border-radius: 10px;
	background: linear-gradient(135deg, var(--wbcom-color-primary, #0073aa), color-mix(in srgb, var(--wbcom-color-primary, #0073aa) 70%, #000));
	color: #fff;

	&__badge { flex: 0 0 auto; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: rgba(255, 255, 255, 0.15); }
	&__body { flex: 1 1 auto; display: grid; gap: 2px; }
	&__title { font-size: 15px; }
	&__desc { font-size: 13px; opacity: 0.9;
		code { background: rgba(255, 255, 255, 0.2); border-radius: 4px; padding: 1px 6px; font-weight: 600; }
	}
	&__actions { display: flex; gap: 8px; flex: 0 0 auto; }
	&__copy,
	&__shop {
		font-size: 13px;
		font-weight: 600;
		padding: 8px 14px;
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.5);
		background: transparent;
		color: #fff;
		cursor: pointer;
		text-decoration: none;
		min-height: 40px;

		&:hover, &:focus-visible { background: rgba(255, 255, 255, 0.15); color: #fff; }
	}
	&__copy.is-copied { background: #fff; color: var(--wbcom-color-primary, #0073aa); }
}

/* --- Mini product cards (what's new / recommendations) ---------------- */
.wbcom-edd-dashboard__marketing-section { margin: 0 0 24px; }

.wbcom-edd-card-row {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 12px;
}

.wbcom-edd-mini-card {
	position: relative;
	display: grid;
	gap: 6px;
	padding: 12px;
	border: 1px solid var(--wbcom-card-border, #ddd);
	border-radius: 8px;
	background: var(--wbcom-card-bg, #fff);
	text-decoration: none;
	color: inherit;
	transition: box-shadow 0.15s ease;

	&:hover, &:focus-visible { box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08); }
	&__thumb img { width: 100%; height: auto; border-radius: 6px; display: block; }
	&__title { font-size: 14px; font-weight: 600; color: var(--wbcom-heading-color, inherit); }
	&__price { font-size: 13px; color: var(--wbcom-color-contrast-2, #495057); }
	&__flag {
		position: absolute;
		top: 8px;
		right: 8px;
		z-index: 1;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		padding: 3px 8px;
		border-radius: 99px;
		background: var(--wbcom-color-primary, #0073aa);
		color: #fff;
	}
}

/* --- Free plugins tab -------------------------------------------------- */
.wbcom-edd-free {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 16px;
}

.wbcom-edd-free__card {
	display: grid;
	grid-template-rows: auto 1fr auto;
	border: 1px solid var(--wbcom-card-border, #ddd);
	border-radius: 10px;
	background: var(--wbcom-card-bg, #fff);
	overflow: hidden;
}

.wbcom-edd-free__thumb img { width: 100%; height: auto; display: block; }
.wbcom-edd-free__body { padding: 14px 16px 0; }
.wbcom-edd-free__title { margin: 0 0 6px; font-size: 16px;
	a { color: var(--wbcom-heading-color, inherit); text-decoration: none; }
}
.wbcom-edd-free__excerpt { margin: 0; font-size: 13px; color: var(--wbcom-color-contrast-2, #495057); }

.wbcom-edd-free__actions {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	padding: 14px 16px;
}

.wbcom-edd-free__claim {
	min-height: 40px;
	padding: 8px 16px;
	border: 0;
	border-radius: 6px;
	background: var(--wbcom-color-primary, #0073aa);
	color: #fff;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;

	&:hover, &:focus-visible { filter: brightness(1.08); }
	&:disabled { opacity: 0.6; cursor: wait; }
}

.wbcom-edd-free__owned {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	font-size: 13px;
	font-weight: 600;
	color: #1a7f37;
}

.wbcom-edd-free__upgrade,
.wbcom-edd-free__goto {
	font-size: 13px;
	font-weight: 600;
	text-decoration: none;
	color: var(--wbcom-link-color, var(--wbcom-color-primary, #0073aa));
	min-height: 40px;
	display: inline-flex;
	align-items: center;
}

/* --- Responsive --------------------------------------------------------- */
@media (max-width: 1024px) {
	.wbcom-edd-card-row { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
	.wbcom-edd-card-row,
	.wbcom-edd-free { grid-template-columns: 1fr; }

	.wbcom-edd-offer {
		flex-direction: column;
		align-items: flex-start;

		&__actions { width: 100%;
			.wbcom-edd-offer__copy, .wbcom-edd-offer__shop { flex: 1 1 auto; text-align: center; justify-content: center; }
		}
	}
}
```

- [ ] **Step 5: Commit**

```bash
git add plugins/gutenberg/src/blocks/edd-account-dashboard/
git commit -m "feat(edd-account): section toggles, free-plugins tab option, marketing styles"
```

### Task 10: Build, WPCS, version bump

**Files:**
- Modify: `loader.php` (Version 4.5.0 → 4.6.0), `package.json` (version), `readme.txt` (stable tag + changelog)
- Generated: `build/blocks/edd-account-dashboard/*`

- [ ] **Step 1: Build blocks**

```bash
npm run build:blocks 2>&1 | tail -5    # Expect: success, no errors
ls build/blocks/edd-account-dashboard/ # render.php must contain the free-plugins case
grep -c "free-plugins" build/blocks/edd-account-dashboard/render.php   # Expect: >= 3
```

- [ ] **Step 2: Bump versions**

- `loader.php`: `* Version:           4.6.0` and any `WBCOM_ESSENTIAL_VERSION` define.
- `package.json`: `"version": "4.6.0"`.
- `readme.txt`: stable tag 4.6.0 + changelog entry in the WooCommerce action-prefix style:

```
= 4.6.0 - June 2026 =

* New      - Free Plugins tab on the EDD account dashboard with one-click claims for logged-in users.
* New      - Special offers banner on the account dashboard driven by flagged EDD discounts.
* New      - What's New and Recommended for You sections with pro-upgrade prioritization.
* New      - Pro Counterpart field on Download Settings powering upsell recommendations.
* Dev      - wbcom_essential_free_claim action and wbcom/v1/edd-account/claim-free REST route.
```

- [ ] **Step 3: WPCS gate**

Run `mcp__wpcs__wpcs_pre_commit` on the repo (or `mcp__wpcs__wpcs_check_file` on the two `includes/` files + src render.php). Fix all errors; warnings reviewed case-by-case.

- [ ] **Step 4: Full smoke after build**

```bash
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
wp plugin deactivate wbcom-essential && wp plugin activate wbcom-essential   # Expect: no fatals
wp eval 'echo "boot OK";'
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "build: 4.6.0 — account marketing features compiled, versions bumped"
```

---

## Phase 2 — Site wiring (wbcom-edd.local)

### Task 11: Pages

- [ ] **Step 1: Create My Account page + replace checkout/receipt blocks**

```bash
cd "/Users/varundubey/Local Sites/wbcom-edd/app/public"
# My Account page with the dashboard block.
wp post create --post_type=page --post_status=publish --post_title='My Account' --post_name='my-account' \
  --post_content='<!-- wp:wbcom-essential/edd-account-dashboard {"supportUrl":"https://wbcomdesigns.com/support/","supportLabel":"My Tickets"} /-->'
# Checkout page (6) → enhanced checkout block.
wp post update 6 --post_content='<!-- wp:wbcom-essential/edd-checkout-enhanced /-->'
# Receipt (7) + Confirmation (10) → order success block.
wp post update 7 --post_content='<!-- wp:wbcom-essential/edd-order-success /-->'
wp post update 10 --post_content='<!-- wp:wbcom-essential/edd-order-success /-->'
# Order History (9) → pointer to My Account purchases tab.
wp post update 9 --post_content='<!-- wp:paragraph --><p><a href="/my-account/?tab=purchases">View your order history in My Account</a>.</p><!-- /wp:paragraph -->'
```

Note: check each block's `block.json` attribute names before relying on defaults — if `edd-checkout-enhanced`/`edd-order-success` require a `uniqueId` or other attributes for styling, insert via the editor once (Playwright MCP) and copy the serialized markup instead.

- [ ] **Step 2: Verify pages render**

Browser (Playwright MCP): visit `/my-account/?autologin=testcustomer`, `/checkout/`, confirm blocks render (not "block unsupported" fallback).

- [ ] **Step 3: No commit (site content, not repo). Log page IDs in the task notes.**

---

## Phase 3 — Verification + Reign pass

### Task 12: Browser verification matrix (Playwright MCP, NOT scripts)

For each surface: desktop (1280px) AND 390px screenshots to `~/Documents/work-artifacts/screenshots/2026-06/`.

- [ ] **Step 1: Account dashboard** — `/my-account/?autologin=testcustomer`. Verify: offer banner shows SUMMER20 (and never PARTNER50), copy-code works, What's New row (4 cards max, no owned products), Recommended row with "Pro Upgrade" flag first.
- [ ] **Step 2: Free Plugins tab** — click the tab. Verify: 3 cards; owned one shows "In your library"; click "Download Free" on an unclaimed one → file download starts, button flips, item then appears in Downloads tab; reload → claimed state persists.
- [ ] **Step 3: Logged-out** — `/my-account/` in a fresh context: login card renders, no claim buttons or offers leak.
- [ ] **Step 4: Checkout flow** — add paid product → `/checkout/` → apply SUMMER20 → complete with Stripe test card (4242…) if test keys configured, otherwise the manual/test gateway → receipt page renders order. Then a free product through normal checkout (should be 100% free order).
- [ ] **Step 5: Editor check** — open My Account page in the block editor; toggles for offers/what's new/recommendations work; defaultTab includes Free Plugins.
- [ ] **Step 6: File Reign conflicts** — list every visual break found under Reign 8.0.0 (link colors/hover, button styles, table styles, sidebar nav) with screenshots → input for Task 13.

### Task 13: Reign compat CSS

**Files:**
- Modify: `plugins/gutenberg/src/blocks/edd-account-dashboard/style.scss` (generic fixes, scoped `.reign-theme` / theme-agnostic specificity bumps)
- Modify: `/Users/varundubey/Local Sites/wbcom-edd/app/public/wp-content/themes/reign-child-theme/style.css` (Wbcom-branding-only overrides)

- [ ] **Step 1: Apply fixes per Task 12 findings.** Rule: anything any Reign user would hit → block stylesheet; pure Wbcom branding → child theme. Exact selectors come from the audit; typical Reign culprits to check first: `a:visited`/`a:hover` color bleed into `.wbcom-edd-account__nav-link`, `.entry-content table` styles fighting `.wbcom-edd-dashboard__table`, theme button gradients overriding `.wbcom-edd-free__claim`.
- [ ] **Step 2: Rebuild if scss changed:** `npm run build:blocks`. Re-verify both viewports per Task 12 steps 1-4.
- [ ] **Step 3: Commit** (plugin changes in plugin repo; child theme changes committed in `reign-child-theme` repo with its own message).

```bash
git add plugins/gutenberg/src/blocks/edd-account-dashboard/style.scss build/
git commit -m "fix(edd-account): Reign 8.0.0 compatibility styles"
```

### Task 14: Manifest delta + docs + wrap-up

**Files:**
- Modify: `docs/architecture/manifest/rest-endpoints.txt` (add `POST wbcom/v1/edd-account/claim-free`, note `sections` param on tab route)
- Modify: `docs/architecture/manifest/hooks.txt` (add `wbcom_essential_free_claim`, `wbcom_essential_edd_free_download_ids`, `wbcom_essential_edd_free_claim_limit`, `wbcom_essential_edd_offers_shop_url`)
- Modify: `CLAUDE.md` (Recent Changes row + block inventory note: edd-account-dashboard v2.1.0)

- [ ] **Step 1: Apply manifest deltas + CLAUDE.md row** (format: match existing lines in each file).
- [ ] **Step 2: Final WPCS pre-commit + boot smoke** (same commands as Task 10 steps 3-4). Report results honestly.
- [ ] **Step 3: Commit**

```bash
git add docs/ CLAUDE.md && git commit -m "docs: manifest delta + CLAUDE.md for 4.6.0 account experience"
```

- [ ] **Step 4: Delete the zip backup** once everything passes:

```bash
rm -rf "/Users/varundubey/Local Sites/wbcom-edd/app/public/wp-content/plugins/wbcom-essential-zip-backup"
```

---

## Self-Review Notes

- **Spec coverage:** offers (T3, T5), what's new (T5), recommendations free→pro (T5), free claims + idempotency + rate limit (T6, T7), claim CRM hook (T7), discount admin flag (T3), counterpart admin field (T4), checkout verify (T11, T12), Reign pass (T12, T13), seed (T1), manifest sync (T14). ✔
- **Type consistency:** `wbcom_essential_edd_render_dashboard_tab( $customer, $sections )` — both legacy call sites pass 1 arg (null default = all sections). REST `sections` is a comma list both in `data-sections` and the query param. Claim button class `.wbcom-edd-free__claim` matches view.js. ✔
- **Known risk:** `edd_insert_payment()` is the legacy-compat path; its session resume only triggers when `edd_resume_payment` exists in session (not in REST claims). If EDD removes it in a future major, swap to `edd_add_order()` + `edd_add_order_item()` + `edd_update_order_status()`.
- **`color-mix()`** in offer banner gradient needs the fallback already present (`var(--wbcom-color-primary, #0073aa)` solid is acceptable degradation).
