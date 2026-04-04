<?php
/**
 * Profile Completion Block - Server-Side Render
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

if ( ! function_exists( 'buddypress' ) || ! is_user_logged_in() ) {
	return;
}

// ── Extract attributes ────────────────────────────────────────────────────────
$unique_id        = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$selected_groups  = ! empty( $attributes['selectedGroups'] ) ? array_map( 'absint', (array) $attributes['selectedGroups'] ) : array();
$check_photo      = ! empty( $attributes['checkProfilePhoto'] );
$check_cover      = ! empty( $attributes['checkCoverPhoto'] );
$skin             = in_array( $attributes['skin'] ?? 'circle', array( 'circle', 'linear' ), true ) ? $attributes['skin'] : 'circle';
$progress_color   = sanitize_hex_color( $attributes['progressColor'] ?? '#667eea' ) ?: '#667eea';
$track_color      = sanitize_hex_color( $attributes['trackColor'] ?? '#e9ecef' ) ?: '#e9ecef';
$text_color       = sanitize_hex_color( $attributes['textColor'] ?? '#1e1e2e' ) ?: '#1e1e2e';
$completed_color  = sanitize_hex_color( $attributes['completedColor'] ?? '#28a745' ) ?: '#28a745';
$incomplete_color = sanitize_hex_color( $attributes['incompleteColor'] ?? '#6c757d' ) ?: '#6c757d';
$show_group_list  = ! empty( $attributes['showGroupList'] );
$show_percentage  = ! empty( $attributes['showPercentage'] );

// ── Visibility + CSS ──────────────────────────────────────────────────────────
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

// ── Wrapper ───────────────────────────────────────────────────────────────────
$wrapper = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-profile-completion wbe-profile-completion--' . esc_attr( $skin ) . ( $unique_id ? ' wbe-block-' . esc_attr( $unique_id ) : '' ) . ( $vis_classes ? ' ' . $vis_classes : '' ) ),
	)
);

// ── Token CSS ─────────────────────────────────────────────────────────────────
$token_css = '';
if ( $unique_id ) {
	$token_css = sprintf(
		'.wbe-block-%1$s { --wbe-prc-progress: %2$s; --wbe-prc-track: %3$s; --wbe-prc-text: %4$s; --wbe-prc-done: %5$s; --wbe-prc-todo: %6$s; }',
		esc_attr( $unique_id ),
		esc_attr( $progress_color ),
		esc_attr( $track_color ),
		esc_attr( $text_color ),
		esc_attr( $completed_color ),
		esc_attr( $incomplete_color )
	);
}

// ── Calculate completion ──────────────────────────────────────────────────────
$user_id          = bp_loggedin_user_id();
$total_fields     = 0;
$completed_fields = 0;
$groups_data      = array();

// xProfile groups.
if ( function_exists( 'bp_has_profile' ) ) {
	$profile_args = array( 'user_id' => $user_id );
	if ( ! empty( $selected_groups ) ) {
		$profile_args['profile_group_id'] = $selected_groups;
	}

	if ( bp_has_profile( $profile_args ) ) {
		while ( bp_profile_groups() ) {
			bp_the_profile_group();

			$group_total     = 0;
			$group_completed = 0;

			if ( bp_profile_group_has_fields() ) {
				while ( bp_profile_fields() ) {
					bp_the_profile_field();
					$total_fields++;
					$group_total++;
					$value = bp_get_profile_field_data(
						array(
							'field'   => bp_get_the_profile_field_id(),
							'user_id' => $user_id,
						)
					);
					if ( ! empty( $value ) ) {
						$completed_fields++;
						$group_completed++;
					}
				}
			}

			$group_id     = bp_get_the_profile_group_id();
			$profile_slug = function_exists( 'bp_get_profile_slug' ) ? bp_get_profile_slug() : 'profile';

			$groups_data[] = array(
				'label'     => bp_get_the_profile_group_name(),
				'completed' => $group_completed,
				'total'     => $group_total,
				'is_done'   => ( $group_total > 0 && $group_completed === $group_total ),
				'link'      => trailingslashit( bp_loggedin_user_domain() . $profile_slug . '/edit/group/' . absint( $group_id ) ),
			);
		}
	}
}

// Profile photo.
if ( $check_photo && ! bp_disable_avatar_uploads() ) {
	$total_fields++;
	if ( bp_get_user_has_avatar( $user_id ) ) {
		$completed_fields++;
		$groups_data[] = array(
			'label'     => __( 'Profile Photo', 'wbcom-essential' ),
			'completed' => 1,
			'total'     => 1,
			'is_done'   => true,
			'link'      => trailingslashit( bp_loggedin_user_domain() ) . 'change-avatar/',
		);
	} else {
		$groups_data[] = array(
			'label'     => __( 'Profile Photo', 'wbcom-essential' ),
			'completed' => 0,
			'total'     => 1,
			'is_done'   => false,
			'link'      => trailingslashit( bp_loggedin_user_domain() ) . 'change-avatar/',
		);
	}
}

// Cover photo.
if ( $check_cover && ! bp_disable_cover_image_uploads() ) {
	$total_fields++;
	$cover_image = '';
	if ( function_exists( 'bp_attachments_get_attachment' ) ) {
		$cover_image = bp_attachments_get_attachment(
			'url',
			array(
				'object_dir' => 'members',
				'item_id'    => $user_id,
			)
		);
	}
	$has_cover = ! empty( $cover_image );
	if ( $has_cover ) {
		$completed_fields++;
	}
	$groups_data[] = array(
		'label'     => __( 'Cover Photo', 'wbcom-essential' ),
		'completed' => $has_cover ? 1 : 0,
		'total'     => 1,
		'is_done'   => $has_cover,
		'link'      => trailingslashit( bp_loggedin_user_domain() ) . 'change-cover-image/',
	);
}

$percentage = $total_fields > 0 ? round( ( $completed_fields / $total_fields ) * 100 ) : 0;

// ── SVG circle ring dimensions ────────────────────────────────────────────────
$circle_size      = 120;
$circle_cx        = $circle_size / 2;
$circle_cy        = $circle_size / 2;
$circle_r         = 46;
$circumference    = round( 2 * M_PI * $circle_r, 2 );
$dash_offset      = round( $circumference - ( $percentage / 100 ) * $circumference, 2 );
?>

<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( $token_css ) : ?>
		<style><?php echo esc_html( $token_css ); ?></style>
	<?php endif; ?>

	<div class="wbe-profile-completion__inner">

		<?php if ( 'circle' === $skin ) : ?>
			<?php /* ── Circle progress ring ── */ ?>
			<div class="wbe-profile-completion__circle-wrap">
				<svg
					class="wbe-profile-completion__svg"
					width="<?php echo esc_attr( $circle_size ); ?>"
					height="<?php echo esc_attr( $circle_size ); ?>"
					viewBox="0 0 <?php echo esc_attr( $circle_size ); ?> <?php echo esc_attr( $circle_size ); ?>"
					role="img"
					aria-label="<?php
						/* translators: %d: profile completion percentage */
						echo esc_attr( sprintf( __( 'Profile %d%% complete', 'wbcom-essential' ), $percentage ) );
					?>"
				>
					<?php /* Track circle */ ?>
					<circle
						class="wbe-profile-completion__track"
						cx="<?php echo esc_attr( $circle_cx ); ?>"
						cy="<?php echo esc_attr( $circle_cy ); ?>"
						r="<?php echo esc_attr( $circle_r ); ?>"
						fill="none"
						stroke="<?php echo esc_attr( $track_color ); ?>"
						stroke-width="8"
					/>
					<?php /* Progress arc */ ?>
					<circle
						class="wbe-profile-completion__progress"
						cx="<?php echo esc_attr( $circle_cx ); ?>"
						cy="<?php echo esc_attr( $circle_cy ); ?>"
						r="<?php echo esc_attr( $circle_r ); ?>"
						fill="none"
						stroke="<?php echo esc_attr( $progress_color ); ?>"
						stroke-width="8"
						stroke-linecap="round"
						stroke-dasharray="<?php echo esc_attr( $circumference ); ?>"
						stroke-dashoffset="<?php echo esc_attr( $dash_offset ); ?>"
						transform="rotate(-90 <?php echo esc_attr( $circle_cx ); ?> <?php echo esc_attr( $circle_cy ); ?>)"
					/>
					<?php if ( $show_percentage ) : ?>
						<text
							class="wbe-profile-completion__pct-text"
							x="<?php echo esc_attr( $circle_cx ); ?>"
							y="<?php echo esc_attr( $circle_cy + 1 ); ?>"
							text-anchor="middle"
							dominant-baseline="middle"
							fill="<?php echo esc_attr( $text_color ); ?>"
							font-size="18"
							font-weight="700"
						><?php echo esc_html( $percentage ); ?>%</text>
					<?php endif; ?>
				</svg>

				<p class="wbe-profile-completion__label">
					<?php esc_html_e( 'Profile Complete', 'wbcom-essential' ); ?>
				</p>
			</div>

		<?php else : ?>
			<?php /* ── Linear progress bar ── */ ?>
			<div class="wbe-profile-completion__linear-wrap">
				<?php if ( $show_percentage ) : ?>
					<div class="wbe-profile-completion__linear-header">
						<span class="wbe-profile-completion__linear-label">
							<?php esc_html_e( 'Profile Complete', 'wbcom-essential' ); ?>
						</span>
						<span class="wbe-profile-completion__linear-pct" style="color: <?php echo esc_attr( $text_color ); ?>;">
							<?php echo esc_html( $percentage ); ?>%
						</span>
					</div>
				<?php endif; ?>
				<div
					class="wbe-profile-completion__bar-track"
					style="background: <?php echo esc_attr( $track_color ); ?>;"
					role="progressbar"
					aria-valuenow="<?php echo esc_attr( $percentage ); ?>"
					aria-valuemin="0"
					aria-valuemax="100"
					aria-label="<?php
						/* translators: %d: profile completion percentage */
						echo esc_attr( sprintf( __( 'Profile %d%% complete', 'wbcom-essential' ), $percentage ) );
					?>"
				>
					<div
						class="wbe-profile-completion__bar-fill"
						style="width: <?php echo esc_attr( $percentage ); ?>%; background: <?php echo esc_attr( $progress_color ); ?>;"
					></div>
				</div>
			</div>
		<?php endif; ?>

		<?php if ( $show_group_list && ! empty( $groups_data ) ) : ?>
			<ul class="wbe-profile-completion__group-list" aria-label="<?php esc_attr_e( 'Profile completion checklist', 'wbcom-essential' ); ?>">
				<?php foreach ( $groups_data as $group ) : ?>
					<?php
					$is_done   = ! empty( $group['is_done'] );
					$item_cls  = 'wbe-profile-completion__group-item ' . ( $is_done ? 'is-done' : 'is-todo' );
					$icon_aria = $is_done ? __( 'Completed', 'wbcom-essential' ) : __( 'Incomplete', 'wbcom-essential' );
					?>
					<li class="<?php echo esc_attr( $item_cls ); ?>">
						<span
							class="wbe-profile-completion__group-icon"
							aria-label="<?php echo esc_attr( $icon_aria ); ?>"
							style="color: <?php echo $is_done ? esc_attr( $completed_color ) : esc_attr( $incomplete_color ); ?>;"
						>
							<?php if ( $is_done ) : ?>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<circle cx="8" cy="8" r="8" fill="currentColor" fill-opacity=".15"/>
									<path d="M4.5 8.5L7 11L11.5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							<?php else : ?>
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<circle cx="8" cy="8" r="7.5" stroke="currentColor" stroke-opacity=".4"/>
								</svg>
							<?php endif; ?>
						</span>

						<a
							href="<?php echo esc_url( $group['link'] ); ?>"
							class="wbe-profile-completion__group-label"
							style="color: <?php echo esc_attr( $text_color ); ?>;"
						>
							<?php echo esc_html( $group['label'] ); ?>
						</a>

						<span class="wbe-profile-completion__group-count" style="color: <?php echo esc_attr( $incomplete_color ); ?>;">
							<?php
							echo esc_html(
								sprintf(
									/* translators: 1: completed count, 2: total count */
									__( '%1$d / %2$d', 'wbcom-essential' ),
									absint( $group['completed'] ),
									absint( $group['total'] )
								)
							);
							?>
						</span>
					</li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>

	</div>
</div>
