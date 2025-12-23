/**
 * Profile Completion Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a profile completion instance.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initProfileCompletion( container ) {
		// Linear skin toggle.
		if (
			container.classList.contains(
				'wbcom-profile-completion-skin-linear'
			)
		) {
			const progressArea = container.querySelector(
				'.wbcom-profile-completion-progress'
			);

			if ( progressArea ) {
				progressArea.addEventListener( 'click', function () {
					container.classList.toggle( 'is-active' );
				} );
			}
		}
	}

	/**
	 * Initialize all profile completion blocks on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll(
			'.wbcom-essential-profile-completion'
		);
		containers.forEach( initProfileCompletion );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
