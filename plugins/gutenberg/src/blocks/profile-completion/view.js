/**
 * Profile Completion Block — Frontend JS
 *
 * Hydrates the block container using the custom wbcom-essential/v1/profile-completion
 * REST endpoint. Renders a circle SVG ring or a linear bar, then animates it on load.
 * Renders the group checklist when enabled.
 *
 * Security: all user-visible strings come from i18n config (server-escaped) or are
 * constructed from integer/trusted data. No raw user HTML is injected.
 */

( function () {
	'use strict';

	// ── SVG icon helpers (static markup, no user input) ──────────────────────

	/** Checkmark circle SVG for completed items. */
	function svgDone() {
		const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'width', '16' );
		svg.setAttribute( 'height', '16' );
		svg.setAttribute( 'viewBox', '0 0 16 16' );
		svg.setAttribute( 'fill', 'none' );
		svg.setAttribute( 'aria-hidden', 'true' );

		const circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
		circle.setAttribute( 'cx', '8' );
		circle.setAttribute( 'cy', '8' );
		circle.setAttribute( 'r', '8' );
		circle.setAttribute( 'fill', 'currentColor' );
		circle.setAttribute( 'fill-opacity', '.15' );
		svg.appendChild( circle );

		const path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' );
		path.setAttribute( 'd', 'M4.5 8.5L7 11L11.5 5.5' );
		path.setAttribute( 'stroke', 'currentColor' );
		path.setAttribute( 'stroke-width', '1.8' );
		path.setAttribute( 'stroke-linecap', 'round' );
		path.setAttribute( 'stroke-linejoin', 'round' );
		svg.appendChild( path );

		return svg;
	}

	/** Empty circle SVG for incomplete items. */
	function svgTodo() {
		const svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' );
		svg.setAttribute( 'width', '16' );
		svg.setAttribute( 'height', '16' );
		svg.setAttribute( 'viewBox', '0 0 16 16' );
		svg.setAttribute( 'fill', 'none' );
		svg.setAttribute( 'aria-hidden', 'true' );

		const circle = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
		circle.setAttribute( 'cx', '8' );
		circle.setAttribute( 'cy', '8' );
		circle.setAttribute( 'r', '7.5' );
		circle.setAttribute( 'stroke', 'currentColor' );
		circle.setAttribute( 'stroke-opacity', '.4' );
		svg.appendChild( circle );

		return svg;
	}

	// ── DOM helpers ───────────────────────────────────────────────────────────

	/**
	 * Create an element, optionally set class and text content.
	 *
	 * @param {string} tag
	 * @param {string} [className]
	 * @param {string} [textContent]
	 * @return {HTMLElement}
	 */
	function el( tag, className, textContent ) {
		const node = document.createElement( tag );
		if ( className ) {
			node.className = className;
		}
		if ( textContent !== undefined && textContent !== null ) {
			node.textContent = String( textContent );
		}
		return node;
	}

	// ── Circle ring renderer ──────────────────────────────────────────────────

	/**
	 * Build the SVG circle progress ring using DOM SVG API.
	 * The progress arc starts at stroke-dashoffset = circumference (0%)
	 * and animates to the final offset via CSS transition.
	 *
	 * @param {number} percentage
	 * @param {Object} cfg
	 * @return {HTMLElement} wrapper div
	 */
	function renderCircle( percentage, cfg ) {
		const {
			circumference,
			circleSize,
			circleCx,
			circleCy,
			circleR,
			showPercentage,
			i18n,
		} = cfg;

		const ns      = 'http://www.w3.org/2000/svg';
		const wrapper = el( 'div', 'wbe-profile-completion__circle-wrap' );

		// Build SVG element.
		const svg = document.createElementNS( ns, 'svg' );
		svg.setAttribute( 'class', 'wbe-profile-completion__svg' );
		svg.setAttribute( 'width', circleSize );
		svg.setAttribute( 'height', circleSize );
		svg.setAttribute( 'viewBox', '0 0 ' + circleSize + ' ' + circleSize );
		svg.setAttribute( 'role', 'img' );
		svg.setAttribute( 'aria-label', i18n.ariaLabel.replace( '%d', percentage ).replace( '%%', '%' ) );

		// Track circle.
		const track = document.createElementNS( ns, 'circle' );
		track.setAttribute( 'class', 'wbe-profile-completion__track' );
		track.setAttribute( 'cx', circleCx );
		track.setAttribute( 'cy', circleCy );
		track.setAttribute( 'r', circleR );
		track.setAttribute( 'fill', 'none' );
		track.setAttribute( 'stroke', 'var(--wbe-prc-track, #e9ecef)' );
		track.setAttribute( 'stroke-width', '8' );
		svg.appendChild( track );

		// Progress arc — starts at full offset (invisible) and animates.
		const finalOffset  = Math.round( ( circumference - ( percentage / 100 ) * circumference ) * 100 ) / 100;
		const progressArc  = document.createElementNS( ns, 'circle' );
		progressArc.setAttribute( 'class', 'wbe-profile-completion__progress' );
		progressArc.setAttribute( 'cx', circleCx );
		progressArc.setAttribute( 'cy', circleCy );
		progressArc.setAttribute( 'r', circleR );
		progressArc.setAttribute( 'fill', 'none' );
		progressArc.setAttribute( 'stroke', 'var(--wbe-prc-progress, #667eea)' );
		progressArc.setAttribute( 'stroke-width', '8' );
		progressArc.setAttribute( 'stroke-linecap', 'round' );
		progressArc.setAttribute( 'stroke-dasharray', circumference );
		// Start at full offset (zero fill) so the CSS transition plays on insertion.
		progressArc.setAttribute( 'stroke-dashoffset', circumference );
		progressArc.setAttribute( 'transform', 'rotate(-90 ' + circleCx + ' ' + circleCy + ')' );
		progressArc.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
		svg.appendChild( progressArc );

		// Percentage text inside ring.
		if ( showPercentage ) {
			const text = document.createElementNS( ns, 'text' );
			text.setAttribute( 'class', 'wbe-profile-completion__pct-text' );
			text.setAttribute( 'x', circleCx );
			text.setAttribute( 'y', circleCy + 1 );
			text.setAttribute( 'text-anchor', 'middle' );
			text.setAttribute( 'dominant-baseline', 'middle' );
			text.setAttribute( 'fill', 'var(--wbe-prc-text, #1e1e2e)' );
			text.setAttribute( 'font-size', '18' );
			text.setAttribute( 'font-weight', '700' );
			text.textContent = percentage + '%';
			svg.appendChild( text );
		}

		wrapper.appendChild( svg );

		const label = el( 'p', 'wbe-profile-completion__label', i18n.profileComplete );
		wrapper.appendChild( label );

		// Trigger the animation after the element is in the DOM.
		requestAnimationFrame( function () {
			requestAnimationFrame( function () {
				progressArc.setAttribute( 'stroke-dashoffset', finalOffset );
			} );
		} );

		return wrapper;
	}

	// ── Linear bar renderer ───────────────────────────────────────────────────

	/**
	 * Build the linear progress bar.
	 * The fill starts at 0% and animates to final width.
	 *
	 * @param {number} percentage
	 * @param {Object} cfg
	 * @return {HTMLElement} wrapper div
	 */
	function renderLinear( percentage, cfg ) {
		const { showPercentage, i18n } = cfg;

		const wrapper = el( 'div', 'wbe-profile-completion__linear-wrap' );

		if ( showPercentage ) {
			const header = el( 'div', 'wbe-profile-completion__linear-header' );
			header.appendChild( el( 'span', 'wbe-profile-completion__linear-label', i18n.profileComplete ) );
			const pct = el( 'span', 'wbe-profile-completion__linear-pct', percentage + '%' );
			pct.style.color = 'var(--wbe-prc-text, #1e1e2e)';
			header.appendChild( pct );
			wrapper.appendChild( header );
		}

		const barTrack = el( 'div', 'wbe-profile-completion__bar-track' );
		barTrack.style.background = 'var(--wbe-prc-track, #e9ecef)';
		barTrack.setAttribute( 'role', 'progressbar' );
		barTrack.setAttribute( 'aria-valuenow', percentage );
		barTrack.setAttribute( 'aria-valuemin', '0' );
		barTrack.setAttribute( 'aria-valuemax', '100' );
		barTrack.setAttribute( 'aria-label', i18n.ariaLabel.replace( '%d', percentage ).replace( '%%', '%' ) );

		const barFill = el( 'div', 'wbe-profile-completion__bar-fill' );
		barFill.style.width    = '0%';
		barFill.style.background = 'var(--wbe-prc-progress, #667eea)';
		barFill.style.transition = 'width 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
		barTrack.appendChild( barFill );
		wrapper.appendChild( barTrack );

		// Trigger animation after DOM insertion.
		requestAnimationFrame( function () {
			requestAnimationFrame( function () {
				barFill.style.width = percentage + '%';
			} );
		} );

		return wrapper;
	}

	// ── Group checklist renderer ──────────────────────────────────────────────

	/**
	 * Build the checklist of profile groups.
	 *
	 * @param {Array}  groups  Array of group objects from REST response.
	 * @param {Object} cfg
	 * @return {HTMLUListElement}
	 */
	function renderGroupList( groups, cfg ) {
		const { i18n } = cfg;

		const list = el( 'ul', 'wbe-profile-completion__group-list' );
		list.setAttribute( 'aria-label', i18n.checklist );

		groups.forEach( function ( group ) {
			const isDone = !! group.is_group_completed;
			const li     = el( 'li', 'wbe-profile-completion__group-item ' + ( isDone ? 'is-done' : 'is-todo' ) );

			// Icon.
			const iconSpan = el( 'span', 'wbe-profile-completion__group-icon' );
			iconSpan.setAttribute( 'aria-label', isDone ? i18n.completed : i18n.incomplete );
			iconSpan.style.color = isDone
				? 'var(--wbe-prc-done, #28a745)'
				: 'var(--wbe-prc-todo, #6c757d)';
			iconSpan.appendChild( isDone ? svgDone() : svgTodo() );
			li.appendChild( iconSpan );

			// Label link.
			const link = el( 'a', 'wbe-profile-completion__group-label', group.label );
			link.href        = group.link || '#';
			link.style.color = 'var(--wbe-prc-text, #1e1e2e)';
			li.appendChild( link );

			// Count badge.
			const completed = parseInt( group.completed, 10 ) || 0;
			const total     = parseInt( group.total, 10 ) || 0;
			const countText = i18n.countFormat
				.replace( '%1$d', completed )
				.replace( '%2$d', total );
			const count = el( 'span', 'wbe-profile-completion__group-count', countText );
			count.style.color = 'var(--wbe-prc-todo, #6c757d)';
			li.appendChild( count );

			list.appendChild( li );
		} );

		return list;
	}

	// ── Main block hydration ──────────────────────────────────────────────────

	/**
	 * Hydrate a single profile-completion block container.
	 *
	 * @param {HTMLElement} container Element with data-wbe-pc-config attribute.
	 */
	function initBlock( container ) {
		let cfg;
		try {
			cfg = JSON.parse( container.dataset.wbePcConfig || '{}' );
		} catch ( e ) {
			return;
		}

		if ( ! cfg.restUrl ) {
			return;
		}

		// Build request URL with query params.
		const url = new URL( cfg.restUrl, window.location.origin );
		if ( cfg.selectedGroups ) {
			url.searchParams.set( 'selected_groups', cfg.selectedGroups );
		}
		url.searchParams.set( 'check_photo', cfg.checkPhoto ? '1' : '0' );
		url.searchParams.set( 'check_cover', cfg.checkCover ? '1' : '0' );

		const headers = { 'Content-Type': 'application/json' };
		if ( cfg.restNonce ) {
			headers[ 'X-WP-Nonce' ] = cfg.restNonce;
		}

		fetch( url.toString(), { headers: headers, credentials: 'same-origin' } )
			.then( function ( res ) {
				if ( ! res.ok ) {
					throw new Error( 'REST error ' + res.status );
				}
				return res.json();
			} )
			.then( function ( data ) {
				const percentage = parseInt( data.percentage, 10 ) || 0;
				const groups     = Array.isArray( data.groups ) ? data.groups : [];

				// Replace the loading placeholder with rendered content.
				const inner = el( 'div', 'wbe-profile-completion__inner' );

				if ( cfg.skin === 'linear' ) {
					inner.appendChild( renderLinear( percentage, cfg ) );
				} else {
					inner.appendChild( renderCircle( percentage, cfg ) );
				}

				if ( cfg.showGroupList && groups.length > 0 ) {
					inner.appendChild( renderGroupList( groups, cfg ) );
				}

				// Swap: clear loading state, insert rendered content.
				container.setAttribute( 'aria-busy', 'false' );
				container.removeAttribute( 'aria-label' );
				container.textContent = '';
				container.appendChild( inner );
			} )
			.catch( function () {
				// Silently clear loading state on error — block simply stays empty.
				container.setAttribute( 'aria-busy', 'false' );
				container.textContent = '';
			} );
	}

	// ── Boot ──────────────────────────────────────────────────────────────────

	function boot() {
		document.querySelectorAll( '[data-wbe-pc-config]' ).forEach( initBlock );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', boot );
	} else {
		boot();
	}
} )();
