<?php
/**
 * News Dashboard Pattern.
 *
 * Multi-section news dashboard with varied post layouts.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/plugins/gutenberg/patterns
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

register_block_pattern(
	'wbcom-essential/news-dashboard',
	array(
		'title'       => __( 'News Dashboard', 'wbcom-essential' ),
		'description' => __( 'A multi-section news dashboard with hero, category spotlight columns, and more stories.', 'wbcom-essential' ),
		'categories'  => array( 'wbcom-essential-magazine' ),
		'keywords'    => array( 'news', 'dashboard', 'sections', 'magazine' ),
		'content'     => '<!-- wp:heading {"textAlign":"left"} --><h2 class="wp-block-heading has-text-align-left">' . esc_html__( 'Top Stories', 'wbcom-essential' ) . '</h2><!-- /wp:heading -->

<!-- wp:spacer {"height":"16px"} -->
<div style="height:16px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:wbcom-essential/post-carousel {"displayMode":"grid","postsPerPage":5} /-->

<!-- wp:spacer {"height":"48px"} -->
<div style="height:48px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:separator {"className":"is-style-wide"} --><hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/><!-- /wp:separator -->

<!-- wp:spacer {"height":"48px"} -->
<div style="height:48px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"left"} --><h2 class="wp-block-heading has-text-align-left">' . esc_html__( 'Category Spotlight', 'wbcom-essential' ) . '</h2><!-- /wp:heading -->

<!-- wp:spacer {"height":"16px"} -->
<div style="height:16px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:columns -->
<div class="wp-block-columns"><!-- wp:column -->
<div class="wp-block-column"><!-- wp:wbcom-essential/post-carousel {"displayMode":"grid","postsPerPage":3,"showExcerpt":false} /--></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:wbcom-essential/post-carousel {"displayMode":"grid","postsPerPage":3,"showExcerpt":false} /--></div>
<!-- /wp:column -->

<!-- wp:column -->
<div class="wp-block-column"><!-- wp:wbcom-essential/post-carousel {"displayMode":"grid","postsPerPage":3,"showExcerpt":false} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:spacer {"height":"48px"} -->
<div style="height:48px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:separator {"className":"is-style-wide"} --><hr class="wp-block-separator has-alpha-channel-opacity is-style-wide"/><!-- /wp:separator -->

<!-- wp:spacer {"height":"48px"} -->
<div style="height:48px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"left"} --><h2 class="wp-block-heading has-text-align-left">' . esc_html__( 'More Stories', 'wbcom-essential' ) . '</h2><!-- /wp:heading -->

<!-- wp:spacer {"height":"16px"} -->
<div style="height:16px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:wbcom-essential/post-carousel {"displayMode":"grid","postsPerPage":6,"showExcerpt":true,"excerptLength":13} /-->

<!-- wp:spacer {"height":"48px"} -->
<div style="height:48px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:heading {"textAlign":"left"} --><h2 class="wp-block-heading has-text-align-left">' . esc_html__( 'Explore Categories', 'wbcom-essential' ) . '</h2><!-- /wp:heading -->

<!-- wp:spacer {"height":"16px"} -->
<div style="height:16px" aria-hidden="true" class="wp-block-spacer"></div>
<!-- /wp:spacer -->

<!-- wp:wbcom-essential/category-grid {"columns":4,"maxCategories":8,"showPostCount":true,"showImage":true,"useThemeColors":true} /-->',
	)
);
