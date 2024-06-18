<?php
/**
 * Wbcom essential plugin general functions.
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://wbcomdesigns.com/plugins
 * @since      1.0.0
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/includes
 */

/**
 * Gets and includes template files.
 *
 * @since 3.0.0
 * @param string|array $template_name Get template name.
 * @param array        $args Additional arguments passed to the template.
 * @param string       $template_path Template path.
 * @param string       $default_path Default path.
 */
function wbcom_essential_get_template( $template_name, $args = array(), $template_path = '', $default_path = '' ) {
	if ( $args && is_array( $args ) ) {
		// phpcs:ignore WordPress.PHP.DontExtract.extract_extract -- Please, forgive us.
		extract( $args );
	}

	include wbcom_essential_locate_template( $template_name, $template_path, $default_path );
}

/**
 * Locate template.
 *
 * Locate the called template.
 * Search Order:
 *
 * @since 3.0.0
 *
 * @param string|array $template_name Get template name.
 * @param string       $template_path Template path.
 * @param string       $default_path Default path.
 */
function wbcom_essential_locate_template( $template_name, $template_path, $default_path = '' ) {
	// Look within passed path within the theme - this is priority.
	$template = locate_template(
		array(
			trailingslashit( $template_path ) . $template_name,
			$template_name,
		)
	);

	// Get default template.
	if ( ! $template && false !== $default_path ) {
		$default_path = $default_path ? $default_path : WBCOM_ESSENTIAL_PATH . 'templates/';
		if ( file_exists( trailingslashit( $default_path . $template_path ) . $template_name ) ) {
			$template = trailingslashit( $default_path . $template_path ) . $template_name;
		}
	}
	return apply_filters( 'wbcom_essential_locate_template', $template, $template_name, $template_path, $default_path );
}

/**
 * Function checks the theme is active or not.
 *
 * @param string $theme Required Theme Name.
 */
function _is_theme_active( $theme ) {
	$current_theme = wp_get_theme(); // gets the current theme.
	if ( $theme == $current_theme->name || $theme == $current_theme->parent_theme ) {
		return true;
	} else {
		return false;
	}
}

/**
 * Get column class
 *
 * @param string $type Type.
 * @param string $viewport Viewport.
 *
 * @return mixed|string
 */
function _get_column_class( $type, $viewport = '' ) {

	$classes = array(
		'one'   => 'one',
		'two'   => 'two',
		'three' => 'three',
		'four'  => 'four',
	);

	if ( 'tablet' === $viewport ) {
		return 'md-' . $classes[ $type ];
	}

	if ( 'mobile' === $viewport ) {
		return 'sm-' . $classes[ $type ];
	}

	return $classes[ $type ];
}



if ( ! function_exists( 'wbcom_essential_notification_avatar' ) ) {
	/**
	 * BuddyPress notification for avatar.
	 *
	 * @return void
	 */
	function wbcom_essential_notification_avatar() {
		$notification = buddypress()->notifications->query_loop->notification;
		$component    = $notification->component_name;

		switch ( $component ) {
			case 'groups':
				if ( ! empty( $notification->item_id ) ) {
					$item_id = $notification->item_id;
					$object  = 'group';
				}
				break;
			case 'follow':
			case 'friends':
				if ( ! empty( $notification->item_id ) ) {
					$item_id = $notification->item_id;
					$object  = 'user';
				}
				break;
			case has_action( 'bb_notification_avatar_' . $component ):
				do_action( 'bb_notification_avatar_' . $component );
				break;
			default:
				if ( ! empty( $notification->secondary_item_id ) ) {
					$item_id = $notification->secondary_item_id;
					$object  = 'user';
				} else {
					$item_id = $notification->item_id;
					$object  = 'user';
				}
				break;
		}

		if ( isset( $item_id, $object ) ) {

			if ( 'group' === $object ) {
				$group = new BP_Groups_Group( $item_id );
				if ( function_exists( 'buddypress' ) && version_compare( buddypress()->version, '12.0', '>=' ) ) {
					$link = bp_get_group_url( $group );
				} else {
					$link = bp_get_group_permalink( $group );
				}
			} else {
				$user = new WP_User( $item_id );
				if ( function_exists( 'buddypress' ) && version_compare( buddypress()->version, '12.0', '>=' ) ) {
					$link = bp_members_get_user_url( $user->ID );
				} else {
					$link = bp_core_get_user_domain( $user->ID, $user->user_nicename, $user->user_login );
				}
			}

			?>
			<a href="<?php echo esc_url( $link ); ?>">
				<?php
				echo bp_core_fetch_avatar(
					array(
						'item_id' => $item_id,
						'object'  => $object,
					)
				);
				?>
				<?php ( isset( $user ) ? wbcom_essential_user_status( $user->ID ) : '' ); ?>
			</a>
			<?php
		}

	}
}



