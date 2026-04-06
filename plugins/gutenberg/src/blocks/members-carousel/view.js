/**
 * Members Carousel Block — Frontend JS
 *
 * Fetches members from the BuddyPress REST API, builds slide cards,
 * then initialises Swiper. Handles friend-request buttons with
 * optimistic UI and error rollback.
 *
 * DOM safety: all user-supplied strings are assigned via textContent or
 * as attribute values. Avatar URLs are decoded via DOMParser (no script
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
				return { label: i18n.friends,   stateClass: 'wbe-mc-friend--is-friend' };
			case 'pending':
				return { label: i18n.pending,   stateClass: 'wbe-mc-friend--pending' };
			default:
				return { label: i18n.addFriend, stateClass: 'wbe-mc-friend--not-friends' };
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
		// Current user sees "View Profile" instead of "Add Friend".
		if ( cfg.currentUserId && member.id === cfg.currentUserId ) {
			const link       = document.createElement( 'a' );
			link.href        = member.link || '#';
			link.className   = 'wbe-members-carousel__friend-btn wbe-mc-friend--view-profile';
			link.textContent = cfg.i18n.viewProfile || 'View Profile';
			return link;
		}

		const status  = member.friendship_status_slug || 'not_friends';
		const state   = friendBtnState( status, cfg.i18n );
		const btn     = document.createElement( 'button' );

		btn.type        = 'button';
		btn.className   = 'wbe-members-carousel__friend-btn ' + state.stateClass;
		btn.textContent = state.label;
		btn.dataset.memberId = member.id;
		btn.dataset.status   = status;
		btn.disabled         = status !== 'not_friends';

		return btn;
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
		const card  = el( 'div', 'wbe-members-carousel__card' );

		// Avatar.
		const avatarWrap = el( 'div', 'wbe-members-carousel__avatar' );
		const avatarLink = document.createElement( 'a' );
		avatarLink.href  = member.link || '#';

		const avatarSrc = decodeEntities( member.avatar_urls?.thumb || member.avatar_urls?.full || '' );
		const img       = document.createElement( 'img' );
		img.src         = avatarSrc;
		img.alt         = '';
		img.className   = 'wbe-members-carousel__avatar-img';
		img.width       = cfg.avatarSize;
		img.height      = cfg.avatarSize;
		img.loading     = 'lazy';
		img.style.borderRadius = '50%';
		avatarLink.appendChild( img );
		avatarWrap.appendChild( avatarLink );
		card.appendChild( avatarWrap );

		// Info section.
		const info = el( 'div', 'wbe-members-carousel__info' );

		const nameHeading    = el( 'h3', 'wbe-members-carousel__name' );
		const nameLink       = document.createElement( 'a' );
		nameLink.href        = member.link || '#';
		nameLink.textContent = member.name || '';
		nameHeading.appendChild( nameLink );
		info.appendChild( nameHeading );

		if ( cfg.showLastActive && member.last_activity?.timediff ) {
			info.appendChild( el( 'span', 'wbe-members-carousel__meta', member.last_activity.timediff ) );
		}

		if ( cfg.showFriendButton && cfg.loggedIn ) {
			const actionWrap = el( 'div', 'wbe-members-carousel__action' );
			actionWrap.appendChild( buildFriendButton( member, cfg ) );
			info.appendChild( actionWrap );
		}

		card.appendChild( info );
		slide.appendChild( card );
		return slide;
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

		// Optimistic update.
		btn.disabled        = true;
		btn.textContent     = cfg.i18n.pending;
		btn.className       = 'wbe-members-carousel__friend-btn wbe-mc-friend--pending';
		btn.dataset.status  = 'pending';

		const friendsUrl = cfg.restUrl.replace( /\/members([^/]*)$/, '/friends' );

		fetch( friendsUrl, {
			method:      'POST',
			headers:     {
				'Content-Type': 'application/json',
				'X-WP-Nonce':  cfg.restNonce,
			},
			credentials: 'same-origin',
			body:        JSON.stringify( { initiator_id: cfg.currentUserId, friend_id: memberId } ),
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
	 * Initialise a single members carousel.
	 *
	 * @param {HTMLElement} swiperEl The .swiper element carrying data-wbe-mc-config.
	 */
	function initCarousel( swiperEl ) {
		const cfg = JSON.parse( swiperEl.dataset.wbeMcConfig || '{}' );
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
				const wrapper = swiperEl.querySelector( '.swiper-wrapper' );
				if ( ! wrapper ) {
					return;
				}

				// Clear the loading placeholder.
				wrapper.textContent = '';

				if ( ! members.length ) {
					const emptySlide = el( 'div', 'swiper-slide' );
					emptySlide.appendChild( el( 'p', 'wbe-members-carousel__empty', cfg.i18n.empty ) );
					wrapper.appendChild( emptySlide );
					return;
				}

				members.forEach( function ( member ) {
					wrapper.appendChild( buildSlide( member, cfg ) );
				} );

				// Initialise Swiper now that slides are in the DOM.
				initSwiper( swiperEl, Object.assign( {}, cfg.swiperOptions || {} ) );
			} )
			.catch( function () {
				const wrapper = swiperEl.querySelector( '.swiper-wrapper' );
				if ( wrapper ) {
					wrapper.textContent = '';
					const emptySlide = el( 'div', 'swiper-slide' );
					emptySlide.appendChild( el( 'p', 'wbe-members-carousel__empty', cfg.i18n.empty ) );
					wrapper.appendChild( emptySlide );
				}
			} );

		// Event delegation for friend buttons.
		swiperEl.addEventListener( 'click', function ( e ) {
			const btn = e.target.closest( '.wbe-members-carousel__friend-btn' );
			if ( btn && btn.dataset.status === 'not_friends' && ! btn.disabled ) {
				sendFriendRequest( btn, cfg );
			}
		} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function boot() {
		document.querySelectorAll( '[data-wbe-mc-config]' ).forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
