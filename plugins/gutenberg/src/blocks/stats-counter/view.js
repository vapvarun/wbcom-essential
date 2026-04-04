/**
 * Stats Counter Block - Frontend View Script
 * Vanilla JS, no framework, no jQuery.
 * Uses IntersectionObserver + requestAnimationFrame.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Ease-out cubic easing function.
	 *
	 * @param {number} t Progress 0-1.
	 * @return {number} Eased progress 0-1.
	 */
	function easeOutCubic( t ) {
		return 1 - Math.pow( 1 - t, 3 );
	}

	/**
	 * Animate a counter element from 0 to target.
	 *
	 * @param {HTMLElement} numberEl  The element displaying the number.
	 * @param {number}      target    The target number.
	 * @param {number}      duration  Animation duration in ms.
	 */
	function animateCounter( numberEl, target, duration ) {
		const prefersReduced =
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		if ( prefersReduced ) {
			numberEl.textContent = target.toLocaleString();
			return;
		}

		let startTime = null;

		function step( timestamp ) {
			if ( startTime === null ) {
				startTime = timestamp;
			}

			const elapsed = timestamp - startTime;
			const progress = Math.min( elapsed / duration, 1 );
			const easedProgress = easeOutCubic( progress );
			const current = Math.floor( easedProgress * target );

			numberEl.textContent = current.toLocaleString();

			if ( progress < 1 ) {
				requestAnimationFrame( step );
			} else {
				numberEl.textContent = target.toLocaleString();
			}
		}

		requestAnimationFrame( step );
	}

	/**
	 * Initialise stats counter with IntersectionObserver.
	 *
	 * @param {HTMLElement} block The .wbe-stats-counter root element.
	 */
	function initCounter( block ) {
		const items = block.querySelectorAll( '.wbe-stats-counter__item' );
		if ( items.length === 0 ) {
			return;
		}

		const observer = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( ! entry.isIntersecting ) {
						return;
					}

					const item = entry.target;

					// Only animate once
					if ( item.dataset.counted ) {
						return;
					}
					item.dataset.counted = 'true';
					observer.unobserve( item );

					const target = parseInt( item.dataset.target, 10 );
					const duration = parseInt( item.dataset.duration, 10 ) || 2000;
					const numberEl = item.querySelector( '.wbe-stats-counter__number' );

					if ( ! numberEl || isNaN( target ) ) {
						return;
					}

					animateCounter( numberEl, target, duration );
				} );
			},
			{
				threshold: 0.25, // Trigger when 25% visible
			}
		);

		items.forEach( ( item ) => observer.observe( item ) );
	}

	function init() {
		const blocks = document.querySelectorAll( '.wbe-stats-counter' );
		blocks.forEach( initCounter );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
