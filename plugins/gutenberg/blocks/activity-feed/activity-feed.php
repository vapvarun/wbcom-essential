<?php
/**
 * Activity Feed Block Registration.
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the Activity Feed block using the metadata loaded from block.json.
 *
 * Only registered when BuddyPress is active with the activity component enabled.
 */
function wbcom_essential_activity_feed_block_init() {
	if ( ! function_exists( 'buddypress' ) || ! bp_is_active( 'activity' ) ) {
		return;
	}

	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/activity-feed/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_activity_feed_block_init' );
