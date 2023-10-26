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
