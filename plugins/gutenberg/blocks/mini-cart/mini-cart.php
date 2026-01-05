<?php
/**
 * Mini Cart Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Mini Cart block.
 */
function wbcom_essential_register_mini_cart_block() {
	// Only register if WooCommerce is active.
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/mini-cart/build';
	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}
	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_mini_cart_block' );

/**
 * Add mini cart fragments for AJAX updates.
 *
 * @param array $fragments Cart fragments.
 * @return array Modified fragments.
 */
function wbcom_essential_mini_cart_fragments( $fragments ) {
	$cart_count = WC()->cart->get_cart_contents_count();
	$cart_total = WC()->cart->get_cart_total();

	$fragments['.wbcom-essential-mini-cart__count'] = $cart_count;

	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'wbcom_essential_mini_cart_fragments' );
