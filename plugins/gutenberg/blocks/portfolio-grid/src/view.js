/**
 * Portfolio Grid Block - Frontend JavaScript
 *
 * Handles filtering, layout switching, and lightbox functionality.
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', function () {
	const grids = document.querySelectorAll( '.wbcom-essential-portfolio-grid' );

	grids.forEach( function ( grid ) {
		const filterButtons = grid.querySelectorAll( '.wbcom-portfolio-filter' );
		const layoutButtons = grid.querySelectorAll( '.wbcom-layout-btn' );
		const itemsContainer = grid.querySelector( '.wbcom-portfolio-items' );
		const items = grid.querySelectorAll( '.wbcom-portfolio-item' );
		const hasLightbox = grid.getAttribute( 'data-lightbox' ) === 'true';

		// Filter functionality.
		filterButtons.forEach( function ( button ) {
			button.addEventListener( 'click', function () {
				const filter = this.getAttribute( 'data-filter' );

				// Update active state.
				filterButtons.forEach( function ( btn ) {
					btn.classList.remove( 'is-active' );
					btn.setAttribute( 'aria-selected', 'false' );
				} );
				this.classList.add( 'is-active' );
				this.setAttribute( 'aria-selected', 'true' );

				// Add filtering class for transition handling.
				items.forEach( function ( item ) {
					item.classList.add( 'is-filtering' );
				} );

				// Filter items with animation.
				requestAnimationFrame( function () {
					items.forEach( function ( item ) {
						const itemFilters = item.getAttribute( 'data-filters' ) || '';
						const filterList = itemFilters.split( ' ' ).filter( Boolean );

						if ( filter === 'all' || filterList.includes( filter ) ) {
							item.classList.remove( 'is-hidden' );
						} else {
							item.classList.add( 'is-hidden' );
						}
					} );

					// Remove filtering class after animation.
					setTimeout( function () {
						items.forEach( function ( item ) {
							item.classList.remove( 'is-filtering' );
						} );
					}, 400 );
				} );
			} );
		} );

		// Layout switching functionality.
		layoutButtons.forEach( function ( button ) {
			button.addEventListener( 'click', function () {
				const layout = this.getAttribute( 'data-layout' );

				// Update active state.
				layoutButtons.forEach( function ( btn ) {
					btn.classList.remove( 'is-active' );
				} );
				this.classList.add( 'is-active' );

				// Update layout class.
				if ( itemsContainer ) {
					itemsContainer.classList.remove( 'layout-grid', 'layout-list' );
					itemsContainer.classList.add( 'layout-' + layout );
				}

				// Update data attribute.
				grid.setAttribute( 'data-layout', layout );
			} );
		} );

		// Add entrance animations.
		if ( 'IntersectionObserver' in window ) {
			const observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							const item = entry.target;
							const allItems = Array.from( items );
							const visibleItems = allItems.filter( function ( i ) {
								return ! i.classList.contains( 'is-hidden' );
							} );
							const index = visibleItems.indexOf( item );

							// Stagger animation.
							setTimeout( function () {
								item.classList.add( 'is-visible' );
							}, index * 50 );
							observer.unobserve( item );
						}
					} );
				},
				{
					threshold: 0.1,
					rootMargin: '0px 0px -30px 0px',
				}
			);

			items.forEach( function ( item ) {
				if ( ! item.classList.contains( 'is-hidden' ) ) {
					observer.observe( item );
				}
			} );
		} else {
			// Fallback for browsers without IntersectionObserver.
			items.forEach( function ( item ) {
				item.classList.add( 'is-visible' );
			} );
		}

		// Lightbox functionality.
		if ( hasLightbox ) {
			initLightbox( grid );
		}
	} );

	/**
	 * Initialize lightbox for a portfolio grid.
	 *
	 * @param {HTMLElement} grid - The portfolio grid element.
	 */
	function initLightbox( grid ) {
		const lightbox = grid.querySelector( '.wbcom-portfolio-lightbox' );
		const lightboxBtns = grid.querySelectorAll( '.wbcom-portfolio-lightbox-btn' );
		const lightboxOverlay = grid.querySelector( '.wbcom-portfolio-lightbox-overlay' );
		const lightboxClose = grid.querySelector( '.wbcom-portfolio-lightbox-close' );
		const lightboxPrev = grid.querySelector( '.wbcom-portfolio-lightbox-prev' );
		const lightboxNext = grid.querySelector( '.wbcom-portfolio-lightbox-next' );
		const lightboxImage = grid.querySelector( '.wbcom-portfolio-lightbox-image' );
		const lightboxCaption = grid.querySelector( '.wbcom-portfolio-lightbox-caption' );

		if ( ! lightbox || ! lightboxBtns.length ) {
			return;
		}

		let currentIndex = 0;
		let images = [];

		/**
		 * Build array of visible images.
		 */
		function buildImageArray() {
			images = [];
			const visibleItems = grid.querySelectorAll( '.wbcom-portfolio-item:not(.is-hidden)' );
			visibleItems.forEach( function ( item ) {
				const btn = item.querySelector( '.wbcom-portfolio-lightbox-btn' );
				if ( btn ) {
					images.push( {
						src: btn.getAttribute( 'data-src' ),
						title: btn.getAttribute( 'data-title' ) || '',
					} );
				}
			} );
		}

		/**
		 * Open lightbox with specific image.
		 *
		 * @param {number} index - Image index to display.
		 */
		function openLightbox( index ) {
			buildImageArray();
			if ( images.length === 0 ) {
				return;
			}

			currentIndex = index;
			updateLightboxImage();
			lightbox.classList.add( 'is-open' );
			lightbox.setAttribute( 'aria-hidden', 'false' );
			document.body.style.overflow = 'hidden';

			// Focus trap.
			lightboxClose.focus();
		}

		/**
		 * Close lightbox.
		 */
		function closeLightbox() {
			lightbox.classList.remove( 'is-open' );
			lightbox.setAttribute( 'aria-hidden', 'true' );
			document.body.style.overflow = '';
		}

		/**
		 * Update lightbox image.
		 */
		function updateLightboxImage() {
			if ( images.length === 0 ) {
				return;
			}

			const image = images[ currentIndex ];
			lightboxImage.classList.remove( 'is-loaded' );
			lightboxImage.src = image.src;
			lightboxImage.alt = image.title;
			lightboxCaption.textContent = image.title;

			lightboxImage.onload = function () {
				lightboxImage.classList.add( 'is-loaded' );
			};

			// Update navigation visibility.
			if ( images.length <= 1 ) {
				lightboxPrev.style.display = 'none';
				lightboxNext.style.display = 'none';
			} else {
				lightboxPrev.style.display = '';
				lightboxNext.style.display = '';
			}
		}

		/**
		 * Show next image.
		 */
		function showNext() {
			currentIndex = ( currentIndex + 1 ) % images.length;
			updateLightboxImage();
		}

		/**
		 * Show previous image.
		 */
		function showPrev() {
			currentIndex = ( currentIndex - 1 + images.length ) % images.length;
			updateLightboxImage();
		}

		// Open lightbox on button click.
		lightboxBtns.forEach( function ( btn, index ) {
			btn.addEventListener( 'click', function ( e ) {
				e.preventDefault();
				e.stopPropagation();

				// Find the actual index among visible items.
				buildImageArray();
				const src = btn.getAttribute( 'data-src' );
				const actualIndex = images.findIndex( function ( img ) {
					return img.src === src;
				} );

				openLightbox( actualIndex >= 0 ? actualIndex : 0 );
			} );
		} );

		// Close lightbox events.
		if ( lightboxOverlay ) {
			lightboxOverlay.addEventListener( 'click', closeLightbox );
		}

		if ( lightboxClose ) {
			lightboxClose.addEventListener( 'click', closeLightbox );
		}

		// Navigation events.
		if ( lightboxPrev ) {
			lightboxPrev.addEventListener( 'click', showPrev );
		}

		if ( lightboxNext ) {
			lightboxNext.addEventListener( 'click', showNext );
		}

		// Keyboard navigation.
		document.addEventListener( 'keydown', function ( e ) {
			if ( ! lightbox.classList.contains( 'is-open' ) ) {
				return;
			}

			switch ( e.key ) {
				case 'Escape':
					closeLightbox();
					break;
				case 'ArrowLeft':
					showPrev();
					break;
				case 'ArrowRight':
					showNext();
					break;
			}
		} );

		// Touch swipe support.
		let touchStartX = 0;
		let touchEndX = 0;

		lightbox.addEventListener( 'touchstart', function ( e ) {
			touchStartX = e.changedTouches[ 0 ].screenX;
		}, { passive: true } );

		lightbox.addEventListener( 'touchend', function ( e ) {
			touchEndX = e.changedTouches[ 0 ].screenX;
			handleSwipe();
		}, { passive: true } );

		/**
		 * Handle touch swipe.
		 */
		function handleSwipe() {
			const swipeThreshold = 50;
			const diff = touchStartX - touchEndX;

			if ( Math.abs( diff ) > swipeThreshold ) {
				if ( diff > 0 ) {
					showNext();
				} else {
					showPrev();
				}
			}
		}

		// Rebuild image array when filters change.
		const filterButtons = grid.querySelectorAll( '.wbcom-portfolio-filter' );
		filterButtons.forEach( function ( btn ) {
			btn.addEventListener( 'click', function () {
				// Small delay to let filter animation complete.
				setTimeout( function () {
					buildImageArray();
				}, 100 );
			} );
		} );
	}
} );
