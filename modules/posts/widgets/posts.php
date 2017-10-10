<?php
namespace WbcomElementorAddons\Modules\Posts\Widgets;

use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use WbcomElementorAddons\Base\Base_Widget;
use WbcomElementorAddons\Modules\QueryControl\Controls\Group_Control_Posts;
use WbcomElementorAddons\Modules\QueryControl\Module;
use WbcomElementorAddons\Modules\Posts\Skins;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Class Posts
 */
class Posts extends Base_Widget {

	/**
	 * @var \WP_Query
	 */
	private $query = null;

	protected $_has_template_content = false;

	public function get_name() {
		return 'posts';
	}

	public function get_title() {
		return __( 'Posts', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN );
	}

	public function get_icon() {
		return 'eicon-post-list';
	}

	public function get_script_depends() {
		return [ 'imagesloaded' ];
	}

	public function on_import( $element ) {
		if ( ! get_post_type_object( $element['settings']['posts_post_type'] ) ) {
			$element['settings']['posts_post_type'] = 'post';
		}

		return $element;
	}

	public function on_export( $element ) {
		$element = Group_Control_Posts::on_export_remove_setting_from_element( $element, 'posts' );
		return $element;
	}

	protected function _register_skins() {
		$this->add_skin( new Skins\Skin_Classic( $this ) );
		$this->add_skin( new Skins\Skin_Cards( $this ) );
	}

	public function get_query() {
		return $this->query;
	}

	protected function _register_controls() {
		$this->register_query_section_controls();
		$this->register_pagination_section_controls();
	}

	public function render() {}

