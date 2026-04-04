import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	RangeControl,
	Button,
	ColorPicker,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		testimonials,
		autoplay,
		autoplaySpeed,
		showDots,
		showArrows,
		backgroundColor,
		textColor,
		accentColor,
	} = attributes;

	const updateTestimonial = ( index, key, value ) => {
		const updated = [ ...testimonials ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { testimonials: updated } );
	};

	const addTestimonial = () => {
		setAttributes( {
			testimonials: [
				...testimonials,
				{ quote: '', name: '', role: '', avatar: '' },
			],
		} );
	};

	const removeTestimonial = ( index ) => {
		setAttributes( {
			testimonials: testimonials.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useBlockProps( {
		className: 'wbe-testimonials',
		style: { backgroundColor, color: textColor },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Carousel Settings', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( val ) =>
							setAttributes( { autoplay: val } )
						}
					/>
					{ autoplay && (
						<RangeControl
							label={ __(
								'Autoplay Speed (ms)',
								'wbcom-essential'
							) }
							value={ autoplaySpeed }
							onChange={ ( val ) =>
								setAttributes( { autoplaySpeed: val } )
							}
							min={ 2000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( val ) =>
							setAttributes( { showDots: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( val ) =>
							setAttributes( { showArrows: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Background', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { backgroundColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Text', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ textColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { textColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Accent', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ accentColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { accentColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>
				{ testimonials.map( ( t, i ) => (
					<PanelBody
						key={ i }
						title={ t.name || `Testimonial ${ i + 1 }` }
						initialOpen={ false }
					>
						<TextareaControl
							label={ __( 'Quote', 'wbcom-essential' ) }
							value={ t.quote }
							onChange={ ( val ) =>
								updateTestimonial( i, 'quote', val )
							}
							rows={ 3 }
						/>
						<TextControl
							label={ __( 'Name', 'wbcom-essential' ) }
							value={ t.name }
							onChange={ ( val ) =>
								updateTestimonial( i, 'name', val )
							}
						/>
						<TextControl
							label={ __( 'Role / Company', 'wbcom-essential' ) }
							value={ t.role }
							onChange={ ( val ) =>
								updateTestimonial( i, 'role', val )
							}
						/>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									updateTestimonial( i, 'avatar', media.url )
								}
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant="secondary"
									>
										{ t.avatar
											? __(
													'Replace Avatar',
													'wbcom-essential'
											  )
											: __(
													'Add Avatar',
													'wbcom-essential'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ testimonials.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeTestimonial( i ) }
								style={ { marginTop: '8px' } }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addTestimonial }>
						{ __( 'Add Testimonial', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbe-testimonials__track">
					{ testimonials.map( ( t, i ) => (
						<div key={ i } className="wbe-testimonials__slide">
							<blockquote className="wbe-testimonials__quote">
								{ t.quote }
							</blockquote>
							<div className="wbe-testimonials__author">
								{ t.avatar && (
									<img
										className="wbe-testimonials__avatar"
										src={ t.avatar }
										alt={ t.name }
									/>
								) }
								<div>
									<strong className="wbe-testimonials__name">
										{ t.name }
									</strong>
									{ t.role && (
										<span className="wbe-testimonials__role">
											{ t.role }
										</span>
									) }
								</div>
							</div>
						</div>
					) ) }
				</div>
				<p className="wbe-testimonials__editor-note">
					{ __(
						'Carousel preview — all slides shown in editor.',
						'wbcom-essential'
					) }
				</p>
			</div>
		</>
	);
}
