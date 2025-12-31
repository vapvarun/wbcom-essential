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

// Check if BuddyPress is active and user is logged in.
if ( ! function_exists( 'buddypress' ) || ! is_user_logged_in() ) {
	return;
}

// Extract attributes.
$skin_style           = $attributes['skinStyle'] ?? 'circle';
$alignment            = $attributes['alignment'] ?? 'right';
$profile_photo        = $attributes['profilePhoto'] ?? true;
$cover_photo          = $attributes['coverPhoto'] ?? true;
$profile_groups_attr  = $attributes['profileGroups'] ?? array();
$hide_widget          = $attributes['hideWidget'] ?? false;
$show_profile_btn     = $attributes['showProfileBtn'] ?? true;
$heading_text         = $attributes['headingText'] ?? __( 'Complete your profile', 'wbcom-essential' );
$completion_text      = $attributes['completionText'] ?? __( 'Complete', 'wbcom-essential' );
$completion_btn_text  = $attributes['completionButtonText'] ?? __( 'Complete Profile', 'wbcom-essential' );
$edit_btn_text        = $attributes['editButtonText'] ?? __( 'Edit Profile', 'wbcom-essential' );
$show_heading         = $attributes['showHeading'] ?? true;
$show_completion_icon = $attributes['showCompletionIcon'] ?? true;
$show_completion_status = $attributes['showCompletionStatus'] ?? true;

// Get selected profile groups.
$selected_groups = array();
if ( ! empty( $profile_groups_attr ) && is_array( $profile_groups_attr ) ) {
	foreach ( $profile_groups_attr as $group_id => $enabled ) {
		if ( $enabled ) {
			$selected_groups[] = $group_id;
		}
	}
}

// Build photo types array.
$profile_phototype_selected = array();
if ( $profile_photo && ! bp_disable_avatar_uploads() ) {
	$profile_phototype_selected[] = 'profile_photo';
}
if ( $cover_photo && ! bp_disable_cover_image_uploads() ) {
	$profile_phototype_selected[] = 'cover_photo';
}

// If nothing selected, return.
if ( empty( $selected_groups ) && empty( $profile_phototype_selected ) ) {
	return;
}

// Calculate profile completion.
$user_id = get_current_user_id();
$profile_percent = wbcom_essential_calculate_profile_completion( $user_id, $selected_groups, $profile_phototype_selected );

if ( empty( $profile_percent ) ) {
	return;
}

$completion_percentage = $profile_percent['completion_percentage'];

// Hide widget if completion is 100% and hideWidget is enabled.
if ( $hide_widget && 100 === $completion_percentage ) {
	echo '<div class="profile_bit_wrapper profile_bit_wrapper--blank"></div>';
	return;
}

// Get wrapper attributes.
$wrapper_classes = array(
	'wbcom-essential-profile-completion',
	'profile_bit_wrapper',
	$show_profile_btn ? 'has-profile-button' : '',
	'wbcom-essential-align-' . $alignment,
);

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => implode( ' ', array_filter( $wrapper_classes ) ),
) );

