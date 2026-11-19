<?php
/**
 * Gutenberg Blocks Loader for WBcom Essential.
 *
 * Registers the block category and bootstraps BlockRegistrar.
 *
 * @package Wbcom_Essential
 * @since   4.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// BlockRegistrar lives next to this file.
require_once __DIR__ . '/BlockRegistrar.php';

// Shared PHP infrastructure for v2 blocks.
require_once __DIR__ . '/includes/class-wbe-css.php';
require_once __DIR__ . '/includes/class-wbe-schema.php';
require_once __DIR__ . '/includes/class-wbe-fonts.php';
require_once __DIR__ . '/patterns/wbcom-patterns.php';

/**
 * Tells the site owner why a block shows nothing. Visitors get no output.
 *
 * Used by dynamic blocks whose plugin, add-on or component is missing, or
 * that have nothing to show yet. Runs in the editor too (ServerSideRender
 * renders as the logged-in owner), so one call covers both surfaces.
 *
 * @param string $message   What is missing and what to do, already translated.
 * @param string $link_url  Optional admin URL where the owner can fix it.
 * @param string $link_text Optional link label, already translated.
 * @return void
 */
function wbcom_essential_block_owner_notice( $message, $link_url = '', $link_text = '' ) {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$link = ( $link_url && $link_text ) ? ' <a href="' . esc_url( $link_url ) . '">' . esc_html( $link_text ) . '</a>' : '';
	echo '<p class="wbe-block-notice" role="note">' . esc_html( $message ) . $link . '</p>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- $link is escaped above.
}

/**
 * Whether a BuddyPress block cannot run: BuddyPress or the component it reads is off.
 *
 * Prints the owner notice when it returns true, so a render.php only needs
 * `if ( wbcom_essential_bp_block_unavailable( 'groups' ) ) { return; }`.
 * Returning early also keeps the block's script from calling a REST route
 * that BuddyPress does not register while the component is off.
 *
 * @param string $component BuddyPress component slug, e.g. 'groups' or 'activity'. Empty checks BuddyPress only.
 * @return bool True when the block should render nothing.
 */
function wbcom_essential_bp_block_unavailable( $component = '' ) {
	if ( ! function_exists( 'buddypress' ) ) {
		wbcom_essential_block_owner_notice( __( 'This block needs BuddyPress. Activate BuddyPress to use it.', 'wbcom-essential' ) );
		return true;
	}
	if ( '' === $component || bp_is_active( $component ) ) {
		return false;
	}
	$components = function_exists( 'bp_core_get_components' ) ? bp_core_get_components() : array();
	$label      = $components[ $component ]['title'] ?? ucfirst( $component );
	wbcom_essential_block_owner_notice(
		/* translators: %s: BuddyPress component name, e.g. "User Groups". */
		sprintf( __( 'Turn on the BuddyPress %s component to use this block. Visitors see nothing until then.', 'wbcom-essential' ), $label ),
		bp_get_admin_url( add_query_arg( 'page', 'bp-components', 'admin.php' ) ),
		__( 'Open BuddyPress Components', 'wbcom-essential' )
	);
	return true;
}

// Initialize shared infrastructure.
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::init();
\WBCOM_ESSENTIAL\Gutenberg\WBE_Schema::init();
\WBCOM_ESSENTIAL\Gutenberg\WBE_Fonts::init();

/**
 * Register shared Swiper library for carousel blocks.
 * Carousel block.json files reference these handles: "swiper" in viewScript and
 * "wbe-swiper" in style, so the base CSS loads wherever a carousel renders
 * (post content, widget areas, templates).
 */
add_action(
	'init',
	function () {
		wp_register_style(
			'wbe-swiper',
			WBCOM_ESSENTIAL_URL . 'plugins/elementor/assets/css/swiper-base.css',
			array(),
			WBCOM_ESSENTIAL_VERSION
		);
		wp_register_script(
			'swiper',
			WBCOM_ESSENTIAL_URL . 'plugins/elementor/assets/js/swiper.min.js',
			array(),
			WBCOM_ESSENTIAL_VERSION,
			true
		);
	}
);

/**
 * Enqueue shared design tokens + base styles on frontend and editor.
 * These provide --wbe-* CSS custom properties used by all blocks.
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		global $post;
		if ( ! $post || false === strpos( $post->post_content, '<!-- wp:wbcom-essential/' ) ) {
			return;
		}
		wp_enqueue_style(
			'wbe-design-tokens',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/design-tokens.css',
			array(),
			WBCOM_ESSENTIAL_VERSION
		);
		wp_enqueue_style(
			'wbe-base',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/base.css',
			array( 'wbe-design-tokens' ),
			WBCOM_ESSENTIAL_VERSION
		);
		wp_enqueue_style(
			'wbe-theme-isolation',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/theme-isolation.css',
			array( 'wbe-base' ),
			WBCOM_ESSENTIAL_VERSION
		);
	}
);
add_action(
	'enqueue_block_editor_assets',
	function () {
		// Lets an EDD block's editor skip REST routes that only exist while EDD is active.
		wp_add_inline_script(
			'wp-blocks',
			'window.wbeEditor = ' . wp_json_encode( array( 'eddActive' => class_exists( 'Easy_Digital_Downloads' ) ) ) . ';',
			'before'
		);
		wp_enqueue_style(
			'wbe-design-tokens',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/design-tokens.css',
			array(),
			WBCOM_ESSENTIAL_VERSION
		);
		wp_enqueue_style(
			'wbe-base',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/base.css',
			array( 'wbe-design-tokens' ),
			WBCOM_ESSENTIAL_VERSION
		);
		wp_enqueue_style(
			'wbe-theme-isolation',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/shared/theme-isolation.css',
			array( 'wbe-base' ),
			WBCOM_ESSENTIAL_VERSION
		);
	}
);

/**
 * Register block categories for all WBcom Essential blocks.
 */
