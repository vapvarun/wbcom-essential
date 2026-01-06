<?php
/**
 * Server-side render for Testimonial Carousel block.
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
$testimonials           = $attributes['testimonials'] ?? array();
$slides_per_view        = $attributes['slidesPerView'] ?? 2;
$slides_per_view_tablet = $attributes['slidesPerViewTablet'] ?? 1;
$slides_per_view_mobile = $attributes['slidesPerViewMobile'] ?? 1;
$space_between          = $attributes['spaceBetween'] ?? 30;
$show_navigation        = $attributes['showNavigation'] ?? true;
$show_pagination        = $attributes['showPagination'] ?? true;
$loop                   = $attributes['loop'] ?? true;
$autoplay               = $attributes['autoplay'] ?? false;
$autoplay_delay         = $attributes['autoplayDelay'] ?? 5000;
$show_rating            = $attributes['showRating'] ?? true;
$card_background        = $attributes['cardBackground'] ?? '#ffffff';
$card_border_radius     = $attributes['cardBorderRadius'] ?? 12;
$quote_color            = $attributes['quoteColor'] ?? '#4a5568';
$name_color             = $attributes['nameColor'] ?? '#1a202c';
$role_color             = $attributes['roleColor'] ?? '#718096';
$rating_color           = $attributes['ratingColor'] ?? '#f6ad55';
$nav_color              = $attributes['navColor'] ?? '#3182ce';
$pause_on_interaction   = $attributes['pauseOnInteraction'] ?? false;
$direction              = $attributes['direction'] ?? 'horizontal';
$effect                 = $attributes['effect'] ?? 'slide';
$enable_keyboard        = $attributes['enableKeyboard'] ?? true;
$grab_cursor            = $attributes['grabCursor'] ?? true;

// Don't render if no testimonials.
if ( empty( $testimonials ) ) {
	return;
}

// Build unique ID for this instance.
$unique_id = wp_unique_id( 'wbcom-testimonial-carousel-' );

// Card styles.
$card_style = sprintf(
	'background-color: %s; border-radius: %dpx;',
	esc_attr( $card_background ),
	absint( $card_border_radius )
);

// Swiper configuration.
$swiper_config = wp_json_encode( array(
	'slidesPerView' => absint( $slides_per_view ),
	'spaceBetween'  => absint( $space_between ),
	'loop'          => (bool) $loop,
	'direction'     => sanitize_text_field( $direction ),
	'effect'        => sanitize_text_field( $effect ),
	'grabCursor'    => (bool) $grab_cursor,
	'keyboard'      => array(
		'enabled' => (bool) $enable_keyboard,
	),
	'autoplay'      => $autoplay ? array(
		'delay'                => absint( $autoplay_delay ),
		'disableOnInteraction' => (bool) $pause_on_interaction,
	) : false,
	'navigation'    => $show_navigation ? array(
		'nextEl' => '#' . $unique_id . ' .swiper-button-next',
		'prevEl' => '#' . $unique_id . ' .swiper-button-prev',
	) : false,
	'pagination'    => $show_pagination ? array(
		'el'        => '#' . $unique_id . ' .swiper-pagination',
		'clickable' => true,
	) : false,
	'breakpoints'   => array(
		320  => array(
			'slidesPerView' => absint( $slides_per_view_mobile ),
		),
		768  => array(
			'slidesPerView' => absint( $slides_per_view_tablet ),
		),
		1024 => array(
			'slidesPerView' => absint( $slides_per_view ),
		),
	),
) );

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class'              => 'wbcom-essential-testimonial-carousel',
	'id'                 => $unique_id,
	'data-swiper-config' => $swiper_config,
) );

// Navigation color style.
$nav_style = '';
if ( $nav_color ) {
	$nav_style = sprintf(
		'<style>#%s .swiper-button-next, #%s .swiper-button-prev { color: %s; } #%s .swiper-pagination-bullet-active { background-color: %s; }</style>',
		esc_attr( $unique_id ),
		esc_attr( $unique_id ),
		esc_attr( $nav_color ),
		esc_attr( $unique_id ),
		esc_attr( $nav_color )
	);
}

/**
 * Render star rating HTML.
 */
if ( ! function_exists( 'wbcom_render_carousel_stars' ) ) {
function wbcom_render_carousel_stars( $rating, $rating_color ) {
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
}
?>

<?php echo $nav_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="swiper wbcom-testimonial-swiper">
		<div class="swiper-wrapper">
			<?php foreach ( $testimonials as $testimonial ) : ?>
				<?php
				$t_content     = $testimonial['content'] ?? '';
				$t_name        = $testimonial['authorName'] ?? '';
				$t_role        = $testimonial['authorRole'] ?? '';
				$t_image_id    = $testimonial['imageId'] ?? 0;
				$t_rating      = $testimonial['rating'] ?? 5;
				$t_image       = '';

				if ( $t_image_id ) {
					$t_image = wp_get_attachment_image( $t_image_id, 'thumbnail', false, array(
						'class' => 'wbcom-testimonial-avatar-img',
						'alt'   => esc_attr( $t_name ),
					) );
				}
				?>
				<div class="swiper-slide">
					<div class="wbcom-testimonial-card" style="<?php echo esc_attr( $card_style ); ?>">
						<?php if ( $show_rating ) : ?>
							<div class="wbcom-testimonial-rating">
								<?php echo wbcom_render_carousel_stars( $t_rating, $rating_color ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							</div>
						<?php endif; ?>

						<?php if ( ! empty( $t_content ) ) : ?>
							<div class="wbcom-testimonial-quote">
								<span class="quote-mark">"</span>
								<p style="color: <?php echo esc_attr( $quote_color ); ?>;">
									<?php echo wp_kses_post( $t_content ); ?>
								</p>
							</div>
						<?php endif; ?>

						<div class="wbcom-testimonial-author">
							<?php if ( $t_image ) : ?>
								<div class="wbcom-testimonial-avatar">
									<?php echo $t_image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								</div>
							<?php endif; ?>

							<div class="wbcom-testimonial-info">
								<?php if ( ! empty( $t_name ) ) : ?>
									<span class="wbcom-testimonial-name" style="color: <?php echo esc_attr( $name_color ); ?>;">
										<?php echo esc_html( $t_name ); ?>
									</span>
								<?php endif; ?>
								<?php if ( ! empty( $t_role ) ) : ?>
									<span class="wbcom-testimonial-role" style="color: <?php echo esc_attr( $role_color ); ?>;">
										<?php echo esc_html( $t_role ); ?>
									</span>
								<?php endif; ?>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		</div>

		<?php if ( $show_pagination ) : ?>
			<div class="swiper-pagination"></div>
		<?php endif; ?>

		<?php if ( $show_navigation ) : ?>
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
		<?php endif; ?>
	</div>
</div>
