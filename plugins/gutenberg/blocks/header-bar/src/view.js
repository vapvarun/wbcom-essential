/**
 * Header Bar Block - Frontend JavaScript
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	/**
	 * Initialize a header bar instance.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initHeaderBar( container ) {
		// Profile dropdown toggle.
		const profileDropdown = container.querySelector(
			'.user-wrap-container'
		);
		if ( profileDropdown ) {
			const profileLink = profileDropdown.querySelector(
				'.user-link'
			);

			if ( profileLink ) {
				profileLink.addEventListener( 'click', function ( e ) {
					// Only toggle on arrow click or if clicking the name area.
					const target = e.target;
					if (
						target.classList.contains( 'fa-angle-down' ) ||
						target.classList.contains( 'user-name' )
					) {
						e.preventDefault();
						profileDropdown.classList.toggle( 'is-open' );
					}
				} );
			}
		}

		// Search toggle.
		const searchButton = container.querySelector(
			'.header-search-link'
		);
		const searchOverlay = container.querySelector(
			'.wbcom-header-bar-search-overlay'
		);
		const searchClose = container.querySelector( '.wbcom-search-close' );

		if ( searchButton && searchOverlay ) {
			searchButton.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				container.classList.add( 'search-active' );

				// Focus search input.
				const searchInput = searchOverlay.querySelector(
					'input[type="search"], input[type="text"]'
				);
				if ( searchInput ) {
					setTimeout( () => searchInput.focus(), 100 );
				}
			} );
		}

		if ( searchClose && searchOverlay ) {
			searchClose.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				container.classList.remove( 'search-active' );
			} );

			// Close on escape key.
			document.addEventListener( 'keydown', function ( e ) {
				if (
					e.key === 'Escape' &&
					container.classList.contains( 'search-active' )
				) {
					container.classList.remove( 'search-active' );
				}
			} );

			// Close on overlay background click.
			searchOverlay.addEventListener( 'click', function ( e ) {
				if ( e.target === searchOverlay ) {
					container.classList.remove( 'search-active' );
				}
			} );
		}

		// Close dropdowns when clicking outside.
		document.addEventListener( 'click', function ( e ) {
			// Close profile dropdown when clicking outside.
			if ( profileDropdown && ! profileDropdown.contains( e.target ) ) {
				profileDropdown.classList.remove( 'is-open' );
			}

			// Close notification dropdowns when clicking outside.
			const notificationDropdowns = container.querySelectorAll(
				'.notification-wrap.menu-item-has-children'
			);
			notificationDropdowns.forEach( function ( dropdown ) {
				if ( ! dropdown.contains( e.target ) ) {
					dropdown.classList.remove( 'is-open' );
				}
			} );
		} );

		// Dark mode toggle.
		const darkModeButton = container.querySelector(
			'.buddyx-switch-mode'
		);

		if ( darkModeButton ) {
			// Check for saved dark mode preference on page load.
			const savedDarkMode = localStorage.getItem( 'wbcom-dark-mode' );
			if ( savedDarkMode === 'true' ) {
				document.body.classList.add( 'dark-mode' );
				darkModeButton.classList.add( 'is-active' );
			}

			darkModeButton.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				const isDarkMode = document.body.classList.toggle( 'dark-mode' );
				darkModeButton.classList.toggle( 'is-active', isDarkMode );

				// Save preference to localStorage.
				localStorage.setItem( 'wbcom-dark-mode', isDarkMode.toString() );
			} );
		}

		// Initialize notification Mark as Read functionality.
		initNotificationMarkAsRead( container );

		// Initialize cart drawer functionality.
		initCartDrawer( container );
	}

	/**
	 * Initialize cart drawer functionality.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initCartDrawer( container ) {
		const cartTrigger = container.querySelector( '.header-cart-drawer-trigger' );
		const cartDrawer = container.querySelector( '.header-cart-drawer' );

		if ( ! cartTrigger || ! cartDrawer ) {
			return;
		}

		const overlay = cartDrawer.querySelector( '.header-cart-drawer__overlay' );
		const closeBtn = cartDrawer.querySelector( '.header-cart-drawer__close' );

		/**
		 * Open the cart drawer.
		 */
		function openDrawer() {
			cartDrawer.setAttribute( 'aria-hidden', 'false' );
			document.body.classList.add( 'header-cart-drawer-open' );
		}

		/**
		 * Close the cart drawer.
		 */
		function closeDrawer() {
			cartDrawer.setAttribute( 'aria-hidden', 'true' );
			document.body.classList.remove( 'header-cart-drawer-open' );
		}

		// Open drawer on cart icon click.
		cartTrigger.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			openDrawer();
		} );

		// Close drawer on overlay click.
		if ( overlay ) {
			overlay.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				closeDrawer();
			} );
		}

		// Close drawer on close button click.
		if ( closeBtn ) {
			closeBtn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				closeDrawer();
			} );
		}

		// Close drawer on ESC key.
		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && cartDrawer.getAttribute( 'aria-hidden' ) === 'false' ) {
				closeDrawer();
			}
		} );
	}

	/**
	 * Initialize notification Mark as Read functionality.
	 *
	 * @param {HTMLElement} container The block container.
	 */
	function initNotificationMarkAsRead( container ) {
		// Get the notifications container.
		const notificationsWrap = container.querySelector( '.notifications-wrap' );
		if ( ! notificationsWrap ) {
			return;
		}

		// Handle "Mark all as read" button.
		const markAllReadBtn = notificationsWrap.querySelector( '.mark-read-all' );
		if ( markAllReadBtn ) {
			markAllReadBtn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				e.stopPropagation();

				const notificationId = this.getAttribute( 'data-notification-id' );
				if ( notificationId === 'all' ) {
					markNotificationsAsRead( 'all', container );
				}
			} );
		}

		// Handle individual "Mark as read" buttons.
		const markReadBtns = notificationsWrap.querySelectorAll( '.mark-read.action-unread' );
		markReadBtns.forEach( function ( btn ) {
			btn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				e.stopPropagation();

				const notificationId = this.getAttribute( 'data-notification-id' );
				if ( notificationId ) {
					markNotificationsAsRead( notificationId, container, this );
				}
			} );
		} );
	}

	/**
	 * Mark notifications as read via AJAX.
	 *
	 * @param {string}      notificationId The notification ID or 'all'.
	 * @param {HTMLElement} container      The block container.
	 * @param {HTMLElement} clickedBtn     The clicked button element (for single notifications).
	 */
	function markNotificationsAsRead( notificationId, container, clickedBtn ) {
		// Check if BuddyPress AJAX is available.
		if ( typeof bp === 'undefined' || typeof bp.ajax === 'undefined' ) {
			// Try using the WordPress AJAX approach.
			markNotificationsViaWpAjax( notificationId, container, clickedBtn );
			return;
		}

		// Use BuddyPress AJAX if available.
		const data = {
			action: 'buddypress_mark_notification_read',
			notification_id: notificationId,
			_wpnonce: bp.ajax.nonce,
		};

		// Use fetch for the AJAX call.
		fetch( bp.ajax.url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams( data ).toString(),
		} )
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				if ( response.success ) {
					updateNotificationUI( notificationId, container, clickedBtn );
				}
			} )
			.catch( () => {
				// Silent fail - notification marking is non-critical.
			} );
	}

	/**
	 * Mark notifications as read via WordPress AJAX.
	 *
	 * @param {string}      notificationId The notification ID or 'all'.
	 * @param {HTMLElement} container      The block container.
	 * @param {HTMLElement} clickedBtn     The clicked button element.
	 */
	function markNotificationsViaWpAjax( notificationId, container, clickedBtn ) {
		// Get ajaxurl from WordPress.
		const ajaxUrl = typeof ajaxurl !== 'undefined' ? ajaxurl : '/wp-admin/admin-ajax.php';

		const data = new FormData();
		data.append( 'action', 'buddypress_mark_notification_read' );
		data.append( 'notification_id', notificationId );

		// Try to get nonce from various sources.
		const nonceField = document.querySelector( 'input[name="_wpnonce"]' );
		if ( nonceField ) {
			data.append( '_wpnonce', nonceField.value );
		}

		fetch( ajaxUrl, {
			method: 'POST',
			credentials: 'same-origin',
			body: data,
		} )
			.then( ( response ) => response.json() )
			.then( ( response ) => {
				if ( response.success ) {
					updateNotificationUI( notificationId, container, clickedBtn );
				}
			} )
			.catch( () => {
				// Silent fail - update UI anyway for better UX.
				updateNotificationUI( notificationId, container, clickedBtn );
			} );
	}

	/**
	 * Update the notification UI after marking as read.
	 *
	 * @param {string}      notificationId The notification ID or 'all'.
	 * @param {HTMLElement} container      The block container.
	 * @param {HTMLElement} clickedBtn     The clicked button element.
	 */
	function updateNotificationUI( notificationId, container, clickedBtn ) {
		const notificationsWrap = container.querySelector( '.notifications-wrap' );
		if ( ! notificationsWrap ) {
			return;
		}

		if ( notificationId === 'all' ) {
			// Mark all notifications as read.
			const unreadItems = notificationsWrap.querySelectorAll( '.dropdown-item.unread' );
			unreadItems.forEach( function ( item ) {
				item.classList.remove( 'unread' );
			} );

			// Hide the "Mark all as read" button.
			const markAllBtn = notificationsWrap.querySelector( '.mark-read-all' );
			if ( markAllBtn ) {
				markAllBtn.style.display = 'none';
			}

			// Update the counter.
			const counter = notificationsWrap.querySelector( '.count' );
			if ( counter ) {
				counter.style.display = 'none';
			}
		} else {
			// Mark single notification as read.
			if ( clickedBtn ) {
				const dropdownItem = clickedBtn.closest( '.dropdown-item' );
				if ( dropdownItem ) {
					dropdownItem.classList.remove( 'unread' );
				}
			}

			// Update the counter.
			const counter = notificationsWrap.querySelector( '.count' );
			if ( counter ) {
				const currentCount = parseInt( counter.textContent, 10 );
				if ( currentCount > 1 ) {
					counter.textContent = currentCount - 1;
				} else {
					counter.style.display = 'none';

					// Also hide "Mark all as read" when no more unread.
					const markAllBtn = notificationsWrap.querySelector( '.mark-read-all' );
					if ( markAllBtn ) {
						markAllBtn.style.display = 'none';
					}
				}
			}
		}
	}

	/**
	 * Initialize all header bars on the page.
	 */
	function initAll() {
		const containers = document.querySelectorAll(
			'.wbcom-essential-header-bar'
		);
		containers.forEach( initHeaderBar );
	}

	// Initialize on DOM ready.
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initAll );
	} else {
		initAll();
	}
} )();
