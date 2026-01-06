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
$show_dark_mode       = $attributes['showDarkModeToggle'] ?? false;
$space_between        = $attributes['spaceBetween'] ?? 10;
$icon_size            = $attributes['iconSize'] ?? 21;
$avatar_size          = $attributes['avatarSize'] ?? 36;
$avatar_border_radius = $attributes['avatarBorderRadius'] ?? 50;
$separator_color      = $attributes['separatorColor'] ?? 'rgba(0,0,0,0.1)';
$separator_width      = $attributes['separatorWidth'] ?? 1;
$icon_color           = $attributes['iconColor'] ?? '#303030';

// Individual icon settings.
$search_icon              = $attributes['searchIcon'] ?? '';
$search_icon_color        = $attributes['searchIconColor'] ?? '';
$messages_icon            = $attributes['messagesIcon'] ?? '';
$messages_icon_color      = $attributes['messagesIconColor'] ?? '';
$notifications_icon       = $attributes['notificationsIcon'] ?? '';
$notifications_icon_color = $attributes['notificationsIconColor'] ?? '';
$cart_icon                = $attributes['cartIcon'] ?? '';
$cart_icon_color          = $attributes['cartIconColor'] ?? '';
$dark_mode_icon           = $attributes['darkModeIcon'] ?? '';
$dark_mode_icon_color     = $attributes['darkModeIconColor'] ?? '';
$icon_text_shadow         = $attributes['iconTextShadow'] ?? '';

// Counter styles.
$counter_bg_color   = $attributes['counterBgColor'] ?? '#1D76DA';
$counter_text_color = $attributes['counterTextColor'] ?? '#ffffff';
$counter_box_shadow = $attributes['counterBoxShadow'] ?? '';

// Dropdown styles.
$dropdown_bg_color      = $attributes['dropdownBgColor'] ?? '#ffffff';
$dropdown_text_color    = $attributes['dropdownTextColor'] ?? '#303030';
$dropdown_hover_bg      = $attributes['dropdownHoverBgColor'] ?? '';
$dropdown_hover_text    = $attributes['dropdownHoverTextColor'] ?? '';
$dropdown_border_color  = $attributes['dropdownBorderColor'] ?? '';
$dropdown_border_width  = $attributes['dropdownBorderWidth'] ?? 0;
$dropdown_border_radius = $attributes['dropdownBorderRadius'] ?? 8;
$dropdown_box_shadow    = $attributes['dropdownBoxShadow'] ?? '0 4px 20px rgba(0, 0, 0, 0.15)';

// Profile styles.
$user_name_color       = $attributes['userNameColor'] ?? '#303030';
$user_name_hover_color = $attributes['userNameHoverColor'] ?? '';

// Auth styles.
$sign_in_color         = $attributes['signInColor'] ?? '';
$sign_in_hover_color   = $attributes['signInHoverColor'] ?? '';
$sign_up_bg_color      = $attributes['signUpBgColor'] ?? '';
$sign_up_text_color    = $attributes['signUpTextColor'] ?? '';
$sign_up_hover_bg      = $attributes['signUpHoverBgColor'] ?? '';
$sign_up_hover_text    = $attributes['signUpHoverTextColor'] ?? '';
$sign_up_border_radius = $attributes['signUpBorderRadius'] ?? 4;

// BuddyPress checks.
$bp_active            = function_exists( 'buddypress' );
$messages_active      = $bp_active && function_exists( 'bp_is_active' ) && bp_is_active( 'messages' );
$notifications_active = $bp_active && function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' );
$wc_active            = class_exists( 'WooCommerce' );

// Build inline styles with CSS custom properties.
$inline_styles = array(
	'--space-between'          => $space_between . 'px',
	'--icon-size'              => $icon_size . 'px',
	'--avatar-size'            => $avatar_size . 'px',
	'--avatar-radius'          => $avatar_border_radius . '%',
	'--separator-color'        => $separator_color,
	'--separator-width'        => $separator_width . 'px',
	'--icon-color'             => $icon_color,
	'--counter-bg-color'       => $counter_bg_color,
	'--counter-text-color'     => $counter_text_color,
	'--dropdown-bg-color'      => $dropdown_bg_color,
	'--dropdown-text-color'    => $dropdown_text_color,
	'--dropdown-border-radius' => $dropdown_border_radius . 'px',
	'--user-name-color'        => $user_name_color,
	'--sign-up-border-radius'  => $sign_up_border_radius . 'px',
);

