/**
 * Posts Revolution Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		layout,
		columns,
		showExcerpt,
		excerptLength,
		showAuthor,
		showDate,
		showCategory,
		dateFormat,
		postType,
		postsPerPage,
		orderBy,
		order,
		categoryColor,
		categoryHoverColor,
		titleColor,
		titleHoverColor,
		excerptColor,
		metaColor,
		imageRadius,
		gap,
		enablePagination,
		paginationType,
		paginationAlignment,
	} = attributes;

	// Fetch post types.
	const postTypeOptions = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) return [];
		return types
			.filter( ( type ) => type.viewable && type.rest_base )
			.map( ( type ) => ( {
				label: type.labels.singular_name,
				value: type.slug,
			} ) );
	}, [] );

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-posts-revolution-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Layout Style', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Featured + Sidebar', 'wbcom-essential' ), value: 'featured-sidebar' },
							{ label: __( 'Featured + List', 'wbcom-essential' ), value: 'featured-list' },
							{ label: __( 'Grid', 'wbcom-essential' ), value: 'grid' },
							{ label: __( 'Split (50/50)', 'wbcom-essential' ), value: 'split' },
							{ label: __( 'Two Featured + List', 'wbcom-essential' ), value: 'two-featured' },
							{ label: __( 'Magazine', 'wbcom-essential' ), value: 'magazine' },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>
					{ layout === 'grid' && (
						<RangeControl
							label={ __( 'Columns', 'wbcom-essential' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 1 }
							max={ 4 }
						/>
					) }
					<RangeControl
						label={ __( 'Gap', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Image Border Radius', 'wbcom-essential' ) }
						value={ imageRadius }
						onChange={ ( value ) => setAttributes( { imageRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Content Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Category', 'wbcom-essential' ) }
						checked={ showCategory }
						onChange={ ( value ) => setAttributes( { showCategory: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
					/>
					{ showExcerpt && (
						<RangeControl
							label={ __( 'Excerpt Length', 'wbcom-essential' ) }
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: value } ) }
							min={ 20 }
							max={ 300 }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Author', 'wbcom-essential' ) }
						checked={ showAuthor }
						onChange={ ( value ) => setAttributes( { showAuthor: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Date', 'wbcom-essential' ) }
						checked={ showDate }
						onChange={ ( value ) => setAttributes( { showDate: value } ) }
					/>
					{ showDate && (
						<SelectControl
							label={ __( 'Date Format', 'wbcom-essential' ) }
							value={ dateFormat }
							options={ [
								{ label: 'Nov 6, 2024', value: 'M j, Y' },
								{ label: 'November 6, 2024', value: 'F j, Y' },
								{ label: '2024/11/06', value: 'Y/m/d' },
								{ label: 'Nov 6, 2024 12:50 am', value: 'M j, Y g:i a' },
							] }
							onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Query Settings', 'wbcom-essential' ) } initialOpen={ false }>
					{ postTypeOptions.length > 0 && (
						<SelectControl
							label={ __( 'Post Type', 'wbcom-essential' ) }
							value={ postType }
							options={ postTypeOptions }
							onChange={ ( value ) => setAttributes( { postType: value } ) }
						/>
					) }
					<RangeControl
						label={ __( 'Number of Posts', 'wbcom-essential' ) }
						value={ postsPerPage }
						onChange={ ( value ) => setAttributes( { postsPerPage: value } ) }
						min={ 1 }
						max={ 20 }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Modified', 'wbcom-essential' ), value: 'modified' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comment Count', 'wbcom-essential' ), value: 'comment_count' },
						] }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
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
					<Divider />
					<ToggleControl
						label={ __( 'Enable Pagination', 'wbcom-essential' ) }
						checked={ enablePagination }
						onChange={ ( value ) => setAttributes( { enablePagination: value } ) }
						help={ enablePagination ? __( 'Pagination allows users to navigate through posts.', 'wbcom-essential' ) : '' }
					/>
					{ enablePagination && (
						<>
							<SelectControl
								label={ __( 'Pagination Type', 'wbcom-essential' ) }
								value={ paginationType }
								options={ [
									{ label: __( 'Numbers', 'wbcom-essential' ), value: 'numbers' },
									{ label: __( 'Previous/Next', 'wbcom-essential' ), value: 'prev-next' },
								] }
								onChange={ ( value ) => setAttributes( { paginationType: value } ) }
							/>
							<SelectControl
								label={ __( 'Pagination Alignment', 'wbcom-essential' ) }
								value={ paginationAlignment }
								options={ [
									{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
									{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
									{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
								] }
								onChange={ ( value ) => setAttributes( { paginationAlignment: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Category Color', 'wbcom-essential' ) }
						value={ categoryColor }
						onChange={ ( value ) => setAttributes( { categoryColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Category Hover', 'wbcom-essential' ) }
						value={ categoryHoverColor }
						onChange={ ( value ) => setAttributes( { categoryHoverColor: value } ) }
					/>
					<Divider />
					<ColorControl
						label={ __( 'Title Color', 'wbcom-essential' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Title Hover', 'wbcom-essential' ) }
						value={ titleHoverColor }
						onChange={ ( value ) => setAttributes( { titleHoverColor: value } ) }
					/>
					<Divider />
					<ColorControl
						label={ __( 'Excerpt Color', 'wbcom-essential' ) }
						value={ excerptColor }
						onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Meta Color', 'wbcom-essential' ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/posts-revolution"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
