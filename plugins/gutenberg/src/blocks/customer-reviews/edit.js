/**
 * Customer Reviews Block - Editor Component
 *
 * Uses ServerSideRender for live preview since this is a dynamic block.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	ColorPicker,
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
		reviewCount,
		slidesPerView,
		autoplay,
		autoplayDelay,
		loop,
		showDots,
		showArrows,
		showRating,
		showProduct,
		showAvatar,
		quoteBg,
		quoteColor,
		nameColor,
		ratingColor,
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
		className: `wbe-block-${ uniqueId } wbe-customer-reviews-editor`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Query Settings */ }
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Number of Reviews', 'wbcom-essential' ) }
						value={ reviewCount }
						onChange={ ( val ) => setAttributes( { reviewCount: val } ) }
						min={ 1 }
						max={ 48 }
						step={ 1 }
					/>
				</PanelBody>

				{ /* Carousel Settings */ }
				<PanelBody
					title={ __( 'Carousel Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slides Per View (Desktop)', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( val ) => setAttributes( { slidesPerView: val } ) }
						min={ 1 }
						max={ 4 }
						step={ 1 }
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( val ) => setAttributes( { autoplay: val } ) }
						__nextHasNoMarginBottom
					/>
					{ autoplay && (
						<RangeControl
							label={ __( 'Autoplay Delay (ms)', 'wbcom-essential' ) }
							value={ autoplayDelay }
							onChange={ ( val ) => setAttributes( { autoplayDelay: val } ) }
							min={ 1000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
					<ToggleControl
						label={ __( 'Loop', 'wbcom-essential' ) }
						checked={ loop }
						onChange={ ( val ) => setAttributes( { loop: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Navigation Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( val ) => setAttributes( { showDots: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Navigation Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( val ) => setAttributes( { showArrows: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Card Settings */ }
				<PanelBody
					title={ __( 'Review Card Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( val ) => setAttributes( { showAvatar: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Star Rating', 'wbcom-essential' ) }
						checked={ showRating }
						onChange={ ( val ) => setAttributes( { showRating: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Product Name', 'wbcom-essential' ) }
						checked={ showProduct }
						onChange={ ( val ) => setAttributes( { showProduct: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Card Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ quoteBg }
						onChange={ ( val ) => setAttributes( { quoteBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Quote Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ quoteColor }
						onChange={ ( val ) => setAttributes( { quoteColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Reviewer Name Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ nameColor }
						onChange={ ( val ) => setAttributes( { nameColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Star Rating Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ ratingColor }
						onChange={ ( val ) => setAttributes( { ratingColor: val } ) }
						enableAlpha
					/>
					<Spacer marginTop={ 3 } />
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

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/customer-reviews"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-customer-reviews__loading">
							<p>{ __( 'Loading reviews\u2026', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-customer-reviews__error">
							<p>{ __( 'Could not load reviews preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
