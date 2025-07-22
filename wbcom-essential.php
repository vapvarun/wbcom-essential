<?php
/**
 * Wbcom essential includes plugin files.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://wbcomdesigns.com/plugins
 * @since      1.0.0
 *
 * @package    Wbcom_Essential
 */

namespace WBCOM_ESSENTIAL;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WBCOM_ESSENTIAL\WBCOMESSENTIAL' ) ) {
	/**
	 * Wbcom essential includes plugin files.
	 *
	 * A class definition that includes attributes and functions used across both the
	 * public-facing side of the site and the admin area.
	 *
	 * @link       https://wbcomdesigns.com/plugins
	 * @since      1.0.0
	 *
	 * @package    Wbcom_Essential
	 */
	final class WBCOMESSENTIAL {

		/**
		 * Plugin instance.
		 *
		 * @since 1.0.0
		 * @access public
		 *
		 * @var Plugin
		 */
		public static $instance;

		/**
		 * Disables class cloning and throws an error on object clone.
		 *
		 * The whole idea of the singleton design pattern is that there is a single
		 * object. Therefore, we don't want the object to be cloned.
		 *
		 * @access public
		 * @since 1.0.0
		 */
		public function __clone() {
			// Cloning instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'wbcom-essential' ), esc_attr( WBCOM_ESSENTIAL_VERSION ) );
		}

		/**
		 * Disables unserializing of the class.
		 *
		 * @access public
		 * @since 1.0.0
		 */
		public function __wakeup() {
			// Unserializing instances of the class is forbidden.
			_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'wbcom-essential' ), esc_attr( WBCOM_ESSENTIAL_VERSION ) );
		}

		/**
		 * Ensures only one plugin class instance is loaded or can be loaded.
		 *
		 * @return Plugin An instance of the class.
		 * @since 1.0.0
		 * @access public
		 * @static
		 */
		public static function get_instance() {
			if ( null === self::$instance ) {
				self::$instance = new self();
			}

			return self::$instance;
		}


		/**
		 * Constructor.
		 *
		 * @since 1.0.0
		 * @access private
		 */
		private function __construct() {
			$this->includes();
			add_action( 'init', array( $this, 'wbcom_essential_elementor_add_image_sizes' ) );
		}

		/**
		 * Include plugin files
		 */
		public function includes() {
			if ( did_action( 'elementor/loaded' ) ) {
				require WBCOM_ESSENTIAL_PATH . '/includes/wbcom-essential-function.php';
				require WBCOM_ESSENTIAL_PATH . '/plugins/elementor/Plugins.php';
			}
			
			// Include widget showcase
			require_once WBCOM_ESSENTIAL_PATH . '/admin/class-wbcom-essential-widget-showcase.php';
		}

		public function wbcom_essential_elementor_add_image_sizes() {
			add_image_size( 'wbcom-essential-elementor-masonry', 500 );
			add_image_size( 'wbcom-essential-elementor-normal', 800, 800, true );
			add_image_size( 'wbcom-essential-elementor-type1', 800, 500, true );
		}

	}
}