?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="profile_bit_figure">
		<div class="profile_bit skin-<?php echo esc_attr( $skin_style ); ?> border-<?php echo esc_attr( $attributes['boxBorderStyle'] ?? 'solid' ); ?>">
			<div class="progress_container">
				<div class="progress_bit">
					<div class="progress_bit_graph">
						<div class="progress-bit__ring <?php echo 100 === $completion_percentage ? 'wbcom-essential-completed' : 'wbcom-essential-not-completed'; ?>" data-percentage="<?php echo esc_attr( $completion_percentage ); ?>">
							<span class="progress-bit__left"><span class="progress-bit__disc"></span></span>
							<span class="progress-bit__right"><span class="progress-bit__disc"></span></span>
						</div>
					</div>
					<div class="progress_bit_linear">
						<div class="progress_bit__heading">
							<h3><?php echo esc_html( $heading_text ); ?></h3>
							<i class="eicon-chevron-right"></i>
						</div>
						<div class="progress_bit__line <?php echo 100 === $completion_percentage ? 'wbcom-essential-completed' : 'wbcom-essential-not-completed'; ?>">
							<div class="progress_bit__scale" style="width: <?php echo esc_attr( $completion_percentage ); ?>%"></div>
						</div>
					</div>
					<div class="progress_bit__data">
						<span class="progress_bit__data-num"><?php echo esc_html( $completion_percentage ); ?><span>%</span></span>
						<span class="progress_bit__data-remark"><?php echo esc_html( $completion_text ); ?></span>
					</div>
				</div>
				<?php if ( $show_profile_btn && 'linear' === $skin_style ) : ?>
					<div class="profile_bit_action">
						<a class="profile_bit_action__link" href="<?php echo esc_url( bp_loggedin_user_domain() . 'profile/edit/' ); ?>">
							<?php echo esc_html( 100 === $completion_percentage ? $edit_btn_text : $completion_btn_text ); ?>
							<i class="eicon-chevron-right"></i>
						</a>
					</div>
				<?php endif; ?>
			</div>
			<div class="profile_bit__details">
				<?php if ( $show_heading ) : ?>
					<div class="profile_bit__heading">
						<span class="progress-num"><?php echo esc_html( $completion_percentage ); ?><span>%</span></span>
						<span class="progress-figure">
							<div class="progress_bit_graph progress_bit_graph--sm">
								<div class="progress-bit__ring <?php echo 100 === $completion_percentage ? 'wbcom-essential-completed' : 'wbcom-essential-not-completed'; ?>" data-percentage="<?php echo esc_attr( $completion_percentage ); ?>">
									<span class="progress-bit__left"><span class="progress-bit__disc"></span></span>
									<span class="progress-bit__right"><span class="progress-bit__disc"></span></span>
								</div>
							</div>
						</span>
						<span class="progress-label"><?php echo esc_html( $completion_text ); ?></span>
					</div>
				<?php endif; ?>
				<ul class="profile_bit__list">
					<?php
					foreach ( $profile_percent['groups'] as $single_section_details ) :
						$user_progress_status = ( 0 === $single_section_details['completed'] && $single_section_details['total'] > 0 ) ? 'progress_not_started' : '';
						?>
						<li class="single_section_wrap <?php echo $single_section_details['is_group_completed'] ? 'completed' : 'incomplete'; ?> <?php echo esc_attr( $user_progress_status ); ?>">
							<?php if ( $show_completion_icon ) : ?>
								<span class="section_number"></span>
							<?php endif; ?>
							<span class="section_name">
								<a href="<?php echo esc_url( $single_section_details['link'] ); ?>" class="group_link"><?php echo esc_html( $single_section_details['label'] ); ?></a>
							</span>
							<?php if ( $show_completion_status ) : ?>
								<span class="progress">
									<span class="completed_staus">
										<span class="completed_steps"><?php echo absint( $single_section_details['completed'] ); ?></span>/<span class="total_steps"><?php echo absint( $single_section_details['total'] ); ?></span>
									</span>
								</span>
							<?php endif; ?>
						</li>
					<?php endforeach; ?>
				</ul>
			</div>
		</div>
		<?php if ( $show_profile_btn && 'circle' === $skin_style ) : ?>
			<div class="profile_bit_action">
				<a class="profile_bit_action__link" href="<?php echo esc_url( bp_loggedin_user_domain() . 'profile/edit/' ); ?>">
					<?php echo esc_html( 100 === $completion_percentage ? $edit_btn_text : $completion_btn_text ); ?>
					<i class="eicon-chevron-right"></i>
				</a>
			</div>
		<?php endif; ?>
	</div>
</div>
<?php

/**
 * Calculate profile completion percentage.
 *
 * @param int   $user_id       User ID.
 * @param array $selected_groups Selected profile groups.
 * @param array $photo_types   Photo types to check.
 * @return array Profile completion data.
 */
