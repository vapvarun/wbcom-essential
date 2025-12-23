<?php
/**
 * Members Carousel Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_members_carousel_block_init() {
	// Only register if BuddyPress is active.
	if ( ! function_exists( 'buddypress' ) ) {
		return;
	}

	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/members-carousel/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_members_carousel_block_init' );
