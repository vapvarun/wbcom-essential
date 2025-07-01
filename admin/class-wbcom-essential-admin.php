<?php
/**
 * Enhanced admin-specific functionality supporting embeddable URLs
 *
 * @link       http://wbcomdesigns.com
 * @since      1.4.5
 *
 * @package    WBCOM_ESSENTIAL
 * @subpackage WBCOM_ESSENTIAL/admin
 */
namespace WBCOM_ESSENTIAL;
/**
 * Enhanced admin-specific functionality of the plugin.
 *
 * Now supports validation for embeddable URLs from Google Docs, Sheets, 
 * OneDrive, Dropbox, and traditional file formats with improved URL preservation.
 *
 * @package    WBCOM_ESSENTIAL
 * @subpackage WBCOM_ESSENTIAL/admin
 * @author     Wbcom Designs <admin@wbcomdesigns.com>
 */
class Wbcom_Essential_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;
	
	/**
	 * Plugin settings tabs
	 *
	 * @since    1.0.0
	 * @access   public
	 * @var      array    $plugin_settings_tabs The settings tab.
	 */
	public $plugin_settings_tabs;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param    string $plugin_name The name of this plugin.
	 * @param    string $version     The version of this plugin.
	 */
	public function __construct() {
		$this->plugin_name = 'wbcom-essential';
		$this->version     = '3.9.5';

		add_action( 'admin_init', array($this, 'woo_document_preview_init_plugin_settings' ) );
		add_action( 'admin_menu', array($this, 'woo_document_preview_views_add_admin_settings' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' )  );		
		add_action( 'admin_init', array( $this, 'wbcom_hide_all_admin_notices_from_setting_page' ) );
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		
		wp_enqueue_style( 
			$this->plugin_name, 
			plugin_dir_url( __FILE__ ) . 'css/wbcom-essential-admin.css', 
			array(), 
			$this->version, 
			'all' 
		);
		
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		wp_enqueue_script( 
			$this->plugin_name, 
			plugin_dir_url( __FILE__ ) . 'js/wbcom-essential-admin.js', 
			array( 'jquery', 'media-upload' ), 
			$this->version, 
			false 
		);

	}


	/**
	 * Hide all admin notices from setting page
	 *
	 * @since    1.0.0
	 * @return   void
	 */
	public function wbcom_hide_all_admin_notices_from_setting_page() {
		$wbcom_pages_array  = array( 'wbcomplugins', 'wbcom-plugins-page', 'wbcom-support-page', 'wbcom-essential-settings' );
		$wbcom_setting_page = filter_input( INPUT_GET, 'page' ) ? filter_input( INPUT_GET, 'page' ) : '';

		if ( in_array( $wbcom_setting_page, $wbcom_pages_array, true ) ) {
			remove_all_actions( 'admin_notices' );
			remove_all_actions( 'all_admin_notices' );
		}
	}

	/**
	 * Actions performed to create a submenu page content.
	 *
	 * @since    1.0.0
	 * @access   public
	 */
	public function bp_profile_views_admin_options_page() {
		$tab = filter_input( INPUT_GET, 'tab' ) ? filter_input( INPUT_GET, 'tab' ) : 'wbcom-essential-welcome';
		?>
		<div class="wrap">
			<div class="wbcom-bb-plugins-offer-wrapper">
				<div id="wb_admin_logo"></div>
			</div>
			<div class="wbcom-wrap">
				<div class="bupr-header">
					<div class="wbcom_admin_header-wrapper">
						<div id="wb_admin_plugin_name">
							<?php esc_html_e( 'Wbcom Essential', 'wbcom-essential' ); ?>
							<span><?php printf( __( 'Version %s', 'wbcom-essential' ), '3.9.5' ); ?></span>
						</div>
						<?php echo do_shortcode( '[wbcom_admin_setting_header]' ); ?>
					</div>
				</div>
				<div class="wbcom-admin-settings-page">
					<?php
					settings_errors();
					$this->woo_document_preview_plugin_settings_tabs();
					settings_fields( $tab );
					do_settings_sections( $tab );
					?>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Actions performed on loading plugin settings
	 *
	 * @since    1.0.9
	 * @access   public
	 * @author   Wbcom Designs
	 */
	public function woo_document_preview_init_plugin_settings() {
        
		$this->plugin_settings_tabs['wbcom-essential-welcome'] = esc_html__( 'Welcome', 'wbcom-essential' );
		add_settings_section( 'wbcom-essential-welcome', ' ', array( $this, 'woo_document_preview_admin_welcome_content' ), 'wbcom-essential-welcome' );

		$this->plugin_settings_tabs['woo-document-preview-faq'] = esc_html__( 'FAQ', 'wbcom-essential' );
		add_settings_section( 'woo-document-preview-faq', ' ', array( $this, 'woo_document_preview_general_options_content' ), 'woo-document-preview-faq' );
	}

	/**
	 * Actions performed to create tabs on the sub menu page.
	 *
	 * @since    1.0.0
	 */
	public function woo_document_preview_plugin_settings_tabs() {
		
		$current_tab = filter_input( INPUT_GET, 'tab' ) ? filter_input( INPUT_GET, 'tab' ) : 'wbcom-essential-welcome';
		echo '<div class="wbcom-tabs-section"><div class="nav-tab-wrapper"><div class="wb-responsive-menu"><span>' . esc_html( 'Menu' ) . '</span><input class="wb-toggle-btn" type="checkbox" id="wb-toggle-btn"><label class="wb-toggle-icon" for="wb-toggle-btn"><span class="wb-icon-bars"></span></label></div><ul>';
		foreach ( $this->plugin_settings_tabs as $tab_key => $tab_caption ) {
			$active = $current_tab === $tab_key ? 'nav-tab-active' : '';
			echo '<li><a class="nav-tab ' . esc_attr( $active ) . '" id="' . esc_attr( $tab_key ) . '-tab" href="?page=wbcom-essential-settings&tab=' . esc_attr( $tab_key ) . '">' . esc_attr( $tab_caption ) . '</a></li>';
		}
		echo '</div></ul></div>';
	}

	/**
	 * Wbcom Essential admin welcome tab content.
	 *
	 * @since    1.0.0
	 * @return   void
	 */
	public function woo_document_preview_admin_welcome_content() {
		include plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/wbcom-essential-welcome-page.php';
	}

	/**
	 * Wbcom Essential admin faq tab content.
	 *
	 * @since    1.0.0
	 * @return   void
	 */
	public function woo_document_preview_general_options_content() {
		include plugin_dir_path( dirname( __FILE__ ) ) . 'admin/partials/wbcom-essential-faq-content.php';
	}


	/**
	 * Actions performed on loading admin_menu.
	 *
	 * @since    1.0.0
	 * @access   public
	 * @author   Wbcom Designs
	 */
	public function woo_document_preview_views_add_admin_settings() {
		if ( empty( $GLOBALS['admin_page_hooks']['wbcomplugins'] ) && class_exists( 'WooCommerce' ) ) {
			add_menu_page( 
				esc_html__( 'WB Plugins', 'wbcom-essential' ), 
				esc_html__( 'WB Plugins', 'wbcom-essential' ), 
				'manage_options', 
				'wbcomplugins', 
				array( $this, 'bp_profile_views_admin_options_page' ), 
				'dashicons-lightbulb', 
				59 
			);
			add_submenu_page( 
				'wbcomplugins', 
				esc_html__( 'Welcome', 'wbcom-essential' ), 
				esc_html__( 'Welcome', 'wbcom-essential' ), 
				'manage_options', 
				'wbcomplugins' 
			);
		}
		add_submenu_page( 
			'wbcomplugins', 
			esc_html__( 'Wbcom Essential', 'wbcom-essential' ), 
			esc_html__( 'Wbcom Essential', 'wbcom-essential' ), 
			'manage_options', 
			'wbcom-essential-settings', 
			array( $this, 'bp_profile_views_admin_options_page' ) 
		);
	}

}