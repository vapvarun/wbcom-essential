<?php
/**
 * EDD Product Catalog REST API Endpoints.
 *
 * Registers REST routes that power the Product Catalog block.
 * Only active when Easy Digital Downloads is installed and active.
 *
 * Routes:
 *   GET /wbcom/v1/products
 *   GET /wbcom/v1/product-categories
 *
 * @package WBCOM_Essential
 * @since   4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Register REST API routes for the product catalog block.
 *
 * Skips registration entirely when EDD is not active to avoid
 * orphaned endpoints.
 */
function wbcom_essential_product_catalog_register_routes() {
	if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
		return;
	}

	register_rest_route(
		'wbcom/v1',
		'/products',
		array(
			'methods'             => 'GET',
			'callback'            => 'wbcom_essential_product_catalog_get_products',
			'permission_callback' => 'wbcom_essential_product_catalog_public_permission',
			'args'                => array(
				'category'    => array(
					'type'              => 'integer',
					'default'           => 0,
					'sanitize_callback' => 'absint',
				),
				'search'      => array(
					'type'              => 'string',
					'default'           => '',
					'sanitize_callback' => 'sanitize_text_field',
				),
				'orderby'     => array(
					'type'    => 'string',
					'default' => 'title',
					'enum'    => array( 'title', 'date', 'price', 'popular' ),
				),
				'order'       => array(
					'type'    => 'string',
					'default' => 'ASC',
					'enum'    => array( 'ASC', 'DESC' ),
				),
				'per_page'    => array(
					'type'              => 'integer',
					'default'           => 12,
					'sanitize_callback' => 'absint',
				),
				'page'        => array(
					'type'              => 'integer',
					'default'           => 1,
					'sanitize_callback' => 'absint',
				),
				'price_range' => array(
					'type'    => 'string',
					'default' => 'all',
					'enum'    => array( 'all', 'free', 'under25', '25to99', '100plus' ),
				),
			),
		)
	);

	register_rest_route(
		'wbcom/v1',
		'/product-categories',
		array(
			'methods'             => 'GET',
			'callback'            => 'wbcom_essential_product_catalog_get_categories',
			'permission_callback' => 'wbcom_essential_product_catalog_public_permission',
		)
	);
}
add_action( 'rest_api_init', 'wbcom_essential_product_catalog_register_routes' );

/**
 * Permission callback for public product catalog endpoints.
 *
 * Returns true by default so the public storefront block can fetch the
 * same published products a guest sees in the EDD archive. Site owners
 * that need to restrict access can hook the filter below.
 *
 * @return bool|WP_Error
 */
function wbcom_essential_product_catalog_public_permission() {
	return apply_filters( 'wbcom_essential_product_catalog_public_permission', true );
}

/**
 * GET /wbcom/v1/products
 *
 * Returns EDD products with filters for category, search, price, and sort.
 *
 * @param WP_REST_Request $request Request object.
 * @return WP_REST_Response
 */
function wbcom_essential_product_catalog_get_products( $request ) {
	$result = wbcom_essential_product_catalog_query(
		array(
			'per_page'    => $request['per_page'],
			'page'        => $request['page'],
			'order'       => $request['order'],
			'orderby'     => $request['orderby'],
			'category'    => $request['category'],
			'search'      => $request['search'],
			'price_range' => $request['price_range'],
		)
	);

	return new WP_REST_Response( $result, 200 );
}

/**
 * Query EDD products for the catalog.
 *
 * Shared by the REST route and by the block's server-side render, so the
 * markup a crawler sees and the JSON the browser fetches can never describe
 * different product sets. Anything that changes filtering or ordering belongs
 * here, not in either caller.
 *
 * @since 4.7.0
 *
 * @param array $params {
 *     Query parameters. All optional.
 *
 *     @type int    $per_page    Products per page. Clamped to 1-48.
 *     @type int    $page        Page number, 1-based.
 *     @type string $order       ASC or DESC.
 *     @type string $orderby     title, date, price or popular.
 *     @type int    $category    download_category term ID, 0 for all.
 *     @type string $search      Search term.
 *     @type string $price_range all, free, under25, 25to99 or 100plus.
 * }
 * @return array {
 *     @type array $products    Formatted product arrays.
 *     @type int   $total       Total matching products.
 *     @type int   $total_pages Total pages.
 *     @type int   $page        Current page.
 * }
 */
