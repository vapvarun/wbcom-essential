<?php
/**
 * Server-side render for the EDD Checkout Social Proof block.
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

$block_id = ! empty( $unique_id ) ? 'wbcom-edd-checkout-social-' . $unique_id : wp_unique_id( 'wbcom-edd-checkout-social-' );

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => trim( 'wbe-block-' . esc_attr( $unique_id ) . ' wbcom-edd-checkout ' . $vis_classes ),
		'id'    => esc_attr( $block_id ),
	)
);
?>
<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>

<?php
$show_reviews = $attributes['showReviews'] ?? true;
$review_count = $attributes['reviewCount'] ?? 3;
?>
	<?php
	// Trustpilot social proof — uses block attributes, with filter fallback.
	$show_trustpilot = $attributes['showTrustpilot'] ?? true;
	$tp_reviews_attr = $attributes['trustpilotReviews'] ?? array();

	$trustpilot = apply_filters(
		'wbcom_edd_checkout_trustpilot',
		array(
			'enabled' => $show_trustpilot,
			'rating'  => (float) ( $attributes['trustpilotRating'] ?? 4.7 ),
			'total'   => (int) ( $attributes['trustpilotCount'] ?? 0 ),
			'url'     => $attributes['trustpilotUrl'] ?? '',
			'reviews' => $tp_reviews_attr,
		)
	);

	if ( ! empty( $trustpilot['enabled'] ) && ! empty( $trustpilot['reviews'] ) ) :
		$tp_rating = (float) $trustpilot['rating'];
		$tp_total  = (int) $trustpilot['total'];
		$tp_url    = $trustpilot['url'];
		?>
		<div class="wbcom-edd-checkout__trustpilot">
			<div class="wbcom-edd-checkout__trustpilot-header">
				<div class="wbcom-edd-checkout__trustpilot-brand">
					<svg viewBox="0 0 126 31" width="90" height="22" aria-hidden="true"><path d="M33.3 12.1h-5.7l-1.8-5.5-1.8 5.5h-5.7l4.6 3.4-1.8 5.5 4.7-3.4 4.7 3.4-1.8-5.5 4.6-3.4z" fill="#00B67A"/><path d="M29.3 18.7l-.4-1.2-3 2.2 3.4-1z" fill="#005128"/></svg>
					<span class="wbcom-edd-checkout__trustpilot-label">Trustpilot</span>
				</div>
				<div class="wbcom-edd-checkout__trustpilot-rating">
					<div class="wbcom-edd-checkout__trustpilot-stars" aria-label="<?php echo esc_attr( sprintf( '%s out of 5', $tp_rating ) ); ?>">
						<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
							<svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
								<rect width="20" height="20" rx="2" fill="<?php echo $i <= floor( $tp_rating ) ? '#00B67A' : ( $i - $tp_rating < 1 ? '#73CF11' : '#dcdce6' ); ?>"/>
								<path d="M10 3l1.8 4.2L16 7.8l-3 3.2.8 4.4L10 13l-3.8 2.4.8-4.4-3-3.2 4.2-.6z" fill="#fff"/>
							</svg>
						<?php endfor; ?>
					</div>
					<span class="wbcom-edd-checkout__trustpilot-score">
						<strong><?php echo esc_html( $tp_rating ); ?></strong>/5
					</span>
					<?php if ( $tp_url ) : ?>
						<a href="<?php echo esc_url( $tp_url ); ?>" class="wbcom-edd-checkout__trustpilot-count" target="_blank" rel="noopener noreferrer">
							<?php
							printf(
								/* translators: %d: number of reviews */
								esc_html__( 'Based on %d reviews', 'wbcom-essential' ),
								(int) $tp_total
							);
							?>
						</a>
					<?php endif; ?>
				</div>
			</div>
			<div class="wbcom-edd-checkout__trustpilot-reviews">
				<?php foreach ( $trustpilot['reviews'] as $tp_review ) : ?>
					<div class="wbcom-edd-checkout__trustpilot-card">
						<div class="wbcom-edd-checkout__trustpilot-card-stars">
							<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
								<svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
									<rect width="20" height="20" rx="2" fill="<?php echo $i <= (int) $tp_review['stars'] ? '#00B67A' : '#dcdce6'; ?>"/>
									<path d="M10 3l1.8 4.2L16 7.8l-3 3.2.8 4.4L10 13l-3.8 2.4.8-4.4-3-3.2 4.2-.6z" fill="#fff"/>
								</svg>
							<?php endfor; ?>
						</div>
						<p class="wbcom-edd-checkout__trustpilot-card-title"><?php echo esc_html( $tp_review['title'] ); ?></p>
						<p class="wbcom-edd-checkout__trustpilot-card-text"><?php echo esc_html( $tp_review['text'] ); ?></p>
						<span class="wbcom-edd-checkout__trustpilot-card-author"><?php echo esc_html( $tp_review['name'] ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	<?php endif; ?>
	<?php
	// Reviews social proof section.
	if ( $show_reviews && function_exists( 'edd_reviews' ) && edd_reviews() ) :
		$cart_contents = edd_get_cart_contents();
		$product_ids   = array();

		if ( ! empty( $cart_contents ) ) {
			$product_ids = wp_list_pluck( $cart_contents, 'id' );
		}

		// EDD Reviews globally adds `edd_review` to `type__not_in` via a
		// pre_get_comments hook, so a plain get_comments(type=edd_review)
		// always returns 0 rows. Temporarily detach the filter, query,
		// then re-attach so other pages keep the default behaviour.
		$edd_reviews_obj = edd_reviews();
		$has_hide_filter = $edd_reviews_obj && has_action( 'pre_get_comments', array( $edd_reviews_obj, 'hide_reviews' ) );
		if ( $has_hide_filter ) {
			remove_action( 'pre_get_comments', array( $edd_reviews_obj, 'hide_reviews' ) );
		}

		// Gather reviews from cart products, or fallback to all recent reviews.
		$all_reviews = array();

		if ( ! empty( $product_ids ) ) {
			foreach ( $product_ids as $pid ) {
				$product_reviews = get_comments(
					array(
						'post_id' => $pid,
						'type'    => 'edd_review',
						'status'  => 'approve',
						'number'  => $review_count,
						'orderby' => 'comment_date_gmt',
						'order'   => 'DESC',
					)
				);
				if ( ! empty( $product_reviews ) ) {
					$all_reviews = array_merge( $all_reviews, $product_reviews );
				}
			}
		}

		// Fallback: get recent reviews from any product.
		if ( empty( $all_reviews ) ) {
			$all_reviews = get_comments(
				array(
					'type'    => 'edd_review',
					'status'  => 'approve',
					'number'  => $review_count,
					'orderby' => 'comment_date_gmt',
					'order'   => 'DESC',
				)
			);
		}

		if ( $has_hide_filter ) {
			add_action( 'pre_get_comments', array( $edd_reviews_obj, 'hide_reviews' ) );
		}

		// Deduplicate and limit.
		$seen_ids = array();
		$unique   = array();
		foreach ( $all_reviews as $r ) {
			if ( ! isset( $seen_ids[ $r->comment_ID ] ) ) {
				$seen_ids[ $r->comment_ID ] = true;
				$unique[]                   = $r;
			}
			if ( count( $unique ) >= $review_count ) {
				break;
			}
		}
		$all_reviews = $unique;

		if ( ! empty( $all_reviews ) ) :
			// Calculate aggregate stats.
			$total_rating = 0;
			$rating_count = 0;
			foreach ( $all_reviews as $rev ) {
				$rating = (int) get_comment_meta( $rev->comment_ID, 'edd_rating', true );
				if ( $rating > 0 ) {
					$total_rating += $rating;
					++$rating_count;
				}
			}
			$avg_rating = $rating_count > 0 ? round( $total_rating / $rating_count, 1 ) : 0;
			?>
			<div class="wbcom-edd-checkout__reviews">
				<div class="wbcom-edd-checkout__reviews-header">
					<h3 class="wbcom-edd-checkout__reviews-title"><?php esc_html_e( 'What Our Customers Say', 'wbcom-essential' ); ?></h3>
					<?php if ( $avg_rating > 0 ) : ?>
						<div class="wbcom-edd-checkout__reviews-aggregate">
							<div class="wbcom-edd-checkout__reviews-stars" aria-label="<?php echo esc_attr( sprintf( '%s out of 5 stars', $avg_rating ) ); ?>">
								<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
									<?php if ( $i <= floor( $avg_rating ) ) : ?>
										<svg class="wbcom-edd-checkout__star wbcom-edd-checkout__star--filled" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M10 1l2.4 5.5L18 7.3l-4 4.2 1 5.9L10 14.8l-5 2.6 1-5.9-4-4.2 5.6-.8z" fill="currentColor"/></svg>
									<?php elseif ( $i - $avg_rating < 1 ) : ?>
										<svg class="wbcom-edd-checkout__star wbcom-edd-checkout__star--half" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><defs><linearGradient id="half-<?php echo esc_attr( $block_id ); ?>"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#e2e8f0"/></linearGradient></defs><path d="M10 1l2.4 5.5L18 7.3l-4 4.2 1 5.9L10 14.8l-5 2.6 1-5.9-4-4.2 5.6-.8z" fill="url(#half-<?php echo esc_attr( $block_id ); ?>)"/></svg>
									<?php else : ?>
										<svg class="wbcom-edd-checkout__star wbcom-edd-checkout__star--empty" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M10 1l2.4 5.5L18 7.3l-4 4.2 1 5.9L10 14.8l-5 2.6 1-5.9-4-4.2 5.6-.8z" fill="currentColor"/></svg>
									<?php endif; ?>
								<?php endfor; ?>
							</div>
							<span class="wbcom-edd-checkout__reviews-avg"><?php echo esc_html( $avg_rating ); ?>/5</span>
							<span class="wbcom-edd-checkout__reviews-count">
								<?php
								printf(
									/* translators: %d: Number of reviews. */
									esc_html( _n( 'from %d review', 'from %d reviews', $rating_count, 'wbcom-essential' ) ),
									(int) $rating_count
								);
								?>
							</span>
						</div>
					<?php endif; ?>
				</div>

				<div class="wbcom-edd-checkout__reviews-grid">
					<?php
					foreach ( $all_reviews as $review ) :
						$rating       = (int) get_comment_meta( $review->comment_ID, 'edd_rating', true );
						$review_title = get_comment_meta( $review->comment_ID, 'edd_review_title', true );
						$author       = $review->comment_author;
						$content      = wp_trim_words( $review->comment_content, 25, '...' );
						$product      = get_the_title( $review->comment_post_ID );
						?>
						<div class="wbcom-edd-checkout__review-card">
							<div class="wbcom-edd-checkout__review-stars" aria-label="<?php echo esc_attr( sprintf( '%d out of 5 stars', $rating ) ); ?>">
								<?php for ( $i = 1; $i <= 5; $i++ ) : ?>
									<svg class="wbcom-edd-checkout__star <?php echo $i <= $rating ? 'wbcom-edd-checkout__star--filled' : 'wbcom-edd-checkout__star--empty'; ?>" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true"><path d="M10 1l2.4 5.5L18 7.3l-4 4.2 1 5.9L10 14.8l-5 2.6 1-5.9-4-4.2 5.6-.8z" fill="currentColor"/></svg>
								<?php endfor; ?>
							</div>
							<?php if ( $review_title ) : ?>
								<p class="wbcom-edd-checkout__review-title"><?php echo esc_html( $review_title ); ?></p>
							<?php endif; ?>
							<p class="wbcom-edd-checkout__review-text"><?php echo esc_html( $content ); ?></p>
							<div class="wbcom-edd-checkout__review-meta">
								<span class="wbcom-edd-checkout__review-author"><?php echo esc_html( $author ); ?></span>
								<?php if ( $product ) : ?>
									<span class="wbcom-edd-checkout__review-product"><?php echo esc_html( $product ); ?></span>
								<?php endif; ?>
							</div>
						</div>
					<?php endforeach; ?>
				</div>
			</div>
		<?php endif; ?>
	<?php endif; ?>
</div>
