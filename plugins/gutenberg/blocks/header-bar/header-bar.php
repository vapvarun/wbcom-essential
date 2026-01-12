<?php
/**
 * Header Bar Block Registration.
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_header_bar_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/header-bar/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_header_bar_block_init' );

/**
 * Get available navigation menus.
 *
 * @return array
 */
function wbcom_essential_get_nav_menus() {
	$menus   = wp_get_nav_menus();
	$options = array();

	foreach ( $menus as $menu ) {
		$options[] = array(
			'value' => $menu->slug,
			'label' => $menu->name,
		);
	}

	return $options;
}

/**
 * Register REST endpoint for nav menus.
 */
function wbcom_essential_register_nav_menus_rest() {
	register_rest_route(
		'wbcom-essential/v1',
		'/nav-menus',
		array(
			'methods'             => 'GET',
			'callback'            => 'wbcom_essential_get_nav_menus',
			'permission_callback' => function () {
				return current_user_can( 'edit_posts' );
			},
		)
	);
}
add_action( 'rest_api_init', 'wbcom_essential_register_nav_menus_rest' );
