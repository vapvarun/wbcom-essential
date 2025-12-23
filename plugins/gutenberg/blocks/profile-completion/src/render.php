<?php
/**
 * Server-side render for Profile Completion block.
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

// Must be logged in to see profile completion.
if ( ! is_user_logged_in() ) {
	return;
}

// Check if BuddyPress is active.
$bp_active = function_exists( 'buddypress' );
if ( ! $bp_active ) {
	return;
}

// Extract attributes.
$skin_style            = $attributes['skinStyle'] ?? 'circle';
$alignment             = $attributes['alignment'] ?? 'center';
$hide_on_complete      = $attributes['hideOnComplete'] ?? false;
$show_profile_button   = $attributes['showProfileButton'] ?? true;
$show_profile_photo     = $attributes['showProfilePhoto'] ?? true;
$show_cover_photo       = $attributes['showCoverPhoto'] ?? true;
$selected_field_groups  = $attributes['selectedFieldGroups'] ?? array();
$show_header            = $attributes['showHeader'] ?? true;
$show_completion_icon  = $attributes['showCompletionIcon'] ?? true;
$show_completion_status = $attributes['showCompletionStatus'] ?? true;
$heading_text          = $attributes['headingText'] ?? __( 'Complete your profile', 'wbcom-essential' );
$completion_text       = $attributes['completionText'] ?? __( 'Complete', 'wbcom-essential' );
$complete_button_text  = $attributes['completeButtonText'] ?? __( 'Complete Profile', 'wbcom-essential' );
$edit_button_text      = $attributes['editButtonText'] ?? __( 'Edit Profile', 'wbcom-essential' );
$progress_size         = $attributes['progressSize'] ?? 100;
$progress_width        = $attributes['progressWidth'] ?? 6;
$completion_color      = $attributes['completionColor'] ?? '#1CD991';
$incomplete_color      = $attributes['incompleteColor'] ?? '#EF3E46';
$progress_border_color = $attributes['progressBorderColor'] ?? '#DEDFE2';
$number_color          = $attributes['numberColor'] ?? '#122B46';
$text_color            = $attributes['textColor'] ?? '#A3A5A9';
$details_bg_color      = $attributes['detailsBgColor'] ?? '#ffffff';
$button_color          = $attributes['buttonColor'] ?? '#939597';
$button_bg_color       = $attributes['buttonBgColor'] ?? 'transparent';
$button_border_color   = $attributes['buttonBorderColor'] ?? '#9EA8B2';

// Calculate profile completion.
$user_id = get_current_user_id();
$progress_data = wbcom_essential_calculate_profile_completion( $user_id, $show_profile_photo, $show_cover_photo, $selected_field_groups );

if ( empty( $progress_data ) ) {
	return;
}

$completion_percentage = $progress_data['percentage'];
$progress_groups = $progress_data['groups'];

// Hide widget if 100% complete and setting enabled.
if ( $hide_on_complete && 100 === $completion_percentage ) {
	return;
}

// Build inline styles.
$inline_styles = array(
	'--progress-size'   => $progress_size . 'px',
	'--progress-width'  => $progress_width . 'px',
	'--completion-color' => $completion_color,
	'--incomplete-color' => $incomplete_color,
	'--progress-border' => $progress_border_color,
	'--number-color'    => $number_color,
	'--text-color'      => $text_color,
	'--details-bg'      => $details_bg_color,
	'--button-color'    => $button_color,
	'--button-bg'       => $button_bg_color,
	'--button-border'   => $button_border_color,
	'--progress-percent' => $completion_percentage,
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Profile edit URL.
$profile_edit_url = function_exists( 'bp_loggedin_user_domain' )
	? trailingslashit( bp_loggedin_user_domain() ) . 'profile/edit/'
	: admin_url( 'profile.php' );

// Button text based on completion.
$button_text = ( 100 === $completion_percentage ) ? $edit_button_text : $complete_button_text;

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => sprintf(
			'wbcom-essential-profile-completion wbcom-profile-completion-skin-%s wbcom-profile-completion-align-%s',
			esc_attr( $skin_style ),
			esc_attr( $alignment )
		),
		'style' => $style_string,
	)
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="wbcom-profile-completion-wrapper">
		<div class="wbcom-profile-completion-figure">
			<div class="wbcom-profile-completion-progress">
				<?php if ( 'circle' === $skin_style ) : ?>
					<div class="wbcom-progress-ring">
						<div class="wbcom-progress-ring-inner"></div>
						<div class="wbcom-progress-data">
							<span class="wbcom-progress-num">
								<?php echo esc_html( $completion_percentage ); ?><span>%</span>
							</span>
							<span class="wbcom-progress-text">
								<?php echo esc_html( $completion_text ); ?>
							</span>
						</div>
					</div>
				<?php else : ?>
					<div class="wbcom-progress-linear-header">
						<h3><?php echo esc_html( $heading_text ); ?></h3>
						<span class="wbcom-toggle-icon dashicons dashicons-arrow-right-alt2"></span>
					</div>
					<div class="wbcom-progress-bar">
						<div class="wbcom-progress-bar-fill" style="width: <?php echo esc_attr( $completion_percentage ); ?>%"></div>
					</div>
					<div class="wbcom-progress-info">
						<span class="wbcom-progress-num"><?php echo esc_html( $completion_percentage ); ?>%</span>
						<span class="wbcom-progress-text"><?php echo esc_html( $completion_text ); ?></span>
					</div>
				<?php endif; ?>
			</div>

			<?php // Details dropdown. ?>
			<div class="wbcom-profile-completion-details">
				<?php if ( $show_header && 'circle' === $skin_style ) : ?>
					<div class="wbcom-details-header">
						<span class="wbcom-details-percent"><?php echo esc_html( $completion_percentage ); ?>%</span>
						<div class="wbcom-details-ring-small">
							<div class="wbcom-progress-ring-small"></div>
						</div>
						<span class="wbcom-details-label"><?php echo esc_html( $completion_text ); ?></span>
					</div>
				<?php endif; ?>

				<ul class="wbcom-profile-completion-list">
					<?php foreach ( $progress_groups as $group ) : ?>
						<li class="<?php echo $group['is_completed'] ? 'completed' : 'incomplete'; ?>">
							<?php if ( $show_completion_icon ) : ?>
								<span class="wbcom-section-icon">
									<?php if ( $group['is_completed'] ) : ?>
										<span class="dashicons dashicons-yes"></span>
									<?php else : ?>
										<span class="wbcom-section-dot"></span>
									<?php endif; ?>
								</span>
							<?php endif; ?>

							<span class="wbcom-section-name">
								<a href="<?php echo esc_url( $group['link'] ); ?>">
									<?php echo esc_html( $group['label'] ); ?>
								</a>
							</span>

							<?php if ( $show_completion_status ) : ?>
								<span class="wbcom-section-status">
									<?php echo absint( $group['completed'] ); ?>/<?php echo absint( $group['total'] ); ?>
								</span>
							<?php endif; ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>

		<?php if ( $show_profile_button ) : ?>
			<div class="wbcom-profile-completion-action">
				<a href="<?php echo esc_url( $profile_edit_url ); ?>" class="wbcom-profile-button">
					<?php echo esc_html( $button_text ); ?>
					<span class="dashicons dashicons-arrow-right-alt2"></span>
				</a>
			</div>
		<?php endif; ?>
	</div>
</div>

<?php
/**
 * Calculate profile completion percentage.
 *
 * @param int   $user_id               User ID.
 * @param bool  $include_profile       Include profile photo.
 * @param bool  $include_cover         Include cover photo.
 * @param array $selected_field_groups Array of selected xProfile group IDs.
 * @return array|null
 */
