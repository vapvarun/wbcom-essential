/**
 * Timeline Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	SelectControl,
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
		items,
		layout,
		lineColor,
		dotColor,
		dotSize,
		cardBg,
		dateColor,
		titleColor,
		descriptionColor,
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

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-timeline wbe-timeline--${ layout }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const cardBorderRadius = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '8px';

	const cardShadow = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tl-line-color: ${ lineColor };`,
		`  --wbe-tl-dot-color: ${ dotColor };`,
		`  --wbe-tl-dot-size: ${ dotSize }px;`,
		`  --wbe-tl-card-bg: ${ cardBg };`,
		`  --wbe-tl-date-color: ${ dateColor };`,
		`  --wbe-tl-title-color: ${ titleColor };`,
		`  --wbe-tl-desc-color: ${ descriptionColor };`,
		`  --wbe-tl-card-radius: ${ cardBorderRadius };`,
		`  --wbe-tl-card-shadow: ${ cardShadow };`,
		`}`,
	].join( '\n' );

	const addItem = () => {
		const newItems = [
			...items,
			{
				date: String( new Date().getFullYear() ),
				title: __( 'New Milestone', 'wbcom-essential' ),
				description: __( 'Describe what happened.', 'wbcom-essential' ),
				icon: '⭐',
			},
		];
		setAttributes( { items: newItems } );
		setSelectedIndex( newItems.length - 1 );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( { items: newItems } );
		setSelectedIndex( Math.max( 0, index - 1 ) );
	};

	const updateItem = ( index, field, value ) => {
		const newItems = items.map( ( item, i ) =>
			i === index ? { ...item, [ field ]: value } : item
		);
		setAttributes( { items: newItems } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content: item list */ }
				<PanelBody
					title={ __( 'Timeline Items', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<div className="wbe-tl-items-list">
						{ items.map( ( item, index ) => (
							<div
								key={ index }
								className={ `wbe-tl-item-row${ selectedIndex === index ? ' is-selected' : '' }` }
								role="button"
								tabIndex={ 0 }
								onClick={ () => setSelectedIndex( index ) }
								onKeyDown={ ( e ) => {
									if ( e.key === 'Enter' || e.key === ' ' ) {
										e.preventDefault();
										setSelectedIndex( index );
									}
								} }
							>
								<span className="wbe-tl-item-icon" aria-hidden="true">
									{ item.icon || '●' }
								</span>
								<span className="wbe-tl-item-title">
									{ item.title || __( 'Untitled', 'wbcom-essential' ) }
								</span>
								<Button
									icon="trash"
									label={ __( 'Remove item', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ ( e ) => {
										e.stopPropagation();
										removeItem( index );
									} }
								/>
							</div>
						) ) }
					</div>
					<Spacer marginTop={ 2 } />
					<Button variant="secondary" onClick={ addItem }>
						{ __( '+ Add Timeline Item', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ items[ selectedIndex ] && (
					<PanelBody
						title={ __( 'Edit Selected Item', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Date / Year', 'wbcom-essential' ) }
							value={ items[ selectedIndex ].date }
							onChange={ ( val ) => updateItem( selectedIndex, 'date', val ) }
						/>
						<TextControl
							label={ __( 'Icon / Emoji', 'wbcom-essential' ) }
							value={ items[ selectedIndex ].icon }
							onChange={ ( val ) => updateItem( selectedIndex, 'icon', val ) }
						/>
						<TextControl
							label={ __( 'Title', 'wbcom-essential' ) }
							value={ items[ selectedIndex ].title }
							onChange={ ( val ) => updateItem( selectedIndex, 'title', val ) }
						/>
						<TextareaControl
							label={ __( 'Description', 'wbcom-essential' ) }
							value={ items[ selectedIndex ].description }
							onChange={ ( val ) => updateItem( selectedIndex, 'description', val ) }
							rows={ 3 }
						/>
					</PanelBody>
				) }

				{ /* Layout */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Timeline Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Alternating (left & right)', 'wbcom-essential' ), value: 'alternating' },
							{ label: __( 'Left (all on right of line)', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Right (all on left of line)', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
					/>
					<RangeControl
						label={ __( 'Dot Size (px)', 'wbcom-essential' ) }
						value={ dotSize }
						onChange={ ( val ) => setAttributes( { dotSize: val } ) }
						min={ 24 }
						max={ 72 }
						step={ 4 }
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Line Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ lineColor }
						onChange={ ( val ) => setAttributes( { lineColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Dot Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ dotColor }
						onChange={ ( val ) => setAttributes( { dotColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Card Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ cardBg }
						onChange={ ( val ) => setAttributes( { cardBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Date Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ dateColor }
						onChange={ ( val ) => setAttributes( { dateColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Title Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ titleColor }
						onChange={ ( val ) => setAttributes( { titleColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Description Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ descriptionColor }
						onChange={ ( val ) => setAttributes( { descriptionColor: val } ) }
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

				<div className="wbe-timeline__track">
					{ items.map( ( item, index ) => (
						<div
							key={ index }
							className={ `wbe-timeline__item wbe-timeline__item--${ index + 1 }` }
						>
							<div
								className="wbe-timeline__dot"
								aria-hidden="true"
							>
								<span className="wbe-timeline__dot-icon">
									{ item.icon || '●' }
								</span>
							</div>
							<div className="wbe-timeline__card">
								<time className="wbe-timeline__date">
									{ item.date }
								</time>
								<h3 className="wbe-timeline__title">
									{ item.title }
								</h3>
								<p className="wbe-timeline__description">
									{ item.description }
								</p>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
