<?php
/**
 * Star Rating Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Star Rating block.
 */
function wbcom_essential_register_star_rating_block() {
	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/star-rating/build';
	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}
	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_star_rating_block' );
