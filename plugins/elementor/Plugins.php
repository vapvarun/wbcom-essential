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
		// add_action( 'bp_enqueue_scripts', array( $this, 'wbcom_essential_elementor_scripts' ) );
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

		// Groups directory

		$elements['groups-directory/Listing'] = array(
			'name'     => 'bpb-groups-directory-list',
			'class'    => 'GroupsDirectory\Listing',
			'template' => 'groups-directory',
		);

		$elements['groups-directory/Filters'] = array(
			'name'     => 'bpb-groups-directory-filters',
			'class'    => 'GroupsDirectory\Filters',
			'template' => 'groups-directory',
		);

		$elements['groups-directory/Navigation'] = array(
			'name'     => 'bpb-groups-directory-navigation',
			'class'    => 'GroupsDirectory\Navigation',
			'template' => 'groups-directory',
		);

		// Group profile

		$elements['profile-group/Name'] = array(
			'name'     => 'bpb-profile-group-name',
			'class'    => 'ProfileGroup\Name',
			'template' => 'group-profile',
		);

		$elements['profile-group/Avatar'] = array(
			'name'     => 'bpb-profile-group-avatar',
			'class'    => 'ProfileGroup\Avatar',
			'template' => 'group-profile',
		);

		$elements['profile-group/Buttons'] = array(
			'name'     => 'bpb-profile-group-buttons',
			'class'    => 'ProfileGroup\Buttons',
			'template' => 'group-profile',
		);

		$elements['profile-group/Cover'] = array(
			'name'     => 'bpb-profile-group-cover',
			'class'    => 'ProfileGroup\Cover',
			'template' => 'group-profile',
		);

		$elements['profile-group/Description'] = array(
			'name'     => 'bpb-profile-group-description',
			'class'    => 'ProfileGroup\Description',
			'template' => 'group-profile',
		);

		$elements['profile-group/Leadership'] = array(
			'name'     => 'bpb-profile-group-leadership',
			'class'    => 'ProfileGroup\Leadership',
			'template' => 'group-profile',
		);

		$elements['profile-group/LastActivity'] = array(
			'name'     => 'bpb-profile-group-last-activity',
			'class'    => 'ProfileGroup\LastActivity',
			'template' => 'group-profile',
		);

		$elements['profile-group/Navigation'] = array(
			'name'     => 'bpb-profile-group-navigation',
			'class'    => 'ProfileGroup\Navigation',
			'template' => 'group-profile',
		);

		$elements['profile-group/Status'] = array(
			'name'     => 'bpb-profile-group-status',
			'class'    => 'ProfileGroup\Status',
			'template' => 'group-profile',
		);

		$elements['profile-group/Content'] = array(
			'name'     => 'bpb-profile-group-content',
			'class'    => 'ProfileGroup\Content',
			'template' => 'group-profile',
		);

		// Members directory

		$elements['members-directory/Listing'] = array(
			'name'     => 'bpb-members-directory-list',
			'class'    => 'MembersDirectory\Listing',
			'template' => 'members-directory',
		);

		$elements['members-directory/Filters'] = array(
			'name'     => 'bpb-members-directory-filters',
			'class'    => 'MembersDirectory\Filters',
			'template' => 'members-directory',
		);

		$elements['members-directory/Navigation'] = array(
			'name'     => 'bpb-members-directory-navigation',
			'class'    => 'MembersDirectory\Navigation',
			'template' => 'members-directory',
		);

		// Member profile

		$elements['profile-member/Avatar'] = array(
			'name'     => 'bpb-profile-member-avatar',
			'class'    => 'ProfileMember\Avatar',
			'template' => 'member-profile',
		);

		$elements['profile-member/Cover'] = array(
			'name'     => 'bpb-profile-member-cover',
			'class'    => 'ProfileMember\Cover',
			'template' => 'member-profile',
		);

		$elements['profile-member/Buttons'] = array(
			'name'     => 'bpb-profile-member-buttons',
			'class'    => 'ProfileMember\Buttons',
			'template' => 'member-profile',
		);

		$elements['profile-member/Content'] = array(
			'name'     => 'bpb-profile-member-content',
			'class'    => 'ProfileMember\Content',
			'template' => 'member-profile',
		);

		$elements['profile-member/Meta'] = array(
			'name'     => 'bpb-profile-member-meta',
			'class'    => 'ProfileMember\Meta',
			'template' => 'member-profile',
		);

		$elements['profile-member/Username'] = array(
			'name'     => 'bpb-profile-member-username',
			'class'    => 'ProfileMember\Username',
			'template' => 'member-profile',
		);

		$elements['profile-member/Navigation'] = array(
			'name'     => 'bpb-profile-member-navigation',
			'class'    => 'ProfileMember\Navigation',
			'template' => 'member-profile',
		);

		$elements['profile-member/LastActivity'] = array(
			'name'     => 'bpb-profile-member-last-activity',
			'class'    => 'ProfileMember\LastActivity',
			'template' => 'member-profile',
		);

		// Sitewide activity

		$elements['sitewide-activity/Form'] = array(
			'name'     => 'bpb-sitewide-form',
			'class'    => 'Sitewide\Form',
			'template' => 'sitewide-activity',
		);

		$elements['sitewide-activity/Filters'] = array(
			'name'     => 'bpb-sitewide-filters',
			'class'    => 'Sitewide\Filters',
			'template' => 'sitewide-activity',
		);

		$elements['sitewide-activity/Content'] = array(
			'name'     => 'bpb-sitewide-content',
			'class'    => 'Sitewide\Content',
			'template' => 'sitewide-activity',
		);

		$elements['sitewide-activity/Navigation'] = array(
			'name'     => 'bpb-sitewide-navigation',
			'class'    => 'Sitewide\Navigation',
			'template' => 'sitewide-activity',
		);

		// General

		$elements['Buddypress/MembersGrid'] = array(
			'name'  => 'wbcom-members-grid',
			'class' => 'Buddypress\MembersGrid',
		);

		$elements['general/GroupsListing'] = array(
			'name'  => 'bpb-general-groups-list',
			'class' => 'General\GroupsListing',
		);

		$elements['general/ActivityListing'] = array(
			'name'  => 'bpb-general-activity-list',
			'class' => 'General\ActivityListing',
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
		$min = '.min';

		if ( defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ) {
			$min = '';
		}

		wp_register_style(
			'stax-buddy-builder-bp',
			BPB_BASE_URL . 'templates/buddypress/css/buddypress' . $min . '.css',
			array(),
			BPB_VERSION
		);
		wp_register_script(
			'bpb-grid-list-view',
			BPB_ASSETS_URL . 'js/grid-list-view.js',
			BPB_VERSION,
			true
		);
	}

}

return Plugin::get_instance();