if ( ! function_exists( 'wbcom_essential_is_user_online' ) ) {
	/**
	 * Is the current user online
	 *
	 * @param int $user_id User ID.
	 *
	 * @return bool
	 */
	function wbcom_essential_is_user_online( $user_id ) {

		if ( ! function_exists( 'bp_get_user_last_activity' ) ) {
			return;
		}

		$last_activity = strtotime( bp_get_user_last_activity( $user_id ) );

		if ( empty( $last_activity ) ) {
			return false;
		}

		// the activity timeframe is 5 minutes.
		$activity_timeframe = 5 * MINUTE_IN_SECONDS;
		return ( time() - $last_activity <= $activity_timeframe );
	}
}


if ( ! function_exists( 'wbcom_essential_user_status' ) ) {
	/**
	 * BuddyPress user status
	 *
	 * @param int $user_id User ID.
	 */
	function wbcom_essential_user_status( $user_id ) {
		if ( wbcom_essential_is_user_online( $user_id ) ) {
			echo '<span class="member-status online"></span>';
		}
	}
}



if ( ! function_exists( 'wbcom_essential_theme_elementor_topic_link_attribute_change' ) ) {

	/**
	 * Changed elementor topic link attribute.
	 *
	 * @param  mixed $retval Link.
	 * @param  Array $r R.
	 * @param  mixed $args Arguments.
	 * @return void
	 */
	function wbcom_essential_theme_elementor_topic_link_attribute_change( $retval, $r, $args ) {

		if ( ! function_exists( 'buddypress' ) && ! bp_is_active( 'forums' ) ) {
			return;
		}

		$url    = bbp_get_topic_last_reply_url( $r['id'] ) . '?bbp_reply_to=0#new-post';
		$retval = $r['link_before'] . '<a data-balloon=" ' . esc_html__( 'Reply', 'wbcom-essential' ) . ' " data-balloon-pos="up" href="' . esc_url( $url ) . '" class="bbp-reply-to-link"><i class="wb-icon-reply"></i><span class="bb-forum-reply-text">' . esc_html( $r['reply_text'] ) . '</span></a>' . $r['link_after'];
		return apply_filters( 'bb_theme_topic_link_attribute_change', $retval, $r, $args );
	}
}

if ( ! function_exists( 'wbcom_essential_theme_elementor_reply_link_attribute_change' ) ) {
	/**
	 * Changed elementor reply link attribute.
	 *
	 * @param  mixed $retval Link.
	 * @param  Array $r R.
	 * @param  mixed $args Arguments.
	 * @return void
	 */
	function wbcom_essential_theme_elementor_reply_link_attribute_change( $retval, $r, $args ) {

		if ( ! function_exists( 'buddypress' ) && ! bp_is_active( 'forums' ) ) {
			return;
		}

		// Get the reply to use it's ID and post_parent.
		$reply = bbp_get_reply( bbp_get_reply_id( (int) $r['id'] ) );

		// Bail if no reply or user cannot reply.
		if ( empty( $reply ) || ! bbp_current_user_can_access_create_reply_form() ) {
			return;
		}

		// If single user replies page then no need to open a modal for reply to.
		if ( bbp_is_single_user_replies() ) {
			return $retval;
		}

		// Build the URI and return value.
		$uri = remove_query_arg( array( 'bbp_reply_to' ) );
		$uri = add_query_arg( array( 'bbp_reply_to' => $reply->ID ), bbp_get_topic_permalink( bbp_get_reply_topic_id( $reply->ID ) ) );
		$uri = wp_nonce_url( $uri, 'respond_id_' . $reply->ID );
		$uri = $uri . '#new-post';

		// Only add onclick if replies are threaded.
		if ( bbp_thread_replies() ) {

			// Array of classes to pass to moveForm.
			$move_form = array(
				$r['add_below'] . '-' . $reply->ID,
				$reply->ID,
				$r['respond_id'],
				$reply->post_parent,
			);

			// Build the onclick.
			$onclick = ' onclick="return addReply.moveForm(\'' . implode( "','", $move_form ) . '\');"';

			// No onclick if replies are not threaded.
		} else {
			$onclick = '';
		}

		$modal = 'data-modal-id-inline="new-reply-' . $reply->post_parent . '"';

		// Add $uri to the array, to be passed through the filter.
		$r['uri'] = $uri;
		$retval   = $r['link_before'] . '<a data-balloon=" ' . esc_html__( 'Reply', 'wbcom-essential' ) . ' " data-balloon-pos="up" href="' . esc_url( $r['uri'] ) . '" class="bbp-reply-to-link ' . $reply->ID . ' "><i class="wb-icon-reply"></i><span class="bb-forum-reply-text">' . esc_html( $r['reply_text'] ) . '</span></a>' . $r['link_after'];

		return $retval;
	}
}


