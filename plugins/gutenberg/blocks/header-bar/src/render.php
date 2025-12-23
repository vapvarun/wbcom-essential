<?php
/**
 * Server-side render for Header Bar block.
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
$alignment            = $attributes['alignment'] ?? 'right';
$show_profile         = $attributes['showProfileDropdown'] ?? true;
$profile_menu         = $attributes['profileMenu'] ?? '';
$show_separator       = $attributes['showSeparator'] ?? true;
$show_search          = $attributes['showSearch'] ?? true;
$show_messages        = $attributes['showMessages'] ?? true;
$show_notifications   = $attributes['showNotifications'] ?? true;
$show_cart            = $attributes['showCart'] ?? true;
$space_between        = $attributes['spaceBetween'] ?? 10;
$icon_size            = $attributes['iconSize'] ?? 21;
$avatar_size          = $attributes['avatarSize'] ?? 36;
$avatar_border_radius = $attributes['avatarBorderRadius'] ?? 50;
$separator_color      = $attributes['separatorColor'] ?? 'rgba(0,0,0,0.1)';
$icon_color           = $attributes['iconColor'] ?? '#303030';
$counter_bg_color     = $attributes['counterBgColor'] ?? '#1D76DA';
$dropdown_bg_color    = $attributes['dropdownBgColor'] ?? '#ffffff';
$dropdown_text_color  = $attributes['dropdownTextColor'] ?? '#303030';
$user_name_color      = $attributes['userNameColor'] ?? '#303030';
$sign_in_color        = $attributes['signInColor'] ?? '';
$sign_up_bg_color     = $attributes['signUpBgColor'] ?? '';
$sign_up_text_color   = $attributes['signUpTextColor'] ?? '';

// BuddyPress checks.
$bp_active           = function_exists( 'buddypress' );
$messages_active     = $bp_active && function_exists( 'bp_is_active' ) && bp_is_active( 'messages' );
$notifications_active = $bp_active && function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' );
$wc_active           = class_exists( 'WooCommerce' );

// Build inline styles.
$inline_styles = array(
	'--space-between'   => $space_between . 'px',
	'--icon-size'       => $icon_size . 'px',
	'--avatar-size'     => $avatar_size . 'px',
	'--avatar-radius'   => $avatar_border_radius . '%',
	'--separator-color' => $separator_color,
	'--icon-color'      => $icon_color,
	'--counter-bg'      => $counter_bg_color,
	'--dropdown-bg'     => $dropdown_bg_color,
	'--dropdown-text'   => $dropdown_text_color,
	'--user-name-color' => $user_name_color,
);

if ( $sign_in_color ) {
	$inline_styles['--sign-in-color'] = $sign_in_color;
}
if ( $sign_up_bg_color ) {
	$inline_styles['--sign-up-bg'] = $sign_up_bg_color;
}
if ( $sign_up_text_color ) {
	$inline_styles['--sign-up-text'] = $sign_up_text_color;
}

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-header-bar wbcom-header-bar-align-' . esc_attr( $alignment ),
		'style' => $style_string,
	)
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="wbcom-header-bar-inner">
		<?php if ( is_user_logged_in() ) : ?>
			<?php if ( $show_profile ) : ?>
				<?php
				$current_user = wp_get_current_user();

				// Get user profile link.
				if ( $bp_active && function_exists( 'bp_members_get_user_url' ) ) {
					$user_link = bp_members_get_user_url( $current_user->ID );
				} elseif ( $bp_active && function_exists( 'bp_core_get_user_domain' ) ) {
					$user_link = bp_core_get_user_domain( $current_user->ID );
				} else {
					$user_link = get_author_posts_url( $current_user->ID );
				}

				// Get display name.
				$display_name = $bp_active && function_exists( 'bp_core_get_user_displayname' )
					? bp_core_get_user_displayname( $current_user->ID )
					: $current_user->display_name;
				?>
				<div class="wbcom-header-bar-profile wbcom-header-bar-dropdown">
					<a class="wbcom-profile-link" href="<?php echo esc_url( $user_link ); ?>">
						<span class="wbcom-profile-name"><?php echo esc_html( $display_name ); ?></span>
						<span class="wbcom-profile-arrow dashicons dashicons-arrow-down-alt2"></span>
						<?php echo get_avatar( $current_user->ID, $avatar_size * 2, '', $display_name ); ?>
					</a>

					<div class="wbcom-header-bar-dropdown-content wbcom-profile-dropdown">
						<div class="wbcom-dropdown-inner">
							<?php
							if ( $bp_active && ! empty( $profile_menu ) ) {
								wp_nav_menu(
									array(
										'menu'       => $profile_menu,
										'menu_id'    => 'wbcom-header-profile-menu',
										'container'  => false,
										'menu_class' => 'wbcom-profile-menu',
										'fallback_cb' => '__return_false',
									)
								);
							} else {
								// Default menu items.
								?>
								<ul class="wbcom-profile-menu">
									<?php if ( $bp_active ) : ?>
										<li><a href="<?php echo esc_url( $user_link ); ?>"><?php esc_html_e( 'Profile', 'wbcom-essential' ); ?></a></li>
										<li><a href="<?php echo esc_url( trailingslashit( $user_link ) . 'settings/' ); ?>"><?php esc_html_e( 'Settings', 'wbcom-essential' ); ?></a></li>
									<?php else : ?>
										<li><a href="<?php echo esc_url( admin_url( 'profile.php' ) ); ?>"><?php esc_html_e( 'Profile', 'wbcom-essential' ); ?></a></li>
									<?php endif; ?>
									<li><a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>"><?php esc_html_e( 'Log Out', 'wbcom-essential' ); ?></a></li>
								</ul>
								<?php
							}
							?>
						</div>
					</div>
				</div>
			<?php endif; ?>

			<?php if ( $show_separator && $show_profile ) : ?>
				<span class="wbcom-header-bar-separator"></span>
			<?php endif; ?>

			<?php if ( $show_search ) : ?>
				<a href="#" class="wbcom-header-bar-search wbcom-header-bar-icon" title="<?php esc_attr_e( 'Search', 'wbcom-essential' ); ?>">
					<span class="dashicons dashicons-search"></span>
				</a>
			<?php endif; ?>

			<?php if ( $show_messages && $messages_active ) : ?>
				<?php
				$unread_count = function_exists( 'bp_get_total_unread_messages_count' ) ? bp_get_total_unread_messages_count() : 0;
				$messages_url = $bp_active && function_exists( 'bp_loggedin_user_domain' ) ? trailingslashit( bp_loggedin_user_domain() ) . 'messages/' : '#';
				?>
				<div class="wbcom-header-bar-messages wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $messages_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Messages', 'wbcom-essential' ); ?>">
						<span class="dashicons dashicons-email"></span>
						<?php if ( $unread_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $unread_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $show_notifications && $notifications_active ) : ?>
				<?php
				$notification_count = function_exists( 'bp_notifications_get_unread_notification_count' ) ? bp_notifications_get_unread_notification_count( bp_loggedin_user_id() ) : 0;
				$notifications_url  = $bp_active && function_exists( 'bp_loggedin_user_domain' ) ? trailingslashit( bp_loggedin_user_domain() ) . 'notifications/' : '#';
				?>
				<div class="wbcom-header-bar-notifications wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $notifications_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Notifications', 'wbcom-essential' ); ?>">
						<span class="dashicons dashicons-bell"></span>
						<?php if ( $notification_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $notification_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $show_cart && $wc_active ) : ?>
				<?php
				$cart_count = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
				$cart_url   = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '#';
				?>
				<div class="wbcom-header-bar-cart wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Cart', 'wbcom-essential' ); ?>">
						<span class="dashicons dashicons-cart"></span>
						<?php if ( $cart_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $cart_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

		<?php else : ?>
			<?php // Logged out state. ?>
			<?php if ( $show_search ) : ?>
				<a href="#" class="wbcom-header-bar-search wbcom-header-bar-icon" title="<?php esc_attr_e( 'Search', 'wbcom-essential' ); ?>">
					<span class="dashicons dashicons-search"></span>
				</a>
			<?php endif; ?>

			<?php if ( $show_cart && $wc_active ) : ?>
				<?php
				$cart_count = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
				$cart_url   = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '#';
				?>
				<div class="wbcom-header-bar-cart wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Cart', 'wbcom-essential' ); ?>">
						<span class="dashicons dashicons-cart"></span>
						<?php if ( $cart_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $cart_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<span class="wbcom-header-bar-separator"></span>

			<div class="wbcom-header-bar-auth">
				<a href="<?php echo esc_url( wp_login_url() ); ?>" class="wbcom-header-bar-signin">
					<?php esc_html_e( 'Sign in', 'wbcom-essential' ); ?>
				</a>

				<?php if ( get_option( 'users_can_register' ) ) : ?>
					<a href="<?php echo esc_url( wp_registration_url() ); ?>" class="wbcom-header-bar-signup">
						<?php esc_html_e( 'Sign up', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
			</div>
		<?php endif; ?>
	</div>

	<?php // Search overlay. ?>
	<div class="wbcom-header-bar-search-overlay">
		<div class="wbcom-search-container">
			<?php get_search_form(); ?>
			<a href="#" class="wbcom-search-close">
				<span class="dashicons dashicons-no-alt"></span>
			</a>
		</div>
	</div>
</div>
