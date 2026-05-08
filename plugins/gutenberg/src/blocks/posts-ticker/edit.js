/**
 * Posts Ticker Block - Editor Component
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
	TextControl,
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

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		postsPerPage,
		speed,
		direction,
		pauseOnHover,
		showDate,
		showCategory,
		label,
		labelBg,
		labelColor,
		tickerBg,
		textColor,
		linkColor,
		separatorStyle,
		height,
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

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-posts-ticker-editor`,
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
						label={ __( 'Posts Per Page', 'wbcom-essential' ) }
						value={ postsPerPage }
						onChange={ ( val ) => setAttributes( { postsPerPage: val } ) }
						min={ 2 }
						max={ 30 }
						step={ 1 }
					/>
				</PanelBody>

				{ /* Ticker Settings */ }
				<PanelBody
					title={ __( 'Ticker Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Label', 'wbcom-essential' ) }
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
						placeholder={ __( 'Latest News', 'wbcom-essential' ) }
					/>
					<RangeControl
						label={ __( 'Scroll Speed (lower = faster)', 'wbcom-essential' ) }
						value={ speed }
						onChange={ ( val ) => setAttributes( { speed: val } ) }
						min={ 5 }
						max={ 120 }
						step={ 5 }
					/>
					<SelectControl
						label={ __( 'Direction', 'wbcom-essential' ) }
						value={ direction }
						options={ [
							{ label: __( 'Left (RTL scroll)', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Right (LTR scroll)', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { direction: val } ) }
					/>
					<RangeControl
						label={ __( 'Height (px)', 'wbcom-essential' ) }
						value={ height }
						onChange={ ( val ) => setAttributes( { height: val } ) }
						min={ 32 }
						max={ 80 }
						step={ 2 }
					/>
					<SelectControl
						label={ __( 'Separator Style', 'wbcom-essential' ) }
						value={ separatorStyle }
						options={ [
							{ label: __( 'Dot (•)', 'wbcom-essential' ), value: 'dot' },
							{ label: __( 'Pipe (|)', 'wbcom-essential' ), value: 'pipe' },
							{ label: __( 'Slash (/)', 'wbcom-essential' ), value: 'slash' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( val ) => setAttributes( { separatorStyle: val } ) }
					/>
					<ToggleControl
						label={ __( 'Pause on Hover', 'wbcom-essential' ) }
						checked={ pauseOnHover }
						onChange={ ( val ) => setAttributes( { pauseOnHover: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Date', 'wbcom-essential' ) }
						checked={ showDate }
						onChange={ ( val ) => setAttributes( { showDate: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Category', 'wbcom-essential' ) }
						checked={ showCategory }
						onChange={ ( val ) => setAttributes( { showCategory: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Label Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ labelBg }
						onChange={ ( val ) => setAttributes( { labelBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Label Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ labelColor }
						onChange={ ( val ) => setAttributes( { labelColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Ticker Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ tickerBg }
						onChange={ ( val ) => setAttributes( { tickerBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ textColor }
						onChange={ ( val ) => setAttributes( { textColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Link / Accent Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ linkColor }
						onChange={ ( val ) => setAttributes( { linkColor: val } ) }
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
					block="wbcom-essential/posts-ticker"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-posts-ticker__loading">
							<p>{ __( 'Loading ticker…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-posts-ticker__error">
							<p>{ __( 'Could not load ticker preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
