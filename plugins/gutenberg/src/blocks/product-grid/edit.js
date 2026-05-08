/**
 * Product Grid Block - Editor Component
 *
 * Uses ServerSideRender for live preview since this is a dynamic block.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	ColorPicker,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		columns,
		columnsTablet,
		columnsMobile,
		postsPerPage,
		orderBy,
		order,
		showImage,
		showPrice,
		showRating,
		showAddToCart,
		showSaleBadge,
		imageRatio,
		gap,
		cardBg,
		titleColor,
		priceColor,
		saleBadgeColor,
		padding,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		margin,
		marginTablet,
		marginMobile,
		marginUnit,
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
		className: `wbe-block-${ uniqueId } wbe-product-grid-editor`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Query Settings */ }
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Products Per Page', 'wbcom-essential' ) }
						value={ postsPerPage }
						onChange={ ( val ) => setAttributes( { postsPerPage: val } ) }
						min={ 1 }
						max={ 48 }
						step={ 1 }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Price', 'wbcom-essential' ), value: 'price' },
							{ label: __( 'Popularity', 'wbcom-essential' ), value: 'popularity' },
							{ label: __( 'Rating', 'wbcom-essential' ), value: 'rating' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Menu Order', 'wbcom-essential' ), value: 'menu_order' },
						] }
						onChange={ ( val ) => setAttributes( { orderBy: val } ) }
					/>
					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'wbcom-essential' ), value: 'DESC' },
							{ label: __( 'Ascending', 'wbcom-essential' ), value: 'ASC' },
						] }
						onChange={ ( val ) => setAttributes( { order: val } ) }
					/>
				</PanelBody>

				{ /* Layout Settings */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Columns (Desktop)', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( val ) => setAttributes( { columns: val } ) }
						min={ 1 }
						max={ 6 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Columns (Tablet)', 'wbcom-essential' ) }
						value={ columnsTablet }
						onChange={ ( val ) => setAttributes( { columnsTablet: val } ) }
						min={ 1 }
						max={ 4 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Columns (Mobile)', 'wbcom-essential' ) }
						value={ columnsMobile }
						onChange={ ( val ) => setAttributes( { columnsMobile: val } ) }
						min={ 1 }
						max={ 2 }
						step={ 1 }
					/>
					<RangeControl
						label={ __( 'Gap (px)', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( val ) => setAttributes( { gap: val } ) }
						min={ 0 }
						max={ 80 }
						step={ 4 }
					/>
					<SelectControl
						label={ __( 'Image Ratio', 'wbcom-essential' ) }
						value={ imageRatio }
						options={ [
							{ label: __( '1:1 (Square)', 'wbcom-essential' ), value: '1/1' },
							{ label: __( '4:3', 'wbcom-essential' ), value: '4/3' },
							{ label: __( '3:4 (Portrait)', 'wbcom-essential' ), value: '3/4' },
							{ label: __( '16:9', 'wbcom-essential' ), value: '16/9' },
						] }
						onChange={ ( val ) => setAttributes( { imageRatio: val } ) }
					/>
				</PanelBody>

				{ /* Card Settings */ }
				<PanelBody
					title={ __( 'Card Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Product Image', 'wbcom-essential' ) }
						checked={ showImage }
						onChange={ ( val ) => setAttributes( { showImage: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Price', 'wbcom-essential' ) }
						checked={ showPrice }
						onChange={ ( val ) => setAttributes( { showPrice: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Star Rating', 'wbcom-essential' ) }
						checked={ showRating }
						onChange={ ( val ) => setAttributes( { showRating: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Add to Cart', 'wbcom-essential' ) }
						checked={ showAddToCart }
						onChange={ ( val ) => setAttributes( { showAddToCart: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Sale Badge', 'wbcom-essential' ) }
						checked={ showSaleBadge }
						onChange={ ( val ) => setAttributes( { showSaleBadge: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Card Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ cardBg }
						onChange={ ( val ) => setAttributes( { cardBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Title Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ titleColor }
						onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Price Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ priceColor }
						onChange={ ( val ) => setAttributes( { priceColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Sale Badge Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ saleBadgeColor }
						onChange={ ( val ) => setAttributes( { saleBadgeColor: val } ) }
						enableAlpha
					/>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody
					title={ __( 'Spacing', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
						onUnitChange={ ( val ) => setAttributes( { paddingUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
						onUnitChange={ ( val ) => setAttributes( { marginUnit: val } ) }
					/>
				</PanelBody>

				{ /* Advanced */ }
				<PanelBody
					title={ __( 'Advanced', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/product-grid"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-product-grid__loading">
							<p>{ __( 'Loading products\u2026', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-product-grid__error">
							<p>{ __( 'Could not load products preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
