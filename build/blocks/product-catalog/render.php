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

// Shared infrastructure: unique ID + CSS output + visibility classes.
$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

// Extract block-specific attributes.
$columns             = isset( $attributes['columns'] ) ? absint( $attributes['columns'] ) : 3;
$per_page            = isset( $attributes['perPage'] ) ? absint( $attributes['perPage'] ) : 12;
$show_search         = isset( $attributes['showSearch'] ) ? (bool) $attributes['showSearch'] : true;
$show_category       = isset( $attributes['showCategoryFilter'] ) ? (bool) $attributes['showCategoryFilter'] : true;
$show_price          = isset( $attributes['showPriceFilter'] ) ? (bool) $attributes['showPriceFilter'] : true;
$show_sort           = isset( $attributes['showSort'] ) ? (bool) $attributes['showSort'] : true;
$default_sort        = isset( $attributes['defaultSort'] ) ? sanitize_text_field( $attributes['defaultSort'] ) : 'title';
$default_category    = isset( $attributes['defaultCategory'] ) ? absint( $attributes['defaultCategory'] ) : 0;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'                 => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wp-block-wbcom-essential-product-catalog ' . $vis_classes ),
		'data-columns'          => esc_attr( $columns ),
		'data-per-page'         => esc_attr( $per_page ),
		'data-show-search'      => $show_search ? 'true' : 'false',
		'data-show-category'    => $show_category ? 'true' : 'false',
		'data-show-price'       => $show_price ? 'true' : 'false',
		'data-show-sort'        => $show_sort ? 'true' : 'false',
		'data-default-sort'     => esc_attr( $default_sort ),
		'data-default-category' => esc_attr( $default_category ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<div class="wbcom-catalog__loading">
		<?php esc_html_e( 'Loading products...', 'wbcom-essential' ); ?>
	</div>
</div>
