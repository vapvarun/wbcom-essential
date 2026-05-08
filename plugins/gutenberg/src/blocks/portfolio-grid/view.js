/**
 * Portfolio Grid Block - Frontend Script
 *
 * Handles category filter: show/hide items based on data-category,
 * with smooth scale+opacity transitions. Respects prefers-reduced-motion.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	const REDUCED_MOTION = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

	/**
	 * Initialise filter behaviour for a single portfolio grid wrapper.
	 *
	 * @param {HTMLElement} wrapper
	 */
	function initPortfolioGrid( wrapper ) {
		const filterBar = wrapper.querySelector( '.wbe-portfolio-grid__filter' );
		const items     = wrapper.querySelectorAll( '.wbe-portfolio-grid__item' );

		if ( ! filterBar || ! items.length ) {
			return;
		}

		const buttons = filterBar.querySelectorAll( '.wbe-portfolio-grid__filter-btn' );

		/**
		 * Show/hide grid items based on active filter slug.
		 *
		 * @param {string} activeFilter - 'all' or 'cat-{term_id}'.
		 */
		function applyFilter( activeFilter ) {
			items.forEach( ( item ) => {
				const cats = item.dataset.category
					? item.dataset.category.split( ' ' )
					: [];

				const visible =
					activeFilter === 'all' || cats.includes( activeFilter );

				if ( REDUCED_MOTION ) {
					// No animation: just toggle visibility.
					item.hidden = ! visible;
					item.setAttribute( 'aria-hidden', visible ? 'false' : 'true' );
					return;
				}

				if ( visible ) {
					// Reset hidden before triggering appear animation.
					item.hidden = false;
					item.setAttribute( 'aria-hidden', 'false' );
					// Trigger reflow so transition fires correctly.
					// eslint-disable-next-line no-unused-expressions
					item.offsetHeight;
					item.classList.remove( 'is-hidden' );
					item.classList.add( 'is-visible' );
				} else {
					item.classList.remove( 'is-visible' );
					item.classList.add( 'is-hidden' );
					item.setAttribute( 'aria-hidden', 'true' );

					// Hide from layout after transition ends.
					item.addEventListener(
						'transitionend',
						function handler() {
							if ( item.classList.contains( 'is-hidden' ) ) {
								item.hidden = true;
							}
							item.removeEventListener( 'transitionend', handler );
						}
					);
				}
			} );
		}

		buttons.forEach( ( btn ) => {
			btn.addEventListener( 'click', () => {
				const filter = btn.dataset.filter || 'all';

				// Update active state + aria.
				buttons.forEach( ( b ) => {
					b.classList.remove( 'is-active' );
					b.setAttribute( 'aria-selected', 'false' );
				} );
				btn.classList.add( 'is-active' );
				btn.setAttribute( 'aria-selected', 'true' );

				applyFilter( filter );
			} );
		} );

		// Mark all items visible on init.
		items.forEach( ( item ) => {
			item.classList.add( 'is-visible' );
		} );
	}

	function init() {
		document
			.querySelectorAll( '.wbe-portfolio-grid' )
			.forEach( initPortfolioGrid );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
