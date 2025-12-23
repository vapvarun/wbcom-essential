/**
 * Posts Carousel Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { ColorControl } from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		displayType,
		postType,
		categories,
		numberOfPosts,
		orderBy,
		order,
		showExcerpt,
		excerptLength,
		showDate,
		showAuthor,
		showCategory,
		dateFormat,
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
		categoryColor,
		titleColor,
		excerptColor,
		metaColor,
		navColor,
	} = attributes;

	const blockProps = useBlockProps();

	// Fetch post types
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

	// Fetch categories
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

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Display Type', 'wbcom-essential' ) }
						value={ displayType }
						options={ [
							{ label: __( 'Card', 'wbcom-essential' ), value: 'card' },
							{ label: __( 'Overlay', 'wbcom-essential' ), value: 'overlay' },
						] }
						onChange={ ( value ) =>
							setAttributes( { displayType: value } )
						}
					/>
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
								'Select categories to filter posts. Leave empty to show all.',
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
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comment Count', 'wbcom-essential' ), value: 'comment_count' },
							{ label: __( 'Modified', 'wbcom-essential' ), value: 'modified' },
						] }
						onChange={ ( value ) =>
							setAttributes( { orderBy: value } )
						}
					/>
					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{ label: __( 'Descending', 'wbcom-essential' ), value: 'DESC' },
							{ label: __( 'Ascending', 'wbcom-essential' ), value: 'ASC' },
						] }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Content Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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
							min={ 20 }
							max={ 300 }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Date', 'wbcom-essential' ) }
						checked={ showDate }
						onChange={ ( value ) =>
							setAttributes( { showDate: value } )
						}
					/>
					{ showDate && (
						<TextControl
							label={ __( 'Date Format', 'wbcom-essential' ) }
							value={ dateFormat }
							onChange={ ( value ) =>
								setAttributes( { dateFormat: value } )
							}
							help={ __(
								'PHP date format (e.g., F j, Y)',
								'wbcom-essential'
							) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Author', 'wbcom-essential' ) }
						checked={ showAuthor }
						onChange={ ( value ) =>
							setAttributes( { showAuthor: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Category', 'wbcom-essential' ) }
						checked={ showCategory }
						onChange={ ( value ) =>
							setAttributes( { showCategory: value } )
						}
					/>
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
						label={ __( 'Space Between Slides', 'wbcom-essential' ) }
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
					title={ __( 'Style Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Card Background', 'wbcom-essential' ) }
						value={ cardBackground }
						onChange={ ( value ) =>
							setAttributes( { cardBackground: value } )
						}
					/>
					<RangeControl
						label={ __( 'Card Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { cardBorderRadius: value } )
						}
						min={ 0 }
						max={ 30 }
					/>
					<ColorControl
						label={ __( 'Category Color', 'wbcom-essential' ) }
						value={ categoryColor }
						onChange={ ( value ) =>
							setAttributes( { categoryColor: value } )
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
						label={ __( 'Meta Color', 'wbcom-essential' ) }
						value={ metaColor }
						onChange={ ( value ) =>
							setAttributes( { metaColor: value } )
						}
					/>
					<ColorControl
						label={ __( 'Navigation Color', 'wbcom-essential' ) }
						value={ navColor }
						onChange={ ( value ) =>
							setAttributes( { navColor: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/posts-carousel"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
