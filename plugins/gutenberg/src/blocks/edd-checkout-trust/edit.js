/**
 * EDD Checkout Trust Badges Block - Editor Component
 *
 * Renders a static preview: the real section is built by render.php from live
 * cart / review / recommendation data that the editor has no access to.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	CheckboxControl,
	ToggleControl,
} from '@wordpress/components';

import { SpacingControl, DeviceVisibility } from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

/**
 * Editor component.
 *
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {string}   props.clientId      Block client ID.
 * @return {JSX.Element} Editor markup.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		trustBadgeText,
		showSecureBadge,
		secureBadgeText,
		guaranteeDays,
		guaranteeText,
		showGuaranteeBadge,
		showSupportBadge,
		supportBadgeTitle,
		supportBadgeText,
		paymentIcons,
	} = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );

	const blockCSS = generateBlockCSS( uniqueId, attributes );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbcom-essential-edd-checkout-trust-editor`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Security Badge', 'wbcom-essential' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Show security badge', 'wbcom-essential' ) }
						checked={ showSecureBadge }
						onChange={ ( value ) => setAttributes( { showSecureBadge: value } ) }
					/>
					{ showSecureBadge && (
						<>
							<TextControl
								label={ __( 'Trust Badge Text', 'wbcom-essential' ) }
								value={ trustBadgeText }
								onChange={ ( value ) => setAttributes( { trustBadgeText: value } ) }
								help={ __( 'Name your own payment processor if you mention one.', 'wbcom-essential' ) }
							/>
							<TextControl
								label={ __( 'Security Description', 'wbcom-essential' ) }
								value={ secureBadgeText }
								onChange={ ( value ) => setAttributes( { secureBadgeText: value } ) }
								help={ __( 'This is a claim about your checkout - word it so it stays true.', 'wbcom-essential' ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Guarantee Badge', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show guarantee badge', 'wbcom-essential' ) }
						checked={ showGuaranteeBadge }
						onChange={ ( value ) => setAttributes( { showGuaranteeBadge: value } ) }
					/>
					{ showGuaranteeBadge && (
						<>
							<RangeControl
								label={ __( 'Money-Back Guarantee (days)', 'wbcom-essential' ) }
								value={ guaranteeDays }
								onChange={ ( value ) => setAttributes( { guaranteeDays: value } ) }
								min={ 7 }
								max={ 90 }
							/>
							<TextControl
								label={ __( 'Guarantee Description', 'wbcom-essential' ) }
								value={ guaranteeText }
								onChange={ ( value ) => setAttributes( { guaranteeText: value } ) }
								help={ __( 'Word this to match your actual refund policy.', 'wbcom-essential' ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Support Badge', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show support badge', 'wbcom-essential' ) }
						checked={ showSupportBadge }
						onChange={ ( value ) => setAttributes( { showSupportBadge: value } ) }
						help={ __( 'Off by default: not every store offers dedicated or priority support, and the badge should not promise it on their behalf.', 'wbcom-essential' ) }
					/>
					{ showSupportBadge && (
						<>
							<TextControl
								label={ __( 'Support Title', 'wbcom-essential' ) }
								value={ supportBadgeTitle }
								onChange={ ( value ) => setAttributes( { supportBadgeTitle: value } ) }
							/>
							<TextControl
								label={ __( 'Support Description', 'wbcom-essential' ) }
								value={ supportBadgeText }
								onChange={ ( value ) => setAttributes( { supportBadgeText: value } ) }
								help={ __( 'Describe the support you actually provide.', 'wbcom-essential' ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Payment Icons', 'wbcom-essential' ) } initialOpen={ false }>
					<p className="components-base-control__help" style={ { marginTop: 0 } }>
						{ __( 'Show only the payment methods your store actually accepts.', 'wbcom-essential' ) }
					</p>
					{ [ 'visa', 'mastercard', 'paypal', 'stripe', 'razorpay' ].map( ( key ) => (
						<CheckboxControl
							key={ key }
							label={ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }
							checked={ paymentIcons?.[ key ] ?? false }
							onChange={ ( value ) =>
								setAttributes( {
									paymentIcons: { ...paymentIcons, [ key ]: value },
								} )
							}
						/>
					) ) }
				</PanelBody>

				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ attributes.padding }
						unit={ attributes.paddingUnit }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<DeviceVisibility
						hideOnDesktop={ attributes.hideOnDesktop }
						hideOnTablet={ attributes.hideOnTablet }
						hideOnMobile={ attributes.hideOnMobile }
						onChange={ ( value ) => setAttributes( value ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<div style={ { border: '1px dashed #cbd5e1', borderRadius: 8, padding: '20px 16px', background: '#f8fafc' } }>
					<p style={ { margin: 0, fontSize: 13, fontWeight: 600, color: '#475569' } }>
						{ __( 'EDD Checkout Trust Badges', 'wbcom-essential' ) }
					</p>
					<p style={ { margin: '4px 0 0', fontSize: 12, color: '#94a3b8' } }>
						{ __( 'Security, guarantee and support badges plus payment icons render here.', 'wbcom-essential' ) }
					</p>
				</div>
			</div>
		</>
	);
}
