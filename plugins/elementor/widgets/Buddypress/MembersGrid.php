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


class MembersGrid extends \Elementor\Widget_Base {

	public function get_name() {
		return 'wbcom-members-grid';
	}

	public function get_title() {
		return esc_html__( 'Members Grid', 'stax-buddy-builder' );
	}

	public function get_icon() {
		return 'eicon-posts-grid';
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}

	protected function _register_controls() {

		do_action( 'wbcom_essential/widget/members-listing/settings', $this );

		$this->start_controls_section(
			'section_content',
			array(
				'label' => __( 'Settings', 'stax-buddy-builder' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_responsive_control(
			'columns',
			array(
				'label'           => __( 'Columns', 'stax-buddy-builder' ),
				'type'            => Controls_Manager::SELECT,
				'options'         => array(
					'1' => __( 'One', 'stax-buddy-builder' ),
					'2' => __( 'Two', 'stax-buddy-builder' ),
					'3' => __( 'Three', 'stax-buddy-builder' ),
					'4' => __( 'Four', 'stax-buddy-builder' ),
				),
				'devices'         => array( 'desktop', 'tablet', 'mobile' ),
				'desktop_default' => '3',
				'tablet_default'  => '2',
				'mobile_default'  => '1',
			)
		);

		$this->add_responsive_control(
			'listing_v_spacing_one',
			array(
				'label'      => __( 'Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .bp-list > li:not(:last-child)' => 'margin-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '1',
				),
			)
		);

		$this->add_responsive_control(
			'listing_v_spacing_two',
			array(
				'label'      => __( 'Vertical Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-two > li' => 'padding-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '2',
				),
			)
		);

		$this->add_responsive_control(
			'listing_h_spacing_two',
			array(
				'label'      => __( 'Horizontal Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 50,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-two'      => 'margin-left: -{{SIZE}}{{UNIT}}; margin-right: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .grid-two > li' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '2',
				),
			)
		);

		$this->add_responsive_control(
			'listing_v_spacing_three',
			array(
				'label'      => __( 'Vertical Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-three > li' => 'padding-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '3',
				),
			)
		);

		$this->add_responsive_control(
			'listing_h_spacing_three',
			array(
				'label'      => __( 'Horizontal Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 75,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-three'      => 'margin-left: -{{SIZE}}{{UNIT}}; margin-right: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .grid-three > li' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '3',
				),
			)
		);

		$this->add_responsive_control(
			'listing_v_spacing_four',
			array(
				'label'      => __( 'Vertical Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 100,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-four > li' => 'padding-bottom: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '4',
				),
			)
		);

		$this->add_responsive_control(
			'listing_h_spacing_four',
			array(
				'label'      => __( 'Horizontal Spacing', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px' ),
				'range'      => array(
					'px' => array(
						'max' => 50,
					),
				),
				'default'    => array(
					'unit' => 'px',
					'size' => 20,
				),
				'selectors'  => array(
					'{{WRAPPER}} .grid-four'      => 'margin-left: -{{SIZE}}{{UNIT}}; margin-right: -{{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .grid-four > li' => 'padding-left: {{SIZE}}{{UNIT}}; padding-right: {{SIZE}}{{UNIT}};',
				),
				'condition'  => array(
					'columns' => '4',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			array(
				'label' => __( 'Listing', 'stax-buddy-builder' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'listing_no_border',
			array(
				'label'     => __( 'View', 'stax-buddy-builder' ),
				'type'      => Controls_Manager::HIDDEN,
				'default'   => '1',
				'selectors' => array(
					'{{WRAPPER}} #members-list' => 'border: 0;',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			array(
				'name'     => 'list_item_background',
				'label'    => __( 'Background', 'stax-buddy-builder' ),
				'types'    => array( 'classic', 'gradient' ),
				'selector' => '{{WRAPPER}} #members-list > li > .list-wrap',
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'listing_box_shadow',
				'selector' => '{{WRAPPER}} #members-list > li > .list-wrap',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name'     => 'listing_border',
				'selector' => '{{WRAPPER}} #members-list > li > .list-wrap',
			)
		);

		$this->add_control(
			'listing_border_radius',
			array(
				'label'      => esc_html__( 'Border Radius', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', '%', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} #members-list > li > .list-wrap' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'listing_margin',
			array(
				'label'      => __( 'Margin', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} #members-list > li > .list-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'listing_padding',
			array(
				'label'      => __( 'Padding', 'stax-buddy-builder' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} #members-list > li > .list-wrap' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->end_controls_section();
	}

	protected function render() {
		parent::render();
		$settings = $this->get_settings_for_display();

		$current_component = static function () {
			return 'members';
		};

		add_filter( 'wbcom_essential/has_template/pre', '__return_true' );

		// $loop_classes = static function () use ( $settings ) {
		// return array(
		// 'item-list',
		// 'members-list',
		// 'bp-list',
		// 'grid',
		// bpb_get_column_class( $settings['columns'] ),
		// bpb_get_column_class( $settings['columns_tablet'], 'tablet' ),
		// bpb_get_column_class( $settings['columns_mobile'], 'mobile' ),
		// );
		// };

		add_filter( 'bp_current_component', $current_component );
		// add_filter( 'bp_nouveau_get_loop_classes', $loop_classes );

		apply_filters( 'wbcom_essential/members-loop/before/template', $settings );

		add_filter( 'bp_members_pagination_count', '__return_zero' );
		add_filter( 'bp_get_members_pagination_links', '__return_zero' );
		?>

		<div id="buddypress" class="buddypress-wrap bp-dir-hori-nav members">
			<?php bp_nouveau_before_members_directory_content(); ?>

			<div class="screen-content">
				<div id="members-dir-list" class="members dir-list" data-bp-list="">
					<?php bp_get_template_part( 'members/members-loop' ); ?>
				</div>

				<?php bp_nouveau_after_members_directory_content(); ?>
			</div>
		</div>

		<?php
		// remove_filter( 'bp_nouveau_get_loop_classes', $loop_classes );
		remove_filter( 'bp_current_component', $current_component );

		apply_filters( 'wbcom_essential/members-loop/after/template', $settings );

		remove_filter( 'bp_members_pagination_count', '__return_zero' );
		remove_filter( 'bp_get_members_pagination_links', '__return_zero' );
		remove_filter( 'wbcom_essential/has_template/pre', '__return_true' );
	}

}
