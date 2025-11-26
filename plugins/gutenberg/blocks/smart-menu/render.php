<?php
/**
 * Render callback for the Smart Menu block.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_smart_menu_block( $attributes ) {
	// Handle backward compatibility with old attribute names
	$menu_id = isset( $attributes['menuId'] ) ? absint( $attributes['menuId'] ) : ( isset( $attributes['menu'] ) ? absint( $attributes['menu'] ) : 0 );

	if ( ! $menu_id ) {
		return '<div class="smart-menu-placeholder"><p>' . esc_html__( 'Please select a menu.', 'wbcom-essential' ) . '</p></div>';
	}

	$menu_layout = isset( $attributes['menuLayout'] ) ? $attributes['menuLayout'] : 'horizontal';
	$menu_align = isset( $attributes['menuAlign'] ) ? $attributes['menuAlign'] : ( isset( $attributes['menuHAlign'] ) ? $attributes['menuHAlign'] : 'flex-start' );

	// Handle verticalMenuWidth - could be string or object
	$vertical_width = isset( $attributes['verticalMenuWidth'] ) ? $attributes['verticalMenuWidth'] : '100%';
	if ( is_array( $vertical_width ) && isset( $vertical_width['size'] ) ) {
		$vertical_width = $vertical_width['size'] . ( isset( $vertical_width['unit'] ) ? $vertical_width['unit'] : '%' );
	}

	$show_toggle = isset( $attributes['showMobileToggle'] ) ? $attributes['showMobileToggle'] : ( isset( $attributes['menuToggle'] ) ? $attributes['menuToggle'] : true );
	$toggle_text = isset( $attributes['mobileToggleText'] ) ? $attributes['mobileToggleText'] : ( isset( $attributes['menuToggleText'] ) ? $attributes['menuToggleText'] : 'MENU' );
	$toggle_align = isset( $attributes['mobileToggleAlign'] ) ? $attributes['mobileToggleAlign'] : ( isset( $attributes['menuToggleTextHAlign'] ) ? $attributes['menuToggleTextHAlign'] : 'flex-start' );
	$dropdown_icon = isset( $attributes['dropdownIcon'] ) ? $attributes['dropdownIcon'] : 'chevron-down';
	$breakpoint = isset( $attributes['mobileBreakpoint'] ) ? $attributes['mobileBreakpoint'] : ( isset( $attributes['menuBreakpoint'] ) ? $attributes['menuBreakpoint'] : 1024 );

	// Styling attributes
	$main_menu_bg = isset( $attributes['mainMenuBackground'] ) ? $attributes['mainMenuBackground'] : array();
	$main_menu_transition = isset( $attributes['mainMenuTransitionDuration'] ) ? $attributes['mainMenuTransitionDuration'] : 0.2;
	$main_menu_icon = isset( $attributes['mainMenuIcon'] ) ? $attributes['mainMenuIcon'] : 'caret';
	$main_menu_icon_size = isset( $attributes['mainMenuIconSize'] ) ? $attributes['mainMenuIconSize'] : 14;
	$main_menu_item_color = isset( $attributes['mainMenuItemColor'] ) ? $attributes['mainMenuItemColor'] : '';
	$main_menu_item_bg = isset( $attributes['mainMenuItemBg'] ) ? $attributes['mainMenuItemBg'] : '';
	$main_menu_item_color_hover = isset( $attributes['mainMenuItemColorHover'] ) ? $attributes['mainMenuItemColorHover'] : '';
	$main_menu_item_bg_hover = isset( $attributes['mainMenuItemBgHover'] ) ? $attributes['mainMenuItemBgHover'] : '';
	$main_menu_item_color_active = isset( $attributes['mainMenuItemColorActive'] ) ? $attributes['mainMenuItemColorActive'] : '';
	$main_menu_item_bg_active = isset( $attributes['mainMenuItemBgActive'] ) ? $attributes['mainMenuItemBgActive'] : '';


	$sub_menu_bg = isset( $attributes['subMenuBg'] ) ? $attributes['subMenuBg'] : '';
	$sub_menu_item_color = isset( $attributes['subMenuItemColor'] ) ? $attributes['subMenuItemColor'] : '';
	$sub_menu_item_bg = isset( $attributes['subMenuItemBg'] ) ? $attributes['subMenuItemBg'] : '';
	$sub_menu_item_color_hover = isset( $attributes['subMenuItemColorHover'] ) ? $attributes['subMenuItemColorHover'] : '';
	$sub_menu_item_bg_hover = isset( $attributes['subMenuItemBgHover'] ) ? $attributes['subMenuItemBgHover'] : '';
	$sub_menu_item_color_active = isset( $attributes['subMenuItemColorActive'] ) ? $attributes['subMenuItemColorActive'] : '';
	$sub_menu_item_bg_active = isset( $attributes['subMenuItemBgActive'] ) ? $attributes['subMenuItemBgActive'] : '';
	$mobile_menu_color = isset( $attributes['mobileMenuColor'] ) ? $attributes['mobileMenuColor'] : '';
	$mobile_menu_bg = isset( $attributes['mobileMenuBackground'] ) ? $attributes['mobileMenuBackground'] : array();
	$mobile_menu_width = isset( $attributes['mobileMenuWidth'] ) ? $attributes['mobileMenuWidth'] : array();

$container_classes = array(
	'smart-menu-container'
);

$menu_classes = array(
	'smart-menu',
	$menu_layout,
	'icon-' . $main_menu_icon
);

// Add alignment class to menu classes
if ( $menu_layout !== 'horizontal-justified' && $menu_align ) {
	$menu_classes[] = 'align-' . str_replace( '-', '', $menu_align );
}

	$container_style = '';
	if ( $menu_layout === 'vertical' ) {
		$container_style = ' width: ' . esc_attr( $vertical_width ) . ';';
	}

	// Add main menu background
	if ( ! empty( $main_menu_bg['color'] ) ) {
		$container_style .= ' background-color: ' . esc_attr( $main_menu_bg['color'] ) . ';';
	}

	// Add transition duration
	$container_style .= ' --transition-duration: ' . esc_attr( $main_menu_transition ) . 's;';

$toggle_container_style = 'justify-content: ' . esc_attr( $toggle_align ) . ';';

	// Mobile toggle styles
	$toggle_style = '';
	if ( ! empty( $mobile_menu_color ) ) {
		$toggle_style .= ' color: ' . esc_attr( $mobile_menu_color ) . ';';
	}
	if ( ! empty( $mobile_menu_bg['color'] ) ) {
		$toggle_style .= ' background-color: ' . esc_attr( $mobile_menu_bg['color'] ) . ';';
	}
	if ( ! empty( $mobile_menu_width['size'] ) ) {
		$toggle_style .= ' width: ' . esc_attr( $mobile_menu_width['size'] ) . ( isset( $mobile_menu_width['unit'] ) ? $mobile_menu_width['unit'] : 'px' ) . ';';
	}

	// Get SVG icon for dropdown
	$icon_svg = wbcom_essential_smart_menu_get_icon_svg( $dropdown_icon );

	ob_start();
	?>
	<div class="wp-block-wbcom-essential-smart-menu">
		<div class="<?php echo esc_attr( implode( ' ', $container_classes ) ); ?>"
			data-breakpoint="<?php echo esc_attr( $breakpoint ); ?>"
			data-mtoggle="<?php echo esc_attr( $show_toggle ? 'yes' : '' ); ?>"
			style="<?php echo esc_attr( $container_style ); ?>">

			<?php if ( $show_toggle ) : ?>
				<div class="smart-menu-toggle-container" style="<?php echo esc_attr( $toggle_container_style ); ?>">
					<button class="smart-menu-toggle" aria-label="<?php esc_attr_e( 'Toggle menu', 'wbcom-essential' ); ?>" style="<?php echo esc_attr( $toggle_style ); ?>">
						<span class="icon">
							<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
								<path d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z"/>
							</svg>
						</span>
						<span class="text"><?php echo esc_html( $toggle_text ); ?></span>
					</button>
				</div>
			<?php endif; ?>

			<nav class="smart-menu-nav">
				<ul class="<?php echo esc_attr( implode( ' ', $menu_classes ) ); ?>" style="--icon-size: <?php echo esc_attr( $main_menu_icon_size ); ?>px; --item-color: <?php echo esc_attr( $main_menu_item_color ); ?>; --item-bg: <?php echo esc_attr( $main_menu_item_bg ); ?>; --item-color-hover: <?php echo esc_attr( $main_menu_item_color_hover ); ?>; --item-bg-hover: <?php echo esc_attr( $main_menu_item_bg_hover ); ?>; --item-color-active: <?php echo esc_attr( $main_menu_item_color_active ); ?>; --item-bg-active: <?php echo esc_attr( $main_menu_item_bg_active ); ?>; --sub-bg: <?php echo esc_attr( $sub_menu_bg ); ?>; --sub-item-color: <?php echo esc_attr( $sub_menu_item_color ); ?>; --sub-item-bg: <?php echo esc_attr( $sub_menu_item_bg ); ?>; --sub-item-color-hover: <?php echo esc_attr( $sub_menu_item_color_hover ); ?>; --sub-item-bg-hover: <?php echo esc_attr( $sub_menu_item_bg_hover ); ?>; --sub-item-color-active: <?php echo esc_attr( $sub_menu_item_color_active ); ?>; --sub-item-bg-active: <?php echo esc_attr( $sub_menu_item_bg_active ); ?>;">
					<?php
					wp_nav_menu( array(
						'menu' => $menu_id,
						'menu_class' => '',
						'container' => false,
						'walker' => new WBCOM_Essential_Smart_Menu_Walker( $icon_svg ),
						'items_wrap' => '%3$s',
					) );
					?>
				</ul>
			</nav>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Get SVG icon for dropdown
 */
