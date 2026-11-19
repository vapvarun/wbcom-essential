/**
 * Group Carousel Block — Frontend JS
 *
 * Fetches groups from the BuddyPress REST API, builds slide cards,
 * then initialises Swiper. Replaces the previous Swiper-init-only
 * implementation with a full REST-API-hydrated approach.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or
 * as attribute values. Avatar URLs are decoded via DOMParser (no script
 * execution context). Group descriptions are plain-text truncated — no
 * HTML fragments are inserted from user data.
 */

import swiperA11y from '../../shared/utils/swiper-a11y';
import initFitCarousel from '../../shared/utils/fit-carousel';
import { groupMemberCount } from '../../shared/utils/bp-rest';
import { loadJoinState, joinButton, handleJoinClicks } from '../../shared/utils/bp-group-join';

const JOIN_CLASSES = { btn: 'wbe-group-carousel__join-btn', mod: 'wbe-gc-join--' };

( function () {
	'use strict';

	// Narrowest card that still fits avatar, name and button on one line each.
	const MIN_SLIDE_WIDTH = 220;

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

	// ── Slide builder ─────────────────────────────────────────────────────────

	/**
	 * Build a single swiper-slide for a group.
	 *
	 * @param {object} group BP REST group object.
	 * @param {object} cfg   Block config from data attribute.
	 * @return {HTMLDivElement} The .swiper-slide element.
	 */
	function buildSlide( group, cfg ) {
		const slide = el( 'div', 'swiper-slide' );
		const card  = el( 'div', 'wbe-group-carousel__card' );

		// Avatar.
		const avatarWrap = el( 'div', 'wbe-group-carousel__avatar' );
		const avatarLink = document.createElement( 'a' );
		avatarLink.href  = group.link || '#';
		avatarLink.setAttribute( 'aria-label', decodeEntities( group.name || '' ) );

		const avatarSrc = decodeEntities( group.avatar_urls?.thumb || group.avatar_urls?.full || '' );
		const img       = document.createElement( 'img' );
		img.src         = avatarSrc;
		img.alt         = '';
		img.className   = 'wbe-group-carousel__avatar-img';
		img.width       = cfg.avatarSize;
		img.height      = cfg.avatarSize;
		img.loading     = 'lazy';
		avatarLink.appendChild( img );
		avatarWrap.appendChild( avatarLink );
		card.appendChild( avatarWrap );

		// Info section.
		const info = el( 'div', 'wbe-group-carousel__info' );

		const nameHeading    = el( 'h3', 'wbe-group-carousel__name' );
		const nameLink       = document.createElement( 'a' );
		nameLink.href        = group.link || '#';
		nameLink.textContent = decodeEntities( group.name || '' );
		nameHeading.appendChild( nameLink );
		info.appendChild( nameHeading );

		// Member count.
		const memberCount = groupMemberCount( group );
		if ( cfg.showMemberCount && memberCount ) {
			info.appendChild(
				el( 'span', 'wbe-group-carousel__count', memberCount + ' ' + cfg.i18n.members )
			);
		}

		// Description — strip tags, truncate to ~15 words, plain text only.
		if ( cfg.showDescription && group.description?.rendered ) {
			const plainText = decodeEntities( group.description.rendered.replace( /<[^>]+>/g, '' ) ).trim();
			const wordArr   = plainText.split( /\s+/ );
			const descEl    = el( 'p', 'wbe-group-carousel__desc' );
			descEl.textContent = wordArr.slice( 0, 15 ).join( ' ' ) + ( wordArr.length > 15 ? '\u2026' : '' );
			info.appendChild( descEl );
		}

		// Join button.
		const joinBtn = cfg.showJoinButton && cfg.loggedIn ? joinButton( group, cfg, cfg._joinState, JOIN_CLASSES ) : null;
		if ( joinBtn ) {
			const actionWrap = el( 'div', 'wbe-group-carousel__action' );
			actionWrap.appendChild( joinBtn );
			info.appendChild( actionWrap );
		}

		card.appendChild( info );
		slide.appendChild( card );
		return slide;
	}

	// ── Carousel init ─────────────────────────────────────────────────────────

	/**
	 * Initialise a single group carousel.
	 *
	 * @param {HTMLElement} swiperEl The .swiper element carrying data-wbe-gc-config.
	 */
	function initCarousel( swiperEl ) {
		const cfg = JSON.parse( swiperEl.dataset.wbeGcConfig || '{}' );
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
				const wrapper = swiperEl.querySelector( '.swiper-wrapper' );
				if ( ! wrapper ) {
					return;
				}

				// Clear the loading placeholder.
				wrapper.textContent = '';

				if ( ! groups.length ) {
					const emptySlide = el( 'div', 'swiper-slide' );
					emptySlide.appendChild( el( 'p', 'wbe-group-carousel__empty', cfg.i18n.empty ) );
					wrapper.appendChild( emptySlide );
					return;
				}

				groups.forEach( function ( group ) {
					wrapper.appendChild( buildSlide( group, cfg ) );
				} );

				// Initialise Swiper now that slides are in the DOM.
				// a11y: translated screen-reader labels. Without it Swiper replaces the
				// translated button labels from render.php with its English defaults.
				initFitCarousel(
					swiperEl,
					Object.assign( {}, cfg.swiperOptions || {}, {
						a11y: swiperA11y( cfg.i18n.previous, cfg.i18n.next ),
					} ),
					MIN_SLIDE_WIDTH
				);
			} )
			.catch( function () {
				const wrapper = swiperEl.querySelector( '.swiper-wrapper' );
				if ( wrapper ) {
					wrapper.textContent = '';
					const emptySlide = el( 'div', 'swiper-slide' );
					emptySlide.appendChild( el( 'p', 'wbe-group-carousel__empty', cfg.i18n.empty ) );
					wrapper.appendChild( emptySlide );
				}
			} );

		if ( cfg.showJoinButton && cfg.loggedIn && cfg.currentUserId ) {
			const statusEl = el( 'p', 'wbe-group-carousel__join-status' );
			statusEl.setAttribute( 'role', 'status' );
			swiperEl.after( statusEl );
			handleJoinClicks( swiperEl, statusEl, cfg, JOIN_CLASSES );
		}
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function boot() {
		document.querySelectorAll( '[data-wbe-gc-config]' ).forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
