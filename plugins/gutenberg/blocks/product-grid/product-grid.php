<?php
/**
 * Product Grid Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Product Grid block.
 */
function wbcom_essential_register_product_grid_block() {
	// Only register if WooCommerce is active.
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}

	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/product-grid/build';
	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}
	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_product_grid_block' );
