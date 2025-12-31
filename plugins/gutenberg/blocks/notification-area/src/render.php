<?php
/**
 * Server-side render for Notification Area block.
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

// Extract responsive visibility attributes.
$show_search_desktop        = $attributes['showSearchDesktop'] ?? true;
$show_search_tablet         = $attributes['showSearchTablet'] ?? true;
$show_search_mobile         = $attributes['showSearchMobile'] ?? true;
$show_cart_desktop          = $attributes['showCartDesktop'] ?? true;
$show_cart_tablet           = $attributes['showCartTablet'] ?? true;
$show_cart_mobile           = $attributes['showCartMobile'] ?? true;
$show_messages_desktop      = $attributes['showMessagesDesktop'] ?? true;
$show_messages_tablet       = $attributes['showMessagesTablet'] ?? true;
$show_messages_mobile       = $attributes['showMessagesMobile'] ?? true;
$show_notifications_desktop = $attributes['showNotificationsDesktop'] ?? true;
$show_notifications_tablet  = $attributes['showNotificationsTablet'] ?? true;
$show_notifications_mobile  = $attributes['showNotificationsMobile'] ?? true;
$show_avatar_desktop        = $attributes['showAvatarDesktop'] ?? true;
$show_avatar_tablet         = $attributes['showAvatarTablet'] ?? true;
$show_avatar_mobile         = $attributes['showAvatarMobile'] ?? true;
$show_user_name             = $attributes['showUserName'] ?? true;

// Extract style attributes.
$icon_color              = $attributes['iconColor'] ?? '#122B46';
$icon_hover_color        = $attributes['iconHoverColor'] ?? '#007CFF';
$user_name_color         = $attributes['userNameColor'] ?? '#122B46';
$user_name_hover_color   = $attributes['userNameHoverColor'] ?? '#007CFF';
$badge_color             = $attributes['badgeColor'] ?? '#EF3E46';
$badge_text_color        = $attributes['badgeTextColor'] ?? '#ffffff';
$dropdown_bg_color       = $attributes['dropdownBgColor'] ?? '#ffffff';
$dropdown_border_color   = $attributes['dropdownBorderColor'] ?? '#e3e3e3';
$dropdown_link_color     = $attributes['dropdownLinkColor'] ?? '#122B46';
$dropdown_link_hover     = $attributes['dropdownLinkHoverColor'] ?? '#007CFF';
$dropdown_link_hover_bg  = $attributes['dropdownLinkHoverBg'] ?? '#f5f5f5';
$icon_size               = $attributes['iconSize'] ?? 20;
$avatar_size             = $attributes['avatarSize'] ?? 36;
$item_gap                = $attributes['itemGap'] ?? 16;
$line_height             = $attributes['lineHeight'] ?? 90;
$counter_top_space       = $attributes['counterTopSpace'] ?? 20;

// Build inline styles.
$inline_styles = array(
	'--icon-size'                 => $icon_size . 'px',
	'--avatar-size'               => $avatar_size . 'px',
	'--item-gap'                  => $item_gap . 'px',
	'--line-height'               => $line_height . 'px',
	'--counter-top'               => $counter_top_space . 'px',
	'--icon-color'                => $icon_color,
	'--icon-hover-color'          => $icon_hover_color,
	'--username-color'            => $user_name_color,
	'--username-hover-color'      => $user_name_hover_color,
	'--badge-color'               => $badge_color,
	'--badge-text-color'          => $badge_text_color,
	'--dropdown-bg-color'         => $dropdown_bg_color,
	'--dropdown-border-color'     => $dropdown_border_color,
	'--dropdown-link-color'       => $dropdown_link_color,
	'--dropdown-link-hover-color' => $dropdown_link_hover,
	'--dropdown-link-hover-bg'    => $dropdown_link_hover_bg,
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'wbcom-essential-notification-area-wrapper',
		'style' => $style_string,
	)
);

// Check plugin availability.
$has_woocommerce         = class_exists( 'WooCommerce' );
$has_buddypress          = function_exists( 'buddypress' );
$bp_messages_active      = $has_buddypress && function_exists( 'bp_is_active' ) && bp_is_active( 'messages' );
$bp_notifications_active = $has_buddypress && function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' );

// Get current user data.
$is_logged_in = is_user_logged_in();
$current_user = $is_logged_in ? wp_get_current_user() : null;

/**
 * Helper function to build responsive visibility classes.
 *
 * @param bool $desktop Show on desktop.
 * @param bool $tablet  Show on tablet.
 * @param bool $mobile  Show on mobile.
 * @return string CSS classes.
 */
if ( ! function_exists( 'wbcom_na_visibility_classes' ) ) {
	/**
	 * Build responsive visibility classes.
	 *
	 * @param bool $desktop Show on desktop.
	 * @param bool $tablet  Show on tablet.
	 * @param bool $mobile  Show on mobile.
	 * @return string CSS classes.
	 */
	function wbcom_na_visibility_classes( $desktop, $tablet, $mobile ) {
		$classes = array();

		if ( ! $desktop ) {
			$classes[] = 'wbcom-na-hide-desktop';
		}
		if ( ! $tablet ) {
			$classes[] = 'wbcom-na-hide-tablet';
		}
		if ( ! $mobile ) {
			$classes[] = 'wbcom-na-hide-mobile';
		}

		return implode( ' ', $classes );
	}
}

