/**
 * Product Carousel Block - Frontend Script
 *
 * Initializes Swiper for each product carousel on the page.
 * Configuration is read from data-swiper-options JSON attribute.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize all product carousels.
	 */
	function initProductCarousels() {
		const carousels = document.querySelectorAll(
			'.wbe-product-carousel .wbe-product-carousel__swiper'
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

			const autoplayEnabled  = opts.autoplay && ! reducedMotion;
			const delay            = parseInt( opts.delay, 10 ) || 3000;
			const loop             = opts.loop !== false;
			const slidesDesktop    = parseInt( opts.slidesDesktop, 10 ) || 4;
			const slidesTablet     = parseInt( opts.slidesTablet, 10 ) || 2;
			const slidesMobile     = parseInt( opts.slidesMobile, 10 ) || 1;
			const spaceBetween     = parseInt( opts.spaceBetween, 10 ) || 24;
			const showDots         = opts.showDots !== false;
			const showArrows       = opts.showArrows !== false;

			const swiperConfig = {
				loop,
				grabCursor: true,
				autoplay: autoplayEnabled
					? { delay, disableOnInteraction: false, pauseOnMouseEnter: true }
					: false,
				breakpoints: {
					0: {
						slidesPerView: slidesMobile,
						spaceBetween: Math.min( spaceBetween, 16 ),
					},
					640: {
						slidesPerView: slidesTablet,
						spaceBetween: Math.min( spaceBetween, 20 ),
					},
					1024: {
						slidesPerView: slidesDesktop,
						spaceBetween,
					},
				},
				a11y: {
					prevSlideMessage: 'Previous product',
					nextSlideMessage: 'Next product',
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
		document.addEventListener( 'DOMContentLoaded', initProductCarousels );
	} else {
		initProductCarousels();
	}
} )();
