/**
 * EDD Checkout Progress Block - Editor Component
 *
 * Renders a static preview: the real section is built by render.php from live
 * cart / review / recommendation data that the editor has no access to.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

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
	const { uniqueId } = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );

	const blockCSS = generateBlockCSS( uniqueId, attributes );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbcom-essential-edd-checkout-progress-editor`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Progress Options', 'wbcom-essential' ) } initialOpen={ true }>
					<p>{ __( 'This section has no options yet.', 'wbcom-essential' ) }</p>
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
						{ __( 'EDD Checkout Progress', 'wbcom-essential' ) }
					</p>
					<p style={ { margin: '4px 0 0', fontSize: 12, color: '#94a3b8' } }>
						{ __( 'A four-step progress indicator renders here on the frontend.', 'wbcom-essential' ) }
					</p>
				</div>
			</div>
		</>
	);
}