// SVG Icons.
$search_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>';

$cart_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>';

$message_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>';

$bell_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>';

$close_icon = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';

$login_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/></svg>';

$register_icon = '<svg viewBox="0 0 24 24" width="' . esc_attr( $icon_size ) . '" height="' . esc_attr( $icon_size ) . '" fill="currentColor"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';

// Check if any item is visible (at least on one device).
$any_search_visible = $show_search_desktop || $show_search_tablet || $show_search_mobile;
$any_cart_visible   = ( $show_cart_desktop || $show_cart_tablet || $show_cart_mobile ) && $has_woocommerce;
$any_messages_visible = ( $show_messages_desktop || $show_messages_tablet || $show_messages_mobile ) && $bp_messages_active && $is_logged_in;
$any_notifications_visible = ( $show_notifications_desktop || $show_notifications_tablet || $show_notifications_mobile ) && $bp_notifications_active && $is_logged_in;
$any_avatar_visible = $show_avatar_desktop || $show_avatar_tablet || $show_avatar_mobile;
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div class="wbcom-essential-notification-area">
		<?php
		// Search form.
		if ( $any_search_visible ) :
			$search_classes = wbcom_na_visibility_classes( $show_search_desktop, $show_search_tablet, $show_search_mobile );
			?>
			<div class="wbcom-essential-na__item wbcom-essential-na__search <?php echo esc_attr( $search_classes ); ?>">
				<a href="#" class="wbcom-essential-na__search-toggle" aria-label="<?php esc_attr_e( 'Toggle search', 'wbcom-essential' ); ?>">
					<?php echo $search_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
				<div class="wbcom-essential-na__search-form">
					<a href="#" class="wbcom-essential-na__search-close" aria-label="<?php esc_attr_e( 'Close search', 'wbcom-essential' ); ?>">
						<?php echo $close_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</a>
					<?php get_search_form(); ?>
				</div>
			</div>
			<?php
		endif;

		// WooCommerce cart.
		if ( $any_cart_visible ) :
			$cart_classes = wbcom_na_visibility_classes( $show_cart_desktop, $show_cart_tablet, $show_cart_mobile );
			$cart_count   = WC()->cart ? WC()->cart->get_cart_contents_count() : 0;
			$cart_url     = wc_get_cart_url();
			?>
			<div class="wbcom-essential-na__item wbcom-essential-na__cart <?php echo esc_attr( $cart_classes ); ?>">
				<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-essential-na__cart-toggle" aria-label="<?php esc_attr_e( 'Shopping cart', 'wbcom-essential' ); ?>">
					<?php echo $cart_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php if ( $cart_count > 0 ) : ?>
						<span class="wbcom-essential-na__badge"><?php echo esc_html( $cart_count ); ?></span>
					<?php endif; ?>
				</a>
			</div>
			<?php
		endif;

		// BuddyPress Messages.
		if ( $any_messages_visible ) :
			$messages_classes = wbcom_na_visibility_classes( $show_messages_desktop, $show_messages_tablet, $show_messages_mobile );
			$unread_count     = function_exists( 'bp_get_total_unread_messages_count' ) ? bp_get_total_unread_messages_count() : 0;
			$messages_url     = function_exists( 'bp_loggedin_user_domain' ) ? trailingslashit( bp_loggedin_user_domain() . bp_get_messages_slug() ) : '#';
			?>
			<div class="wbcom-essential-na__item wbcom-essential-na__messages <?php echo esc_attr( $messages_classes ); ?>">
				<a href="<?php echo esc_url( $messages_url ); ?>" class="wbcom-essential-na__messages-toggle" aria-label="<?php esc_attr_e( 'Messages', 'wbcom-essential' ); ?>">
					<?php echo $message_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php if ( $unread_count > 0 ) : ?>
						<span class="wbcom-essential-na__badge"><?php echo esc_html( $unread_count ); ?></span>
					<?php endif; ?>
				</a>
			</div>
			<?php
		endif;

		// BuddyPress Notifications.
		if ( $any_notifications_visible ) :
			$notifications_classes = wbcom_na_visibility_classes( $show_notifications_desktop, $show_notifications_tablet, $show_notifications_mobile );
			$notifications_count   = function_exists( 'bp_notifications_get_unread_notification_count' ) ? bp_notifications_get_unread_notification_count( bp_loggedin_user_id() ) : 0;
			$notifications_url     = function_exists( 'bp_loggedin_user_domain' ) ? trailingslashit( bp_loggedin_user_domain() . bp_get_notifications_slug() ) : '#';
			?>
			<div class="wbcom-essential-na__item wbcom-essential-na__notifications <?php echo esc_attr( $notifications_classes ); ?>">
				<a href="<?php echo esc_url( $notifications_url ); ?>" class="wbcom-essential-na__notifications-toggle" aria-label="<?php esc_attr_e( 'Notifications', 'wbcom-essential' ); ?>">
					<?php echo $bell_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					<?php if ( $notifications_count > 0 ) : ?>
						<span class="wbcom-essential-na__badge"><?php echo esc_html( $notifications_count ); ?></span>
					<?php endif; ?>
				</a>
			</div>
			<?php
		endif;

		// User Avatar and Menu.
		if ( $any_avatar_visible ) :
			$avatar_classes = wbcom_na_visibility_classes( $show_avatar_desktop, $show_avatar_tablet, $show_avatar_mobile );

			if ( $is_logged_in && $current_user ) :
				// Get avatar URL.
				$avatar_url = '';
				if ( $has_buddypress && function_exists( 'bp_core_fetch_avatar' ) ) {
					$avatar_url = bp_core_fetch_avatar(
						array(
							'item_id' => $current_user->ID,
							'object'  => 'user',
							'type'    => 'thumb',
							'html'    => false,
						)
					);
				}
				if ( empty( $avatar_url ) ) {
					$avatar_url = get_avatar_url( $current_user->ID, array( 'size' => $avatar_size * 2 ) );
				}

				// Profile URL.
				$profile_url = $has_buddypress && function_exists( 'bp_loggedin_user_domain' ) ? bp_loggedin_user_domain() : get_edit_profile_url();

				// User display name.
				$display_name = $current_user->display_name;
				?>
				<div class="wbcom-essential-na__item wbcom-essential-na__user <?php echo esc_attr( $avatar_classes ); ?>">
					<a href="<?php echo esc_url( $profile_url ); ?>" class="wbcom-essential-na__user-toggle" aria-label="<?php esc_attr_e( 'User menu', 'wbcom-essential' ); ?>">
						<?php if ( $avatar_url ) : ?>
							<img src="<?php echo esc_url( $avatar_url ); ?>" alt="<?php echo esc_attr( $display_name ); ?>" class="wbcom-essential-na__avatar" width="<?php echo esc_attr( $avatar_size ); ?>" height="<?php echo esc_attr( $avatar_size ); ?>" />
						<?php endif; ?>
						<?php if ( $show_user_name ) : ?>
							<span class="wbcom-essential-na__username"><?php echo esc_html( $display_name ); ?></span>
						<?php endif; ?>
					</a>
					<div class="wbcom-essential-na__user-menu">
						<ul>
							<?php if ( $has_buddypress ) : ?>
								<li>
									<a href="<?php echo esc_url( bp_loggedin_user_domain() ); ?>">
										<?php esc_html_e( 'My Profile', 'wbcom-essential' ); ?>
									</a>
								</li>
								<?php if ( function_exists( 'bp_get_settings_slug' ) ) : ?>
									<li>
										<a href="<?php echo esc_url( trailingslashit( bp_loggedin_user_domain() . bp_get_settings_slug() ) ); ?>">
											<?php esc_html_e( 'Settings', 'wbcom-essential' ); ?>
										</a>
									</li>
								<?php endif; ?>
							<?php else : ?>
								<li>
									<a href="<?php echo esc_url( get_edit_profile_url() ); ?>">
										<?php esc_html_e( 'Edit Profile', 'wbcom-essential' ); ?>
									</a>
								</li>
							<?php endif; ?>
							<?php if ( current_user_can( 'manage_options' ) ) : ?>
								<li>
									<a href="<?php echo esc_url( admin_url() ); ?>">
										<?php esc_html_e( 'Dashboard', 'wbcom-essential' ); ?>
									</a>
								</li>
							<?php endif; ?>
							<li class="wbcom-essential-na__logout">
								<a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>">
									<?php esc_html_e( 'Log Out', 'wbcom-essential' ); ?>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<?php
			else :
				// Login/Register links.
				$login_url    = apply_filters( 'wbcom_essential_notification_login_url', wp_login_url() );
				$register_url = apply_filters( 'wbcom_essential_notification_register_url', wp_registration_url() );
				?>
				<div class="wbcom-essential-na__item wbcom-essential-na__auth <?php echo esc_attr( $avatar_classes ); ?>">
					<a href="<?php echo esc_url( $login_url ); ?>" class="wbcom-essential-na__login" aria-label="<?php esc_attr_e( 'Log in', 'wbcom-essential' ); ?>">
						<?php echo $login_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<span><?php esc_html_e( 'Login', 'wbcom-essential' ); ?></span>
					</a>
					<?php if ( get_option( 'users_can_register' ) ) : ?>
						<span class="wbcom-essential-na__sep">|</span>
						<a href="<?php echo esc_url( $register_url ); ?>" class="wbcom-essential-na__register" aria-label="<?php esc_attr_e( 'Register', 'wbcom-essential' ); ?>">
							<?php echo $register_icon; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
							<span><?php esc_html_e( 'Register', 'wbcom-essential' ); ?></span>
						</a>
					<?php endif; ?>
				</div>
				<?php
			endif;
		endif;
		?>
	</div>
</div>
