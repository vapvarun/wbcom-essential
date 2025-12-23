/**
 * Members Lists Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a members lists instance.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initMembersLists( container ) {
		const tabs = container.querySelectorAll( '.wbcom-essential-members__tab' );
		const lists = container.querySelectorAll( '.wbcom-essential-members-list' );

		if ( ! tabs.length || ! lists.length ) {
			return;
		}

		tabs.forEach( ( tab ) => {
			tab.addEventListener( 'click', function ( e ) {
				e.preventDefault();

				const type = this.getAttribute( 'data-type' );

				// Update active tab.
				tabs.forEach( ( t ) => t.classList.remove( 'selected' ) );
				this.classList.add( 'selected' );

				// Update active list.
				lists.forEach( ( list ) => {
					list.classList.remove( 'active' );
					if ( list.classList.contains( `wbcom-essential-members-list--${ type }` ) ) {
						list.classList.add( 'active' );
					}
				} );
			} );
		} );
	}

	/**
	 * Initialize all members lists blocks on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll( '.wbcom-essential-members-lists' );
		containers.forEach( initMembersLists );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
