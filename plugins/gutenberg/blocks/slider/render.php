<?php
/**
 * Render callback for the Slider block.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_slider_block( $attributes ) {
	// Sanitize attributes
	$slides = isset( $attributes['slides'] ) ? $attributes['slides'] : array();
	$slider_height = isset( $attributes['sliderHeight'] ) ? $attributes['sliderHeight'] : array( 'size' => 700, 'unit' => 'px' );
	$slider_height_tablet = isset( $attributes['sliderHeightTablet'] ) ? $attributes['sliderHeightTablet'] : array( 'size' => 500, 'unit' => 'px' );
	$slider_height_mobile = isset( $attributes['sliderHeightMobile'] ) ? $attributes['sliderHeightMobile'] : array( 'size' => 400, 'unit' => 'px' );
	$autoplay = isset( $attributes['autoplay'] ) ? $attributes['autoplay'] : false;
	$autoplay_duration = isset( $attributes['autoplayDuration'] ) ? $attributes['autoplayDuration'] : 5;
	$slide_transition = isset( $attributes['slideTransition'] ) ? $attributes['slideTransition'] : 'fade';
	$show_dots = isset( $attributes['showDots'] ) ? $attributes['showDots'] : false;
	$show_arrows = isset( $attributes['showArrows'] ) ? $attributes['showArrows'] : true;
	$nav_arrows_desktop = isset( $attributes['navArrowsDesktop'] ) ? $attributes['navArrowsDesktop'] : false;
	$nav_arrows_tablet = isset( $attributes['navArrowsTablet'] ) ? $attributes['navArrowsTablet'] : false;
	$nav_arrows_mobile = isset( $attributes['navArrowsMobile'] ) ? $attributes['navArrowsMobile'] : false;
	$nav_dots_desktop = isset( $attributes['navDotsDesktop'] ) ? $attributes['navDotsDesktop'] : false;
	$nav_dots_tablet = isset( $attributes['navDotsTablet'] ) ? $attributes['navDotsTablet'] : false;
	$nav_dots_mobile = isset( $attributes['navDotsMobile'] ) ? $attributes['navDotsMobile'] : false;
	$slide_bg_color = isset( $attributes['slideBgColor'] ) ? $attributes['slideBgColor'] : '#0073aa';
	$title_color = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '#111111';
	$content_color = isset( $attributes['contentColor'] ) ? $attributes['contentColor'] : '#333333';

	if ( empty( $slides ) ) {
		return '<div class="wp-block-wbcom-essential-slider"><p>' . esc_html__( 'No slides to display.', 'wbcom-essential' ) . '</p></div>';
	}

	// Generate unique ID for the slider
	$slider_id = 'wbcom-slider-' . wp_rand( 1000, 9999 );

	// Build slider HTML
	$responsive_styles = '--slider-height-desktop: ' . esc_attr( $slider_height['size'] . $slider_height['unit'] ) . ';';
	$responsive_styles .= '--slider-height-tablet: ' . esc_attr( $slider_height_tablet['size'] . $slider_height_tablet['unit'] ) . ';';
	$responsive_styles .= '--slider-height-mobile: ' . esc_attr( $slider_height_mobile['size'] . $slider_height_mobile['unit'] ) . ';';

	$output = '<div class="wp-block-wbcom-essential-slider" id="' . esc_attr( $slider_id ) . '"';
	$output .= ' data-autoplay="' . esc_attr( $autoplay ? 'true' : 'false' ) . '"';
	$output .= ' data-autoplay-duration="' . esc_attr( $autoplay_duration ) . '"';
	$output .= ' data-transition="' . esc_attr( $slide_transition ) . '"';
	$output .= ' style="background-color: ' . esc_attr( $slide_bg_color ) . '; ' . $responsive_styles . '">';

	$output .= '<div class="wbcom-slider-wrapper">';

	$output .= '<div class="wbcom-slider-wrapper">';
	$output .= '<div class="wbcom-slider-inner">';

	foreach ( $slides as $slide ) {
		$output .= '<div class="wbcom-slider-slide">';

		// Background image
		if ( ! empty( $slide['image']['url'] ) ) {
		$bg_style = 'background-image: url(' . esc_url( $slide['image']['url'] ) . ');';
		$bg_style .= 'background-size: ' . ( isset( $slide['image_bg_size'] ) ? esc_attr( $slide['image_bg_size'] ) : 'cover' ) . ';';
		$bg_style .= 'background-position: ' . ( isset( $slide['image_position'] ) ? esc_attr( $slide['image_position'] ) : 'center center' ) . ';';
		$bg_style .= 'background-repeat: ' . ( isset( $slide['image_repeat'] ) ? esc_attr( $slide['image_repeat'] ) : 'no-repeat' ) . ';';
		$bg_style .= 'min-height: var(--slider-height-desktop);';

			$output .= '<div class="wbcom-slider-bg" style="' . esc_attr( $bg_style ) . '"';
			if ( ! empty( $slide['image']['alt'] ) ) {
				$output .= ' alt="' . esc_attr( $slide['image']['alt'] ) . '"';
			}
			$output .= '></div>';
		}

		// Text content
		$output .= '<div class="wbcom-slider-text-wrapper">';
		$output .= '<div class="wbcom-slider-text-box">';

		if ( ! empty( $slide['title'] ) ) {
			$output .= '<h1 class="wbcom-slider-title" style="color: ' . esc_attr( $title_color ) . ';">';
			$output .= wp_kses_post( $slide['title'] );
			$output .= '</h1>';
		}

		if ( ! empty( $slide['content'] ) ) {
			$output .= '<div class="wbcom-slider-desc" style="color: ' . esc_attr( $content_color ) . ';">';
			$output .= wp_kses_post( $slide['content'] );
			$output .= '</div>';
		}

		if ( ! empty( $slide['link']['url'] ) ) {
			$link_attrs = '';
			if ( ! empty( $slide['link']['is_external'] ) ) {
				$link_attrs .= ' target="_blank"';
			}
			if ( ! empty( $slide['link']['nofollow'] ) ) {
				$link_attrs .= ' rel="nofollow"';
			}

			$output .= '<div class="wbcom-slider-link">';
			$output .= '<a href="' . esc_url( $slide['link']['url'] ) . '" class="wbcombtn-primary"' . $link_attrs . '>';
			$output .= esc_html__( 'Learn More', 'wbcom-essential' );
			$output .= '</a>';
			$output .= '</div>';
		}

		$output .= '</div>'; // .wbcom-slider-text-box
		$output .= '</div>'; // .wbcom-slider-text-wrapper

		$output .= '</div>'; // .wbcom-slider-slide
	}

	$output .= '</div>'; // .wbcom-slider-inner

	// Navigation arrows
	if ( $show_arrows ) {
		$arrow_classes = 'wbcom-slider-prev';
		if ( $nav_arrows_desktop ) $arrow_classes .= ' hide-on-desktop';
		if ( $nav_arrows_tablet ) $arrow_classes .= ' hide-on-tablet';
		if ( $nav_arrows_mobile ) $arrow_classes .= ' hide-on-mobile';

		$output .= '<button class="' . esc_attr( $arrow_classes ) . '" aria-label="' . esc_attr__( 'Previous slide', 'wbcom-essential' ) . '">‹</button>';

		$arrow_classes = 'wbcom-slider-next';
		if ( $nav_arrows_desktop ) $arrow_classes .= ' hide-on-desktop';
		if ( $nav_arrows_tablet ) $arrow_classes .= ' hide-on-tablet';
		if ( $nav_arrows_mobile ) $arrow_classes .= ' hide-on-mobile';

		$output .= '<button class="' . esc_attr( $arrow_classes ) . '" aria-label="' . esc_attr__( 'Next slide', 'wbcom-essential' ) . '">›</button>';
	}

	// Navigation dots
	if ( $show_dots ) {
		$dots_classes = 'wbcom-slider-dots';
		if ( $nav_dots_desktop ) $dots_classes .= ' hide-on-desktop';
		if ( $nav_dots_tablet ) $dots_classes .= ' hide-on-tablet';
		if ( $nav_dots_mobile ) $dots_classes .= ' hide-on-mobile';

		$output .= '<div class="' . esc_attr( $dots_classes ) . '">';
		for ( $i = 0; $i < count( $slides ); $i++ ) {
			$output .= '<button class="wbcom-slider-dot" data-slide="' . esc_attr( $i ) . '" aria-label="' . esc_attr__( 'Go to slide', 'wbcom-essential' ) . ' ' . esc_attr( $i + 1 ) . '"></button>';
		}
		$output .= '</div>';
	}

	$output .= '</div>'; // .wbcom-slider-wrapper
	$output .= '</div>'; // .wp-block-wbcom-essential-slider

	return $output;
}