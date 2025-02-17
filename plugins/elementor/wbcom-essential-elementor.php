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
function wba_get_menus() {
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
function wba_get_anim_exits( $animation ) {
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

/**
 * Get post types.
 */
function wba_get_post_types() {
	// Check if cached data is available.
	$output_post_types = wp_cache_get( 'wba_post_types', 'wba_cache' );

	if ( false === $output_post_types ) {
		$output_post_types   = array();
		$args                = array( 'public' => true );
		$output              = 'names';
		$operator            = 'and';
		$selected_post_types = get_post_types( $args, $output, $operator );
		foreach ( $selected_post_types as $type ) {
			$output_post_types[ $type ] = $type;
		}

		// Cache the results.
		wp_cache_set( 'wba_post_types', $output_post_types, 'wba_cache', HOUR_IN_SECONDS );
	}

	return $output_post_types;
}

/**
 * General function to get terms.
 */
function wba_get_terms( $taxonomy ) {
	$output_terms = wp_cache_get( "wba_{$taxonomy}", 'wba_cache' );

	if ( false === $output_terms ) {
		$output_terms = array();
		$args         = array(
			'taxonomy'   => array( $taxonomy ),
			'hide_empty' => 1,
		);
		$terms        = get_terms( $args );
		foreach ( $terms as $term ) {
			$output_terms[ $term->term_id ] = $term->name;
		}

		// Cache the results.
		wp_cache_set( "wba_{$taxonomy}", $output_terms, 'wba_cache', HOUR_IN_SECONDS );
	}

	return $output_terms;
}

/**
 * Get post categories.
 */
function wba_get_categories() {
	return wba_get_terms( 'category' );
}

/**
 * Get post tags.
 */
function wba_get_tags() {
	return wba_get_terms( 'post_tag' );
}

/**
 * Get post authors with a filter for limiting the number of users retrieved.
 * Returns a list of authors for use in the Elementor control options.
 */
function wba_get_authors() {
	$output_authors = array();

	// Allow filtering the number of users per query (default to 50).
	$number_of_users = apply_filters( 'wba_number_of_users_per_query', 50 );

	$args = array(
		'role__in' => array( 'Administrator', 'Editor', 'Author' ),
		'orderby'  => 'post_count',
		'order'    => 'DESC',
		'fields'   => array( 'ID', 'display_name' ), // Fetch only necessary fields.
		'number'   => $number_of_users,  // The number of users per page.
	);

	$user_query = new WP_User_Query( $args );
	$users      = $user_query->get_results();

	if ( ! empty( $users ) ) {
		foreach ( $users as $user ) {
			$output_authors[ $user->ID ] = $user->display_name;
		}
	}

	return $output_authors;
}

/**
 * Get post excerpt.
 */
function wba_excerpt( $charlength ) {
	$excerpt = get_the_excerpt();
	++$charlength;

	if ( mb_strlen( $excerpt ) > $charlength ) {
		$subex   = mb_substr( $excerpt, 0, $charlength );
		$exwords = explode( ' ', $subex );
		$excut   = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
		if ( $excut < 0 ) {
			return mb_substr( $subex, 0, $excut ) . ' ...';
		} else {
			return $subex . ' ...';
		}
	} else {
		return $excerpt;
	}
}

/**
 * Get Image Sizes
 */
function wba_get_image_sizes() {
	$output_sizes         = array();
	$img_sizes            = get_intermediate_image_sizes();
	$output_sizes['full'] = esc_html__( 'Full', 'wbcom-essential' );
	foreach ( $img_sizes as $size_name ) {
		$output_sizes[ $size_name ] = $size_name;
	}
	return $output_sizes;
}

/**
 * Handles the AJAX login process for users.
 *
 * @return void
 */
function wbcom_ajax_login() {
	check_ajax_referer( 'wbcom-ajax-login-nonce', 'security' );

	$info = array(
		'user_login'    => sanitize_text_field( $_POST['log'] ),
		'user_password' => sanitize_text_field( $_POST['pwd'] ),
		'remember'      => ! empty( $_POST['rememberme'] ) ? true : false,
	);

	$user_signon = wp_signon( $info, false );

	if ( is_wp_error( $user_signon ) ) {
		$error_codes = $user_signon->get_error_codes();

		if ( in_array( 'invalid_username', $error_codes ) ) {
			$message = __( 'Invalid username. Please try again.', 'wbcom-essential' );
		} elseif ( in_array( 'incorrect_password', $error_codes ) ) {
			$message = __( 'Incorrect password. Please try again.', 'wbcom-essential' );
		} elseif ( in_array( 'empty_username', $error_codes ) ) {
			$message = __( 'Username field is empty. Please enter your username.', 'wbcom-essential' );
		} elseif ( in_array( 'empty_password', $error_codes ) ) {
			$message = __( 'Password field is empty. Please enter your password.', 'wbcom-essential' );
		} else {
			$message = __( 'Login failed. Please check your credentials.', 'wbcom-essential' );
		}

		echo wp_json_encode(
			array(
				'loggedin' => false,
				'message'  => $message,
			)
		);
	} else {
		$redirect_url = ! empty( $_POST['redirect_to'] ) ? esc_url( $_POST['redirect_to'] ) : home_url();

		echo wp_json_encode(
			array(
				'loggedin' => true,
				'message'  => __( 'Login successful, redirecting...', 'wbcom-essential' ),
				'redirect' => $redirect_url,
			)
		);
	}

	wp_die();
}

if ( ! defined( 'PMPRO_VERSION' ) ) {
	add_action( 'wp_ajax_nopriv_wbcom_ajax_login', 'wbcom_ajax_login' );
}
