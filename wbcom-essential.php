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
			add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ), 5 );
			add_action( 'init', array( $this, 'wbcom_essential_elementor_add_image_sizes' ) );
			add_action( 'init', array( $this, 'load_textdomain' ) );
		}

		/**
		 * Runs on plugins_loaded hook
		 */
		public function plugins_loaded() {
			$this->includes();
			$this->init_wbcom_wrapper();
		}
		
		
		/**
		 * Load plugin textdomain
		 */
		public function load_textdomain() {
			load_plugin_textdomain(
				'wbcom-essential',
				false,
				dirname( plugin_basename( WBCOM_ESSENTIAL_FILE ) ) . '/languages/'
			);
		}

		/**
		 * Include plugin files
		 */
		public function includes() {
			require_once WBCOM_ESSENTIAL_PATH . '/admin/class-wbcom-essential-widget-showcase.php';
			new \WBCOM_ESSENTIAL\Wbcom_Essential_Widget_Showcase();
		}

		/**
		 * Register custom image sizes for Elementor widgets
		 *
		 * @since 1.0.0
		 * @access public
		 * 
		 * @return void
		 */
		public function wbcom_essential_elementor_add_image_sizes() {
			add_image_size( 'wbcom-essential-elementor-masonry', 500 );
			add_image_size( 'wbcom-essential-elementor-normal', 800, 800, true );
			add_image_size( 'wbcom-essential-elementor-type1', 800, 500, true );
		}
		
		/**
		 * Initialize Advanced WBcom Shared Admin System
		 */
		public function init_wbcom_wrapper() {
			// Register with the shared system EARLY - before admin_menu hook fires
			add_action( 'plugins_loaded', array( $this, 'register_with_shared_system' ), 15 );
			
			// Fallback to old integration system if advanced doesn't work
			add_action( 'init', array( $this, 'init_fallback_integration' ) );
		}
		
		/**
		 * Initialize fallback integration after init
		 */
		public function init_fallback_integration() {
			// Only use fallback if the shared loader registration didn't work
			if ( ! class_exists( 'Wbcom_Shared_Loader' ) && function_exists( 'wbcom_integrate_plugin' ) ) {
				wbcom_integrate_plugin( 
					WBCOM_ESSENTIAL_FILE,
					array(
						'menu_title'   => __( 'Essential Widgets', 'wbcom-essential' ),
						'slug'         => 'essential',
						'priority'     => 5,
						'icon'         => 'dashicons-screenoptions',
						'callback'     => array( 'WBCOM_ESSENTIAL\Wbcom_Essential_Widget_Showcase', 'render_admin_page' ),
						'settings_url' => admin_url( 'admin.php?page=wbcom-essential' ),
					)
				);
			}
		}
		
		/**
		 * Register with the shared system
		 */
		public function register_with_shared_system() {
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			}
			
			// Try to load the shared loader if not already loaded
			if ( ! class_exists( 'Wbcom_Shared_Loader' ) ) {
				$shared_loader_file = WBCOM_ESSENTIAL_PATH . '/includes/shared-admin/class-wbcom-shared-loader.php';
				if ( file_exists( $shared_loader_file ) ) {
					require_once $shared_loader_file;
				}
			}
			
			if ( ! class_exists( 'Wbcom_Shared_Loader' ) ) {
				if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
				}
				return;
			}
			
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			}
			
			// Use the advanced quick registration system
			\Wbcom_Shared_Loader::quick_register( 
				WBCOM_ESSENTIAL_FILE,
				array(
					'menu_title'    => 'Essential Widgets',
					'slug'          => 'wbcom-essential',
					'priority'      => 5,
					'icon'          => 'dashicons-screenoptions',
					'description'   => '43+ premium Elementor widgets for BuddyPress, WooCommerce, and general purpose websites.',
					'settings_url'  => admin_url( 'admin.php?page=wbcom-essential' ),
					'status'        => 'active',
					'version'       => WBCOM_ESSENTIAL_VERSION,
					'license_key'   => '', // Temporarily remove license key to test
					'callback'      => array( 'WBCOM_ESSENTIAL\Wbcom_Essential_Widget_Showcase', 'render_admin_page' ),
				)
			);
			
			if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			}
		}
		
		/**
		 * Get license key for display purposes
		 */
		private function get_license_key() {
			// Try to get from new license system first
			if ( class_exists( '\WBCOM_ESSENTIAL\WBCOM_ESSENTIAL_License_Manager' ) ) {
				$license_manager = \WBCOM_ESSENTIAL\WBCOM_ESSENTIAL_License_Manager::get_instance();
				$license_key = $license_manager->get_license_key();
				if ( ! empty( $license_key ) ) {
					return $license_key;
				}
			}
			
			// Fallback to old option names
			$license_key = get_option( 'wbcom_essential_license_key' );
			if ( empty( $license_key ) ) {
				$license_key = get_option( 'edd-wbcom-essential-license-key' );
			}
			
			return $license_key;
		}

	}
}
