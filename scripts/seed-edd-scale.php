<?php
/**
 * Seed wbcom-edd.local with a LARGE EDD dataset (100+ downloads + licenses) for
 * the account-experience findability work (search / filter / sort / pagination).
 *
 * Run: wp eval-file wp-content/plugins/wbcom-essential/scripts/seed-edd-scale.php
 * Idempotent: products matched by slug; one completed order per product per customer.
 *
 * @package WBCOM_Essential
 */

defined( 'WP_CLI' ) || exit;

if ( ! function_exists( 'edd_software_licensing' ) ) {
	WP_CLI::error( 'EDD Software Licensing is not active.' );
}

$user = get_user_by( 'email', 'customer@test.local' );
if ( ! $user ) {
	WP_CLI::error( 'Test customer customer@test.local not found - run seed-edd-testbed.php first.' );
}

// Word pools so the search box has meaningful, overlapping hits.
$prefixes = array( 'BuddyPress', 'WooCommerce', 'Reign', 'BuddyX', 'LearnDash', 'GamiPress', 'Dokan', 'Elementor', 'Gravity', 'MemberPress' );
$nouns    = array( 'Polls', 'Hashtags', 'Reports', 'Notifications', 'Reviews', 'Wishlist', 'Badges', 'Checkout', 'Profile', 'Activity', 'Groups', 'Messages', 'Analytics' );
$suffixes = array( 'Addon', 'Pro', 'Extension', 'Plugin', 'Suite', 'Bundle' );

$upload_dir = wp_upload_dir();
wp_mkdir_p( trailingslashit( $upload_dir['basedir'] ) . 'edd' );

$total   = 130;
$created = 0;
$ordered = 0;
$sl      = edd_software_licensing();

for ( $i = 1; $i <= $total; $i++ ) {
	$prefix = $prefixes[ $i % count( $prefixes ) ];
	$noun   = $nouns[ ( $i * 3 ) % count( $nouns ) ];
	$suffix = $suffixes[ ( $i * 5 ) % count( $suffixes ) ];
	$num    = str_pad( (string) $i, 3, '0', STR_PAD_LEFT );
	$title  = "{$prefix} {$noun} {$suffix} {$num}";
	$slug   = sanitize_title( "scale-{$prefix}-{$noun}-{$suffix}-{$num}" );
	$price  = 19 + ( $i % 8 ) * 10; // 19..89

	$existing = get_page_by_path( $slug, OBJECT, 'download' );
	$post_id  = $existing ? $existing->ID : wp_insert_post(
		array(
			'post_title'   => $title,
			'post_name'    => $slug,
			'post_type'    => 'download',
			'post_status'  => 'publish',
			'post_excerpt' => 'Scale test product.',
			'post_content' => 'Seeded scale test product.',
		)
	);
	if ( ! $post_id || is_wp_error( $post_id ) ) {
		continue;
	}

	update_post_meta( $post_id, 'edd_price', edd_sanitize_amount( $price ) );
	update_post_meta( $post_id, '_edd_sl_enabled', 1 );
	update_post_meta( $post_id, '_edd_sl_version', '1.0.0' );
	update_post_meta( $post_id, '_edd_sl_limit', 5 );
	update_post_meta( $post_id, '_edd_sl_exp_unit', 'years' );
	update_post_meta( $post_id, '_edd_sl_exp_length', 1 );

	$zip_path = trailingslashit( $upload_dir['basedir'] ) . 'edd/' . $slug . '.zip';
	if ( ! file_exists( $zip_path ) && class_exists( 'ZipArchive' ) ) {
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
	++$created;

	// One completed order per product (license auto-generates on completion).
	if ( edd_has_user_purchased( $user->ID, array( $post_id ) ) ) {
		continue;
	}

	$payment_data = array(
		'price'        => (float) $price,
		'date'         => gmdate( 'Y-m-d H:i:s', time() - wp_rand( 86400, 86400 * 400 ) ),
		'user_email'   => $user->user_email,
		'purchase_key' => strtolower( md5( uniqid( '', true ) ) ),
		'currency'     => edd_get_currency(),
		'downloads'    => array( array( 'id' => $post_id, 'options' => array(), 'quantity' => 1 ) ),
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
				'name'        => $title,
				'id'          => $post_id,
				'item_number' => array( 'id' => $post_id, 'options' => array(), 'quantity' => 1 ),
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
		++$ordered;
	}
}

// Vary license statuses so the filter has data: expire every 4th, leave the rest
// active (a 1-year future expiry was set on creation).
$customer = edd_get_customer_by( 'user_id', $user->ID );
$expired  = 0;
if ( $customer ) {
	$customer->recalculate_stats();
	$licenses = $sl->licenses_db->get_licenses(
		array(
			'customer_id' => $customer->id,
			'number'      => 9999,
		)
	);
	$n = 0;
	foreach ( (array) $licenses as $license ) {
		++$n;
		if ( 0 === $n % 4 ) {
			$sl->licenses_db->update(
				$license->ID,
				array(
					'status'     => 'expired',
					'expiration' => gmdate( 'Y-m-d H:i:s', time() - ( 30 * DAY_IN_SECONDS ) ),
				)
			);
			++$expired;
		}
	}
}

WP_CLI::success( "Scale seed done. Products created/updated: {$created}. Orders placed: {$ordered}. Licenses expired: {$expired}." );
