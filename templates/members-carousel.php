<!-- Slider main container -->
<div class="wbcom-essential-member-carousel">
  <!-- Additional required wrapper -->
  <div class="swiper-wrapper">
		<?php if ( bp_has_members( bp_ajax_querystring( 'members' ) . $query_string ) ) : ?>
			<?php
			while ( bp_members() ) :
					bp_the_member();
				?>
				<div class="swiper-slide">
					<div <?php bp_member_class(); ?>>
						<div class="item-container">
							<div class="item-avatar">
								<figure class="img-dynamic aspect-ratio avatar">
									<a class="img-card" href="<?php bp_member_permalink(); ?>">
										<?php bp_member_avatar(); ?>
									</a>
								</figure>
							</div>
							<div class="item-card">
								<div class="item">
									<div class="item-meta">
										<span class="activity" data-livestamp="<?php bp_core_iso8601_date( bp_get_member_last_active( array( 'relative' => false ) ) ); ?>">
											<?php bp_member_last_active(); ?>
										</span>
									</div>
									<h4 class="item-title h5">
										<a href="<?php bp_member_permalink(); ?>"><?php bp_member_name(); ?></a>
									</h4>
									<?php
									/**
									 * Fires inside the display of a directory member item.
									 *
									 * @since 1.1.0
									 */
									do_action( 'bp_directory_members_item' );
									?>
									<?php
									/***
									 * If you want to show specific profile fields here you can,
									 * but it'll add an extra query for each member in the loop
									 * (only one regardless of the number of fields you show):
									 *
									 * bp_member_profile_data( 'field=the field name' );
									 */
									?>
								</div>
								<div class="action">
								<?php

									/**
									 * Fires inside the members action HTML markup to display actions.
									 *
									 * @since 1.1.0
									 */
									do_action( 'bp_directory_members_actions' );
								?>
									</div>
							</div>
						</div>
					</div>
				</div>
				<?php
		endwhile;
		else :
			esc_html_e( 'No members found by the criteria.', 'wbcom-essential' );
		endif;
		?>
	</div>
  <!-- If we need pagination -->
  <div class="swiper-pagination"></div>

  <!-- If we need navigation buttons -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>

  <!-- If we need scrollbar -->
  <div class="swiper-scrollbar"></div>
</div>
