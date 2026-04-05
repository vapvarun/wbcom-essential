/**
 * Members Carousel Block — Frontend JS
 *
 * Fetches members from the BuddyPress REST API, builds slide cards,
 * then initialises Swiper. Replaces the previous Swiper-init-only
 * implementation with a full REST-API-hydrated approach.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or as
 * attribute values. Avatar URLs are decoded via DOMParser (no script
 * execution context). Swiper is expected to be registered globally by
 * the plugin — no import needed.
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

	// ── Slide builder ─────────────────────────────────────────────────────────

	/**
	 * Build a single swiper-slide for a member.
	 *
	 * @param {object} member BP REST member object.
	 * @param {object} cfg    Block config from data attribute.
	 * @return {HTMLDivElement} The .swiper-slide element.
	 */
	function buildSlide( member, cfg ) {
		const slide = el( 'div', 'swiper-slide' );
		const card  = el( 'div', 'wbcom-member-carousel-card' );

		// Avatar.
		const avatarWrap = el( 'div', 'wbcom-member-carousel-avatar' );
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

		// Content section.
		const content = el( 'div', 'wbcom-member-carousel-content' );

		const nameEl   = el( 'h4', 'wbcom-member-carousel-name' );
		const nameLink = document.createElement( 'a' );
		nameLink.href        = member.link || '#';
		nameLink.textContent = member.name || '';
		nameEl.appendChild( nameLink );
		content.appendChild( nameEl );

		if ( cfg.showLastActive && member.last_activity?.timediff ) {
			content.appendChild( el( 'p', 'wbcom-member-carousel-meta', member.last_activity.timediff ) );
		}

		card.appendChild( content );
		slide.appendChild( card );
		return slide;
	}

	// ── Swiper initialisation ─────────────────────────────────────────────────

	/**
	 * Initialise Swiper on a container, resolving nav/pagination selectors
	 * to DOM nodes so multiple carousels on the same page don't conflict.
	 *
	 * @param {HTMLElement} container The .swiper element.
	 * @param {object}      options   Raw Swiper options from config.
	 */
	function initSwiper( container, options ) {
		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		const swiperConfig = Object.assign( {}, options );

		// Resolve navigation elements relative to this instance.
		if ( swiperConfig.navigation ) {
			swiperConfig.navigation = {
				nextEl: container.querySelector( '.swiper-button-next' ),
				prevEl: container.querySelector( '.swiper-button-prev' ),
			};
		}

		if ( swiperConfig.pagination ) {
			swiperConfig.pagination = {
				el:        container.querySelector( '.swiper-pagination' ),
				clickable: true,
			};
		}

		// Respect prefers-reduced-motion.
		if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
			swiperConfig.autoplay = false;
			swiperConfig.speed    = 0;
		}

		new Swiper( container, swiperConfig );
	}

	// ── Carousel init ─────────────────────────────────────────────────────────

	/**
	 * Initialise a single members carousel container.
	 *
	 * @param {HTMLElement} container The .wbcom-members-carousel-container element
	 *                                carrying data-wbe-mc-config.
	 */
	function initMembersCarousel( container ) {
		const cfg = JSON.parse( container.dataset.wbeMcConfig || '{}' );
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
				const wrapper = container.querySelector( '.swiper-wrapper' );
				if ( ! wrapper ) {
					return;
				}

				// Clear the loading placeholder.
				wrapper.textContent = '';

				if ( ! members.length ) {
					const noData = el( 'div', 'wbcom-essential-no-data' );
					noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
					// Replace the entire swiper with the no-data message.
					container.parentNode.replaceChild( noData, container );
					return;
				}

				members.forEach( function ( member ) {
					wrapper.appendChild( buildSlide( member, cfg ) );
				} );

				// Initialise Swiper now that slides are in the DOM.
				initSwiper( container, cfg.swiperOptions || {} );
			} )
			.catch( function () {
				const wrapper = container.querySelector( '.swiper-wrapper' );
				if ( wrapper ) {
					wrapper.textContent = '';
					const noData = el( 'div', 'wbcom-essential-no-data' );
					noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
					container.parentNode.replaceChild( noData, container );
				}
			} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function initAll() {
		document.querySelectorAll( '[data-wbe-mc-config]' ).forEach( initMembersCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