/**
 * Get a refreshed cart fragment, including the mini cart HTML.
 *
 * @param Array $fragments WC Cart fragments.
 */
function wbcom_essential_header_cart_fragment( $fragments ) {

	$fragments['span.header-cart-count'] = '<span class="count header-cart-count">' . WC()->cart->get_cart_contents_count() . '</span>';

	return $fragments;
}
add_filter( 'woocommerce_add_to_cart_fragments', 'wbcom_essential_header_cart_fragment' );

/**
 * Filters the scripts to enqueue for BuddyPress Nouveau.
 *
 * @param  Array $scripts_args Array of scripts to register.
 */
function wbcom_essential_bp_nouveau_register_scripts( $scripts_args ) {
	if ( function_exists( 'buddypress' ) && isset( buddypress()->buddyboss ) ) {
		return $scripts_args;
	}

	if ( isset( $scripts_args['bp-nouveau'] ) ) {
		$scripts_args['bp-nouveau']['file'] = WBCOM_ESSENTIAL_URL . 'assets/js/buddypress-nouveau%s.js';
	}
	return $scripts_args;
}
add_filter( 'bp_nouveau_register_scripts', 'wbcom_essential_bp_nouveau_register_scripts', 20 );



/*
 * FUNCTION POST INFO
 *
 * @since 3.6.0
 */

function wbcom_essential_posts_revolution_elementor_thumbs() {
	global $post;

	if ( has_post_thumbnail() ) {
		$id_post      = get_the_id();
		$single_image = wp_get_attachment_image_src( get_post_thumbnail_id( $id_post ), 'wbcom-essential-elementor-type1' );
		if ( empty( $single_image ) ) {
			$single_image[0] = WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/images/no-img.png';
		}
	} else {
		$single_image[0] = WBCOM_ESSENTIAL_ELEMENTOR_URL . 'assets/images/no-img.png';
	}

	$return = '<img class="wb-megaposts-thumbs" src="' . $single_image[0] . '" alt="' . get_the_title() . '">';
	return apply_filters( 'wbcom_essential_posts_revolution_elementor_thumbs', $return, $post );
}


function wbcom_essential_posts_revolution_elementor_format_icon() {
	$id_post = get_the_id();
	$format  = get_post_format( $id_post );
	if ( empty( $format ) ) {
		$format = 'standard';
	}
	if ( $format == 'standard' ) {
		$return = '<span class="fa fa-file"></span>';
	}
	if ( $format == 'aside' ) {
		$return = '<span class="fa fa-file-o"></span>';
	}
	if ( $format == 'link' ) {
		$return = '<span class="fa fa-paperclip"></span>';
	}
	if ( $format == 'gallery' ) {
		$return = '<span class="fa fa-file-image-o"></span>';
	}
	if ( $format == 'video' ) {
		$return = '<span class="fa fa-play"></span>';
	}
	if ( $format == 'audio' ) {
		$return = '<span class="fa fa-headphones"></span>';
	}
	if ( $format == 'image' ) {
		$return = '<span class="fa fa-picture-o"></span>';
	}
	if ( $format == 'quote' ) {
		$return = '<span class="fa fa-quote-left"></span>';
	}
	if ( $format == 'status' ) {
		$return = '<span class="fa fa-comments"></span>';
	}

	return apply_filters( 'wbcom_essential_posts_revolution_elementor_format_icon', $return, $format );
}

