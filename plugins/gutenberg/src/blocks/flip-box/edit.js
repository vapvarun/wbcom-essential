/**
 * Flip Box Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	ColorPicker,
	RangeControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

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
		frontTitle,
		frontDescription,
		frontIcon,
		frontBg,
		frontColor,
		backTitle,
		backDescription,
		backButtonText,
		backButtonUrl,
		backBg,
		backColor,
		flipDirection,
		height,
		heightUnit,
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

	// Preview which face is shown in the editor
	const [ previewBack, setPreviewBack ] = useState( false );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-flip-box wbe-flip-box--${ flipDirection }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const borderRadiusVal = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '12px';

	const shadowVal = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-flip-front-bg: ${ frontBg };`,
		`  --wbe-flip-front-color: ${ frontColor };`,
		`  --wbe-flip-back-bg: ${ backBg };`,
		`  --wbe-flip-back-color: ${ backColor };`,
		`  --wbe-flip-height: ${ height }${ heightUnit };`,
		`  --wbe-flip-radius: ${ borderRadiusVal };`,
		`  --wbe-flip-shadow: ${ shadowVal };`,
		`}`,
	].join( '\n' );

	return (
		<>
			<InspectorControls>
				{ /* Content - Front Face */ }
				<PanelBody
					title={ __( 'Front Face', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Icon / Emoji', 'wbcom-essential' ) }
						value={ frontIcon }
						onChange={ ( val ) => setAttributes( { frontIcon: val } ) }
						help={ __( 'Paste an emoji or icon character.', 'wbcom-essential' ) }
					/>
					<TextControl
						label={ __( 'Title', 'wbcom-essential' ) }
						value={ frontTitle }
						onChange={ ( val ) => setAttributes( { frontTitle: val } ) }
					/>
					<TextControl
						label={ __( 'Description', 'wbcom-essential' ) }
						value={ frontDescription }
						onChange={ ( val ) => setAttributes( { frontDescription: val } ) }
					/>
					<p><strong>{ __( 'Background Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ frontBg }
						onChange={ ( val ) => setAttributes( { frontBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ frontColor }
						onChange={ ( val ) => setAttributes( { frontColor: val } ) }
						enableAlpha
					/>
				</PanelBody>

				{ /* Content - Back Face */ }
				<PanelBody
					title={ __( 'Back Face', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Title', 'wbcom-essential' ) }
						value={ backTitle }
						onChange={ ( val ) => setAttributes( { backTitle: val } ) }
					/>
					<TextControl
						label={ __( 'Description', 'wbcom-essential' ) }
						value={ backDescription }
						onChange={ ( val ) => setAttributes( { backDescription: val } ) }
					/>
					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ backButtonText }
						onChange={ ( val ) => setAttributes( { backButtonText: val } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ backButtonUrl }
						onChange={ ( val ) => setAttributes( { backButtonUrl: val } ) }
						type="url"
					/>
					<p><strong>{ __( 'Background Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ backBg }
						onChange={ ( val ) => setAttributes( { backBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ backColor }
						onChange={ ( val ) => setAttributes( { backColor: val } ) }
						enableAlpha
					/>
				</PanelBody>

				{ /* Layout */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Flip Direction', 'wbcom-essential' ) }
						value={ flipDirection }
						options={ [
							{ label: __( 'Horizontal (left ↔ right)', 'wbcom-essential' ), value: 'horizontal' },
							{ label: __( 'Vertical (top ↕ bottom)', 'wbcom-essential' ), value: 'vertical' },
						] }
						onChange={ ( val ) => setAttributes( { flipDirection: val } ) }
					/>
					<RangeControl
						label={ __( 'Card Height (px)', 'wbcom-essential' ) }
						value={ height }
						onChange={ ( val ) => setAttributes( { height: val } ) }
						min={ 150 }
						max={ 600 }
						step={ 10 }
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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

			<div { ...blockProps }>
				{ css && <style>{ css }</style> }
				<style>{ tokenCss }</style>

				{ /* Editor toggle to preview back face */ }
				<div className="wbe-flip-box__editor-toggle">
					<button
						type="button"
						className={ `wbe-flip-box__toggle-btn${ ! previewBack ? ' is-active' : '' }` }
						onClick={ () => setPreviewBack( false ) }
					>
						{ __( 'Front', 'wbcom-essential' ) }
					</button>
					<button
						type="button"
						className={ `wbe-flip-box__toggle-btn${ previewBack ? ' is-active' : '' }` }
						onClick={ () => setPreviewBack( true ) }
					>
						{ __( 'Back', 'wbcom-essential' ) }
					</button>
				</div>

				{ /* Card preview */ }
				<div
					className="wbe-flip-box__inner"
					aria-hidden="true"
					style={ { transform: previewBack
						? ( flipDirection === 'vertical' ? 'rotateX(180deg)' : 'rotateY(180deg)' )
						: 'none',
					} }
				>
					{ /* Front face */ }
					<div className="wbe-flip-box__front">
						{ frontIcon && (
							<span className="wbe-flip-box__icon" aria-hidden="true">
								{ frontIcon }
							</span>
						) }
						<h3 className="wbe-flip-box__title">{ frontTitle }</h3>
						<p className="wbe-flip-box__description">{ frontDescription }</p>
					</div>

					{ /* Back face */ }
					<div className="wbe-flip-box__back">
						<h3 className="wbe-flip-box__title">{ backTitle }</h3>
						<p className="wbe-flip-box__description">{ backDescription }</p>
						{ backButtonText && (
							<span className="wbe-flip-box__btn">{ backButtonText }</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