function wbcom_essential_calculate_profile_completion( $user_id, $include_profile = true, $include_cover = true, $selected_field_groups = array() ) {
	if ( ! function_exists( 'buddypress' ) ) {
		return null;
	}

	$groups = array();
	$total_fields = 0;
	$completed_fields = 0;

	$loggedin_user_domain = function_exists( 'bp_loggedin_user_domain' ) ? bp_loggedin_user_domain() : '';
	$profile_slug = function_exists( 'bp_get_profile_slug' ) ? bp_get_profile_slug() : 'profile';

	// Profile Photo.
	if ( $include_profile && ! bp_disable_avatar_uploads() ) {
		$total_fields++;
		$has_avatar = bp_get_user_has_avatar( $user_id );

		if ( $has_avatar ) {
			$completed_fields++;
		}

		$groups[] = array(
			'label'        => __( 'Profile Photo', 'wbcom-essential' ),
			'link'         => trailingslashit( $loggedin_user_domain . $profile_slug ) . 'change-avatar/',
			'is_completed' => $has_avatar,
			'total'        => 1,
			'completed'    => $has_avatar ? 1 : 0,
		);
	}

	// Cover Photo.
	if ( $include_cover && function_exists( 'bp_disable_cover_image_uploads' ) && ! bp_disable_cover_image_uploads() ) {
		$total_fields++;
		$has_cover = function_exists( 'bp_attachments_get_user_has_cover_image' )
			? bp_attachments_get_user_has_cover_image( $user_id )
			: false;

		if ( $has_cover ) {
			$completed_fields++;
		}

		$groups[] = array(
			'label'        => __( 'Cover Photo', 'wbcom-essential' ),
			'link'         => trailingslashit( $loggedin_user_domain . $profile_slug ) . 'change-cover-image/',
			'is_completed' => $has_cover,
			'total'        => 1,
			'completed'    => $has_cover ? 1 : 0,
		);
	}

	// xProfile Groups and Fields.
	if ( function_exists( 'bp_xprofile_get_groups' ) ) {
		$profile_groups = bp_xprofile_get_groups(
			array(
				'fetch_fields'     => true,
				'fetch_field_data' => true,
				'user_id'          => $user_id,
			)
		);

		if ( ! empty( $profile_groups ) ) {
			foreach ( $profile_groups as $profile_group ) {
				// Skip this group if selected_field_groups is set and this group is not in it.
				// Empty array means "all groups" for backward compatibility.
				if ( ! empty( $selected_field_groups ) && ! in_array( $profile_group->id, $selected_field_groups, false ) ) {
					continue;
				}

				if ( empty( $profile_group->fields ) ) {
					continue;
				}

				$group_total = 0;
				$group_completed = 0;

				foreach ( $profile_group->fields as $field ) {
					$group_total++;
					$field_value = isset( $field->data->value ) ? maybe_unserialize( $field->data->value ) : '';

					if ( ! empty( $field_value ) ) {
						$group_completed++;
					}
				}

				if ( $group_total > 0 ) {
					$total_fields += $group_total;
					$completed_fields += $group_completed;

					$groups[] = array(
						'label'        => $profile_group->name,
						'link'         => trailingslashit( $loggedin_user_domain . $profile_slug ) . 'edit/group/' . $profile_group->id . '/',
						'is_completed' => ( $group_total === $group_completed ),
						'total'        => $group_total,
						'completed'    => $group_completed,
					);
				}
			}
		}
	}

	if ( $total_fields === 0 ) {
		return null;
	}

	$percentage = round( ( $completed_fields / $total_fields ) * 100 );

	return array(
		'percentage' => $percentage,
		'total'      => $total_fields,
		'completed'  => $completed_fields,
		'groups'     => $groups,
	);
}
