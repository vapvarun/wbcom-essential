<?php
/**
 * Divider Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Divider block.
 */
function wbcom_essential_register_divider_block() {
	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/divider/build';
	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}
	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_divider_block' );
