<?php
/**
 * Server-side render for Product Catalog block (v2).
 *
 * Outputs the container div with all data-attributes needed by view.js.
 * The JS (view.js) handles the AJAX product fetching and DOM rendering.
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

if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
	echo '<p class="wbe-block-notice">' . esc_html__( 'Easy Digital Downloads plugin is required for this block.', 'wbcom-essential' ) . '</p>';
	return;
}

// Shared infrastructure: unique ID + CSS output + visibility classes.
$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

// Extract block-specific attributes.
$columns           = isset( $attributes['columns'] ) ? absint( $attributes['columns'] ) : 3;
$products_per_page = isset( $attributes['perPage'] ) ? absint( $attributes['perPage'] ) : 12;
$show_search       = isset( $attributes['showSearch'] ) ? (bool) $attributes['showSearch'] : true;
$show_category     = isset( $attributes['showCategoryFilter'] ) ? (bool) $attributes['showCategoryFilter'] : true;
$show_price        = isset( $attributes['showPriceFilter'] ) ? (bool) $attributes['showPriceFilter'] : true;
$show_sort         = isset( $attributes['showSort'] ) ? (bool) $attributes['showSort'] : true;
$default_sort      = isset( $attributes['defaultSort'] ) ? sanitize_text_field( $attributes['defaultSort'] ) : 'title';
$default_category  = isset( $attributes['defaultCategory'] ) ? absint( $attributes['defaultCategory'] ) : 0;

// Build translatable strings + currency for view.js.
$currency_sym = function_exists( 'edd_currency_symbol' ) ? edd_currency_symbol() : '$';
$i18n_strings = array(
	'searchPlaceholder' => __( 'Search products...', 'wbcom-essential' ),
	'allCategories'     => __( 'All Categories', 'wbcom-essential' ),
	'anyPrice'          => __( 'Any Price', 'wbcom-essential' ),
	'free'              => __( 'Free', 'wbcom-essential' ),
	/* translators: %s: currency symbol */
	'under25'           => sprintf( __( 'Under %s25', 'wbcom-essential' ), $currency_sym ),
	/* translators: %s: currency symbol */
	'range25to99'       => sprintf( __( '%1$s25 – %1$s99', 'wbcom-essential' ), $currency_sym ),
	/* translators: %s: currency symbol */
	'over100'           => sprintf( __( '%s100+', 'wbcom-essential' ), $currency_sym ),
	'titleAZ'           => __( 'Title (A-Z)', 'wbcom-essential' ),
	'newestFirst'       => __( 'Newest First', 'wbcom-essential' ),
	'priceLowHigh'      => __( 'Price: Low → High', 'wbcom-essential' ),
	'priceHighLow'      => __( 'Price: High → Low', 'wbcom-essential' ),
	'mostPopular'       => __( 'Most Popular', 'wbcom-essential' ),
	/* translators: %1$d: visible count, %2$d: total count */
	'showingOf'         => __( 'Showing %1$d of %2$d products', 'wbcom-essential' ),
	'noProducts'        => __( 'No products found matching your filters.', 'wbcom-essential' ),
	'loadError'         => __( 'Products could not be loaded. Please try again.', 'wbcom-essential' ),
	'retry'             => __( 'Retry', 'wbcom-essential' ),
	'loadMore'          => __( 'Load More Products', 'wbcom-essential' ),
	'downloadFree'      => __( 'Download Free', 'wbcom-essential' ),
	'viewProduct'       => __( 'View Product', 'wbcom-essential' ),
);

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                 => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wp-block-wbcom-essential-product-catalog ' . $vis_classes ),
		'data-columns'          => esc_attr( $columns ),
		'data-per-page'         => esc_attr( $products_per_page ),
		'data-show-search'      => $show_search ? 'true' : 'false',
		'data-show-category'    => $show_category ? 'true' : 'false',
		'data-show-price'       => $show_price ? 'true' : 'false',
		'data-show-sort'        => $show_sort ? 'true' : 'false',
		'data-default-sort'     => esc_attr( $default_sort ),
		'data-default-category' => esc_attr( $default_category ),
		'data-i18n'             => esc_attr( wp_json_encode( $i18n_strings ) ),
	)
);

/*
 * Server-render the first page.
 *
 * The block is otherwise built entirely in the browser, which meant the HTML
 * contained no products at all: crawlers indexed a page whose only text was
 * "Loading products...", and a visitor without JavaScript never saw past it.
 *
 * The same query backs this and the REST route, so the markup a crawler reads
 * and the JSON the script fetches cannot describe different products. The
 * payload is also embedded below, so the script adopts these results instead
 * of re-requesting page one on every load.
 */
list( $default_sort_orderby, $default_sort_order ) = function_exists( 'wbcom_essential_product_catalog_parse_sort' )
	? wbcom_essential_product_catalog_parse_sort( $default_sort )
	: array( 'title', 'ASC' );

$initial = function_exists( 'wbcom_essential_product_catalog_query' )
	? wbcom_essential_product_catalog_query(
		array(
			'per_page' => $products_per_page,
			'page'     => 1,
			'orderby'  => $default_sort_orderby,
			'order'    => $default_sort_order,
			'category' => $default_category,
		)
	)
	: array(
		'products'    => array(),
		'total'       => 0,
		'total_pages' => 1,
		'page'        => 1,
	);

$card_i18n = array(
	'download_free' => $i18n_strings['downloadFree'],
	'view_product'  => $i18n_strings['viewProduct'],
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( ! empty( $initial['products'] ) ) : ?>
		<div class="wbcom-catalog__grid wbcom-catalog__grid--<?php echo esc_attr( $columns ); ?>">
			<?php
			foreach ( $initial['products'] as $catalog_product ) {
				echo wbcom_essential_product_catalog_render_card( $catalog_product, $card_i18n ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped inside the renderer.
			}
			?>
		</div>
	<?php else : ?>
		<div class="wbcom-catalog__grid wbcom-catalog__grid--<?php echo esc_attr( $columns ); ?>">
			<div class="wbcom-catalog__empty"><?php echo esc_html( $i18n_strings['noProducts'] ); ?></div>
		</div>
	<?php endif; ?>

	<?php
	// Handed to view.js so it can take over without re-fetching page one.
	$initial_payload = wp_json_encode( $initial );
	if ( $initial_payload ) :
		?>
		<script type="application/json" class="wbcom-catalog__initial-data">
			<?php echo $initial_payload; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- JSON encoded above, rendered inside a non-executing JSON script block. ?>
		</script>
	<?php endif; ?>
</div>
