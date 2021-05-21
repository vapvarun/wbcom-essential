<?php
/**
 * Plugin Name: Wbcom Essential
 * Description: Wbcom Essential Addons.
 * Plugin URI: https://wbcomdesigns.com/
 * Author: Wbcom Designs
 * Version: 3.2.1
 * Author URI: https://wbcomdesigns.com/
 *
 * Text Domain: wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

define( 'WBCOM_ESSENTIAL_VERSION', '3.2.1' );
define( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION', '2.7.0' );

define( 'WBCOM_ESSENTIAL_FILE', __FILE__ );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASE', plugin_basename( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_PATH', plugin_dir_path( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_URL', plugins_url( '/', WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_ASSETS_URL', WBCOM_ESSENTIAL_URL . 'assets/' );


require_once WBCOM_ESSENTIAL_PATH . 'wbcom-essential.php';

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
 * Load plugin text domain
 */
function wbcom_essential_load_plugin_textdomain() {
	load_plugin_textdomain( 'stax-buddy-builder', false, basename( __DIR__ ) . '/languages/' );
}
add_action( 'plugins_loaded', 'wbcom_essential_load_plugin_textdomain' );

/**
 * Initializes the Plugin application.
 *
 * @since 3.0.0
 */
wbcom_essential();


/**
 *  Check if Reign, BuddyX, BuddyxPro theme activate.
 */
add_action( 'admin_init', 'wbcom_essential_requires_wbcom_themes' );
function wbcom_essential_requires_wbcom_themes() {
	$template = get_option( 'template' );
	$themes = apply_filters( 'wbcom_essential_themes', array( 'reign-theme', 'buddyx', 'buddyx-pro' ) );
	
	if ( !in_array( $template, $themes) ) {
        deactivate_plugins( plugin_basename( __FILE__ ) );        
        add_action( 'admin_notices', 'wbcom_essential_required_theme_admin_notice' );
        unset($_GET['activate']);
    }
	
}

function wbcom_essential_required_theme_admin_notice(){

    $wbcom_essential_plugin	= esc_html__(' Wbcom Essential', 'wbcom-essential');
    $themes_name 			= apply_filters( 'wbcom_essential_themes_name', array( 'Reign', 'BuddyX', 'BuddyxPro' ) );
	$themes_name 			= join(", ",$themes_name);
    echo '<div class="error"><p>';
    echo sprintf(esc_html__('%1$s is ineffective now as it requires %2$s to be installed and active.', 'buddypress-moderation-pro'), '<strong>' . esc_html($wbcom_essential_plugin) . '</strong>', '<strong>' . esc_html($themes_name) . '</strong>');
    echo '</p></div>';
    if (isset($_GET['activate']) ) {
        unset($_GET['activate']);
    }
}
