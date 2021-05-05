<?php
/**
 * Add plugin main class.
 *
 * @package WBCOM_ESSENTIAL
 * @since 1.0.0
 */

namespace WBCOM_ESSENTIAL\ELEMENTOR;

defined( 'ABSPATH' ) || die();

/**
 * Plugin class.
 *
 * @since 1.0.0
 * @SuppressWarnings(PHPMD.ExcessiveClassComplexity)
 */
class Plugin {

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
	 * Modules.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var object
	 */
	public $modules = array();

	/**
	 * The plugin name.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $plugin_name;

	/**
	 * The plugin version number.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $plugin_version;

	/**
	 * The minimum Elementor version number required.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $minimum_elementor_version = '2.0.0';

	/**
	 * The plugin directory.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $plugin_path;

	/**
	 * The plugin URL.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $plugin_url;

	/**
	 * The plugin assets URL.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $plugin_assets_url;

	/**
	 * The plugin directory.
	 *
	 * @since 3.0.0
	 * @access public
	 *
	 * @var string
	 */
	public static $widget_path;

	/**
	 * Disables class cloning and throw an error on object clone.
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object. Therefore, we don't want the object to be cloned.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'stax-buddy-builder' ), BPB_VERSION );
	}

	/**
	 * Disables unserializing of the class.
	 *
	 * @access public
	 * @since 1.0.0
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'stax-buddy-builder' ), BPB_VERSION );
	}

	/**
	 * Ensures only one instance of the plugin class is loaded or can be loaded.
	 *
	 * @return Plugin An instance of the class.
	 * @since 1.0.0
	 * @access public
	 * @static
	 */
	public static function get_instance() {
		if ( self::$instance === null ) {
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

		add_action( 'plugins_loaded', array( $this, 'wbcom_essential_oad_plugin' ), 0 );
		add_action( 'bp_enqueue_scripts', array( $this, 'wbcom_essential_elementor_scripts' ) );
		// add_action( 'wp_enqueue_scripts', array( $this, 'front_css' ), 12 );
		define( 'WBCOM_ESSENTIAL_ELEMENTOR_PATH', WBCOM_ESSENTIAL_PATH . 'plugins/elementor/' );
		define( 'WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH', WBCOM_ESSENTIAL_ELEMENTOR_PATH . 'widgets/' );
	}

	/**
	 * Checks Elementor version compatibility.
	 *
	 * First checks if Elementor is installed and active,
	 * then checks Elementor version compatibility.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function wbcom_essential_oad_plugin() {
		if ( ! defined( 'ELEMENTOR_VERSION' ) ) {
			add_action( 'admin_notices', array( $this, 'wbcom_essential_elementor_notice' ) );
			return;
		}

		spl_autoload_register( array( $this, 'autoload' ) );

		$this->define_constants();
		// $this->load_components();
		$this->add_hooks();
		do_action( 'wbcom_essential/init' );
	}

	/**
	 * Elementor not installed notice
	 */
	public function wbcom_essential_elementor_notice() {
		$class = 'notice notice-warning';
		/* translators: %s: html tags */
		$message = sprintf( __( '%1$sBuddyBuilder%2$s requires %1$sElementor%2$s plugin installed & activated.', 'stax-buddy-builder' ), '<strong>', '</strong>' );

		$plugin = 'elementor/elementor.php';

		if ( current_user_can( 'activate_plugins' ) ) {
			$action_url   = wp_nonce_url( 'plugins.php?action=activate&amp;plugin=' . $plugin . '&amp;plugin_status=all&amp;paged=1&amp;s', 'activate-plugin_' . $plugin );
			$button_label = __( 'Activate Elementor', 'stax-buddy-builder' );
		} elseif ( current_user_can( 'install_plugins' ) ) {
			$action_url   = wp_nonce_url( self_admin_url( 'update.php?action=install-plugin&plugin=elementor' ), 'install-plugin_elementor' );
			$button_label = __( 'Install Elementor', 'stax-buddy-builder' );
		}

		$button = '<p><a href="' . $action_url . '" class="button-primary">' . $button_label . '</a></p><p></p>';

		printf( '<div class="%1$s"><p>%2$s</p>%3$s</div>', esc_attr( $class ), $message, $button );
	}

	/**
	 * Load compatibility
	 */
	// public function load_compat() {
	// require_once self::$plugin_path . 'compat/index.php';
	// }

	/**
	 * Load components
	 */
	// public function load_components() {
	// require_once self::$plugin_path . 'functions.php';
	//
	// Admin pages
	// include_once self::$plugin_path . '/admin/Admin.php';
	// }

	/**
	 * Autoload classes based on namespace.
	 *
	 * @param string $class Name of class.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function autoload( $class ) {
		// Return if WBCOM_ESSENTIAL name space is not set.
		if ( false === strpos( $class, __NAMESPACE__ ) ) {
			return;
		}
		// echo '<pre>';
		// print_r( $class );
		// echo '</pre>';
		/**
		 * Prepare filename.
		 *
		 * @todo Refactor to use preg_replace.
		 */
		$filename = str_replace(
			array( __NAMESPACE__ . '\\', '\\', '_' ),
			array(
				'',
				DIRECTORY_SEPARATOR,
				'-',
			),
			$class
		);
		$filename = __DIR__ . '/' . strtolower( $filename ) . '.php';
		// Return if file is not found.
		if ( ! is_readable( $filename ) ) {
			return;
		}

		include $filename;
	}

