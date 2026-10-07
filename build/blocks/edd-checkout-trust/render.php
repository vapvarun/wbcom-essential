<?php
/**
 * Server-side render for the EDD Checkout Trust Badges block.
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

$block_id = ! empty( $unique_id ) ? 'wbcom-edd-checkout-trust-' . $unique_id : wp_unique_id( 'wbcom-edd-checkout-trust-' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbcom-edd-checkout ' . $vis_classes ),
		'id'    => esc_attr( $block_id ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

<?php
$trust_badge_text = $attributes['trustBadgeText'] ?? __( 'Secure checkout', 'wbcom-essential' );

/*
 * Every badge is a claim about the store, so each one is switchable and its
 * wording is the owner's to set. 4.7.0 fixed this for trustBadgeText and
 * paymentIcons but the audit only looked at block.json defaults, so three
 * claims hardcoded in this template were missed: the encryption line, and the
 * whole "Priority Support / Dedicated support for all customers" badge, which
 * a solo store owner had no way to remove.
 *
 * The support badge defaults OFF because it is the one claim a store cannot
 * make simply by having a checkout.
 */
$show_secure    = $attributes['showSecureBadge'] ?? true;
$show_guarantee = $attributes['showGuaranteeBadge'] ?? true;
$show_support   = $attributes['showSupportBadge'] ?? false;
$secure_text    = $attributes['secureBadgeText'] ?? __( 'Your payment information is encrypted and secure.', 'wbcom-essential' );
$support_title  = $attributes['supportBadgeTitle'] ?? __( 'Priority Support', 'wbcom-essential' );
$support_text   = $attributes['supportBadgeText'] ?? __( 'Dedicated support for all customers.', 'wbcom-essential' );
?>
		<div class="wbcom-edd-checkout__trust-section" aria-label="<?php esc_attr_e( 'Security and trust information', 'wbcom-essential' ); ?>">

			<?php if ( $show_secure || $show_guarantee || $show_support ) : ?>
			<div class="wbcom-edd-checkout__trust-badges">
				<?php if ( $show_secure ) : ?>
				<div class="wbcom-edd-checkout__trust-badge">
					<div class="wbcom-edd-checkout__trust-badge-icon wbcom-edd-checkout__trust-badge-icon--shield">
						<svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
							<path d="M12 1L3 5v6c0 5.25 3.75 10.15 9 11.25C17.25 21.15 21 16.25 21 11V5l-9-4z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
							<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="wbcom-edd-checkout__trust-badge-content">
						<span class="wbcom-edd-checkout__trust-badge-title"><?php echo esc_html( $trust_badge_text ); ?></span>
						<span class="wbcom-edd-checkout__trust-badge-desc"><?php echo esc_html( $secure_text ); ?></span>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( $show_guarantee ) : ?>
				<div class="wbcom-edd-checkout__trust-badge">
					<div class="wbcom-edd-checkout__trust-badge-icon wbcom-edd-checkout__trust-badge-icon--guarantee">
						<svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
							<circle cx="12" cy="12" r="10" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5"/>
							<path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="wbcom-edd-checkout__trust-badge-content">
						<span class="wbcom-edd-checkout__trust-badge-title">
							<?php
							printf(
								/* translators: %d: number of days in the money-back guarantee. */
								esc_html__( '%d-Day Money Back', 'wbcom-essential' ),
								absint( $attributes['guaranteeDays'] ?? 30 )
							);
							?>
						</span>
						<span class="wbcom-edd-checkout__trust-badge-desc">
							<?php
							// Editable: refund terms differ per store, and a blanket
							// "full refund if you are not satisfied" is a stronger
							// promise than most policies actually make.
							echo esc_html( $attributes['guaranteeText'] ?? __( 'Covered by our money-back guarantee.', 'wbcom-essential' ) );
							?>
						</span>
					</div>
				</div>
				<?php endif; ?>

				<?php if ( $show_support ) : ?>
				<div class="wbcom-edd-checkout__trust-badge">
					<div class="wbcom-edd-checkout__trust-badge-icon wbcom-edd-checkout__trust-badge-icon--support">
						<svg viewBox="0 0 24 24" fill="none" width="22" height="22" aria-hidden="true">
							<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" fill="currentColor" fill-opacity="0.15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</div>
					<div class="wbcom-edd-checkout__trust-badge-content">
						<span class="wbcom-edd-checkout__trust-badge-title"><?php echo esc_html( $support_title ); ?></span>
						<span class="wbcom-edd-checkout__trust-badge-desc"><?php echo esc_html( $support_text ); ?></span>
					</div>
				</div>
				<?php endif; ?>
			</div>
			<?php endif; ?>

			<?php
			$payment_icons = $attributes['paymentIcons'] ?? array(
				'visa'       => true,
				'mastercard' => true,
				'paypal'     => true,
				'stripe'     => true,
				'razorpay'   => true,
			);
			?>
			<?php
			/*
			 * The icons claim which methods the store accepts, so they are opt-in.
			 * With none enabled the whole row is skipped rather than rendering a
			 * bare "Accepted payments" label with nothing after it.
			 */
			if ( array_filter( (array) $payment_icons ) ) :
				?>
			<div class="wbcom-edd-checkout__payment-methods">
				<span class="wbcom-edd-checkout__payment-label"><?php esc_html_e( 'Accepted payments', 'wbcom-essential' ); ?></span>
				<div class="wbcom-edd-checkout__payment-icons">
					<?php if ( ! empty( $payment_icons['visa'] ) ) : ?>
					<span class="wbcom-edd-checkout__payment-icon" title="Visa" aria-label="Visa">
						<svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#1A1F71"/><path d="M15.7 16.4l1.6-9.8h2.5l-1.6 9.8h-2.5zm10.5-9.6c-.5-.2-1.3-.4-2.2-.4-2.5 0-4.2 1.3-4.2 3.1 0 1.4 1.2 2.1 2.2 2.6 1 .5 1.3.8 1.3 1.2 0 .6-.8 1-1.5 1-.9 0-1.5-.2-2.3-.5l-.3-.2-.3 2c.6.3 1.6.5 2.7.5 2.6 0 4.3-1.3 4.3-3.2 0-1.1-.6-1.9-2-2.6-.8-.4-1.3-.7-1.3-1.2 0-.4.4-.8 1.3-.8.8 0 1.3.2 1.7.3l.2.1.3-1.9zM30.8 6.6h-2c-.6 0-1 .2-1.3.7l-3.6 8.7h2.5l.5-1.4h3.1l.3 1.4h2.2l-1.7-9.4zm-3.2 6.1l1.3-3.5.7 3.5h-2zM14.1 6.6l-2.3 6.7-.3-1.2c-.4-1.5-1.8-3.1-3.4-3.9l2.2 8.2h2.6l3.8-9.8h-2.6z" fill="#fff"/><path d="M9.5 6.6H5.7l0 .2c3.1.8 5.1 2.7 6 5l-.9-4.4c-.1-.6-.6-.8-1.3-.8z" fill="#F9A533"/></svg>
					</span>
					<?php endif; ?>
					<?php if ( ! empty( $payment_icons['mastercard'] ) ) : ?>
					<span class="wbcom-edd-checkout__payment-icon" title="Mastercard" aria-label="Mastercard">
						<svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 7.3a7 7 0 010 9.4 7 7 0 000-9.4z" fill="#FF5F00"/></svg>
					</span>
					<?php endif; ?>
					<?php if ( ! empty( $payment_icons['paypal'] ) ) : ?>
					<span class="wbcom-edd-checkout__payment-icon" title="PayPal" aria-label="PayPal">
						<svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#fff" stroke="#e6e6e6"/><path d="M27.1 8.4c.1-.6.1-1-.1-1.4-.3-.5-.9-.7-1.7-.7h-3.8c-.2 0-.4.2-.5.4l-1.5 9.5c0 .2.1.3.3.3h2l.5-3.1v.1c0-.2.2-.4.5-.4h1c2 0 3.5-.8 4-3.1 0-.1 0-.2.1-.2.1.1.2-.5-.8-1.4z" fill="#003087"/><path d="M27.1 8.4c-.5 2.3-2 3.1-4 3.1h-1c-.2 0-.4.2-.5.4l-.6 3.8c0 .1.1.3.3.3h1.8c.2 0 .4-.1.4-.3v-.1l.3-2.2v-.1c0-.2.2-.3.4-.3h.3c1.7 0 3.1-.7 3.5-2.8.2-.9.1-1.6-.2-2.1l.3.3z" fill="#009cde"/><path d="M16.4 8.4c0-.2.2-.4.5-.4h3.8c.4 0 .9 0 1.2.1.1 0 .2.1.3.1.1 0 .2.1.3.1.1 0 .1 0 .2.1.3.1.5.3.6.5.2-1.1 0-1.9-.6-2.6-.7-.8-2-1.1-3.6-1.1h-4.9c-.3 0-.5.2-.6.4l-2 12.9c0 .2.1.4.3.4h3l.8-4.7.7-5.8z" fill="#012169"/></svg>
					</span>
					<?php endif; ?>
					<?php if ( ! empty( $payment_icons['stripe'] ) ) : ?>
					<span class="wbcom-edd-checkout__payment-icon" title="Stripe" aria-label="Stripe">
						<svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#6772E5"/><path d="M18 10.8c0-1-.5-1.3-1.5-1.3-.7 0-1.5.3-2.1.6l-.3-1.4c.7-.3 1.6-.6 2.7-.6 2 0 2.8.9 2.8 2.7v5.1h-1.5l-.1-.7c-.6.5-1.3.9-2.1.9-1.3 0-2.2-.7-2.2-2 0-1.6 1.5-2.3 3.8-2.7v-.6zm0 1.5c-1.4.3-2.1.7-2.1 1.4 0 .5.4.8.9.8.6 0 1-.3 1.2-.5v-1.7zm5.3-3.3c.7-.8 1.4-1.2 2.3-1.2 1.5 0 2.4 1.1 2.4 3v4.1h-1.7v-3.9c0-1.1-.4-1.6-1.2-1.6-.6 0-1 .3-1.4.7v4.8h-1.7V5.6h1.7v4.7l-.4-.3z" fill="#fff"/></svg>
					</span>
					<?php endif; ?>
					<?php if ( ! empty( $payment_icons['razorpay'] ) ) : ?>
					<span class="wbcom-edd-checkout__payment-icon" title="Razorpay" aria-label="Razorpay">
						<svg viewBox="0 0 38 24" width="38" height="24" aria-hidden="true"><rect width="38" height="24" rx="3" fill="#072654"/><path d="M13.2 7l-1.7 6.3h1.6l.4-1.5h1.9l-.3 1.5h1.6L18.4 7h-2.6zm.8 3.5l.6-2.3h.1l-.3 2.3h-.4zm5.4-3.5l-1.7 6.3h1.6l.7-2.5h.1l-.1.6.4 1.9h1.7l-.6-2.5c.7-.3 1.1-.9 1.3-1.7.3-1.2-.2-2.1-1.5-2.1h-1.9zm.8 1.2h.4c.4 0 .6.3.5.8-.1.5-.4.8-.8.8h-.4l.3-1.6zM10.8 14.6l-.4 1.4H8l.4-1.4h2.4zm.6-2.2l-.4 1.4H8.6l.4-1.4H11.4zm.6-2.2l-.4 1.4H9.2l.4-1.4H12zm5.4 4.4l-.4 1.4h-2.4l.4-1.4H17.4zm.6-2.2l-.4 1.4h-2.4l.4-1.4H18zm.6-2.2l-.4 1.4h-2.4l.4-1.4h2.4zm8.7 6.5h1.5l1.2-4.3c.1-.5.1-.9 0-1.1-.2-.4-.7-.5-1.2-.5h-1.2l-1.5 5.9h1.5l.5-1.8h.4c.2 0 .3.1.2.3l-.4 1.5z" fill="#fff"/></svg>
					</span>
					<?php endif; ?>
				</div>
			</div>
			<?php endif; ?>
		</div>
</div>
