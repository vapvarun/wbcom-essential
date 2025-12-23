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
	ColorPalette,
	Button,
	Placeholder,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		testimonials,
		slidesPerView,
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
					) }
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
					<RangeControl
						label={ __( 'Card Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { cardBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
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
									<p style={ { color: quoteColor } }>
										{ testimonial.content }
									</p>
								</div>
								<div className="wbcom-testimonial-author">
									{ testimonial.imageUrl && (
										<div className="wbcom-testimonial-avatar">
											<img
												src={ testimonial.imageUrl }
												alt={ testimonial.authorName }
											/>
										</div>
									) }
									<div className="wbcom-testimonial-info">
										<span
											className="wbcom-testimonial-name"
											style={ { color: nameColor } }
										>
											{ testimonial.authorName }
										</span>
										<span
											className="wbcom-testimonial-role"
											style={ { color: roleColor } }
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
