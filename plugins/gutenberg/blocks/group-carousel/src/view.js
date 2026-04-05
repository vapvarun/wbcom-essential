/**
 * Group Carousel Block — Frontend JS
 *
 * Fetches groups from the BuddyPress REST API, builds slide cards,
 * then initialises Swiper. Replaces the previous Swiper-init-only
 * implementation with a full REST-API-hydrated approach.
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
		const card  = el( 'div', 'wbcom-group-carousel-card' );

		// Avatar.
		const avatarWrap = el( 'div', 'wbcom-group-carousel-avatar' );
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

		// Content section.
		const content = el( 'div', 'wbcom-group-carousel-content' );

		const nameEl   = el( 'h4', 'wbcom-group-carousel-name' );
		const nameLink = document.createElement( 'a' );
		nameLink.href        = group.link || '#';
		nameLink.textContent = group.name || '';
		nameEl.appendChild( nameLink );
		content.appendChild( nameEl );

		// Last active meta.
		if ( cfg.showMeta && group.last_activity_diff ) {
			const metaText = cfg.i18n.activeAgo.replace( '%s', group.last_activity_diff );
			content.appendChild( el( 'p', 'wbcom-group-carousel-meta', metaText ) );
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

		const slidesPerGroup = options.slidesPerGroup || options.slidesToScroll || 1;
		const swiperConfig   = Object.assign( {}, options, { slidesPerGroup } );

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
	 * Initialise a single group carousel container.
	 *
	 * @param {HTMLElement} container The .wbcom-group-carousel-container element
	 *                                carrying data-wbe-gc-config.
	 */
	function initGroupCarousel( container ) {
		const cfg = JSON.parse( container.dataset.wbeGcConfig || '{}' );
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
				const wrapper = container.querySelector( '.swiper-wrapper' );
				if ( ! wrapper ) {
					return;
				}

				// Clear the loading placeholder.
				wrapper.textContent = '';

				if ( ! groups.length ) {
					const noData = el( 'div', 'wbcom-essential-no-data' );
					noData.appendChild( el( 'p', null, cfg.i18n.empty ) );
					container.parentNode.replaceChild( noData, container );
					return;
				}

				groups.forEach( function ( group ) {
					wrapper.appendChild( buildSlide( group, cfg ) );
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
		document.querySelectorAll( '[data-wbe-gc-config]' ).forEach( initGroupCarousel );
	}

	// Initialize on DOM ready, with a check for Swiper availability.
	function initWhenReady() {
		if ( document.readyState === 'loading' ) {
			document.addEventListener( 'DOMContentLoaded', initAll );
		} else {
			initAll();
		}
	}

	initWhenReady();
} )();
