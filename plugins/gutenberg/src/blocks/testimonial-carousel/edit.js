/**
 * Testimonial Carousel Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ToggleControl,
	TextControl,
	TextareaControl,
	ColorPicker,
	RangeControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

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
		testimonials,
		slidesPerView,
		autoplay,
		autoplayDelay,
		showDots,
		showArrows,
		loop,
		quoteBg,
		quoteColor,
		nameColor,
		roleColor,
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

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );
	const [ previewIndex, setPreviewIndex ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-testimonial-carousel`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const cardRadius = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '12px';

	const cardShadow = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tc-quote-bg: ${ quoteBg };`,
		`  --wbe-tc-quote-color: ${ quoteColor };`,
		`  --wbe-tc-name-color: ${ nameColor };`,
		`  --wbe-tc-role-color: ${ roleColor };`,
		`  --wbe-tc-accent: ${ accentColor };`,
		`  --wbe-tc-card-radius: ${ cardRadius };`,
		`  --wbe-tc-card-shadow: ${ cardShadow };`,
		`}`,
	].join( '\n' );

	const addTestimonial = () => {
		const newItems = [
			...testimonials,
			{
				quote: __( 'Add your testimonial quote here.', 'wbcom-essential' ),
				name: __( 'Customer Name', 'wbcom-essential' ),
				role: __( 'Job Title, Company', 'wbcom-essential' ),
				avatar: '',
			},
		];
		setAttributes( { testimonials: newItems } );
		setSelectedIndex( newItems.length - 1 );
	};

	const removeTestimonial = ( index ) => {
		const newItems = testimonials.filter( ( _, i ) => i !== index );
		setAttributes( { testimonials: newItems } );
		setSelectedIndex( Math.max( 0, index - 1 ) );
	};

	const updateTestimonial = ( index, field, value ) => {
		const newItems = testimonials.map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { testimonials: newItems } );
	};

	const currentItem = testimonials[ previewIndex ] || testimonials[ 0 ];

	return (
		<>
			<InspectorControls>
				{ /* Content: testimonial list */ }
				<PanelBody
					title={ __( 'Testimonials', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<div className="wbe-tc-items-list">
						{ testimonials.map( ( item, index ) => (
							<div
								key={ index }
								className={ `wbe-tc-item-row${ selectedIndex === index ? ' is-selected' : '' }` }
								role="button"
								tabIndex={ 0 }
								onClick={ () => {
									setSelectedIndex( index );
									setPreviewIndex( index );
								} }
								onKeyDown={ ( e ) => {
									if ( e.key === 'Enter' || e.key === ' ' ) {
										e.preventDefault();
										setSelectedIndex( index );
										setPreviewIndex( index );
									}
								} }
							>
								<span className="wbe-tc-item-name">
									{ item.name || __( 'Unnamed', 'wbcom-essential' ) }
								</span>
								<Button
									icon="trash"
									label={ __( 'Remove', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ ( e ) => {
										e.stopPropagation();
										removeTestimonial( index );
									} }
								/>
							</div>
						) ) }
					</div>
					<Spacer marginTop={ 2 } />
					<Button variant="secondary" onClick={ addTestimonial }>
						{ __( '+ Add Testimonial', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ testimonials[ selectedIndex ] && (
					<PanelBody
						title={ __( 'Edit Selected Testimonial', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						<TextareaControl
							label={ __( 'Quote', 'wbcom-essential' ) }
							value={ testimonials[ selectedIndex ].quote }
							onChange={ ( val ) => updateTestimonial( selectedIndex, 'quote', val ) }
							rows={ 4 }
						/>
						<TextControl
							label={ __( 'Name', 'wbcom-essential' ) }
							value={ testimonials[ selectedIndex ].name }
							onChange={ ( val ) => updateTestimonial( selectedIndex, 'name', val ) }
						/>
						<TextControl
							label={ __( 'Role / Company', 'wbcom-essential' ) }
							value={ testimonials[ selectedIndex ].role }
							onChange={ ( val ) => updateTestimonial( selectedIndex, 'role', val ) }
						/>
						<TextControl
							label={ __( 'Avatar URL', 'wbcom-essential' ) }
							value={ testimonials[ selectedIndex ].avatar }
							onChange={ ( val ) => updateTestimonial( selectedIndex, 'avatar', val ) }
							type="url"
							help={ __( 'Optional: URL to avatar image.', 'wbcom-essential' ) }
						/>
					</PanelBody>
				) }

				{ /* Layout */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Slides Per View (desktop)', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( val ) => setAttributes( { slidesPerView: val } ) }
						min={ 1 }
						max={ 3 }
						step={ 1 }
					/>
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
					<ToggleControl
						label={ __( 'Show Navigation Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( val ) => setAttributes( { showDots: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Prev/Next Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( val ) => setAttributes( { showArrows: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Loop Infinitely', 'wbcom-essential' ) }
						checked={ loop }
						onChange={ ( val ) => setAttributes( { loop: val } ) }
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
						color={ quoteBg }
						onChange={ ( val ) => setAttributes( { quoteBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Quote Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ quoteColor }
						onChange={ ( val ) => setAttributes( { quoteColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Name Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ nameColor }
						onChange={ ( val ) => setAttributes( { nameColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Role Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ roleColor }
						onChange={ ( val ) => setAttributes( { roleColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Accent Color (dots, decorations)', 'wbcom-essential' ) }</strong></p>
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

			<div { ...blockProps }>
				{ css && <style>{ css }</style> }
				<style>{ tokenCss }</style>

				{ /* Editor preview: static card with navigation dots */ }
				<div className="wbe-testimonial-carousel__editor-preview">
					{ currentItem && (
						<div className="wbe-testimonial-carousel__card">
							<blockquote className="wbe-testimonial-carousel__quote">
								<p>{ currentItem.quote }</p>
							</blockquote>
							<div className="wbe-testimonial-carousel__author">
								{ currentItem.avatar && (
									<img
										src={ currentItem.avatar }
										alt={ currentItem.name }
										className="wbe-testimonial-carousel__avatar"
										width="48"
										height="48"
									/>
								) }
								{ ! currentItem.avatar && (
									<div
										className="wbe-testimonial-carousel__avatar-placeholder"
										aria-hidden="true"
									>
										{ ( currentItem.name || 'A' ).charAt( 0 ).toUpperCase() }
									</div>
								) }
								<div className="wbe-testimonial-carousel__author-info">
									<strong className="wbe-testimonial-carousel__name">
										{ currentItem.name }
									</strong>
									<span className="wbe-testimonial-carousel__role">
										{ currentItem.role }
									</span>
								</div>
							</div>
						</div>
					) }

					{ /* Editor navigation dots */ }
					{ testimonials.length > 1 && (
						<div className="wbe-testimonial-carousel__editor-dots" role="tablist">
							{ testimonials.map( ( _, idx ) => (
								<button
									key={ idx }
									type="button"
									role="tab"
									aria-selected={ idx === previewIndex }
									aria-label={ `${ __( 'View testimonial', 'wbcom-essential' ) } ${ idx + 1 }` }
									className={ `wbe-testimonial-carousel__dot${ idx === previewIndex ? ' is-active' : '' }` }
									onClick={ () => {
										setPreviewIndex( idx );
										setSelectedIndex( idx );
									} }
								/>
							) ) }
						</div>
					) }
				</div>
			</div>
		</>
	);
}
