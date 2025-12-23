/**
 * Testimonial Block - Editor Component
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
	TextControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
	Button,
	ButtonGroup,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		content,
		authorName,
		authorRole,
		imageId,
		imageUrl,
		showRating,
		rating,
		layout,
		textAlign,
		backgroundColor,
		borderRadius,
		quoteColor,
		nameColor,
		roleColor,
		ratingColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-testimonial layout-${ layout } text-${ textAlign }`,
		style: {
			backgroundColor,
			borderRadius: `${ borderRadius }px`,
		},
	} );

	/**
	 * Render star rating.
	 */
	const renderStars = () => {
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) => {
								setAttributes( {
									imageId: media.id,
									imageUrl: media.url,
								} );
							} }
							allowedTypes={ [ 'image' ] }
							value={ imageId }
							render={ ( { open } ) => (
								<div className="wbcom-image-control">
									<p className="components-base-control__label">
										{ __( 'Author Image', 'wbcom-essential' ) }
									</p>
									<Button
										onClick={ open }
										variant="secondary"
										className="wbcom-image-btn"
									>
										{ imageUrl ? (
											<img
												src={ imageUrl }
												alt={ authorName }
											/>
										) : (
											__( 'Select Image', 'wbcom-essential' )
										) }
									</Button>
									{ imageUrl && (
										<Button
											isDestructive
											onClick={ () =>
												setAttributes( {
													imageId: 0,
													imageUrl: '',
												} )
											}
										>
											{ __( 'Remove', 'wbcom-essential' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
					<TextControl
						label={ __( 'Author Name', 'wbcom-essential' ) }
						value={ authorName }
						onChange={ ( value ) =>
							setAttributes( { authorName: value } )
						}
					/>
					<TextControl
						label={ __( 'Author Role', 'wbcom-essential' ) }
						value={ authorRole }
						onChange={ ( value ) =>
							setAttributes( { authorRole: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Rating', 'wbcom-essential' ) }
						checked={ showRating }
						onChange={ ( value ) =>
							setAttributes( { showRating: value } )
						}
					/>
					{ showRating && (
						<RangeControl
							label={ __( 'Rating', 'wbcom-essential' ) }
							value={ rating }
							onChange={ ( value ) =>
								setAttributes( { rating: value } )
							}
							min={ 1 }
							max={ 5 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Direction', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Column', 'wbcom-essential' ), value: 'column' },
							{ label: __( 'Column Reverse', 'wbcom-essential' ), value: 'column-reverse' },
							{ label: __( 'Row', 'wbcom-essential' ), value: 'row' },
							{ label: __( 'Row Reverse', 'wbcom-essential' ), value: 'row-reverse' },
						] }
						onChange={ ( value ) =>
							setAttributes( { layout: value } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Text Alignment', 'wbcom-essential' ) }
					</p>
					<ButtonGroup>
						{ [ 'left', 'center', 'right' ].map( ( align ) => (
							<Button
								key={ align }
								isPressed={ textAlign === align }
								onClick={ () =>
									setAttributes( { textAlign: align } )
								}
							>
								{ align.charAt( 0 ).toUpperCase() + align.slice( 1 ) }
							</Button>
						) ) }
					</ButtonGroup>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
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
						{ __( 'Background', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( value ) =>
							setAttributes( { backgroundColor: value } )
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
				<div className="wbcom-testimonial-content">
					{ showRating && (
						<div className="wbcom-testimonial-rating">
							{ renderStars() }
						</div>
					) }
					<div className="wbcom-testimonial-quote">
						<span className="quote-mark">"</span>
						<RichText
							tagName="p"
							value={ content }
							onChange={ ( value ) =>
								setAttributes( { content: value } )
							}
							placeholder={ __( 'Enter testimonial text...', 'wbcom-essential' ) }
							style={ { color: quoteColor } }
						/>
					</div>
				</div>
				<div className="wbcom-testimonial-author">
					{ imageUrl && (
						<div className="wbcom-testimonial-avatar">
							<img src={ imageUrl } alt={ authorName } />
						</div>
					) }
					<div className="wbcom-testimonial-info">
						<RichText
							tagName="span"
							className="wbcom-testimonial-name"
							value={ authorName }
							onChange={ ( value ) =>
								setAttributes( { authorName: value } )
							}
							placeholder={ __( 'Author name', 'wbcom-essential' ) }
							style={ { color: nameColor } }
						/>
						<RichText
							tagName="span"
							className="wbcom-testimonial-role"
							value={ authorRole }
							onChange={ ( value ) =>
								setAttributes( { authorRole: value } )
							}
							placeholder={ __( 'Author role', 'wbcom-essential' ) }
							style={ { color: roleColor } }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
