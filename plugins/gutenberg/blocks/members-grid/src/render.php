<?php
/**
 * Server-side render for Members Grid block.
 *
 * Two modes:
 *  - Editor (REST_REQUEST): Full SSR via BP template tags for live preview.
 *  - Frontend: Outputs a container div hydrated by view.js via BP REST API.
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
	echo '<p>' . esc_html__( 'BuddyPress is required for this block.', 'wbcom-essential' ) . '</p>';
	return;
}

// ── Extract attributes ────────────────────────────────────────────────────────
$use_theme_colors = isset( $attributes['useThemeColors'] ) ? $attributes['useThemeColors'] : false;
$sort_type        = $attributes['sortType'] ?? 'newest';
$total_members    = $attributes['totalMembers'] ?? 12;
$columns          = $attributes['columns'] ?? 3;
$columns_tablet   = $attributes['columnsTablet'] ?? 2;
$columns_mobile   = $attributes['columnsMobile'] ?? 1;
$gap              = $attributes['gap'] ?? 30;
$show_avatar      = $attributes['showAvatar'] ?? true;
$show_name        = $attributes['showName'] ?? true;
$show_last_active = $attributes['showLastActive'] ?? true;
$show_friend_btn  = $attributes['showFriendButton'] ?? true;
$avatar_size      = $attributes['avatarSize'] ?? 126;
$card_bg_color    = $attributes['cardBgColor'] ?? '#ffffff';
$card_radius      = $attributes['cardBorderRadius'] ?? 8;
$card_padding     = $attributes['cardPadding'] ?? 20;
$card_shadow      = $attributes['cardShadow'] ?? true;
$name_color       = $attributes['nameColor'] ?? '#122B46';
$meta_color       = $attributes['metaColor'] ?? '#A3A5A9';
$button_color     = $attributes['buttonColor'] ?? '#3182ce';
$button_text      = $attributes['buttonTextColor'] ?? '#ffffff';

// ── Build unique ID for each block instance ───────────────────────────────────
$unique_id = 'wbcom-members-grid-' . wp_unique_id();

// ── Build inline styles ───────────────────────────────────────────────────────
$inline_styles = array(
	'--wbcom-grid-columns'        => $columns,
	'--wbcom-grid-columns-tablet' => $columns_tablet,
	'--wbcom-grid-columns-mobile' => $columns_mobile,
	'--wbcom-grid-gap'            => $gap . 'px',
	'--wbcom-card-radius'         => $card_radius . 'px',
	'--wbcom-card-padding'        => $card_padding . 'px',
	'--wbcom-avatar-size'         => $avatar_size . 'px',
);

if ( ! $use_theme_colors ) {
	$inline_styles['--wbcom-card-bg']      = $card_bg_color;
	$inline_styles['--wbcom-name-color']   = $name_color;
	$inline_styles['--wbcom-meta-color']   = $meta_color;
	$inline_styles['--wbcom-button-color'] = $button_color;
	$inline_styles['--wbcom-button-text']  = $button_text;
}

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// ── Classes ───────────────────────────────────────────────────────────────────
$grid_classes = array( 'wbcom-essential-members-grid-list' );
if ( $card_shadow ) {
	$grid_classes[] = 'has-shadow';
}

$wrapper_classes = array( 'wbcom-essential-members-grid' );
if ( $use_theme_colors ) {
	$wrapper_classes[] = 'use-theme-colors';
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => implode( ' ', $wrapper_classes ),
		'id'    => $unique_id,
		'style' => $style_string,
	)
);

// ── Detect context ────────────────────────────────────────────────────────────
$is_editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

	<?php if ( $is_editor ) : ?>
		<?php
		// ── Editor: static SSR preview using BP template tags ────────────────────
		$members_args = array(
			'user_id'         => 0,
			'type'            => $sort_type,
			'per_page'        => $total_members,
			'max'             => $total_members,
			'populate_extras' => true,
			'search_terms'    => false,
		);

		$avatar_args = array(
			'type'   => 'full',
			'width'  => $avatar_size,
			'height' => $avatar_size,
			'class'  => 'avatar',
		);
		?>
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

	<?php else : ?>
		<?php
		// ── Frontend: JS-hydrated container via BP REST API ───────────────────────
		$config = array(
			'restUrl'          => rest_url( 'buddypress/v1/members' ),
			'restNonce'        => wp_create_nonce( 'wp_rest' ),
			'perPage'          => $total_members,
			'sortType'         => $sort_type,
			'showAvatar'       => $show_avatar,
			'showName'         => $show_name,
			'showLastActive'   => $show_last_active,
			'showFriendButton' => $show_friend_btn && bp_is_active( 'friends' ),
			'avatarSize'       => $avatar_size,
			'useThemeColors'   => $use_theme_colors,
			'gridClasses'      => implode( ' ', $grid_classes ),
			'loggedIn'         => is_user_logged_in(),
			'colors'           => array(
				'cardBg'      => $use_theme_colors ? '' : $card_bg_color,
				'nameColor'   => $use_theme_colors ? '' : $name_color,
				'metaColor'   => $use_theme_colors ? '' : $meta_color,
				'buttonColor' => $use_theme_colors ? '' : $button_color,
				'buttonText'  => $use_theme_colors ? '' : $button_text,
			),
			'i18n'             => array(
				'loading'    => __( 'Loading members...', 'wbcom-essential' ),
				'empty'      => __( 'Sorry, no members were found.', 'wbcom-essential' ),
				'addFriend'  => __( 'Add Friend', 'wbcom-essential' ),
				'friends'    => __( 'Friends', 'wbcom-essential' ),
				'pending'    => __( 'Pending', 'wbcom-essential' ),
			),
		);
		?>
		<div class="<?php echo esc_attr( implode( ' ', $grid_classes ) ); ?>"
			data-wbe-mg-config="<?php echo esc_attr( wp_json_encode( $config ) ); ?>">
			<p class="wbcom-essential-loading"><?php esc_html_e( 'Loading members...', 'wbcom-essential' ); ?></p>
		</div>

	<?php endif; ?>
</div>
