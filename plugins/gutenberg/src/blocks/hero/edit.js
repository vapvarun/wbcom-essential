/**
 * Hero Section Block - Editor Component
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
	ColorPalette,
	BaseControl,
	ToggleControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../../src/shared/components';
import { useUniqueId } from '../../../src/shared/hooks';
import { generateBlockCSS } from '../../../src/shared/utils/css';
import '../../../src/shared/design-tokens.css';
import '../../../src/shared/base.css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		heading,
		subheading,
		buttonOneText,
		buttonOneUrl,
		buttonTwoText,
		buttonTwoUrl,
		backgroundType,
		backgroundColor,
		gradientStart,
		gradientEnd,
		backgroundImage,
		overlayColor,
		overlayOpacity,
		headingColor,
		subheadingColor,
		buttonOneBg,
		buttonOneColor,
		buttonTwoBg,
		buttonTwoColor,
		contentAlign,
		minHeight,
		minHeightUnit,
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

	const backgroundStyle = {};
	if ( backgroundType === 'gradient' ) {
		backgroundStyle.background = `linear-gradient(135deg, ${ gradientStart } 0%, ${ gradientEnd } 100%)`;
	} else if ( backgroundType === 'color' ) {
		backgroundStyle.backgroundColor = backgroundColor;
	} else if ( backgroundType === 'image' && backgroundImage && backgroundImage.url ) {
		backgroundStyle.backgroundImage = `url(${ backgroundImage.url })`;
		backgroundStyle.backgroundSize = 'cover';
		backgroundStyle.backgroundPosition = 'center';
	}

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-hero`,
		style: {
			minHeight: `${ minHeight }${ minHeightUnit }`,
			...backgroundStyle,
		},
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button 1 URL', 'wbcom-essential' ) }
						value={ buttonOneUrl }
						onChange={ ( value ) => setAttributes( { buttonOneUrl: value } ) }
						placeholder="https://"
					/>
					<TextControl
						label={ __( 'Button 2 URL', 'wbcom-essential' ) }
						value={ buttonTwoUrl }
						onChange={ ( value ) => setAttributes( { buttonTwoUrl: value } ) }
						placeholder="https://"
					/>
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ contentAlign }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
					/>
					<RangeControl
						label={ __( 'Min Height', 'wbcom-essential' ) }
						value={ minHeight }
						onChange={ ( value ) => setAttributes( { minHeight: value } ) }
						min={ 200 }
						max={ 1200 }
					/>
					<SelectControl
						label={ __( 'Height Unit', 'wbcom-essential' ) }
						value={ minHeightUnit }
						options={ [
							{ value: 'px', label: 'px' },
							{ value: 'vh', label: 'vh' },
							{ value: 'vmin', label: 'vmin' },
						] }
						onChange={ ( value ) => setAttributes( { minHeightUnit: value } ) }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Background Type', 'wbcom-essential' ) }
						value={ backgroundType }
						options={ [
							{ value: 'gradient', label: __( 'Gradient', 'wbcom-essential' ) },
							{ value: 'color', label: __( 'Solid Color', 'wbcom-essential' ) },
							{ value: 'image', label: __( 'Image', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
					/>

					{ backgroundType === 'gradient' && (
						<>
							<BaseControl label={ __( 'Gradient Start Color', 'wbcom-essential' ) }>
								<ColorPalette
									value={ gradientStart }
									onChange={ ( value ) => setAttributes( { gradientStart: value || '#667eea' } ) }
									clearable={ false }
								/>
							</BaseControl>
							<BaseControl label={ __( 'Gradient End Color', 'wbcom-essential' ) }>
								<ColorPalette
									value={ gradientEnd }
									onChange={ ( value ) => setAttributes( { gradientEnd: value || '#764ba2' } ) }
									clearable={ false }
								/>
							</BaseControl>
						</>
					) }

					{ backgroundType === 'color' && (
						<BaseControl label={ __( 'Background Color', 'wbcom-essential' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value || '#1e1e2e' } ) }
								clearable={ false }
							/>
						</BaseControl>
					) }

					{ backgroundType === 'image' && (
						<>
							<BaseControl label={ __( 'Background Image', 'wbcom-essential' ) }>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ ( media ) =>
											setAttributes( {
												backgroundImage: {
													id: media.id,
													url: media.url,
													alt: media.alt,
												},
											} )
										}
										allowedTypes={ [ 'image' ] }
										value={ backgroundImage?.id }
										render={ ( { open } ) => (
											<div>
												{ backgroundImage?.url ? (
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
												<Button variant="primary" onClick={ open } style={ { width: '100%', justifyContent: 'center' } }>
													{ backgroundImage?.url
														? __( 'Replace Image', 'wbcom-essential' )
														: __( 'Choose Image', 'wbcom-essential' ) }
												</Button>
											</div>
										) }
									/>
								</MediaUploadCheck>
							</BaseControl>
							<Divider />
							<BaseControl label={ __( 'Overlay Color', 'wbcom-essential' ) }>
								<ColorPalette
									value={ overlayColor }
									onChange={ ( value ) => setAttributes( { overlayColor: value || 'rgba(0,0,0,0.5)' } ) }
									clearable={ false }
								/>
							</BaseControl>
							<RangeControl
								label={ __( 'Overlay Opacity (%)', 'wbcom-essential' ) }
								value={ overlayOpacity }
								onChange={ ( value ) => setAttributes( { overlayOpacity: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</>
					) }

					<Divider />

					<BaseControl label={ __( 'Heading Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ headingColor }
							onChange={ ( value ) => setAttributes( { headingColor: value || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Subheading Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ subheadingColor }
							onChange={ ( value ) => setAttributes( { subheadingColor: value || 'rgba(255,255,255,0.8)' } ) }
							clearable={ false }
						/>
					</BaseControl>

					<Divider />

					<BaseControl label={ __( 'Button 1 Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonOneBg }
							onChange={ ( value ) => setAttributes( { buttonOneBg: value || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button 1 Text Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonOneColor }
							onChange={ ( value ) => setAttributes( { buttonOneColor: value || '#1e1e2e' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button 2 Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonTwoBg }
							onChange={ ( value ) => setAttributes( { buttonTwoBg: value || 'transparent' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Button 2 Text Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ buttonTwoColor }
							onChange={ ( value ) => setAttributes( { buttonTwoColor: value || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>
				</PanelBody>

				{ /* Advanced Panel */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				{ backgroundType === 'image' && backgroundImage?.url && (
					<div
						className="wbe-hero__overlay"
						style={ { backgroundColor: overlayColor, opacity: overlayOpacity / 100 } }
					/>
				) }
				<div className={ `wbe-hero__content wbe-hero__content--${ contentAlign }` }>
					<RichText
						tagName="h1"
						className="wbe-hero__heading"
						value={ heading }
						onChange={ ( value ) => setAttributes( { heading: value } ) }
						placeholder={ __( 'Enter heading...', 'wbcom-essential' ) }
						style={ { color: headingColor } }
					/>
					<RichText
						tagName="p"
						className="wbe-hero__subheading"
						value={ subheading }
						onChange={ ( value ) => setAttributes( { subheading: value } ) }
						placeholder={ __( 'Enter subheading...', 'wbcom-essential' ) }
						style={ { color: subheadingColor } }
					/>
					<div className="wbe-hero__buttons">
						<RichText
							tagName="span"
							className="wbe-hero__btn wbe-hero__btn--primary"
							value={ buttonOneText }
							onChange={ ( value ) => setAttributes( { buttonOneText: value } ) }
							placeholder={ __( 'Button 1', 'wbcom-essential' ) }
							style={ { backgroundColor: buttonOneBg, color: buttonOneColor } }
						/>
						<RichText
							tagName="span"
							className="wbe-hero__btn wbe-hero__btn--secondary"
							value={ buttonTwoText }
							onChange={ ( value ) => setAttributes( { buttonTwoText: value } ) }
							placeholder={ __( 'Button 2', 'wbcom-essential' ) }
							style={ { backgroundColor: buttonTwoBg, color: buttonTwoColor, border: `2px solid ${ buttonTwoColor }` } }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
