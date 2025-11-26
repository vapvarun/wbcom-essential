
/**
 * Smart Menu Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', function() {
	const smartMenus = document.querySelectorAll('.wp-block-wbcom-essential-smart-menu');

	smartMenus.forEach(function(menuBlock) {
		const container = menuBlock.querySelector('.smart-menu-container');
		const toggle = menuBlock.querySelector('.smart-menu-toggle');
		const nav = menuBlock.querySelector('.smart-menu-nav');
		const breakpoint = parseInt(container.dataset.breakpoint || 1024);

		// Mobile toggle functionality
		if (toggle && nav) {
			toggle.addEventListener('click', function() {
				nav.classList.toggle('menu-open');
			});
		}

		// Handle responsive behavior
		function handleResize() {
			if (window.innerWidth <= breakpoint) {
				menuBlock.classList.add('mobile-view');
				if (nav) {
					if (toggle) {
						nav.classList.remove('menu-open');
					} else {
						nav.classList.add('menu-open');
					}
				}
			} else {
				menuBlock.classList.remove('mobile-view');
				if (nav) {
					nav.classList.add('menu-open');
				}
			}
		}

		// Initial check
		handleResize();

		// Listen for resize
		window.addEventListener('resize', handleResize);

		// Mobile submenu toggle
		const menuItems = menuBlock.querySelectorAll('.menu-item-has-children');

		menuItems.forEach(function(item) {
			const link = item.querySelector('a');
			const submenu = item.querySelector('.sub-menu');
			const dropdownIcon = item.querySelector('.dropdown-icon');

			if (link && submenu) {
				link.addEventListener('click', function(e) {
					// Only handle in mobile view
					if (menuBlock.classList.contains('mobile-view')) {
						// Check if click is on dropdown icon
						const isClickOnIcon = dropdownIcon && dropdownIcon.contains(e.target);

						if (isClickOnIcon) {
							e.preventDefault();
						}

						// Toggle submenu in mobile view
						submenu.classList.toggle('open');
					}
				});
			}
		});



		// Close menu when clicking outside (mobile) - only if toggle exists
		document.addEventListener('click', function(e) {
			if (menuBlock.classList.contains('mobile-view') &&
				toggle &&
				!menuBlock.contains(e.target)) {
				if (nav) {
					nav.classList.remove('menu-open');
				}
			}
		});
	});
});
