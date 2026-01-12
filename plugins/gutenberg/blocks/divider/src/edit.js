/**
 * Divider Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	Dashicon,
} from '@wordpress/components';

const ICON_OPTIONS = [
	{ value: 'star-filled', label: 'Star' },
	{ value: 'heart', label: 'Heart' },
	{ value: 'marker', label: 'Diamond' },
	{ value: 'admin-generic', label: 'Gear' },
	{ value: 'awards', label: 'Award' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors, style, width, widthUnit, thickness, color, alignment,
		marginTop, marginBottom, showIcon, icon, iconSize, iconColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-divider align-${ alignment } style-${ style }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: {
			'--divider-width': `${ width }${ widthUnit }`,
			'--divider-thickness': `${ thickness }px`,
			'--margin-top': `${ marginTop }px`,
			'--margin-bottom': `${ marginBottom }px`,
			'--icon-size': `${ iconSize }px`,
			// Only apply color styles when not using theme colors.
			...( ! useThemeColors && {
				'--divider-color': color || undefined,
				'--icon-color': iconColor || color || undefined,
			} ),
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Divider Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Style', 'wbcom-essential' ) }
						value={ style }
						options={ [
							{ value: 'solid', label: __( 'Solid', 'wbcom-essential' ) },
							{ value: 'dashed', label: __( 'Dashed', 'wbcom-essential' ) },
							{ value: 'dotted', label: __( 'Dotted', 'wbcom-essential' ) },
							{ value: 'double', label: __( 'Double', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { style: value } ) }
					/>
					<RangeControl
						label={ __( 'Width (%)', 'wbcom-essential' ) }
						value={ width }
						onChange={ ( value ) => setAttributes( { width: value } ) }
						min={ 10 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Thickness', 'wbcom-essential' ) }
						value={ thickness }
						onChange={ ( value ) => setAttributes( { thickness: value } ) }
						min={ 1 }
						max={ 10 }
					/>
					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<>
							<p>{ __( 'Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ color }
								onChange={ ( value ) => setAttributes( { color: value } ) }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Icon', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Icon', 'wbcom-essential' ) }
						checked={ showIcon }
						onChange={ ( value ) => setAttributes( { showIcon: value } ) }
					/>
					{ showIcon && (
						<>
							<SelectControl
								label={ __( 'Icon', 'wbcom-essential' ) }
								value={ icon }
								options={ ICON_OPTIONS }
								onChange={ ( value ) => setAttributes( { icon: value } ) }
							/>
							<RangeControl
								label={ __( 'Icon Size', 'wbcom-essential' ) }
								value={ iconSize }
								onChange={ ( value ) => setAttributes( { iconSize: value } ) }
								min={ 12 }
								max={ 48 }
							/>
							{ ! useThemeColors && (
								<>
									<p>{ __( 'Icon Color', 'wbcom-essential' ) }</p>
									<ColorPalette
										value={ iconColor }
										onChange={ ( value ) => setAttributes( { iconColor: value } ) }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Margin Top', 'wbcom-essential' ) }
						value={ marginTop }
						onChange={ ( value ) => setAttributes( { marginTop: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Margin Bottom', 'wbcom-essential' ) }
						value={ marginBottom }
						onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ showIcon ? (
					<>
						<span className="wbcom-essential-divider__line"></span>
						<span className="wbcom-essential-divider__icon">
							<Dashicon icon={ icon } />
						</span>
						<span className="wbcom-essential-divider__line"></span>
					</>
				) : (
					<span className="wbcom-essential-divider__line wbcom-essential-divider__line--full"></span>
				) }
			</div>
		</>
	);
}
