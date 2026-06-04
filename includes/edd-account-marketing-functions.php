<?php
/**
 * EDD account marketing features: offers, what's new, recommendations,
 * free-plugin claims. Companions to edd-account-dashboard-functions.php.
 *
 * @package WBCOM_Essential
 * @since   4.6.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get IDs of all published flat-price free downloads.
 *
 * Variable-priced products are excluded by design: a $0 variant on a paid
 * product is a pricing option, not a free product.
 *
 * @return int[]
 */
function wbcom_essential_edd_get_free_download_ids() {
	$ids = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 100,
			'fields'         => 'ids',
			'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				array(
					'key'     => 'edd_price',
					'value'   => array( '0', '0.00', '' ),
					'compare' => 'IN',
				),
			),
		)
	);

	// Server-side re-check: edd_is_free_download() is the source of truth.
	$ids = array_filter(
		array_map( 'absint', $ids ),
		static function ( $id ) {
			return edd_is_free_download( $id ) && ! edd_has_variable_prices( $id );
		}
	);

	/**
	 * Filter the free download IDs shown on the account Free Plugins tab.
	 *
	 * @since 4.6.0
	 * @param int[] $ids Download IDs.
	 */
	return apply_filters( 'wbcom_essential_edd_free_download_ids', array_values( $ids ) );
}

/**
 * Whether the current user owns (has purchased/claimed) a download.
 *
 * @param int $download_id Download ID.
 * @return bool
 */
function wbcom_essential_edd_user_owns_download( $download_id ) {
	$user_id = get_current_user_id();
	if ( ! $user_id ) {
		return false;
	}
	return (bool) edd_has_user_purchased( $user_id, array( absint( $download_id ) ) );
}

/**
 * Get the pro counterpart download ID for a download, or 0.
 *
 * @param int $download_id Download ID.
 * @return int
 */
function wbcom_essential_edd_get_pro_counterpart( $download_id ) {
	$pro_id = absint( get_post_meta( $download_id, '_wbcom_pro_counterpart', true ) );
	if ( ! $pro_id || 'publish' !== get_post_status( $pro_id ) ) {
		return 0;
	}
	return $pro_id;
}

/**
 * Render "Show in account dashboard" checkbox on the discount add/edit screens.
 *
 * @param int               $discount_id Discount ID (0 on the add screen).
 * @param EDD_Discount|null $discount    Discount object or null.
 */
function wbcom_essential_edd_discount_account_field( $discount_id = 0, $discount = null ) {
	$flagged = $discount_id ? (bool) edd_get_adjustment_meta( $discount_id, '_wbcom_show_in_account', true ) : false;
	wp_nonce_field( 'wbcom_essential_discount_account', 'wbcom_essential_discount_account_nonce' );
	?>
	<tr>
		<th scope="row" valign="top">
			<label for="wbcom-show-in-account"><?php esc_html_e( 'Account Dashboard', 'wbcom-essential' ); ?></label>
		</th>
		<td>
			<input type="checkbox" id="wbcom-show-in-account" name="wbcom_show_in_account" value="1" <?php checked( $flagged ); ?> />
			<label for="wbcom-show-in-account" class="description">
				<?php esc_html_e( 'Show this discount as a special offer on the customer account dashboard.', 'wbcom-essential' ); ?>
			</label>
		</td>
	</tr>
	<?php
}
add_action( 'edd_edit_discount_form_bottom', 'wbcom_essential_edd_discount_account_field', 10, 2 );
add_action( 'edd_add_discount_form_bottom', 'wbcom_essential_edd_discount_account_field', 10, 2 );

/**
 * Persist the flag when a discount is added/updated.
 *
 * @param array $args        Discount args.
 * @param int   $discount_id Discount ID.
 */
