<?php
/**
 * Social Icons Block Registration
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Social Icons block.
 */
function wbcom_essential_register_social_icons_block() {
	$block_path = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/social-icons/build';

	if ( ! file_exists( $block_path . '/block.json' ) ) {
		return;
	}

	register_block_type( $block_path );
}
add_action( 'init', 'wbcom_essential_register_social_icons_block' );
