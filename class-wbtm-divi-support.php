<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'Wbtm_Divi_Support_Manager' ) ) :

/**
 * Main Wbtm_Divi_Support_Manager Class.
 *
 * @class Wbtm_Divi_Support_Manager
 */
class Wbtm_Divi_Support_Manager {

	/**
	 * The single instance of the class.
	 */
	protected static $_instance = null;

	/**
	 * Main Wbtm_Divi_Support_Manager Instance.
	 *
	 * Ensures only one instance of Wbtm_Divi_Support_Manager is loaded or can be loaded.
	 *
	 * @return Wbtm_Divi_Support_Manager - Main instance.
	 */
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	/**
	 * Wbtm_Divi_Support_Manager Constructor.
	 */
	public function __construct() {
		$this->init_hooks();
	}

	/**
	 * Hook into actions and filters.
	 */
	private function init_hooks() {
		add_action( 'init', array( $this, 'header_posttype' ) );
		add_action( 'init', array( $this, 'footer_posttype' ) );
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ), 50 );


		add_filter( 'et_builder_post_types', array( $this, 'wbtm_et_builder_post_types' ) );
		add_filter( 'et_pb_show_all_layouts_built_for_post_type', array( $this, 'wbtm_et_pb_show_all_layouts_built_for_post_type' ) );


		add_action( 'wbcom_before_masthead', array( $this, 'add_header_topbar_markup' ), 10 );

		add_action( 'wbcom_masthead', array( $this, 'add_header_markup' ) );

		add_action( 'wbcom_footer', array( $this, 'add_footer_markup' ) );

		add_filter( 'post_row_actions', array( $this, 'manage_view_link_for_divi_builder' ), 10, 2 );

		// apply_filters( 'post_row_actions', array $actions, WP_Post $post )

	}

	public function manage_view_link_for_divi_builder( $actions, $post ) {
		if( isset( $post->post_type ) && ( ( $post->post_type == 'reign-elemtr-header' ) || ( $post->post_type == 'reign-elemtr-footer' ) ) ) {
			if( isset( $actions['view'] ) ) {
				if ( 'trash' != $post->post_status ) {
					$actions['view'] = sprintf(
						'<a href="%s" rel="bookmark" aria-label="%s">%s</a>',
						get_permalink( $post->ID ) . '&et_fb=1',
						/* translators: %s: post title */
						esc_attr( sprintf( __( 'View &#8220;%s&#8221;' ), $post->post_title ) ),
						__( 'View' )
					);
				}

				// print_r($actions);
				// var_dump($actions['view']);
				// $view_url = $actions['view'];
				// $actions['view'] = str_replace( '', replace, subject)
				// $actions['view'] = add_query_arg( 'et_fb', true, $view_url );
			}
		}
		return $actions;
	}

	/**
	 * Prints the Footer content.
	 */
	public function add_footer_markup() {
		$theme_slug = apply_filters( 'wbcom_essential_theme_slug', 'reign' );
		global $post;
		if( $post ) {
			$wbcom_metabox_data = get_post_meta( $post->ID, $theme_slug . '_wbcom_metabox_data', true );
			$reign_ele_footer = isset( $wbcom_metabox_data['header_footer']['elementor_footer'] ) ? $wbcom_metabox_data['header_footer']['elementor_footer'] : '';
		}
		
		if( !empty( $reign_ele_footer ) && ( $reign_ele_footer == "-1" ) ) {
			return;
		}

		if( !empty( $reign_ele_footer ) && ( $reign_ele_footer != "0" ) ) {
			$footer_id = $reign_ele_footer;
		}
		else {
			$settings = get_option( $theme_slug . '_options', array() );
			$footer_id = isset( $settings[ $theme_slug . '_pages' ][ 'global_ele_footer' ] ) ? $settings[ $theme_slug . '_pages' ][ 'global_ele_footer' ] : '0';
		}

		$footer_id = 534;
		$args = array(
	        'p'         => $footer_id,
	        'post_type'   => 'reign-elemtr-footer',
	    );
	    $query = new WP_Query( $args );
	    if ( $query->have_posts() ) {
	        while ( $query->have_posts() ) {
	            $query->the_post();
	            echo '<div class="-footer-width-fixer">';
	            	the_content();
	            echo '</div>';	
	        }
	    }
	}

	/**
	 * Display header markup.
	 */
	public function add_header_markup() {
		$theme_slug = apply_filters( 'wbcom_essential_theme_slug', 'reign' );
		global $post;
		if( $post ) {
			$wbcom_metabox_data = get_post_meta( $post->ID, $theme_slug . '_wbcom_metabox_data', true );
			$reign_ele_header = isset( $wbcom_metabox_data['header_footer']['elementor_header'] ) ? $wbcom_metabox_data['header_footer']['elementor_header'] : '';
		}
		
		if( !empty( $reign_ele_header ) && ( $reign_ele_header == "-1" ) ) {
			return;
		}
		
		if( !empty( $reign_ele_header ) && ( $reign_ele_header != "0" ) ) {
			$header_id = $reign_ele_header;
		}
		else {
			$settings = get_option( $theme_slug . '_options', array() );
			$header_id = isset( $settings[ $theme_slug . '_pages' ][ 'global_ele_header' ] ) ? $settings[ $theme_slug . '_pages' ][ 'global_ele_header' ] : '0';
		}

		$header_id = 515;
		$args = array(
	        'p'         => $header_id,
	        'post_type'   => 'reign-elemtr-header',
	    );
	    $query = new WP_Query( $args );
	    if ( $query->have_posts() ) {
	        while ( $query->have_posts() ) {
	            $query->the_post();
	            echo '<div id="wbcom-ele-masthead" class="wbcom-ele-masthead-wrapper">';
	            	the_content();
	            echo '</div>';	
	        }
	    }
	}

	/**
	 * Display header topbar markup.
	 */
	public function add_header_topbar_markup() {
		$theme_slug = apply_filters( 'wbcom_essential_theme_slug', 'reign' );
		global $post;
		if( $post ) {
			$wbcom_metabox_data = get_post_meta( $post->ID, $theme_slug . '_wbcom_metabox_data', true );
			$reign_ele_topbar = isset( $wbcom_metabox_data['header_footer']['elementor_topbar'] ) ? $wbcom_metabox_data['header_footer']['elementor_topbar'] : '';
		}
		
		if( !empty( $reign_ele_topbar ) && ( $reign_ele_topbar == "-1" ) ) {
			return;
		}

		if( !empty( $reign_ele_topbar ) && ( $reign_ele_topbar != "0" ) ) {
			$topbar_id = $reign_ele_topbar;
		}
		else {
			$settings = get_option( $theme_slug . '_options', array() );
			$topbar_id = isset( $settings[ $theme_slug . '_pages' ][ 'global_ele_topbar' ] ) ? $settings[ $theme_slug . '_pages' ][ 'global_ele_topbar' ] : '0';
		}
		$topbar_id = 539;
		if ( !empty( $topbar_id ) && ( $topbar_id != "-1" ) ) {
			$args = array(
		        'p'         => $topbar_id,
		        'post_type'   => 'reign-elemtr-header',
		    );
		    $query = new WP_Query( $args );
		    if ( $query->have_posts() ) {
		        while ( $query->have_posts() ) {
		            $query->the_post();
		            echo '<div id="-wbcom-header-topbar">';
		            	the_content();
		            echo '</div>';	
		        }
		    }
		    // wp_reset_postdata();
		}
	}

	public function wbtm_et_builder_post_types( $post_types ) {
	    $post_types[] = 'reign-elemtr-header';
	    $post_types[] = 'reign-elemtr-footer';
	    return $post_types;
	}

	public function wbtm_et_pb_show_all_layouts_built_for_post_type() {
	    return 'page';
	}

	/**
	 * Register the admin menu for Header Footer builder.
	 *
	 * @since  1.0.0
	 */
	public function register_admin_menu() {
		$theme_slug = apply_filters( 'wbcom_essential_theme_slug', 'reign' );
		add_submenu_page(
			$theme_slug . '-settings',
			__( 'Header', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ), 
			__( 'Header', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			'manage_options',
			'edit.php?post_type=reign-elemtr-header'
		);

		add_submenu_page(
			$theme_slug . '-settings',
			__( 'Footer', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			__( 'Footer', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			'manage_options',
			'edit.php?post_type=reign-elemtr-footer'
		);
	}

	/**
	 * Register Post type for header footer templates
	 */
	public function header_posttype() {

		$labels = array(
			'name'		 => __( 'Header Template', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			'edit_item'	 => __( 'Edit Header Template', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
		);

		$args = array(
			'labels'				 => $labels,
			'public'				 => true,
			'rewrite'				 => false,
			'show_ui'				 => true,
			// 'show_in_menu'			 => false,
			'show_in_menu'			=>	'admin.php?page=reign-options',
			'show_in_nav_menus'		 => false,
			'exclude_from_search'	 => true,
			'capability_type'		 => 'post',
			// 'capabilities'			 => array(
			// 	'create_posts'			 => 'do_not_allow',
			// 	'delete_published_posts' => 'do_not_allow',
			// 	'delete_private_posts'	 => 'do_not_allow',
			// 	'delete_posts'			 => 'do_not_allow',
			// ),
			// 'map_meta_cap'			 => true,
			'hierarchical'			 => false,
			'menu_icon'				 => 'dashicons-editor-kitchensink',
			// 'supports'				 => array( 'elementor' ),
			'supports'				 => array( 'elementor', 'title', 'editor' ),
		);

		register_post_type( 'reign-elemtr-header', $args );
	}

	/**
	 * Register Post type for header footer templates
	 */
	public function footer_posttype() {

		$labels = array(
			'name'		 => __( 'Footer Template', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
			'edit_item'	 => __( 'Edit Footer Template', WBCOM_ELEMENTOR_ADDONS_TEXT_DOMAIN ),
		);

		$args = array(
			'labels'				 => $labels,
			'public'				 => true,
			'rewrite'				 => false,
			'show_ui'				 => true,
			// 'show_in_menu'			 => false,
			'show_in_menu'			=>	'admin.php?page=reign-options',
			'show_in_nav_menus'		 => false,
			'exclude_from_search'	 => true,
			'capability_type'		 => 'post',
			// 'capabilities'			 => array(
			// 	'create_posts'			 => 'do_not_allow',
			// 	'delete_published_posts' => 'do_not_allow',
			// 	'delete_private_posts'	 => 'do_not_allow',
			// 	'delete_posts'			 => 'do_not_allow',
			// ),
			// 'map_meta_cap'			 => true,
			'hierarchical'			 => false,
			'menu_icon'				 => 'dashicons-editor-kitchensink',
			// 'supports'				 => array( 'elementor' ),
			'supports'				 => array( 'elementor', 'title', 'editor' ),
		);

		register_post_type( 'reign-elemtr-footer', $args );
	}
	
}

endif;

// Wbtm_Divi_Support_Manager::instance();