/**
 * Members Carousel Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a members carousel instance.
	 *
	 * @param {HTMLElement} container The carousel container.
	 */
	function initMembersCarousel( container ) {
		// Check if Swiper is available.
		if ( typeof Swiper === 'undefined' ) {
			console.warn( 'Swiper is not loaded. Members Carousel will not function.' );
			return;
		}

		const optionsAttr = container.getAttribute( 'data-swiper-options' );
		if ( ! optionsAttr ) {
			return;
		}

		let options;
		try {
			options = JSON.parse( optionsAttr );
		} catch ( e ) {
			console.error( 'Invalid Swiper options:', e );
			return;
		}

		// Build Swiper config.
		const swiperConfig = {
			slidesPerView: options.slidesPerView || 4,
			spaceBetween: options.spaceBetween || 30,
			speed: options.speed || 500,
			loop: options.loop !== false,
			breakpoints: options.breakpoints || {
				320: { slidesPerView: 1 },
				768: { slidesPerView: 2 },
				1024: { slidesPerView: options.slidesPerView || 4 },
			},
		};

		// Autoplay.
		if ( options.autoplay ) {
			swiperConfig.autoplay = {
				delay: options.autoplay.delay || 5000,
				disableOnInteraction: options.autoplay.disableOnInteraction !== false,
				pauseOnMouseEnter: options.autoplay.pauseOnMouseEnter !== false,
			};
		}

		// Navigation.
		if ( options.navigation ) {
			swiperConfig.navigation = {
				nextEl: container.querySelector( '.swiper-button-next' ),
				prevEl: container.querySelector( '.swiper-button-prev' ),
			};
		}

		// Pagination.
		if ( options.pagination ) {
			swiperConfig.pagination = {
				el: container.querySelector( '.swiper-pagination' ),
				clickable: true,
			};
		}

		// Initialize Swiper.
		new Swiper( container, swiperConfig );
	}

	/**
	 * Initialize all members carousel blocks on the page.
	 */
	function initAll() {
		const carousels = document.querySelectorAll( '.wbcom-members-carousel-container' );
		carousels.forEach( initMembersCarousel );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
