<?php
/**
 * Server-side render for Login Form block.
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

// Extract attributes.
$show_logo              = $attributes['showLogo'] ?? true;
$logo_url               = $attributes['logoUrl'] ?? '';
$logo_width             = $attributes['logoWidth'] ?? 150;
$show_title             = $attributes['showTitle'] ?? true;
$title                  = $attributes['title'] ?? 'Welcome Back';
$title_tag              = $attributes['titleTag'] ?? 'h2';
$show_subtitle          = $attributes['showSubtitle'] ?? true;
$subtitle               = $attributes['subtitle'] ?? 'Please login to your account';
$username_label         = $attributes['usernameLabel'] ?? 'Username or Email';
$username_placeholder   = $attributes['usernamePlaceholder'] ?? 'Enter your username or email';
$password_label         = $attributes['passwordLabel'] ?? 'Password';
$password_placeholder   = $attributes['passwordPlaceholder'] ?? 'Enter your password';
$show_labels            = $attributes['showLabels'] ?? true;
$show_remember_me       = $attributes['showRememberMe'] ?? true;
$remember_me_label      = $attributes['rememberMeLabel'] ?? 'Remember Me';
$button_text            = $attributes['buttonText'] ?? 'Log In';
$show_lost_password     = $attributes['showLostPassword'] ?? true;
$lost_password_text     = $attributes['lostPasswordText'] ?? 'Lost your password?';
$show_register          = $attributes['showRegister'] ?? true;
$register_text          = $attributes['registerText'] ?? "Don't have an account?";
$register_link_text     = $attributes['registerLinkText'] ?? 'Register';
$redirect_url           = $attributes['redirectUrl'] ?? '';
$show_logged_in_message = $attributes['showLoggedInMessage'] ?? true;
$logged_in_message      = $attributes['loggedInMessage'] ?? 'You are already logged in.';
$test_mode              = $attributes['testMode'] ?? false;

// Styling attributes.
$form_bg_color            = $attributes['formBgColor'] ?? '#ffffff';
$form_padding             = $attributes['formPadding'] ?? 30;
$form_border_radius       = $attributes['formBorderRadius'] ?? 8;
$title_color              = $attributes['titleColor'] ?? '#122B46';
$subtitle_color           = $attributes['subtitleColor'] ?? '#666666';
$label_color              = $attributes['labelColor'] ?? '#122B46';
$input_bg_color           = $attributes['inputBgColor'] ?? '#f8f9fa';
$input_border_color       = $attributes['inputBorderColor'] ?? '#e3e3e3';
$input_text_color         = $attributes['inputTextColor'] ?? '#122B46';
$input_focus_border_color = $attributes['inputFocusBorderColor'] ?? '#1d76da';
$button_bg_color          = $attributes['buttonBgColor'] ?? '#1d76da';
$button_text_color        = $attributes['buttonTextColor'] ?? '#ffffff';
$button_hover_bg_color    = $attributes['buttonHoverBgColor'] ?? '#1557a0';
$link_color               = $attributes['linkColor'] ?? '#1d76da';
$link_hover_color         = $attributes['linkHoverColor'] ?? '#1557a0';

// Build inline styles.
$inline_styles = array(
	'--form-bg-color'            => $form_bg_color,
	'--form-padding'             => $form_padding . 'px',
	'--form-border-radius'       => $form_border_radius . 'px',
	'--title-color'              => $title_color,
	'--subtitle-color'           => $subtitle_color,
	'--label-color'              => $label_color,
	'--input-bg-color'           => $input_bg_color,
	'--input-border-color'       => $input_border_color,
	'--input-text-color'         => $input_text_color,
	'--input-focus-border-color' => $input_focus_border_color,
	'--button-bg-color'          => $button_bg_color,
	'--button-text-color'        => $button_text_color,
	'--button-hover-bg-color'    => $button_hover_bg_color,
	'--link-color'               => $link_color,
	'--link-hover-color'         => $link_hover_color,
	'--logo-width'               => $logo_width . 'px',
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'wbcom-essential-login-form-wrapper',
	'style' => $style_string,
) );

// Check if user is logged in.
$is_logged_in = is_user_logged_in();

// Determine if we should show the form.
$show_form = ! $is_logged_in || $test_mode;

// Check if PMPro is active.
$has_pmpro = function_exists( 'pmpro_login_head' );

// Generate unique form ID.
$form_id = 'wbcom-login-form-' . wp_unique_id();

// Get URLs.
$lost_password_url = wp_lostpassword_url();
$register_url      = wp_registration_url();

// Apply filters for custom URLs.
$lost_password_url = apply_filters( 'wbcom_essential_login_lost_password_url', $lost_password_url );
$register_url      = apply_filters( 'wbcom_essential_login_register_url', $register_url );
?>

<div <?php echo $wrapper_attributes; ?>>
	<?php if ( $is_logged_in && ! $test_mode ) : ?>
		<?php if ( $show_logged_in_message ) : ?>
			<div class="wbcom-essential-login-form wbcom-essential-login-form--logged-in">
				<p class="wbcom-essential-login-form__logged-in-message">
					<?php echo esc_html( $logged_in_message ); ?>
				</p>
				<a href="<?php echo esc_url( wp_logout_url( home_url() ) ); ?>" class="wbcom-essential-login-form__logout-link">
					<?php esc_html_e( 'Log Out', 'wbcom-essential' ); ?>
				</a>
			</div>
		<?php endif; ?>
	<?php else : ?>
		<div class="wbcom-essential-login-form" id="<?php echo esc_attr( $form_id ); ?>">
			<?php if ( $show_logo && $logo_url ) : ?>
				<div class="wbcom-essential-login-form__logo">
					<img src="<?php echo esc_url( $logo_url ); ?>" alt="<?php esc_attr_e( 'Logo', 'wbcom-essential' ); ?>" />
				</div>
			<?php endif; ?>

			<?php if ( $show_title && $title ) : ?>
				<<?php echo esc_attr( $title_tag ); ?> class="wbcom-essential-login-form__title">
					<?php echo esc_html( $title ); ?>
				</<?php echo esc_attr( $title_tag ); ?>>
			<?php endif; ?>

			<?php if ( $show_subtitle && $subtitle ) : ?>
				<p class="wbcom-essential-login-form__subtitle">
					<?php echo esc_html( $subtitle ); ?>
				</p>
			<?php endif; ?>

			<?php if ( $has_pmpro ) : ?>
				<?php
				// Use PMPro login form.
				echo do_shortcode( '[pmpro_login redirect="' . esc_attr( $redirect_url ) . '"]' );
				?>
			<?php else : ?>
				<form class="wbcom-essential-login-form__form" method="post" data-ajax="true">
					<div class="wbcom-essential-login-form__message" aria-live="polite" hidden></div>

					<div class="wbcom-essential-login-form__field">
						<?php if ( $show_labels ) : ?>
							<label for="<?php echo esc_attr( $form_id ); ?>-username" class="wbcom-essential-login-form__label">
								<?php echo esc_html( $username_label ); ?>
							</label>
						<?php endif; ?>
						<input
							type="text"
							id="<?php echo esc_attr( $form_id ); ?>-username"
							name="username"
							class="wbcom-essential-login-form__input"
							placeholder="<?php echo esc_attr( $username_placeholder ); ?>"
							autocomplete="username"
							required
						/>
					</div>

					<div class="wbcom-essential-login-form__field">
						<?php if ( $show_labels ) : ?>
							<label for="<?php echo esc_attr( $form_id ); ?>-password" class="wbcom-essential-login-form__label">
								<?php echo esc_html( $password_label ); ?>
							</label>
						<?php endif; ?>
						<input
							type="password"
							id="<?php echo esc_attr( $form_id ); ?>-password"
							name="password"
							class="wbcom-essential-login-form__input"
							placeholder="<?php echo esc_attr( $password_placeholder ); ?>"
							autocomplete="current-password"
							required
						/>
					</div>

					<div class="wbcom-essential-login-form__options">
						<?php if ( $show_remember_me ) : ?>
							<label class="wbcom-essential-login-form__remember">
								<input type="checkbox" name="remember" value="1" />
								<span><?php echo esc_html( $remember_me_label ); ?></span>
							</label>
						<?php endif; ?>

						<?php if ( $show_lost_password ) : ?>
							<a href="<?php echo esc_url( $lost_password_url ); ?>" class="wbcom-essential-login-form__lost-password">
								<?php echo esc_html( $lost_password_text ); ?>
							</a>
						<?php endif; ?>
					</div>

					<input type="hidden" name="redirect" value="<?php echo esc_attr( $redirect_url ); ?>" />
					<input type="hidden" name="nonce" value="<?php echo esc_attr( wp_create_nonce( 'wbcom_essential_login_nonce' ) ); ?>" />

					<button type="submit" class="wbcom-essential-login-form__button">
						<span class="wbcom-essential-login-form__button-text"><?php echo esc_html( $button_text ); ?></span>
						<span class="wbcom-essential-login-form__button-loading" hidden>
							<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" opacity="0.25"/>
								<path d="M12 4a8 8 0 0 1 8 8h2a10 10 0 0 0-10-10Z">
									<animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
								</path>
							</svg>
						</span>
					</button>

					<?php if ( $show_register && get_option( 'users_can_register' ) ) : ?>
						<p class="wbcom-essential-login-form__register">
							<?php echo esc_html( $register_text ); ?>
							<a href="<?php echo esc_url( $register_url ); ?>">
								<?php echo esc_html( $register_link_text ); ?>
							</a>
						</p>
					<?php endif; ?>
				</form>
			<?php endif; ?>
		</div>
	<?php endif; ?>
</div>
