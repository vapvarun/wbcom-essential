/**
 * Portfolio Grid Block - Editor Component
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
import { useSelect } from '@wordpress/data';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		columns,
		columnsTablet,
		columnsMobile,
		postsPerPage,
		postType,
		showFilter,
		showExcerpt,
		showCategory,
		imageRatio,
		gap,
		hoverEffect,
		overlayColor,
		titleColor,
		filterActiveColor,
		cardBorderRadius,
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

	// Fetch available post types.
	const postTypes = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) {
			return [ { label: __( 'Post', 'wbcom-essential' ), value: 'post' } ];
		}
		return types
			.filter( ( t ) => t.viewable && t.slug !== 'attachment' )
			.map( ( t ) => ( { label: t.name, value: t.slug } ) );
	}, [] );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-portfolio-grid-editor`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Query Settings */ }
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Post Type', 'wbcom-essential' ) }
						value={ postType }
						options={ postTypes }
						onChange={ ( val ) => setAttributes( { postType: val } ) }
					/>
					<RangeControl
						label={ __( 'Posts Per Page', 'wbcom-essential' ) }
						value={ postsPerPage }
						onChange={ ( val ) => setAttributes( { postsPerPage: val } ) }
						min={ 1 }
						max={ 48 }
						step={ 1 }
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
						max={ 64 }
						step={ 4 }
					/>
					<SelectControl
						label={ __( 'Image Ratio', 'wbcom-essential' ) }
						value={ imageRatio }
						options={ [
							{ label: __( '1:1 (Square)', 'wbcom-essential' ), value: '1/1' },
							{ label: __( '4:3', 'wbcom-essential' ), value: '4/3' },
							{ label: __( '3:2', 'wbcom-essential' ), value: '3/2' },
							{ label: __( '16:9', 'wbcom-essential' ), value: '16/9' },
							{ label: __( '3:4 (Portrait)', 'wbcom-essential' ), value: '3/4' },
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
						label={ __( 'Show Filter Bar', 'wbcom-essential' ) }
						checked={ showFilter }
						onChange={ ( val ) => setAttributes( { showFilter: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Category Badge', 'wbcom-essential' ) }
						checked={ showCategory }
						onChange={ ( val ) => setAttributes( { showCategory: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( val ) => setAttributes( { showExcerpt: val } ) }
						__nextHasNoMarginBottom
					/>
					<SelectControl
						label={ __( 'Hover Effect', 'wbcom-essential' ) }
						value={ hoverEffect }
						options={ [
							{ label: __( 'Overlay', 'wbcom-essential' ), value: 'overlay' },
							{ label: __( 'Zoom', 'wbcom-essential' ), value: 'zoom' },
							{ label: __( 'Slide Up', 'wbcom-essential' ), value: 'slide' },
						] }
						onChange={ ( val ) => setAttributes( { hoverEffect: val } ) }
					/>
					<RangeControl
						label={ __( 'Card Border Radius (px)', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
						min={ 0 }
						max={ 40 }
						step={ 1 }
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Overlay Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ overlayColor }
						onChange={ ( val ) => setAttributes( { overlayColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Title Color (on hover)', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ titleColor }
						onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Filter Active Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ filterActiveColor }
						onChange={ ( val ) => setAttributes( { filterActiveColor: val } ) }
						enableAlpha
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
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
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

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/portfolio-grid"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-portfolio-grid__loading">
							<p>{ __( 'Loading portfolio…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-portfolio-grid__error">
							<p>{ __( 'Could not load portfolio preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
