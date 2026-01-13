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
			const drawer = cart.querySelector( '.wbcom-essential-mini-cart__drawer' );

			if ( ! trigger || ! drawer ) {
				return;
			}

			const overlay = drawer.querySelector( '.wbcom-essential-mini-cart__drawer-overlay' );
			const closeBtn = drawer.querySelector( '.wbcom-essential-mini-cart__drawer-close' );

			/**
			 * Open the cart drawer.
			 */
			function openDrawer() {
				drawer.setAttribute( 'aria-hidden', 'false' );
				document.body.classList.add( 'mini-cart-drawer-open' );
			}

			/**
			 * Close the cart drawer.
			 */
			function closeDrawer() {
				drawer.setAttribute( 'aria-hidden', 'true' );
				document.body.classList.remove( 'mini-cart-drawer-open' );
			}

			// Open drawer on cart icon click.
			trigger.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				openDrawer();
			} );

			// Close drawer on overlay click.
			if ( overlay ) {
				overlay.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					closeDrawer();
				} );
			}

			// Close drawer on close button click.
			if ( closeBtn ) {
				closeBtn.addEventListener( 'click', ( e ) => {
					e.preventDefault();
					closeDrawer();
				} );
			}

			// Close drawer on ESC key.
			document.addEventListener( 'keydown', ( e ) => {
				if ( e.key === 'Escape' && drawer.getAttribute( 'aria-hidden' ) === 'false' ) {
					closeDrawer();
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

			// Show/hide based on count.
			if ( count > 0 ) {
				el.style.display = '';
			} else {
				el.style.display = 'none';
			}
		} );
	}

	/**
	 * Update cart total elements with sanitized content.
	 *
	 * @param {string} totalHtml HTML string containing the price.
	 */
	function updateCartTotal( totalHtml ) {
		// Parse HTML safely using DOMParser.
		const parser = new DOMParser();
		const doc = parser.parseFromString( totalHtml, 'text/html' );
		const priceElement = doc.querySelector( '.woocommerce-Price-amount' );

		if ( ! priceElement ) {
			return;
		}

		// Extract text content safely.
		const priceText = priceElement.textContent || '';

		const totalElements = document.querySelectorAll( '.wbcom-essential-mini-cart__total' );
		totalElements.forEach( ( el ) => {
			el.textContent = priceText;
		} );

		// Also update subtotal in dropdown.
		const subtotalElements = document.querySelectorAll( '.wbcom-essential-mini-cart__subtotal span:last-child' );
		subtotalElements.forEach( ( el ) => {
			el.textContent = priceText;
		} );
	}

	/**
	 * Refresh cart data via AJAX.
	 */
	function refreshCartData() {
		// Use WooCommerce's AJAX endpoint to get cart fragments.
		if ( typeof jQuery === 'undefined' || typeof wc_cart_fragments_params === 'undefined' ) {
			return;
		}

		jQuery.ajax( {
			url: wc_cart_fragments_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'get_refreshed_fragments' ),
			type: 'POST',
			success: function( data ) {
				if ( data && data.fragments ) {
					// Look for cart count in WooCommerce fragments.
					for ( const selector in data.fragments ) {
						const html = data.fragments[ selector ];
						if ( html && typeof html === 'string' ) {
							// Extract count from cart-contents-count class.
							const countMatch = html.match( /cart-contents-count[^>]*>(\d+)</ );
							if ( countMatch && countMatch[ 1 ] ) {
								updateCartCount( parseInt( countMatch[ 1 ], 10 ) );
							}

							// Extract and update total safely.
							if ( html.includes( 'woocommerce-Price-amount' ) ) {
								updateCartTotal( html );
							}
						}
					}
				}
			}
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

		// Listen for cart update events.
		jQuery( document.body ).on( 'added_to_cart removed_from_cart', function( event, fragments ) {
			// Extract cart count from fragments if available.
			if ( fragments ) {
				for ( const selector in fragments ) {
					const html = fragments[ selector ];
					if ( html && typeof html === 'string' ) {
						const countMatch = html.match( /cart-contents-count[^>]*>(\d+)</ );
						if ( countMatch && countMatch[ 1 ] ) {
							updateCartCount( parseInt( countMatch[ 1 ], 10 ) );
						}

						if ( html.includes( 'woocommerce-Price-amount' ) ) {
							updateCartTotal( html );
						}
					}
				}
			} else {
				// Fallback: fetch fresh cart data.
				refreshCartData();
			}
		} );

		// Listen for fragments refresh (e.g., after quantity change on cart page).
		jQuery( document.body ).on( 'wc_fragments_refreshed wc_fragments_loaded', function() {
			refreshCartData();
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
