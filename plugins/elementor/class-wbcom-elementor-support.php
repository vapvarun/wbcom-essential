<?php

namespace WBCOMESSENTIAL;

use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
/**
 * Main class plugin
 */

class Plugin {

	/**
	 * @var dependency
	 */
	private $dependency = 'elementor';

	/**
	 * @var Plugin
	 */
	private static $_instance;

	/**
	 * @var Manager
	 */
	public $modules_manager;

	/**
	 * @deprecated
	 *
	 * @return string
	 */
	public function get_version() {
		return MINIMUM_ELEMENTOR_VERSION;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'wbcom-essential' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden
		_doing_it_wrong( __FUNCTION__, __( 'Cheatin&#8217; huh?', 'wbcom-essential' ), '1.0.0' );
	}

	/**
	 * @return \Elementor\Plugin
	 */
	public static function elementor() {
		return \Elementor\Plugin::$instance;
	}

	/**
	 * @return Plugin
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	private function includes() {
		require WBCOM_ESSENTIAL_PATH . 'plugins/elementor/includes/modules-manager.php';
		require WBCOM_ESSENTIAL_PATH . 'plugins/elementor/includes/global-settings-manager.php';
		require WBCOM_ESSENTIAL_PATH . 'plugins/elementor/includes/global-header-footer.php';
		require WBCOM_ESSENTIAL_PATH . 'plugins/elementor/includes/global-header-footer-posttype.php';
	}


	/**
	 * Include Modules
	 *
	 * Include widgets files and register them
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 */
	public function autoload( $class ) {
		if ( 0 !== strpos( $class, __NAMESPACE__ ) ) {
			return;
		}

		$filename = strtolower(
			preg_replace(
				array( '/^' . __NAMESPACE__ . '\\\/', '/([a-z])([A-Z])/', '/_/', '/\\\/' ),
				array( '', '$1-$2', '-', DIRECTORY_SEPARATOR ),
				$class
			)
		);

		$filename = WBCOM_ESSENTIAL_DEPENDENCIES . $this->dependency . '/' . $filename . '.php';

		if ( is_readable( $filename ) ) {
			include $filename;
		}
	}

	public function enqueue_styles() {
		$suffix           = '.min';
		$direction_suffix = is_rtl() ? '-rtl' : '';
		wp_enqueue_style(
			'wbcom-essential',
			WBCOM_ESSENTIAL_ASSETS_URL . 'css/frontend' . $direction_suffix . $suffix . '.css',
			array(),
			WBCOM_ESSENTIAL_VERSION
		);
	}

	public function enqueue_frontend_scripts() {
		/* Login Widget Script */
		wp_register_script(
			$handle    = 'wbcom_elementor_login_module_js',
			$src       = WBCOM_ESSENTIAL_ASSETS_URL . 'elementor/js/login-module.js',
			$deps      = array( 'jquery' ),
			$ver       = time(),
			$in_footer = true
		);
		wp_localize_script(
			'wbcom_elementor_login_module_js',
			'wbcom_elementor_login_module_params',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
			)
		);
		wp_enqueue_script( 'wbcom_elementor_login_module_js' );

		wp_register_script(
			$handle    = 'wbcom_elementor_main_js',
			$src       = WBCOM_ESSENTIAL_ASSETS_URL . 'elementor/js/main.js',
			$deps      = array( 'jquery' ),
			$ver       = time(),
			$in_footer = true
		);
		$reign_header_topbar_mobile_view_disable = get_theme_mod( 'reign_header_topbar_mobile_view_disable', false );

		$rtl = false;
		if ( is_rtl() ) {
			$rtl = true;
		}

		wp_localize_script(
			'wbcom_elementor_main_js',
			'essential_js_obj',
			array(
				'reign_rtl' => $rtl,
			)
		);
		wp_enqueue_script( 'wbcom_elementor_main_js' );
	}

	public function elementor_init() {
		$this->modules_manager = new Manager();
		$elementor             = \Elementor\Plugin::$instance;

		// Add element category in panel
		$elementor->elements_manager->add_category(
			'wbcom-elements',
			array(
				'title' => __( 'WBCOM Elements', 'wbcom-essential' ),
				'icon'  => 'font',
			),
			1
		);
		do_action( 'wbcom_elementor_addons/init' );
	}

	private function setup_hooks() {
		add_action( 'elementor/init', array( $this, 'elementor_init' ) );
		// add_action( 'elementor/frontend/before_register_scripts', [ $this, 'register_frontend_scripts' ] );
		// add_action( 'elementor/editor/after_enqueue_styles', [ $this, 'enqueue_editor_styles' ] );
		// add_action( 'elementor/editor/before_enqueue_scripts', [ $this, 'enqueue_editor_scripts' ] );
		add_action( 'elementor/frontend/before_enqueue_scripts', array( $this, 'enqueue_frontend_scripts' ) );
		add_action( 'elementor/frontend/after_enqueue_styles', array( $this, 'enqueue_styles' ) );
	}

	/**
	 * Plugin constructor.
	 */
	private function __construct() {

		spl_autoload_register( array( $this, 'autoload' ) );
		$this->includes();
		$this->setup_hooks();
	}
        
}

if ( ! defined( 'WBCOM_ELEMENTOR_ADDONS_TESTS' ) ) {
	// In tests we run the instance manually.
	Plugin::instance();
}
