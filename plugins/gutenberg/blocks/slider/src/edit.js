/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `editor` keyword are bundled together. The code used
 * gets applied to the editor.
 */
import './editor.scss';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';

import { Button, PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * @param {Object} props Props.
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		slides,
		sliderHeight,
		sliderHeightTablet,
		sliderHeightMobile,
		autoplay,
		autoplayDuration,
		slideTransition,
		showDots,
		showArrows,
		slideBgColor,
		titleColor,
		contentColor,
		navArrowsDesktop,
		navArrowsTablet,
		navArrowsMobile,
		navDotsDesktop,
		navDotsTablet,
		navDotsMobile,
	} = attributes;

	const [ activeSlideIndex, setActiveSlideIndex ] = useState( 0 );

	const responsiveStyles = {
		'--slider-height-desktop': `${sliderHeight.size}${sliderHeight.unit}`,
		'--slider-height-tablet': `${sliderHeightTablet.size}${sliderHeightTablet.unit}`,
		'--slider-height-mobile': `${sliderHeightMobile.size}${sliderHeightMobile.unit}`,
		minHeight: `${sliderHeight.size}${sliderHeight.unit}`,
	};

	const blockProps = useBlockProps( {
		className: 'wp-block-wbcom-essential-slider',
		style: responsiveStyles,
	} );

	const addSlide = () => {
		const newSlide = {
			id: slides.length + 1,
			image: { id: '', url: '', alt: '' },
			title: `Title #${slides.length + 1}`,
			content: 'Content here...',
			link: { url: '', is_external: false, nofollow: false },
		};
		setAttributes( { slides: [ ...slides, newSlide ] } );
	};

	const updateSlide = ( index, key, value ) => {
		const updatedSlides = [ ...slides ];
		updatedSlides[ index ][ key ] = value;
		setAttributes( { slides: updatedSlides } );
	};

	const removeSlide = ( index ) => {
		const updatedSlides = slides.filter( ( _, i ) => i !== index );
		setAttributes( { slides: updatedSlides } );
	};

	const moveSlide = ( fromIndex, toIndex ) => {
		const updatedSlides = [ ...slides ];
		const [ movedSlide ] = updatedSlides.splice( fromIndex, 1 );
		updatedSlides.splice( toIndex, 0, movedSlide );
		setAttributes( { slides: updatedSlides } );
	};

	const navigateToSlide = ( direction ) => {
		if ( direction === 'prev' ) {
			setActiveSlideIndex( prevIndex => Math.max( 0, prevIndex - 1 ) );
		} else if ( direction === 'next' ) {
			setActiveSlideIndex( prevIndex => Math.min( slides.length - 1, prevIndex + 1 ) );
		}
	};

	const selectSlide = ( index ) => {
		setActiveSlideIndex( index );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Slider Settings', 'wbcom-essential' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Slider Height (Desktop)', 'wbcom-essential' ) }
						</label>
						<div className="components-base-control__field">
							<input
								type="number"
								value={ sliderHeight.size }
								onChange={ ( e ) => setAttributes( {
									sliderHeight: { ...sliderHeight, size: parseInt( e.target.value ) || 700 }
								} ) }
								min="100"
								max="1400"
								step="10"
							/>
							<select
								value={ sliderHeight.unit }
								onChange={ ( e ) => setAttributes( {
									sliderHeight: { ...sliderHeight, unit: e.target.value }
								} ) }
							>
								<option value="px">px</option>
								<option value="vh">vh</option>
							</select>
						</div>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Slider Height (Tablet)', 'wbcom-essential' ) }
						</label>
						<div className="components-base-control__field">
							<input
								type="number"
								value={ sliderHeightTablet.size }
								onChange={ ( e ) => setAttributes( {
									sliderHeightTablet: { ...sliderHeightTablet, size: parseInt( e.target.value ) || 500 }
								} ) }
								min="100"
								max="1200"
								step="10"
							/>
							<select
								value={ sliderHeightTablet.unit }
								onChange={ ( e ) => setAttributes( {
									sliderHeightTablet: { ...sliderHeightTablet, unit: e.target.value }
								} ) }
							>
								<option value="px">px</option>
								<option value="vh">vh</option>
							</select>
						</div>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Slider Height (Mobile)', 'wbcom-essential' ) }
						</label>
						<div className="components-base-control__field">
							<input
								type="number"
								value={ sliderHeightMobile.size }
								onChange={ ( e ) => setAttributes( {
									sliderHeightMobile: { ...sliderHeightMobile, size: parseInt( e.target.value ) || 400 }
								} ) }
								min="100"
								max="1000"
								step="10"
							/>
							<select
								value={ sliderHeightMobile.unit }
								onChange={ ( e ) => setAttributes( {
									sliderHeightMobile: { ...sliderHeightMobile, unit: e.target.value }
								} ) }
							>
								<option value="px">px</option>
								<option value="vh">vh</option>
							</select>
						</div>
					</div>

					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
					/>

					{ autoplay && (
						<RangeControl
							label={ __( 'Autoplay Duration (seconds)', 'wbcom-essential' ) }
							value={ autoplayDuration }
							onChange={ ( value ) => setAttributes( { autoplayDuration: value } ) }
							min={ 1 }
							max={ 120 }
							step={ 1 }
						/>
					) }

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Slide Transition', 'wbcom-essential' ) }
						</label>
						<select
							value={ slideTransition }
							onChange={ ( e ) => setAttributes( { slideTransition: e.target.value } ) }
							className="components-select-control__input"
						>
							<option value="fade">{ __( 'Fade', 'wbcom-essential' ) }</option>
							<option value="slide">{ __( 'Slide', 'wbcom-essential' ) }</option>
						</select>
					</div>

					<ToggleControl
						label={ __( 'Show Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( value ) => setAttributes( { showDots: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( value ) => setAttributes( { showArrows: value } ) }
					/>

					{ showArrows && (
						<>
							<ToggleControl
								label={ __( 'Hide Arrows on Desktop', 'wbcom-essential' ) }
								checked={ navArrowsDesktop }
								onChange={ ( value ) => setAttributes( { navArrowsDesktop: value } ) }
							/>
							<ToggleControl
								label={ __( 'Hide Arrows on Tablet', 'wbcom-essential' ) }
								checked={ navArrowsTablet }
								onChange={ ( value ) => setAttributes( { navArrowsTablet: value } ) }
							/>
							<ToggleControl
								label={ __( 'Hide Arrows on Mobile', 'wbcom-essential' ) }
								checked={ navArrowsMobile }
								onChange={ ( value ) => setAttributes( { navArrowsMobile: value } ) }
							/>
						</>
					) }

					{ showDots && (
						<>
							<ToggleControl
								label={ __( 'Hide Dots on Desktop', 'wbcom-essential' ) }
								checked={ navDotsDesktop }
								onChange={ ( value ) => setAttributes( { navDotsDesktop: value } ) }
							/>
							<ToggleControl
								label={ __( 'Hide Dots on Tablet', 'wbcom-essential' ) }
								checked={ navDotsTablet }
								onChange={ ( value ) => setAttributes( { navDotsTablet: value } ) }
							/>
							<ToggleControl
								label={ __( 'Hide Dots on Mobile', 'wbcom-essential' ) }
								checked={ navDotsMobile }
								onChange={ ( value ) => setAttributes( { navDotsMobile: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Slide Background Color', 'wbcom-essential' ) }
						</label>
						<input
							type="color"
							value={ slideBgColor }
							onChange={ ( e ) => setAttributes( { slideBgColor: e.target.value } ) }
							className="components-color-picker__input"
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Title Color', 'wbcom-essential' ) }
						</label>
						<input
							type="color"
							value={ titleColor }
							onChange={ ( e ) => setAttributes( { titleColor: e.target.value } ) }
							className="components-color-picker__input"
						/>
					</div>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Content Color', 'wbcom-essential' ) }
						</label>
						<input
							type="color"
							value={ contentColor }
							onChange={ ( e ) => setAttributes( { contentColor: e.target.value } ) }
							className="components-color-picker__input"
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{/* Slide Navigation */}
				<div className="wbcom-slider-editor-nav">
					<div className="wbcom-slider-nav-header">
						<span>{ __( 'Editing Slide', 'wbcom-essential' ) } { activeSlideIndex + 1 } { __( 'of', 'wbcom-essential' ) } { slides.length }</span>
						<div className="wbcom-slider-nav-controls">
							<Button
								size="small"
								onClick={ () => navigateToSlide( 'prev' ) }
								disabled={ activeSlideIndex === 0 }
								className="wbcom-slider-nav-prev"
							>
								‹ { __( 'Prev', 'wbcom-essential' ) }
							</Button>
							<Button
								size="small"
								onClick={ () => navigateToSlide( 'next' ) }
								disabled={ activeSlideIndex === slides.length - 1 }
								className="wbcom-slider-nav-next"
							>
								{ __( 'Next', 'wbcom-essential' ) } ›
							</Button>
						</div>
					</div>

					{/* Slide Thumbnails */}
					<div className="wbcom-slider-thumbnails">
						{ slides.map( ( slide, index ) => (
							<Button
								key={ slide.id }
								size="small"
								onClick={ () => selectSlide( index ) }
								className={ `wbcom-slider-thumbnail ${ activeSlideIndex === index ? 'active' : '' }` }
								title={ slide.title || `Slide ${ index + 1 }` }
							>
								{ index + 1 }
							</Button>
						) ) }
					</div>
				</div>

				{/* Active Slide Editor */}
				<div className="wbcom-slider-wrapper" style={{ backgroundColor: slideBgColor }}>
					<div className="wbcom-slider-inner">
						{ slides[ activeSlideIndex ] && (
							<div key={ slides[ activeSlideIndex ].id } className="wbcom-slider-slide">
								{ slides[ activeSlideIndex ].image.url && (
									<div
										className="wbcom-slider-bg"
										style={ {
											backgroundImage: `url(${ slides[ activeSlideIndex ].image.url })`,
											backgroundSize: 'cover',
											backgroundPosition: 'center center',
											backgroundRepeat: 'no-repeat',
											minHeight: `${sliderHeight.size}${sliderHeight.unit}`,
										} }
									/>
								) }

								<div className="wbcom-slider-text-wrapper">
									<div className="wbcom-slider-text-box">
										<RichText
											tagName="h1"
											value={ slides[ activeSlideIndex ].title }
											onChange={ ( value ) => updateSlide( activeSlideIndex, 'title', value ) }
											placeholder={ __( 'Slide Title', 'wbcom-essential' ) }
											style={ { color: titleColor } }
											className="wbcom-slider-title"
										/>

										<RichText
											tagName="div"
											value={ slides[ activeSlideIndex ].content }
											onChange={ ( value ) => updateSlide( activeSlideIndex, 'content', value ) }
											placeholder={ __( 'Slide content...', 'wbcom-essential' ) }
											style={ { color: contentColor } }
											className="wbcom-slider-desc"
										/>

										{ slides[ activeSlideIndex ].link.url && (
											<div className="wbcom-slider-link">
												<a
													href={ slides[ activeSlideIndex ].link.url }
													target={ slides[ activeSlideIndex ].link.is_external ? '_blank' : '_self' }
													rel={ slides[ activeSlideIndex ].link.nofollow ? 'nofollow' : '' }
													className="wbcombtn-primary"
												>
													{ __( 'Learn More', 'wbcom-essential' ) }
												</a>
											</div>
										) }
									</div>
								</div>

								<div className="wbcom-slider-controls">
									<Button
										size="small"
										onClick={ () => removeSlide( activeSlideIndex ) }
										className="wbcom-slider-remove-slide"
									>
										×
									</Button>
								</div>
							</div>
						) }
					</div>

					{ showArrows && (
						<>
							<button className="wbcom-slider-prev">‹</button>
							<button className="wbcom-slider-next">›</button>
						</>
					) }

					{ showDots && (
						<div className="wbcom-slider-dots">
							{ slides.map( ( _, index ) => (
								<button key={ index } className="wbcom-slider-dot" />
							) ) }
						</div>
					) }
				</div>

				<div className="wbcom-slider-add-slide">
					<Button
						onClick={ addSlide }
						className="wbcom-slider-add-slide-btn"
						variant="secondary"
					>
						{ __( 'Add Slide', 'wbcom-essential' ) }
					</Button>
				</div>
			</div>
		</>
	);
}