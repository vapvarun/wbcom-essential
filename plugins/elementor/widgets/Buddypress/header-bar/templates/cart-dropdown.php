<?php
$cart_icon = ( isset($settings['cart_icon']['value']) &&  $settings['cart_icon']['value'] != '') ? $settings['cart_icon']['value'] : 'wb-icon-shopping-cart';
?>

<div class="notification-wrap header-cart-link-wrap cart-wrap menu-item-has-children">
	<a href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="header-cart-link notification-link">
        <span data-balloon-pos="down" data-balloon="<?php _e( 'Cart', 'wbcom-essential' ); ?>">
			<i class="<?php echo esc_attr($cart_icon);?>"></i>
            <?php
            if ( is_object( WC()->cart ) ) {
             $wc_cart_count = wc()->cart->get_cart_contents_count();
             if( $wc_cart_count != 0 ) { ?>
                 <span class="count header-cart-count	"><?php echo wc()->cart->get_cart_contents_count(); ?></span>
             <?php }
            }
            ?>
        </span>
	</a>
    <section class="notification-dropdown">
        <header class="notification-header">
            <h2 class="title"><?php _e( 'Cart', 'wbcom-essential' ); ?></h2>
        </header>
        <div class="header-mini-cart widget_shopping_cart_content">
            <?php
            if ( is_object( WC()->cart ) ) {
	            woocommerce_mini_cart();
            }
            ?>
        </div>
    </section>
</div>