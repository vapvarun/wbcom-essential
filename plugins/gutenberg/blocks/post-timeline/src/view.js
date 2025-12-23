/**
 * Post Timeline Block - Frontend JavaScript
 *
 * Adds scroll-triggered animations to timeline items.
 *
 * @package wbcom-essential
 */

document.addEventListener( 'DOMContentLoaded', function () {
	const timelines = document.querySelectorAll(
		'.wbcom-essential-post-timeline'
	);

	timelines.forEach( function ( timeline ) {
		const items = timeline.querySelectorAll( '.wbcom-post-timeline-item' );

		// Add initial hidden state.
		items.forEach( function ( item ) {
			item.style.opacity = '0';
			item.style.transform = 'translateY(30px)';
			item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		} );

		// Set up Intersection Observer for scroll animation.
		if ( 'IntersectionObserver' in window ) {
			const observer = new IntersectionObserver(
				function ( entries ) {
					entries.forEach( function ( entry ) {
						if ( entry.isIntersecting ) {
							entry.target.style.opacity = '1';
							entry.target.style.transform = 'translateY(0)';
							observer.unobserve( entry.target );
						}
					} );
				},
				{
					threshold: 0.1,
					rootMargin: '0px 0px -50px 0px',
				}
			);

			items.forEach( function ( item ) {
				observer.observe( item );
			} );
		} else {
			// Fallback for older browsers.
			items.forEach( function ( item ) {
				item.style.opacity = '1';
				item.style.transform = 'translateY(0)';
			} );
		}
	} );
} );
