<?php
/**
 * Plugin Name:       Post Carousel
 * Description:       Display posts in a carousel format with customizable options.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            WBCOM Essential
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbcom-essential
 *
 * @package PostCarousel
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
function wbcom_essential_post_carousel_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/post-carousel/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path, array(
			'render_callback' => 'wbcom_essential_render_post_carousel_block',
		) );
	}
}
add_action( 'init', 'wbcom_essential_post_carousel_block_init' );