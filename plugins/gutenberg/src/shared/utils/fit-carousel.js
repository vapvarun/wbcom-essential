import guardLoop from './swiper-loop';

/**
 * Start a card carousel whose slides per view follow the CONTAINER width.
 *
 * The owner's per-device "slides per view" settings arrive as Swiper viewport
 * breakpoints. On their own they keep 4 slides in a 267px sidebar on a
 * desktop screen, so each card is ~50px wide. Here those settings are the cap
 * for the current screen, and the container decides how many cards of at
 * least `minSlideWidth` fit. The bundled Swiper (5.x) has no
 * `breakpointsBase: 'container'`, and Elementor may register its own Swiper
 * under the same handle, so the fit is computed here for any version.
 *
 * @param {HTMLElement} swiperEl         The .swiper element.
 * @param {Object}      options          Swiper options from render.php.
 * @param {number}      minSlideWidth    Narrowest card width in px.
 * @param {boolean}     useBreakpointGap Take spaceBetween from the matched breakpoint as well (Post and
 *                                       Product Carousel). Off by default: Members and Group Carousel
 *                                       keep their single gap.
 */
export default function initFitCarousel( swiperEl, options, minSlideWidth, useBreakpointGap = false ) {
	if ( typeof Swiper === 'undefined' || swiperEl._swiperInstance ) {
		return;
	}

	// Resolve navigation/pagination selectors relative to this instance so
	// several carousels on one page do not drive each other. Elements the
	// caller already found (arrows outside the .swiper) are kept.
	if ( options.navigation && ! ( options.navigation.nextEl instanceof Element ) ) {
		options.navigation = {
			nextEl: swiperEl.querySelector( '.swiper-button-next' ),
			prevEl: swiperEl.querySelector( '.swiper-button-prev' ),
		};
	}
	if ( options.pagination && ! ( options.pagination.el instanceof Element ) ) {
		options.pagination = {
			el:        swiperEl.querySelector( '.swiper-pagination' ),
			clickable: true,
		};
	}

	if ( window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		options.autoplay = false;
		options.speed    = 0;
	}

	const caps = options.breakpoints || {};
	delete options.breakpoints;

	const gap = parseFloat( options.spaceBetween ) || 0;

	function layout() {
		// Owner's setting for the current screen size is the maximum.
		let cap   = parseFloat( options.slidesPerView ) || 1;
		let space = gap;
		Object.keys( caps )
			.map( Number )
			.sort( ( a, b ) => a - b )
			.forEach( ( minViewport ) => {
				if ( window.innerWidth < minViewport ) {
					return;
				}
				if ( caps[ minViewport ].slidesPerView ) {
					cap = parseFloat( caps[ minViewport ].slidesPerView );
				}
				if ( useBreakpointGap && undefined !== caps[ minViewport ].spaceBetween ) {
					space = parseFloat( caps[ minViewport ].spaceBetween ) || 0;
				}
			} );

		const width = swiperEl.clientWidth;
		const fit   = width ? Math.floor( ( width + space ) / ( minSlideWidth + space ) ) : cap;
		return { slides: Math.max( 1, Math.min( cap, fit ) ), space };
	}

	function build( current ) {
		swiperEl._swiperInstance = new Swiper(
			swiperEl,
			guardLoop( swiperEl, Object.assign( {}, options, { slidesPerView: current.slides, spaceBetween: current.space } ) )
		);
	}

	let current = layout();
	build( current );

	if ( typeof ResizeObserver === 'undefined' ) {
		return;
	}

	// Rebuild only when the count or the gap changes: changing slidesPerView on
	// a live looped Swiper is handled differently by every major version.
	new ResizeObserver( () => {
		const next = layout();
		if ( next.slides === current.slides && next.space === current.space ) {
			return;
		}
		current = next;
		swiperEl._swiperInstance.destroy( true, true );
		build( current );
	} ).observe( swiperEl );
}
