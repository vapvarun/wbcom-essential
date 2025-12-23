<?php
/**
 * Server-side render for Members Grid block.
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

// Check if BuddyPress is active.
if ( ! function_exists( 'buddypress' ) ) {
	return;
}

// Extract attributes.
$sort_type       = $attributes['sortType'] ?? 'newest';
$total_members   = $attributes['totalMembers'] ?? 12;
$columns         = $attributes['columns'] ?? 3;
$columns_tablet  = $attributes['columnsTablet'] ?? 2;
$columns_mobile  = $attributes['columnsMobile'] ?? 1;
$gap             = $attributes['gap'] ?? 30;
$show_avatar     = $attributes['showAvatar'] ?? true;
$show_name       = $attributes['showName'] ?? true;
$show_last_active = $attributes['showLastActive'] ?? true;
$show_friend_btn = $attributes['showFriendButton'] ?? true;
$avatar_size     = $attributes['avatarSize'] ?? 126;
$card_bg_color   = $attributes['cardBgColor'] ?? '#ffffff';
$card_radius     = $attributes['cardBorderRadius'] ?? 8;
$card_padding    = $attributes['cardPadding'] ?? 20;
$card_shadow     = $attributes['cardShadow'] ?? true;
$name_color      = $attributes['nameColor'] ?? '#122B46';
$meta_color      = $attributes['metaColor'] ?? '#A3A5A9';

// Build inline styles.
$inline_styles = array(
	'--grid-columns'        => $columns,
	'--grid-columns-tablet' => $columns_tablet,
	'--grid-columns-mobile' => $columns_mobile,
	'--grid-gap'            => $gap . 'px',
	'--card-bg'             => $card_bg_color,
	'--card-radius'         => $card_radius . 'px',
	'--card-padding'        => $card_padding . 'px',
	'--avatar-size'         => $avatar_size . 'px',
	'--name-color'          => $name_color,
	'--meta-color'          => $meta_color,
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Classes.
$grid_classes = array(
	'wbcom-essential-members-grid-list',
);

if ( $card_shadow ) {
	$grid_classes[] = 'has-shadow';
}

// Avatar args.
$avatar_args = array(
	'type'   => 'full',
	'width'  => $avatar_size,
	'height' => $avatar_size,
	'class'  => 'avatar',
);

// Members query args.
$members_args = array(
	'user_id'         => 0,
	'type'            => $sort_type,
	'per_page'        => $total_members,
	'max'             => $total_members,
	'populate_extras' => true,
	'search_terms'    => false,
);

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-members-grid',
		'style' => $style_string,
	)
);
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( bp_has_members( $members_args ) ) : ?>
		<div class="<?php echo esc_attr( implode( ' ', $grid_classes ) ); ?>">
			<?php
			while ( bp_members() ) :
				bp_the_member();
				?>
				<div class="wbcom-member-grid-item">
					<div class="wbcom-member-grid-card">
						<?php if ( $show_avatar ) : ?>
							<div class="wbcom-member-grid-avatar">
								<a href="<?php bp_member_permalink(); ?>">
									<?php bp_member_avatar( $avatar_args ); ?>
								</a>
							</div>
						<?php endif; ?>

						<div class="wbcom-member-grid-content">
							<?php if ( $show_name ) : ?>
								<h4 class="wbcom-member-grid-name">
									<a href="<?php bp_member_permalink(); ?>">
										<?php bp_member_name(); ?>
									</a>
								</h4>
							<?php endif; ?>

							<?php if ( $show_last_active ) : ?>
								<p class="wbcom-member-grid-meta">
									<?php bp_member_last_active(); ?>
								</p>
							<?php endif; ?>

							<?php if ( $show_friend_btn && bp_is_active( 'friends' ) && is_user_logged_in() ) : ?>
								<div class="wbcom-member-grid-action">
									<?php bp_add_friend_button( bp_get_member_user_id() ); ?>
								</div>
							<?php endif; ?>
						</div>
					</div>
				</div>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<div class="wbcom-essential-no-data">
			<p><?php esc_html_e( 'Sorry, no members were found.', 'wbcom-essential' ); ?></p>
		</div>
	<?php endif; ?>
</div>
