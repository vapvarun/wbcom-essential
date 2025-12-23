<?php
/**
 * Server-side render for Testimonial block.
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

// Extract attributes with defaults.
$testimonial_content = $attributes['content'] ?? '';
$author_name         = $attributes['authorName'] ?? '';
$author_role         = $attributes['authorRole'] ?? '';
$image_id            = $attributes['imageId'] ?? 0;
$show_rating         = $attributes['showRating'] ?? true;
$rating              = $attributes['rating'] ?? 5;
$layout              = $attributes['layout'] ?? 'column';
$text_align          = $attributes['textAlign'] ?? 'center';
$background_color    = $attributes['backgroundColor'] ?? '#ffffff';
$border_radius       = $attributes['borderRadius'] ?? 12;
$quote_color         = $attributes['quoteColor'] ?? '#4a5568';
$name_color          = $attributes['nameColor'] ?? '#1a202c';
$role_color          = $attributes['roleColor'] ?? '#718096';
$rating_color        = $attributes['ratingColor'] ?? '#f6ad55';

// Build wrapper style.
$wrapper_style = sprintf(
	'background-color: %s; border-radius: %dpx;',
	esc_attr( $background_color ),
	absint( $border_radius )
);

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => sprintf( 'wbcom-essential-testimonial layout-%s text-%s', esc_attr( $layout ), esc_attr( $text_align ) ),
	'style' => $wrapper_style,
) );

// Get author image.
$author_image = '';
if ( $image_id ) {
	$author_image = wp_get_attachment_image( $image_id, 'thumbnail', false, array(
		'class' => 'wbcom-testimonial-avatar-img',
		'alt'   => esc_attr( $author_name ),
	) );
}

/**
 * Render star rating HTML.
 *
 * @param int    $rating       Rating value (1-5).
 * @param string $rating_color Color for filled stars.
 * @return string HTML string.
 */
function wbcom_render_testimonial_stars( $rating, $rating_color ) {
	$output = '';
	for ( $i = 1; $i <= 5; $i++ ) {
		$filled = $i <= $rating;
		$color  = $filled ? $rating_color : '#e2e8f0';
		$class  = $filled ? 'filled' : 'empty';
		$output .= sprintf(
			'<span class="star %s" style="color: %s;">★</span>',
			esc_attr( $class ),
			esc_attr( $color )
		);
	}
	return $output;
}
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-testimonial-content">
		<?php if ( $show_rating ) : ?>
			<div class="wbcom-testimonial-rating">
				<?php echo wbcom_render_testimonial_stars( $rating, $rating_color ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $testimonial_content ) ) : ?>
			<div class="wbcom-testimonial-quote">
				<span class="quote-mark">"</span>
				<p style="color: <?php echo esc_attr( $quote_color ); ?>;">
					<?php echo wp_kses_post( $testimonial_content ); ?>
				</p>
			</div>
		<?php endif; ?>
	</div>

	<div class="wbcom-testimonial-author">
		<?php if ( $author_image ) : ?>
			<div class="wbcom-testimonial-avatar">
				<?php echo $author_image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>

		<div class="wbcom-testimonial-info">
			<?php if ( ! empty( $author_name ) ) : ?>
				<span class="wbcom-testimonial-name" style="color: <?php echo esc_attr( $name_color ); ?>;">
					<?php echo esc_html( $author_name ); ?>
				</span>
			<?php endif; ?>
			<?php if ( ! empty( $author_role ) ) : ?>
				<span class="wbcom-testimonial-role" style="color: <?php echo esc_attr( $role_color ); ?>;">
					<?php echo esc_html( $author_role ); ?>
				</span>
			<?php endif; ?>
		</div>
	</div>
</div>
