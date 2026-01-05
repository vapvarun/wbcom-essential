/**
 * Counter Block - Frontend JavaScript
 *
 * Handles the counting animation using IntersectionObserver.
 *
 * @package wbcom-essential
 */

( function() {
	'use strict';

	/**
	 * Animate counting from start to end number.
	 *
	 * @param {HTMLElement} element  The number element.
	 * @param {number}      start    Start number.
	 * @param {number}      end      End number.
	 * @param {number}      duration Animation duration in ms.
	 * @param {boolean}     grouping Use thousand separators.
	 */
	function animateCounter( element, start, end, duration, grouping ) {
		const startTime = performance.now();
		const diff = end - start;

		function formatNumber( num ) {
			if ( grouping ) {
				return Math.round( num ).toLocaleString();
			}
			return Math.round( num ).toString();
		}

		function step( currentTime ) {
			const elapsed = currentTime - startTime;
			const progress = Math.min( elapsed / duration, 1 );

			// Easing function (ease-out-quart).
			const easeProgress = 1 - Math.pow( 1 - progress, 4 );

			const currentValue = start + ( diff * easeProgress );
			element.textContent = formatNumber( currentValue );

			if ( progress < 1 ) {
				requestAnimationFrame( step );
			} else {
				element.textContent = formatNumber( end );
			}
		}

		requestAnimationFrame( step );
	}

	/**
	 * Initialize counters with IntersectionObserver.
	 */
	function initCounters() {
		const counters = document.querySelectorAll( '.wbcom-essential-counter:not(.counted)' );

		if ( ! counters.length ) {
			return;
		}

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.3,
		};

		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const counter = entry.target;
					const numberEl = counter.querySelector( '.wbcom-essential-counter__number' );

					if ( numberEl && ! counter.classList.contains( 'counted' ) ) {
						const start = parseInt( counter.dataset.start, 10 ) || 0;
						const end = parseInt( counter.dataset.end, 10 ) || 100;
						const duration = parseInt( counter.dataset.duration, 10 ) || 2000;
						const grouping = counter.dataset.grouping === 'true';

						counter.classList.add( 'counted' );
						animateCounter( numberEl, start, end, duration, grouping );
					}

					observer.unobserve( counter );
				}
			} );
		}, observerOptions );

		counters.forEach( ( counter ) => {
			observer.observe( counter );
		} );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initCounters );
	} else {
		initCounters();
	}
} )();
