
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
		const collapsibleBehavior = container.dataset.collapsible || 'link';

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
					nav.classList.remove('menu-open');
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
						// Check if click is on dropdown icon or if behavior is toggle
						const isClickOnIcon = dropdownIcon && dropdownIcon.contains(e.target);
						const shouldPreventDefault = (collapsibleBehavior === 'toggle' || collapsibleBehavior === 'accordion-toggle') || isClickOnIcon;

						if (shouldPreventDefault) {
							e.preventDefault();
						}

						// Always toggle submenu in mobile view
						submenu.classList.toggle('open');

						// Accordion: close siblings
						if (collapsibleBehavior === 'accordion-toggle' || collapsibleBehavior === 'accordion-link') {
							const siblings = item.parentElement.querySelectorAll('.sub-menu.open');
							siblings.forEach(function(sibling) {
								if (sibling !== submenu) {
									sibling.classList.remove('open');
								}
							});
						}
					}
				});
			}
		});

		// Apply animation class when submenus appear
		const animation = container.dataset.animation;
		if (animation && animation !== 'none') {
			const submenus = menuBlock.querySelectorAll('.sub-menu');
			submenus.forEach(function(submenu) {
				submenu.classList.add('animate-' + animation);
			});
		}

		// Close menu when clicking outside (mobile)
		document.addEventListener('click', function(e) {
			if (menuBlock.classList.contains('mobile-view') && 
				!menuBlock.contains(e.target)) {
				if (nav) {
					nav.classList.remove('menu-open');
				}
			}
		});
	});
});
