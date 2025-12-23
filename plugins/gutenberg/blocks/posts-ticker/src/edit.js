/**
 * Posts Ticker Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	SelectControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import ServerSideRender from '@wordpress/server-side-render';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		tickerType,
		tickerLabel,
		showLabel,
		speed,
		pauseOnHover,
		showControls,
		showThumbnail,
		showDate,
		dateFormat,
		postType,
		categories,
		postsPerPage,
		orderBy,
		order,
		labelBgColor,
		labelTextColor,
		tickerBgColor,
		textColor,
		hoverColor,
		borderColor,
		height,
	} = attributes;

	// Fetch categories.
	const categoryOptions = useSelect( ( select ) => {
		const cats = select( 'core' ).getEntityRecords( 'taxonomy', 'category', {
			per_page: -1,
		} );
		if ( ! cats ) return [];
		return cats.map( ( cat ) => ( {
			label: cat.name,
			value: cat.id,
		} ) );
	}, [] );

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
		className: 'wbcom-essential-posts-ticker-editor',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Ticker Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Ticker Type', 'wbcom-essential' ) }
						value={ tickerType }
						options={ [
							{ label: __( 'Horizontal Scroll', 'wbcom-essential' ), value: 'horizontal' },
							{ label: __( 'Vertical Scroll', 'wbcom-essential' ), value: 'vertical' },
							{ label: __( 'Marquee', 'wbcom-essential' ), value: 'marquee' },
							{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
						] }
						onChange={ ( value ) => setAttributes( { tickerType: value } ) }
					/>
					<RangeControl
						label={ __( 'Animation Speed', 'wbcom-essential' ) }
						value={ speed }
						onChange={ ( value ) => setAttributes( { speed: value } ) }
						min={ 10 }
						max={ 200 }
						help={ __( 'Lower is faster', 'wbcom-essential' ) }
					/>
					<ToggleControl
						label={ __( 'Pause on Hover', 'wbcom-essential' ) }
						checked={ pauseOnHover }
						onChange={ ( value ) => setAttributes( { pauseOnHover: value } ) }
					/>
					<RangeControl
						label={ __( 'Ticker Height', 'wbcom-essential' ) }
						value={ height }
						onChange={ ( value ) => setAttributes( { height: value } ) }
						min={ 30 }
						max={ 100 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Label Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Label', 'wbcom-essential' ) }
						checked={ showLabel }
						onChange={ ( value ) => setAttributes( { showLabel: value } ) }
					/>
					{ showLabel && (
						<TextControl
							label={ __( 'Label Text', 'wbcom-essential' ) }
							value={ tickerLabel }
							onChange={ ( value ) => setAttributes( { tickerLabel: value } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Controls', 'wbcom-essential' ) }
						checked={ showControls }
						onChange={ ( value ) => setAttributes( { showControls: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Content Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Thumbnail', 'wbcom-essential' ) }
						checked={ showThumbnail }
						onChange={ ( value ) => setAttributes( { showThumbnail: value } ) }
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
								{ label: '06/11/2024', value: 'd/m/Y' },
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
						max={ 50 }
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
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Label Background', 'wbcom-essential' ) }
						value={ labelBgColor }
						onChange={ ( value ) => setAttributes( { labelBgColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Label Text', 'wbcom-essential' ) }
						value={ labelTextColor }
						onChange={ ( value ) => setAttributes( { labelTextColor: value } ) }
					/>
					<Divider />
					<ColorControl
						label={ __( 'Ticker Background', 'wbcom-essential' ) }
						value={ tickerBgColor }
						onChange={ ( value ) => setAttributes( { tickerBgColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Hover Color', 'wbcom-essential' ) }
						value={ hoverColor }
						onChange={ ( value ) => setAttributes( { hoverColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ borderColor }
						onChange={ ( value ) => setAttributes( { borderColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/posts-ticker"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
