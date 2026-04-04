<?php
/**
 * Gutenberg Blocks Loader for WBcom Essential.
 *
 * Registers the block category and bootstraps BlockRegistrar.
 *
 * @package Wbcom_Essential
 * @since   4.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// BlockRegistrar lives next to this file.
require_once __DIR__ . '/BlockRegistrar.php';

/**
 * Register the "wbcom-essential" block category so all blocks are grouped together.
 */
add_filter(
	'block_categories_all',
	function ( $categories ) {
		// Avoid duplicate registration.
		foreach ( $categories as $cat ) {
			if ( 'wbcom-essential' === $cat['slug'] ) {
				return $categories;
			}
		}

		array_unshift(
			$categories,
			array(
				'slug'  => 'wbcom-essential',
				'title' => __( 'WBcom Essential', 'wbcom-essential' ),
				'icon'  => 'screenoptions',
			)
		);

		return $categories;
	}
);

/**
 * Bootstrap block registration.
 *
 * Points to the build/blocks/ directory where compiled block.json + assets live.
 */
$wbcom_block_registrar = new \WBCOM_ESSENTIAL\Gutenberg\BlockRegistrar(
	__DIR__ . '/build/blocks/'
);
$wbcom_block_registrar->init();
