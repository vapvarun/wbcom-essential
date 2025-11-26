<?php
/**
 * Plugin Name:       Smart Menu
 * Description:       A powerful and flexible navigation menu block with extensive styling options and mobile responsiveness.
 * Version:           1.0.0
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Author:            WBCOM Essential
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wbcom-essential
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get all available menus
 */
function wbcom_essential_smart_menu_get_menus() {
	$menus = wp_get_nav_menus();
	$menu_options = array();

	if ( ! empty( $menus ) ) {
		foreach ( $menus as $menu ) {
			$menu_options[] = array(
				'label' => $menu->name,
				'value' => $menu->term_id,
			);
		}
	}

	return $menu_options;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function wbcom_essential_smart_menu_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/smart-menu/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		$result = register_block_type( $build_path, array(
			'render_callback' => 'wbcom_essential_render_smart_menu_block',
		) );
		if ( is_wp_error( $result ) ) {
			error_log( 'Smart Menu Block Registration Error: ' . $result->get_error_message() );
		}

		// Ensure styles are enqueued
		if ( file_exists( $build_path . 'style-index.css' ) ) {
			wp_enqueue_style(
				'wbcom-essential-smart-menu',
				plugins_url( 'build/blocks/smart-menu/style-index.css', WBCOM_ESSENTIAL_FILE ),
				array(),
				filemtime( $build_path . 'style-index.css' )
			);
		}
	}
}
add_action( 'init', 'wbcom_essential_smart_menu_block_init', 20 );
