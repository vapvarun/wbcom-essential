/**
 * Flip Box keyboard support: Enter or Space turns the focused card over,
 * Escape turns it back, and leaving the card resets it. Delegated on the
 * document so cards added later (Elementor editor, AJAX) work too.
 */
( function () {
	'use strict';

	var CARD = '.wba-flip-card-wrapper';

	document.addEventListener( 'keydown', function ( event ) {
		var card = event.target.closest ? event.target.closest( CARD ) : null;
		if ( ! card ) {
			return;
		}
		if ( 'Escape' === event.key ) {
			card.classList.remove( 'is-flipped' );
			if ( event.target !== card ) {
				card.focus();
			}
			return;
		}
		if ( event.target === card && ( 'Enter' === event.key || ' ' === event.key ) ) {
			event.preventDefault();
			card.classList.toggle( 'is-flipped' );
		}
	} );

	document.addEventListener( 'focusout', function ( event ) {
		var card = event.target.closest ? event.target.closest( CARD ) : null;
		if ( card && ! card.contains( event.relatedTarget ) ) {
			card.classList.remove( 'is-flipped' );
		}
	} );
}() );
