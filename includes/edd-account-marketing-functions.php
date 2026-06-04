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
	if ( ! current_user_can( 'manage_shop_discounts' ) ) {
		return;
	}
	if (
		! isset( $_POST['wbcom_essential_discount_account_nonce'] )
		|| ! wp_verify_nonce( sanitize_key( wp_unslash( $_POST['wbcom_essential_discount_account_nonce'] ) ), 'wbcom_essential_discount_account' )
	) {
		return;
	}
	if ( ! empty( $_POST['wbcom_show_in_account'] ) ) {
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
			'posts_per_page' => 200,
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