function wbcom_essential_edd_save_discount_account_flag( $args, $discount_id ) {
	if ( ! current_user_can( 'manage_shop_discounts' ) ) { // phpcs:ignore WordPress.WP.Capabilities.Unknown -- EDD shop capability.
		return;
	}
	if (
		! isset( $_POST['wbcom_essential_discount_account_nonce'] )
		|| ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wbcom_essential_discount_account_nonce'] ) ), 'wbcom_essential_discount_account' )
	) {
		return;
	}
	$flag_value = isset( $_POST['wbcom_show_in_account'] ) ? sanitize_text_field( wp_unslash( $_POST['wbcom_show_in_account'] ) ) : '';
	if ( ! empty( $flag_value ) ) {
		edd_update_adjustment_meta( $discount_id, '_wbcom_show_in_account', 1 );
	} else {
		edd_delete_adjustment_meta( $discount_id, '_wbcom_show_in_account' );
	}
}
add_action( 'edd_post_insert_discount', 'wbcom_essential_edd_save_discount_account_flag', 10, 2 );
add_action( 'edd_post_update_discount', 'wbcom_essential_edd_save_discount_account_flag', 10, 2 );

/**
 * Get active, flagged, still-usable discounts for the account banner.
 *
 * @return EDD_Discount[] Max 2.
 */
function wbcom_essential_edd_get_account_offers() {
	$discounts = edd_get_discounts(
		array(
			'status' => 'active',
			'number' => 20,
		)
	);
	if ( ! is_array( $discounts ) ) {
		return array();
	}

	$offers = array();
	foreach ( $discounts as $discount ) {
		if ( ! edd_get_adjustment_meta( $discount->id, '_wbcom_show_in_account', true ) ) {
			continue;
		}
		// Respect date window + max uses (EDD_Discount helpers).
		if ( method_exists( $discount, 'is_expired' ) && $discount->is_expired( false ) ) {
			continue;
		}
		if ( method_exists( $discount, 'is_maxed_out' ) && $discount->is_maxed_out( false ) ) {
			continue;
		}
		$offers[] = $discount;
		if ( count( $offers ) >= 2 ) {
			break;
		}
	}

	return $offers;
}

/**
 * Render "Pro counterpart" select in the Download Settings metabox.
 *
 * @param int $post_id Download post ID.
 */
function wbcom_essential_edd_render_pro_counterpart_row( $post_id ) {
	$current   = absint( get_post_meta( $post_id, '_wbcom_pro_counterpart', true ) );
	$downloads = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 200, // phpcs:ignore WordPress.WP.PostsPerPage.posts_per_page_posts_per_page -- Bounded admin select, loaded once per metabox.
			'orderby'        => 'title',
			'order'          => 'ASC',
			'exclude'        => array( $post_id ),
		)
	);
	?>
	<div class="edd-form-group edd-product-options-wrapper">
		<div class="edd-form-group__control">
			<label for="wbcom_pro_counterpart" class="edd-form-group__label">
				<?php esc_html_e( 'Pro Counterpart', 'wbcom-essential' ); ?>
			</label>
			<select name="_wbcom_pro_counterpart" id="wbcom_pro_counterpart" class="edd-form-group__input">
				<option value=""><?php esc_html_e( 'None', 'wbcom-essential' ); ?></option>
				<?php foreach ( $downloads as $download ) : ?>
					<option value="<?php echo esc_attr( $download->ID ); ?>" <?php selected( $current, $download->ID ); ?>>
						<?php echo esc_html( $download->post_title ); ?>
					</option>
				<?php endforeach; ?>
			</select>
			<p class="edd-form-group__help description">
				<?php esc_html_e( 'Used by the account dashboard to recommend the pro upgrade to owners of this product.', 'wbcom-essential' ); ?>
			</p>
		</div>
	</div>
	<?php
}
add_action( 'edd_meta_box_settings_fields', 'wbcom_essential_edd_render_pro_counterpart_row', 35 );

/**
 * Register the meta key with EDD's metabox save routine.
 *
 * @param array $fields Meta keys EDD persists on save.
 * @return array
 */
