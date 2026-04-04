document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wbe-team' ).forEach( ( el ) => {
		const track = el.querySelector( '.wbe-team__track' );
		if ( ! track ) return;

		const cards = Array.from( track.querySelectorAll( '.wbe-team__card' ) );
		if ( cards.length === 0 ) return;

		const visible = parseInt( el.dataset.visible, 10 ) || 3;
		const autoplay = el.dataset.autoplay === 'true';
		const speed = parseInt( el.dataset.speed, 10 ) || 4000;
		const prevBtn = el.querySelector( '.wbe-team__arrow--prev' );
		const nextBtn = el.querySelector( '.wbe-team__arrow--next' );

		let offset = 0;
		let timer = null;

		// Set up track as horizontal scroller
		track.style.display = 'flex';
		track.style.gap = '24px';
		track.style.overflow = 'hidden';

		cards.forEach( ( card ) => {
			card.style.flex = '0 0 calc(' + ( 100 / visible ) + '% - ' + ( ( visible - 1 ) * 24 / visible ) + 'px)';
		} );

		function slide( dir ) {
			const maxOffset = Math.max( 0, cards.length - visible );
			offset = Math.max( 0, Math.min( offset + dir, maxOffset ) );
			const cardWidth = cards[ 0 ].offsetWidth + 24;
			track.style.transform = 'translateX(-' + ( offset * cardWidth ) + 'px)';
			track.style.transition = 'transform 0.4s ease';
		}

		function startAutoplay() {
			if ( autoplay && cards.length > visible ) {
				timer = setInterval( () => {
					const maxOffset = cards.length - visible;
					if ( offset >= maxOffset ) {
						offset = -1;
					}
					slide( 1 );
				}, speed );
			}
		}

		function stopAutoplay() {
			clearInterval( timer );
		}

		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', () => {
				stopAutoplay();
				slide( -1 );
				startAutoplay();
			} );
		}

		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', () => {
				stopAutoplay();
				slide( 1 );
				startAutoplay();
			} );
		}

		startAutoplay();
	} );
} );
