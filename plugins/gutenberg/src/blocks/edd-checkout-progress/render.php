<?php
/**
 * Server-side render for the EDD Checkout Progress block.
 *
 * Split out of the former EDD Enhanced Checkout wrapper in 4.7.0. EDD 3.7 made
 * `edd/checkout` a parent of inner blocks, so these sections now sit inside it
 * as siblings of EDD's own cart / personal-info / payment blocks instead of
 * being wrapped by a block of ours. That keeps our code out of the checkout
 * layout path entirely.
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

// Bail early if EDD is not active.
if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
	echo '<div class="wbcom-edd-checkout__notice">';
	echo '<p>' . esc_html__( 'Easy Digital Downloads is required for this block.', 'wbcom-essential' ) . '</p>';
	echo '</div>';
	return;
}

// Shared infrastructure: unique ID + CSS output + visibility classes.
$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

$block_id = ! empty( $unique_id ) ? 'wbcom-edd-checkout-progress-' . $unique_id : wp_unique_id( 'wbcom-edd-checkout-progress-' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbcom-edd-checkout ' . $vis_classes ),
		'id'    => esc_attr( $block_id ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
		<?php
		/*
		 * Deliberately carries no ARIA state. EDD's block checkout puts cart,
		 * details and payment on ONE page, so "Payment - upcoming" and
		 * aria-current="step" on Details announced a position that contradicts
		 * the page a screen reader user is already on. Nothing here is a link
		 * either, so role="navigation" added a landmark that navigates nowhere.
		 *
		 * The visible step labels remain readable in DOM order, which is true:
		 * they describe the flow. The visual states are CSS-only and unchanged.
		 */
		?>
		<div class="wbcom-edd-checkout__progress">
			<ol class="wbcom-edd-checkout__steps">

				<li class="wbcom-edd-checkout__step wbcom-edd-checkout__step--completed">
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--start"></div>
					<div class="wbcom-edd-checkout__step-circle" aria-hidden="true">
						<svg class="wbcom-edd-checkout__step-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
							<path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--end wbcom-edd-checkout__step-connector--filled"></div>
					<span class="wbcom-edd-checkout__step-label"><?php esc_html_e( 'Cart', 'wbcom-essential' ); ?></span>
				</li>

				<li class="wbcom-edd-checkout__step wbcom-edd-checkout__step--active">
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--start wbcom-edd-checkout__step-connector--filled"></div>
					<div class="wbcom-edd-checkout__step-circle" aria-hidden="true">
						<span class="wbcom-edd-checkout__step-number">2</span>
					</div>
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--end"></div>
					<span class="wbcom-edd-checkout__step-label"><?php esc_html_e( 'Details', 'wbcom-essential' ); ?></span>
				</li>

				<li class="wbcom-edd-checkout__step wbcom-edd-checkout__step--upcoming">
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--start"></div>
					<div class="wbcom-edd-checkout__step-circle" aria-hidden="true">
						<span class="wbcom-edd-checkout__step-number">3</span>
					</div>
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--end"></div>
					<span class="wbcom-edd-checkout__step-label"><?php esc_html_e( 'Payment', 'wbcom-essential' ); ?></span>
				</li>

				<li class="wbcom-edd-checkout__step wbcom-edd-checkout__step--upcoming">
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--start"></div>
					<div class="wbcom-edd-checkout__step-circle" aria-hidden="true">
						<span class="wbcom-edd-checkout__step-number">4</span>
					</div>
					<div class="wbcom-edd-checkout__step-connector wbcom-edd-checkout__step-connector--end wbcom-edd-checkout__step-connector--last"></div>
					<span class="wbcom-edd-checkout__step-label"><?php esc_html_e( 'Complete', 'wbcom-essential' ); ?></span>
				</li>

			</ol>
		</div>
</div>
