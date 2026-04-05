/**
 * Customer Reviews Block - Frontend Script
 *
 * Initializes Swiper for each customer reviews carousel on the page.
 * Configuration is read from data-swiper-options JSON attribute.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize all customer review carousels.
	 */
	function initReviewCarousels() {
		const carousels = document.querySelectorAll(
			'.wbe-customer-reviews .wbe-customer-reviews__swiper'
		);

		if ( ! carousels.length ) {
			return;
		}

		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		const reducedMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		carousels.forEach( ( el ) => {
			if ( el._swiperInstance ) {
				return;
			}

			let opts = {};
			try {
				opts = JSON.parse( el.dataset.swiperOptions || '{}' );
			} catch ( e ) {
				// use defaults
			}

			const autoplayEnabled = opts.autoplay && ! reducedMotion;
			const delay           = parseInt( opts.delay, 10 ) || 4000;
			const loop            = opts.loop !== false;
			const slidesDesktop   = parseInt( opts.slidesDesktop, 10 ) || 2;
			const slidesTablet    = parseInt( opts.slidesTablet, 10 ) || 1;
			const showDots        = opts.showDots !== false;
			const showArrows      = opts.showArrows !== false;

			const swiperConfig = {
				loop,
				grabCursor: true,
				autoplay: autoplayEnabled
					? { delay, disableOnInteraction: false, pauseOnMouseEnter: true }
					: false,
				breakpoints: {
					0: {
						slidesPerView: 1,
						spaceBetween: 16,
					},
					640: {
						slidesPerView: slidesTablet,
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: slidesDesktop,
						spaceBetween: 28,
					},
				},
				a11y: {
					prevSlideMessage: 'Previous review',
					nextSlideMessage: 'Next review',
				},
			};

			if ( showDots ) {
				swiperConfig.pagination = {
					el: el.querySelector( '.swiper-pagination' ),
					clickable: true,
				};
			}

			if ( showArrows ) {
				swiperConfig.navigation = {
					prevEl: el.querySelector( '.swiper-button-prev' ),
					nextEl: el.querySelector( '.swiper-button-next' ),
				};
			}

			const instance = new Swiper( el, swiperConfig );
			el._swiperInstance = instance;
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initReviewCarousels );
	} else {
		initReviewCarousels();
	}
} )();
