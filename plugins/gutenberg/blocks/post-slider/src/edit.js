/**
 * Post Slider Block - Edit Component
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
	__experimentalUnitControl as UnitControl,
	ButtonGroup,
	Button,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { ColorControl } from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		postType,
		categories,
		numberOfPosts,
		orderBy,
		order,
		showExcerpt,
		excerptLength,
		showDate,
		showButton,
		buttonText,
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
		titleColor,
		excerptColor,
		dateColor,
		buttonBgColor,
		buttonTextColor,
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
					<RangeControl
						label={ __( 'Number of Posts', 'wbcom-essential' ) }
						value={ numberOfPosts }
						onChange={ ( value ) =>
							setAttributes( { numberOfPosts: value } )
						}
						min={ 1 }
						max={ 10 }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comment Count', 'wbcom-essential' ), value: 'comment_count' },
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
					<RangeControl
						label={ __( 'Content Max Width (px)', 'wbcom-essential' ) }
						value={ contentWidth }
						onChange={ ( value ) =>
							setAttributes( { contentWidth: value } )
						}
						min={ 400 }
						max={ 1200 }
					/>
					<SelectControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ contentAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) =>
							setAttributes( { contentAlign: value } )
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
							{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
							{ label: __( 'Slide', 'wbcom-essential' ), value: 'slide' },
						] }
						onChange={ ( value ) =>
							setAttributes( { transition: value } )
						}
					/>
					<RangeControl
						label={ __( 'Transition Duration (ms)', 'wbcom-essential' ) }
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
							label={ __( 'Autoplay Delay (ms)', 'wbcom-essential' ) }
							value={ autoplayDelay }
							onChange={ ( value ) =>
								setAttributes( { autoplayDelay: value } )
							}
							min={ 2000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Navigation', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Navigation Arrows', 'wbcom-essential' ) }
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
						label={ __( 'Show Nav Only on Hover', 'wbcom-essential' ) }
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
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Zoom', 'wbcom-essential' ), value: 'zoom' },
							{ label: __( 'Zoom Top', 'wbcom-essential' ), value: 'zoom-top' },
							{ label: __( 'Zoom Bottom', 'wbcom-essential' ), value: 'zoom-bottom' },
							{ label: __( 'Zoom Left', 'wbcom-essential' ), value: 'zoom-left' },
							{ label: __( 'Zoom Right', 'wbcom-essential' ), value: 'zoom-right' },
						] }
						onChange={ ( value ) =>
							setAttributes( { bgAnimation: value } )
						}
					/>
					{ bgAnimation !== 'none' && (
						<RangeControl
							label={ __( 'Animation Duration (s)', 'wbcom-essential' ) }
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
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Fade In', 'wbcom-essential' ), value: 'fadeIn' },
							{ label: __( 'Fade In Up', 'wbcom-essential' ), value: 'fadeInUp' },
							{ label: __( 'Fade In Down', 'wbcom-essential' ), value: 'fadeInDown' },
							{ label: __( 'Fade In Left', 'wbcom-essential' ), value: 'fadeInLeft' },
							{ label: __( 'Fade In Right', 'wbcom-essential' ), value: 'fadeInRight' },
							{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoomIn' },
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
					block="wbcom-essential/post-slider"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
