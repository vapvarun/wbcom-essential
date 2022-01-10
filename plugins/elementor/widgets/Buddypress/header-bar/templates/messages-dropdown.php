<?php
global $messages_template;
$menu_link            = trailingslashit( bp_loggedin_user_domain() . bp_get_messages_slug() );
$unread_message_count = messages_get_unread_count();
$messages_icon = ( isset($settings['messages_icon']['value']) &&  $settings['messages_icon']['value'] != '') ? $settings['messages_icon']['value'] : 'far fa-envelope';
?>
<div id="header-messages-dropdown-elem" class="dropdown-passive dropdown-right notification-wrap messages-wrap menu-item-has-children">
    <a href="<?php echo $menu_link ?>"
       ref="notification_bell"
       class="notification-link">
       <span data-balloon-pos="down" data-balloon="<?php _e( 'Messages', 'wbcom-essential' ); ?>">
            <i class="<?php echo esc_attr($messages_icon);?>"></i>
			<?php if ( $unread_message_count > 0 ): ?>
                <span class="count"><?php echo $unread_message_count; ?></span>
			<?php endif; ?>
        </span>
    </a>
    <section class="notification-dropdown">
        <header class="notification-header">
            <h2 class="title"><?php _e( 'Messages', 'wbcom-essential' ); ?></h2>
        </header>

        <ul class="notification-list">
            <p class="wbcom-essential-header-loader"><i class="wbcom-essential-icon-loader animate-spin"></i></p>
        </ul>

		<footer class="notification-footer">
			<a href="<?php echo $menu_link ?>" class="delete-all">
				<?php _e( 'View Inbox', 'wbcom-essential' ); ?>
				<i class="wbcom-essential-icon-angle-right"></i>
			</a>
		</footer>
    </section>
</div>