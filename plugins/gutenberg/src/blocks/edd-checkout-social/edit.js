/**
 * EDD Checkout Social Proof Block - Editor Component
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
	ToggleControl,
	RangeControl,
	TextControl,
	TextareaControl,
	Button,
	__experimentalDivider as Divider,
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
	const { uniqueId, showReviews, reviewCount, showTrustpilot, trustpilotRating, trustpilotCount, trustpilotUrl, trustpilotReviews } = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );

	const blockCSS = generateBlockCSS( uniqueId, attributes );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbcom-essential-edd-checkout-social-editor`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Social Proof Options', 'wbcom-essential' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Show Customer Reviews', 'wbcom-essential' ) }
						checked={ showReviews }
						onChange={ ( value ) => setAttributes( { showReviews: value } ) }
					/>
					{ showReviews && (
						<RangeControl
							label={ __( 'Number of Reviews', 'wbcom-essential' ) }
							value={ reviewCount }
							onChange={ ( value ) => setAttributes( { reviewCount: value } ) }
							min={ 1 }
							max={ 6 }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Trustpilot Section', 'wbcom-essential' ) }
						checked={ showTrustpilot }
						onChange={ ( value ) => setAttributes( { showTrustpilot: value } ) }
					/>
					{ showTrustpilot && (
						<>
							<TextControl
								label={ __( 'Trustpilot Rating', 'wbcom-essential' ) }
								type="number"
								value={ trustpilotRating }
								onChange={ ( value ) => setAttributes( { trustpilotRating: parseFloat( value ) || 0 } ) }
								help={ __( 'Your real Trustpilot score. Left at 0 the score is not shown.', 'wbcom-essential' ) }
								step="0.1"
								min="0"
								max="5"
							/>
							<TextControl
								label={ __( 'Total Reviews', 'wbcom-essential' ) }
								type="number"
								value={ trustpilotCount }
								onChange={ ( value ) => setAttributes( { trustpilotCount: parseInt( value, 10 ) || 0 } ) }
							/>
							<TextControl
								label={ __( 'Trustpilot URL', 'wbcom-essential' ) }
								value={ trustpilotUrl }
								onChange={ ( value ) => setAttributes( { trustpilotUrl: value } ) }
								placeholder="https://www.trustpilot.com/review/yoursite.com"
							/>

							<Divider />
							<p style={ { fontWeight: 600, marginBottom: 8 } }>
								{ __( 'Review Cards', 'wbcom-essential' ) }
							</p>

							{ trustpilotReviews.length === 0 && (
								<p className="components-base-control__help" style={ { marginTop: 0 } }>
									{ __( 'Add your own reviews. The Trustpilot section stays hidden until you add at least one.', 'wbcom-essential' ) }
								</p>
							) }

							{ trustpilotReviews.map( ( review, index ) => (
								<div key={ index } style={ { marginBottom: 16, padding: 12, background: '#f8f9fa', borderRadius: 6 } }>
									<p style={ { fontSize: 12, fontWeight: 600, margin: '0 0 8px', color: '#64748b' } }>
										{ `${ __( 'Review', 'wbcom-essential' ) } ${ index + 1 }` }
									</p>
									<TextControl
										label={ __( 'Reviewer Name', 'wbcom-essential' ) }
										value={ review.name }
										onChange={ ( value ) => {
											const updated = [ ...trustpilotReviews ];
											updated[ index ] = { ...updated[ index ], name: value };
											setAttributes( { trustpilotReviews: updated } );
										} }
									/>
									<RangeControl
										label={ __( 'Stars', 'wbcom-essential' ) }
										value={ review.stars }
										onChange={ ( value ) => {
											const updated = [ ...trustpilotReviews ];
											updated[ index ] = { ...updated[ index ], stars: value };
											setAttributes( { trustpilotReviews: updated } );
										} }
										min={ 1 }
										max={ 5 }
									/>
									<TextControl
										label={ __( 'Title', 'wbcom-essential' ) }
										value={ review.title }
										onChange={ ( value ) => {
											const updated = [ ...trustpilotReviews ];
											updated[ index ] = { ...updated[ index ], title: value };
											setAttributes( { trustpilotReviews: updated } );
										} }
									/>
									<TextareaControl
										label={ __( 'Review Text', 'wbcom-essential' ) }
										value={ review.text }
										onChange={ ( value ) => {
											const updated = [ ...trustpilotReviews ];
											updated[ index ] = { ...updated[ index ], text: value };
											setAttributes( { trustpilotReviews: updated } );
										} }
										rows={ 2 }
									/>
									{ trustpilotReviews.length > 1 && (
										<Button
											isDestructive
											isSmall
											variant="secondary"
											onClick={ () => {
												const updated = trustpilotReviews.filter( ( _, i ) => i !== index );
												setAttributes( { trustpilotReviews: updated } );
											} }
										>
											{ __( 'Remove', 'wbcom-essential' ) }
										</Button>
									) }
								</div>
							) ) }

							{ trustpilotReviews.length < 5 && (
								<Button
									variant="secondary"
									isSmall
									onClick={ () => {
										setAttributes( {
											trustpilotReviews: [
												...trustpilotReviews,
												{ name: '', stars: 5, title: '', text: '' },
											],
										} );
									} }
								>
									{ __( '+ Add Review', 'wbcom-essential' ) }
								</Button>
							) }
						</>
					) }
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
						{ __( 'EDD Checkout Social Proof', 'wbcom-essential' ) }
					</p>
					<p style={ { margin: '4px 0 0', fontSize: 12, color: '#94a3b8' } }>
						{ __( 'Trustpilot rating and customer reviews render here on the frontend.', 'wbcom-essential' ) }
					</p>
				</div>
			</div>
		</>
	);
}
