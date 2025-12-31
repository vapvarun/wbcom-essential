/**
 * Text Rotator Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a text rotator instance.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initTextRotator( container ) {
		const rotatingEl = container.querySelector(
			'.wbcom-text-rotator-rotating'
		);
		if ( ! rotatingEl ) {
			return;
		}

		// Parse texts from data attribute.
		let texts = [];
		try {
			texts = JSON.parse( rotatingEl.dataset.texts || '[]' );
		} catch ( e ) {
			return;
		}

		if ( texts.length <= 1 ) {
			return;
		}

		const animation = container.dataset.animation || 'fadeIn';
		const duration = parseInt( container.dataset.duration, 10 ) || 3000;
		const showCursor =
			container.dataset.showCursor === 'true' ||
			container.dataset.showCursor === '1';
		const cursorChar = container.dataset.cursorChar || '|';
		const loopCount = parseInt( container.dataset.loopCount, 10 ) || 0;

		let currentIndex = 0;
		let loopCounter = 0;
		let rotationInterval = null;

		// Set cursor character for typing animation.
		if ( animation === 'typing' ) {
			rotatingEl.setAttribute( 'data-cursor', cursorChar );
			if ( ! showCursor ) {
				rotatingEl.classList.add( 'wbcom-typing-no-cursor' );
			}
		}

		/**
		 * Standard animation handler for most effects.
		 */
		function animateStandard() {
			currentIndex = ( currentIndex + 1 ) % texts.length;

			// Check loop count.
			if ( currentIndex === 0 && loopCount > 0 ) {
				loopCounter++;
				if ( loopCounter >= loopCount ) {
					clearInterval( rotationInterval );
					return;
				}
			}

			rotatingEl.textContent = texts[ currentIndex ];
			rotatingEl.classList.add( 'wbcom-animating' );

			// Remove animation class after animation completes.
			setTimeout( () => {
				rotatingEl.classList.remove( 'wbcom-animating' );
			}, 600 );
		}

		/**
		 * Typing animation handler with backspace effect.
		 */
		function animateTyping() {
			const nextIndex = ( currentIndex + 1 ) % texts.length;

			// Check loop count.
			if ( nextIndex === 0 && loopCount > 0 ) {
				loopCounter++;
				if ( loopCounter >= loopCount ) {
					clearInterval( rotationInterval );
					return;
				}
			}

			const currentText = texts[ currentIndex ];
			const nextText = texts[ nextIndex ];
			let charIndex = currentText.length;

			// Pause before erasing.
			setTimeout( () => {
				// Erase current text.
				const eraseInterval = setInterval( () => {
					charIndex--;
					rotatingEl.textContent = currentText.substring(
						0,
						charIndex
					);

					if ( charIndex <= 0 ) {
						clearInterval( eraseInterval );

						// Pause before typing.
						setTimeout( () => {
							// Type next text.
							let typeIndex = 0;
							const typeInterval = setInterval( () => {
								typeIndex++;
								rotatingEl.textContent = nextText.substring(
									0,
									typeIndex
								);

								if ( typeIndex >= nextText.length ) {
									clearInterval( typeInterval );
									currentIndex = nextIndex;
								}
							}, 50 );
						}, 200 );
					}
				}, 30 );
			}, 500 );
		}

		// Start rotation.
		if ( animation === 'typing' ) {
			rotationInterval = setInterval( animateTyping, duration );
		} else {
			rotationInterval = setInterval( animateStandard, duration );
		}
	}

	/**
	 * Initialize all text rotators on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll(
			'.wbcom-essential-text-rotator'
		);
		containers.forEach( initTextRotator );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
