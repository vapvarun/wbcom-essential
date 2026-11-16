<?php
/**
 * Template: Magazine
 *
 * Posts page built from sections: an optional category bar, then one block of posts per section
 * (display type, category and count from the settings). The last section carries the pagination.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/templates/blog-index
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

$wbcom_sections     = Wbcom_Blog_Index_Templates::get_sections( 'magazine' );
$wbcom_show_cat_nav = get_option( 'wbcom_essential_blog_show_category_nav', true );
$wbcom_last         = count( $wbcom_sections ) - 1;
?>

<div class="wbcom-blog wbcom-blog--magazine">
	<div class="wbcom-blog__container">
		<?php Wbcom_Blog_Index_Templates::render_page_header(); ?>

		<?php if ( $wbcom_show_cat_nav ) : ?>
			<div class="wbcom-blog__category-nav">
				<?php
				// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_block() output; the block escapes its own markup.
				echo Wbcom_Blog_Index_Templates::render_block(
					'wbcom-essential/category-grid',
					array(
						'columns'        => 6,
						'maxCategories'  => 8,
						'showPostCount'  => true,
						'showImage'      => false,
						'useThemeColors' => true,
					)
				);
				// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php endif; ?>

		<?php foreach ( $wbcom_sections as $wbcom_index => $wbcom_section ) : ?>
			<div class="wbcom-blog__section">
				<?php
				$wbcom_paginate = ( $wbcom_index === $wbcom_last );
				// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_posts() escapes every value it prints.
				echo Wbcom_Blog_Index_Templates::render_posts(
					Wbcom_Blog_Index_Templates::section_query( $wbcom_section, $wbcom_paginate ),
					array(
						'type'          => $wbcom_section['display_type'],
						'label'         => $wbcom_section['title'],
						'excerpt_words' => 18,
						'paginate'      => $wbcom_paginate,
					)
				);
				// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
				?>
			</div>
		<?php endforeach; ?>
		<?php wp_reset_postdata(); ?>
	</div>
</div>

<?php
get_footer();
