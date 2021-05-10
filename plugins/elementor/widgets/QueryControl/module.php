<?php

namespace WBCOM_ESSENTIAL\ELEMENTOR\Widgets\QueryControl;

use Elementor\Controls_Manager;
use Elementor\Utils;
use Elementor\Widget_Base;
// use WBCOM_ESSENTIAL\Base\Module_Base;
use WBCOM_ESSENTIAL\ELEMENTOR\Widgets\QueryControl\Group_Control_Posts;
use WBCOM_ESSENTIAL\ELEMENTOR\Widgets\QueryControl\Query;
use WBCOM_ESSENTIAL\Plugin;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Module {

	const QUERY_CONTROL_ID = 'query';

	public function __construct() {
		$this->add_actions();
	}

	/**
	 *
	 * @param Widget_Base $widget
	 */
	public static function add_exclude_controls( $widget ) {
		$widget->add_control(
			'exclude',
			array(
				'label'       => __( 'Exclude', 'wbcom-essential' ),
				'type'        => Controls_Manager::SELECT2,
				'multiple'    => true,
				'options'     => array(
					'current_post'     => __( 'Current Post', 'wbcom-essential' ),
					'manual_selection' => __( 'Manual Selection', 'wbcom-essential' ),
				),
				'label_block' => true,
			)
		);

		$widget->add_control(
			'exclude_ids',
			array(
				'label'       => _x( 'Search & Select', 'Posts Query Control', 'wbcom-essential' ),
				'type'        => self::QUERY_CONTROL_ID,
				'post_type'   => '',
				'options'     => array(),
				'label_block' => true,
				'multiple'    => true,
				'filter_type' => 'by_id',
				'condition'   => array(
					'exclude' => 'manual_selection',
				),
			)
		);
	}

	public function get_name() {
		return 'query-control';
	}

	public function ajax_posts_filter_autocomplete() {
		if ( empty( $_POST['_nonce'] ) || ! wp_verify_nonce( $_POST['_nonce'], 'elementor-editing' ) ) {
			wp_send_json_error( new \WP_Error( 'token_expired' ) );
		}

		if ( empty( $_POST['filter_type'] ) || empty( $_POST['q'] ) ) {
			wp_send_json_error( new \WP_Error( 'Bad Request' ) );
		}

		$results = array();

		if ( 'taxonomy' === $_POST['filter_type'] ) {
			$query_params = array(
				'taxonomy' => $_POST['object_type'],
				'search'   => $_POST['q'],
			);

			$terms = get_terms( $query_params );

			foreach ( $terms as $term ) {
				$results[] = array(
					'id'   => $term->term_id,
					'text' => $term->name,
				);
			}
		} elseif ( 'by_id' === $_POST['filter_type'] ) {
			$query_params = array(
				'post_type'      => $_POST['object_type'],
				's'              => $_POST['q'],
				'posts_per_page' => -1,
			);

			$query = new \WP_Query( $query_params );

			foreach ( $query->posts as $post ) {
				$results[] = array(
					'id'   => $post->ID,
					'text' => $post->post_title,
				);
			}
		} elseif ( 'author' === $_POST['filter_type'] ) {
			$query_params = array(
				'who'                 => 'authors',
				'has_published_posts' => true,
				'fields'              => array(
					'ID',
					'display_name',
				),
				'search'              => '*' . $_POST['q'] . '*',
				'search_columns'      => array(
					'user_login',
					'user_nicename',
				),
			);

			$user_query = new \WP_User_Query( $query_params );

			foreach ( $user_query->get_results() as $author ) {
				$results[] = array(
					'id'   => $author->ID,
					'text' => $author->display_name,
				);
			}
		}

		wp_send_json_success(
			array(
				'results' => $results,
			)
		);
	}

	public function ajax_posts_control_value_titles() {
		if ( empty( $_POST['_nonce'] ) || ! wp_verify_nonce( $_POST['_nonce'], 'elementor-editing' ) ) {
			wp_send_json_error( new \WP_Error( 'token_expired' ) );
		}

		$ids = (array) $_POST['value'];

		$results = array();

		if ( 'taxonomy' === $_POST['filter_type'] ) {

			$terms = get_terms(
				array(
					'include' => $ids,
				)
			);

			foreach ( $terms as $term ) {
				$results[ $term->term_id ] = $term->name;
			}
		} elseif ( 'by_id' === $_POST['filter_type'] ) {
			$query = new \WP_Query(
				array(
					'post_type'      => 'any',
					'post__in'       => $ids,
					'posts_per_page' => -1,
				)
			);

			foreach ( $query->posts as $post ) {
				$results[ $post->ID ] = $post->post_title;
			}
		} elseif ( 'author' === $_POST['filter_type'] ) {
			$query_params = array(
				'who'                 => 'authors',
				'has_published_posts' => true,
				'fields'              => array(
					'ID',
					'display_name',
				),
				'include'             => $ids,
			);

			$user_query = new \WP_User_Query( $query_params );

			foreach ( $user_query->get_results() as $author ) {
				$results[ $author->ID ] = $author->display_name;
			}
		}

		wp_send_json_success( $results );
	}



	public static function get_query_args( $control_id, $settings ) {
		$defaults = array(
			$control_id . '_post_type' => 'post',
			$control_id . '_posts_ids' => array(),
			'orderby'                  => 'date',
			'order'                    => 'desc',
			'posts_per_page'           => 3,
			'offset'                   => 0,
		);

		$settings = wp_parse_args( $settings, $defaults );

		$post_type = $settings[ $control_id . '_post_type' ];

		$query_args = array(
			'orderby'             => $settings['orderby'],
			'order'               => $settings['order'],
			'ignore_sticky_posts' => 1,
			'post_status'         => 'publish', // Hide drafts/private posts for admins
		);

		if ( 'by_id' === $post_type ) {
			$query_args['post_type'] = 'any';
			$query_args['post__in']  = $settings[ $control_id . '_posts_ids' ];

			if ( empty( $query_args['post__in'] ) ) {
				// If no selection - return an empty query
				$query_args['post__in'] = array( 0 );
			}
		} else {
			$query_args['post_type']      = $post_type;
			$query_args['posts_per_page'] = $settings['posts_per_page'];
			$query_args['tax_query']      = array();

			if ( 0 < $settings['offset'] ) {
				/**
				 * Due to a WordPress bug, the offset will be set later, in $this->fix_query_offset()
				 *
				 * @see https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
				 */
				$query_args['offset_to_fix'] = $settings['offset'];
			}

			$taxonomies = get_object_taxonomies( $post_type, 'objects' );

			foreach ( $taxonomies as $object ) {
				$setting_key = $control_id . '_' . $object->name . '_ids';

				if ( ! empty( $settings[ $setting_key ] ) ) {
					$query_args['tax_query'][] = array(
						'taxonomy' => $object->name,
						'field'    => 'term_id',
						'terms'    => $settings[ $setting_key ],
					);
				}
			}
		}

		if ( ! empty( $settings[ $control_id . '_authors' ] ) ) {
			$query_args['author__in'] = $settings[ $control_id . '_authors' ];
		}

		if ( ! empty( $settings['exclude'] ) ) {
			$post__not_in = array();
			if ( in_array( 'current_post', $settings['exclude'] ) ) {
				if ( Utils::is_ajax() && ! empty( $_REQUEST['post_id'] ) ) {
					$post__not_in[] = $_REQUEST['post_id'];
				} elseif ( is_singular() ) {
					$post__not_in[] = get_queried_object_id();
				}
			}

			if ( in_array( 'manual_selection', $settings['exclude'] ) && ! empty( $settings['exclude_ids'] ) ) {
				$post__not_in = array_merge( $post__not_in, $settings['exclude_ids'] );
			}

			$query_args['post__not_in'] = $post__not_in;
		}

		return $query_args;
	}

	/**
	 *
	 * @param \WP_Query $query
	 */
	function fix_query_offset( &$query ) {
		if ( ! empty( $query->query_vars['offset_to_fix'] ) ) {
			if ( $query->is_paged ) {
				$query->query_vars['offset'] = $query->query_vars['offset_to_fix'] + ( ( $query->query_vars['paged'] - 1 ) * $query->query_vars['posts_per_page'] );
			} else {
				$query->query_vars['offset'] = $query->query_vars['offset_to_fix'];
			}
		}
	}

	function fix_query_found_posts( $found_posts, $query ) {
		$offset_to_fix = $query->get( 'fix_pagination_offset' );

		if ( $offset_to_fix ) {
			$found_posts -= $offset_to_fix;
		}

		return $found_posts;
	}


	protected function add_actions() {
		add_action( 'wp_ajax_wbcom_elementor_addons_panel_posts_control_filter_autocomplete', array( $this, 'ajax_posts_filter_autocomplete' ) );
		add_action( 'wp_ajax_wbcom_elementor_addons_panel_posts_control_value_titles', array( $this, 'ajax_posts_control_value_titles' ) );

		/**
		 *
		 * @see https://codex.wordpress.org/Making_Custom_Queries_using_Offset_and_Pagination
		 */
		add_action( 'pre_get_posts', array( $this, 'fix_query_offset' ), 1 );
		add_filter( 'found_posts', array( $this, 'fix_query_found_posts' ), 1, 2 );
	}
}
