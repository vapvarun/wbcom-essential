<?php

namespace WBCOM_ESSENTIAL\ELEMENTOR\Widgets\Buddypress;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

use WBCOM_ESSENTIAL\Plugin;
use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Border;

class HeaderBar extends \Elementor\Widget_Base {

	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );
		
		wp_register_script( 'header-bar', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/js/header-bar.js', array( 'elementor-frontend' ), '3.0.0', true );
	}

	public function get_name() {
		return 'wbcom-header-bar';
	}
	
	public function get_script_depends() {
		return array( 'header-bar' );
	}

	public function get_title() {
		return esc_html__( 'Header Bar', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-select';
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}
	
	/**
	 * Return nav menu items.
	 *
	 * @return array
	 */
	private function get_menus() {
		$menus = wp_get_nav_menus();

		$options = array();

		foreach ( $menus as $menu ) {
			$options[ $menu->slug ] = $menu->name;
		}

		return $options;
	}
	
	protected function _register_controls() {
		$this->start_controls_section(
			'section_content',
			array(
				'label' => esc_html__( 'Content', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'switch_logo',
			array(
				'label' => esc_html__( 'Show Logo Image', 'wbcom-essential' ),
				'type'  => Controls_Manager::SWITCHER,
			)
		);

		$this->add_control(
			'switch_nav',
			array(
				'label' => esc_html__( 'Show Navigation', 'wbcom-essential' ),
				'type'  => Controls_Manager::SWITCHER,
			)
		);

		$menus = $this->get_menus();

		if ( ! empty( $menus ) ) {
			$this->add_control(
				'menu_marker',
				array(
					'label'        => __( 'Menu', 'wbcom-essential' ),
					'type'         => Controls_Manager::SELECT,
					'options'      => $menus,
					'default'      => array_keys( $menus )[0],
					'save_default' => true,
					'separator'    => 'after',
					'condition'    => array(
						'switch_nav' => 'yes',
					),
				)
			);
		} else {
			$this->add_control(
				'menu_marker',
				array(
					'type'            => Controls_Manager::RAW_HTML,
					'raw'             => '<strong>' . __( 'There are no menus available.', 'wbcom-essential' ) . '</strong><br>' . sprintf( __( 'Start by creating one <a href="%s" target="_blank">here</a>.', 'wbcom-essential' ), admin_url( 'nav-menus.php?action=edit&menu=0' ) ),
					'separator'       => 'after',
					'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
					'condition'       => array(
						'switch_nav' => 'yes',
					),
				)
			);
		}

		$this->add_control(
			'switch_bar',
			array(
				'label'   => esc_html__( 'Show Header Bar', 'wbcom-essential' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			)
		);

		$this->add_responsive_control(
			'logo_position',
			array(
				'label'        => esc_html__( 'Logo Position', 'wbcom-essential' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => array(
					'left'  => array(
						'title' => esc_html__( 'Left', 'wbcom-essential' ),
						'icon'  => 'eicon-h-align-left',
					),
					'right' => array(
						'title' => esc_html__( 'Right', 'wbcom-essential' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default'      => 'left',
				'prefix_class' => 'elementor-element--logo-position-',
				'condition'    => array(
					'switch_logo' => 'yes',
					'switch_nav'  => 'yes',
					'switch_bar!' => 'yes',
				),
			)
		);

		$this->add_responsive_control(
			'logo_position_full',
			array(
				'label'        => __( 'Logo Position', 'wbcom-essential' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => array(
					'left'   => array(
						'title' => __( 'Left', 'wbcom-essential' ),
						'icon'  => 'eicon-h-align-left',
					),
					'center' => array(
						'title' => esc_html__( 'Center', 'wbcom-essential' ),
						'icon'  => 'eicon-h-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'wbcom-essential' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'default'      => 'left',
				'prefix_class' => 'elementor-element--logo-position-full-',
				'condition'    => array(
					'switch_logo' => 'yes',
					'switch_nav'  => 'yes',
					'switch_bar'  => 'yes',
				),
			)
		);

		$this->add_control(
			'profile_dropdown',
			array(
				'label'        => esc_html__( 'Profile Dropdown', 'wbcom-essential' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
				'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
				'return_value' => 'inline-block',
				'default'      => 'inline-block',
				'selectors'    => array(
					'{{WRAPPER}} .user-wrap' => 'display: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'element_separator',
			array(
				'label'        => esc_html__( 'Separator', 'wbcom-essential' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
				'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
				'return_value' => 'inline-block',
				'default'      => 'inline-block',
				'selectors'    => array(
					'{{WRAPPER}} .wbcom-essential-separator' => 'display: {{VALUE}};',
				),
			)
		);

		
		$this->add_control(
			'search_icon_switch',
			array(
				'label'        => esc_html__( 'Search', 'wbcom-essential' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
				'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
				'return_value' => 'flex',
				'default'      => 'flex',
				'selectors'    => array(
					'{{WRAPPER}} .header-search-link' => 'display: {{VALUE}};',
				),
			)
		);
		

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'messages' ) ) :
			$this->add_control(
				'messages_icon_switch',
				array(
					'label'        => esc_html__( 'Messages', 'wbcom-essential' ),
					'type'         => Controls_Manager::SWITCHER,
					'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
					'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
					'return_value' => 'inline-block',
					'default'      => 'inline-block',
					'selectors'    => array(
						'{{WRAPPER}} #header-messages-dropdown-elem' => 'display: {{VALUE}};',
					),
				)
			);
		endif;

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' )  ) :
			$this->add_control(
				'notifications_icon_switch',
				array(
					'label'        => esc_html__( 'Notifications', 'wbcom-essential' ),
					'type'         => Controls_Manager::SWITCHER,
					'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
					'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
					'return_value' => 'inline-block',
					'default'      => 'inline-block',
					'selectors'    => array(
						'{{WRAPPER}} #header-notifications-dropdown-elem' => 'display: {{VALUE}};',
					),
				)
			);
		endif;

		if ( class_exists( 'WooCommerce' )  ) :
			$this->add_control(
				'cart_icon_switch',
				array(
					'label'        => esc_html__( 'Cart', 'wbcom-essential' ),
					'type'         => Controls_Manager::SWITCHER,
					'label_on'     => esc_html__( 'On', 'wbcom-essential' ),
					'label_off'    => esc_html__( 'Off', 'wbcom-essential' ),
					'return_value' => 'inline-block',
					'default'      => 'inline-block',
					'selectors'    => array(
						'{{WRAPPER}} .header-cart-link-wrap' => 'display: {{VALUE}};',
					),
				)
			);
		endif;



		$this->end_controls_section();

		$this->start_controls_section(
			'section_icons',
			array(
				'label' => __( 'Icons', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'search_icon',
			array(
				'label'                  => esc_html__( 'Search Icon', 'wbcom-essential' ),
				'description'            => esc_html__( 'Replace default search icon with one of your choice.', 'wbcom-essential' ),
				'type'                   => \Elementor\Controls_Manager::ICONS,
				'skin'                   => 'inline',
				'exclude_inline_options' => array(
					'svg',
				),
			)
		);

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'messages' ) ) :
			$this->add_control(
				'messages_icon',
				array(
					'label'                  => esc_html__( 'Messages Icon', 'wbcom-essential' ),
					'description'            => esc_html__( 'Replace default messages icon with one of your choice.', 'wbcom-essential' ),
					'type'                   => \Elementor\Controls_Manager::ICONS,
					'skin'                   => 'inline',
					'exclude_inline_options' => array(
						'svg',
					),
				)
			);
		endif;

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' ) ) :
			$this->add_control(
				'notifications_icon',
				array(
					'label'                  => esc_html__( 'Notifications Icon', 'wbcom-essential' ),
					'description'            => esc_html__( 'Replace default notifications icon with one of your choice.', 'wbcom-essential' ),
					'type'                   => \Elementor\Controls_Manager::ICONS,
					'skin'                   => 'inline',
					'exclude_inline_options' => array(
						'svg',
					),
				)
			);
		endif;

		if ( class_exists( 'WooCommerce' ) ) :
			$this->add_control(
				'cart_icon',
				array(
					'label'                  => esc_html__( 'Cart Icon', 'wbcom-essential' ),
					'description'            => esc_html__( 'Replace default cart icon with one of your choice.', 'wbcom-essential' ),
					'type'                   => \Elementor\Controls_Manager::ICONS,
					'skin'                   => 'inline',
					'exclude_inline_options' => array(
						'svg',
					),
				)
			);
		endif;

		if ( class_exists( 'SFWD_LMS' ) ) :
			$this->add_control(
				'dark_icon',
				array(
					'label'                  => esc_html__( 'Dark Mode Icon', 'wbcom-essential' ),
					'description'            => esc_html__( 'Replace default dark mode icon with one of your choice.', 'wbcom-essential' ),
					'type'                   => \Elementor\Controls_Manager::ICONS,
					'skin'                   => 'inline',
					'exclude_inline_options' => array(
						'svg',
					),
				)
			);

			$this->add_control(
				'sidebartoggle_icon',
				array(
					'label'                  => esc_html__( 'Toggle Sidebar Icon', 'wbcom-essential' ),
					'description'            => esc_html__( 'Replace default toggle sidebar icon with one of your choice.', 'wbcom-essential' ),
					'type'                   => \Elementor\Controls_Manager::ICONS,
					'skin'                   => 'inline',
					'exclude_inline_options' => array(
						'svg',
					),
				)
			);
		endif;

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_nav',
			array(
				'label'     => __( 'Navigation', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'switch_nav' => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_nav',
				'label'    => esc_html__( 'Typography', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .primary-menu > li > a',
			)
		);

		$this->start_controls_tabs(
			'nav_color_tabs'
		);

		$this->start_controls_tab(
			'nav_color_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'nav_item_color',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .primary-menu > li > a' => 'color: {{VALUE}}',
					'{{WRAPPER}} .primary-menu > .menu-item-has-children:not(.hideshow):after' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'nav_color_active_tab',
			array(
				'label' => esc_html__( 'Active', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'nav_item_color_active',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .primary-menu > .current-menu-item > a' => 'color: {{VALUE}}',
					'{{WRAPPER}} .primary-menu .current_page_item > a'   => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'nav_color_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'nav_item_color_hover',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .primary-menu > li > a:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'sub_menu',
			array(
				'label'     => esc_html__( 'Sub Menu', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_sub_nav',
				'label'    => esc_html__( 'Typography', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .site-header .main-navigation .sub-menu a',
			)
		);

		$this->start_controls_tabs(
			'sub_nav_color_tabs'
		);

		$this->start_controls_tab(
			'sub_nav_color_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'sub_nav_item_color',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header .main-navigation .sub-menu a' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'sub_nav_color_active_tab',
			array(
				'label' => esc_html__( 'Active', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'sub_nav_item_color_active',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header .sub-menu .main-navigation .current-menu-item > a' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'sub_nav_color_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'sub_nav_item_color_hover',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header .main-navigation .sub-menu a:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_layout',
			array(
				'label'     => esc_html__( 'Header Bar Layout', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'switch_bar' => 'yes',
				),
			)
		);

		$this->add_control(
			'content_align',
			array(
				'label'     => esc_html__( 'Alignment', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array(
						'title' => esc_html__( 'Left', 'wbcom-essential' ),
						'icon'  => 'fa fa-align-left',
					),
					'center' => array(
						'title' => esc_html__( 'Center', 'wbcom-essential' ),
						'icon'  => 'fa fa-align-center',
					),
					'right'  => array(
						'title' => esc_html__( 'Right', 'wbcom-essential' ),
						'icon'  => 'fa fa-align-right',
					),
				),
				'default'   => 'right',
				'toggle'    => true,
				'condition' => array(
					'switch_logo!' => 'yes',
					'switch_nav!'  => 'yes',
				),
			)
		);

		$this->add_control(
			'space_between',
			array(
				'label'      => esc_html__( 'Space Between', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 5,
						'max'  => 50,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 10,
				),
				'selectors'  => array(
					'{{WRAPPER}} .header-aside-inner > *:not(.wbcom-essential-separator)' => 'padding: 0 {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #header-messages-dropdown-elem'             => 'padding: 0 {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} #header-notifications-dropdown-elem'        => 'padding: 0 {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'separator',
			array(
				'label'     => esc_html__( 'Separator', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'separator_width',
			array(
				'label'      => esc_html__( 'Separator Width', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 1,
						'max'  => 10,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 1,
				),
				'selectors'  => array(
					'{{WRAPPER}} .wbcom-essential-separator' => 'width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'separator_color',
			array(
				'label'     => esc_html__( 'Separator Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => 'rgba(0, 0, 0, 0.1)',
				'selectors' => array(
					'{{WRAPPER}} .wbcom-essential-separator' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'tooltips_options',
			array(
				'label'     => esc_html__( 'Tooltips', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_tooltips',
				'label'    => esc_html__( 'Typography Tooltips', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} [data-balloon]:after',
			)
		);

		$this->add_control(
			'counter_options',
			array(
				'label'     => esc_html__( 'Counter', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'count_bgcolor',
			array(
				'label'     => esc_html__( 'Counter Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#EF3E46',
				'selectors' => array(
					'{{WRAPPER}} .notification-wrap span.count' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'counter_shadow',
				'label'    => esc_html__( 'Counter Shadow', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .notification-wrap span.count',
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_icons',
			array(
				'label'     => esc_html__( 'Icons', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'switch_bar' => 'yes',
				),
			)
		);

		$this->add_control(
			'icons_size',
			array(
				'label'      => esc_html__( 'Icons Size', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 15,
						'max'  => 40,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 21,
				),
				'selectors'  => array(
					'{{WRAPPER}} .header-aside .header-search-link i'                => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .header-aside .messages-wrap > a i'                 => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .header-aside span[data-balloon="Notifications"] i' => 'font-size: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .header-aside a.header-cart-link i'                 => 'font-size: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			array(
				'name'     => 'icons_shadow',
				'label'    => esc_html__( 'Icons Shadow', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .header-aside i:not(.wbcom-essential-icon-angle-down)',
			)
		);

		$this->add_control(
			'separator_icons',
			array(
				'label'     => esc_html__( 'Icons Colors', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'icons_color',
			array(
				'label'     => esc_html__( 'All Icons', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#939597',
				'selectors' => array(
					'{{WRAPPER}} #header-aside.header-aside .header-search-link i'                => 'color: {{VALUE}}',
					'{{WRAPPER}} #header-aside.header-aside .messages-wrap > a i'                 => 'color: {{VALUE}}',
					'{{WRAPPER}} #header-aside.header-aside span[data-balloon="Notifications"] i' => 'color: {{VALUE}}',
					'{{WRAPPER}} #header-aside.header-aside a.header-cart-link i'                 => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'search_icon_color',
			array(
				'label'     => esc_html__( 'Search Icon', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .header-aside .header-search-link i' => 'color: {{VALUE}} !important',
				),
			)
		);

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'messages' ) ) :
			$this->add_control(
				'messages_icon_color',
				array(
					'label'     => esc_html__( 'Messages Icon', 'wbcom-essential' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .header-aside .messages-wrap > a i' => 'color: {{VALUE}} !important',
					),
				)
			);
		endif;

		if ( function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' ) ) :
			$this->add_control(
				'notifications_icon_color',
				array(
					'label'     => esc_html__( 'Notifications Icon', 'wbcom-essential' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .header-aside span[data-balloon="Notifications"] i' => 'color: {{VALUE}} !important',
					),
				)
			);
		endif;

		if ( class_exists( 'WooCommerce' ) ) :
			$this->add_control(
				'cart_icon_color',
				array(
					'label'     => esc_html__( 'Cart Icon', 'wbcom-essential' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .header-aside a.header-cart-link i' => 'color: {{VALUE}} !important',
					),
				)
			);
		endif;

		if ( class_exists( 'SFWD_LMS' ) ) :
			$this->add_control(
				'dark_icon_color',
				array(
					'label'     => esc_html__( 'Dark Icon', 'wbcom-essential' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .header-aside a#wbcom-essential-toggle-theme i' => 'color: {{VALUE}} !important',
					),
				)
			);

			$this->add_control(
				'sidebartoggle_icon_color',
				array(
					'label'     => esc_html__( 'Sidebar Toggle Icon', 'wbcom-essential' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .header-aside a.course-toggle-view i' => 'color: {{VALUE}} !important',
					),
				)
			);
		endif;

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_profile',
			array(
				'label'     => esc_html__( 'Profile Navigation', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'switch_bar' => 'yes',
				),
			)
		);

		$this->add_control(
			'separator_user_name',
			array(
				'label'     => esc_html__( 'Display Name', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_user_link',
				'label'    => esc_html__( 'Typography Display Name', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .site-header--elementor .user-wrap a span.user-name',
			)
		);

		$this->start_controls_tabs(
			'color_name_tabs'
		);

		$this->start_controls_tab(
			'color_name_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'user_name_item_color',
			array(
				'label'     => esc_html__( 'Display Name Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .user-wrap > a.user-link span.user-name'  => 'color: {{VALUE}}',
					'{{WRAPPER}} .site-header--elementor #header-aside .user-wrap > a.user-link i' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'color_name_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'user_name_item_color_hover',
			array(
				'label'     => esc_html__( 'Display Name Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#007CFF',
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .user-wrap > a.user-link:hover span.user-name'  => 'color: {{VALUE}}',
					'{{WRAPPER}} .site-header--elementor #header-aside .user-wrap > a.user-link:hover i' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'separator_avatar',
			array(
				'label'     => esc_html__( 'Avatar', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'avatar_size',
			array(
				'label'      => esc_html__( 'Width', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 25,
						'max'  => 50,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 36,
				),
				'selectors'  => array(
					'{{WRAPPER}} .user-link img' => 'max-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'avatar_border_style',
			array(
				'label'   => esc_html__( 'Border Style', 'wbcom-essential' ),
				'type'    => \Elementor\Controls_Manager::SELECT,
				'default' => 'none',
				'options' => array(
					'solid'  => __( 'Solid', 'wbcom-essential' ),
					'dashed' => __( 'Dashed', 'wbcom-essential' ),
					'dotted' => __( 'Dotted', 'wbcom-essential' ),
					'double' => __( 'Double', 'wbcom-essential' ),
					'none'   => __( 'None', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'avatar_border_width',
			array(
				'label'      => esc_html__( 'Border Width', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'min'  => 1,
						'max'  => 5,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 1,
				),
				'selectors'  => array(
					'{{WRAPPER}} .user-link img' => 'border-width: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'avatar_border_color',
			array(
				'label'     => esc_html__( 'Border Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#939597',
				'selectors' => array(
					'{{WRAPPER}} .user-link img' => 'border-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'avatar_border_radius',
			array(
				'label'      => esc_html__( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( '%' ),
				'range'      => array(
					'%' => array(
						'min'  => 0,
						'max'  => 50,
						'step' => 1,
					),
				),
				'default'    => array(
					'unit' => '%',
					'size' => 50,
				),
				'selectors'  => array(
					'{{WRAPPER}} .user-link img' => 'border-radius: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'separator_dropdown',
			array(
				'label'     => esc_html__( 'Dropdown', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_control(
			'separator_dropdown_user_name',
			array(
				'label'     => esc_html__( 'Display Name', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->start_controls_tabs(
			'color_dropdown_name_tabs'
		);

		$this->start_controls_tab(
			'color_dropdown_name_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'dropdown_user_name_item_color',
			array(
				'label'     => esc_html__( 'Display Name Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#122b46',
				'selectors' => array(
					'{{WRAPPER}}  .site-header--elementor .user-wrap .sub-menu a.user-link span.user-name' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'color_dropdown_name_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'dropdown_user_name_item_color_hover',
			array(
				'label'     => esc_html__( 'Display Name Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#007CFF',
				'selectors' => array(
					'{{WRAPPER}}  .site-header--elementor .user-wrap .sub-menu a.user-link:hover span.user-name' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_menu',
				'label'    => esc_html__( 'Typography Menu', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .site-header--elementor .sub-menu a:not(.user-link), {{WRAPPER}} .site-header--elementor .sub-menu a span.user-mention',
			)
		);

		$this->add_control(
			'dropdown_bgcolor',
			array(
				'label'     => esc_html__( 'Dropdown Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .site-header .sub-menu' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .user-wrap-container > .sub-menu:before' => 'border-color: {{VALUE}} {{VALUE}} transparent transparent',
					'{{WRAPPER}} .header-aside .wrapper li .wrapper' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .user-wrap-container .sub-menu .ab-sub-wrapper .ab-submenu' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .header-aside .wrapper li .wrapper:before' => 'background: {{VALUE}}',
				),
			)
		);

		$this->start_controls_tabs(
			'dropdown_menu_tabs'
		);

		$this->start_controls_tab(
			'dropdown_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'dropdown_menu_item_bgcolor',
			array(
				'label'     => esc_html__( 'Menu Item Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => 'transparent',
				'selectors' => array(
					'{{WRAPPER}} .site-header .header-aside .sub-menu a' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .site-header .sub-menu .ab-submenu a'   => 'background-color: transparent',
				),
			)
		);

		$this->add_control(
			'dropdown_menu_item_color',
			array(
				'label'     => esc_html__( 'Menu Item Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#939597',
				'selectors' => array(
					'{{WRAPPER}} .site-header .header-aside .sub-menu a'               => 'color: {{VALUE}}',
					'{{WRAPPER}} .site-header .header-aside .sub-menu a .user-mention' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'dropdown_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'dropdown_menu_item_bgcolor_hover',
			array(
				'label'     => esc_html__( 'Menu Item Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#ffffff',
				'selectors' => array(
					'{{WRAPPER}} .site-header .header-aside .sub-menu a:hover' => 'background-color: {{VALUE}}',
					'{{WRAPPER}} .site-header .sub-menu .ab-submenu a:hover'   => 'background-color: transparent',
				),
			)
		);

		$this->add_control(
			'dropdown_menu_item_color_hover',
			array(
				'label'     => esc_html__( 'Menu Item Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#939597',
				'selectors' => array(
					'{{WRAPPER}} .site-header .header-aside .sub-menu a:hover'               => 'color: {{VALUE}}',
					'{{WRAPPER}} .site-header .header-aside .sub-menu a:hover .user-mention' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_signout',
			array(
				'label'     => esc_html__( 'Logged Out', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'switch_bar' => 'yes',
				),
			)
		);

		$this->add_control(
			'separator_sign_in',
			array(
				'label'     => esc_html__( 'Sign In', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_sign_in',
				'label'    => esc_html__( 'Typography Sign In', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.signin-button',
			)
		);

		$this->start_controls_tabs(
			'color_signin_tabs'
		);

		$this->start_controls_tab(
			'color_signin_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'signin_item_color',
			array(
				'label'     => esc_html__( 'Sign In Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}}  .site-header--elementor .wbcom-essential-header-buttons a.signin-button' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'color_signin_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'signin_item_color_hover',
			array(
				'label'     => esc_html__( 'Sign In Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}}  .site-header--elementor .wbcom-essential-header-buttons a.signin-button:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'separator_sign_up',
			array(
				'label'     => esc_html__( 'Sign Up', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_sign_up',
				'label'    => esc_html__( 'Typography Sign Up', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup',
			)
		);

		$this->start_controls_tabs(
			'color_signup_tabs'
		);

		$this->start_controls_tab(
			'color_signup_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'signup_item_color',
			array(
				'label'     => esc_html__( 'Sign Up Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'signup_item_bgr_color',
			array(
				'label'     => esc_html__( 'Sign Up Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'color_signup_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'signup_item_color_hover',
			array(
				'label'     => esc_html__( 'Sign Up Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'signup_item_bgr_color_hover',
			array(
				'label'     => esc_html__( 'Sign Up Background Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup:hover' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'        => 'signup_border',
				'label'       => esc_html__( 'Border', 'wbcom-essential' ),
				'placeholder' => '1px',
				'default'     => '1px',
				'selector'    => '{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup',
				'separator'   => 'before',
			)
		);

		$this->add_control(
			'signup_border_radius',
			array(
				'label'      => esc_html__( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .site-header--elementor .wbcom-essential-header-buttons a.singup' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();

	}
	
	
	protected function render() {
		$settings = $this->get_settings();
		
		$template_path = WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH . '/Buddypress/header-bar/templates/header-bar-template.php';

		if ( file_exists( $template_path ) ) {
			require $template_path;
		}

	}
	
}