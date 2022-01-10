<?php
/**
 * @var array $settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


$settings_align = $settings['content_align'];

$settings_search_ico         = $settings['search_icon']['value'];
$settings_messages_icon      = ( function_exists( 'bp_is_active' ) && bp_is_active( 'messages' ) ) ? $settings['messages_icon']['value'] : '';
$settings_notifications_icon = ( function_exists( 'bp_is_active' ) && bp_is_active( 'notifications' ) ) ? $settings['notifications_icon']['value'] : '';
$settings_cart_icon          = ( class_exists( 'WooCommerce' ) ) ? $settings['cart_icon']['value'] : '';
$settings_dark_icon          = ( class_exists( 'SFWD_LMS' ) ) ? $settings['dark_icon']['value'] : '';
$settings_sidebartoggle_icon = ( class_exists( 'SFWD_LMS' ) ) ? $settings['sidebartoggle_icon']['value'] : '';
$settings_avatar_border      = $settings['avatar_border_style'];

$this->add_render_attribute( 'site-header', 'class', 'site-header site-header--elementor icon-fill-in' );
$this->add_render_attribute( 'site-header', 'class', 'site-header--align-' . esc_attr( $settings_align ) . '' );
$this->add_render_attribute( 'site-header', 'class', 'avatar-' . esc_attr( $settings_avatar_border ) . '' );
if ( $settings['switch_logo'] ) {
	$this->add_render_attribute( 'site-header', 'class', 'site-header--is-logo' );
}
if ( $settings['switch_nav'] ) {
	$this->add_render_attribute( 'site-header', 'class', 'site-header--is-nav' );
}
$this->add_render_attribute( 'site-header', 'data-search-icon', esc_attr( $settings_search_ico ) );
$this->add_render_attribute( 'site-header', 'data-messages-icon', esc_attr( $settings_messages_icon ) );
$this->add_render_attribute( 'site-header', 'data-notifications-icon', esc_attr( $settings_notifications_icon ) );
$this->add_render_attribute( 'site-header', 'data-cart-icon', esc_attr( $settings_cart_icon ) );
$this->add_render_attribute( 'site-header', 'data-dark-icon', esc_attr( $settings_dark_icon ) );
$this->add_render_attribute( 'site-header', 'data-sidebartoggle-icon', esc_attr( $settings_sidebartoggle_icon ) );

$this->add_render_attribute( 'site-header-container', 'class', 'container site-header-container flex default-header' );
$container = '<div ' . $this->get_render_attribute_string( 'site-header-container' ) . '>';

$elem = ( is_front_page() && is_home() ) ? 'h1' : 'div';

?>

<div <?php echo $this->get_render_attribute_string( 'site-header' ); ?>>

	<?php echo ( $settings['switch_logo'] || $settings['switch_nav'] ) ? wp_kses_post( $container ) : ''; ?>

	<?php if ( $settings['switch_logo'] ) : ?>		
		
		<div id="site-logo" class="site-branding">
			<<?php echo $elem; ?> class="site-title">
				<a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home">					
					<?php if ( has_custom_logo()  ) : ?>
						<?php the_custom_logo(); ?>
					<?php else: ?>
						<?php echo get_bloginfo( 'name' ); ?>
					<?php endif; ?>
				</a>
			</<?php echo $elem; ?>>
		</div>

		
	<?php endif; ?>
	
	<?php if ( $settings['switch_nav'] ) : ?>
	
		<?php
		$nav_template_path = WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH . '/Buddypress/header-bar/templates/header-bar-nav.php';

		if ( file_exists( $nav_template_path ) ) {
			require $nav_template_path;
		}
		?>
		
	<?php endif; ?>
	
	<?php if ( $settings['switch_bar'] ) : ?>	
		
		<?php
		$nheader_aside_template_path = WBCOM_ESSENTIAL_ELEMENTOR_WIDGET_PATH . '/Buddypress/header-bar/templates/header-aside.php';

		if ( file_exists( $nheader_aside_template_path ) ) {
			require $nheader_aside_template_path;
		}
		?>
		
	<?php endif; ?>

	<?php echo ( $settings['switch_logo'] || $settings['switch_nav'] ) ? '</div>' : ''; ?>
	
	<div class="header-search-wrap header-search-wrap--elementor">
		<div class="container">
			<?php  get_search_form();?>
			<a href="#" class="close-search"><i class="wbcom-essential-icon-close-circle"></i></a>
		</div>
	</div>
	
	
</div>
