/**
 * Flip Box Block – Frontend Interaction.
 *
 * Adds tap-to-flip on touch devices and keyboard (Enter/Space) support
 * so the back face is accessible without CSS :hover.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	function initFlipBoxes() {
		const boxes = document.querySelectorAll( '.wbe-flip-box' );

		boxes.forEach( function ( box ) {
			const inner = box.querySelector( '.wbe-flip-box__inner' );
			if ( ! inner ) {
				return;
			}

			// Make the box focusable and announce it as interactive.
			box.setAttribute( 'tabindex', '0' );
			box.setAttribute( 'role', 'button' );
			box.setAttribute(
				'aria-label',
				( box.querySelector( '.wbe-flip-box__front .wbe-flip-box__title' )?.textContent || 'Flip card' ) +
					' — click to flip'
			);

			// Toggle class on click / tap.
			box.addEventListener( 'click', function ( e ) {
				// Don't flip when clicking the back-face link.
				if ( e.target.closest( '.wbe-flip-box__btn' ) ) {
					return;
				}
				box.classList.toggle( 'is-flipped' );
				box.setAttribute(
					'aria-expanded',
					box.classList.contains( 'is-flipped' ) ? 'true' : 'false'
				);
			} );

			// Keyboard: Enter or Space toggles flip.
			box.addEventListener( 'keydown', function ( e ) {
				if ( e.key === 'Enter' || e.key === ' ' ) {
					// Don't trigger if focus is on the back-face link.
					if ( e.target.closest( '.wbe-flip-box__btn' ) ) {
						return;
					}
					e.preventDefault();
					box.classList.toggle( 'is-flipped' );
					box.setAttribute(
						'aria-expanded',
						box.classList.contains( 'is-flipped' ) ? 'true' : 'false'
					);
				}
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initFlipBoxes );
	} else {
		initFlipBoxes();
	}
} )();
