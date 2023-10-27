<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

/**
 * [wbcom_is_woocommerce]
 *
 * @return [boolean]
 */
function wbcom_is_woocommerce() {
	return class_exists( 'WooCommerce' );
}

/**
 *  Taxonomy List
 *
 * @return array
 */
function wbcom_taxonomy_list( $taxonomy = 'product_cat', $option_value = 'slug' ) {
	$terms   = get_terms(
		array(
			'taxonomy'   => $taxonomy,
			'hide_empty' => true,
		)
	);
	$options = array();
	if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
		foreach ( $terms as $term ) {
			$options[ $term->$option_value ] = $term->name;
		}
	}
	return $options;
}

/**
 * Get Post List
 * return array
 */
function wbcom_post_name( $post_type = 'post', $args = array() ) {
	$options      = array();
	$options['0'] = __( 'Select', 'wbcom-essential' );
	$perpage      = ! empty( $args['limit'] ) ? $args['limit'] : wbcom_get_option( 'loadproductlimit', 'wbcom_others_tabs', '20' );
	$all_post     = array(
		'posts_per_page' => $perpage,
		'post_type'      => $post_type,
	);
	$post_terms   = get_posts( $all_post );
	if ( ! empty( $post_terms ) && ! is_wp_error( $post_terms ) ) {
		foreach ( $post_terms as $term ) {
			$options[ $term->ID ] = $term->post_title;
		}
		return $options;
	}
}

/**
 * Plugisn Options value
 * return on/off
 */
function wbcom_get_option( $option, $section, $default = '' ) {
	$options = get_option( $section );
	if ( isset( $options[ $option ] ) ) {
		return $options[ $option ];
	}

	return $default;
}

/**
 * HTML Tag list
 * return array
 */
function wbcom_html_tag_lists() {
	$html_tag_list = array(
		'h1'   => __( 'H1', 'wbcom-essential' ),
		'h2'   => __( 'H2', 'wbcom-essential' ),
		'h3'   => __( 'H3', 'wbcom-essential' ),
		'h4'   => __( 'H4', 'wbcom-essential' ),
		'h5'   => __( 'H5', 'wbcom-essential' ),
		'h6'   => __( 'H6', 'wbcom-essential' ),
		'p'    => __( 'p', 'wbcom-essential' ),
		'div'  => __( 'div', 'wbcom-essential' ),
		'span' => __( 'span', 'wbcom-essential' ),
	);
	return $html_tag_list;
}

/*
 * HTML Tag Validation
 * return strig
 */
function wbcom_validate_html_tag( $tag ) {
	$allowed_html_tags = array(
		'article',
		'aside',
		'footer',
		'header',
		'section',
		'nav',
		'main',
		'div',
		'h1',
		'h2',
		'h3',
		'h4',
		'h5',
		'h6',
		'p',
		'span',
	);
	return in_array( strtolower( $tag ), $allowed_html_tags ) ? $tag : 'div';
}

/* Custom product badge */
function wbcom_custom_product_badge( $show = 'yes' ) {
	global $product;
	$custom_saleflash_text = get_post_meta( get_the_ID(), '_saleflash_text', true );
	if ( $show == 'yes' ) {
		if ( ! empty( $custom_saleflash_text ) && $product->is_in_stock() ) {
			if ( $product->is_featured() ) {
				echo '<span class="wb-product-label wb-product-label-left hot">' . esc_html( $custom_saleflash_text ) . '</span>';
			} else {
				echo '<span class="wb-product-label wb-product-label-left">' . esc_html( $custom_saleflash_text ) . '</span>';
			}
		}
	}
}

/**
 * [wbcom_product_query]
 *
 * @param  array $query_args
 * @return [array] Generate query
 */
