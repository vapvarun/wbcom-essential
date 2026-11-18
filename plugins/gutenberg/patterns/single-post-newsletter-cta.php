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

// Full saved markup, not a self-closing comment: the CTA is a static block, so
// the editor checks this HTML against the block's save() output.
$wbe_cta_heading     = __( 'Enjoyed this article?', 'wbcom-essential' );
$wbe_cta_description = __( 'Subscribe to our newsletter for the latest updates and insights delivered straight to your inbox.', 'wbcom-essential' );
$wbe_cta_button      = __( 'Subscribe Now', 'wbcom-essential' );

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

<!-- wp:wbcom-essential/cta {"heading":' . wp_json_encode( $wbe_cta_heading ) . ',"description":' . wp_json_encode( $wbe_cta_description ) . ',"buttonText":' . wp_json_encode( $wbe_cta_button ) . '} -->
<div class="wp-block-wbcom-essential-cta wbe-block- wbe-cta wbe-cta--stacked wbe-cta--align-center" style="background-color:"><div class="wbe-cta__body"><h2 class="wbe-cta__heading" style="color:">' . esc_html( $wbe_cta_heading ) . '</h2><p class="wbe-cta__description" style="color:">' . esc_html( $wbe_cta_description ) . '</p></div><div class="wbe-cta__action"><a class="wbe-cta__btn" href="#">' . esc_html( $wbe_cta_button ) . '</a></div></div>
<!-- /wp:wbcom-essential/cta -->',
	)
);