function wbcom_essential_calculate_profile_completion( $user_id, $selected_groups, $photo_types ) {
	$progress_details       = array();
	$grand_total_fields     = 0;
	$grand_completed_fields = 0;

	// Profile Photo.
	if ( in_array( 'profile_photo', $photo_types, true ) ) {
		++$grand_total_fields;

		remove_filter( 'bp_core_avatar_default', 'reign_alter_bp_core_avatar_default', 10 );
		remove_filter( 'bp_core_default_avatar_user', 'reign_alter_bp_core_default_avatar_user', 10 );

		$is_profile_photo_uploaded = bp_get_user_has_avatar( $user_id ) ? 1 : 0;

		if ( $is_profile_photo_uploaded ) {
			++$grand_completed_fields;
		}

		$progress_details['photo_type']['profile_photo'] = array(
			'is_uploaded' => $is_profile_photo_uploaded,
			'name'        => __( 'Profile Photo', 'wbcom-essential' ),
		);
	}

	// Cover Photo.
	if ( in_array( 'cover_photo', $photo_types, true ) ) {
		++$grand_total_fields;

		$is_cover_photo_uploaded = bp_attachments_get_user_has_cover_image( $user_id ) ? 1 : 0;

		if ( $is_cover_photo_uploaded ) {
			++$grand_completed_fields;
		}

		$progress_details['photo_type']['cover_photo'] = array(
			'is_uploaded' => $is_cover_photo_uploaded,
			'name'        => __( 'Cover Photo', 'wbcom-essential' ),
		);
	}

	// Groups Fields.
	$total_fields     = 0;
	$completed_fields = 0;

	if ( function_exists( 'bp_xprofile_get_groups' ) ) {
		$profile_groups = bp_xprofile_get_groups(
			array(
				'fetch_fields'     => true,
				'fetch_field_data' => true,
				'user_id'          => $user_id,
			)
		);

		if ( ! empty( $profile_groups ) ) {
			foreach ( $profile_groups as $single_group_details ) {
				if ( empty( $single_group_details->fields ) ) {
					continue;
				}

				$group_id = $single_group_details->id;

				// Skip if not in selected groups.
				if ( ! in_array( (string) $group_id, $selected_groups, true ) && ! in_array( $group_id, $selected_groups, true ) ) {
					continue;
				}

				// Check if repeater group.
				$is_group_repeater_str = bp_xprofile_get_meta( $group_id, 'group', 'is_repeater_enabled', true );
				$is_group_repeater     = ( 'on' === $is_group_repeater_str ) ? true : false;

				$group_total_fields     = 0;
				$group_completed_fields = 0;

				foreach ( $single_group_details->fields as $group_single_field ) {
					// If repeater, only count first set.
					if ( $is_group_repeater ) {
						$field_id     = $group_single_field->id;
						$clone_number = bp_xprofile_get_meta( $field_id, 'field', '_clone_number', true );
						if ( $clone_number > 1 ) {
							continue;
						}
					}

					$field_data_value = maybe_unserialize( $group_single_field->data->value ?? '' );

					if ( ! empty( $field_data_value ) ) {
						++$group_completed_fields;
					}

					++$group_total_fields;
				}

				$grand_total_fields     += $group_total_fields;
				$grand_completed_fields += $group_completed_fields;
				$total_fields           += $group_total_fields;
				$completed_fields       += $group_completed_fields;
			}
		}
	}

	$progress_details['groups'][] = array(
		'group_name'             => __( 'Profile Fields', 'wbcom-essential' ),
		'group_total_fields'     => $total_fields,
		'group_completed_fields' => $completed_fields,
	);

	$progress_details['total_fields']     = $grand_total_fields;
	$progress_details['completed_fields'] = $grand_completed_fields;

	return wbcom_essential_format_profile_progress( $progress_details );
}

/**
 * Format profile progress data.
 *
 * @param array $user_progress_arr Raw progress data.
 * @return array Formatted progress data.
 */
function wbcom_essential_format_profile_progress( $user_progress_arr ) {
	$loggedin_user_domain = bp_loggedin_user_domain();
	$profile_slug         = bp_get_profile_slug();

	if ( $user_progress_arr['total_fields'] > 0 ) {
		$profile_completion_percentage = round( ( $user_progress_arr['completed_fields'] * 100 ) / $user_progress_arr['total_fields'] );
		$user_prgress_formatted        = array(
			'completion_percentage' => $profile_completion_percentage,
		);
	}

	$listing_number = 1;
	foreach ( $user_progress_arr['groups'] as $group_id => $group_details ) {
		$group_link = trailingslashit( $loggedin_user_domain . $profile_slug . '/edit/group/' . $group_id );

		$user_prgress_formatted['groups'][] = array(
			'number'             => $listing_number,
			'label'              => $group_details['group_name'],
			'link'               => $group_link,
			'is_group_completed' => ( $group_details['group_total_fields'] === $group_details['group_completed_fields'] ) ? true : false,
			'total'              => $group_details['group_total_fields'],
			'completed'          => $group_details['group_completed_fields'],
		);

		++$listing_number;
	}

	// Profile Photo.
	if ( isset( $user_progress_arr['photo_type']['profile_photo'] ) ) {
		$change_avatar_link  = trailingslashit( $loggedin_user_domain . $profile_slug . '/change-avatar' );
		$is_profile_uploaded = ( 1 === $user_progress_arr['photo_type']['profile_photo']['is_uploaded'] );

		$user_prgress_formatted['groups'][] = array(
			'number'             => $listing_number,
			'label'              => $user_progress_arr['photo_type']['profile_photo']['name'],
			'link'               => $change_avatar_link,
			'is_group_completed' => ( $is_profile_uploaded ) ? true : false,
			'total'              => 1,
			'completed'          => ( $is_profile_uploaded ) ? 1 : 0,
		);

		++$listing_number;
	}

	// Cover Photo.
	if ( isset( $user_progress_arr['photo_type']['cover_photo'] ) ) {
		$change_cover_link = trailingslashit( $loggedin_user_domain . $profile_slug . '/change-cover-image' );
		$is_cover_uploaded = ( 1 === $user_progress_arr['photo_type']['cover_photo']['is_uploaded'] );

		$user_prgress_formatted['groups'][] = array(
			'number'             => $listing_number,
			'label'              => $user_progress_arr['photo_type']['cover_photo']['name'],
			'link'               => $change_cover_link,
			'is_group_completed' => ( $is_cover_uploaded ) ? true : false,
			'total'              => 1,
			'completed'          => ( $is_cover_uploaded ) ? 1 : 0,
		);

		++$listing_number;
	}

	return $user_prgress_formatted;
}
