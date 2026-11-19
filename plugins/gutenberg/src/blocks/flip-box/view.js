/**
 * Flip Box Block – Frontend Interaction.
 *
 * Adds tap-to-flip on touch devices and a toggle button for keyboard and
 * screen-reader users, so the back face is reachable without CSS :hover.
 *
 * @package wbcom-essential
 */

import { __, sprintf } from '@wordpress/i18n';

( function () {
	'use strict';

	function initFlipBoxes() {
		const boxes = document.querySelectorAll( '.wbe-flip-box' );

		boxes.forEach( function ( box ) {
			const inner = box.querySelector( '.wbe-flip-box__inner' );
			if ( ! inner ) {
				return;
			}

			// A real toggle button flips the card. The box itself is not a button, because it holds the
			// back-face link (a link inside role=button is a nested interactive control).
			const toggle = document.createElement( 'button' );
			toggle.type = 'button';
			toggle.className = 'wbe-flip-box__toggle';
			toggle.setAttribute(
				'aria-label',
				sprintf(
					/* translators: %s: flip box front title. */
					__( '%s — click to flip', 'wbcom-essential' ),
					box.querySelector( '.wbe-flip-box__front .wbe-flip-box__title' )?.textContent ||
						__( 'Flip card', 'wbcom-essential' )
				)
			);
			box.prepend( toggle );
			box.classList.add( 'wbe-flip-box--js' );

			const front = box.querySelector( '.wbe-flip-box__front' );
			const back  = box.querySelector( '.wbe-flip-box__back' );
			const links = back ? back.querySelectorAll( 'a, button' ) : [];

			// Only the face that is turned towards the user is announced and reachable by Tab.
			function sync() {
				const flipped = box.classList.contains( 'is-flipped' );
				toggle.setAttribute( 'aria-pressed', flipped ? 'true' : 'false' );
				if ( front ) {
					front.setAttribute( 'aria-hidden', flipped ? 'true' : 'false' );
				}
				if ( back ) {
					back.setAttribute( 'aria-hidden', flipped ? 'false' : 'true' );
				}
				links.forEach( ( link ) => {
					link.tabIndex = flipped ? 0 : -1;
				} );
			}
			sync();

			// Click or tap anywhere on the card flips it; Enter and Space on the toggle arrive here as a
			// click, because it is a native button.
			box.addEventListener( 'click', function ( e ) {
				// Don't flip when clicking the back-face link.
				if ( e.target.closest( '.wbe-flip-box__btn' ) ) {
					return;
				}
				box.classList.toggle( 'is-flipped' );
				sync();
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initFlipBoxes );
	} else {
		initFlipBoxes();
	}
} )();
