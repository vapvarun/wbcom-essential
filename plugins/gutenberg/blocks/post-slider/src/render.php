<?php
/**
 * Server-side render for Post Slider block.
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
$post_type             = $attributes['postType'] ?? 'post';
$categories            = $attributes['categories'] ?? array();
$number_of_posts       = $attributes['numberOfPosts'] ?? 5;
$order_by              = $attributes['orderBy'] ?? 'date';
$order                 = $attributes['order'] ?? 'DESC';
$show_excerpt          = $attributes['showExcerpt'] ?? true;
$excerpt_length        = $attributes['excerptLength'] ?? 140;
$show_date             = $attributes['showDate'] ?? true;
$show_button           = $attributes['showButton'] ?? true;
$button_text           = $attributes['buttonText'] ?? __( 'Read More', 'wbcom-essential' );
$slider_height         = $attributes['sliderHeight'] ?? 600;
$slider_height_unit    = $attributes['sliderHeightUnit'] ?? 'px';
$transition            = $attributes['transition'] ?? 'fade';
$transition_duration   = $attributes['transitionDuration'] ?? 500;
$autoplay              = $attributes['autoplay'] ?? true;
$autoplay_delay        = $attributes['autoplayDelay'] ?? 5000;
$show_navigation       = $attributes['showNavigation'] ?? true;
$show_pagination       = $attributes['showPagination'] ?? true;
$hide_nav_on_hover     = $attributes['hideNavOnHover'] ?? false;
$bg_animation          = $attributes['bgAnimation'] ?? 'none';
$bg_animation_duration = $attributes['bgAnimationDuration'] ?? 8;
$text_animation        = $attributes['textAnimation'] ?? 'fadeInUp';
$overlay_color         = $attributes['overlayColor'] ?? 'rgba(0, 0, 0, 0.4)';
$content_width         = $attributes['contentWidth'] ?? 800;
$content_align         = $attributes['contentAlign'] ?? 'center';
$title_color           = $attributes['titleColor'] ?? '#ffffff';
$excerpt_color         = $attributes['excerptColor'] ?? 'rgba(255, 255, 255, 0.9)';
$date_color            = $attributes['dateColor'] ?? 'rgba(255, 255, 255, 0.8)';
$button_bg_color       = $attributes['buttonBgColor'] ?? '#ffffff';
$button_text_color     = $attributes['buttonTextColor'] ?? '#1a202c';
$nav_color             = $attributes['navColor'] ?? '#ffffff';

// Build query args.
$query_args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $number_of_posts,
	'orderby'        => $order_by,
	'order'          => $order,
	'post_status'    => 'publish',
);

// Add category filter if set.
if ( ! empty( $categories ) && 'post' === $post_type ) {
	$query_args['category_name'] = implode( ',', $categories );
}

$posts_query = new WP_Query( $query_args );

if ( ! $posts_query->have_posts() ) {
	echo '<p class="wbcom-essential-post-slider-empty">' . esc_html__( 'No posts found.', 'wbcom-essential' ) . '</p>';
	return;
}

// Generate unique ID for this slider instance.
$slider_id = 'wbcom-post-slider-' . wp_unique_id();

// Swiper configuration data.
$swiper_config = array(
	'effect'     => $transition,
	'speed'      => $transition_duration,
	'loop'       => true,
	'navigation' => $show_navigation,
	'pagination' => $show_pagination,
	'autoplay'   => $autoplay ? array( 'delay' => $autoplay_delay ) : false,
);

if ( 'fade' === $transition ) {
	$swiper_config['fadeEffect'] = array( 'crossFade' => true );
}

// CSS custom properties for styling.
$style_vars = sprintf(
	'--slider-height: %d%s; --overlay-color: %s; --content-width: %dpx; --title-color: %s; --excerpt-color: %s; --date-color: %s; --button-bg: %s; --button-text: %s; --nav-color: %s; --bg-anim-duration: %ds;',
	absint( $slider_height ),
	esc_attr( $slider_height_unit ),
	esc_attr( $overlay_color ),
	absint( $content_width ),
	esc_attr( $title_color ),
	esc_attr( $excerpt_color ),
	esc_attr( $date_color ),
	esc_attr( $button_bg_color ),
	esc_attr( $button_text_color ),
	esc_attr( $nav_color ),
	absint( $bg_animation_duration )
);

// Build classes.
$wrapper_classes = array(
	'wbcom-essential-post-slider',
	'content-align-' . esc_attr( $content_align ),
	'bg-animation-' . esc_attr( $bg_animation ),
	'text-animation-' . esc_attr( $text_animation ),
);

if ( $hide_nav_on_hover ) {
	$wrapper_classes[] = 'nav-on-hover';
}

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => implode( ' ', $wrapper_classes ),
	'style' => $style_vars,
	'id'    => $slider_id,
) );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?> data-swiper-config="<?php echo esc_attr( wp_json_encode( $swiper_config ) ); ?>">
	<div class="swiper">
		<div class="swiper-wrapper">
			<?php
			while ( $posts_query->have_posts() ) :
				$posts_query->the_post();
				$thumbnail_url = get_the_post_thumbnail_url( get_the_ID(), 'full' );
				if ( ! $thumbnail_url ) {
					$thumbnail_url = 'data:image/svg+xml,' . rawurlencode( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><rect fill="#4a5568"/></svg>' );
				}
				?>
				<div class="swiper-slide">
					<div class="wbcom-post-slider-slide" style="background-image: url('<?php echo esc_url( $thumbnail_url ); ?>');">
						<div class="wbcom-post-slider-overlay"></div>
						<div class="wbcom-post-slider-content">
							<?php if ( $show_date ) : ?>
								<div class="wbcom-post-slider-date">
									<?php echo esc_html( get_the_date() ); ?>
								</div>
							<?php endif; ?>

							<h2 class="wbcom-post-slider-title">
								<a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
							</h2>

							<?php if ( $show_excerpt && $excerpt_length > 0 ) : ?>
								<div class="wbcom-post-slider-excerpt">
									<?php
									$excerpt = get_the_excerpt();
									if ( strlen( $excerpt ) > $excerpt_length ) {
										$excerpt = substr( $excerpt, 0, $excerpt_length ) . '...';
									}
									echo wp_kses_post( $excerpt );
									?>
								</div>
							<?php endif; ?>

							<?php if ( $show_button ) : ?>
								<a href="<?php the_permalink(); ?>" class="wbcom-post-slider-button">
									<?php echo esc_html( $button_text ); ?>
								</a>
							<?php endif; ?>
						</div>
					</div>
				</div>
			<?php endwhile; ?>
			<?php wp_reset_postdata(); ?>
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
