<?php
/**
 * Version-gated upgrade routines.
 *
 * Activation hooks are not enough on their own: WordPress does not fire
 * register_activation_hook() for an in-place plugin update (manual upload,
 * auto-update, or the EDD SL updater), so anything that has to run once per
 * version has to compare the stored version against the shipped one on a
 * normal request instead.
 *
 * Adding a routine:
 *   1. Add a `'x.y.z' => 'wbcom_essential_upgrade_x_y_z'` entry to
 *      wbcom_essential_get_upgrade_routines().
 *   2. Write the function so it is safe to run twice — a routine that fails
 *      part-way is retried on the next request.
 *
 * @package Wbcom_Essential
 * @since   4.7.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Map of version => upgrade callback, in ascending version order.
 *
 * A routine runs when the site's stored version is BELOW its key, so a fresh
 * install (no stored version) skips them all — there is nothing to migrate.
 *
 * @since 4.7.0
 *
 * @return array<string, callable-string>
 */
function wbcom_essential_get_upgrade_routines() {
	return array(
		'4.7.0' => 'wbcom_essential_upgrade_470_checkout_block',
	);
}

/**
 * Run any upgrade routines the site has not seen yet.
 *
 * Runs on admin_init rather than a front-end hook so a migration never adds
 * latency to a customer request, and so it runs as a logged-in admin with
 * post-editing capability.
 *
 * @since 4.7.0
 *
 * @return void
 */
function wbcom_essential_maybe_upgrade() {
	$stored = get_option( 'wbcom_essential_version', '' );

	if ( WBCOM_ESSENTIAL_VERSION === $stored ) {
		return;
	}

	// Fresh install: record the version and skip every routine. Nothing was
	// ever written in the old format, so there is nothing to migrate.
	if ( '' === $stored ) {
		update_option( 'wbcom_essential_version', WBCOM_ESSENTIAL_VERSION );
		return;
	}

	// Only one process should migrate. The lock expires so a fatal mid-run
	// does not wedge upgrades permanently.
	$lock = 'wbcom_essential_upgrading';
	if ( get_transient( $lock ) ) {
		return;
	}
	set_transient( $lock, 1, 5 * MINUTE_IN_SECONDS );

	foreach ( wbcom_essential_get_upgrade_routines() as $version => $callback ) {
		if ( version_compare( $stored, $version, '>=' ) ) {
			continue;
		}
		if ( is_callable( $callback ) ) {
			call_user_func( $callback );
		}
	}

	update_option( 'wbcom_essential_version', WBCOM_ESSENTIAL_VERSION );
	delete_transient( $lock );

	/**
	 * Fires after Wbcom Essential finishes its upgrade routines.
	 *
	 * @since 4.7.0
	 *
	 * @param string $stored Version the site was on before this run.
	 */
	do_action( 'wbcom_essential_upgraded', $stored );
}
add_action( 'admin_init', 'wbcom_essential_maybe_upgrade' );

/**
 * 4.7.0 — nest EDD's checkout block inside the Enhanced Checkout block.
 *
 * Up to 4.6.x the block was saved self-closing and rendered EDD's checkout by
 * calling do_shortcode( '[download_checkout]' ) from render.php. That left no
 * `wp:edd/checkout` in post_content, and EDD keys its entire modern checkout
 * off has_block( 'edd/checkout' ) against post_content
 * (\EDD\Checkout\Validator::has_block). With that returning false EDD served
 * the legacy shortcode checkout, which — with "Show Register / Login Form" set
 * to "Registration and Login Forms" — stacks the "Already have an account?"
 * prompt on top of the "Create an account" fields instead of presenting them
 * as separate choices.
 *
 * Rendering the block from PHP does not fix it; the check reads post_content.
 * So the saved markup itself has to change:
 *
 *   <!-- wp:wbcom-essential/edd-checkout-enhanced {"guaranteeDays":30} /-->
 *
 * becomes
 *
 *   <!-- wp:wbcom-essential/edd-checkout-enhanced {"guaranteeDays":30} -->
 *   <!-- wp:edd/checkout /-->
 *   <!-- /wp:wbcom-essential/edd-checkout-enhanced -->
 *
 * Block attributes are preserved verbatim. Posts that already contain an
 * edd/checkout block are left alone, which also makes this safe to re-run.
 *
 * @since 4.7.0
 *
 * @return int Number of posts rewritten.
 */