function wbcom_essential_posts_revolution_elementor_excerpt( $excerpt ) {
	$return = substr( get_the_excerpt(), 0, $excerpt );
	return $return;
}

function wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) {
	$separator = ', ';
	$output    = '';
	if ( $wbcom_query_source == 'wp_posts' ) {
		$categories = get_the_category();
		if ( $categories ) {
			foreach ( $categories as $category ) {
				$output .= '<a href="' . get_category_link( $category->term_id ) . '" title="' . esc_attr( sprintf( __( 'View all posts in %s', 'wbcom-essential' ), $category->name ) ) . '">' . $category->cat_name . '</a>' . $separator;
			}
		}
	} elseif ( $wbcom_query_source == 'wp_custom_posts_type' ) {
		global $post;
		$taxonomy_names = get_object_taxonomies( $wbcom_query_posts_type );
		$term_list      = wp_get_post_terms( $post->ID, $taxonomy_names );
		if ( $term_list ) {
			foreach ( $term_list as $tax_term ) {
				$output .= '<a href="' . esc_attr( get_term_link( $tax_term, $wbcom_query_posts_type ) ) . '" title="' . sprintf( __( 'View all posts in %s', 'wbcom-essential' ), $tax_term->name ) . '" ' . '>' . $tax_term->name . '</a>' . $separator;
			}
		}
	}
	$return = trim( $output, $separator );
	return $return;
}

function wbcom_essential_posts_revolution_elementor_post_info( $ad_postpreview_display_date,
	$ad_postpreview_display_comments,
	$ad_postpreview_display_author,
	$ad_postpreview_display_category,
	$ad_postpreview_display_views,
	$wbcom_query_source,
	$wbcom_query_posts_type,
	$date_format ) {

	global $post;
	$return = '';
	if ( $ad_postpreview_display_date == 'true' ) {

		$return .= '<span class="wb-date"><i class="fa fa-calendar"></i>' . get_the_date( $date_format ) . '</span>';

	}

	if ( $ad_postpreview_display_author == 'true' ) {
		$return .= '<span class="wb-author"><i class="fa fa-user"></i><a href="' . get_author_posts_url( get_the_author_meta( 'ID' ) ) . '">' . get_the_author_meta( 'display_name' ) . '</a></span>';
	}

	if ( $ad_postpreview_display_comments == 'true' ) {

		$return .= '<span class="wb-comments"><i class="fa fa-comments"></i><a href="' . get_comments_link() . '">' . get_comments_number() . '</a></span>';

	}

	if ( $ad_postpreview_display_category == 'true' ) {
		$return .= '<span class="wb-category"><i class="fa fa-tags"></i>' . wbcom_essential_posts_revolution_elementor_category( $wbcom_query_source, $wbcom_query_posts_type ) . '</span>';
	}

	if ( $ad_postpreview_display_views == 'true' ) {
		$return .= '<span class="wb-views"><i class="fa fa-eye"></i>' . wbcom_essential_posts_revolution_elementor_get_post_views( get_the_ID() ) . '</span>';
	}

	return $return;
}



/*
 * RGBA
 *
 * @since 3.6.0
 */

function wbcom_essential_posts_revolution_elementor_hex2rgb( $hex ) {

	$hex = str_replace( '#', '', $hex );

	if ( strlen( $hex ) == 3 ) {
		$r = hexdec( substr( $hex, 0, 1 ) . substr( $hex, 0, 1 ) );
		$g = hexdec( substr( $hex, 1, 1 ) . substr( $hex, 1, 1 ) );
		$b = hexdec( substr( $hex, 2, 1 ) . substr( $hex, 2, 1 ) );
	} else {
		$r = hexdec( substr( $hex, 0, 2 ) );
		$g = hexdec( substr( $hex, 2, 2 ) );
		$b = hexdec( substr( $hex, 4, 2 ) );
	}
	$rgb = array( $r, $g, $b );
	return $rgb;
}

/*
 * FUNCTION VIEW
 *
 * @since 3.6.0
 */

function wbcom_essential_posts_revolution_elementor_get_post_views( $postID ) {
	$count_key = 'wpb_post_views_count';
	$count     = get_post_meta( $postID, $count_key, true );
	if ( $count == '' ) {
		delete_post_meta( $postID, $count_key );
		add_post_meta( $postID, $count_key, '0' );
		$view = esc_html__( 'Views', 'wbcom-essential' );
		return '0';
	}
	$count_final = $count;
	return $count_final;
}

