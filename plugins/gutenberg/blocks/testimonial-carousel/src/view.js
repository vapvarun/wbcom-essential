/**
 * Testimonial Carousel Block - Frontend Script
 *
 * Initializes Swiper carousels for testimonial display.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	function initTestimonialCarousels() {
		const carousels = document.querySelectorAll(
			'.wbcom-essential-testimonial-carousel'
		);

		if ( ! carousels.length ) {
			return;
		}

		if ( typeof Swiper === 'undefined' ) {
			console.warn( 'Testimonial Carousel: Swiper library not loaded' );
			return;
		}

		carousels.forEach( ( carousel ) => {
			const swiperContainer = carousel.querySelector( '.wbcom-testimonial-swiper' );
			if ( ! swiperContainer ) {
				return;
			}

			let config = {};
			try {
				config = JSON.parse( carousel.dataset.swiperConfig || '{}' );
			} catch ( e ) {
				console.warn( 'Testimonial Carousel: Invalid Swiper config', e );
			}

			new Swiper( swiperContainer, config );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTestimonialCarousels );
	} else {
		initTestimonialCarousels();
	}
} )();
