/**
 * FAQ Accordion Block - Frontend View Script
 * Vanilla JS, no framework, no jQuery.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	const TRANSITION_DURATION = 300; // ms – must match CSS transition

	/**
	 * Get the icon character for the current state.
	 *
	 * @param {string}  style  Icon style: 'chevron' | 'plus' | 'arrow'
	 * @param {boolean} isOpen Whether the item is open.
	 * @return {string} Icon character.
	 */
	function getIcon( style, isOpen ) {
		switch ( style ) {
			case 'plus':
				return isOpen ? '\u2212' : '+'; // −  +
			case 'arrow':
				return isOpen ? '\u2193' : '\u2192'; // ↓  →
			case 'chevron':
			default:
				return isOpen ? '\u25BC' : '\u25BA'; // ▼  ▶
		}
	}

	/**
	 * Open a single FAQ item with slide-down animation.
	 *
	 * @param {HTMLElement} item      The .wbe-faq-accordion__item element.
	 * @param {string}      iconStyle The accordion's icon style.
	 */
	function openItem( item, iconStyle ) {
		const btn = item.querySelector( '.wbe-faq-accordion__question' );
		const panel = item.querySelector( '.wbe-faq-accordion__answer' );
		const icon = item.querySelector( '.wbe-faq-accordion__icon' );

		if ( ! btn || ! panel ) {
			return;
		}

		// Reveal panel before measuring scrollHeight
		panel.hidden = false;
		panel.style.overflow = 'hidden';
		panel.style.maxHeight = '0';

		// Force reflow so transition fires
		// eslint-disable-next-line no-unused-expressions
		panel.scrollHeight;

		const prefersReduced =
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		if ( prefersReduced ) {
			panel.style.maxHeight = panel.scrollHeight + 'px';
		} else {
			panel.style.transition = `max-height ${ TRANSITION_DURATION }ms ease`;
			panel.style.maxHeight = panel.scrollHeight + 'px';
		}

		btn.setAttribute( 'aria-expanded', 'true' );
		item.classList.add( 'is-open' );

		if ( icon ) {
			icon.textContent = getIcon( iconStyle, true );
		}

		// After transition, remove fixed max-height to allow natural reflow
		setTimeout( () => {
			panel.style.maxHeight = '';
			panel.style.overflow = '';
			panel.style.transition = '';
		}, TRANSITION_DURATION );
	}

	/**
	 * Close a single FAQ item with slide-up animation.
	 *
	 * @param {HTMLElement} item      The .wbe-faq-accordion__item element.
	 * @param {string}      iconStyle The accordion's icon style.
	 */
	function closeItem( item, iconStyle ) {
		const btn = item.querySelector( '.wbe-faq-accordion__question' );
		const panel = item.querySelector( '.wbe-faq-accordion__answer' );
		const icon = item.querySelector( '.wbe-faq-accordion__icon' );

		if ( ! btn || ! panel ) {
			return;
		}

		const prefersReduced =
			window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;

		// Lock current height before collapsing
		panel.style.maxHeight = panel.scrollHeight + 'px';
		panel.style.overflow = 'hidden';

		// Force reflow
		// eslint-disable-next-line no-unused-expressions
		panel.scrollHeight;

		if ( prefersReduced ) {
			panel.style.maxHeight = '0';
		} else {
			panel.style.transition = `max-height ${ TRANSITION_DURATION }ms ease`;
			panel.style.maxHeight = '0';
		}

		btn.setAttribute( 'aria-expanded', 'false' );
		item.classList.remove( 'is-open' );

		if ( icon ) {
			icon.textContent = getIcon( iconStyle, false );
		}

		setTimeout( () => {
			panel.hidden = true;
			panel.style.maxHeight = '';
			panel.style.overflow = '';
			panel.style.transition = '';
		}, TRANSITION_DURATION );
	}

	/**
	 * Initialise a single accordion container.
	 *
	 * @param {HTMLElement} accordion The .wbe-faq-accordion root element.
	 */
	function initAccordion( accordion ) {
		const allowMulti = accordion.dataset.allowMulti === 'true';
		const firstOpen = accordion.dataset.firstOpen === 'true';
		const iconStyle = accordion.dataset.iconStyle || 'chevron';
		const items = Array.from(
			accordion.querySelectorAll( '.wbe-faq-accordion__item' )
		);
		const buttons = Array.from(
			accordion.querySelectorAll( '.wbe-faq-accordion__question' )
		);

		if ( items.length === 0 ) {
			return;
		}

		// Open first item on load if requested
		if ( firstOpen && items[ 0 ] ) {
			openItem( items[ 0 ], iconStyle );
		}

		// Click handler
		accordion.addEventListener( 'click', ( e ) => {
			const btn = e.target.closest( '.wbe-faq-accordion__question' );
			if ( ! btn ) {
				return;
			}

			const item = btn.closest( '.wbe-faq-accordion__item' );
			if ( ! item ) {
				return;
			}

			const isOpen = item.classList.contains( 'is-open' );

			if ( ! allowMulti ) {
				// Close all other open items
				items.forEach( ( other ) => {
					if ( other !== item && other.classList.contains( 'is-open' ) ) {
						closeItem( other, iconStyle );
					}
				} );
			}

			if ( isOpen ) {
				closeItem( item, iconStyle );
			} else {
				openItem( item, iconStyle );
			}
		} );

		// Keyboard navigation: arrow keys move focus between question buttons
		accordion.addEventListener( 'keydown', ( e ) => {
			const btn = e.target.closest( '.wbe-faq-accordion__question' );
			if ( ! btn ) {
				return;
			}

			const currentIdx = buttons.indexOf( btn );

			switch ( e.key ) {
				case 'ArrowDown': {
					e.preventDefault();
					const next = buttons[ currentIdx + 1 ];
					if ( next ) {
						next.focus();
					}
					break;
				}
				case 'ArrowUp': {
					e.preventDefault();
					const prev = buttons[ currentIdx - 1 ];
					if ( prev ) {
						prev.focus();
					}
					break;
				}
				case 'Home': {
					e.preventDefault();
					if ( buttons[ 0 ] ) {
						buttons[ 0 ].focus();
					}
					break;
				}
				case 'End': {
					e.preventDefault();
					const last = buttons[ buttons.length - 1 ];
					if ( last ) {
						last.focus();
					}
					break;
				}
			}
		} );
	}

	// Bootstrap all accordions on the page
	function init() {
		const accordions = document.querySelectorAll( '.wbe-faq-accordion' );
		accordions.forEach( initAccordion );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
