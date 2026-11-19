<?php
/**
 * Product Grid Block - Server-Side Render
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

if ( ! class_exists( 'WooCommerce' ) ) {
	wbcom_essential_block_owner_notice( __( 'WooCommerce plugin is required for this block.', 'wbcom-essential' ) );
	return;
}

use WBCOM_ESSENTIAL\Gutenberg\WBE_CSS;

// ── Extract attributes ────────────────────────────────────────────────────────
$unique_id      = sanitize_html_class( $attributes['uniqueId'] ?? '' );
$columns        = absint( $attributes['columns'] ?? 4 );
$cols_tablet    = absint( $attributes['columnsTablet'] ?? 2 );
$cols_mobile    = absint( $attributes['columnsMobile'] ?? 1 );
$posts_per      = absint( $attributes['postsPerPage'] ?? 8 );
$cat_ids        = array_map( 'absint', (array) ( $attributes['categories'] ?? array() ) );
$order_by       = sanitize_key( $attributes['orderBy'] ?? 'date' );
$order          = in_array( strtoupper( $attributes['order'] ?? 'DESC' ), array( 'ASC', 'DESC' ), true ) // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- block render.php runs inside WP_Block::render(), not the global scope.
	? strtoupper( $attributes['order'] )
	: 'DESC';
$show_image     = ! empty( $attributes['showImage'] );
$show_price     = ! empty( $attributes['showPrice'] );
$show_rating    = ! empty( $attributes['showRating'] );
$show_atc       = ! empty( $attributes['showAddToCart'] );
$show_sale      = ! empty( $attributes['showSaleBadge'] );
$image_ratio    = sanitize_text_field( $attributes['imageRatio'] ?? '1/1' );
$gap            = absint( $attributes['gap'] ?? 24 );
$card_bg        = sanitize_hex_color( $attributes['cardBg'] ?? '' ) ?: 'var(--wbcom-card-bg, #ffffff)';
$title_color    = sanitize_hex_color( $attributes['titleColor'] ?? '' ) ?: 'var(--wbcom-heading-color, #1e1e2e)';
$price_color    = sanitize_hex_color( $attributes['priceColor'] ?? '' ) ?: 'var(--wbe-color-accent, #667eea)';
$atc_bg         = sanitize_hex_color( $attributes['atcBg'] ?? '' ) ?: 'var(--wbcom-button-bg, var(--wbe-color-accent, #667eea))';
$atc_color      = sanitize_hex_color( $attributes['atcColor'] ?? '' ) ?: 'var(--wbcom-button-color, #ffffff)';
// Unset: the danger colour darkened so the white label holds 4.5:1 (the old #e74c3c gave 3.82:1).
$sale_color     = sanitize_hex_color( $attributes['saleBadgeColor'] ?? '' ) ?: 'color-mix(in srgb, var(--wbe-color-danger) 80%, black)';

// Visibility classes.
$visibility_classes = '';
if ( class_exists( 'WBCOM_ESSENTIAL\Gutenberg\WBE_CSS' ) ) {
	$visibility_classes = WBE_CSS::get_visibility_classes( $attributes );
}

// ── Scoped CSS ────────────────────────────────────────────────────────────────
if ( ! empty( $unique_id ) && class_exists( 'WBCOM_ESSENTIAL\Gutenberg\WBE_CSS' ) ) {
	WBE_CSS::add( $unique_id, $attributes );
	WBE_CSS::init();
}

// ── Border radius & box-shadow ────────────────────────────────────────────────
$border_radius = $attributes['borderRadius'] ?? array( 'top' => 8, 'right' => 8, 'bottom' => 8, 'left' => 8 );
$radius_unit   = sanitize_text_field( $attributes['borderRadiusUnit'] ?? 'px' );
$radius_val    = sprintf(
	'%s%s %s%s %s%s %s%s',
	absint( $border_radius['top'] ?? 8 ), $radius_unit,
	absint( $border_radius['right'] ?? 8 ), $radius_unit,
	absint( $border_radius['bottom'] ?? 8 ), $radius_unit,
	absint( $border_radius['left'] ?? 8 ), $radius_unit
);

$box_shadow_val = 'none';
if ( ! empty( $attributes['boxShadow'] ) ) {
	$box_shadow_val = sprintf(
		'%dpx %dpx %dpx %dpx %s',
		intval( $attributes['shadowHorizontal'] ?? 0 ),
		intval( $attributes['shadowVertical'] ?? 8 ),
		absint( $attributes['shadowBlur'] ?? 24 ),
		intval( $attributes['shadowSpread'] ?? 0 ),
		sanitize_text_field( $attributes['shadowColor'] ?? 'rgba(0,0,0,0.08)' )
	);
}

$ratio_css = esc_attr( str_replace( '/', ' / ', $image_ratio ) );

// ── Map orderby to WP_Query args ──────────────────────────────────────────────
$meta_key     = '';
$orderby_val  = $order_by;
if ( 'price' === $order_by ) {
	$orderby_val = 'meta_value_num';
	$meta_key    = '_price';
} elseif ( 'popularity' === $order_by ) {
	$orderby_val = 'meta_value_num';
	$meta_key    = 'total_sales';
} elseif ( 'rating' === $order_by ) {
	$orderby_val = 'meta_value_num';
	$meta_key    = '_wc_average_rating';
}

// ── Query ─────────────────────────────────────────────────────────────────────
$query_args = array(
	'post_type'      => 'product',
	'posts_per_page' => $posts_per,
	'orderby'        => $orderby_val,
	'order'          => $order,
	'post_status'    => 'publish',
	'no_found_rows'  => true,
);
if ( $meta_key ) {
	$query_args['meta_key'] = $meta_key; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
}
$tax_query  = array();
if ( ! empty( $cat_ids ) ) {
	$tax_query[] = array(
		'taxonomy' => 'product_cat',
		'field'    => 'term_id',
		'terms'    => $cat_ids,
	);
}
// Only what a shopper can see in the shop: no catalog-hidden products, no out-of-stock ones when the store hides them.
$visibility = wbcom_essential_product_visibility_tax_query();
if ( $visibility ) {
	$tax_query[] = $visibility;
}
if ( $tax_query ) {
	$query_args['tax_query'] = $tax_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
}

$query = new WP_Query( $query_args );

if ( ! $query->have_posts() ) {
	echo '<div class="wbe-product-grid wbe-product-grid--empty"><p>' . esc_html__( 'No products found.', 'wbcom-essential' ) . '</p></div>';
	return;
}

// ── Wrapper ───────────────────────────────────────────────────────────────────
$wrapper_class = trim( implode( ' ', array_filter( array(
	'wbe-product-grid',
	$unique_id ? 'wbe-block-' . $unique_id : '',
	$visibility_classes,
) ) ) );

// ── Design tokens ─────────────────────────────────────────────────────────────
// Set on the wrapper's style attribute instead of a printed style element. style.css switches the
// column count to the tablet / mobile values at its breakpoints.
$token_style = '';
if ( $unique_id ) {
	$token_style = sprintf(
		'--wbe-pg-cols: %1$d; --wbe-pg-cols-tablet: %2$d; --wbe-pg-cols-mobile: %3$d; --wbe-pg-gap: %4$dpx; --wbe-pg-card-bg: %5$s; --wbe-pg-title-color: %6$s; --wbe-pg-price-color: %7$s; --wbe-pg-sale-color: %8$s; --wbe-pg-card-radius: %9$s; --wbe-pg-card-shadow: %10$s; --wbe-pg-image-ratio: %11$s; --wbe-pg-atc-bg: %12$s; --wbe-pg-atc-color: %13$s;',
		$columns,
		$cols_tablet,
		$cols_mobile,
		$gap,
		esc_attr( $card_bg ),
		esc_attr( $title_color ),
		esc_attr( $price_color ),
		esc_attr( $sale_color ),
		esc_attr( $radius_val ),
		esc_attr( $box_shadow_val ),
		esc_attr( $ratio_css ),
		esc_attr( $atc_bg ),
		esc_attr( $atc_color )
	);
}

$wrapper_attrs = get_block_wrapper_attributes( array(
	'class' => $wrapper_class,
	'style' => $token_style,
) );

?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbe-product-grid__inner">
		<?php
		while ( $query->have_posts() ) :
			$query->the_post();
			$product = wc_get_product( get_the_ID() );
			if ( ! $product ) {
				continue;
			}

			$product_id   = $product->get_id();
			$permalink    = get_permalink( $product_id );
			$title        = $product->get_name(); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited -- block render.php runs inside WP_Block::render(), not the global scope.
			$is_on_sale   = $product->is_on_sale();
			$rating       = (float) $product->get_average_rating();
			$rating_count = $product->get_rating_count();
			$thumb_id     = $product->get_image_id();
			$thumb_url    = $thumb_id ? wp_get_attachment_image_url( $thumb_id, 'woocommerce_thumbnail' ) : wc_placeholder_img_src( 'woocommerce_thumbnail' );
			$price_html   = $product->get_price_html();
			?>
			<article class="wbe-product-grid__card" aria-label="<?php echo esc_attr( $title ); ?>">
				<?php if ( $show_image ) : ?>
				<div class="wbe-product-grid__image-wrap">
					<a href="<?php echo esc_url( $permalink ); ?>" tabindex="-1">
						<img
							src="<?php echo esc_url( $thumb_url ); ?>"
							alt=""
							class="wbe-product-grid__image"
							loading="lazy"
							decoding="async"
						/>
					</a>
					<?php if ( $show_sale && $is_on_sale ) : ?>
					<span class="wbe-product-grid__sale-badge" aria-label="<?php esc_attr_e( 'Sale', 'wbcom-essential' ); ?>">
						<?php esc_html_e( 'Sale', 'wbcom-essential' ); ?>
					</span>
					<?php endif; ?>
				</div>
				<?php endif; ?>

				<div class="wbe-product-grid__body">
					<h3 class="wbe-product-grid__title">
						<a href="<?php echo esc_url( $permalink ); ?>"><?php echo esc_html( $title ); ?></a>
					</h3>

					<?php if ( $show_rating && $rating_count > 0 ) : ?>
					<div class="wbe-product-grid__rating" aria-label="<?php echo esc_attr( sprintf( /* translators: %s: average product rating, e.g. 4.5. */ __( 'Rated %s out of 5', 'wbcom-essential' ), number_format_i18n( $rating, 1 ) ) ); ?>">
						<?php
						for ( $i = 1; $i <= 5; $i++ ) :
							if ( $rating >= $i ) {
								$star_class = 'wbe-product-grid__star wbe-product-grid__star--full';
							} elseif ( $rating >= $i - 0.5 ) {
								$star_class = 'wbe-product-grid__star wbe-product-grid__star--half';
							} else {
								$star_class = 'wbe-product-grid__star wbe-product-grid__star--empty';
							}
							?>
							<span class="<?php echo esc_attr( $star_class ); ?>" aria-hidden="true"></span>
						<?php endfor; ?>
					</div>
					<?php endif; ?>

					<?php if ( $show_price && $price_html ) : ?>
					<div class="wbe-product-grid__price">
						<?php echo wp_kses_post( $price_html ); ?>
					</div>
					<?php endif; ?>

					<?php if ( $show_atc ) : ?>
					<div class="wbe-product-grid__atc">
						<?php
						woocommerce_template_loop_add_to_cart(
							array(
								'quantity' => 1,
							)
						);
						?>
					</div>
					<?php endif; ?>
				</div>
			</article>
		<?php endwhile; ?>
	</div>
</div>
<?php
wp_reset_postdata();
