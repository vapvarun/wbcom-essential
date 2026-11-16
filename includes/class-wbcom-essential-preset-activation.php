<?php
/**
 * One-time activation of the bundled free licence key against the store.
 *
 * Wbcom Essential is free and part of Reign, BuddyX and BuddyX Pro, so the site
 * owner never enters a licence key. Update downloads are authorised by a preset
 * key that must be activated once per site. Reign's one-click installer already
 * does that; this class covers every other install path (the store zip, a manual
 * upload, WP-CLI) so updates flow on all of them.
 *
 * The same class ships in every Wbcom free plugin (the preset licence activation
 * standard, reference: BuddyNext's PresetActivation); only the names, the key and
 * the item id differ, plus two Essential additions: a key the owner entered is
 * never overwritten, and the check also runs from WP-Cron so a site whose owner
 * rarely opens wp-admin still gets updates. The remote call runs in a background
 * single event (never on a page load), a refusal from the store is final, no
 * answer is retried hourly at most 24 times, and giving up shows the owner a
 * notice with a Retry button. It writes NO usage-tracking option.
 *
 * @package Wbcom_Essential
 * @since   4.7.0
 */

namespace WBCOM_ESSENTIAL;

// Abort if this file is called directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Background preset-key activation with a bounded retry and an owner notice.
 */
class Preset_Activation {

	/** Cron hook that runs the remote activation call. */
	const HOOK = 'wbcom_essential_activate_preset_key';

	/** Set to 1 once the store confirms activation. */
	const OPT_ACTIVATED = 'wbcom_essential_preset_activated';

	/** Running count of failed attempts (cleared on success). */
	const OPT_ATTEMPTS = 'wbcom_essential_preset_activation_attempts';

	/** UTC timestamp of the last failed attempt, set once we give up. */
	const OPT_GAVE_UP = 'wbcom_essential_preset_activation_gave_up';

	/**
	 * The store's own reason when it ANSWERED and refused (expired, disabled,
	 * no_activations_left, invalid...). Empty when the store was never reached.
	 */
	const OPT_REFUSED = 'wbcom_essential_preset_activation_refused';

	/** The admin-post action for the owner's manual retry. */
	const RETRY_ACTION = 'wbcom_essential_retry_preset_activation';

	/** One-shot transient carrying a manual retry's outcome ('ok'|'fail') across the redirect. */
	const RETRY_RESULT_TRANSIENT = 'wbcom_essential_preset_retry_result';

	/** Option the EDD SL SDK reads the key from (registered in loader.php). */
	const KEY_OPTION = 'wbcom_essential_license_key';

	/** Give up after this many unanswered attempts (about a day at hourly backoff). Do not shorten. */
	const MAX_ATTEMPTS = 24;

	/** Remote timeout, seconds. Short: this is a fire-and-forget authorisation. */
	const TIMEOUT = 5;

	/** An armed event overdue by more than this is treated as a dead cron. */
	const OVERDUE_GRACE = HOUR_IN_SECONDS;

	/** The free distribution key (same key Reign's installer uses). */
	const PRESET_KEY = '1cf3c1cf9ea987039b97194ae9c64755';

	/**
	 * Wire the schedule, the background runner, the failure notice and the retry.
	 *
	 * @return void
	 */
	public static function register() {
		add_action( 'admin_init', array( __CLASS__, 'maybe_schedule' ) );
		// Also from WP-Cron, so a site whose owner rarely opens wp-admin still
		// gets updates (WordPress background updates run from cron).
		if ( wp_doing_cron() ) {
			add_action( 'init', array( __CLASS__, 'maybe_schedule' ) );
		}
		// Wrap run() so the cron callback returns nothing.
		add_action(
			self::HOOK,
			static function () {
				self::run();
			}
		);
		add_action( 'admin_notices', array( __CLASS__, 'maybe_render_notice' ) );
		add_action( 'admin_post_' . self::RETRY_ACTION, array( __CLASS__, 'handle_retry' ) );
	}

	/**
	 * Whether the site already holds a working key, so no remote call is needed.
	 *
	 * True when the owner entered a key of their own (never overwritten), or when
	 * the preset key is stored with a valid status (Reign's installer activated it).
	 *
	 * @return bool
	 */
	private static function already_licensed() {
		$key = (string) get_option( self::KEY_OPTION, '' );
		if ( '' !== $key && self::PRESET_KEY !== $key ) {
			return true;
		}

		$status = get_option( self::KEY_OPTION . '_license' );
		return self::PRESET_KEY === $key && is_object( $status ) && 'valid' === ( $status->license ?? '' );
	}

