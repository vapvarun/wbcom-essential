/**
 * Groups Grid Block — Frontend JS
 *
 * Hydrates the grid container using the BuddyPress REST API.
 * Handles: initial render, join-group link.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values. Avatar URLs are decoded via DOMParser (no script
 * execution context). Group descriptions are plain-text truncated client-side.
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

	// ── Card builder ──────────────────────────────────────────────────────────

	/**
	 * Build a single group card element.
	 *
	 * @param {object} group BP REST group object.
	 * @param {object} cfg   Block config from data attribute.
	 * @return {HTMLDivElement}
	 */
	function buildCard( group, cfg ) {
		const card = el( 'div', 'wbcom-groups-grid-card' );

		// Avatar.
		if ( cfg.showAvatar ) {
			const avatarWrap = el( 'div', 'wbcom-groups-grid-avatar' );
			const avatarLink = document.createElement( 'a' );
			avatarLink.href  = group.link || '#';

			const avatarSrc = decodeEntities( group.avatar_urls?.thumb || group.avatar_urls?.full || '' );
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
		const content = el( 'div', 'wbcom-groups-grid-content' );

		if ( cfg.showName ) {
			const nameEl   = el( 'h4', 'wbcom-groups-grid-name' );
			const nameLink = document.createElement( 'a' );
			nameLink.href        = group.link || '#';
			nameLink.textContent = group.name || '';
			nameEl.appendChild( nameLink );
			content.appendChild( nameEl );
		}

		// Description — strip tags, truncate to ~15 words.
		if ( cfg.showDescription && group.description?.rendered ) {
			const plainText = decodeEntities( group.description.rendered.replace( /<[^>]+>/g, '' ) ).trim();
			const wordArr   = plainText.split( /\s+/ );
			const descEl    = el( 'div', 'wbcom-groups-grid-description' );
			descEl.textContent = wordArr.slice( 0, 15 ).join( ' ' ) + ( wordArr.length > 15 ? '\u2026' : '' );
			content.appendChild( descEl );
		}

		// Last active meta.
		if ( cfg.showMeta && group.last_activity_diff ) {
			const metaText = cfg.i18n.activeAgo.replace( '%s', group.last_activity_diff );
			content.appendChild( el( 'p', 'wbcom-groups-grid-meta', metaText ) );
		}

		// Member count.
		if ( cfg.showMemberCount && group.total_member_count != null ) {
			content.appendChild(
				el( 'p', 'wbcom-groups-grid-members', String( group.total_member_count ) )
			);
		}

		card.appendChild( content );

		// Join button — links to the group page.
		if ( cfg.showJoinButton && cfg.loggedIn ) {
			const actionWrap = el( 'div', 'wbcom-groups-grid-action' );
			const joinLink   = document.createElement( 'a' );
			joinLink.href        = group.link || '#';
			joinLink.className   = 'button join-group-button';
			joinLink.textContent = cfg.i18n.joinGroup;
			actionWrap.appendChild( joinLink );
			card.appendChild( actionWrap );
		}

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
				// Clear the loading placeholder.
				listEl.textContent = '';

				if ( ! groups.length ) {
					const noData = el( 'div', 'wbcom-essential-no-data' );
					noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
					listEl.appendChild( noData );
					return;
				}

				groups.forEach( function ( group ) {
					listEl.appendChild( buildCard( group, cfg ) );
				} );
			} )
			.catch( function () {
				listEl.textContent = '';
				const noData = el( 'div', 'wbcom-essential-no-data' );
				noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
				listEl.appendChild( noData );
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
