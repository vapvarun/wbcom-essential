
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 */

document.addEventListener( 'DOMContentLoaded', function() {
	const dropdownButtons = document.querySelectorAll( '.dropdown-button-wrapper .dropdown-button' );

	dropdownButtons.forEach( function( button ) {
		const container = button.closest( '.dropdown-button-container' );
		const menu = container.querySelector( '.dropdown-menu' );

		if ( ! menu ) {
			return;
		}

		// Toggle dropdown on button click
		button.addEventListener( 'click', function( e ) {
			e.preventDefault();
			e.stopPropagation();

			// Close other dropdowns
			document.querySelectorAll( '.dropdown-menu' ).forEach( function( otherMenu ) {
				if ( otherMenu !== menu ) {
					otherMenu.classList.remove( 'is-open' );
				}
			} );

			// Toggle current dropdown
			menu.classList.toggle( 'is-open' );
		} );

		// Close dropdown when clicking outside
		document.addEventListener( 'click', function( e ) {
			if ( ! container.contains( e.target ) ) {
				menu.classList.remove( 'is-open' );
			}
		} );

		// Close dropdown on escape key
		document.addEventListener( 'keydown', function( e ) {
			if ( e.key === 'Escape' ) {
				menu.classList.remove( 'is-open' );
			}
		} );
	} );
} );
