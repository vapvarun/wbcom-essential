<?php
/**
 * Team Carousel Block Registration.
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register the Team Carousel block.
 */
function wbcom_essential_team_carousel_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/team-carousel/';

	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_team_carousel_block_init' );
