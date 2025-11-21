<?php
/**
 * Heading Block
 *
 * @package WBCOM_ESSENTIAL
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
function wbcom_essential_heading_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/heading/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path, array(
			'render_callback' => 'wbcom_essential_render_heading_block',
		) );
	}
}
add_action( 'init', 'wbcom_essential_heading_block_init' );