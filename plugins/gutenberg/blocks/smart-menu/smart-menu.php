<?php
/**
 * Smart Menu Block
 *
 * @package WBCOM_Essential
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Get all available menus.
 *
 * @return array Array of menu options with label and value.
 */
function wbcom_essential_smart_menu_get_menus() {
	$menus        = wp_get_nav_menus();
	$menu_options = array();

	if ( ! empty( $menus ) ) {
		foreach ( $menus as $menu ) {
			$menu_options[] = array(
				'label' => $menu->name,
				'value' => $menu->term_id,
			);
		}
	}

	return $menu_options;
}

/**
 * Get SVG icon for dropdown.
 *
 * @param string $icon Icon name.
 * @return string SVG markup.
 */
function wbcom_essential_smart_menu_get_icon_svg( $icon ) {
	$icons = array(
		'chevron-down'   => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
		'caret-down'     => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L2 4h8z"/></svg>',
		'plus'           => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
		'arrow-down'     => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
		'caret'          => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>',
		'caret-square'   => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 8l5 5 5-5H7z"/></svg>',
		'chevron'        => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
		'chevron-circle' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13.5L7.5 11l1.42-1.41L12 12.67l3.08-3.08L16.5 11 12 15.5z"/></svg>',
		'plus'           => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>',
		'plus-circle'    => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>',
	);

	return isset( $icons[ $icon ] ) ? $icons[ $icon ] : $icons['chevron'];
}

/**
 * Custom Walker for Smart Menu.
 */
if ( ! class_exists( 'WBCOM_Essential_Smart_Menu_Walker' ) ) {
	/**
	 * Smart Menu Walker class.
	 */
	class WBCOM_Essential_Smart_Menu_Walker extends Walker_Nav_Menu {
		/**
		 * Icon SVG markup.
		 *
		 * @var string
		 */
		private $icon_svg;

		/**
		 * Constructor.
		 *
		 * @param string $icon_svg Icon SVG markup.
		 */
		public function __construct( $icon_svg = '' ) {
			$this->icon_svg = $icon_svg;
		}

		/**
		 * Start element output.
		 *
		 * @param string   $output Used to append additional content (passed by reference).
		 * @param WP_Post  $item   Menu item data object.
		 * @param int      $depth  Depth of menu item.
		 * @param stdClass $args   An object of wp_nav_menu() arguments.
		 * @param int      $id     Current item ID.
		 */
		public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
			$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

			$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = 'menu-item-' . $item->ID;

			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

			$menu_id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
			$menu_id = $menu_id ? ' id="' . esc_attr( $menu_id ) . '"' : '';

			$output .= $indent . '<li' . $menu_id . $class_names . '>';

			$atts           = array();
			$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
			$atts['target'] = ! empty( $item->target ) ? $item->target : '';
			$atts['rel']    = ! empty( $item->xfn ) ? $item->xfn : '';
			$atts['href']   = ! empty( $item->url ) ? $item->url : '';

			$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}

			$title = apply_filters( 'the_title', $item->title, $item->ID );
			$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

			$item_output  = $args->before;
			$item_output .= '<a' . $attributes . '>';
			$item_output .= $args->link_before . $title . $args->link_after;

			// Add dropdown icon if item has children.
			if ( in_array( 'menu-item-has-children', $classes, true ) ) {
				$item_output .= '<span class="dropdown-icon">' . $this->icon_svg . '</span>';
			}

			$item_output .= '</a>';
			$item_output .= $args->after;

			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
}

/**
 * Registers the block using the metadata loaded from block.json.
 */
function wbcom_essential_smart_menu_block_init() {
	$build_path = WBCOM_ESSENTIAL_PATH . 'build/blocks/smart-menu/';
	if ( file_exists( $build_path . 'block.json' ) ) {
		register_block_type( $build_path );
	}
}
add_action( 'init', 'wbcom_essential_smart_menu_block_init' );
