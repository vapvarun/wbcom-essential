<?php

/**
 * Widget showcase functionality
 *
 * @package    WBCOM_ESSENTIAL
 * @subpackage WBCOM_ESSENTIAL/admin
 */

namespace WBCOM_ESSENTIAL;

/**
 * Widget showcase class to display available widgets
 */
class Wbcom_Essential_Widget_Showcase
{

	/**
	 * License manager instance
	 */
	private $license_manager;

	/**
	 * Initialize the class
	 */
	public function __construct()
	{
		// Check if we should use the WBcom wrapper
		if (! $this->should_use_wrapper()) {
			add_action('admin_menu', [$this, 'add_widget_showcase_menu']);
		}
		add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_styles']);

		// Initialize license components after WordPress is loaded
		add_action('init', [$this, 'init_license_components']);

		// Register with the advanced shared system
		add_action('admin_init', [$this, 'register_with_shared_system']);
	}

	/**
	 * Check if we should use the WBcom wrapper
	 */
	private function should_use_wrapper()
	{

		// Check if WBcom shared system is already available
		if (class_exists('Wbcom_Shared_Loader')) {
			return true;
		}

		// Try to load our own shared system
		$shared_loader_file = WBCOM_ESSENTIAL_PATH . '/includes/shared-admin/class-wbcom-shared-loader.php';
		if (file_exists($shared_loader_file)) {
			require_once $shared_loader_file;
			if (class_exists('Wbcom_Shared_Loader')) {
				// We can use the wrapper - the shared system will be initialized
				return true;
			}
		}

		// Check if another WBcom plugin has a shared system available
		if (function_exists('wbcom_integrate_plugin')) {
			return true;
		}

		// No wrapper available - we'll create our own standalone menu
		return false;
	}

	/**
	 * Register with the advanced shared system if available
	 */
	public function register_with_shared_system()
	{
		// Try to load our shared system if not already loaded
		if (! class_exists('Wbcom_Shared_Loader')) {
			$shared_loader_file = WBCOM_ESSENTIAL_PATH . '/includes/shared-admin/class-wbcom-shared-loader.php';
			if (file_exists($shared_loader_file)) {
				require_once $shared_loader_file;
			}
		}

		// If we still don't have the class, we're in standalone mode
		if (! class_exists('Wbcom_Shared_Loader')) {
			return;
		}

		// The main plugin class will handle registration
		// This is just a placeholder for any additional registration logic
	}

	/**
	 * Initialize license components
	 */
	public function init_license_components()
	{
		// Use the original license manager that works with the existing UI
		$license_manager_file = WBCOM_ESSENTIAL_PATH . '/license/class-wbcom-essential-license-manager.php';

		if (file_exists($license_manager_file)) {
			require_once $license_manager_file;

			if (class_exists('WBCOM_ESSENTIAL_License_Manager')) {
				$this->license_manager = \WBCOM_ESSENTIAL_License_Manager::get_instance();
			}
		}

		// Initialize license updater if needed
		$license_updater_file = WBCOM_ESSENTIAL_PATH . '/license/class-wbcom-essential-license-updater.php';
		if (file_exists($license_updater_file)) {
			require_once $license_updater_file;

			if (class_exists('WBCOM_ESSENTIAL_License_Updater')) {
				\WBCOM_ESSENTIAL_License_Updater::get_instance();
			}
		}
	}

	/**
	 * Static method to render admin page (for wrapper callback)
	 */
	public static function render_admin_page()
	{
		$instance = new self();
		// Initialize license components immediately for static calls
		$instance->init_license_components();
		$instance->render_widget_showcase_page();
	}

	/**
	 * Add widget showcase menu (standalone mode when no WBcom wrapper is available)
	 */
	public function add_widget_showcase_menu()
	{
		// Create a WBcom Designs menu that matches the shared system
		add_menu_page(
			esc_html__('WBcom Designs', 'wbcom-essential'),
			esc_html__('WBcom Designs', 'wbcom-essential'),
			'manage_options',
			'wbcom-designs',
			[$this, 'render_wbcom_dashboard'],
			$this->get_wbcom_menu_icon(),
			58.5
		);

		// Add Essential Widgets as a submenu
		add_submenu_page(
			'wbcom-designs',
			esc_html__('Essential Widgets', 'wbcom-essential'),
			esc_html__('Essential Widgets', 'wbcom-essential'),
			'manage_options',
			'wbcom-essential',
			[$this, 'render_widget_showcase_page']
		);
	}

	/**
	 * Get WBcom menu icon (matches the shared system)
	 */
	private function get_wbcom_menu_icon()
	{
		$svg = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path d="M10 2L13.09 8.26L20 9L14 12L15 20L10 17L5 20L6 12L0 9L6.91 8.26L10 2Z" fill="#a7aaad"/>
		</svg>';

		return 'data:image/svg+xml;base64,' . base64_encode($svg);
	}

	/**
	 * Render WBcom dashboard for standalone mode
	 */
	public function render_wbcom_dashboard()
	{
		// If we have the shared dashboard class available, use it
		if (class_exists('Wbcom_Shared_Dashboard')) {
			$plugins = array(
				'wbcom-essential' => array(
					'name' => 'WBcom Essential',
					'version' => WBCOM_ESSENTIAL_VERSION,
					'description' => '30+ Gutenberg blocks and 43+ Elementor widgets for BuddyPress, WooCommerce, and general websites.',
					'status' => 'active',
					'settings_url' => admin_url('admin.php?page=wbcom-essential'),
					'icon' => 'dashicons-screenoptions'
				)
			);
			$dashboard = new Wbcom_Shared_Dashboard($plugins);
			$dashboard->render_dashboard();
		} else {
			// Fallback to simple dashboard
			$this->render_simple_dashboard();
		}
	}

