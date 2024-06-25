<?php
/**
 * Plugin Name:       Blocks
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       blocks
 *
 * @package           wbcom-essential
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wbcom_essential_blocks_block_init() {

	// Generates an array of directory paths based on the build folder.
	$block_directories = glob( __DIR__ . '/build/*', GLOB_ONLYDIR );

	foreach ( $block_directories as $block ) {
		register_block_type( $block );
	}
}
add_action( 'init', 'wbcom_essential_blocks_block_init' );

/**
 * Add block category for Wbcom Essential Blocks.
 *
 * @param array $categories the array of block categories.
 */
function wbcom_essential_block_category_all( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'wbcom-essential-blocks',
				'title' => __( 'Wbcom Essential Blocks', 'wbcom-essential' ),
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'wbcom_essential_block_category_all', 10, 2 );
