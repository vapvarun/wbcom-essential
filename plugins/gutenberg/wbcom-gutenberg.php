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
}

// Initialize the Gutenberg blocks
new WBCOM_Essential_Gutenberg();