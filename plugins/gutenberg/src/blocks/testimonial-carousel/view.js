/**
 * Testimonial Carousel Block - Frontend Script
 *
 * Initializes Swiper carousels for testimonial display.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize all testimonial carousels.
	 */
	function initTestimonialCarousels() {
		const blocks = document.querySelectorAll( '.wbe-testimonial-carousel' );

		if ( ! blocks.length ) {
			return;
		}

		if ( typeof Swiper === 'undefined' ) {
			// Swiper not available — silently exit.
			return;
		}

		blocks.forEach( ( block ) => {
			const el = block.querySelector( '.swiper' );
			if ( ! el || el._swiperInstance ) {
				return;
			}

			const autoplayEnabled = el.dataset.autoplay === 'true';
			const delay            = parseInt( el.dataset.delay, 10 ) || 5000;
			const loop             = el.dataset.loop === 'true';
			const slides           = parseInt( el.dataset.slides, 10 ) || 1;
			const showDots         = el.dataset.showDots !== 'false';
			const showArrows       = el.dataset.showArrows !== 'false';

			const swiperConfig = {
				loop,
				autoplay: autoplayEnabled
					? { delay, disableOnInteraction: false, pauseOnMouseEnter: true }
					: false,
				pagination: showDots
					? { el: el.querySelector( '.swiper-pagination' ), clickable: true }
					: false,
				navigation: showArrows
					? {
						prevEl: el.querySelector( '.swiper-button-prev' ),
						nextEl: el.querySelector( '.swiper-button-next' ),
					}
					: false,
				breakpoints: {
					0: { slidesPerView: 1, spaceBetween: 16 },
					768: { slidesPerView: Math.min( slides, 2 ), spaceBetween: 24 },
					1024: { slidesPerView: slides, spaceBetween: 32 },
				},
				a11y: {
					prevSlideMessage: 'Previous testimonial',
					nextSlideMessage: 'Next testimonial',
				},
				grabCursor: true,
			};

			// Respect prefers-reduced-motion.
			if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
				swiperConfig.autoplay = false;
				swiperConfig.speed = 0;
			}

			const instance = new Swiper( el, swiperConfig );
			el._swiperInstance = instance;
		} );
	}

	// Run on DOMContentLoaded.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTestimonialCarousels );
	} else {
		initTestimonialCarousels();
	}
} )();
