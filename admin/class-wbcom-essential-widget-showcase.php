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
class Wbcom_Essential_Widget_Showcase {

	/**
	 * License manager instance
	 */
	private $license_manager;

	/**
	 * Initialize the class
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_widget_showcase_menu' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
		
		// Initialize license components after WordPress is loaded
		add_action( 'init', array( $this, 'init_license_components' ) );
	}
	
	/**
	 * Initialize license components
	 */
	public function init_license_components() {
		// Initialize license manager
		$license_manager_file = WBCOM_ESSENTIAL_PATH . '/license/class-license-manager.php';
		if ( file_exists( $license_manager_file ) ) {
			require_once $license_manager_file;
			$this->license_manager = \WBCOM_ESSENTIAL_License_Manager::get_instance();
		}
		
		// Initialize license updater
		$license_updater_file = WBCOM_ESSENTIAL_PATH . '/license/class-license-updater.php';
		if ( file_exists( $license_updater_file ) ) {
			require_once $license_updater_file;
			\WBCOM_ESSENTIAL_License_Updater::get_instance();
		}
	}

	/**
	 * Add widget showcase menu
	 */
	public function add_widget_showcase_menu() {
		add_menu_page(
			esc_html__( 'WBcom Widgets', 'wbcom-essential' ),
			esc_html__( 'WBcom Widgets', 'wbcom-essential' ),
			'manage_options',
			'wbcom-widgets',
			array( $this, 'render_widget_showcase_page' ),
			'dashicons-screenoptions',
			58
		);
	}

