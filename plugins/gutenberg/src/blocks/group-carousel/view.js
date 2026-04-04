/**
 * Group Carousel Block - Frontend JavaScript
 *
 * Initializes Swiper for each group carousel block on the page.
 * Swiper is registered globally by the plugin — no import needed.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a single carousel element.
	 *
	 * @param {HTMLElement} el The .swiper element inside .wbe-group-carousel.
	 */
	function initCarousel( el ) {
		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		// Guard against double-init.
		if ( el._swiperInstance ) {
			return;
		}

		let options;
		try {
			options = JSON.parse( el.dataset.swiperOptions || '{}' );
		} catch ( e ) {
			options = {};
		}

		// Resolve navigation/pagination elements relative to this swiper
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

		// Respect prefers-reduced-motion.
		if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
			options.autoplay = false;
			options.speed    = 0;
		}

		el._swiperInstance = new Swiper( el, options );
	}

	/**
	 * Initialize all group carousel blocks on the page.
	 */
	function initAll() {
		document
			.querySelectorAll( '.wbe-group-carousel .swiper' )
			.forEach( initCarousel );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
