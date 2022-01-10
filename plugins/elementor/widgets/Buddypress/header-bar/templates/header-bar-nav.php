<?php
/**
 * @var array $settings
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
?>

<nav id="site-navigation" class="main-navigation" data-menu-space="120">
    <div id="primary-navbar">
		<?php
		wp_nav_menu(
			array(
				'menu'           => $settings['menu_marker'],
				'theme_location' => 'header-menu',
				'menu_id'        => 'primary-menu',
				'container'      => false,
				'fallback_cb'    => '',
				'menu_class'     => 'primary-menu wbcom-essential-primary-overflow',
			)
		);
		?>
        <div id="navbar-collapse">
            <a class="more-button" href="#"><i class="wbcom-essential-icon-menu-dots-h"></i></a>
            <ul id="navbar-extend" class="sub-menu"></ul>
        </div>
    </div>
</nav>