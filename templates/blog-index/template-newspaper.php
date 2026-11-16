<?php
/**
 * Template: Newspaper
 *
 * Posts page in a newspaper style: an optional breaking-news ticker and hero slider, the first two
 * sections side by side, then the remaining sections. The last section carries the pagination.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/templates/blog-index
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$wbcom_sections    = Wbcom_Blog_Index_Templates::get_sections( 'newspaper' );
$wbcom_show_ticker = get_option( 'wbcom_essential_blog_show_ticker', true );
$wbcom_show_slider = get_option( 'wbcom_essential_blog_show_slider', true );
$wbcom_last        = count( $wbcom_sections ) - 1;
?>

<div class="wbcom-blog wbcom-blog--newspaper">
	<div class="wbcom-blog__container">
		<?php Wbcom_Blog_Index_Templates::render_page_header(); ?>

		<?php if ( $wbcom_show_ticker ) : ?>
			<div class="wbcom-blog__ticker">
				<?php
				// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_block() output; the block escapes its own markup.
				echo Wbcom_Blog_Index_Templates::render_block(
					'wbcom-essential/posts-ticker',
					array(
						'postsPerPage' => 10,
						'label'        => __( 'Breaking News', 'wbcom-essential' ),
					)
				);
				// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php endif; ?>

		<?php if ( $wbcom_show_slider ) : ?>
			<div class="wbcom-blog__hero">
				<?php
				// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_block() output; the block escapes its own markup.
				echo Wbcom_Blog_Index_Templates::render_block(
					'wbcom-essential/post-carousel',
					array(
						'uniqueId'      => 'wbcom-blog-hero',
						'postsPerPage'  => 4,
						'slidesPerView' => 1,
						'showExcerpt'   => true,
						'showDate'      => true,
						'imageRatio'    => '21/9',
					)
				);
				// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php endif; ?>

		<?php
		foreach ( $wbcom_sections as $wbcom_index => $wbcom_section ) :
			$wbcom_paginate = ( $wbcom_index === $wbcom_last );
			// The first two sections sit side by side: a main column and a narrow column of headlines.
			if ( 0 === $wbcom_index && $wbcom_last >= 1 ) {
				echo '<div class="wbcom-blog__dual-section"><div class="wbcom-blog__dual-main">';
			} elseif ( 1 === $wbcom_index ) {
				echo '<div class="wbcom-blog__dual-sidebar">';
			} else {
				echo '<div class="wbcom-blog__section">';
			}

			// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_posts() escapes every value it prints.
			echo Wbcom_Blog_Index_Templates::render_posts(
				Wbcom_Blog_Index_Templates::section_query( $wbcom_section, $wbcom_paginate ),
				array(
					'type'          => $wbcom_section['display_type'],
					'columns'       => 0 === $wbcom_index ? 2 : 3,
					'label'         => $wbcom_section['title'],
					'excerpt'       => 1 !== $wbcom_index,
					'excerpt_words' => 18,
					'paginate'      => $wbcom_paginate,
				)
			);
			// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped

			echo ( 1 === $wbcom_index ) ? '</div></div>' : '</div>';
		endforeach;
		wp_reset_postdata();
		?>
	</div>
</div>

<?php
get_footer();
