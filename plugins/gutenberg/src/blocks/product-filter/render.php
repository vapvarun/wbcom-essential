<?php
/**
 * Server-side render for Product Filter block (v2).
 *
 * Outputs the filter bar with data-attributes consumed by view.js.
 * The JS handles sticky positioning, DOM-based show/hide of sibling sections,
 * History API URL params, and smooth scroll.
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
$filters      = isset( $attributes['filters'] ) ? (array) $attributes['filters'] : array();
$sticky       = isset( $attributes['sticky'] ) ? (bool) $attributes['sticky'] : true;
$stop_at_cover = isset( $attributes['stopAtCover'] ) ? (bool) $attributes['stopAtCover'] : true;

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class'               => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' ' . $vis_classes ),
		'id'                  => 'wbcom-product-filter',
		'data-sticky'         => $sticky ? 'true' : 'false',
		'data-stop-at-cover'  => $stop_at_cover ? 'true' : 'false',
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<div class="wbcom-filter-wrap">
		<?php foreach ( $filters as $i => $filter ) :
			$label  = isset( $filter['label'] ) ? sanitize_text_field( $filter['label'] ) : '';
			$target = isset( $filter['target'] ) ? sanitize_text_field( $filter['target'] ) : '';
			?>
			<button
				class="wbcom-filter-btn<?php echo $i === 0 ? ' active' : ''; ?>"
				data-filter="<?php echo esc_attr( $target ); ?>"
				type="button"
			>
				<?php echo esc_html( $label ); ?>
			</button>
		<?php endforeach; ?>
	</div>
</div>
