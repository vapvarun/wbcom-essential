/**
 * Post Carousel Block - Frontend Script
 *
 * Initializes Swiper for carousel and slider display modes.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize all post carousels.
	 */
	function initPostCarousels() {
		const blocks = document.querySelectorAll(
			'.wbe-post-carousel--carousel .swiper, .wbe-post-carousel--slider .swiper'
		);

		if ( ! blocks.length ) {
			return;
		}

		if ( typeof Swiper === 'undefined' ) {
			return;
		}

		blocks.forEach( ( el ) => {
			if ( el._swiperInstance ) {
				return;
			}

			const autoplayEnabled = el.dataset.autoplay === 'true';
			const delay            = parseInt( el.dataset.delay, 10 ) || 5000;
			const loop             = el.dataset.loop !== 'false';
			const slides           = parseInt( el.dataset.slides, 10 ) || 3;
			const mode             = el.dataset.mode || 'carousel';
			const isSlider         = mode === 'slider';

			const swiperConfig = {
				loop,
				autoplay: autoplayEnabled
					? { delay, disableOnInteraction: false, pauseOnMouseEnter: true }
					: false,
				pagination: {
					el: el.querySelector( '.swiper-pagination' ),
					clickable: true,
				},
				navigation: {
					prevEl: el.querySelector( '.swiper-button-prev' ),
					nextEl: el.querySelector( '.swiper-button-next' ),
				},
				grabCursor: true,
				a11y: {
					prevSlideMessage: 'Previous post',
					nextSlideMessage: 'Next post',
				},
			};

			if ( isSlider ) {
				// Full-width 1-at-a-time slider.
				swiperConfig.slidesPerView = 1;
				swiperConfig.spaceBetween = 0;
				swiperConfig.effect = 'slide';
			} else {
				// Responsive carousel.
				swiperConfig.breakpoints = {
					0: { slidesPerView: 1, spaceBetween: 16 },
					640: { slidesPerView: Math.min( slides, 2 ), spaceBetween: 20 },
					1024: { slidesPerView: slides, spaceBetween: 28 },
				};
			}

			// Respect prefers-reduced-motion.
			if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
				swiperConfig.autoplay = false;
				swiperConfig.speed = 0;
			}

			const instance = new Swiper( el, swiperConfig );
			el._swiperInstance = instance;
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initPostCarousels );
	} else {
		initPostCarousels();
	}
} )();
