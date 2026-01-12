/**
 * Post Timeline Block - Edit Component
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
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';
import { ColorControl } from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		postType,
		categories,
		numberOfPosts,
		orderBy,
		order,
		showThumbnail,
		showExcerpt,
		excerptLength,
		showButton,
		buttonText,
		layout,
		dateFormat,
		barColor,
		barWidth,
		dotColor,
		dotSize,
		cardBackground,
		cardBorderRadius,
		titleColor,
		excerptColor,
		dateColor,
		buttonBgColor,
		buttonTextColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-post-timeline${ useThemeColors ? ' use-theme-colors' : '' }`,
	} );

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
								'Leave empty for all categories.',
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
						label={ __( 'Show Thumbnail', 'wbcom-essential' ) }
						checked={ showThumbnail }
						onChange={ ( value ) =>
							setAttributes( { showThumbnail: value } )
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
					<TextControl
						label={ __( 'Date Format', 'wbcom-essential' ) }
						value={ dateFormat }
						onChange={ ( value ) =>
							setAttributes( { dateFormat: value } )
						}
						help={ __( 'PHP date format (e.g., M j, Y)', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Layout Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Two Column', 'wbcom-essential' ), value: 'two-column' },
							{ label: __( 'One Column', 'wbcom-essential' ), value: 'one-column' },
						] }
						onChange={ ( value ) =>
							setAttributes( { layout: value } )
						}
					/>
					<RangeControl
						label={ __( 'Bar Width', 'wbcom-essential' ) }
						value={ barWidth }
						onChange={ ( value ) =>
							setAttributes( { barWidth: value } )
						}
						min={ 1 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( 'Dot Size', 'wbcom-essential' ) }
						value={ dotSize }
						onChange={ ( value ) =>
							setAttributes( { dotSize: value } )
						}
						min={ 8 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'Card Border Radius', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { cardBorderRadius: value } )
						}
						min={ 0 }
						max={ 20 }
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
								label={ __( 'Timeline Bar Color', 'wbcom-essential' ) }
								value={ barColor }
								onChange={ ( value ) =>
									setAttributes( { barColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Dot Color', 'wbcom-essential' ) }
								value={ dotColor }
								onChange={ ( value ) =>
									setAttributes( { dotColor: value } )
								}
							/>
							<ColorControl
								label={ __( 'Card Background', 'wbcom-essential' ) }
								value={ cardBackground }
								onChange={ ( value ) =>
									setAttributes( { cardBackground: value } )
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
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/post-timeline"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
