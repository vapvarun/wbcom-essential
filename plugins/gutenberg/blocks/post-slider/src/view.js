/**
 * Post Slider Block - Frontend JavaScript
 *
 * Initializes Swiper slider on the frontend.
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', function () {
	const sliders = document.querySelectorAll( '.wbcom-essential-post-slider' );

	sliders.forEach( function ( slider ) {
		const swiperContainer = slider.querySelector( '.swiper' );
		if ( ! swiperContainer ) {
			return;
		}

		// Parse configuration from data attribute.
		let config;
		try {
			config = JSON.parse(
				slider.getAttribute( 'data-swiper-config' ) || '{}'
			);
		} catch ( e ) {
			config = {};
		}

		// Build Swiper options.
		const options = {
			effect: config.effect || 'fade',
			speed: config.speed || 500,
			loop: config.loop !== false,
		};

		// Add fade effect options.
		if ( config.effect === 'fade' ) {
			options.fadeEffect = config.fadeEffect || { crossFade: true };
		}

		// Add navigation if enabled.
		if ( config.navigation ) {
			options.navigation = {
				prevEl: slider.querySelector( '.swiper-button-prev' ),
				nextEl: slider.querySelector( '.swiper-button-next' ),
			};
		}

		// Add pagination if enabled.
		if ( config.pagination ) {
			options.pagination = {
				el: slider.querySelector( '.swiper-pagination' ),
				clickable: true,
			};
		}

		// Add autoplay if enabled.
		if ( config.autoplay && config.autoplay.delay ) {
			options.autoplay = {
				delay: config.autoplay.delay,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			};
		}

		// Initialize Swiper - require it to be enqueued by the block.
		if ( typeof Swiper !== 'undefined' ) {
			new Swiper( swiperContainer, options );
		} else {
			// Swiper not available - log error for debugging.
			// eslint-disable-next-line no-console
			console.error(
				'Wbcom Essential: Swiper library not loaded. Please ensure the block is properly enqueued.'
			);
		}
	} );
} );
