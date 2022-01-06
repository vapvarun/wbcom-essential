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

class ActivityLists extends \Elementor\Widget_Base {

	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );
	}

	public function get_name() {
		return 'wbcom-activity-lists';
	}

	public function get_title() {
		return esc_html__( 'Activity Lists', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-time-line';
	}

	public function get_categories() {
		return array( 'wbcom-elements' );
	}

	public function is_buddypress_plugin_activate() {
		
		$plugin = 'buddypress/bp-loader.php';
		
		$plugins = get_site_option( 'active_sitewide_plugins' );
		if ( isset( $plugins[ $plugin ] ) ) {
			return true;
		} else {
			return in_array( $plugin, (array) get_option( 'active_plugins', array() ), true ) ;
		}
	}
	
	protected function _register_controls() {
		$this->start_controls_section(
			'section_content',
			[
				'label' => esc_html__( 'Query', 'wbcom-essential' ),
			]
		);
		
		$this->add_control(
			'sfb_title',
			[
				'label'       => __( 'Title', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,				
				'default'     => __( 'Activity', 'wbcom-essential' ),
				'description' => __( 'Add activity title', 'wbcom-essential' )
			]
		);
		
		$this->add_control(
			'sfb_include',
			[
				'label'       => __( 'Activity Include', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,				
				'description' => __( 'pass an activity_id or string of IDs comma-separated', 'wbcom-essential' )
			]
		);
		
		$this->add_control(
			'sfb_exclude',
			[
				'label'       => __( 'Activity exclude', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,				
				'description' => __( 'pass an activity_id or string of IDs comma-separated', 'wbcom-essential' )
			]
		);

		
		
		$this->add_control(
			'sfb_number',
			[
				'label'       => __( 'display number of activities', 'wbcom-essential' ),
				'type'        => Controls_Manager::NUMBER,
				'default'     => 20,
				'description' => __( 'How many activity items to display.', 'wbcom-essential' )
			]
		);

		$this->add_control(
			'sfb_sort',
			[
				'label'   => __( 'Sort order', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'DESC'        => 'Descending',
					'ASC'  		=> 'Ascending',
				],
				'default' => 'DESC'
			]
		);

		$this->add_control(
			'sfb_search_terms',
			[
				'label'       => __( 'Filter by search term', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '',
				'description' => 'Return only activity items that match the search term in content'
			]
		);

		$this->add_control(
			'sfb_object',
			[
				'label'   => __( 'Object Type', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					''        => 'All',
					'groups'  => 'Groups',
					'friends' => 'Friends',
					'profile' => 'Profile',
					'status'  => 'Status',
					'blogs'   => 'Blogs',

				],
				'default' => ''
			]
		);

		$this->add_control(
			'sfb_action',
			[
				'label'       => __( 'Action Filter', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '',
				'description' => 'Example: activity_update<br> See action parameter from the filters section from https://codex.buddypress.org/developer/loops-reference/the-activity-stream-loop/'
			]
		);
		$this->add_control(
			'sfb_hide_load_more',
			[
				'label' 		=> esc_html__( 'Hide load more', 'wbcom-essential' ),				
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'yes',
				'label_on' 		=> esc_html__( 'Show', 'wbcom-essential' ),
				'label_off' 	=> esc_html__( 'Hide', 'wbcom-essential' ),
			]
		);
		
		$this->add_control(
			'sfb_allow_posting',
			[
				'label' 		=> esc_html__( 'Allow Posting', 'wbcom-essential' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'no',
				'label_on' 		=> esc_html__( 'Show', 'wbcom-essential' ),
				'label_off' 	=> esc_html__( 'Hide', 'wbcom-essential' ),
			]
		);
		
		$this->add_control(
			'sfb_loggedin_user_activity',
			[
				'label' 		=> esc_html__( 'Display loggedin user activity', 'wbcom-essential' ),
				'description' 		=> esc_html__( 'Display only particular loggedin user activity', 'wbcom-essential' ),
				'type' 			=> Controls_Manager::SWITCHER,
				'default' 		=> 'no',
				'label_on' 		=> esc_html__( 'Show', 'wbcom-essential' ),
				'label_off' 	=> esc_html__( 'Hide', 'wbcom-essential' ),
			]
		);
		
		$this->end_controls_section();
		
		$this->start_controls_section(
			'activity_item_container_section',
			[
				'label' => __( 'Activity Item Container', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Background::get_type(),
			[
				'name'     => 'container_background',
				'label'    => __( 'Background', 'wbcom-essential' ),
				'types'    => [ 'classic', 'gradient' ],
				'selector' => '{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)',
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'container_box_shadow',
				'selector' => '{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)',
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'     => 'container_border',
				'selector' => '{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)',
			]
		);

		$this->add_control(
			'container_border_radius',
			[
				'label'      => __( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors'  => [
					'{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'container_padding',
			[
				'label'      => __( 'Padding', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'spacing_items',
			[
				'label'     => __( 'Spacing items', 'wbcom-essential' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .activity > ul.activity-list > li:not(.load-more)'            => 'margin-top: 0; margin-bottom: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .activity > ul.activity-list > li:last-child' => 'margin-bottom: 0;',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'load_more_section',
			[
				'label'      => __( 'Load More Button', 'wbcom-essential' ),
				'tab'        => Controls_Manager::TAB_STYLE,
				'conditions' => [],
			]
		);

		$this->add_control(
			'base_style',
			[
				'label'     => __( 'Base Style', 'wbcom-essential' ),
				'type'      => Controls_Manager::HIDDEN,
				'default'   => '1',
				'selectors' => [
					'{{WRAPPER}} .load-more'   => 'background-color: transparent; border: none; margin: 0;',
					'{{WRAPPER}} .load-newest' => 'background-color: transparent; border: none; margin: 0;',
				],
			]
		);

		$this->add_control(
			'load_more_btn_display_type',
			[
				'label'     => __( 'Display', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'block',
				'options'   => [
					'inline-block' => __( 'Inline', 'wbcom-essential' ),
					'block'        => __( 'Block', 'wbcom-essential' ),
				],
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a' => 'display: block;',
				],
			]
		);

		$this->add_responsive_control(
			'load_more_btn_align',
			[
				'label'     => __( 'Alignment', 'wbcom-essential' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => [
					'left'   => [
						'title' => __( 'Left', 'wbcom-essential' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'wbcom-essential' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'wbcom-essential' ),
						'icon'  => 'eicon-text-align-right',
					],
				],
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a' => 'text-align: {{VALUE}};',
				],
				'condition' => [
					'load_more_btn_display_type' => 'inline-block',
				],
				'default'   => '',
			]
		);

		$this->add_control(
			'load_more_btn_display_inline_block',
			[
				'label'     => __( 'Base Style', 'wbcom-essential' ),
				'type'      => Controls_Manager::HIDDEN,
				'default'   => '1',
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a' => 'display: inline-block;',
				],
				'condition' => [
					'load_more_btn_display_type' => 'inline-block',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'load_more_btn_typography',
				'label'    => __( 'Typography', 'wbcom-essential' ),
				'selector' => '{{WRAPPER}} #buddypress .activity-list .load-more a, {{WRAPPER}} .load-newest a',
			]
		);

		$this->start_controls_tabs( 'load_more_btn_style_tabs' );

		$this->start_controls_tab(
			'load_more_btn_style_normal_tab',
			[
				'label' => __( 'Normal', 'wbcom-essential' ),
			]
		);

		$this->add_control(
			'load_more_btn_background',
			[
				'label'     => __( 'Background', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a'   => 'background-color: {{VALUE}}',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'load_more_btn_text_color',
			[
				'label'     => __( 'Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a'   => 'color: {{VALUE}}',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a' => 'color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'load_more_btn_style_hover_tab',
			[
				'label' => __( 'Hover', 'wbcom-essential' ),
			]
		);

		$this->add_control(
			'load_more_btn_hover_background',
			[
				'label'     => __( 'Background', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a:hover'   => 'background-color: {{VALUE}}',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a:hover' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'load_more_btn_hover_text_color',
			[
				'label'     => __( 'Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a:hover'   => 'color: {{VALUE}}',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a:hover' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'load_more_btn_hover_border',
			[
				'label'     => __( 'Border Color', 'wbcom-essential' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a:hover'   => 'border-color: {{VALUE}}',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a:hover' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'load_more_btn_hover_shadow',
				'selector' => '{{WRAPPER}} #buddypress .activity-list .load-more a:hover, #buddypress {{WRAPPER}} .load-newest a:hover',
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'      => 'load_more_btn_border',
				'selector'  => '{{WRAPPER}} #buddypress .activity-list .load-more a, {{WRAPPER}} #buddypress .activity-list .load-newest a',
				'separator' => 'before',
			]
		);

		$this->add_control(
			'load_more_btn_border_radius',
			[
				'label'      => __( 'Border Radius', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em' ],
				'selectors'  => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a'   => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'load_more_btn_shadow',
				'selector' => '{{WRAPPER}} #buddypress .activity-list .load-more a, {{WRAPPER}} #buddypress .activity-list .load-newest a',
			]
		);

		$this->add_responsive_control(
			'load_more_btn_padding',
			[
				'label'      => __( 'Padding', 'wbcom-essential' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} #buddypress .activity-list .load-more a'   => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					'{{WRAPPER}} #buddypress .activity-list .load-newest a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
		
	}
	
	protected function render() {
		global $activity_args;
		
		$settings = $this->get_settings_for_display();
		
		$current_component = static function () {
			return 'activity';
		};
		
		add_filter( 'bp_current_component', $current_component );
		//add_filter( 'bp_is_current_component', $current_component );
		
		$args = [ 
					'title'  => $settings['sfb_title'],
					'include'  => $settings['sfb_include'],
					'exclude'  => $settings['sfb_exclude'],
					'sort'     => $settings['sfb_sort'],
					'per_page' => ( isset($settings['sfb_number']) ) ? $settings['sfb_number'] : 20,
					'search_terms' => $settings['sfb_search_terms'],
					'object' => $settings['sfb_object'],
					'action' => $settings['sfb_action'],
					'allow_posting' => ( $settings['sfb_allow_posting'] == 'yes' ) ? 'true': 'false',
					'user_id' 	=> (is_user_logged_in() && $settings['sfb_loggedin_user_activity'] == 'yes' ) ? get_current_user_id() : false,
					
					'hide_load_more' 	=> (is_user_logged_in() && $settings['sfb_hide_load_more'] == 'yes' ) ? get_current_user_id() : false,
					'display_comments'	=> 'threaded',
					'container_class'	=> 'activity'
				];
				

		
		$activity_args = $args;
		unset($activity_args['title']);
		
		$activity_ajax_querystring = static function ( $ajax_querystring, $object ) {
			global $activity_args;
			$qs = array();
			
			if( !empty($activity_args) ) {
				foreach( $activity_args as $key=>$value) {
					if ( $value != '' ) {
						$qs[] = $key . "=" . $value;
					}
				}
			}
			
			$query_string = empty( $qs ) ? '' : join( '&', (array) $qs );
			if ( $query_string != '' ) {
				$ajax_querystring .= '&' . $query_string;
			}
			
			return $ajax_querystring;
		};
		
		add_filter( 'bp_ajax_querystring', $activity_ajax_querystring, 99, 2 );	
		
		?>
		
		<div class="buddypress-activity-element">
			<?php if ( $args['title'] ) : ?>
				<h3 class="activity-shortcode-title"><?php echo $args['title']; ?></h3>
			<?php endif; ?>
		
			<div id="buddypress" class="buddypress-wrap bp-dir-hori-nav activity">
			
				<?php if ( $args['allow_posting'] == 'true' && is_user_logged_in() ) : ?>
					<div class="bpas-post-form-wrapper">
						<?php bp_locate_template( array( 'activity/post-form.php' ), true ); ?>
					</div>
				<?php endif; ?>
		
		
				<?php bp_nouveau_before_activity_directory_content(); ?>

				<div class="screen-content">
					<?php bp_nouveau_activity_hook( 'before_directory', 'list' ); ?>

					<div id="activity-stream" class="activity" data-bp-list="activity" data-ajax="false">
						<?php bp_get_template_part( 'activity/activity-loop' ); ?>
					</div>

					<?php bp_nouveau_after_activity_directory_content(); ?>

				</div>
			</div>
		</div>
		<?php
		remove_filter( 'bp_current_component', $current_component );
		remove_filter( 'bp_ajax_querystring', $activity_ajax_querystring, 99, 2 );	
		if ( isset($settings['sfb_hide_load_more']) && $settings['sfb_hide_load_more'] == 'yes') {	
			?>
			<style>
			.elementor-element-<?php echo $this->get_id();?> #buddypress .load-more{ display:none}
			</style>
			<?php
		}
		
	}

}