function wbcom_essential_product_catalog_query( $params = array() ) {
	$request = wp_parse_args(
		$params,
		array(
			'per_page'    => 12,
			'page'        => 1,
			'order'       => 'ASC',
			'orderby'     => 'title',
			'category'    => 0,
			'search'      => '',
			'price_range' => 'all',
		)
	);

	$args = array(
		'post_type'      => 'download',
		'post_status'    => 'publish',
		'posts_per_page' => max( 1, min( (int) $request['per_page'], 48 ) ),
		'paged'          => max( 1, (int) $request['page'] ),
		'order'          => $request['order'],
	);

	// Category filter.
	if ( $request['category'] ) {
		$args['tax_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			array(
				'taxonomy' => 'download_category',
				'field'    => 'term_id',
				'terms'    => $request['category'],
			),
		);
	}

	// Search filter.
	if ( $request['search'] ) {
		$args['s'] = $request['search'];
	}

	// Sort — use named meta_query clauses to avoid JOIN conflicts with price filter.
	switch ( $request['orderby'] ) {
		case 'price':
			$args['meta_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				'price_clause' => array(
					'key'  => 'edd_price',
					'type' => 'NUMERIC',
				),
			);
			$args['orderby']    = array( 'price_clause' => $request['order'] );
			break;
		case 'popular':
			$args['meta_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				'sales_clause' => array(
					'key'  => '_edd_download_sales',
					'type' => 'NUMERIC',
				),
			);
			$args['orderby']    = array( 'sales_clause' => 'DESC' );
			$args['order']      = 'DESC';
			break;
		default:
			$args['orderby'] = ( 'date' === $request['orderby'] ) ? 'date' : 'title';
	}

	// Price range filter via meta_query.
	$price_range = $request['price_range'];
	if ( 'all' !== $price_range ) {
		$price_query = array( 'relation' => 'AND' );
		switch ( $price_range ) {
			case 'free':
				// Free products may have edd_price=0, empty string, or no meta at all.
				$price_query = array(
					'relation' => 'OR',
					array(
						'key'     => 'edd_price',
						'value'   => 0,
						'compare' => '=',
						'type'    => 'NUMERIC',
					),
					array(
						'key'     => 'edd_price',
						'value'   => '',
						'compare' => '=',
					),
					array(
						'key'     => 'edd_price',
						'compare' => 'NOT EXISTS',
					),
				);
				break;
			case 'under25':
				$price_query[] = array(
					'key'     => 'edd_price',
					'value'   => 25,
					'compare' => '<',
					'type'    => 'NUMERIC',
				);
				$price_query[] = array(
					'key'     => 'edd_price',
					'value'   => 0,
					'compare' => '>',
					'type'    => 'NUMERIC',
				);
				break;
			case '25to99':
				$price_query[] = array(
					'key'     => 'edd_price',
					'value'   => array( 25, 99 ),
					'compare' => 'BETWEEN',
					'type'    => 'NUMERIC',
				);
				break;
			case '100plus':
				$price_query[] = array(
					'key'     => 'edd_price',
					'value'   => 100,
					'compare' => '>=',
					'type'    => 'NUMERIC',
				);
				break;
		}
		if ( isset( $args['meta_query'] ) ) {
			$args['meta_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
				'relation' => 'AND',
				$args['meta_query'],
				$price_query,
			);
		} else {
			$args['meta_query'] = $price_query; // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
		}
	}

	$query    = new WP_Query( $args );
	$products = array();

	// Prime meta cache to avoid N+1 queries in the format loop.
	if ( ! empty( $query->posts ) ) {
		update_meta_cache( 'post', wp_list_pluck( $query->posts, 'ID' ) );
	}

	foreach ( $query->posts as $post ) {
		$products[] = wbcom_essential_product_catalog_format_product( $post );
	}

	return array(
		'products'    => $products,
		'total'       => (int) $query->found_posts,
		'total_pages' => (int) $query->max_num_pages,
		'page'        => (int) $request['page'],
	);
}

/**
 * Format a single download post for the API response.
 *
 * @param WP_Post $post Download post object.
 * @return array
 */
function wbcom_essential_product_catalog_format_product( $post ) {
	$price   = '';
	$is_free = false;

	if ( function_exists( 'edd_has_variable_prices' ) && edd_has_variable_prices( $post->ID ) ) {
		$prices  = edd_get_variable_prices( $post->ID );
		$amounts = wp_list_pluck( $prices, 'amount' );
		$amounts = array_filter( $amounts, 'is_numeric' );
		if ( ! empty( $amounts ) ) {
			$min   = min( $amounts );
			$max   = max( $amounts );
			$price = html_entity_decode( edd_currency_filter( edd_format_amount( $min ) ) . ' – ' . edd_currency_filter( edd_format_amount( $max ) ) );
		} else {
			// Variable pricing enabled but no tiers — fall back to base price.
			$amount = function_exists( 'edd_get_download_price' ) ? edd_get_download_price( $post->ID ) : 0;
			if ( (float) $amount > 0 ) {
				$price = html_entity_decode( edd_currency_filter( edd_format_amount( $amount ) ) );
			} else {
				$price   = 'Free';
				$is_free = true;
			}
		}
	} elseif ( function_exists( 'edd_get_download_price' ) ) {
		$amount = edd_get_download_price( $post->ID );
		if ( (float) $amount > 0 ) {
			$price = html_entity_decode( edd_currency_filter( edd_format_amount( $amount ) ) );
		} else {
			$price   = 'Free';
			$is_free = true;
		}
	}

	$excerpt = $post->post_excerpt;
	if ( empty( $excerpt ) ) {
		$excerpt = wp_trim_words( wp_strip_all_tags( $post->post_content ), 20, '...' );
	} else {
		$excerpt = wp_trim_words( $excerpt, 20, '...' );
	}

	$thumbnail_url = get_the_post_thumbnail_url( $post->ID, 'large' );

	return array(
		'id'      => $post->ID,
		'title'   => $post->post_title,
		'excerpt' => $excerpt,
		'url'     => get_permalink( $post->ID ),
		'image'   => $thumbnail_url ? $thumbnail_url : '',
		'price'   => $price,
		'is_free' => $is_free,
	);
}

