/**
 * Posts Revolution Block - Frontend JavaScript
 *
 * Handles scroll-based animations for posts.
 *
 * @package wbcom-essential
 */

( function() {
	'use strict';

	/**
	 * Initialize animations when elements become visible.
	 */
	function initAnimations() {
		const animatedElements = document.querySelectorAll( '.animate-in:not(.animation-triggered)' );

		if ( ! animatedElements.length ) {
			return;
		}

		// Use Intersection Observer for better performance.
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px',
		};

		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					const element = entry.target;
					const delay = parseInt( element.getAttribute( 'data-anim-delay' ) || 0, 10 );

					setTimeout( () => {
						element.classList.add( 'animation-triggered' );
					}, delay );

					// Stop observing this element.
					observer.unobserve( element );
				}
			} );
		}, observerOptions );

		animatedElements.forEach( ( element ) => {
			observer.observe( element );
		} );
	}

	// Initialize on page load.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAnimations );
	} else {
		initAnimations();
	}
}() );