function wbcom_essential_upgrade_470_checkout_block() {
	global $wpdb;

	// LIKE against post_content: there is no meta or taxonomy to query, and
	// WP_Query's `s` would also match the phrase inside unrelated prose.
	// Revisions are excluded — they are history, and rewriting them would
	// silently edit what the customer's editor shows as "previously saved".
	// phpcs:disable WordPress.DB.DirectDatabaseQuery -- One-time migration: there is no core API for "find posts whose content contains this block", and caching a query that runs once per version upgrade would only add a cache entry nothing reads.
	$post_ids = $wpdb->get_col(
		"SELECT ID FROM {$wpdb->posts}
		 WHERE post_content LIKE '%wp:wbcom-essential/edd-checkout-enhanced%'
		   AND post_type NOT IN ( 'revision' )
		   AND post_status NOT IN ( 'trash', 'auto-draft' )"
	);
	// phpcs:enable WordPress.DB.DirectDatabaseQuery

	if ( empty( $post_ids ) ) {
		return 0;
	}

	$updated = 0;

	foreach ( $post_ids as $post_id ) {
		$post = get_post( $post_id );
		if ( ! $post ) {
			continue;
		}

		$new_content = wbcom_essential_nest_checkout_block( $post->post_content );

		if ( null === $new_content ) {
			continue;
		}

		// wp_update_post() so revisions and caches behave normally — a direct
		// $wpdb->update would leave stale object-cache entries behind.
		$result = wp_update_post(
			array(
				'ID'           => $post->ID,
				'post_content' => $new_content,
			),
			true
		);

		if ( ! is_wp_error( $result ) ) {
			++$updated;
		}
	}

	return $updated;
}

/**
 * Replace the Enhanced Checkout wrapper with EDD's composed checkout block.
 *
 * Split out from the upgrade routine so it is directly testable and so the
 * rewrite rule lives in exactly one place.
 *
 * Handles both shapes that can be on disk:
 *   - the original self-closing wrapper (4.6.x and earlier)
 *   - a wrapper already containing a bare `wp:edd/checkout`
 *
 * Both become EDD's checkout block with its own inner blocks, followed by our
 * sections as siblings. Attributes are carried across to the section that owns
 * them, so a store's guarantee wording, Trustpilot numbers and toggles survive.
 *
 * @since 4.7.0
 *
 * @param string $content Post content.
 * @return string|null Rewritten content, or null when nothing needed changing.
 */
function wbcom_essential_nest_checkout_block( $content ) {
	// Nothing of ours on the page, or someone has already hand-built the new
	// structure (our wrapper is gone): leave it be. Re-running is a no-op.
	if ( false === strpos( $content, 'wp:wbcom-essential/edd-checkout-enhanced' ) ) {
		return null;
	}

	// Matches the wrapper in either shape. Group 1 is the JSON attribute blob.
	$pattern = '#<!--\s+wp:wbcom-essential/edd-checkout-enhanced(\s+\{.*?\})?\s*(?:/-->|-->.*?<!--\s+/wp:wbcom-essential/edd-checkout-enhanced\s+-->)#s';

	$new_content = preg_replace_callback(
		$pattern,
		function ( $matches ) {
			$attributes = array();
			if ( ! empty( $matches[1] ) ) {
				$decoded = json_decode( trim( $matches[1] ), true );
				if ( is_array( $decoded ) ) {
					$attributes = $decoded;
				}
			}

			return wbcom_essential_build_checkout_markup( $attributes );
		},
		$content
	);

	// preg_replace_callback() returns null on error — never write that back.
	if ( null === $new_content || $new_content === $content ) {
		return null;
	}

	return $new_content;
}

