<?php
/**
 * Seed the license-action scenarios used to verify the Licenses tab buttons.
 *
 * Creates, for the standard test customer:
 *   1. An ACTIVE license on a product that has an SL upgrade path
 *      -> the "Upgrade License" button must render and must land on
 *         EDD SL's prorated upgrade view.
 *   2. An EXPIRED license inside the renewal window
 *      -> the "Renew License" button must render and must land on checkout
 *         with the renewal already in the cart (renewal discount applied).
 *   3. An ACTIVE, non-lifetime license that can be extended early
 *      -> covers EDD SL's "Extend license" path off the same renewal URL.
 *
 * Also enables the store-level "renewals" setting, without which
 * EDD_SL_License::get_renewal_url() returns an empty string for every license.
 *
 * Run: wp eval-file wp-content/plugins/wbcom-essential/scripts/seed-edd-license-actions.php
 * Idempotent: matched by slug / license id, re-running updates in place.
 *
 * @package WBCOM_Essential
 */

defined( 'WP_CLI' ) || exit;

if ( ! function_exists( 'edd_software_licensing' ) ) {
	WP_CLI::error( 'EDD Software Licensing is not active.' );
}

/**
 * Create (or fetch) a licensed download with a downloadable file attached.
 *
 * @param string $title Product title.
 * @param string $slug  Product slug.
 * @param float  $price Product price.
 * @return int Download ID.
 */
function wbe_la_download( $title, $slug, $price ) {
	$existing = get_page_by_path( $slug, OBJECT, 'download' );
	$post_id  = $existing ? $existing->ID : wp_insert_post(
		array(
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_type'    => 'download',
			'post_status'  => 'publish',
			'post_excerpt' => 'Seeded product for license-action verification.',
			'post_content' => 'Seeded product for license-action verification.',
		)
	);

	update_post_meta( $post_id, 'edd_price', edd_sanitize_amount( $price ) );
	update_post_meta( $post_id, '_edd_sl_enabled', 1 );
	update_post_meta( $post_id, '_edd_sl_version', '1.0.0' );
	update_post_meta( $post_id, '_edd_sl_limit', 5 );
	update_post_meta( $post_id, '_edd_sl_exp_unit', 'years' );
	update_post_meta( $post_id, '_edd_sl_exp_length', 1 );

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

	return $post_id;
}

/**
 * Create a completed order for a user, or return the existing one.
 *
 * @param WP_User $user        Purchasing user.
 * @param int     $download_id Download purchased.
 * @param float   $price       Amount paid.
 * @return int Order ID.
 */
function wbe_la_order( $user, $download_id, $price ) {
	$existing = edd_get_orders(
		array(
			'customer_email' => $user->user_email,
			'product_id'     => $download_id,
			'number'         => 1,
		)
	);
	if ( ! empty( $existing ) ) {
		return $existing[0]->id;
	}

	$payment_id = edd_insert_payment(
		array(
			'price'        => (float) $price,
			'date'         => gmdate( 'Y-m-d H:i:s', time() - ( 400 * DAY_IN_SECONDS ) ),
			'user_email'   => $user->user_email,
			'purchase_key' => strtolower( md5( uniqid( '', true ) ) ),
			'currency'     => edd_get_currency(),
			'downloads'    => array(
				array(
					'id'       => $download_id,
					'options'  => array(),
					'quantity' => 1,
				),
			),
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
					'item_number' => array(
						'id'       => $download_id,
						'options'  => array(),
						'quantity' => 1,
					),
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
		)
	);

	if ( $payment_id ) {
		edd_update_payment_status( $payment_id, 'complete' );
	}

	return $payment_id;
}

/**
 * Return the (single) license attached to an order.
 *
 * @param int $order_id Order ID.
 * @return EDD_SL_License|false
 */
function wbe_la_license_for_order( $order_id ) {
	$licenses = edd_software_licensing()->licenses_db->get_licenses(
		array(
			'payment_id' => $order_id,
			'number'     => 1,
		)
	);

	return empty( $licenses ) ? false : edd_software_licensing()->get_license( $licenses[0]->ID );
}

