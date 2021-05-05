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


class MemeberCarousel extends \Elementor\Widget_Base {

	public function get_name() {
		return 'wbcom-members-carousel';
	}

	public function get_title() {
		return esc_html__( 'Members Carousel', 'stax-buddy-builder' );
	}

	public function get_icon() {
		return 'eicon-slideshow';
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}

	protected function _register_controls() {

		do_action( 'wbcom_essential/widget/members-listing/settings', $this );

		$this->start_controls_section(
			'section_members_carousel',
			array(
				'label' => __( 'Settings', 'stax-buddy-builder' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'full-width',
			array(
				'label'        => __( 'Carousel Style', 'wbcom-essential' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_off'    => esc_html__( 'Boxed', 'wbcom-essential' ),
				'label_on'     => esc_html__( 'Full-Width', 'wbcom-essential' ),
				'default'      => '',
				'return_value' => '1',
				'description'  => esc_html__( 'Enable Full width Carousel', 'wbcom-essential' ),
			)
		);

			$this->add_control(
				'type',
				array(
					'label'   => esc_html__( 'Sort', 'wbcom-essential' ),
					'type'    => Controls_Manager::SELECT,
					'default' => 'newest',
					'options' => array(
						'newest'  => esc_html__( 'Newest', 'wbcom-essential' ),
						'active'  => esc_html__( 'Most Active', 'wbcom-essential' ),
						'popular' => esc_html__( 'Most Popular', 'wbcom-essential' ),
					),
				)
			);

			$this->add_control(
				'total',
				array(
					'label'       => __( 'Total members', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => '12',
					'placeholder' => __( 'Total members', 'wbcom-essential' ),
				)
			);

			$this->add_control(
				'scroll',
				array(
					'label'       => __( 'Members to scroll', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 2,
					'placeholder' => '',
				)
			);

			$this->add_control(
				'visible-lg',
				array(
					'label'       => __( 'Visible members - Large Desktop', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 5,
					'placeholder' => '',
				)
			);

			$this->add_control(
				'visible-dd',
				array(
					'label'       => __( 'Visible members - Desktop', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 4,
					'placeholder' => '',
				)
			);

			$this->add_control(
				'visible-md',
				array(
					'label'       => __( 'Visible members - Tablet', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 3,
					'placeholder' => '',
				)
			);

			$this->add_control(
				'visible-sm',
				array(
					'label'       => __( 'Visible members - Mobile', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 2,
					'placeholder' => '',
				)
			);

			$this->add_control(
				'visible-xs',
				array(
					'label'       => __( 'Visible members - Small Mobile', 'wbcom-essential' ),
					'type'        => Controls_Manager::NUMBER,
					'default'     => 2,
					'placeholder' => '',
				)
			);

		$this->end_controls_section();

		do_action( 'reign_wp_menu_elementor_controls', $this );

	}

	protected function render() {
		parent::render();
		$settings = $this->get_settings_for_display();

		$current_component = static function () {
			return 'members';
		};

		// add_filter( 'bp_current_component', $current_component );

		apply_filters( 'wbcom_essential/members-carousel/before/template', $settings );

		$this->add_render_attribute(
			'wrapper',
			array(
				'class' => 'wbcom-sh-carousel',
			)
		);

		if ( 1 === $settings['full-width'] ) {
			$this->add_render_attribute(
				'wrapper',
				array(
					'class' => 'wbcom-sh-carousel-full',
				)
			);
		}

		$query_string = '&type=' . $settings['type'] . '&per_page=' . $settings['total'] . '&max=' . $settings['total'];
		if ( isset( $tab['field_id'] ) && isset( $tab['field_value'] ) && ! empty( $tab['field_id'] ) && ! empty( $tab['field_value'] ) ) {
			$query_string .= wbcom_bp_custom_ids( $tab['field_id'], $tab['field_value'] );
		}

		wbcom_essential_get_template(
			'members-carousel.php',
			array(
				'rand'         => mt_rand( 99, 999 ),
				'query_string' => $query_string,
				'settings'     => $settings,
			),
			'reign/buddypress'
		);
		// remove_filter( 'bp_nouveau_get_loop_classes', $loop_classes );
		// remove_filter( 'bp_current_component', $current_component );

		apply_filters( 'wbcom_essential/members-loop/after/template', $settings );
	}

}
