<?php
/**
 * WBCom Essential Gutenberg Blocks.
 *
 * @link       https://wbcomdesigns.com/plugins
 * @since      1.0.0
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/plugins/gutenberg
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
} // Exit if accessed directly

/**
 * Main Gutenberg Blocks Class
 */
class WBCOM_Essential_Gutenberg {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->load_blocks();
		add_filter( 'block_categories_all', array( $this, 'register_block_category' ), 10, 2 );
		add_filter( 'style_loader_src', array( $this, 'filter_kirki_style_src' ), 10, 2 );
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Automatically load all blocks from the blocks directory
	 */
	private function load_blocks() {
		$blocks_dir = WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/';

		if ( ! is_dir( $blocks_dir ) ) {
			return;
		}

		$block_dirs = scandir( $blocks_dir );

		foreach ( $block_dirs as $block_dir ) {
			// Skip current and parent directories
			if ( $block_dir === '.' || $block_dir === '..' ) {
				continue;
			}

			$full_block_path = $blocks_dir . $block_dir;

			// Check if it's a directory
			if ( ! is_dir( $full_block_path ) ) {
				continue;
			}

			// Look for the main PHP file (usually named after the block)
			$php_file = $full_block_path . '/' . $block_dir . '.php';

			if ( file_exists( $php_file ) ) {
				require_once $php_file;
			}

			// Look for render.php file for dynamic blocks
			$render_file = $full_block_path . '/render.php';

			if ( file_exists( $render_file ) ) {
				require_once $render_file;
			}
		}
	}

	/**
	 * Register block category
	 *
	 * @param array $categories Block categories.
	 * @return array
	 */
	public function register_block_category( $categories ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'wbcom-essential',
					'title' => __( 'Wbcom Essential', 'wbcom-essential' ),
					'icon'  => 'lightbulb',
				),
			)
		);
	}

	/**
	 * Filter Kirki style src to prevent loading in editor
	 */
	public function filter_kirki_style_src( $src, $handle ) {
		if ( strpos( $src, 'action=kirki-styles' ) !== false ) {
			return false;
		}
		return $src;
	}

	/**
	 * Register REST API routes for Gutenberg blocks.
	 */
	public function register_rest_routes() {
		register_rest_route(
			'wbcom-essential/v1',
			'/xprofile-groups',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'get_xprofile_groups' ),
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}

	/**
	 * Get available BuddyPress xProfile groups for the editor.
	 *
	 * @return WP_REST_Response
	 */
	public function get_xprofile_groups() {
		$groups = array();

		// Check if BuddyPress xProfile is available.
		if ( ! function_exists( 'bp_xprofile_get_groups' ) ) {
			return rest_ensure_response( $groups );
		}

		$profile_groups = bp_xprofile_get_groups();

		if ( ! empty( $profile_groups ) ) {
			foreach ( $profile_groups as $group ) {
				$groups[] = array(
					'id'   => $group->id,
					'name' => $group->name,
				);
			}
		}

		// Add photo options if not disabled.
		$photo_options = array();

		if ( function_exists( 'bp_disable_avatar_uploads' ) && ! bp_disable_avatar_uploads() ) {
			$photo_options[] = array(
				'id'   => 'profile_photo',
				'name' => __( 'Profile Photo', 'wbcom-essential' ),
			);
		}

		if ( function_exists( 'bp_disable_cover_image_uploads' ) && ! bp_disable_cover_image_uploads() ) {
			$photo_options[] = array(
				'id'   => 'cover_photo',
				'name' => __( 'Cover Photo', 'wbcom-essential' ),
			);
		}

		return rest_ensure_response(
			array(
				'fieldGroups'  => $groups,
				'photoOptions' => $photo_options,
			)
		);
	}
}

// Initialize the Gutenberg blocks
new WBCOM_Essential_Gutenberg();