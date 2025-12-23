/**
 * Timeline Block - Frontend Script
 *
 * Animates timeline items on scroll using Intersection Observer.
 *
 * @package wbcom-essential
 */

( function () {
	'use strict';

	function initTimelineAnimations() {
		const timelines = document.querySelectorAll( '.wbcom-timeline-animated' );

		if ( ! timelines.length ) {
			return;
		}

		const observerOptions = {
			threshold: 0.2,
			rootMargin: '0px 0px -50px 0px',
		};

		const observer = new IntersectionObserver( ( entries ) => {
			entries.forEach( ( entry ) => {
				if ( entry.isIntersecting ) {
					entry.target.classList.add( 'animate-in' );
					observer.unobserve( entry.target );
				}
			} );
		}, observerOptions );

		timelines.forEach( ( timeline ) => {
			const icons = timeline.querySelectorAll( '.wbcom-timeline-icon' );
			const contents = timeline.querySelectorAll( '.wbcom-timeline-content' );

			icons.forEach( ( icon ) => {
				observer.observe( icon );
			} );

			contents.forEach( ( content ) => {
				observer.observe( content );
			} );
		} );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initTimelineAnimations );
	} else {
		initTimelineAnimations();
	}
} )();
