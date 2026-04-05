/**
 * Progress Bar Block - Frontend View Script
 * Vanilla JS — no framework, no jQuery.
 * Uses IntersectionObserver to animate width from 0 to data-percentage.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	const prefersReduced =
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/**
	 * Animate a single fill element from 0% to its target percentage.
	 *
	 * @param {HTMLElement} fillEl    The fill div.
	 * @param {number}      target    Target percentage 0–100.
	 * @param {number}      duration  Animation duration in ms.
	 */
	function animateFill( fillEl, target, duration ) {
		if ( prefersReduced ) {
			fillEl.style.width = target + '%';
			return;
		}

		const startTime = performance.now();

		function easeOutQuart( t ) {
			return 1 - Math.pow( 1 - t, 4 );
		}

		function step( now ) {
			const elapsed = now - startTime;
			const progress = Math.min( elapsed / duration, 1 );
			fillEl.style.width = ( easeOutQuart( progress ) * target ).toFixed( 2 ) + '%';

			if ( progress < 1 ) {
				requestAnimationFrame( step );
			} else {
				fillEl.style.width = target + '%';
			}
		}

		requestAnimationFrame( step );
	}

	/**
	 * Initialise a single progress-bar block instance.
	 *
	 * @param {HTMLElement} block Root .wbe-progress-bar element.
	 */
	function initBlock( block ) {
		const shouldAnimate = block.dataset.animate !== 'false';
		const fills = block.querySelectorAll( '.wbe-progress-bar__fill' );

		if ( fills.length === 0 ) {
			return;
		}

		// If animation disabled: just set final widths immediately.
		if ( ! shouldAnimate || prefersReduced ) {
			fills.forEach( ( fill ) => {
				const pct = parseFloat( fill.dataset.percentage );
				if ( ! isNaN( pct ) ) {
					fill.style.width = pct + '%';
				}
			} );
			return;
		}

		// Observe the whole block; animate all fills when it enters the viewport.
		const observer = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( ! entry.isIntersecting ) {
						return;
					}

					// Prevent re-animation on scroll back.
					if ( block.dataset.animated ) {
						return;
					}
					block.dataset.animated = 'true';
					observer.unobserve( block );

					fills.forEach( ( fill ) => {
						const pct = parseFloat( fill.dataset.percentage );
						if ( ! isNaN( pct ) ) {
							animateFill( fill, pct, 1000 );
						}
					} );
				} );
			},
			{
				threshold: 0.2,
			}
		);

		observer.observe( block );
	}

	function init() {
		document
			.querySelectorAll( '.wbe-progress-bar' )
			.forEach( initBlock );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
