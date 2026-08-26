<?php
/**
 * Constants PHPStan cannot infer because they are defined at runtime by the
 * plugin bootstrap (loader.php, Plugins.php, gutenberg.php).
 *
 * This file is never loaded by WordPress and is excluded from the release
 * zip (.distignore covers phpstan*). It exists only so static analysis knows
 * these symbols are defined. Keep it in sync with the define() calls in
 * loader.php and plugins/elementor/Plugins.php.
 *
 * @package Wbcom_Essential
 */

define( 'WBCOM_ESSENTIAL_VERSION', '4.7.0' );
define( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION', '4.6.3' );
define( 'WBCOM_ESSENTIAL_FILE', __DIR__ . '/loader.php' );
define( 'WBCOM_ESSENTIAL_PATH', __DIR__ . '/' );
define( 'WBCOM_ESSENTIAL_PLUGIN_DIR', __DIR__ . '/' );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASE', 'wbcom-essential/loader.php' );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASENAME', 'wbcom-essential/loader.php' );
define( 'WBCOM_ESSENTIAL_URL', 'https://example.test/wp-content/plugins/wbcom-essential/' );
define( 'WBCOM_ESSENTIAL_ASSETS_URL', 'https://example.test/wp-content/plugins/wbcom-essential/assets/' );
define( 'WBCOM_ESSENTIAL_STORE_URL', 'https://wbcomdesigns.com' );
define( 'WBCOM_ESSENTIAL_ITEM_ID', 0 );

define( 'WBCOM_ESSENTIAL_ELEMENTOR_PATH', __DIR__ . '/plugins/elementor/' );
define( 'WBCOM_ESSENTIAL_ELEMENTOR_URL', 'https://example.test/wp-content/plugins/wbcom-essential/plugins/elementor/' );
define( 'WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH', __DIR__ . '/plugins/elementor/widgets/' );
define( 'ELEMENTOR_WBCOMESSENTIAL__FILE__', __DIR__ . '/plugins/elementor/wbcom-essential-elementor.php' );
define( 'ELEMENTOR_WBCOMESSENTIAL__DIR__', __DIR__ . '/plugins/elementor/' );
