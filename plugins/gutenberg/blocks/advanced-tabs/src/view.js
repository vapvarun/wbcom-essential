/**
 * Frontend JavaScript for the Advanced Tabs Block
 */

document.addEventListener(
	'DOMContentLoaded',
	function() {
		const tabBlocks = document.querySelectorAll( '.wp-block-wbcom-essential-advanced-tabs' );

		tabBlocks.forEach(
			function(block) {
				const tabTitles       = block.querySelectorAll( '.tab-title' );
				const tabContents     = block.querySelectorAll( '.tab-content-wrapper' );
				const accordionTitles = block.querySelectorAll( '.accordion-mobile-title' );
				const enableUrlHash   = block.dataset.enableUrlHash === 'true';

				// Handle tab clicks
				tabTitles.forEach(
					function(title, index) {
						title.addEventListener(
							'click',
							function() {
								activateTab( index );
							}
						);

						title.addEventListener(
							'keydown',
							function(e) {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									activateTab( index );
								} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
									e.preventDefault();
									const nextIndex = (index + 1) % tabTitles.length;
									activateTab( nextIndex );
								} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
									e.preventDefault();
									const prevIndex = index === 0 ? tabTitles.length - 1 : index - 1;
									activateTab( prevIndex );
								}
							}
						);
					}
				);

				// Handle accordion clicks (mobile)
				accordionTitles.forEach(
					function(title, index) {
						title.addEventListener(
							'click',
							function() {
								activateTab( index );
							}
						);

						title.addEventListener(
							'keydown',
							function(e) {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									activateTab( index );
								} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
									e.preventDefault();
									const nextIndex = (index + 1) % accordionTitles.length;
									activateTab( nextIndex );
								} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
									e.preventDefault();
									const prevIndex = index === 0 ? accordionTitles.length - 1 : index - 1;
									activateTab( prevIndex );
								}
							}
						);
					}
				);

				/**
				 * Activates a tab by index, updating UI and accessibility attributes
				 *
				 * @param {number} index - The index of the tab to activate
				 */
				function activateTab(index) {
					// Remove active class from all
					tabTitles.forEach(
						function(t, i) {
							t.classList.remove( 'active' );
							t.setAttribute( 'aria-selected', 'false' );
							t.setAttribute( 'tabindex', i === index ? '0' : '-1' );
						}
					);
					accordionTitles.forEach(
						function(t, i) {
							t.classList.remove( 'active' );
							t.setAttribute( 'aria-selected', 'false' );
							t.setAttribute( 'tabindex', i === index ? '0' : '-1' );
						}
					);
					tabContents.forEach(
						function(c) {
							c.classList.remove( 'active' );
						}
					);

					// Add active class to clicked tab
					if (tabTitles[index]) {
						tabTitles[index].classList.add( 'active' );
						tabTitles[index].setAttribute( 'aria-selected', 'true' );
						tabTitles[index].setAttribute( 'tabindex', '0' );
						tabTitles[index].focus();
					}
					if (accordionTitles[index]) {
						accordionTitles[index].classList.add( 'active' );
						accordionTitles[index].setAttribute( 'aria-selected', 'true' );
						accordionTitles[index].setAttribute( 'tabindex', '0' );
						accordionTitles[index].focus();
					}
					if (tabContents[index]) {
						tabContents[index].classList.add( 'active' );
					}

					// Update URL hash if enabled
					if (enableUrlHash && tabContents[index]) {
						const tabId = tabContents[index].dataset.tabId;
						if (tabId) {
							window.location.hash = tabId;
						}
					}
				}

				// Check URL hash on load and activate corresponding tab
				if (enableUrlHash && window.location.hash) {
					const hash = window.location.hash.substring( 1 );
					tabContents.forEach(
						function(content, index) {
							if (content.dataset.tabId === hash) {
								activateTab( index );
							}
						}
					);
				}
			}
		);
	}
);
