/**
 * CTA Section Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ColorPalette,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../../src/shared/components';
import { useUniqueId } from '../../../src/shared/hooks';
import { generateBlockCSS } from '../../../src/shared/utils/css';
import '../../../assets/shared/design-tokens.css';
import '../../../assets/shared/base.css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		heading,
		description,
		buttonText,
		buttonUrl,
		layout,
		backgroundColor,
		headingColor,
		descriptionColor,
		buttonBg,
		buttonColor,
		buttonBgHover,
		contentAlign,
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
		className: `wbe-block-${ uniqueId } wbe-cta wbe-cta--${ layout } wbe-cta--align-${ contentAlign }`,
		style: { backgroundColor },
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
						placeholder="https://"
					/>
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout Style', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ value: 'stacked', label: __( 'Stacked (Vertical)', 'wbcom-essential' ) },
							{ value: 'inline', label: __( 'Inline (Side by Side)', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>
					<SelectControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ contentAlign }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Background Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ backgroundColor }
							onChange={ ( value ) => setAttributes( { backgroundColor: value || '#f8f9fa' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<Divider />
					<BaseControl label={ __( 'Heading Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ headingColor }
							onChange={ ( value ) => setAttributes( { headingColor: value || '#1e1e2e' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Description Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ descriptionColor }
							onChange={ ( value ) => setAttributes( { descriptionColor: value || '#6c757d' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<Divider />
					<BaseControl label={ __( 'Button Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonBg }
							onChange={ ( value ) => setAttributes( { buttonBg: value || '#667eea' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button Text Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonColor }
							onChange={ ( value ) => setAttributes( { buttonColor: value || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button Hover Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonBgHover }
							onChange={ ( value ) => setAttributes( { buttonBgHover: value || '#5a6fd6' } ) }
							clearable={ false }
						/>
					</BaseControl>
				</PanelBody>

				{ /* Advanced Panel */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<div className="wbe-cta__body">
					<RichText
						tagName="h2"
						className="wbe-cta__heading"
						value={ heading }
						onChange={ ( value ) => setAttributes( { heading: value } ) }
						placeholder={ __( 'Enter heading...', 'wbcom-essential' ) }
						style={ { color: headingColor } }
					/>
					<RichText
						tagName="p"
						className="wbe-cta__description"
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
						placeholder={ __( 'Enter description...', 'wbcom-essential' ) }
						style={ { color: descriptionColor } }
					/>
				</div>
				<div className="wbe-cta__action">
					<RichText
						tagName="span"
						className="wbe-cta__btn"
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
						placeholder={ __( 'Button text...', 'wbcom-essential' ) }
						style={ {
							backgroundColor: buttonBg,
							color: buttonColor,
							'--wbe-cta-btn-hover-bg': buttonBgHover,
						} }
					/>
				</div>
			</div>
		</>
	);
}
