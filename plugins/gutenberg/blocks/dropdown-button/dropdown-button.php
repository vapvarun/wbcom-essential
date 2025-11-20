<?php
/**
 * Plugin Name:       Dropdown Button
 * Description:       A beautiful and customizable dropdown button block with multiple animation styles and extensive styling options.
 * Version:           0.1.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            WBCOM Essential
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       dropdown-button
 *
 * @package DropdownButton
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
function dropdown_button_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/dropdown-button/';
	if (file_exists($build_path . 'block.json')) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'dropdown_button_block_init' );
