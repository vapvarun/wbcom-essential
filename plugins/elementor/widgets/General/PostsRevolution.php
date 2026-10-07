<?php
namespace WBCOM_ESSENTIAL\ELEMENTOR\Widgets\General;

use WBCOM_ESSENTIAL\ELEMENTOR\Plugin;
use Elementor\Controls_Manager;
use Elementor\Frontend;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Utils;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/**
 * Elementor Minimal Posts Revolution
 *
 * Elementor widget for Minimal Posts Revolution
 *
 * @since 3.6.0
 */
class PostsRevolution extends Widget_Base {

	/**
	 * Construct.
	 *
	 * @param  array  $data Data.
	 * @param  string $args Args.
	 * @return void
	 */
	public function __construct( $data = array(), $args = null ) {
		parent::__construct( $data, $args );

		wp_register_style( 'wbcom-animations', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/css/animations.min.css', array(), WBCOM_ESSENTIAL_VERSION );
		wp_register_style( 'wbcom-posts-revolutions', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/css/wbcom-posts-revolutions.css', array(), WBCOM_ESSENTIAL_VERSION );

		wp_register_script( 'wbcom-appear', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/js/wbcom-appear.min.js', array( 'jquery' ), WBCOM_ESSENTIAL_VERSION, true );
		wp_register_script( 'wbcom-animate', WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/js/wbcom-animate.min.js', array( 'jquery' ), WBCOM_ESSENTIAL_VERSION, true );

	}

	/**
	 * Get dependent script.
	 */
	public function get_script_depends() {
		return array( 'wbcom-appear', 'wbcom-animate' );
	}

	/**
	 * Get dependent style.
	 */
	public function get_style_depends() {
		return array( 'wbcom-posts-revolutions', 'wbcom-animations' );
	}
	/**
	 * Retrieve the widget name.
	 *
	 * @since 3.6.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'wbcom-posts-revolution';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 3.6.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return esc_html__( 'Posts Revolution', 'wbcom-essential' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 3.6.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-posts-grid';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 3.6.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return array( 'wbcom-elements' );
	}

	/**
	 * Get keywords.
	 */
	public function get_keywords() {
		return array( 'posts', 'revolution', 'grid', 'blog', 'layout' );
	}

	/**
	 * Get post type categories.
	 */
	private function grid_get_all_post_type_categories( $post_type ) {
		$options = array();

		if ( $post_type == 'post' ) {
			$taxonomy = 'category';
		} else {
			$taxonomy = $post_type;
		}

		if ( ! empty( $taxonomy ) ) {
			// Get categories for post type.
			$terms = get_terms(
				array(
					'taxonomy'   => $taxonomy,
					'hide_empty' => false,
				)
			);
			if ( ! empty( $terms ) ) {
				foreach ( $terms as $term ) {
					if ( isset( $term ) ) {
						if ( isset( $term->slug ) && isset( $term->name ) ) {
							$options[ $term->slug ] = $term->name;
						}
					}
				}
			}
		}

		return $options;
	}


	/**
	 * Get post type categories.
	 */
	private function grid_get_all_custom_post_types() {
		$options = array();

		$args       = array( '_builtin' => false );
		$post_types = get_post_types( $args, 'objects' );

		foreach ( $post_types as $post_type ) {
			if ( isset( $post_type ) ) {
					$options[ $post_type->name ] = $post_type->label;
			}
		}

		return $options;
	}

	/**
	 * Register the widget controls.
	 *
	 * Adds different input fields to allow the user to change and customize the widget settings.
	 *
	 * @since 3.6.0
	 *
	 * @access protected
	 */
	protected function register_controls() {
		$this->start_controls_section(
			'section_content',
			array(
				'label' => esc_html__( 'Content', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'wbcom_post_display_type',
			array(
				'label'   => esc_html__( 'Post Display', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'posts_type1',
				'options' => array(
					'posts_type1' => esc_html__( 'Post Display 1', 'wbcom-essential' ),
					'posts_type2' => esc_html__( 'Post Display 2', 'wbcom-essential' ),
					'posts_type3' => esc_html__( 'Post Display 3', 'wbcom-essential' ),
					'posts_type4' => esc_html__( 'Post Display 4', 'wbcom-essential' ),
					'posts_type5' => esc_html__( 'Post Display 5', 'wbcom-essential' ),
					'posts_type6' => esc_html__( 'Post Display 6', 'wbcom-essential' ),
					'posts_type7' => esc_html__( 'Post Display 7', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_post_display_excerpt',
			array(
				'label'   => esc_html__( 'Show Excerpt', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'true',
				'options' => array(
					'true'  => esc_html__( 'Show', 'wbcom-essential' ),
					'false' => esc_html__( 'Hidden', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_post_display_excerpt_number',
			array(
				'label'     => esc_html__( 'Number Experpt', 'wbcom-essential' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => '150',
				'condition' => array(
					'wbcom_post_display_excerpt' => 'true',
				),
			)
		);

		$this->add_control(
			'wbcom_post_display_date_format',
			array(
				'label'   => esc_html__( 'Date Format', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'F j, Y',
				'options' => array(
					'F j, Y g:i a'     => esc_html__( 'November 6, 2010 12:50 am', 'wbcom-essential' ),
					'F j, Y'           => esc_html__( 'November 6, 2010', 'wbcom-essential' ),
					'F, Y'             => esc_html__( 'November, 2010', 'wbcom-essential' ),
					'g:i a'            => esc_html__( '12:50 am', 'wbcom-essential' ),
					'g:i:s a'          => esc_html__( '12:50:48 am', 'wbcom-essential' ),
					'l, F jS, Y'       => esc_html__( 'Saturday, November 6th, 2010', 'wbcom-essential' ),
					'M j, Y @ G:i'     => esc_html__( 'Nov 6, 2010 @ 0:50', 'wbcom-essential' ),
					'Y/m/d \a\t g:i A' => esc_html__( '2010/11/06 at 12:50 AM', 'wbcom-essential' ),
					'Y/m/d \a\t g:ia'  => esc_html__( '2010/11/06 at 12:50am', 'wbcom-essential' ),
					'Y/m/d g:i:s A'    => esc_html__( '2010/11/06 12:50:48 AM', 'wbcom-essential' ),
					'Y/m/d'            => esc_html__( '2010/11/06', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'columns',
			array(
				'label'     => esc_html__( 'Columns', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => '2',
				'options'   => array(
					'1' => '1',
					'2' => '2',
					'3' => '3',
				),
				'condition' => array(
					'wbcom_post_display_type' => 'posts_type3',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_query',
			array(
				'label' => esc_html__( 'QUERY', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'wbcom_query_source',
			array(
				'label'   => esc_html__( 'Source', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'wp_posts',
				'options' => array(
					'wp_posts'             => esc_html__( 'Wordpress Posts', 'wbcom-essential' ),
					'wp_custom_posts_type' => esc_html__( 'Custom Posts Type', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_query_sticky_posts',
			array(
				'label'     => esc_html__( 'All Posts/Sticky posts', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'allposts',
				'options'   => array(
					'allposts'        => esc_html__( 'All Posts', 'wbcom-essential' ),
					'onlystickyposts' => esc_html__( 'Only Sticky Posts', 'wbcom-essential' ),
				),
				'condition' => array(
					'wbcom_query_source' => 'wp_posts',
				),
			)
		);

		$this->add_control(
			'wbcom_query_posts_type',
			array(
				'label'     => esc_html__( 'Select Post Type Source', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => $this->grid_get_all_custom_post_types(),
				'condition' => array(
					'wbcom_query_source' => 'wp_custom_posts_type',
				),
			)
		);

		$this->add_control(
			'wbcom_query_categories',
			array(
				'label'     => esc_html__( 'Categories', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT2,
				'multiple'  => true,
				'options'   => $this->grid_get_all_post_type_categories( 'post' ),
				'condition' => array(
					'wbcom_query_source' => 'wp_posts',
				),
			)
		);

		$this->add_control(
			'wbcom_query_order',
			array(
				'label'   => esc_html__( 'Order', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'DESC',
				'options' => array(
					'DESC' => esc_html__( 'DESC', 'wbcom-essential' ),
					'ASC'  => esc_html__( 'ASC', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_query_orderby',
			array(
				'label'   => esc_html__( 'Order By', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'date',
				'options' => array(
					'date'          => esc_html__( 'Date', 'wbcom-essential' ),
					'ID'            => esc_html__( 'ID', 'wbcom-essential' ),
					'author'        => esc_html__( 'Author', 'wbcom-essential' ),
					'title'         => esc_html__( 'Title', 'wbcom-essential' ),
					'name'          => esc_html__( 'Name', 'wbcom-essential' ),
					'modified'      => esc_html__( 'Modified', 'wbcom-essential' ),
					'parent'        => esc_html__( 'Parent', 'wbcom-essential' ),
					'rand'          => esc_html__( 'Random', 'wbcom-essential' ),
					'comment_count' => esc_html__( 'Comments Count', 'wbcom-essential' ),
					'none'          => esc_html__( 'None', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_query_pagination',
			array(
				'label'   => esc_html__( 'Pagination', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'no',
				'options' => array(
					'no'  => esc_html__( 'No', 'wbcom-essential' ),
					'yes' => esc_html__( 'Yes', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_query_number',
			array(
				'label'     => esc_html__( 'Number Posts', 'wbcom-essential' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => '5',
				'condition' => array(
					'wbcom_query_pagination' => 'no',
				),
			)
		);

		$this->add_control(
			'wbcom_query_pagination_type',
			array(
				'label'     => esc_html__( 'Pagination Type', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'numeric',
				'options'   => array(
					'numeric' => esc_html__( 'Numeric', 'wbcom-essential' ),
					'normal'  => esc_html__( 'Normal', 'wbcom-essential' ),
				),
				'condition' => array(
					'wbcom_query_pagination' => 'yes',
				),
			)
		);

		$this->add_control(
			'wbcom_query_posts_for_page',
			array(
				'label'       => esc_html__( 'Number Posts For Page', 'wbcom-essential' ),
				'label_block' => true,
				'type'        => Controls_Manager::TEXT,
				'default'     => '10',
				'condition'   => array(
					'wbcom_query_pagination' => 'yes',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_animation',
			array(
				'label' => esc_html__( 'Animations', 'wbcom-essential' ),
			)
		);

		$this->add_control(
			'wbcom_animate',
			array(
				'label'   => esc_html__( 'Animate', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'off',
				'options' => array(
					'off' => esc_html__( 'Off', 'wbcom-essential' ),
					'on'  => esc_html__( 'On', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_animate_effect',
			array(
				'label'     => esc_html__( 'Animate Effects', 'wbcom-essential' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'fade-in',
				'options'   => array(
					'fade-in'           => esc_html__( 'Fade In', 'wbcom-essential' ),
					'fade-in-up'        => esc_html__( 'Fade In Up', 'wbcom-essential' ),
					'fade-in-down'      => esc_html__( 'Fade In Down', 'wbcom-essential' ),
					'fade-in-left'      => esc_html__( 'Fade In Left', 'wbcom-essential' ),
					'fade-in-right'     => esc_html__( 'Fade In Right', 'wbcom-essential' ),
					'fade-out'          => esc_html__( 'Fade Out', 'wbcom-essential' ),
					'fade-out-up'       => esc_html__( 'Fade Out Up', 'wbcom-essential' ),
					'fade-out-down'     => esc_html__( 'Fade Out Down', 'wbcom-essential' ),
					'fade-out-left'     => esc_html__( 'Fade Out Left', 'wbcom-essential' ),
					'fade-out-right'    => esc_html__( 'Fade Out Right', 'wbcom-essential' ),
					'bounce-in'         => esc_html__( 'Bounce In', 'wbcom-essential' ),
					'bounce-in-up'      => esc_html__( 'Bounce In Up', 'wbcom-essential' ),
					'bounce-in-down'    => esc_html__( 'Bounce In Down', 'wbcom-essential' ),
					'bounce-in-left'    => esc_html__( 'Bounce In Left', 'wbcom-essential' ),
					'bounce-in-right'   => esc_html__( 'Bounce In Right', 'wbcom-essential' ),
					'bounce-out'        => esc_html__( 'Bounce Out', 'wbcom-essential' ),
					'bounce-out-up'     => esc_html__( 'Bounce Out Up', 'wbcom-essential' ),
					'bounce-out-down'   => esc_html__( 'Bounce Out Down', 'wbcom-essential' ),
					'bounce-out-left'   => esc_html__( 'Bounce Out Left', 'wbcom-essential' ),
					'bounce-out-right'  => esc_html__( 'Bounce Out Right', 'wbcom-essential' ),
					'zoom-in'           => esc_html__( 'Zoom In', 'wbcom-essential' ),
					'zoom-in-up'        => esc_html__( 'Zoom In Up', 'wbcom-essential' ),
					'zoom-in-down'      => esc_html__( 'Zoom In Down', 'wbcom-essential' ),
					'zoom-in-left'      => esc_html__( 'Zoom In Left', 'wbcom-essential' ),
					'zoom-in-right'     => esc_html__( 'Zoom In Right', 'wbcom-essential' ),
					'zoom-out'          => esc_html__( 'Zoom Out', 'wbcom-essential' ),
					'zoom-out-up'       => esc_html__( 'Zoom Out Up', 'wbcom-essential' ),
					'zoom-out-down'     => esc_html__( 'Zoom Out Down', 'wbcom-essential' ),
					'zoom-out-left'     => esc_html__( 'Zoom Out Left', 'wbcom-essential' ),
					'zoom-out-right'    => esc_html__( 'Zoom Out Right', 'wbcom-essential' ),
					'flash'             => esc_html__( 'Flash', 'wbcom-essential' ),
					'strobe'            => esc_html__( 'Strobe', 'wbcom-essential' ),
					'shake-x'           => esc_html__( 'Shake X', 'wbcom-essential' ),
					'shake-y'           => esc_html__( 'Shake Y', 'wbcom-essential' ),
					'bounce'            => esc_html__( 'Bounce', 'wbcom-essential' ),
					'tada'              => esc_html__( 'Tada', 'wbcom-essential' ),
					'rubber-band'       => esc_html__( 'Rubber Band', 'wbcom-essential' ),
					'swing'             => esc_html__( 'Swing', 'wbcom-essential' ),
					'spin'              => esc_html__( 'Spin', 'wbcom-essential' ),
					'spin-reverse'      => esc_html__( 'Spin Reverse', 'wbcom-essential' ),
					'slingshot'         => esc_html__( 'Slingshot', 'wbcom-essential' ),
					'slingshot-reverse' => esc_html__( 'Slingshot Reverse', 'wbcom-essential' ),
					'wobble'            => esc_html__( 'Wobble', 'wbcom-essential' ),
					'pulse'             => esc_html__( 'Pulse', 'wbcom-essential' ),
					'pulsate'           => esc_html__( 'Pulsate', 'wbcom-essential' ),
					'heartbeat'         => esc_html__( 'Heartbeat', 'wbcom-essential' ),
					'panic'             => esc_html__( 'Panic', 'wbcom-essential' ),
				),
				'condition' => array(
					'wbcom_animate' => 'on',
				),
			)
		);

		$this->add_control(
			'wbcom_delay',
			array(
				'label'     => esc_html__( 'Animate Delay (ms)', 'wbcom-essential' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => '1000',
				'condition' => array(
					'wbcom_animate' => 'on',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style',
			array(
				'label' => esc_html__( 'Style', 'wbcom-essential' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'wbcom_custom_style',
			array(
				'label'   => esc_html__( 'Custom Style', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'off',
				'options' => array(
					'off' => esc_html__( 'Off', 'wbcom-essential' ),
					'on'  => esc_html__( 'On', 'wbcom-essential' ),
				),
			)
		);

		$this->add_control(
			'wbcom_main_color',
			array(
				'label'     => esc_html__( 'Main Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#1d76da',
				'condition' => array(
					'wbcom_custom_style' => 'on',
				),
			)
		);

		$this->add_control(
			'wbcom_hover_color',
			array(
				'label'     => esc_html__( 'Hover Color', 'wbcom-essential' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'default'   => '#1d76da',
				'condition' => array(
					'wbcom_custom_style' => 'on',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_spacing_style',
			[
				'label' => __( 'Spacing', 'wbcom-essential' ),
				'tab'   => \Elementor\Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'wrapper_padding',
			[
				'label'      => __( 'Padding', 'wbcom-essential' ),
				'type'       => \Elementor\Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .wbcom-essential-posts-revolution-elementor' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'wrapper_margin',
			[
				'label'      => __( 'Margin', 'wbcom-essential' ),
				'type'       => \Elementor\Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .wbcom-essential-posts-revolution-elementor' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}


	 /**
	  * Render the widget output on the frontend.
	  *
	  * Written in PHP and used to generate the final HTML.
	  *
	  * @since 3.6.0
	  *
	  * @access protected
	  */
	protected function render() {
		static $instance = 0;
		$instance++;
		$settings = $this->get_settings_for_display();

		$wbcom_post_display_type           = esc_html( $settings['wbcom_post_display_type'] );
		$wbcom_post_display_excerpt        = esc_html( $settings['wbcom_post_display_excerpt'] );
		$wbcom_post_display_excerpt_number = esc_html( $settings['wbcom_post_display_excerpt_number'] );
		$wbcom_post_display_date_format    = esc_html( $settings['wbcom_post_display_date_format'] );
		$columns                           = esc_html( $settings['columns'] );

		$wbcom_query_source       = esc_html( $settings['wbcom_query_source'] );
		$wbcom_query_sticky_posts = esc_html( $settings['wbcom_query_sticky_posts'] );
		$wbcom_query_posts_type   = esc_html( $settings['wbcom_query_posts_type'] );
		$wbcom_query_categories   = '';
		if ( ! empty( $settings['wbcom_query_categories'] ) ) {
			$num_cat = count( $settings['wbcom_query_categories'] );
			$i       = 1;
			foreach ( $settings['wbcom_query_categories'] as $element ) {
				$wbcom_query_categories .= $element;
				if ( $i != $num_cat ) {
					$wbcom_query_categories .= ',';
				}
				$i++;
			}
		}
		$wbcom_query_order           = esc_html( $settings['wbcom_query_order'] );
		$wbcom_query_orderby         = esc_html( $settings['wbcom_query_orderby'] );
		$wbcom_query_pagination      = esc_html( $settings['wbcom_query_pagination'] );
		$wbcom_query_pagination_type = esc_html( $settings['wbcom_query_pagination_type'] );
		$wbcom_query_number          = esc_html( $settings['wbcom_query_number'] );
		$wbcom_query_posts_for_page  = esc_html( $settings['wbcom_query_posts_for_page'] );

		$wbcom_custom_style = esc_html( $settings['wbcom_custom_style'] );
		$wbcom_main_color   = esc_html( $settings['wbcom_main_color'] );
		$wbcom_hover_color  = esc_html( $settings['wbcom_hover_color'] );

		$wbcom_animate        = esc_html( $settings['wbcom_animate'] );
		$wbcom_animate_effect = esc_html( $settings['wbcom_animate_effect'] );
		$wbcom_delay          = esc_html( $settings['wbcom_delay'] );

		/* CHECK VALUE EMPTY */
		if ( $wbcom_post_display_excerpt_number == '' ) {
			$wbcom_post_display_excerpt_number = '50';
		}

		$return = '<style type="text/css">';
		if ( $wbcom_custom_style == 'on' ) {
			if ( $wbcom_post_display_type == 'posts_type1' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type1.wbselector-' . $instance . ' .wb-category a {
											color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type1.wbselector-' . $instance . ' .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type1.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type2' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type2.wbselector-' . $instance . ' .wb-category a {
											color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type2.wbselector-' . $instance . ' .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type2.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type3' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type3.wbselector-' . $instance . ' .wb-category a {
											color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type3.wbselector-' . $instance . ' .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type3.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type4' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type4.wbselector-' . $instance . ' .wb-category a {
											color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type4.wbselector-' . $instance . ' .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type4.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type5' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type5.wbselector-' . $instance . ' .wb-category a {
											color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type5.wbselector-' . $instance . ' .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type5.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type6' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wb_last .wb-category a {
								color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wb_last .wb-category a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wb_last .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wb_two_half .wb-category a {
								background-color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wb_two_half:first-child:hover .wb-category a {
								background-color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type6.wbselector-' . $instance . ' .wbcom-essential-posts-second-half:hover .wb-category a {
								background-color:' . $wbcom_hover_color . '!important;
							}';
			}
			if ( $wbcom_post_display_type == 'posts_type7' ) {
				$return .= '.wbcom-essential-posts-revolution-elementor.posts_type7.wbselector-' . $instance . ' .wb-category a {
								background-color:' . $wbcom_main_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type7.wbselector-' . $instance . ' .wb-category a:hover {
								background-color:' . $wbcom_hover_color . '!important;
							}
							.wbcom-essential-posts-revolution-elementor.posts_type7.wbselector-' . $instance . ' .wb-title a:hover {
								color:' . $wbcom_hover_color . '!important;
							}';
			}
		}

		if ( $wbcom_custom_style == 'on' ) {
			if ( $wbcom_query_pagination_type == 'numeric' ) {
				$return .= '.wb-pagination.numeric .current {
								background-color:' . $wbcom_main_color . '!important;
								border-color:' . $wbcom_main_color . '!important;
							}
							.wb-pagination.numeric a:hover {
								background-color:' . $wbcom_main_color . '!important;
								border-color:' . $wbcom_main_color . '!important;
							}';
			}
			if ( $wbcom_query_pagination_type == 'normal' ) {
				$return .= '.wb-pagination a:hover {
									color:' . $wbcom_hover_color . '!important;
								}';
			}
		}
		$return .= '</style>';

		// LOOP QUERY
		$query = wbcom_essential_posts_revolution_elementor_query(
			$wbcom_query_source,
			$wbcom_query_sticky_posts,
			$wbcom_query_posts_type,
			$wbcom_query_categories,
			$wbcom_query_order,
			$wbcom_query_orderby,
			$wbcom_query_pagination,
			$wbcom_query_pagination_type,
			$wbcom_query_number,
			$wbcom_query_posts_for_page
		);

		$return .= '<div class="wbclear"></div>';

		if ( $wbcom_animate == 'on' ) { // ANIMATION ON
			$return .= '<div class="animate-in" data-anim-type="' . esc_attr( $wbcom_animate_effect ) . '" data-anim-delay="' . esc_attr( $wbcom_delay ) . '">';
		}

			$return .= '<div class="wbcom-essential-posts-revolution-elementor ' . esc_attr( $wbcom_post_display_type ) . ' wbselector-' . esc_attr( $instance ) . '">';

			$count = 0;

		if ( $wbcom_post_display_type == 'posts_type3' ) {
			$count = 1;
		}

			$loop = new \WP_Query( $query );
		if ( $loop ) {
			while ( $loop->have_posts() ) :
				$loop->the_post();
				$link       = get_permalink();
				$categories = get_the_category();

				/*
				/
				* TYPE 1
				*/

				if ( $wbcom_post_display_type == 'posts_type1' ) {

					if ( $count == '0' ) {

						$return .= '<div class="wb_three_fifth">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return         .= '</div>';

						$return .= '</div>';

					} else {

						$return .= '<div class="wb_two_fifth wb_last">';

						$return         .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container wb_one_third">' . wbcom_essential_posts_revolution_elementor_thumbs() . '</div>';
						$return         .= '<div class="wb-info-right wb_two_third wb_last">';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return         .= '</div><div class="wbclear"></div>';

						$return .= '</div>';

					}

					/*
					 * TYPE 2
					 */

				} elseif ( $wbcom_post_display_type == 'posts_type2' ) {

					if ( $count == '0' ) {

						$return .= '<div class="wb-columns-1 firstpost">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return         .= '</div>';

						$return .= '</div>';

					} else {

						$return .= '<div class="wb-columns-1 moreposts">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container wb_one_third">' . wbcom_essential_posts_revolution_elementor_thumbs() . '</div>';

						$return .= '<div class="wb-info-right wb_two_third wb_last">';
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
						$return .= '</div><div class="wbclear"></div>';

						$return .= '</div>';

					}

					/*
					 * TYPE 3
					 */

				} elseif ( $wbcom_post_display_type == 'posts_type3' ) {

					$return .= '<div class="wb-columns-' . $columns . '">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return .= '<div class="wb-info-left">';
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
					if ( $wbcom_post_display_excerpt == 'true' ) {
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
					}
						$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
						$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return .= '</div>';

					$return .= '</div>';

					if ( $count % $columns == '0' ) {
						$return .= '<br class="wbclear">';
					}

					/*
					 * TYPE 4
					 */

				} elseif ( $wbcom_post_display_type == 'posts_type4' ) {

					$return .= '<div class="container-display4"><div class="wbcom-essential-posts-revolution-elementor-thumbs-container wb_one_half">' . wbcom_essential_posts_revolution_elementor_thumbs() . '

						</div>';

					$return         .= '<div class="wb-info-right wb_one_half wb_last">';
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
							$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
					if ( $wbcom_post_display_excerpt == 'true' ) {
						// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
					}
							$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
							$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
					$return         .= '</div>';
					$return         .= '<div class="wbclear"></div></div>';

					/*
					 * TYPE 5
					 */

				} elseif ( $wbcom_post_display_type == 'posts_type5' ) {

					if ( $count == '0' ) {

						$return .= '<div class="wb_three_fifth">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return         .= '</div>';

						$return .= '</div>';

					} else {

						$return .= '<div class="wb_two_fifth wb_last">';

						$return         .= '<div class="wb-info-right wb_last">';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return         .= '</div><div class="wbclear"></div>';

						$return .= '</div>';

					}
				} elseif ( $wbcom_post_display_type == 'posts_type6' ) {

					if ( $count == '0' ) {
						$return .= '<div class="wb_two_half">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return         .= '</div>';

						$return .= '</div>';
					} elseif ( $count == '1' || $count == '2' || $count == '3' ) {
						if ( $count == '1' ) {
							$return .= '<div class="wb_two_half">';
						}

						$return .= '<div class="wbcom-essential-posts-second-half">';
						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return         .= '</div>';
						$return         .= '</div>';

						if ( $count == '3' ) {
							$return .= '</div>';
						}
					} else {

						$return .= '<div class="wb_two_fifth wb_last">';

						$return         .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container wb_one_third">' . wbcom_essential_posts_revolution_elementor_thumbs() . '</div>';
						$return         .= '<div class="wb-info-right wb_two_third wb_last">';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return         .= '</div><div class="wbclear"></div>';

						$return .= '</div>';
					}
				} elseif ( $wbcom_post_display_type == 'posts_type7' ) {

					if ( $count == '0' || $count == '1' ) {

						$return .= '<div class="wb_two_half">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container">' . wbcom_essential_posts_revolution_elementor_thumbs();
						$return .= '</div>';

						$return         .= '<div class="wb-info-left">';
								// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_category is safe
					$return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
								$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
								$return .= '<span class="wb-author">' . esc_html( get_the_author() ) . '</span>';
								$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
								$return .= '<div class="clearfix wbclear"></div>';
						if ( $wbcom_post_display_excerpt == 'true' ) {
							// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wbcom_essential_posts_revolution_elementor_excerpt is safe
					$return .= '<span class="wb-content">' . wbcom_essential_posts_revolution_elementor_excerpt( $wbcom_post_display_excerpt_number ) . '</span>';
						}
						$return .= '</div>';

						$return .= '</div>';

					} else {

						$return .= '<div class="wb_two_fifth wb_last">';

						$return .= '<div class="wbcom-essential-posts-revolution-elementor-thumbs-container wb_one_third">' . wbcom_essential_posts_revolution_elementor_thumbs() . '</div>';
						$return .= '<div class="wb-info-right wb_two_third wb_last">';
						$return .= '<span class="wb-title"><a href="' . esc_url( $link ) . '">' . esc_html( get_the_title() ) . '</a></span>';
						// $return .= '<span class="wb-category">' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
						$return .= '<span class="wb-date">' . esc_html( get_the_date( $wbcom_post_display_date_format ) ) . '</span>';
						$return .= '</div><div class="wbclear"></div>';

						$return .= '</div>';

					}
				}

				$count++;
		endwhile;
		}

		/*
		 ** PAGINATION
		 */
		if ( $wbcom_query_pagination == 'yes' ) {
			$return .= '<div class="wbclear"></div><div class="wb-post-display-' . $instance . ' wb-pagination">';
			if ( $wbcom_query_pagination_type == 'numeric' ) {
				$return .= wbcom_essential_posts_revolution_elementor_numeric_pagination( '', 2, $loop );
			} else {
				$return .= get_next_posts_link( esc_html__( 'Older posts', 'wbcom-essential' ), $loop->max_num_pages );
				$return .= get_previous_posts_link( esc_html__( 'Newer posts', 'wbcom-essential' ) );
			}
			$return .= '</div>';
		}

		/*
		 * #PAGINATION
		 */

		$return .= '</div>'; // CLOSE MAIN DIV

		/*
		 * TYPE 2
		 */

		if ( $wbcom_animate == 'on' ) {

			$return .= '</div>';

		}
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $return contains pre-escaped HTML from WordPress functions
		echo $return;
	}

}
