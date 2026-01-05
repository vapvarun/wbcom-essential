<?php
/**
 * Social Icons Block - Server-Side Render
 *
 * @package wbcom-essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Extract attributes with defaults.
$icons            = ! empty( $attributes['icons'] ) ? $attributes['icons'] : array();
$alignment        = ! empty( $attributes['alignment'] ) ? $attributes['alignment'] : 'center';
$icon_size        = isset( $attributes['iconSize'] ) ? absint( $attributes['iconSize'] ) : 24;
$icon_gap         = isset( $attributes['iconGap'] ) ? absint( $attributes['iconGap'] ) : 12;
$icon_padding     = isset( $attributes['iconPadding'] ) ? absint( $attributes['iconPadding'] ) : 12;
$icon_color       = ! empty( $attributes['iconColor'] ) ? $attributes['iconColor'] : '';
$icon_bg_color    = ! empty( $attributes['iconBgColor'] ) ? $attributes['iconBgColor'] : '';
$icon_hover_color = ! empty( $attributes['iconHoverColor'] ) ? $attributes['iconHoverColor'] : '';
$icon_hover_bg    = ! empty( $attributes['iconHoverBgColor'] ) ? $attributes['iconHoverBgColor'] : '';
$border_radius    = isset( $attributes['borderRadius'] ) ? absint( $attributes['borderRadius'] ) : 50;
$style            = ! empty( $attributes['style'] ) ? $attributes['style'] : 'filled';
$open_in_new_tab  = isset( $attributes['openInNewTab'] ) ? $attributes['openInNewTab'] : true;

// Platform to dashicon mapping.
$platform_icons = array(
	'facebook'  => 'facebook-alt',
	'twitter'   => 'twitter',
	'instagram' => 'instagram',
	'linkedin'  => 'linkedin',
	'youtube'   => 'video-alt3',
	'pinterest' => 'pinterest',
	'github'    => 'admin-site-alt3',
	'email'     => 'email',
	'rss'       => 'rss',
	'whatsapp'  => 'phone',
	'tiktok'    => 'video-alt2',
);

// Build inline styles.
$inline_styles = array(
	'--icon-size'       => $icon_size . 'px',
	'--icon-gap'        => $icon_gap . 'px',
	'--icon-padding'    => $icon_padding . 'px',
	'--icon-color'      => $icon_color,
	'--icon-bg-color'   => $icon_bg_color,
	'--icon-hover-color' => $icon_hover_color,
	'--icon-hover-bg'   => $icon_hover_bg,
	'--border-radius'   => $border_radius . '%',
);

// Filter out empty values.
$inline_styles = array_filter( $inline_styles );

// Convert to style string.
$style_string = '';
foreach ( $inline_styles as $property => $value ) {
	$style_string .= esc_attr( $property ) . ':' . esc_attr( $value ) . ';';
}

// Build wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-social-icons align-' . esc_attr( $alignment ) . ' style-' . esc_attr( $style ),
		'style' => $style_string,
	)
);

if ( empty( $icons ) ) {
	return;
}

$target_attr = $open_in_new_tab ? ' target="_blank" rel="noopener noreferrer"' : '';
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php foreach ( $icons as $icon ) : ?>
		<?php
		$platform   = ! empty( $icon['platform'] ) ? $icon['platform'] : 'facebook';
		$url        = ! empty( $icon['url'] ) ? $icon['url'] : '#';
		$dashicon   = isset( $platform_icons[ $platform ] ) ? $platform_icons[ $platform ] : 'share';
		$aria_label = ucfirst( $platform );

		// Handle email URLs.
		if ( 'email' === $platform && ! empty( $icon['url'] ) && strpos( $icon['url'], 'mailto:' ) === false ) {
			$url = 'mailto:' . $icon['url'];
		}
		?>
		<a
			href="<?php echo esc_url( $url ); ?>"
			class="wbcom-essential-social-icons__item wbcom-essential-social-icons__item--<?php echo esc_attr( $platform ); ?>"
			aria-label="<?php echo esc_attr( $aria_label ); ?>"
			<?php echo $target_attr; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<span class="dashicons dashicons-<?php echo esc_attr( $dashicon ); ?>"></span>
		</a>
	<?php endforeach; ?>
</div>