	/**
	 * Schedule the background attempt, never doing the work on a page load.
	 * Returns early once activated and once we have given up, so a firewalled host
	 * does not re-arm on every admin page load. After giving up, only the owner's
	 * Retry re-arms.
	 *
	 * @return void
	 */
	public static function maybe_schedule() {
		if ( get_option( self::OPT_ACTIVATED ) || get_option( self::OPT_GAVE_UP ) ) {
			return;
		}

		if ( self::already_licensed() ) {
			update_option( self::OPT_ACTIVATED, 1, false );
			return;
		}

		// With no working cron a scheduled event never fires, so run inline; run()
		// gives up on the first failure there, so this runs at most once per load.
		if ( self::cron_is_disabled() ) {
			self::run();
			return;
		}

		if ( ! wp_next_scheduled( self::HOOK ) ) {
			wp_schedule_single_event( time() + 30, self::HOOK );
		}
	}

	/**
	 * Whether WP-Cron cannot be relied on to fire the activation event: either
	 * DISABLE_WP_CRON is set, or an armed event is overdue past the grace window.
	 *
	 * @return bool
	 */
	private static function cron_is_disabled() {
		$disabled = defined( 'DISABLE_WP_CRON' ) && DISABLE_WP_CRON;

		if ( ! $disabled ) {
			$next = wp_next_scheduled( self::HOOK );
			// A single event is unscheduled just before it fires, so inside a real cron run this is already false.
			if ( false !== $next && $next < ( time() - self::OVERDUE_GRACE ) ) {
				$disabled = true;
			}
		}

		/**
		 * Whether WP-Cron cannot be relied on to fire a scheduled event.
		 *
		 * A site that sets DISABLE_WP_CRON but runs a real system cron can return
		 * false to keep the scheduled path and its bounded hourly retry.
		 *
		 * @since 4.7.0
		 *
		 * @param bool $disabled True when a scheduled event cannot be relied on.
		 */
		return (bool) apply_filters( 'wbcom_essential_wp_cron_disabled', $disabled );
	}

	/**
	 * Perform the remote activation. On success, store the key and its status and
	 * clear the retry state. A refusal from the store is final. When the store did
	 * not answer, count it and reschedule hourly until the ceiling, then record that
	 * we gave up so the notice can surface it.
	 *
	 * @return bool True when the licence is (or is now) activated.
	 */
	public static function run() {
		if ( get_option( self::OPT_ACTIVATED ) ) {
			return true;
		}

		if ( self::already_licensed() ) {
			update_option( self::OPT_ACTIVATED, 1, false );
			return true;
		}

		update_option( self::KEY_OPTION, self::PRESET_KEY );

		// Same host and fallback as update checks (wbcom_essential_licence_request() in loader.php). The SDK's own
		// timeout is 15s per host; cap it to TIMEOUT for this call only.
		$cap_timeout = static function ( $args ) {
			$args['timeout'] = min( (float) ( $args['timeout'] ?? self::TIMEOUT ), (float) self::TIMEOUT );
			return $args;
		};
		add_filter( 'http_request_args', $cap_timeout );
		$reply = function_exists( 'wbcom_essential_licence_request' )
			? wbcom_essential_licence_request(
				array(
					'edd_action' => 'activate_license',
					'license'    => self::PRESET_KEY,
					'item_id'    => WBCOM_ESSENTIAL_ITEM_ID,
				)
			)
			: false;
		remove_filter( 'http_request_args', $cap_timeout );

		$status = is_object( $reply ) ? (string) ( $reply->license ?? '' ) : '';

		if ( 'valid' === $status ) {
			update_option( self::KEY_OPTION . '_license', $reply );
			update_option( self::OPT_ACTIVATED, 1, false );
			delete_option( self::OPT_ATTEMPTS );
			delete_option( self::OPT_GAVE_UP );
			delete_option( self::OPT_REFUSED );
			return true;
		}

		// The store answered and said no. Asking again cannot change that answer, so this is final: stop now,
		// keep the store's reason for the notice, and leave the next attempt to the owner's Retry.
		if ( '' !== $status ) {
			$reason = sanitize_key( (string) ( $reply->error ?? '' ) );
			update_option( self::OPT_REFUSED, '' !== $reason ? $reason : sanitize_key( $status ), false );
			update_option( self::OPT_GAVE_UP, time(), false );
			return false;
		}

		// No answer at all (network error, firewall page, 5xx): worth trying again.
		delete_option( self::OPT_REFUSED );

		$attempts = (int) get_option( self::OPT_ATTEMPTS, 0 ) + 1;
		update_option( self::OPT_ATTEMPTS, $attempts, false );

		// Without a working cron a rescheduled event would never fire, so a single failure gives up now.
		if ( ! self::cron_is_disabled() && $attempts < self::MAX_ATTEMPTS ) {
			if ( ! wp_next_scheduled( self::HOOK ) ) {
				wp_schedule_single_event( time() + HOUR_IN_SECONDS, self::HOOK );
			}
			return false;
		}

		update_option( self::OPT_GAVE_UP, time(), false );
		return false;
	}

