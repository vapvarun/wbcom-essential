/**
 * Smart Menu Interactive Functionality
 */

document.addEventListener( 'DOMContentLoaded', function () {
	const smartMenus = document.querySelectorAll(
		'.wp-block-wbcom-essential-smart-menu'
	);

	smartMenus.forEach( function ( menuBlock ) {
		const container = menuBlock.querySelector( '.smart-menu-container' );
		const toggle = menuBlock.querySelector( '.smart-menu-toggle' );
		const nav = menuBlock.querySelector( '.smart-menu-nav' );
		const breakpoint = parseInt( container.dataset.breakpoint || 1024 );
		const collapsibleBehavior =
			container.dataset.collapsibleBehavior || 'link';
		const submenuAnimation = container.dataset.submenuAnimation || '';

		// Mobile toggle functionality
		if ( toggle && nav ) {
			toggle.addEventListener( 'click', function () {
				nav.classList.toggle( 'menu-open' );
			} );
		}

		// Handle responsive behavior
		function handleResize() {
			if ( window.innerWidth <= breakpoint ) {
				menuBlock.classList.add( 'mobile-view' );
				if ( nav ) {
					if ( toggle ) {
						nav.classList.remove( 'menu-open' );
					} else {
						nav.classList.add( 'menu-open' );
					}
				}
			} else {
				menuBlock.classList.remove( 'mobile-view' );
				if ( nav ) {
					nav.classList.add( 'menu-open' );
				}
			}
		}

		// Initial check
		handleResize();

		// Listen for resize
		window.addEventListener( 'resize', handleResize );

		// Apply submenu animation
		function applySubmenuAnimation( submenu ) {
			if ( submenuAnimation ) {
				submenu.style.animation = `${ submenuAnimation } 0.3s ease`;
			}
		}

		// Mobile submenu toggle with collapsible behavior
		const menuItems = menuBlock.querySelectorAll(
			'.menu-item-has-children'
		);

		menuItems.forEach( function ( item ) {
			const link = item.querySelector( 'a' );
			const submenu = item.querySelector( '.sub-menu' );
			const dropdownIcon = item.querySelector( '.dropdown-icon' );

			if ( link && submenu ) {
				// Desktop view hover
				if ( ! menuBlock.classList.contains( 'mobile-view' ) ) {
					item.addEventListener( 'mouseenter', function () {
						applySubmenuAnimation( submenu );
					} );
				}

				link.addEventListener( 'click', function ( e ) {
					const isMobile =
						menuBlock.classList.contains( 'mobile-view' );

					// Handle collapsible behavior
					if (
						collapsibleBehavior === 'accordion' ||
						collapsibleBehavior === 'accordion-toggle' ||
						collapsibleBehavior === 'accordion-link'
					) {
						// Close all other submenus at same level
						const parent = item.parentElement;
						const siblings = parent.querySelectorAll(
							':scope > .menu-item-has-children'
						);
						siblings.forEach( function ( sibling ) {
							if ( sibling !== item ) {
								const siblingSubmenu =
									sibling.querySelector( '.sub-menu' );
								if ( siblingSubmenu ) {
									siblingSubmenu.classList.remove( 'open' );
									sibling.classList.remove(
										'submenu-expanded'
									);
								}
							}
						} );
					}

					// Handle desktop view
					if ( ! isMobile ) {
						if (
							collapsibleBehavior === 'link' ||
							collapsibleBehavior === 'accordion-link'
						) {
							// Allow link navigation, don't prevent default
						} else {
							e.preventDefault();
							item.classList.toggle( 'submenu-expanded' );
							submenu.classList.toggle( 'open' );
							applySubmenuAnimation( submenu );
						}
					}
					// Handle mobile view
					else {
						// Check if click is on dropdown icon
						const isClickOnIcon =
							dropdownIcon && dropdownIcon.contains( e.target );

						if ( isClickOnIcon ) {
							e.preventDefault();
						} else if (
							collapsibleBehavior === 'link' ||
							collapsibleBehavior === 'accordion-link'
						) {
							// Allow navigation for link behavior
							return;
						}

						// Toggle submenu in mobile view
						submenu.classList.toggle( 'open' );
						applySubmenuAnimation( submenu );
					}
				} );
			}
		} );

		// Close menu when clicking outside (mobile) - only if toggle exists
		document.addEventListener( 'click', function ( e ) {
			if (
				menuBlock.classList.contains( 'mobile-view' ) &&
				toggle &&
				! menuBlock.contains( e.target )
			) {
				if ( nav ) {
					nav.classList.remove( 'menu-open' );
				}
			}
		} );
	} );
} );