/**
 * Build the 4.7.0 checkout page markup for a set of legacy wrapper attributes.
 *
 * Our sections are emitted INSIDE `wp:edd/checkout`. EDD's own checkout
 * children declare `ancestor` rather than `parent`, and its InnerBlocks has no
 * allowedBlocks, so the checkout block accepts any sibling — which is what
 * makes it possible to drop our wrapper without losing the sections.
 *
 * @since 4.7.0
 *
 * @param array $attributes Attributes from the legacy wrapper block.
 * @return string Block markup.
 */
function wbcom_essential_build_checkout_markup( array $attributes ) {
	$section = static function ( $name, array $attrs ) {
		// Drop nulls so we never write `"x":null` into post content.
		$attrs = array_filter(
			$attrs,
			static function ( $value ) {
				return null !== $value;
			}
		);

		$json = empty( $attrs ) ? '' : ' ' . wp_json_encode( $attrs );

		return "<!-- wp:wbcom-essential/{$name}{$json} /-->";
	};

	/*
	 * EDD's checkout children are NOT self-closing. Their save() is
	 * `useBlockProps.save()` around an empty div, so each one serializes with a
	 * wrapper element; emitting `<!-- wp:edd/checkout-cart /-->` instead makes
	 * the editor flag all three as invalid ("this block contains unexpected or
	 * invalid content"). Our own sections use `save: () => null` and so are
	 * correctly self-closing.
	 */
	$edd_child = static function ( $name ) {
		return "<!-- wp:edd/{$name} -->\n"
			. '<div class="wp-block-edd-' . $name . '"></div>' . "\n"
			. "<!-- /wp:edd/{$name} -->";
	};

	$parts = array(
		'<!-- wp:edd/checkout -->',
	);

	// The progress indicator belongs above the cart; everything else below it.
	if ( ! empty( $attributes['showProgressBar'] ) ) {
		$parts[] = $section( 'edd-checkout-progress', array() );
	}

	$parts[] = $edd_child( 'checkout-cart' );
	$parts[] = $edd_child( 'checkout-personal-info' );
	$parts[] = $edd_child( 'checkout-payment-info' );

	// showTrustBadges defaulted to true, so treat "unset" as enabled.
	if ( ! isset( $attributes['showTrustBadges'] ) || $attributes['showTrustBadges'] ) {
		$parts[] = $section(
			'edd-checkout-trust',
			array(
				'trustBadgeText' => $attributes['trustBadgeText'] ?? null,
				'guaranteeDays'  => $attributes['guaranteeDays'] ?? null,
				'guaranteeText'  => $attributes['guaranteeText'] ?? null,
				'paymentIcons'   => $attributes['paymentIcons'] ?? null,
			)
		);
	}

	$wants_reviews    = ! isset( $attributes['showReviews'] ) || $attributes['showReviews'];
	$wants_trustpilot = ! isset( $attributes['showTrustpilot'] ) || $attributes['showTrustpilot'];

	if ( $wants_reviews || $wants_trustpilot ) {
		$parts[] = $section(
			'edd-checkout-social',
			array(
				'showReviews'       => $attributes['showReviews'] ?? null,
				'reviewCount'       => $attributes['reviewCount'] ?? null,
				'showTrustpilot'    => $attributes['showTrustpilot'] ?? null,
				'trustpilotRating'  => $attributes['trustpilotRating'] ?? null,
				'trustpilotCount'   => $attributes['trustpilotCount'] ?? null,
				'trustpilotUrl'     => $attributes['trustpilotUrl'] ?? null,
				'trustpilotReviews' => $attributes['trustpilotReviews'] ?? null,
			)
		);
	}

	if ( ! isset( $attributes['showRecommendations'] ) || $attributes['showRecommendations'] ) {
		$parts[] = $section(
			'edd-checkout-recommendations',
			array(
				'recommendationCount' => $attributes['recommendationCount'] ?? null,
			)
		);
	}

	$parts[] = '<!-- /wp:edd/checkout -->';

	return implode( "\n", $parts );
}
