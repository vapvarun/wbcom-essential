<?php
/**
 * Server-side render for Team Carousel block.
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
$members                = $attributes['members'] ?? array();
$slides_per_view        = $attributes['slidesPerView'] ?? 3;
$slides_per_view_tablet = $attributes['slidesPerViewTablet'] ?? 2;
$slides_per_view_mobile = $attributes['slidesPerViewMobile'] ?? 1;
$space_between          = $attributes['spaceBetween'] ?? 30;
$show_navigation        = $attributes['showNavigation'] ?? true;
$show_pagination        = $attributes['showPagination'] ?? true;
$loop                   = $attributes['loop'] ?? true;
$autoplay               = $attributes['autoplay'] ?? false;
$autoplay_delay         = $attributes['autoplayDelay'] ?? 5000;
$card_background        = $attributes['cardBackground'] ?? '#ffffff';
$card_border_radius     = $attributes['cardBorderRadius'] ?? 8;
$name_color             = $attributes['nameColor'] ?? '#1a202c';
$role_color             = $attributes['roleColor'] ?? '#718096';
$nav_color              = $attributes['navColor'] ?? '#3182ce';
$card_padding           = $attributes['cardPadding'] ?? 20;
$card_box_shadow        = $attributes['cardBoxShadow'] ?? true;
$image_border_radius    = $attributes['imageBorderRadius'] ?? 8;
$name_font_size         = $attributes['nameFontSize'] ?? 18;
$role_font_size         = $attributes['roleFontSize'] ?? 14;
$image_aspect_ratio     = $attributes['imageAspectRatio'] ?? '1/1';

// Don't render if no members.
if ( empty( $members ) ) {
	return;
}

// Build unique ID for this instance.
$unique_id = wp_unique_id( 'wbcom-team-carousel-' );

// Card styles.
$box_shadow_value = $card_box_shadow ? '0 4px 15px rgba(0, 0, 0, 0.08)' : 'none';
$card_style       = sprintf(
	'background-color: %s; border-radius: %dpx; padding: %dpx; box-shadow: %s;',
	esc_attr( $card_background ),
	absint( $card_border_radius ),
	absint( $card_padding ),
	esc_attr( $box_shadow_value )
);

// Image styles.
$image_style = sprintf(
	'border-radius: %dpx; aspect-ratio: %s;',
	absint( $image_border_radius ),
	esc_attr( $image_aspect_ratio )
);

// Swiper configuration.
$swiper_config = wp_json_encode( array(
	'slidesPerView' => absint( $slides_per_view ),
	'spaceBetween'  => absint( $space_between ),
	'loop'          => (bool) $loop,
	'autoplay'      => $autoplay ? array(
		'delay'                => absint( $autoplay_delay ),
		'disableOnInteraction' => false,
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
	'class'              => 'wbcom-essential-team-carousel',
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
?>

<?php echo $nav_style; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="swiper wbcom-team-swiper">
		<div class="swiper-wrapper">
			<?php foreach ( $members as $member ) : ?>
				<?php
				$member_name     = $member['name'] ?? '';
				$member_role     = $member['role'] ?? '';
				$member_image_id = $member['imageId'] ?? 0;
				$member_link     = $member['linkUrl'] ?? '';
				$member_image    = '';

				if ( $member_image_id ) {
					$member_image = wp_get_attachment_image( $member_image_id, 'medium', false, array(
						'class' => 'wbcom-team-member-img',
						'alt'   => esc_attr( $member_name ),
					) );
				}
				?>
				<div class="swiper-slide">
					<div class="wbcom-team-member-card" style="<?php echo esc_attr( $card_style ); ?>">
						<?php if ( $member_link ) : ?>
							<a href="<?php echo esc_url( $member_link ); ?>" class="wbcom-team-member-link">
						<?php endif; ?>

						<div class="wbcom-team-member-image" style="<?php echo esc_attr( $image_style ); ?>">
							<?php if ( $member_image ) : ?>
								<?php echo $member_image; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<?php else : ?>
								<div class="wbcom-team-member-placeholder" style="border-radius: <?php echo absint( $image_border_radius ); ?>px;">
									<span class="dashicons dashicons-admin-users"></span>
								</div>
							<?php endif; ?>
						</div>

						<div class="wbcom-team-member-info">
							<?php if ( $member_name ) : ?>
								<h4 class="wbcom-team-member-name" style="color: <?php echo esc_attr( $name_color ); ?>; font-size: <?php echo absint( $name_font_size ); ?>px;">
									<?php echo esc_html( $member_name ); ?>
								</h4>
							<?php endif; ?>
							<?php if ( $member_role ) : ?>
								<p class="wbcom-team-member-role" style="color: <?php echo esc_attr( $role_color ); ?>; font-size: <?php echo absint( $role_font_size ); ?>px;">
									<?php echo esc_html( $member_role ); ?>
								</p>
							<?php endif; ?>
						</div>

						<?php if ( $member_link ) : ?>
							</a>
						<?php endif; ?>
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
