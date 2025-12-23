<?php
/**
 * Profile Completion Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from block.json.
 * Requires BuddyPress to be active.
 */
function wbcom_essential_profile_completion_block_init() {
	// Only register if BuddyPress is active - this block is 100% BuddyPress dependent.
	if ( ! function_exists( 'buddypress' ) ) {
		return;
	}

	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/profile-completion/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_profile_completion_block_init' );
