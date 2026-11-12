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
 * @param {HTMLElement} swiperEl      The .swiper element.
 * @param {Object}      options       Swiper options from render.php.
 * @param {number}      minSlideWidth Narrowest card width in px.
 */
export default function initFitCarousel( swiperEl, options, minSlideWidth ) {
	if ( typeof Swiper === 'undefined' || swiperEl._swiperInstance ) {
		return;
	}

	// Resolve navigation/pagination relative to this instance so several
	// carousels on one page do not drive each other.
	if ( options.navigation ) {
		options.navigation = {
			nextEl: swiperEl.querySelector( '.swiper-button-next' ),
			prevEl: swiperEl.querySelector( '.swiper-button-prev' ),
		};
	}
	if ( options.pagination ) {
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

	function slidesThatFit() {
		// Owner's setting for the current screen size is the maximum.
		let cap = parseFloat( options.slidesPerView ) || 1;
		Object.keys( caps )
			.map( Number )
			.sort( ( a, b ) => a - b )
			.forEach( ( minViewport ) => {
				if ( window.innerWidth >= minViewport && caps[ minViewport ].slidesPerView ) {
					cap = parseFloat( caps[ minViewport ].slidesPerView );
				}
			} );

		const width = swiperEl.clientWidth;
		if ( ! width ) {
			return cap;
		}
		const fit = Math.floor( ( width + gap ) / ( minSlideWidth + gap ) );
		return Math.max( 1, Math.min( cap, fit ) );
	}

	let current = slidesThatFit();
	swiperEl._swiperInstance = new Swiper( swiperEl, Object.assign( {}, options, { slidesPerView: current } ) );

	if ( typeof ResizeObserver === 'undefined' ) {
		return;
	}

	// Rebuild only when the count changes: changing slidesPerView on a live
	// looped Swiper is handled differently by every major version.
	new ResizeObserver( () => {
		const next = slidesThatFit();
		if ( next === current ) {
			return;
		}
		current = next;
		swiperEl._swiperInstance.destroy( true, true );
		swiperEl._swiperInstance = new Swiper( swiperEl, Object.assign( {}, options, { slidesPerView: current } ) );
	} ).observe( swiperEl );
}
