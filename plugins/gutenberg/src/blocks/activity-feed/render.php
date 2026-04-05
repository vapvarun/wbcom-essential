<?php
/**
 * Activity Feed Block — Premium Server-Side Render
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

$layout_class = 'wbe-activity-feed--' . esc_attr( $layout );
$wrapper      = get_block_wrapper_attributes(
	array(
		'class' => trim( "wbe-activity-feed {$layout_class}" . ( $unique_id ? ' wbe-block-' . esc_attr( $unique_id ) : '' ) . ( $vis_classes ? ' ' . $vis_classes : '' ) ),
	)
);

// ── Activity type → icon SVG map ─────────────────────────────────────────────
$type_icons = array(
	'activity_update'    => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
	'new_member'         => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>',
	'friendship_created' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
	'joined_group'       => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
	'created_group'      => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>',
	'new_blog_post'      => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
	'new_blog_comment'   => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
	'default'            => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
);

// ── Human-readable type labels ───────────────────────────────────────────────
$type_labels = array(
	'activity_update'    => __( 'Update', 'wbcom-essential' ),
	'new_member'         => __( 'New Member', 'wbcom-essential' ),
	'friendship_created' => __( 'Friendship', 'wbcom-essential' ),
	'joined_group'       => __( 'Joined Group', 'wbcom-essential' ),
	'created_group'      => __( 'New Group', 'wbcom-essential' ),
	'new_blog_post'      => __( 'Blog Post', 'wbcom-essential' ),
	'new_blog_comment'   => __( 'Comment', 'wbcom-essential' ),
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
				$icon_svg      = $type_icons[ $act_type ] ?? $type_icons['default'];
				$type_label    = $type_labels[ $act_type ] ?? ucfirst( str_replace( '_', ' ', $act_type ) );
				$time_since    = bp_core_time_since( bp_get_activity_date_recorded() );
				$comment_count = bp_activity_get_comment_count();
				$has_media     = false;
				$media_url     = '';

				// Check for media in content.
				if ( $show_media_preview ) {
					$raw_content = bp_get_activity_content_body();
					if ( preg_match( '/<img[^>]+src=["\']([^"\']+)["\']/', $raw_content, $matches ) ) {
						$has_media = true;
						$media_url = $matches[1];
					}
				}
				?>
				<article class="wbe-af__card" aria-label="<?php echo esc_attr( wp_strip_all_tags( bp_get_activity_action() ) ); ?>">
					<div class="wbe-af__header">
						<?php if ( $show_avatar ) : ?>
							<div class="wbe-af__avatar-wrap">
								<a href="<?php bp_activity_user_link(); ?>" class="wbe-af__avatar-link">
									<?php
									bp_activity_avatar(
										array(
											'width'  => $avatar_size,
											'height' => $avatar_size,
											'class'  => 'wbe-af__avatar',
										)
									);
									?>
								</a>
								<?php if ( $show_type_icon ) : ?>
									<span class="wbe-af__type-badge" title="<?php echo esc_attr( $type_label ); ?>">
										<?php echo $icon_svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Hardcoded SVG. ?>
									</span>
								<?php endif; ?>
							</div>
						<?php endif; ?>

						<div class="wbe-af__meta">
							<?php if ( $show_action ) : ?>
								<div class="wbe-af__action">
									<?php
									// Strip timestamp from action text — we show it separately.
									$action_text = bp_get_activity_action( array( 'no_timestamp' => true ) );
									echo wp_kses_post( $action_text );
									?>
								</div>
							<?php endif; ?>

							<?php if ( $show_time ) : ?>
								<time class="wbe-af__time" datetime="<?php echo esc_attr( bp_get_activity_date_recorded() ); ?>">
									<?php echo esc_html( $time_since ); ?>
								</time>
							<?php endif; ?>
						</div>
					</div>

					<?php if ( $show_content && bp_activity_has_content() ) : ?>
						<div class="wbe-af__body">
							<?php
							$content_html = bp_get_activity_content_body();
							// Strip images if we show media preview separately.
							if ( $has_media && $show_media_preview ) {
								$content_html = preg_replace( '/<a[^>]*>\s*<img[^>]*>\s*<\/a>|<img[^>]*>/', '', $content_html );
								$content_html = trim( $content_html );
							}
							if ( ! empty( $content_html ) ) {
								echo wp_kses_post( $content_html );
							}
							?>
						</div>
					<?php endif; ?>

					<?php if ( $has_media && $show_media_preview ) : ?>
						<div class="wbe-af__media">
							<img src="<?php echo esc_url( $media_url ); ?>" alt="" loading="lazy" class="wbe-af__media-img" />
						</div>
					<?php endif; ?>

					<div class="wbe-af__footer">
						<div class="wbe-af__actions">
							<?php if ( $show_fav_btn && is_user_logged_in() && function_exists( 'bp_activity_is_favorited' ) ) : ?>
								<?php
								$is_fav   = bp_get_activity_is_favorite();
								$fav_class = $is_fav ? 'wbe-af__action-btn--active' : '';
								?>
								<button type="button" class="wbe-af__action-btn wbe-af__fav-btn <?php echo esc_attr( $fav_class ); ?>" aria-label="<?php esc_attr_e( 'Favorite', 'wbcom-essential' ); ?>" data-activity-id="<?php echo esc_attr( bp_get_activity_id() ); ?>">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="<?php echo $is_fav ? 'currentColor' : 'none'; ?>" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
								</button>
							<?php endif; ?>

							<?php if ( $show_comment_count ) : ?>
								<span class="wbe-af__action-btn wbe-af__comment-count" aria-label="<?php echo esc_attr( sprintf( __( '%d comments', 'wbcom-essential' ), $comment_count ) ); ?>">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
									<?php if ( $comment_count > 0 ) : ?>
										<span class="wbe-af__count"><?php echo absint( $comment_count ); ?></span>
									<?php endif; ?>
								</span>
							<?php endif; ?>
						</div>

						<?php if ( $show_type_icon && ! $show_avatar ) : ?>
							<span class="wbe-af__type-label">
								<?php echo $icon_svg; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
								<?php echo esc_html( $type_label ); ?>
							</span>
						<?php endif; ?>
					</div>
				</article>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<div class="wbe-af__empty">
			<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 15h8"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>
			<p><?php esc_html_e( 'No activity to show yet.', 'wbcom-essential' ); ?></p>
		</div>
	<?php endif; ?>
</div>
