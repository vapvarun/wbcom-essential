<?php
/**
 * Template: Classic
 *
 * Content + right sidebar layout using CSS Grid.
 * Single column on mobile, 1fr 320px on desktop.
 * Falls back to full-width when sidebar has no widgets.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/templates/single-post
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$wbcom_partials    = WBCOM_ESSENTIAL_PATH . 'templates/single-post/partials/';
/**
 * Sidebars the Classic template looks for, in order; the first one with widgets is shown.
 * Core themes use sidebar-1; Reign, BuddyX and BuddyX Pro use sidebar-right.
 *
 * @param string[] $wbcom_sidebars Sidebar IDs.
 */
$wbcom_sidebar     = '';
$wbcom_sidebar_ids = (array) apply_filters( 'wbcom_essential_single_post_sidebars', array( 'sidebar-1', 'sidebar-right' ) );
foreach ( $wbcom_sidebar_ids as $wbcom_sidebar_id ) {
	if ( is_active_sidebar( $wbcom_sidebar_id ) ) {
		$wbcom_sidebar = $wbcom_sidebar_id;
		break;
	}
}
$wbcom_has_sidebar = '' !== $wbcom_sidebar;
?>

<div class="wbcom-sp wbcom-sp--classic<?php echo ! $wbcom_has_sidebar ? ' wbcom-sp--no-sidebar' : ''; ?>">
	<div class="wbcom-sp__container">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<div class="wbcom-sp__grid">
				<main class="wbcom-sp__main" id="wbcom-sp-content">
					<article <?php post_class( 'wbcom-sp__article' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?>
							<figure class="wbcom-sp__featured-image">
								<?php the_post_thumbnail( 'large' ); ?>
							</figure>
						<?php endif; ?>

						<header class="wbcom-sp__header">
							<?php the_title( '<h1 class="wbcom-sp__title">', '</h1>' ); ?>
							<div class="wbcom-sp__meta">
								<span class="wbcom-sp__meta-author">
									<?php echo get_avatar( get_the_author_meta( 'ID' ), 32 ); ?>
									<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
										<?php the_author(); ?>
									</a>
								</span>
								<time class="wbcom-sp__meta-date" datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
									<?php echo esc_html( get_the_date() ); ?>
								</time>
								<?php
								$wbcom_categories_list = get_the_category_list( ', ' );
								if ( $wbcom_categories_list ) :
									?>
									<span class="wbcom-sp__meta-cats"><?php echo wp_kses_post( $wbcom_categories_list ); ?></span>
								<?php endif; ?>
								<span class="wbcom-sp__meta-reading">
									<?php
									$wbcom_word_count = str_word_count( wp_strip_all_tags( get_the_content() ) );
									$wbcom_read_time  = max( 1, (int) ceil( $wbcom_word_count / 250 ) );
									printf(
										/* translators: %d: number of minutes */
										esc_html( _n( '%d min read', '%d min read', $wbcom_read_time, 'wbcom-essential' ) ),
										(int) $wbcom_read_time
									);
									?>
								</span>
							</div>
						</header>

						<div class="wbcom-sp__content entry-content">
							<?php the_content(); ?>
							<?php
							wp_link_pages(
								array(
									'before' => '<div class="wbcom-sp__page-links">',
									'after'  => '</div>',
								)
							);
							?>
						</div>

						<footer class="wbcom-sp__footer">
							<?php
							$wbcom_tags_list = get_the_tag_list( '', ', ' );
							if ( $wbcom_tags_list ) :
								?>
								<div class="wbcom-sp__tags">
									<span class="wbcom-sp__tags-label"><?php esc_html_e( 'Tags:', 'wbcom-essential' ); ?></span>
									<?php echo wp_kses_post( $wbcom_tags_list ); ?>
								</div>
							<?php endif; ?>
						</footer>
					</article>

					<?php include $wbcom_partials . 'author-bio.php'; ?>
					<?php include $wbcom_partials . 'related-posts.php'; ?>
					<?php include $wbcom_partials . 'post-navigation.php'; ?>

					<?php
					if ( comments_open() || get_comments_number() ) {
						comments_template();
					}
					?>
				</main>

				<?php if ( $wbcom_has_sidebar ) : ?>
					<aside class="wbcom-sp__sidebar" role="complementary">
						<?php dynamic_sidebar( $wbcom_sidebar ); ?>
					</aside>
				<?php endif; ?>
			</div>
		<?php endwhile; ?>
	</div>
</div>

<?php
get_footer();
