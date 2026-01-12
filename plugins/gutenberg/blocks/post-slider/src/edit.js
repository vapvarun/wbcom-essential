/**
 * Post Slider Block - Edit Component
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
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
	Button,
	Placeholder,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import { ColorControl } from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		postType,
		categories,
		tags,
		numberOfPosts,
		orderBy,
		order,
		includeIds,
		excludeIds,
		showExcerpt,
		excerptLength,
		showDate,
		showButton,
		buttonText,
		titleTag,
		sliderHeight,
		sliderHeightUnit,
		transition,
		transitionDuration,
		autoplay,
		autoplayDelay,
		showNavigation,
		showPagination,
		hideNavOnHover,
		bgAnimation,
		bgAnimationDuration,
		textAnimation,
		overlayColor,
		contentWidth,
		contentAlign,
		verticalAlign,
		titleColor,
		excerptColor,
		dateColor,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonHoverTextColor,
		buttonBorderRadius,
		navColor,
		bgPosition,
		bgSize,
		showDivider,
		dividerColor,
		dividerWidth,
		contentPadding,
		defaultImageId,
		defaultImageUrl,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-post-slider-editor${ useThemeColors ? ' use-theme-colors' : '' }`,
	} );

	// Initialize Swiper in editor preview
	useEffect( () => {
		// Wait for ServerSideRender to complete and DOM to be ready
		const initializeSwiper = () => {
			const sliders = document.querySelectorAll( '.wbcom-essential-post-slider' );
			
			sliders.forEach( function ( slider ) {
				const swiperContainer = slider.querySelector( '.swiper' );
				if ( ! swiperContainer ) {
					return;
				}

				// Parse configuration from data attribute.
				let config;
				try {
					config = JSON.parse(
						slider.getAttribute( 'data-swiper-config' ) || '{}'
					);
				} catch ( e ) {
					config = {};
				}

				// Build Swiper options.
				const options = {
					effect: config.effect || 'fade',
					speed: config.speed || 500,
					loop: config.loop !== false,
				};

				// Add fade effect options.
				if ( config.effect === 'fade' ) {
					options.fadeEffect = config.fadeEffect || { crossFade: true };
				}

				// Add navigation if enabled.
				if ( config.navigation ) {
					options.navigation = {
						prevEl: slider.querySelector( '.swiper-button-prev' ),
						nextEl: slider.querySelector( '.swiper-button-next' ),
					};
				}

				// Add pagination if enabled.
				if ( config.pagination ) {
					options.pagination = {
						el: slider.querySelector( '.swiper-pagination' ),
						clickable: true,
					};
				}

				// Add autoplay if enabled.
				if ( config.autoplay && config.autoplay.delay ) {
					options.autoplay = {
						delay: config.autoplay.delay,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					};
				}

				// Initialize Swiper - require it to be enqueued by the block.
				if ( typeof Swiper !== 'undefined' ) {
					new Swiper( swiperContainer, options );
				}
			} );
		};

		// Initial attempt
		setTimeout( initializeSwiper, 1000 );
		
		// Also observe for changes
		const observer = new MutationObserver( () => {
			setTimeout( initializeSwiper, 500 );
		} );
		
		// Start observing the block element
		const blockElement = document.querySelector( '.block-editor-block-preview__content' );
		if ( blockElement ) {
			observer.observe( blockElement, {
				childList: true,
				subtree: true,
			} );
		}

		return () => {
			observer.disconnect();
		};
	}, [ attributes ] ); // Re-initialize when attributes change

	// Fetch post types.
	const postTypes = useSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );
		const types = getPostTypes( { per_page: -1 } );
		if ( ! types ) {
			return [];
		}
		return types
			.filter( ( type ) => type.viewable && type.rest_base )
			.map( ( type ) => ( {
				label: type.labels.singular_name,
				value: type.slug,
			} ) );
	}, [] );

	// Fetch categories.
	const categoryOptions = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		const cats = getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
			hide_empty: false,
		} );
		if ( ! cats ) {
			return [];
		}
		return cats.map( ( cat ) => ( {
			label: cat.name,
			value: cat.slug,
		} ) );
	}, [] );

	// Fetch tags.
	const tagOptions = useSelect( ( select ) => {
		const { getEntityRecords } = select( 'core' );
		const postTags = getEntityRecords( 'taxonomy', 'post_tag', {
			per_page: -1,
			hide_empty: false,
		} );
		if ( ! postTags ) {
			return [];
		}
		return postTags.map( ( tag ) => ( {
			label: tag.name,
			value: tag.slug,
		} ) );
	}, [] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Post Type', 'wbcom-essential' ) }
						value={ postType }
						options={ postTypes }
						onChange={ ( value ) =>
							setAttributes( { postType: value } )
						}
					/>
					{ postType === 'post' && categoryOptions.length > 0 && (
						<SelectControl
							multiple
							label={ __( 'Categories', 'wbcom-essential' ) }
							value={ categories }
							options={ categoryOptions }
							onChange={ ( value ) =>
								setAttributes( { categories: value } )
							}
							help={ __(
								'Leave empty to show all categories.',
								'wbcom-essential'
							) }
						/>
					) }
					{ postType === 'post' && tagOptions.length > 0 && (
						<SelectControl
							multiple
							label={ __( 'Tags', 'wbcom-essential' ) }
							value={ tags }
							options={ tagOptions }
							onChange={ ( value ) =>
								setAttributes( { tags: value } )
							}
							help={ __(
								'Leave empty to show all tags.',
								'wbcom-essential'
							) }
						/>
					) }
					<RangeControl
						label={ __( 'Number of Posts', 'wbcom-essential' ) }
						value={ numberOfPosts }
						onChange={ ( value ) =>
							setAttributes( { numberOfPosts: value } )
						}
						min={ 1 }
						max={ 20 }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{
								label: __( 'Date', 'wbcom-essential' ),
								value: 'date',
							},
							{
								label: __( 'Title', 'wbcom-essential' ),
								value: 'title',
							},
							{
								label: __( 'Random', 'wbcom-essential' ),
								value: 'rand',
							},
							{
								label: __( 'Comment Count', 'wbcom-essential' ),
								value: 'comment_count',
							},
							{
								label: __( 'Menu Order', 'wbcom-essential' ),
								value: 'menu_order',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
					/>
					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{
								label: __( 'Descending', 'wbcom-essential' ),
								value: 'DESC',
							},
							{
								label: __( 'Ascending', 'wbcom-essential' ),
								value: 'ASC',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
					/>
					<TextControl
						label={ __( 'Include Posts by ID', 'wbcom-essential' ) }
						value={ includeIds }
						onChange={ ( value ) =>
							setAttributes( { includeIds: value } )
						}
						help={ __(
							'Comma-separated post IDs to include.',
							'wbcom-essential'
						) }
					/>
					<TextControl
						label={ __( 'Exclude Posts by ID', 'wbcom-essential' ) }
						value={ excludeIds }
						onChange={ ( value ) =>
							setAttributes( { excludeIds: value } )
						}
						help={ __(
							'Comma-separated post IDs to exclude.',
							'wbcom-essential'
						) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Content Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Date', 'wbcom-essential' ) }
						checked={ showDate }
						onChange={ ( value ) =>
							setAttributes( { showDate: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( value ) =>
							setAttributes( { showExcerpt: value } )
						}
					/>
					{ showExcerpt && (
						<RangeControl
							label={ __( 'Excerpt Length', 'wbcom-essential' ) }
							value={ excerptLength }
							onChange={ ( value ) =>
								setAttributes( { excerptLength: value } )
							}
							min={ 0 }
							max={ 500 }
							help={ __(
								'Set to 0 to hide excerpt.',
								'wbcom-essential'
							) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Button', 'wbcom-essential' ) }
						checked={ showButton }
						onChange={ ( value ) =>
							setAttributes( { showButton: value } )
						}
					/>
					{ showButton && (
						<TextControl
							label={ __( 'Button Text', 'wbcom-essential' ) }
							value={ buttonText }
							onChange={ ( value ) =>
								setAttributes( { buttonText: value } )
							}
						/>
					) }
					<SelectControl
						label={ __( 'Title HTML Tag', 'wbcom-essential' ) }
						value={ titleTag }
						options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'DIV', value: 'div' },
							{ label: 'P', value: 'p' },
						] }
						onChange={ ( value ) =>
							setAttributes( { titleTag: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Divider', 'wbcom-essential' ) }
						checked={ showDivider }
						onChange={ ( value ) =>
							setAttributes( { showDivider: value } )
						}
					/>
					{ showDivider && (
						<>
							{ ! useThemeColors && (
								<ColorControl
									label={ __(
										'Divider Color',
										'wbcom-essential'
									) }
									value={ dividerColor }
									onChange={ ( value ) =>
										setAttributes( { dividerColor: value } )
									}
								/>
							) }
							<RangeControl
								label={ __(
									'Divider Width (px)',
									'wbcom-essential'
								) }
								value={ dividerWidth }
								onChange={ ( value ) =>
									setAttributes( { dividerWidth: value } )
								}
								min={ 20 }
								max={ 300 }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Layout Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Content Max Width (px)',
							'wbcom-essential'
						) }
						value={ contentWidth }
						onChange={ ( value ) =>
							setAttributes( { contentWidth: value } )
						}
						min={ 400 }
						max={ 1400 }
					/>
					<RangeControl
						label={ __( 'Content Padding (px)', 'wbcom-essential' ) }
						value={ contentPadding }
						onChange={ ( value ) =>
							setAttributes( { contentPadding: value } )
						}
						min={ 10 }
						max={ 100 }
					/>
					<SelectControl
						label={ __(
							'Horizontal Alignment',
							'wbcom-essential'
						) }
						value={ contentAlign }
						options={ [
							{
								label: __( 'Left', 'wbcom-essential' ),
								value: 'left',
							},
							{
								label: __( 'Center', 'wbcom-essential' ),
								value: 'center',
							},
							{
								label: __( 'Right', 'wbcom-essential' ),
								value: 'right',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { contentAlign: value } )
						}
					/>
					<SelectControl
						label={ __( 'Vertical Alignment', 'wbcom-essential' ) }
						value={ verticalAlign }
						options={ [
							{
								label: __( 'Top', 'wbcom-essential' ),
								value: 'top',
							},
							{
								label: __( 'Center', 'wbcom-essential' ),
								value: 'center',
							},
							{
								label: __( 'Bottom', 'wbcom-essential' ),
								value: 'bottom',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { verticalAlign: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Slider Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slider Height', 'wbcom-essential' ) }
						value={ sliderHeight }
						onChange={ ( value ) =>
							setAttributes( { sliderHeight: value } )
						}
						min={ sliderHeightUnit === 'vh' ? 30 : 300 }
						max={ sliderHeightUnit === 'vh' ? 100 : 1000 }
					/>
					<SelectControl
						label={ __( 'Height Unit', 'wbcom-essential' ) }
						value={ sliderHeightUnit }
						options={ [
							{ label: 'px', value: 'px' },
							{ label: 'vh', value: 'vh' },
						] }
						onChange={ ( value ) =>
							setAttributes( { sliderHeightUnit: value } )
						}
					/>
					<SelectControl
						label={ __( 'Transition Effect', 'wbcom-essential' ) }
						value={ transition }
						options={ [
							{
								label: __( 'Fade', 'wbcom-essential' ),
								value: 'fade',
							},
							{
								label: __( 'Slide', 'wbcom-essential' ),
								value: 'slide',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { transition: value } )
						}
					/>
					<RangeControl
						label={ __(
							'Transition Duration (ms)',
							'wbcom-essential'
						) }
						value={ transitionDuration }
						onChange={ ( value ) =>
							setAttributes( { transitionDuration: value } )
						}
						min={ 100 }
						max={ 2000 }
						step={ 100 }
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
							label={ __(
								'Autoplay Delay (ms)',
								'wbcom-essential'
							) }
							value={ autoplayDelay }
							onChange={ ( value ) =>
								setAttributes( { autoplayDelay: value } )
							}
							min={ 2000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
					<MediaUploadCheck>
						<div style={ { marginBottom: '16px' } }>
							<p style={ { marginBottom: '8px' } }>
								{ __( 'Default Image', 'wbcom-essential' ) }
							</p>
							{ defaultImageUrl ? (
								<div>
									<img
										src={ defaultImageUrl }
										alt={ __(
											'Default slide image',
											'wbcom-essential'
										) }
										style={ {
											maxWidth: '100%',
											marginBottom: '8px',
										} }
									/>
									<Button
										isSecondary
										onClick={ () =>
											setAttributes( {
												defaultImageId: 0,
												defaultImageUrl: '',
											} )
										}
									>
										{ __(
											'Remove Image',
											'wbcom-essential'
										) }
									</Button>
								</div>
							) : (
								<MediaUpload
									onSelect={ ( media ) =>
										setAttributes( {
											defaultImageId: media.id,
											defaultImageUrl: media.url,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ defaultImageId }
									render={ ( { open } ) => (
										<Button isSecondary onClick={ open }>
											{ __(
												'Select Default Image',
												'wbcom-essential'
											) }
										</Button>
									) }
								/>
							) }
							<p
								style={ {
									fontSize: '12px',
									color: '#757575',
									marginTop: '4px',
								} }
							>
								{ __(
									'Used for posts without featured images.',
									'wbcom-essential'
								) }
							</p>
						</div>
					</MediaUploadCheck>
				</PanelBody>

				<PanelBody
					title={ __( 'Background Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Background Position', 'wbcom-essential' ) }
						value={ bgPosition }
						options={ [
							{
								label: __( 'Top Left', 'wbcom-essential' ),
								value: 'top left',
							},
							{
								label: __( 'Top Center', 'wbcom-essential' ),
								value: 'top center',
							},
							{
								label: __( 'Top Right', 'wbcom-essential' ),
								value: 'top right',
							},
							{
								label: __( 'Center Left', 'wbcom-essential' ),
								value: 'center left',
							},
							{
								label: __( 'Center Center', 'wbcom-essential' ),
								value: 'center center',
							},
							{
								label: __( 'Center Right', 'wbcom-essential' ),
								value: 'center right',
							},
							{
								label: __( 'Bottom Left', 'wbcom-essential' ),
								value: 'bottom left',
							},
							{
								label: __( 'Bottom Center', 'wbcom-essential' ),
								value: 'bottom center',
							},
							{
								label: __( 'Bottom Right', 'wbcom-essential' ),
								value: 'bottom right',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { bgPosition: value } )
						}
					/>
					<SelectControl
						label={ __( 'Background Size', 'wbcom-essential' ) }
						value={ bgSize }
						options={ [
							{
								label: __( 'Cover', 'wbcom-essential' ),
								value: 'cover',
							},
							{
								label: __( 'Contain', 'wbcom-essential' ),
								value: 'contain',
							},
							{
								label: __( 'Auto', 'wbcom-essential' ),
								value: 'auto',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { bgSize: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Navigation', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __(
							'Show Navigation Arrows',
							'wbcom-essential'
						) }
						checked={ showNavigation }
						onChange={ ( value ) =>
							setAttributes( { showNavigation: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Pagination Dots', 'wbcom-essential' ) }
						checked={ showPagination }
						onChange={ ( value ) =>
							setAttributes( { showPagination: value } )
						}
					/>
					<ToggleControl
						label={ __(
							'Show Nav Only on Hover',
							'wbcom-essential'
						) }
						checked={ hideNavOnHover }
						onChange={ ( value ) =>
							setAttributes( { hideNavOnHover: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Animations', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Background Animation', 'wbcom-essential' ) }
						value={ bgAnimation }
						options={ [
							{
								label: __( 'None', 'wbcom-essential' ),
								value: 'none',
							},
							{
								label: __( 'Zoom', 'wbcom-essential' ),
								value: 'zoom',
							},
							{
								label: __( 'Zoom Top', 'wbcom-essential' ),
								value: 'zoom-top',
							},
							{
								label: __( 'Zoom Bottom', 'wbcom-essential' ),
								value: 'zoom-bottom',
							},
							{
								label: __( 'Zoom Left', 'wbcom-essential' ),
								value: 'zoom-left',
							},
							{
								label: __( 'Zoom Right', 'wbcom-essential' ),
								value: 'zoom-right',
							},
							{
								label: __( 'Zoom Top Left', 'wbcom-essential' ),
								value: 'zoom-top-left',
							},
							{
								label: __(
									'Zoom Top Right',
									'wbcom-essential'
								),
								value: 'zoom-top-right',
							},
							{
								label: __(
									'Zoom Bottom Left',
									'wbcom-essential'
								),
								value: 'zoom-bottom-left',
							},
							{
								label: __(
									'Zoom Bottom Right',
									'wbcom-essential'
								),
								value: 'zoom-bottom-right',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { bgAnimation: value } )
						}
					/>
					{ bgAnimation !== 'none' && (
						<RangeControl
							label={ __(
								'Animation Duration (s)',
								'wbcom-essential'
							) }
							value={ bgAnimationDuration }
							onChange={ ( value ) =>
								setAttributes( { bgAnimationDuration: value } )
							}
							min={ 1 }
							max={ 20 }
						/>
					) }
					<SelectControl
						label={ __( 'Text Animation', 'wbcom-essential' ) }
						value={ textAnimation }
						options={ [
							{
								label: __( 'None', 'wbcom-essential' ),
								value: 'none',
							},
							{
								label: __( 'Fade In', 'wbcom-essential' ),
								value: 'fadeIn',
							},
							{
								label: __( 'Fade In Up', 'wbcom-essential' ),
								value: 'fadeInUp',
							},
							{
								label: __( 'Fade In Down', 'wbcom-essential' ),
								value: 'fadeInDown',
							},
							{
								label: __( 'Fade In Left', 'wbcom-essential' ),
								value: 'fadeInLeft',
							},
							{
								label: __( 'Fade In Right', 'wbcom-essential' ),
								value: 'fadeInRight',
							},
							{
								label: __( 'Zoom In', 'wbcom-essential' ),
								value: 'zoomIn',
							},
							{
								label: __( 'Slide Up', 'wbcom-essential' ),
								value: 'slideUp',
							},
							{
								label: __( 'Slide Down', 'wbcom-essential' ),
								value: 'slideDown',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { textAnimation: value } )
						}
					/>
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
					{ ! useThemeColors && (
						<>
							<ColorControl
								label={ __( 'Overlay Color', 'wbcom-essential' ) }
								value={ overlayColor }
								onChange={ ( value ) =>
									setAttributes( { overlayColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Title Color', 'wbcom-essential' ) }
								value={ titleColor }
								onChange={ ( value ) =>
									setAttributes( { titleColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Excerpt Color', 'wbcom-essential' ) }
								value={ excerptColor }
								onChange={ ( value ) =>
									setAttributes( { excerptColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Date Color', 'wbcom-essential' ) }
								value={ dateColor }
								onChange={ ( value ) =>
									setAttributes( { dateColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Navigation Color', 'wbcom-essential' ) }
								value={ navColor }
								onChange={ ( value ) =>
									setAttributes( { navColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Button Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ ! useThemeColors && (
						<>
							<ColorControl
								label={ __( 'Button Background', 'wbcom-essential' ) }
								value={ buttonBgColor }
								onChange={ ( value ) =>
									setAttributes( { buttonBgColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Button Text Color', 'wbcom-essential' ) }
								value={ buttonTextColor }
								onChange={ ( value ) =>
									setAttributes( { buttonTextColor: value } )
								}
							/>
							<ColorControl
								label={ __(
									'Button Hover Background',
									'wbcom-essential'
								) }
								value={ buttonHoverBgColor }
								onChange={ ( value ) =>
									setAttributes( { buttonHoverBgColor: value } )
								}
							/>
							<ColorControl
								label={ __(
									'Button Hover Text Color',
									'wbcom-essential'
								) }
								value={ buttonHoverTextColor }
								onChange={ ( value ) =>
									setAttributes( { buttonHoverTextColor: value } )
								}
							/>
						</>
					) }
					<RangeControl
						label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
						value={ buttonBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { buttonBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/post-slider"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
