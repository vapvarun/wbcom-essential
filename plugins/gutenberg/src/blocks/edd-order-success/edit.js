/**
 * EDD Order Success Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

/**
 * Editor placeholder icon: animated checkmark circle (static in editor).
 */
const CheckmarkIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 52 52"
		width="32"
		height="32"
		fill="none"
		stroke="#16a34a"
		strokeWidth="3"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
	>
		<polyline points="14 27 22 35 38 17" />
	</svg>
);

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		showSuccessHeader,
		successMessage,
		showNextSteps,
		accountPageUrl,
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
		className: `wbe-block-${ uniqueId }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Success Header', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Show Success Header', 'wbcom-essential' ) }
						help={ showSuccessHeader
							? __( 'The animated checkmark and success message are visible.', 'wbcom-essential' )
							: __( 'The success header is hidden. Only the receipt will show.', 'wbcom-essential' )
						}
						checked={ showSuccessHeader }
						onChange={ ( value ) => setAttributes( { showSuccessHeader: value } ) }
					/>
					{ showSuccessHeader && (
						<TextControl
							label={ __( 'Success Message', 'wbcom-essential' ) }
							help={ __( 'The main heading shown to the customer after purchase.', 'wbcom-essential' ) }
							value={ successMessage }
							onChange={ ( value ) => setAttributes( { successMessage: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( "What's Next Section", 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( "Show What's Next Cards", 'wbcom-essential' ) }
						help={ showNextSteps
							? __( 'Action cards are shown below the receipt.', 'wbcom-essential' )
							: __( "The What's Next section is hidden.", 'wbcom-essential' )
						}
						checked={ showNextSteps }
						onChange={ ( value ) => setAttributes( { showNextSteps: value } ) }
					/>
					{ showNextSteps && (
						<TextControl
							label={ __( 'Account Page URL', 'wbcom-essential' ) }
							help={ __( 'URL of your EDD purchase history / account page. Leave blank to use the EDD default.', 'wbcom-essential' ) }
							value={ accountPageUrl }
							placeholder="/my-account/"
							onChange={ ( value ) => setAttributes( { accountPageUrl: value } ) }
						/>
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
				<div className="wbcom-edd-success-editor-placeholder">
					<div className="wbcom-edd-success-editor-placeholder__icon">
						<CheckmarkIcon />
					</div>
					<p className="wbcom-edd-success-editor-placeholder__title">
						{ __( 'EDD Order Success', 'wbcom-essential' ) }
					</p>
					<p className="wbcom-edd-success-editor-placeholder__description">
						{ __( 'Displays a success header, the EDD order receipt, and next-step action cards for your customer. Rendered on the frontend after a completed purchase.', 'wbcom-essential' ) }
					</p>
				</div>
			</div>
		</>
	);
}