function wbcom_product_query( $query_args = array() ) {

	$meta_query = $tax_query = array();

	$per_page = ! empty( $query_args['per_page'] ) ? $query_args['per_page'] : 3;

	// Tex Query
	//
	// Categories wise
	if ( isset( $query_args['categories'] ) ) {
		$field_name  = 'slug';
		$tax_query[] = array(
			'taxonomy'         => 'product_cat',
			'terms'            => $query_args['categories'],
			'field'            => $field_name,
			'include_children' => false,
		);
	}

	// Tag wise
	if ( isset( $query_args['tags'] ) ) {
		$field_name  = 'slug';
		$tax_query[] = array(
			'taxonomy'         => 'product_tag',
			'terms'            => $query_args['tags'],
			'field'            => $field_name,
			'include_children' => false,
		);
	}

	// Feature Product
	if ( $query_args['product_type'] == 'featured' ) {
		$tax_query[] = array(
			'taxonomy' => 'product_visibility',
			'field'    => 'name',
			'terms'    => 'featured',
			'operator' => 'IN',
		);
	}

	// Hide Hidden Item
	if ( isset( $query_args['hidden'] ) && $query_args['hidden'] === true ) {
		$tax_query[] = array(
			'taxonomy'         => 'product_visibility',
			'field'            => 'name',
			'terms'            => array( 'exclude-from-search', 'exclude-from-catalog' ),
			'operator'         => 'NOT IN',
			'include_children' => false,
		);
	}

	// Meta Query
	/**
	 * [$hide_out_of_stock] Check ( WooCommerce > Settings > Products > Inventory )
	 */
	$hide_out_of_stock = ( isset( $query_args['hide_out_of_stock'] ) && $query_args['hide_out_of_stock'] === true ) ? 'yes' : get_option( 'woocommerce_hide_out_of_stock_items', 'no' );
	if ( 'yes' === $hide_out_of_stock ) {
		$meta_query[] = array(
			'key'     => '_stock_status',
			'value'   => 'instock',
			'compare' => '==',
		);
	}

	$args = array(
		'post_type'           => 'product',
		'post_status'         => 'publish',
		'ignore_sticky_posts' => 1,
		'posts_per_page'      => $per_page,
		'meta_query'          => $meta_query,
		'tax_query'           => $tax_query,
	);

	// Product Type Check
	switch ( $query_args['product_type'] ) {

		case 'sale':
			$args['post__in'] = array_merge( array( 0 ), wc_get_product_ids_on_sale() );
			break;

		case 'best_selling':
			$args['meta_key'] = 'total_sales';
			$args['orderby']  = 'meta_value_num';
			$args['order']    = 'desc';
			break;

		case 'top_rated':
			$args['meta_key'] = '_wc_average_rating';
			$args['orderby']  = 'meta_value_num';
			$args['order']    = 'desc';
			break;

		case 'mixed_order':
			$args['orderby'] = 'rand';
			break;

		case 'show_byid':
			$args['post__in'] = $query_args['product_ids'];
			$args['orderby']  = $query_args['product_ids'];
			break;

		case 'show_byid_manually':
			$args['post__in'] = $query_args['product_ids'];
			$args['orderby']  = $query_args['product_ids'];
			break;

		default: /* Recent */
			$args['orderby'] = 'date';
			$args['order']   = 'desc';
			break;

	}

	/**
	 * Custom Order
	 */
	if ( isset( $query_args['custom_order'] ) ) {
		$args['orderby'] = $query_args['custom_order']['orderby'];
		$args['order']   = $query_args['custom_order']['order'];
	}

	return $args;
}

