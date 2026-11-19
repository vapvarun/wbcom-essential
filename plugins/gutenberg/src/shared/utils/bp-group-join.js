/**
 * Join buttons for the Groups Grid and Group Carousel blocks.
 *
 * Uses only the BuddyPress REST API, the same calls BuddyPress's own group
 * directory makes:
 * - public group:  POST groups/{id}/members        -> "Joined"
 * - private group: POST groups/membership-requests -> "Request Sent"
 * - hidden group:  no button (only invited members can join).
 *
 * The label changes only after BuddyPress says yes. A refusal is shown in one
 * role="status" line per block, in BuddyPress's own words.
 */

/**
 * Send a REST request and resolve with { ok, body }.
 *
 * @param {string} url    Endpoint.
 * @param {Object} cfg    Block config (restNonce).
 * @param {Object} [init] fetch options.
 * @return {Promise<{ok: boolean, body: *}>} Result.
 */
function rest( url, cfg, init = {} ) {
	return fetch( url, {
		credentials: 'same-origin',
		...init,
		headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': cfg.restNonce },
	} )
		.then( ( res ) => res.json().catch( () => null ).then( ( body ) => ( { ok: res.ok, body } ) ) )
		.catch( () => ( { ok: false, body: null } ) );
}

/**
 * Which of the shown groups the member belongs to or has asked to join.
 *
 * One request for memberships, limited to the shown groups, and one for the
 * member's pending requests, made only when a private group they are not in
 * is on screen.
 *
 * @param {Object[]} groups Groups the block shows.
 * @param {Object}   cfg    Block config (restUrl, restNonce, currentUserId).
 * @return {Promise<{members: Set, requested: Set}>} Group ids.
 */
export function loadJoinState( groups, cfg ) {
	const state = { members: new Set(), requested: new Set() };
	if ( ! groups.length ) {
		return Promise.resolve( state );
	}

	const base = cfg.restUrl.replace( /\/$/, '' );
	const mine = new URL( base, window.location.origin );
	mine.searchParams.set( 'user_id', cfg.currentUserId );
	mine.searchParams.set( 'include', groups.map( ( g ) => g.id ).join( ',' ) );
	mine.searchParams.set( 'per_page', Math.min( groups.length, 100 ) );

	return rest( mine.toString(), cfg ).then( ( { ok, body } ) => {
		if ( ok && Array.isArray( body ) ) {
			body.forEach( ( g ) => state.members.add( g.id ) );
		}
		if ( ! groups.some( ( g ) => 'private' === g.status && ! state.members.has( g.id ) ) ) {
			return state;
		}
		const requests = new URL( base + '/membership-requests', window.location.origin );
		requests.searchParams.set( 'user_id', cfg.currentUserId );
		requests.searchParams.set( 'per_page', 100 );
		return rest( requests.toString(), cfg ).then( ( res ) => {
			if ( res.ok && Array.isArray( res.body ) ) {
				res.body.forEach( ( r ) => state.requested.add( r.group_id ) );
			}
			return state;
		} );
	} );
}

/**
 * Put a button into one of its states.
 *
 * @param {HTMLButtonElement} btn    Button.
 * @param {string}            status member | requested | join | request.
 * @param {Object}            cfg    Block config (i18n).
 * @param {Object}            cls    Class names: { btn, mod }.
 */
function setState( btn, status, cfg, cls ) {
	const view = {
		member: [ cfg.i18n.joined, 'member' ],
		requested: [ cfg.i18n.requestSent, 'pending' ],
		join: [ cfg.i18n.joinGroup, 'not-member' ],
		request: [ cfg.i18n.requestMembership, 'not-member' ],
	}[ status ];
	btn.dataset.status = status;
	btn.textContent = view[ 0 ];
	btn.className = cls.btn + ' ' + cls.mod + view[ 1 ];
	btn.disabled = 'member' === status || 'requested' === status;
}

/**
 * Button for one group, or null when the member cannot ask to join it.
 *
 * @param {Object} group BP REST group.
 * @param {Object} cfg   Block config.
 * @param {Object} state Result of loadJoinState().
 * @param {Object} cls   Class names: { btn, mod }.
 * @return {HTMLButtonElement|null} Button.
 */
export function joinButton( group, cfg, state, cls ) {
	let status = 'public' === group.status ? 'join' : 'request';
	if ( state.members.has( group.id ) ) {
		status = 'member';
	} else if ( 'hidden' === group.status ) {
		return null;
	} else if ( state.requested.has( group.id ) ) {
		status = 'requested';
	}

	const btn = document.createElement( 'button' );
	btn.type = 'button';
	btn.dataset.groupId = group.id;
	setState( btn, status, cfg, cls );
	return btn;
}

/**
 * Handle join clicks inside a block and report refusals.
 *
 * @param {HTMLElement} container Element holding the buttons.
 * @param {HTMLElement} statusEl  The block's role="status" line.
 * @param {Object}      cfg       Block config.
 * @param {Object}      cls       Class names: { btn, mod }.
 */
export function handleJoinClicks( container, statusEl, cfg, cls ) {
	const base = cfg.restUrl.replace( /\/$/, '' );

	container.addEventListener( 'click', ( e ) => {
		const btn = e.target.closest( '.' + cls.btn );
		if ( ! btn || btn.disabled || ! [ 'join', 'request' ].includes( btn.dataset.status ) ) {
			return;
		}
		const groupId = parseInt( btn.dataset.groupId, 10 );
		const isRequest = 'request' === btn.dataset.status;

		btn.disabled = true;
		btn.setAttribute( 'aria-busy', 'true' );
		statusEl.textContent = '';

		const call = isRequest
			? rest( base + '/membership-requests', cfg, { method: 'POST', body: JSON.stringify( { group_id: groupId } ) } )
			: rest( base + '/' + groupId + '/members', cfg, { method: 'POST', body: JSON.stringify( { user_id: cfg.currentUserId } ) } );

		call.then( ( { ok, body } ) => {
			btn.removeAttribute( 'aria-busy' );
			if ( ok || ( body && 'bp_rest_group_membership_requests_duplicate_request' === body.code ) ) {
				setState( btn, isRequest ? 'requested' : 'member', cfg, cls );
				return;
			}
			btn.disabled = false;
			statusEl.textContent = ( body && body.message ) || cfg.i18n.joinError;
		} );
	} );
}
