<?php
/**
 * BuddyPress - Groups Loop
 *
 * @link       https://wbcomdesigns.com/plugins
 * @since      1.0.0
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/templates/buddypress/groups
 */

bp_nouveau_before_loop(); ?>

<?php if ( bp_get_current_group_directory_type() ) : ?>
	<p class="current-group-type"><?php bp_current_group_directory_type_message(); ?></p>
<?php endif; ?>

<?php if ( bp_has_groups( bp_ajax_querystring( 'groups' ) . $query_string ) ) : ?>

	<?php bp_nouveau_pagination( 'top' ); ?>

	<ul id="groups-list" class="<?php bp_nouveau_loop_classes(); ?>">

		<?php
		while ( bp_groups() ) :
			bp_the_group();
			?>

			<li <?php bp_group_class( array( 'item-entry' ) ); ?> data-bp-item-id="<?php bp_group_id(); ?>" data-bp-item-component="groups">
				<div class="list-wrap">

					<?php if ( ! bp_disable_group_avatar_uploads() ) : ?>
						<div class="item-avatar">
							<?php if ( function_exists( 'buddypress' ) && version_compare( buddypress()->version, '12.0', '>=' ) ) : ?>
								<a href="<?php bp_group_url(); ?>"><?php bp_group_avatar( bp_nouveau_avatar_args() ); ?></a>
							<?php else : ?>
								<a href="<?php bp_group_permalink(); ?>"><?php bp_group_avatar( bp_nouveau_avatar_args() ); ?></a>
							<?php endif; ?>
						</div>
					<?php endif; ?>

					<div class="item">

						<div class="item-block">

							<h2 class="list-title groups-title"><?php bp_group_link(); ?></h2>

							<?php if ( bp_nouveau_group_has_meta() ) : ?>

								<p class="item-meta group-details"><?php bp_nouveau_the_group_meta( array( 'keys' => array( 'status', 'count' ) ) ); ?></p>

							<?php endif; ?>

							<p class="last-activity item-meta">
								<?php
									printf(
										/* translators: %s: last activity timestamp (e.g. "Active 1 hour ago") */
										esc_html__( 'Active %s', 'wbcom-essential' ),
										sprintf(
											'<span data-livestamp="%1$s">%2$s</span>',
											bp_core_get_iso8601_date( bp_get_group_last_active( 0, array( 'relative' => false ) ) ), // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
											esc_html( bp_get_group_last_active() )
										)
									);
								?>
							</p>

						</div>

						<div class="group-desc"><p><?php bp_nouveau_group_description_excerpt(); ?></p></div>

						<?php bp_nouveau_groups_loop_item(); ?>

						<?php bp_nouveau_groups_loop_buttons(); ?>

					</div>

				</div>

			</li>

		<?php endwhile; ?>

	</ul>

	<?php bp_nouveau_pagination( 'bottom' ); ?>

<?php else : ?>

	<?php bp_nouveau_user_feedback( 'groups-loop-none' ); ?>

<?php endif; ?>

<?php
bp_nouveau_after_loop();