// Add optional styles only if set.
if ( ! empty( $search_icon_color ) ) {
	$inline_styles['--search-icon-color'] = $search_icon_color;
}
if ( ! empty( $messages_icon_color ) ) {
	$inline_styles['--messages-icon-color'] = $messages_icon_color;
}
if ( ! empty( $notifications_icon_color ) ) {
	$inline_styles['--notifications-icon-color'] = $notifications_icon_color;
}
if ( ! empty( $cart_icon_color ) ) {
	$inline_styles['--cart-icon-color'] = $cart_icon_color;
}
if ( ! empty( $dark_mode_icon_color ) ) {
	$inline_styles['--dark-mode-icon-color'] = $dark_mode_icon_color;
}
if ( ! empty( $icon_text_shadow ) ) {
	$inline_styles['--icon-text-shadow'] = $icon_text_shadow;
}
if ( ! empty( $counter_box_shadow ) ) {
	$inline_styles['--counter-box-shadow'] = $counter_box_shadow;
}
if ( ! empty( $dropdown_hover_bg ) ) {
	$inline_styles['--dropdown-hover-bg-color'] = $dropdown_hover_bg;
}
if ( ! empty( $dropdown_hover_text ) ) {
	$inline_styles['--dropdown-hover-text-color'] = $dropdown_hover_text;
}
if ( ! empty( $dropdown_border_color ) ) {
	$inline_styles['--dropdown-border-color'] = $dropdown_border_color;
}
if ( $dropdown_border_width > 0 ) {
	$inline_styles['--dropdown-border-width'] = $dropdown_border_width . 'px';
}
if ( ! empty( $dropdown_box_shadow ) ) {
	$inline_styles['--dropdown-box-shadow'] = $dropdown_box_shadow;
}
if ( ! empty( $user_name_hover_color ) ) {
	$inline_styles['--user-name-hover-color'] = $user_name_hover_color;
}
if ( ! empty( $sign_in_color ) ) {
	$inline_styles['--sign-in-color'] = $sign_in_color;
}
if ( ! empty( $sign_in_hover_color ) ) {
	$inline_styles['--sign-in-hover-color'] = $sign_in_hover_color;
}
if ( ! empty( $sign_up_bg_color ) ) {
	$inline_styles['--sign-up-bg-color'] = $sign_up_bg_color;
}
if ( ! empty( $sign_up_text_color ) ) {
	$inline_styles['--sign-up-text-color'] = $sign_up_text_color;
}
if ( ! empty( $sign_up_hover_bg ) ) {
	$inline_styles['--sign-up-hover-bg-color'] = $sign_up_hover_bg;
}
if ( ! empty( $sign_up_hover_text ) ) {
	$inline_styles['--sign-up-hover-text-color'] = $sign_up_hover_text;
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

if ( ! function_exists( 'wbcom_header_bar_render_icon' ) ) {
	/**
	 * Render an icon - either custom SVG or dashicon fallback.
	 *
	 * @param string $custom_icon    Custom icon name from icon picker.
	 * @param string $dashicon_class Fallback dashicon class.
	 * @param string $extra_class    Additional CSS class.
	 * @return string HTML for the icon.
	 */
	function wbcom_header_bar_render_icon( $custom_icon, $dashicon_class, $extra_class = '' ) {
		$class = 'wbcom-header-bar-icon-inner';
		if ( ! empty( $extra_class ) ) {
			$class .= ' ' . $extra_class;
		}

		if ( ! empty( $custom_icon ) ) {
			$svg = wbcom_header_bar_get_icon_svg( $custom_icon );
			if ( $svg ) {
				return '<span class="' . esc_attr( $class ) . ' wbcom-custom-icon">' . $svg . '</span>';
			}
		}

		return '<span class="' . esc_attr( $class ) . ' dashicons ' . esc_attr( $dashicon_class ) . '"></span>';
	}
}

if ( ! function_exists( 'wbcom_header_bar_get_icon_svg' ) ) {
	/**
	 * Get SVG markup for a custom icon.
	 *
	 * @param string $icon_name Icon name.
	 * @return string|false SVG markup or false if not found.
	 */
	function wbcom_header_bar_get_icon_svg( $icon_name ) {
		$icons = array(
			// General icons.
			'search'           => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
			'search-circle'    => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="m15 13 2.5 2.5"/></svg>',
			'magnifying-glass' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></svg>',
			'zoom'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>',
			'menu'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>',
			'settings'         => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>',
			'home'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
			// Communication icons.
			'mail'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
			'mail-open'        => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/></svg>',
			'inbox'            => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>',
			'send'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
			'message-circle'   => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
			'message-square'   => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
			'chat'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/></svg>',
			// Notification icons.
			'bell'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
			'bell-ring'        => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><path d="M4 2C2.8 3.7 2 5.7 2 8"/><path d="M22 8c0-2.3-.8-4.3-2-6"/></svg>',
			'bell-dot'         => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/><circle cx="18" cy="8" r="3"/></svg>',
			'alert-circle'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
			// Shopping icons.
			'cart'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>',
			'shopping-bag'     => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
			'shopping-basket'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 11-1 9"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4"/><path d="M4.5 15.5h15"/><path d="m5 11 4-7"/><path d="m9 11 1 9"/></svg>',
			'store'            => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7"/></svg>',
			// User icons.
			'user'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
			'user-circle'      => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="10" r="3"/><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/></svg>',
			'users'            => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
			// Theme icons.
			'sun'              => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
			'moon'             => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
			'sun-moon'         => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.9 4.9 1.4 1.4"/><path d="m17.7 17.7 1.4 1.4"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.3 17.7-1.4 1.4"/><path d="m19.1 4.9-1.4 1.4"/></svg>',
			'monitor'          => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>',
			'palette'          => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>',
		);

		if ( isset( $icons[ $icon_name ] ) ) {
			return $icons[ $icon_name ];
		}

		return false;
	}
}
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<div class="wbcom-header-bar-inner">
		<?php if ( is_user_logged_in() ) : ?>
			<?php if ( $show_profile ) : ?>
				<?php
				$header_bar_user = wp_get_current_user();

				// Get user profile link.
				if ( $bp_active && function_exists( 'bp_members_get_user_url' ) ) {
					$user_link = bp_members_get_user_url( $header_bar_user->ID );
				} elseif ( $bp_active && function_exists( 'bp_core_get_user_domain' ) ) {
					$user_link = bp_core_get_user_domain( $header_bar_user->ID );
				} else {
					$user_link = get_author_posts_url( $header_bar_user->ID );
				}

				// Get display name.
				$display_name = $bp_active && function_exists( 'bp_core_get_user_displayname' )
					? bp_core_get_user_displayname( $header_bar_user->ID )
					: $header_bar_user->display_name;
				?>
				<div class="wbcom-header-bar-profile wbcom-header-bar-dropdown">
					<a class="wbcom-profile-link" href="<?php echo esc_url( $user_link ); ?>">
						<span class="wbcom-profile-name"><?php echo esc_html( $display_name ); ?></span>
						<span class="wbcom-profile-arrow dashicons dashicons-arrow-down-alt2"></span>
						<?php echo get_avatar( $header_bar_user->ID, $avatar_size * 2, '', $display_name ); ?>
					</a>

					<div class="wbcom-header-bar-dropdown-content wbcom-profile-dropdown">
						<div class="wbcom-dropdown-inner">
							<?php
							if ( $bp_active && ! empty( $profile_menu ) ) {
								wp_nav_menu(
									array(
										'menu'        => $profile_menu,
										'menu_id'     => 'wbcom-header-profile-menu',
										'container'   => false,
										'menu_class'  => 'wbcom-profile-menu',
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
					<?php echo wbcom_header_bar_render_icon( $search_icon, 'dashicons-search', 'search-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			<?php endif; ?>

			<?php if ( $show_messages && $messages_active ) : ?>
				<?php
				$unread_count = function_exists( 'bp_get_total_unread_messages_count' ) ? bp_get_total_unread_messages_count() : 0;
				$messages_url = $bp_active && function_exists( 'bp_loggedin_user_domain' ) ? trailingslashit( bp_loggedin_user_domain() ) . 'messages/' : '#';
				?>
				<div class="wbcom-header-bar-messages wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $messages_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Messages', 'wbcom-essential' ); ?>">
						<?php echo wbcom_header_bar_render_icon( $messages_icon, 'dashicons-email', 'messages-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
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
						<?php echo wbcom_header_bar_render_icon( $notifications_icon, 'dashicons-bell', 'notifications-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php if ( $notification_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $notification_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $show_cart && $wc_active ) : ?>
				<?php
				$wc_instance = WC();
				$cart_count  = ( $wc_instance && $wc_instance->cart ) ? $wc_instance->cart->get_cart_contents_count() : 0;
				$cart_url    = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '#';
				?>
				<div class="wbcom-header-bar-cart wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Cart', 'wbcom-essential' ); ?>">
						<?php echo wbcom_header_bar_render_icon( $cart_icon, 'dashicons-cart', 'cart-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php if ( $cart_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $cart_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $show_dark_mode ) : ?>
				<button type="button" class="wbcom-header-bar-dark-mode wbcom-header-bar-icon" title="<?php esc_attr_e( 'Toggle Dark Mode', 'wbcom-essential' ); ?>" aria-label="<?php esc_attr_e( 'Toggle Dark Mode', 'wbcom-essential' ); ?>">
					<?php echo wbcom_header_bar_render_icon( $dark_mode_icon, 'dashicons-lightbulb', 'dark-mode-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
			<?php endif; ?>

		<?php else : ?>
			<?php // Logged out state. ?>
			<?php if ( $show_search ) : ?>
				<a href="#" class="wbcom-header-bar-search wbcom-header-bar-icon" title="<?php esc_attr_e( 'Search', 'wbcom-essential' ); ?>">
					<?php echo wbcom_header_bar_render_icon( $search_icon, 'dashicons-search', 'search-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</a>
			<?php endif; ?>

			<?php if ( $show_cart && $wc_active ) : ?>
				<?php
				$wc_instance = WC();
				$cart_count  = ( $wc_instance && $wc_instance->cart ) ? $wc_instance->cart->get_cart_contents_count() : 0;
				$cart_url    = function_exists( 'wc_get_cart_url' ) ? wc_get_cart_url() : '#';
				?>
				<div class="wbcom-header-bar-cart wbcom-header-bar-dropdown">
					<a href="<?php echo esc_url( $cart_url ); ?>" class="wbcom-header-bar-icon" title="<?php esc_attr_e( 'Cart', 'wbcom-essential' ); ?>">
						<?php echo wbcom_header_bar_render_icon( $cart_icon, 'dashicons-cart', 'cart-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
						<?php if ( $cart_count > 0 ) : ?>
							<span class="wbcom-header-bar-count"><?php echo esc_html( $cart_count ); ?></span>
						<?php endif; ?>
					</a>
				</div>
			<?php endif; ?>

			<?php if ( $show_dark_mode ) : ?>
				<button type="button" class="wbcom-header-bar-dark-mode wbcom-header-bar-icon" title="<?php esc_attr_e( 'Toggle Dark Mode', 'wbcom-essential' ); ?>" aria-label="<?php esc_attr_e( 'Toggle Dark Mode', 'wbcom-essential' ); ?>">
					<?php echo wbcom_header_bar_render_icon( $dark_mode_icon, 'dashicons-lightbulb', 'dark-mode-icon' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
				</button>
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
