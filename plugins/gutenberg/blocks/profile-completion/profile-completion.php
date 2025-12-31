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
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * Only register if BuddyPress is active.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wbcom_essential_profile_completion_block_init() {
	// Only register if BuddyPress is active.
	if ( ! function_exists( 'buddypress' ) ) {
		return;
	}

	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/profile-completion/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_profile_completion_block_init' );
