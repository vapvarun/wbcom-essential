<?php
/**
 * Add Elementor Hooks
 *
 * @package REIGNELEMENTOR
 * @since 1.0.0
 */

namespace WBCOM_ESSENTIAL\ELEMENTOR;

defined( 'ABSPATH' ) || die();

/**
 * Class ElementorHooks
 *
 * @package REIGNELEMENTOR
 */
class ElementorHooks {

	/**
	 * Plugin instance.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @var Plugin
	 */
	public static $instance;



	/**
	 * ElementorHooks constructor.
	 */
	public function __construct() {

		// add_action( 'elementor/init', array( $this, 'early_init' ), 0 );

		// add_action(
		// 'elementor/element/column/layout/before_section_end',
		// array(
		// $this,
		// 'add_column_order_control',
		// ),
		// 12,
		// 2
		// );

		// if ( is_admin() ) {
		// add_action(
		// 'elementor/admin/after_create_settings/' . \Elementor\Settings::PAGE_ID,
		// array(
		// $this,
		// 'register_admin_fields',
		// ),
		// 20
		// );
		// }

		add_action( 'elementor/elements/categories_registered', array( $this, 'categories_registered' ) );
		add_action( 'elementor/widgets/widgets_registered', array( $this, 'widgets_registered' ) );
		// add_action( 'elementor/editor/after_enqueue_styles', array( $this, 'editor_css' ) );
		// add_action( 'elementor/editor/after_save', array( $this, 'save_buddypress_options' ), 10, 2 );

		// add_filter( 'template_include', array( $this, 'change_preview_and_edit_tpl' ) );

		add_action(
			'wp',
			function () {
				if ( is_singular() ) {
					$meta     = get_post_meta( get_the_ID(), '_elementor_controls_usage', true );
					$elements = array();

					$register_widgets = Plugin::get_instance()->get_elements();

					foreach ( $register_widgets as $widget ) {
						if ( ! isset( $widget['template'] ) ) {
							$elements[ $widget['name'] ] = true;
						}
					}

					if ( is_array( $meta ) && count( array_intersect_key( $elements, $meta ) ) > 0 ) {
						add_filter( 'buddy_builder/has_template/pre', '__return_true' );
					}
				}
			}
		);
	}


