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
 * Plugin Name:       WBcom Essential
 * Plugin URI:        https://wbcomdesigns.com/downloads/wbcom-essential/
 * Description:       Premium Elementor widgets for BuddyPress, WooCommerce, and WordPress. Create stunning websites with 40+ professional widgets and seamless integrations.
 * Version:           4.0.0
 * Author:            WBcom Designs
 * Author URI:        https://wbcomdesigns.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       wbcom-essential
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'WBCOM_ESSENTIAL_VERSION', '4.0.0' );
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
/**
 * Backward compatibility constants
 *
 * @deprecated Use WBCOM_ESSENTIAL_PATH and WBCOM_ESSENTIAL_PLUGIN_BASE instead
 */
define( 'WBCOM_ESSENTIAL_PLUGIN_DIR', WBCOM_ESSENTIAL_PATH );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASENAME', WBCOM_ESSENTIAL_PLUGIN_BASE );


require_once WBCOM_ESSENTIAL_PATH . 'wbcom-essential.php';
require_once WBCOM_ESSENTIAL_PATH . 'includes/wbcom-essential-function.php';
require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/wbcom-essential-elementor.php';
require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/Plugins.php';
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

/**
 * Initializes the Plugin application.
 *
 * @since 3.0.0
 */
wbcom_essential();
