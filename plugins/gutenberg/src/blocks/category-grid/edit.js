/**
 * Category Grid Block - Edit Component (v2)
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody, RangeControl, SelectControl, ToggleControl,
	Spinner, Placeholder, __experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		useThemeColors, columns, columnsTablet, columnsMobile,
		selectedCategories, excludeEmpty, maxCategories,
		showPostCount, showImage, imageRatio, gap, cardBorderRadius,
		cardBgColor, nameColor, countColor, overlayColor,
		orderBy, order,
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

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbcom-essential-category-grid-editor`,
	} );

	const categories = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		return getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
			hide_empty: false,
		} );
	}, [] );

	const categoryOptions = ( categories || [] ).map( ( cat ) => ( {
		value: String( cat.id ),
		label: cat.name,
	} ) );

	const imageRatioOptions = [
		{ value: '1',    label: __( 'Square (1:1)',    'wbcom-essential' ) },
		{ value: '0.75', label: __( 'Portrait (3:4)',  'wbcom-essential' ) },
		{ value: '1.33', label: __( 'Landscape (4:3)', 'wbcom-essential' ) },
		{ value: '0.56', label: __( 'Wide (16:9)',     'wbcom-essential' ) },
	];

	const orderByOptions = [
		{ value: 'name',  label: __( 'Name',       'wbcom-essential' ) },
		{ value: 'count', label: __( 'Post Count', 'wbcom-essential' ) },
		{ value: 'id',    label: __( 'ID',         'wbcom-essential' ) },
	];

	const orderOptions = [
		{ value: 'ASC',  label: __( 'Ascending',  'wbcom-essential' ) },
		{ value: 'DESC', label: __( 'Descending', 'wbcom-essential' ) },
	];

	const onChangeSelectedCategories = ( newValues ) => {
		setAttributes( { selectedCategories: newValues.map( Number ) } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl label={ __( 'Columns (Desktop)', 'wbcom-essential' ) }
						value={ columns } onChange={ ( v ) => setAttributes( { columns: v } ) }
						min={ 2 } max={ 6 } />
					<RangeControl label={ __( 'Columns (Tablet)', 'wbcom-essential' ) }
						value={ columnsTablet } onChange={ ( v ) => setAttributes( { columnsTablet: v } ) }
						min={ 1 } max={ 4 } />
					<RangeControl label={ __( 'Columns (Mobile)', 'wbcom-essential' ) }
						value={ columnsMobile } onChange={ ( v ) => setAttributes( { columnsMobile: v } ) }
						min={ 1 } max={ 2 } />
					<RangeControl label={ __( 'Gap (px)', 'wbcom-essential' ) }
						value={ gap } onChange={ ( v ) => setAttributes( { gap: v } ) }
						min={ 0 } max={ 60 } />
					<RangeControl label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
						value={ cardBorderRadius } onChange={ ( v ) => setAttributes( { cardBorderRadius: v } ) }
						min={ 0 } max={ 30 } />
				</PanelBody>

				<PanelBody title={ __( 'Query', 'wbcom-essential' ) } initialOpen={ false }>
					{ categories && categories.length > 0 && (
						<SelectControl
							multiple
							label={ __( 'Select Categories', 'wbcom-essential' ) }
							value={ selectedCategories.map( String ) }
							options={ categoryOptions }
							onChange={ onChangeSelectedCategories }
							help={ __( 'Hold Ctrl/Cmd to select multiple. Leave empty for all.', 'wbcom-essential' ) }
						/>
					) }
					<RangeControl label={ __( 'Max Categories', 'wbcom-essential' ) }
						value={ maxCategories } onChange={ ( v ) => setAttributes( { maxCategories: v } ) }
						min={ 1 } max={ 24 } />
					<ToggleControl label={ __( 'Exclude Empty Categories', 'wbcom-essential' ) }
						checked={ excludeEmpty } onChange={ ( v ) => setAttributes( { excludeEmpty: v } ) } />
					<SelectControl label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy } options={ orderByOptions }
						onChange={ ( v ) => setAttributes( { orderBy: v } ) } />
					<SelectControl label={ __( 'Order', 'wbcom-essential' ) }
						value={ order } options={ orderOptions }
						onChange={ ( v ) => setAttributes( { order: v } ) } />
				</PanelBody>

				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl label={ __( 'Show Post Count', 'wbcom-essential' ) }
						checked={ showPostCount } onChange={ ( v ) => setAttributes( { showPostCount: v } ) } />
					<ToggleControl label={ __( 'Show Image', 'wbcom-essential' ) }
						checked={ showImage } onChange={ ( v ) => setAttributes( { showImage: v } ) } />
					{ showImage && (
						<SelectControl label={ __( 'Image Ratio', 'wbcom-essential' ) }
							value={ imageRatio } options={ imageRatioOptions }
							onChange={ ( v ) => setAttributes( { imageRatio: v } ) } />
					) }
				</PanelBody>

				<PanelBody title={ __( 'Color Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' ) }
						checked={ useThemeColors }
						onChange={ ( v ) => setAttributes( { useThemeColors: v } ) }
					/>
					{ ! useThemeColors && (
						<>
							<ColorControl label={ __( 'Card Background', 'wbcom-essential' ) }
								value={ cardBgColor }
								onChange={ ( v ) => setAttributes( { cardBgColor: v } ) } />
							<ColorControl label={ __( 'Category Name', 'wbcom-essential' ) }
								value={ nameColor }
								onChange={ ( v ) => setAttributes( { nameColor: v } ) } />
							<ColorControl label={ __( 'Post Count', 'wbcom-essential' ) }
								value={ countColor }
								onChange={ ( v ) => setAttributes( { countColor: v } ) } />
							<ColorControl label={ __( 'Overlay Color', 'wbcom-essential' ) }
								value={ overlayColor }
								onChange={ ( v ) => setAttributes( { overlayColor: v } ) } />
						</>
					) }
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
				<ServerSideRender
					block="wbcom-essential/category-grid"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<Placeholder icon="category" label={ __( 'Category Grid', 'wbcom-essential' ) }>
							<Spinner />
						</Placeholder>
					) }
					ErrorResponsePlaceholder={ () => (
						<Placeholder icon="warning" label={ __( 'Category Grid', 'wbcom-essential' ) }>
							{ __( 'Error loading categories.', 'wbcom-essential' ) }
						</Placeholder>
					) }
					EmptyResponsePlaceholder={ () => (
						<Placeholder icon="category" label={ __( 'Category Grid', 'wbcom-essential' ) }>
							{ __( 'No categories found.', 'wbcom-essential' ) }
						</Placeholder>
					) }
				/>
			</div>
		</>
	);
}
