/**
 * Members Grid Block — Frontend JS
 *
 * Hydrates the grid container using the BuddyPress REST API.
 * Handles: initial render, friend request (add / pending / friends states).
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values — never via direct HTML assignment. Avatar URLs are decoded
 * with a textarea element (the standard entity-decode pattern) and set on img.src.
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
	 * Decode HTML entities from BP REST API strings (e.g. avatar URLs).
	 * Uses DOMParser which does not execute scripts.
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
	 * @return {{ label: string, stateClass: string }}
	 */
	function friendBtnState( status, i18n ) {
		switch ( status ) {
			case 'is_friend':
				return { label: i18n.friends,   stateClass: 'wbe-mg-friend--is-friend' };
			case 'pending':
				return { label: i18n.pending,   stateClass: 'wbe-mg-friend--pending' };
			default:
				return { label: i18n.addFriend, stateClass: 'wbe-mg-friend--not-friends' };
		}
	}

	/**
	 * Create the friend action button for a member card.
	 *
	 * @param {object} member Member REST response object.
	 * @param {object} cfg    Block config.
	 * @return {HTMLButtonElement}
	 */
	function buildFriendButton( member, cfg ) {
		const status  = member.friendship_status_slug || 'not_friends';
		const state   = friendBtnState( status, cfg.i18n );
		const btn     = document.createElement( 'button' );

		btn.type        = 'button';
		btn.className   = 'wbe-members-grid__friend-btn ' + state.stateClass;
		btn.textContent = state.label;
		btn.dataset.memberId = member.id;
		btn.dataset.status   = status;
		btn.disabled         = status !== 'not_friends';

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
		const cardStyle = [
			cfg.colors.cardBg    ? '--wbe-mg-card-bg: '    + cfg.colors.cardBg    + ';' : '',
			cfg.colors.nameColor ? '--wbe-mg-name-color: ' + cfg.colors.nameColor + ';' : '',
			cfg.colors.metaColor ? '--wbe-mg-meta-color: ' + cfg.colors.metaColor + ';' : '',
		].join( ' ' );

		const card = el( 'div', 'wbe-members-grid__card' );
		if ( cardStyle.trim() ) {
			card.setAttribute( 'style', cardStyle );
		}

		// Avatar.
		const avatarWrap = el( 'div', 'wbe-members-grid__avatar' );
		const avatarLink = document.createElement( 'a' );
		avatarLink.href  = member.link || '#';

		const avatarSrc  = decodeEntities( member.avatar_urls?.thumb || member.avatar_urls?.full || '' );
		const img        = document.createElement( 'img' );
		img.src          = avatarSrc;
		img.alt          = '';
		img.className    = 'wbe-members-grid__avatar-img';
		img.width        = cfg.avatarSize;
		img.height       = cfg.avatarSize;
		img.loading      = 'lazy';
		img.style.borderRadius = '50%';
		avatarLink.appendChild( img );
		avatarWrap.appendChild( avatarLink );
		card.appendChild( avatarWrap );

		// Info section.
		const info = el( 'div', 'wbe-members-grid__info' );

		const nameHeading    = el( 'h3', 'wbe-members-grid__name' );
		const nameLink       = document.createElement( 'a' );
		nameLink.href        = member.link || '#';
		nameLink.textContent = member.name || '';
		nameHeading.appendChild( nameLink );
		info.appendChild( nameHeading );

		if ( cfg.showLastActive && member.last_activity?.timediff ) {
			info.appendChild( el( 'span', 'wbe-members-grid__meta', member.last_activity.timediff ) );
		}

		if ( cfg.showFriendButton && cfg.loggedIn ) {
			const actionWrap = el( 'div', 'wbe-members-grid__action' );
			actionWrap.appendChild( buildFriendButton( member, cfg ) );
			info.appendChild( actionWrap );
		}

		card.appendChild( info );
		return card;
	}

	// ── Friend request ────────────────────────────────────────────────────────

	/**
	 * Send a friend request via BP REST API with optimistic UI and error rollback.
	 *
	 * @param {HTMLButtonElement} btn Clicked friend button.
	 * @param {object}            cfg Block config.
	 */
	function sendFriendRequest( btn, cfg ) {
		const memberId   = parseInt( btn.dataset.memberId, 10 );
		const prevStatus = btn.dataset.status;
		const prevLabel  = btn.textContent;
		const prevClass  = btn.className;

		// Optimistic update.
		btn.disabled        = true;
		btn.textContent     = cfg.i18n.pending;
		btn.className       = 'wbe-members-grid__friend-btn wbe-mg-friend--pending';
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
					listEl.appendChild( el( 'p', 'wbe-members-grid__empty', cfg.i18n.empty ) );
					return;
				}

				members.forEach( function ( member ) {
					listEl.appendChild( buildCard( member, cfg ) );
				} );
			} )
			.catch( function () {
				listEl.textContent = '';
				listEl.appendChild( el( 'p', 'wbe-members-grid__empty', cfg.i18n.empty ) );
			} );

		// Event delegation for friend buttons.
		listEl.addEventListener( 'click', function ( e ) {
			const btn = e.target.closest( '.wbe-members-grid__friend-btn' );
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
