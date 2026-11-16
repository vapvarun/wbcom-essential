<?php
/**
 * Template: List
 *
 * Image-beside-text rows of the current posts (blog or archive) with pagination.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/templates/blog-index
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

get_header();

global $wp_query;
?>

<div class="wbcom-blog wbcom-blog--list">
	<div class="wbcom-blog__container">
		<?php
		Wbcom_Blog_Index_Templates::render_page_header();
		// phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped -- render_posts() escapes every value it prints.
		echo Wbcom_Blog_Index_Templates::render_posts(
			$wp_query,
			array(
				'type'          => 'posts_type4',
				'columns'       => 3,
				'excerpt_words' => 30,
				'paginate'      => true,
				'main'          => true,
			)
		);
		// phpcs:enable WordPress.Security.EscapeOutput.OutputNotEscaped
		?>
	</div>
</div>

<?php
get_footer();
