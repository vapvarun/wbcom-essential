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
 * Enqueue Swiper for Members Carousel block.
 */
function wbcom_essential_members_carousel_enqueue_scripts() {
	// Only enqueue if the block is present.
	if ( ! has_block( 'wbcom-essential/members-carousel' ) ) {
		return;
	}

	// Enqueue Swiper script.
	wp_enqueue_script(
		'swiper',
		WBCOM_ESSENTIAL_URL . 'assets/vendor/swiper/swiper-bundle.min.js',
		array(),
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
add_action( 'wp_enqueue_scripts', 'wbcom_essential_members_carousel_enqueue_scripts' );

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
