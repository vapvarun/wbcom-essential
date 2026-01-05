/**
 * Mini Cart Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function() {
	'use strict';

	/**
	 * Initialize mini cart interactions.
	 */
	function initMiniCart() {
		const miniCarts = document.querySelectorAll( '.wbcom-essential-mini-cart.has-dropdown' );

		miniCarts.forEach( ( cart ) => {
			const trigger = cart.querySelector( '.wbcom-essential-mini-cart__trigger' );
			const dropdown = cart.querySelector( '.wbcom-essential-mini-cart__dropdown' );

			if ( ! trigger || ! dropdown ) {
				return;
			}

			// Show dropdown on hover.
			cart.addEventListener( 'mouseenter', () => {
				dropdown.classList.add( 'is-visible' );
			} );

			// Hide dropdown on mouse leave.
			cart.addEventListener( 'mouseleave', () => {
				dropdown.classList.remove( 'is-visible' );
			} );

			// Toggle on click for mobile.
			trigger.addEventListener( 'click', ( e ) => {
				if ( window.innerWidth <= 768 ) {
					e.preventDefault();
					dropdown.classList.toggle( 'is-visible' );
				}
			} );
		} );

		// Close dropdown when clicking outside.
		document.addEventListener( 'click', ( e ) => {
			miniCarts.forEach( ( cart ) => {
				if ( ! cart.contains( e.target ) ) {
					const dropdown = cart.querySelector( '.wbcom-essential-mini-cart__dropdown' );
					if ( dropdown ) {
						dropdown.classList.remove( 'is-visible' );
					}
				}
			} );
		} );
	}

	/**
	 * Update cart count elements.
	 *
	 * @param {number} count New cart count.
	 */
	function updateCartCount( count ) {
		const countElements = document.querySelectorAll( '.wbcom-essential-mini-cart__count' );
		countElements.forEach( ( el ) => {
			el.textContent = String( count );
			el.setAttribute( 'data-cart-count', String( count ) );
		} );
	}

	/**
	 * Listen for WooCommerce cart events.
	 */
	function listenForCartEvents() {
		// Check if jQuery and WooCommerce are available.
		if ( typeof jQuery === 'undefined' ) {
			return;
		}

		jQuery( document.body ).on( 'added_to_cart removed_from_cart wc_fragments_refreshed', function() {
			// Reload the page section or use AJAX to update.
			// For now, we'll rely on WooCommerce's native fragment refresh.
			// The count badge will update automatically via fragments.
		} );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', () => {
			initMiniCart();
			listenForCartEvents();
		} );
	} else {
		initMiniCart();
		listenForCartEvents();
	}
}() );
