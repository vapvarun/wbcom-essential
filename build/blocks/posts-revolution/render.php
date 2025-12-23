<?php
/**
 * Server-side render for Posts Revolution block.
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

// Extract attributes.
$layout         = $attributes['layout'] ?? 'featured-sidebar';
$columns        = $attributes['columns'] ?? 2;
$show_excerpt   = $attributes['showExcerpt'] ?? true;
$excerpt_length = $attributes['excerptLength'] ?? 100;
$show_author    = $attributes['showAuthor'] ?? true;
$show_date      = $attributes['showDate'] ?? true;
$show_category  = $attributes['showCategory'] ?? true;
$date_format    = $attributes['dateFormat'] ?? 'M j, Y';
$post_type      = $attributes['postType'] ?? 'post';
$categories     = $attributes['categories'] ?? array();
$posts_per_page = $attributes['postsPerPage'] ?? 5;
$order_by       = $attributes['orderBy'] ?? 'date';
$order          = $attributes['order'] ?? 'DESC';

// Colors.
$category_color       = $attributes['categoryColor'] ?? '#1d76da';
$category_hover_color = $attributes['categoryHoverColor'] ?? '#1557a0';
$title_color          = $attributes['titleColor'] ?? '#122B46';
$title_hover_color    = $attributes['titleHoverColor'] ?? '#1d76da';
$excerpt_color        = $attributes['excerptColor'] ?? '#666666';
$meta_color           = $attributes['metaColor'] ?? '#888888';
$image_radius         = $attributes['imageRadius'] ?? 8;
$gap                  = $attributes['gap'] ?? 24;

// Build query args.
$query_args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $posts_per_page,
	'orderby'        => $order_by,
	'order'          => $order,
	'post_status'    => 'publish',
);

if ( ! empty( $categories ) && 'post' === $post_type ) {
	$query_args['cat'] = implode( ',', $categories );
}

$posts = get_posts( $query_args );

if ( empty( $posts ) ) {
	return;
}

// Build inline styles.
$inline_styles = array(
	'--category-color'       => $category_color,
	'--category-hover-color' => $category_hover_color,
	'--title-color'          => $title_color,
	'--title-hover-color'    => $title_hover_color,
	'--excerpt-color'        => $excerpt_color,
	'--meta-color'           => $meta_color,
	'--image-radius'         => $image_radius . 'px',
	'--gap'                  => $gap . 'px',
	'--columns'              => $columns,
);

$style_string = '';
foreach ( $inline_styles as $prop => $value ) {
	$style_string .= esc_attr( $prop ) . ': ' . esc_attr( $value ) . '; ';
}

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'wbcom-essential-posts-revolution wbcom-essential-posts-revolution--' . $layout,
	'style' => $style_string,
) );

/**
 * Helper function to get excerpt.
 */
function wbcom_pr_get_excerpt( $post_id, $length ) {
	$excerpt = get_the_excerpt( $post_id );
	if ( strlen( $excerpt ) > $length ) {
		$excerpt = substr( $excerpt, 0, $length ) . '...';
	}
	return $excerpt;
}

/**
 * Helper function to get categories.
 */
function wbcom_pr_get_category( $post_id ) {
	$categories = get_the_category( $post_id );
	if ( ! empty( $categories ) ) {
		return '<a href="' . esc_url( get_category_link( $categories[0]->term_id ) ) . '">' . esc_html( $categories[0]->name ) . '</a>';
	}
	return '';
}

/**
 * Render a single post item.
 */
function wbcom_pr_render_post( $post, $args = array() ) {
	$defaults = array(
		'show_category'  => true,
		'show_excerpt'   => true,
		'show_author'    => true,
		'show_date'      => true,
		'excerpt_length' => 100,
		'date_format'    => 'M j, Y',
		'size'           => 'large',
		'class'          => '',
	);
	$args = wp_parse_args( $args, $defaults );

	$thumbnail_size = 'large' === $args['size'] ? 'large' : 'medium';
	$has_thumbnail  = has_post_thumbnail( $post->ID );

	ob_start();
	?>
	<article class="wbcom-pr__post wbcom-pr__post--<?php echo esc_attr( $args['size'] ); ?> <?php echo esc_attr( $args['class'] ); ?>">
		<?php if ( $has_thumbnail ) : ?>
			<div class="wbcom-pr__thumb">
				<a href="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
					<?php echo get_the_post_thumbnail( $post->ID, $thumbnail_size ); ?>
				</a>
			</div>
		<?php endif; ?>

		<div class="wbcom-pr__content">
			<?php if ( $args['show_category'] ) : ?>
				<div class="wbcom-pr__category">
					<?php echo wbcom_pr_get_category( $post->ID ); ?>
				</div>
			<?php endif; ?>

			<h3 class="wbcom-pr__title">
				<a href="<?php echo esc_url( get_permalink( $post->ID ) ); ?>">
					<?php echo esc_html( get_the_title( $post->ID ) ); ?>
				</a>
			</h3>

			<?php if ( $args['show_excerpt'] && 'large' === $args['size'] ) : ?>
				<p class="wbcom-pr__excerpt">
					<?php echo esc_html( wbcom_pr_get_excerpt( $post->ID, $args['excerpt_length'] ) ); ?>
				</p>
			<?php endif; ?>

			<?php if ( $args['show_author'] || $args['show_date'] ) : ?>
				<div class="wbcom-pr__meta">
					<?php if ( $args['show_author'] ) : ?>
						<span class="wbcom-pr__author"><?php echo esc_html( get_the_author_meta( 'display_name', $post->post_author ) ); ?></span>
					<?php endif; ?>
					<?php if ( $args['show_author'] && $args['show_date'] ) : ?>
						<span class="wbcom-pr__sep">&bull;</span>
					<?php endif; ?>
					<?php if ( $args['show_date'] ) : ?>
						<span class="wbcom-pr__date"><?php echo esc_html( get_the_date( $args['date_format'], $post->ID ) ); ?></span>
					<?php endif; ?>
				</div>
			<?php endif; ?>
		</div>
	</article>
	<?php
	return ob_get_clean();
}

