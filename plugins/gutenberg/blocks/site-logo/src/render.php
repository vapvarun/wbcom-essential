<?php
/**
 * Server-side render for Site Logo block.
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
$logo_source       = $attributes['logoSource'] ?? 'customizer';
$desktop_logo_id   = $attributes['desktopLogoId'] ?? 0;
$desktop_logo_url  = $attributes['desktopLogoUrl'] ?? '';
$mobile_logo_id    = $attributes['mobileLogoId'] ?? 0;
$mobile_logo_url   = $attributes['mobileLogoUrl'] ?? '';
$link_url          = $attributes['linkUrl'] ?? '';
$link_home         = $attributes['linkHome'] ?? true;
$link_new_tab      = $attributes['linkNewTab'] ?? false;
$mobile_breakpoint = $attributes['mobileBreakpoint'] ?? 768;
$alignment         = $attributes['alignment'] ?? 'flex-start';
$max_width         = $attributes['maxWidth'] ?? 200;
$background_color  = $attributes['backgroundColor'] ?? '';
$border_radius     = $attributes['borderRadius'] ?? 0;

// Determine link URL.
if ( $link_home ) {
	$link_url = home_url( '/' );
}

// Generate unique ID for scoped styles.
$block_id = 'site-logo-' . wp_unique_id();

// Build CSS custom properties.
$style_vars = sprintf(
	'--logo-align: %s; --logo-max-width: %dpx; --logo-bg: %s; --logo-radius: %dpx;',
	esc_attr( $alignment ),
	$max_width,
	$background_color ? esc_attr( $background_color ) : 'transparent',
	$border_radius
);

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $block_id,
		'class' => 'wbcom-essential-site-logo',
		'style' => $style_vars,
	)
);

// Link attributes - pre-escaped with esc_url() and hardcoded safe strings.
$link_attrs = '';
if ( $link_url ) {
	$link_attrs = 'href="' . esc_url( $link_url ) . '"';
	if ( $link_new_tab ) {
		$link_attrs .= ' target="_blank" rel="noopener noreferrer"';
	}
}
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<div class="wbcom-site-logo-container">
		<?php if ( 'customizer' === $logo_source ) : ?>
			<?php if ( has_custom_logo() ) : ?>
				<?php the_custom_logo(); ?>
			<?php else : ?>
				<p class="wbcom-site-logo-placeholder">
					<?php esc_html_e( 'Please add a logo in Appearance → Customize → Site Identity', 'wbcom-essential' ); ?>
				</p>
			<?php endif; ?>
		<?php else : ?>
			<?php if ( $desktop_logo_url ) : ?>
				<?php if ( $link_url ) : ?>
					<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $link_attrs is built with esc_url() and hardcoded strings ?>
					<a <?php echo $link_attrs; ?> class="wbcom-logo-desktop">
						<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wp_get_attachment_image() handles escaping internally ?>
						<?php echo wp_get_attachment_image( $desktop_logo_id, 'full', false, array( 'alt' => get_bloginfo( 'name' ) ) ); ?>
					</a>
				<?php else : ?>
					<div class="wbcom-logo-desktop">
						<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wp_get_attachment_image() handles escaping internally ?>
						<?php echo wp_get_attachment_image( $desktop_logo_id, 'full', false, array( 'alt' => get_bloginfo( 'name' ) ) ); ?>
					</div>
				<?php endif; ?>

				<?php if ( $mobile_logo_url ) : ?>
					<?php if ( $link_url ) : ?>
						<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $link_attrs is built with esc_url() and hardcoded strings ?>
						<a <?php echo $link_attrs; ?> class="wbcom-logo-mobile">
							<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wp_get_attachment_image() handles escaping internally ?>
							<?php echo wp_get_attachment_image( $mobile_logo_id, 'full', false, array( 'alt' => get_bloginfo( 'name' ) ) ); ?>
						</a>
					<?php else : ?>
						<div class="wbcom-logo-mobile">
							<?php // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- wp_get_attachment_image() handles escaping internally ?>
							<?php echo wp_get_attachment_image( $mobile_logo_id, 'full', false, array( 'alt' => get_bloginfo( 'name' ) ) ); ?>
						</div>
					<?php endif; ?>
				<?php endif; ?>
			<?php else : ?>
				<p class="wbcom-site-logo-placeholder">
					<?php esc_html_e( 'Please select a logo image.', 'wbcom-essential' ); ?>
				</p>
			<?php endif; ?>
		<?php endif; ?>
	</div>

	<?php if ( 'custom' === $logo_source && $mobile_logo_url && $mobile_breakpoint ) : ?>
		<style>
			#<?php echo esc_attr( $block_id ); ?> .wbcom-logo-desktop {
				display: block;
			}
			#<?php echo esc_attr( $block_id ); ?> .wbcom-logo-mobile {
				display: none;
			}
			@media screen and (max-width: <?php echo intval( $mobile_breakpoint ); ?>px) {
				#<?php echo esc_attr( $block_id ); ?> .wbcom-logo-desktop {
					display: none;
				}
				#<?php echo esc_attr( $block_id ); ?> .wbcom-logo-mobile {
					display: block;
				}
			}
		</style>
	<?php endif; ?>
</div>
