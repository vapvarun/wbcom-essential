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
// Per-order idempotency: only create an order if the user doesn't own the product yet,
// so partial/interrupted runs heal on re-run without duplicating orders.
$history = array(
	array( $ids['buddypress-polls'], 0 ),  // Owns a free plugin (→ pro reco).
	array( $ids['plain'], 29 ),            // Paid order.
	array( $ids['buddyx-pro-theme'], 59 ), // Licensed product.
);
foreach ( $history as $entry ) {
	list( $download_id, $price ) = $entry;
	if ( ! edd_has_user_purchased( $user->ID, array( $download_id ) ) ) {
		wbe_seed_order( $user, $download_id, $price );
	}
}
// Sync customer stats (EDD caches purchase_count; recalculate to reflect actual orders).
$customer = edd_get_customer_by( 'user_id', $user->ID );
if ( $customer ) {
	$customer->recalculate_stats();
}

WP_CLI::success( 'Seed complete. Downloads: ' . count( $ids ) . '. Login: testcustomer / customer@test.local' );
