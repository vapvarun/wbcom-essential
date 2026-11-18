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
	 * Old fixed colour lines per block, from each block.json "wbeLegacyColors" (block name => list of
	 * "  --var: value;" lines). Filled while the blocks register.
	 *
	 * @var array<string, string[]>
	 */
	private static $legacy_colour_lines = array();

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
		add_filter( 'block_type_metadata', array( $this, 'version_assets_by_release' ) );
		add_filter( 'block_type_metadata', array( $this, 'collect_legacy_colours' ) );
		add_filter( 'render_block', array( $this, 'drop_legacy_colours' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/countdown-timer', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/pricing-table', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/cta', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/feature-grid', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/testimonial-carousel', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block_wbcom-essential/hero', array( $this, 'translate_saved_markup' ), 10, 2 );
		add_filter( 'render_block', array( $this, 'drop_zero_margin' ), 10, 2 );
	}

	/**
	 * Remember the old fixed colours a block lists in block.json "wbeLegacyColors".
	 *
	 * Each entry is attribute => [ css variable, old default, optional "keep" ]. Accents and the text on
	 * them are marked "keep": pages already built keep that look, only new blocks follow the theme accent.
	 *
	 * @param array $metadata Block metadata read from block.json.
	 * @return array
	 */
	public function collect_legacy_colours( $metadata ) {
		$name = $metadata['name'] ?? '';
		if ( 0 === strpos( $name, 'wbcom-essential/' ) && ! empty( $metadata['wbeLegacyColors'] ) && is_array( $metadata['wbeLegacyColors'] ) ) {
			$lines = array();
			foreach ( $metadata['wbeLegacyColors'] as $entry ) {
				// An empty variable name marks a colour saved as an inline style (handled in translate_saved_markup()).
				if ( is_array( $entry ) && ! empty( $entry[0] ) && isset( $entry[1] ) && 'keep' !== ( $entry[2] ?? '' ) ) {
					$lines[] = '  ' . $entry[0] . ': ' . $entry[1] . ';';
				}
			}
			self::$legacy_colour_lines[ $name ] = $lines;
		}
		return $metadata;
	}

	/**
	 * Drop neutral colour lines saved with the old fixed defaults, so the theme colours apply.
	 *
	 * Text, card and border colours used to default to fixed light values (#1e1e2e, #ffffff, #e9ecef ...) and
	 * static blocks wrote them into the page, so they stayed light in dark mode. A default is never stored as
	 * a block attribute, so a line with the old value can only come from the old default; a colour the owner
	 * picked is a different value and is never matched. The saved markup is not changed (blocks still
	 * validate); the editor migrates the block on its next save.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 * @return string
	 */
	public function drop_legacy_colours( $block_content, $block ) {
		$lines = self::$legacy_colour_lines[ $block['blockName'] ?? '' ] ?? array();
		if ( ! $lines || false === strpos( $block_content, '<style>' ) ) {
			return $block_content;
		}
		return str_replace( $lines, '', $block_content );
	}

	/**
	 * Remove the all-zero margin that static blocks wrote into their saved CSS.
	 *
	 * Every block's margin defaults to 0 on all sides, and the editor saves that as `margin: 0px 0px 0px 0px;`
	 * in the block's own style tag. That overrides the theme's spacing between blocks (stacked blocks
	 * touched) and its full-width rules. The saved markup stays as it is, so blocks still validate in the
	 * editor; only the rendered page loses the rule. Only the first (desktop) rule of a style tag is touched: a
	 * zero in a tablet or mobile rule is an override the owner set on purpose.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @param array  $block         Parsed block.
	 * @return string
	 */
	public function drop_zero_margin( $block_content, $block ) {
		if ( empty( $block['blockName'] ) || 0 !== strpos( $block['blockName'], 'wbcom-essential/' ) || false === strpos( $block_content, 'margin: 0' ) ) {
			return $block_content;
		}
		return (string) preg_replace( '/(<style>\s*[^{}<@]*\{[^{}<]*?)margin: 0(px|em|rem|%|vw|vh) 0\2 0\2 0\2;\s*/', '$1', $block_content );
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
				// No target date: the boxes would read 00 forever and the expiry message never shows, so the
				// block prints nothing (the editor already shows a "set a date" placeholder).
				if ( empty( $block['attrs']['targetDate'] ) ) {
					return '';
				}
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
					// Card, price and feature colours saved as inline styles with the old fixed defaults: dropped so
					// the theme colours apply in light and dark mode. Accent colours stay as saved.
					'class="wbe-pricing-cards__card" style="background-color:#ffffff;color:inherit"' => 'class="wbe-pricing-cards__card" style="color:inherit"',
					'class="wbe-pricing-cards__price" style="color:#1e1e2e"' => 'class="wbe-pricing-cards__price"',
					'class="wbe-pricing-cards__feature" style="color:#6c757d"' => 'class="wbe-pricing-cards__feature"',
				);
				break;
			case 'wbcom-essential/cta':
				// Pages saved before 4.7.2 wrote the old fixed neutral colours inline: dropped so the theme
				// colours apply (light and dark). Button colours stay as saved.
				$block_content = (string) preg_replace( '/(class="wp-block-wbcom-essential-cta [^"]*") style="background-color:#f8f9fa;/', '$1 style="', $block_content, 1 );
				$map           = array(
					'class="wbe-cta__heading" style="color:#1e1e2e"'     => 'class="wbe-cta__heading"',
					'class="wbe-cta__description" style="color:#6c757d"' => 'class="wbe-cta__description"',
				);
				break;
			case 'wbcom-essential/feature-grid':
				$block_content = (string) preg_replace( '/(class="wbe-feature-grid__card wbe-feature-grid__card--[a-z0-9-]+") style="background-color:#ffffff"/', '$1', $block_content );
				$map           = array(
					'class="wbe-feature-grid__title" style="color:#1e1e2e"'       => 'class="wbe-feature-grid__title"',
					'class="wbe-feature-grid__description" style="color:#6c757d"' => 'class="wbe-feature-grid__description"',
				);
				break;
			case 'wbcom-essential/testimonial-carousel':
				$map = array(
					'aria-label="Testimonial navigation"' => 'aria-label="' . esc_attr__( 'Testimonial navigation', 'wbcom-essential' ) . '"',
					'aria-label="Previous testimonial"'   => 'aria-label="' . esc_attr__( 'Previous testimonial', 'wbcom-essential' ) . '"',
					'aria-label="Next testimonial"'       => 'aria-label="' . esc_attr__( 'Next testimonial', 'wbcom-essential' ) . '"',
				);
				break;
			case 'wbcom-essential/hero':
				// Heroes saved with the pre-4.7.3 default gradient and 80% white subheading (2.93:1) get the
				// darker default gradient and a solid white subheading (4.57:1). A hero on the owner's own
				// background is left exactly as saved.
				$attrs = $block['attrs'] ?? array();
				if ( isset( $attrs['backgroundType'] ) || isset( $attrs['gradientStart'] ) || isset( $attrs['gradientEnd'] ) ) {
					return $block_content;
				}
				$map = array(
					'background:linear-gradient(135deg, #667eea 0%, #764ba2 100%)' => 'background:linear-gradient(135deg, #5a6fce 0%, #68428f 100%)',
					'class="wbe-hero__subheading" style="color:rgba(255,255,255,0.8)"' => 'class="wbe-hero__subheading" style="color:#ffffff"',
				);
				break;
			default:
				return $block_content;
		}

		return strtr( $block_content, $map );
	}

	/**
	 * Version block styles by plugin release.
	 *
	 * WordPress versions a block's style files with the block.json "version", which our blocks never
	 * change between releases, so browsers and page caches kept serving the old CSS after an update.
	 * Using the plugin version makes every release load its own block styles.
	 *
	 * @param array $metadata Block metadata read from block.json.
	 * @return array
	 */
	public function version_assets_by_release( $metadata ) {
		if ( 0 === strpos( $metadata['name'] ?? '', 'wbcom-essential/' ) ) {
			$metadata['version'] = WBCOM_ESSENTIAL_VERSION;
		}
		return $metadata;
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

		wp_register_style( 'wbe-design-tokens', WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/design-tokens.css', array(), WBCOM_ESSENTIAL_VERSION );

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

			$block_type = register_block_type( $block_dir );
			self::$registered_blocks[] = $block_name;

			// Every block stylesheet needs the shared tokens (and the theme bridge in them). As a dependency
			// they load wherever the block renders: post content, widget areas and templates alike.
			if ( $block_type ) {
				foreach ( (array) $block_type->style_handles as $handle ) {
					$style = wp_styles()->query( $handle, 'registered' );
					if ( $style && ! in_array( 'wbe-design-tokens', $style->deps, true ) ) {
						$style->deps[] = 'wbe-design-tokens';
					}
				}
			}
		}
	}
}
