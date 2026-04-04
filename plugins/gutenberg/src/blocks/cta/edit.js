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
	TextControl,
	SelectControl,
	Button,
	ColorPicker,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		description,
		buttonText,
		buttonUrl,
		backgroundColor,
		textColor,
		buttonColor,
		buttonTextColor,
		backgroundImage,
		backgroundImageId,
		textAlign,
		layout,
	} = attributes;

	const sectionStyle = {
		backgroundColor,
		backgroundImage: backgroundImage
			? `url(${ backgroundImage })`
			: undefined,
		backgroundSize: backgroundImage ? 'cover' : undefined,
		backgroundPosition: backgroundImage ? 'center' : undefined,
		color: textColor,
		textAlign: layout === 'stacked' ? textAlign : undefined,
	};

	const blockProps = useBlockProps( {
		className: `wbe-cta wbe-cta--${ layout }`,
		style: sectionStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: 'Stacked', value: 'stacked' },
							{ label: 'Inline', value: 'inline' },
						] }
						onChange={ ( val ) =>
							setAttributes( { layout: val } )
						}
					/>
					{ layout === 'stacked' && (
						<SelectControl
							label={ __(
								'Text Alignment',
								'wbcom-essential'
							) }
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
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Background Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { backgroundColor: val.hex } )
						}
						disableAlpha
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
					<p className="components-base-control__label">
						{ __( 'Button Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ buttonColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { buttonColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Button Text Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ buttonTextColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { buttonTextColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Background Image', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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
													'Replace Image',
													'wbcom-essential'
											  )
											: __(
													'Add Image',
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
												'Remove',
												'wbcom-essential'
											) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody
					title={ __( 'Button', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ buttonText }
						onChange={ ( val ) =>
							setAttributes( { buttonText: val } )
						}
					/>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ buttonUrl }
						onChange={ ( val ) =>
							setAttributes( { buttonUrl: val } )
						}
						type="url"
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbe-cta__text">
					<RichText
						tagName="h2"
						className="wbe-cta__heading"
						value={ heading }
						onChange={ ( val ) =>
							setAttributes( { heading: val } )
						}
						placeholder={ __(
							'Ready to Get Started?',
							'wbcom-essential'
						) }
					/>
					<RichText
						tagName="p"
						className="wbe-cta__description"
						value={ description }
						onChange={ ( val ) =>
							setAttributes( { description: val } )
						}
						placeholder={ __(
							'Add a compelling description to encourage action.',
							'wbcom-essential'
						) }
					/>
				</div>
				<div className="wbe-cta__action">
					<span
						className="wbe-btn wbe-btn--cta"
						style={ {
							backgroundColor: buttonColor,
							color: buttonTextColor,
						} }
					>
						{ buttonText ||
							__( 'Get Started Now', 'wbcom-essential' ) }
					</span>
				</div>
			</div>
		</>
	);
}
