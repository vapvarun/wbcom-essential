/**
 * Translated Swiper a11y messages for front-end carousels.
 *
 * Swiper's A11y module ships English defaults and, on init, overwrites the
 * aria-label of the navigation buttons with them. Passing these messages keeps
 * every screen-reader string translatable.
 *
 * Import this file directly (not via ./index) so view scripts only pull in
 * @wordpress/i18n and nothing editor-side.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';

/**
 * Build the Swiper `a11y` option.
 *
 * @param {string} prevSlideMessage Label for the "previous" button.
 * @param {string} nextSlideMessage Label for the "next" button.
 * @return {Object} Swiper a11y config.
 */
export default function swiperA11y( prevSlideMessage, nextSlideMessage ) {
	return {
		prevSlideMessage,
		nextSlideMessage,
		firstSlideMessage: __( 'This is the first slide', 'wbcom-essential' ),
		lastSlideMessage: __( 'This is the last slide', 'wbcom-essential' ),
		/* translators: {{index}} is replaced by Swiper with the slide number. Keep {{index}} unchanged. */
		paginationBulletMessage: __( 'Go to slide {{index}}', 'wbcom-essential' ),
	};
}
