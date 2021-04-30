<?php
/**
 * Plugin Name: Wbcom Essential
 * Description: Wbcom Essential Addons.
 * Plugin URI: https://wbcomdesigns.com/
 * Author: Wbcom Designs
 * Version: 2.7.0
 * Author URI: https://wbcomdesigns.com/
 *
 * Text Domain: wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}


class WBCOM_ESSENTIAL {

	/**
 * Plugin Version
 *
 * @since 2.7.0
 *
 * @var string The plugin version.
 */
	const VERSION = '2.7.0';

	/**
	 * Minimum Elementor Version
	 *
	 * @since 2.7.0
	 *
	 * @var string Minimum Elementor version required to run the plugin.
	 */
	const MINIMUM_ELEMENTOR_VERSION = '3.0.0';

	/**
 * Minimum PHP Version
 *
 * @since 2.7.0
 *
 * @var string Minimum PHP version required to run the plugin.
 */
	const MINIMUM_PHP_VERSION = '7.0';

	/**
	 * Instance
	 *
	 * @since 2.7.0
	 *
	 * @access private
	 * @static
	 *
	 * @var WBCOM_ESSENTIAL The single instance of the class.
	 */
	private static $_instance;


	/**
	 * Instance
	 *
	 * Ensures only one instance of the class is loaded or can be loaded.
	 *
	 * @since 2.7.0
	 *
	 * @access public
	 * @static
	 *
	 * @return WBCOM_ESSENTIAL An instance of the class.
	 */
	public static function instance() {

		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
			self::$_instance->constants();
			self::$_instance->includes();
			self::$_instance->setup_actions();
		}
		// Always return the instance
		return $_instance;
	}


	/**
	 * Bootstrap constants.
	 *
	 * @since 2.7.0
	 */
	private function constants() {

		/** Paths and URL */

		if ( ! defined( 'WBCOM_ESSENTIAL_VERSION' ) ) {
			define( 'WBCOM_ESSENTIAL_VERSION', '2.7.0' );
		}

		if ( ! defined( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION' ) ) {
			define( 'WBCOM_ESSENTIAL_PREVIOUS_STABLE_VERSION', '3.0.0' );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_FILE' ) ) {
			define( 'WBCOM_ESSENTIAL_FILE', __FILE__ );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_PLUGIN_BASE' ) ) {
			define( 'WBCOM_ESSENTIAL_PLUGIN_BASE', plugin_basename( WBCOM_ESSENTIAL_FILE ) );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_PATH' ) ) {
			define( 'WBCOM_ESSENTIAL_PATH', plugin_dir_path( WBCOM_ESSENTIAL_FILE ) );
		}

		if ( ! defined( 'WBCOM_ESSENTIAL_ELEMENTOR' ) ) {
			define( 'WBCOM_ESSENTIAL_ELEMENTOR', WBCOM_ESSENTIAL_PATH . 'elementor/' );
		}

		if ( ! defined( 'WBCOM_ESSENTIAL_MODULES_PATH' ) ) {
			define( 'WBCOM_ESSENTIAL_MODULES_PATH', WBCOM_ESSENTIAL_PATH . 'modules/' );
		}

		if ( ! defined( 'WBCOM_ESSENTIAL_URL' ) ) {
			define( 'WBCOM_ESSENTIAL_URL', plugins_url( '/', WBCOM_ESSENTIAL_FILE ) );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_ASSETS_URL' ) ) {
			define( 'WBCOM_ESSENTIAL_ASSETS_URL', WBCOM_ESSENTIAL_URL . 'assets/' );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_MODULES_URL' ) ) {
			define( 'WBCOM_ESSENTIAL_MODULES_URL', WBCOM_ESSENTIAL_URL . 'modules/' );
		}
		if ( ! defined( 'WBCOM_ESSENTIAL_PLUGIN_FILE' ) ) {
			define( 'WBCOM_ESSENTIAL_PLUGIN_FILE', __FILE__ );
		}

	}

	/**
	 * Include required files.
	 *
	 * @since 2.7.0
	 */
	private function includes() {
		require WBCOM_ESSENTIAL_PATH . 'includes/form-ajax-handler.php';
		require WBCOM_ESSENTIAL_PATH . 'includes/class-wbcom-reign-customizer-support.php';

		if ( did_action( 'elementor/loaded' ) ) {
			require WBCOM_ESSENTIAL_PATH . 'elementor\class-wbcom-elementor-support.php';
		}
	}

	/**
	 * Set up the default hooks and actions.
	 *
	 * @since 2.7.0
	 */
	private function setup_actions() {
		add_action( 'plugins_loaded', array( $this, 'load_plugin_textdomain' ) );
		add_action( 'admin_init', array( $this, 'wbcom_essintial_loaded' ) );
	}


	/**
	 * Load gettext translate for our text domain.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'wbcom-essential',
			false,
			basename( dirname( __FILE__ ) ) . '/languages/'
		);
	}

	/**
	 * Load plugin and check dependend plugins are activated or not
	 */
	public function wbcom_essintial_loaded() {

		if ( ! did_action( 'elementor/loaded' ) ) {
			add_action( 'admin_notices', array( $this, 'wbcom_essential_fail_load' ) );
			return;
		}

		$elementor_version_required = '3.0.0';
		if ( ! version_compare( ELEMENTOR_VERSION, $elementor_version_required, '>=' ) ) {
			add_action( 'admin_notices', array( $this, 'wbcom_essential_fail_load_out_of_date' ) );
			return;
		}

		$elementor_version_recommendation = '3.0.0';
		if ( ! version_compare( ELEMENTOR_VERSION, $elementor_version_recommendation, '>=' ) ) {
			add_action( 'admin_notices', array( $this, 'wbcom_elementor_addons_admin_notice_upgrade_recommendation' ) );
		}

	}


	/**
	 * Show in WP Dashboard notice about the plugin is not activated.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function wbcom_essential_fail_load() {
		$screen = get_current_screen();
		if ( isset( $screen->parent_file ) && 'plugins.php' === $screen->parent_file && 'update' === $screen->id ) {
			return;
		}

		$plugin = 'elementor/elementor.php';

		if ( function_exists( '_is_elementor_installed' ) &&  _is_elementor_installed() ) {
			if ( ! current_user_can( 'activate_plugins' ) ) {
				return;
			}

			$activation_url = wp_nonce_url( 'plugins.php?action=activate&amp;plugin=' . $plugin . '&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_' . $plugin );

			$message  = '<p>' . __( 'WBCOM Elementor Addons not working because you need to activate the Elementor plugin.', 'wbcom-essential' ) . '</p>';
			$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $activation_url, __( 'Activate Elementor Now', 'wbcom-essential' ) ) . '</p>';
		} else {
			if ( ! current_user_can( 'install_plugins' ) ) {
				return;
			}

			$install_url = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );

			$message  = '<p>' . __( 'WBCOM Elementor Addons not working because you need to install the Elementor plugin', 'wbcom-essential' ) . '</p>';
			$message .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $install_url, __( 'Install Elementor Now', 'wbcom-essential' ) ) . '</p>';
		}

		echo '<div class="error"><p>' . $message . '</p></div>';
	}


	public function wbcom_essential_fail_load_out_of_date() {
		if ( ! current_user_can( 'update_plugins' ) ) {
			return;
		}

		$file_path = 'elementor/elementor.php';

		$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
		$message      = '<p>' . __( 'WBCOM Elementor Addons not working because you are using an old version of Elementor.', 'wbcom-essential' ) . '</p>';
		$message     .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'wbcom-essential' ) ) . '</p>';

		echo '<div class="error">' . $message . '</div>';
	}


	public function wbcom_elementor_addons_admin_notice_upgrade_recommendation() {
		if ( ! current_user_can( 'update_plugins' ) ) {
			return;
		}

		$file_path = 'elementor/elementor.php';

		$upgrade_link = wp_nonce_url( self_admin_url( 'update.php?action=upgrade-plugin&plugin=' ) . $file_path, 'upgrade-plugin_' . $file_path );
		$message      = '<p>' . __( 'A new version of Elementor is available. For better performance and compatibility of WBCOM Elementor Addons, we recommend updating to the latest version.', 'wbcom-essential' ) . '</p>';
		$message     .= '<p>' . sprintf( '<a href="%s" class="button-primary">%s</a>', $upgrade_link, __( 'Update Elementor Now', 'wbcom-essential' ) ) . '</p>';

		echo '<div class="error">' . $message . '</div>';
	}

}

function wbcom_essential() {
	return WBCOM_ESSENTIAL::instance();
}

wbcom_essential();
