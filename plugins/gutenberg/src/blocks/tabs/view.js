/**
 * Tabs Block - Frontend View Script
 * Implements WAI-ARIA Tabs Pattern.
 * Vanilla JS, no framework, no jQuery.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Activate a specific tab within a tabs component.
	 *
	 * @param {HTMLElement}   tabsEl    Root .wbe-tabs element.
	 * @param {HTMLElement[]} allTabs   All tab buttons.
	 * @param {HTMLElement[]} allPanels All tabpanel elements.
	 * @param {number}        index     Index of tab to activate.
	 */
	function activateTab( tabsEl, allTabs, allPanels, index ) {
		allTabs.forEach( ( tab, i ) => {
			const isTarget = i === index;
			tab.setAttribute( 'aria-selected', isTarget ? 'true' : 'false' );
			tab.setAttribute( 'tabindex', isTarget ? '0' : '-1' );
			tab.classList.toggle( 'is-active', isTarget );
		} );

		allPanels.forEach( ( panel, i ) => {
			const isTarget = i === index;
			panel.hidden = ! isTarget;
			panel.classList.toggle( 'is-active', isTarget );
		} );
	}

	/**
	 * Initialise a single tabs component.
	 *
	 * @param {HTMLElement} tabsEl The .wbe-tabs root element.
	 */
	function initTabs( tabsEl ) {
		const tabList = tabsEl.querySelector( '[role="tablist"]' );
		if ( ! tabList ) {
			return;
		}

		const allTabs = Array.from( tabsEl.querySelectorAll( '[role="tab"]' ) );
		const allPanels = Array.from( tabsEl.querySelectorAll( '[role="tabpanel"]' ) );

		if ( allTabs.length === 0 ) {
			return;
		}

		// Click: activate tab
		allTabs.forEach( ( tab, index ) => {
			tab.addEventListener( 'click', () => {
				activateTab( tabsEl, allTabs, allPanels, index );
			} );
		} );

		// Keyboard: Left/Right arrows, Home/End per WAI-ARIA pattern
		tabList.addEventListener( 'keydown', ( e ) => {
			const currentTab = e.target.closest( '[role="tab"]' );
			if ( ! currentTab ) {
				return;
			}

			const currentIndex = allTabs.indexOf( currentTab );
			let newIndex = currentIndex;

			switch ( e.key ) {
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault();
					newIndex = currentIndex > 0 ? currentIndex - 1 : allTabs.length - 1;
					break;
				case 'ArrowRight':
				case 'ArrowDown':
					e.preventDefault();
					newIndex = currentIndex < allTabs.length - 1 ? currentIndex + 1 : 0;
					break;
				case 'Home':
					e.preventDefault();
					newIndex = 0;
					break;
				case 'End':
					e.preventDefault();
					newIndex = allTabs.length - 1;
					break;
				default:
					return;
			}

			activateTab( tabsEl, allTabs, allPanels, newIndex );
			allTabs[ newIndex ].focus();
		} );
	}

	function init() {
		const tabsBlocks = document.querySelectorAll( '.wbe-tabs' );
		tabsBlocks.forEach( initTabs );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
