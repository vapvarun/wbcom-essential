<?php
/**
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://wbcomdesigns.com/plugins
 * @since             1.0.0
 * @package           Wbcom_Essential
 *
 * @wordpress-plugin
 * Plugin Name:       Wbcom Essential
 * Plugin URI:        https://wbcomdesigns.com
 * Description:       Wbcom Essential Addons.
 * Version:           3.9.4
 * Author:            wbcomdesigns
 * Author URI:        https://wbcomdesigns.com/plugins
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wbcom-essential
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'WBCOM_ESSENTIAL_VERSION', '3.9.4' );
define( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION', '3.7.3' );

define( 'WBCOM_ESSENTIAL_FILE', __FILE__ );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASE', plugin_basename( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_PATH', plugin_dir_path( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_URL', plugins_url( '/', WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_ASSETS_URL', WBCOM_ESSENTIAL_URL . 'assets/' );

// License constants
define( 'WBCOM_ESSENTIAL_STORE_URL', 'https://wbcomdesigns.com' );
define( 'WBCOM_ESSENTIAL_ITEM_ID', 1545975 );
define( 'WBCOM_ESSENTIAL_ITEM_NAME', 'Wbcom Essential' );
// Backward compatibility aliases (deprecated - use WBCOM_ESSENTIAL_PATH and WBCOM_ESSENTIAL_PLUGIN_BASE instead)
define( 'WBCOM_ESSENTIAL_PLUGIN_DIR', WBCOM_ESSENTIAL_PATH );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASENAME', WBCOM_ESSENTIAL_PLUGIN_BASE );


require_once WBCOM_ESSENTIAL_PATH . 'wbcom-essential.php';
require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/wbcom-essential-elementor.php';
require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/wbcom-essential-woocommerce.php';

/**
 * Returns the Plugin application instance.
 *
 * @return \WBCOM_ESSENTIAL\Plugin
 * @since 3.0.0
 */
function wbcom_essential() {
	return \WBCOM_ESSENTIAL\WBCOMESSENTIAL::get_instance();
}

// Text domain loading is handled by the main plugin class in wbcom-essential.php

/**
 * Initializes the Plugin application.
 *
 * @since 3.0.0
 */
wbcom_essential();
