<?php
/**
 * Block Registrar — auto-register all Gutenberg blocks from build/blocks/.
 *
 * @package Wbcom_Essential
 * @since   4.1.0
 */

namespace WBCOM_ESSENTIAL\Gutenberg;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Scans build/blocks/ for block.json files and registers each block.
 */
final class BlockRegistrar {

	/**
	 * Path to the build/blocks directory.
	 *
	 * @var string
	 */
	private $build_dir;

	/**
	 * Constructor.
	 *
	 * @param string $build_dir Absolute path to build/blocks/.
	 */
	public function __construct( string $build_dir ) {
		$this->build_dir = trailingslashit( $build_dir );
	}

	/**
	 * Hook into WordPress to register blocks on init.
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_blocks' ) );
	}

	/**
	 * Scan build directory and register every block that has a block.json.
	 */
	public function register_blocks() {
		if ( ! file_exists( $this->build_dir ) ) {
			return;
		}

		$block_dirs = glob( $this->build_dir . '*/block.json' );

		if ( empty( $block_dirs ) ) {
			return;
		}

		foreach ( $block_dirs as $block_json ) {
			$block_dir = dirname( $block_json );
			register_block_type( $block_dir );
		}
	}
}