	/**
	 * Get instance
	 *
	 * @return mixed
	 */
	public static function get_instance() {
		if ( self::$instance === null ) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Change the template when editing and previewing to buddybuilder one
	 *
	 * @param $template
	 *
	 * @return string
	 */
	// public function change_preview_and_edit_tpl( $template ) {
	// if ( bpb_is_preview_mode() || bpb_is_front_library() || bpb_is_edit_frame() ) {
	// $template = BPB_BASE_PATH . 'templates/buddypress/buddypress.php';
	// }
	//
	// return $template;
	// }

	/**
	 * Adds actions after Elementor init.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function early_init() {
		// Register modules .
		// new Library\Module();

		// Template library .
		// new Template\Module();
	}

	/**
	 * Add order control to column settings.
	 *
	 * @param object $element Element instance.
	 * @param array  $args Element arguments.
	 */
	// public function add_column_order_control( $element, $args ) {
	// $existing_control = \Elementor\Plugin::$instance->controls_manager->get_control_from_stack( $element->get_unique_name(), 'column_order' );
	//
	// if ( is_wp_error( $existing_control ) ) {
	// $args = array(
	// 'position' => array(
	// 'at' => 'before',
	// 'of' => 'content_position',
	// ),
	// );
	//
	// $element->add_responsive_control(
	// 'column_order',
	// array(
	// 'label'     => esc_html__( 'Column Order', 'stax-buddy-builder' ),
	// 'type'      => \Elementor\Controls_Manager::NUMBER,
	// 'min'       => 0,
	// 'max'       => 100,
	// 'selectors' => array(
	// '{{WRAPPER}}.elementor-column' => 'order: {{VALUE}}',
	// ),
	// ),
	// $args
	// );
	// }
	// }

	/**
	 * Add REIGNELEMENTOR tab in Elementor Settings page.
	 *
	 * @param object $settings Settings.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	// public function register_admin_fields( $settings ) {
	// $settings->add_tab(
	// 'buddy-builder',
	// array(
	// 'label' => esc_html__( 'BuddyBuilder', 'stax-buddy-builder' ),
	// )
	// );
	// }

	/**
	 * Register elementor category
	 */
	public function categories_registered() {
		global $post;

		\Elementor\Plugin::instance()->elements_manager->add_category(
			'wbcom-elements',
			array(
				'title' => __( 'WBCOM Elements', 'wbcom-essential' ),
				'icon'  => 'font',
			),
			1
		);
	}

	/**
	 * Register elementor widgets
	 */
	public function widgets_registered() {
		$elementor = \Elementor\Plugin::instance();

		if ( isset( $elementor->widgets_manager ) && method_exists( $elementor->widgets_manager, 'register_widget_type' ) ) {

			$elements = \WBCOM_ESSENTIAL\ELEMENTOR\Plugin::get_instance()->get_elements();
			// include_once REIGN_INC_DIR . 'plugins/elementor/widgets/Base.php';
			foreach ( $elements as $k => $element ) {
				if ( $template_file = $this->get_element_path( $element['template_base_path'] . $k ) ) {

					require_once $template_file;
					$class_name = $element['class_base_namespace'] . $element['class'];
					$elementor->widgets_manager->register_widget_type( new $class_name() );
				}
			}
		}
	}

	/**
	 * Sync elementor widget options with customizer
	 *
	 * @param $post_id
	 * @param $editor_data
	 */
	public function save_buddypress_options( $post_id, $editor_data ) {
		$settings = bpb_get_settings();
		$save     = false;

		foreach ( $settings['templates'] as $template ) {
			if ( (int) $template === (int) $post_id ) {
				$save = true;
			}
		}

		if ( $save ) {
			$document = \Elementor\Plugin::$instance->documents->get( $post_id );

			if ( $document ) {
				\Elementor\Plugin::$instance->db->iterate_data(
					$document->get_elements_data(),
					static function ( $element ) {
						if ( empty( $element['widgetType'] ) || $element['elType'] !== 'widget' ) {
							return $element;
						}

						if ( $element['widgetType'] === 'bpb-members-directory-list' ) {
							$listing_columns = bpb_get_listing_columns();

							$listing_columns['members_directory'] = array(
								'desktop' => isset( $element['settings']['columns'] ) ? $element['settings']['columns'] : '3',
								'tablet'  => isset( $element['settings']['columns_tablet'] ) ? $element['settings']['columns_tablet'] : '2',
								'mobile'  => isset( $element['settings']['columns_mobile'] ) ? $element['settings']['columns_mobile'] : '1',
							);

							bpb_update_listing_columns( $listing_columns );
						}

						if ( $element['widgetType'] === 'bpb-groups-directory-list' ) {
							$listing_columns = bpb_get_listing_columns();

							$listing_columns['groups_directory'] = array(
								'desktop' => isset( $element['settings']['columns'] ) ? $element['settings']['columns'] : '3',
								'tablet'  => isset( $element['settings']['columns_tablet'] ) ? $element['settings']['columns_tablet'] : '2',
								'mobile'  => isset( $element['settings']['columns_mobile'] ) ? $element['settings']['columns_mobile'] : '1',
							);

							bpb_update_listing_columns( $listing_columns );
						}

						if ( $element['widgetType'] === 'bpb-profile-member-navigation' && isset( $element['settings']['show_home_tab'] ) ) {
							$bp_appearance = bpb_get_appearance();

							$bp_appearance['user_front_page'] = $element['settings']['show_home_tab'] === 'yes' ? 1 : 0;

							bpb_update_appearance( $bp_appearance );
						}

						if ( $element['widgetType'] === 'bpb-profile-group-navigation' && isset( $element['settings']['show_home_tab'] ) ) {
							$bp_appearance = bpb_get_appearance();

							$bp_appearance['group_front_page'] = $element['settings']['show_home_tab'] === 'yes' ? 1 : 0;

							bpb_update_appearance( $bp_appearance );
						}

						return $element;
					}
				);
			}
		}
	}

	/**
	 * Enqueue Elementor Editor CSS
	 */
	public function editor_css() {
		wp_enqueue_style(
			'stax-elementor-panel-style',
			BPB_ADMIN_ASSETS_URL . 'css/icons.css',
			null,
			BPB_VERSION
		);

		wp_enqueue_style(
			'stax-elementor-panel-label-style',
			BPB_ADMIN_ASSETS_URL . 'css/label.css',
			null,
			BPB_VERSION
		);
	}

	/**
	 * Get widget template path
	 *
	 * @param $file_path
	 *
	 * @return bool|string
	 */
	public function get_element_path( $file_path ) {
		$template_file = $file_path . '.php';
		if ( $template_file && is_readable( $template_file ) ) {
			return $template_file;
		}

		return false;
	}
}
