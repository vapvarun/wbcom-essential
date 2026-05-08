/**
 * Post Carousel Block - Editor Component
 *
 * Uses ServerSideRender for live preview since this is a dynamic block.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	RangeControl,
	ColorPicker,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';
import { useSelect } from '@wordpress/data';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		postType,
		postsPerPage,
		categories,
		orderBy,
		order,
		displayMode,
		slidesPerView,
		autoplay,
		autoplayDelay,
		showImage,
		showExcerpt,
		showDate,
		showCategory,
		showAuthor,
		excerptLength,
		imageRatio,
		cardBg,
		titleColor,
		excerptColor,
		metaColor,
		accentColor,
		padding,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		margin,
		marginTablet,
		marginMobile,
		marginUnit,
		boxShadow,
		shadowHorizontal,
		shadowVertical,
		shadowBlur,
		shadowSpread,
		shadowColor,
		borderRadius,
		borderRadiusUnit,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
	} = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );
	const blockCSS = generateBlockCSS( uniqueId, attributes );

	// Fetch available post types.
	const postTypes = useSelect( ( select ) => {
		const types = select( 'core' ).getPostTypes( { per_page: -1 } );
		if ( ! types ) {
			return [ { label: __( 'Post', 'wbcom-essential' ), value: 'post' } ];
		}
		return types
			.filter( ( t ) => t.viewable && t.slug !== 'attachment' )
			.map( ( t ) => ( { label: t.name, value: t.slug } ) );
	}, [] );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-post-carousel-editor`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content: Query Settings */ }
				<PanelBody
					title={ __( 'Query Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Post Type', 'wbcom-essential' ) }
						value={ postType }
						options={ postTypes }
						onChange={ ( val ) => setAttributes( { postType: val } ) }
					/>
					<RangeControl
						label={ __( 'Posts Per Page', 'wbcom-essential' ) }
						value={ postsPerPage }
						onChange={ ( val ) => setAttributes( { postsPerPage: val } ) }
						min={ 1 }
						max={ 24 }
						step={ 1 }
					/>
					<SelectControl
						label={ __( 'Order By', 'wbcom-essential' ) }
						value={ orderBy }
						options={ [
							{ label: __( 'Date', 'wbcom-essential' ), value: 'date' },
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Modified', 'wbcom-essential' ), value: 'modified' },
							{ label: __( 'Menu Order', 'wbcom-essential' ), value: 'menu_order' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'rand' },
							{ label: __( 'Comment Count', 'wbcom-essential' ), value: 'comment_count' },
						] }
						onChange={ ( val ) => setAttributes( { orderBy: val } ) }
					/>
					<SelectControl
						label={ __( 'Order', 'wbcom-essential' ) }
						value={ order }
						options={ [
							{ label: __( 'Descending (newest first)', 'wbcom-essential' ), value: 'DESC' },
							{ label: __( 'Ascending (oldest first)', 'wbcom-essential' ), value: 'ASC' },
						] }
						onChange={ ( val ) => setAttributes( { order: val } ) }
					/>
				</PanelBody>

				{ /* Layout: Display Mode */ }
				<PanelBody
					title={ __( 'Display Mode', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Display Mode', 'wbcom-essential' ) }
						value={ displayMode }
						options={ [
							{ label: __( 'Carousel (Swiper)', 'wbcom-essential' ), value: 'carousel' },
							{ label: __( 'Slider (full-width, 1-at-a-time)', 'wbcom-essential' ), value: 'slider' },
							{ label: __( 'Grid (CSS Grid, no JS)', 'wbcom-essential' ), value: 'grid' },
						] }
						onChange={ ( val ) => setAttributes( { displayMode: val } ) }
					/>

					{ ( displayMode === 'carousel' || displayMode === 'slider' ) && (
						<>
							{ displayMode === 'carousel' && (
								<RangeControl
									label={ __( 'Slides Per View (desktop)', 'wbcom-essential' ) }
									value={ slidesPerView }
									onChange={ ( val ) => setAttributes( { slidesPerView: val } ) }
									min={ 1 }
									max={ 4 }
									step={ 1 }
								/>
							) }
							<ToggleControl
								label={ __( 'Autoplay', 'wbcom-essential' ) }
								checked={ autoplay }
								onChange={ ( val ) => setAttributes( { autoplay: val } ) }
								__nextHasNoMarginBottom
							/>
							{ autoplay && (
								<RangeControl
									label={ __( 'Autoplay Delay (ms)', 'wbcom-essential' ) }
									value={ autoplayDelay }
									onChange={ ( val ) => setAttributes( { autoplayDelay: val } ) }
									min={ 1000 }
									max={ 10000 }
									step={ 500 }
								/>
							) }
						</>
					) }
				</PanelBody>

				{ /* Card Settings */ }
				<PanelBody
					title={ __( 'Card Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Featured Image', 'wbcom-essential' ) }
						checked={ showImage }
						onChange={ ( val ) => setAttributes( { showImage: val } ) }
						__nextHasNoMarginBottom
					/>
					{ showImage && (
						<SelectControl
							label={ __( 'Image Ratio', 'wbcom-essential' ) }
							value={ imageRatio }
							options={ [
								{ label: __( '16:9', 'wbcom-essential' ), value: '16/9' },
								{ label: __( '4:3', 'wbcom-essential' ), value: '4/3' },
								{ label: __( '3:2', 'wbcom-essential' ), value: '3/2' },
								{ label: __( '1:1 (Square)', 'wbcom-essential' ), value: '1/1' },
								{ label: __( '21:9 (Cinematic)', 'wbcom-essential' ), value: '21/9' },
							] }
							onChange={ ( val ) => setAttributes( { imageRatio: val } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Category Badge', 'wbcom-essential' ) }
						checked={ showCategory }
						onChange={ ( val ) => setAttributes( { showCategory: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( val ) => setAttributes( { showExcerpt: val } ) }
						__nextHasNoMarginBottom
					/>
					{ showExcerpt && (
						<RangeControl
							label={ __( 'Excerpt Word Length', 'wbcom-essential' ) }
							value={ excerptLength }
							onChange={ ( val ) => setAttributes( { excerptLength: val } ) }
							min={ 5 }
							max={ 80 }
							step={ 5 }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Date', 'wbcom-essential' ) }
						checked={ showDate }
						onChange={ ( val ) => setAttributes( { showDate: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Author', 'wbcom-essential' ) }
						checked={ showAuthor }
						onChange={ ( val ) => setAttributes( { showAuthor: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Card Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ cardBg }
						onChange={ ( val ) => setAttributes( { cardBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Title Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ titleColor }
						onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Excerpt Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ excerptColor }
						onChange={ ( val ) => setAttributes( { excerptColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Meta Color (date, author)', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ metaColor }
						onChange={ ( val ) => setAttributes( { metaColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Accent Color (category, links)', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ accentColor }
						onChange={ ( val ) => setAttributes( { accentColor: val } ) }
						enableAlpha
					/>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody
					title={ __( 'Spacing', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
						onUnitChange={ ( val ) => setAttributes( { paddingUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
						onUnitChange={ ( val ) => setAttributes( { marginUnit: val } ) }
					/>
				</PanelBody>

				{ /* Advanced */ }
				<PanelBody
					title={ __( 'Advanced', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/post-carousel"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-post-carousel__loading">
							<p>{ __( 'Loading posts…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-post-carousel__error">
							<p>{ __( 'Could not load posts preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
