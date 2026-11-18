/**
 * Turn Swiper's loop off when there are not enough slides to scroll.
 *
 * Swiper 5 loop mode clones the slides, so 1 review at 2 per view shows the
 * same card twice and 3 groups at 3 per view show 9 cards. With loop off and
 * watchOverflow on, Swiper locks a carousel that fits in one view and adds
 * the swiper-*-lock classes that hide its arrows and dots.
 *
 * Call before `new Swiper`; it changes `config` in place.
 *
 * @param {HTMLElement} swiperEl The .swiper element.
 * @param {Object}      config   Swiper options.
 * @return {Object} The same config.
 */
export default function guardLoop( swiperEl, config ) {
	const count = swiperEl.querySelectorAll( '.swiper-wrapper > .swiper-slide:not(.swiper-slide-duplicate)' ).length;
	const perView = [ config.slidesPerView, ...Object.values( config.breakpoints || {} ).map( ( bp ) => bp && bp.slidesPerView ) ]
		.map( ( n ) => parseFloat( n ) || 1 );

	config.watchOverflow = true;
	if ( count <= Math.max( ...perView ) ) {
		config.loop = false;
	}
	return config;
}
