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

		// Tabs whose content changes with external state (orders, subscriptions,
		// licenses) should never be cached — users expect fresh stats after
		// a purchase or subscription change.
		var NO_CACHE_TABS = [ 'dashboard', 'subscriptions', 'purchases', 'licenses' ];

		// Pre-warm cache with the server-rendered initial content (except for
		// live-data tabs, which always re-fetch on click).
		var contentCache = {};
		if ( activeTab && inner.innerHTML.trim() && NO_CACHE_TABS.indexOf( activeTab ) === -1 ) {
			contentCache[ activeTab ] = inner.innerHTML;
		}

		// Strip one-shot notice flags from the URL so a page refresh doesn't
		// re-display the same success/error banner. We keep ?tab=... so the
		// user stays on the tab they're already viewing.
		try {
			var initialUrl = new URL( window.location.href );
			var hadFlag    = false;
			if ( initialUrl.searchParams.get( 'updated' ) === 'true' ) {
				initialUrl.searchParams.delete( 'updated' );
				hadFlag = true;
			}
			if ( initialUrl.searchParams.has( 'edd-message' ) ) {
				initialUrl.searchParams.delete( 'edd-message' );
				hadFlag = true;
			}
			[ 'cancel_reason', 'cancel_reason_detail' ].forEach( function ( p ) {
				if ( initialUrl.searchParams.has( p ) ) {
					initialUrl.searchParams.delete( p );
					hadFlag = true;
				}
			} );
			if ( hadFlag ) {
				window.history.replaceState(
					{ tab: activeTab },
					'',
					initialUrl.toString()
				);
			}
		} catch ( _ ) { /* older browsers: leave URL as-is */ }

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
		 * Bind country/state dropdown dependency.
		 * When the country changes, fetch states from the REST API and update the state field.
		 *
		 * @param {HTMLElement} el Container element.
		 */
		function bindCountryStateHandler( el ) {
			var countrySelect = el.querySelector( '#card_country' );
			if ( ! countrySelect ) {
				return;
			}

			countrySelect.addEventListener( 'change', function () {
				var country = this.value;
				var stateField = el.querySelector( '#card_state' );
				var stateParent = stateField ? stateField.parentElement : null;

				if ( ! stateParent || ! country ) {
					return;
				}

				// Build the states endpoint URL from the tab endpoint base.
				var statesUrl = restUrl.replace( /edd-account\/$/, 'edd-account/states/' ) + encodeURIComponent( country );

				fetch( statesUrl, {
					method: 'GET',
					credentials: 'same-origin',
					headers: {
						'X-WP-Nonce': nonce,
						Accept: 'application/json',
					},
				} )
					.then( function ( response ) {
						return response.json();
					} )
					.then( function ( states ) {
						// Remove existing state field (keep the label).
						var oldField = stateParent.querySelector( 'select, input' );
						if ( oldField ) {
							oldField.remove();
						}

						if ( states && Object.keys( states ).length > 0 ) {
							var select = document.createElement( 'select' );
							select.id = 'card_state';
							select.name = 'card_state';
							select.className = 'wbcom-edd-profile__select';

							var defaultOpt = document.createElement( 'option' );
							defaultOpt.value = '';
							defaultOpt.textContent = 'Select state';
							select.appendChild( defaultOpt );

							for ( var code in states ) {
								if ( states.hasOwnProperty( code ) ) {
									var opt = document.createElement( 'option' );
									opt.value = code;
									opt.textContent = states[ code ];
									select.appendChild( opt );
								}
							}
							stateParent.appendChild( select );
						} else {
							var input = document.createElement( 'input' );
							input.type = 'text';
							input.id = 'card_state';
							input.name = 'card_state';
							input.className = 'wbcom-edd-profile__input';
							input.value = '';
							stateParent.appendChild( input );
						}
					} )
					.catch( function () {
						// On error, fall back to text input.
						var oldField = stateParent.querySelector( 'select, input' );
						if ( oldField ) {
							oldField.remove();
						}
						var input = document.createElement( 'input' );
						input.type = 'text';
						input.id = 'card_state';
						input.name = 'card_state';
						input.className = 'wbcom-edd-profile__input';
						input.value = '';
						stateParent.appendChild( input );
					} );
			} );
		}

		/**
		 * Bind interactive elements: copy-to-clipboard, cancel confirmation.
		 *
		 * @param {HTMLElement} el Container element.
		 */
		function bindInteractions( el ) {
			bindCountryStateHandler( el );
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

			// Cancel subscription — open survey modal instead of browser confirm.
			bindCancelModal( el );
		}

		/**
		 * Wire up the cancellation survey modal and the cancel links that open it.
		 *
		 * The modal lives in the subscriptions tab markup (single shared instance).
		 * Cancel links are rendered with `data-cancel-sub-id` and `data-cancel-sub-name`.
		 *
		 * @param {HTMLElement} el Container element that may contain cancel links and/or the modal.
		 */
		function bindCancelModal( el ) {
			// Modal may live in container's parent after AJAX re-render,
			// so search up to the dashboard root.
			var modal = container.querySelector( '.wbcom-edd-cancel-modal' ) ||
				el.querySelector( '.wbcom-edd-cancel-modal' );
			if ( ! modal ) {
				return;
			}

			var form   = modal.querySelector( '[data-cancel-modal-form]' );
			var subEl  = modal.querySelector( '[data-cancel-modal-sub-name]' );
			var state  = { href: null };

			function openModal( href, subName ) {
				state.href = href;
				if ( subEl ) {
					subEl.textContent = subName ? subName + ' — ' : '';
				}
				if ( form ) {
					form.reset();
				}
				modal.hidden = false;
				// Focus the first radio for accessibility.
				var firstRadio = form && form.querySelector( 'input[type="radio"]' );
				if ( firstRadio ) {
					setTimeout( function () { firstRadio.focus(); }, 50 );
				}
				document.addEventListener( 'keydown', onKey );
			}
			function closeModal() {
				modal.hidden = true;
				state.href = null;
				document.removeEventListener( 'keydown', onKey );
			}
			function onKey( e ) {
				if ( e.key === 'Escape' ) { closeModal(); }
			}

			// Open modal on any cancel link click.
			el.querySelectorAll( '[data-cancel-sub-id]' ).forEach( function ( link ) {
				link.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					openModal( link.href, link.dataset.cancelSubName || '' );
				} );
			} );

			// Close on backdrop / X / Keep Subscription.
			modal.querySelectorAll( '[data-cancel-modal-close]' ).forEach( function ( closer ) {
				closer.addEventListener( 'click', function ( e ) {
					e.preventDefault();
					closeModal();
				} );
			} );

			// Submit → navigate to the cancel URL with reason appended.
			if ( form ) {
				form.addEventListener( 'submit', function ( e ) {
					e.preventDefault();
					if ( ! state.href ) { return; }
					var reasonEl = form.querySelector( 'input[name="cancel_reason"]:checked' );
					var detailEl = form.querySelector( 'textarea[name="cancel_reason_detail"]' );
					var target   = new URL( state.href, window.location.origin );
					if ( reasonEl && reasonEl.value ) {
						target.searchParams.set( 'cancel_reason', reasonEl.value );
					}
					if ( detailEl && detailEl.value.trim() ) {
						target.searchParams.set( 'cancel_reason_detail', detailEl.value.trim() );
					}
					window.location.href = target.toString();
				} );
			}
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
					// Only cache non-empty responses to allow retry on empty/error.
					// Skip caching for tabs that depend on live external state.
					if ( html && NO_CACHE_TABS.indexOf( tab ) === -1 ) {
						contentCache[ tab ] = html;
					}
					renderHtml( tab, inner, html || '<p class="wbcom-edd-account__error">No content available for this tab.</p>' );
				} )
				.catch( function ( err ) {
					var msg = 'Could not load content. Please refresh the page.';
					if ( err && err.message && err.message.indexOf( '403' ) !== -1 ) {
						msg = 'Your session has expired. Please refresh the page to continue.';
					}
					renderHtml(
						tab,
						inner,
						'<p class="wbcom-edd-account__error">' + msg + '</p>'
					);
				} )
				.finally( function () {
					hideLoading();
				} );
		}

		// Wire up interactive elements in the server-rendered initial tab.
		// renderHtml() does this after every AJAX load; the first paint
		// never calls that path, so Copy buttons, country/state handlers
		// and data-confirm dialogs would silently do nothing until the
		// user switched tabs once. Run it now for the initial content.
		if ( inner && inner.innerHTML.trim() ) {
			bindInteractions( inner );
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
