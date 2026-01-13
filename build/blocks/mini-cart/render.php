<?php
/**
 * Mini Cart Block - Server-Side Render
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Check if WooCommerce is active.
if ( ! class_exists( 'WooCommerce' ) ) {
	return;
}

$show_icon        = isset( $attributes['showIcon'] ) ? $attributes['showIcon'] : true;
$show_count       = isset( $attributes['showCount'] ) ? $attributes['showCount'] : true;
$show_total       = isset( $attributes['showTotal'] ) ? $attributes['showTotal'] : true;
$show_dropdown    = isset( $attributes['showDropdown'] ) ? $attributes['showDropdown'] : true;
$icon_size        = isset( $attributes['iconSize'] ) ? absint( $attributes['iconSize'] ) : 24;

// Theme colors toggle.
$use_theme_colors = isset( $attributes['useThemeColors'] ) ? $attributes['useThemeColors'] : false;

// Colors.
$icon_color       = ! empty( $attributes['iconColor'] ) ? $attributes['iconColor'] : '';
$count_bg_color   = ! empty( $attributes['countBgColor'] ) ? $attributes['countBgColor'] : '#e53935';
$count_text_color = ! empty( $attributes['countTextColor'] ) ? $attributes['countTextColor'] : '#ffffff';
$total_color      = ! empty( $attributes['totalColor'] ) ? $attributes['totalColor'] : '';
$dropdown_bg      = ! empty( $attributes['dropdownBgColor'] ) ? $attributes['dropdownBgColor'] : '#ffffff';

// Get cart data - ensure WC() is available.
$wc_instance = WC();
$cart_count  = ( $wc_instance && $wc_instance->cart ) ? $wc_instance->cart->get_cart_contents_count() : 0;
$cart_total  = ( $wc_instance && $wc_instance->cart ) ? $wc_instance->cart->get_cart_total() : wc_price( 0 );
$cart_url    = wc_get_cart_url();

// Build inline styles - layout always, colors only when not using theme colors.
$inline_styles = array(
	'--icon-size' => $icon_size . 'px',
);

// Add color styles only when NOT using theme colors.
if ( ! $use_theme_colors ) {
	$inline_styles['--icon-color']       = $icon_color;
	$inline_styles['--count-bg-color']   = $count_bg_color;
	$inline_styles['--count-text-color'] = $count_text_color;
	$inline_styles['--total-color']      = $total_color;
	$inline_styles['--dropdown-bg']      = $dropdown_bg;
}

$inline_styles = array_filter( $inline_styles );
$style_string  = '';
foreach ( $inline_styles as $property => $value ) {
	$style_string .= esc_attr( $property ) . ':' . esc_attr( $value ) . ';';
}

// Build wrapper classes.
$wrapper_classes = array( 'wbcom-essential-mini-cart' );
if ( $show_dropdown ) {
	$wrapper_classes[] = 'has-dropdown';
}
if ( $use_theme_colors ) {
	$wrapper_classes[] = 'use-theme-colors';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'         => implode( ' ', $wrapper_classes ),
		'style'         => $style_string,
		'data-dropdown' => $show_dropdown ? 'true' : 'false',
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-essential-mini-cart__trigger">
		<?php if ( $show_icon ) : ?>
			<span class="wbcom-essential-mini-cart__icon">
				<span class="dashicons dashicons-cart"></span>
			</span>
		<?php endif; ?>

		<?php if ( $show_count ) : ?>
			<span class="wbcom-essential-mini-cart__count" data-cart-count="<?php echo esc_attr( $cart_count ); ?>">
				<?php echo esc_html( $cart_count ); ?>
			</span>
		<?php endif; ?>

		<?php if ( $show_total ) : ?>
			<span class="wbcom-essential-mini-cart__total" data-cart-total>
				<?php echo wp_kses_post( $cart_total ); ?>
			</span>
		<?php endif; ?>
	</a>

	<?php if ( $show_dropdown ) : ?>
		<div class="wbcom-essential-mini-cart__dropdown">
			<div class="wbcom-essential-mini-cart__dropdown-content">
				<?php if ( $cart_count > 0 ) : ?>
					<ul class="wbcom-essential-mini-cart__items">
						<?php
						foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) :
							$product   = $cart_item['data'];
							$quantity  = $cart_item['quantity'];
							$subtotal  = WC()->cart->get_product_subtotal( $product, $quantity );
							$permalink = $product->get_permalink( $cart_item );
							?>
							<li class="wbcom-essential-mini-cart__item">
								<div class="wbcom-essential-mini-cart__item-image">
									<?php echo $product->get_image( 'thumbnail' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								</div>
								<div class="wbcom-essential-mini-cart__item-details">
									<a href="<?php echo esc_url( $permalink ); ?>" class="wbcom-essential-mini-cart__item-title">
										<?php echo esc_html( $product->get_name() ); ?>
									</a>
									<span class="wbcom-essential-mini-cart__item-quantity">
										<?php echo esc_html( $quantity ); ?> &times; <?php echo wp_kses_post( $product->get_price_html() ); ?>
									</span>
								</div>
							</li>
						<?php endforeach; ?>
					</ul>

					<div class="wbcom-essential-mini-cart__footer">
						<div class="wbcom-essential-mini-cart__subtotal">
							<span><?php esc_html_e( 'Subtotal:', 'wbcom-essential' ); ?></span>
							<span><?php echo wp_kses_post( $cart_total ); ?></span>
						</div>
						<div class="wbcom-essential-mini-cart__buttons">
							<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="wbcom-essential-mini-cart__button wbcom-essential-mini-cart__button--view">
								<?php esc_html_e( 'View Cart', 'wbcom-essential' ); ?>
							</a>
							<a href="<?php echo esc_url( wc_get_checkout_url() ); ?>" class="wbcom-essential-mini-cart__button wbcom-essential-mini-cart__button--checkout">
								<?php esc_html_e( 'Checkout', 'wbcom-essential' ); ?>
							</a>
						</div>
					</div>
				<?php else : ?>
					<p class="wbcom-essential-mini-cart__empty">
						<?php esc_html_e( 'Your cart is empty.', 'wbcom-essential' ); ?>
					</p>
				<?php endif; ?>
			</div>
		</div>
	<?php endif; ?>
</div>
