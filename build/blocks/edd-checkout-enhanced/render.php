<?php
/**
 * Server-side render for the legacy EDD Enhanced Checkout wrapper.
 *
 * DEPRECATED as of 4.7.0. This block used to wrap EDD's checkout and render all
 * of the surrounding sections itself. EDD 3.7 turned `edd/checkout` into a
 * parent of inner blocks, so those sections are now standalone blocks that sit
 * inside EDD's checkout as siblings of its cart / personal-info / payment
 * blocks:
 *
 *   wbcom-essential/edd-checkout-progress
 *   wbcom-essential/edd-checkout-trust
 *   wbcom-essential/edd-checkout-social
 *   wbcom-essential/edd-checkout-recommendations
 *
 * Keeping our block out of the checkout layout path is the point: while it was
 * in that path, EDD could not detect the page as a block checkout and served
 * its legacy shortcode checkout instead.
 *
 * wbcom_essential_upgrade_470_checkout_block() rewrites saved pages to the new
 * structure. This file only exists so a page the migration has not reached yet
 * (a draft, a revision restored later, an imported page) still renders its
 * inner blocks instead of disappearing. It is removed from the inserter, and
 * should be deleted once the install base has moved past 4.7.0.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Nothing nested (a pre-4.7.0 page the migration has not rewritten): fall back
// to EDD's checkout so the page is never a blank checkout.
if ( '' === trim( (string) $content ) ) {
	echo do_shortcode( '[download_checkout]' );
	return;
}

echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Inner block output, already rendered and escaped by the block API.
