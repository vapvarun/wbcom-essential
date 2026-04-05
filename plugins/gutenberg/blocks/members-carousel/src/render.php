<?php
/**
 * Server-side render for Members Carousel block.
 *
 * Two modes:
 *  - Editor (REST_REQUEST): Full SSR via BP template tags for live preview.
 *  - Frontend: Outputs a Swiper container hydrated by view.js via BP REST API.
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

// Check if BuddyPress is active.
if ( ! function_exists( 'buddypress' ) ) {
	echo '<p>' . esc_html__( 'BuddyPress is required for this block.', 'wbcom-essential' ) . '</p>';
	return;
}

// ── Extract attributes ────────────────────────────────────────────────────────
$use_theme_colors      = isset( $attributes['useThemeColors'] ) ? $attributes['useThemeColors'] : false;
$sort_type             = $attributes['sortType'] ?? 'newest';
$total_members         = $attributes['totalMembers'] ?? 12;
$show_last_active      = $attributes['showLastActive'] ?? true;
$slides_to_show        = $attributes['slidesToShow'] ?? 4;
$slides_to_show_tablet = $attributes['slidesToShowTablet'] ?? 2;
$slides_to_show_mobile = $attributes['slidesToShowMobile'] ?? 1;
$slides_to_scroll      = $attributes['slidesToScroll'] ?? 1;
$navigation            = $attributes['navigation'] ?? 'both';
$autoplay              = $attributes['autoplay'] ?? true;
$pause_on_hover        = $attributes['pauseOnHover'] ?? true;
$autoplay_speed        = $attributes['autoplaySpeed'] ?? 5000;
$infinite_loop         = $attributes['infiniteLoop'] ?? true;
$animation_speed       = $attributes['animationSpeed'] ?? 500;
$space_between         = $attributes['spaceBetween'] ?? 30;
$card_bg_color         = $attributes['cardBgColor'] ?? '#ffffff';
$card_radius           = $attributes['cardBorderRadius'] ?? 8;
$card_shadow           = $attributes['cardShadow'] ?? true;
$name_color            = $attributes['nameColor'] ?? '#122B46';
$meta_color            = $attributes['metaColor'] ?? '#A3A5A9';
$arrow_color           = $attributes['arrowColor'] ?? '#122B46';
$dot_color             = $attributes['dotColor'] ?? '#122B46';
$pause_on_interaction  = $attributes['pauseOnInteraction'] ?? false;
$effect                = $attributes['effect'] ?? 'slide';
$enable_keyboard       = $attributes['enableKeyboard'] ?? true;
$grab_cursor           = $attributes['grabCursor'] ?? true;

// ── Build inline styles ───────────────────────────────────────────────────────
$inline_styles = array(
	'--card-radius'   => $card_radius . 'px',
	'--space-between' => $space_between . 'px',
);

if ( ! $use_theme_colors ) {
	$inline_styles['--card-bg']     = $card_bg_color;
	$inline_styles['--name-color']  = $name_color;
	$inline_styles['--meta-color']  = $meta_color;
	$inline_styles['--arrow-color'] = $arrow_color;
	$inline_styles['--dot-color']   = $dot_color;
}

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// ── Swiper options ────────────────────────────────────────────────────────────
$swiper_options = array(
	'slidesPerView'  => $slides_to_show,
	'slidesToScroll' => $slides_to_scroll,
	'spaceBetween'   => $space_between,
	'speed'          => $animation_speed,
	'loop'           => $infinite_loop,
	'direction'      => 'horizontal',
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
		320  => array( 'slidesPerView' => $slides_to_show_mobile ),
		768  => array( 'slidesPerView' => $slides_to_show_tablet ),
		1024 => array( 'slidesPerView' => $slides_to_show ),
	),
);

$show_arrows = in_array( $navigation, array( 'arrows', 'both' ), true );
$show_dots   = in_array( $navigation, array( 'dots', 'both' ), true );

// ── Container classes ─────────────────────────────────────────────────────────
$container_classes = array( 'wbcom-members-carousel-container', 'swiper' );
if ( $card_shadow ) {
	$container_classes[] = 'has-shadow';
}

$wrapper_classes = array( 'wbcom-essential-members-carousel' );
if ( $use_theme_colors ) {
	$wrapper_classes[] = 'use-theme-colors';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $wrapper_classes ),
		'style' => $style_string,
	)
);

$unique_id = 'members-carousel-' . wp_unique_id();

// ── Detect context ────────────────────────────────────────────────────────────
$is_editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

	<?php if ( $is_editor ) : ?>
		<?php
		// ── Editor: static SSR preview using BP template tags ────────────────────
		$members_args = array(
			'user_id'         => 0,
			'type'            => $sort_type,
			'per_page'        => $total_members,
			'max'             => $total_members,
			'populate_extras' => true,
			'search_terms'    => false,
		);
		?>
		<?php if ( bp_has_members( $members_args ) ) : ?>
			<div id="<?php echo esc_attr( $unique_id ); ?>"
				class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>"
				data-swiper-options="<?php echo esc_attr( wp_json_encode( $swiper_options ) ); ?>">

				<div class="swiper-wrapper">
					<?php
					while ( bp_members() ) :
						bp_the_member();
						?>
						<div class="swiper-slide">
							<div class="wbcom-member-carousel-card">
								<div class="wbcom-member-carousel-avatar">
									<a href="<?php bp_member_permalink(); ?>">
										<?php
										bp_member_avatar(
											array(
												'type'  => 'full',
												'class' => 'avatar',
											)
										);
										?>
									</a>
								</div>
								<div class="wbcom-member-carousel-content">
									<h4 class="wbcom-member-carousel-name">
										<a href="<?php bp_member_permalink(); ?>">
											<?php bp_member_name(); ?>
										</a>
									</h4>
									<?php if ( $show_last_active ) : ?>
										<p class="wbcom-member-carousel-meta">
											<?php bp_member_last_active(); ?>
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
				<p><?php esc_html_e( 'Sorry, no members were found.', 'wbcom-essential' ); ?></p>
			</div>
		<?php endif; ?>

	<?php else : ?>
		<?php
		// ── Frontend: JS-hydrated Swiper container via BP REST API ────────────────
		$config = array(
			'restUrl'        => rest_url( 'buddypress/v1/members' ),
			'restNonce'      => wp_create_nonce( 'wp_rest' ),
			'perPage'        => $total_members,
			'sortType'       => $sort_type,
			'showLastActive' => $show_last_active,
			'swiperOptions'  => $swiper_options,
			'showArrows'     => $show_arrows,
			'showDots'       => $show_dots,
			'useThemeColors' => $use_theme_colors,
			'loggedIn'       => is_user_logged_in(),
			'colors'         => array(
				'cardBg'     => $use_theme_colors ? '' : $card_bg_color,
				'nameColor'  => $use_theme_colors ? '' : $name_color,
				'metaColor'  => $use_theme_colors ? '' : $meta_color,
				'arrowColor' => $use_theme_colors ? '' : $arrow_color,
				'dotColor'   => $use_theme_colors ? '' : $dot_color,
			),
			'i18n'           => array(
				'loading' => __( 'Loading members...', 'wbcom-essential' ),
				'empty'   => __( 'Sorry, no members were found.', 'wbcom-essential' ),
			),
		);
		?>
		<div id="<?php echo esc_attr( $unique_id ); ?>"
			class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>"
			data-wbe-mc-config="<?php echo esc_attr( wp_json_encode( $config ) ); ?>">

			<div class="swiper-wrapper">
				<div class="swiper-slide wbcom-essential-loading-slide">
					<p><?php esc_html_e( 'Loading members...', 'wbcom-essential' ); ?></p>
				</div>
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

	<?php endif; ?>
</div>
