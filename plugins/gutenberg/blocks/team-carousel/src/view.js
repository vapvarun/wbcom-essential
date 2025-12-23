/**
 * Team Carousel Block - Frontend Script
 *
 * Initializes Swiper carousels for team member display.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize all team carousels on the page.
	 */
	function initTeamCarousels() {
		const carousels = document.querySelectorAll(
			'.wbcom-essential-team-carousel'
		);

		if ( ! carousels.length ) {
			return;
		}

		// Check if Swiper is available.
		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		carousels.forEach( ( carousel ) => {
			const swiperContainer = carousel.querySelector( '.wbcom-team-swiper' );
			if ( ! swiperContainer ) {
				return;
			}

			// Get configuration from data attribute.
			let config = {};
			try {
				config = JSON.parse( carousel.dataset.swiperConfig || '{}' );
			} catch ( e ) {
				// Invalid config, use defaults.
			}

			// Initialize Swiper.
			new Swiper( swiperContainer, config );
		} );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTeamCarousels );
	} else {
		initTeamCarousels();
	}
} )();
