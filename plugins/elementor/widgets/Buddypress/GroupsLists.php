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

class GroupsLists extends \Elementor\Widget_Base {

	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );
		
		wp_register_style( 'groups-lists', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/css/groups-lists.css', array(), '3.5.0' );
		wp_register_script( 'groups-lists', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/js/groups-lists.js', array( 'elementor-frontend' ), '3.0.0', true );
	}

	public function get_name() {
		return 'wbcom-groups-lists';
	}

	public function get_title() {
		return esc_html__( 'Groups Lists', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-toggle';
	}
	
	public function get_style_depends() {
		return array( 'groups-lists' );
	}
	
	public function get_script_depends() {
		return array( 'groups-lists' );
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}
	
	protected function _register_controls() {
		$this->start_controls_section(
			'section_content_layout',
			[
				'label' => esc_html__( 'Layout', 'wbcom-essential' ),
			]
		);

		$this->add_control(
			'groups_order',
			[
				'label'   => esc_html__( 'Default Groups Order', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'active',
				'options' => [
					'newest'  => esc_html__( 'Newest', 'wbcom-essential' ),
					'popular' => esc_html__( 'Popular', 'wbcom-essential' ),
					'active'  => esc_html__( 'Active', 'wbcom-essential' ),
				],
			]
		);

		
		$this->add_control(
			'group_types', array(
			'label'    => esc_html__( 'Group Types', 'wbcom-essential' ),
			'type'     => \Elementor\Controls_Manager::SELECT2,
			'multiple' => true,
			'options'  => $this->wbcom_essential_elementor_group_types(),
		) );
		

		$this->add_control(
			'groups_count',
			[
				'label'   => esc_html__( 'Groups Count', 'wbcom-essential' ),
				'type'    => Controls_Manager::SLIDER,
				'default' => [
					'size' => 5,
				],
				'range'   => [
					'px' => [
						'min'  => 1,
						'max'  => 20,
						'step' => 1,
					],
				],
			]
		);

		$this->add_control(
			'switch_more',
			[
				'label'   => esc_html__( 'Show All Groups Link', 'wbcom-essential' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'switch_filter',
			[
				'label'   => esc_html__( 'Show Filter Types', 'wbcom-essential' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'switch_avatar',
			[
				'label'   => esc_html__( 'Show Avatar', 'wbcom-essential' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->add_control(
			'switch_meta',
			[
				'label'   => esc_html__( 'Show Meta Data', 'wbcom-essential' ),
				'type'    => Controls_Manager::SWITCHER,
				'default' => 'yes',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_content',
			[
				'label' => esc_html__( 'Content', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_control(
			'heading_text',
			[
				'label'       => esc_html__( 'Heading Text', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,
				'dynamic'     => [
					'active' => true,
				],
				'default'     => esc_html__( 'Groups', 'wbcom-essential' ),
				'placeholder' => esc_html__( 'Enter heading text', 'wbcom-essential' ),
				'label_block' => true
			]
		);

		$this->add_control(
			'groups_link_text',
			[
				'label'       => esc_html__( 'Groups Link Text', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,
				'dynamic'     => [
					'active' => true,
				],
				'default'     => esc_html__( 'All Groups', 'wbcom-essential' ),
				'placeholder' => esc_html__( 'Enter groups link text', 'wbcom-essential' ),
				'label_block' => true,
				'condition'   => [
					'switch_more' => 'yes',
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_box',
			[
				'label' => esc_html__( 'Box', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'box_border',
				'label'       => esc_html__( 'Border', 'wbcom-essential' ),
				'placeholder' => '1px',
				'default'     => '1px',
				'selector'    => '{{WRAPPER}} .wbcom-essential-groups',
				'separator'   => 'before',
			]
		);

		$this->add_control(
			'box_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'default'    => [
					'top'    => '4',
					'right'  => '4',
					'bottom' => '4',
					'left'   => '4',
				],
				'selectors'  => [
					'{{WRAPPER}} .wbcom-essential-groups' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			\Elementor\Group_Control_Background::get_type(),
			[
				'name'     => 'background_color',
				'label'    => esc_html__( 'Background', 'wbcom-essential' ),
				'types'    => [ 'classic', 'gradient' ],
				'selector' => '{{WRAPPER}} .wbcom-essential-groups',
			]
		);

		$this->add_control(
			'separator_all',
			[
				'label'     => esc_html__( 'All Groups Link', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'extra_color',
			[
				'label'     => esc_html__( 'All Groupss Link Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .wbcom-essential-block-header__extra a' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_avatar',
			[
				'label'     => esc_html__( 'Avatar', 'wbcom-essential' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'switch_avatar' => 'yes',
				],
			]
		);

		$this->add_control(
			'avatar_width',
			[
				'label'     => esc_html__( 'Size', 'wbcom-essential' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 40,
				],
				'range'     => [
					'px' => [
						'min'  => 20,
						'max'  => 200,
						'step' => 1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #groups-list .item-avatar' => 'flex: 0 0 {{SIZE}}px;',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'avatar_shadow',
				'label'    => esc_html__( 'Shadow', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} #groups-list .item-avatar a',
			)
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'avatar_border',
				'label'       => esc_html__( 'Border', 'wbcom-essential' ),
				'placeholder' => '1px',
				'default'     => '1px',
				'selector'    => '{{WRAPPER}} #groups-list .item-avatar img',
				'separator'   => 'before',
			]
		);

		$this->add_control(
			'avatar_border_radius',
			[
				'label'      => esc_html__( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} #groups-list .item-avatar img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'avatar_opacity',
			[
				'label'     => esc_html__( 'Opacity (%)', 'wbcom-essential' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 1,
				],
				'range'     => [
					'px' => [
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #groups-list .item-avatar img' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_control(
			'avatar_spacing',
			[
				'label'     => esc_html__( 'Spacing', 'wbcom-essential' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'size' => 15,
				],
				'range'     => [
					'px' => [
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} #groups-list .item-avatar' => 'margin-right: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_content',
			[
				'label' => esc_html__( 'Content', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_title',
				'label'    => esc_html__( 'Typography Title', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} #groups-list .item-title a',
			)
		);

		$this->add_control(
			'title_item_color',
			array(
				'label'     => esc_html__( 'Title Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} #groups-list .item-title a' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_meta',
				'label'    => esc_html__( 'Typography Meta Data', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} #groups-list span.activity',
			)
		);

		$this->add_control(
			'meta_item_color',
			array(
				'label'     => esc_html__( 'Meta Data Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} #groups-list span.activity' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'separator_filter_types',
			[
				'label'     => esc_html__( 'Filter Types', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'filter_border',
				'label'       => esc_html__( 'Border', 'wbcom-essential' ),
				'placeholder' => '1px',
				'default'     => '1px',
				'selector'    => '{{WRAPPER}} .wbcom-essential-groups div.item-options',
				'separator'   => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'typography_filters',
				'label'    => esc_html__( 'Typography', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} div.item-options a',
			)
		);

		$this->start_controls_tabs(
			'filter_tabs'
		);

		$this->start_controls_tab(
			'filter_normal_tab',
			array(
				'label' => esc_html__( 'Normal', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'filter_normal_color',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.item-options a:not(.selected)' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'filter_active_tab',
			array(
				'label' => esc_html__( 'Active', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'filter_active_color',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.item-options .selected' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'filter_active_border',
			array(
				'label'     => esc_html__( 'Border Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.item-options .selected' => 'border-bottom-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'filter_hover_tab',
			array(
				'label' => esc_html__( 'Hover', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'filter_hover_color',
			array(
				'label'     => esc_html__( 'Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} div.item-options a:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}
	
	public function wbcom_essential_elementor_group_types() {

		$group_types      = bp_groups_get_group_types( array(), 'objects' );
		$group_types_data = array();
		foreach ( $group_types as $group_type ) :
			if ( ! empty( $group_type->name ) ) {
				$group_types_data[ $group_type->name ] = $group_type->labels['singular_name'];
			}
		endforeach;

		return $group_types_data;

	}

	
	
	protected function render() {		
		
		$settings = $this->get_settings_for_display();
		$type     = $settings['groups_order'];
		$user_id  = apply_filters( 'bp_group_widget_user_id', '0' );
		
		?>
		<div class="wbcom-essential-groups">

			<?php if ( ('' != $settings['groups_link_text']) || ('' != $settings['heading_text']) ) { ?>
				<div class="wbcom-essential-block-header flex align-items-center">
					<div class="wbcom-essential-block-header__title"><h3><?php echo esc_html( $settings['heading_text'] ); ?></h3></div>
					<?php if ( $settings['switch_more'] ) : ?>
						<div class="wbcom-essential-block-header__extra push-right">
							<?php if ( '' != $settings['groups_link_text'] ) { ?>
								<a href="<?php bp_groups_directory_permalink(); ?>"
								class="count-more"><?php echo esc_html( $settings['groups_link_text'] ); ?><i
											class="eicon-chevron-right"></i></a>
							<?php } ?>
						</div>
					<?php endif; ?>
				</div>
			<?php } ?>

			<?php $groups_filter = array(
				'active'  => esc_html__( 'active', 'wbcom-essential' ),
				'popular' => esc_html__( 'popular', 'wbcom-essential' ),
				'newest'  => esc_html__( 'newest', 'wbcom-essential' ),
			); ?>

			<?php if ( $settings['switch_filter'] ) : ?>
				<div class="item-options">
					<?php foreach ( $groups_filter as $k => $gtype ) { ?>
						<a href="#" id="wbcom-essential-<?php echo esc_attr( $k ); ?>-groups"
						   class="wbcom-essential-groups__tab <?php echo $k == $type ? esc_attr( 'selected' ) : ''; ?>"
						   data-type="<?php echo esc_attr( $k ); ?>"><?php echo esc_html( $gtype ); ?></a>
					<?php } ?>
				</div>
			<?php endif; ?>

			<div class="bbel-list-flow">

				<?php foreach ( $groups_filter as $k => $gtype ) {
					$group_args = array(
						'user_id'    => $user_id,
						'type'       => esc_attr( $k ),
						'per_page'   => esc_attr( $settings['groups_count']['size'] ),
						'max'        => esc_attr( $settings['groups_count']['size'] ),
						'group_type' => ! empty( $settings['group_types'] ) ? $settings['group_types'] : 0,
					);
					?>

					<?php if ( bp_has_groups( $group_args ) ) : ?>

						<div class="wbcom-essential-groups-list wbcom-essential-groups-list--<?php echo esc_attr( $k ); ?> <?php echo $k == $type ? esc_attr( 'active' ) : ''; ?>">

							<ul id="groups-list" class="item-list" aria-live="polite" aria-relevant="all" aria-atomic="true">
								<?php
								while ( bp_groups() ) :
									bp_the_group();
									?>
									<li <?php bp_group_class(); ?>>
										<?php if ( $settings['switch_avatar'] ) : ?>
											<div class="item-avatar">
												<a href="<?php bp_group_permalink(); ?>"><?php bp_group_avatar_thumb(); ?></a>
											</div>
										<?php endif; ?>

										<div class="item">
											<div class="item-title"><?php bp_group_link(); ?></div>
											<?php if ( $settings['switch_meta'] ) : ?>
												<div class="item-meta">
													<span class="activity">
													<?php
													if ( 'newest' == $k ) {
														printf( esc_html__( 'created %s', 'wbcom-essential' ), bp_get_group_date_created() );
													} elseif ( 'popular' == $k ) {
														bp_group_member_count();
													} else {
														printf( esc_html__( 'active %s', 'wbcom-essential' ), bp_get_group_last_active() );
													}
													?>
													</span>
												</div>
											<?php endif; ?>
										</div>
									</li>

								<?php endwhile; ?>
							</ul>

						</div>

					<?php else : ?>

						<div class="wbcom-essential-groups-list wbcom-essential-groups-list--<?php echo esc_attr( $k ); ?> wbcom-essential-no-data wbcom-essential-no-data--groups <?php echo $k == $type ? esc_attr( 'active' ) : ''; ?>">
							<img class="wbcom-essential-no-data__image"
								 src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/images/svg/dfy-no-data-icon04.svg"
								 alt="Groups"/>
							<div><?php echo esc_html__( 'No groups matched the current filter.', 'wbcom-essential' ); ?></div>
							<a href="<?php echo trailingslashit( bp_get_groups_directory_permalink() . 'create' ); ?>"
							   class="wbcom-essential-no-data__link"><?php echo esc_html__( 'Create a group', 'wbcom-essential' ); ?></a>
						</div>

					<?php endif; ?>

				<?php } ?>

			</div>

		</div>
		<?php
	}

}
