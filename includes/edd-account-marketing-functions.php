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
 * Get the best upgrade URL from an owned download to its pro counterpart.
 *
 * When the customer holds a license for the owned product and Software
 * Licensing defines an upgrade path to the target, this returns the native
 * SL upgrade URL (prorated checkout). Otherwise it falls back to the target
 * product page.
 *
 * @since 4.6.0
 *
 * @param int $owned_download_id  Download the current user already owns.
 * @param int $target_download_id Pro counterpart download.
 * @return string
 */
function wbcom_essential_edd_get_upgrade_url( $owned_download_id, $target_download_id ) {
	$fallback = (string) get_permalink( $target_download_id );

	if (
		! function_exists( 'edd_software_licensing' )
		|| ! function_exists( 'edd_sl_get_upgrade_paths' )
		|| ! function_exists( 'edd_sl_get_license_upgrade_url' )
		|| ! is_user_logged_in()
	) {
		return $fallback;
	}

	$customer = edd_get_customer_by( 'user_id', get_current_user_id() );
	if ( ! $customer ) {
		return $fallback;
	}

	$licenses = edd_software_licensing()->licenses_db->get_licenses(
		array(
			'customer_id' => $customer->id,
			'download_id' => absint( $owned_download_id ),
			'number'      => 1,
		)
	);
	if ( empty( $licenses[0]->ID ) || in_array( $licenses[0]->status, array( 'disabled', 'revoked' ), true ) ) {
		return $fallback;
	}

	foreach ( (array) edd_sl_get_upgrade_paths( absint( $owned_download_id ) ) as $upgrade_id => $path ) {
		if ( isset( $path['download_id'] ) && absint( $path['download_id'] ) === absint( $target_download_id ) ) {
			$upgrade_url = edd_sl_get_license_upgrade_url( $licenses[0]->ID, $upgrade_id );
			if ( $upgrade_url ) {
				return $upgrade_url;
			}
		}
	}

	return $fallback;
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
						// "20.00%" reads like a machine; customers read "20%".
						$offer_rate = preg_replace( '/\.0+(?=\D|$)/', '', edd_format_discount_rate( $offer->type, $offer->amount ) );
						printf(
							/* translators: 1: formatted discount amount, 2: discount code. */
							esc_html__( 'Save %1$s with code %2$s', 'wbcom-essential' ),
							esc_html( $offer_rate ),
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
	$cards  = array();
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

	$recos        = array();
	$upgrade_from = array();

	// Priority 1: pro counterparts of owned products that aren't owned.
	foreach ( array_keys( $owned ) as $owned_id ) {
		$pro_id = wbcom_essential_edd_get_pro_counterpart( $owned_id );
		if ( $pro_id && empty( $owned[ $pro_id ] ) && ! isset( $recos[ $pro_id ] ) ) {
			$recos[ $pro_id ]        = 'upgrade';
			$upgrade_from[ $pro_id ] = $owned_id;
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
				<?php
				// Upgrades enter EDD SL's native prorated upgrade flow when a
				// license + upgrade path exist; otherwise the product page.
				$reco_url = 'upgrade' === $reason && isset( $upgrade_from[ $reco_id ] )
					? wbcom_essential_edd_get_upgrade_url( $upgrade_from[ $reco_id ], $reco_id )
					: get_permalink( $reco_id );
				?>
				<a class="wbcom-edd-mini-card<?php echo 'upgrade' === $reason ? ' wbcom-edd-mini-card--upgrade' : ''; ?>" href="<?php echo esc_url( $reco_url ); ?>">
					<?php if ( 'upgrade' === $reason ) : ?>
						<span class="wbcom-edd-mini-card__flag"><?php esc_html_e( 'Pro Upgrade', 'wbcom-essential' ); ?></span>
					<?php endif; ?>
					<span class="wbcom-edd-mini-card__title"><?php echo esc_html( get_the_title( $reco_id ) ); ?></span>
					<span class="wbcom-edd-mini-card__price"><?php echo wp_kses_post( edd_price( $reco_id, false ) ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
	<?php
}

/**
 * Render the Free Plugins tab: claimable $0 downloads with pro upsell CTAs.
 *
 * @param EDD_Customer|false $customer EDD customer or false (unused; claims key off user).
 */
function wbcom_essential_edd_render_free_plugins_tab( $customer = false ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.Found -- Signature parity with sibling tab renderers.
	wbcom_essential_edd_tab_header(
		__( 'Free Plugins', 'wbcom-essential' ),
		__( 'Add free plugins to your library with one click - updates included.', 'wbcom-essential' )
	);

	$free_ids = wbcom_essential_edd_get_free_download_ids();
	if ( empty( $free_ids ) ) {
		wbcom_essential_edd_empty_state(
			'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
			__( 'No free plugins are available right now.', 'wbcom-essential' )
		);
		return;
	}
	?>
	<div class="wbcom-edd-free">
		<?php foreach ( $free_ids as $download_id ) : ?>
			<?php
			$owned  = wbcom_essential_edd_user_owns_download( $download_id );
			$pro_id = wbcom_essential_edd_get_pro_counterpart( $download_id );
			?>
			<div class="wbcom-edd-free__card" data-download-id="<?php echo esc_attr( $download_id ); ?>">
				<div class="wbcom-edd-free__body">
					<h3 class="wbcom-edd-free__title">
						<a href="<?php echo esc_url( get_permalink( $download_id ) ); ?>"><?php echo esc_html( get_the_title( $download_id ) ); ?></a>
					</h3>
					<p class="wbcom-edd-free__excerpt"><?php echo esc_html( get_the_excerpt( $download_id ) ); ?></p>
				</div>
				<div class="wbcom-edd-free__actions">
					<?php if ( $owned ) : ?>
						<span class="wbcom-edd-free__owned">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							<?php esc_html_e( 'In your library', 'wbcom-essential' ); ?>
						</span>
						<a class="wbcom-edd-free__goto" href="<?php echo esc_url( add_query_arg( 'tab', 'downloads' ) ); ?>" data-tab-link="downloads"><?php esc_html_e( 'View in Downloads', 'wbcom-essential' ); ?></a>
					<?php else : ?>
						<button type="button" class="wbcom-edd-free__claim" data-download-id="<?php echo esc_attr( $download_id ); ?>" data-busy-label="<?php esc_attr_e( 'Adding…', 'wbcom-essential' ); ?>">
							<?php esc_html_e( 'Download Free', 'wbcom-essential' ); ?>
						</button>
					<?php endif; ?>
					<?php if ( $pro_id && ! wbcom_essential_edd_user_owns_download( $pro_id ) ) : ?>
						<?php // Owned + upgrade path = SL's prorated upgrade flow; else product page. ?>
						<a class="wbcom-edd-free__upgrade" href="<?php echo esc_url( $owned ? wbcom_essential_edd_get_upgrade_url( $download_id, $pro_id ) : get_permalink( $pro_id ) ); ?>">
							<?php esc_html_e( 'Upgrade to Pro', 'wbcom-essential' ); ?>
						</a>
					<?php endif; ?>
				</div>
			</div>
		<?php endforeach; ?>
	</div>
	<?php
}

/**
 * Register the free-claim REST route.
 */
function wbcom_essential_edd_claim_rest_route() {
	if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
		return;
	}
	register_rest_route(
		'wbcom/v1',
		'/edd-account/claim-free',
		array(
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'wbcom_essential_edd_claim_free_callback',
			'permission_callback' => function () {
				return is_user_logged_in();
			},
			'args'                => array(
				'download_id' => array(
					'required'          => true,
					'type'              => 'integer',
					'sanitize_callback' => 'absint',
				),
			),
		)
	);
}
add_action( 'rest_api_init', 'wbcom_essential_edd_claim_rest_route' );

/**
 * Claim a free download: create a completed $0 order, return the file URL.
 *
 * Idempotent (re-claim returns the existing access) and rate-limited.
 *
 * @param WP_REST_Request $request Request.
 * @return WP_REST_Response|WP_Error
 */
function wbcom_essential_edd_claim_free_callback( $request ) {
	$download_id = absint( $request->get_param( 'download_id' ) );
	$user        = wp_get_current_user();

	// Server-side truth: must be a published, flat-price, genuinely free product.
	if (
		'download' !== get_post_type( $download_id )
		|| 'publish' !== get_post_status( $download_id )
		|| ! edd_is_free_download( $download_id )
		|| edd_has_variable_prices( $download_id )
	) {
		return new WP_Error( 'wbcom_invalid_download', __( 'This product cannot be claimed.', 'wbcom-essential' ), array( 'status' => 400 ) );
	}

	// Idempotency: already owned means no new order.
	if ( ! edd_has_user_purchased( $user->ID, array( $download_id ) ) ) {

		// Rate limit (filterable, default 10/hour/user).
		$limit_key = 'wbcom_free_claims_' . $user->ID;
		$claims    = (int) get_transient( $limit_key );
		/**
		 * Filter the max free claims per user per hour.
		 *
		 * @since 4.6.0
		 * @param int $max Max claims. Default 10.
		 */
		$max_claims = (int) apply_filters( 'wbcom_essential_edd_free_claim_limit', 10 );
		if ( $claims >= $max_claims ) {
			return new WP_Error( 'wbcom_claim_limit', __( 'Claim limit reached. Please try again later.', 'wbcom-essential' ), array( 'status' => 429 ) );
		}
		set_transient( $limit_key, $claims + 1, HOUR_IN_SECONDS );

		$payment_data = array(
			'price'        => 0.00,
			'date'         => gmdate( 'Y-m-d H:i:s' ),
			'user_email'   => $user->user_email,
			'purchase_key' => strtolower( md5( uniqid( '', true ) ) ),
			'currency'     => edd_get_currency(),
			'downloads'    => array(
				array(
					'id'       => $download_id,
					'options'  => array(),
					'quantity' => 1,
				),
			),
			'user_info'    => array(
				'id'         => $user->ID,
				'email'      => $user->user_email,
				'first_name' => $user->first_name,
				'last_name'  => $user->last_name,
				'discount'   => 'none',
				'address'    => array(),
			),
			'cart_details' => array(
				array(
					'name'        => get_the_title( $download_id ),
					'id'          => $download_id,
					'item_number' => array(
						'id'       => $download_id,
						'options'  => array(),
						'quantity' => 1,
					),
					'item_price'  => 0.00,
					'quantity'    => 1,
					'discount'    => 0.00,
					'subtotal'    => 0.00,
					'tax'         => 0.00,
					'price'       => 0.00,
				),
			),
			'gateway'      => 'manual',
			'status'       => 'pending',
		);

		$payment_id = edd_insert_payment( $payment_data );
		if ( ! $payment_id ) {
			return new WP_Error( 'wbcom_claim_failed', __( 'Could not record your claim. Please try again.', 'wbcom-essential' ), array( 'status' => 500 ) );
		}
		edd_update_payment_status( $payment_id, 'complete' );

		/**
		 * Fires after a free download is claimed from the account dashboard.
		 * CRM/automation (e.g. Groundhogg) can hook this for upsell campaigns.
		 *
		 * @since 4.6.0
		 * @param int $download_id Download ID.
		 * @param int $user_id     User ID.
		 * @param int $payment_id  Created order ID.
		 */
		do_action( 'wbcom_essential_free_claim', $download_id, $user->ID, $payment_id );
	}

	// Build a signed file URL from the user's most recent order containing this download.
	$download_url = '';
	$orders       = edd_get_orders(
		array(
			'user_id'    => $user->ID,
			'status__in' => array( 'complete' ),
			'type'       => 'sale',
			'number'     => 100,
		)
	);
	foreach ( (array) $orders as $order ) {
		foreach ( $order->get_items() as $item ) {
			if ( (int) $item->product_id === $download_id ) {
				$files = edd_get_download_files( $download_id );
				if ( $files ) {
					$filekey      = array_key_first( $files );
					$download_url = edd_get_download_file_url( $order->payment_key, $user->user_email, $filekey, $download_id );
				}
				break 2;
			}
		}
	}

	return rest_ensure_response(
		array(
			'claimed'      => true,
			'download_url' => $download_url,
			'message'      => __( 'Added to your library!', 'wbcom-essential' ),
		)
	);
}

