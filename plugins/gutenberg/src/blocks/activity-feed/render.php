<?php
/**
 * Activity Feed Block — Server-Side Render
 * Follows BuddyX theme activity layout pattern.
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

if ( ! function_exists( 'buddypress' ) || ! bp_is_active( 'activity' ) ) {
	return;
}

// ── Attributes ───────────────────────────────────────────────────────────────
$unique_id          = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$total              = absint( $attributes['totalActivities'] ?? 10 );
$activity_type      = sanitize_text_field( $attributes['activityType'] ?? '' );
$layout             = sanitize_text_field( $attributes['layout'] ?? 'cards' );
$show_avatar        = $attributes['showAvatar'] ?? true;
$show_time          = $attributes['showTime'] ?? true;
$show_action        = $attributes['showAction'] ?? true;
$show_content       = $attributes['showContent'] ?? true;
$show_type_icon     = $attributes['showTypeIcon'] ?? true;
$show_fav_btn       = $attributes['showFavoriteBtn'] ?? true;
$show_comment_count = $attributes['showCommentCount'] ?? true;
$show_media_preview = $attributes['showMediaPreview'] ?? true;
$avatar_size        = absint( $attributes['avatarSize'] ?? 44 );
$accent_color       = sanitize_text_field( $attributes['accentColor'] ?? '#667eea' );
$icon_bg            = sanitize_text_field( $attributes['iconBg'] ?? '#eef2ff' );
$card_bg            = sanitize_text_field( $attributes['cardBg'] ?? '#ffffff' );
$name_color         = sanitize_text_field( $attributes['nameColor'] ?? '#1e1e2e' );
$content_color      = sanitize_text_field( $attributes['contentColor'] ?? '#4a5568' );
$time_color         = sanitize_text_field( $attributes['timeColor'] ?? '#a0aec0' );
$border_color       = sanitize_text_field( $attributes['borderColor'] ?? '#edf2f7' );

// ── Scoped CSS + Visibility ──────────────────────────────────────────────────
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

$layout_class = 'wbe-af--' . esc_attr( $layout );
$wrapper      = get_block_wrapper_attributes(
	array(
		'class' => trim( "wbe-activity-feed {$layout_class}" . ( $unique_id ? ' wbe-block-' . esc_attr( $unique_id ) : '' ) . ( $vis_classes ? ' ' . $vis_classes : '' ) ),
	)
);

// ── Human-readable type labels ───────────────────────────────────────────────
$type_labels = array(
	'activity_update'    => __( 'Activity', 'wbcom-essential' ),
	'new_member'         => __( 'New Member', 'wbcom-essential' ),
	'friendship_created' => __( 'Friendship', 'wbcom-essential' ),
	'friendship_accepted' => __( 'Friendship', 'wbcom-essential' ),
	'joined_group'       => __( 'Group', 'wbcom-essential' ),
	'created_group'      => __( 'Group', 'wbcom-essential' ),
	'new_blog_post'      => __( 'Blog Post', 'wbcom-essential' ),
	'new_blog_comment'   => __( 'Comment', 'wbcom-essential' ),
	'updated_profile'    => __( 'Profile', 'wbcom-essential' ),
);

// ── Query ────────────────────────────────────────────────────────────────────
$args = array(
	'per_page'         => $total,
	'max'              => $total,
	'display_comments' => false,
	'populate_extras'  => true,
);

if ( ! empty( $activity_type ) ) {
	$args['action'] = $activity_type;
}
?>

<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<style>
		.wbe-block-<?php echo esc_attr( $unique_id ); ?> {
			--wbe-af-card-bg: <?php echo esc_attr( $card_bg ); ?>;
			--wbe-af-name: <?php echo esc_attr( $name_color ); ?>;
			--wbe-af-content: <?php echo esc_attr( $content_color ); ?>;
			--wbe-af-time: <?php echo esc_attr( $time_color ); ?>;
			--wbe-af-border: <?php echo esc_attr( $border_color ); ?>;
			--wbe-af-accent: <?php echo esc_attr( $accent_color ); ?>;
			--wbe-af-icon-bg: <?php echo esc_attr( $icon_bg ); ?>;
			--wbe-af-avatar: <?php echo absint( $avatar_size ); ?>px;
		}
	</style>

	<?php if ( bp_has_activities( $args ) ) : ?>
		<div class="wbe-af__list" role="feed" aria-label="<?php esc_attr_e( 'Activity Feed', 'wbcom-essential' ); ?>">
			<?php
			while ( bp_activities() ) :
				bp_the_activity();

				$act_type      = bp_get_activity_type();
				$type_label    = $type_labels[ $act_type ] ?? ucfirst( str_replace( '_', ' ', $act_type ) );
				$comment_count = bp_activity_get_comment_count();
				?>
				<article class="wbe-af__card">
					<?php // ── Type label (like BuddyX card-head) ?>
					<?php if ( $show_type_icon ) : ?>
						<div class="wbe-af__card-head">
							<span class="wbe-af__type-label"><?php echo esc_html( $type_label ); ?></span>
						</div>
					<?php endif; ?>

					<?php // ── Header: avatar + action (BuddyX activity-item-head pattern) ?>
					<div class="wbe-af__item-head">
						<?php if ( $show_avatar ) : ?>
							<div class="wbe-af__avatar-wrap">
								<?php
								bp_activity_avatar(
									array(
										'type'   => 'full',
										'width'  => $avatar_size,
										'height' => $avatar_size,
										'class'  => 'wbe-af__avatar',
									)
								);
								?>
							</div>
						<?php endif; ?>

						<?php if ( $show_action ) : ?>
							<div class="wbe-af__header">
								<?php bp_activity_action(); ?>
							</div>
						<?php endif; ?>
					</div>

					<?php // ── Content body ?>
					<?php if ( $show_content && bp_activity_has_content() ) : ?>
						<div class="wbe-af__body">
							<?php bp_activity_content_body(); ?>
						</div>
					<?php endif; ?>

					<?php // ── Footer actions (pill buttons like BuddyX) ?>
					<?php if ( $show_fav_btn || $show_comment_count ) : ?>
						<div class="wbe-af__footer">
							<?php if ( $show_comment_count ) : ?>
								<span class="wbe-af__action-btn">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
									<?php
									printf(
										/* translators: %d: number of comments */
										esc_html__( 'Comment %d', 'wbcom-essential' ),
										absint( $comment_count )
									);
									?>
								</span>
							<?php endif; ?>

							<?php if ( $show_fav_btn && is_user_logged_in() && function_exists( 'bp_get_activity_is_favorite' ) ) : ?>
								<?php $is_fav = bp_get_activity_is_favorite(); ?>
								<span class="wbe-af__action-btn <?php echo $is_fav ? 'wbe-af__action-btn--fav' : ''; ?>">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="<?php echo $is_fav ? 'currentColor' : 'none'; ?>" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
									<?php echo $is_fav ? esc_html__( 'Favorited', 'wbcom-essential' ) : esc_html__( 'Mark as Favorite', 'wbcom-essential' ); ?>
								</span>
							<?php endif; ?>
						</div>
					<?php endif; ?>
				</article>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<div class="wbe-af__empty">
			<p><?php esc_html_e( 'No activity to show yet.', 'wbcom-essential' ); ?></p>
		</div>
	<?php endif; ?>
</div>
