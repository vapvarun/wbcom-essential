/**
 * Posts Ticker Block - Frontend Script
 *
 * Controls the CSS animation for the ticker track.
 * - Pause on hover (if enabled via data attribute)
 * - Supports left and right direction
 * - Respects prefers-reduced-motion: collapses to a static list
 *
 * Animation strategy: CSS @keyframes ticker-scroll-left / ticker-scroll-right
 * are defined in style.css. The duration token (--wbe-tk-duration) is output
 * by render.php. JS only controls pause/resume and reduced-motion overrides.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	const REDUCED_MOTION = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/**
	 * Initialise a single ticker wrapper.
	 *
	 * @param {HTMLElement} wrapper
	 */
	function initTicker( wrapper ) {
		const track        = wrapper.querySelector( '.wbe-posts-ticker__track' );
		const viewport     = wrapper.querySelector( '.wbe-posts-ticker__viewport' );
		const pauseOnHover = wrapper.dataset.pauseHover === 'true';
		const direction    = wrapper.dataset.direction || 'left';

		if ( ! track ) {
			return;
		}

		// ── Reduced-motion: disable animation, show as static overflow list ──
		if ( REDUCED_MOTION ) {
			wrapper.classList.add( 'wbe-posts-ticker--static' );
			// Remove the duplicate set of items (second half of the track).
			const items = track.querySelectorAll( '.wbe-posts-ticker__item' );
			const half  = Math.floor( items.length / 2 );
			for ( let i = half; i < items.length; i++ ) {
				items[ i ].remove();
			}
			return;
		}

		// ── Apply direction class so CSS keyframe picks up the right one ─────
		track.classList.add(
			direction === 'right'
				? 'wbe-posts-ticker__track--right'
				: 'wbe-posts-ticker__track--left'
		);

		// ── Pause on hover ────────────────────────────────────────────────────
		if ( pauseOnHover && viewport ) {
			viewport.addEventListener( 'mouseenter', () => {
				track.style.animationPlayState = 'paused';
			} );
			viewport.addEventListener( 'mouseleave', () => {
				track.style.animationPlayState = 'running';
			} );

			// Also pause on focus within (keyboard nav).
			viewport.addEventListener( 'focusin', () => {
				track.style.animationPlayState = 'paused';
			} );
			viewport.addEventListener( 'focusout', () => {
				track.style.animationPlayState = 'running';
			} );
		}
	}

	function init() {
		document
			.querySelectorAll( '.wbe-posts-ticker' )
			.forEach( initTicker );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
