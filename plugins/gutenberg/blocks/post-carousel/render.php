<?php
/**
 * Render callback for the Post Carousel block.
 *
 * @param array $attributes Block attributes.
 * @return string Rendered HTML.
 */
function wbcom_essential_render_post_carousel_block( $attributes ) {
	// Sanitize attributes
	$post_type = isset( $attributes['postType'] ) ? sanitize_text_field( $attributes['postType'] ) : 'post';
	$order = isset( $attributes['order'] ) ? sanitize_text_field( $attributes['order'] ) : 'DESC';
	$orderby = isset( $attributes['orderby'] ) ? sanitize_text_field( $attributes['orderby'] ) : 'post_date';
	$taxonomy = isset( $attributes['taxonomy'] ) ? $attributes['taxonomy'] : array();
	$tags = isset( $attributes['tags'] ) ? $attributes['tags'] : array();
	$authors = isset( $attributes['authors'] ) ? $attributes['authors'] : array();
	$max_posts = isset( $attributes['maxPosts'] ) ? intval( $attributes['maxPosts'] ) : 6;
	$include_posts = isset( $attributes['includePosts'] ) ? sanitize_text_field( $attributes['includePosts'] ) : '';
	$exclude_posts = isset( $attributes['excludePosts'] ) ? sanitize_text_field( $attributes['excludePosts'] ) : '';
	$excerpt_length = isset( $attributes['excerptLength'] ) ? intval( $attributes['excerptLength'] ) : 140;

	$display_only_thumbnail = isset( $attributes['displayOnlyThumbnail'] ) ? $attributes['displayOnlyThumbnail'] : false;
	$display_thumbnail = isset( $attributes['displayThumbnail'] ) ? $attributes['displayThumbnail'] : true;
	$display_category = isset( $attributes['displayCategory'] ) ? $attributes['displayCategory'] : false;
	$display_date = isset( $attributes['displayDate'] ) ? $attributes['displayDate'] : false;
	$display_author_name = isset( $attributes['displayAuthorName'] ) ? $attributes['displayAuthorName'] : false;
	$display_author_avatar = isset( $attributes['displayAuthorAvatar'] ) ? $attributes['displayAuthorAvatar'] : false;
	$display_author_url = isset( $attributes['displayAuthorUrl'] ) ? $attributes['displayAuthorUrl'] : false;

	$columns = isset( $attributes['columns'] ) ? sanitize_text_field( $attributes['columns'] ) : 'three';
	$img_size = isset( $attributes['imgSize'] ) ? sanitize_text_field( $attributes['imgSize'] ) : 'large';
	$display_nav = isset( $attributes['displayNav'] ) ? $attributes['displayNav'] : false;
	$display_dots = isset( $attributes['displayDots'] ) ? $attributes['displayDots'] : true;
	$infinite = isset( $attributes['infinite'] ) ? $attributes['infinite'] : false;
	$autoplay = isset( $attributes['autoplay'] ) ? $attributes['autoplay'] : false;
	$autoplay_duration = isset( $attributes['autoplayDuration'] ) ? intval( $attributes['autoplayDuration'] ) : 5;
	$adaptive_height = isset( $attributes['adaptiveHeight'] ) ? $attributes['adaptiveHeight'] : false;

	$card_layout = isset( $attributes['cardLayout'] ) ? sanitize_text_field( $attributes['cardLayout'] ) : 'vertical';

	// Build query arguments
	$query_args = array(
		'post_type'      => $post_type,
		'post_status'    => 'publish',
		'posts_per_page' => $max_posts,
		'order'          => $order,
		'orderby'        => $orderby,
	);

	// Include/exclude posts
	if ( ! empty( $include_posts ) ) {
		$include_ids = array_map( 'intval', explode( ',', $include_posts ) );
		$query_args['post__in'] = $include_ids;
	}

	if ( ! empty( $exclude_posts ) ) {
		$exclude_ids = array_map( 'intval', explode( ',', $exclude_posts ) );
		$query_args['post__not_in'] = $exclude_ids;
	}

	// Taxonomy filters
	$tax_query = array();
	if ( ! empty( $taxonomy ) && is_array( $taxonomy ) ) {
		$tax_query[] = array(
			'taxonomy' => 'category',
			'field'    => 'term_id',
			'terms'    => $taxonomy,
		);
	}

	if ( ! empty( $tags ) && is_array( $tags ) ) {
		$tax_query[] = array(
			'taxonomy' => 'post_tag',
			'field'    => 'term_id',
			'terms'    => $tags,
		);
	}

	if ( ! empty( $tax_query ) ) {
		$query_args['tax_query'] = $tax_query;
	}

	// Author filter
	if ( ! empty( $authors ) && is_array( $authors ) ) {
		$query_args['author__in'] = $authors;
	}

	// Only posts with thumbnails
	if ( $display_only_thumbnail ) {
		$query_args['meta_query'] = array(
			array(
				'key'     => '_thumbnail_id',
				'compare' => 'EXISTS',
			),
		);
	}

	$query = new WP_Query( $query_args );

	if ( ! $query->have_posts() ) {
		return '<div class="wp-block-wbcom-essential-post-carousel"><p>' . esc_html__( 'No posts found.', 'wbcom-essential' ) . '</p></div>';
	}

	// Generate unique ID for the carousel
	$carousel_id = 'wbcom-post-carousel-' . wp_rand( 1000, 9999 );

	// Build carousel HTML
	$classes = array( 'wp-block-wbcom-essential-post-carousel', 'wbcom-post-carousel' );
	$classes[] = 'wbcom-posts-' . $card_layout;
	$classes[] = 'wbcom-posts-columns-' . $columns;

	$data_attrs = array(
		'data-columns="' . esc_attr( $columns ) . '"',
		'data-infinite="' . esc_attr( $infinite ? 'true' : 'false' ) . '"',
		'data-autoplay="' . esc_attr( $autoplay ? 'true' : 'false' ) . '"',
		'data-autoplay-duration="' . esc_attr( $autoplay_duration * 1000 ) . '"',
		'data-adaptive-height="' . esc_attr( $adaptive_height ? 'true' : 'false' ) . '"',
		'data-show-dots="' . esc_attr( $display_dots ? 'true' : 'false' ) . '"',
		'data-show-arrows="' . esc_attr( $display_nav ? 'true' : 'false' ) . '"',
	);

	$output = '<div class="' . esc_attr( implode( ' ', $classes ) ) . '" id="' . esc_attr( $carousel_id ) . '" ' . implode( ' ', $data_attrs ) . '>';

	$output .= '<div class="wbcom-post-carousel-wrapper">';
	$output .= '<div class="wbcom-post-carousel-inner">';

	while ( $query->have_posts() ) {
		$query->the_post();
		$post_id = get_the_ID();

		$output .= '<div class="wbcom-posts-card">';

		// Categories
		if ( $display_category ) {
			$categories = get_the_category( $post_id );
			if ( ! empty( $categories ) ) {
				$output .= '<div class="wbcom-posts-card-cats">';
				foreach ( $categories as $category ) {
					$output .= '<a href="' . esc_url( get_category_link( $category->term_id ) ) . '">' . esc_html( $category->name ) . '</a>';
				}
				$output .= '</div>';
			}
		}

		// Image
		if ( $display_thumbnail && has_post_thumbnail( $post_id ) ) {
			$image_url = get_the_post_thumbnail_url( $post_id, $img_size );
			$image_alt = get_post_meta( get_post_thumbnail_id( $post_id ), '_wp_attachment_image_alt', true );

			$output .= '<div class="wbcom-posts-card-img-wrapper">';
			$output .= '<div class="wbcom-posts-card-featured-img">';
			$output .= '<a href="' . esc_url( get_permalink( $post_id ) ) . '">';
			$output .= '<img src="' . esc_url( $image_url ) . '" alt="' . esc_attr( $image_alt ) . '" />';
			$output .= '</a>';
			$output .= '</div>';
			$output .= '</div>';
		}

		// Body
		$output .= '<div class="wbcom-posts-card-body-wrapper">';
		$output .= '<div class="wbcom-posts-card-body">';

		// Title
		$title_tag = isset( $attributes['cardTitleHtml'] ) ? sanitize_text_field( $attributes['cardTitleHtml'] ) : 'h3';
		$output .= '<' . esc_attr( $title_tag ) . ' class="wbcom-posts-card-title">';
		$output .= '<a href="' . esc_url( get_permalink( $post_id ) ) . '">' . esc_html( get_the_title( $post_id ) ) . '</a>';
		$output .= '</' . esc_attr( $title_tag ) . '>';

		// Excerpt
		if ( $excerpt_length > 0 ) {
			$excerpt = get_the_excerpt( $post_id );
			if ( strlen( $excerpt ) > $excerpt_length ) {
				$excerpt = substr( $excerpt, 0, $excerpt_length ) . '...';
			}
			if ( ! empty( $excerpt ) ) {
				$output .= '<div class="wbcom-posts-excerpt">';
				$output .= '<p>' . esc_html( $excerpt ) . '</p>';
				$output .= '</div>';
			}
		}

		$output .= '</div>'; // .wbcom-posts-card-body

		// Footer
		$output .= '<div class="wbcom-posts-card-footer">';

		// Author
		if ( $display_author_name ) {
			$author_id = get_the_author_meta( 'ID' );
			$author_name = get_the_author();
			$author_url = $display_author_url ? get_author_posts_url( $author_id ) : '';

			$output .= '<div class="wbcom-posts-card-author">';

			if ( $display_author_avatar ) {
				$avatar_url = get_avatar_url( $author_id, array( 'size' => 40 ) );
				$output .= '<div class="wbcom-posts-card-author-img">';
				$output .= '<img src="' . esc_url( $avatar_url ) . '" alt="' . esc_attr( $author_name ) . '" />';
				$output .= '</div>';
			}

			if ( ! empty( $author_url ) ) {
				$output .= '<a href="' . esc_url( $author_url ) . '" class="wbcom-posts-card-author-link">' . esc_html( $author_name ) . '</a>';
			} else {
				$output .= '<span class="wbcom-posts-card-author-link">' . esc_html( $author_name ) . '</span>';
			}

			$output .= '</div>';
		}

		// Date
		if ( $display_date ) {
			$output .= '<div class="wbcom-posts-card-date">';
			$output .= '<a href="' . esc_url( get_permalink( $post_id ) ) . '" class="wbcom-posts-card-date-link">' . esc_html( get_the_date( '', $post_id ) ) . '</a>';
			$output .= '</div>';
		}

		$output .= '</div>'; // .wbcom-posts-card-footer
		$output .= '</div>'; // .wbcom-posts-card-body-wrapper

		$output .= '</div>'; // .wbcom-posts-card
	}

	$output .= '</div>'; // .wbcom-post-carousel-inner

	// Navigation arrows
	if ( $display_nav ) {
		$next_icon = isset( $attributes['navArrowNextIcon']['value'] ) ? $attributes['navArrowNextIcon']['value'] : 'fas fa-arrow-right';
		$prev_icon = isset( $attributes['navArrowPrevIcon']['value'] ) ? $attributes['navArrowPrevIcon']['value'] : 'fas fa-arrow-left';

		$output .= '<button class="wbcom-post-carousel-prev" aria-label="' . esc_attr__( 'Previous', 'wbcom-essential' ) . '">';
		$output .= '<i class="' . esc_attr( $prev_icon ) . '"></i>';
		$output .= '</button>';

		$output .= '<button class="wbcom-post-carousel-next" aria-label="' . esc_attr__( 'Next', 'wbcom-essential' ) . '">';
		$output .= '<i class="' . esc_attr( $next_icon ) . '"></i>';
		$output .= '</button>';
	}

	// Navigation dots container (Slick will populate this)
	if ( $display_dots ) {
		$output .= '<div class="wbcom-post-carousel-dots"></div>';
	}

	$output .= '</div>'; // .wbcom-post-carousel-wrapper
	$output .= '</div>'; // .wp-block-wbcom-essential-post-carousel

	wp_reset_postdata();

	return $output;
}