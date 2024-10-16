<?php

namespace WBCOM_ESSENTIAL\ELEMENTOR\Widgets\General;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

use WBCOM_ESSENTIAL\Plugin;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Schemes\Color;
use Elementor\Core\Schemes\Typography;
use Elementor\Group_Control_Typography;



class NotificationArea extends \Elementor\Widget_Base {

	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );

		wp_register_style( 'notification-area', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/css/notification-area.css', array(), WBCOM_ESSENTIAL_VERSION );
	}

	public function get_name() {
		return 'wbcom-notification-area';
	}

	public function get_title() {
		return esc_html__( 'Header Notification Area', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-alert';
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}

	public function get_style_depends() {
		return array( 'notification-area' );
	}

	protected function register_controls() {

		$this->start_controls_section(
			'section_reign_notification_area',
			array(
				'label' => __( 'Notification Area', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'search_form_enabled',
			array(
				'label'        => __( 'Enable Search Form', 'wbcom-essential' ),
				'type'         => \Elementor\Controls_Manager::SWITCHER,
				'default'      => 'yes',
				'label_on'     => __( 'Yes', 'wbcom-essential' ),
				'label_off'    => __( 'No', 'wbcom-essential' ),
				'return_value' => 'yes',
				'separator'    => 'before',
			)
		);

		if ( class_exists( 'WooCommerce' ) || class_exists( 'Easy_Digital_Downloads' ) ) {
			$this->add_control(
				'rtm_cart_icon_enabled',
				array(
					'label'        => __( 'Enable Cart Icon', 'wbcom-essential' ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'default'      => 'yes',
					'label_on'     => __( 'Yes', 'wbcom-essential' ),
					'label_off'    => __( 'No', 'wbcom-essential' ),
					'return_value' => 'yes',
					'separator'    => 'before',
				)
			);
		}

		if ( class_exists( 'BuddyPress' ) && bp_is_active( 'messages' ) ) {
			$this->add_control(
				'user_message_bell_enabled',
				array(
					'label'        => __( 'Enable User Message Icon', 'wbcom-essential' ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'default'      => 'yes',
					'label_on'     => __( 'Yes', 'wbcom-essential' ),
					'label_off'    => __( 'No', 'wbcom-essential' ),
					'return_value' => 'yes',
					'separator'    => 'before',
				)
			);
		}

		if ( class_exists( 'BuddyPress' ) && bp_is_active( 'notifications' ) ) {
			$this->add_control(
				'notification_bell_enabled',
				array(
					'label'        => __( 'Enable Notification Bell Icon', 'wbcom-essential' ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'default'      => 'yes',
					'label_on'     => __( 'Yes', 'wbcom-essential' ),
					'label_off'    => __( 'No', 'wbcom-essential' ),
					'return_value' => 'yes',
					'separator'    => 'before',
				)
			);
		}

		$this->add_control(
			'avatar_enabled',
			array(
				'label'        => __( 'Display User Avatar', 'wbcom-essential' ),
				'type'         => \Elementor\Controls_Manager::SWITCHER,
				'default'      => 'yes',
				'label_on'     => __( 'Yes', 'wbcom-essential' ),
				'label_off'    => __( 'No', 'wbcom-essential' ),
				'return_value' => 'yes',
				'separator'    => 'before',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_notification_area_style',
			array(
				'label' => esc_html__( 'Notification Area', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'icon_color',
			array(
				'label'     => __( 'Icon Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#000000',
				'selectors' => array(
					'{{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-search-icon.icon-search-interface-symbol, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap a, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap span:before, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-search-icon:before' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'icon_hover_color',
			array(
				'label'     => __( 'Icon Hover Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#000000',
				'selectors' => array(
					'{{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-search-icon.icon-search-interface-symbol:hover, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap:hover, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap a:hover,
					{{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-icon-wrap span:hover:before, {{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .rg-search-icon:hover:before' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'user_name_font_color',
			array(
				'label'     => __( 'User Name Font Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#000',
				'selectors' => array(
					'{{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .user-link, #masthead .wbesntl-notification-area .user-link-wrap .user-link' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'user_name_font_color_hover',
			array(
				'label'     => __( 'User Name Font Color (Hover)', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#000',
				'selectors' => array(
					'{{WRAPPER}} .header-right.no-gutter.wb-grid-flex.grid-center .user-link:hover, #masthead .wbesntl-notification-area .user-link-wrap .user-link:hover' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'notification_height',
			array(
				'label'     => __( 'Line Height (px)', 'wbcom-essential' ),
				'type'      => Controls_Manager::NUMBER,
				'default'   => 90,
				'selectors' => array(
					'{{WRAPPER}} #masthead.wbcom-notification-area .rg-icon-wrap' => 'line-height: {{VALUE}}px;height: {{VALUE}}px;',
				),
			)
		);

		$this->add_control(
			'counter_top',
			array(
				'label'     => __( 'Counter Top Space (px)', 'wbcom-essential' ),
				'type'      => Controls_Manager::NUMBER,
				'default'   => 20,
				'selectors' => array(
					'{{WRAPPER}} .header-right.wb-grid-flex.wbesntl-notification-area .rg-count' => 'top: {{VALUE}}px;',
				),
			)
		);

		$this->end_controls_section();

		do_action( 'reign_wp_menu_elementor_controls', $this );
	}

	/**
	 * Render our custom menu onto the page.
	 */
	protected function render() {
		$settings = $this->get_settings();
		if ( ! isset( $settings['user_message_bell_enabled'] ) ) {
			$settings['user_message_bell_enabled'] = 'no';
		}
		if ( ! isset( $settings['notification_bell_enabled'] ) ) {
			$settings['notification_bell_enabled'] = 'no';
		}
		if ( ! isset( $settings['rtm_cart_icon_enabled'] ) ) {
			$settings['rtm_cart_icon_enabled'] = 'no';
		}
		if ( ! isset( $settings['avatar_enabled'] ) ) {
			$settings['avatar_enabled'] = 'no';
		}

		$notification_height = isset( $settings['notification_height'] ) ? $settings['notification_height'] : 90;

		ob_start();
		?>

		<style type="text/css">
			#masthead .header-right.wb-grid-flex.wbesntl-notification-area .user-link-wrap .user-profile-menu,
			#masthead .header-right.wb-grid-flex.wbesntl-notification-area .rg-header-submenu.rg-dropdown {
				top: <?php echo esc_attr( $notification_height ); ?>px;
			}
		</style>

		<div id="masthead" class="wbcom-notification-area">
			<div class="header-right no-gutter wb-grid-flex grid-center wbesntl-notification-area">
				<div class="wbcom-notification-area-navbar">
				<?php
				// Display search form if enabled.
				if ( 'yes' == $settings['search_form_enabled'] ) {
					?>
						<div class="search-wrap rg-icon-wrap">
							<span class="rg-search-icon far fa-search"></span>
							<div class="rg-search-form-wrap">
								<span class="rg-search-close far fa-times-circle"></span>
							<?php get_search_form(); ?>
							</div>
						</div>
						<?php
				}

				// Display cart icon, even in Elementor editor mode.
				if ( 'yes' == $settings['rtm_cart_icon_enabled'] ) {
					if ( \Elementor\Plugin::instance()->editor->is_edit_mode() ) {
						// In Elementor editor, show a placeholder or a static cart icon.
						?>
							<div class="woo-cart-wrap rg-icon-wrap">
								<span class="far fa-shopping-cart"></span>
							</div>
						<?php
					} elseif ( function_exists( 'my_wc_cart_count' ) ) {
						my_wc_cart_count();
					}
				}

				// Display user message bell and notifications if logged in.
				if ( is_user_logged_in() ) {

					if ( 'yes' == $settings['user_message_bell_enabled'] ) {
						get_template_part( 'template-parts/header-icons/message' );
					}

					if ( 'yes' == $settings['notification_bell_enabled'] ) {
						get_template_part( 'template-parts/header-icons/notification' );
					}

					if ( 'yes' == $settings['avatar_enabled'] ) {
						get_template_part( 'template-parts/header-icons/user-menu' );
					}
				} else {
					// Login/Register Links.
					$wbcom_ele_login_url    = apply_filters( 'wbcom_ele_notification_login_url', wp_login_url() );
					$wbcom_ele_register_url = apply_filters( 'wbcom_ele_notification_registration_url', wp_registration_url() );
					?>
					<div class="rg-icon-wrap">
						<a href="<?php echo esc_url( $wbcom_ele_login_url ); ?>" class="btn-login" title="Login">
							<span class="far fa-sign-in-alt"></span>
						</a>
					</div>
					<?php
					if ( get_option( 'users_can_register' ) ) {
						?>
						<span class="sep">|</span>
						<div class="rg-icon-wrap">
							<a href="<?php echo esc_url( $wbcom_ele_register_url ); ?>" class="btn-register" title="Register">
								<span class="far fa-address-book"></span>
							</a>
						</div>
						<?php
					}
				}
				?>
				</div>
			</div>
		</div>

		<?php
		echo apply_filters( 'reign_notification_area_output', ob_get_clean(), $settings['notification_bell_enabled'], $settings['notification_bell_enabled'], $settings );
	}
}
