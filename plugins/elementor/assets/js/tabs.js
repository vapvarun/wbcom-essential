/**
 * Wbcom Tabs widget.
 *
 * Opens a panel from its tab (desktop) or its accordion title (below the breakpoint), and follows the WAI-ARIA
 * tabs pattern: one tab in the Tab order, arrow keys (Up/Down when vertical) plus Home and End move between tabs
 * and open them, Enter and Space open a tab or an accordion title. State (is-open, aria-selected, tabindex,
 * aria-expanded) is set in one place, the panel library's onOpen callback.
 *
 * @package wbcom-essential
 */
( function ( $ ) {
	'use strict';

	$( window ).on( 'elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction( 'frontend/element_ready/wbcom-tabs.default', function ( $scope ) {
			var $tabs = $scope.find( '.wbcom_tab_head li' );
			var $titles = $scope.find( '.wbaccordion-mobile-title' );
			var vertical = 'vertical' === $scope.find( '.wbcom_tab_head' ).attr( 'aria-orientation' );

			var panels = $scope.find( '.wbcom_tab_item' ).wbaccordion( {
				animation: '',
				openSingle: true,
				openSpeed: 0,
				closeSpeed: 0,
				onOpen: function ( $panel ) {
					var id = $panel.attr( 'id' );
					var openClass = this.openClass;
					$tabs.each( function () {
						var current = $( this ).data( 'opentab' ) === id;
						$( this ).toggleClass( openClass, current )
							.attr( 'aria-selected', current ? 'true' : 'false' )
							.attr( 'tabindex', current ? '0' : '-1' );
					} );
					$titles.each( function () {
						$( this ).attr( 'aria-expanded', $( this ).data( 'opentab' ) === id ? 'true' : 'false' );
					} );
					if ( $panel.data( 'hash' ) ) {
						if ( history.pushState ) {
							history.pushState( null, null, $panel.data( 'hash' ) );
						} else {
							window.location.hash = $panel.data( 'hash' );
						}
					}
				},
			} );

			var open = function ( $trigger ) {
				panels.close();
				panels.click( $scope.find( '#' + $trigger.data( 'opentab' ) ) );
			};

			$tabs.on( 'click', function () {
				open( $( this ) );
			} );

			$tabs.on( 'keydown', function ( event ) {
				var index = $tabs.index( this );
				var next = null;
				var key = event.key;
				if ( ( vertical ? 'ArrowDown' : 'ArrowRight' ) === key ) {
					next = ( index + 1 ) % $tabs.length;
				} else if ( ( vertical ? 'ArrowUp' : 'ArrowLeft' ) === key ) {
					next = ( index - 1 + $tabs.length ) % $tabs.length;
				} else if ( 'Home' === key ) {
					next = 0;
				} else if ( 'End' === key ) {
					next = $tabs.length - 1;
				} else if ( 'Enter' === key || ' ' === key ) {
					event.preventDefault();
					open( $( this ) );
					return;
				}
				if ( null !== next ) {
					event.preventDefault();
					open( $tabs.eq( next ) );
					$tabs.eq( next ).trigger( 'focus' );
				}
			} );

			$titles.on( 'click', function () {
				open( $( this ) );
				$titles.removeClass( 'is-open' );
				$( this ).addClass( 'is-open' );
			} ).on( 'keydown', function ( event ) {
				if ( 'Enter' === event.key || ' ' === event.key ) {
					event.preventDefault();
					$( this ).trigger( 'click' );
				}
			} );
		} );
	} );
}( jQuery ) );
