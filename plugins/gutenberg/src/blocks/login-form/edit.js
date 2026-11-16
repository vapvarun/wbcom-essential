/**
 * Login Form Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	ColorPalette,
	BaseControl,
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
		redirectUrl,
		showRememberMe,
		showRegisterLink,
		showLostPassword,
		buttonText,
		loggedInView,
		loggedInMessage,
		formBg,
		buttonBg,
		buttonColor,
		labelColor,
		linkColor,
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
		// Keep the unique class on the SSR output only. If the editor wrapper
		// also gets it, the preview ends up with duplicate box-shadow/radius.
		className: 'wbe-login-form',
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content Settings */ }
				<PanelBody title={ __( 'Form Settings', 'wbcom-essential' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
					<TextControl
						label={ __( 'Redirect URL (after login)', 'wbcom-essential' ) }
						value={ redirectUrl }
						onChange={ ( value ) => setAttributes( { redirectUrl: value } ) }
						placeholder={ __( 'Default: current page', 'wbcom-essential' ) }
						help={ __( 'Leave blank to redirect to the current page.', 'wbcom-essential' ) }
					/>
					<ToggleControl
						label={ __( 'Show "Remember Me"', 'wbcom-essential' ) }
						checked={ showRememberMe }
						onChange={ ( value ) => setAttributes( { showRememberMe: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Register Link', 'wbcom-essential' ) }
						checked={ showRegisterLink }
						onChange={ ( value ) => setAttributes( { showRegisterLink: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Lost Password Link', 'wbcom-essential' ) }
						checked={ showLostPassword }
						onChange={ ( value ) => setAttributes( { showLostPassword: value } ) }
					/>
					<SelectControl
						label={ __( 'When logged in', 'wbcom-essential' ) }
						value={ loggedInView || 'none' }
						options={ [
							{ label: __( 'Show nothing', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Show a message', 'wbcom-essential' ), value: 'message' },
							{ label: __( 'Show member card', 'wbcom-essential' ), value: 'card' },
						] }
						onChange={ ( value ) => setAttributes( { loggedInView: value } ) }
						help={ __( 'The preview here always shows the form.', 'wbcom-essential' ) }
					/>
					{ 'message' === loggedInView && (
						<TextControl
							label={ __( 'Logged-In Message', 'wbcom-essential' ) }
							value={ loggedInMessage }
							onChange={ ( value ) => setAttributes( { loggedInMessage: value } ) }
						/>
					) }
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p className="components-base-control__help">
						{ __( 'Colours left empty follow your theme, in light and dark mode.', 'wbcom-essential' ) }
					</p>
					<BaseControl label={ __( 'Form Background', 'wbcom-essential' ) } id="wbe-lf-form-bg">
						<ColorPalette
							value={ formBg }
							onChange={ ( value ) => setAttributes( { formBg: value || '' } ) }
							enableAlpha
							clearable
						/>
					</BaseControl>
					<BaseControl label={ __( 'Label Color', 'wbcom-essential' ) } id="wbe-lf-label-color">
						<ColorPalette
							value={ labelColor }
							onChange={ ( value ) => setAttributes( { labelColor: value || '' } ) }
							enableAlpha
							clearable
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button Background', 'wbcom-essential' ) } id="wbe-lf-btn-bg">
						<ColorPalette
							value={ buttonBg }
							onChange={ ( value ) => setAttributes( { buttonBg: value || '' } ) }
							enableAlpha
							clearable
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button Text Color', 'wbcom-essential' ) } id="wbe-lf-btn-color">
						<ColorPalette
							value={ buttonColor }
							onChange={ ( value ) => setAttributes( { buttonColor: value || '' } ) }
							enableAlpha
							clearable
						/>
					</BaseControl>
					<BaseControl label={ __( 'Link Color', 'wbcom-essential' ) } id="wbe-lf-link-color">
						<ColorPalette
							value={ linkColor }
							onChange={ ( value ) => setAttributes( { linkColor: value || '' } ) }
							enableAlpha
							clearable
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
				<ServerSideRender
					block="wbcom-essential/login-form"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