function wbcom_essential_edd_register_counterpart_save( $fields ) {
	$fields[] = '_wbcom_pro_counterpart';
	return $fields;
}
add_filter( 'edd_metabox_fields_save', 'wbcom_essential_edd_register_counterpart_save' );

/**
 * Sanitize the counterpart value on save (EDD applies edd_metabox_save_{key}).
 *
 * @param mixed $value Raw value.
 * @return int
 */
function wbcom_essential_edd_sanitize_counterpart( $value ) {
	return absint( $value );
}
add_filter( 'edd_metabox_save__wbcom_pro_counterpart', 'wbcom_essential_edd_sanitize_counterpart' );

/**
 * Render the special-offers banner (flagged active discounts).
 */
function wbcom_essential_edd_render_offers_section() {
	$offers = wbcom_essential_edd_get_account_offers();
	if ( empty( $offers ) ) {
		return;
	}
	$shop_url = home_url( '/products/' );
	/**
	 * Filter the "Shop now" URL on the account offers banner.
	 *
	 * @since 4.6.0
	 * @param string $shop_url URL.
	 */
	$shop_url = apply_filters( 'wbcom_essential_edd_offers_shop_url', $shop_url );
	?>
	<div class="wbcom-edd-offers">
		<?php foreach ( $offers as $offer ) : ?>
			<div class="wbcom-edd-offer">
				<div class="wbcom-edd-offer__badge" aria-hidden="true">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
				</div>
				<div class="wbcom-edd-offer__body">
					<strong class="wbcom-edd-offer__title"><?php echo esc_html( $offer->name ); ?></strong>
					<span class="wbcom-edd-offer__desc">
						<?php
						printf(
							/* translators: 1: formatted discount amount, 2: discount code. */
							esc_html__( 'Save %1$s with code %2$s', 'wbcom-essential' ),
							esc_html( edd_format_discount_rate( $offer->type, $offer->amount ) ),
							'<code>' . esc_html( $offer->code ) . '</code>' // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped inline above.
						);
						?>
					</span>
				</div>
				<div class="wbcom-edd-offer__actions">
					<button type="button" class="wbcom-edd-offer__copy" data-code="<?php echo esc_attr( $offer->code ); ?>" data-copied-label="<?php esc_attr_e( 'Copied!', 'wbcom-essential' ); ?>">
						<?php esc_html_e( 'Copy Code', 'wbcom-essential' ); ?>
					</button>
					<a class="wbcom-edd-offer__shop" href="<?php echo esc_url( $shop_url ); ?>"><?php esc_html_e( 'Shop Now', 'wbcom-essential' ); ?></a>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}

/**
 * Render the "What's New" row: latest downloads the user doesn't own (max 4).
 */