	/**
	 * Defines constants used by the plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function define_constants() {
		self::$plugin_path       = trailingslashit( plugin_dir_path( WBCOM_ESSENTIAL_PATH ) );
		self::$plugin_url        = trailingslashit( plugin_dir_url( WBCOM_ESSENTIAL_PATH ) );
		self::$plugin_assets_url = trailingslashit( self::$plugin_url . 'assets' );
		self::$widget_path       = trailingslashit( self::$plugin_path . '/plugins/elementor/widgets' );
	}

	/**
	 * Adds required hooks.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function add_hooks() {
		include_once WBCOM_ESSENTIAL_PATH . 'plugins/elementor/hooks/ElementorHooks.php';
		// include_once BPB_BASE_PATH . 'core/hooks/BuddypressHooks.php';
		// include_once BPB_BASE_PATH . 'core/hooks/CustomizerHooks.php';

		\WBCOM_ESSENTIAL\ELEMENTOR\ElementorHooks::get_instance();
		// BuddypressHooks::get_instance();
		// CustomizerHooks::get_instance();
	}

	/**
	 * Elements
	 *
	 * @return array
	 */
	public function get_elements() {
		$elements = array();

		$elements['Buddypress/MembersGrid'] = array(
			'name'  => 'wbcom-members-grid',
			'class' => 'Buddypress\MembersGrid',
		);

		$elements['Buddypress/GroupGrid'] = array(
			'name'  => 'wbcom-groups-grid',
			'class' => 'Buddypress\GroupGrid',
		);

		$elements['Buddypress/MemeberCarousel'] = array(
			'name'  => 'wbcom-members-carousel',
			'class' => 'Buddypress\MemeberCarousel',
		);

		$elements['General/Branding'] = array(
			'name'  => 'wbcom-branding',
			'class' => 'General\Branding',
		);

		$elements['General/Menu'] = array(
			'name'  => 'wbcom-registration',
			'class' => 'General\Menu',
		);

		$elements['General/NotificationArea'] = array(
			'name'  => 'wbcom-notification-area',
			'class' => 'General\NotificationArea',
		);

		// $elements['General/Posts'] = array(
		// 'name'  => 'posts',
		// 'class' => 'General\Posts',
		// );

		$elements['Forms/Login'] = array(
			'name'  => 'wbcom-login',
			'class' => 'Forms\Login',
		);

		$elements['Forms/Registration'] = array(
			'name'  => 'wbcom-registration',
			'class' => 'Forms\Registration',
		);

		foreach ( $elements as &$element ) {
			$element['template_base_path']   = WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH;
			$element['class_base_namespace'] = '\WBCOM_ESSENTIAL\ELEMENTOR\Widgets\\';
		}

		return apply_filters( 'wbcom_essential/get_elements', $elements );
	}

	/**
	 * Enqueue Front CSS
	 */
	public function front_css() {
		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = '';
		}

		wp_register_style(
			'stax-buddy-builder-front',
			BPB_ASSETS_URL . 'css/index' . $min . '.css',
			array( 'stax-buddy-builder-bp' ),
			BPB_VERSION
		);

		if ( bpb_is_elementor_editor() ) {
			wp_enqueue_style(
				'stax-buddy-builder-avatar',
				buddypress()->plugin_url . 'bp-core/css/avatar' . $min . '.css',
				array(),
				BPB_VERSION
			);
		}

		if ( ! bp_is_blog_page() ) {
			wp_enqueue_style( 'dashicons' );
		}

		if ( isset( $_GET['elementor-preview'] ) ||
			 bpb_is_edit_frame() ||
			 bpb_is_preview_mode() ||
			 bpb_is_front_library()
		) {
			wp_enqueue_style( 'stax-buddy-builder-front' );
		}
	}

	/**
	 * Enqueue Front CSS
	 */
	public function wbcom_essential_elementor_scripts() {
		// $min = '.min';
		//
		// if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
		// $min = '';
		// }
		// echo $min;
		// die;
		wp_register_script(
			'wbcom-essential-elementor',
			WBCOM_ESSENTIAL_ASSETS_URL . 'js/wbcom-essential-elementor.js',
			array( 'jquery' ),
			WBCOM_ESSENTIAL_VERSION
		);

		wp_enqueue_script( 'wbcom-essential-elementor' );
	}

}

return Plugin::get_instance();