function wbcom_essential_posts_revolution_elementor_set_post_views() {
	if ( is_single() ) {
		global $post;
		$postID    = $post->ID;
		$count_key = 'wpb_post_views_count';
		$count     = get_post_meta( $postID, $count_key, true );
		if ( $count == '' ) {
			$count = 0;
			delete_post_meta( $postID, $count_key );
			add_post_meta( $postID, $count_key, '0' );
		} else {
			$count++;
			update_post_meta( $postID, $count_key, $count );
		}
	}
}
add_filter( 'wp_footer', 'wbcom_essential_posts_revolution_elementor_set_post_views', 9999 );


/*
 * FUNCTION SHARE
 *
 * @since 3.6.0
 */


function wbcom_essential_posts_revolution_elementor_share() {
	global $post;
	$pinterestimage = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'full' );

	$return = '<div class="adpostsnp-share">
        <div class="adpostsnp-share-item"><a target="_blank" class="fa fa-facebook-official " href="http://www.facebook.com/sharer.php?u=' . get_the_permalink() . '&amp;t=' . get_the_title() . '" title="' . esc_html__( 'Click to share this post on Facebook', 'wbcom-essential' ) . '"></a></div>
		<div class="adpostsnp-share-item"><a target="_blank" class="fa fa-twitter-square" href="http://twitter.com/home?status=' . get_the_permalink() . '" title="' . esc_html__( 'Click to share this post on Twitter', 'wbcom-essential' ) . '"></a></div>
        <div class="adpostsnp-share-item"><a target="_blank" class="fa fa-linkedin-square" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=' . get_the_permalink() . '" title="' . esc_html__( 'Click to share this post on Linkedin', 'wbcom-essential' ) . '"></a></div>
    	<div class="adpostsnp-share-item"><a target="_blank" class="fa fa-pinterest-square" href="http://pinterest.com/pin/create/button/?url=' . urlencode( get_permalink( $post->ID ) ) . '&media=' . $pinterestimage[0] . '&description=' . get_the_title() . '" title="' . esc_html__( 'Click to share this post on Pinterest', 'wbcom-essential' ) . '"></a></div>
    </div>';

	return $return;

}

/*
 * GET POST TYPE
 *
 * @since 3.6.0
 */
function wbcom_essential_all_post_types() {

	// Select all public post types
	$args = array(
		'public' => true,
	);

	$all_types = get_post_types( $args, 'names', 'and' );

	// Put them in an ordered array filtering the types you don't want

	$sel_types = array();

	foreach ( $all_types as $type ) {

		if ( $type != 'attachment' && $type != 'post' && $type != 'page' ) {
			$sel_types[] = $type;
		}
	}

	// Return Selected Post Types Array
	$return  = '';
	$return .= '<select id="wbcom_essential_posts_revolution_elementor_post_type">';
	foreach ( $sel_types as $slug ) {
		$return .= '<option value="' . $slug . '">' . $slug . '</option>';
	}
	$return .= '</select>';

	return $return;

}

/*
 * WP QUERY
 *
 * @since 3.6.0
 */

