<?php
/**
 * Server-side render for the EDD Checkout Recommendations block.
 *
 * Split out of the former EDD Enhanced Checkout wrapper in 4.7.0. EDD 3.7 made
 * `edd/checkout` a parent of inner blocks, so these sections now sit inside it
 * as siblings of EDD's own cart / personal-info / payment blocks instead of
 * being wrapped by a block of ours. That keeps our code out of the checkout
 * layout path entirely.
 *
 * @package WBCOM_Essential
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Block content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Bail early if EDD is not active.
if ( ! class_exists( 'Easy_Digital_Downloads' ) ) {
	echo '<div class="wbcom-edd-checkout__notice">';
	echo '<p>' . esc_html__( 'Easy Digital Downloads is required for this block.', 'wbcom-essential' ) . '</p>';
	echo '</div>';
	return;
}

// Shared infrastructure: unique ID + CSS output + visibility classes.
$unique_id   = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : '';
$vis_classes = \WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::get_visibility_classes( $attributes );
\WBCOM_ESSENTIAL\Gutenberg\WBE_CSS::add( $unique_id, $attributes );

$block_id = ! empty( $unique_id ) ? 'wbcom-edd-checkout-recommendations-' . $unique_id : wp_unique_id( 'wbcom-edd-checkout-recommendations-' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbcom-edd-checkout ' . $vis_classes ),
		'id'    => esc_attr( $block_id ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

<?php
$recommendation_count = $attributes['recommendationCount'] ?? 3;
?>
	<?php
	// Product recommendations section.
	if ( function_exists( 'edd_rp_get_multi_suggestions' ) ) :
		$cart_contents = edd_get_cart_contents();

		if ( ! empty( $cart_contents ) ) :
			$cart_ids        = wp_list_pluck( $cart_contents, 'id' );
			$user_id         = is_user_logged_in() ? get_current_user_id() : false;
			$recommendations = edd_rp_get_multi_suggestions( $cart_ids, $user_id, $recommendation_count );

			if ( ! empty( $recommendations ) ) :
				?>
				<div class="wbcom-edd-checkout__recommendations">
					<h3 class="wbcom-edd-checkout__recommendations-title"><?php esc_html_e( 'Customers Also Purchased', 'wbcom-essential' ); ?></h3>
					<div class="wbcom-edd-checkout__recommendations-grid">
						<?php
						foreach ( $recommendations as $download_id => $count ) :
							$download = edd_get_download( $download_id );
							if ( ! $download ) {
								continue;
							}
							$price     = edd_price( $download_id, false );
							$thumbnail = get_the_post_thumbnail( $download_id, 'thumbnail' );
							$permalink = get_permalink( $download_id );

							// Get review data if EDD Reviews is active.
							$rec_rating = 0;
							$rec_count  = 0;
							if ( function_exists( 'edd_reviews' ) && edd_reviews() ) {
								// Detach EDD Reviews' pre_get_comments filter that
								// globally adds edd_review to type__not_in.
								$rec_rev_obj  = edd_reviews();
								$rec_has_hide = $rec_rev_obj && has_action( 'pre_get_comments', array( $rec_rev_obj, 'hide_reviews' ) );
								if ( $rec_has_hide ) {
									remove_action( 'pre_get_comments', array( $rec_rev_obj, 'hide_reviews' ) );
								}

								$rec_reviews = get_comments(
									array(
										'post_id' => $download_id,
										'type'    => 'edd_review',
										'status'  => 'approve',
										'count'   => true,
									)
								);
								$rec_count   = (int) $rec_reviews;
								if ( $rec_count > 0 ) {
									$ratings_sum = 0;
									$review_objs = get_comments(
										array(
											'post_id' => $download_id,
											'type'    => 'edd_review',
											'status'  => 'approve',
											'number'  => 100,
										)
									);
									foreach ( $review_objs as $ro ) {
										$ratings_sum += (int) get_comment_meta( $ro->comment_ID, 'edd_rating', true );
									}
									$rec_rating = round( $ratings_sum / $rec_count, 1 );
								}

								if ( $rec_has_hide ) {
									add_action( 'pre_get_comments', array( $rec_rev_obj, 'hide_reviews' ) );
								}
							}
							?>
							<div class="wbcom-edd-checkout__rec-card">
								<?php if ( $thumbnail ) : ?>
									<a href="<?php echo esc_url( $permalink ); ?>" class="wbcom-edd-checkout__rec-thumb">
										<?php echo $thumbnail; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- WordPress core function ?>
									</a>
								<?php endif; ?>
								<div class="wbcom-edd-checkout__rec-info">
									<a href="<?php echo esc_url( $permalink ); ?>" class="wbcom-edd-checkout__rec-name"><?php echo esc_html( get_the_title( $download_id ) ); ?></a>
									<?php if ( $rec_rating > 0 ) : ?>
										<div class="wbcom-edd-checkout__rec-rating">
											<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
												<svg class="wbcom-edd-checkout__star <?php echo $i <= round( $rec_rating ) ? 'wbcom-edd-checkout__star--filled' : 'wbcom-edd-checkout__star--empty'; ?>" viewBox="0 0 20 20" width="12" height="12" aria-hidden="true"><path d="M10 1l2.4 5.5L18 7.3l-4 4.2 1 5.9L10 14.8l-5 2.6 1-5.9-4-4.2 5.6-.8z" fill="currentColor"/></svg>
											<?php endfor; ?>
											<span class="wbcom-edd-checkout__rec-review-count">(<?php echo esc_html( $rec_count ); ?>)</span>
										</div>
									<?php endif; ?>
									<div class="wbcom-edd-checkout__rec-price"><?php echo wp_kses_post( $price ); ?></div>
								</div>
								<div class="wbcom-edd-checkout__rec-action">
									<?php
									// edd_get_purchase_link() returns escaped HTML built by EDD core.
									echo wp_kses_post(
										edd_get_purchase_link(
											array(
												'download_id' => $download_id,
												'text'  => __( 'Add to Cart', 'wbcom-essential' ),
												'style' => 'button',
												'class' => 'wbcom-edd-checkout__rec-btn',
											)
										)
									);
									?>
								</div>
							</div>
						<?php endforeach; ?>
					</div>
				</div>
			<?php endif; ?>
		<?php endif; ?>
	<?php endif; ?>

</div>
