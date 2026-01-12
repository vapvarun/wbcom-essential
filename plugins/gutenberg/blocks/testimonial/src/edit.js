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
		useThemeColors,
		content,
		authorName,
		authorRole,
		imageId,
		imageUrl,
		imageSize,
		showRating,
		rating,
		layout,
		authorInfoDirection,
		textAlign,
		backgroundColor,
		itemMaxWidth,
		borderRadius,
		borderWidth,
		borderStyle,
		borderColor,
		quoteColor,
		nameColor,
		roleColor,
		ratingColor,
		padding,
		boxShadow,
		boxShadowColor,
		boxShadowBlur,
		boxShadowSpread,
		boxShadowHorizontal,
		boxShadowVertical,
		avatarSize,
		avatarBorderRadius,
		avatarBorderWidth,
		avatarBorderStyle,
		avatarBorderColor,
		avatarBoxShadow,
		quoteIconSize,
		quoteIconColor,
		quoteFontSize,
		nameFontSize,
		roleFontSize,
		spacing,
		contentArrow,
		contentArrowColor,
		contentArrowSize,
	} = attributes;

	// Build box shadow string
	const boxShadowValue = boxShadow
		? `${ boxShadowHorizontal }px ${ boxShadowVertical }px ${ boxShadowBlur }px ${ boxShadowSpread }px ${ boxShadowColor }`
		: 'none';

	// Build wrapper classes.
	const wrapperClasses = [
		'wbcom-essential-testimonial',
		`layout-${ layout }`,
		`info-${ authorInfoDirection }`,
		`text-${ textAlign }`,
		`arrow-${ contentArrow }`,
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	// Build CSS variables - layout always, colors conditionally.
	const cssVars = {
		// Layout variables (always applied).
		'--item-max-width': `${ itemMaxWidth }px`,
		'--border-radius': `${ borderRadius }px`,
		'--border-width': `${ borderWidth }px`,
		'--border-style': borderStyle,
		'--padding': `${ padding }px`,
		'--box-shadow': boxShadowValue,
		'--avatar-size': `${ avatarSize }px`,
		'--avatar-border-radius': `${ avatarBorderRadius }%`,
		'--avatar-border-width': `${ avatarBorderWidth }px`,
		'--avatar-border-style': avatarBorderStyle,
		'--avatar-box-shadow': avatarBoxShadow ? '0 4px 10px rgba(0, 0, 0, 0.15)' : 'none',
		'--quote-icon-size': `${ quoteIconSize }px`,
		'--quote-font-size': `${ quoteFontSize }px`,
		'--name-font-size': `${ nameFontSize }px`,
		'--role-font-size': `${ roleFontSize }px`,
		'--spacing': `${ spacing }px`,
		'--arrow-size': `${ contentArrowSize }px`,
		// Color variables (only when NOT using theme colors).
		...( ! useThemeColors && {
			'--bg-color': backgroundColor,
			'--border-color': borderColor,
			'--avatar-border-color': avatarBorderColor,
			'--quote-icon-color': quoteIconColor,
			'--quote-color': quoteColor,
			'--name-color': nameColor,
			'--role-color': roleColor,
			'--rating-color': ratingColor,
			'--arrow-color': contentArrowColor,
		} ),
	};

	const blockProps = useBlockProps( {
		className: wrapperClasses,
		style: cssVars,
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

	/**
	 * Image size options.
	 */
	const imageSizeOptions = [
		{ label: __( 'Thumbnail', 'wbcom-essential' ), value: 'thumbnail' },
		{ label: __( 'Medium', 'wbcom-essential' ), value: 'medium' },
		{ label: __( 'Large', 'wbcom-essential' ), value: 'large' },
		{ label: __( 'Full', 'wbcom-essential' ), value: 'full' },
	];

	/**
	 * Border style options.
	 */
	const borderStyleOptions = [
		{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
		{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
		{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
		{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
		{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
	];

	/**
	 * Flex direction options.
	 */
	const flexDirectionOptions = [
		{ label: __( 'Column', 'wbcom-essential' ), value: 'column' },
		{ label: __( 'Column Reverse', 'wbcom-essential' ), value: 'column-reverse' },
		{ label: __( 'Row', 'wbcom-essential' ), value: 'row' },
		{ label: __( 'Row Reverse', 'wbcom-essential' ), value: 'row-reverse' },
	];

	/**
	 * Arrow options.
	 */
	const arrowOptions = [
		{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
		{ label: __( 'Top', 'wbcom-essential' ), value: 'top' },
		{ label: __( 'Bottom', 'wbcom-essential' ), value: 'bottom' },
		{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
		{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
	];

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
					{ imageUrl && (
						<SelectControl
							label={ __( 'Image Size', 'wbcom-essential' ) }
							value={ imageSize }
							options={ imageSizeOptions }
							onChange={ ( value ) =>
								setAttributes( { imageSize: value } )
							}
						/>
					) }
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
						label={ __( 'Item Direction', 'wbcom-essential' ) }
						value={ layout }
						options={ flexDirectionOptions }
						onChange={ ( value ) =>
							setAttributes( { layout: value } )
						}
						help={ __( 'Controls the main testimonial layout', 'wbcom-essential' ) }
					/>
					<SelectControl
						label={ __( 'Author Info Direction', 'wbcom-essential' ) }
						value={ authorInfoDirection }
						options={ flexDirectionOptions }
						onChange={ ( value ) =>
							setAttributes( { authorInfoDirection: value } )
						}
						help={ __( 'Controls the author section layout', 'wbcom-essential' ) }
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
						label={ __( 'Max Width', 'wbcom-essential' ) }
						value={ itemMaxWidth }
						onChange={ ( value ) =>
							setAttributes( { itemMaxWidth: value } )
						}
						min={ 200 }
						max={ 1200 }
					/>
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
						label={ __( 'Spacing', 'wbcom-essential' ) }
						value={ spacing }
						onChange={ ( value ) =>
							setAttributes( { spacing: value } )
						}
						min={ 0 }
						max={ 60 }
						help={ __( 'Space between content and author', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Item Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Background Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) =>
									setAttributes( { backgroundColor: value } )
								}
							/>
						</>
					) }
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
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ borderWidth }
						onChange={ ( value ) =>
							setAttributes( { borderWidth: value } )
						}
						min={ 0 }
						max={ 10 }
					/>
					{ borderWidth > 0 && (
						<>
							<SelectControl
								label={ __( 'Border Style', 'wbcom-essential' ) }
								value={ borderStyle }
								options={ borderStyleOptions }
								onChange={ ( value ) =>
									setAttributes( { borderStyle: value } )
								}
							/>
							{ ! useThemeColors && (
								<>
									<p className="components-base-control__label">
										{ __( 'Border Color', 'wbcom-essential' ) }
									</p>
									<ColorPalette
										value={ borderColor }
										onChange={ ( value ) =>
											setAttributes( { borderColor: value } )
										}
									/>
								</>
							) }
						</>
					) }
					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ boxShadow }
						onChange={ ( value ) =>
							setAttributes( { boxShadow: value } )
						}
					/>
					{ boxShadow && (
						<>
							<RangeControl
								label={ __( 'Horizontal Offset', 'wbcom-essential' ) }
								value={ boxShadowHorizontal }
								onChange={ ( value ) =>
									setAttributes( { boxShadowHorizontal: value } )
								}
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Vertical Offset', 'wbcom-essential' ) }
								value={ boxShadowVertical }
								onChange={ ( value ) =>
									setAttributes( { boxShadowVertical: value } )
								}
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Blur', 'wbcom-essential' ) }
								value={ boxShadowBlur }
								onChange={ ( value ) =>
									setAttributes( { boxShadowBlur: value } )
								}
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label={ __( 'Spread', 'wbcom-essential' ) }
								value={ boxShadowSpread }
								onChange={ ( value ) =>
									setAttributes( { boxShadowSpread: value } )
								}
								min={ -50 }
								max={ 50 }
							/>
						</>
					) }
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
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Border Radius (%)', 'wbcom-essential' ) }
						value={ avatarBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { avatarBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
						help={ __( '50% creates a circle', 'wbcom-essential' ) }
					/>
					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ avatarBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { avatarBorderWidth: value } )
						}
						min={ 0 }
						max={ 10 }
					/>
					{ avatarBorderWidth > 0 && (
						<>
							<SelectControl
								label={ __( 'Border Style', 'wbcom-essential' ) }
								value={ avatarBorderStyle }
								options={ borderStyleOptions }
								onChange={ ( value ) =>
									setAttributes( { avatarBorderStyle: value } )
								}
							/>
							{ ! useThemeColors && (
								<>
									<p className="components-base-control__label">
										{ __( 'Border Color', 'wbcom-essential' ) }
									</p>
									<ColorPalette
										value={ avatarBorderColor }
										onChange={ ( value ) =>
											setAttributes( { avatarBorderColor: value } )
										}
									/>
								</>
							) }
						</>
					) }
					<ToggleControl
						label={ __( 'Avatar Shadow', 'wbcom-essential' ) }
						checked={ avatarBoxShadow }
						onChange={ ( value ) =>
							setAttributes( { avatarBoxShadow: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Content Arrow', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Arrow Position', 'wbcom-essential' ) }
						value={ contentArrow }
						options={ arrowOptions }
						onChange={ ( value ) =>
							setAttributes( { contentArrow: value } )
						}
					/>
					{ contentArrow !== 'none' && (
						<>
							<RangeControl
								label={ __( 'Arrow Size', 'wbcom-essential' ) }
								value={ contentArrowSize }
								onChange={ ( value ) =>
									setAttributes( { contentArrowSize: value } )
								}
								min={ 5 }
								max={ 30 }
							/>
							{ ! useThemeColors && (
								<>
									<p className="components-base-control__label">
										{ __( 'Arrow Color', 'wbcom-essential' ) }
									</p>
									<ColorPalette
										value={ contentArrowColor }
										onChange={ ( value ) =>
											setAttributes( { contentArrowColor: value } )
										}
									/>
								</>
							) }
						</>
					) }
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
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Icon Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ quoteIconColor }
								onChange={ ( value ) =>
									setAttributes( { quoteIconColor: value } )
								}
							/>
						</>
					) }
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
					{ useThemeColors ? (
						<p className="components-base-control__help">
							{ __( 'Colors are inherited from your theme. Disable "Use Theme Colors" in Item Style to customize.', 'wbcom-essential' ) }
						</p>
					) : (
						<>
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