	/**
	 * Enqueue admin styles
	 */
	public function enqueue_admin_styles( $hook ) {
		if ( 'toplevel_page_wbcom-widgets' !== $hook ) {
			return;
		}

		wp_enqueue_style(
			'wbcom-widget-showcase',
			plugin_dir_url( __FILE__ ) . 'css/widget-showcase.css',
			array(),
			'1.0.0'
		);
		
		// License scripts
		wp_enqueue_script(
			'wbcom-essential-license',
			plugin_dir_url( __FILE__ ) . 'js/license.js',
			array( 'jquery' ),
			'1.0.0',
			true
		);
		
		wp_localize_script(
			'wbcom-essential-license',
			'wbcomEssentialLicense',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( 'wbcom_essential_license_nonce' ),
				'strings'  => array(
					'activating'   => esc_html__( 'Activating...', 'wbcom-essential' ),
					'deactivating' => esc_html__( 'Deactivating...', 'wbcom-essential' ),
					'checking'     => esc_html__( 'Checking...', 'wbcom-essential' ),
				),
			)
		);
	}

	/**
	 * Get all available widgets organized by category
	 */
	private function get_widgets_list() {
		return array(
			'buddypress' => array(
				'title' => esc_html__( 'BuddyPress Widgets', 'wbcom-essential' ),
				'description' => esc_html__( 'Social community widgets for BuddyPress integration', 'wbcom-essential' ),
				'icon' => 'dashicons-groups',
				'widgets' => array(
					array(
						'name' => esc_html__( 'Dashboard Intro', 'wbcom-essential' ),
						'description' => esc_html__( 'Welcome message and introduction for user dashboards', 'wbcom-essential' ),
						'icon' => 'dashicons-dashboard'
					),
					array(
						'name' => esc_html__( 'Forums', 'wbcom-essential' ),
						'description' => esc_html__( 'Display forum topics and discussions', 'wbcom-essential' ),
						'icon' => 'dashicons-format-chat'
					),
					array(
						'name' => esc_html__( 'Forums Activity', 'wbcom-essential' ),
						'description' => esc_html__( 'Show recent forum activity and updates', 'wbcom-essential' ),
						'icon' => 'dashicons-update'
					),
					array(
						'name' => esc_html__( 'Group Carousel', 'wbcom-essential' ),
						'description' => esc_html__( 'Showcase groups in a rotating carousel', 'wbcom-essential' ),
						'icon' => 'dashicons-images-alt2'
					),
					array(
						'name' => esc_html__( 'Groups Grid', 'wbcom-essential' ),
						'description' => esc_html__( 'Display groups in a responsive grid layout', 'wbcom-essential' ),
						'icon' => 'dashicons-grid-view'
					),
					array(
						'name' => esc_html__( 'Groups Lists', 'wbcom-essential' ),
						'description' => esc_html__( 'Show groups in customizable list formats', 'wbcom-essential' ),
						'icon' => 'dashicons-list-view'
					),
					array(
						'name' => esc_html__( 'Header Bar', 'wbcom-essential' ),
						'description' => esc_html__( 'User profile header with navigation options', 'wbcom-essential' ),
						'icon' => 'dashicons-menu'
					),
					array(
						'name' => esc_html__( 'Members Grid', 'wbcom-essential' ),
						'description' => esc_html__( 'Display community members in grid layout', 'wbcom-essential' ),
						'icon' => 'dashicons-admin-users'
					),
					array(
						'name' => esc_html__( 'Members Lists', 'wbcom-essential' ),
						'description' => esc_html__( 'Show members in various list styles', 'wbcom-essential' ),
						'icon' => 'dashicons-id'
					),
					array(
						'name' => esc_html__( 'Members Carousel', 'wbcom-essential' ),
						'description' => esc_html__( 'Feature members in a sliding carousel', 'wbcom-essential' ),
						'icon' => 'dashicons-slides'
					),
					array(
						'name' => esc_html__( 'Profile Completion', 'wbcom-essential' ),
						'description' => esc_html__( 'Progress indicator for profile completeness', 'wbcom-essential' ),
						'icon' => 'dashicons-chart-pie'
					)
				)
			),
			'general' => array(
				'title' => esc_html__( 'General Widgets', 'wbcom-essential' ),
				'description' => esc_html__( 'Versatile widgets for various content types', 'wbcom-essential' ),
				'icon' => 'dashicons-admin-generic',
				'widgets' => array(
					array(
						'name' => esc_html__( 'Accordion', 'wbcom-essential' ),
						'description' => esc_html__( 'Collapsible content sections', 'wbcom-essential' ),
						'icon' => 'dashicons-editor-justify'
					),
					array(
						'name' => esc_html__( 'Branding', 'wbcom-essential' ),
						'description' => esc_html__( 'Display your brand logo and information', 'wbcom-essential' ),
						'icon' => 'dashicons-tag'
					),
					array(
						'name' => esc_html__( 'Countdown', 'wbcom-essential' ),
						'description' => esc_html__( 'Timer for events and launches', 'wbcom-essential' ),
						'icon' => 'dashicons-clock'
					),
					array(
						'name' => esc_html__( 'Dropdown Button', 'wbcom-essential' ),
						'description' => esc_html__( 'Interactive dropdown menu button', 'wbcom-essential' ),
						'icon' => 'dashicons-arrow-down-alt2'
					),
					array(
						'name' => esc_html__( 'Flip Box', 'wbcom-essential' ),
						'description' => esc_html__( 'Interactive flip animation boxes', 'wbcom-essential' ),
						'icon' => 'dashicons-image-flip-horizontal'
					),
					array(
						'name' => esc_html__( 'Heading', 'wbcom-essential' ),
						'description' => esc_html__( 'Stylized heading elements', 'wbcom-essential' ),
						'icon' => 'dashicons-heading'
					),
					array(
						'name' => esc_html__( 'Login Form', 'wbcom-essential' ),
						'description' => esc_html__( 'Customizable user login form', 'wbcom-essential' ),
						'icon' => 'dashicons-lock'
					),
					array(
						'name' => esc_html__( 'Notification Area', 'wbcom-essential' ),
						'description' => esc_html__( 'Header notifications display', 'wbcom-essential' ),
						'icon' => 'dashicons-bell'
					),
					array(
						'name' => esc_html__( 'Portfolio Grid', 'wbcom-essential' ),
						'description' => esc_html__( 'Showcase portfolio items in grid', 'wbcom-essential' ),
						'icon' => 'dashicons-portfolio'
					),
					array(
						'name' => esc_html__( 'Post Carousel', 'wbcom-essential' ),
						'description' => esc_html__( 'Display posts in carousel format', 'wbcom-essential' ),
						'icon' => 'dashicons-admin-post'
					),
					array(
						'name' => esc_html__( 'Post Slider', 'wbcom-essential' ),
						'description' => esc_html__( 'Featured posts slider', 'wbcom-essential' ),
						'icon' => 'dashicons-media-interactive'
					),
					array(
						'name' => esc_html__( 'Post Timeline', 'wbcom-essential' ),
						'description' => esc_html__( 'Posts in chronological timeline', 'wbcom-essential' ),
						'icon' => 'dashicons-backup'
					),
					array(
						'name' => esc_html__( 'Posts Revolution', 'wbcom-essential' ),
						'description' => esc_html__( 'Advanced posts display widget', 'wbcom-essential' ),
						'icon' => 'dashicons-admin-page'
					),
					array(
						'name' => esc_html__( 'Posts Ticker', 'wbcom-essential' ),
						'description' => esc_html__( 'Scrolling news ticker for posts', 'wbcom-essential' ),
						'icon' => 'dashicons-megaphone'
					),
					array(
						'name' => esc_html__( 'Pricing Table', 'wbcom-essential' ),
						'description' => esc_html__( 'Product/service pricing displays', 'wbcom-essential' ),
						'icon' => 'dashicons-cart'
					),
					array(
						'name' => esc_html__( 'Progress Bar', 'wbcom-essential' ),
						'description' => esc_html__( 'Visual progress indicators', 'wbcom-essential' ),
						'icon' => 'dashicons-chart-bar'
					),
					array(
						'name' => esc_html__( 'Shape', 'wbcom-essential' ),
						'description' => esc_html__( 'Decorative shape elements', 'wbcom-essential' ),
						'icon' => 'dashicons-marker'
					),
					array(
						'name' => esc_html__( 'Site Logo', 'wbcom-essential' ),
						'description' => esc_html__( 'Display site logo with options', 'wbcom-essential' ),
						'icon' => 'dashicons-wordpress'
					),
					array(
						'name' => esc_html__( 'Slider', 'wbcom-essential' ),
						'description' => esc_html__( 'General purpose content slider', 'wbcom-essential' ),
						'icon' => 'dashicons-images-alt'
					),
					array(
						'name' => esc_html__( 'Smart Menu', 'wbcom-essential' ),
						'description' => esc_html__( 'Advanced navigation menu', 'wbcom-essential' ),
						'icon' => 'dashicons-menu-alt3'
					),
					array(
						'name' => esc_html__( 'Tabs', 'wbcom-essential' ),
						'description' => esc_html__( 'Tabbed content sections', 'wbcom-essential' ),
						'icon' => 'dashicons-category'
					),
					array(
						'name' => esc_html__( 'Team Carousel', 'wbcom-essential' ),
						'description' => esc_html__( 'Showcase team members', 'wbcom-essential' ),
						'icon' => 'dashicons-businessman'
					),
					array(
						'name' => esc_html__( 'Testimonial', 'wbcom-essential' ),
						'description' => esc_html__( 'Client testimonial displays', 'wbcom-essential' ),
						'icon' => 'dashicons-format-quote'
					),
					array(
						'name' => esc_html__( 'Testimonial Carousel', 'wbcom-essential' ),
						'description' => esc_html__( 'Rotating testimonials showcase', 'wbcom-essential' ),
						'icon' => 'dashicons-testimonial'
					),
					array(
						'name' => esc_html__( 'Text Rotator', 'wbcom-essential' ),
						'description' => esc_html__( 'Animated rotating text', 'wbcom-essential' ),
						'icon' => 'dashicons-update-alt'
					),
					array(
						'name' => esc_html__( 'Timeline', 'wbcom-essential' ),
						'description' => esc_html__( 'Visual timeline displays', 'wbcom-essential' ),
						'icon' => 'dashicons-calendar-alt'
					)
				)
			),
			'woocommerce' => array(
				'title' => esc_html__( 'WooCommerce Widgets', 'wbcom-essential' ),
				'description' => esc_html__( 'E-commerce widgets for WooCommerce stores', 'wbcom-essential' ),
				'icon' => 'dashicons-store',
				'widgets' => array(
					array(
						'name' => esc_html__( 'Add Banner', 'wbcom-essential' ),
						'description' => esc_html__( 'Promotional banners for products', 'wbcom-essential' ),
						'icon' => 'dashicons-megaphone'
					),
					array(
						'name' => esc_html__( 'Customer Review', 'wbcom-essential' ),
						'description' => esc_html__( 'Display customer reviews', 'wbcom-essential' ),
						'icon' => 'dashicons-star-filled'
					),
					array(
						'name' => esc_html__( 'Product Tab', 'wbcom-essential' ),
						'description' => esc_html__( 'Tabbed product information', 'wbcom-essential' ),
						'icon' => 'dashicons-products'
					),
					array(
						'name' => esc_html__( 'Universal Product', 'wbcom-essential' ),
						'description' => esc_html__( 'Flexible product display widget', 'wbcom-essential' ),
						'icon' => 'dashicons-archive'
					),
					array(
						'name' => esc_html__( 'WooCommerce Testimonial', 'wbcom-essential' ),
						'description' => esc_html__( 'Product testimonials display', 'wbcom-essential' ),
						'icon' => 'dashicons-thumbs-up'
					)
				)
			)
		);
	}

	/**
	 * Render the widget showcase page
	 */
	public function render_widget_showcase_page() {
		$widgets = $this->get_widgets_list();
		$current_tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : 'widgets';
		?>
		<div class="wrap">
			<h1><?php esc_html_e( 'WBcom Essential', 'wbcom-essential' ); ?></h1>
			
			<nav class="nav-tab-wrapper wp-clearfix">
				<a href="?page=wbcom-widgets&tab=widgets" class="nav-tab <?php echo $current_tab === 'widgets' ? 'nav-tab-active' : ''; ?>">
					<?php esc_html_e( 'Widgets', 'wbcom-essential' ); ?>
				</a>
				<a href="?page=wbcom-widgets&tab=license" class="nav-tab <?php echo $current_tab === 'license' ? 'nav-tab-active' : ''; ?>">
					<?php esc_html_e( 'License', 'wbcom-essential' ); ?>
				</a>
				<a href="?page=wbcom-widgets&tab=faq" class="nav-tab <?php echo $current_tab === 'faq' ? 'nav-tab-active' : ''; ?>">
					<?php esc_html_e( 'FAQ', 'wbcom-essential' ); ?>
				</a>
			</nav>

			<div class="tab-content">
				<?php
				switch ( $current_tab ) {
					case 'license':
						$this->render_license_tab();
						break;
					case 'faq':
						$this->render_faq_tab();
						break;
					case 'widgets':
					default:
						$this->render_widgets_tab( $widgets );
						break;
				}
				?>
			</div>
		</div>
		<?php
	}

	/**
	 * Render widgets tab content
	 */
	private function render_widgets_tab( $widgets ) {
		?>
		<div class="wbcom-widget-showcase">
			<p class="description">
				<?php esc_html_e( 'Explore all available Elementor widgets provided by WBcom Essential. Drag and drop these widgets in Elementor to enhance your website.', 'wbcom-essential' ); ?>
			</p>

			<div class="widget-categories">
				<?php foreach ( $widgets as $category_key => $category ) : ?>
					<div class="widget-category" id="<?php echo esc_attr( $category_key ); ?>">
						<div class="category-header">
							<span class="dashicons <?php echo esc_attr( $category['icon'] ); ?>"></span>
							<h2><?php echo esc_html( $category['title'] ); ?></h2>
							<span class="widget-count"><?php echo count( $category['widgets'] ); ?> <?php esc_html_e( 'widgets', 'wbcom-essential' ); ?></span>
						</div>
						<p class="category-description"><?php echo esc_html( $category['description'] ); ?></p>
						
						<div class="widgets-grid">
							<?php foreach ( $category['widgets'] as $widget ) : ?>
								<div class="widget-card">
									<div class="widget-icon">
										<span class="dashicons <?php echo esc_attr( $widget['icon'] ); ?>"></span>
									</div>
									<h3><?php echo esc_html( $widget['name'] ); ?></h3>
									<p><?php echo esc_html( $widget['description'] ); ?></p>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>

			<div class="widget-showcase-footer">
				<h3><?php esc_html_e( 'How to Use These Widgets', 'wbcom-essential' ); ?></h3>
				<ol>
					<li><?php esc_html_e( 'Edit any page or post with Elementor', 'wbcom-essential' ); ?></li>
					<li><?php esc_html_e( 'Search for "WBcom" in the widgets panel', 'wbcom-essential' ); ?></li>
					<li><?php esc_html_e( 'Drag and drop any widget to your page', 'wbcom-essential' ); ?></li>
					<li><?php esc_html_e( 'Customize the widget settings to match your design', 'wbcom-essential' ); ?></li>
				</ol>
			</div>
		</div>
		<?php
	}

	/**
	 * Render license tab content
	 */
	private function render_license_tab() {
		?>
		<div class="wbcom-license-content">
			<?php 
			if ( $this->license_manager ) {
				$this->license_manager->render_license_tab(); 
			} else {
				echo '<p>' . esc_html__( 'License system is initializing...', 'wbcom-essential' ) . '</p>';
			}
			?>
		</div>
		<?php
	}

	/**
	 * Render FAQ tab content
	 */
	private function render_faq_tab() {
		?>
		<div class="wbcom-faq-content">
			<h2><?php esc_html_e( 'Frequently Asked Questions', 'wbcom-essential' ); ?></h2>
			
			<div class="wbcom-faq-items">
				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'How do I use WBcom Essential widgets?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'To use WBcom Essential widgets, edit any page or post with Elementor. In the widgets panel, search for "WBcom" to see all available widgets. Simply drag and drop any widget onto your page and customize its settings.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'Do I need a license to use the widgets?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'The widgets will work without a license, but having an active license provides you with automatic updates, premium support, and access to new features as they are released.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'Which plugins are required for all widgets to work?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'WBcom Essential requires Elementor (free or pro). Some widgets have additional requirements:', 'wbcom-essential' ); ?></p>
					<ul>
						<li><?php esc_html_e( 'BuddyPress widgets require BuddyPress plugin', 'wbcom-essential' ); ?></li>
						<li><?php esc_html_e( 'WooCommerce widgets require WooCommerce plugin', 'wbcom-essential' ); ?></li>
						<li><?php esc_html_e( 'Forum widgets require bbPress plugin', 'wbcom-essential' ); ?></li>
					</ul>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'Why are some widgets not showing in Elementor?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'Widgets only appear if their required plugins are active. For example, BuddyPress widgets will only show if BuddyPress is installed and activated. Check the Widgets tab to see which plugins are required for each widget.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'How do I customize widget styles?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'Each widget comes with extensive style options in the Elementor editor. Click on any widget and navigate to the Style tab to customize colors, typography, spacing, and more. You can also use custom CSS for advanced styling.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'Can I use these widgets with any theme?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'Yes! WBcom Essential widgets are designed to work with any WordPress theme that supports Elementor. However, they work best with WBcom Designs themes like Reign, which have been optimized for these widgets.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'How do I get support?', 'wbcom-essential' ); ?></h3>
					<p><?php 
					printf( 
						esc_html__( 'License holders can get premium support through our support portal. Visit %s to submit a ticket. Make sure to include your license key when requesting support.', 'wbcom-essential' ),
						'<a href="https://wbcomdesigns.com/support" target="_blank">wbcomdesigns.com/support</a>'
					); 
					?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'Can I use my license on multiple sites?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'This depends on your license type. Single site licenses can be used on one website, while multi-site licenses allow usage on multiple websites. Check your purchase receipt or account page for your license type.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'What happens when my license expires?', 'wbcom-essential' ); ?></h3>
					<p><?php esc_html_e( 'Your widgets will continue to work when your license expires. However, you will no longer receive automatic updates or premium support. We recommend renewing your license to ensure compatibility with the latest versions of WordPress and Elementor.', 'wbcom-essential' ); ?></p>
				</div>

				<div class="wbcom-faq-item">
					<h3><?php esc_html_e( 'How do I report a bug or request a feature?', 'wbcom-essential' ); ?></h3>
					<p><?php 
					printf( 
						esc_html__( 'We welcome your feedback! Report bugs or request features through our GitHub repository at %s or through our support portal if you have an active license.', 'wbcom-essential' ),
						'<a href="https://github.com/wbcomdesigns/wbcom-essential" target="_blank">GitHub</a>'
					); 
					?></p>
				</div>
			</div>

			<div class="wbcom-faq-footer">
				<h3><?php esc_html_e( 'Still have questions?', 'wbcom-essential' ); ?></h3>
				<p><?php 
				printf(
					esc_html__( 'Check out our %s or %s for more help.', 'wbcom-essential' ),
					'<a href="https://wbcomdesigns.com/docs/wbcom-essential" target="_blank">' . esc_html__( 'documentation', 'wbcom-essential' ) . '</a>',
					'<a href="https://wbcomdesigns.com/support" target="_blank">' . esc_html__( 'contact support', 'wbcom-essential' ) . '</a>'
				);
				?></p>
			</div>
		</div>
		<?php
	}
}

// Initialize the widget showcase
new Wbcom_Essential_Widget_Showcase();