<?php
/**
 * Posts Ticker Block - Server-Side Render
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

use WBCOM_ESSENTIAL\Gutenberg\WBE_CSS;

// ── Shared infrastructure ─────────────────────────────────────────────────────
$unique_id   = ! empty( $attributes['uniqueId'] ) ? sanitize_html_class( $attributes['uniqueId'] ) : '';
$vis_classes = class_exists( 'WBCOM_ESSENTIAL\Gutenberg\WBE_CSS' ) ? WBE_CSS::get_visibility_classes( $attributes ) : '';

if ( ! empty( $unique_id ) && class_exists( 'WBCOM_ESSENTIAL\Gutenberg\WBE_CSS' ) ) {
	WBE_CSS::add( $unique_id, $attributes );
	WBE_CSS::init();
}

// ── Extract attributes ────────────────────────────────────────────────────────
$posts_per       = max( 2, absint( $attributes['postsPerPage'] ?? 10 ) );
$cat_ids         = array_map( 'absint', (array) ( $attributes['categories'] ?? array() ) );
$speed           = max( 1, absint( $attributes['speed'] ?? 30 ) );
$direction       = in_array( $attributes['direction'] ?? 'left', array( 'left', 'right' ), true )
	? $attributes['direction']
	: 'left';
$pause_on_hover  = ! empty( $attributes['pauseOnHover'] );
$show_date       = ! empty( $attributes['showDate'] );
$show_category   = ! empty( $attributes['showCategory'] );
$label           = sanitize_text_field( $attributes['label'] ?? __( 'Latest News', 'wbcom-essential' ) );
$label_bg        = sanitize_text_field( $attributes['labelBg'] ?? '' ) ?: 'var(--wbcom-button-bg, var(--wbe-color-accent, #667eea))';
$label_color     = sanitize_hex_color( $attributes['labelColor'] ?? '' ) ?: 'var(--wbcom-button-color, #ffffff)';
$ticker_bg       = sanitize_text_field( $attributes['tickerBg'] ?? '' ) ?: 'var(--wbe-color-surface-alt, #f8f9fa)';
$text_color      = sanitize_hex_color( $attributes['textColor'] ?? '' ) ?: 'var(--wbcom-text-color, #1e1e2e)';
$link_color      = sanitize_hex_color( $attributes['linkColor'] ?? '' ) ?: 'var(--wbe-color-accent, #667eea)';
$separator       = sanitize_key( $attributes['separatorStyle'] ?? 'dot' );
$height          = max( 32, absint( $attributes['height'] ?? 44 ) );

// Separator character map.
$sep_chars = array(
	'dot'   => '&bull;',
	'pipe'  => '&#124;',
	'slash' => '&#47;',
	'none'  => '',
);
$sep_char = $sep_chars[ $separator ] ?? '&bull;';

// ── Box shadow ────────────────────────────────────────────────────────────────
$box_shadow_val = 'none';
if ( ! empty( $attributes['boxShadow'] ) ) {
	$box_shadow_val = sprintf(
		'%dpx %dpx %dpx %dpx %s',
		intval( $attributes['shadowHorizontal'] ?? 0 ),
		intval( $attributes['shadowVertical'] ?? 4 ),
		absint( $attributes['shadowBlur'] ?? 8 ),
		intval( $attributes['shadowSpread'] ?? 0 ),
		sanitize_text_field( $attributes['shadowColor'] ?? 'rgba(0,0,0,0.12)' )
	);
}

// ── Border radius ─────────────────────────────────────────────────────────────
$border_radius = $attributes['borderRadius'] ?? array( 'top' => 0, 'right' => 0, 'bottom' => 0, 'left' => 0 );
$radius_unit   = sanitize_text_field( $attributes['borderRadiusUnit'] ?? 'px' );
$radius_val    = sprintf(
	'%s%s %s%s %s%s %s%s',
	absint( $border_radius['top'] ?? 0 ), $radius_unit,
	absint( $border_radius['right'] ?? 0 ), $radius_unit,
	absint( $border_radius['bottom'] ?? 0 ), $radius_unit,
	absint( $border_radius['left'] ?? 0 ), $radius_unit
);

// ── WP_Query ──────────────────────────────────────────────────────────────────
$query_args = array(
	'post_type'      => 'post',
	'posts_per_page' => $posts_per,
	'orderby'        => 'date',
	'order'          => 'DESC',
	'post_status'    => 'publish',
	'no_found_rows'  => true,
);

if ( ! empty( $cat_ids ) ) {
	$query_args['category__in'] = $cat_ids;
}

$query = new WP_Query( $query_args );

if ( ! $query->have_posts() ) {
	echo '<div class="wbe-posts-ticker wbe-posts-ticker--empty"><p>' . esc_html__( 'No posts found.', 'wbcom-essential' ) . '</p></div>';
	return;
}

// Collect posts for rendering (needed twice for seamless loop).
$ticker_posts = array();
while ( $query->have_posts() ) {
	$query->the_post();
	$ticker_posts[] = array(
		'id'         => get_the_ID(),
		'permalink'  => get_permalink(),
		'title'      => get_the_title(),
		'date'       => get_the_date( '', get_the_ID() ),
		'date_iso'   => get_the_date( 'c', get_the_ID() ),
		'categories' => get_the_category( get_the_ID() ),
	);
}
wp_reset_postdata();

// ── Compute animation duration from speed ────────────────────────────────────
// Each post item is roughly 250px wide. Animation duration = (items * 250) / speed.
$item_count    = count( $ticker_posts );
$anim_duration = round( ( $item_count * 250 ) / $speed, 2 );

// ── Design tokens ─────────────────────────────────────────────────────────────
// Set on the wrapper's style attribute instead of a printed style element, so the editor preview gets them too.
$token_style = '';
if ( $unique_id ) {
	$token_style = sprintf(
		'--wbe-tk-label-bg: %1$s; --wbe-tk-label-color: %2$s; --wbe-tk-bg: %3$s; --wbe-tk-text: %4$s; --wbe-tk-link: %5$s; --wbe-tk-height: %6$dpx; --wbe-tk-duration: %7$ss; --wbe-tk-shadow: %8$s; --wbe-tk-radius: %9$s;',
		esc_attr( $label_bg ),
		esc_attr( $label_color ),
		esc_attr( $ticker_bg ),
		esc_attr( $text_color ),
		esc_attr( $link_color ),
		$height,
		$anim_duration,
		esc_attr( $box_shadow_val ),
		esc_attr( $radius_val )
	);
	// Owner-picked colours keep the exact look they had: the link colour on the category chip, the text
	// colour at 55% on the date (style.css, .wbe-posts-ticker--text-picked; core strips color-mix() from
	// a style attribute).
	if ( sanitize_hex_color( $attributes['linkColor'] ?? '' ) ) {
		$token_style .= ' --wbe-tk-cat-color: ' . esc_attr( $link_color ) . ';';
	}
}

// ── Wrapper ───────────────────────────────────────────────────────────────────
$wrapper_class = trim( implode( ' ', array_filter( array(
	'wbe-posts-ticker',
	'wbe-posts-ticker--dir-' . $direction,
	$unique_id && sanitize_hex_color( $attributes['textColor'] ?? '' ) ? 'wbe-posts-ticker--text-picked' : '',
	$pause_on_hover ? 'wbe-posts-ticker--pause-hover' : '',
	$unique_id ? 'wbe-block-' . $unique_id : '',
	$vis_classes,
) ) ) );

$wrapper_attrs = get_block_wrapper_attributes( array(
	'class'            => $wrapper_class,
	'style'            => $token_style,
	'role'             => 'region',
	'aria-label'       => esc_attr( $label ),
	'data-pause-hover' => $pause_on_hover ? 'true' : 'false',
	'data-direction'   => esc_attr( $direction ),
) );

/**
 * Render a single ticker item as an HTML string.
 *
 * @param array  $post_data     Post data array.
 * @param bool   $show_date     Whether to show date.
 * @param bool   $show_category Whether to show category badge.
 * @param string $sep_char      Separator character (HTML entity).
 * @return string
 */
