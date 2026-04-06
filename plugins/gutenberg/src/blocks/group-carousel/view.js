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

	// ── Join button ──────────────────────────────────────────────────────────

	/**
	 * Build the group join action button.
	 *
	 * @param {object} group        BP REST group object.
	 * @param {object} cfg          Block config.
	 * @param {Set}    userGroupIds Set of group IDs the current user belongs to.
	 * @return {HTMLButtonElement}
	 */
	function buildJoinButton( group, cfg, userGroupIds ) {
		var isMember = userGroupIds.has( group.id );
		var btn      = document.createElement( 'button' );
		btn.type             = 'button';
		btn.dataset.groupId  = group.id;

		if ( isMember ) {
			btn.className      = 'wbe-group-carousel__join-btn wbe-gc-join--member';
			btn.textContent    = cfg.i18n.joined;
			btn.dataset.status = 'member';
			btn.disabled       = true;
		} else {
			btn.className      = 'wbe-group-carousel__join-btn wbe-gc-join--not-member';
			btn.textContent    = cfg.i18n.joinGroup;
			btn.dataset.status = 'not_member';
		}

		return btn;
	}

	/**
	 * Send a group join request with optimistic UI and error rollback.
	 *
	 * @param {HTMLButtonElement} btn Clicked join button.
	 * @param {object}            cfg Block config.
	 */
	function sendJoinRequest( btn, cfg ) {
		var groupId   = parseInt( btn.dataset.groupId, 10 );
		var prevLabel  = btn.textContent;
		var prevClass  = btn.className;
		var prevStatus = btn.dataset.status;

		// Optimistic update.
		btn.disabled       = true;
		btn.textContent    = cfg.i18n.joined;
		btn.className      = 'wbe-group-carousel__join-btn wbe-gc-join--member';
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
				// Handle pending membership (private groups).
				if ( data && data[0] && data[0].is_confirmed === false ) {
					btn.textContent    = cfg.i18n.pending;
					btn.className      = 'wbe-group-carousel__join-btn wbe-gc-join--pending';
					btn.dataset.status = 'pending';
				}
			} )
			.catch( function () {
				// Rollback on error.
				btn.textContent    = prevLabel;
				btn.className      = prevClass;
				btn.dataset.status = prevStatus;
				btn.disabled       = prevStatus !== 'not_member';
			} );
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
		avatarLink.setAttribute( 'aria-label', group.name || '' );

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
		nameLink.textContent = group.name || '';
		nameHeading.appendChild( nameLink );
		info.appendChild( nameHeading );

		// Member count.
		if ( cfg.showMemberCount && group.total_member_count ) {
			info.appendChild(
				el( 'span', 'wbe-group-carousel__count', group.total_member_count + ' ' + cfg.i18n.members )
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
		if ( cfg.showJoinButton && cfg.loggedIn ) {
			var actionWrap = el( 'div', 'wbe-group-carousel__action' );
			actionWrap.appendChild( buildJoinButton( group, cfg, cfg._userGroupIds ) );
			info.appendChild( actionWrap );
		}

		card.appendChild( info );
		slide.appendChild( card );
		return slide;
	}

	// ── Carousel init ─────────────────────────────────────────────────────────

	/**
	 * Initialise Swiper on an element, resolving nav/pagination selectors
	 * to DOM nodes so multiple carousels on the same page don't conflict.
	 *
	 * @param {HTMLElement} swiperEl The .swiper element.
	 * @param {object}      options  Raw Swiper options from config.
	 */
	function initSwiper( swiperEl, options ) {
		if ( typeof Swiper === 'undefined' ) {
			return;
		}
		if ( swiperEl._swiperInstance ) {
			return;
		}

		// Resolve navigation/pagination elements relative to this instance.
		if ( options.navigation ) {
			options.navigation = {
				nextEl: swiperEl.querySelector( '.swiper-button-next' ),
				prevEl: swiperEl.querySelector( '.swiper-button-prev' ),
			};
		}
		if ( options.pagination ) {
			options.pagination = {
				el:        swiperEl.querySelector( '.swiper-pagination' ),
				clickable: true,
			};
		}

		// Respect prefers-reduced-motion.
		if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
			options.autoplay = false;
			options.speed    = 0;
		}

		swiperEl._swiperInstance = new Swiper( swiperEl, options );
	}

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
				// If join button enabled, fetch current user's groups first.
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
				initSwiper( swiperEl, Object.assign( {}, cfg.swiperOptions || {} ) );
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

		// Event delegation for join buttons.
		swiperEl.addEventListener( 'click', function ( e ) {
			var btn = e.target.closest( '.wbe-group-carousel__join-btn' );
			if ( btn && btn.dataset.status === 'not_member' && ! btn.disabled ) {
				sendJoinRequest( btn, cfg );
			}
		} );
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
