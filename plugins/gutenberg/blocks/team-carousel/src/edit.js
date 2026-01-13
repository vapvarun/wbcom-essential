/**
 * Team Carousel Block - Editor Component
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
	RangeControl,
	ToggleControl,
	ColorPalette,
	SelectControl,
	Button,
	Placeholder,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		members,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		spaceBetween,
		showNavigation,
		showPagination,
		loop,
		autoplay,
		autoplayDelay,
		cardBackground,
		cardBorderRadius,
		nameColor,
		roleColor,
		navColor,
		cardPadding,
		cardBoxShadow,
		imageBorderRadius,
		nameFontSize,
		roleFontSize,
		imageAspectRatio,
		imageOverlayColor,
		imageOverlayHoverColor,
		cardHoverScale,
		cardHoverShadow,
		cardBorderWidth,
		cardBorderColor,
		dotsColor,
		dotsActiveColor,
		dotsSize,
		arrowColor,
		arrowBgColor,
		arrowSize,
		arrowBorderRadius,
	} = attributes;

	const wrapperClasses = [
		'wbcom-essential-team-carousel',
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		className: wrapperClasses,
	} );

	/**
	 * Update a specific member's property.
	 */
	const updateMember = ( index, key, value ) => {
		const newMembers = [ ...members ];
		newMembers[ index ] = { ...newMembers[ index ], [ key ]: value };
		setAttributes( { members: newMembers } );
	};

	/**
	 * Add a new member.
	 */
	const addMember = () => {
		const newId = members.length > 0
			? Math.max( ...members.map( m => m.id ) ) + 1
			: 1;
		setAttributes( {
			members: [
				...members,
				{
					id: newId,
					imageId: 0,
					imageUrl: '',
					name: __( 'New Member', 'wbcom-essential' ),
					role: __( 'Role', 'wbcom-essential' ),
					linkUrl: '',
				},
			],
		} );
	};

	/**
	 * Remove a member.
	 */
	const removeMember = ( index ) => {
		const newMembers = members.filter( ( _, i ) => i !== index );
		setAttributes( { members: newMembers } );
	};

	const cardStyle = {
		borderRadius: `${ cardBorderRadius }px`,
		padding: `${ cardPadding }px`,
		boxShadow: cardBoxShadow ? '0 4px 15px rgba(0, 0, 0, 0.08)' : 'none',
		...( ! useThemeColors && {
			backgroundColor: cardBackground,
		} ),
	};

	const imageStyle = {
		borderRadius: `${ imageBorderRadius }px`,
		aspectRatio: imageAspectRatio,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Team Members', 'wbcom-essential' ) }>
					{ members.map( ( member, index ) => (
						<div key={ member.id } className="wbcom-member-panel">
							<div className="wbcom-member-panel-header">
								<strong>{ member.name || `#${ index + 1 }` }</strong>
								<Button
									isDestructive
									isSmall
									onClick={ () => removeMember( index ) }
								>
									{ __( 'Remove', 'wbcom-essential' ) }
								</Button>
							</div>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => {
										// Update both imageId and imageUrl in a single call to avoid state race condition.
										const newMembers = [ ...members ];
										newMembers[ index ] = {
											...newMembers[ index ],
											imageId: media.id,
											imageUrl: media.url,
										};
										setAttributes( { members: newMembers } );
									} }
									allowedTypes={ [ 'image' ] }
									value={ member.imageId }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											variant="secondary"
											className="wbcom-member-image-btn"
										>
											{ member.imageUrl ? (
												<img
													src={ member.imageUrl }
													alt={ member.name }
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
								value={ member.name }
								onChange={ ( value ) =>
									updateMember( index, 'name', value )
								}
							/>
							<TextControl
								label={ __( 'Role', 'wbcom-essential' ) }
								value={ member.role }
								onChange={ ( value ) =>
									updateMember( index, 'role', value )
								}
							/>
							<TextControl
								label={ __( 'Link URL', 'wbcom-essential' ) }
								value={ member.linkUrl }
								onChange={ ( value ) =>
									updateMember( index, 'linkUrl', value )
								}
								type="url"
							/>
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addMember }>
						{ __( 'Add Member', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				<PanelBody
					title={ __( 'Carousel Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slides Per View (Desktop)', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( value ) =>
							setAttributes( { slidesPerView: value } )
						}
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Slides Per View (Tablet)', 'wbcom-essential' ) }
						value={ slidesPerViewTablet }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewTablet: value } )
						}
						min={ 1 }
						max={ 4 }
					/>
					<RangeControl
						label={ __( 'Slides Per View (Mobile)', 'wbcom-essential' ) }
						value={ slidesPerViewMobile }
						onChange={ ( value ) =>
							setAttributes( { slidesPerViewMobile: value } )
						}
						min={ 1 }
						max={ 2 }
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
					title={ __( 'Colors', 'wbcom-essential' ) }
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
				</PanelBody>

				<PanelBody
					title={ __( 'Card Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Card Background', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ cardBackground }
								onChange={ ( value ) =>
									setAttributes( { cardBackground: value } )
								}
							/>
						</>
					) }
					<RangeControl
						label={ __( 'Card Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { cardBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Card Padding', 'wbcom-essential' ) }
						value={ cardPadding }
						onChange={ ( value ) =>
							setAttributes( { cardPadding: value } )
						}
						min={ 0 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Card Border Width', 'wbcom-essential' ) }
						value={ cardBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { cardBorderWidth: value } )
						}
						min={ 0 }
						max={ 10 }
					/>
					{ cardBorderWidth > 0 && ! useThemeColors && (
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
						label={ __( 'Card Box Shadow', 'wbcom-essential' ) }
						checked={ cardBoxShadow }
						onChange={ ( value ) =>
							setAttributes( { cardBoxShadow: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Hover Effects', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Hover Scale', 'wbcom-essential' ) }
						value={ cardHoverScale }
						onChange={ ( value ) =>
							setAttributes( { cardHoverScale: value } )
						}
						min={ 1 }
						max={ 1.2 }
						step={ 0.01 }
					/>
					<TextControl
						label={ __( 'Hover Shadow', 'wbcom-essential' ) }
						value={ cardHoverShadow }
						onChange={ ( value ) =>
							setAttributes( { cardHoverShadow: value } )
						}
						help={ __( 'CSS box-shadow value (e.g., 0 10px 30px rgba(0, 0, 0, 0.15))', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Image Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Image Border Radius', 'wbcom-essential' ) }
						value={ imageBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { imageBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Image Aspect Ratio', 'wbcom-essential' ) }
						value={ imageAspectRatio }
						options={ [
							{ label: __( 'Square (1:1)', 'wbcom-essential' ), value: '1/1' },
							{ label: __( 'Portrait (3:4)', 'wbcom-essential' ), value: '3/4' },
							{ label: __( 'Landscape (4:3)', 'wbcom-essential' ), value: '4/3' },
							{ label: __( 'Wide (16:9)', 'wbcom-essential' ), value: '16/9' },
						] }
						onChange={ ( value ) =>
							setAttributes( { imageAspectRatio: value } )
						}
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Image Overlay Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ imageOverlayColor }
								onChange={ ( value ) =>
									setAttributes( { imageOverlayColor: value } )
								}
							/>
							<p className="components-base-control__label">
								{ __( 'Image Overlay Hover Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ imageOverlayHoverColor }
								onChange={ ( value ) =>
									setAttributes( { imageOverlayHoverColor: value } )
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
						label={ __( 'Name Font Size', 'wbcom-essential' ) }
						value={ nameFontSize }
						onChange={ ( value ) =>
							setAttributes( { nameFontSize: value } )
						}
						min={ 12 }
						max={ 32 }
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Name Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ nameColor }
								onChange={ ( value ) =>
									setAttributes( { nameColor: value } )
								}
							/>
						</>
					) }
					<RangeControl
						label={ __( 'Role Font Size', 'wbcom-essential' ) }
						value={ roleFontSize }
						onChange={ ( value ) =>
							setAttributes( { roleFontSize: value } )
						}
						min={ 10 }
						max={ 24 }
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Role Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ roleColor }
								onChange={ ( value ) =>
									setAttributes( { roleColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Navigation Arrows', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Arrow Size', 'wbcom-essential' ) }
						value={ arrowSize }
						onChange={ ( value ) =>
							setAttributes( { arrowSize: value } )
						}
						min={ 20 }
						max={ 80 }
					/>
					<RangeControl
						label={ __( 'Arrow Border Radius (%)', 'wbcom-essential' ) }
						value={ arrowBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { arrowBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Arrow Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ arrowColor }
								onChange={ ( value ) =>
									setAttributes( { arrowColor: value } )
								}
							/>
							<p className="components-base-control__label">
								{ __( 'Arrow Background Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ arrowBgColor }
								onChange={ ( value ) =>
									setAttributes( { arrowBgColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Pagination Dots', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Dot Size', 'wbcom-essential' ) }
						value={ dotsSize }
						onChange={ ( value ) =>
							setAttributes( { dotsSize: value } )
						}
						min={ 5 }
						max={ 20 }
					/>
					{ ! useThemeColors && (
						<>
							<p className="components-base-control__label">
								{ __( 'Dot Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ dotsColor }
								onChange={ ( value ) =>
									setAttributes( { dotsColor: value } )
								}
							/>
							<p className="components-base-control__label">
								{ __( 'Active Dot Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ dotsActiveColor }
								onChange={ ( value ) =>
									setAttributes( { dotsActiveColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ members.length === 0 ? (
					<Placeholder
						icon="groups"
						label={ __( 'Team Carousel', 'wbcom-essential' ) }
						instructions={ __(
							'Add team members in the sidebar.',
							'wbcom-essential'
						) }
					>
						<Button variant="primary" onClick={ addMember }>
							{ __( 'Add Member', 'wbcom-essential' ) }
						</Button>
					</Placeholder>
				) : (
					<div className="wbcom-team-carousel-preview">
						{ members.slice( 0, slidesPerView ).map( ( member ) => (
							<div
								key={ member.id }
								className="wbcom-team-member-card"
								style={ cardStyle }
							>
								<div className="wbcom-team-member-image" style={ imageStyle }>
									{ member.imageUrl ? (
										<img
											src={ member.imageUrl }
											alt={ member.name }
											style={ { borderRadius: `${ imageBorderRadius }px` } }
										/>
									) : (
										<div className="wbcom-team-member-placeholder" style={ { borderRadius: `${ imageBorderRadius }px` } }>
											<span className="dashicons dashicons-admin-users"></span>
										</div>
									) }
								</div>
								<div className="wbcom-team-member-info">
									<h4
										className="wbcom-team-member-name"
										style={ {
											fontSize: `${ nameFontSize }px`,
											...( ! useThemeColors && { color: nameColor } ),
										} }
									>
										{ member.name }
									</h4>
									<p
										className="wbcom-team-member-role"
										style={ {
											fontSize: `${ roleFontSize }px`,
											...( ! useThemeColors && { color: roleColor } ),
										} }
									>
										{ member.role }
									</p>
								</div>
							</div>
						) ) }
					</div>
				) }
				{ members.length > slidesPerView && (
					<p className="wbcom-team-carousel-hint">
						{ __( '+', 'wbcom-essential' ) }{ ' ' }
						{ members.length - slidesPerView }{ ' ' }
						{ __( 'more members (carousel preview limited)', 'wbcom-essential' ) }
					</p>
				) }
			</div>
		</>
	);
}
