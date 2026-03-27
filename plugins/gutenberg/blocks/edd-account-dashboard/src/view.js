/**
 * EDD Account Dashboard - Frontend Tab Switching
 *
 * Handles AJAX tab switching via the WordPress REST API.
 * Uses fetch(), not jQuery. IIFE pattern for scope isolation.
 *
 * Security note: HTML content is sourced exclusively from the authenticated
 * WordPress REST API endpoint, where all output is sanitised server-side via
 * wp_kses_post(), esc_html(), and esc_url() before being returned.
 * The endpoint requires a valid wp_rest nonce (is_user_logged_in() check).
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Boot the dashboard for every block instance on the page.
	 */
	function init() {
		var containers = document.querySelectorAll( '.wbcom-edd-account' );
		if ( ! containers.length ) {
			return;
		}
		containers.forEach( initDashboard );
	}

	/**
	 * Initialise a single dashboard container.
	 *
	 * @param {HTMLElement} container The block wrapper element.
	 */
	function initDashboard( container ) {
		var restUrl   = container.dataset.restUrl;
		var nonce     = container.dataset.nonce;
		var activeTab = container.dataset.activeTab;

		if ( ! restUrl || ! nonce ) {
			return;
		}

		var navLinks   = container.querySelectorAll( '.wbcom-edd-account__nav-link[data-tab]' );
		var inner      = container.querySelector( '.wbcom-edd-account__inner' );
		var loadingEl  = container.querySelector( '.wbcom-edd-account__loading' );
		var tabContent = container.querySelector( '.wbcom-edd-account__tab-content' );

		if ( ! navLinks.length || ! inner ) {
			return;
		}

		// Pre-warm cache with the server-rendered initial content.
		var contentCache = {};
		if ( activeTab && inner.innerHTML.trim() ) {
			contentCache[ activeTab ] = inner.innerHTML;
		}

		/**
		 * Show loading overlay.
		 */
		function showLoading() {
			if ( loadingEl ) {
				loadingEl.hidden = false;
				loadingEl.removeAttribute( 'aria-hidden' );
			}
			if ( tabContent ) {
				tabContent.setAttribute( 'aria-busy', 'true' );
			}
			inner.style.opacity      = '0.4';
			inner.style.pointerEvents = 'none';
		}

		/**
		 * Hide loading overlay.
		 */
		function hideLoading() {
			if ( loadingEl ) {
				loadingEl.hidden = true;
				loadingEl.setAttribute( 'aria-hidden', 'true' );
			}
			if ( tabContent ) {
				tabContent.setAttribute( 'aria-busy', 'false' );
			}
			inner.style.opacity      = '';
			inner.style.pointerEvents = '';
		}

		/**
		 * Mark the correct nav link as active.
		 *
		 * @param {string} tab Tab key.
		 */
		function setActiveLink( tab ) {
			navLinks.forEach( function ( link ) {
				var isActive = link.dataset.tab === tab;
				link.classList.toggle( 'is-active', isActive );
				link.setAttribute( 'aria-current', isActive ? 'page' : 'false' );
			} );
		}

		/**
		 * Render server-sanitised HTML into the content area.
		 * Content originates from WordPress functions (wp_kses_post, esc_html, etc.).
		 *
		 * @param {string}      tab  Tab key.
		 * @param {HTMLElement} el   Target element.
		 * @param {string}      html Sanitised server HTML.
		 */
		function renderHtml( tab, el, html ) {
			// Content is server-sanitised via WP kses/esc functions in
			// wbcom_essential_edd_account_tab_callback(). Safe to render.
			/* eslint-disable no-unsanitized/property */
			el.innerHTML = html;
			/* eslint-enable no-unsanitized/property */
			if ( tabContent ) {
				tabContent.dataset.tabContent = tab;
			}
			setActiveLink( tab );
			fixFormActions( tab, el );
			bindInteractions( el );
		}

		/**
		 * Fix form action URLs after AJAX tab load.
		 *
		 * EDD shortcode forms (e.g. profile editor) may have action URLs
		 * pointing to the REST API path. Rewrite them to the current page
		 * and ensure ?tab= is preserved so the user returns to the same
		 * tab after form submission.
		 *
		 * @param {string}      tab Tab key.
		 * @param {HTMLElement} el  Container element.
		 */
		function fixFormActions( tab, el ) {
			var forms = el.querySelectorAll( 'form' );
			if ( ! forms.length ) {
				return;
			}

			var pageUrl = new URL( window.location.href );
			pageUrl.searchParams.set( 'tab', tab );
			var correctAction = pageUrl.toString();

			forms.forEach( function ( form ) {
				var action = form.getAttribute( 'action' ) || '';
				// Fix if action is empty, points to REST API, or missing tab param.
				if ( ! action || action.indexOf( 'wp-json' ) !== -1 || action.indexOf( '/wbcom/v1/' ) !== -1 ) {
					form.setAttribute( 'action', correctAction );
				} else if ( action.indexOf( 'tab=' ) === -1 ) {
					// Existing frontend action but missing tab param.
					var sep = action.indexOf( '?' ) !== -1 ? '&' : '?';
					form.setAttribute( 'action', action + sep + 'tab=' + encodeURIComponent( tab ) );
				}
			} );
		}

		/**
		 * Bind interactive elements: copy-to-clipboard, cancel confirmation.
		 *
		 * @param {HTMLElement} el Container element.
		 */
		function bindInteractions( el ) {
			// Copy license key to clipboard.
			el.querySelectorAll( '.wbcom-edd-license__copy-btn' ).forEach( function ( btn ) {
				btn.addEventListener( 'click', function () {
					var key = btn.dataset.copy;
					if ( ! key ) {
						return;
					}

					function onCopied() {
						var label = btn.querySelector( 'span' );
						if ( label ) {
							label.textContent = 'Copied!';
						}
						btn.classList.add( 'is-copied' );
						setTimeout( function () {
							if ( label ) {
								label.textContent = 'Copy';
							}
							btn.classList.remove( 'is-copied' );
						}, 2000 );
					}

					function fallbackCopy() {
						var ta = document.createElement( 'textarea' );
						ta.value = key;
						ta.style.position = 'fixed';
						ta.style.opacity = '0';
						document.body.appendChild( ta );
						ta.select();
						document.execCommand( 'copy' );
						document.body.removeChild( ta );
						onCopied();
					}

					// Use Clipboard API if available, fallback on denial or absence.
					if ( navigator.clipboard && navigator.clipboard.writeText ) {
						navigator.clipboard.writeText( key ).then( onCopied ).catch( fallbackCopy );
					} else {
						fallbackCopy();
					}
				} );
			} );

			// Cancel subscription confirmation.
			el.querySelectorAll( '[data-confirm]' ).forEach( function ( link ) {
				link.addEventListener( 'click', function ( e ) {
					var msg = link.dataset.confirm;
					if ( msg && ! window.confirm( msg ) ) { // eslint-disable-line no-alert
						e.preventDefault();
					}
				} );
			} );
		}

		/**
		 * Load a tab, using cached content when available.
		 *
		 * @param {string} tab Tab key.
		 */
		function loadTab( tab ) {
			if ( contentCache[ tab ] ) {
				renderHtml( tab, inner, contentCache[ tab ] );
				return;
			}

			showLoading();

			fetch( restUrl + encodeURIComponent( tab ), {
				method:      'GET',
				credentials: 'same-origin',
				headers: {
					'X-WP-Nonce': nonce,
					Accept:        'application/json',
				},
			} )
				.then( function ( response ) {
					if ( ! response.ok ) {
						throw new Error( 'HTTP ' + response.status );
					}
					return response.json();
				} )
				.then( function ( data ) {
					var html = ( data && data.html ) ? data.html : '';
					contentCache[ tab ] = html;
					renderHtml( tab, inner, html );
				} )
				.catch( function () {
					renderHtml(
						tab,
						inner,
						'<p class="wbcom-edd-account__error">Could not load content. Please refresh the page.</p>'
					);
				} )
				.finally( function () {
					hideLoading();
				} );
		}

		// Attach click handlers to tab navigation links.
		navLinks.forEach( function ( link ) {
			link.addEventListener( 'click', function ( event ) {
				event.preventDefault();

				var tab = link.dataset.tab;
				if ( ! tab ) {
					return;
				}

				var url = new URL( window.location.href );
				url.searchParams.set( 'tab', tab );
				window.history.pushState( { tab: tab }, '', url.toString() );

				loadTab( tab );
			} );
		} );

		// Handle browser back/forward navigation.
		window.addEventListener( 'popstate', function ( event ) {
			var tab =
				( event.state && event.state.tab ) ||
				new URLSearchParams( window.location.search ).get( 'tab' ) ||
				container.dataset.activeTab;

			if ( tab ) {
				loadTab( tab );
			}
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}
} )();
