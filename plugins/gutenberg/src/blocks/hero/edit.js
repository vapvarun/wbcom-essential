import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	ColorPicker,
	SelectControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subheading,
		gradientFrom,
		gradientTo,
		gradientAngle,
		overlayOpacity,
		backgroundImage,
		backgroundImageId,
		minHeight,
		textColor,
		textAlign,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		showSecondaryButton,
	} = attributes;

	const gradient = `linear-gradient(${ gradientAngle }deg, ${ gradientFrom }, ${ gradientTo })`;

	const sectionStyle = {
		background: backgroundImage
			? `${ gradient }, url(${ backgroundImage }) center/cover no-repeat`
			: gradient,
		minHeight: `${ minHeight }px`,
		color: textColor,
		textAlign,
	};

	const blockProps = useBlockProps( {
		className: 'wbe-hero',
		style: sectionStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Background', 'wbcom-essential' ) }>
					<p className="components-base-control__label">
						{ __( 'Gradient Start', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ gradientFrom }
						onChangeComplete={ ( val ) =>
							setAttributes( { gradientFrom: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Gradient End', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ gradientTo }
						onChangeComplete={ ( val ) =>
							setAttributes( { gradientTo: val.hex } )
						}
						disableAlpha
					/>
					<RangeControl
						label={ __( 'Gradient Angle', 'wbcom-essential' ) }
						value={ gradientAngle }
						onChange={ ( val ) =>
							setAttributes( { gradientAngle: val } )
						}
						min={ 0 }
						max={ 360 }
					/>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									backgroundImage: media.url,
									backgroundImageId: media.id,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ backgroundImageId }
							render={ ( { open } ) => (
								<div>
									<Button
										onClick={ open }
										variant="secondary"
										style={ { marginBottom: '8px' } }
									>
										{ backgroundImage
											? __(
													'Replace Background Image',
													'wbcom-essential'
											  )
											: __(
													'Add Background Image',
													'wbcom-essential'
											  ) }
									</Button>
									{ backgroundImage && (
										<Button
											onClick={ () =>
												setAttributes( {
													backgroundImage: '',
													backgroundImageId: 0,
												} )
											}
											variant="link"
											isDestructive
										>
											{ __(
												'Remove Image',
												'wbcom-essential'
											) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					{ backgroundImage && (
						<RangeControl
							label={ __(
								'Overlay Opacity',
								'wbcom-essential'
							) }
							value={ overlayOpacity }
							onChange={ ( val ) =>
								setAttributes( { overlayOpacity: val } )
							}
							min={ 0 }
							max={ 100 }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Minimum Height (px)', 'wbcom-essential' ) }
						value={ minHeight }
						onChange={ ( val ) =>
							setAttributes( { minHeight: val } )
						}
						min={ 200 }
						max={ 1000 }
						step={ 10 }
					/>
					<SelectControl
						label={ __( 'Text Alignment', 'wbcom-essential' ) }
						value={ textAlign }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						] }
						onChange={ ( val ) =>
							setAttributes( { textAlign: val } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Text Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ textColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { textColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Buttons', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __(
							'Primary Button Text',
							'wbcom-essential'
						) }
						value={ primaryButtonText }
						onChange={ ( val ) =>
							setAttributes( { primaryButtonText: val } )
						}
					/>
					<TextControl
						label={ __( 'Primary Button URL', 'wbcom-essential' ) }
						value={ primaryButtonUrl }
						onChange={ ( val ) =>
							setAttributes( { primaryButtonUrl: val } )
						}
						type="url"
					/>
					<ToggleControl
						label={ __(
							'Show Secondary Button',
							'wbcom-essential'
						) }
						checked={ showSecondaryButton }
						onChange={ ( val ) =>
							setAttributes( { showSecondaryButton: val } )
						}
					/>
					{ showSecondaryButton && (
						<>
							<TextControl
								label={ __(
									'Secondary Button Text',
									'wbcom-essential'
								) }
								value={ secondaryButtonText }
								onChange={ ( val ) =>
									setAttributes( {
										secondaryButtonText: val,
									} )
								}
							/>
							<TextControl
								label={ __(
									'Secondary Button URL',
									'wbcom-essential'
								) }
								value={ secondaryButtonUrl }
								onChange={ ( val ) =>
									setAttributes( {
										secondaryButtonUrl: val,
									} )
								}
								type="url"
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ backgroundImage && overlayOpacity > 0 && (
					<div
						className="wbe-hero__overlay"
						style={ { opacity: overlayOpacity / 100 } }
					/>
				) }
				<div className="wbe-hero__content">
					<RichText
						tagName="h1"
						className="wbe-hero__heading"
						value={ heading }
						onChange={ ( val ) =>
							setAttributes( { heading: val } )
						}
						placeholder={ __(
							'Your Hero Headline',
							'wbcom-essential'
						) }
					/>
					<RichText
						tagName="p"
						className="wbe-hero__subheading"
						value={ subheading }
						onChange={ ( val ) =>
							setAttributes( { subheading: val } )
						}
						placeholder={ __(
							'A compelling subheading that supports your message.',
							'wbcom-essential'
						) }
					/>
					<div className="wbe-hero__buttons">
						<span className="wbe-btn wbe-btn--primary">
							{ primaryButtonText ||
								__( 'Get Started', 'wbcom-essential' ) }
						</span>
						{ showSecondaryButton && (
							<span className="wbe-btn wbe-btn--secondary">
								{ secondaryButtonText ||
									__( 'Learn More', 'wbcom-essential' ) }
							</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
