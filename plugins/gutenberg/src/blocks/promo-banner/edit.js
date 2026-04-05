/**
 * Promo Banner Block - Editor Component
 *
 * Static block with RichText and MediaUpload.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	Button,
	BaseControl,
	ColorPalette,
	__experimentalDivider as Divider,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		heading,
		description,
		buttonText,
		buttonUrl,
		backgroundImage,
		overlayColor,
		headingColor,
		descriptionColor,
		buttonBg,
		buttonColor,
		contentAlign,
		minHeight,
		bannerStyle,
		padding,
		paddingUnit,
		margin,
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

	const isOverlay = bannerStyle === 'overlay';
	const hasBgImage = backgroundImage && backgroundImage.url;

	// ── Preview styles ────────────────────────────────────────────────────────
	const wrapperStyle = {
		minHeight: `${ minHeight }px`,
	};

	if ( isOverlay && hasBgImage ) {
		wrapperStyle.backgroundImage = `url(${ backgroundImage.url })`;
		wrapperStyle.backgroundSize = 'cover';
		wrapperStyle.backgroundPosition = 'center';
	}

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-promo-banner wbe-promo-banner--${ bannerStyle }`,
		style: wrapperStyle,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Layout */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Banner Style', 'wbcom-essential' ) }
						value={ bannerStyle }
						options={ [
							{ value: 'overlay', label: __( 'Overlay (text over image)', 'wbcom-essential' ) },
							{ value: 'split', label: __( 'Split (image left, text right)', 'wbcom-essential' ) },
						] }
						onChange={ ( val ) => setAttributes( { bannerStyle: val } ) }
					/>
					<SelectControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ contentAlign }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( val ) => setAttributes( { contentAlign: val } ) }
					/>
					<RangeControl
						label={ __( 'Min Height (px)', 'wbcom-essential' ) }
						value={ minHeight }
						onChange={ ( val ) => setAttributes( { minHeight: val } ) }
						min={ 100 }
						max={ 800 }
						step={ 10 }
					/>
				</PanelBody>

				{ /* Background & CTA URL */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ buttonUrl }
						onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
						placeholder="https://"
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Background Image', 'wbcom-essential' ) }>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									setAttributes( {
										backgroundImage: {
											id: media.id,
											url: media.url,
											alt: media.alt || '',
										},
									} )
								}
								allowedTypes={ [ 'image' ] }
								value={ backgroundImage?.id }
								render={ ( { open } ) => (
									<div>
										{ hasBgImage ? (
											<>
												<img
													src={ backgroundImage.url }
													alt={ backgroundImage.alt || '' }
													style={ { width: '100%', marginBottom: 8, borderRadius: 4 } }
												/>
												<Button
													variant="secondary"
													isDestructive
													onClick={ () => setAttributes( { backgroundImage: {} } ) }
													style={ { marginBottom: 8, display: 'block', width: '100%' } }
												>
													{ __( 'Remove Image', 'wbcom-essential' ) }
												</Button>
											</>
										) : null }
										<Button
											variant="primary"
											onClick={ open }
											style={ { width: '100%', justifyContent: 'center' } }
										>
											{ hasBgImage
												? __( 'Replace Image', 'wbcom-essential' )
												: __( 'Choose Image', 'wbcom-essential' ) }
										</Button>
									</div>
								) }
							/>
						</MediaUploadCheck>
					</BaseControl>

					{ isOverlay && (
						<>
							<Divider />
							<BaseControl label={ __( 'Overlay Color', 'wbcom-essential' ) }>
								<ColorPalette
									value={ overlayColor }
									onChange={ ( val ) => setAttributes( { overlayColor: val || 'rgba(0,0,0,0.4)' } ) }
									clearable={ false }
								/>
							</BaseControl>
						</>
					) }

					<Divider />

					<BaseControl label={ __( 'Heading Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ headingColor }
							onChange={ ( val ) => setAttributes( { headingColor: val || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>

					<BaseControl label={ __( 'Description Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ descriptionColor }
							onChange={ ( val ) => setAttributes( { descriptionColor: val || 'rgba(255,255,255,0.9)' } ) }
							clearable={ false }
						/>
					</BaseControl>

					<Divider />

					<BaseControl label={ __( 'Button Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonBg }
							onChange={ ( val ) => setAttributes( { buttonBg: val || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>

					<BaseControl label={ __( 'Button Text Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonColor }
							onChange={ ( val ) => setAttributes( { buttonColor: val || '#1e1e2e' } ) }
							clearable={ false }
						/>
					</BaseControl>
				</PanelBody>

				{ /* Advanced */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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
					<Divider />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( val ) => setAttributes( val ) }
					/>
					<Divider />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
					/>
					<Divider />
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ /* Overlay layer (overlay mode only) */ }
				{ isOverlay && hasBgImage && (
					<div
						className="wbe-promo-banner__overlay"
						style={ { backgroundColor: overlayColor } }
						aria-hidden="true"
					/>
				) }

				{ /* Split mode image pane */ }
				{ ! isOverlay && hasBgImage && (
					<div className="wbe-promo-banner__image-pane" aria-hidden="true">
						<img
							src={ backgroundImage.url }
							alt={ backgroundImage.alt || '' }
							className="wbe-promo-banner__bg-img"
						/>
					</div>
				) }

				{ /* Content */ }
				<div className={ `wbe-promo-banner__content wbe-promo-banner__content--${ contentAlign }` }>
					<RichText
						tagName="h2"
						className="wbe-promo-banner__heading"
						value={ heading }
						onChange={ ( val ) => setAttributes( { heading: val } ) }
						placeholder={ __( 'Enter heading\u2026', 'wbcom-essential' ) }
						style={ { color: headingColor } }
					/>
					<RichText
						tagName="p"
						className="wbe-promo-banner__description"
						value={ description }
						onChange={ ( val ) => setAttributes( { description: val } ) }
						placeholder={ __( 'Enter description\u2026', 'wbcom-essential' ) }
						style={ { color: descriptionColor } }
					/>
					<div className="wbe-promo-banner__cta">
						<RichText
							tagName="span"
							className="wbe-promo-banner__btn"
							value={ buttonText }
							onChange={ ( val ) => setAttributes( { buttonText: val } ) }
							placeholder={ __( 'Button text\u2026', 'wbcom-essential' ) }
							style={ { backgroundColor: buttonBg, color: buttonColor } }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
