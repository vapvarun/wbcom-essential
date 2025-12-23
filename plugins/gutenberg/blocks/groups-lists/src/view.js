/**
 * Groups Lists Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a groups lists instance.
	 *
	 * @param {HTMLElement} container The groups lists container.
	 */
	function initGroupsLists( container ) {
		const tabs = container.querySelectorAll( '.wbcom-groups-filter-tab' );
		const lists = container.querySelectorAll( '.wbcom-groups-list' );

		if ( ! tabs.length ) {
			return;
		}

		tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				const type = tab.getAttribute( 'data-type' );

				// Update tab active states.
				tabs.forEach( ( t ) => t.classList.remove( 'active' ) );
				tab.classList.add( 'active' );

				// Update list visibility.
				lists.forEach( ( list ) => {
					list.classList.remove( 'active' );
					if ( list.classList.contains( `wbcom-groups-list--${ type }` ) ) {
						list.classList.add( 'active' );
					}
				} );
			} );
		} );
	}

	/**
	 * Initialize all groups lists blocks on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll( '.wbcom-essential-groups-lists' );
		containers.forEach( initGroupsLists );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