/* Sale badge */
function wbcom_sale_flash( $offertype = 'default', $echo = true, $outofstocktxt = '' ) {
	global $product;
	if ( $echo == false ) {
		ob_start(); }
	if ( $product->is_on_sale() && $product->is_in_stock() ) {
		if ( $offertype != 'default' && $product->get_regular_price() > 0 ) {
			$_off_percent  = ( 1 - round( $product->get_price() / $product->get_regular_price(), 2 ) ) * 100;
			$_off_price    = round( $product->get_regular_price() - $product->get_price(), 0 );
			$_price_symbol = get_woocommerce_currency_symbol();
			$symbol_pos    = get_option( 'woocommerce_currency_pos', 'left' );
			$price_display = '';
			switch ( $symbol_pos ) {
				case 'left':
					$price_display = '-' . $_price_symbol . $_off_price;
					break;
				case 'right':
					$price_display = '-' . $_off_price . $_price_symbol;
					break;
				case 'left_space':
					$price_display = '-' . $_price_symbol . ' ' . $_off_price;
					break;
				default: /* right_space */
					$price_display = '-' . $_off_price . ' ' . $_price_symbol;
					break;
			}
			if ( $offertype == 'number' ) {
				echo '<span class="wb-product-label wb-product-label-right">' . $price_display . '</span>';
			} elseif ( $offertype == 'percent' ) {
				echo '<span class="wb-product-label wb-product-label-right">' . $_off_percent . '%</span>';
			} else {
				echo ' '; }
		} else {
			$sale_badge_text = apply_filters( 'wbcom_sale_badge_text', __( 'Sale!', 'wbcom-essential' ) );
			echo '<span class="wb-product-label wb-product-label-right">' . esc_html( $sale_badge_text ) . '</span>';
		}
	} else {
		$out_of_stock      = get_post_meta( get_the_ID(), '_stock_status', true );
		$out_of_stock_text = ! empty( $outofstocktxt ) ? esc_html( $outofstocktxt ) : apply_filters( 'wbcom_shop_out_of_stock_text', __( 'Out of stock', 'wbcom-essential' ) );
		if ( 'outofstock' === $out_of_stock ) {
			echo '<span class="wb-stockout wb-product-label wb-product-label-right">' . esc_html( $out_of_stock_text ) . '</span>';
		}
	}
	if ( $echo == false ) {
		return ob_get_clean(); }
}

/*
* Category list
* return first one
*/
function wbcom_get_product_category_list( $id = null, $taxonomy = 'product_cat', $limit = 1 ) {
	$terms = get_the_terms( $id, $taxonomy );
	$i     = 0;
	if ( is_wp_error( $terms ) ) {
		return $terms;
	}

	if ( empty( $terms ) ) {
		return false;
	}

	foreach ( $terms as $term ) {
		++$i;
		$link = get_term_link( $term, $taxonomy );
		if ( is_wp_error( $link ) ) {
			return $link;
		}
		echo '<a href="' . esc_url( $link ) . '">' . $term->name . '</a>';
		if ( $i == $limit ) {
			break;
		} else {
			continue; }
	}
}

// Customize rating html
if ( ! function_exists( 'wbcom_wc_get_rating_html' ) ) {
	function wbcom_wc_get_rating_html( $block = '' ) {
		if ( get_option( 'woocommerce_enable_review_rating' ) === 'no' ) {
			return; }
		global $product;
		$rating_count    = $product->get_rating_count();
		$average         = $product->get_average_rating();
		$rating_whole    = floor( $average );
		$rating_fraction = $average - $rating_whole;
		$flug            = 0;

		$icon_svg    = get_option( 'elementor_experiment-e_font_icon_svg', 'default' );
		$icon_prefix = ( $icon_svg == 'active' || $block == 'yes' ) ? 'fa' : 'fas';

		if ( $rating_count > 0 ) {
			$wrapper_class = is_single() ? 'rating-number' : 'top-rated-rating';
			ob_start();
			?>
			<div class="<?php echo esc_attr( $wrapper_class ); ?>">
				<span class="wb-product-ratting">
					<span class="wb-product-user-ratting">
						<?php
						for ( $i = 1; $i <= 5; $i++ ) {
							if ( $i <= $rating_whole ) {
								echo '<i class="' . $icon_prefix . ' fa-star"></i>';
							} elseif ( $rating_fraction > 0 && $flug == 0 ) {
								if ( $icon_svg == 'active' || $block == 'yes' ) {
									echo '<i class="fa fa-star-half-o"></i>';
								} else {
									echo '<i class="fas fa-star-half-alt"></i>';
								}
									$flug = 1;
							} elseif ( $icon_svg == 'active' || $block == 'yes' ) {
									echo '<i class="fa fa-star-o"></i>';
							} else {
								echo '<i class="far fa-star empty"></i>';
							}
						}
						?>
					</span>
				</span>
			</div>
			<?php
				$html = ob_get_clean();
		} else {
			$html = '';
		}

			return $html;
	}
}