	/**
	 * Render simple dashboard fallback
	 */
	private function render_simple_dashboard()
	{
?>
		<div class="wrap">
			<h1>
				🌟 WBcom Designs
				<span class="wbcom-version">v<?php echo esc_html(WBCOM_ESSENTIAL_VERSION); ?></span>
			</h1>

			<div class="notice notice-info">
				<p><strong>Welcome to WBcom Essential!</strong> Unlock the full potential of your website with 30+ Gutenberg blocks and 43+ Elementor widgets. Blocks work out of the box — no Elementor required!</p>
			</div>

			<div class="card">
				<h2>Installed WBcom Plugins</h2>
				<ul>
					<li>
						<strong>WBcom Essential</strong> (v<?php echo esc_html(WBCOM_ESSENTIAL_VERSION); ?>)
						- <a href="<?php echo esc_url(admin_url('admin.php?page=wbcom-essential')); ?>">Essential Widgets</a>
					</li>
				</ul>
			</div>

			<div class="card">
				<h2>Quick Links</h2>
				<p>
					<a href="https://wbcomdesigns.com/support/" target="_blank" class="button button-secondary">Get Support</a>
					<a href="https://wbcomdesigns.com/plugins/" target="_blank" class="button button-secondary">Browse Premium Plugins</a>
					<a href="https://docs.wbcomdesigns.com/" target="_blank" class="button button-secondary">Documentation</a>
				</p>
			</div>
		</div>

		<style>
			.wbcom-version {
				font-size: 14px;
				font-weight: normal;
				color: #666;
				background: #f0f0f1;
				padding: 2px 8px;
				border-radius: 12px;
				margin-left: auto;
			}

			.card {
				background: #fff;
				border: 1px solid #c3c4c7;
				padding: 20px;
				margin: 20px 0;
				border-radius: 4px;
			}

			.card h2 {
				margin-top: 0;
			}
		</style>
	<?php
	}

	/**
	 * Enqueue admin styles
	 */
	public function enqueue_admin_styles($hook)
	{
		// Check for both possible hooks (with and without wrapper)
		$allowed_hooks = [
			'toplevel_page_wbcom-designs',     // Standalone dashboard
			'toplevel_page_wbcom-widgets',      // Legacy standalone menu
			'wbcom-designs_page_wbcom-essential', // Shared wrapper submenu
			'admin_page_wbcom-essential',       // Other wrapper scenarios
		];

		// Also check if we're on our page by checking the page parameter
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- This is for checking current page only
		$current_page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : '';

		if (! in_array($hook, $allowed_hooks) && $current_page !== 'wbcom-essential') {
			return;
		}

		// Load basic widget showcase styles first
		wp_enqueue_style(
			'wbcom-widget-showcase',
			plugin_dir_url(__FILE__) . 'css/widget-showcase.css',
			[],
			'1.0.0'
		);

		// Load modern shared tab styles
		wp_enqueue_style(
			'wbcom-shared-tabs',
			WBCOM_ESSENTIAL_URL . 'includes/shared-admin/wbcom-shared-tabs.css',
			[],
			WBCOM_ESSENTIAL_VERSION
		);

		// Load plugin-specific admin styles for the WBcom Essential page
		wp_enqueue_style(
			'wbcom-essential-admin',
			WBCOM_ESSENTIAL_URL . 'includes/shared-admin/wbcom-shared-admin.css',
			['wbcom-widget-showcase'],
			WBCOM_ESSENTIAL_VERSION
		);

		// Load plugin-specific admin scripts
		wp_enqueue_script(
			'wbcom-essential-admin',
			WBCOM_ESSENTIAL_URL . 'includes/shared-admin/wbcom-shared-admin.js',
			['jquery'],
			WBCOM_ESSENTIAL_VERSION,
			true
		);

		// Localize the script
		wp_localize_script(
			'wbcom-essential-admin',
			'wbcomShared',
			[
				'version'     => WBCOM_ESSENTIAL_VERSION,
				'ajaxUrl'     => admin_url('admin-ajax.php'),
				'nonce'       => wp_create_nonce('wbcom_essential_nonce'),
				'pluginCount' => 1,
				'currentPage' => 'wbcom-essential',
				'strings'     => [
					'loading' => esc_html__('Loading...', 'wbcom-essential'),
					'error'   => esc_html__('Error loading content.', 'wbcom-essential'),
					'success' => esc_html__('Settings saved successfully.', 'wbcom-essential'),
				],
			]
		);

		// Note: License-specific assets are now handled by the WBcom_License_Base class
		// This reduces duplication and ensures consistent license functionality

		// Also enqueue license-specific assets if we're on the license tab
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- This is for tab checking only
		if (isset($_GET['tab']) && sanitize_text_field(wp_unslash($_GET['tab'])) === 'license') {
			// Enqueue the license JS from license folder
			wp_enqueue_script(
				'wbcom-essential-license',
				WBCOM_ESSENTIAL_URL . 'license/license.js',
				['jquery'],
				WBCOM_ESSENTIAL_VERSION,
				true
			);

			// Localize script for AJAX
			wp_localize_script(
				'wbcom-essential-license',
				'wbcomEssentialLicense',
				[
					'ajax_url' => admin_url('admin-ajax.php'),
					'nonce'    => wp_create_nonce('wbcom_essential_license_nonce'),
					'strings'  => [
						'activating'   => esc_html__('Activating...', 'wbcom-essential'),
						'deactivating' => esc_html__('Deactivating...', 'wbcom-essential'),
						'checking'     => esc_html__('Checking...', 'wbcom-essential'),
					],
				]
			);
		}
	}

