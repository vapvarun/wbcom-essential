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

// New attributes.
$padding          = $attributes['padding'] ?? 32;
$box_shadow       = $attributes['boxShadow'] ?? true;
$avatar_size      = $attributes['avatarSize'] ?? 60;
$quote_icon_size  = $attributes['quoteIconSize'] ?? 64;
$quote_icon_color = $attributes['quoteIconColor'] ?? '#1d76da';
$quote_font_size  = $attributes['quoteFontSize'] ?? 18;
$name_font_size   = $attributes['nameFontSize'] ?? 16;
$role_font_size   = $attributes['roleFontSize'] ?? 14;
$spacing          = $attributes['spacing'] ?? 24;

// Build CSS variables - ONLY layout/spacing, NEVER colors.
// Colors are handled by CSS variables in style.scss which inherit from theme-colors.css.
// This allows dark mode and theme customizations to work properly.
$css_vars = array(
	'--border-radius'    => $border_radius . 'px',
	'--padding'          => $padding . 'px',
	'--box-shadow'       => $box_shadow ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
	'--avatar-size'      => $avatar_size . 'px',
	'--quote-icon-size'  => $quote_icon_size . 'px',
	'--quote-font-size'  => $quote_font_size . 'px',
	'--name-font-size'   => $name_font_size . 'px',
	'--role-font-size'   => $role_font_size . 'px',
	'--spacing'          => $spacing . 'px',
);

$style_string = '';
foreach ( $css_vars as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => sprintf( 'wbcom-essential-testimonial layout-%s text-%s', esc_attr( $layout ), esc_attr( $text_align ) ),
	'style' => $style_string,
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
 * @param int $rating Rating value (1-5).
 * @return string HTML string.
 */
function wbcom_render_testimonial_stars( $rating ) {
	$output = '';
	for ( $i = 1; $i <= 5; $i++ ) {
		$filled = $i <= $rating;
		$class  = $filled ? 'filled' : 'empty';
		$output .= sprintf(
			'<span class="star %s">★</span>',
			esc_attr( $class )
		);
	}
	return $output;
}
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-testimonial-content">
		<?php if ( $show_rating ) : ?>
			<div class="wbcom-testimonial-rating">
				<?php echo wbcom_render_testimonial_stars( $rating ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			</div>
		<?php endif; ?>

		<?php if ( ! empty( $testimonial_content ) ) : ?>
			<div class="wbcom-testimonial-quote">
				<span class="quote-mark">"</span>
				<p><?php echo wp_kses_post( $testimonial_content ); ?></p>
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
				<span class="wbcom-testimonial-name"><?php echo esc_html( $author_name ); ?></span>
			<?php endif; ?>
			<?php if ( ! empty( $author_role ) ) : ?>
				<span class="wbcom-testimonial-role"><?php echo esc_html( $author_role ); ?></span>
			<?php endif; ?>
		</div>
	</div>
</div>
