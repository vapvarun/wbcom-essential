/**
 * Members Grid Block — Frontend JS
 *
 * Hydrates the grid container using the BuddyPress REST API.
 * Handles: initial render, friend request buttons with optimistic UI.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values. Avatar URLs are decoded via DOMParser (no script
 * execution context).
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
	 * Decode HTML entities using DOMParser (no script execution).
	 *
	 * @param {string} str Raw string possibly containing entities.
	 * @return {string}
	 */
	function decodeEntities( str ) {
		if ( ! str ) {
			return '';
		}
		const doc = new DOMParser().parseFromString( str, 'text/html' );
		return doc.documentElement.textContent;
	}

	// ── Friend button ─────────────────────────────────────────────────────────

	/**
	 * Map a friendship_status_slug to button label and state class.
	 *
	 * @param {string} status BP friendship status slug.
	 * @param {object} i18n   Translated strings.
	 * @return {{ label: string, stateClass: string, disabled: boolean }}
	 */
	function friendBtnState( status, i18n ) {
		switch ( status ) {
			case 'is_friend':
				return { label: i18n.friends,   stateClass: 'is-friend',   disabled: true };
			case 'pending':
				return { label: i18n.pending,   stateClass: 'is-pending',  disabled: true };
			default:
				return { label: i18n.addFriend, stateClass: 'not-friends', disabled: false };
		}
	}

	/**
	 * Build the friend action button.
	 *
	 * @param {object} member BP REST member object.
	 * @param {object} cfg    Block config.
	 * @return {HTMLButtonElement}
	 */
	function buildFriendButton( member, cfg ) {
		const status  = member.friendship_status_slug || 'not_friends';
		const state   = friendBtnState( status, cfg.i18n );
		const btn     = document.createElement( 'button' );

		btn.type        = 'button';
		btn.className   = 'wbcom-member-grid-friend-btn friend-button ' + state.stateClass;
		btn.textContent = state.label;
		btn.dataset.memberId = member.id;
		btn.dataset.status   = status;
		btn.disabled         = state.disabled;

		return btn;
	}

	// ── Card builder ──────────────────────────────────────────────────────────

	/**
	 * Build a single member card element.
	 *
	 * @param {object} member BP REST member object.
	 * @param {object} cfg    Block config from data attribute.
	 * @return {HTMLDivElement}
	 */
	function buildCard( member, cfg ) {
		const item = el( 'div', 'wbcom-member-grid-item' );
		const card = el( 'div', 'wbcom-member-grid-card' );

		// Avatar.
		if ( cfg.showAvatar ) {
			const avatarWrap = el( 'div', 'wbcom-member-grid-avatar' );
			const avatarLink = document.createElement( 'a' );
			avatarLink.href  = member.link || '#';

			const avatarSrc = decodeEntities( member.avatar_urls?.thumb || member.avatar_urls?.full || '' );
			const img       = document.createElement( 'img' );
			img.src         = avatarSrc;
			img.alt         = '';
			img.className   = 'avatar';
			img.loading     = 'lazy';
			avatarLink.appendChild( img );
			avatarWrap.appendChild( avatarLink );
			card.appendChild( avatarWrap );
		}

		// Content section.
		const content = el( 'div', 'wbcom-member-grid-content' );

		if ( cfg.showName ) {
			const nameEl   = el( 'h4', 'wbcom-member-grid-name' );
			const nameLink = document.createElement( 'a' );
			nameLink.href        = member.link || '#';
			nameLink.textContent = member.name || '';
			nameEl.appendChild( nameLink );
			content.appendChild( nameEl );
		}

		if ( cfg.showLastActive && member.last_activity?.timediff ) {
			content.appendChild( el( 'p', 'wbcom-member-grid-meta', member.last_activity.timediff ) );
		}

		if ( cfg.showFriendButton && cfg.loggedIn ) {
			const actionWrap = el( 'div', 'wbcom-member-grid-action' );
			actionWrap.appendChild( buildFriendButton( member, cfg ) );
			content.appendChild( actionWrap );
		}

		card.appendChild( content );
		item.appendChild( card );
		return item;
	}

	// ── Friend request ────────────────────────────────────────────────────────

	/**
	 * Send a friend request with optimistic UI and error rollback.
	 *
	 * @param {HTMLButtonElement} btn Clicked friend button.
	 * @param {object}            cfg Block config.
	 */
	function sendFriendRequest( btn, cfg ) {
		const memberId   = parseInt( btn.dataset.memberId, 10 );
		const prevStatus = btn.dataset.status;
		const prevLabel  = btn.textContent;
		const prevClass  = btn.className;

		// Optimistic update — show pending immediately.
		btn.disabled        = true;
		btn.textContent     = cfg.i18n.pending;
		btn.className       = 'wbcom-member-grid-friend-btn friend-button is-pending';
		btn.dataset.status  = 'pending';

		const friendsUrl = cfg.restUrl.replace( /\/members([^/]*)$/, '/friends' );

		fetch( friendsUrl, {
			method:      'POST',
			headers:     {
				'Content-Type': 'application/json',
				'X-WP-Nonce':  cfg.restNonce,
			},
			credentials: 'same-origin',
			body:        JSON.stringify( { friend_id: memberId } ),
		} )
			.then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'Request failed' );
				}
			} )
			.catch( function () {
				// Rollback on error.
				btn.textContent    = prevLabel;
				btn.className      = prevClass;
				btn.dataset.status = prevStatus;
				btn.disabled       = prevStatus !== 'not_friends';
			} );
	}

	// ── Grid init ─────────────────────────────────────────────────────────────

	/**
	 * Initialise a single members grid container.
	 *
	 * @param {HTMLElement} listEl The element carrying data-wbe-mg-config.
	 */
	function initGrid( listEl ) {
		const cfg = JSON.parse( listEl.dataset.wbeMgConfig || '{}' );
		if ( ! cfg.restUrl ) {
			return;
		}

		const url = new URL( cfg.restUrl, window.location.origin );
		url.searchParams.set( 'per_page', cfg.perPage );
		url.searchParams.set( 'page', 1 );
		url.searchParams.set( 'type', cfg.sortType || 'newest' );

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
			.then( function ( members ) {
				// Clear the loading placeholder.
				listEl.textContent = '';

				if ( ! members.length ) {
					const noData = el( 'div', 'wbcom-essential-no-data' );
					noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
					listEl.appendChild( noData );
					return;
				}

				members.forEach( function ( member ) {
					listEl.appendChild( buildCard( member, cfg ) );
				} );
			} )
			.catch( function () {
				listEl.textContent = '';
				const noData = el( 'div', 'wbcom-essential-no-data' );
				noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
				listEl.appendChild( noData );
			} );

		// Event delegation for friend buttons.
		listEl.addEventListener( 'click', function ( e ) {
			const btn = e.target.closest( '.wbcom-member-grid-friend-btn' );
			if ( btn && btn.dataset.status === 'not_friends' && ! btn.disabled ) {
				sendFriendRequest( btn, cfg );
			}
		} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function boot() {
		document.querySelectorAll( '[data-wbe-mg-config]' ).forEach( initGrid );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
