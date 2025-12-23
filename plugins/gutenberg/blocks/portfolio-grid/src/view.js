/**
 * Portfolio Grid Block - Frontend JavaScript
 *
 * Handles filtering and layout switching functionality.
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

				// Filter items.
				items.forEach( function ( item ) {
					const itemFilters = item.getAttribute( 'data-filters' ) || '';
					const filterList = itemFilters.split( ' ' ).filter( Boolean );

					if ( filter === 'all' || filterList.includes( filter ) ) {
						item.classList.remove( 'is-hidden' );
					} else {
						item.classList.add( 'is-hidden' );
					}
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
					entries.forEach( function ( entry, index ) {
						if ( entry.isIntersecting ) {
							const item = entry.target;
							// Stagger animation.
							setTimeout( function () {
								item.style.opacity = '1';
								item.style.transform = 'scale(1)';
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
					item.style.opacity = '0';
					item.style.transform = 'scale(0.95)';
					item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
					observer.observe( item );
				}
			} );
		}
	} );
} );
