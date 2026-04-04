document.addEventListener( 'DOMContentLoaded', () => {
	const counters = document.querySelectorAll( '.wbe-stats' );

	const observer = new IntersectionObserver(
		( entries ) => {
			entries.forEach( ( entry ) => {
				if ( ! entry.isIntersecting ) return;

				const el = entry.target;
				observer.unobserve( el );

				const duration =
					parseInt( el.dataset.duration, 10 ) || 2000;

				el.querySelectorAll( '.wbe-stats__number' ).forEach(
					( numEl ) => {
						const target =
							parseInt( numEl.dataset.target, 10 ) || 0;
						const prefix = numEl.dataset.prefix || '';
						const suffix = numEl.dataset.suffix || '';
						const start = performance.now();

						function animate( now ) {
							const elapsed = now - start;
							const progress = Math.min( elapsed / duration, 1 );
							// Ease out cubic
							const eased =
								1 - Math.pow( 1 - progress, 3 );
							const current = Math.round( target * eased );
							numEl.textContent =
								prefix +
								current.toLocaleString() +
								suffix;

							if ( progress < 1 ) {
								requestAnimationFrame( animate );
							}
						}

						requestAnimationFrame( animate );
					}
				);
			} );
		},
		{ threshold: 0.3 }
	);

	counters.forEach( ( el ) => observer.observe( el ) );
} );
