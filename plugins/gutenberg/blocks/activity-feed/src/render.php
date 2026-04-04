<?php
/**
 * Activity Feed Block - Server-Side Render
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

if ( ! function_exists( 'buddypress' ) ) {
	return;
}

// ── Extract attributes ────────────────────────────────────────────────────────
$unique_id        = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$total_activities = absint( $attributes['totalActivities'] ?? 10 );
$activity_type    = sanitize_text_field( $attributes['activityType'] ?? '' );
$show_avatar      = ! empty( $attributes['showAvatar'] );
$show_time        = ! empty( $attributes['showTime'] );
$show_action      = ! empty( $attributes['showAction'] );
$show_content     = ! empty( $attributes['showContent'] );
$avatar_size      = absint( $attributes['avatarSize'] ?? 50 );
$card_bg          = sanitize_hex_color( $attributes['cardBg'] ?? '#ffffff' ) ?: '#ffffff';
$name_color       = sanitize_hex_color( $attributes['nameColor'] ?? '#1e1e2e' ) ?: '#1e1e2e';
$content_color    = sanitize_hex_color( $attributes['contentColor'] ?? '#6c757d' ) ?: '#6c757d';
$time_color       = sanitize_hex_color( $attributes['timeColor'] ?? '#999999' ) ?: '#999999';
$border_color     = sanitize_hex_color( $attributes['borderColor'] ?? '#e9ecef' ) ?: '#e9ecef';

// ── Visibility + CSS ──────────────────────────────────────────────────────────
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

// ── Wrapper ───────────────────────────────────────────────────────────────────
$wrapper = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-activity-feed' . ( $unique_id ? ' wbe-block-' . esc_attr( $unique_id ) : '' ) . ( $vis_classes ? ' ' . $vis_classes : '' ) ),
	)
);

// ── Inline token CSS ──────────────────────────────────────────────────────────
$token_css = '';
if ( $unique_id ) {
	$token_css = sprintf(
		'.wbe-block-%1$s { --wbe-af-card-bg: %2$s; --wbe-af-name-color: %3$s; --wbe-af-content-color: %4$s; --wbe-af-time-color: %5$s; --wbe-af-border-color: %6$s; }',
		esc_attr( $unique_id ),
		esc_attr( $card_bg ),
		esc_attr( $name_color ),
		esc_attr( $content_color ),
		esc_attr( $time_color ),
		esc_attr( $border_color )
	);
}

// ── BuddyPress activity query ─────────────────────────────────────────────────
$args = array(
	'per_page'         => $total_activities,
	'max'              => $total_activities,
	'display_comments' => false,
);

if ( ! empty( $activity_type ) ) {
	$args['action'] = $activity_type;
}
?>

<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( $token_css ) : ?>
		<style><?php echo esc_html( $token_css ); ?></style>
	<?php endif; ?>

	<?php if ( bp_has_activities( $args ) ) : ?>
		<div class="wbe-activity-feed__list">
			<?php
			while ( bp_activities() ) :
				bp_the_activity();
				?>
				<div class="wbe-activity-feed__item">

					<?php if ( $show_avatar ) : ?>
						<div class="wbe-activity-feed__avatar">
							<a href="<?php bp_activity_user_link(); ?>">
								<?php
								bp_activity_avatar(
									array(
										'width'  => $avatar_size,
										'height' => $avatar_size,
										'class'  => 'wbe-activity-feed__avatar-img',
									)
								);
								?>
							</a>
						</div>
					<?php endif; ?>

					<div class="wbe-activity-feed__body">

						<?php if ( $show_action ) : ?>
							<div class="wbe-activity-feed__action">
								<?php bp_activity_action(); ?>
							</div>
						<?php endif; ?>

						<?php if ( $show_content && bp_activity_has_content() ) : ?>
							<div class="wbe-activity-feed__content">
								<?php bp_activity_content_body(); ?>
							</div>
						<?php endif; ?>

						<?php if ( $show_time ) : ?>
							<time class="wbe-activity-feed__time" datetime="<?php echo esc_attr( bp_get_activity_date_recorded() ); ?>">
								<?php echo esc_html( bp_get_activity_date_recorded() ); ?>
							</time>
						<?php endif; ?>

					</div>
				</div>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<p class="wbe-activity-feed__empty"><?php esc_html_e( 'No activity found.', 'wbcom-essential' ); ?></p>
	<?php endif; ?>
</div>
