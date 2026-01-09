/**
 * Header Bar Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a header bar instance.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initHeaderBar( container ) {
		// Profile dropdown toggle.
		const profileDropdown = container.querySelector(
			'.wbcom-header-bar-profile'
		);
		if ( profileDropdown ) {
			const profileLink = profileDropdown.querySelector(
				'.wbcom-profile-link'
			);

			if ( profileLink ) {
				profileLink.addEventListener( 'click', function ( e ) {
					// Only toggle on arrow click or if clicking the name area.
					const target = e.target;
					if (
						target.classList.contains( 'wbcom-profile-arrow' ) ||
						target.classList.contains( 'wbcom-profile-name' )
					) {
						e.preventDefault();
						profileDropdown.classList.toggle( 'is-open' );
					}
				} );
			}
		}

		// Search toggle.
		const searchButton = container.querySelector(
			'.wbcom-header-bar-search'
		);
		const searchOverlay = container.querySelector(
			'.wbcom-header-bar-search-overlay'
		);
		const searchClose = container.querySelector( '.wbcom-search-close' );

		if ( searchButton && searchOverlay ) {
			searchButton.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				container.classList.add( 'search-active' );

				// Focus search input.
				const searchInput = searchOverlay.querySelector(
					'input[type="search"], input[type="text"]'
				);
				if ( searchInput ) {
					setTimeout( () => searchInput.focus(), 100 );
				}
			} );
		}

		if ( searchClose && searchOverlay ) {
			searchClose.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				container.classList.remove( 'search-active' );
			} );

			// Close on escape key.
			document.addEventListener( 'keydown', function ( e ) {
				if (
					e.key === 'Escape' &&
					container.classList.contains( 'search-active' )
				) {
					container.classList.remove( 'search-active' );
				}
			} );

			// Close on overlay background click.
			searchOverlay.addEventListener( 'click', function ( e ) {
				if ( e.target === searchOverlay ) {
					container.classList.remove( 'search-active' );
				}
			} );
		}

		// Close dropdowns when clicking outside.
		document.addEventListener( 'click', function ( e ) {
			const dropdowns = container.querySelectorAll(
				'.wbcom-header-bar-dropdown.is-open'
			);
			dropdowns.forEach( function ( dropdown ) {
				if ( ! dropdown.contains( e.target ) ) {
					dropdown.classList.remove( 'is-open' );
				}
			} );
		} );

		// Dark mode toggle.
		const darkModeButton = container.querySelector(
			'.wbcom-header-bar-dark-mode'
		);

		if ( darkModeButton ) {
			// Check for saved dark mode preference on page load.
			const savedDarkMode = localStorage.getItem( 'wbcom-dark-mode' );
			if ( savedDarkMode === 'true' ) {
				document.body.classList.add( 'dark-mode' );
				darkModeButton.classList.add( 'is-active' );
			}

			darkModeButton.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				const isDarkMode = document.body.classList.toggle( 'dark-mode' );
				darkModeButton.classList.toggle( 'is-active', isDarkMode );

				// Save preference to localStorage.
				localStorage.setItem( 'wbcom-dark-mode', isDarkMode.toString() );
			} );
		}
	}

	/**
	 * Initialize all header bars on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll(
			'.wbcom-essential-header-bar'
		);
		containers.forEach( initHeaderBar );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
