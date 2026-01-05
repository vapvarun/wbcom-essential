/**
 * Product Grid Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
	Spinner,
	Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes } ) {
	const {
		columns,
		rows,
		category,
		orderBy,
		order,
		showOnSale,
		showFeatured,
		showSaleBadge,
		showRating,
		showPrice,
		showAddToCart,
		gap,
		imageRatio,
		cardBgColor,
		cardBorderRadius,
		titleColor,
		priceColor,
		saleBadgeColor,
		saleBadgeBgColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-product-grid-editor',
	} );

	// Fetch product categories
	const categories = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		return getEntityRecords( 'taxonomy', 'product_cat', {
			per_page: -1,
			hide_empty: true,
		} );
	}, [] );

	// Check if WooCommerce is active
	const isWooActive = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		try {
			getEntityRecords( 'postType', 'product', { per_page: 1 } );
			return true;
		} catch ( e ) {
			return false;
		}
	}, [] );

	const categoryOptions = [
		{ value: '', label: __( 'All Categories', 'wbcom-essential' ) },
		...( categories || [] ).map( ( cat ) => ( {
			value: cat.slug,
			label: cat.name,
		} ) ),
	];

	const orderByOptions = [
		{ value: 'date', label: __( 'Date', 'wbcom-essential' ) },
		{ value: 'title', label: __( 'Title', 'wbcom-essential' ) },
		{ value: 'price', label: __( 'Price', 'wbcom-essential' ) },
		{ value: 'popularity', label: __( 'Popularity', 'wbcom-essential' ) },
		{ value: 'rating', label: __( 'Rating', 'wbcom-essential' ) },
		{ value: 'rand', label: __( 'Random', 'wbcom-essential' ) },
		{ value: 'menu_order', label: __( 'Menu Order', 'wbcom-essential' ) },
	];

	const orderOptions = [
		{ value: 'desc', label: __( 'Descending', 'wbcom-essential' ) },
		{ value: 'asc', label: __( 'Ascending', 'wbcom-essential' ) },
	];

	const imageRatioOptions = [
		{ value: '1', label: __( 'Square (1:1)', 'wbcom-essential' ) },
		{ value: '0.75', label: __( 'Portrait (3:4)', 'wbcom-essential' ) },
		{ value: '1.33', label: __( 'Landscape (4:3)', 'wbcom-essential' ) },
		{ value: 'auto', label: __( 'Original', 'wbcom-essential' ) },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 2 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Rows', 'wbcom-essential' ) }
						value={ rows }
						onChange={ ( value ) => setAttributes( { rows: value } ) }
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Gap (px)', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 60 }
					/>
					<SelectControl
						label={ __( 'Image Ratio', 'wbcom-essential' ) }
						value={ imageRatio }
						options={ imageRatioOptions }
						onChange={ ( value ) => setAttributes( { imageRatio: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Query', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Category', 'wbcom-essential' ) }
						value={ category }
						options={ categoryOptions }
						onChange={ ( value ) => setAttributes( { category: value } ) }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ orderByOptions }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>
					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ orderOptions }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Only On Sale', 'wbcom-essential' ) }
						checked={ showOnSale }
						onChange={ ( value ) => setAttributes( { showOnSale: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Only Featured', 'wbcom-essential' ) }
						checked={ showFeatured }
						onChange={ ( value ) => setAttributes( { showFeatured: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Sale Badge', 'wbcom-essential' ) }
						checked={ showSaleBadge }
						onChange={ ( value ) => setAttributes( { showSaleBadge: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Rating', 'wbcom-essential' ) }
						checked={ showRating }
						onChange={ ( value ) => setAttributes( { showRating: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Price', 'wbcom-essential' ) }
						checked={ showPrice }
						onChange={ ( value ) => setAttributes( { showPrice: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Add to Cart', 'wbcom-essential' ) }
						checked={ showAddToCart }
						onChange={ ( value ) => setAttributes( { showAddToCart: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Card Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
					<p>{ __( 'Background Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ cardBgColor }
						onChange={ ( value ) => setAttributes( { cardBgColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Title Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
					<p>{ __( 'Price Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ priceColor }
						onChange={ ( value ) => setAttributes( { priceColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sale Badge Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Badge Text Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ saleBadgeColor }
						onChange={ ( value ) => setAttributes( { saleBadgeColor: value } ) }
					/>
					<p>{ __( 'Badge Background Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ saleBadgeBgColor }
						onChange={ ( value ) => setAttributes( { saleBadgeBgColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/product-grid"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<Placeholder icon="grid-view" label={ __( 'Product Grid', 'wbcom-essential' ) }>
							<Spinner />
						</Placeholder>
					) }
					ErrorResponsePlaceholder={ () => (
						<Placeholder icon="warning" label={ __( 'Product Grid', 'wbcom-essential' ) }>
							{ __( 'Error loading products. Make sure WooCommerce is active.', 'wbcom-essential' ) }
						</Placeholder>
					) }
					EmptyResponsePlaceholder={ () => (
						<Placeholder icon="grid-view" label={ __( 'Product Grid', 'wbcom-essential' ) }>
							{ __( 'No products found.', 'wbcom-essential' ) }
						</Placeholder>
					) }
				/>
			</div>
		</>
	);
}
