/**
 * Progress Bar Block - Frontend Script
 *
 * Handles scroll-triggered animation using Intersection Observer.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize progress bar animations.
	 */
	function initProgressBars() {
		const progressBars = document.querySelectorAll(
			'.wbcom-essential-progress-bar[data-scroll-animation="true"]'
		);

		if ( ! progressBars.length ) {
			return;
		}

		// Check if IntersectionObserver is supported.
		if ( 'IntersectionObserver' in window ) {
			const observer = new IntersectionObserver(
				( entries ) => {
					entries.forEach( ( entry ) => {
						if ( entry.isIntersecting ) {
							animateProgressBar( entry.target );
							observer.unobserve( entry.target );
						}
					} );
				},
				{
					threshold: 0.2,
					rootMargin: '0px 0px -50px 0px',
				}
			);

			progressBars.forEach( ( bar ) => {
				observer.observe( bar );
			} );
		} else {
			// Fallback for older browsers - animate immediately.
			progressBars.forEach( ( bar ) => {
				animateProgressBar( bar );
			} );
		}
	}

	/**
	 * Animate a single progress bar.
	 *
	 * @param {Element} container The progress bar container element.
	 */
	function animateProgressBar( container ) {
		const percent = parseInt( container.dataset.percent, 10 ) || 0;
		const fill = container.querySelector( '.wbcom-progress-bar-fill' );

		if ( fill ) {
			// Use requestAnimationFrame for smooth animation.
			requestAnimationFrame( () => {
				fill.style.width = percent + '%';
			} );
		}
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initProgressBars );
	} else {
		initProgressBars();
	}
} )();
