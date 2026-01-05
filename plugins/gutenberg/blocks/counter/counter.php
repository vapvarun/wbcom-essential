<?php
/**
 * Counter Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Counter block.
 */
function wbcom_essential_register_counter_block() {
	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/counter/build';

	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}

	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_counter_block' );
