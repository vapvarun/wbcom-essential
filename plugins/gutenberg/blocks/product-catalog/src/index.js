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
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import './style.scss';
import './editor.scss';

registerBlockType( 'wbcom-essential/product-catalog', {
	edit( { attributes, setAttributes } ) {
		const {
			columns,
			perPage,
			showSearch,
			showCategoryFilter,
			showPriceFilter,
			showSort,
			defaultSort,
			defaultCategory,
		} = attributes;

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
			className: 'wbcom-catalog-editor',
		} );

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Layout',
							'wbcom-essential'
						) }
					>
						<RangeControl
							label={ __(
								'Columns',
								'wbcom-essential'
							) }
							value={ columns }
							onChange={ ( val ) =>
								setAttributes( { columns: val } )
							}
							min={ 2 }
							max={ 4 }
						/>
						<RangeControl
							label={ __(
								'Products per page',
								'wbcom-essential'
							) }
							value={ perPage }
							onChange={ ( val ) =>
								setAttributes( { perPage: val } )
							}
							min={ 6 }
							max={ 48 }
							step={ 3 }
						/>
					</PanelBody>
					<PanelBody
						title={ __(
							'Category',
							'wbcom-essential'
						) }
					>
						{ loadingCats ? (
							<Spinner />
						) : (
							<SelectControl
								label={ __(
									'Show products from',
									'wbcom-essential'
								) }
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
					<PanelBody
						title={ __(
							'Filters',
							'wbcom-essential'
						) }
					>
						<ToggleControl
							label={ __(
								'Search bar',
								'wbcom-essential'
							) }
							checked={ showSearch }
							onChange={ ( val ) =>
								setAttributes( { showSearch: val } )
							}
						/>
						<ToggleControl
							label={ __(
								'Category filter',
								'wbcom-essential'
							) }
							checked={ showCategoryFilter }
							onChange={ ( val ) =>
								setAttributes( {
									showCategoryFilter: val,
								} )
							}
						/>
						<ToggleControl
							label={ __(
								'Price filter',
								'wbcom-essential'
							) }
							checked={ showPriceFilter }
							onChange={ ( val ) =>
								setAttributes( {
									showPriceFilter: val,
								} )
							}
						/>
						<ToggleControl
							label={ __(
								'Sort dropdown',
								'wbcom-essential'
							) }
							checked={ showSort }
							onChange={ ( val ) =>
								setAttributes( { showSort: val } )
							}
						/>
						<SelectControl
							label={ __(
								'Default sort',
								'wbcom-essential'
							) }
							value={ defaultSort }
							options={ [
								{
									label: 'Title (A-Z)',
									value: 'title',
								},
								{
									label: 'Newest first',
									value: 'date',
								},
								{
									label: 'Price: Low to High',
									value: 'price_asc',
								},
								{
									label: 'Price: High to Low',
									value: 'price_desc',
								},
								{
									label: 'Most Popular',
									value: 'popular',
								},
							] }
							onChange={ ( val ) =>
								setAttributes( { defaultSort: val } )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div { ...blockProps }>
					<div className="wbcom-catalog-preview">
						<div className="wbcom-catalog-preview__toolbar">
							{ showSearch && (
								<div className="wbcom-catalog-preview__search">
									<span>Search products...</span>
								</div>
							) }
							{ showCategoryFilter && (
								<div className="wbcom-catalog-preview__filter">
									<span>{ selectedCatName || 'All Categories' }</span>
								</div>
							) }
							{ showPriceFilter && (
								<div className="wbcom-catalog-preview__filter">
									<span>Any Price</span>
								</div>
							) }
							{ showSort && (
								<div className="wbcom-catalog-preview__filter">
									<span>Sort by</span>
								</div>
							) }
						</div>
						<div
							className={ `wbcom-catalog-preview__grid wbcom-catalog-preview__grid--${ columns }` }
						>
							{ Array.from( { length: columns * 2 } ).map(
								( _, i ) => (
									<div
										key={ i }
										className="wbcom-catalog-preview__card"
									>
										<div className="wbcom-catalog-preview__image"></div>
										<div className="wbcom-catalog-preview__title"></div>
										<div className="wbcom-catalog-preview__excerpt"></div>
										<div className="wbcom-catalog-preview__price"></div>
									</div>
								)
							) }
						</div>
						<div className="wbcom-catalog-preview__loadmore">
							Load More
						</div>
					</div>
				</div>
			</>
		);
	},

	save( { attributes } ) {
		const {
			columns,
			perPage,
			showSearch,
			showCategoryFilter,
			showPriceFilter,
			showSort,
			defaultSort,
			defaultCategory,
		} = attributes;
		const blockProps = useBlockProps.save();

		return (
			<div
				{ ...blockProps }
				data-columns={ columns }
				data-per-page={ perPage }
				data-show-search={ showSearch ? 'true' : 'false' }
				data-show-category={ showCategoryFilter ? 'true' : 'false' }
				data-show-price={ showPriceFilter ? 'true' : 'false' }
				data-show-sort={ showSort ? 'true' : 'false' }
				data-default-sort={ defaultSort }
				data-default-category={ defaultCategory || 0 }
			>
				<div className="wbcom-catalog__loading">
					Loading products...
				</div>
			</div>
		);
	},
} );
