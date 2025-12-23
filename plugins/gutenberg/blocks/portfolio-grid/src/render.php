<?php
/**
 * Server-side render for Portfolio Grid block.
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
$items              = $attributes['items'] ?? array();
$filters            = $attributes['filters'] ?? array();
$show_filters       = $attributes['showFilters'] ?? true;
$layout             = $attributes['layout'] ?? 'grid';
$show_layout_switch = $attributes['showLayoutSwitcher'] ?? false;
$columns            = $attributes['columns'] ?? 3;
$columns_tablet     = $attributes['columnsTablet'] ?? 2;
$columns_mobile     = $attributes['columnsMobile'] ?? 1;
$gap                = $attributes['gap'] ?? 30;
$item_background    = $attributes['itemBackground'] ?? '#ffffff';
$item_border_radius = $attributes['itemBorderRadius'] ?? 8;
$overlay_color      = $attributes['overlayColor'] ?? 'rgba(0, 0, 0, 0.7)';
$title_color        = $attributes['titleColor'] ?? '#ffffff';
$description_color  = $attributes['descriptionColor'] ?? 'rgba(255, 255, 255, 0.9)';
$filter_active      = $attributes['filterActiveColor'] ?? '#3182ce';
$filter_text        = $attributes['filterTextColor'] ?? '#4a5568';

// Generate unique ID.
$block_id = 'portfolio-grid-' . wp_unique_id();

// Build CSS custom properties.
$style_vars = sprintf(
	'--portfolio-columns: %d; --portfolio-columns-tablet: %d; --portfolio-columns-mobile: %d; --portfolio-gap: %dpx; --portfolio-item-bg: %s; --portfolio-item-radius: %dpx; --portfolio-overlay: %s; --portfolio-title-color: %s; --portfolio-desc-color: %s; --portfolio-filter-active: %s; --portfolio-filter-text: %s;',
	$columns,
	$columns_tablet,
	$columns_mobile,
	$gap,
	esc_attr( $item_background ),
	$item_border_radius,
	esc_attr( $overlay_color ),
	esc_attr( $title_color ),
	esc_attr( $description_color ),
	esc_attr( $filter_active ),
	esc_attr( $filter_text )
);

// Get wrapper attributes.
$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'id'    => $block_id,
		'class' => 'wbcom-essential-portfolio-grid',
		'style' => $style_vars,
		'data-layout' => esc_attr( $layout ),
	)
);

// Find default filter.
$default_filter = 'all';
foreach ( $filters as $filter ) {
	if ( ! empty( $filter['isDefault'] ) ) {
		$default_filter = $filter['id'];
		break;
	}
}
?>

<div <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- Escaped by get_block_wrapper_attributes() ?>>
	<?php if ( $show_filters || $show_layout_switch ) : ?>
		<div class="wbcom-portfolio-controls">
			<?php if ( $show_filters && ! empty( $filters ) ) : ?>
				<div class="wbcom-portfolio-filters" role="tablist">
					<?php foreach ( $filters as $filter ) : ?>
						<button
							type="button"
							class="wbcom-portfolio-filter<?php echo $filter['id'] === $default_filter ? ' is-active' : ''; ?>"
							data-filter="<?php echo esc_attr( $filter['id'] ); ?>"
							role="tab"
							aria-selected="<?php echo $filter['id'] === $default_filter ? 'true' : 'false'; ?>"
						>
							<?php echo esc_html( $filter['label'] ); ?>
						</button>
					<?php endforeach; ?>
				</div>
			<?php endif; ?>

			<?php if ( $show_layout_switch ) : ?>
				<div class="wbcom-portfolio-layout-switch">
					<button
						type="button"
						class="wbcom-layout-btn<?php echo 'grid' === $layout ? ' is-active' : ''; ?>"
						data-layout="grid"
						aria-label="<?php esc_attr_e( 'Grid view', 'wbcom-essential' ); ?>"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
							<rect x="2" y="2" width="7" height="7" rx="1"/>
							<rect x="11" y="2" width="7" height="7" rx="1"/>
							<rect x="2" y="11" width="7" height="7" rx="1"/>
							<rect x="11" y="11" width="7" height="7" rx="1"/>
						</svg>
					</button>
					<button
						type="button"
						class="wbcom-layout-btn<?php echo 'list' === $layout ? ' is-active' : ''; ?>"
						data-layout="list"
						aria-label="<?php esc_attr_e( 'List view', 'wbcom-essential' ); ?>"
					>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
							<rect x="2" y="3" width="16" height="3" rx="1"/>
							<rect x="2" y="8.5" width="16" height="3" rx="1"/>
							<rect x="2" y="14" width="16" height="3" rx="1"/>
						</svg>
					</button>
				</div>
			<?php endif; ?>
		</div>
	<?php endif; ?>

	<div class="wbcom-portfolio-items layout-<?php echo esc_attr( $layout ); ?>">
		<?php if ( ! empty( $items ) ) : ?>
			<?php foreach ( $items as $item ) : ?>
				<?php
				$item_filters = ! empty( $item['filters'] ) ? explode( ' ', trim( $item['filters'] ) ) : array();
				$filter_classes = array_map(
					function( $f ) {
						return 'filter-' . sanitize_html_class( $f );
					},
					$item_filters
				);
				$filter_class_str = implode( ' ', $filter_classes );
				$is_visible = $default_filter === 'all' || in_array( $default_filter, $item_filters, true );
				?>
				<div
					class="wbcom-portfolio-item <?php echo esc_attr( $filter_class_str ); ?><?php echo ! $is_visible ? ' is-hidden' : ''; ?>"
					data-filters="<?php echo esc_attr( $item['filters'] ?? '' ); ?>"
				>
					<div class="wbcom-portfolio-item-inner">
						<?php if ( ! empty( $item['image'] ) ) : ?>
							<div class="wbcom-portfolio-image">
								<img src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['title'] ?? '' ); ?>" loading="lazy" />
							</div>
						<?php else : ?>
							<div class="wbcom-portfolio-image wbcom-portfolio-placeholder">
								<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
									<circle cx="8.5" cy="8.5" r="1.5"/>
									<polyline points="21 15 16 10 5 21"/>
								</svg>
							</div>
						<?php endif; ?>

						<div class="wbcom-portfolio-overlay">
							<div class="wbcom-portfolio-content">
								<?php if ( ! empty( $item['title'] ) ) : ?>
									<h3 class="wbcom-portfolio-title">
										<?php if ( ! empty( $item['link'] ) ) : ?>
											<a href="<?php echo esc_url( $item['link'] ); ?>">
												<?php echo esc_html( $item['title'] ); ?>
											</a>
										<?php else : ?>
											<?php echo esc_html( $item['title'] ); ?>
										<?php endif; ?>
									</h3>
								<?php endif; ?>

								<?php if ( ! empty( $item['description'] ) ) : ?>
									<p class="wbcom-portfolio-description">
										<?php echo esc_html( $item['description'] ); ?>
									</p>
								<?php endif; ?>

								<?php if ( ! empty( $item['link'] ) ) : ?>
									<?php /* translators: %s: Portfolio item title */ ?>
									<a href="<?php echo esc_url( $item['link'] ); ?>" class="wbcom-portfolio-link" aria-label="<?php echo esc_attr( sprintf( __( 'View %s', 'wbcom-essential' ), $item['title'] ?? '' ) ); ?>">
										<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
											<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
											<polyline points="15 3 21 3 21 9"/>
											<line x1="10" y1="14" x2="21" y2="3"/>
										</svg>
									</a>
								<?php endif; ?>
							</div>
						</div>
					</div>
				</div>
			<?php endforeach; ?>
		<?php else : ?>
			<div class="wbcom-portfolio-empty">
				<p><?php esc_html_e( 'No portfolio items added yet. Add items in the block settings.', 'wbcom-essential' ); ?></p>
			</div>
		<?php endif; ?>
	</div>
</div>
