/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	TextControl,
	ToggleControl,
	RangeControl,
	ColorPicker,
	BaseControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * @param {Object} props Props.
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		postType,
		order,
		orderby,
		taxonomy,
		tags,
		authors,
		maxPosts,
		includePosts,
		excludePosts,
		excerptLength,
		displayOnlyThumbnail,
		displayThumbnail,
		displayCategory,
		displayDate,
		displayAuthorName,
		displayAuthorAvatar,
		displayAuthorUrl,
		columns,
		displayNav,
		displayDots,
		infinite,
		autoplay,
		autoplayDuration,
		adaptiveHeight,
		navArrowColor,
		navArrowBgColor,
		navArrowHoverColor,
		navArrowBgHoverColor,
		navDotsColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: useThemeColors ? 'use-theme-colors' : '',
	} );

	// Get post types
	const postTypes = useSelect( ( select ) => {
		const postTypesData = select( 'core' ).getEntityRecords( 'root', 'postType', { per_page: -1 } );
		return postTypesData ? postTypesData.map( ( type ) => ( {
			label: type.name,
			value: type.slug,
		} ) ) : [];
	}, [] );

	// Get categories
	const categories = useSelect( ( select ) => {
		const cats = select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } );
		return cats ? cats.map( ( cat ) => ( {
			label: cat.name,
			value: cat.id,
		} ) ) : [];
	}, [] );

	// Get tags
	const tagList = useSelect( ( select ) => {
		const tagsData = select( 'core' ).getEntityRecords( 'taxonomy', 'post_tag', { per_page: -1 } );
		return tagsData ? tagsData.map( ( tag ) => ( {
			label: tag.name,
			value: tag.id,
		} ) ) : [];
	}, [] );

	// Get authors
	const authorList = useSelect( ( select ) => {
		const users = select( 'core' ).getEntityRecords( 'root', 'user', { per_page: -1 } );
		return users ? users.map( ( user ) => ( {
			label: user.name,
			value: user.id,
		} ) ) : [];
	}, [] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Posts', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Post Type', 'wbcom-essential' ) }
						value={ postType }
						options={ postTypes }
						onChange={ ( value ) => setAttributes( { postType: value } ) }
					/>

					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'wbcom-essential' ), value: 'DESC' },
							{ label: __( 'Ascending', 'wbcom-essential' ), value: 'ASC' },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>

					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderby }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'post_date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comment Count', 'wbcom-essential' ), value: 'comment_count' },
						] }
						onChange={ ( value ) => setAttributes( { orderby: value } ) }
					/>

					<SelectControl
						label={ __( 'Categories', 'wbcom-essential' ) }
						value={ taxonomy }
						options={ categories }
						multiple
						onChange={ ( value ) => setAttributes( { taxonomy: value } ) }
					/>

					<SelectControl
						label={ __( 'Tags', 'wbcom-essential' ) }
						value={ tags }
						options={ tagList }
						multiple
						onChange={ ( value ) => setAttributes( { tags: value } ) }
					/>

					<SelectControl
						label={ __( 'Authors', 'wbcom-essential' ) }
						value={ authors }
						options={ authorList }
						multiple
						onChange={ ( value ) => setAttributes( { authors: value } ) }
					/>

					<RangeControl
						label={ __( 'Maximum number of posts', 'wbcom-essential' ) }
						value={ maxPosts }
						onChange={ ( value ) => setAttributes( { maxPosts: value } ) }
						min={ 1 }
						max={ 99 }
					/>

					<TextControl
						label={ __( 'Include posts by ID', 'wbcom-essential' ) }
						help={ __( 'To include multiple posts, add comma between IDs.', 'wbcom-essential' ) }
						value={ includePosts }
						onChange={ ( value ) => setAttributes( { includePosts: value } ) }
					/>

					<TextControl
						label={ __( 'Exclude posts by ID', 'wbcom-essential' ) }
						help={ __( 'To exclude multiple posts, add comma between IDs.', 'wbcom-essential' ) }
						value={ excludePosts }
						onChange={ ( value ) => setAttributes( { excludePosts: value } ) }
					/>

					<RangeControl
						label={ __( 'Excerpt length', 'wbcom-essential' ) }
						help={ __( 'To remove excerpt, enter "0"', 'wbcom-essential' ) }
						value={ excerptLength }
						onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
						min={ 0 }
						max={ 1000 }
					/>

					<ToggleControl
						label={ __( 'Display only posts with thumbnail', 'wbcom-essential' ) }
						checked={ displayOnlyThumbnail }
						onChange={ ( value ) => setAttributes( { displayOnlyThumbnail: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display post thumbnail', 'wbcom-essential' ) }
						checked={ displayThumbnail }
						onChange={ ( value ) => setAttributes( { displayThumbnail: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display categories', 'wbcom-essential' ) }
						checked={ displayCategory }
						onChange={ ( value ) => setAttributes( { displayCategory: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display date', 'wbcom-essential' ) }
						checked={ displayDate }
						onChange={ ( value ) => setAttributes( { displayDate: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display author name', 'wbcom-essential' ) }
						checked={ displayAuthorName }
						onChange={ ( value ) => setAttributes( { displayAuthorName: value } ) }
					/>

					{ displayAuthorName && (
						<ToggleControl
							label={ __( 'Display author avatar', 'wbcom-essential' ) }
							checked={ displayAuthorAvatar }
							onChange={ ( value ) => setAttributes( { displayAuthorAvatar: value } ) }
						/>
					) }

					{ displayAuthorName && (
						<ToggleControl
							label={ __( 'Enable author url', 'wbcom-essential' ) }
							checked={ displayAuthorUrl }
							onChange={ ( value ) => setAttributes( { displayAuthorUrl: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Carousel Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						options={ [
							{ label: __( '1 Column', 'wbcom-essential' ), value: 'one' },
							{ label: __( '2 Column', 'wbcom-essential' ), value: 'two' },
							{ label: __( '3 Column', 'wbcom-essential' ), value: 'three' },
							{ label: __( '4 Column', 'wbcom-essential' ), value: 'four' },
							{ label: __( '5 Column', 'wbcom-essential' ), value: 'five' },
						] }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display Navigation Arrows', 'wbcom-essential' ) }
						checked={ displayNav }
						onChange={ ( value ) => setAttributes( { displayNav: value } ) }
					/>

					<ToggleControl
						label={ __( 'Display Navigation Dots', 'wbcom-essential' ) }
						checked={ displayDots }
						onChange={ ( value ) => setAttributes( { displayDots: value } ) }
					/>

					<ToggleControl
						label={ __( 'Infinite Loop', 'wbcom-essential' ) }
						checked={ infinite }
						onChange={ ( value ) => setAttributes( { infinite: value } ) }
					/>

					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						help={ __( 'Infinite should be on.', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
					/>

					<RangeControl
						label={ __( 'Autoplay Duration (Second)', 'wbcom-essential' ) }
						value={ autoplayDuration }
						onChange={ ( value ) => setAttributes( { autoplayDuration: value } ) }
						min={ 1 }
						max={ 120 }
					/>

					<ToggleControl
						label={ __( 'Adaptive Height', 'wbcom-essential' ) }
						checked={ adaptiveHeight }
						onChange={ ( value ) => setAttributes( { adaptiveHeight: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Style Settings', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>

					<SelectControl
						label={ __( 'Image Hover Effect', 'wbcom-essential' ) }
						value={ attributes.cardImgHoverEffect || 'zoom' }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoom' },
							{ label: __( 'Zoom Out', 'wbcom-essential' ), value: 'zoom-out' },
							{ label: __( 'Slide', 'wbcom-essential' ), value: 'slide' },
							{ label: __( 'Rotate', 'wbcom-essential' ), value: 'rotate' },
						] }
						onChange={ ( value ) => setAttributes( { cardImgHoverEffect: value } ) }
					/>

					{ ! useThemeColors && (
						<>
							<hr />

							<BaseControl
								label={ __( 'Card Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the background color for post cards', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardBgColor || '' }
									onChange={ ( color ) => setAttributes( { cardBgColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Card Hover Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover background color for post cards', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardHoverBgColor || '' }
									onChange={ ( color ) => setAttributes( { cardHoverBgColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Category Badge Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the background color for category badges', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardBadgeBgColor || '' }
									onChange={ ( color ) => setAttributes( { cardBadgeBgColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Category Badge Hover Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover background color for category badges', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardBadgeHoverBgColor || '' }
									onChange={ ( color ) => setAttributes( { cardBadgeHoverBgColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Category Badge Text Color', 'wbcom-essential' ) }
								help={ __( 'Set the text color for category badges', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardBadgeColor || '' }
									onChange={ ( color ) => setAttributes( { cardBadgeColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Footer Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the background color for card footer section', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardFooterBgColor || '' }
									onChange={ ( color ) => setAttributes( { cardFooterBgColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Category Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for post categories', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardCategoryColor || '' }
									onChange={ ( color ) => setAttributes( { cardCategoryColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Category Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover color for post categories', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardCategoryHoverColor || '' }
									onChange={ ( color ) => setAttributes( { cardCategoryHoverColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Title Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for post titles', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardTitleColor || '' }
									onChange={ ( color ) => setAttributes( { cardTitleColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Title Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover color for post titles', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardTitleHoverColor || '' }
									onChange={ ( color ) => setAttributes( { cardTitleHoverColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Excerpt Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for post excerpts', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardExcerptColor || '' }
									onChange={ ( color ) => setAttributes( { cardExcerptColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Author Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for post authors', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardAuthorColor || '' }
									onChange={ ( color ) => setAttributes( { cardAuthorColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Author Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover color for post authors', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardAuthorHoverColor || '' }
									onChange={ ( color ) => setAttributes( { cardAuthorHoverColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Date Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for post dates', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardDateColor || '' }
									onChange={ ( color ) => setAttributes( { cardDateColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Date Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover color for post dates', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ attributes.cardDateHoverColor || '' }
									onChange={ ( color ) => setAttributes( { cardDateHoverColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Navigation Arrow Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for carousel navigation arrows', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ navArrowColor }
									onChange={ ( color ) => setAttributes( { navArrowColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Navigation Arrow Background Color', 'wbcom-essential' ) }
								help={ __( 'Set the background color for carousel navigation arrows', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ navArrowBgColor }
									onChange={ ( color ) => setAttributes( { navArrowBgColor: color } ) }
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Navigation Arrow Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover color for carousel navigation arrows', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ navArrowHoverColor }
									onChange={ ( color ) => setAttributes( { navArrowHoverColor: color } ) }
									enableAlpha
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Navigation Arrow Background Hover Color', 'wbcom-essential' ) }
								help={ __( 'Set the hover background color for carousel navigation arrows', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ navArrowBgHoverColor }
									onChange={ ( color ) => setAttributes( { navArrowBgHoverColor: color } ) }
								/>
							</BaseControl>

							<BaseControl
								label={ __( 'Navigation Dots Active Color', 'wbcom-essential' ) }
								help={ __( 'Set the color for carousel navigation dots', 'wbcom-essential' ) }
							>
								<ColorPicker
									color={ navDotsColor }
									onChange={ ( color ) => setAttributes( { navDotsColor: color } ) }
								/>
							</BaseControl>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-post-carousel-placeholder">
					<h3>{ __( 'Post Carousel', 'wbcom-essential' ) }</h3>
					<p>{ __( 'Configure the carousel settings in the sidebar.', 'wbcom-essential' ) }</p>
				</div>
			</div>
		</>
	);
}