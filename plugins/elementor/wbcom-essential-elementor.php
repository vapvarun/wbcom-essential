<?php
/**
 * WBCom Essential Elementor Widgets.
 *
 * @link       https://wbcomdesigns.com/plugins
 * @since      1.0.0
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/plugins/elementor
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

define( 'ELEMENTOR_WBCOMESSENTIAL__FILE__', __FILE__ );
define( 'ELEMENTOR_WBCOMESSENTIAL__DIR__', __DIR__ );


/**
 * Load BB Elementor
 *
 * Load the widgets after Elementor (and other plugins) are loaded.
 *
 * @since 1.0.0
 */
function wbcom_essential_elementor_load() {

	// Notice if the Elementor is not active.
	if ( ! did_action( 'elementor/loaded' ) ) {
		add_action( 'admin_notices', 'wbcom_essential_elementor_fail_load' );

		return;
	}

	// Check required version.
	$elementor_version_required = '1.8.0';
	if ( ! version_compare( ELEMENTOR_VERSION, $elementor_version_required, '>=' ) ) {
		add_action( 'admin_notices', 'wbcom_essential_elementor_fail_load_out_of_date' );

		return;
	}

	// Require templates.
	require ELEMENTOR_WBCOMESSENTIAL__DIR__ . '/templates/templates.php';
}

/**
 * Check Elementor is activated or not.
 */
function wbcom_essential_elementor_fail_load() {
	$plugin            = 'elementor/elementor.php';
	$installed_plugins = get_plugins();

	/* Check Plugin Install but not activate */
	if ( isset( $installed_plugins[ $plugin ] ) && ! is_plugin_active( $plugin ) ) {

		if ( ! current_user_can( 'activate_plugins' ) ) {
			return;
		}
		$activation_url = wp_nonce_url( 'plugins.php?action=activate&amp;plugin=' . $plugin . '&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_' . $plugin );

		$admin_message  = '<p>' . esc_html__( 'Wbcom Essential plugin does not work because you need to first activate the Elementor plugin.', 'wbcom-essential' ) . '</p>';
		$admin_message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $activation_url, esc_html__( 'Activate Elementor Now', 'wbcom-essential' ) ) . '</p>';

	} else {

		if ( ! current_user_can( 'install_plugins' ) ) {
			return;
		}

		$install_url    = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );
		$admin_message  = '<p>' . esc_html__( 'Wbcom Essential plugin does not work because you need to first install the Elementor plugin.', 'wbcom-essential' ) . '</p>';
		$admin_message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $install_url, esc_html__( 'Install Elementor Now', 'wbcom-essential' ) ) . '</p>';
	}

	echo '<div class="error">' . wp_kses_post( $admin_message ) . '</div>';
}

add_action( 'init', 'wbcom_essential_elementor_load', -999 );


/**
 * Check Elementor is outdated or not.
 */
function wbcom_essential_elementor_fail_load_out_of_date() {
	if ( ! current_user_can( 'update_plugins' ) ) {
		return;
	}

	$file_path = 'elementor/elementor.php';

	$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
	$message      = '<p>' . __( 'Elementor Hello World is not working because you are using an old version of Elementor.', 'wbcom-essential' ) . '</p>';
	$message     .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'wbcom-essential' ) ) . '</p>';

	echo '<div class="error">' . wp_kses_post( $message ) . '</div>';
}

/**
 *
 * Get menus
 */
function WBA_get_menus() {
	$output_menus = array();
	$menus        = wp_get_nav_menus();
	foreach ( $menus as $menu ) {
		$output_menus[ $menu->term_id ] = $menu->name;
	}
	return $output_menus;
}

/**
 *
 * Get Exit Animations
 */
function WBA_get_anim_exits( $animation ) {
	if ( $animation ) {
		$animation_array = array(
			'bounce'            => 'fadeOut',
			'flash'             => 'fadeOut',
			'pulse'             => 'fadeOut',
			'rubberBand'        => 'fadeOut',
			'shake'             => 'fadeOut',
			'swing'             => 'fadeOut',
			'tada'              => 'fadeOut',
			'wobble'            => 'fadeOut',
			'jello'             => 'fadeOut',
			'heartBeat'         => 'fadeOut',
			'bounceIn'          => 'bounceOut',
			'bounceInDown'      => 'bounceOutUp',
			'bounceInLeft'      => 'bounceOutLeft',
			'bounceInRight'     => 'bounceOutRight',
			'bounceInUp'        => 'bounceOutDown',
			'fadeIn'            => 'fadeOut',
			'fadeInDown'        => 'fadeOutUp',
			'fadeInDownBig'     => 'fadeOutUpBig',
			'fadeInLeft'        => 'fadeOutLeft',
			'fadeInLeftBig'     => 'fadeOutLeftBig',
			'fadeInRight'       => 'fadeOutRight',
			'fadeInRightBig'    => 'fadeOutRightBig',
			'fadeInUp'          => 'fadeOutDown',
			'fadeInUpBig'       => 'fadeOutDownBig',
			'flip'              => 'fadeOut',
			'flipInX'           => 'flipOutX',
			'flipInY'           => 'flipOutY',
			'lightSpeedIn'      => 'lightSpeedOut',
			'rotateIn'          => 'rotateOut',
			'rotateInDownLeft'  => 'rotateOutUpLeft',
			'rotateInDownRight' => 'rotateOutUpRight',
			'rotateInUpLeft'    => 'rotateOutDownLeft',
			'rotateInUpRight'   => 'rotateOutDownRight',
			'slideInUp'         => 'slideOutDown',
			'slideInDown'       => 'slideOutUp',
			'slideInLeft'       => 'slideOutLeft',
			'slideInRight'      => 'slideOutRight',
			'zoomIn'            => 'zoomOut',
			'zoomInDown'        => 'zoomOutUp',
			'zoomInLeft'        => 'zoomOutLeft',
			'zoomInRight'       => 'zoomOutRight',
			'zoomInUp'          => 'zoomOutDown',
			'hinge'             => 'fadeOut',
			'jackInTheBox'      => 'fadeOut',
			'rollIn'            => 'fadeOut',
		);
		$animation       = $animation_array[ $animation ];
		return $animation;
	}
}

/**
 * Shortcode
 */
add_shortcode( 'wbcombtn', 'wbcombtn' );

add_filter( 'the_content', 'wbcom_content_filter' );

function wbcom_content_filter( $content ) {

	// array of custom shortcodes requiring the fix.
	$block = join( '|', array( 'wbcombtn' ) );

	// opening tag.
	$rep = preg_replace( "/(<p>)?\[($block)(\s[^\]]+)?\](<\/p>|<br \/>)?/", '[$2$3]', $content );

	// closing tag.
	$rep = preg_replace( "/(<p>)?\[\/($block)](<\/p>|<br \/>)?/", '[/$2]', $rep );

	return $rep;

}

if ( ! function_exists( 'wbcombtn' ) ) {
	function wbcombtn( $atts, $content = null ) {
		extract(
			shortcode_atts(
				array(
					'url'    => 'url',
					'style'  => 'style',
					'target' => 'target',
				),
				$atts
			)
		);
		return '<a href="' . esc_url( $url ) . '" target="' . esc_attr( $target ) . '" class="wbcombtn wbcombtn-' . esc_attr( $style ) . '">' . esc_html( $content ) . '</a>';
	}
}
