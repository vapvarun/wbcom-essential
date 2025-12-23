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
		let currentIndex = 0;

		/**
		 * Standard animation handler for most effects.
		 */
		function animateStandard() {
			currentIndex = ( currentIndex + 1 ) % texts.length;
			rotatingEl.textContent = texts[ currentIndex ];
			rotatingEl.classList.add( 'wbcom-animating' );

			// Remove animation class after animation completes.
			setTimeout( () => {
				rotatingEl.classList.remove( 'wbcom-animating' );
			}, 500 );
		}

		/**
		 * Typing animation handler.
		 */
		function animateTyping() {
			const nextIndex = ( currentIndex + 1 ) % texts.length;
			const currentText = texts[ currentIndex ];
			const nextText = texts[ nextIndex ];
			let charIndex = currentText.length;

			rotatingEl.classList.add( 'wbcom-typing-cursor' );

			// Erase current text.
			const eraseInterval = setInterval( () => {
				charIndex--;
				rotatingEl.textContent = currentText.substring( 0, charIndex );

				if ( charIndex <= 0 ) {
					clearInterval( eraseInterval );

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
				}
			}, 30 );
		}

		// Start rotation.
		setInterval( () => {
			if ( animation === 'typing' ) {
				animateTyping();
			} else {
				animateStandard();
			}
		}, duration );
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
