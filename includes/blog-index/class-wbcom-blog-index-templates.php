<?php
/**
 * Blog Index Template Loader.
 *
 * Hooks into home_template / archive_template to serve custom blog layouts.
 * Uses the global setting from Wbcom_Blog_Index_Settings.
 *
 * @package    Wbcom_Essential
 * @subpackage Wbcom_Essential/includes/blog-index
 * @since      4.3.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Wbcom_Blog_Index_Templates
 */
class Wbcom_Blog_Index_Templates {

	/**
	 * Valid layout slugs.
	 *
	 * @var array
	 */
	private $valid_layouts = array( 'grid', 'list', 'magazine', 'newspaper' );

	/**
	 * Initialize hooks.
	 */
	public function __construct() {
		add_filter( 'home_template', array( $this, 'override_blog_template' ), 99 );
		add_filter( 'archive_template', array( $this, 'override_blog_template' ), 99 );
		add_filter( 'body_class', array( $this, 'add_body_classes' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'pre_get_posts', array( $this, 'modify_posts_per_page' ) );
	}

	/**
	 * Get the resolved layout slug.
	 *
	 * @return string Layout slug or empty string.
	 */
	public function get_resolved_layout() {
		$layout = get_option( 'wbcom_essential_blog_index_layout', '' );

		if ( ! $layout || ! in_array( $layout, $this->valid_layouts, true ) ) {
			return '';
		}

		// Magazine and Newspaper are built from fixed sections, so they only fit the posts page. A category,
		// tag, author or date archive shows its own posts in the Grid layout instead.
		if ( in_array( $layout, array( 'magazine', 'newspaper' ), true ) && ! is_home() ) {
			return 'grid';
		}

		return $layout;
	}

	/**
	 * Override the blog/archive template.
	 *
	 * @param string $template Default template path.
	 * @return string Modified template path.
	 */
	public function override_blog_template( $template ) {
		if ( is_admin() || ! $this->is_blog_page() ) {
			return $template;
		}

		$slug = $this->get_resolved_layout();

		if ( ! $slug ) {
			return $template;
		}

		$custom_template = WBCOM_ESSENTIAL_PATH . 'templates/blog-index/template-' . $slug . '.php';

		if ( file_exists( $custom_template ) ) {
			return $custom_template;
		}

		return $template;
	}

	/**
	 * Check if current page is a blog listing page.
	 *
	 * @return bool
	 */
	private function is_blog_page() {
		return is_home() || is_category() || is_tag() || is_author() || is_date();
	}

	/**
	 * Add body classes when a custom layout is active.
	 *
	 * @param array $classes Existing body classes.
	 * @return array Modified body classes.
	 */
	public function add_body_classes( $classes ) {
		if ( ! $this->is_blog_page() ) {
			return $classes;
		}

		$slug = $this->get_resolved_layout();

		if ( $slug ) {
			$classes[] = 'wbcom-blog-active';
			$classes[] = 'wbcom-blog--' . $slug;
		}

		return $classes;
	}

	/**
	 * Enqueue CSS assets for active layouts.
	 */
	public function enqueue_assets() {
		if ( ! $this->is_blog_page() ) {
			return;
		}

		$slug = $this->get_resolved_layout();

		if ( ! $slug ) {
			return;
		}

		$base_url = WBCOM_ESSENTIAL_URL . 'assets/blog-index/css/';
		$version  = WBCOM_ESSENTIAL_VERSION;

		wp_enqueue_style(
			'wbcom-blog-base',
			$base_url . 'blog-index-base.css',
			wp_style_is( 'wbe-design-tokens', 'registered' ) ? array( 'wbe-design-tokens' ) : array(),
			$version
		);

		$layout_css_file = WBCOM_ESSENTIAL_PATH . 'assets/blog-index/css/layout-' . $slug . '.css';
		if ( file_exists( $layout_css_file ) ) {
			wp_enqueue_style(
				'wbcom-blog-' . $slug,
				$base_url . 'layout-' . $slug . '.css',
				array( 'wbcom-blog-base' ),
				$version
			);
		}
	}

	/**
	 * Modify posts per page based on plugin setting.
	 * Only for simple layouts (grid/list). Magazine/Newspaper manage their own queries.
	 *
	 * @param \WP_Query $query Main query.
	 */
	public function modify_posts_per_page( $query ) {
		if ( is_admin() || ! $query->is_main_query() ) {
			return;
		}

		if ( ! $this->is_blog_page() ) {
			return;
		}

		$layout = $this->get_resolved_layout();

		// Only simple layouts use posts_per_page override.
		if ( ! in_array( $layout, array( 'grid', 'list' ), true ) ) {
			return;
		}

		$per_page = (int) get_option( 'wbcom_essential_blog_posts_per_page', 0 );

		if ( $per_page > 0 ) {
			$query->set( 'posts_per_page', $per_page );
		}
	}

	/**
	 * Render a block programmatically using render_block().
	 *
	 * @param string $block_name Block name (e.g., 'wbcom-essential/posts-ticker').
	 * @param array  $attrs      Block attributes.
	 * @return string Rendered HTML.
	 */
	public static function render_block( $block_name, $attrs = array() ) {
		return render_block(
			array(
				'blockName'    => $block_name,
				'attrs'        => $attrs,
				'innerBlocks'  => array(),
				'innerHTML'    => '',
				'innerContent' => array(),
			)
		);
	}

	/**
	 * Heading for the blog page: the posts page title on the blog, the archive title elsewhere.
	 */
	public static function render_page_header() {
		if ( is_home() ) {
			$posts_page = (int) get_option( 'page_for_posts' );
			$title      = $posts_page ? get_the_title( $posts_page ) : __( 'Blog', 'wbcom-essential' );
		} else {
			$title = get_the_archive_title();
		}
		?>
		<header class="wbcom-blog__header">
			<h1 class="wbcom-blog__title"><?php echo wp_kses_post( $title ); ?></h1>
			<?php if ( ! is_home() && get_the_archive_description() ) : ?>
				<div class="wbcom-blog__description"><?php echo wp_kses_post( get_the_archive_description() ); ?></div>
			<?php endif; ?>
		</header>
		<?php
	}

	/**
	 * How each section display type arranges its posts: groups of [ how many (0 = the rest), card style ].
	 * The layout of the groups (side by side, stacked, grid) is in blog-index-base.css per type.
	 *
	 * @param string $type Display type slug (posts_type1 to posts_type7).
	 * @return array<int, array{0:int,1:string}>
	 */
	private static function type_groups( $type ) {
		// posts_type1 Hero + Sidebar, 2 Featured + List, 3 Grid, 4 Side by Side, 5 Hero + Text Sidebar,
		// 6 Magazine (1 + 3 + rest), 7 Two Featured + List.
		$map = array(
			'posts_type1' => array( array( 1, 'feature' ), array( 0, 'compact' ) ),
			'posts_type2' => array( array( 1, 'feature' ), array( 0, 'row' ) ),
			'posts_type3' => array( array( 0, 'card' ) ),
			'posts_type4' => array( array( 0, 'row' ) ),
			'posts_type5' => array( array( 1, 'feature' ), array( 0, 'text' ) ),
			'posts_type6' => array( array( 1, 'feature' ), array( 3, 'compact' ), array( 0, 'card' ) ),
			'posts_type7' => array( array( 2, 'feature' ), array( 0, 'row' ) ),
		);
		return $map[ $type ] ?? $map['posts_type3'];
	}

	/**
	 * Render a set of posts in one of the section display types.
	 *
	 * @param \WP_Query $query Posts to show (the main query or a section query).
	 * @param array     $args  {
	 *     @type string $type          Display type, posts_type1 to posts_type7. Default posts_type3.
	 *     @type int    $columns       Columns for the card grid. Default 3.
	 *     @type string $label         Section heading. Default none.
	 *     @type bool   $excerpt       Show excerpts. Default true.
	 *     @type int    $excerpt_words Excerpt length in words. Default 20.
	 *     @type bool   $paginate      Print pagination after the posts. Default false.
	 *     @type bool   $main          The query is the main query (uses the core posts pagination). Default false.
	 * }
	 * @return string HTML.
	 */
	public static function render_posts( $query, $args = array() ) {
		$args = wp_parse_args(
			$args,
			array(
				'type'          => 'posts_type3',
				'columns'       => 3,
				'label'         => '',
				'excerpt'       => true,
				'excerpt_words' => 20,
				'paginate'      => false,
				'main'          => false,
			)
		);

		if ( ! $query->have_posts() ) {
			return $args['main'] ? '<p class="wbcom-blog__empty">' . esc_html__( 'No posts found.', 'wbcom-essential' ) . '</p>' : '';
		}

		update_post_thumbnail_cache( $query );

		$type    = sanitize_key( $args['type'] );
		$groups  = self::type_groups( $type );
		$level   = '' !== $args['label'] ? 3 : 2;
		$posts   = $query->posts;
		$offset  = 0;
		$columns = max( 1, min( 4, (int) $args['columns'] ) );

		ob_start();
		?>
		<section class="wbcom-posts wbcom-posts--<?php echo esc_attr( str_replace( 'posts_', '', $type ) ); ?>" style="--wbcom-posts-cols: <?php echo (int) $columns; ?>;">
			<?php if ( '' !== $args['label'] ) : ?>
				<h2 class="wbcom-posts__label"><?php echo esc_html( $args['label'] ); ?></h2>
			<?php endif; ?>
			<div class="wbcom-posts__groups">
				<?php
				foreach ( $groups as $index => $group ) :
					$slice   = $group[0] ? array_slice( $posts, $offset, $group[0] ) : array_slice( $posts, $offset );
					$offset += count( $slice );
					if ( ! $slice ) {
						continue;
					}
					?>
					<div class="wbcom-posts__group wbcom-posts__group--<?php echo (int) $index + 1; ?> wbcom-posts__group--<?php echo esc_attr( $group[1] ); ?>">
						<?php
						foreach ( $slice as $post ) {
							self::render_card( $post, $group[1], $level, $args );
						}
						?>
					</div>
				<?php endforeach; ?>
			</div>
			<?php
			if ( $args['paginate'] ) {
				if ( $args['main'] ) {
					the_posts_pagination( array( 'class' => 'wbcom-blog__pagination' ) );
				} elseif ( $query->max_num_pages > 1 ) {
					$links = paginate_links(
						array(
							'total'   => (int) $query->max_num_pages,
							'current' => max( 1, (int) get_query_var( 'paged' ) ),
						)
					);
					if ( $links ) {
						printf( '<nav class="navigation pagination wbcom-blog__pagination" aria-label="%s"><div class="nav-links">%s</div></nav>', esc_attr__( 'Posts', 'wbcom-essential' ), wp_kses_post( $links ) );
					}
				}
			}
			?>
		</section>
		<?php
		return (string) ob_get_clean();
	}

	/**
	 * One post card.
	 *
	 * @param \WP_Post $post  Post.
	 * @param string   $style feature, card, row, compact or text.
	 * @param int      $level Heading level for the post title.
	 * @param array    $args  render_posts() arguments.
	 */
	private static function render_card( $post, $style, $level, $args ) {
		$link      = get_permalink( $post );
		$title     = get_the_title( $post );
		$has_image = 'text' !== $style && has_post_thumbnail( $post );
		$size      = in_array( $style, array( 'compact' ), true ) ? 'thumbnail' : ( 'feature' === $style ? 'large' : 'medium_large' );
		$category  = 'compact' !== $style && 'text' !== $style ? get_the_category( $post->ID ) : array();
		$excerpt   = $args['excerpt'] && in_array( $style, array( 'feature', 'card', 'row' ), true )
			? wp_trim_words( get_the_excerpt( $post ), (int) $args['excerpt_words'] )
			: '';
		$tag       = 'h' . (int) $level;
		?>
		<article class="wbcom-post wbcom-post--<?php echo esc_attr( $style ); ?><?php echo $has_image ? '' : ' wbcom-post--no-image'; ?>">
			<?php if ( $has_image ) : ?>
				<a class="wbcom-post__media" href="<?php echo esc_url( $link ); ?>" tabindex="-1" aria-hidden="true">
					<?php echo get_the_post_thumbnail( $post, $size, array( 'alt' => '' ) ); ?>
				</a>
			<?php endif; ?>
			<div class="wbcom-post__body">
				<?php if ( $category ) : ?>
					<a class="wbcom-post__category" href="<?php echo esc_url( get_category_link( $category[0] ) ); ?>"><?php echo esc_html( $category[0]->name ); ?></a>
				<?php endif; ?>
				<<?php echo esc_html( $tag ); ?> class="wbcom-post__title"><a href="<?php echo esc_url( $link ); ?>"><?php echo esc_html( wp_strip_all_tags( $title ) ); ?></a></<?php echo esc_html( $tag ); ?>>
				<div class="wbcom-post__meta">
					<time datetime="<?php echo esc_attr( get_the_date( 'c', $post ) ); ?>"><?php echo esc_html( get_the_date( '', $post ) ); ?></time>
					<?php if ( in_array( $style, array( 'feature', 'row' ), true ) ) : ?>
						<span class="wbcom-post__author"><?php echo esc_html( get_the_author_meta( 'display_name', (int) $post->post_author ) ); ?></span>
					<?php endif; ?>
				</div>
				<?php if ( $excerpt ) : ?>
					<p class="wbcom-post__excerpt"><?php echo esc_html( $excerpt ); ?></p>
				<?php endif; ?>
			</div>
		</article>
		<?php
	}

	/**
	 * Query for one Magazine or Newspaper section.
	 *
	 * @param array $section  Resolved section (category slug, posts_count).
	 * @param bool  $paginate Whether this section carries the page's pagination.
	 * @return \WP_Query
	 */
	public static function section_query( $section, $paginate = false ) {
		$args = array(
			'post_type'           => 'post',
			'post_status'         => 'publish',
			'posts_per_page'      => max( 1, min( 50, (int) ( $section['posts_count'] ?? 6 ) ) ),
			'ignore_sticky_posts' => true,
			'no_found_rows'       => ! $paginate,
			'paged'               => $paginate ? max( 1, (int) get_query_var( 'paged' ) ) : 1,
		);
		if ( ! empty( $section['category'] ) && '__all__' !== $section['category'] ) {
			$args['category_name'] = sanitize_title( $section['category'] );
		}
		return new \WP_Query( $args );
	}

	/**
	 * Get resolved sections for composite layouts.
	 *
	 * @param string $layout Layout slug.
	 * @return array Resolved sections.
	 */
	public static function get_sections( $layout ) {
		$sections = get_option( 'wbcom_essential_blog_sections', array() );

		// Fall back to defaults if nothing saved.
		if ( empty( $sections ) ) {
			$sections = Wbcom_Blog_Index_Settings::get_defaults( $layout );
		}

		// Still empty? Build minimal defaults.
		if ( empty( $sections ) ) {
			$sections = array(
				array(
					'title'        => '',
					'category'     => '',
					'display_type' => 'posts_type3',
					'posts_count'  => 9,
				),
			);
		}

		return Wbcom_Blog_Index_Settings::resolve_section_categories( $sections );
	}
}
