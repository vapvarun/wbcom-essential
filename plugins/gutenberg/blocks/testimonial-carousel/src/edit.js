/**
 * Testimonial Carousel Block - Editor Component
 *
 * @package wbcom-essential
 */

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
	RangeControl,
	ToggleControl,
	SelectControl,
	ColorPalette,
	Button,
	Placeholder,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		testimonials,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		spaceBetween,
		showNavigation,
		showPagination,
		loop,
		autoplay,
		autoplayDelay,
		showRating,
		cardBackground,
		cardBorderRadius,
		quoteColor,
		nameColor,
		roleColor,
		ratingColor,
		navColor,
		pauseOnInteraction,
		direction,
		effect,
		enableKeyboard,
		grabCursor,
		cardPadding,
		cardBorderWidth,
		cardBorderColor,
		cardShadow,
		avatarSize,
		avatarBorderRadius,
		quoteFontSize,
		nameFontSize,
		roleFontSize,
		paginationColor,
		paginationActiveColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-testimonial-carousel',
	} );

	const updateTestimonial = ( index, key, value ) => {
		const newTestimonials = [ ...testimonials ];
		newTestimonials[ index ] = { ...newTestimonials[ index ], [ key ]: value };
		setAttributes( { testimonials: newTestimonials } );
	};

	const addTestimonial = () => {
		const newId = testimonials.length > 0
			? Math.max( ...testimonials.map( t => t.id ) ) + 1
			: 1;
		setAttributes( {
			testimonials: [
				...testimonials,
				{
					id: newId,
					content: __( 'New testimonial content...', 'wbcom-essential' ),
					authorName: __( 'Author Name', 'wbcom-essential' ),
					authorRole: __( 'Role', 'wbcom-essential' ),
					imageId: 0,
					imageUrl: '',
					rating: 5,
				},
			],
		} );
	};

	const removeTestimonial = ( index ) => {
		const newTestimonials = testimonials.filter( ( _, i ) => i !== index );
		setAttributes( { testimonials: newTestimonials } );
	};

	const renderStars = ( rating ) => {
		const stars = [];
		for ( let i = 1; i <= 5; i++ ) {
			stars.push(
				<span
					key={ i }
					className={ `star ${ i <= rating ? 'filled' : 'empty' }` }
					style={ { color: i <= rating ? ratingColor : '#e2e8f0' } }
				>
					★
				</span>
			);
		}
		return stars;
	};

	const cardStyle = {
		backgroundColor: cardBackground,
		borderRadius: `${ cardBorderRadius }px`,
		padding: `${ cardPadding }px`,
		borderWidth: cardBorderWidth > 0 ? `${ cardBorderWidth }px` : undefined,
		borderStyle: cardBorderWidth > 0 ? 'solid' : undefined,
		borderColor: cardBorderWidth > 0 ? cardBorderColor : undefined,
		boxShadow: cardShadow ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
	};

	const avatarStyle = {
		width: `${ avatarSize }px`,
		height: `${ avatarSize }px`,
		borderRadius: `${ avatarBorderRadius }%`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Testimonials', 'wbcom-essential' ) }>
					{ testimonials.map( ( testimonial, index ) => (
						<div key={ testimonial.id } className="wbcom-testimonial-panel">
							<div className="wbcom-testimonial-panel-header">
								<strong>{ testimonial.authorName || `#${ index + 1 }` }</strong>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeTestimonial( index ) }
								>
									{ __( 'Remove', 'wbcom-essential' ) }
								</Button>
							</div>
							<TextareaControl
								label={ __( 'Quote', 'wbcom-essential' ) }
								value={ testimonial.content }
								onChange={ ( value ) =>
									updateTestimonial( index, 'content', value )
								}
								rows={ 3 }
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => {
										updateTestimonial( index, 'imageId', media.id );
										updateTestimonial( index, 'imageUrl', media.url );
									} }
									allowedTypes={ [ 'image' ] }
									value={ testimonial.imageId }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											variant="secondary"
											className="wbcom-testimonial-image-btn"
										>
											{ testimonial.imageUrl ? (
												<img
													src={ testimonial.imageUrl }
													alt={ testimonial.authorName }
												/>
											) : (
												__( 'Select Image', 'wbcom-essential' )
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							<TextControl
								label={ __( 'Name', 'wbcom-essential' ) }
								value={ testimonial.authorName }
								onChange={ ( value ) =>
									updateTestimonial( index, 'authorName', value )
								}
							/>
							<TextControl
								label={ __( 'Role', 'wbcom-essential' ) }
								value={ testimonial.authorRole }
								onChange={ ( value ) =>
									updateTestimonial( index, 'authorRole', value )
								}
							/>
							{ showRating && (
								<RangeControl
									label={ __( 'Rating', 'wbcom-essential' ) }
									value={ testimonial.rating }
									onChange={ ( value ) =>
										updateTestimonial( index, 'rating', value )
									}
									min={ 1 }
									max={ 5 }
								/>
							) }
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addTestimonial }>
						{ __( 'Add Testimonial', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				<PanelBody
					title={ __( 'Carousel Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slides Per View', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( value ) =>
							setAttributes( { slidesPerView: value } )
						}
						min={ 1 }
						max={ 4 }
					/>
					<RangeControl
						label={ __( 'Space Between (px)', 'wbcom-essential' ) }
						value={ spaceBetween }
						onChange={ ( value ) =>
							setAttributes( { spaceBetween: value } )
						}
						min={ 0 }
						max={ 100 }
					/>
					<ToggleControl
						label={ __( 'Show Navigation', 'wbcom-essential' ) }
						checked={ showNavigation }
						onChange={ ( value ) =>
							setAttributes( { showNavigation: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Pagination', 'wbcom-essential' ) }
						checked={ showPagination }
						onChange={ ( value ) =>
							setAttributes( { showPagination: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Loop', 'wbcom-essential' ) }
						checked={ loop }
						onChange={ ( value ) =>
							setAttributes( { loop: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) =>
							setAttributes( { autoplay: value } )
						}
					/>
					{ autoplay && (
						<>
							<RangeControl
								label={ __( 'Autoplay Delay (ms)', 'wbcom-essential' ) }
								value={ autoplayDelay }
								onChange={ ( value ) =>
									setAttributes( { autoplayDelay: value } )
								}
								min={ 1000 }
								max={ 10000 }
								step={ 500 }
							/>
							<ToggleControl
								label={ __( 'Pause on Interaction', 'wbcom-essential' ) }
								help={ __( 'Pause autoplay when user interacts with carousel', 'wbcom-essential' ) }
								checked={ pauseOnInteraction }
								onChange={ ( value ) =>
									setAttributes( { pauseOnInteraction: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Advanced Options', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Direction', 'wbcom-essential' ) }
						value={ direction }
						options={ [
							{ label: __( 'Horizontal', 'wbcom-essential' ), value: 'horizontal' },
							{ label: __( 'Vertical', 'wbcom-essential' ), value: 'vertical' },
						] }
						onChange={ ( value ) =>
							setAttributes( { direction: value } )
						}
					/>

					<SelectControl
						label={ __( 'Effect', 'wbcom-essential' ) }
						value={ effect }
						options={ [
							{ label: __( 'Slide', 'wbcom-essential' ), value: 'slide' },
							{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
							{ label: __( 'Cube', 'wbcom-essential' ), value: 'cube' },
							{ label: __( 'Coverflow', 'wbcom-essential' ), value: 'coverflow' },
						] }
						onChange={ ( value ) =>
							setAttributes( { effect: value } )
						}
						help={ __( 'Note: Some effects work best with 1 slide visible', 'wbcom-essential' ) }
					/>

					<ToggleControl
						label={ __( 'Keyboard Navigation', 'wbcom-essential' ) }
						help={ __( 'Allow navigation using arrow keys', 'wbcom-essential' ) }
						checked={ enableKeyboard }
						onChange={ ( value ) =>
							setAttributes( { enableKeyboard: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Grab Cursor', 'wbcom-essential' ) }
						help={ __( 'Show grab cursor when hovering over carousel', 'wbcom-essential' ) }
						checked={ grabCursor }
						onChange={ ( value ) =>
							setAttributes( { grabCursor: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Display', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Rating', 'wbcom-essential' ) }
						checked={ showRating }
						onChange={ ( value ) =>
							setAttributes( { showRating: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Card Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Card Padding (px)', 'wbcom-essential' ) }
						value={ cardPadding }
						onChange={ ( value ) =>
							setAttributes( { cardPadding: value } )
						}
						min={ 0 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Card Border Radius (px)', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { cardBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Card Border Width (px)', 'wbcom-essential' ) }
						value={ cardBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { cardBorderWidth: value } )
						}
						min={ 0 }
						max={ 10 }
					/>
					{ cardBorderWidth > 0 && (
						<>
							<p className="components-base-control__label">
								{ __( 'Card Border Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ cardBorderColor }
								onChange={ ( value ) =>
									setAttributes( { cardBorderColor: value } )
								}
							/>
						</>
					) }
					<ToggleControl
						label={ __( 'Card Shadow', 'wbcom-essential' ) }
						checked={ cardShadow }
						onChange={ ( value ) =>
							setAttributes( { cardShadow: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Avatar Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Avatar Size (px)', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) =>
							setAttributes( { avatarSize: value } )
						}
						min={ 30 }
						max={ 150 }
					/>
					<RangeControl
						label={ __( 'Avatar Border Radius (%)', 'wbcom-essential' ) }
						value={ avatarBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { avatarBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Typography', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Quote Font Size (px)', 'wbcom-essential' ) }
						value={ quoteFontSize }
						onChange={ ( value ) =>
							setAttributes( { quoteFontSize: value } )
						}
						min={ 12 }
						max={ 32 }
					/>
					<RangeControl
						label={ __( 'Name Font Size (px)', 'wbcom-essential' ) }
						value={ nameFontSize }
						onChange={ ( value ) =>
							setAttributes( { nameFontSize: value } )
						}
						min={ 12 }
						max={ 28 }
					/>
					<RangeControl
						label={ __( 'Role Font Size (px)', 'wbcom-essential' ) }
						value={ roleFontSize }
						onChange={ ( value ) =>
							setAttributes( { roleFontSize: value } )
						}
						min={ 10 }
						max={ 24 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Card Background', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ cardBackground }
						onChange={ ( value ) =>
							setAttributes( { cardBackground: value } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Quote Color', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ quoteColor }
						onChange={ ( value ) =>
							setAttributes( { quoteColor: value } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Name Color', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ nameColor }
						onChange={ ( value ) =>
							setAttributes( { nameColor: value } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Role Color', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ roleColor }
						onChange={ ( value ) =>
							setAttributes( { roleColor: value } )
						}
					/>
					{ showRating && (
						<>
							<p className="components-base-control__label">
								{ __( 'Rating Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ ratingColor }
								onChange={ ( value ) =>
									setAttributes( { ratingColor: value } )
								}
							/>
						</>
					) }
					{ showNavigation && (
						<>
							<p className="components-base-control__label">
								{ __( 'Navigation Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ navColor }
								onChange={ ( value ) =>
									setAttributes( { navColor: value } )
								}
							/>
						</>
					) }
					{ showPagination && (
						<>
							<p className="components-base-control__label">
								{ __( 'Pagination Dot Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ paginationColor }
								onChange={ ( value ) =>
									setAttributes( { paginationColor: value } )
								}
							/>
							<p className="components-base-control__label">
								{ __( 'Pagination Active Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ paginationActiveColor }
								onChange={ ( value ) =>
									setAttributes( { paginationActiveColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ testimonials.length === 0 ? (
					<Placeholder
						icon="format-quote"
						label={ __( 'Testimonial Carousel', 'wbcom-essential' ) }
						instructions={ __(
							'Add testimonials in the sidebar.',
							'wbcom-essential'
						) }
					>
						<Button variant="primary" onClick={ addTestimonial }>
							{ __( 'Add Testimonial', 'wbcom-essential' ) }
						</Button>
					</Placeholder>
				) : (
					<div className="wbcom-testimonial-carousel-preview">
						{ testimonials.slice( 0, slidesPerView ).map( ( testimonial ) => (
							<div
								key={ testimonial.id }
								className="wbcom-testimonial-card"
								style={ cardStyle }
							>
								{ showRating && (
									<div className="wbcom-testimonial-rating">
										{ renderStars( testimonial.rating ) }
									</div>
								) }
								<div className="wbcom-testimonial-quote">
									<span className="quote-mark">"</span>
									<p style={ { color: quoteColor, fontSize: `${ quoteFontSize }px` } }>
										{ testimonial.content }
									</p>
								</div>
								<div className="wbcom-testimonial-author">
									{ testimonial.imageUrl && (
										<div className="wbcom-testimonial-avatar" style={ avatarStyle }>
											<img
												src={ testimonial.imageUrl }
												alt={ testimonial.authorName }
												style={ { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' } }
											/>
										</div>
									) }
									<div className="wbcom-testimonial-info">
										<span
											className="wbcom-testimonial-name"
											style={ { color: nameColor, fontSize: `${ nameFontSize }px` } }
										>
											{ testimonial.authorName }
										</span>
										<span
											className="wbcom-testimonial-role"
											style={ { color: roleColor, fontSize: `${ roleFontSize }px` } }
										>
											{ testimonial.authorRole }
										</span>
									</div>
								</div>
							</div>
						) ) }
					</div>
				) }
				{ testimonials.length > slidesPerView && (
					<p className="wbcom-testimonial-carousel-hint">
						+{ testimonials.length - slidesPerView } { __( 'more testimonials', 'wbcom-essential' ) }
					</p>
				) }
			</div>
		</>
	);
}
