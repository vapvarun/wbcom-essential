/**
 * Read BuddyPress and BuddyBoss Platform REST responses the same way.
 *
 * Both platforms serve members, groups and activity from the same endpoint
 * classes, but BuddyBoss (buddyboss/v1) names or shapes a few fields
 * differently from BuddyPress (buddypress/v1). Blocks read those fields
 * through these helpers so their cards look the same on both platforms.
 */

/**
 * Relative "x ago" text for a GMT date from the REST API.
 *
 * Formatted by the browser in the page language, so no strings to translate.
 *
 * @param {string} gmtDate Date like 2026-10-14T21:30:40 (GMT, no offset).
 * @return {string} Relative time, or '' when the date cannot be read.
 */
function relativeTime( gmtDate ) {
	if ( typeof gmtDate !== 'string' || ! gmtDate ) {
		return '';
	}

	const hasZone = /(Z|[+-]\d\d:?\d\d)$/.test( gmtDate );
	const then    = new Date( hasZone ? gmtDate : gmtDate + 'Z' ).getTime();
	if ( Number.isNaN( then ) || typeof Intl === 'undefined' || ! Intl.RelativeTimeFormat ) {
		return '';
	}

	const seconds = Math.round( ( then - Date.now() ) / 1000 );
	const units   = [
		[ 'year', 31536000 ],
		[ 'month', 2592000 ],
		[ 'week', 604800 ],
		[ 'day', 86400 ],
		[ 'hour', 3600 ],
		[ 'minute', 60 ],
	];
	const rtf = new Intl.RelativeTimeFormat( document.documentElement.lang || undefined, { numeric: 'auto' } );

	for ( const [ unit, size ] of units ) {
		if ( Math.abs( seconds ) >= size ) {
			return rtf.format( Math.round( seconds / size ), unit );
		}
	}

	return rtf.format( seconds, 'second' );
}

/**
 * Friendship status slug (not_friends, is_friend, pending, awaiting_response).
 *
 * BuddyPress: friendship_status_slug. BuddyBoss: friendship_status holds the slug.
 *
 * @param {Object} member Member from the REST API.
 * @return {string} Status slug.
 */
export function memberFriendshipStatus( member ) {
	if ( member.friendship_status_slug ) {
		return member.friendship_status_slug;
	}
	return typeof member.friendship_status === 'string' ? member.friendship_status : 'not_friends';
}

/**
 * Member "last active" text.
 *
 * BuddyPress: last_activity.timediff. BuddyBoss: last_activity is a GMT date,
 * or a translated message such as "Not recently active".
 *
 * @param {Object} member Member from the REST API.
 * @return {string} Text to show, or ''.
 */
export function memberLastActive( member ) {
	const last = member.last_activity;
	if ( last && typeof last === 'object' ) {
		return last.timediff || '';
	}
	return relativeTime( last ) || ( typeof last === 'string' ? last : '' );
}

/**
 * Group member count. BuddyPress: total_member_count. BuddyBoss: members_count.
 *
 * @param {Object} group Group from the REST API.
 * @return {number} Member count.
 */
export function groupMemberCount( group ) {
	return parseInt( group.total_member_count ?? group.members_count ?? 0, 10 ) || 0;
}

/**
 * Group "last active" text. BuddyPress: last_activity_diff. BuddyBoss: only the
 * last_activity GMT date.
 *
 * @param {Object} group Group from the REST API.
 * @return {string} Text to show, or ''.
 */
export function groupLastActive( group ) {
	return group.last_activity_diff || relativeTime( group.last_activity );
}
