import guardLoop from '../src/shared/utils/swiper-loop';

function carousel( slides ) {
	const el = document.createElement( 'div' );
	el.innerHTML = '<div class="swiper-wrapper">' + '<div class="swiper-slide"></div>'.repeat( slides ) + '</div>';
	return el;
}

describe( 'guardLoop', () => {
	it( 'turns loop off when every slide fits in one view', () => {
		const config = guardLoop( carousel( 1 ), { loop: true, breakpoints: { 0: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } } } );
		expect( config.loop ).toBe( false );
		expect( config.watchOverflow ).toBe( true );
	} );

	it( 'keeps loop when there are more slides than the widest view', () => {
		const config = guardLoop( carousel( 3 ), { loop: true, breakpoints: { 0: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } } } );
		expect( config.loop ).toBe( true );
	} );

	it( 'reads a flat slidesPerView', () => {
		expect( guardLoop( carousel( 3 ), { loop: true, slidesPerView: 3 } ).loop ).toBe( false );
	} );
} );
