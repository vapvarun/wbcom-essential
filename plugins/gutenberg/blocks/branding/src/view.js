/**
 * Branding Block Frontend JavaScript
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', function() {
	// Get all branding blocks
	const brandingBlocks = document.querySelectorAll( '.wp-block-wbcom-essential-branding' );

	brandingBlocks.forEach( function( block ) {
		const titleLink = block.querySelector( '.site-title a' );

		if ( ! titleLink ) {
			return;
		}

		// Get hover color from data attribute
		const hoverColor = titleLink.getAttribute( 'data-hover-color' );
		const normalColor = titleLink.getAttribute( 'data-normal-color' );

		if ( ! hoverColor || ! normalColor ) {
			return;
		}

		// Add hover event listeners
		titleLink.addEventListener( 'mouseenter', function() {
			this.style.color = hoverColor;
		} );

		titleLink.addEventListener( 'mouseleave', function() {
			this.style.color = normalColor;
		} );

		// Also handle focus for accessibility
		titleLink.addEventListener( 'focus', function() {
			this.style.color = hoverColor;
		} );

		titleLink.addEventListener( 'blur', function() {
			this.style.color = normalColor;
		} );
	} );
} );