/**
 * GET /wbcom/v1/product-categories
 *
 * Returns top-level EDD download categories with counts.
 *
 * @return array
 */
function wbcom_essential_product_catalog_get_categories() {
	$terms = get_terms(
		array(
			'taxonomy'   => 'download_category',
			'hide_empty' => true,
			'parent'     => 0,
			'orderby'    => 'name',
			'order'      => 'ASC',
		)
	);

	if ( is_wp_error( $terms ) ) {
		return array();
	}

	$categories = array();
	foreach ( $terms as $term ) {
		$categories[] = array(
			'id'    => $term->term_id,
			'name'  => $term->name,
			'slug'  => $term->slug,
			'count' => $term->count,
		);
	}

	return $categories;
}

/**
 * Render one catalog card as HTML.
 *
 * Mirrors buildCard() in the block's view.js element for element and class for
 * class. The server-rendered first page and anything the script draws later
 * must be indistinguishable, otherwise the layout shifts the moment the script
 * takes over. Change this and view.js together.
 *
 * @since 4.7.0
 *
 * @param array $product Formatted product from wbcom_essential_product_catalog_format_product().
 * @param array $i18n    Translated button labels: download_free, view_product.
 * @return string Card HTML.
 */
function wbcom_essential_product_catalog_render_card( $product, $i18n = array() ) {
	$is_free   = ! empty( $product['is_free'] );
	$price_cls = $is_free
		? 'wbcom-catalog__card-price wbcom-catalog__card-price--free'
		: 'wbcom-catalog__card-price';
	$btn_cls   = $is_free
		? 'wbcom-catalog__card-btn wbcom-catalog__card-btn--free'
		: 'wbcom-catalog__card-btn';
	$btn_label = $is_free
		? ( $i18n['download_free'] ?? __( 'Download Free', 'wbcom-essential' ) )
		: ( $i18n['view_product'] ?? __( 'View Product', 'wbcom-essential' ) );

	ob_start();
	?>
	<div class="wbcom-catalog__card">
		<a href="<?php echo esc_url( $product['url'] ); ?>" class="wbcom-catalog__card-image">
			<?php if ( ! empty( $product['image'] ) ) : ?>
				<img src="<?php echo esc_url( $product['image'] ); ?>" alt="<?php echo esc_attr( $product['title'] ); ?>" loading="lazy" />
			<?php else : ?>
				<div class="wbcom-catalog__card-noimage"></div>
			<?php endif; ?>
		</a>
		<div class="wbcom-catalog__card-body">
			<h3 class="wbcom-catalog__card-title">
				<a href="<?php echo esc_url( $product['url'] ); ?>"><?php echo esc_html( $product['title'] ); ?></a>
			</h3>
			<p class="wbcom-catalog__card-excerpt"><?php echo esc_html( $product['excerpt'] ); ?></p>
			<div class="<?php echo esc_attr( $price_cls ); ?>"><?php echo esc_html( $product['price'] ); ?></div>
			<a href="<?php echo esc_url( $product['url'] ); ?>" class="<?php echo esc_attr( $btn_cls ); ?>"><?php echo esc_html( $btn_label ); ?></a>
		</div>
	</div>
	<?php
	return ob_get_clean();
}

/**
 * Split a catalog sort value into orderby and order.
 *
 * The block stores one combined value ("price_asc"); the query wants the two
 * halves. Mirrors parseSortValue() in view.js so a server-rendered first page
 * is ordered exactly as the script would order it.
 *
 * @since 4.7.0
 *
 * @param string $value Sort value: title, date, price_asc, price_desc or popular.
 * @return array Two-element array of orderby and order.
 */
function wbcom_essential_product_catalog_parse_sort( $value ) {
	switch ( $value ) {
		case 'date':
			return array( 'date', 'DESC' );
		case 'price_asc':
			return array( 'price', 'ASC' );
		case 'price_desc':
			return array( 'price', 'DESC' );
		case 'popular':
			return array( 'popular', 'DESC' );
		default:
			return array( 'title', 'ASC' );
	}
}
