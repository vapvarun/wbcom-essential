<div>
	<div class="row mb-3">
		<div class="col-12 d-flex justify-content-between">
			<a href="#" class="wbcom-slick-prev btn btn-xs" data-carousel="slick-<?php echo esc_attr( $rand ); ?>-0">
				<i class="icon icon-arrow-left"></i>
			</a>
			<a href="#" class="wbcom-slick-next btn btn-xs" data-carousel="slick-<?php echo esc_attr( $rand ); ?>-0">
				<i class="icon icon-arrow-right"></i>
			</a>
		</div>
	</div>

  <section class="item-list wbcom-slick row" data-carousel="slick-<?php echo esc_attr( $rand ); ?>"
			 data-arrows="false" data-infinite="true"
			 data-dd-show-slides="<?php echo esc_attr( $settings['visible-dd'] ); ?>"
			 data-lg-show-slides="<?php echo esc_attr( $settings['visible-lg'] ); ?>"
			 data-md-show-slides="<?php echo esc_attr( $settings['visible-md'] ); ?>"
			 data-sm-show-slides="<?php echo esc_attr( $settings['visible-sm'] ); ?>"
			 data-xs-show-slides="<?php echo esc_attr( $settings['visible-xs'] ); ?>"
			 data-scroll-slides="<?php echo esc_attr( $settings['scroll'] ); ?>">

		<?php
		if ( bp_has_members( bp_ajax_querystring( 'members' ) . $query_string ) ) :

			while ( bp_members() ) :
				bp_the_member();
				?>
			<div class="col-lg-3">
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
	</section>
</div>
