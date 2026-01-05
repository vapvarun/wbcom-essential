<?php
/**
 * Star Rating Block - Server-Side Render
 *
 * @package wbcom-essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$rating         = isset( $attributes['rating'] ) ? floatval( $attributes['rating'] ) : 4;
$max_rating     = isset( $attributes['maxRating'] ) ? absint( $attributes['maxRating'] ) : 5;
$star_size      = isset( $attributes['starSize'] ) ? absint( $attributes['starSize'] ) : 24;
$star_gap       = isset( $attributes['starGap'] ) ? absint( $attributes['starGap'] ) : 4;
$filled_color   = ! empty( $attributes['filledColor'] ) ? $attributes['filledColor'] : '#ffc107';
$empty_color    = ! empty( $attributes['emptyColor'] ) ? $attributes['emptyColor'] : '#e0e0e0';
$alignment      = ! empty( $attributes['alignment'] ) ? $attributes['alignment'] : 'left';
$show_label     = ! empty( $attributes['showLabel'] ) ? $attributes['showLabel'] : false;
$label          = ! empty( $attributes['label'] ) ? $attributes['label'] : '';
$label_position = ! empty( $attributes['labelPosition'] ) ? $attributes['labelPosition'] : 'after';
$label_color    = ! empty( $attributes['labelColor'] ) ? $attributes['labelColor'] : '';
$label_size     = isset( $attributes['labelSize'] ) ? absint( $attributes['labelSize'] ) : 14;

$inline_styles = array(
	'--star-size'    => $star_size . 'px',
	'--star-gap'     => $star_gap . 'px',
	'--filled-color' => $filled_color,
	'--empty-color'  => $empty_color,
	'--label-color'  => $label_color,
	'--label-size'   => $label_size . 'px',
);

$inline_styles = array_filter( $inline_styles );
$style_string  = '';
foreach ( $inline_styles as $property => $value ) {
	$style_string .= esc_attr( $property ) . ':' . esc_attr( $value ) . ';';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-star-rating align-' . esc_attr( $alignment ) . ' label-' . esc_attr( $label_position ),
		'style' => $style_string,
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $show_label && 'before' === $label_position && $label ) : ?>
		<span class="wbcom-essential-star-rating__label"><?php echo esc_html( $label ); ?></span>
	<?php endif; ?>

	<div class="wbcom-essential-star-rating__stars">
		<?php for ( $i = 1; $i <= $max_rating; $i++ ) : ?>
			<?php
			$is_filled = $i <= floor( $rating );
			$is_half   = ! $is_filled && ( $i - 0.5 ) <= $rating;
			$class     = $is_filled ? 'filled' : ( $is_half ? 'half' : 'empty' );
			?>
			<span class="wbcom-essential-star-rating__star <?php echo esc_attr( $class ); ?>">
				<span class="dashicons dashicons-star-filled"></span>
			</span>
		<?php endfor; ?>
	</div>

	<?php if ( $show_label && 'after' === $label_position && $label ) : ?>
		<span class="wbcom-essential-star-rating__label"><?php echo esc_html( $label ); ?></span>
	<?php endif; ?>
</div>
