<?php
/**
 * Server-side render for Timeline block.
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
$items                        = $attributes['items'] ?? array();
$layout                       = $attributes['layout'] ?? 'two-column';
$show_arrow                   = $attributes['showArrow'] ?? true;
$enable_animation             = $attributes['enableAnimation'] ?? true;
$bar_thickness                = $attributes['barThickness'] ?? 4;
$bar_color                    = $attributes['barColor'] ?? '#e2e8f0';
$icon_container_size          = $attributes['iconContainerSize'] ?? 60;
$icon_container_background    = $attributes['iconContainerBackground'] ?? '#3182ce';
$icon_container_border_radius = $attributes['iconContainerBorderRadius'] ?? 50;
$icon_size                    = $attributes['iconSize'] ?? 24;
$icon_color                   = $attributes['iconColor'] ?? '#ffffff';
$content_background           = $attributes['contentBackground'] ?? '#f7fafc';
$content_border_radius        = $attributes['contentBorderRadius'] ?? 12;
$date_color                   = $attributes['dateColor'] ?? '#718096';
$title_color                  = $attributes['titleColor'] ?? '#1a202c';
$text_color                   = $attributes['textColor'] ?? '#4a5568';

// Don't render if no items.
if ( empty( $items ) ) {
	return;
}

// Icon mapping.
$icons = array(
	'star'     => '★',
	'flag'     => '⚑',
	'check'    => '✓',
	'heart'    => '♥',
	'bolt'     => '⚡',
	'rocket'   => '🚀',
	'trophy'   => '🏆',
	'target'   => '◎',
	'clock'    => '⏰',
	'calendar' => '📅',
);

// Build unique ID.
$unique_id = wp_unique_id( 'wbcom-timeline-' );

// CSS variables for bar.
$container_style = sprintf(
	'--bar-color: %s; --bar-thickness: %dpx; --icon-container-size: %dpx;',
	esc_attr( $bar_color ),
	absint( $bar_thickness ),
	absint( $icon_container_size )
);

// Icon container style.
$icon_style = sprintf(
	'width: %1$dpx; height: %1$dpx; background-color: %2$s; border-radius: %3$d%%; font-size: %4$dpx; color: %5$s;',
	absint( $icon_container_size ),
	esc_attr( $icon_container_background ),
	absint( $icon_container_border_radius ),
	absint( $icon_size ),
	esc_attr( $icon_color )
);

// Content style.
$content_style = sprintf(
	'background-color: %s; border-radius: %dpx;',
	esc_attr( $content_background ),
	absint( $content_border_radius )
);

// Get wrapper attributes.
$classes = array(
	'wbcom-essential-timeline',
	'wbcom-timeline-' . esc_attr( $layout ),
);

if ( $enable_animation ) {
	$classes[] = 'wbcom-timeline-animated';
}

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => implode( ' ', $classes ),
	'id'    => $unique_id,
	'style' => $container_style,
) );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-timeline-container">
		<?php foreach ( $items as $index => $item ) : ?>
			<?php
			$item_title      = $item['title'] ?? '';
			$item_date       = $item['date'] ?? '';
			$item_content    = $item['content'] ?? '';
			$item_icon       = $item['icon'] ?? 'star';
			$item_image_id   = $item['imageId'] ?? 0;
			$item_title_tag  = $item['titleTag'] ?? 'h3';
			$item_text_align = $item['textAlign'] ?? 'left';
			$item_class      = $index % 2 === 0 ? 'even' : 'odd';

			// Validate title tag.
			$allowed_tags   = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'p' );
			$item_title_tag = in_array( $item_title_tag, $allowed_tags, true ) ? $item_title_tag : 'h3';

			// Get icon character.
			$icon_char = $icons[ $item_icon ] ?? '★';

			// Get image if set.
			$image_html = '';
			if ( $item_image_id ) {
				$image_html = wp_get_attachment_image( $item_image_id, 'medium', false, array(
					'class' => 'wbcom-timeline-img',
				) );
			}

			$content_classes = 'wbcom-timeline-content';
			if ( $show_arrow ) {
				$content_classes .= ' show-arrow';
			}
			?>
			<div class="wbcom-timeline-block <?php echo esc_attr( $item_class ); ?>">
				<div class="wbcom-timeline-icon" style="<?php echo esc_attr( $icon_style ); ?>">
					<?php echo esc_html( $icon_char ); ?>
				</div>
				<div class="<?php echo esc_attr( $content_classes ); ?>" style="<?php echo esc_attr( $content_style ); ?> text-align: <?php echo esc_attr( $item_text_align ); ?>;">
					<?php if ( $image_html ) : ?>
						<div class="wbcom-timeline-image">
							<?php echo $image_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						</div>
					<?php endif; ?>

					<?php if ( ! empty( $item_date ) ) : ?>
						<span class="wbcom-timeline-date" style="color: <?php echo esc_attr( $date_color ); ?>;">
							<?php echo esc_html( $item_date ); ?>
						</span>
					<?php endif; ?>

					<?php if ( ! empty( $item_title ) ) : ?>
						<<?php echo esc_html( $item_title_tag ); ?> class="wbcom-timeline-title" style="color: <?php echo esc_attr( $title_color ); ?>;">
							<?php echo esc_html( $item_title ); ?>
						</<?php echo esc_html( $item_title_tag ); ?>>
					<?php endif; ?>

					<?php if ( ! empty( $item_content ) ) : ?>
						<p class="wbcom-timeline-text" style="color: <?php echo esc_attr( $text_color ); ?>;">
							<?php echo wp_kses_post( $item_content ); ?>
						</p>
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
</div>
