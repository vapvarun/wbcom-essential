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
	 * Track registered blocks to prevent duplicates.
	 *
	 * @var array
	 */
	private static $registered_blocks = array();

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
		add_filter( 'block_type_metadata', array( $this, 'translate_text_defaults' ) );
		add_filter( 'render_block_wbcom-essential/countdown-timer', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/pricing-table', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/testimonial-carousel', array( $this, 'translate_saved_markup' ), 10, 2 );
	}

	/**
	 * Translate fixed English labels that static blocks store in post content.
	 *
	 * These save() functions write the labels as literal markup, and changing
	 * save() would make every existing block fail validation. Swapping the exact
	 * saved fragments at render time keeps saved content untouched while the
	 * front end follows the site language. Each needle includes its class or
	 * attribute so owner-written text is never matched.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 * @return string
	 */
	public function translate_saved_markup( $block_content, $block ) {
		switch ( $block['blockName'] ) {
			case 'wbcom-essential/countdown-timer':
				$labels = array(
					'Days'  => __( 'Days', 'wbcom-essential' ),
					'Hours' => __( 'Hours', 'wbcom-essential' ),
					'Mins'  => __( 'Mins', 'wbcom-essential' ),
					'Secs'  => __( 'Secs', 'wbcom-essential' ),
				);
				$map    = array();
				foreach ( $labels as $english => $translated ) {
					$map[ 'aria-label="' . $english . '"' ]                    = 'aria-label="' . esc_attr( $translated ) . '"';
					$map[ 'wbe-countdown-timer__label">' . $english . '<' ] = 'wbe-countdown-timer__label">' . esc_html( $translated ) . '<';
				}
				break;
			case 'wbcom-essential/pricing-table':
				$map = array(
					'wbe-pricing-cards__badge">Most Popular<' => 'wbe-pricing-cards__badge">' . esc_html__( 'Most Popular', 'wbcom-essential' ) . '<',
				);
				break;
			case 'wbcom-essential/testimonial-carousel':
				$map = array(
					'aria-label="Testimonial navigation"' => 'aria-label="' . esc_attr__( 'Testimonial navigation', 'wbcom-essential' ) . '"',
					'aria-label="Previous testimonial"'   => 'aria-label="' . esc_attr__( 'Previous testimonial', 'wbcom-essential' ) . '"',
					'aria-label="Next testimonial"'       => 'aria-label="' . esc_attr__( 'Next testimonial', 'wbcom-essential' ) . '"',
				);
				break;
			default:
				return $block_content;
		}

		return strtr( $block_content, $map );
	}

	/**
	 * Translate the English text defaults of server-rendered blocks.
	 *
	 * block.json defaults are plain strings, so without this a non-English site
	 * shows "Secure checkout", "Log In" and so on until the owner retypes them.
	 * The editor reads these server-side definitions too, so both surfaces match.
	 *
	 * Only dynamic (render.php) blocks are listed. A static block's default is
	 * baked into its saved markup, so translating it would make existing blocks
	 * fail validation in the editor.
	 *
	 * @param array $metadata Block metadata read from block.json.
	 * @return array
	 */
	public function translate_text_defaults( $metadata ) {
		$name = $metadata['name'] ?? '';
		if ( 0 !== strpos( $name, 'wbcom-essential/' ) ) {
			return $metadata;
		}

		switch ( $name ) {
			case 'wbcom-essential/edd-account-dashboard':
				$defaults = array( 'supportLabel' => __( 'Submit Ticket', 'wbcom-essential' ) );
				break;
			case 'wbcom-essential/edd-checkout-enhanced':
				$defaults = array(
					'trustBadgeText' => __( 'Secure checkout', 'wbcom-essential' ),
					'guaranteeText'  => __( 'Covered by our money-back guarantee.', 'wbcom-essential' ),
				);
				break;
			case 'wbcom-essential/edd-checkout-trust':
				$defaults = array(
					'trustBadgeText'    => __( 'Secure checkout', 'wbcom-essential' ),
					'secureBadgeText'   => __( 'Your payment information is encrypted and secure.', 'wbcom-essential' ),
					'guaranteeText'     => __( 'Covered by our money-back guarantee.', 'wbcom-essential' ),
					'supportBadgeTitle' => __( 'Priority Support', 'wbcom-essential' ),
					'supportBadgeText'  => __( 'Dedicated support for all customers.', 'wbcom-essential' ),
				);
				break;
			case 'wbcom-essential/edd-order-success':
				$defaults = array( 'successMessage' => __( 'Thank you for your purchase!', 'wbcom-essential' ) );
				break;
			case 'wbcom-essential/login-form':
				$defaults = array(
					'buttonText'      => __( 'Log In', 'wbcom-essential' ),
					'loggedInMessage' => __( 'You are already logged in.', 'wbcom-essential' ),
				);
				break;
			case 'wbcom-essential/posts-ticker':
				$defaults = array( 'label' => __( 'Latest News', 'wbcom-essential' ) );
				break;
			default:
				return $metadata;
		}

		foreach ( $defaults as $attribute => $text ) {
			if ( isset( $metadata['attributes'][ $attribute ] ) ) {
				$metadata['attributes'][ $attribute ]['default'] = $text;
			}
		}

		return $metadata;
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

			// Extract block name from block.json to check if already registered.
			$block_data = json_decode( file_get_contents( $block_json ), true );
			$block_name = $block_data['name'] ?? '';

			// Skip if already registered.
			if ( empty( $block_name ) || in_array( $block_name, self::$registered_blocks, true ) ) {
				continue;
			}

			register_block_type( $block_dir );
			self::$registered_blocks[] = $block_name;
		}
	}
}
