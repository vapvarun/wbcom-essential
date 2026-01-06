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
