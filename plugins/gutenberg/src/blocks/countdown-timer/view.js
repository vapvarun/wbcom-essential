document.addEventListener( 'DOMContentLoaded', () => {
	document.querySelectorAll( '.wbe-countdown' ).forEach( ( el ) => {
		const target = el.dataset.target;
		if ( ! target ) return;

		const targetTime = new Date( target ).getTime();
		const expiredMsg = el.dataset.expiredMessage || 'Time is up!';

		const days = el.querySelector( '[data-unit="days"]' );
		const hours = el.querySelector( '[data-unit="hours"]' );
		const minutes = el.querySelector( '[data-unit="minutes"]' );
		const seconds = el.querySelector( '[data-unit="seconds"]' );

		function update() {
			const now = Date.now();
			const diff = targetTime - now;

			if ( diff <= 0 ) {
				const digits = el.querySelector( '.wbe-countdown__digits' );
				if ( digits ) {
					// Clear children safely and add expiry message
					while ( digits.firstChild ) {
						digits.removeChild( digits.firstChild );
					}
					const p = document.createElement( 'p' );
					p.className = 'wbe-countdown__expired';
					p.textContent = expiredMsg;
					digits.appendChild( p );
				}
				return;
			}

			const d = Math.floor( diff / 86400000 );
			const h = Math.floor( ( diff % 86400000 ) / 3600000 );
			const m = Math.floor( ( diff % 3600000 ) / 60000 );
			const s = Math.floor( ( diff % 60000 ) / 1000 );

			if ( days ) days.textContent = String( d ).padStart( 2, '0' );
			if ( hours ) hours.textContent = String( h ).padStart( 2, '0' );
			if ( minutes ) minutes.textContent = String( m ).padStart( 2, '0' );
			if ( seconds ) seconds.textContent = String( s ).padStart( 2, '0' );

			requestAnimationFrame( () => setTimeout( update, 1000 ) );
		}

		update();
	} );
} );
