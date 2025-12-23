/**
 * Notification Area Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', () => {
	// Search toggle functionality.
	const searchToggles = document.querySelectorAll( '.wbcom-essential-na__search-toggle' );
	searchToggles.forEach( ( toggle ) => {
		const wrapper = toggle.closest( '.wbcom-essential-na__search' );
		const form = wrapper?.querySelector( '.wbcom-essential-na__search-form' );
		const closeBtn = wrapper?.querySelector( '.wbcom-essential-na__search-close' );

		toggle.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.toggle( 'is-open' );
			if ( wrapper?.classList.contains( 'is-open' ) ) {
				form?.querySelector( 'input[type="search"]' )?.focus();
			}
		} );

		closeBtn?.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.remove( 'is-open' );
		} );
	} );

	// User dropdown toggle.
	const userDropdowns = document.querySelectorAll( '.wbcom-essential-na__user-toggle' );
	userDropdowns.forEach( ( toggle ) => {
		const wrapper = toggle.closest( '.wbcom-essential-na__user' );

		toggle.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.toggle( 'is-open' );
		} );
	} );

	// Messages dropdown toggle.
	const messagesDropdowns = document.querySelectorAll( '.wbcom-essential-na__messages' );
	messagesDropdowns.forEach( ( wrapper ) => {
		const toggle = wrapper.querySelector( '.wbcom-essential-na__messages-toggle' );

		toggle?.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.toggle( 'is-open' );
		} );
	} );

	// Notifications dropdown toggle.
	const notificationsDropdowns = document.querySelectorAll( '.wbcom-essential-na__notifications' );
	notificationsDropdowns.forEach( ( wrapper ) => {
		const toggle = wrapper.querySelector( '.wbcom-essential-na__notifications-toggle' );

		toggle?.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.toggle( 'is-open' );
		} );
	} );

	// Cart dropdown toggle.
	const cartDropdowns = document.querySelectorAll( '.wbcom-essential-na__cart' );
	cartDropdowns.forEach( ( wrapper ) => {
		const toggle = wrapper.querySelector( '.wbcom-essential-na__cart-toggle' );

		toggle?.addEventListener( 'click', ( e ) => {
			e.preventDefault();
			wrapper?.classList.toggle( 'is-open' );
		} );
	} );

	// Single delegated listener for closing dropdowns on outside click.
	document.addEventListener( 'click', ( e ) => {
		// Close user dropdowns.
		document.querySelectorAll( '.wbcom-essential-na__user.is-open' ).forEach( ( wrapper ) => {
			if ( ! wrapper.contains( e.target ) ) {
				wrapper.classList.remove( 'is-open' );
			}
		} );

		// Close messages dropdowns.
		document.querySelectorAll( '.wbcom-essential-na__messages.is-open' ).forEach( ( wrapper ) => {
			if ( ! wrapper.contains( e.target ) ) {
				wrapper.classList.remove( 'is-open' );
			}
		} );

		// Close notifications dropdowns.
		document.querySelectorAll( '.wbcom-essential-na__notifications.is-open' ).forEach( ( wrapper ) => {
			if ( ! wrapper.contains( e.target ) ) {
				wrapper.classList.remove( 'is-open' );
			}
		} );

		// Close cart dropdowns.
		document.querySelectorAll( '.wbcom-essential-na__cart.is-open' ).forEach( ( wrapper ) => {
			if ( ! wrapper.contains( e.target ) ) {
				wrapper.classList.remove( 'is-open' );
			}
		} );
	} );
} );
