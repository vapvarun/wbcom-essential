<?php
/**
 * Group Carousel Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Swiper for Group Carousel block.
 */
function wbcom_essential_group_carousel_enqueue_scripts() {
	// Only enqueue if the block is present.
	if ( ! has_block( 'wbcom-essential/group-carousel' ) ) {
		return;
	}

	// Enqueue Swiper script.
	wp_enqueue_script(
		'wbcom-swiper',
		WBCOM_ESSENTIAL_URL . 'plugins/elementor/assets/js/swiper.min.js',
		array( 'jquery' ),
		WBCOM_ESSENTIAL_VERSION,
		true
	);

	// Enqueue Swiper CSS.
	wp_enqueue_style(
		'wbcom-swiper-css',
		WBCOM_ESSENTIAL_URL . 'assets/vendor/swiper/swiper-bundle.min.css',
		array(),
		WBCOM_ESSENTIAL_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'wbcom_essential_group_carousel_enqueue_scripts' );

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_group_carousel_block_init() {
	// Only register if BuddyPress is active and groups component is enabled.
	if ( ! function_exists( 'buddypress' ) || ! bp_is_active( 'groups' ) ) {
		return;
	}

	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/group-carousel/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_group_carousel_block_init' );
