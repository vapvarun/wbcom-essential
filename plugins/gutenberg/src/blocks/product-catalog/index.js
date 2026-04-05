/**
 * Product Catalog Block (v2)
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	Spinner,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

import './style.scss';
import './editor.scss';

registerBlockType( 'wbcom-essential/product-catalog', {
	edit( { attributes, setAttributes, clientId } ) {
		const {
			uniqueId,
			columns,
			perPage,
			showSearch,
			showCategoryFilter,
			showPriceFilter,
			showSort,
			defaultSort,
			defaultCategory,
			padding,
			paddingUnit,
			paddingTablet,
			paddingMobile,
			margin,
			marginUnit,
			marginTablet,
			marginMobile,
			boxShadow,
			shadowHorizontal,
			shadowVertical,
			shadowBlur,
			shadowSpread,
			shadowColor,
			borderRadius,
			borderRadiusUnit,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
		} = attributes;

		useUniqueId( clientId, uniqueId, setAttributes );

		const blockCSS = generateBlockCSS( uniqueId, attributes );

		const [ categories, setCategories ] = useState( [] );
		const [ loadingCats, setLoadingCats ] = useState( true );

		useEffect( () => {
			apiFetch( { path: '/wbcom/v1/product-categories' } )
				.then( ( data ) => {
					setCategories( data || [] );
					setLoadingCats( false );
				} )
				.catch( () => setLoadingCats( false ) );
		}, [] );

		const categoryOptions = [
			{ label: __( 'All Categories', 'wbcom-essential' ), value: 0 },
			...categories.map( ( cat ) => ( {
				label: cat.name + ' (' + cat.count + ')',
				value: cat.id,
			} ) ),
		];

		const selectedCatName = defaultCategory
			? ( categories.find( ( c ) => c.id === defaultCategory ) || {} ).name
			: null;

		const blockProps = useBlockProps( {
			className: `wbe-block-${ uniqueId } wbcom-catalog-editor`,
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
						<RangeControl
							label={ __( 'Columns', 'wbcom-essential' ) }
							value={ columns }
							onChange={ ( val ) => setAttributes( { columns: val } ) }
							min={ 2 }
							max={ 4 }
						/>
						<RangeControl
							label={ __( 'Products per page', 'wbcom-essential' ) }
							value={ perPage }
							onChange={ ( val ) => setAttributes( { perPage: val } ) }
							min={ 6 }
							max={ 48 }
							step={ 3 }
						/>
					</PanelBody>
					<PanelBody title={ __( 'Category', 'wbcom-essential' ) }>
						{ loadingCats ? (
							<Spinner />
						) : (
							<SelectControl
								label={ __( 'Show products from', 'wbcom-essential' ) }
								value={ defaultCategory }
								options={ categoryOptions }
								onChange={ ( val ) =>
									setAttributes( {
										defaultCategory: parseInt( val, 10 ),
									} )
								}
								help={ __(
									'Select a category to only display its products. Leave as "All Categories" to show everything.',
									'wbcom-essential'
								) }
							/>
						) }
					</PanelBody>
					<PanelBody title={ __( 'Filters', 'wbcom-essential' ) }>
						<ToggleControl
							label={ __( 'Search bar', 'wbcom-essential' ) }
							checked={ showSearch }
							onChange={ ( val ) => setAttributes( { showSearch: val } ) }
						/>
						<ToggleControl
							label={ __( 'Category filter', 'wbcom-essential' ) }
							checked={ showCategoryFilter }
							onChange={ ( val ) => setAttributes( { showCategoryFilter: val } ) }
						/>
						<ToggleControl
							label={ __( 'Price filter', 'wbcom-essential' ) }
							checked={ showPriceFilter }
							onChange={ ( val ) => setAttributes( { showPriceFilter: val } ) }
						/>
						<ToggleControl
							label={ __( 'Sort dropdown', 'wbcom-essential' ) }
							checked={ showSort }
							onChange={ ( val ) => setAttributes( { showSort: val } ) }
						/>
						<SelectControl
							label={ __( 'Default sort', 'wbcom-essential' ) }
							value={ defaultSort }
							options={ [
								{ label: 'Title (A-Z)', value: 'title' },
								{ label: 'Newest first', value: 'date' },
								{ label: 'Price: Low to High', value: 'price_asc' },
								{ label: 'Price: High to Low', value: 'price_desc' },
								{ label: 'Most Popular', value: 'popular' },
							] }
							onChange={ ( val ) => setAttributes( { defaultSort: val } ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Advanced', 'wbcom-essential' ) }
						initialOpen={ false }
					>
						<SpacingControl
							label={ __( 'Padding', 'wbcom-essential' ) }
							values={ padding }
							unit={ paddingUnit }
							onChange={ ( value ) => setAttributes( { padding: value } ) }
							onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
						/>
						<SpacingControl
							label={ __( 'Margin', 'wbcom-essential' ) }
							values={ margin }
							unit={ marginUnit }
							onChange={ ( value ) => setAttributes( { margin: value } ) }
							onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
						/>
						<Divider />
						<BoxShadowControl
							enabled={ boxShadow }
							horizontal={ shadowHorizontal }
							vertical={ shadowVertical }
							blur={ shadowBlur }
							spread={ shadowSpread }
							color={ shadowColor }
							onToggle={ ( value ) => setAttributes( { boxShadow: value } ) }
							onChangeHorizontal={ ( value ) => setAttributes( { shadowHorizontal: value } ) }
							onChangeVertical={ ( value ) => setAttributes( { shadowVertical: value } ) }
							onChangeBlur={ ( value ) => setAttributes( { shadowBlur: value } ) }
							onChangeSpread={ ( value ) => setAttributes( { shadowSpread: value } ) }
							onChangeColor={ ( value ) => setAttributes( { shadowColor: value } ) }
						/>
						<Divider />
						<BorderRadiusControl
							values={ borderRadius }
							unit={ borderRadiusUnit }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
						/>
						<Divider />
						<DeviceVisibility
							hideOnDesktop={ hideOnDesktop }
							hideOnTablet={ hideOnTablet }
							hideOnMobile={ hideOnMobile }
							onChange={ ( value ) => setAttributes( value ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div { ...blockProps }>
					{ blockCSS && <style>{ blockCSS }</style> }
					<div className="wbcom-catalog-preview">
						<div className="wbcom-catalog-preview__toolbar">
							{ showSearch && (
								<div className="wbcom-catalog-preview__search">
									<span>{ __( 'Search products...', 'wbcom-essential' ) }</span>
								</div>
							) }
							{ showCategoryFilter && (
								<div className="wbcom-catalog-preview__filter">
									<span>{ selectedCatName || __( 'All Categories', 'wbcom-essential' ) }</span>
								</div>
							) }
							{ showPriceFilter && (
								<div className="wbcom-catalog-preview__filter">
									<span>{ __( 'Any Price', 'wbcom-essential' ) }</span>
								</div>
							) }
							{ showSort && (
								<div className="wbcom-catalog-preview__filter">
									<span>{ __( 'Sort by', 'wbcom-essential' ) }</span>
								</div>
							) }
						</div>
						<div
							className={ `wbcom-catalog-preview__grid wbcom-catalog-preview__grid--${ columns }` }
						>
							{ Array.from( { length: columns * 2 } ).map( ( _, i ) => (
								<div key={ i } className="wbcom-catalog-preview__card">
									<div className="wbcom-catalog-preview__image"></div>
									<div className="wbcom-catalog-preview__title"></div>
									<div className="wbcom-catalog-preview__excerpt"></div>
									<div className="wbcom-catalog-preview__price"></div>
								</div>
							) ) }
						</div>
						<div className="wbcom-catalog-preview__loadmore">
							{ __( 'Load More', 'wbcom-essential' ) }
						</div>
					</div>
				</div>
			</>
		);
	},

	save: () => null, // Server-side rendered via render.php.
} );
