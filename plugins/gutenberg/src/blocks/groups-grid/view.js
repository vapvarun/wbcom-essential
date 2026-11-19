/**
 * Groups Grid Block — Frontend JS
 *
 * Hydrates the grid container using the BuddyPress REST API.
 * Handles: initial render, join-group button (shared/utils/bp-group-join.js).
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values. Avatar URLs are decoded via a DOMParser text/html parse
 * (no script execution context). Group descriptions are plain-text truncated
 * client-side so no HTML is ever inserted into the DOM from user data.
 */

import { groupMemberCount, groupLastActive } from '../../shared/utils/bp-rest';
import { loadJoinState, joinButton, handleJoinClicks } from '../../shared/utils/bp-group-join';

const JOIN_CLASSES = { btn: 'wbe-groups-grid__join-btn', mod: 'wbe-gg-join--' };

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
		nameLink.textContent = decodeEntities( group.name || '' );
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

		const memberCount = groupMemberCount( group );
		if ( cfg.showMemberCount && memberCount ) {
			meta.appendChild(
				el( 'span', 'wbe-groups-grid__count', memberCount + ' ' + ( 1 === Number( memberCount ) ? cfg.i18n.member : cfg.i18n.members ) )
			);
		}

		const lastActive = cfg.showLastActive ? groupLastActive( group ) : '';
		if ( lastActive ) {
			meta.appendChild(
				el( 'span', 'wbe-groups-grid__active', cfg.i18n.activeAgo.replace( '%s', lastActive ) )
			);
		}

		info.appendChild( meta );

		// Join button.
		const joinBtn = cfg.showJoinButton && cfg.loggedIn ? joinButton( group, cfg, cfg._joinState, JOIN_CLASSES ) : null;
		if ( joinBtn ) {
			const actionWrap = el( 'div', 'wbe-groups-grid__action' );
			actionWrap.appendChild( joinBtn );
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
				if ( cfg.showJoinButton && cfg.loggedIn && cfg.currentUserId ) {
					return loadJoinState( groups, cfg ).then( function ( state ) {
						cfg._joinState = state;
						return groups;
					} );
				}
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

				if ( cfg._joinState ) {
					const statusEl = el( 'p', 'wbe-groups-grid__join-status' );
					statusEl.setAttribute( 'role', 'status' );
					listEl.after( statusEl );
					handleJoinClicks( listEl, statusEl, cfg, JOIN_CLASSES );
				}
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
