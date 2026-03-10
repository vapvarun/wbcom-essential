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
	RangeControl,
} from '@wordpress/components';

/**
 * Editor component for the EDD Enhanced Checkout block.
 *
 * Renders a static placeholder in the editor so the block editor doesn't try
 * to execute EDD's checkout shortcode. Real output is handled by render.php.
 *
 * @param {Object} props               Block props.
 * @param {Object} props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @return {JSX.Element} Editor markup.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		showProgressBar,
		showTrustBadges,
		trustBadgeText,
		showReviews,
		reviewCount,
		showRecommendations,
		recommendationCount,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-edd-checkout-enhanced-editor',
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
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-edd-checkout-enhanced-placeholder">
					<div className="wbcom-edd-checkout-enhanced-placeholder__icon">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							width="28"
							height="28"
							aria-hidden="true"
						>
							<path
								d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<line
								x1="3"
								y1="6"
								x2="21"
								y2="6"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
							/>
							<path
								d="M16 10a4 4 0 01-8 0"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>

					<p className="wbcom-edd-checkout-enhanced-placeholder__title">
						{ __( 'EDD Enhanced Checkout', 'wbcom-essential' ) }
					</p>

					<p className="wbcom-edd-checkout-enhanced-placeholder__description">
						{ __(
							'Renders EDD\'s native checkout form with optional progress bar, trust badges, reviews, and recommendations. Use the block settings to configure.',
							'wbcom-essential'
						) }
					</p>

					<div className="wbcom-edd-checkout-enhanced-placeholder__badges">
						{ showProgressBar && (
							<span className="wbcom-edd-checkout-enhanced-placeholder__badge wbcom-edd-checkout-enhanced-placeholder__badge--progress">
								{ __( 'Progress bar', 'wbcom-essential' ) }
							</span>
						) }
						{ showTrustBadges && (
							<span className="wbcom-edd-checkout-enhanced-placeholder__badge wbcom-edd-checkout-enhanced-placeholder__badge--trust">
								{ __( 'Trust badges', 'wbcom-essential' ) }
							</span>
						) }
						{ showReviews && (
							<span className="wbcom-edd-checkout-enhanced-placeholder__badge wbcom-edd-checkout-enhanced-placeholder__badge--trust">
								{ __( 'Reviews', 'wbcom-essential' ) }
							</span>
						) }
						{ showRecommendations && (
							<span className="wbcom-edd-checkout-enhanced-placeholder__badge wbcom-edd-checkout-enhanced-placeholder__badge--progress">
								{ __( 'Recommendations', 'wbcom-essential' ) }
							</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
