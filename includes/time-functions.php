<?php
/**
 * Time helpers: the one place Wbcom Essential picks a display timezone and formats a stored time.
 *
 * Stored times (WooCommerce sale dates, EDD order, subscription and licence dates) are UTC.
 * Every time shown on screen goes through wbcom_essential_date_label(), so all surfaces agree.
 * See docs/standards/time.md (Wbcom time standard).
 *
 * @package Wbcom_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The timezone every shown time is displayed in.
 *
 * @param int $user_id Viewer, so a site can show each member their own timezone. 0 = current context.
 * @return DateTimeZone
 */
function wbcom_essential_display_timezone( $user_id = 0 ) {
	/**
	 * Filters the timezone Wbcom Essential shows times in.
	 *
	 * @param DateTimeZone $timezone Site timezone by default.
	 * @param int          $user_id  Viewer user ID, 0 when not known.
	 */
	$timezone = apply_filters( 'wbcom_essential_display_timezone', wp_timezone(), (int) $user_id );

	return $timezone instanceof DateTimeZone ? $timezone : wp_timezone();
}

/**
 * Format a stored UTC time for display.
 *
 * @param string|int|null $utc      Unix timestamp, or a UTC date string (a naive string is read as UTC).
 * @param string          $fallback Returned for empty, zero-date or unparseable values.
 * @param string|null     $format   PHP date format. Defaults to the site date format.
 * @param int             $user_id  Viewer user ID, passed to the display timezone filter.
 * @return string
 */
function wbcom_essential_date_label( $utc, $fallback = '', $format = null, $user_id = 0 ) {
	if ( is_numeric( $utc ) ) {
		$timestamp = (int) $utc;
	} elseif ( is_string( $utc ) && '' !== $utc && 0 !== strpos( $utc, '0000-00-00' ) ) {
		$date      = date_create( $utc, new DateTimeZone( 'UTC' ) );
		$timestamp = $date ? $date->getTimestamp() : 0;
	} else {
		$timestamp = 0;
	}

	if ( $timestamp <= 0 ) {
		return $fallback;
	}

	$label = wp_date( $format ? $format : get_option( 'date_format' ), $timestamp, wbcom_essential_display_timezone( $user_id ) );

	return false === $label ? $fallback : $label;
}
