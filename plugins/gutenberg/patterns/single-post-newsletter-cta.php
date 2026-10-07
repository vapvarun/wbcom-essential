<?php
/**
 * Single Post Newsletter CTA Pattern.
 *
 * A newsletter subscribe call-to-action for use after article content.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/plugins/gutenberg/patterns
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_pattern(
	'wbcom-essential/single-post-newsletter-cta',
	array(
		'title'       => __( 'Newsletter CTA', 'wbcom-essential' ),
		'description' => __( 'A centered newsletter subscribe call-to-action box.', 'wbcom-essential' ),
		'categories'  => array( 'wbcom-essential-single-post' ),
		'keywords'    => array( 'newsletter', 'subscribe', 'cta', 'email' ),
		'content'     => '<!-- wp:spacer {"height":"32px"} -->
<div style="height:32px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:wbcom-essential/cta {"heading":' . wp_json_encode( __( 'Enjoyed this article?', 'wbcom-essential' ) ) . ',"description":' . wp_json_encode( __( 'Subscribe to our newsletter for the latest updates and insights delivered straight to your inbox.', 'wbcom-essential' ) ) . ',"buttonText":' . wp_json_encode( __( 'Subscribe Now', 'wbcom-essential' ) ) . ',"buttonUrl":"#","alignment":"center","useThemeColors":true} /-->',
	)
);
