<?php
/**
 * EDD Account Dashboard — REST API routes and tab render functions.
 *
 * Block registration is handled by BlockRegistrar; this file provides
 * the server-side tab rendering and REST API endpoints.
 *
 * @package WBCOM_Essential
 * @since   4.5.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Sanitize HTML allowing form elements (input, select, textarea, button, form).
 *
 * wp_kses_post() strips form tags. This extends the post allowlist with
 * form elements required by the EDD profile editor.
 *
 * @param string $html Raw HTML.
 * @return string Sanitized HTML.
 */
function wbcom_essential_kses_form( $html ) {
	$allowed           = wp_kses_allowed_html( 'post' );
	$allowed['form']   = array( 'id' => true, 'class' => true, 'action' => true, 'method' => true, 'enctype' => true, 'novalidate' => true );
	$allowed['input']  = array( 'type' => true, 'id' => true, 'name' => true, 'value' => true, 'class' => true, 'placeholder' => true, 'required' => true, 'checked' => true, 'disabled' => true, 'readonly' => true, 'min' => true, 'max' => true, 'step' => true, 'maxlength' => true, 'autocomplete' => true, 'aria-label' => true );
	$allowed['select'] = array( 'id' => true, 'name' => true, 'class' => true, 'required' => true, 'disabled' => true, 'multiple' => true, 'aria-label' => true );
	$allowed['option'] = array( 'value' => true, 'selected' => true, 'disabled' => true );
	$allowed['optgroup'] = array( 'label' => true, 'disabled' => true );
	$allowed['textarea'] = array( 'id' => true, 'name' => true, 'class' => true, 'rows' => true, 'cols' => true, 'placeholder' => true, 'required' => true, 'disabled' => true, 'readonly' => true, 'maxlength' => true, 'aria-label' => true );
	$allowed['button'] = array( 'type' => true, 'id' => true, 'name' => true, 'class' => true, 'value' => true, 'disabled' => true, 'aria-label' => true );
	$allowed['label']  = array( 'for' => true, 'class' => true );
	$allowed['fieldset'] = array( 'class' => true, 'disabled' => true );
	$allowed['legend'] = array( 'class' => true );

	return wp_kses( $html, $allowed );
}

/**
 * Register REST API routes for EDD account tab content.
 */
function wbcom_essential_edd_account_rest_routes() {
	if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
		return;
	}

	register_rest_route(
		'wbcom/v1',
		'/edd-account/(?P<tab>[a-z-]+)',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'wbcom_essential_edd_account_tab_callback',
			'permission_callback' => function () {
				return is_user_logged_in();
			},
			'args'                => array(
				'tab' => array(
					'required'          => true,
					'validate_callback' => function ( $param ) {
						return in_array(
							$param,
							array( 'dashboard', 'subscriptions', 'downloads', 'licenses', 'purchases', 'profile' ),
							true
						);
					},
				),
			),
		)
	);

	// States endpoint for dynamic country/state dropdown.
	register_rest_route(
		'wbcom/v1',
		'/edd-account/states/(?P<country>[A-Z]{2})',
		array(
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'wbcom_essential_edd_get_states',
			'permission_callback' => function () {
				return is_user_logged_in();
			},
		)
	);
}
add_action( 'rest_api_init', 'wbcom_essential_edd_account_rest_routes' );

/**
 * REST callback: return states for a given country code.
 *
 * @param WP_REST_Request $request Request object.
 * @return WP_REST_Response
 */
function wbcom_essential_edd_get_states( $request ) {
	$country = sanitize_text_field( $request->get_param( 'country' ) );
	$states  = function_exists( 'edd_get_shop_states' ) ? edd_get_shop_states( $country ) : array();

	return new WP_REST_Response( $states, 200 );
}

/**
 * Handle EDD profile editor form submission — ensure billing address is saved.
 *
 * EDD's built-in edd_edit_user_profile handler may not process the billing
 * address fields from our custom form. This hook runs after EDD's handler
 * and explicitly updates the customer address.
 */
