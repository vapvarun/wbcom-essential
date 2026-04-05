/**
 * Text Rotator Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	SelectControl,
	ColorPicker,
	TextControl,
	BaseControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

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
		beforeText,
		rotatingTexts,
		afterText,
		animationType,
		speed,
		textColor,
		rotatingColor,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		fontSizeUnit,
		textAlign,
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

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tr-text-color: ${ textColor };`,
		`  --wbe-tr-rotating-color: ${ rotatingColor };`,
		`  --wbe-tr-font-size: ${ fontSize }${ fontSizeUnit };`,
		`  --wbe-tr-font-size-tablet: ${ fontSizeTablet }${ fontSizeUnit };`,
		`  --wbe-tr-font-size-mobile: ${ fontSizeMobile }${ fontSizeUnit };`,
		`  --wbe-tr-text-align: ${ textAlign };`,
		`}`,
	].join( '\n' );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-text-rotator`,
	} );

	const addText = () => {
		setAttributes( { rotatingTexts: [ ...rotatingTexts, __( 'New Text', 'wbcom-essential' ) ] } );
	};

	const removeText = ( index ) => {
		setAttributes( { rotatingTexts: rotatingTexts.filter( ( _, i ) => i !== index ) } );
	};

	const updateText = ( index, value ) => {
		const updated = rotatingTexts.map( ( t, i ) => ( i === index ? value : t ) );
		setAttributes( { rotatingTexts: updated } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Before Text', 'wbcom-essential' ) }
						value={ beforeText }
						onChange={ ( value ) => setAttributes( { beforeText: value } ) }
					/>
					<BaseControl
						label={ __( 'Rotating Texts', 'wbcom-essential' ) }
						help={ __( 'Each entry rotates in sequence.', 'wbcom-essential' ) }
						id="wbe-tr-rotating-texts"
					>
						{ rotatingTexts.map( ( text, index ) => (
							<div key={ index } className="wbe-tr-editor-row">
								<TextControl
									label={ `${ __( 'Text', 'wbcom-essential' ) } ${ index + 1 }` }
									value={ text }
									onChange={ ( val ) => updateText( index, val ) }
									hideLabelFromVision={ rotatingTexts.length > 1 }
								/>
								<Button
									icon="trash"
									label={ __( 'Remove text', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ () => removeText( index ) }
									disabled={ rotatingTexts.length <= 1 }
									className="wbe-tr-editor-row__remove"
								/>
							</div>
						) ) }
						<Button variant="secondary" onClick={ addText }>
							{ __( '+ Add Text', 'wbcom-essential' ) }
						</Button>
					</BaseControl>
					<TextControl
						label={ __( 'After Text', 'wbcom-essential' ) }
						value={ afterText }
						onChange={ ( value ) => setAttributes( { afterText: value } ) }
					/>
				</PanelBody>

				{ /* Animation Panel */ }
				<PanelBody title={ __( 'Animation', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Animation Type', 'wbcom-essential' ) }
						value={ animationType }
						options={ [
							{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
							{ label: __( 'Slide', 'wbcom-essential' ), value: 'slide' },
							{ label: __( 'Typing', 'wbcom-essential' ), value: 'typing' },
						] }
						onChange={ ( value ) => setAttributes( { animationType: value } ) }
					/>
					<RangeControl
						label={ __( 'Speed (ms per word)', 'wbcom-essential' ) }
						value={ speed }
						onChange={ ( value ) => setAttributes( { speed: value } ) }
						min={ 500 }
						max={ 6000 }
						step={ 100 }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Font Size (Desktop, px)', 'wbcom-essential' ) }
						value={ fontSize }
						onChange={ ( value ) => setAttributes( { fontSize: value } ) }
						min={ 12 }
						max={ 120 }
					/>
					<RangeControl
						label={ __( 'Font Size (Tablet, px)', 'wbcom-essential' ) }
						value={ fontSizeTablet }
						onChange={ ( value ) => setAttributes( { fontSizeTablet: value } ) }
						min={ 12 }
						max={ 96 }
					/>
					<RangeControl
						label={ __( 'Font Size (Mobile, px)', 'wbcom-essential' ) }
						value={ fontSizeMobile }
						onChange={ ( value ) => setAttributes( { fontSizeMobile: value } ) }
						min={ 12 }
						max={ 72 }
					/>
					<SelectControl
						label={ __( 'Text Align', 'wbcom-essential' ) }
						value={ textAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { textAlign: value } ) }
					/>
					<BaseControl label={ __( 'Text Color', 'wbcom-essential' ) } id="wbe-tr-text-color">
						<ColorPicker
							color={ textColor }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Rotating Text Color', 'wbcom-essential' ) } id="wbe-tr-rotating-color">
						<ColorPicker
							color={ rotatingColor }
							onChange={ ( value ) => setAttributes( { rotatingColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( value ) => setAttributes( value ) }
					/>
				</PanelBody>

				{ /* Spacing Panel */ }
				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( value ) => setAttributes( { margin: value } ) }
						onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
				</PanelBody>

				{ /* Advanced Panel */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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
				<style>{ tokenPropsCss }</style>

				<p className="wbe-text-rotator__sentence">
					{ beforeText && (
						<span className="wbe-text-rotator__before">{ beforeText } </span>
					) }
					<span className="wbe-text-rotator__rotating wbe-text-rotator__rotating--preview">
						{ rotatingTexts[ 0 ] }
					</span>
					{ afterText && (
						<span className="wbe-text-rotator__after"> { afterText }</span>
					) }
				</p>
			</div>
		</>
	);
}
