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
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		displayType,
		columns,
		showExcerpt,
		excerptLength,
		dateFormat,
		querySource,
		customPostType,
		categories,
		stickyPosts,
		postsPerPage,
		orderBy,
		order,
		enablePagination,
		paginationType,
		enableAnimation,
		animationType,
		animationDelay,
		enableCustomStyle,
		mainColor,
		hoverColor,
	} = attributes;

	// Fetch post types.
	const postTypeOptions = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) return [];
		return types
			.filter( ( type ) => ! type.viewable === false && type.rest_base && ! [ 'attachment', 'wp_block', 'wp_template', 'wp_template_part', 'wp_navigation' ].includes( type.slug ) )
			.map( ( type ) => ( {
				label: type.labels.singular_name,
				value: type.slug,
			} ) );
	}, [] );

	// Fetch categories.
	const categoryOptions = useSelect( ( select ) => {
		const cats = select( 'core' ).getEntityRecords( 'taxonomy', 'category', { per_page: -1 } );
		if ( ! cats ) return [];
		return cats.map( ( cat ) => ( {
			label: cat.name,
			value: cat.slug,
		} ) );
	}, [] );

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-posts-revolution-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Post Display', 'wbcom-essential' ) }
						value={ displayType }
						options={ [
							{ label: __( 'Post Display 1 (Featured + Sidebar)', 'wbcom-essential' ), value: 'posts_type1' },
							{ label: __( 'Post Display 2 (Featured + List)', 'wbcom-essential' ), value: 'posts_type2' },
							{ label: __( 'Post Display 3 (Grid)', 'wbcom-essential' ), value: 'posts_type3' },
							{ label: __( 'Post Display 4 (Side by Side)', 'wbcom-essential' ), value: 'posts_type4' },
							{ label: __( 'Post Display 5 (Featured + Text Sidebar)', 'wbcom-essential' ), value: 'posts_type5' },
							{ label: __( 'Post Display 6 (Magazine)', 'wbcom-essential' ), value: 'posts_type6' },
							{ label: __( 'Post Display 7 (Two Featured + List)', 'wbcom-essential' ), value: 'posts_type7' },
						] }
						onChange={ ( value ) => setAttributes( { displayType: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
					/>

					{ showExcerpt && (
						<TextControl
							label={ __( 'Excerpt Length (characters)', 'wbcom-essential' ) }
							type="number"
							value={ excerptLength }
							onChange={ ( value ) => setAttributes( { excerptLength: parseInt( value, 10 ) || 150 } ) }
						/>
					) }

					<SelectControl
						label={ __( 'Date Format', 'wbcom-essential' ) }
						value={ dateFormat }
						options={ [
							{ label: 'November 6, 2010 12:50 am', value: 'F j, Y g:i a' },
							{ label: 'November 6, 2010', value: 'F j, Y' },
							{ label: 'November, 2010', value: 'F, Y' },
							{ label: '12:50 am', value: 'g:i a' },
							{ label: '12:50:48 am', value: 'g:i:s a' },
							{ label: 'Saturday, November 6th, 2010', value: 'l, F jS, Y' },
							{ label: 'Nov 6, 2010 @ 0:50', value: 'M j, Y @ G:i' },
							{ label: '2010/11/06 at 12:50 AM', value: 'Y/m/d \\a\\t g:i A' },
							{ label: '2010/11/06 at 12:50am', value: 'Y/m/d \\a\\t g:ia' },
							{ label: '2010/11/06 12:50:48 AM', value: 'Y/m/d g:i:s A' },
							{ label: '2010/11/06', value: 'Y/m/d' },
						] }
						onChange={ ( value ) => setAttributes( { dateFormat: value } ) }
					/>

					{ displayType === 'posts_type3' && (
						<SelectControl
							label={ __( 'Columns', 'wbcom-essential' ) }
							value={ columns }
							options={ [
								{ label: '1', value: 1 },
								{ label: '2', value: 2 },
								{ label: '3', value: 3 },
							] }
							onChange={ ( value ) => setAttributes( { columns: parseInt( value, 10 ) } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Query', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Source', 'wbcom-essential' ) }
						value={ querySource }
						options={ [
							{ label: __( 'WordPress Posts', 'wbcom-essential' ), value: 'wp_posts' },
							{ label: __( 'Custom Post Type', 'wbcom-essential' ), value: 'wp_custom_posts_type' },
						] }
						onChange={ ( value ) => setAttributes( { querySource: value } ) }
					/>

					{ querySource === 'wp_posts' && (
						<SelectControl
							label={ __( 'All Posts/Sticky Posts', 'wbcom-essential' ) }
							value={ stickyPosts }
							options={ [
								{ label: __( 'All Posts', 'wbcom-essential' ), value: 'allposts' },
								{ label: __( 'Only Sticky Posts', 'wbcom-essential' ), value: 'onlystickyposts' },
							] }
							onChange={ ( value ) => setAttributes( { stickyPosts: value } ) }
						/>
					) }

					{ querySource === 'wp_custom_posts_type' && postTypeOptions.length > 0 && (
						<SelectControl
							label={ __( 'Select Post Type', 'wbcom-essential' ) }
							value={ customPostType }
							options={ [ { label: __( 'Select...', 'wbcom-essential' ), value: '' }, ...postTypeOptions ] }
							onChange={ ( value ) => setAttributes( { customPostType: value } ) }
						/>
					) }

					{ querySource === 'wp_posts' && categoryOptions.length > 0 && (
						<SelectControl
							label={ __( 'Categories', 'wbcom-essential' ) }
							value={ categories }
							options={ categoryOptions }
							multiple
							onChange={ ( value ) => setAttributes( { categories: value } ) }
							help={ __( 'Hold Ctrl/Cmd to select multiple categories', 'wbcom-essential' ) }
						/>
					) }

					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{ label: 'DESC', value: 'DESC' },
							{ label: 'ASC', value: 'ASC' },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>

					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'ID', 'wbcom-essential' ), value: 'ID' },
							{ label: __( 'Author', 'wbcom-essential' ), value: 'author' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Name', 'wbcom-essential' ), value: 'name' },
							{ label: __( 'Modified', 'wbcom-essential' ), value: 'modified' },
							{ label: __( 'Parent', 'wbcom-essential' ), value: 'parent' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comments Count', 'wbcom-essential' ), value: 'comment_count' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( value ) => setAttributes( { orderBy: value } ) }
					/>

					<Divider />

					<ToggleControl
						label={ __( 'Enable Pagination', 'wbcom-essential' ) }
						checked={ enablePagination }
						onChange={ ( value ) => setAttributes( { enablePagination: value } ) }
					/>

					{ ! enablePagination && (
						<TextControl
							label={ __( 'Number of Posts', 'wbcom-essential' ) }
							type="number"
							value={ postsPerPage }
							onChange={ ( value ) => setAttributes( { postsPerPage: parseInt( value, 10 ) || 5 } ) }
						/>
					) }

					{ enablePagination && (
						<>
							<SelectControl
								label={ __( 'Pagination Type', 'wbcom-essential' ) }
								value={ paginationType }
								options={ [
									{ label: __( 'Numeric', 'wbcom-essential' ), value: 'numeric' },
									{ label: __( 'Normal (Prev/Next)', 'wbcom-essential' ), value: 'normal' },
								] }
								onChange={ ( value ) => setAttributes( { paginationType: value } ) }
							/>
							<TextControl
								label={ __( 'Posts Per Page', 'wbcom-essential' ) }
								type="number"
								value={ postsPerPage }
								onChange={ ( value ) => setAttributes( { postsPerPage: parseInt( value, 10 ) || 10 } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Animations', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Enable Animation', 'wbcom-essential' ) }
						checked={ enableAnimation }
						onChange={ ( value ) => setAttributes( { enableAnimation: value } ) }
					/>
					{ enableAnimation && (
						<>
							<SelectControl
								label={ __( 'Animation Effect', 'wbcom-essential' ) }
								value={ animationType }
								options={ [
									{ label: __( 'Fade In', 'wbcom-essential' ), value: 'fade-in' },
									{ label: __( 'Fade In Up', 'wbcom-essential' ), value: 'fade-in-up' },
									{ label: __( 'Fade In Down', 'wbcom-essential' ), value: 'fade-in-down' },
									{ label: __( 'Fade In Left', 'wbcom-essential' ), value: 'fade-in-left' },
									{ label: __( 'Fade In Right', 'wbcom-essential' ), value: 'fade-in-right' },
									{ label: __( 'Fade Out', 'wbcom-essential' ), value: 'fade-out' },
									{ label: __( 'Fade Out Up', 'wbcom-essential' ), value: 'fade-out-up' },
									{ label: __( 'Fade Out Down', 'wbcom-essential' ), value: 'fade-out-down' },
									{ label: __( 'Fade Out Left', 'wbcom-essential' ), value: 'fade-out-left' },
									{ label: __( 'Fade Out Right', 'wbcom-essential' ), value: 'fade-out-right' },
									{ label: __( 'Bounce In', 'wbcom-essential' ), value: 'bounce-in' },
									{ label: __( 'Bounce In Up', 'wbcom-essential' ), value: 'bounce-in-up' },
									{ label: __( 'Bounce In Down', 'wbcom-essential' ), value: 'bounce-in-down' },
									{ label: __( 'Bounce In Left', 'wbcom-essential' ), value: 'bounce-in-left' },
									{ label: __( 'Bounce In Right', 'wbcom-essential' ), value: 'bounce-in-right' },
									{ label: __( 'Bounce Out', 'wbcom-essential' ), value: 'bounce-out' },
									{ label: __( 'Bounce Out Up', 'wbcom-essential' ), value: 'bounce-out-up' },
									{ label: __( 'Bounce Out Down', 'wbcom-essential' ), value: 'bounce-out-down' },
									{ label: __( 'Bounce Out Left', 'wbcom-essential' ), value: 'bounce-out-left' },
									{ label: __( 'Bounce Out Right', 'wbcom-essential' ), value: 'bounce-out-right' },
									{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoom-in' },
									{ label: __( 'Zoom In Up', 'wbcom-essential' ), value: 'zoom-in-up' },
									{ label: __( 'Zoom In Down', 'wbcom-essential' ), value: 'zoom-in-down' },
									{ label: __( 'Zoom In Left', 'wbcom-essential' ), value: 'zoom-in-left' },
									{ label: __( 'Zoom In Right', 'wbcom-essential' ), value: 'zoom-in-right' },
									{ label: __( 'Zoom Out', 'wbcom-essential' ), value: 'zoom-out' },
									{ label: __( 'Zoom Out Up', 'wbcom-essential' ), value: 'zoom-out-up' },
									{ label: __( 'Zoom Out Down', 'wbcom-essential' ), value: 'zoom-out-down' },
									{ label: __( 'Zoom Out Left', 'wbcom-essential' ), value: 'zoom-out-left' },
									{ label: __( 'Zoom Out Right', 'wbcom-essential' ), value: 'zoom-out-right' },
									{ label: __( 'Flash', 'wbcom-essential' ), value: 'flash' },
									{ label: __( 'Strobe', 'wbcom-essential' ), value: 'strobe' },
									{ label: __( 'Shake X', 'wbcom-essential' ), value: 'shake-x' },
									{ label: __( 'Shake Y', 'wbcom-essential' ), value: 'shake-y' },
									{ label: __( 'Bounce', 'wbcom-essential' ), value: 'bounce' },
									{ label: __( 'Tada', 'wbcom-essential' ), value: 'tada' },
									{ label: __( 'Rubber Band', 'wbcom-essential' ), value: 'rubber-band' },
									{ label: __( 'Swing', 'wbcom-essential' ), value: 'swing' },
									{ label: __( 'Spin', 'wbcom-essential' ), value: 'spin' },
									{ label: __( 'Spin Reverse', 'wbcom-essential' ), value: 'spin-reverse' },
									{ label: __( 'Slingshot', 'wbcom-essential' ), value: 'slingshot' },
									{ label: __( 'Slingshot Reverse', 'wbcom-essential' ), value: 'slingshot-reverse' },
									{ label: __( 'Wobble', 'wbcom-essential' ), value: 'wobble' },
									{ label: __( 'Pulse', 'wbcom-essential' ), value: 'pulse' },
									{ label: __( 'Pulsate', 'wbcom-essential' ), value: 'pulsate' },
									{ label: __( 'Heartbeat', 'wbcom-essential' ), value: 'heartbeat' },
									{ label: __( 'Panic', 'wbcom-essential' ), value: 'panic' },
								] }
								onChange={ ( value ) => setAttributes( { animationType: value } ) }
							/>
							<TextControl
								label={ __( 'Animation Delay (ms)', 'wbcom-essential' ) }
								type="number"
								value={ animationDelay }
								onChange={ ( value ) => setAttributes( { animationDelay: parseInt( value, 10 ) || 1000 } ) }
								help={ __( 'Delay in milliseconds before animation starts', 'wbcom-essential' ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Custom Style', 'wbcom-essential' ) }
						checked={ enableCustomStyle }
						onChange={ ( value ) => setAttributes( { enableCustomStyle: value } ) }
					/>
					{ enableCustomStyle && (
						<>
							<ColorControl
								label={ __( 'Main Color', 'wbcom-essential' ) }
								value={ mainColor }
								onChange={ ( value ) => setAttributes( { mainColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Hover Color', 'wbcom-essential' ) }
								value={ hoverColor }
								onChange={ ( value ) => setAttributes( { hoverColor: value } ) }
							/>
						</>
					) }
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