	private function register_query_section_controls() {
		$this->start_controls_section(
			'section_layout',
			[
				'label' => __( 'Layout', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_query',
			[
				'label' => __( 'Query', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			]
		);

		$this->add_group_control(
			Group_Control_Posts::get_type(),
			[
				'name' => 'posts',
				'label' => __( 'Posts', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'advanced',
			[
				'label'   => __( 'Advanced', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type'    => Controls_Manager::HEADING,
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'   => __( 'Order By', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'post_date',
				'options' => [
					'post_date'  => __( 'Date', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'post_title' => __( 'Title', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'menu_order' => __( 'Menu Order', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'rand'       => __( 'Random', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
			]
		);

		$this->add_control(
			'order',
			[
				'label'   => __( 'Order', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'desc',
				'options' => [
					'asc'  => __( 'ASC', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'desc' => __( 'DESC', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
			]
		);

		$this->add_control(
			'offset',
			[
				'label'   => __( 'Offset', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 0,
				'condition' => [
					'posts_post_type!' => 'by_id',
				],
				'description' => __( 'Use this setting to skip over posts (e.g. \'2\' to skip over 2 posts).', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		Module::add_exclude_controls( $this );

		$this->end_controls_section();
	}

	public function register_pagination_section_controls() {
		$this->start_controls_section(
			'section_pagination',
			[
				'label' => __( 'Pagination', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'pagination_type',
			[
				'label' => __( 'Pagination', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SELECT,
				'default' => '',
				'options' => [
					'' => __( 'None', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'numbers' => __( 'Numbers', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'prev_next' => __( 'Previous/Next', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
					'numbers_and_prev_next' => __( 'Numbers', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ) . ' + ' . __( 'Previous/Next', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				],
			]
		);

		$this->add_control(
			'pagination_page_limit',
			[
				'label' => __( 'Page Limit', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'default' => '5',
				'condition' => [
					'pagination_type!' => '',
				],
			]
		);

		$this->add_control(
			'pagination_numbers_shorten',
			[
				'label' => __( 'Shorten', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SWITCHER,
				'default' => '',
				'return_value' => 'yes',
				'condition' => [
					'pagination_type' => [
						'numbers',
						'numbers_and_prev_next',
					],
				],
			]
		);

		$this->add_control(
			'pagination_prev_label',
			[
				'label' => __( 'Previous Label', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'default' => __( '&laquo; Previous', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'condition' => [
					'pagination_type' => [
						'prev_next',
						'numbers_and_prev_next',
					],
				],
			]
		);

		$this->add_control(
			'pagination_next_label',
			[
				'label' => __( 'Next Label', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'default' => __( 'Next &raquo;', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'condition' => [
					'pagination_type' => [
						'prev_next',
						'numbers_and_prev_next',
					],
				],
			]
		);

		$this->add_control(
			'pagination_align',
			[
				'label' => __( 'Alignment', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::CHOOSE,
				'options' => [
					'left' => [
						'title' => __( 'Left', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'fa fa-align-center',
					],
					'right' => [
						'title' => __( 'Right', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
						'icon' => 'fa fa-align-right',
					],
				],
				'default' => 'center',
				'selectors' => [
					'{{WRAPPER}} .elementor-pagination' => 'text-align: {{VALUE}};',
				],
				'condition' => [
					'pagination_type!' => '',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_pagination_style',
			[
				'label' => __( 'Pagination', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'tab' => Controls_Manager::TAB_STYLE,
				'condition' => [
					'pagination_type!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name' => 'pagination_typography',
				'selector' => '{{WRAPPER}} .elementor-pagination',
				'scheme' => Scheme_Typography::TYPOGRAPHY_2,
			]
		);

		$this->add_control(
			'pagination_color_heading',
			[
				'label' => __( 'Colors', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->start_controls_tabs( 'pagination_colors' );

		$this->start_controls_tab(
			'pagination_color_normal',
			[
				'label' => __( 'Normal' , WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'pagination_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-pagination .page-numbers:not(.dots)' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'pagination_color_hover',
			[
				'label' => __( 'Hover' , WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'pagination_hover_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-pagination a.page-numbers:hover' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'pagination_color_active',
			[
				'label' => __( 'Active' , WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			]
		);

		$this->add_control(
			'pagination_active_color',
			[
				'label' => __( 'Color', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .elementor-pagination .page-numbers.current' => 'color: {{VALUE}};',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_responsive_control(
			'pagination_spacing',
			[
				'label' => __( 'Space Between', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
				'type' => Controls_Manager::SLIDER,
				'separator' => 'before',
				'default' => [
					'size' => 10,
				],
				'range' => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'body:not(.rtl) {{WRAPPER}} .elementor-pagination .page-numbers:not(:first-child)' => 'margin-left: calc( {{SIZE}}{{UNIT}}/2 );',
					'body:not(.rtl) {{WRAPPER}} .elementor-pagination .page-numbers:not(:last-child)' => 'margin-right: calc( {{SIZE}}{{UNIT}}/2 );',
					'body.rtl {{WRAPPER}} .elementor-pagination .page-numbers:not(:first-child)' => 'margin-right: calc( {{SIZE}}{{UNIT}}/2 );',
					'body.rtl {{WRAPPER}} .elementor-pagination .page-numbers:not(:last-child)' => 'margin-left: calc( {{SIZE}}{{UNIT}}/2 );',
				],
			]
		);

		$this->end_controls_section();
	}

	public function query_posts() {
		$query_args = Module::get_query_args( 'posts', $this->get_settings() );

		$query_args['posts_per_page'] = $this->get_current_skin()->get_instance_value( 'posts_per_page' );
		$query_args['paged'] = $this->get_current_page();

		$this->query = new \WP_Query( $query_args );
	}

	public function get_current_page() {
		if ( '' === $this->get_settings( 'pagination_type' ) ) {
			return 1;
		}

		return max( 1, get_query_var( 'paged' ), get_query_var( 'page' ) );
	}

	public function get_posts_nav_link( $page_limit = null ) {
		if ( ! $page_limit ) {
			$page_limit = $this->query->max_num_pages;
		}

		$return = [];

		$paged = $this->get_current_page();

		$link_template = '<a class="page-numbers %s" href="%s">%s</a>';
		$disabled_template = '<span class="page-numbers %s">%s</span>';

		if ( $paged > 1 ) {
			$next_page = intval( $paged ) - 1;
			if ( $next_page < 1 ) {
				$next_page = 1;
			}

			$return['prev'] = sprintf( $link_template, 'prev', get_pagenum_link( $next_page ), $this->get_settings( 'pagination_prev_label' ) );
		} else {
			$return['prev'] = sprintf( $disabled_template, 'prev', $this->get_settings( 'pagination_prev_label' ) );
		}

		$next_page = intval( $paged ) + 1;

		if ( $next_page <= $page_limit ) {
			$return['next'] = sprintf( $link_template, 'next', get_pagenum_link( $next_page ), $this->get_settings( 'pagination_next_label' ) );
		} else {
			$return['next'] = sprintf( $disabled_template, 'next', $this->get_settings( 'pagination_next_label' ) );
		}

		return $return;
	}
}
