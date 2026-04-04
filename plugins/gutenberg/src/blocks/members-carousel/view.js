/**
 * Members Carousel Block - Frontend JavaScript
 *
 * Initializes Swiper for each members carousel block on the page.
 * Swiper is registered globally by the plugin — no import needed.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a single carousel element.
	 *
	 * @param {HTMLElement} el The .swiper element.
	 */
	function initCarousel( el ) {
		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		let options;
		try {
			options = JSON.parse( el.dataset.swiperOptions || '{}' );
		} catch ( e ) {
			options = {};
		}

		// Resolve next/prev elements relative to this swiper instance
		// so multiple carousels on the same page don't conflict.
		if ( options.navigation ) {
			options.navigation = {
				nextEl: el.querySelector( '.swiper-button-next' ),
				prevEl: el.querySelector( '.swiper-button-prev' ),
			};
		}

		if ( options.pagination ) {
			options.pagination = {
				el: el.querySelector( '.swiper-pagination' ),
				clickable: true,
			};
		}

		new Swiper( el, options );
	}

	/**
	 * Initialize all carousel blocks on the page.
	 */
	function initAll() {
		document
			.querySelectorAll( '.wbe-members-carousel .swiper' )
			.forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