	/**
	 * Get all available Gutenberg blocks
	 */
	private function get_blocks_list()
	{
		return [
			'general' => [
				'title' => esc_html__('General Blocks', 'wbcom-essential'),
				'description' => esc_html__('Versatile blocks for various content types - works without Elementor!', 'wbcom-essential'),
				'icon' => 'dashicons-block-default',
				'blocks' => [
					['name' => esc_html__('Accordion', 'wbcom-essential'), 'description' => esc_html__('Collapsible FAQ sections with smooth animations', 'wbcom-essential'), 'icon' => 'dashicons-editor-justify'],
					['name' => esc_html__('Advanced Tabs', 'wbcom-essential'), 'description' => esc_html__('Tabbed content with multiple styles', 'wbcom-essential'), 'icon' => 'dashicons-category'],
					['name' => esc_html__('Branding', 'wbcom-essential'), 'description' => esc_html__('Display logo with customizable options', 'wbcom-essential'), 'icon' => 'dashicons-tag'],
					['name' => esc_html__('Countdown', 'wbcom-essential'), 'description' => esc_html__('Timer for events and launches', 'wbcom-essential'), 'icon' => 'dashicons-clock'],
					['name' => esc_html__('Dropdown Button', 'wbcom-essential'), 'description' => esc_html__('Interactive dropdown menu button', 'wbcom-essential'), 'icon' => 'dashicons-arrow-down-alt2'],
					['name' => esc_html__('Flip Box', 'wbcom-essential'), 'description' => esc_html__('Interactive flip animation boxes', 'wbcom-essential'), 'icon' => 'dashicons-image-flip-horizontal'],
					['name' => esc_html__('Heading', 'wbcom-essential'), 'description' => esc_html__('Stylized heading elements', 'wbcom-essential'), 'icon' => 'dashicons-heading'],
					['name' => esc_html__('Login Form', 'wbcom-essential'), 'description' => esc_html__('Customizable user login form', 'wbcom-essential'), 'icon' => 'dashicons-lock'],
					['name' => esc_html__('Post Carousel', 'wbcom-essential'), 'description' => esc_html__('Display posts in carousel format', 'wbcom-essential'), 'icon' => 'dashicons-admin-post'],
					['name' => esc_html__('Pricing Table', 'wbcom-essential'), 'description' => esc_html__('Product/service pricing displays', 'wbcom-essential'), 'icon' => 'dashicons-cart'],
					['name' => esc_html__('Progress Bar', 'wbcom-essential'), 'description' => esc_html__('Animated progress indicators', 'wbcom-essential'), 'icon' => 'dashicons-chart-bar'],
					['name' => esc_html__('Slider', 'wbcom-essential'), 'description' => esc_html__('General purpose content slider', 'wbcom-essential'), 'icon' => 'dashicons-images-alt'],
					['name' => esc_html__('Smart Menu', 'wbcom-essential'), 'description' => esc_html__('Advanced navigation menu', 'wbcom-essential'), 'icon' => 'dashicons-menu-alt3'],
					['name' => esc_html__('Team Carousel', 'wbcom-essential'), 'description' => esc_html__('Showcase team members in carousel', 'wbcom-essential'), 'icon' => 'dashicons-businessman'],
					['name' => esc_html__('Testimonial', 'wbcom-essential'), 'description' => esc_html__('Client testimonial displays', 'wbcom-essential'), 'icon' => 'dashicons-format-quote'],
					['name' => esc_html__('Testimonial Carousel', 'wbcom-essential'), 'description' => esc_html__('Rotating testimonials showcase', 'wbcom-essential'), 'icon' => 'dashicons-testimonial'],
					['name' => esc_html__('Timeline', 'wbcom-essential'), 'description' => esc_html__('Visual timeline displays', 'wbcom-essential'), 'icon' => 'dashicons-calendar-alt'],
					['name' => esc_html__('Text Rotator', 'wbcom-essential'), 'description' => esc_html__('Animated rotating text', 'wbcom-essential'), 'icon' => 'dashicons-update-alt'],
					['name' => esc_html__('Notification Area', 'wbcom-essential'), 'description' => esc_html__('Header notifications display', 'wbcom-essential'), 'icon' => 'dashicons-bell'],
					['name' => esc_html__('Shape', 'wbcom-essential'), 'description' => esc_html__('Decorative shape elements', 'wbcom-essential'), 'icon' => 'dashicons-marker'],
					['name' => esc_html__('Site Logo', 'wbcom-essential'), 'description' => esc_html__('Display site logo with options', 'wbcom-essential'), 'icon' => 'dashicons-wordpress'],
				]
			],
			'buddypress' => [
				'title' => esc_html__('BuddyPress Blocks', 'wbcom-essential'),
				'description' => esc_html__('Social community blocks for BuddyPress (requires BuddyPress)', 'wbcom-essential'),
				'icon' => 'dashicons-groups',
				'blocks' => [
					['name' => esc_html__('Dashboard Intro', 'wbcom-essential'), 'description' => esc_html__('Welcome message for dashboards', 'wbcom-essential'), 'icon' => 'dashicons-dashboard'],
					['name' => esc_html__('Forums', 'wbcom-essential'), 'description' => esc_html__('Display forum topics', 'wbcom-essential'), 'icon' => 'dashicons-format-chat'],
					['name' => esc_html__('Forums Activity', 'wbcom-essential'), 'description' => esc_html__('Recent forum activity', 'wbcom-essential'), 'icon' => 'dashicons-update'],
					['name' => esc_html__('Group Carousel', 'wbcom-essential'), 'description' => esc_html__('Groups in rotating carousel', 'wbcom-essential'), 'icon' => 'dashicons-images-alt2'],
					['name' => esc_html__('Members Lists', 'wbcom-essential'), 'description' => esc_html__('Display community members', 'wbcom-essential'), 'icon' => 'dashicons-id'],
					['name' => esc_html__('Groups Lists', 'wbcom-essential'), 'description' => esc_html__('Display community groups', 'wbcom-essential'), 'icon' => 'dashicons-list-view'],
					['name' => esc_html__('Profile Completion', 'wbcom-essential'), 'description' => esc_html__('Profile completeness indicator', 'wbcom-essential'), 'icon' => 'dashicons-chart-pie'],
				]
			],
		];
	}