if ( ! function_exists( 'wbcom_essential_smart_menu_get_icon_svg' ) ) {
	function wbcom_essential_smart_menu_get_icon_svg( $icon ) {
		$icons = array(
			'chevron-down' => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
			'caret-down' => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 8L2 4h8z"/></svg>',
			'plus' => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2v8M2 6h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
			'arrow-down' => '<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M6 2v8m0 0l-3-3m3 3l3-3" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
		);

		return isset( $icons[ $icon ] ) ? $icons[ $icon ] : $icons['chevron-down'];
	}
}

/**
 * Custom Walker for Smart Menu
 */
if ( ! class_exists( 'WBCOM_Essential_Smart_Menu_Walker' ) ) {
	class WBCOM_Essential_Smart_Menu_Walker extends Walker_Nav_Menu {
		private $icon_svg;

		public function __construct( $icon_svg = '' ) {
			$this->icon_svg = $icon_svg;
		}

		public function start_el( &$output, $item, $depth = 0, $args = null, $id = 0 ) {
			$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';

			$classes = empty( $item->classes ) ? array() : (array) $item->classes;
			$classes[] = 'menu-item-' . $item->ID;

			$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item, $args, $depth ) );
			$class_names = $class_names ? ' class="' . esc_attr( $class_names ) . '"' : '';

			$id = apply_filters( 'nav_menu_item_id', 'menu-item-'. $item->ID, $item, $args, $depth );
			$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

			$output .= $indent . '<li' . $id . $class_names .'>';

			$atts = array();
			$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
			$atts['target'] = ! empty( $item->target )     ? $item->target     : '';
			$atts['rel']    = ! empty( $item->xfn )        ? $item->xfn        : '';
			$atts['href']   = ! empty( $item->url )        ? $item->url        : '';

			$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

			$attributes = '';
			foreach ( $atts as $attr => $value ) {
				if ( ! empty( $value ) ) {
					$value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
					$attributes .= ' ' . $attr . '="' . $value . '"';
				}
			}

			$title = apply_filters( 'the_title', $item->title, $item->ID );
			$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

			$item_output = $args->before;
			$item_output .= '<a'. $attributes .'>';
			$item_output .= $args->link_before . $title . $args->link_after;

			// Add dropdown icon if item has children
			if ( in_array( 'menu-item-has-children', $classes ) ) {
				$item_output .= '<span class="dropdown-icon">' . $this->icon_svg . '</span>';
			}

			$item_output .= '</a>';
			$item_output .= $args->after;

			$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		}
	}
}