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

// Initialize shared infrastructure.
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::init();
\WBCOM_ESSENTIAL\Gutenberg\WBE_Schema::init();
\WBCOM_ESSENTIAL\Gutenberg\WBE_Fonts::init();

/**
 * Register the "wbcom-essential" block category so all blocks are grouped together.
 */
add_filter(
	'block_categories_all',
	function ( $categories ) {
		// Avoid duplicate registration.
		foreach ( $categories as $cat ) {
			if ( 'wbcom-essential' === $cat['slug'] ) {
				return $categories;
			}
		}

		array_unshift(
			$categories,
			array(
				'slug'  => 'wbcom-essential',
				'title' => __( 'WBcom Essential', 'wbcom-essential' ),
				'icon'  => 'screenoptions',
			)
		);

		return $categories;
	}
);

/**
 * Bootstrap block registration.
 *
 * Points to the build/blocks/ directory where compiled block.json + assets live.
 */
$wbcom_block_registrar = new \WBCOM_ESSENTIAL\Gutenberg\BlockRegistrar(
	__DIR__ . '/build/blocks/'
);
$wbcom_block_registrar->init();

/**
 * Register custom REST endpoints for blocks that need pre-calculated data.
 */
add_action(
	'rest_api_init',
	function () {
		// Profile Completion endpoint.
		register_rest_route(
			'wbcom-essential/v1',
			'/profile-completion',
			array(
				'methods'             => 'GET',
				'permission_callback' => 'is_user_logged_in',
				'callback'            => function ( WP_REST_Request $request ) {
					if ( ! function_exists( 'buddypress' ) || ! bp_is_active( 'xprofile' ) ) {
						return new WP_Error( 'bp_inactive', 'BuddyPress xProfile is not active.', array( 'status' => 500 ) );
					}

					$user_id = bp_loggedin_user_id();

					// Parse selected groups.
					$groups_param    = $request->get_param( 'selected_groups' );
					$selected_groups = array();
					if ( ! empty( $groups_param ) ) {
						$selected_groups = array_map( 'absint', explode( ',', $groups_param ) );
					}

					// If none specified, use all groups.
					if ( empty( $selected_groups ) ) {
						$all_groups = bp_xprofile_get_groups();
						if ( ! empty( $all_groups ) ) {
							$selected_groups = wp_list_pluck( $all_groups, 'id' );
						}
					}

					$check_photo = $request->get_param( 'check_photo' ) !== false;
					$check_cover = $request->get_param( 'check_cover' ) !== false;

					// Calculate completion from xProfile data using proper BP API.
					$total_fields     = 0;
					$completed_fields = 0;
					$groups_data      = array();

					$fetch_args = array(
						'fetch_fields'     => true,
						'user_id'          => $user_id,
						'fetch_field_data' => true,
					);
					if ( ! empty( $selected_groups ) ) {
						$fetch_args['profile_group_id'] = $selected_groups;
					}

					$xprofile_groups = bp_xprofile_get_groups( $fetch_args );

					foreach ( $xprofile_groups as $group ) {
						$group_total = 0;
						$group_done  = 0;

						if ( ! empty( $group->fields ) ) {
							foreach ( $group->fields as $field ) {
								if ( $field->parent_id > 0 ) {
									continue; // Skip child options.
								}
								$group_total++;
								$total_fields++;

								$value = isset( $field->data ) ? $field->data->value : '';
								if ( ! empty( $value ) && '0000-00-00 00:00:00' !== $value ) {
									$group_done++;
									$completed_fields++;
								}
							}
						}

						$edit_link = trailingslashit( bp_members_get_user_url( $user_id ) ) . 'profile/edit/group/' . $group->id . '/';

						$groups_data[] = array(
							'id'        => (int) $group->id,
							'label'     => $group->name,
							'completed' => $group_done,
							'total'     => $group_total,
							'is_done'   => $group_done === $group_total,
							'link'      => $edit_link,
						);
					}

					// Check photos.
					if ( $check_photo && ! bp_disable_avatar_uploads() ) {
						$total_fields++;
						if ( bp_get_user_has_avatar( $user_id ) ) {
							$completed_fields++;
						}
					}

					if ( $check_cover && function_exists( 'bp_disable_cover_image_uploads' ) && ! bp_disable_cover_image_uploads() ) {
						$total_fields++;
						$cover = bp_attachments_get_attachment( 'url', array(
							'object_dir' => 'members',
							'item_id'    => $user_id,
						) );
						if ( ! empty( $cover ) ) {
							$completed_fields++;
						}
					}

					$percentage = $total_fields > 0 ? round( ( $completed_fields / $total_fields ) * 100 ) : 0;

					return rest_ensure_response( array(
						'percentage' => $percentage,
						'completed'  => $completed_fields,
						'total'      => $total_fields,
						'groups'     => $groups_data,
					) );
				},
				'args'                => array(
					'selected_groups' => array(
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'check_photo'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'check_cover'     => array(
						'type'    => 'boolean',
						'default' => true,
					),
				),
			)
		);
	}
);
