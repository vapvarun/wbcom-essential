<?php
/**
 * Render callback for the Heading block.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_heading_block( $attributes ) {
	// Extract attributes with defaults
	$heading_text = isset( $attributes['headingText'] ) ? $attributes['headingText'] : 'Add Your Heading Text Here';
	$html_tag = isset( $attributes['htmlTag'] ) ? $attributes['htmlTag'] : 'h2';
	$link = isset( $attributes['link'] ) ? $attributes['link'] : array( 'url' => '', 'isExternal' => false, 'nofollow' => false );
	$title_color = isset( $attributes['titleColor'] ) ? $attributes['titleColor'] : '';
	$typography = isset( $attributes['typography'] ) ? $attributes['typography'] : array();
	$text_shadow = isset( $attributes['textShadow'] ) ? $attributes['textShadow'] : array();
	$blend_mode = isset( $attributes['blendMode'] ) ? $attributes['blendMode'] : '';
	$flex_direction = isset( $attributes['flexDirection'] ) ? $attributes['flexDirection'] : 'column';
	$text_align = isset( $attributes['textAlign'] ) ? $attributes['textAlign'] : '';
	$max_width = isset( $attributes['maxWidth'] ) ? $attributes['maxWidth'] : array( 'value' => '', 'unit' => 'px' );
	$margin = isset( $attributes['margin'] ) ? $attributes['margin'] : array( 'top' => '', 'right' => '', 'bottom' => '', 'left' => '', 'unit' => 'px' );
	$padding = isset( $attributes['padding'] ) ? $attributes['padding'] : array( 'top' => '', 'right' => '', 'bottom' => '', 'left' => '', 'unit' => 'px' );
	$gradient_heading = isset( $attributes['gradientHeading'] ) ? $attributes['gradientHeading'] : false;
	$gradient_color_start = isset( $attributes['gradientColorStart'] ) ? $attributes['gradientColorStart'] : '#000000';
	$gradient_color_end = isset( $attributes['gradientColorEnd'] ) ? $attributes['gradientColorEnd'] : '#ffffff';

	// Ensure colors are strings
	if ( is_array( $title_color ) ) {
		$title_color = isset( $title_color['color'] ) ? $title_color['color'] : ( isset( $title_color['hex'] ) ? $title_color['hex'] : '' );
	}
	if ( is_array( $gradient_color_start ) ) {
		$gradient_color_start = isset( $gradient_color_start['color'] ) ? $gradient_color_start['color'] : ( isset( $gradient_color_start['hex'] ) ? $gradient_color_start['hex'] : '#000000' );
	}
	if ( is_array( $gradient_color_end ) ) {
		$gradient_color_end = isset( $gradient_color_end['color'] ) ? $gradient_color_end['color'] : ( isset( $gradient_color_end['hex'] ) ? $gradient_color_end['hex'] : '#ffffff' );
	}
	$gradient_type = isset( $attributes['gradientType'] ) ? $attributes['gradientType'] : 'linear';
	$gradient_direction = isset( $attributes['gradientDirection'] ) ? $attributes['gradientDirection'] : 'to right';
	$rotate_switch = isset( $attributes['rotateSwitch'] ) ? $attributes['rotateSwitch'] : false;
	$text_rotate = isset( $attributes['textRotate'] ) ? $attributes['textRotate'] : 180;
	$before_line = isset( $attributes['beforeLine'] ) ? $attributes['beforeLine'] : array();
	$after_line = isset( $attributes['afterLine'] ) ? $attributes['afterLine'] : array();

	// Ensure line colors are strings
	if ( isset( $before_line['color'] ) && is_array( $before_line['color'] ) ) {
		$before_line['color'] = isset( $before_line['color']['color'] ) ? $before_line['color']['color'] : ( isset( $before_line['color']['hex'] ) ? $before_line['color']['hex'] : '' );
	}
	if ( isset( $after_line['color'] ) && is_array( $after_line['color'] ) ) {
		$after_line['color'] = isset( $after_line['color']['color'] ) ? $after_line['color']['color'] : ( isset( $after_line['color']['hex'] ) ? $after_line['color']['hex'] : '' );
	}

	// Return early if no heading text
	if ( empty( $heading_text ) ) {
		return '';
	}

	// Build classes
	$classes = 'wp-block-wbcom-essential-heading wbcom-heading';
	if ( $gradient_heading ) {
		$classes .= ' wbcom-gradient-heading';
	}

  // Build wrapper styles (for margin, padding, max-width, etc.)
  $wrapper_styles = '';

  if ( ! empty( $flex_direction ) ) {
    $wrapper_styles .= 'flex-direction: ' . esc_attr( $flex_direction ) . ';';
  }

  if ( ! empty( $text_align ) ) {
    $wrapper_styles .= 'text-align: ' . esc_attr( $text_align ) . ';';
  }

  if ( ! empty( $max_width['value'] ) ) {
    $wrapper_styles .= 'max-width: ' . esc_attr( $max_width['value'] ) . $max_width['unit'] . ';';
  }

  // Margin
  if ( ! empty( $margin['top'] ) || ! empty( $margin['right'] ) || ! empty( $margin['bottom'] ) || ! empty( $margin['left'] ) ) {
    $wrapper_styles .= 'margin: ' . esc_attr( $margin['top'] ) . $margin['unit'] . ' ' . esc_attr( $margin['right'] ) . $margin['unit'] . ' ' . esc_attr( $margin['bottom'] ) . $margin['unit'] . ' ' . esc_attr( $margin['left'] ) . $margin['unit'] . ';';
  }

  // Padding
  if ( ! empty( $padding['top'] ) || ! empty( $padding['right'] ) || ! empty( $padding['bottom'] ) || ! empty( $padding['left'] ) ) {
    $wrapper_styles .= 'padding: ' . esc_attr( $padding['top'] ) . $padding['unit'] . ' ' . esc_attr( $padding['right'] ) . $padding['unit'] . ' ' . esc_attr( $padding['bottom'] ) . $padding['unit'] . ' ' . esc_attr( $padding['left'] ) . $padding['unit'] . ';';
  }

  // Build heading styles (for color, typography, gradient, etc.)
  $heading_styles = '';

  if ( ! $gradient_heading && ! empty( $title_color ) ) {
    $heading_styles .= 'color: ' . esc_attr( $title_color ) . ';';
  }

  if ( ! empty( $blend_mode ) ) {
    $heading_styles .= 'mix-blend-mode: ' . esc_attr( $blend_mode ) . ';';
  }

  // Typography
  if ( ! empty( $typography['fontFamily'] ) ) {
    $heading_styles .= 'font-family: ' . esc_attr( $typography['fontFamily'] ) . ';';
  }
  if ( ! empty( $typography['fontSize'] ) ) {
    $heading_styles .= 'font-size: ' . esc_attr( $typography['fontSize'] ) . ';';
  }
  if ( ! empty( $typography['fontWeight'] ) ) {
    $heading_styles .= 'font-weight: ' . esc_attr( $typography['fontWeight'] ) . ';';
  }
  if ( ! empty( $typography['lineHeight'] ) ) {
    $heading_styles .= 'line-height: ' . esc_attr( $typography['lineHeight'] ) . ';';
  }
  if ( ! empty( $typography['letterSpacing'] ) ) {
    $heading_styles .= 'letter-spacing: ' . esc_attr( $typography['letterSpacing'] ) . ';';
  }
  if ( ! empty( $typography['textTransform'] ) ) {
    $heading_styles .= 'text-transform: ' . esc_attr( $typography['textTransform'] ) . ';';
  }
  if ( ! empty( $typography['textDecoration'] ) ) {
    $heading_styles .= 'text-decoration: ' . esc_attr( $typography['textDecoration'] ) . ';';
  }

  // Text shadow
  if ( ! empty( $text_shadow['horizontal'] ) || ! empty( $text_shadow['vertical'] ) || ! empty( $text_shadow['blur'] ) || ! empty( $text_shadow['color'] ) ) {
    $shadow_value = $text_shadow['horizontal'] . 'px ' . $text_shadow['vertical'] . 'px ' . $text_shadow['blur'] . 'px ' . $text_shadow['color'];
    $heading_styles .= 'text-shadow: ' . esc_attr( $shadow_value ) . ';';
  }

  // Gradient background
  if ( $gradient_heading && ! empty( $gradient_color_start ) && ! empty( $gradient_color_end ) ) {
    if ( $gradient_type === 'linear' ) {
      $gradient_css = 'linear-gradient(' . $gradient_direction . ', ' . $gradient_color_start . ', ' . $gradient_color_end . ')';
    } elseif ( $gradient_type === 'radial' ) {
      // For radial, use circle or ellipse
      $shape = strpos( $gradient_direction, 'circle' ) !== false ? 'circle' : 'ellipse';
      $gradient_css = 'radial-gradient(' . $shape . ' at center, ' . $gradient_color_start . ', ' . $gradient_color_end . ')';
    } else {
      $gradient_css = 'linear-gradient(to right, ' . $gradient_color_start . ', ' . $gradient_color_end . ')';
    }
    $heading_styles .= 'background-image: ' . esc_attr( $gradient_css ) . ';';
    $heading_styles .= '-webkit-background-clip: text;';
    $heading_styles .= 'background-clip: text;';
    $heading_styles .= '-webkit-text-fill-color: transparent;';
    $heading_styles .= 'color: transparent;';
  }

  // Rotation
  if ( $rotate_switch ) {
    $heading_styles .= 'writing-mode: vertical-rl;';
    $heading_styles .= 'transform: rotate(' . esc_attr( $text_rotate ) . 'deg);';
  }

	// Before line styles
	$before_styles = '';
	if ( ! empty( $before_line['width']['value'] ) ) {
		$before_styles .= 'width: ' . esc_attr( $before_line['width']['value'] ) . $before_line['width']['unit'] . ';';
		$before_styles .= 'min-width: ' . esc_attr( $before_line['width']['value'] ) . $before_line['width']['unit'] . ';';
	}
	if ( ! empty( $before_line['height']['value'] ) ) {
		$before_styles .= 'height: ' . esc_attr( $before_line['height']['value'] ) . $before_line['height']['unit'] . ';';
	}
	if ( ! empty( $before_line['color'] ) ) {
		$before_styles .= 'background: ' . esc_attr( $before_line['color'] ) . ';';
	}
	if ( ! empty( $before_line['align'] ) ) {
		$before_styles .= 'align-self: ' . esc_attr( $before_line['align'] ) . ';';
	}

	// After line styles
	$after_styles = '';
	if ( ! empty( $after_line['width']['value'] ) ) {
		$after_styles .= 'width: ' . esc_attr( $after_line['width']['value'] ) . $after_line['width']['unit'] . ';';
		$after_styles .= 'min-width: ' . esc_attr( $after_line['width']['value'] ) . $after_line['width']['unit'] . ';';
	}
	if ( ! empty( $after_line['height']['value'] ) ) {
		$after_styles .= 'height: ' . esc_attr( $after_line['height']['value'] ) . $after_line['height']['unit'] . ';';
	}
	if ( ! empty( $after_line['color'] ) ) {
		$after_styles .= 'background: ' . esc_attr( $after_line['color'] ) . ';';
	}
	if ( ! empty( $after_line['align'] ) ) {
		$after_styles .= 'align-self: ' . esc_attr( $after_line['align'] ) . ';';
	}

	// Build HTML
	$heading_content = esc_html( $heading_text );

	// Link
	if ( ! empty( $link['url'] ) ) {
		$link_attrs = 'href="' . esc_url( $link['url'] ) . '"';
		if ( ! empty( $link['isExternal'] ) ) {
			$link_attrs .= ' target="_blank"';
		}
		if ( ! empty( $link['nofollow'] ) ) {
			$link_attrs .= ' rel="nofollow"';
		}
		$heading_content = '<a ' . $link_attrs . '>' . $heading_content . '</a>';
	}

  // Build the complete HTML
  $output = '<div class="wbcom-heading-wrapper" style="' . esc_attr( $wrapper_styles ) . '">';
  $output .= '<' . esc_attr( $html_tag ) . ' class="' . esc_attr( $classes ) . '" style="' . esc_attr( $heading_styles ) . '">';

  if ( ! empty( $before_styles ) ) {
    $output .= '<span class="wbcom-heading-before" style="' . esc_attr( $before_styles ) . '"></span>';
  }

  $output .= '<span class="wbcom-heading-text">' . $heading_content . '</span>';

  if ( ! empty( $after_styles ) ) {
    $output .= '<span class="wbcom-heading-after" style="' . esc_attr( $after_styles ) . '"></span>';
  }

  $output .= '</' . esc_attr( $html_tag ) . '>';
  $output .= '</div>';

  return $output;
}