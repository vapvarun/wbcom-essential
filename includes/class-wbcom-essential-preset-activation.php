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
 * Ported from BuddyNext's PresetActivation: the remote call runs in a background
 * single event (never on the owner's page load), retries are bounded so a
 * firewalled host stops after about a day, and giving up shows an admin notice
 * with a Retry button instead of failing silently. It writes NO usage-tracking
 * option: tracking stays the owner's opt-in on the SDK licence screen.
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

	/** The admin-post action for the owner's manual retry. */
	const RETRY_ACTION = 'wbcom_essential_retry_preset_activation';

	/** One-shot transient carrying a manual retry's outcome across the redirect. */
	const RETRY_RESULT_TRANSIENT = 'wbcom_essential_preset_retry_result';

	/** Option the EDD SL SDK reads the key from (registered in loader.php). */
	const KEY_OPTION = 'wbcom_essential_license_key';

	/** Give up after this many failures (about a day at hourly backoff). */
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
	 * Schedule the background attempt from an admin page, never doing the work
	 * here. Returns early once activated and once we have given up, so a
	 * firewalled host does not re-arm on every admin page load.
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
	 * clear the retry state. On failure, count it and reschedule hourly until the
	 * ceiling, then record that we gave up so the notice can surface it.
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

		$response = wp_remote_post(
			WBCOM_ESSENTIAL_STORE_URL,
			array(
				'timeout' => self::TIMEOUT,
				'body'    => array(
					'edd_action' => 'activate_license',
					'license'    => self::PRESET_KEY,
					'item_id'    => WBCOM_ESSENTIAL_ITEM_ID,
					'url'        => home_url(),
				),
			)
		);

		$body = is_wp_error( $response ) ? null : json_decode( wp_remote_retrieve_body( $response ) );

		if ( is_object( $body ) && 'valid' === ( $body->license ?? '' ) ) {
			update_option( self::KEY_OPTION, self::PRESET_KEY );
			update_option( self::KEY_OPTION . '_license', $body );
			update_option( self::OPT_ACTIVATED, 1, false );
			delete_option( self::OPT_ATTEMPTS );
			delete_option( self::OPT_GAVE_UP );
			return true;
		}

		$attempts = (int) get_option( self::OPT_ATTEMPTS, 0 ) + 1;
		update_option( self::OPT_ATTEMPTS, $attempts, false );

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
				esc_html__( 'Wbcom Essential can now download plugin updates.', 'wbcom-essential' )
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

		printf(
			'<div class="notice notice-warning"><p>%1$s</p><p><a class="button button-primary" href="%2$s">%3$s</a></p></div>',
			esc_html(
				sprintf(
					/* translators: %s: "last tried X ago". */
					__( 'Wbcom Essential could not reach wbcomdesigns.com to turn on plugin updates (%s). Every feature works, but updates will not download until this succeeds. If this host blocks outgoing connections, allow requests to wbcomdesigns.com, then retry.', 'wbcom-essential' ),
					$when
				)
			),
			esc_url( $retry_url ),
			esc_html__( 'Retry now', 'wbcom-essential' )
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
