<?php
/**
 * Server-side render for Pricing Table block.
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
$title              = $attributes['title'] ?? __( 'Basic Plan', 'wbcom-essential' );
$description        = $attributes['description'] ?? '';
$heading_tag        = $attributes['headingTag'] ?? 'h3';
$price_prefix       = $attributes['pricePrefix'] ?? '$';
$price              = $attributes['price'] ?? '49';
$price_suffix       = $attributes['priceSuffix'] ?? '.99';
$original_price     = $attributes['originalPrice'] ?? '';
$period             = $attributes['period'] ?? '/month';
$features           = $attributes['features'] ?? array();
$button_text        = $attributes['buttonText'] ?? __( 'Get Started', 'wbcom-essential' );
$button_url         = $attributes['buttonUrl'] ?? '#';
$button_target      = $attributes['buttonTarget'] ?? false;
$footer_text        = $attributes['footerText'] ?? '';
$show_ribbon        = $attributes['showRibbon'] ?? false;
$ribbon_text        = $attributes['ribbonText'] ?? __( 'POPULAR', 'wbcom-essential' );
$ribbon_style       = $attributes['ribbonStyle'] ?? 'ribbon';
$header_bg          = $attributes['headerBackground'] ?? '#4a5568';
$header_color       = $attributes['headerTextColor'] ?? '#ffffff';
$container_bg       = $attributes['containerBackground'] ?? '#f7fafc';
$price_color        = $attributes['priceColor'] ?? '#1a202c';
$button_bg          = $attributes['buttonBackground'] ?? '#3182ce';
$button_color       = $attributes['buttonTextColor'] ?? '#ffffff';
$ribbon_bg          = $attributes['ribbonBackground'] ?? '#48bb78';
$ribbon_color       = $attributes['ribbonTextColor'] ?? '#ffffff';
$border_radius      = $attributes['borderRadius'] ?? 8;

// Sanitize heading tag.
$allowed_tags = array( 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' );
if ( ! in_array( $heading_tag, $allowed_tags, true ) ) {
	$heading_tag = 'h3';
}

// Build styles.
$container_style = sprintf(
	'background-color: %s; border-radius: %dpx;',
	esc_attr( $container_bg ),
	absint( $border_radius )
);

$header_style = sprintf(
	'background-color: %s; color: %s; border-radius: %dpx %dpx 0 0;',
	esc_attr( $header_bg ),
	esc_attr( $header_color ),
	absint( $border_radius ),
	absint( $border_radius )
);

$price_style = sprintf( 'color: %s;', esc_attr( $price_color ) );

$button_style = sprintf(
	'background-color: %s; color: %s;',
	esc_attr( $button_bg ),
	esc_attr( $button_color )
);

$ribbon_style_attr = sprintf(
	'background-color: %s; color: %s;',
	esc_attr( $ribbon_bg ),
	esc_attr( $ribbon_color )
);

$target_attr = $button_target ? ' target="_blank" rel="noopener noreferrer"' : '';

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'wbcom-essential-pricing-table',
) );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-price-table<?php echo $show_ribbon ? ' has-ribbon' : ''; ?>" style="<?php echo esc_attr( $container_style ); ?>">

		<?php if ( $show_ribbon ) : ?>
			<div class="wbcom-price-table-ribbon-badge ribbon-style-<?php echo esc_attr( $ribbon_style ); ?>" style="<?php echo esc_attr( $ribbon_style_attr ); ?>">
				<?php echo esc_html( $ribbon_text ); ?>
			</div>
		<?php endif; ?>

		<div class="wbcom-price-table-header" style="<?php echo esc_attr( $header_style ); ?>">
			<<?php echo esc_attr( $heading_tag ); ?> class="wbcom-price-table-title">
				<?php echo esc_html( $title ); ?>
			</<?php echo esc_attr( $heading_tag ); ?>>
			<?php if ( ! empty( $description ) ) : ?>
				<span class="wbcom-price-table-desc"><?php echo esc_html( $description ); ?></span>
			<?php endif; ?>
		</div>

		<div class="wbcom-price-table-subheader">
			<div class="wbcom-price-table-price" style="<?php echo esc_attr( $price_style ); ?>">
				<?php if ( ! empty( $original_price ) ) : ?>
					<div class="wbcom-price-table-original-price">
						<del><?php echo esc_html( $original_price ); ?></del>
					</div>
				<?php endif; ?>
				<?php if ( ! empty( $price_prefix ) ) : ?>
					<span class="wbcom-price-table-price-prefix"><?php echo esc_html( $price_prefix ); ?></span>
				<?php endif; ?>
				<span class="wbcom-price-table-price-value"><?php echo esc_html( $price ); ?></span>
				<?php if ( ! empty( $price_suffix ) ) : ?>
					<span class="wbcom-price-table-price-suffix"><?php echo esc_html( $price_suffix ); ?></span>
				<?php endif; ?>
			</div>
			<?php if ( ! empty( $period ) ) : ?>
				<div class="wbcom-price-table-period"><?php echo esc_html( $period ); ?></div>
			<?php endif; ?>
		</div>

		<div class="wbcom-price-table-content">
			<ul class="wbcom-price-table-features">
				<?php foreach ( $features as $feature ) : ?>
					<?php
					$feature_text = $feature['text'] ?? '';
					$feature_icon = $feature['icon'] ?? 'yes';
					$icon_symbol  = 'yes' === $feature_icon ? '✓' : '✗';
					?>
					<li class="feature-<?php echo esc_attr( $feature_icon ); ?>">
						<span class="feature-icon icon-<?php echo esc_attr( $feature_icon ); ?>"><?php echo esc_html( $icon_symbol ); ?></span>
						<span><?php echo esc_html( $feature_text ); ?></span>
					</li>
				<?php endforeach; ?>
			</ul>
		</div>

		<div class="wbcom-price-table-footer">
			<div class="wbcom-btn-wrapper">
				<a class="wbcom-price-table-btn" href="<?php echo esc_url( $button_url ); ?>" style="<?php echo esc_attr( $button_style ); ?>"<?php echo $target_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
					<?php echo esc_html( $button_text ); ?>
				</a>
			</div>
			<?php if ( ! empty( $footer_text ) ) : ?>
				<span class="wbcom-price-table-footer-desc"><?php echo wp_kses_post( $footer_text ); ?></span>
			<?php endif; ?>
		</div>
	</div>
</div>
