/**
 * Notification Area Block - Frontend JavaScript
 *
 * Handles dropdown toggles, search form, and user menu interactions.
 *
 * @package wbcom-essential
 */

( function() {
	'use strict';

	/**
	 * Initialize notification area functionality.
	 */
	function initNotificationArea() {
		const wrappers = document.querySelectorAll( '.wbcom-essential-notification-area-wrapper' );

		wrappers.forEach( ( wrapper ) => {
			initSearch( wrapper );
			initUserMenu( wrapper );
			initDropdowns( wrapper );
		} );

		// Global click handler to close dropdowns when clicking outside.
		document.addEventListener( 'click', handleOutsideClick );

		// Escape key handler.
		document.addEventListener( 'keydown', handleEscapeKey );
	}

	/**
	 * Initialize search toggle functionality.
	 *
	 * @param {Element} wrapper The notification area wrapper.
	 */
	function initSearch( wrapper ) {
		const searchItem = wrapper.querySelector( '.wbcom-essential-na__search' );
		if ( ! searchItem ) {
			return;
		}

		const toggle = searchItem.querySelector( '.wbcom-essential-na__search-toggle' );
		const closeBtn = searchItem.querySelector( '.wbcom-essential-na__search-close' );
		const searchInput = searchItem.querySelector( 'input[type="search"], input[name="s"]' );

		if ( toggle ) {
			toggle.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				e.stopPropagation();

				// Close other dropdowns first.
				closeAllDropdowns( wrapper, searchItem );

				searchItem.classList.toggle( 'is-open' );

				// Focus search input when opened.
				if ( searchItem.classList.contains( 'is-open' ) && searchInput ) {
					setTimeout( () => searchInput.focus(), 100 );
				}
			} );
		}

		if ( closeBtn ) {
			closeBtn.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				e.stopPropagation();
				searchItem.classList.remove( 'is-open' );
			} );
		}
	}

	/**
	 * Initialize user menu toggle functionality.
	 *
	 * @param {Element} wrapper The notification area wrapper.
	 */
	function initUserMenu( wrapper ) {
		const userItem = wrapper.querySelector( '.wbcom-essential-na__user' );
		if ( ! userItem ) {
			return;
		}

		const toggle = userItem.querySelector( '.wbcom-essential-na__user-toggle' );

		if ( toggle ) {
			toggle.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				e.stopPropagation();

				// Close other dropdowns first.
				closeAllDropdowns( wrapper, userItem );

				userItem.classList.toggle( 'is-open' );
			} );
		}
	}

	/**
	 * Initialize generic dropdown toggles for messages, notifications, cart.
	 *
	 * @param {Element} wrapper The notification area wrapper.
	 */
	function initDropdowns( wrapper ) {
		const dropdownItems = wrapper.querySelectorAll(
			'.wbcom-essential-na__messages, .wbcom-essential-na__notifications, .wbcom-essential-na__cart'
		);

		dropdownItems.forEach( ( item ) => {
			const toggle = item.querySelector( 'a[class*="-toggle"]' );

			if ( toggle ) {
				toggle.addEventListener( 'click', ( e ) => {
					// Only prevent default if item has dropdown content.
					const dropdown = item.querySelector( '.wbcom-essential-na__dropdown' );
					if ( dropdown ) {
						e.preventDefault();
						e.stopPropagation();

						// Close other dropdowns first.
						closeAllDropdowns( wrapper, item );

						item.classList.toggle( 'is-open' );
					}
				} );
			}
		} );
	}

	/**
	 * Close all dropdowns except the excluded one.
	 *
	 * @param {Element}      wrapper The notification area wrapper.
	 * @param {Element|null} exclude Element to exclude from closing.
	 */
	function closeAllDropdowns( wrapper, exclude = null ) {
		const openItems = wrapper.querySelectorAll( '.wbcom-essential-na__item.is-open' );

		openItems.forEach( ( item ) => {
			if ( item !== exclude ) {
				item.classList.remove( 'is-open' );
			}
		} );
	}

	/**
	 * Handle clicks outside of dropdowns.
	 *
	 * @param {Event} e Click event.
	 */
	function handleOutsideClick( e ) {
		const wrappers = document.querySelectorAll( '.wbcom-essential-notification-area-wrapper' );

		wrappers.forEach( ( wrapper ) => {
			const openItems = wrapper.querySelectorAll( '.wbcom-essential-na__item.is-open' );

			openItems.forEach( ( item ) => {
				if ( ! item.contains( e.target ) ) {
					item.classList.remove( 'is-open' );
				}
			} );
		} );
	}

	/**
	 * Handle Escape key to close dropdowns.
	 *
	 * @param {KeyboardEvent} e Keyboard event.
	 */
	function handleEscapeKey( e ) {
		if ( e.key === 'Escape' ) {
			const openItems = document.querySelectorAll( '.wbcom-essential-na__item.is-open' );
			openItems.forEach( ( item ) => {
				item.classList.remove( 'is-open' );
			} );
		}
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initNotificationArea );
	} else {
		initNotificationArea();
	}
} )();
