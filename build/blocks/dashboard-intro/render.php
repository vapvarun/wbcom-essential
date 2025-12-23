<?php
/**
 * Server-side render for Dashboard Intro block.
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

// Check if user is logged in.
if ( ! is_user_logged_in() ) {
	$show_logged_out = $attributes['showLoggedOutMessage'] ?? true;

	if ( $show_logged_out ) {
		$logged_out_message = $attributes['loggedOutMessage'] ?? __( 'Please log in to see your dashboard.', 'wbcom-essential' );
		$wrapper_attributes = get_block_wrapper_attributes( array(
			'class' => 'wbcom-essential-dashboard-intro logged-out',
		) );
		?>
		<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
			<div class="wbcom-essential-logged-out-message">
				<p><?php echo esc_html( $logged_out_message ); ?></p>
			</div>
		</div>
		<?php
	}
	return;
}

// Get current user data.
$current_user = wp_get_current_user();
$display_name = $current_user->display_name;

// Get avatar URL.
$avatar_url = '';
if ( function_exists( 'bp_core_fetch_avatar' ) ) {
	$avatar_url = bp_core_fetch_avatar( array(
		'item_id' => $current_user->ID,
		'type'    => 'full',
		'html'    => false,
	) );
} else {
	$avatar_url = get_avatar_url( $current_user->ID, array( 'size' => 200 ) );
}

// Get profile URL.
$profile_url = '';
if ( function_exists( 'bp_core_get_user_domain' ) ) {
	$profile_url = bp_core_get_user_domain( $current_user->ID );
} else {
	$profile_url = get_author_posts_url( $current_user->ID );
}

// Extract attributes.
$greeting_text       = $attributes['greetingText'] ?? 'Hello,';
$description_text    = $attributes['descriptionText'] ?? '';
$show_avatar         = $attributes['showAvatar'] ?? true;
$avatar_size         = $attributes['avatarSize'] ?? 80;
$avatar_border_radius = $attributes['avatarBorderRadius'] ?? 50;
$layout              = $attributes['layout'] ?? 'left';
$content_align       = $attributes['contentAlign'] ?? 'left';
$greeting_color      = $attributes['greetingColor'] ?? '#A3A5A9';
$name_color          = $attributes['nameColor'] ?? '#122B46';
$description_color   = $attributes['descriptionColor'] ?? '#666666';
$gap                 = $attributes['gap'] ?? 20;
$container_bg_color  = $attributes['containerBgColor'] ?? '';
$container_padding   = $attributes['containerPadding'] ?? 30;
$container_radius    = $attributes['containerBorderRadius'] ?? 8;

// Build inline styles.
$inline_styles = array(
	'--greeting-color'    => $greeting_color,
	'--name-color'        => $name_color,
	'--description-color' => $description_color,
	'--gap'               => $gap . 'px',
	'--container-padding' => $container_padding . 'px',
	'--container-radius'  => $container_radius . 'px',
	'--avatar-size'       => $avatar_size . 'px',
	'--avatar-radius'     => $avatar_border_radius . '%',
);

if ( $container_bg_color ) {
	$inline_styles['--container-bg'] = $container_bg_color;
}

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

// Container classes.
$container_classes = array(
	'wbcom-essential-dashboard-intro',
	'layout-' . $layout,
	'align-' . $content_align,
);

// Wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => implode( ' ', $container_classes ),
	'style' => $style_string,
) );
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<div class="wbcom-dashboard-intro-inner">
		<?php if ( $show_avatar ) : ?>
			<div class="wbcom-dashboard-intro-avatar">
				<a href="<?php echo esc_url( $profile_url ); ?>">
					<img
						src="<?php echo esc_url( $avatar_url ); ?>"
						alt="<?php echo esc_attr( $display_name ); ?>"
						width="<?php echo esc_attr( $avatar_size ); ?>"
						height="<?php echo esc_attr( $avatar_size ); ?>"
					/>
				</a>
			</div>
		<?php endif; ?>

		<div class="wbcom-dashboard-intro-content">
			<?php if ( $greeting_text ) : ?>
				<p class="wbcom-dashboard-intro-greeting">
					<?php echo esc_html( $greeting_text ); ?>
				</p>
			<?php endif; ?>

			<h2 class="wbcom-dashboard-intro-name">
				<a href="<?php echo esc_url( $profile_url ); ?>">
					<?php echo esc_html( $display_name ); ?>
				</a>
			</h2>

			<?php if ( $description_text ) : ?>
				<p class="wbcom-dashboard-intro-description">
					<?php echo esc_html( $description_text ); ?>
				</p>
			<?php endif; ?>
		</div>
	</div>
</div>