	/**
	 * Get all available widgets organized by category
	 */
	private function get_widgets_list()
	{
		return [
			'buddypress' => [
				'title' => esc_html__('BuddyPress Widgets', 'wbcom-essential'),
				'description' => esc_html__('Social community widgets for BuddyPress integration', 'wbcom-essential'),
				'icon' => 'dashicons-groups',
				'widgets' => [
					[
						'name' => esc_html__('Dashboard Intro', 'wbcom-essential'),
						'description' => esc_html__('Welcome message and introduction for user dashboards', 'wbcom-essential'),
						'icon' => 'dashicons-dashboard'
					],
					[
						'name' => esc_html__('Forums', 'wbcom-essential'),
						'description' => esc_html__('Display forum topics and discussions', 'wbcom-essential'),
						'icon' => 'dashicons-format-chat'
					],
					[
						'name' => esc_html__('Forums Activity', 'wbcom-essential'),
						'description' => esc_html__('Show recent forum activity and updates', 'wbcom-essential'),
						'icon' => 'dashicons-update'
					],
					[
						'name' => esc_html__('Group Carousel', 'wbcom-essential'),
						'description' => esc_html__('Showcase groups in a rotating carousel', 'wbcom-essential'),
						'icon' => 'dashicons-images-alt2'
					],
					[
						'name' => esc_html__('Groups Grid', 'wbcom-essential'),
						'description' => esc_html__('Display groups in a responsive grid layout', 'wbcom-essential'),
						'icon' => 'dashicons-grid-view'
					],
					[
						'name' => esc_html__('Groups Lists', 'wbcom-essential'),
						'description' => esc_html__('Show groups in customizable list formats', 'wbcom-essential'),
						'icon' => 'dashicons-list-view'
					],
					[
						'name' => esc_html__('Header Bar', 'wbcom-essential'),
						'description' => esc_html__('User profile header with navigation options', 'wbcom-essential'),
						'icon' => 'dashicons-menu'
					],
					[
						'name' => esc_html__('Members Grid', 'wbcom-essential'),
						'description' => esc_html__('Display community members in grid layout', 'wbcom-essential'),
						'icon' => 'dashicons-admin-users'
					],
					[
						'name' => esc_html__('Members Lists', 'wbcom-essential'),
						'description' => esc_html__('Show members in various list styles', 'wbcom-essential'),
						'icon' => 'dashicons-id'
					],
					[
						'name' => esc_html__('Members Carousel', 'wbcom-essential'),
						'description' => esc_html__('Feature members in a sliding carousel', 'wbcom-essential'),
						'icon' => 'dashicons-slides'
					],
					[
						'name' => esc_html__('Profile Completion', 'wbcom-essential'),
						'description' => esc_html__('Progress indicator for profile completeness', 'wbcom-essential'),
						'icon' => 'dashicons-chart-pie'
					]
				]
			],
			'general' => [
				'title' => esc_html__('General Widgets', 'wbcom-essential'),
				'description' => esc_html__('Versatile widgets for various content types', 'wbcom-essential'),
				'icon' => 'dashicons-admin-generic',
				'widgets' => [
					[
						'name' => esc_html__('Accordion', 'wbcom-essential'),
						'description' => esc_html__('Collapsible content sections', 'wbcom-essential'),
						'icon' => 'dashicons-editor-justify'
					],
					[
						'name' => esc_html__('Branding', 'wbcom-essential'),
						'description' => esc_html__('Display your brand logo and information', 'wbcom-essential'),
						'icon' => 'dashicons-tag'
					],
					[
						'name' => esc_html__('Countdown', 'wbcom-essential'),
						'description' => esc_html__('Timer for events and launches', 'wbcom-essential'),
						'icon' => 'dashicons-clock'
					],
					[
						'name' => esc_html__('Dropdown Button', 'wbcom-essential'),
						'description' => esc_html__('Interactive dropdown menu button', 'wbcom-essential'),
						'icon' => 'dashicons-arrow-down-alt2'
					],
					[
						'name' => esc_html__('Flip Box', 'wbcom-essential'),
						'description' => esc_html__('Interactive flip animation boxes', 'wbcom-essential'),
						'icon' => 'dashicons-image-flip-horizontal'
					],
					[
						'name' => esc_html__('Heading', 'wbcom-essential'),
						'description' => esc_html__('Stylized heading elements', 'wbcom-essential'),
						'icon' => 'dashicons-heading'
					],
					[
						'name' => esc_html__('Login Form', 'wbcom-essential'),
						'description' => esc_html__('Customizable user login form', 'wbcom-essential'),
						'icon' => 'dashicons-lock'
					],
					[
						'name' => esc_html__('Notification Area', 'wbcom-essential'),
						'description' => esc_html__('Header notifications display', 'wbcom-essential'),
						'icon' => 'dashicons-bell'
					],
					[
						'name' => esc_html__('Portfolio Grid', 'wbcom-essential'),
						'description' => esc_html__('Showcase portfolio items in grid', 'wbcom-essential'),
						'icon' => 'dashicons-portfolio'
					],
					[
						'name' => esc_html__('Post Carousel', 'wbcom-essential'),
						'description' => esc_html__('Display posts in carousel format', 'wbcom-essential'),
						'icon' => 'dashicons-admin-post'
					],
					[
						'name' => esc_html__('Post Slider', 'wbcom-essential'),
						'description' => esc_html__('Featured posts slider', 'wbcom-essential'),
						'icon' => 'dashicons-media-interactive'
					],
					[
						'name' => esc_html__('Post Timeline', 'wbcom-essential'),
						'description' => esc_html__('Posts in chronological timeline', 'wbcom-essential'),
						'icon' => 'dashicons-backup'
					],
					[
						'name' => esc_html__('Posts Revolution', 'wbcom-essential'),
						'description' => esc_html__('Advanced posts display widget', 'wbcom-essential'),
						'icon' => 'dashicons-admin-page'
					],
					[
						'name' => esc_html__('Posts Ticker', 'wbcom-essential'),
						'description' => esc_html__('Scrolling news ticker for posts', 'wbcom-essential'),
						'icon' => 'dashicons-megaphone'
					],
					[
						'name' => esc_html__('Pricing Table', 'wbcom-essential'),
						'description' => esc_html__('Product/service pricing displays', 'wbcom-essential'),
						'icon' => 'dashicons-cart'
					],
					[
						'name' => esc_html__('Progress Bar', 'wbcom-essential'),
						'description' => esc_html__('Visual progress indicators', 'wbcom-essential'),
						'icon' => 'dashicons-chart-bar'
					],
					[
						'name' => esc_html__('Shape', 'wbcom-essential'),
						'description' => esc_html__('Decorative shape elements', 'wbcom-essential'),
						'icon' => 'dashicons-marker'
					],
					[
						'name' => esc_html__('Site Logo', 'wbcom-essential'),
						'description' => esc_html__('Display site logo with options', 'wbcom-essential'),
						'icon' => 'dashicons-wordpress'
					],
					[
						'name' => esc_html__('Slider', 'wbcom-essential'),
						'description' => esc_html__('General purpose content slider', 'wbcom-essential'),
						'icon' => 'dashicons-images-alt'
					],
					[
						'name' => esc_html__('Smart Menu', 'wbcom-essential'),
						'description' => esc_html__('Advanced navigation menu', 'wbcom-essential'),
						'icon' => 'dashicons-menu-alt3'
					],
					[
						'name' => esc_html__('Tabs', 'wbcom-essential'),
						'description' => esc_html__('Tabbed content sections', 'wbcom-essential'),
						'icon' => 'dashicons-category'
					],
					[
						'name' => esc_html__('Team Carousel', 'wbcom-essential'),
						'description' => esc_html__('Showcase team members', 'wbcom-essential'),
						'icon' => 'dashicons-businessman'
					],
					[
						'name' => esc_html__('Testimonial', 'wbcom-essential'),
						'description' => esc_html__('Client testimonial displays', 'wbcom-essential'),
						'icon' => 'dashicons-format-quote'
					],
					[
						'name' => esc_html__('Testimonial Carousel', 'wbcom-essential'),
						'description' => esc_html__('Rotating testimonials showcase', 'wbcom-essential'),
						'icon' => 'dashicons-testimonial'
					],
					[
						'name' => esc_html__('Text Rotator', 'wbcom-essential'),
						'description' => esc_html__('Animated rotating text', 'wbcom-essential'),
						'icon' => 'dashicons-update-alt'
					],
					[
						'name' => esc_html__('Timeline', 'wbcom-essential'),
						'description' => esc_html__('Visual timeline displays', 'wbcom-essential'),
						'icon' => 'dashicons-calendar-alt'
					]
				]
			],
			'woocommerce' => [
				'title' => esc_html__('WooCommerce Widgets', 'wbcom-essential'),
				'description' => esc_html__('E-commerce widgets for WooCommerce stores', 'wbcom-essential'),
				'icon' => 'dashicons-store',
				'widgets' => [
					[
						'name' => esc_html__('Add Banner', 'wbcom-essential'),
						'description' => esc_html__('Promotional banners for products', 'wbcom-essential'),
						'icon' => 'dashicons-megaphone'
					],
					[
						'name' => esc_html__('Customer Review', 'wbcom-essential'),
						'description' => esc_html__('Display customer reviews', 'wbcom-essential'),
						'icon' => 'dashicons-star-filled'
					],
					[
						'name' => esc_html__('Product Tab', 'wbcom-essential'),
						'description' => esc_html__('Tabbed product information', 'wbcom-essential'),
						'icon' => 'dashicons-products'
					],
					[
						'name' => esc_html__('Universal Product', 'wbcom-essential'),
						'description' => esc_html__('Flexible product display widget', 'wbcom-essential'),
						'icon' => 'dashicons-archive'
					],
					[
						'name' => esc_html__('WooCommerce Testimonial', 'wbcom-essential'),
						'description' => esc_html__('Product testimonials display', 'wbcom-essential'),
						'icon' => 'dashicons-thumbs-up'
					]
				]
			]
		];
	}

