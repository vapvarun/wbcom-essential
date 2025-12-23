<?php
/**
 * Post Slider Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_post_slider_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/post-slider/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_post_slider_block_init' );

/**
 * Enqueue Swiper assets for Post Slider block.
 */
function wbcom_essential_post_slider_enqueue_assets() {
	if ( ! has_block( 'wbcom-essential/post-slider' ) ) {
		return;
	}

	// Enqueue Swiper CSS.
	wp_enqueue_style(
		'swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		array(),
		'11.0.0'
	);

	// Enqueue Swiper JS.
	wp_enqueue_script(
		'swiper',
		'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
		array(),
		'11.0.0',
		true
	);
}
add_action( 'wp_enqueue_scripts', 'wbcom_essential_post_slider_enqueue_assets' );
