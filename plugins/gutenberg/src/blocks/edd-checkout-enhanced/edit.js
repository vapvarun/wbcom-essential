/**
 * EDD Enhanced Checkout Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	TextareaControl,
	RangeControl,
	CheckboxControl,
	Button,
	__experimentalDivider as Divider,
	__experimentalNumberControl as NumberControl,
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
 * Editor component for the EDD Enhanced Checkout block.
 *
 * Renders a static placeholder in the editor so the block editor doesn't try
 * to execute EDD's checkout shortcode. Real output is handled by render.php.
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
		showProgressBar,
		showTrustBadges,
		trustBadgeText,
		showReviews,
		reviewCount,
		showRecommendations,
		recommendationCount,
		showTrustpilot,
		trustpilotRating,
		trustpilotCount,
		trustpilotUrl,
		trustpilotReviews,
		paymentIcons,
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
		className: `wbe-block-${ uniqueId } wbcom-essential-edd-checkout-enhanced-editor`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Checkout Options', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Show Progress Bar', 'wbcom-essential' ) }
						help={
							showProgressBar
								? __( 'A 4-step progress bar is shown above the checkout form.', 'wbcom-essential' )
								: __( 'Progress bar is hidden.', 'wbcom-essential' )
						}
						checked={ showProgressBar }
						onChange={ ( value ) =>
							setAttributes( { showProgressBar: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Trust Badges', 'wbcom-essential' ) }
						help={
							showTrustBadges
								? __( 'Security badges are shown below the checkout form.', 'wbcom-essential' )
								: __( 'Trust badges are hidden.', 'wbcom-essential' )
						}
						checked={ showTrustBadges }
						onChange={ ( value ) =>
							setAttributes( { showTrustBadges: value } )
						}
					/>

					{ showTrustBadges && (
						<TextControl
							label={ __( 'Trust Badge Text', 'wbcom-essential' ) }
							value={ trustBadgeText }
							onChange={ ( value ) =>
								setAttributes( { trustBadgeText: value } )
							}
							help={ __(
								'Text shown in the main security badge.',
								'wbcom-essential'
							) }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Social Proof', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Customer Reviews', 'wbcom-essential' ) }
						help={
							showReviews
								? __( 'Customer reviews from EDD Reviews are displayed as social proof.', 'wbcom-essential' )
								: __( 'Customer reviews section is hidden.', 'wbcom-essential' )
						}
						checked={ showReviews }
						onChange={ ( value ) =>
							setAttributes( { showReviews: value } )
						}
					/>

					{ showReviews && (
						<RangeControl
							label={ __( 'Number of Reviews', 'wbcom-essential' ) }
							value={ reviewCount }
							onChange={ ( value ) =>
								setAttributes( { reviewCount: value } )
							}
							min={ 1 }
							max={ 6 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Trustpilot Reviews', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Trustpilot Section', 'wbcom-essential' ) }
						checked={ showTrustpilot }
						onChange={ ( value ) =>
							setAttributes( { showTrustpilot: value } )
						}
					/>

					{ showTrustpilot && (
						<>
							<TextControl
								label={ __( 'Trustpilot Rating', 'wbcom-essential' ) }
								type="number"
								value={ trustpilotRating }
								onChange={ ( value ) =>
									setAttributes( { trustpilotRating: parseFloat( value ) || 0 } )
								}
								help={ __( 'Your overall Trustpilot rating (e.g. 4.7)', 'wbcom-essential' ) }
								step="0.1"
								min="0"
								max="5"
							/>

							<TextControl
								label={ __( 'Total Reviews', 'wbcom-essential' ) }
								type="number"
								value={ trustpilotCount }
								onChange={ ( value ) =>
									setAttributes( { trustpilotCount: parseInt( value, 10 ) || 0 } )
								}
							/>

							<TextControl
								label={ __( 'Trustpilot URL', 'wbcom-essential' ) }
								value={ trustpilotUrl }
								onChange={ ( value ) =>
									setAttributes( { trustpilotUrl: value } )
								}
								help={ __( 'Link to your Trustpilot page', 'wbcom-essential' ) }
								placeholder="https://www.trustpilot.com/review/yoursite.com"
							/>

							<Divider />
							<p style={ { fontWeight: 600, marginBottom: 8 } }>
								{ __( 'Review Cards', 'wbcom-essential' ) }
							</p>

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

				<PanelBody
					title={ __( 'Payment Icons', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__help" style={ { marginTop: 0 } }>
						{ __( 'Choose which payment method logos to display.', 'wbcom-essential' ) }
					</p>
					{ [ 'visa', 'mastercard', 'paypal', 'stripe', 'razorpay' ].map( ( key ) => (
						<CheckboxControl
							key={ key }
							label={ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }
							checked={ paymentIcons?.[ key ] ?? true }
							onChange={ ( value ) =>
								setAttributes( {
									paymentIcons: { ...paymentIcons, [ key ]: value },
								} )
							}
						/>
					) ) }
				</PanelBody>

				<PanelBody
					title={ __( 'Recommendations', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Recommendations', 'wbcom-essential' ) }
						help={
							showRecommendations
								? __( 'Product recommendations are shown based on cart contents.', 'wbcom-essential' )
								: __( 'Recommendations section is hidden.', 'wbcom-essential' )
						}
						checked={ showRecommendations }
						onChange={ ( value ) =>
							setAttributes( { showRecommendations: value } )
						}
					/>

					{ showRecommendations && (
						<RangeControl
							label={ __( 'Number of Products', 'wbcom-essential' ) }
							value={ recommendationCount }
							onChange={ ( value ) =>
								setAttributes( { recommendationCount: value } )
							}
							min={ 1 }
							max={ 6 }
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

				{ /* Progress Bar Preview */ }
				{ showProgressBar && (
					<div className="wbcom-edd-checkout__progress" style={ { pointerEvents: 'none' } }>
						<div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 600, margin: '0 auto', padding: '24px 0' } }>
							{ [ { label: __( 'Cart', 'wbcom-essential' ), done: true }, { label: __( 'Details', 'wbcom-essential' ), active: true }, { label: __( 'Payment', 'wbcom-essential' ) }, { label: __( 'Complete', 'wbcom-essential' ) } ].map( ( step, i ) => (
								<div key={ i } style={ { textAlign: 'center', flex: 1 } }>
									<div style={ {
										width: 36, height: 36, borderRadius: '50%', margin: '0 auto 6px',
										display: 'flex', alignItems: 'center', justifyContent: 'center',
										background: step.done ? '#0073aa' : step.active ? '#fff' : '#f1f5f9',
										border: step.active ? '2px solid #0073aa' : step.done ? 'none' : '2px solid #e2e8f0',
										color: step.done ? '#fff' : step.active ? '#0073aa' : '#94a3b8',
										fontSize: 14, fontWeight: 600,
									} }>
										{ step.done ? '✓' : i + 1 }
									</div>
									<span style={ { fontSize: 12, fontWeight: step.active ? 600 : 400, color: step.active ? '#0073aa' : '#64748b' } }>
										{ step.label }
									</span>
								</div>
							) ) }
						</div>
					</div>
				) }

				{ /* Checkout Form Placeholder */ }
				<div style={ { background: '#f8fafc', border: '2px dashed #e2e8f0', borderRadius: 8, padding: '40px 24px', textAlign: 'center', margin: '16px 0' } }>
					<svg viewBox="0 0 24 24" fill="none" width="28" height="28" style={ { margin: '0 auto 8px', display: 'block', color: '#94a3b8' } }>
						<path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
						<line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
						<path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
					</svg>
					<p style={ { margin: 0, fontSize: 14, fontWeight: 600, color: '#475569' } }>
						{ __( 'EDD Checkout Form', 'wbcom-essential' ) }
					</p>
					<p style={ { margin: '4px 0 0', fontSize: 12, color: '#94a3b8' } }>
						{ __( 'The native EDD checkout form renders here on the frontend.', 'wbcom-essential' ) }
					</p>
				</div>

				{ /* Trust Badges Preview */ }
				{ showTrustBadges && (
					<div style={ { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, margin: '16px 0' } }>
						{ [
							{ icon: '🛡️', title: trustBadgeText, desc: __( 'Your payment information is encrypted and secure.', 'wbcom-essential' ) },
							{ icon: '✅', title: __( '14-Day Money Back', 'wbcom-essential' ), desc: __( 'Full refund if you are not satisfied.', 'wbcom-essential' ) },
							{ icon: '💬', title: __( 'Priority Support', 'wbcom-essential' ), desc: __( 'Dedicated support for all customers.', 'wbcom-essential' ) },
						].map( ( badge, i ) => (
							<div key={ i } style={ { display: 'flex', gap: 10, padding: 16, border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff' } }>
								<span style={ { fontSize: 20, flexShrink: 0 } }>{ badge.icon }</span>
								<div>
									<div style={ { fontSize: 13, fontWeight: 600, color: '#1e293b' } }>{ badge.title }</div>
									<div style={ { fontSize: 12, color: '#64748b', marginTop: 2 } }>{ badge.desc }</div>
								</div>
							</div>
						) ) }
					</div>
				) }

				{ /* Payment Icons Preview */ }
				{ showTrustBadges && (
					<div style={ { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '12px 16px', border: '1px solid #e2e8f0', borderRadius: 8, background: '#fff', margin: '0 0 16px' } }>
						<span style={ { fontSize: 13, color: '#64748b' } }>{ __( 'Accepted payments:', 'wbcom-essential' ) }</span>
						{ paymentIcons?.visa && <span style={ { fontSize: 12, fontWeight: 700, color: '#1A1F71', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4 } }>VISA</span> }
						{ paymentIcons?.mastercard && <span style={ { fontSize: 12, fontWeight: 700, color: '#EB001B', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4 } }>MC</span> }
						{ paymentIcons?.paypal && <span style={ { fontSize: 12, fontWeight: 700, color: '#003087', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4 } }>PayPal</span> }
						{ paymentIcons?.stripe && <span style={ { fontSize: 12, fontWeight: 700, color: '#6772E5', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4 } }>Stripe</span> }
						{ paymentIcons?.razorpay && <span style={ { fontSize: 12, fontWeight: 700, color: '#072654', background: '#f1f5f9', padding: '4px 8px', borderRadius: 4 } }>Razorpay</span> }
					</div>
				) }

				{ /* Trustpilot Preview */ }
				{ showTrustpilot && trustpilotReviews.length > 0 && (
					<div style={ { border: '1px solid #e2e8f0', borderRadius: 12, padding: 20, background: '#fff', margin: '0 0 16px' } }>
						<div style={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap', gap: 8 } }>
							<div style={ { display: 'flex', alignItems: 'center', gap: 8 } }>
								<span style={ { fontSize: 18, color: '#00B67A' } }>★</span>
								<span style={ { fontSize: 16, fontWeight: 700 } }>Trustpilot</span>
							</div>
							<div style={ { display: 'flex', alignItems: 'center', gap: 8 } }>
								<span style={ { color: '#00B67A', fontWeight: 700 } }>
									{ '★'.repeat( Math.floor( trustpilotRating ) ) }
									{ trustpilotRating % 1 >= 0.5 ? '½' : '' }
								</span>
								<span style={ { fontSize: 14, color: '#475569' } }>
									<strong>{ trustpilotRating }</strong>/5
								</span>
								{ trustpilotCount > 0 && (
									<span style={ { fontSize: 12, color: '#94a3b8' } }>
										{ `(${ trustpilotCount } reviews)` }
									</span>
								) }
							</div>
						</div>
						<div style={ { display: 'grid', gridTemplateColumns: `repeat(${ Math.min( trustpilotReviews.length, 3 ) }, 1fr)`, gap: 12 } }>
							{ trustpilotReviews.map( ( review, i ) => (
								<div key={ i } style={ { padding: 12, border: '1px solid #e2e8f0', borderRadius: 8, background: '#f8fafc' } }>
									<div style={ { color: '#00B67A', fontSize: 12, marginBottom: 4 } }>
										{ '★'.repeat( review.stars ) }
									</div>
									<div style={ { fontSize: 13, fontWeight: 600, color: '#1e293b', marginBottom: 4 } }>
										{ review.title || __( '(no title)', 'wbcom-essential' ) }
									</div>
									<div style={ { fontSize: 12, color: '#64748b', marginBottom: 6, lineHeight: 1.5 } }>
										{ review.text ? review.text.substring( 0, 80 ) + ( review.text.length > 80 ? '...' : '' ) : '' }
									</div>
									<div style={ { fontSize: 11, fontWeight: 500, color: '#94a3b8' } }>
										{ review.name || __( '(anonymous)', 'wbcom-essential' ) }
									</div>
								</div>
							) ) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}