if ( ! function_exists( 'wbe_ticker_item' ) ) :
function wbe_ticker_item( $post_data, $show_date, $show_category, $sep_char ) {
	ob_start();
	$first_cat = ! empty( $post_data['categories'] ) ? $post_data['categories'][0] : null;
	?>
	<span class="wbe-posts-ticker__item">
		<?php if ( $show_category && $first_cat ) : ?>
		<a
			href="<?php echo esc_url( get_category_link( $first_cat->term_id ) ); ?>"
			class="wbe-posts-ticker__cat"
			tabindex="-1"
			aria-hidden="true"
		>
			<?php echo esc_html( $first_cat->name ); ?>
		</a>
		<?php endif; ?>

		<a
			href="<?php echo esc_url( $post_data['permalink'] ); ?>"
			class="wbe-posts-ticker__link"
		>
			<?php echo esc_html( $post_data['title'] ); ?>
		</a>

		<?php if ( $show_date ) : ?>
		<time
			class="wbe-posts-ticker__date"
			datetime="<?php echo esc_attr( $post_data['date_iso'] ); ?>"
			aria-hidden="true"
		>
			<?php echo esc_html( $post_data['date'] ); ?>
		</time>
		<?php endif; ?>

		<?php if ( $sep_char ) : ?>
		<span class="wbe-posts-ticker__sep" aria-hidden="true"><?php echo $sep_char; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- HTML entities only. ?></span>
		<?php endif; ?>
	</span>
	<?php
	return ob_get_clean();
}
endif;
?>
<div <?php echo $wrapper_attrs; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<?php if ( $label ) : ?>
	<div class="wbe-posts-ticker__label" aria-hidden="true">
		<?php echo esc_html( $label ); ?>
	</div>
	<?php endif; ?>

	<div class="wbe-posts-ticker__viewport" aria-live="off">
		<div
			class="wbe-posts-ticker__track"
			data-direction="<?php echo esc_attr( $direction ); ?>"
		>
			<?php
			// First copy.
			foreach ( $ticker_posts as $post_data ) {
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo wbe_ticker_item( $post_data, $show_date, $show_category, $sep_char );
			}
			// Duplicate copy for seamless loop.
			foreach ( $ticker_posts as $post_data ) {
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo wbe_ticker_item( $post_data, $show_date, $show_category, $sep_char );
			}
			?>
		</div>
	</div>
</div>
