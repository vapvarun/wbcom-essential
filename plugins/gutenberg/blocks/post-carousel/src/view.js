/**
 * Frontend script for Post Carousel block
 */
document.addEventListener( 'DOMContentLoaded', function() {
	const carousels = document.querySelectorAll( '.wbcom-post-carousel' );

	carousels.forEach( function( carousel ) {
		const carouselInner = carousel.querySelector( '.wbcom-post-carousel-inner' );
		const columns = carousel.getAttribute( 'data-columns' ) || 'three';
		const infinite = carousel.getAttribute( 'data-infinite' ) === 'true';
		const autoplay = carousel.getAttribute( 'data-autoplay' ) === 'true';
		const autoplayDuration = parseInt( carousel.getAttribute( 'data-autoplay-duration' ) ) || 5000;
		const adaptiveHeight = carousel.getAttribute( 'data-adaptive-height' ) === 'true';
		const showDots = carousel.getAttribute( 'data-show-dots' ) === 'true';
		const showArrows = carousel.getAttribute( 'data-show-arrows' ) === 'true';

		// Map columns to slidesToShow
		const slidesToShowMap = {
			one: 1,
			two: 2,
			three: 3,
			four: 4,
			five: 5,
		};

		const slidesToShow = slidesToShowMap[ columns ] || 3;

		// Initialize Slick
		if ( typeof jQuery !== 'undefined' && jQuery.fn.slick ) {
			jQuery( carouselInner ).slick( {
				slidesToShow: slidesToShow,
				slidesToScroll: 1,
				infinite: infinite,
				autoplay: autoplay,
				autoplaySpeed: autoplayDuration,
				adaptiveHeight: adaptiveHeight,
				dots: showDots,
				arrows: showArrows,
				prevArrow: carousel.querySelector( '.wbcom-post-carousel-prev' ),
				nextArrow: carousel.querySelector( '.wbcom-post-carousel-next' ),
				appendDots: showDots ? carousel.querySelector( '.wbcom-post-carousel-dots' ) : false,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: Math.min( slidesToShow, 3 ),
						},
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: Math.min( slidesToShow, 2 ),
						},
					},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
						},
					},
				],
			} );
		}
	} );
} );