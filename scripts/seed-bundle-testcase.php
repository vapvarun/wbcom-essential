<?php
/**
 * Seed a bundle product + completed purchase for the bundle bug reproduction.
 *
 * Usage: wp eval-file wp-content/plugins/wbcom-essential/scripts/seed-bundle-testcase.php
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// 1. Bundle product containing Reign Theme (15) + BuddyX Pro (30).
$existing = get_page_by_path( 'theme-power-bundle', OBJECT, 'download' );
if ( $existing ) {
	$bundle_id = $existing->ID;
	echo "Bundle exists: {$bundle_id}\n";
} else {
	$bundle_id = wp_insert_post(
		array(
			'post_title'  => 'Theme Power Bundle',
			'post_name'   => 'theme-power-bundle',
			'post_type'   => 'download',
			'post_status' => 'publish',
		)
	);
	update_post_meta( $bundle_id, '_edd_product_type', 'bundle' );
	update_post_meta( $bundle_id, '_edd_bundled_products', array( 15, 30 ) );
	update_post_meta( $bundle_id, 'edd_price', '129.00' );
	// License the bundle itself so SL issues a parent license + child licenses.
	update_post_meta( $bundle_id, '_edd_sl_enabled', 1 );
	update_post_meta( $bundle_id, '_edd_sl_limit', 1 );
	update_post_meta( $bundle_id, '_edd_sl_exp_unit', 'years' );
	update_post_meta( $bundle_id, '_edd_sl_exp_length', 1 );
	echo "Bundle created: {$bundle_id}\n";
}

// 2. Completed purchase for testcustomer.
$user = get_user_by( 'login', 'testcustomer' );
if ( ! $user ) {
	echo "ERROR: testcustomer not found\n";
	return;
}

// Skip if already purchased.
$already = edd_get_orders(
	array(
		'user_id' => $user->ID,
		'status'  => 'complete',
	)
);
foreach ( $already as $o ) {
	foreach ( $o->get_items() as $it ) {
		if ( (int) $it->product_id === (int) $bundle_id ) {
			echo "Already purchased in order {$o->id}\n";
			return;
		}
	}
}

$payment_id = edd_insert_payment(
	array(
		'price'        => 129.00,
		'date'         => gmdate( 'Y-m-d H:i:s' ),
		'user_id'      => $user->ID,
		'user_email'   => $user->user_email,
		'purchase_key' => strtolower( md5( uniqid( 'bundle', true ) ) ),
		'currency'     => edd_get_currency(),
		'downloads'    => array(
			array(
				'id'       => $bundle_id,
				'quantity' => 1,
			),
		),
		'user_info'    => array(
			'id'         => $user->ID,
			'email'      => $user->user_email,
			'first_name' => $user->first_name ? $user->first_name : 'Test',
			'last_name'  => $user->last_name ? $user->last_name : 'Customer',
			'discount'   => 'none',
		),
		'cart_details' => array(
			array(
				'name'        => get_the_title( $bundle_id ),
				'id'          => $bundle_id,
				'item_number' => array(
					'id'       => $bundle_id,
					'options'  => array(),
					'quantity' => 1,
				),
				'item_price'  => 129.00,
				'quantity'    => 1,
				'discount'    => 0,
				'subtotal'    => 129.00,
				'tax'         => 0,
				'price'       => 129.00,
			),
		),
		'status'       => 'pending',
	)
);

edd_update_payment_status( $payment_id, 'complete' );
echo "Order created: {$payment_id}\n";

// 3. Report licenses generated.
$sl       = edd_software_licensing();
$licenses = $sl->licenses_db->get_licenses( array( 'payment_id' => $payment_id, 'number' => 20 ) );
foreach ( (array) $licenses as $lic ) {
	echo "License {$lic->ID}: download={$lic->download_id} parent={$lic->parent} status={$lic->status} customer={$lic->customer_id}\n";
}
