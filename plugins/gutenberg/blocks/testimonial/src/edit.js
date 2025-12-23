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
		padding,
		boxShadow,
		avatarSize,
		quoteIconSize,
		quoteIconColor,
		quoteFontSize,
		nameFontSize,
		roleFontSize,
		spacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-testimonial layout-${ layout } text-${ textAlign }`,
		style: {
			'--bg-color': backgroundColor,
			'--border-radius': `${ borderRadius }px`,
			'--padding': `${ padding }px`,
			'--box-shadow': boxShadow ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
			'--avatar-size': `${ avatarSize }px`,
			'--quote-icon-size': `${ quoteIconSize }px`,
			'--quote-icon-color': quoteIconColor,
			'--quote-font-size': `${ quoteFontSize }px`,
			'--name-font-size': `${ nameFontSize }px`,
			'--role-font-size': `${ roleFontSize }px`,
			'--spacing': `${ spacing }px`,
			'--quote-color': quoteColor,
			'--name-color': nameColor,
			'--role-color': roleColor,
			'--rating-color': ratingColor,
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
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ padding }
						onChange={ ( value ) =>
							setAttributes( { padding: value } )
						}
						min={ 0 }
						max={ 80 }
					/>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Spacing', 'wbcom-essential' ) }
						value={ spacing }
						onChange={ ( value ) =>
							setAttributes( { spacing: value } )
						}
						min={ 0 }
						max={ 60 }
						help={ __( 'Space between content and author', 'wbcom-essential' ) }
					/>
					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ boxShadow }
						onChange={ ( value ) =>
							setAttributes( { boxShadow: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Avatar Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Avatar Size', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) =>
							setAttributes( { avatarSize: value } )
						}
						min={ 30 }
						max={ 150 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Quote Icon', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ quoteIconSize }
						onChange={ ( value ) =>
							setAttributes( { quoteIconSize: value } )
						}
						min={ 24 }
						max={ 120 }
					/>
					<p className="components-base-control__label">
						{ __( 'Icon Color', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ quoteIconColor }
						onChange={ ( value ) =>
							setAttributes( { quoteIconColor: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Typography', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Quote Font Size', 'wbcom-essential' ) }
						value={ quoteFontSize }
						onChange={ ( value ) =>
							setAttributes( { quoteFontSize: value } )
						}
						min={ 12 }
						max={ 32 }
					/>
					<RangeControl
						label={ __( 'Name Font Size', 'wbcom-essential' ) }
						value={ nameFontSize }
						onChange={ ( value ) =>
							setAttributes( { nameFontSize: value } )
						}
						min={ 12 }
						max={ 28 }
					/>
					<RangeControl
						label={ __( 'Role Font Size', 'wbcom-essential' ) }
						value={ roleFontSize }
						onChange={ ( value ) =>
							setAttributes( { roleFontSize: value } )
						}
						min={ 10 }
						max={ 20 }
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
						/>
						<RichText
							tagName="span"
							className="wbcom-testimonial-role"
							value={ authorRole }
							onChange={ ( value ) =>
								setAttributes( { authorRole: value } )
							}
							placeholder={ __( 'Author role', 'wbcom-essential' ) }
						/>
					</div>
				</div>
			</div>
		</>
	);
}
