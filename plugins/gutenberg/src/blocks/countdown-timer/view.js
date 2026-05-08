/**
 * Countdown Timer Block - Frontend View Script
 * Vanilla JS, no framework, no jQuery.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Pad a number to 2 digits.
	 *
	 * @param {number} n Number to pad.
	 * @return {string} Zero-padded string.
	 */
	function pad( n ) {
		return String( Math.max( 0, Math.floor( n ) ) ).padStart( 2, '0' );
	}

	/**
	 * Calculate remaining time components from a target timestamp.
	 *
	 * @param {number} targetMs Target time in milliseconds.
	 * @return {Object} { days, hours, minutes, seconds, total }
	 */
	function getTimeRemaining( targetMs ) {
		const total = targetMs - Date.now();
		if ( total <= 0 ) {
			return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
		}
		const seconds = ( total / 1000 ) % 60;
		const minutes = ( total / 1000 / 60 ) % 60;
		const hours = ( total / 1000 / 60 / 60 ) % 24;
		const days = total / 1000 / 60 / 60 / 24;
		return { days, hours, minutes, seconds, total };
	}

	/**
	 * Initialise a single countdown timer element.
	 *
	 * @param {HTMLElement} el The .wbe-countdown-timer root element.
	 */
	function initTimer( el ) {
		const rawDate = el.dataset.targetDate;
		if ( ! rawDate ) {
			return;
		}

		const targetMs = Date.parse( rawDate );
		if ( isNaN( targetMs ) ) {
			return;
		}

		const showDays = el.dataset.showDays !== 'false';
		const showHours = el.dataset.showHours !== 'false';
		const showMinutes = el.dataset.showMinutes !== 'false';
		const showSeconds = el.dataset.showSeconds !== 'false';

		const expireEl = el.querySelector( '.wbe-countdown-timer__expire' );
		const unitsEl = el.querySelector( '.wbe-countdown-timer__units' );

		const numEls = {
			days: showDays ? el.querySelector( '.wbe-countdown-timer__unit--days .wbe-countdown-timer__number' ) : null,
			hours: showHours ? el.querySelector( '.wbe-countdown-timer__unit--hours .wbe-countdown-timer__number' ) : null,
			minutes: showMinutes ? el.querySelector( '.wbe-countdown-timer__unit--minutes .wbe-countdown-timer__number' ) : null,
			seconds: showSeconds ? el.querySelector( '.wbe-countdown-timer__unit--seconds .wbe-countdown-timer__number' ) : null,
		};

		let intervalId = null;

		function update() {
			const { days, hours, minutes, seconds, total } = getTimeRemaining( targetMs );

			if ( total <= 0 ) {
				// Show expiry message
				if ( unitsEl ) {
					unitsEl.hidden = true;
				}
				if ( expireEl ) {
					expireEl.hidden = false;
				}
				clearInterval( intervalId );
				return;
			}

			if ( numEls.days ) {
				numEls.days.textContent = pad( days );
			}
			if ( numEls.hours ) {
				numEls.hours.textContent = pad( hours );
			}
			if ( numEls.minutes ) {
				numEls.minutes.textContent = pad( minutes );
			}
			if ( numEls.seconds ) {
				numEls.seconds.textContent = pad( seconds );
			}
		}

		// Run immediately then every second
		update();
		intervalId = setInterval( update, 1000 );

		// Clean up when element is removed from the DOM
		const observer = new MutationObserver( ( mutations ) => {
			mutations.forEach( ( mutation ) => {
				mutation.removedNodes.forEach( ( node ) => {
					if ( node === el || node.contains( el ) ) {
						clearInterval( intervalId );
						observer.disconnect();
					}
				} );
			} );
		} );

		if ( el.parentNode ) {
			observer.observe( el.parentNode, { childList: true, subtree: true } );
		}
	}

	function init() {
		const timers = document.querySelectorAll( '.wbe-countdown-timer' );
		timers.forEach( initTimer );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
