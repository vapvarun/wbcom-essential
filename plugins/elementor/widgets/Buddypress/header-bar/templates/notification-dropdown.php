<?php
$menu_link                 = trailingslashit( bp_loggedin_user_domain() . bp_get_notifications_slug() );
$notifications             = bp_notifications_get_unread_notification_count( bp_loggedin_user_id() );
$unread_notification_count = ! empty( $notifications ) ? $notifications : 0;

$notifications_icon = ( isset($settings['notifications_icon']['value']) &&  $settings['notifications_icon']['value'] != '') ? $settings['notifications_icon']['value'] : 'wb-icon-bell';
?>
<div id="header-notifications-dropdown-elem" class="notification-wrap menu-item-has-children">
    <a href="<?php echo $menu_link ?>"
       ref="notification_bell"
       class="notification-link">
       <span data-balloon-pos="down" data-balloon="<?php _e( 'Notifications', 'wbcom-essential' ); ?>">
            <i class="<?php echo esc_attr($notifications_icon);?>"></i>
    		<?php if ( $unread_notification_count > 0 ): ?>
                <span class="count"><?php echo $unread_notification_count; ?></span>
    		<?php endif; ?>
        </span>
    </a>
    <section class="notification-dropdown">
        <header class="notification-header">
            <h2 class="title"><?php _e( 'Notifications', 'wbcom-essential' ); ?></h2>
            <a class="mark-read-all action-unread" data-notification-id="all" style="display: none;">
                <?php _e( 'Mark all as read', 'wbcom-essential' ); ?>
            </a>
        </header>

        <ul class="notification-list wbcom-essential-nouveau-list">
            <p class="wbcom-essential-header-loader"><i class="wbcom-essential-icon-loader animate-spin"></i></p>
        </ul>

		<footer class="notification-footer">
			<a href="<?php echo $menu_link ?>" class="delete-all">
				<?php _e( 'View Notifications', 'wbcom-essential' ); ?>
				<i class="wbcom-essential-icon-angle-right"></i>
			</a>
		</footer>
    </section>
</div>