function wbcom_essential_edd_render_whats_new_section() {
	$recent = get_posts(
		array(
			'post_type'      => 'download',
			'post_status'    => 'publish',
			'posts_per_page' => 8,
			'orderby'        => 'date',
			'order'          => 'DESC',
		)
	);
	$cards = array();
	foreach ( $recent as $download ) {
		if ( wbcom_essential_edd_user_owns_download( $download->ID ) ) {
			continue;
		}
		$cards[] = $download;
		if ( count( $cards ) >= 4 ) {
			break;
		}
	}
	if ( empty( $cards ) ) {
		return;
	}
	?>
	<div class="wbcom-edd-dashboard__marketing-section wbcom-edd-whatsnew">
		<h3 class="wbcom-edd-dashboard__section-title"><?php esc_html_e( "What's New", 'wbcom-essential' ); ?></h3>
		<div class="wbcom-edd-card-row">
			<?php foreach ( $cards as $download ) : ?>
				<a class="wbcom-edd-mini-card" href="<?php echo esc_url( get_permalink( $download ) ); ?>">
					<?php if ( has_post_thumbnail( $download ) ) : ?>
						<span class="wbcom-edd-mini-card__thumb"><?php echo get_the_post_thumbnail( $download, 'medium' ); ?></span>
					<?php endif; ?>
					<span class="wbcom-edd-mini-card__title"><?php echo esc_html( get_the_title( $download ) ); ?></span>
					<span class="wbcom-edd-mini-card__price"><?php echo wp_kses_post( edd_price( $download->ID, false ) ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}

/**
 * Render "Recommended for You": pro upsells first, category-match fill. Max 4.
 *
 * @param EDD_Customer|false $customer EDD customer or false.
 */
function wbcom_essential_edd_render_recommendations_section( $customer = false ) {
	if ( ! $customer ) {
		return;
	}
	$owned  = array();
	$orders = edd_get_orders(
		array(
			'customer_id' => $customer->id,
			'status__in'  => array( 'complete', 'partially_refunded' ),
			'type'        => 'sale',
			'number'      => 100,
		)
	);
	foreach ( (array) $orders as $order ) {
		foreach ( $order->get_items() as $item ) {
			$owned[ (int) $item->product_id ] = true;
		}
	}
	if ( empty( $owned ) ) {
		return;
	}

	$recos = array();

	// Priority 1: pro counterparts of owned products that aren't owned.
	foreach ( array_keys( $owned ) as $owned_id ) {
		$pro_id = wbcom_essential_edd_get_pro_counterpart( $owned_id );
		if ( $pro_id && empty( $owned[ $pro_id ] ) && ! isset( $recos[ $pro_id ] ) ) {
			$recos[ $pro_id ] = 'upgrade';
		}
	}

	// Priority 2: category-match fill.
	if ( count( $recos ) < 4 ) {
		$terms = wp_get_object_terms( array_keys( $owned ), 'download_category', array( 'fields' => 'ids' ) );
		if ( ! is_wp_error( $terms ) && $terms ) {
			$fill = get_posts(
				array(
					'post_type'      => 'download',
					'post_status'    => 'publish',
					'posts_per_page' => 12,
					'post__not_in'   => array_merge( array_keys( $owned ), array_keys( $recos ) ), // phpcs:ignore WordPressVIPMinimum.Performance.WPQueryParams.PostNotIn_post__not_in
					'fields'         => 'ids',
					'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
						array(
							'taxonomy' => 'download_category',
							'terms'    => $terms,
						),
					),
				)
			);
			foreach ( $fill as $fill_id ) {
				if ( count( $recos ) >= 4 ) {
					break;
				}
				$recos[ $fill_id ] = 'related';
			}
		}
	}

	if ( empty( $recos ) ) {
		return;
	}
	?>
	<div class="wbcom-edd-dashboard__marketing-section wbcom-edd-recos">
		<h3 class="wbcom-edd-dashboard__section-title"><?php esc_html_e( 'Recommended for You', 'wbcom-essential' ); ?></h3>
		<div class="wbcom-edd-card-row">
			<?php foreach ( $recos as $reco_id => $reason ) : ?>
				<a class="wbcom-edd-mini-card<?php echo 'upgrade' === $reason ? ' wbcom-edd-mini-card--upgrade' : ''; ?>" href="<?php echo esc_url( get_permalink( $reco_id ) ); ?>">
					<?php if ( 'upgrade' === $reason ) : ?>
						<span class="wbcom-edd-mini-card__flag"><?php esc_html_e( 'Pro Upgrade', 'wbcom-essential' ); ?></span>
					<?php endif; ?>
					<?php if ( has_post_thumbnail( $reco_id ) ) : ?>
						<span class="wbcom-edd-mini-card__thumb"><?php echo get_the_post_thumbnail( $reco_id, 'medium' ); ?></span>
					<?php endif; ?>
					<span class="wbcom-edd-mini-card__title"><?php echo esc_html( get_the_title( $reco_id ) ); ?></span>
					<span class="wbcom-edd-mini-card__price"><?php echo wp_kses_post( edd_price( $reco_id, false ) ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}
