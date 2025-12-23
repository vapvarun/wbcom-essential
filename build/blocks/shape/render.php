<?php
/**
 * Server-side render for Shape block.
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

// Extract attributes.
$point1           = $attributes['point1'] ?? 30;
$point2           = $attributes['point2'] ?? 70;
$point3           = $attributes['point3'] ?? 70;
$point4           = $attributes['point4'] ?? 30;
$point5           = $attributes['point5'] ?? 30;
$point6           = $attributes['point6'] ?? 30;
$point7           = $attributes['point7'] ?? 70;
$point8           = $attributes['point8'] ?? 70;
$rotation         = $attributes['rotation'] ?? 0;
$width            = $attributes['width'] ?? 200;
$height           = $attributes['height'] ?? 200;
$background_color = $attributes['backgroundColor'] ?? '#3182ce';
$gradient_from    = $attributes['gradientFrom'] ?? '';
$gradient_to      = $attributes['gradientTo'] ?? '';
$gradient_angle   = $attributes['gradientAngle'] ?? 135;
$icon             = $attributes['icon'] ?? '';
$icon_color       = $attributes['iconColor'] ?? '#ffffff';
$icon_size        = $attributes['iconSize'] ?? 48;
$icon_rotation    = $attributes['iconRotation'] ?? 0;
$link_url         = $attributes['linkUrl'] ?? '';
$link_new_tab     = $attributes['linkNewTab'] ?? false;
$alignment        = $attributes['alignment'] ?? 'center';
$hover_animation  = $attributes['hoverAnimation'] ?? '';

// Build border-radius value.
$border_radius = sprintf(
	'%d%% %d%% %d%% %d%% / %d%% %d%% %d%% %d%%',
	$point1,
	$point2,
	$point3,
	$point4,
	$point5,
	$point6,
	$point7,
	$point8
);

// Build background style.
$background_style = '';
if ( $gradient_from && $gradient_to ) {
	$background_style = sprintf(
		'linear-gradient(%ddeg, %s, %s)',
		$gradient_angle,
		esc_attr( $gradient_from ),
		esc_attr( $gradient_to )
	);
} else {
	$background_style = esc_attr( $background_color );
}

// Build CSS custom properties.
$style_vars = sprintf(
	'--shape-width: %dpx; --shape-height: %dpx; --shape-radius: %s; --shape-rotation: %ddeg; --shape-background: %s; --shape-icon-color: %s; --shape-icon-size: %dpx; --shape-icon-rotation: %ddeg; --shape-align: %s;',
	$width,
	$height,
	esc_attr( $border_radius ),
	$rotation,
	$background_style,
	esc_attr( $icon_color ),
	$icon_size,
	$icon_rotation,
	esc_attr( $alignment )
);

// Animation class.
$animation_class = $hover_animation ? 'wbcom-shape-animation-' . esc_attr( $hover_animation ) : '';

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-shape',
		'style' => $style_vars,
	)
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="wbcom-shape-wrapper">
		<div class="wbcom-shape <?php echo esc_attr( $animation_class ); ?>">
			<?php if ( $icon ) : ?>
				<span class="wbcom-shape-icon dashicons dashicons-<?php echo esc_attr( $icon ); ?>"></span>
			<?php endif; ?>

			<?php if ( $link_url ) : ?>
				<a
					href="<?php echo esc_url( $link_url ); ?>"
					class="wbcom-shape-link"
					<?php echo $link_new_tab ? 'target="_blank" rel="noopener noreferrer"' : ''; ?>
					aria-label="<?php esc_attr_e( 'Shape link', 'wbcom-essential' ); ?>"
				></a>
			<?php endif; ?>
		</div>
	</div>
</div>
