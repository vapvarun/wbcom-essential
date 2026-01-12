/**
 * Shape Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

// Predefined shape presets
const SHAPE_PRESETS = {
	'blob-1': { p1: 30, p2: 70, p3: 70, p4: 30, p5: 30, p6: 30, p7: 70, p8: 70 },
	'blob-2': { p1: 60, p2: 40, p3: 60, p4: 40, p5: 40, p6: 60, p7: 40, p8: 60 },
	'blob-3': { p1: 70, p2: 30, p3: 30, p4: 70, p5: 60, p6: 40, p7: 40, p8: 60 },
	circle: { p1: 50, p2: 50, p3: 50, p4: 50, p5: 50, p6: 50, p7: 50, p8: 50 },
	square: { p1: 0, p2: 0, p3: 0, p4: 0, p5: 0, p6: 0, p7: 0, p8: 0 },
	ellipse: { p1: 50, p2: 50, p3: 50, p4: 50, p5: 80, p6: 80, p7: 80, p8: 80 },
	organic: { p1: 42, p2: 58, p3: 50, p4: 50, p5: 56, p6: 44, p7: 50, p8: 50 },
	custom: null,
};

const HOVER_ANIMATIONS = [
	{ label: __( 'None', 'wbcom-essential' ), value: '' },
	{ label: __( 'Grow', 'wbcom-essential' ), value: 'grow' },
	{ label: __( 'Shrink', 'wbcom-essential' ), value: 'shrink' },
	{ label: __( 'Pulse', 'wbcom-essential' ), value: 'pulse' },
	{ label: __( 'Float', 'wbcom-essential' ), value: 'float' },
	{ label: __( 'Bob', 'wbcom-essential' ), value: 'bob' },
	{ label: __( 'Rotate', 'wbcom-essential' ), value: 'rotate' },
];

const DASHICONS = [
	{ label: __( 'None', 'wbcom-essential' ), value: '' },
	{ label: __( 'Star', 'wbcom-essential' ), value: 'star-filled' },
	{ label: __( 'Heart', 'wbcom-essential' ), value: 'heart' },
	{ label: __( 'Arrow Down', 'wbcom-essential' ), value: 'arrow-down-alt' },
	{ label: __( 'Arrow Right', 'wbcom-essential' ), value: 'arrow-right-alt' },
	{ label: __( 'Plus', 'wbcom-essential' ), value: 'plus-alt' },
	{ label: __( 'Chart', 'wbcom-essential' ), value: 'chart-bar' },
	{ label: __( 'Lightbulb', 'wbcom-essential' ), value: 'lightbulb' },
	{ label: __( 'Shield', 'wbcom-essential' ), value: 'shield' },
	{ label: __( 'Award', 'wbcom-essential' ), value: 'awards' },
	{ label: __( 'Performance', 'wbcom-essential' ), value: 'performance' },
	{ label: __( 'Visibility', 'wbcom-essential' ), value: 'visibility' },
	{ label: __( 'Admin Users', 'wbcom-essential' ), value: 'admin-users' },
	{ label: __( 'Portfolio', 'wbcom-essential' ), value: 'portfolio' },
	{ label: __( 'Format Quote', 'wbcom-essential' ), value: 'format-quote' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		shapePreset,
		point1,
		point2,
		point3,
		point4,
		point5,
		point6,
		point7,
		point8,
		rotation,
		width,
		height,
		backgroundColor,
		gradientFrom,
		gradientTo,
		gradientAngle,
		icon,
		iconColor,
		iconSize,
		iconRotation,
		svgWidth,
		svgHeight,
		iconBackgroundColor,
		iconBackgroundSize,
		iconBackgroundRadius,
		linkUrl,
		linkNewTab,
		alignment,
		hoverAnimation,
		borderWidth,
		borderStyle,
		borderColor,
		boxShadowEnabled,
		boxShadowHorizontal,
		boxShadowVertical,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowColor,
	} = attributes;

	const blockProps = useBlockProps();

	const applyPreset = ( preset ) => {
		const presetValues = SHAPE_PRESETS[ preset ];
		if ( presetValues ) {
			setAttributes( {
				shapePreset: preset,
				point1: presetValues.p1,
				point2: presetValues.p2,
				point3: presetValues.p3,
				point4: presetValues.p4,
				point5: presetValues.p5,
				point6: presetValues.p6,
				point7: presetValues.p7,
				point8: presetValues.p8,
			} );
		} else {
			setAttributes( { shapePreset: 'custom' } );
		}
	};

	const handlePointChange = ( point, value ) => {
		setAttributes( {
			[ point ]: value,
			shapePreset: 'custom',
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Shape Presets', 'wbcom-essential' ) } initialOpen>
					<ButtonGroup style={ { flexWrap: 'wrap', gap: '8px', marginBottom: '16px' } }>
						{ Object.keys( SHAPE_PRESETS ).filter( ( k ) => k !== 'custom' ).map( ( preset ) => (
							<Button
								key={ preset }
								isPrimary={ shapePreset === preset }
								isSecondary={ shapePreset !== preset }
								onClick={ () => applyPreset( preset ) }
								style={ { textTransform: 'capitalize' } }
							>
								{ preset.replace( '-', ' ' ) }
							</Button>
						) ) }
					</ButtonGroup>
				</PanelBody>

				<PanelBody title={ __( 'Shape Points', 'wbcom-essential' ) } initialOpen={ false }>
					<p style={ { fontSize: '12px', color: '#757575', marginBottom: '16px' } }>
						{ __( 'Adjust the 8 points to create custom blob shapes. Points 1-4 control horizontal curves, points 5-8 control vertical curves.', 'wbcom-essential' ) }
					</p>

					<RangeControl
						label={ __( 'Point 1 (Top-Left H)', 'wbcom-essential' ) }
						value={ point1 }
						onChange={ ( value ) => handlePointChange( 'point1', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 2 (Top-Right H)', 'wbcom-essential' ) }
						value={ point2 }
						onChange={ ( value ) => handlePointChange( 'point2', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 3 (Bottom-Right H)', 'wbcom-essential' ) }
						value={ point3 }
						onChange={ ( value ) => handlePointChange( 'point3', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 4 (Bottom-Left H)', 'wbcom-essential' ) }
						value={ point4 }
						onChange={ ( value ) => handlePointChange( 'point4', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 5 (Top-Left V)', 'wbcom-essential' ) }
						value={ point5 }
						onChange={ ( value ) => handlePointChange( 'point5', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 6 (Top-Right V)', 'wbcom-essential' ) }
						value={ point6 }
						onChange={ ( value ) => handlePointChange( 'point6', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 7 (Bottom-Right V)', 'wbcom-essential' ) }
						value={ point7 }
						onChange={ ( value ) => handlePointChange( 'point7', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Point 8 (Bottom-Left V)', 'wbcom-essential' ) }
						value={ point8 }
						onChange={ ( value ) => handlePointChange( 'point8', value ) }
						min={ 0 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Rotation', 'wbcom-essential' ) }
						value={ rotation }
						onChange={ ( value ) => setAttributes( { rotation: value } ) }
						min={ 0 }
						max={ 360 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Dimensions', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Width (px)', 'wbcom-essential' ) }
						value={ width }
						onChange={ ( value ) => setAttributes( { width: value } ) }
						min={ 50 }
						max={ 800 }
					/>

					<RangeControl
						label={ __( 'Height (px)', 'wbcom-essential' ) }
						value={ height }
						onChange={ ( value ) => setAttributes( { height: value } ) }
						min={ 50 }
						max={ 800 }
					/>

					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'flex-start' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme palette.', 'wbcom-essential' )
							: __( 'Enable to use theme colors instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>

					{ ! useThemeColors && (
						<>
							<ColorControl
								label={ __( 'Background Color', 'wbcom-essential' ) }
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>

							<p style={ { marginTop: '20px', fontWeight: '500' } }>
								{ __( 'Gradient (Optional)', 'wbcom-essential' ) }
							</p>

							<ColorControl
								label={ __( 'Gradient From', 'wbcom-essential' ) }
								value={ gradientFrom }
								onChange={ ( value ) => setAttributes( { gradientFrom: value } ) }
							/>

							<ColorControl
								label={ __( 'Gradient To', 'wbcom-essential' ) }
								value={ gradientTo }
								onChange={ ( value ) => setAttributes( { gradientTo: value } ) }
							/>
						</>
					) }

					<RangeControl
						label={ __( 'Gradient Angle', 'wbcom-essential' ) }
						value={ gradientAngle }
						onChange={ ( value ) => setAttributes( { gradientAngle: value } ) }
						min={ 0 }
						max={ 360 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Icon', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Icon', 'wbcom-essential' ) }
						value={ icon }
						options={ DASHICONS }
						onChange={ ( value ) => setAttributes( { icon: value } ) }
					/>

					{ icon && (
						<>
							{ ! useThemeColors && (
								<ColorControl
									label={ __( 'Icon Color', 'wbcom-essential' ) }
									value={ iconColor }
									onChange={ ( value ) => setAttributes( { iconColor: value } ) }
								/>
							) }

							<RangeControl
								label={ __( 'Icon Size (px)', 'wbcom-essential' ) }
								value={ iconSize }
								onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								min={ 16 }
								max={ 200 }
							/>

							<RangeControl
								label={ __( 'Icon Rotation', 'wbcom-essential' ) }
								value={ iconRotation }
								onChange={ ( value ) => setAttributes( { iconRotation: value } ) }
								min={ 0 }
								max={ 360 }
							/>

							<p style={ { marginTop: '20px', fontWeight: '500', borderTop: '1px solid #ddd', paddingTop: '16px' } }>
								{ __( 'SVG Dimensions (Optional)', 'wbcom-essential' ) }
							</p>
							<p style={ { fontSize: '12px', color: '#757575', marginBottom: '12px' } }>
								{ __( 'Override icon dimensions for SVG icons. Set to 0 to use icon size.', 'wbcom-essential' ) }
							</p>

							<RangeControl
								label={ __( 'SVG Width (px)', 'wbcom-essential' ) }
								value={ svgWidth }
								onChange={ ( value ) => setAttributes( { svgWidth: value } ) }
								min={ 0 }
								max={ 500 }
							/>

							<RangeControl
								label={ __( 'SVG Height (px)', 'wbcom-essential' ) }
								value={ svgHeight }
								onChange={ ( value ) => setAttributes( { svgHeight: value } ) }
								min={ 0 }
								max={ 500 }
							/>

							{ ! useThemeColors && (
								<>
									<p style={ { marginTop: '20px', fontWeight: '500', borderTop: '1px solid #ddd', paddingTop: '16px' } }>
										{ __( 'Icon Background', 'wbcom-essential' ) }
									</p>

									<ColorControl
										label={ __( 'Background Color', 'wbcom-essential' ) }
										value={ iconBackgroundColor }
										onChange={ ( value ) => setAttributes( { iconBackgroundColor: value } ) }
									/>
								</>
							) }

							{ iconBackgroundColor && (
								<>
									<RangeControl
										label={ __( 'Background Size (px)', 'wbcom-essential' ) }
										value={ iconBackgroundSize }
										onChange={ ( value ) => setAttributes( { iconBackgroundSize: value } ) }
										min={ 20 }
										max={ 300 }
									/>

									<RangeControl
										label={ __( 'Background Radius (%)', 'wbcom-essential' ) }
										value={ iconBackgroundRadius }
										onChange={ ( value ) => setAttributes( { iconBackgroundRadius: value } ) }
										min={ 0 }
										max={ 50 }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Border', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Width (px)', 'wbcom-essential' ) }
						value={ borderWidth }
						onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
						min={ 0 }
						max={ 20 }
					/>

					{ borderWidth > 0 && (
						<>
							<SelectControl
								label={ __( 'Border Style', 'wbcom-essential' ) }
								value={ borderStyle }
								options={ [
									{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
									{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
									{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
									{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
									{ label: __( 'Groove', 'wbcom-essential' ), value: 'groove' },
									{ label: __( 'Ridge', 'wbcom-essential' ), value: 'ridge' },
								] }
								onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
							/>

							{ ! useThemeColors && (
								<ColorControl
									label={ __( 'Border Color', 'wbcom-essential' ) }
									value={ borderColor }
									onChange={ ( value ) => setAttributes( { borderColor: value } ) }
								/>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Box Shadow', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Box Shadow', 'wbcom-essential' ) }
						checked={ boxShadowEnabled }
						onChange={ ( value ) => setAttributes( { boxShadowEnabled: value } ) }
					/>

					{ boxShadowEnabled && (
						<>
							<RangeControl
								label={ __( 'Horizontal Offset (px)', 'wbcom-essential' ) }
								value={ boxShadowHorizontal }
								onChange={ ( value ) => setAttributes( { boxShadowHorizontal: value } ) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Vertical Offset (px)', 'wbcom-essential' ) }
								value={ boxShadowVertical }
								onChange={ ( value ) => setAttributes( { boxShadowVertical: value } ) }
								min={ -100 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Blur (px)', 'wbcom-essential' ) }
								value={ boxShadowBlur }
								onChange={ ( value ) => setAttributes( { boxShadowBlur: value } ) }
								min={ 0 }
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Spread (px)', 'wbcom-essential' ) }
								value={ boxShadowSpread }
								onChange={ ( value ) => setAttributes( { boxShadowSpread: value } ) }
								min={ -50 }
								max={ 100 }
							/>

							{ ! useThemeColors && (
								<ColorControl
									label={ __( 'Shadow Color', 'wbcom-essential' ) }
									value={ boxShadowColor }
									onChange={ ( value ) => setAttributes( { boxShadowColor: value } ) }
								/>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Link & Animation', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Link URL', 'wbcom-essential' ) }
						value={ linkUrl }
						onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
						type="url"
					/>

					<ToggleControl
						label={ __( 'Open in New Tab', 'wbcom-essential' ) }
						checked={ linkNewTab }
						onChange={ ( value ) => setAttributes( { linkNewTab: value } ) }
					/>

					<SelectControl
						label={ __( 'Hover Animation', 'wbcom-essential' ) }
						value={ hoverAnimation }
						options={ HOVER_ANIMATIONS }
						onChange={ ( value ) => setAttributes( { hoverAnimation: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/shape"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