function wbcom_essential_posts_revolution_elementor_query( $wbcom_query_source,
					$wbcom_query_sticky_posts,
					$wbcom_query_posts_type,
					$wbcom_query_categories,
					$wbcom_query_order,
					$wbcom_query_orderby,
					$wbcom_query_pagination,
					$wbcom_query_pagination_type,
					$wbcom_query_number,
					$wbcom_query_posts_for_page ) {

	if ( $wbcom_query_source == 'wp_custom_posts_type' ) {
		$wbcom_query_sticky_posts = 'allposts';
	}

	if ( $wbcom_query_sticky_posts == 'allposts' ) {

		$query = 'post_type=Post&post_status=publish&orderby=' . $wbcom_query_orderby . '&order=' . $wbcom_query_order . '';

		// CUSTOM POST TYPE
		if ( $wbcom_query_source == 'wp_custom_posts_type' ) {
			$query .= '&post_type=' . $wbcom_query_posts_type . '';
		}

		// CATEGORIES
		if ( $wbcom_query_categories != '' && ! empty( $wbcom_query_categories ) && $wbcom_query_source == 'wp_custom_posts_type' ) {
			$taxonomy_names = get_object_taxonomies( $wbcom_query_posts_type );
			$query         .= '&' . $taxonomy_names[0] . '=' . $wbcom_query_categories . '';
		}

		if ( $wbcom_query_categories != '' && ! empty( $wbcom_query_categories ) && $wbcom_query_source == 'wp_posts' ) {
			$query .= '&category_name=' . $wbcom_query_categories . '';
		}

		if ( $wbcom_query_pagination == 'yes' ) {
			$query .= '&posts_per_page=' . $wbcom_query_posts_for_page . '';
		} else {
			if ( $wbcom_query_number == '' ) {
				$wbcom_query_number = '-1'; }
			$query .= '&posts_per_page=' . $wbcom_query_number . '';
		}

		// PAGINATION
		if ( $wbcom_query_pagination == 'yes' ) {
			if ( get_query_var( 'paged' ) ) {
				$paged = get_query_var( 'paged' );

			} elseif ( get_query_var( 'page' ) ) {
				$paged = get_query_var( 'page' );
			} else {
				$paged = 1;
			}
			$query .= '&paged=' . $paged . '';
		}
		// #PAGINATION

	} else {

		if ( $wbcom_query_pagination == 'yes' ) {
			$wbcom_query_number = $wbcom_query_posts_for_page;
		} else {
			if ( $wbcom_query_number == '' ) {
				$wbcom_query_number = '-1'; }
			$wbcom_query_number = $wbcom_query_number;
		}

		// PAGINATION

		if ( get_query_var( 'paged' ) ) {
			$paged = get_query_var( 'paged' );
		} elseif ( get_query_var( 'page' ) ) {
			$paged = get_query_var( 'page' );
		} else {
			$paged = 1;
		}

		// #PAGINATION

		/* STICKY POST DA FARE ARRAY PER SCRITTURA IN ARRAY */

		$sticky = get_option( 'sticky_posts' );
		$sticky = array_slice( $sticky, 0, 5 );
		$query  = array(
			'post_type'           => 'post',
			'post_status'         => 'publish',
			'orderby'             => $wbcom_query_orderby,
			'order'               => $wbcom_query_order,
			'category_name'       => $wbcom_query_categories,
			'posts_per_page'      => $wbcom_query_number,
			'paged'               => $paged,
			'post__in'            => $sticky,
			'ignore_sticky_posts' => 1,
		);

	}

	return $query;
}

/*
 * NUMERIC PAGINATION
 *
 * @since 3.6.0
 */

function wbcom_essential_posts_revolution_elementor_numeric_pagination( $pages = '', $range = 2, $loop = '' ) {
	$showitems = ( $range * 2 ) + 1;

	global $paged;
	if ( empty( $paged ) ) {
		$paged = 1;
	}

	if ( $pages == '' ) {
		$pages = $loop->max_num_pages;
		if ( ! $pages ) {
			$pages = 1;
		}
	}

	$return = '';

	if ( 1 != $pages ) {
		$return .= "<div class='wb-pagination numeric'>";
		if ( $paged > 2 && $paged > $range + 1 && $showitems < $pages ) {
			$return .= "<a href='" . get_pagenum_link( 1 ) . "'>&laquo;</a>";
		}
		if ( $paged > 1 && $showitems < $pages ) {
			$return .= "<a href='" . get_pagenum_link( $paged - 1 ) . "'>&lsaquo;</a>";
		}

		for ( $i = 1; $i <= $pages; $i++ ) {
			if ( 1 != $pages && ( ! ( $i >= $paged + $range + 1 || $i <= $paged - $range - 1 ) || $pages <= $showitems ) ) {
				$return .= ( $paged == $i ) ? "<span class='current'>" . $i . '</span>' : "<a href='" . get_pagenum_link( $i ) . "' class='inactive' >" . $i . '</a>';
			}
		}

		if ( $paged < $pages && $showitems < $pages ) {
			$return .= "<a href='" . get_pagenum_link( $paged + 1 ) . "'>&rsaquo;</a>";
		}
		if ( $paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages ) {
			$return .= "<a href='" . get_pagenum_link( $pages ) . "'>&raquo;</a>";
		}
		$return .= "</div>\n";
	}

	return $return;
}
