<?php 
$search_icon = ( isset($settings['search_icon']['value']) &&  $settings['search_icon']['value'] != '') ? $settings['search_icon']['value'] : 'fas fa-search';

$messages_icon = ( isset($settings['messages_icon']['value']) &&  $settings['messages_icon']['value'] != '') ? $settings['messages_icon']['value'] : 'far fa-envelope';
$notifications_icon = ( isset($settings['notifications_icon']['value']) &&  $settings['notifications_icon']['value'] != '') ? $settings['notifications_icon']['value'] : 'far fa-bell';

$current_user = wp_get_current_user();

$wbcom_ele_login_url    = apply_filters( 'wbcom_ele_notification_login_url', wp_login_url() );
$wbcom_ele_register_url = apply_filters( 'wbcom_ele_notification_registration_url', wp_registration_url() );
?>

<div id="header-aside" class="header-aside">
	<div class="header-aside-inner">
		<?php if ( is_user_logged_in() && ( $current_user || ( $current_user instanceof WP_User ) ) ) {
				$user_link = function_exists( 'bp_core_get_user_domain' ) ? bp_core_get_user_domain( get_current_user_id() ) : '#'; ?>
				<div class="user-link-wrap">
					<a class="user-link" href="<?php echo esc_url(  $user_link ) ;?>">						
						<span class="rg-user"><?php echo $current_user->display_name; ?></span>						
					</a>
					<?php 
						wp_nav_menu(
							array(
								'theme_location' => 'menu-2',
								'menu_id'        => 'user-profile-menu',
								'fallback_cb'    => '',
								'container'      => false,
								'menu_class'     => 'user-profile-menu',
							)
						);?>
				</div>
		<?php }?>
		
		<?php
		if ( 'flex' == $settings['search_icon_switch'] ) {
			?>
			<div class="search-wrap rg-icon-wrap">
				<span class="<?php echo esc_attr($search_icon);?>"></span>
				<div class="rg-search-form-wrap">
					<span class="rg-search-close far fa-times-circle"></span>
					<?php get_search_form(); ?>
				</div>
			</div>
			<?php
		}
		?>

		<?php if ( is_user_logged_in() ) : ?>

			<?php if ( 'inline-block' == $settings['messages_icon_switch'] && class_exists( 'BuddyPress' ) && bp_is_active( 'messages' ) ) { ?>

					<div class="rg-msg">
						<a class="rg-icon-wrap" href="<?php echo bp_loggedin_user_domain() . bp_get_messages_slug(); ?>">
							<span class="<?php echo esc_attr($messages_icon);?>"></span>
							<?php
							if ( function_exists( 'bp_total_unread_messages_count' ) ) {
								$count = bp_get_total_unread_messages_count();
									?>
									<span class="rg-count"><?php $count; ?></span>
							<?php } ?>
						</a>
					</div>

			<?php } ?>


			<?php if ( 'inline-block' == $settings['notifications_icon_switch'] && class_exists( 'BuddyPress' ) &&  bp_is_active( 'notifications' ) ) {					
					global $bp;
					?>
					<div class="user-notifications">
						<a class="rg-icon-wrap" href="<?php echo esc_url( bp_loggedin_user_domain() . $bp->notifications->slug ); ?>" title="<?php _e( esc_attr( 'Notifications' ), 'reign' ); ?>">
							<span class="<?php echo esc_attr($notifications_icon);?>"></span>
							<?php if ( function_exists( 'bp_notifications_get_unread_notification_count' ) ) {
								$count = bp_notifications_get_unread_notification_count( get_current_user_id() ); ?>
								<span class="rg-count"> <?php echo esc_html( $count ); ?></span>
							<?php } ?>
						</a>
						
						<?php
						$notifications = bp_notifications_get_notifications_for_user( bp_loggedin_user_id() );
						if ( $notifications ) {
							?>
							<ul id="rg-notify" class="rg-header-submenu rg-dropdown">
								<?php
								rsort( $notifications );
								foreach ( $notifications as $notification ) {  ?>
									<li><?php echo $notification; ?></li>
								<?php } ?>
								<li class="rg-view-all">
									<a href="<?php echo esc_url( bp_loggedin_user_domain() . $bp->notifications->slug ); ?>"><?php _e( 'View all notifications', 'reign' ); ?></a>
								</li>
							</ul>
							<?php
						}
						?>
					</div>
			<?php } ?>


		<?php endif;?>
		
		
		<?php if ( !is_user_logged_in() ) : ?>
			
			<div class="rg-icon-wrap">
				<a href="<?php echo $wbcom_ele_login_url; ?>" class="btn-login" title="Login">	<span class="far fa-sign-in-alt"></span>
				</a>
			</div>
			
			<?php if ( get_option( 'users_can_register' ) ) { ?>
				<span class="sep">|</span>
				<div class="rg-icon-wrap">
					<a href="<?php echo $wbcom_ele_register_url; ?>" class="btn-register" title="Register">
						<span class="far fa-address-book"></span>
					</a>
				</div>

			<?php } ?>
			
		<?php endif;?>

	</div>

</div>