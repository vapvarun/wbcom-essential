<?php
/**
 * Render callback for the Branding block.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_branding_block( $attributes ) {
	// Debug: ensure function is called
	if ( ! isset( $attributes['brandingType'] ) ) {
		$attributes['brandingType'] = 'title';
	}
	$branding_type = $attributes['brandingType'];
	$alignment = isset( $attributes['alignment'] ) ? $attributes['alignment'] : '';
	$title_color = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '#333333';
	$title_hover_color = isset( $attributes['titleHoverColor'] ) ? $attributes['titleHoverColor'] : '#333333';
	$description_color = isset( $attributes['descriptionColor'] ) ? $attributes['descriptionColor'] : '#333333';
	$title_padding = isset( $attributes['titlePadding'] ) ? $attributes['titlePadding'] : array( 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0' );
	$description_padding = isset( $attributes['descriptionPadding'] ) ? $attributes['descriptionPadding'] : array( 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0' );
	$logo_padding = isset( $attributes['logoPadding'] ) ? $attributes['logoPadding'] : array( 'top' => '0', 'right' => '0', 'bottom' => '0', 'left' => '0' );
	$logo_width = isset( $attributes['logoWidth'] ) ? $attributes['logoWidth'] : 'auto';
	$logo_height = isset( $attributes['logoHeight'] ) ? $attributes['logoHeight'] : 'auto';
	$title_typography = isset( $attributes['titleTypography'] ) ? $attributes['titleTypography'] : array(
		'fontFamily' => '',
		'fontSize' => '',
		'fontWeight' => '',
		'lineHeight' => '',
		'letterSpacing' => '',
		'textTransform' => '',
		'textDecoration' => '',
	);
	$border = isset( $attributes['border'] ) ? $attributes['border'] : array( 'width' => '0', 'style' => 'none', 'color' => '#000000' );
	$border_radius = isset( $attributes['borderRadius'] ) ? $attributes['borderRadius'] : array( 'top' => '0px', 'right' => '0px', 'bottom' => '0px', 'left' => '0px' );

	$classes = 'wp-block-wbcom-essential-branding';
	if ( $alignment ) {
		$classes .= ' align' . $alignment;
	}

	$styles = '';
	if ( $border['width'] !== '0' && $border['style'] !== 'none' && $border['color'] ) {
		$styles .= 'border: ' . $border['width'] . ' ' . $border['style'] . ' ' . $border['color'] . ';';
	}
	if ( $border_radius['top'] || $border_radius['right'] || $border_radius['bottom'] || $border_radius['left'] ) {
		$styles .= 'border-radius: ' . $border_radius['top'] . ' ' . $border_radius['right'] . ' ' . $border_radius['bottom'] . ' ' . $border_radius['left'] . ';';
	}

	$output = '<div class="' . esc_attr( $classes ) . '" style="' . esc_attr( $styles ) . '">';
	$output .= '<div class="header-title">';

	if ( 'title' === $branding_type ) {
		$site_title = get_bloginfo( 'name' );
		$site_description = get_bloginfo( 'description', 'display' );

		// Fallback if no title
		if ( empty( $site_title ) ) {
			$site_title = 'Site Title';
		}

		$title_styles = 'color: ' . esc_attr( $title_color ) . ';';
		$title_styles .= 'padding: ' . esc_attr( $title_padding['top'] ) . ' ' . esc_attr( $title_padding['right'] ) . ' ' . esc_attr( $title_padding['bottom'] ) . ' ' . esc_attr( $title_padding['left'] ) . ';';

		// Apply typography styles
		if ( ! empty( $title_typography['fontFamily'] ) ) {
			$title_styles .= 'font-family: ' . esc_attr( $title_typography['fontFamily'] ) . ';';
		}
		if ( ! empty( $title_typography['fontSize'] ) ) {
			$title_styles .= 'font-size: ' . esc_attr( $title_typography['fontSize'] ) . ';';
		}
		if ( ! empty( $title_typography['fontWeight'] ) ) {
			$title_styles .= 'font-weight: ' . esc_attr( $title_typography['fontWeight'] ) . ';';
		}
		if ( ! empty( $title_typography['lineHeight'] ) ) {
			$title_styles .= 'line-height: ' . esc_attr( $title_typography['lineHeight'] ) . ';';
		}
		if ( ! empty( $title_typography['letterSpacing'] ) ) {
			$title_styles .= 'letter-spacing: ' . esc_attr( $title_typography['letterSpacing'] ) . ';';
		}
		if ( ! empty( $title_typography['textTransform'] ) ) {
			$title_styles .= 'text-transform: ' . esc_attr( $title_typography['textTransform'] ) . ';';
		}
		if ( ! empty( $title_typography['textDecoration'] ) ) {
			$title_styles .= 'text-decoration: ' . esc_attr( $title_typography['textDecoration'] ) . ';';
		}

		$output .= '<span class="site-title">';
		$output .= '<a href="' . esc_url( home_url( '/' ) ) . '" title="' . esc_attr( $site_title ) . '" alt="' . esc_attr( $site_title ) . '" style="' . esc_attr( $title_styles ) . '" onMouseEnter="this.style.color=\'' . esc_attr( $title_hover_color ) . '\'" onMouseLeave="this.style.color=\'' . esc_attr( $title_color ) . '\'">';
		$output .= esc_html( $site_title );
		$output .= '</a>';
		$output .= '</span>';

		// Always show description if it exists, or show a placeholder
		if ( $site_description ) {
			$desc_styles = 'color: ' . esc_attr( $description_color ) . ';';
			$desc_styles .= 'padding: ' . esc_attr( $description_padding['top'] ) . ' ' . esc_attr( $description_padding['right'] ) . ' ' . esc_attr( $description_padding['bottom'] ) . ' ' . esc_attr( $description_padding['left'] ) . ';';

			$output .= '<p class="site-description" style="' . esc_attr( $desc_styles ) . '">';
			$output .= wp_kses_post( $site_description );
			$output .= '</p>';
		} else {
			// Show placeholder description
			$desc_styles = 'color: ' . esc_attr( $description_color ) . ';';
			$desc_styles .= 'padding: ' . esc_attr( $description_padding['top'] ) . ' ' . esc_attr( $description_padding['right'] ) . ' ' . esc_attr( $description_padding['bottom'] ) . ' ' . esc_attr( $description_padding['left'] ) . ';';

			$output .= '<p class="site-description" style="' . esc_attr( $desc_styles ) . '">';
			$output .= 'Site description goes here';
			$output .= '</p>';
		}
	} elseif ( 'logo' === $branding_type ) {
		if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
			$logo_styles = 'padding: ' . esc_attr( $logo_padding['top'] ) . ' ' . esc_attr( $logo_padding['right'] ) . ' ' . esc_attr( $logo_padding['bottom'] ) . ' ' . esc_attr( $logo_padding['left'] ) . ';';
			if ( $logo_width !== 'auto' ) {
				$logo_styles .= 'width: ' . esc_attr( $logo_width ) . ';';
			}
			if ( $logo_height !== 'auto' ) {
				$logo_styles .= 'height: ' . esc_attr( $logo_height ) . ';';
			}
			$custom_logo_id = get_theme_mod( 'custom_logo' );
			$logo_url = wp_get_attachment_image_url( $custom_logo_id, 'full' );

			$output .= '<img src="' . esc_url( $logo_url ) . '" alt="' . esc_attr( get_bloginfo( 'name' ) ) . '" class="custom-logo" style="' . esc_attr( $logo_styles ) . '" />';
		} else {
			// Fallback to title if no logo
			$site_title = get_bloginfo( 'name' );
			$title_styles = 'color: ' . esc_attr( $title_color ) . ';';
			$title_styles .= 'padding: ' . esc_attr( $title_padding['top'] ) . ' ' . esc_attr( $title_padding['right'] ) . ' ' . esc_attr( $title_padding['bottom'] ) . ' ' . esc_attr( $title_padding['left'] ) . ';';

			// Apply typography styles
			if ( ! empty( $title_typography['fontFamily'] ) ) {
				$title_styles .= 'font-family: ' . esc_attr( $title_typography['fontFamily'] ) . ';';
			}
			if ( ! empty( $title_typography['fontSize'] ) ) {
				$title_styles .= 'font-size: ' . esc_attr( $title_typography['fontSize'] ) . ';';
			}
			if ( ! empty( $title_typography['fontWeight'] ) ) {
				$title_styles .= 'font-weight: ' . esc_attr( $title_typography['fontWeight'] ) . ';';
			}
			if ( ! empty( $title_typography['lineHeight'] ) ) {
				$title_styles .= 'line-height: ' . esc_attr( $title_typography['lineHeight'] ) . ';';
			}
			if ( ! empty( $title_typography['letterSpacing'] ) ) {
				$title_styles .= 'letter-spacing: ' . esc_attr( $title_typography['letterSpacing'] ) . ';';
			}
			if ( ! empty( $title_typography['textTransform'] ) ) {
				$title_styles .= 'text-transform: ' . esc_attr( $title_typography['textTransform'] ) . ';';
			}
			if ( ! empty( $title_typography['textDecoration'] ) ) {
				$title_styles .= 'text-decoration: ' . esc_attr( $title_typography['textDecoration'] ) . ';';
			}

			$output .= '<span class="site-title">';
			$output .= '<a href="' . esc_url( home_url( '/' ) ) . '" title="' . esc_attr( $site_title ) . '" alt="' . esc_attr( $site_title ) . '" style="' . esc_attr( $title_styles ) . '">';
			$output .= esc_html( $site_title );
			$output .= '</a>';
			$output .= '</span>';
		}
	}

	$output .= '</div>';
	$output .= '</div>';

	return $output;
}