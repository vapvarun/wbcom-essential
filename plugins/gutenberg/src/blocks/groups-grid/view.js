/**
 * Groups Grid Block — Frontend JS
 *
 * Hydrates the grid container using the BuddyPress REST API.
 * Handles: initial render, join-group button.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values. Avatar URLs are decoded via a DOMParser text/html parse
 * (no script execution context). Group descriptions are plain-text truncated
 * client-side so no HTML is ever inserted into the DOM from user data.
 */

( function () {
	'use strict';

	// ── Helpers ───────────────────────────────────────────────────────────────

	/**
	 * Create an element with an optional class and text content.
	 *
	 * @param {string} tag         Tag name.
	 * @param {string} [className] CSS class string.
	 * @param {string} [text]      Text content.
	 * @return {HTMLElement}
	 */
	function el( tag, className, text ) {
		const node = document.createElement( tag );
		if ( className ) {
			node.className = className;
		}
		if ( text ) {
			node.textContent = text;
		}
		return node;
	}

	/**
	 * Decode HTML entities in BP REST API strings using DOMParser.
	 * DOMParser.parseFromString with text/html does not execute scripts.
	 *
	 * @param {string} str Raw string possibly containing entities like &amp;
	 * @return {string}
	 */
	function decodeEntities( str ) {
		if ( ! str ) {
			return '';
		}
		const doc = new DOMParser().parseFromString( str, 'text/html' );
		return doc.documentElement.textContent;
	}

	// ── Join button ───────────────────────────────────────────────────────────

	/**
	 * Build a join/joined button for a group.
	 *
	 * @param {object} group        BP REST group object.
	 * @param {object} cfg          Block config.
	 * @param {Set}    userGroupIds Set of group IDs the current user belongs to.
	 * @return {HTMLButtonElement}
	 */
	function buildJoinButton( group, cfg, userGroupIds ) {
		var isMember = userGroupIds.has( group.id );
		var btn      = document.createElement( 'button' );
		btn.type     = 'button';
		btn.dataset.groupId = group.id;

		if ( isMember ) {
			btn.className   = 'wbe-groups-grid__join-btn wbe-gg-join--member';
			btn.textContent = cfg.i18n.joined;
			btn.dataset.status = 'member';
			btn.disabled    = true;
		} else {
			btn.className   = 'wbe-groups-grid__join-btn wbe-gg-join--not-member';
			btn.textContent = cfg.i18n.joinGroup;
			btn.dataset.status = 'not_member';
		}
		return btn;
	}

	/**
	 * Send a join group request via BP REST API with optimistic UI.
	 *
	 * @param {HTMLButtonElement} btn Clicked join button.
	 * @param {object}            cfg Block config.
	 */
	function sendJoinRequest( btn, cfg ) {
		var groupId    = parseInt( btn.dataset.groupId, 10 );
		var prevLabel  = btn.textContent;
		var prevClass  = btn.className;
		var prevStatus = btn.dataset.status;

		// Optimistic update.
		btn.disabled       = true;
		btn.textContent    = cfg.i18n.joined;
		btn.className      = 'wbe-groups-grid__join-btn wbe-gg-join--member';
		btn.dataset.status = 'member';

		var membersUrl = cfg.restUrl.replace( /\/$/, '' ) + '/' + groupId + '/members';

		fetch( membersUrl, {
			method:      'POST',
			headers:     {
				'Content-Type': 'application/json',
				'X-WP-Nonce':  cfg.restNonce,
			},
			credentials: 'same-origin',
			body:        JSON.stringify( { user_id: cfg.currentUserId } ),
		} )
			.then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'Join failed' );
				}
				return res.json();
			} )
			.then( function ( data ) {
				if ( data.is_confirmed === false ) {
					btn.textContent    = cfg.i18n.pending;
					btn.className      = 'wbe-groups-grid__join-btn wbe-gg-join--pending';
					btn.dataset.status = 'pending';
				}
			} )
			.catch( function () {
				btn.textContent    = prevLabel;
				btn.className      = prevClass;
				btn.dataset.status = prevStatus;
				btn.disabled       = prevStatus !== 'not_member';
			} );
	}

	// ── Card builder ──────────────────────────────────────────────────────────

	/**
	 * Build a single group card element using only safe DOM methods.
	 *
	 * @param {object} group BP REST group object.
	 * @param {object} cfg   Block config from data attribute.
	 * @return {HTMLDivElement}
	 */
	function buildCard( group, cfg ) {
		const cardStyle = [
			cfg.colors.cardBg    ? '--wbe-gg-card-bg: '    + cfg.colors.cardBg    + ';' : '',
			cfg.colors.nameColor ? '--wbe-gg-name-color: ' + cfg.colors.nameColor + ';' : '',
			cfg.colors.descColor ? '--wbe-gg-desc-color: ' + cfg.colors.descColor + ';' : '',
		].join( ' ' );

		const card = el( 'div', 'wbe-groups-grid__card' );
		if ( cardStyle.trim() ) {
			card.setAttribute( 'style', cardStyle );
		}

		// Avatar.
		const avatarWrap = el( 'div', 'wbe-groups-grid__avatar' );
		const avatarLink = document.createElement( 'a' );
		avatarLink.href  = group.link || '#';

		const avatarSrc = decodeEntities( group.avatar_urls?.thumb || group.avatar_urls?.full || '' );
		const img       = document.createElement( 'img' );
		img.src         = avatarSrc;
		img.alt         = '';
		img.className   = 'wbe-groups-grid__avatar-img';
		img.width       = cfg.avatarSize;
		img.height      = cfg.avatarSize;
		img.loading     = 'lazy';
		avatarLink.appendChild( img );
		avatarWrap.appendChild( avatarLink );
		card.appendChild( avatarWrap );

		// Info section.
		const info = el( 'div', 'wbe-groups-grid__info' );

		const nameHeading    = el( 'h3', 'wbe-groups-grid__name' );
		const nameLink       = document.createElement( 'a' );
		nameLink.href        = group.link || '#';
		nameLink.textContent = group.name || '';
		nameHeading.appendChild( nameLink );
		info.appendChild( nameHeading );

		// Description — strip tags client-side, truncate to ~15 words.
		if ( cfg.showDescription && group.description?.rendered ) {
			const descEl    = el( 'p', 'wbe-groups-grid__desc' );
			const plainText = decodeEntities( group.description.rendered.replace( /<[^>]+>/g, '' ) ).trim();
			const wordArr   = plainText.split( /\s+/ );
			descEl.textContent = wordArr.slice( 0, 15 ).join( ' ' ) + ( wordArr.length > 15 ? '\u2026' : '' );
			info.appendChild( descEl );
		}

		// Meta row.
		const meta = el( 'div', 'wbe-groups-grid__meta' );

		if ( cfg.showMemberCount && group.total_member_count ) {
			meta.appendChild(
				el( 'span', 'wbe-groups-grid__count', group.total_member_count + ' ' + cfg.i18n.members )
			);
		}

		if ( cfg.showLastActive && group.last_activity_diff ) {
			meta.appendChild(
				el( 'span', 'wbe-groups-grid__active', cfg.i18n.activeAgo.replace( '%s', group.last_activity_diff ) )
			);
		}

		info.appendChild( meta );

		// Join button — BP REST API with optimistic UI.
		if ( cfg.showJoinButton && cfg.loggedIn ) {
			const actionWrap = el( 'div', 'wbe-groups-grid__action' );
			actionWrap.appendChild( buildJoinButton( group, cfg, cfg._userGroupIds ) );
			info.appendChild( actionWrap );
		}

		card.appendChild( info );
		return card;
	}

	// ── Grid init ─────────────────────────────────────────────────────────────

	/**
	 * Initialise a single groups grid container.
	 *
	 * @param {HTMLElement} listEl The element carrying data-wbe-gg-config.
	 */
	function initGrid( listEl ) {
		const cfg = JSON.parse( listEl.dataset.wbeGgConfig || '{}' );
		if ( ! cfg.restUrl ) {
			return;
		}

		const url = new URL( cfg.restUrl, window.location.origin );
		url.searchParams.set( 'per_page', cfg.perPage );
		url.searchParams.set( 'page', 1 );
		url.searchParams.set( 'type', cfg.sortType || 'active' );
		url.searchParams.set( 'populate_extras', 'true' );

		const headers = { 'Content-Type': 'application/json' };
		if ( cfg.restNonce ) {
			headers[ 'X-WP-Nonce' ] = cfg.restNonce;
		}

		fetch( url.toString(), { headers: headers, credentials: 'same-origin' } )
			.then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'REST error' );
				}
				return res.json();
			} )
			.then( function ( groups ) {
				// If join button enabled, fetch user's groups to determine membership.
				if ( cfg.showJoinButton && cfg.loggedIn && cfg.currentUserId ) {
					var userGroupsUrl = new URL( cfg.restUrl, window.location.origin );
					userGroupsUrl.searchParams.set( 'user_id', cfg.currentUserId );
					userGroupsUrl.searchParams.set( 'per_page', 100 );

					return fetch( userGroupsUrl.toString(), { headers: headers, credentials: 'same-origin' } )
						.then( function ( res ) { return res.ok ? res.json() : []; } )
						.then( function ( userGroups ) {
							cfg._userGroupIds = new Set( userGroups.map( function ( g ) { return g.id; } ) );
							return groups;
						} )
						.catch( function () {
							cfg._userGroupIds = new Set();
							return groups;
						} );
				}
				cfg._userGroupIds = new Set();
				return groups;
			} )
			.then( function ( groups ) {
				// Clear the loading placeholder.
				listEl.textContent = '';

				if ( ! groups.length ) {
					listEl.appendChild( el( 'p', 'wbe-groups-grid__empty', cfg.i18n.empty ) );
					return;
				}

				groups.forEach( function ( group ) {
					listEl.appendChild( buildCard( group, cfg ) );
				} );

				// Event delegation for join buttons.
				listEl.addEventListener( 'click', function ( e ) {
					var btn = e.target.closest( '.wbe-groups-grid__join-btn' );
					if ( btn && btn.dataset.status === 'not_member' && ! btn.disabled ) {
						sendJoinRequest( btn, cfg );
					}
				} );
			} )
			.catch( function () {
				listEl.textContent = '';
				listEl.appendChild( el( 'p', 'wbe-groups-grid__empty', cfg.i18n.empty ) );
			} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function boot() {
		document.querySelectorAll( '[data-wbe-gg-config]' ).forEach( initGrid );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
