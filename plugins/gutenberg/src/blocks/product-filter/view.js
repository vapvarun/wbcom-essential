/**
 * Product Filter — Frontend behavior.
 *
 * Walks DOM siblings after the filter bar, collects filterable sections,
 * and shows/hides them based on which filter button the visitor clicks.
 */
( function () {
	'use strict';

	function init() {
		var bar = document.getElementById( 'wbcom-product-filter' );
		if ( ! bar ) {
			return;
		}

		var isSticky = bar.getAttribute( 'data-sticky' ) === 'true';
		var stopAtCover = bar.getAttribute( 'data-stop-at-cover' ) === 'true';

		// Apply sticky positioning.
		if ( isSticky ) {
			var adminBarHeight = document.body.classList.contains( 'admin-bar' ) ? 32 : 0;
			var header = document.querySelector( '.site-header, header, #masthead, .reign-header' );
			var headerHeight = header ? header.offsetHeight : 0;
			var stickyTop = ( adminBarHeight + headerHeight ) + 'px';
			bar.style.position = 'sticky';
			bar.style.zIndex = '99';
			bar.style.top = stickyTop;

			// Toggle .is-stuck class when the bar becomes sticky.
			if ( 'IntersectionObserver' in window ) {
				var sentinel = document.createElement( 'div' );
				sentinel.style.height = '1px';
				sentinel.style.marginBottom = '-1px';
				bar.parentElement.insertBefore( sentinel, bar );

				var observer = new IntersectionObserver(
					function ( entries ) {
						bar.classList.toggle(
							'is-stuck',
							! entries[ 0 ].isIntersecting
						);
					},
					{ threshold: 0 }
				);
				observer.observe( sentinel );
			}
		}

		var btns = bar.querySelectorAll( '.wbcom-filter-btn' );
		var container = bar.parentElement;
		if ( ! container ) {
			return;
		}

		// Find the filter bar's position among its siblings.
		var kids = Array.from( container.children );
		var startIdx = -1;
		for ( var i = 0; i < kids.length; i++ ) {
			if ( kids[ i ] === bar ) {
				startIdx = i;
				break;
			}
		}

		// Collect every sibling after the bar that should be filterable.
		var filterable = [];
		for ( var j = startIdx + 1; j < kids.length; j++ ) {
			var el = kids[ j ];

			// Skip inline style/script nodes.
			if ( el.tagName === 'STYLE' || el.tagName === 'SCRIPT' ) {
				continue;
			}

			// Stop at the bottom CTA (full-width cover block).
			if ( stopAtCover ) {
				if (
					el.classList.contains( 'wp-block-cover' ) &&
					el.classList.contains( 'alignfull' )
				) {
					break;
				}
			}

			filterable.push( el );
		}

		// Bind click handlers.
		btns.forEach( function ( btn ) {
			btn.addEventListener( 'click', function () {
				var filter = this.getAttribute( 'data-filter' );

				// Update active state.
				btns.forEach( function ( b ) {
					b.classList.remove( 'active' );
				} );
				this.classList.add( 'active' );

				// "All" — show everything and scroll to the bar.
				if ( filter === 'all' ) {
					filterable.forEach( function ( section ) {
						section.style.display = '';
					} );
					window.scrollTo( {
						top: bar.offsetTop - 10,
						behavior: 'smooth',
					} );
					return;
				}

				// Hide all sections first.
				filterable.forEach( function ( section ) {
					section.style.display = 'none';
				} );

				// Show the matching section and scroll to it.
				var target = document.getElementById( filter );
				if ( target ) {
					target.style.display = '';
					setTimeout( function () {
						target.scrollIntoView( {
							behavior: 'smooth',
							block: 'start',
						} );
					}, 50 );
				}
			} );
		} );
	}

	// Handle both early and late script execution.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