function wbcom_essential_edd_save_profile_address() {
	if ( ! isset( $_POST['edd_action'] ) || 'edit_user_profile' !== $_POST['edd_action'] ) {
		return;
	}
	if ( ! isset( $_POST['edd_profile_editor_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['edd_profile_editor_nonce'] ) ), 'edd-profile-editor-nonce' ) ) {
		return;
	}
	if ( ! is_user_logged_in() || ! function_exists( 'edd_get_customer_by' ) ) {
		return;
	}

	$customer = edd_get_customer_by( 'user_id', get_current_user_id() );
	if ( ! $customer ) {
		return;
	}

	$address_data = array(
		'address'     => isset( $_POST['card_address'] ) ? sanitize_text_field( wp_unslash( $_POST['card_address'] ) ) : '',
		'address2'    => isset( $_POST['card_address_2'] ) ? sanitize_text_field( wp_unslash( $_POST['card_address_2'] ) ) : '',
		'city'        => isset( $_POST['card_city'] ) ? sanitize_text_field( wp_unslash( $_POST['card_city'] ) ) : '',
		'postal_code' => isset( $_POST['card_zip'] ) ? sanitize_text_field( wp_unslash( $_POST['card_zip'] ) ) : '',
		'country'     => isset( $_POST['card_country'] ) ? sanitize_text_field( wp_unslash( $_POST['card_country'] ) ) : '',
		'region'      => isset( $_POST['card_state'] ) ? sanitize_text_field( wp_unslash( $_POST['card_state'] ) ) : '',
	);

	// Update the customer's primary address.
	if ( method_exists( $customer, 'add_address' ) ) {
		// EDD 3.x: use the customer address API.
		$existing = $customer->get_address();
		if ( $existing && ! empty( $existing->id ) ) {
			edd_update_customer_address( $existing->id, $address_data );
		} else {
			$address_data['customer_id'] = $customer->id;
			$address_data['is_primary']  = true;
			$address_data['type']        = 'billing';
			edd_add_customer_address( $address_data );
		}
	} else {
		// EDD 2.x fallback: store in customer meta.
		$customer->update_meta( 'address', array(
			'line1'   => $address_data['address'],
			'line2'   => $address_data['address2'],
			'city'    => $address_data['city'],
			'zip'     => $address_data['postal_code'],
			'country' => $address_data['country'],
			'state'   => $address_data['region'],
		) );
	}
}
add_action( 'init', 'wbcom_essential_edd_save_profile_address', 20 );

/**
 * REST callback: render the requested tab as HTML.
 *
 * @param WP_REST_Request $request Full request object.
 * @return WP_REST_Response
 */
function wbcom_essential_edd_account_tab_callback( $request ) {
	$tab = $request->get_param( 'tab' );

	// Temporarily override REQUEST_URI and $wp->request so that
	// add_query_arg() and edd_get_current_page_url() calls inside EDD
	// shortcodes generate front-end page URLs instead of REST API URLs.
	global $wp;
	$original_request_uri = isset( $_SERVER['REQUEST_URI'] ) ? $_SERVER['REQUEST_URI'] : '';
	$original_wp_request  = $wp->request;
	$referer_url          = wp_get_referer();

	// Validate referer belongs to this site before trusting it.
	if ( $referer_url ) {
		$referer_host = wp_parse_url( $referer_url, PHP_URL_HOST );
		$site_host    = wp_parse_url( home_url(), PHP_URL_HOST );
		if ( $referer_host !== $site_host ) {
			$referer_url = null;
		}
	}

	if ( $referer_url ) {
		$parsed = wp_parse_url( $referer_url );
		if ( ! empty( $parsed['path'] ) ) {
			$front_path             = $parsed['path'] . ( ! empty( $parsed['query'] ) ? '?' . $parsed['query'] : '' );
			$_SERVER['REQUEST_URI'] = $front_path;
			$wp->request            = ltrim( $parsed['path'], '/' );
		}
	}

	// Filter edd_get_current_page_url to return the referer (front-end page).
	$edd_url_filter = null;
	if ( $referer_url ) {
		$edd_url_filter = function () use ( $referer_url ) {
			return $referer_url;
		};
		add_filter( 'edd_get_current_page_url', $edd_url_filter, 99 );
	}

	// Fetch customer once, pass to all render functions to avoid repeated queries.
	$user     = wp_get_current_user();
	$customer = edd_get_customer_by( 'user_id', $user->ID );

	// Use try/catch/finally for error recovery and guaranteed global restore.
	$html = '';
	try {
		ob_start();

		switch ( $tab ) {
			case 'dashboard':
				wbcom_essential_edd_render_dashboard_tab( $customer );
				break;
			case 'subscriptions':
				wbcom_essential_edd_render_subscriptions_tab( $customer );
				break;
			case 'downloads':
				wbcom_essential_edd_render_downloads_tab( $customer );
				break;
			case 'licenses':
				wbcom_essential_edd_render_licenses_tab( $customer );
				break;
			case 'purchases':
				wbcom_essential_edd_render_purchases_tab( $customer );
				break;
			case 'profile':
				wbcom_essential_edd_render_profile_tab();
				break;
		}

		$html = ob_get_clean();
	} catch ( \Throwable $e ) { // phpcs:ignore Generic.CodeAnalysis.EmptyStatement.DetectedCatch
		ob_end_clean();
		$html = '<p class="wbcom-edd-account__error">' . esc_html__( 'An error occurred loading this tab. Please try again.', 'wbcom-essential' ) . '</p>';
	} finally {
		// Restore originals.
		$_SERVER['REQUEST_URI'] = $original_request_uri;
		$wp->request            = $original_wp_request;
		if ( $edd_url_filter ) {
			remove_filter( 'edd_get_current_page_url', $edd_url_filter, 99 );
		}
	}

	return rest_ensure_response( array( 'html' => wbcom_essential_kses_form( $html ) ) );
}

/**
 * Render Dashboard overview tab.
 *
 * @param EDD_Customer|false $customer EDD customer object or false.
 */
function wbcom_essential_edd_render_dashboard_tab( $customer = false ) {
	$user = wp_get_current_user();

	$order_count = $customer ? $customer->purchase_count : 0;
	$total_value = $customer ? (float) $customer->purchase_value : 0.0;
	$total_spent = edd_currency_filter( edd_format_amount( $total_value ) );

	// License count via Software Licensing add-on.
	$license_count = 0;
	if ( function_exists( 'edd_software_licensing' ) && $customer ) {
		$licenses = edd_software_licensing()->licenses_db->get_licenses(
			array(
				'customer_id' => $customer->id,
				'number'      => -1,
			)
		);
		$license_count = is_array( $licenses ) ? count( $licenses ) : 0;
	}

	// Active subscription count via EDD Recurring add-on.
	$sub_count = 0;
	if ( class_exists( 'EDD_Recurring' ) && $customer ) {
		$subs_db   = new EDD_Subscriptions_DB();
		$subs      = $subs_db->get_subscriptions(
			array(
				'customer_id' => $customer->id,
				'status'      => 'active',
			)
		);
		$sub_count = is_array( $subs ) ? count( $subs ) : 0;
	}
	?>
	<div class="wbcom-edd-dashboard">
		<h2 class="wbcom-edd-dashboard__greeting">
			<?php
			printf(
				/* translators: %s: User's first name or display name. */
				esc_html__( 'Welcome back, %s!', 'wbcom-essential' ),
				esc_html( $user->first_name ? $user->first_name : $user->display_name )
			);
			?>
		</h2>

		<div class="wbcom-edd-dashboard__stats">
			<div class="wbcom-edd-dashboard__stat-card">
				<span class="wbcom-edd-dashboard__stat-number"><?php echo esc_html( $order_count ); ?></span>
				<span class="wbcom-edd-dashboard__stat-label"><?php esc_html_e( 'Total Orders', 'wbcom-essential' ); ?></span>
			</div>
			<div class="wbcom-edd-dashboard__stat-card">
				<span class="wbcom-edd-dashboard__stat-number"><?php echo wp_kses_post( $total_spent ); ?></span>
				<span class="wbcom-edd-dashboard__stat-label"><?php esc_html_e( 'Total Spent', 'wbcom-essential' ); ?></span>
			</div>
			<?php if ( function_exists( 'edd_software_licensing' ) ) : ?>
			<div class="wbcom-edd-dashboard__stat-card">
				<span class="wbcom-edd-dashboard__stat-number"><?php echo esc_html( $license_count ); ?></span>
				<span class="wbcom-edd-dashboard__stat-label"><?php esc_html_e( 'Active Licenses', 'wbcom-essential' ); ?></span>
			</div>
			<?php endif; ?>
			<?php if ( class_exists( 'EDD_Recurring' ) ) : ?>
			<div class="wbcom-edd-dashboard__stat-card">
				<span class="wbcom-edd-dashboard__stat-number"><?php echo esc_html( $sub_count ); ?></span>
				<span class="wbcom-edd-dashboard__stat-label"><?php esc_html_e( 'Active Subscriptions', 'wbcom-essential' ); ?></span>
			</div>
			<?php endif; ?>
		</div>

		<?php if ( $customer ) : ?>
			<?php
			$recent_orders = edd_get_orders(
				array(
					'customer_id' => $customer->id,
					'number'      => 3,
					'status'      => array( 'complete', 'partially_refunded' ),
					'orderby'     => 'date_created',
					'order'       => 'DESC',
				)
			);
			if ( is_wp_error( $recent_orders ) || ! is_array( $recent_orders ) ) {
				$recent_orders = array();
			}
			?>
			<?php if ( ! empty( $recent_orders ) ) : ?>
			<div class="wbcom-edd-dashboard__recent">
				<h3 class="wbcom-edd-dashboard__section-title"><?php esc_html_e( 'Recent Orders', 'wbcom-essential' ); ?></h3>
				<table class="wbcom-edd-dashboard__table">
					<thead>
						<tr>
							<th><?php esc_html_e( 'Order', 'wbcom-essential' ); ?></th>
							<th><?php esc_html_e( 'Date', 'wbcom-essential' ); ?></th>
							<th><?php esc_html_e( 'Amount', 'wbcom-essential' ); ?></th>
							<th><?php esc_html_e( 'Status', 'wbcom-essential' ); ?></th>
						</tr>
					</thead>
					<tbody>
						<?php foreach ( $recent_orders as $order ) : ?>
						<tr>
							<td>#<?php echo esc_html( $order->get_number() ); ?></td>
							<td><?php echo esc_html( edd_date_i18n( $order->date_created ) ); ?></td>
							<td><?php echo esc_html( edd_display_amount( $order->total, $order->currency ) ); ?></td>
							<td>
								<span class="wbcom-edd-status wbcom-edd-status--<?php echo esc_attr( $order->status ); ?>">
									<?php echo esc_html( edd_get_status_label( $order->status ) ); ?>
								</span>
							</td>
						</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
			<?php endif; ?>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * Output a tab section header with title and optional description.
 *
 * @param string $title       Section title.
 * @param string $description Optional short description.
 */
function wbcom_essential_edd_tab_header( $title, $description = '' ) {
	?>
	<div class="wbcom-edd-tab-header">
		<h2 class="wbcom-edd-tab-header__title"><?php echo esc_html( $title ); ?></h2>
		<?php if ( $description ) : ?>
			<p class="wbcom-edd-tab-header__description"><?php echo esc_html( $description ); ?></p>
		<?php endif; ?>
	</div>
	<?php
}

/**
 * Render Subscriptions tab with premium card layout.
 *
 * @param EDD_Customer|false $customer EDD customer object or false.
 */
function wbcom_essential_edd_render_subscriptions_tab( $customer = false ) {
	wbcom_essential_edd_tab_header(
		__( 'Subscriptions', 'wbcom-essential' ),
		__( 'Manage your active and past subscriptions.', 'wbcom-essential' )
	);

	if ( ! class_exists( 'EDD_Recurring' ) || ! $customer ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No subscriptions found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	$subs_db = new EDD_Subscriptions_DB();
	$subs    = $subs_db->get_subscriptions(
		array(
			'customer_id' => $customer->id,
			'number'      => 100,
		)
	);
	if ( ! is_array( $subs ) ) {
		$subs = array();
	}

	if ( empty( $subs ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No subscriptions found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	// Prime post caches to avoid N+1 queries in the loop.
	$download_ids = wp_list_pluck( $subs, 'product_id' );
	_prime_post_caches( array_unique( array_filter( $download_ids ) ), true, true );

	echo '<div class="wbcom-edd-subs">';

	foreach ( $subs as $sub ) {
		$download  = edd_get_download( $sub->product_id );
		$name      = $download ? $download->get_name() : __( 'Unknown Product', 'wbcom-essential' );
		$price_id  = $sub->price_id;
		$status    = $sub->status;
		$amount    = edd_currency_filter( edd_format_amount( $sub->recurring_amount ) );
		$period    = ucfirst( $sub->period );
		$created   = $sub->created;
		$expiry    = $sub->expiration;

		// Price name (e.g. "Personal License").
		$price_name = '';
		if ( false !== $price_id && $download && edd_has_variable_prices( $download->ID ) ) {
			$price_name = edd_get_price_option_name( $download->ID, $price_id );
		}

		// Days until renewal.
		$days_left  = '';
		$urgency    = '';
		if ( 'active' === $status && $expiry ) {
			$diff = ( strtotime( $expiry ) - time() ) / DAY_IN_SECONDS;
			if ( $diff > 0 ) {
				$days_left = (int) ceil( $diff );
				if ( $days_left <= 7 ) {
					$urgency = 'critical';
				} elseif ( $days_left <= 30 ) {
					$urgency = 'warning';
				}
			}
		}

		// Cancel URL.
		$cancel_url = '';
		if ( 'active' === $status ) {
			$cancel_url = wp_nonce_url(
				add_query_arg(
					array(
						'edd_action' => 'cancel_subscription',
						'sub_id'     => $sub->id,
					)
				),
				'edd-recurring-cancel'
			);
		}

		// Upgrade options.
		$has_upgrades = false;
		if ( function_exists( 'edd_sl_get_license_upgrades' ) && $download ) {
			$upgrades = edd_sl_get_license_upgrades( $download->ID );
			$has_upgrades = ! empty( $upgrades );
		}

		?>
		<div class="wbcom-edd-subs__card">
			<div class="wbcom-edd-subs__header">
				<div class="wbcom-edd-subs__product">
					<h3 class="wbcom-edd-subs__name"><?php echo esc_html( $name ); ?></h3>
					<?php if ( $price_name ) : ?>
						<span class="wbcom-edd-subs__plan"><?php echo esc_html( $price_name ); ?></span>
					<?php endif; ?>
				</div>
				<span class="wbcom-edd-status wbcom-edd-status--<?php echo esc_attr( $status ); ?>">
					<?php echo esc_html( ucfirst( $status ) ); ?>
				</span>
			</div>

			<div class="wbcom-edd-subs__details">
				<div class="wbcom-edd-subs__detail">
					<span class="wbcom-edd-subs__detail-label"><?php esc_html_e( 'Amount', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-subs__detail-value"><?php echo wp_kses_post( $amount ); ?> / <?php echo esc_html( $period ); ?></span>
				</div>
				<div class="wbcom-edd-subs__detail">
					<span class="wbcom-edd-subs__detail-label"><?php esc_html_e( 'Started', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-subs__detail-value"><?php echo esc_html( date_i18n( get_option( 'date_format' ), strtotime( $created ) ) ); ?></span>
				</div>
				<?php if ( $expiry && 'active' === $status ) : ?>
				<div class="wbcom-edd-subs__detail">
					<span class="wbcom-edd-subs__detail-label"><?php esc_html_e( 'Next Renewal', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-subs__detail-value">
						<?php echo esc_html( date_i18n( get_option( 'date_format' ), strtotime( $expiry ) ) ); ?>
						<?php if ( $days_left ) : ?>
							<span class="wbcom-edd-subs__countdown wbcom-edd-subs__countdown--<?php echo esc_attr( $urgency ); ?>">
								<?php
								printf(
									/* translators: %d: Number of days. */
									esc_html( _n( '%d day left', '%d days left', $days_left, 'wbcom-essential' ) ),
									$days_left
								);
								?>
							</span>
						<?php endif; ?>
					</span>
				</div>
				<?php endif; ?>
				<div class="wbcom-edd-subs__detail">
					<span class="wbcom-edd-subs__detail-label"><?php esc_html_e( 'Times Billed', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-subs__detail-value">
						<?php
						echo esc_html( $sub->get_times_billed() . ' / ' );
						echo $sub->bill_times > 0
							? esc_html( $sub->bill_times )
							: esc_html__( 'Until cancelled', 'wbcom-essential' );
						?>
					</span>
				</div>
			</div>

			<div class="wbcom-edd-subs__actions">
				<?php if ( $has_upgrades ) : ?>
					<a href="<?php echo esc_url( get_permalink( $download->ID ) ); ?>" class="wbcom-edd-btn wbcom-edd-btn--primary wbcom-edd-btn--sm">
						<?php esc_html_e( 'Upgrade Plan', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
				<?php if ( $cancel_url ) : ?>
					<a href="<?php echo esc_url( $cancel_url ); ?>"
						class="wbcom-edd-btn wbcom-edd-btn--danger-outline wbcom-edd-btn--sm"
						data-confirm="<?php esc_attr_e( 'Are you sure you want to cancel this subscription? You will lose access at the end of your current billing period.', 'wbcom-essential' ); ?>">
						<?php esc_html_e( 'Cancel', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	echo '</div>';
}

/**
 * Render Downloads tab with premium card layout.
 *
 * @param EDD_Customer|false $customer EDD customer object or false.
 */
function wbcom_essential_edd_render_downloads_tab( $customer = false ) {
	wbcom_essential_edd_tab_header(
		__( 'Downloads', 'wbcom-essential' ),
		__( 'Access and download the files from your purchases.', 'wbcom-essential' )
	);

	if ( ! $customer ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No downloads found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	$orders = edd_get_orders(
		array(
			'customer_id' => $customer->id,
			'number'      => 50,
			'status'      => array( 'complete', 'partially_refunded' ),
			'orderby'     => 'date_created',
			'order'       => 'DESC',
		)
	);
	if ( is_wp_error( $orders ) || ! is_array( $orders ) ) {
		$orders = array();
	}

	if ( empty( $orders ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No downloads found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	// Collect all downloadable items grouped by product.
	$products = array();
	foreach ( $orders as $order ) {
		$order_items = $order->get_items();
		if ( empty( $order_items ) ) {
			continue;
		}
		foreach ( $order_items as $item ) {
			$download = edd_get_download( $item->product_id );
			if ( ! $download ) {
				continue;
			}

			$price_id   = $item->price_id;
			$product_key = $item->product_id . '_' . $price_id;

			// Skip if already processed this product+price combo.
			if ( isset( $products[ $product_key ] ) ) {
				continue;
			}

			$files = edd_get_download_files( $item->product_id, $price_id );
			if ( empty( $files ) ) {
				continue;
			}

			$price_name = '';
			if ( edd_has_variable_prices( $item->product_id ) && false !== $price_id ) {
				$price_name = edd_get_price_option_name( $item->product_id, $price_id );
			}

			$download_links = array();
			foreach ( $files as $filekey => $file ) {
				$url = edd_get_download_file_url( $order->payment_key, $order->email, $filekey, $item->product_id, $price_id );
				$download_links[] = array(
					'name' => esc_html( $file['name'] ),
					'url'  => $url,
				);
			}

			$products[ $product_key ] = array(
				'name'       => $download->get_name(),
				'price_name' => $price_name,
				'image'      => get_the_post_thumbnail_url( $item->product_id, 'thumbnail' ),
				'files'      => $download_links,
				'order_date' => $order->date_created,
			);
		}
	}

	if ( empty( $products ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No downloadable files found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	echo '<div class="wbcom-edd-downloads">';

	foreach ( $products as $product ) {
		?>
		<div class="wbcom-edd-dl-card">
			<div class="wbcom-edd-dl-card__header">
				<?php if ( $product['image'] ) : ?>
					<img class="wbcom-edd-dl-card__thumb" src="<?php echo esc_url( $product['image'] ); ?>" alt="" width="48" height="48" loading="lazy">
				<?php else : ?>
					<div class="wbcom-edd-dl-card__thumb wbcom-edd-dl-card__thumb--placeholder">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
					</div>
				<?php endif; ?>
				<div class="wbcom-edd-dl-card__info">
					<h3 class="wbcom-edd-dl-card__name"><?php echo esc_html( $product['name'] ); ?></h3>
					<?php if ( $product['price_name'] ) : ?>
						<span class="wbcom-edd-dl-card__plan"><?php echo esc_html( $product['price_name'] ); ?></span>
					<?php endif; ?>
				</div>
				<span class="wbcom-edd-dl-card__date">
					<?php echo esc_html( date_i18n( get_option( 'date_format' ), strtotime( $product['order_date'] ) ) ); ?>
				</span>
			</div>
			<div class="wbcom-edd-dl-card__files">
				<?php foreach ( $product['files'] as $file ) : ?>
					<a href="<?php echo esc_url( $file['url'] ); ?>" class="wbcom-edd-dl-card__file" download>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
						<span class="wbcom-edd-dl-card__filename"><?php echo esc_html( $file['name'] ); ?></span>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
		<?php
	}

	echo '</div>';
}

/**
 * Render Licenses tab with premium card layout.
 *
 * @param EDD_Customer|false $customer EDD customer object or false.
 */
function wbcom_essential_edd_render_licenses_tab( $customer = false ) {
	wbcom_essential_edd_tab_header(
		__( 'License Keys', 'wbcom-essential' ),
		__( 'View and manage your license keys and activations.', 'wbcom-essential' )
	);

	if ( ! function_exists( 'edd_software_licensing' ) || ! $customer ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No licenses found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	$sl = edd_software_licensing();
	if ( ! $sl || ! isset( $sl->licenses_db ) || ! is_object( $sl->licenses_db ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No licenses found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	$licenses = $sl->licenses_db->get_licenses(
		array(
			'customer_id' => $customer->id,
			'number'      => 100,
		)
	);

	if ( empty( $licenses ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No licenses found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	// Prime post caches to avoid N+1 queries in the loop.
	$download_ids = wp_list_pluck( $licenses, 'download_id' );
	_prime_post_caches( array_unique( array_filter( $download_ids ) ), true, true );

	echo '<div class="wbcom-edd-licenses">';

	foreach ( $licenses as $license ) {
		$download   = edd_get_download( $license->download_id );
		$name       = $download ? $download->get_name() : __( 'Unknown Product', 'wbcom-essential' );
		$key        = $license->key;
		$status     = $license->status;
		$expiry     = $license->expiration;
		$is_lifetime = $license->is_lifetime;
		$limit      = $license->activation_limit;
		$count      = $license->activation_count;

		// Price name.
		$price_name = '';
		if ( $license->price_id && $download && edd_has_variable_prices( $download->ID ) ) {
			$price_name = edd_get_price_option_name( $download->ID, $license->price_id );
		}

		// Expiry info.
		$expiry_text = '';
		$days_left   = 0;
		$urgency     = '';
		if ( $is_lifetime ) {
			$expiry_text = __( 'Lifetime', 'wbcom-essential' );
		} elseif ( $expiry ) {
			$expiry_text = date_i18n( get_option( 'date_format' ), $expiry );
			$diff        = ( $expiry - time() ) / DAY_IN_SECONDS;
			if ( $diff > 0 ) {
				$days_left = (int) ceil( $diff );
				if ( $days_left <= 7 ) {
					$urgency = 'critical';
				} elseif ( $days_left <= 30 ) {
					$urgency = 'warning';
				}
			}
		}

		// Activation percentage for progress bar.
		$activation_pct = 0;
		if ( $limit > 0 ) {
			$activation_pct = min( 100, round( ( $count / $limit ) * 100 ) );
		}

		// Upgrade check.
		$has_upgrades = false;
		$upgrade_url  = '';
		if ( function_exists( 'edd_sl_get_license_upgrades' ) && $download ) {
			$upgrades     = edd_sl_get_license_upgrades( $download->ID );
			$has_upgrades = ! empty( $upgrades );
			if ( $has_upgrades ) {
				$upgrade_url = add_query_arg(
					array(
						'view'       => 'upgrades',
						'license_id' => $license->ID,
						'action'     => 'manage_licenses',
						'payment_id' => $license->payment_id,
					),
					edd_get_option( 'purchase_history_page' ) ? get_permalink( edd_get_option( 'purchase_history_page' ) ) : home_url()
				);
			}
		}

		?>
		<div class="wbcom-edd-license">
			<div class="wbcom-edd-license__header">
				<div class="wbcom-edd-license__product">
					<h3 class="wbcom-edd-license__name"><?php echo esc_html( $name ); ?></h3>
					<?php if ( $price_name ) : ?>
						<span class="wbcom-edd-license__plan"><?php echo esc_html( $price_name ); ?></span>
					<?php endif; ?>
				</div>
				<span class="wbcom-edd-status wbcom-edd-status--<?php echo esc_attr( $status ); ?>">
					<?php echo esc_html( ucfirst( $status ) ); ?>
				</span>
			</div>

			<div class="wbcom-edd-license__key-row">
				<label class="wbcom-edd-license__key-label"><?php esc_html_e( 'License Key', 'wbcom-essential' ); ?></label>
				<div class="wbcom-edd-license__key-wrap">
					<code class="wbcom-edd-license__key-value"><?php echo esc_html( $key ); ?></code>
					<button type="button" class="wbcom-edd-license__copy-btn" data-copy="<?php echo esc_attr( $key ); ?>" title="<?php esc_attr_e( 'Copy to clipboard', 'wbcom-essential' ); ?>">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
						<span><?php esc_html_e( 'Copy', 'wbcom-essential' ); ?></span>
					</button>
				</div>
			</div>

			<div class="wbcom-edd-license__details">
				<div class="wbcom-edd-license__detail">
					<span class="wbcom-edd-license__detail-label"><?php esc_html_e( 'Expires', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-license__detail-value">
						<?php echo esc_html( $expiry_text ); ?>
						<?php if ( $days_left && $urgency ) : ?>
							<span class="wbcom-edd-subs__countdown wbcom-edd-subs__countdown--<?php echo esc_attr( $urgency ); ?>">
								<?php
								printf(
									/* translators: %d: Number of days. */
									esc_html( _n( '%d day left', '%d days left', $days_left, 'wbcom-essential' ) ),
									$days_left
								);
								?>
							</span>
						<?php endif; ?>
					</span>
				</div>
				<div class="wbcom-edd-license__detail">
					<span class="wbcom-edd-license__detail-label"><?php esc_html_e( 'Activations', 'wbcom-essential' ); ?></span>
					<span class="wbcom-edd-license__detail-value">
						<?php
						echo esc_html( $count );
						echo ' / ';
						echo $limit > 0 ? esc_html( $limit ) : esc_html__( 'Unlimited', 'wbcom-essential' );
						?>
					</span>
				</div>
				<?php if ( $limit > 0 ) : ?>
				<div class="wbcom-edd-license__detail wbcom-edd-license__detail--full">
					<div class="wbcom-edd-license__progress">
						<div class="wbcom-edd-license__progress-bar" style="width: <?php echo esc_attr( $activation_pct ); ?>%;"></div>
					</div>
				</div>
				<?php endif; ?>
			</div>

			<div class="wbcom-edd-license__actions">
				<?php if ( $has_upgrades && $upgrade_url ) : ?>
					<a href="<?php echo esc_url( $upgrade_url ); ?>" class="wbcom-edd-btn wbcom-edd-btn--primary wbcom-edd-btn--sm">
						<?php esc_html_e( 'Upgrade License', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
				<?php if ( 'expired' === $status && $download ) : ?>
					<a href="<?php echo esc_url( get_permalink( $download->ID ) ); ?>" class="wbcom-edd-btn wbcom-edd-btn--primary wbcom-edd-btn--sm">
						<?php esc_html_e( 'Renew License', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	echo '</div>';
}

/**
 * Render Purchases/Order History tab with premium card layout.
 *
 * @param EDD_Customer|false $customer EDD customer object or false.
 */
function wbcom_essential_edd_render_purchases_tab( $customer = false ) {
	wbcom_essential_edd_tab_header(
		__( 'Order History', 'wbcom-essential' ),
		__( 'View your complete purchase history and order details.', 'wbcom-essential' )
	);

	if ( ! $customer ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No orders found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	$orders = edd_get_orders(
		array(
			'customer_id' => $customer->id,
			'number'      => 20,
			'orderby'     => 'date_created',
			'order'       => 'DESC',
		)
	);
	if ( is_wp_error( $orders ) || ! is_array( $orders ) ) {
		$orders = array();
	}

	if ( empty( $orders ) ) {
		echo '<p class="wbcom-edd-empty">' . esc_html__( 'No orders found.', 'wbcom-essential' ) . '</p>';
		return;
	}

	echo '<div class="wbcom-edd-orders">';

	foreach ( $orders as $order ) {
		$items = $order->get_items();
		if ( ! is_array( $items ) ) {
			$items = array();
		}
		$item_count = count( $items );
		$receipt_url = edd_get_receipt_page_uri( $order->id );
		$status      = $order->status;
		$total       = edd_display_amount( $order->total, $order->currency );

		// Invoice URL (if EDD Invoices active).
		$invoice_url = '';
		if ( function_exists( 'edd_invoices' ) ) {
			$invoice_url = add_query_arg(
				array(
					'edd_action' => 'view_invoice',
					'payment_id' => $order->id,
					'invoice'    => $order->payment_key,
				),
				home_url()
			);
		}

		// Get first item name for display.
		$primary_name = '';
		if ( ! empty( $items ) ) {
			$first_download = edd_get_download( $items[0]->product_id );
			$primary_name   = $first_download ? $first_download->get_name() : '';
			if ( edd_has_variable_prices( $items[0]->product_id ) && false !== $items[0]->price_id ) {
				$price_label = edd_get_price_option_name( $items[0]->product_id, $items[0]->price_id );
				if ( $price_label ) {
					$primary_name .= ' — ' . $price_label;
				}
			}
		}

		?>
		<div class="wbcom-edd-order">
			<div class="wbcom-edd-order__row">
				<div class="wbcom-edd-order__main">
					<div class="wbcom-edd-order__id">
						<?php
						printf(
							/* translators: %s: Order number. */
							esc_html__( 'Order #%s', 'wbcom-essential' ),
							esc_html( $order->get_number() )
						);
						?>
					</div>
					<div class="wbcom-edd-order__product">
						<?php echo esc_html( $primary_name ); ?>
						<?php if ( $item_count > 1 ) : ?>
							<span class="wbcom-edd-order__more">
								<?php
								printf(
									/* translators: %d: Number of additional items. */
									esc_html( _n( '+%d more item', '+%d more items', $item_count - 1, 'wbcom-essential' ) ),
									$item_count - 1
								);
								?>
							</span>
						<?php endif; ?>
					</div>
				</div>
				<div class="wbcom-edd-order__meta">
					<span class="wbcom-edd-order__date"><?php echo esc_html( edd_date_i18n( $order->date_created ) ); ?></span>
					<span class="wbcom-edd-order__amount"><?php echo esc_html( $total ); ?></span>
					<span class="wbcom-edd-status wbcom-edd-status--<?php echo esc_attr( $status ); ?>">
						<?php echo esc_html( edd_get_status_label( $status ) ); ?>
					</span>
				</div>
			</div>
			<div class="wbcom-edd-order__actions">
				<a href="<?php echo esc_url( $receipt_url ); ?>" class="wbcom-edd-btn wbcom-edd-btn--outline wbcom-edd-btn--sm">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
					<?php esc_html_e( 'View Receipt', 'wbcom-essential' ); ?>
				</a>
				<?php if ( $invoice_url ) : ?>
					<a href="<?php echo esc_url( $invoice_url ); ?>" class="wbcom-edd-btn wbcom-edd-btn--outline wbcom-edd-btn--sm" target="_blank" rel="noopener">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/></svg>
						<?php esc_html_e( 'Invoice', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
				<?php if ( function_exists( 'edd_software_licensing' ) ) : ?>
					<a href="<?php echo esc_url( add_query_arg( array( 'action' => 'manage_licenses', 'payment_id' => $order->id ), edd_get_option( 'purchase_history_page' ) ? get_permalink( edd_get_option( 'purchase_history_page' ) ) : home_url() ) ); ?>" class="wbcom-edd-btn wbcom-edd-btn--outline wbcom-edd-btn--sm">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
						<?php esc_html_e( 'Licenses', 'wbcom-essential' ); ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	echo '</div>';
}

/**
 * Render Profile / Edit Account tab with premium layout.
 */
function wbcom_essential_edd_render_profile_tab() {
	wbcom_essential_edd_tab_header(
		__( 'Edit Profile', 'wbcom-essential' ),
		__( 'Update your account information and preferences.', 'wbcom-essential' )
	);

	$user = wp_get_current_user();

	// Billing address from EDD customer meta.
	$customer = edd_get_customer_by( 'user_id', $user->ID );
	$address  = array(
		'line1'   => '',
		'line2'   => '',
		'city'    => '',
		'zip'     => '',
		'country' => '',
		'state'   => '',
	);
	if ( $customer ) {
		$primary = $customer->get_address();
		if ( $primary ) {
			$address = wp_parse_args(
				array(
					'line1'   => $primary->address ?? '',
					'line2'   => $primary->address2 ?? '',
					'city'    => $primary->city ?? '',
					'zip'     => $primary->postal_code ?? '',
					'country' => $primary->country ?? '',
					'state'   => $primary->region ?? '',
				),
				$address
			);
		}
	}

	// Country / state lists via EDD helpers.
	$countries     = edd_get_country_list();
	$sel_country   = $address['country'] ? $address['country'] : edd_get_shop_country();
	$states        = edd_get_shop_states( $sel_country );

	// Display name options.
	$display_options = array();
	$display_options[] = $user->user_login;
	if ( $user->first_name ) {
		$display_options[] = $user->first_name;
	}
	if ( $user->last_name ) {
		$display_options[] = $user->last_name;
	}
	if ( $user->first_name && $user->last_name ) {
		$display_options[] = $user->first_name . ' ' . $user->last_name;
		$display_options[] = $user->last_name . ' ' . $user->first_name;
	}
	$display_options = array_unique( $display_options );

	// Avatar.
	$avatar = get_avatar_url( $user->ID, array( 'size' => 96 ) );

	// Nonce for EDD profile editor processing.
	$nonce_action = 'edd-profile-editor-nonce';
	?>
	<form id="edd_profile_editor_form" class="wbcom-edd-profile" action="" method="post">
		<?php wp_nonce_field( $nonce_action, 'edd_profile_editor_nonce' ); ?>
		<input type="hidden" name="edd_action" value="edit_user_profile" />
		<input type="hidden" name="edd_profile_editor_submit" value="1" />

		<div class="wbcom-edd-profile__avatar-section">
			<img src="<?php echo esc_url( $avatar ); ?>" alt="" class="wbcom-edd-profile__avatar" width="72" height="72">
			<div class="wbcom-edd-profile__avatar-info">
				<h3 class="wbcom-edd-profile__display-name"><?php echo esc_html( $user->display_name ); ?></h3>
				<p class="wbcom-edd-profile__email-display"><?php echo esc_html( $user->user_email ); ?></p>
			</div>
		</div>

		<div class="wbcom-edd-profile__section">
			<h3 class="wbcom-edd-profile__section-title">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
				<?php esc_html_e( 'Personal Information', 'wbcom-essential' ); ?>
			</h3>
			<div class="wbcom-edd-profile__grid">
				<div class="wbcom-edd-profile__field">
					<label for="edd_first_name" class="wbcom-edd-profile__label"><?php esc_html_e( 'First Name', 'wbcom-essential' ); ?></label>
					<input type="text" id="edd_first_name" name="edd_first_name" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $user->first_name ); ?>">
				</div>
				<div class="wbcom-edd-profile__field">
					<label for="edd_last_name" class="wbcom-edd-profile__label"><?php esc_html_e( 'Last Name', 'wbcom-essential' ); ?></label>
					<input type="text" id="edd_last_name" name="edd_last_name" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $user->last_name ); ?>">
				</div>
			</div>
			<div class="wbcom-edd-profile__field">
				<label for="edd_display_name" class="wbcom-edd-profile__label"><?php esc_html_e( 'Display Name', 'wbcom-essential' ); ?></label>
				<select id="edd_display_name" name="edd_display_name" class="wbcom-edd-profile__select">
					<?php foreach ( $display_options as $opt ) : ?>
						<option value="<?php echo esc_attr( $opt ); ?>" <?php selected( $user->display_name, $opt ); ?>><?php echo esc_html( $opt ); ?></option>
					<?php endforeach; ?>
				</select>
			</div>
			<div class="wbcom-edd-profile__field">
				<label for="edd_email" class="wbcom-edd-profile__label"><?php esc_html_e( 'Email Address', 'wbcom-essential' ); ?></label>
				<input type="email" id="edd_email" name="edd_email" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $user->user_email ); ?>" required>
			</div>
		</div>

		<div class="wbcom-edd-profile__section">
			<h3 class="wbcom-edd-profile__section-title">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
				<?php esc_html_e( 'Billing Address', 'wbcom-essential' ); ?>
			</h3>
			<div class="wbcom-edd-profile__field">
				<label for="card_address" class="wbcom-edd-profile__label"><?php esc_html_e( 'Address Line 1', 'wbcom-essential' ); ?></label>
				<input type="text" id="card_address" name="card_address" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $address['line1'] ); ?>">
			</div>
			<div class="wbcom-edd-profile__field">
				<label for="card_address_2" class="wbcom-edd-profile__label"><?php esc_html_e( 'Address Line 2', 'wbcom-essential' ); ?></label>
				<input type="text" id="card_address_2" name="card_address_2" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $address['line2'] ); ?>">
			</div>
			<div class="wbcom-edd-profile__grid">
				<div class="wbcom-edd-profile__field">
					<label for="card_city" class="wbcom-edd-profile__label"><?php esc_html_e( 'City', 'wbcom-essential' ); ?></label>
					<input type="text" id="card_city" name="card_city" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $address['city'] ); ?>">
				</div>
				<div class="wbcom-edd-profile__field">
					<label for="card_zip" class="wbcom-edd-profile__label"><?php esc_html_e( 'Postal / ZIP Code', 'wbcom-essential' ); ?></label>
					<input type="text" id="card_zip" name="card_zip" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $address['zip'] ); ?>">
				</div>
			</div>
			<div class="wbcom-edd-profile__grid">
				<div class="wbcom-edd-profile__field">
					<label for="card_country" class="wbcom-edd-profile__label"><?php esc_html_e( 'Country', 'wbcom-essential' ); ?></label>
					<select id="card_country" name="card_country" class="wbcom-edd-profile__select">
						<option value=""><?php esc_html_e( 'Select country', 'wbcom-essential' ); ?></option>
						<?php foreach ( $countries as $code => $label ) : ?>
							<option value="<?php echo esc_attr( $code ); ?>" <?php selected( $sel_country, $code ); ?>><?php echo esc_html( $label ); ?></option>
						<?php endforeach; ?>
					</select>
				</div>
				<div class="wbcom-edd-profile__field">
					<label for="card_state" class="wbcom-edd-profile__label"><?php esc_html_e( 'State / Province', 'wbcom-essential' ); ?></label>
					<?php if ( ! empty( $states ) ) : ?>
						<select id="card_state" name="card_state" class="wbcom-edd-profile__select">
							<option value=""><?php esc_html_e( 'Select state', 'wbcom-essential' ); ?></option>
							<?php foreach ( $states as $code => $label ) : ?>
								<option value="<?php echo esc_attr( $code ); ?>" <?php selected( $address['state'], $code ); ?>><?php echo esc_html( $label ); ?></option>
							<?php endforeach; ?>
						</select>
					<?php else : ?>
						<input type="text" id="card_state" name="card_state" class="wbcom-edd-profile__input" value="<?php echo esc_attr( $address['state'] ); ?>">
					<?php endif; ?>
				</div>
			</div>
		</div>

		<div class="wbcom-edd-profile__section">
			<h3 class="wbcom-edd-profile__section-title">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
				<?php esc_html_e( 'Change Password', 'wbcom-essential' ); ?>
			</h3>
			<div class="wbcom-edd-profile__grid">
				<div class="wbcom-edd-profile__field">
					<label for="edd_new_user_pass1" class="wbcom-edd-profile__label"><?php esc_html_e( 'New Password', 'wbcom-essential' ); ?></label>
					<input type="password" id="edd_new_user_pass1" name="edd_new_user_pass1" class="wbcom-edd-profile__input" autocomplete="new-password">
				</div>
				<div class="wbcom-edd-profile__field">
					<label for="edd_new_user_pass2" class="wbcom-edd-profile__label"><?php esc_html_e( 'Confirm Password', 'wbcom-essential' ); ?></label>
					<input type="password" id="edd_new_user_pass2" name="edd_new_user_pass2" class="wbcom-edd-profile__input" autocomplete="new-password">
				</div>
			</div>
			<p class="wbcom-edd-profile__hint"><?php esc_html_e( 'Leave blank to keep your current password.', 'wbcom-essential' ); ?></p>
		</div>

		<div class="wbcom-edd-profile__footer">
			<button type="submit" class="wbcom-edd-btn wbcom-edd-btn--primary wbcom-edd-btn--md">
				<?php esc_html_e( 'Save Changes', 'wbcom-essential' ); ?>
			</button>
		</div>
	</form>
	<?php
}
