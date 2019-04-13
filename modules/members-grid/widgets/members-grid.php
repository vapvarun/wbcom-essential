<?php

namespace WbcomElementorAddons\Modules\MembersGrid\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Color;
use Elementor\Scheme_Typography;
use Elementor\Widget_Base;

if ( !defined( 'ABSPATH' ) )
	exit; // Exit if accessed directly

class MembersGrid extends Widget_Base {

	protected $nav_menu_index = 1;

	public function get_name() {
		return 'wbcom-members-grid';
	}

	public function get_title() {
		return __( 'Members Grid', 'wbcom-essential' );
	}

	public function get_icon() {
		return 'eicon-posts-grid';
	}

	public function get_categories() {
		return [ 'wbcom-elements' ];
	}

	protected function _register_controls() {

		$this->start_controls_section(
			'section_members_carousel',
			[
				'label' => esc_html__( 'Settings', 'wbcom-essential' ),
			]
		);

		$this->add_control(
			'type',
			[
				'label'   => esc_html__( 'Sort', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'newest',
				'options' => [
					'newest'  => esc_html__( 'Newest', 'wbcom-essential' ),
					'active'  => esc_html__( 'Most Active', 'wbcom-essential' ),
					'popular' => esc_html__( 'Most Popular', 'wbcom-essential' ),
				]
			]
		);

		$this->add_control(
			'total',
			[
				'label'       => __( 'Total members', 'wbcom-essential' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '12',
				'placeholder' => __( 'Total members', 'wbcom-essential' ),
			]
		);

		$this->add_control(
			'columns',
			[
				'label'   => esc_html__( 'Columns', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => '4',
				'options' => [
					'3'  => '3',
					'4'  => '4',
				]
			]
		);

		$this->add_control(
			'rg-mem-grid-layout',
			[
				'label'   => esc_html__( 'Layout', 'wbcom-essential' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'wbtm-member-directory-type-2',
				'options' => [
					'wbtm-member-directory-type-1'  => 'Layout 1',
					'wbtm-member-directory-type-2'  => 'Layout 2',
					'wbtm-member-directory-type-3'  => 'Layout 3',
					'wbtm-member-directory-type-4'  => 'Layout 4',
				]
			]
		);

		$this->end_controls_section();

		do_action( 'reign_wp_menu_elementor_controls', $this );
	}

	/**
	 * Render our custom menu onto the page.
	 */
	protected function render() {

		if ( ! function_exists( 'bp_is_active' ) ) {
			esc_html_e( 'You need BuddyPress plugin to be active!', 'seeko' );
			return;
		}

		$settings = $this->get_settings();
		$rand = mt_rand(99, 999);

		global $members_template;

		// if ($settings['columns'] == '5') {
		// 	$layout = 'full';
		// } else {
		// 	$layout = 'four';
		// }

		$member_directory_type = $settings['rg-mem-grid-layout'];
		if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
			$img_class = 'img-card';
		}
					
		$query_string = '&type=' . $settings['type'] . '&per_page=' . $settings['total'] . '&max=' . $settings['total'];

		$active_template = get_option('_bp_theme_package_id');
		if( 'legacy' == $active_template ){ ?>
			<div id="members-dir-list" class="members dir-list">
				<?php
				if ( bp_has_members( bp_ajax_querystring( 'members' ) . $query_string ) ) : ?>

					<?php
						/**
						 * Fires before the display of the members list.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_before_directory_members_list' );
					?>
					<ul id="members-list" class="item-list rg-member-list wb-grid <?php echo $member_directory_type;?>" aria-live="assertive" aria-relevant="all">

						<?php
						while ( bp_members() ) :
							bp_the_member();
							?>
							<?php $user_id = bp_get_member_user_id(); ?>
							<li <?php bp_member_class( array( 'wb-grid-cell sm-wb-grid-1-1 md-wb-grid-1-2 lg-wb-grid-1-'.$settings['columns'].'' ) ); ?>>
								<div class="bp-inner-wrap">

									<?php  
									if ( $member_directory_type == 'wbtm-member-directory-type-2' || $member_directory_type == 'wbtm-member-directory-type-3' ) {
										$args			 = array(
											'object_dir' => 'members',
											'item_id'	 => $user_id	 = bp_get_member_user_id(),
											'type'		 => 'cover-image',
										);
										$cover_img_url	 = bp_attachments_get_attachment( 'url', $args );
										if ( empty( $cover_img_url ) ) {
											$cover_img_url	 = isset( $wbtm_reign_settings[ 'reign_buddyextender' ][ 'default_xprofile_cover_image_url' ] ) ? $wbtm_reign_settings[ 'reign_buddyextender' ][ 'default_xprofile_cover_image_url' ] : REIGN_INC_DIR_URI . 'reign-settings/imgs/default-mem-cover.jpg';
											if( empty( $cover_img_url ) ) {
												$cover_img_url = REIGN_INC_DIR_URI . 'reign-settings/imgs/default-mem-cover.jpg';
											}
										}
										echo '<div class="wbtm-mem-cover-img"><img src="' . $cover_img_url . '" /></div>';
									}
									?>

									<div class="item-avatar">
										<?php
										if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
											echo '<figure class="img-dynamic aspect-ratio avatar">';
										}
										?>
										<a class="<?php echo $img_class; ?>" href="<?php bp_member_permalink(); ?>"><?php bp_member_avatar(); ?><?php echo reign_get_online_status( $user_id ); ?></a>
										<?php
										if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
											echo '</figure>';
										}
										?>
									</div>

									<?php
									if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
										echo '<div class="item-wrapper">';
									}
									?>

									<div class="item">

										<div class="item-title">
											<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>
											<?php if ( bp_get_member_latest_update() ) : ?>
												<span class="update"> <?php bp_member_latest_update(); ?></span>
											<?php endif; ?>
										</div>

										<div class="item-meta">
											<span class="activity" data-livestamp="<?php bp_core_iso8601_date( bp_get_member_last_active( array( 'relative' => false ) ) ); ?>"><?php bp_member_last_active(); ?></span>
										</div>

										<?php
										/**
										 * Fires inside the display of a directory member item.
										 *
										 * @since 1.1.0
										 */
										if ( $member_directory_type != 'wbtm-member-directory-type-1' ) {
											do_action( 'bp_directory_members_item' );
										}
										?>
									</div>
									<div class="action-wrap">
										<i class="fa fa-plus-circle"></i>
										<div class="action rg-dropdown"><?php do_action( 'bp_directory_members_actions' ); ?></div>
									</div>

									<?php
									if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
										echo '</div>';
									}
									?>

								</div>
							</li>
						<?php endwhile; ?>
					</ul>

					<?php
					/**
					 * Fires after the display of the members list.
					 *
					 * @since 1.1.0
					 */
					do_action( 'bp_after_directory_members_list' );
					?>

					<?php bp_member_hidden_fields(); ?>
					<?php else : ?>

						<div id="message" class="info">
							<p><?php _e( 'Sorry, no members were found.', 'buddypress' ); ?></p>
						</div>
				<?php endif; ?>
			</div><?php
		}elseif( 'nouveau' == $active_template ){ ?>
			<div id="members-dir-list" class="members dir-list"><?php 
					if ( bp_has_members( bp_ajax_querystring( 'members' ) . $query_string ) ) : 
						$col_class = $settings['columns'];
						if( $col_class == '4' ){
							$_col_class = 'four';
						}elseif( $col_class == '3' ){
							$_col_class = 'three';
						}
						?>
						<ul id="members-list" class="rg-member-list members-list bp-list grid <?php echo $_col_class.' '.$member_directory_type;?>">

							<?php while ( bp_members() ) : bp_the_member(); ?>
								<?php $user_id = bp_get_member_user_id(); ?>
								<li <?php bp_member_class( array( 'item-entry' ) ); ?> data-bp-item-id="<?php bp_member_user_id(); ?>" data-bp-item-component="members">
									<div class="list-wrap">
										<?php do_action( 'wbtm_before_member_avatar_member_directory' ); ?>
										<div class="item-avatar">
											<?php
											if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
												echo '<figure class="img-dynamic aspect-ratio avatar">';
											}
											?>
											<a class="<?php echo $img_class; ?>" href="<?php bp_member_permalink(); ?>"><?php bp_member_avatar( bp_nouveau_avatar_args() ); ?><?php echo reign_get_online_status( $user_id ); ?></a>
											<?php
											if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
												echo '</figure>';
											}
											?>
										</div>
										<?php
										if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
											echo '<div class="item-wrapper">';
										}
										?>
										<div class="item">
											<div class="item-block">
												<h2 class="list-title member-name">
													<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>
												</h2>

												<?php if ( bp_nouveau_member_has_meta() ) : ?>
													<p class="item-meta last-activity">
														<?php bp_nouveau_member_meta(); ?>
													</p><!-- #item-meta -->
												<?php endif; ?>

												<?php do_action( 'wbtm_bp_nouveau_directory_members_item' ); ?>
											</div>

											<?php if ( FALSE && bp_get_member_latest_update() && !bp_nouveau_loop_is_grid() ) : ?>
												<div class="user-update">
													<p class="update"> <?php bp_member_latest_update(); ?></p>
												</div>
											<?php endif; ?>
										</div><!-- // .item -->
										<div class="action-wrap">
											<i class="fa fa-plus-circle"></i>
											<?php
											bp_nouveau_members_loop_buttons(
												array(
													'container'		 => 'ul',
													'button_element' => 'button',
												)
											);
											?>
										</div>
										<?php
										if ( $member_directory_type == 'wbtm-member-directory-type-4' ) {
											echo '</div>';
										}
										?>
									</div>
								</li>

							<?php endwhile; ?>

						</ul>
						<?php
					else :
					bp_nouveau_user_feedback( 'members-loop-none' );
					endif; ?>
			</div>
		<?php }

	}
	/**
	 * This is outputted while rending the page.
	 */
	protected function content_template() {
		?>
		<div class="reign-wp-menu-content-area">
		</div>
		<?php
	}

}
