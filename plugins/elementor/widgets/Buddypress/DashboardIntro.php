<?php

namespace WBCOM_ESSENTIAL\ELEMENTOR\Widgets\Buddypress;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

use WBCOM_ESSENTIAL\Plugin;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Schemes;
use Elementor\Group_Control_Typography;

class DashboardIntro extends \Elementor\Widget_Base {

	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );
		
		wp_register_style( 'dashboard-intro', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/css/dashboard-intro.css', array(), '3.5.0' );
	}

	public function get_name() {
		return 'wbcom-dashboard-intro';
	}

	public function get_title() {
		return esc_html__( 'Dashboard Intro', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-icon-box';
	}

	public function get_style_depends() {
		return array( 'dashboard-intro' );
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}
	
	protected function _register_controls() {
		$this->start_controls_section(
			'section_content_content',
			[
				'label'     => esc_html__( 'Content', 'wbcom-essential' ),
			]
		);

		$this->add_responsive_control(
			'layout',
			[
				'label' => __( 'Position', 'wbcom-essential' ),
				'type' => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options' => [
					'left' => [
						'title' => __( 'Left', 'wbcom-essential' ),
						'icon' => 'eicon-h-align-left',
					],
					'above' => [
						'title' => __( 'Above', 'wbcom-essential' ),
						'icon' => 'eicon-v-align-top',
					],
					'right' => [
						'title' => __( 'Right', 'wbcom-essential' ),
						'icon' => 'eicon-h-align-right',
					],
				],
				'prefix_class' => 'elementor-cta-%s-dash-intro-',
			]
		);

		$this->add_control(
			'separator_content',
			[
				'label'     => __( 'Description', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'heading',
			[
				'label' => __( 'Greeting & Description', 'wbcom-essential' ),
				'type' => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
				'default' => __( 'Welcome', 'wbcom-essential' ),
				'placeholder' => __( 'Enter greeting text', 'wbcom-essential' ),
				'label_block' => true,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'description',
			[
				'label' => __( 'Description', 'wbcom-essential' ),
				'type' => Controls_Manager::TEXTAREA,
				'dynamic' => [
					'active' => true,
				],
				'default' => __( 'to your Member Dashboard', 'wbcom-essential' ),
				'placeholder' => __( 'Enter your introductory text', 'wbcom-essential' ),
				'separator' => 'none',
				'rows' => 5,
				'show_label' => false,
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_avatar',
			[
				'label'     => esc_html__( 'Avatar', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'avatar_size',
			[
				'label'     => __( 'Size', 'wbcom-essential' ),
				'type'      => Controls_Manager::SLIDER,
				'default' => [
					'size' => 150,
				],
				'range' => [
					'px' => [
						'min'  => 20,
						'max'  => 200,
						'step' => 1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-dash__avatar' => 'flex: 0 0 {{SIZE}}px;',
					'{{WRAPPER}} .wbcom-essential-dash__avatar img' => 'max-width: {{SIZE}}px; width: {{SIZE}}px;',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'avatar_border',
				'label'       => __( 'Border', 'wbcom-essential' ),
				'placeholder' => '1px',
				'default'     => '1px',
				'selector'    => '{{WRAPPER}} .wbcom-essential-dash__avatar img',
				'separator'   => 'before',
			]
		);

		$this->add_control(
			'avatar_padding',
			[
				'label' => __( 'Padding', 'wbcom-essential' ),
				'type' => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'default' => [
					'top' => '3',
					'right' => '3',
					'bottom' => '3',
					'left' => '3',
					'isLinked' => true,
				],
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-dash__avatar img' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'avatar_border_radius',
			[
				'label'      => __( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ '%', 'px' ],
				'default' => [
					'top' => '4',
					'right' => '4',
					'bottom' => '4',
					'left' => '4',
				],
				'selectors'  => [
					'{{WRAPPER}} .wbcom-essential-dash__avatar img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'avatar_shadow',
				'label'    => __( 'Shadow', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .wbcom-essential-dash__avatar img',
			)
		);

		$this->add_control(
			'avatar_spacing',
			[
				'label' => __( 'Spacing', 'wbcom-essential' ),
				'type'  => Controls_Manager::SLIDER,
				'default' => [
					'size' => 15,
				],
				'range' => [
					'px' => [
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-dash__avatar'  => 'margin-right: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_content',
			[
				'label'     => esc_html__( 'Content', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'greeting_color',
			[
				'label'     => __( 'Greeting Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#122B46',
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-dash__prior' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'info_color',
			[
				'label'     => __( 'Description Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#4D5C6D',
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-dash__brief' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_greeting',
				'label'    => __( 'Typography Greeting', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .wbcom-essential-dash__prior .wbcom-essential-dash__intro',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_name',
				'label'    => __( 'Typography Name', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .wbcom-essential-dash__prior .wbcom-essential-dash__name',
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_info',
				'label'    => __( 'Typography Description', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} .wbcom-essential-dash__brief',
			)
		);

		$this->end_controls_section();
	}
	
	protected function render() {

		$settings = $this->get_settings_for_display();

		$current_user = wp_get_current_user();
		$display_name =  function_exists( 'bp_core_get_user_displayname' ) ? bp_core_get_user_displayname( $current_user->ID ) : $current_user->display_name;

		// IF user not logged in then return and display nothing.
		if ( !is_user_logged_in() ) {
			return;
		}
		?>

		<div class="wbcom-essential-dash">

			<div class="flex align-items-center">
				<div class="wbcom-essential-dash__avatar"><?php echo get_avatar( get_current_user_id() ); ?></div>
				<div class="wbcom-essential-dash__intro">
					<h2 class="wbcom-essential-dash__prior">
						<span class="wbcom-essential-dash__intro"><?php echo $settings['heading']; ?></span>
						<span class="wbcom-essential-dash__name"><?php echo $display_name; ?></span>
					</h2>
					<div class="wbcom-essential-dash__brief"><?php echo $settings['description']; ?></div>
				</div>
			</div>
		
		</div>

		<?php
	}
	
}