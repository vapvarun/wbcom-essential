/**
 * Text Rotator Block - Frontend View Script
 * Vanilla JS — no framework, no jQuery.
 * Supports three animation modes: fade, slide, typing.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	const prefersReduced =
		window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/* ------------------------------------------------------------------ */
	/*  Animation: FADE                                                      */
	/* ------------------------------------------------------------------ */

	/**
	 * Crossfade between the current text and the next.
	 *
	 * @param {HTMLElement} el      Rotating span element.
	 * @param {string}      newText The next text to show.
	 * @param {Function}    done    Callback once the swap is complete.
	 */
	function animateFade( el, newText, done ) {
		el.style.opacity = '1';
		el.style.transition = 'opacity 0.4s ease';

		// Fade out
		el.style.opacity = '0';

		setTimeout( function () {
			el.textContent = newText;
			// Fade in
			el.style.opacity = '1';

			setTimeout( done, 400 );
		}, 400 );
	}

	/* ------------------------------------------------------------------ */
	/*  Animation: SLIDE                                                     */
	/* ------------------------------------------------------------------ */

	/**
	 * Slide the current text out (up) and slide the next text in (from below).
	 *
	 * @param {HTMLElement} el      Rotating span element.
	 * @param {string}      newText The next text to show.
	 * @param {Function}    done    Callback once the swap is complete.
	 */
	function animateSlide( el, newText, done ) {
		el.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
		el.style.transform = 'translateY( -100% )';
		el.style.opacity = '0';

		setTimeout( function () {
			el.textContent = newText;
			// Reset instantly, then slide in from below
			el.style.transition = 'none';
			el.style.transform = 'translateY( 100% )';
			el.style.opacity = '0';

			// Force reflow
			void el.offsetWidth;

			el.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
			el.style.transform = 'translateY( 0 )';
			el.style.opacity = '1';

			setTimeout( done, 350 );
		}, 350 );
	}

	/* ------------------------------------------------------------------ */
	/*  Animation: TYPING                                                    */
	/* ------------------------------------------------------------------ */

	/**
	 * Erase the current text character by character then type the new text.
	 *
	 * @param {HTMLElement} el      Rotating span element.
	 * @param {string}      newText The next text to type.
	 * @param {Function}    done    Callback once typing is complete.
	 */
	function animateTyping( el, newText, done ) {
		const eraseDelay = 60; // ms per character erase
		const typeDelay = 80;  // ms per character type

		function erase() {
			const current = el.dataset.visibleText || el.textContent;
			if ( current.length === 0 ) {
				// Start typing the new text
				el.dataset.visibleText = '';
				el.textContent = '';
				type();
				return;
			}
			const next = current.slice( 0, -1 );
			el.dataset.visibleText = next;
			// Preserve cursor span if present
			el.textContent = next;
			setTimeout( erase, eraseDelay );
		}

		function type() {
			const current = el.dataset.visibleText || '';
			if ( current.length >= newText.length ) {
				delete el.dataset.visibleText;
				done();
				return;
			}
			const next = newText.slice( 0, current.length + 1 );
			el.dataset.visibleText = next;
			el.textContent = next;
			setTimeout( type, typeDelay );
		}

		erase();
	}

	/* ------------------------------------------------------------------ */
	/*  Instant swap (reduced motion)                                        */
	/* ------------------------------------------------------------------ */

	/**
	 * @param {HTMLElement} el      Rotating span element.
	 * @param {string}      newText Next text.
	 * @param {Function}    done    Callback.
	 */
	function animateInstant( el, newText, done ) {
		el.textContent = newText;
		done();
	}

	/* ------------------------------------------------------------------ */
	/*  Main initialiser                                                     */
	/* ------------------------------------------------------------------ */

	/**
	 * Initialise a single text-rotator block.
	 *
	 * @param {HTMLElement} block Root .wbe-text-rotator element.
	 */
	function initBlock( block ) {
		const el = block.querySelector( '.wbe-text-rotator__rotating' );
		if ( ! el ) {
			return;
		}

		let texts;
		try {
			texts = JSON.parse( el.dataset.texts );
		} catch ( e ) {
			return;
		}

		if ( ! Array.isArray( texts ) || texts.length < 2 ) {
			return;
		}

		const animationType = el.dataset.animation || 'fade';
		const speed = parseInt( el.dataset.speed, 10 ) || 2000;

		let currentIndex = 0;
		let isAnimating = false;

		// Choose animation function.
		let animateFn;
		if ( prefersReduced ) {
			animateFn = animateInstant;
		} else if ( animationType === 'slide' ) {
			animateFn = animateSlide;
		} else if ( animationType === 'typing' ) {
			animateFn = animateTyping;
			// Add cursor class for typing mode.
			el.classList.add( 'wbe-text-rotator__rotating--typing' );
		} else {
			// Default: fade
			animateFn = animateFade;
		}

		function rotate() {
			if ( isAnimating ) {
				return;
			}
			isAnimating = true;

			currentIndex = ( currentIndex + 1 ) % texts.length;
			const nextText = texts[ currentIndex ];

			animateFn( el, nextText, function () {
				isAnimating = false;
			} );
		}

		var intervalId = setInterval( rotate, speed );

		// Clean up interval if element is removed from DOM.
		if ( typeof MutationObserver !== 'undefined' && block.parentNode ) {
			var observer = new MutationObserver( function ( mutations ) {
				for ( var i = 0; i < mutations.length; i++ ) {
					for ( var j = 0; j < mutations[ i ].removedNodes.length; j++ ) {
						if ( mutations[ i ].removedNodes[ j ] === block || mutations[ i ].removedNodes[ j ].contains( block ) ) {
							clearInterval( intervalId );
							observer.disconnect();
							return;
						}
					}
				}
			} );
			observer.observe( block.parentNode, { childList: true } );
		}
	}

	function init() {
		document
			.querySelectorAll( '.wbe-text-rotator' )
			.forEach( initBlock );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