$post_args = array(
	'show_category'  => $show_category,
	'show_excerpt'   => $show_excerpt,
	'show_author'    => $show_author,
	'show_date'      => $show_date,
	'excerpt_length' => $excerpt_length,
	'date_format'    => $date_format,
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<?php
	switch ( $layout ) :
		case 'featured-sidebar':
			// First post large, rest in sidebar.
			?>
			<div class="wbcom-pr__featured">
				<?php echo wbcom_pr_render_post( $posts[0], array_merge( $post_args, array( 'size' => 'large' ) ) ); ?>
			</div>
			<?php if ( count( $posts ) > 1 ) : ?>
				<div class="wbcom-pr__sidebar">
					<?php
					for ( $i = 1; $i < count( $posts ); $i++ ) {
						echo wbcom_pr_render_post( $posts[ $i ], array_merge( $post_args, array( 'size' => 'small' ) ) );
					}
					?>
				</div>
			<?php endif; ?>
			<?php
			break;

		case 'featured-list':
			// First post large, rest in list.
			?>
			<div class="wbcom-pr__featured wbcom-pr__featured--full">
				<?php echo wbcom_pr_render_post( $posts[0], array_merge( $post_args, array( 'size' => 'large' ) ) ); ?>
			</div>
			<?php if ( count( $posts ) > 1 ) : ?>
				<div class="wbcom-pr__list">
					<?php
					for ( $i = 1; $i < count( $posts ); $i++ ) {
						echo wbcom_pr_render_post( $posts[ $i ], array_merge( $post_args, array( 'size' => 'medium' ) ) );
					}
					?>
				</div>
			<?php endif; ?>
			<?php
			break;

		case 'grid':
			// Grid layout.
			?>
			<div class="wbcom-pr__grid">
				<?php
				foreach ( $posts as $post ) {
					echo wbcom_pr_render_post( $post, array_merge( $post_args, array( 'size' => 'large' ) ) );
				}
				?>
			</div>
			<?php
			break;

		case 'split':
			// 50/50 split.
			?>
			<div class="wbcom-pr__split">
				<?php
				foreach ( $posts as $post ) {
					echo wbcom_pr_render_post( $post, array_merge( $post_args, array( 'size' => 'large' ) ) );
				}
				?>
			</div>
			<?php
			break;

		case 'two-featured':
			// Two large posts + list.
			?>
			<div class="wbcom-pr__two-featured">
				<?php
				$featured_count = min( 2, count( $posts ) );
				for ( $i = 0; $i < $featured_count; $i++ ) {
					echo wbcom_pr_render_post( $posts[ $i ], array_merge( $post_args, array( 'size' => 'large' ) ) );
				}
				?>
			</div>
			<?php if ( count( $posts ) > 2 ) : ?>
				<div class="wbcom-pr__list wbcom-pr__list--horizontal">
					<?php
					for ( $i = 2; $i < count( $posts ); $i++ ) {
						echo wbcom_pr_render_post( $posts[ $i ], array_merge( $post_args, array( 'size' => 'small' ) ) );
					}
					?>
				</div>
			<?php endif; ?>
			<?php
			break;

		case 'magazine':
			// Magazine style: 1 featured + 4 in grid.
			?>
			<div class="wbcom-pr__magazine">
				<div class="wbcom-pr__magazine-featured">
					<?php echo wbcom_pr_render_post( $posts[0], array_merge( $post_args, array( 'size' => 'large' ) ) ); ?>
				</div>
				<?php if ( count( $posts ) > 1 ) : ?>
					<div class="wbcom-pr__magazine-grid">
						<?php
						for ( $i = 1; $i < count( $posts ); $i++ ) {
							echo wbcom_pr_render_post( $posts[ $i ], array_merge( $post_args, array(
								'size'         => 'medium',
								'show_excerpt' => false,
							) ) );
						}
						?>
					</div>
				<?php endif; ?>
			</div>
			<?php
			break;

		default:
			// Default to grid.
			?>
			<div class="wbcom-pr__grid">
				<?php
				foreach ( $posts as $post ) {
					echo wbcom_pr_render_post( $post, array_merge( $post_args, array( 'size' => 'large' ) ) );
				}
				?>
			</div>
			<?php
	endswitch;
	?>
</div>
