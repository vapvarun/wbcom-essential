<?php
/**
 * Plugin Name:       Slider
 * Description:       A comprehensive slider block with multiple slides, animations, and navigation options.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            WBCOM Essential
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbcom-essential
 *
 * @package Slider
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wbcom_essential_slider_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/slider/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path, array(
			'render_callback' => 'wbcom_essential_render_slider_block',
		) );
	}
}
add_action( 'init', 'wbcom_essential_slider_block_init' );