	/**
	 * Render the widget showcase page
	 */
	public function render_widget_showcase_page()
	{
		$widgets = $this->get_widgets_list();
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- This is for tab display only
		$current_tab = isset($_GET['tab']) ? sanitize_text_field(wp_unslash($_GET['tab'])) : 'widgets';
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- This is for page display only
		$current_page = isset($_GET['page']) ? sanitize_text_field(wp_unslash($_GET['page'])) : 'wbcom-essential';
	?>
		<div class="wrap wbcom-essential-admin">
			<h1>
				<span class="dashicons dashicons-screenoptions" style="margin-right: 10px; color: #0073aa;"></span>
				<?php esc_html_e('WBcom Essential', 'wbcom-essential'); ?>
			</h1>

			<div class="wbcom-tab-wrapper">
				<nav class="wbcom-nav-tab-wrapper nav-tab-wrapper" role="tablist">
					<a href="?page=<?php echo esc_attr($current_page); ?>&tab=widgets"
						class="wbcom-nav-tab nav-tab <?php echo $current_tab === 'widgets' ? 'nav-tab-active' : ''; ?>"
						role="tab"
						aria-selected="<?php echo $current_tab === 'widgets' ? 'true' : 'false'; ?>">
						<span class="dashicons dashicons-screenoptions"></span>
						<?php esc_html_e('Widgets', 'wbcom-essential'); ?>
					</a>
					<a href="?page=<?php echo esc_attr($current_page); ?>&tab=license"
						class="wbcom-nav-tab nav-tab <?php echo $current_tab === 'license' ? 'nav-tab-active' : ''; ?>"
						role="tab"
						aria-selected="<?php echo $current_tab === 'license' ? 'true' : 'false'; ?>">
						<span class="dashicons dashicons-admin-network"></span>
						<?php esc_html_e('License', 'wbcom-essential'); ?>
					</a>
					<a href="?page=<?php echo esc_attr($current_page); ?>&tab=faq"
						class="wbcom-nav-tab nav-tab <?php echo $current_tab === 'faq' ? 'nav-tab-active' : ''; ?>"
						role="tab"
						aria-selected="<?php echo $current_tab === 'faq' ? 'true' : 'false'; ?>">
						<span class="dashicons dashicons-editor-help"></span>
						<?php esc_html_e('FAQ', 'wbcom-essential'); ?>
					</a>
				</nav>

				<div class="wbcom-tab-content tab-content" role="tabpanel">
					<?php
					switch ($current_tab) {
						case 'license':
							$this->render_license_tab();
							break;
						case 'faq':
							$this->render_faq_tab();
							break;
						case 'widgets':
						default:
							$this->render_widgets_tab($widgets);
							break;
					}
					?>
				</div><!-- .wbcom-tab-content -->
			</div><!-- .wbcom-tab-wrapper -->
		</div>

		<style>
			.wbcom-essential-admin .nav-tab-wrapper {
				margin: 0;
				padding: 0;
				border-bottom: 1px solid #c3c4c7;
				background: #f8f9fa;
				display: flex;
				align-items: stretch;
			}

			.wbcom-essential-admin .nav-tab {
				display: inline-flex;
				align-items: center;
				gap: 6px;
				padding: 12px 16px;
				border: none;
				border-bottom: 2px solid transparent;
				background: transparent;
				color: #646970;
				text-decoration: none;
				margin: 0;
				font-size: 14px;
				line-height: 1.4;
			}

			.wbcom-essential-admin .nav-tab:hover {
				background: #fff;
				color: #0073aa;
			}

			.wbcom-essential-admin .nav-tab-active {
				background: #fff;
				color: #0073aa;
				border-bottom-color: #0073aa;
			}

			.wbcom-essential-admin .nav-tab .dashicons {
				font-size: 16px;
				line-height: 1;
				width: 16px;
				height: 16px;
			}

			.wbcom-essential-admin .tab-content-wrapper {
				background: #fff;
				border: 1px solid #c3c4c7;
				border-radius: 0 0 4px 4px;
				border-top: none;
				margin-top: 0;
			}

			.wbcom-essential-admin .tab-content {
				padding: 20px;
			}

			.wbcom-essential-admin h1 {
				display: flex;
				align-items: center;
				font-size: 23px;
				font-weight: 400;
				margin: 20px 0;
				line-height: 1.3;
			}
		</style>
	<?php
	}

