<?php
/**
 * Plugin Name: Wbcom Essential
 * Description: Wbcom Essential Addons.
 * Plugin URI: https://wbcomdesigns.com/
 * Author: Wbcom Designs
 * Version: 3.4.2
 * Author URI: https://wbcomdesigns.com/
 *
 * Text Domain: wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

define( 'WBCOM_ESSENTIAL_VERSION', '3.4.2' );
define( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION', '3.2.2' );

define( 'WBCOM_ESSENTIAL_FILE', __FILE__ );
define( 'WBCOM_ESSENTIAL_PLUGIN_BASE', plugin_basename( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_PATH', plugin_dir_path( WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_URL', plugins_url( '/', WBCOM_ESSENTIAL_FILE ) );
define( 'WBCOM_ESSENTIAL_ASSETS_URL', WBCOM_ESSENTIAL_URL . 'assets/' );


require_once WBCOM_ESSENTIAL_PATH . 'wbcom-essential.php';
require_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/wbcom-essential-elementor.php';

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
	load_plugin_textdomain( 'wbcom-essential', false, basename( __DIR__ ) . '/languages/' );
}
add_action( 'plugins_loaded', 'wbcom_essential_load_plugin_textdomain' );

require WBCOM_ESSENTIAL_PATH . 'wbcom-essential-update-checker/wbcom-essential-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://demos.wbcomdesigns.com/exporter/free-plugins/wbcom-essential.json',
	__FILE__, // Full path to the main plugin file or functions.php.
	'wbcom-essential'
);

/**
 * Initializes the Plugin application.
 *
 * @since 3.0.0
 */
wbcom_essential();

if ( ! function_exists( 'wbcom_essential_theme_elementor_topic_link_attribute_change' ) ) {

	function wbcom_essential_theme_elementor_topic_link_attribute_change( $retval, $r, $args ) {

	    if ( ! function_exists( 'buddypress' ) && ! bp_is_active( 'forums' ) ) {
	        return;
        }

	    $url = bbp_get_topic_last_reply_url( $r['id'] ) . '?bbp_reply_to=0#new-post';
		$retval   = $r['link_before'] . '<a data-balloon=" ' . esc_html__( 'Reply', 'wbcom-essential' ) . ' " data-balloon-pos="up" href="' . esc_url( $url ) . '" class="bbp-reply-to-link"><i class="bb-icon-reply"></i><span class="bb-forum-reply-text">' . esc_html( $r['reply_text'] ) . '</span></a>' . $r['link_after'];
		return apply_filters( 'bb_theme_topic_link_attribute_change', $retval, $r, $args );
	}
}

if ( ! function_exists( 'wbcom_essential_theme_elementor_reply_link_attribute_change' ) ) {

	function wbcom_essential_theme_elementor_reply_link_attribute_change( $retval, $r, $args ) {

		if ( ! function_exists( 'buddypress' ) && ! bp_is_active( 'forums' ) ) {
			return;
		}

		// Get the reply to use it's ID and post_parent
		$reply = bbp_get_reply( bbp_get_reply_id( (int) $r['id'] ) );

		// Bail if no reply or user cannot reply
		if ( empty( $reply ) || ! bbp_current_user_can_access_create_reply_form() )
			return;

		// If single user replies page then no need to open a modal for reply to.
		if ( bbp_is_single_user_replies() ) {
			return $retval;
		}

		// Build the URI and return value
		$uri = remove_query_arg( array( 'bbp_reply_to' ) );
		$uri = add_query_arg( array( 'bbp_reply_to' => $reply->ID ), bbp_get_topic_permalink( bbp_get_reply_topic_id( $reply->ID ) ) );
		$uri = wp_nonce_url( $uri, 'respond_id_' . $reply->ID );
		$uri = $uri . '#new-post';

		// Only add onclick if replies are threaded
		if ( bbp_thread_replies() ) {

			// Array of classes to pass to moveForm
			$move_form = array(
				$r['add_below'] . '-' . $reply->ID,
				$reply->ID,
				$r['respond_id'],
				$reply->post_parent
			);

			// Build the onclick
			$onclick  = ' onclick="return addReply.moveForm(\'' . implode( "','", $move_form ) . '\');"';

			// No onclick if replies are not threaded
		} else {
			$onclick  = '';
		}

		$modal = 'data-modal-id-inline="new-reply-'.$reply->post_parent.'"';

		// Add $uri to the array, to be passed through the filter
		$r['uri'] = $uri;
		$retval   = $r['link_before'] . '<a data-balloon=" ' . esc_html__( 'Reply', 'wbcom-essential' ) . ' " data-balloon-pos="up" href="' . esc_url( $r['uri'] ) . '" class="bbp-reply-to-link ' . $reply->ID . ' "><i class="bb-icon-reply"></i><span class="bb-forum-reply-text">' . esc_html( $r['reply_text'] ) . '</span></a>' . $r['link_after'];

		return $retval;
	}
}