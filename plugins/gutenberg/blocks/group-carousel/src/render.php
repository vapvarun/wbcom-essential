<?php
/**
 * Server-side render for Group Carousel block.
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

// Check if BuddyPress is active and groups component is enabled.
if ( ! function_exists( 'buddypress' ) || ! bp_is_active( 'groups' ) ) {
	return;
}

// Extract attributes.
$sort_type          = $attributes['sortType'] ?? 'active';
$total_groups       = $attributes['totalGroups'] ?? 12;
$show_meta          = $attributes['showMeta'] ?? true;
$slides_to_show     = $attributes['slidesToShow'] ?? 4;
$slides_to_show_tablet = $attributes['slidesToShowTablet'] ?? 2;
$slides_to_show_mobile = $attributes['slidesToShowMobile'] ?? 1;
$slides_to_scroll   = $attributes['slidesToScroll'] ?? 1;
$navigation         = $attributes['navigation'] ?? 'both';
$autoplay           = $attributes['autoplay'] ?? true;
$pause_on_hover     = $attributes['pauseOnHover'] ?? true;
$autoplay_speed     = $attributes['autoplaySpeed'] ?? 5000;
$infinite_loop      = $attributes['infiniteLoop'] ?? true;
$animation_speed    = $attributes['animationSpeed'] ?? 500;
$space_between      = $attributes['spaceBetween'] ?? 30;
$card_bg_color      = $attributes['cardBgColor'] ?? '#ffffff';
$card_radius        = $attributes['cardBorderRadius'] ?? 8;
$card_shadow        = $attributes['cardShadow'] ?? true;
$name_color         = $attributes['nameColor'] ?? '#122B46';
$meta_color         = $attributes['metaColor'] ?? '#A3A5A9';
$arrow_color        = $attributes['arrowColor'] ?? '#122B46';
$dot_color          = $attributes['dotColor'] ?? '#122B46';
$pause_on_interaction = $attributes['pauseOnInteraction'] ?? false;
$direction          = $attributes['direction'] ?? 'horizontal';
$effect             = $attributes['effect'] ?? 'slide';
$enable_keyboard    = $attributes['enableKeyboard'] ?? true;
$grab_cursor        = $attributes['grabCursor'] ?? true;

// Build inline styles - ONLY layout/spacing, NEVER colors.
// Colors are handled by CSS variables in style.scss which inherit from theme-colors.css.
// This allows dark mode and theme customizations to work properly.
$inline_styles = array(
	'--card-radius'   => $card_radius . 'px',
	'--space-between' => $space_between . 'px',
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Swiper options.
$swiper_options = array(
	'slidesPerView'  => $slides_to_show,
	'slidesToScroll' => $slides_to_scroll,
	'spaceBetween'   => $space_between,
	'speed'          => $animation_speed,
	'loop'           => $infinite_loop,
	'direction'      => $direction,
	'effect'         => $effect,
	'grabCursor'     => $grab_cursor,
	'keyboard'       => array(
		'enabled' => $enable_keyboard,
	),
	'autoplay'       => $autoplay ? array(
		'delay'                => $autoplay_speed,
		'disableOnInteraction' => $pause_on_interaction,
		'pauseOnMouseEnter'    => $pause_on_hover,
	) : false,
	'navigation'     => in_array( $navigation, array( 'arrows', 'both' ), true ),
	'pagination'     => in_array( $navigation, array( 'dots', 'both' ), true ),
	'breakpoints'    => array(
		320  => array(
			'slidesPerView' => $slides_to_show_mobile,
		),
		768  => array(
			'slidesPerView' => $slides_to_show_tablet,
		),
		1024 => array(
			'slidesPerView' => $slides_to_show,
		),
	),
);

$show_arrows = in_array( $navigation, array( 'arrows', 'both' ), true );
$show_dots   = in_array( $navigation, array( 'dots', 'both' ), true );

// Container classes.
$container_classes = array(
	'wbcom-group-carousel-container',
	'swiper',
);

if ( $card_shadow ) {
	$container_classes[] = 'has-shadow';
}

// Groups query args.
$groups_args = array(
	'user_id'         => 0,
	'type'            => $sort_type,
	'per_page'        => $total_groups,
	'max'             => $total_groups,
	'populate_extras' => true,
);

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-group-carousel',
		'style' => $style_string,
	)
);

// Unique ID for this instance.
$unique_id = 'group-carousel-' . wp_unique_id();
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( bp_has_groups( $groups_args ) ) : ?>
		<div id="<?php echo esc_attr( $unique_id ); ?>"
			class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>"
			data-swiper-options="<?php echo esc_attr( wp_json_encode( $swiper_options ) ); ?>">

			<div class="swiper-wrapper">
				<?php
				while ( bp_groups() ) :
					bp_the_group();

					// Get group URL.
					$group_url = function_exists( 'bp_get_group_url' )
						? bp_get_group_url()
						: bp_get_group_permalink();
					?>
					<div class="swiper-slide">
						<div class="wbcom-group-carousel-card">
							<div class="wbcom-group-carousel-avatar">
								<a href="<?php echo esc_url( $group_url ); ?>">
									<?php
									bp_group_avatar(
										array(
											'type'  => 'full',
											'class' => 'avatar',
										)
									);
									?>
								</a>
							</div>
							<div class="wbcom-group-carousel-content">
								<h4 class="wbcom-group-carousel-name">
									<a href="<?php echo esc_url( $group_url ); ?>">
										<?php bp_group_name(); ?>
									</a>
								</h4>
								<?php if ( $show_meta ) : ?>
									<p class="wbcom-group-carousel-meta">
										<?php
										/* translators: %s: Group last active time */
										printf( esc_html__( 'active %s', 'wbcom-essential' ), esc_html( bp_get_group_last_active() ) );
										?>
									</p>
								<?php endif; ?>
							</div>
						</div>
					</div>
				<?php endwhile; ?>
			</div>

			<?php if ( $show_dots ) : ?>
				<div class="swiper-pagination"></div>
			<?php endif; ?>

			<?php if ( $show_arrows ) : ?>
				<div class="swiper-button-prev">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor" />
					</svg>
				</div>
				<div class="swiper-button-next">
					<svg viewBox="0 0 24 24" width="24" height="24">
						<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
					</svg>
				</div>
			<?php endif; ?>
		</div>
	<?php else : ?>
		<div class="wbcom-essential-no-data">
			<p><?php esc_html_e( 'Sorry, no groups were found.', 'wbcom-essential' ); ?></p>
		</div>
	<?php endif; ?>
</div>
