/**
 * Countdown Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function() {
	'use strict';

	/**
	 * Initialize countdown timer
	 *
	 * @param {HTMLElement} container The countdown container element
	 */
	function initCountdown( container ) {
		const countdown = container.querySelector( '.wbcom-countdown' );
		const message = container.querySelector( '.wbcom-countdown-msg' );

		if ( ! countdown ) {
			return;
		}

		const dueDate = countdown.dataset.duedate;

		if ( ! dueDate ) {
			return;
		}

		const targetTime = new Date( dueDate ).getTime();

		/**
		 * Update countdown display
		 */
		function updateCountdown() {
			const now = new Date().getTime();
			const diff = targetTime - now;

			if ( diff <= 0 ) {
				// Countdown expired
				countdown.style.display = 'none';
				if ( message ) {
					message.style.display = 'block';
				}
				return false;
			}

			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );

			// Update days
			const daysValue = countdown.querySelector( '.wbcom-countdown-days .wbcom-countdown-value' );
			if ( daysValue ) {
				daysValue.textContent = days.toString().padStart( 2, '0' );
			}

			// Update hours
			const hoursValue = countdown.querySelector( '.wbcom-countdown-hours .wbcom-countdown-value' );
			if ( hoursValue ) {
				hoursValue.textContent = hours.toString().padStart( 2, '0' );
			}

			// Update minutes
			const minutesValue = countdown.querySelector( '.wbcom-countdown-minutes .wbcom-countdown-value' );
			if ( minutesValue ) {
				minutesValue.textContent = minutes.toString().padStart( 2, '0' );
			}

			// Update seconds
			const secondsValue = countdown.querySelector( '.wbcom-countdown-seconds .wbcom-countdown-value' );
			if ( secondsValue ) {
				secondsValue.textContent = seconds.toString().padStart( 2, '0' );
			}

			return true;
		}

		// Initial update
		if ( updateCountdown() ) {
			// Start interval
			setInterval( updateCountdown, 1000 );
		}
	}

	/**
	 * Initialize all countdowns on page
	 */
	function initAllCountdowns() {
		const containers = document.querySelectorAll( '.wbcom-essential-countdown' );
		containers.forEach( initCountdown );
	}

	// Initialize on DOM ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAllCountdowns );
	} else {
		initAllCountdowns();
	}
} )();
