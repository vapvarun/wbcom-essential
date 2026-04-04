document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wbe-testimonials' ).forEach( ( el ) => {
		const track = el.querySelector( '.wbe-testimonials__track' );
		if ( ! track ) return;

		const slides = Array.from( track.children );
		if ( slides.length < 2 ) return;

		const dots = el.querySelectorAll( '.wbe-testimonials__dot' );
		const prevBtn = el.querySelector( '.wbe-testimonials__arrow--prev' );
		const nextBtn = el.querySelector( '.wbe-testimonials__arrow--next' );
		const autoplay = el.dataset.autoplay === 'true';
		const speed = parseInt( el.dataset.speed, 10 ) || 5000;

		let current = 0;
		let timer = null;

		function goTo( index ) {
			slides[ current ].style.display = 'none';
			current = ( index + slides.length ) % slides.length;
			slides[ current ].style.display = 'block';

			dots.forEach( ( dot, i ) => {
				dot.classList.toggle( 'is-active', i === current );
			} );
		}

		function startAutoplay() {
			if ( autoplay ) {
				timer = setInterval( () => goTo( current + 1 ), speed );
			}
		}

		function stopAutoplay() {
			clearInterval( timer );
		}

		if ( prevBtn ) {
			prevBtn.addEventListener( 'click', () => {
				stopAutoplay();
				goTo( current - 1 );
				startAutoplay();
			} );
		}

		if ( nextBtn ) {
			nextBtn.addEventListener( 'click', () => {
				stopAutoplay();
				goTo( current + 1 );
				startAutoplay();
			} );
		}

		dots.forEach( ( dot, i ) => {
			dot.addEventListener( 'click', () => {
				stopAutoplay();
				goTo( i );
				startAutoplay();
			} );
		} );

		startAutoplay();
	} );
} );