	/**
	 * Render widgets tab content
	 */
	private function render_widgets_tab($widgets)
	{
		$blocks = $this->get_blocks_list();
	?>
		<div class="wbcom-widget-showcase">
			<div class="wbcom-feature-highlight" style="display: flex; gap: 20px; margin-bottom: 30px; flex-wrap: wrap;">
				<div class="wbcom-feature-card" style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 20px; border-radius: 8px;">
					<span class="dashicons dashicons-block-default" style="font-size: 32px; margin-bottom: 10px;"></span>
					<h3 style="color: #fff; margin: 10px 0;"><?php esc_html_e('Gutenberg Blocks', 'wbcom-essential'); ?></h3>
					<p style="margin: 0; opacity: 0.9;"><?php esc_html_e('30+ blocks ready to use in the WordPress Block Editor. No Elementor required!', 'wbcom-essential'); ?></p>
				</div>
				<div class="wbcom-feature-card" style="flex: 1; min-width: 280px; background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #fff; padding: 20px; border-radius: 8px;">
					<span class="dashicons dashicons-admin-customizer" style="font-size: 32px; margin-bottom: 10px;"></span>
					<h3 style="color: #fff; margin: 10px 0;"><?php esc_html_e('Elementor Widgets', 'wbcom-essential'); ?></h3>
					<p style="margin: 0; opacity: 0.9;"><?php esc_html_e('43+ premium widgets for Elementor Page Builder with advanced styling options.', 'wbcom-essential'); ?></p>
				</div>
			</div>
			<p class="description">
				<?php esc_html_e('Explore all available widgets and blocks provided by WBcom Essential. Use Gutenberg blocks directly in the Block Editor, or install Elementor for even more widgets.', 'wbcom-essential'); ?>
			</p>

			<!-- Gutenberg Blocks Section -->
			<h2 style="margin-top: 30px; padding-bottom: 10px; border-bottom: 2px solid #667eea;">
				<span class="dashicons dashicons-block-default" style="margin-right: 8px; color: #667eea;"></span>
				<?php esc_html_e('Gutenberg Blocks', 'wbcom-essential'); ?>
				<span style="font-size: 14px; font-weight: normal; color: #666; margin-left: 10px;"><?php esc_html_e('Works without Elementor!', 'wbcom-essential'); ?></span>
			</h2>

			<div class="widget-categories">
				<?php foreach ($blocks as $category_key => $category) : ?>
					<div class="widget-category" id="blocks-<?php echo esc_attr($category_key); ?>">
						<div class="category-header">
							<span class="dashicons <?php echo esc_attr($category['icon']); ?>"></span>
							<h2><?php echo esc_html($category['title']); ?></h2>
							<span class="widget-count"><?php echo count($category['blocks']); ?> <?php esc_html_e('blocks', 'wbcom-essential'); ?></span>
						</div>
						<p class="category-description"><?php echo esc_html($category['description']); ?></p>

						<div class="widgets-grid">
							<?php foreach ($category['blocks'] as $block) : ?>
								<div class="widget-card" style="border-left: 3px solid #667eea;">
									<div class="widget-icon">
										<span class="dashicons <?php echo esc_attr($block['icon']); ?>"></span>
									</div>
									<h3><?php echo esc_html($block['name']); ?></h3>
									<p><?php echo esc_html($block['description']); ?></p>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<!-- Elementor Widgets Section -->
			<h2 style="margin-top: 40px; padding-bottom: 10px; border-bottom: 2px solid #f5576c;">
				<span class="dashicons dashicons-admin-customizer" style="margin-right: 8px; color: #f5576c;"></span>
				<?php esc_html_e('Elementor Widgets', 'wbcom-essential'); ?>
				<span style="font-size: 14px; font-weight: normal; color: #666; margin-left: 10px;"><?php esc_html_e('Requires Elementor plugin', 'wbcom-essential'); ?></span>
			</h2>

			<div class="widget-categories">
				<?php foreach ($widgets as $category_key => $category) : ?>
					<div class="widget-category" id="widgets-<?php echo esc_attr($category_key); ?>">
						<div class="category-header">
							<span class="dashicons <?php echo esc_attr($category['icon']); ?>"></span>
							<h2><?php echo esc_html($category['title']); ?></h2>
							<span class="widget-count"><?php echo count($category['widgets']); ?> <?php esc_html_e('widgets', 'wbcom-essential'); ?></span>
						</div>
						<p class="category-description"><?php echo esc_html($category['description']); ?></p>

						<div class="widgets-grid">
							<?php foreach ($category['widgets'] as $widget) : ?>
								<div class="widget-card" style="border-left: 3px solid #f5576c;">
									<div class="widget-icon">
										<span class="dashicons <?php echo esc_attr($widget['icon']); ?>"></span>
									</div>
									<h3><?php echo esc_html($widget['name']); ?></h3>
									<p><?php echo esc_html($widget['description']); ?></p>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<div class="widget-showcase-footer" style="display: flex; gap: 30px; flex-wrap: wrap;">
				<div style="flex: 1; min-width: 280px;">
					<h3><span class="dashicons dashicons-block-default" style="margin-right: 8px;"></span><?php esc_html_e('How to Use Gutenberg Blocks', 'wbcom-essential'); ?></h3>
					<ol>
						<li><?php esc_html_e('Edit any page or post with the Block Editor', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Click the + button to add a block', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Search for "WBcom" or browse the Wbcom Essential category', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Insert and customize the block settings', 'wbcom-essential'); ?></li>
					</ol>
				</div>
				<div style="flex: 1; min-width: 280px;">
					<h3><span class="dashicons dashicons-admin-customizer" style="margin-right: 8px;"></span><?php esc_html_e('How to Use Elementor Widgets', 'wbcom-essential'); ?></h3>
					<ol>
						<li><?php esc_html_e('Install and activate Elementor plugin', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Edit any page or post with Elementor', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Search for "WBcom" in the widgets panel', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Drag and drop any widget to your page', 'wbcom-essential'); ?></li>
					</ol>
				</div>
			</div>
		</div>
	<?php
	}

	/**
	 * Render license tab content
	 */
	private function render_license_tab()
	{
		// Ensure license components are initialized
		if (! $this->license_manager) {
			$this->init_license_components();
		}
	?>
		<div class="wbcom-license-content">
			<?php
			if ($this->license_manager) {
				$this->license_manager->render_license_tab();
			} else {
				echo '<p>' . esc_html__('License system is not available.', 'wbcom-essential') . '</p>';
			}
			?>
		</div>
	<?php
	}

	/**
	 * Render FAQ tab content
	 */
	private function render_faq_tab()
	{
	?>
		<div class="wbcom-faq-content">
			<h2><?php esc_html_e('Frequently Asked Questions', 'wbcom-essential'); ?></h2>

			<div class="wbcom-faq-items">
				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Do I need Elementor to use WBcom Essential?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('No! WBcom Essential includes 30+ Gutenberg blocks that work directly in the WordPress Block Editor without any additional plugins. Elementor is optional — if you install it, you get access to 43+ additional premium widgets.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('How do I use WBcom Essential blocks and widgets?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('For Gutenberg blocks: Edit any page or post, click the + button, and search for "WBcom" or browse the Wbcom Essential category. For Elementor widgets: Edit with Elementor and search for "WBcom" in the widgets panel.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Do I need a license to use the blocks and widgets?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('All blocks and widgets work without a license. However, an active license provides automatic updates, premium support, and access to new features as they are released.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Which plugins are required?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('Gutenberg blocks work out of the box with no requirements. For Elementor widgets, you need Elementor (free or pro). Some blocks/widgets have additional requirements:', 'wbcom-essential'); ?></p>
					<ul>
						<li><?php esc_html_e('BuddyPress blocks/widgets require BuddyPress plugin', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('WooCommerce blocks/widgets require WooCommerce plugin', 'wbcom-essential'); ?></li>
						<li><?php esc_html_e('Forum blocks/widgets require bbPress plugin', 'wbcom-essential'); ?></li>
					</ul>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Why are some blocks/widgets not showing?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('Blocks and widgets only appear if their required plugins are active. For example, BuddyPress blocks will only show if BuddyPress is installed and activated.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('How do I customize styles?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('For Gutenberg blocks: Use the Block Settings panel on the right to customize colors, typography, and spacing. For Elementor widgets: Click on any widget and use the Style tab for extensive customization options.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Can I use these blocks/widgets with any theme?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('Yes! WBcom Essential blocks and widgets work with any WordPress theme. They work best with WBcom Designs themes like BuddyX and Flavor, which have been optimized for these components.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('How do I get support?', 'wbcom-essential'); ?></h3>
					<p><?php
						printf(
							/* translators: %s: Support portal link */
							esc_html__('License holders can get premium support through our support portal. Visit %s to submit a ticket. Make sure to include your license key when requesting support.', 'wbcom-essential'),
							'<a href="https://wbcomdesigns.com/support" target="_blank">wbcomdesigns.com/support</a>'
						);
						?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('Can I use my license on multiple sites?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('This depends on your license type. Single site licenses can be used on one website, while multi-site licenses allow usage on multiple websites. Check your purchase receipt or account page for your license type.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('What happens when my license expires?', 'wbcom-essential'); ?></h3>
					<p><?php esc_html_e('Your widgets will continue to work when your license expires. However, you will no longer receive automatic updates or premium support. We recommend renewing your license to ensure compatibility with the latest versions of WordPress and Elementor.', 'wbcom-essential'); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e('How do I report a bug or request a feature?', 'wbcom-essential'); ?></h3>
					<p><?php
						printf(
							/* translators: %s: GitHub repository link */
							esc_html__('We welcome your feedback! Report bugs or request features through our GitHub repository at %s or through our support portal if you have an active license.', 'wbcom-essential'),
							'<a href="https://github.com/wbcomdesigns/wbcom-essential" target="_blank">GitHub</a>'
						);
						?></p>
				</div>
			</div>

			<div class="wbcom-faq-footer">
				<h3><?php esc_html_e('Still have questions?', 'wbcom-essential'); ?></h3>
				<p><?php
					printf(
						/* translators: %1$s: Documentation link, %2$s: Support link */
						esc_html__('Check out our %1$s or %2$s for more help.', 'wbcom-essential'),
						'<a href="https://wbcomdesigns.com/docs/wbcom-essential" target="_blank">' . esc_html__('documentation', 'wbcom-essential') . '</a>',
						'<a href="https://wbcomdesigns.com/support" target="_blank">' . esc_html__('contact support', 'wbcom-essential') . '</a>'
					);
					?></p>
			</div>
		</div>
<?php
	}
}