// --- 0. Store must accept renewals, or get_renewal_url() is empty for everything.
if ( ! edd_sl_renewals_allowed() ) {
	edd_update_option( 'edd_sl_renewals', 1 );
	WP_CLI::log( 'Enabled EDD SL renewals (edd_sl_renewals).' );
}
// Generous renewal window so an expired license stays renewable.
edd_update_option( 'edd_sl_renewal_limit', 365 );

// --- 1. Test customer.
$user = get_user_by( 'email', 'customer@test.local' );
if ( ! $user ) {
	$uid = wp_create_user( 'testcustomer', 'testcustomer', 'customer@test.local' );
	wp_update_user(
		array(
			'ID'           => $uid,
			'first_name'   => 'Test',
			'last_name'    => 'Customer',
			'display_name' => 'Test Customer',
		)
	);
	$user = get_user_by( 'id', $uid );
}

// --- 2. Products: an upgrade source and its target.
$base_id   = wbe_la_download( 'Wbcom Suite Personal', 'wbcom-suite-personal', 49 );
$agency_id = wbe_la_download( 'Wbcom Suite Agency', 'wbcom-suite-agency', 199 );
$legacy_id = wbe_la_download( 'Wbcom Legacy Addon', 'wbcom-legacy-addon', 39 );

// Upgrade path: Personal -> Agency, prorated.
update_post_meta(
	$base_id,
	'_edd_sl_upgrade_paths',
	array(
		1 => array(
			'download_id' => $agency_id,
			'price_id'    => false,
			'discount'    => 0,
			'pro_rated'   => true,
		),
	)
);

// --- 3. Scenario A: active license WITH an upgrade path.
$order_a   = wbe_la_order( $user, $base_id, 49 );
$license_a = wbe_la_license_for_order( $order_a );
if ( $license_a ) {
	$license_a->status     = 'active';
	$license_a->expiration = strtotime( '+200 days' );
	WP_CLI::log(
		sprintf(
			'Scenario A  license #%d  %s  status=%s  upgrades=%d',
			$license_a->ID,
			get_the_title( $base_id ),
			$license_a->status,
			count( edd_sl_get_license_upgrades( $license_a->ID ) )
		)
	);
}

// --- 4. Scenario B: EXPIRED license, still inside the renewal window.
$order_b   = wbe_la_order( $user, $legacy_id, 39 );
$license_b = wbe_la_license_for_order( $order_b );
if ( $license_b ) {
	$license_b->expiration = strtotime( '-45 days' );
	$license_b->status     = 'expired';
	$license_b             = edd_software_licensing()->get_license( $license_b->ID );
	WP_CLI::log(
		sprintf(
			'Scenario B  license #%d  %s  status=%s  can_renew=%s  renewal_url=%s',
			$license_b->ID,
			get_the_title( $legacy_id ),
			$license_b->status,
			$license_b->can_renew() ? 'yes' : 'no',
			$license_b->get_renewal_url() ? $license_b->get_renewal_url() : '(empty)'
		)
	);
}

// --- 5. Scenario C: active, extendable license (no upgrade path).
$order_c   = wbe_la_order( $user, $agency_id, 199 );
$license_c = wbe_la_license_for_order( $order_c );
if ( $license_c ) {
	$license_c->status     = 'active';
	$license_c->expiration = strtotime( '+20 days' );
	$license_c             = edd_software_licensing()->get_license( $license_c->ID );
	WP_CLI::log(
		sprintf(
			'Scenario C  license #%d  %s  status=%s  can_extend=%s  renewal_url=%s',
			$license_c->ID,
			get_the_title( $agency_id ),
			$license_c->status,
			$license_c->can_extend() ? 'yes' : 'no',
			$license_c->get_renewal_url() ? $license_c->get_renewal_url() : '(empty)'
		)
	);
}

WP_CLI::success( 'License-action scenarios seeded for customer@test.local (login: testcustomer / testcustomer).' );