	/**
	 * Show the owner an actionable notice once activation has given up or a
	 * manual retry failed, and confirm a retry that worked.
	 *
	 * @return void
	 */
	public static function maybe_render_notice() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$retry_result = get_transient( self::RETRY_RESULT_TRANSIENT );
		if ( false !== $retry_result ) {
			delete_transient( self::RETRY_RESULT_TRANSIENT );
		}

		if ( 'ok' === $retry_result ) {
			printf(
				'<div class="notice notice-success is-dismissible"><p>%s</p></div>',
				esc_html__( 'Wbcom Essential is now authorised to download plugin updates.', 'wbcom-essential' )
			);
			return;
		}

		if ( get_option( self::OPT_ACTIVATED ) ) {
			return;
		}

		$gave_up      = (int) get_option( self::OPT_GAVE_UP, 0 );
		$retry_failed = ( 'fail' === $retry_result );

		if ( $gave_up <= 0 && ! $retry_failed ) {
			return;
		}

		$when = $gave_up > 0
			? sprintf(
				/* translators: %s: human-readable time difference, e.g. "2 hours". */
				__( 'last tried %s ago', 'wbcom-essential' ),
				human_time_diff( $gave_up, time() )
			)
			: __( 'the retry just failed', 'wbcom-essential' );

		$retry_url = wp_nonce_url(
			add_query_arg( 'action', self::RETRY_ACTION, admin_url( 'admin-post.php' ) ),
			self::RETRY_ACTION
		);

		$refused = (string) get_option( self::OPT_REFUSED, '' );
		$message = '' !== $refused
			? sprintf(
				/* translators: 1: the store's reason, e.g. "expired". 2: "last tried X ago". */
				__( 'wbcomdesigns.com did not authorise plugin updates for Wbcom Essential on this site (reason: %1$s, %2$s). Every feature works, but updates will not download until this is resolved. Updating Wbcom Essential to the latest version usually fixes it; if it does not, contact Wbcom Designs support.', 'wbcom-essential' ),
				$refused,
				$when
			)
			: sprintf(
				/* translators: %s: "last tried X ago". */
				__( 'Wbcom Essential could not reach wbcomdesigns.com to authorise plugin updates (%s). Every feature works, but updates will not download until this succeeds. If this host blocks outgoing connections, allow requests to wbcomdesigns.com, then retry.', 'wbcom-essential' ),
				$when
			);

		printf(
			'<div class="notice notice-warning"><p>%1$s</p><p><a class="button button-primary" href="%2$s">%3$s</a></p></div>',
			esc_html( $message ),
			esc_url( $retry_url ),
			esc_html__( 'Retry activation now', 'wbcom-essential' )
		);
	}

	/**
	 * Owner-triggered retry: clear the give-up latch, run the activation now
	 * (bounded by the 5s timeout), record the outcome, and redirect back. The
	 * attempt count is kept so a still-blocked host re-reaches give-up.
	 *
	 * @return void
	 */
	public static function handle_retry() {
		if ( ! current_user_can( 'manage_options' ) ) {
			wp_die( esc_html__( 'You are not allowed to do this.', 'wbcom-essential' ), 403 );
		}
		check_admin_referer( self::RETRY_ACTION );

		delete_option( self::OPT_GAVE_UP );
		$ok = self::run();

		set_transient( self::RETRY_RESULT_TRANSIENT, $ok ? 'ok' : 'fail', MINUTE_IN_SECONDS );

		wp_safe_redirect( wp_get_referer() ? wp_get_referer() : admin_url() );
		exit;
	}
}
