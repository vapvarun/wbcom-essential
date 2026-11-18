<?php
/**
 * WBE_Schema -- Structured data (JSON-LD) collector for blocks.
 *
 * @package WBcom_Essential
 */

namespace WBCOM_ESSENTIAL\Gutenberg;

defined( 'ABSPATH' ) || exit;

class WBE_Schema {

	/**
	 * Collected schema items.
	 *
	 * @var array
	 */
	private static $items = array();

	/**
	 * Add a FAQ item (question + answer).
	 *
	 * @param string $question The question text.
	 * @param string $answer   The answer text/HTML.
	 */
	public static function add_faq( $question, $answer ) {
		if ( ! isset( self::$items['faq'] ) ) {
			self::$items['faq'] = array();
		}

		// Keyed by question, so a block rendered twice or a question repeated across blocks is listed once.
		self::$items['faq'][ md5( wp_strip_all_tags( $question ) ) ] = array(
			'@type'          => 'Question',
			'name'           => wp_strip_all_tags( $question ),
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_kses_post( $answer ),
			),
		);
	}

	/**
	 * Add a HowTo step.
	 *
	 * @param string $name Step name.
	 * @param string $text Step description.
	 */
	public static function add_howto_step( $name, $text ) {
		if ( ! isset( self::$items['howto'] ) ) {
			self::$items['howto'] = array();
		}

		self::$items['howto'][] = array(
			'@type' => 'HowToStep',
			'name'  => wp_strip_all_tags( $name ),
			'text'  => wp_kses_post( $text ),
		);
	}

	/**
	 * Output JSON-LD in the footer.
	 */
	public static function output() {
		if ( empty( self::$items ) ) {
			return;
		}

		$schemas = array();

		// FAQ schema: one FAQPage for the whole page. Skipped when a Yoast or Rank Math FAQ block on the same
		// page already prints its own FAQPage, so the page never carries two.
		if ( ! empty( self::$items['faq'] ) && ! has_block( 'yoast/faq-block' ) && ! has_block( 'rank-math/faq-block' ) ) {
			$schemas[] = array(
				'@context'   => 'https://schema.org',
				'@type'      => 'FAQPage',
				'mainEntity' => array_values( self::$items['faq'] ),
			);
		}

		// HowTo schema.
		if ( ! empty( self::$items['howto'] ) ) {
			$schemas[] = array(
				'@context' => 'https://schema.org',
				'@type'    => 'HowTo',
				'step'     => self::$items['howto'],
			);
		}

		foreach ( $schemas as $schema ) {
			echo '<script type="application/ld+json">';
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON-LD is built from sanitized data.
			echo wp_json_encode( $schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
			echo "</script>\n";
		}
	}

	/**
	 * Move a FAQ Accordion's saved FAQPage JSON-LD into the page-wide collector.
	 *
	 * Each block saves its own FAQPage script, so a page with several FAQ blocks printed several FAQPage
	 * objects, which search engines report as duplicates. The script stays in the saved content (the block
	 * still validates); only the rendered page drops it and lists its questions in the one footer FAQPage.
	 *
	 * @param string $block_content Rendered block HTML.
	 * @return string
	 */
	public static function collect_faq_block( $block_content ) {
		if ( false === strpos( $block_content, 'application/ld+json' ) ) {
			return $block_content;
		}

		return (string) preg_replace_callback(
			'#<script type="application/ld\+json">(.*?)</script>#s',
			static function ( $match ) {
				$schema = json_decode( $match[1], true );
				if ( ! is_array( $schema ) || 'FAQPage' !== ( $schema['@type'] ?? '' ) || empty( $schema['mainEntity'] ) ) {
					return $match[0];
				}
				foreach ( (array) $schema['mainEntity'] as $item ) {
					if ( ! empty( $item['name'] ) ) {
						self::add_faq( (string) $item['name'], (string) ( $item['acceptedAnswer']['text'] ?? '' ) );
					}
				}
				return '';
			},
			$block_content
		);
	}

	/**
	 * Initialize -- hook output to footer.
	 */
	public static function init() {
		add_filter( 'render_block_wbcom-essential/faq-accordion', array( __CLASS__, 'collect_faq_block' ) );
		add_action( 'wp_footer', array( __CLASS__, 'output' ), 20 );
	}
}
