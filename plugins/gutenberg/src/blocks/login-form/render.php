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

$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';

// Content attributes.
$redirect_url      = ! empty( $attributes['redirectUrl'] ) ? esc_url( $attributes['redirectUrl'] ) : '';
$show_remember     = ! empty( $attributes['showRememberMe'] );
$show_register     = ! empty( $attributes['showRegisterLink'] );
$show_lost_pass    = ! empty( $attributes['showLostPassword'] );
$button_text       = ! empty( $attributes['buttonText'] ) ? $attributes['buttonText'] : __( 'Log In', 'wbcom-essential' );
$logged_in_message = ! empty( $attributes['loggedInMessage'] ) ? $attributes['loggedInMessage'] : __( 'You are already logged in.', 'wbcom-essential' );

// What a logged-in member sees. Unset (blocks saved before the setting existed): a block whose owner wrote
// their own message keeps showing it, any other shows nothing, which is what a sidebar login box wants.
$logged_in_view = $attributes['loggedInView'] ?? '';
if ( ! in_array( $logged_in_view, array( 'none', 'message', 'card' ), true ) ) {
	$custom_message = ! empty( $attributes['loggedInMessage'] ) && 'You are already logged in.' !== $attributes['loggedInMessage'];
	$logged_in_view = $custom_message ? 'message' : 'none';
}

// The editor preview always shows the form, so the owner can see and style it while logged in.
$is_editor = defined( 'REST_REQUEST' ) && REST_REQUEST;
$show_form = ! is_user_logged_in() || $is_editor;

if ( ! $show_form && 'none' === $logged_in_view ) {
	return;
}

$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

// Colours the owner picked; anything left empty follows the theme (style.css).
$token_style = '';
foreach (
	array(
		'formBg'      => '--wbe-lf-form-bg',
		'buttonBg'    => '--wbe-lf-btn-bg',
		'buttonColor' => '--wbe-lf-btn-color',
		'labelColor'  => '--wbe-lf-label-color',
		'linkColor'   => '--wbe-lf-link-color',
	) as $attribute => $property
) {
	// A colour value only: hex, rgb()/hsl(), a named colour or var(--token). Nothing that can close the rule.
	if ( ! empty( $attributes[ $attribute ] ) && is_string( $attributes[ $attribute ] ) && preg_match( '/^[#a-zA-Z0-9(),.%\s-]+$/', $attributes[ $attribute ] ) ) {
		$token_style .= $property . ':' . $attributes[ $attribute ] . ';';
	}
}

$wrapper = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbe-login-form ' . $vis_classes ),
		'style' => $token_style,
	)
);
?>

<div <?php echo $wrapper; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

	<?php
	if ( ! $show_form ) :
		$member = wp_get_current_user();
		$profile_url  = wbcom_essential_get_user_domain( $member->ID );
		?>

		<?php if ( 'card' === $logged_in_view ) : ?>
			<div class="wbe-login-form__member">
				<a class="wbe-login-form__member-avatar" href="<?php echo esc_url( $profile_url ); ?>" tabindex="-1" aria-hidden="true">
					<?php echo get_avatar( $member->ID, 48 ); ?>
				</a>
				<div class="wbe-login-form__member-body">
					<a class="wbe-login-form__member-name" href="<?php echo esc_url( $profile_url ); ?>"><?php echo esc_html( $member->display_name ); ?></a>
					<span class="wbe-login-form__member-links">
						<a href="<?php echo esc_url( $profile_url ); ?>"><?php esc_html_e( 'View profile', 'wbcom-essential' ); ?></a>
						<a href="<?php echo esc_url( wp_logout_url( home_url( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ?? '' ) ) ) ) ); ?>"><?php esc_html_e( 'Log out', 'wbcom-essential' ); ?></a>
					</span>
				</div>
			</div>
		<?php else : ?>
			<div class="wbe-login-form__logged-in">
				<p class="wbe-login-form__logged-in-message">
					<?php echo esc_html( $logged_in_message ); ?>
				</p>
				<a class="wbe-login-form__profile-link" href="<?php echo esc_url( $profile_url ); ?>">
					<?php esc_html_e( 'View your profile', 'wbcom-essential' ); ?>
				</a>
			</div>
		<?php endif; ?>

	<?php else : ?>

		<div class="wbe-login-form__inner">
			<?php
			$login_form_args = array(
				'echo'           => true,
				'remember'       => $show_remember,
				'redirect'       => $redirect_url ? $redirect_url : esc_url_raw( home_url( sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ?? '' ) ) ) ),
				'form_id'        => 'wbe-login-form-' . esc_attr( $unique_id ),
				'label_username' => __( 'Username or Email Address', 'wbcom-essential' ),
				'label_password' => __( 'Password', 'wbcom-essential' ),
				'label_remember' => __( 'Remember Me', 'wbcom-essential' ),
				'label_log_in'   => esc_html( $button_text ),
				'id_submit'      => 'wbe-login-submit-' . esc_attr( $unique_id ),
			);

			wp_login_form( $login_form_args );
			?>

			<?php if ( $show_lost_pass || $show_register ) : ?>
				<div class="wbe-login-form__links">
					<?php if ( $show_lost_pass ) : ?>
						<a class="wbe-login-form__link wbe-login-form__link--lost" href="<?php echo esc_url( wp_lostpassword_url() ); ?>">
							<?php esc_html_e( 'Lost your password?', 'wbcom-essential' ); ?>
						</a>
					<?php endif; ?>

					<?php if ( $show_register && get_option( 'users_can_register' ) ) : ?>
						<a class="wbe-login-form__link wbe-login-form__link--register" href="<?php echo esc_url( wp_registration_url() ); ?>">
							<?php esc_html_e( 'Register', 'wbcom-essential' ); ?>
						</a>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>

	<?php endif; ?>

</div>
