<?php
/**
 * Server-side render for Progress Bar block.
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
$title              = $attributes['title'] ?? __( 'Progress', 'wbcom-essential' );
$percent            = $attributes['percent'] ?? 75;
$display_percent    = $attributes['displayPercent'] ?? 'in';
$show_stripes       = $attributes['showStripes'] ?? false;
$animate_stripes    = $attributes['animateStripes'] ?? true;
$animation_duration = $attributes['animationDuration'] ?? 1500;
$scroll_animation   = $attributes['scrollAnimation'] ?? true;
$bar_height         = $attributes['barHeight'] ?? 20;
$border_radius      = $attributes['borderRadius'] ?? 10;
$bar_color          = $attributes['barColor'] ?? '#3182ce';
$bar_background     = $attributes['barBackground'] ?? '#e2e8f0';
$title_color        = $attributes['titleColor'] ?? '#1a202c';
$percent_color      = $attributes['percentColor'] ?? '#ffffff';
$percent_out_color  = $attributes['percentOutColor'] ?? '#1a202c';

// Build wrapper style.
$wrapper_style = sprintf(
	'background-color: %s; border-radius: %dpx; height: %dpx;',
	esc_attr( $bar_background ),
	absint( $border_radius ),
	absint( $bar_height )
);

// Build bar style.
$initial_width = $scroll_animation ? '0' : $percent . '%';
$bar_style     = sprintf(
	'width: %s; background-color: %s; border-radius: %dpx; transition: width %dms ease-out;',
	esc_attr( $initial_width ),
	esc_attr( $bar_color ),
	absint( $border_radius ),
	absint( $animation_duration )
);

// Build stripes class.
$stripes_class = '';
if ( $show_stripes ) {
	$stripes_class = $animate_stripes ? ' has-stripes stripes-animated' : ' has-stripes';
}

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class'                  => 'wbcom-essential-progress-bar',
	'data-percent'           => absint( $percent ),
	'data-scroll-animation'  => $scroll_animation ? 'true' : 'false',
	'data-animation-duration' => absint( $animation_duration ),
) );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-progress-bar-header">
		<?php if ( ! empty( $title ) ) : ?>
			<span class="wbcom-progress-bar-title" style="color: <?php echo esc_attr( $title_color ); ?>;">
				<?php echo esc_html( $title ); ?>
			</span>
		<?php endif; ?>
		<?php if ( 'out' === $display_percent ) : ?>
			<span class="wbcom-progress-bar-percent-out" style="color: <?php echo esc_attr( $percent_out_color ); ?>;">
				<?php echo absint( $percent ); ?>%
			</span>
		<?php endif; ?>
	</div>
	<div class="wbcom-progress-bar-wrapper" style="<?php echo esc_attr( $wrapper_style ); ?>">
		<div class="wbcom-progress-bar-fill<?php echo esc_attr( $stripes_class ); ?>" style="<?php echo esc_attr( $bar_style ); ?>">
			<?php if ( 'in' === $display_percent ) : ?>
				<span class="wbcom-progress-bar-percent-in" style="color: <?php echo esc_attr( $percent_color ); ?>;">
					<?php echo absint( $percent ); ?>%
				</span>
			<?php endif; ?>
		</div>
	</div>
</div>
