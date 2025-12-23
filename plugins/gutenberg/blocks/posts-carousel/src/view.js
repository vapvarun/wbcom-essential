/**
 * Posts Carousel Block - Frontend JavaScript
 *
 * Initializes Swiper carousels on the frontend.
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', function () {
	const carousels = document.querySelectorAll(
		'.wbcom-essential-posts-carousel'
	);

	carousels.forEach( function ( carousel ) {
		const swiperContainer = carousel.querySelector( '.swiper' );
		if ( ! swiperContainer ) {
			return;
		}

		// Parse configuration from data attribute.
		let config;
		try {
			config = JSON.parse(
				carousel.getAttribute( 'data-swiper-config' ) || '{}'
			);
		} catch ( e ) {
			config = {};
		}

		// Build Swiper options.
		const options = {
			slidesPerView: config.slidesPerView || 1,
			spaceBetween: config.spaceBetween || 30,
			loop: config.loop !== false,
			breakpoints: config.breakpoints || {
				768: { slidesPerView: 2 },
				1024: { slidesPerView: 3 },
			},
		};

		// Add navigation if enabled.
		if ( config.navigation ) {
			options.navigation = {
				prevEl: carousel.querySelector( '.swiper-button-prev' ),
				nextEl: carousel.querySelector( '.swiper-button-next' ),
			};
		}

		// Add pagination if enabled.
		if ( config.pagination ) {
			options.pagination = {
				el: carousel.querySelector( '.swiper-pagination' ),
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

		// Initialize Swiper.
		if ( typeof Swiper !== 'undefined' ) {
			new Swiper( swiperContainer, options );
		} else {
			// Load Swiper from CDN if not available.
			const link = document.createElement( 'link' );
			link.rel = 'stylesheet';
			link.href =
				'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
			document.head.appendChild( link );

			const script = document.createElement( 'script' );
			script.src =
				'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
			script.onload = function () {
				new Swiper( swiperContainer, options );
			};
			document.body.appendChild( script );
		}
	} );
} );
