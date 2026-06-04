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