add_filter(
	'block_categories_all',
	function ( $categories ) {
		$wbe_categories = array(
			array(
				'slug'  => 'essential-header',
				'title' => __( 'Essential - Header', 'wbcom-essential' ),
				'icon'  => 'screenoptions',
			),
			array(
				'slug'  => 'essential-design',
				'title' => __( 'Essential - Design', 'wbcom-essential' ),
				'icon'  => 'art',
			),
			array(
				'slug'  => 'essential-content',
				'title' => __( 'Essential - Content', 'wbcom-essential' ),
				'icon'  => 'edit',
			),
			array(
				'slug'  => 'essential-blog',
				'title' => __( 'Essential - Blog', 'wbcom-essential' ),
				'icon'  => 'admin-post',
			),
			array(
				'slug'  => 'essential-marketing',
				'title' => __( 'Essential - Marketing', 'wbcom-essential' ),
				'icon'  => 'megaphone',
			),
			array(
				'slug'  => 'essential-buddypress',
				'title' => __( 'Essential - BuddyPress', 'wbcom-essential' ),
				'icon'  => 'groups',
			),
			array(
				'slug'  => 'essential-woocommerce',
				'title' => __( 'Essential - WooCommerce', 'wbcom-essential' ),
				'icon'  => 'cart',
			),
			array(
				'slug'  => 'essential-edd',
				'title' => __( 'Essential - EDD', 'wbcom-essential' ),
				'icon'  => 'download',
			),
			array(
				'slug'  => 'wbcom-essential',
				'title' => __( 'WBcom Essential', 'wbcom-essential' ),
				'icon'  => 'screenoptions',
			),
		);

		// Avoid duplicate registration.
		$existing_slugs = array_column( $categories, 'slug' );
		foreach ( $wbe_categories as $cat ) {
			if ( ! in_array( $cat['slug'], $existing_slugs, true ) ) {
				array_unshift( $categories, $cat );
			}
		}

		return $categories;
	}
);

/**
 * Bootstrap block registration.
 *
 * Points to the build/blocks/ directory where compiled block.json + assets live.
 */
$wbcom_block_registrar = new \WBCOM_ESSENTIAL\Gutenberg\BlockRegistrar(
	WBCOM_ESSENTIAL_PATH . 'build/blocks/'
);
$wbcom_block_registrar->init();

/**
 * Register REST API routes for block editor.
 */
add_action(
	'rest_api_init',
	function () {
		// BuddyPress xProfile groups endpoint for profile-completion and members blocks.
		register_rest_route(
			'wbcom-essential/v1',
			'/xprofile-groups',
			array(
				'methods'             => 'GET',
				'callback'            => 'wbe_get_xprofile_groups',
				'permission_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
);

/**
 * Get BuddyPress xProfile groups for the block editor.
 *
 * @return WP_REST_Response
 */
function wbe_get_xprofile_groups() {
	$groups = array();

	if ( ! function_exists( 'bp_xprofile_get_groups' ) ) {
		return rest_ensure_response( $groups );
	}

	$profile_groups = bp_xprofile_get_groups();

	if ( ! empty( $profile_groups ) ) {
		foreach ( $profile_groups as $group ) {
			$groups[] = array(
				'id'   => $group->id,
				'name' => $group->name,
			);
		}
	}

	$photo_options = array();

	if ( function_exists( 'bp_disable_avatar_uploads' ) && ! bp_disable_avatar_uploads() ) {
		$photo_options[] = array(
			'id'   => 'profile_photo',
			'name' => __( 'Profile Photo', 'wbcom-essential' ),
		);
	}

	if ( function_exists( 'bp_disable_cover_image_uploads' ) && ! bp_disable_cover_image_uploads() ) {
		$photo_options[] = array(
			'id'   => 'cover_photo',
			'name' => __( 'Cover Photo', 'wbcom-essential' ),
		);
	}

	return rest_ensure_response(
		array(
			'fieldGroups'  => $groups,
			'photoOptions' => $photo_options,
		)
	);
}

/**
 * Enqueue EDD block-checkout theme compatibility CSS.
 *
 * Loaded on any page carrying EDD's checkout block, regardless of whether a
 * Wbcom checkout section is present — the field-alignment problem it fixes is
 * caused by a Reign/BuddyX rule colliding with EDD's own markup, so it applies
 * to stores that use none of our sections. See the stylesheet for the full
 * explanation and for where the lasting fix belongs.
 *
 * @since 4.7.0
 * @return void
 */
add_action(
	'wp_enqueue_scripts',
	function () {
		if ( ! function_exists( 'has_block' ) || ! has_block( 'edd/checkout' ) ) {
			return;
		}

		wp_enqueue_style(
			'wbe-edd-checkout-compat',
			WBCOM_ESSENTIAL_URL . 'plugins/gutenberg/assets/css/edd-checkout-compat.css',
			array(),
			WBCOM_ESSENTIAL_VERSION
		);
	}
);
