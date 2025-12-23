/**
 * Timeline Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	Button,
	Placeholder,
} from '@wordpress/components';

// Icon mapping for common icons.
const ICONS = {
	star: '★',
	flag: '⚑',
	check: '✓',
	heart: '♥',
	bolt: '⚡',
	rocket: '🚀',
	trophy: '🏆',
	target: '◎',
	clock: '⏰',
	calendar: '📅',
};

export default function Edit( { attributes, setAttributes } ) {
	const {
		items,
		layout,
		showArrow,
		barThickness,
		barColor,
		iconContainerSize,
		iconContainerBackground,
		iconContainerBorderRadius,
		iconSize,
		iconColor,
		contentBackground,
		contentBorderRadius,
		dateColor,
		titleColor,
		textColor,
		contentPadding,
		contentBoxShadow,
		dateFontSize,
		titleFontSize,
		textFontSize,
		itemSpacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-timeline wbcom-timeline-${ layout }`,
	} );

	const updateItem = ( index, key, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = { ...newItems[ index ], [ key ]: value };
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		const newId = items.length > 0 ? Math.max( ...items.map( ( i ) => i.id ) ) + 1 : 1;
		setAttributes( {
			items: [
				...items,
				{
					id: newId,
					icon: 'star',
					imageId: 0,
					imageUrl: '',
					date: __( 'Date', 'wbcom-essential' ),
					titleTag: 'h3',
					title: __( 'New Event', 'wbcom-essential' ),
					content: __( 'Description of this event or milestone.', 'wbcom-essential' ),
					textAlign: 'left',
				},
			],
		} );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( { items: newItems } );
	};

	const iconOptions = Object.keys( ICONS ).map( ( key ) => ( {
		label: `${ ICONS[ key ] } ${ key.charAt( 0 ).toUpperCase() + key.slice( 1 ) }`,
		value: key,
	} ) );

	const iconContainerStyle = {
		width: `${ iconContainerSize }px`,
		height: `${ iconContainerSize }px`,
		backgroundColor: iconContainerBackground,
		borderRadius: `${ iconContainerBorderRadius }%`,
		fontSize: `${ iconSize }px`,
		color: iconColor,
	};

	const contentStyle = {
		backgroundColor: contentBackground,
		borderRadius: `${ contentBorderRadius }px`,
		padding: `${ contentPadding }px`,
		boxShadow: contentBoxShadow ? '0 4px 15px rgba(0, 0, 0, 0.08)' : 'none',
	};

	const barStyle = {
		'--bar-color': barColor,
		'--bar-thickness': `${ barThickness }px`,
		'--icon-container-size': `${ iconContainerSize }px`,
		'--content-background': contentBackground,
		'--item-spacing': `${ itemSpacing }px`,
		'--date-font-size': `${ dateFontSize }px`,
		'--title-font-size': `${ titleFontSize }px`,
		'--text-font-size': `${ textFontSize }px`,
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Timeline Items', 'wbcom-essential' ) }>
					{ items.map( ( item, index ) => (
						<div key={ item.id } className="wbcom-timeline-item-panel">
							<div className="wbcom-timeline-item-header">
								<strong>{ item.title || `#${ index + 1 }` }</strong>
								<Button isDestructive isSmall onClick={ () => removeItem( index ) }>
									{ __( 'Remove', 'wbcom-essential' ) }
								</Button>
							</div>
							<SelectControl
								label={ __( 'Icon', 'wbcom-essential' ) }
								value={ item.icon }
								options={ iconOptions }
								onChange={ ( value ) => updateItem( index, 'icon', value ) }
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) => {
										updateItem( index, 'imageId', media.id );
										updateItem( index, 'imageUrl', media.url );
									} }
									allowedTypes={ [ 'image' ] }
									value={ item.imageId }
									render={ ( { open } ) => (
										<Button onClick={ open } variant="secondary" className="wbcom-timeline-image-btn">
											{ item.imageUrl ? (
												<img src={ item.imageUrl } alt={ item.title } />
											) : (
												__( 'Select Image (Optional)', 'wbcom-essential' )
											) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ item.imageUrl && (
								<Button
									isDestructive
									isSmall
									onClick={ () => {
										updateItem( index, 'imageId', 0 );
										updateItem( index, 'imageUrl', '' );
									} }
								>
									{ __( 'Remove Image', 'wbcom-essential' ) }
								</Button>
							) }
							<TextControl
								label={ __( 'Date', 'wbcom-essential' ) }
								value={ item.date }
								onChange={ ( value ) => updateItem( index, 'date', value ) }
							/>
							<SelectControl
								label={ __( 'Title Tag', 'wbcom-essential' ) }
								value={ item.titleTag }
								options={ [
									{ label: 'H2', value: 'h2' },
									{ label: 'H3', value: 'h3' },
									{ label: 'H4', value: 'h4' },
									{ label: 'H5', value: 'h5' },
									{ label: 'H6', value: 'h6' },
									{ label: 'Div', value: 'div' },
									{ label: 'P', value: 'p' },
								] }
								onChange={ ( value ) => updateItem( index, 'titleTag', value ) }
							/>
							<TextControl
								label={ __( 'Title', 'wbcom-essential' ) }
								value={ item.title }
								onChange={ ( value ) => updateItem( index, 'title', value ) }
							/>
							<TextareaControl
								label={ __( 'Content', 'wbcom-essential' ) }
								value={ item.content }
								onChange={ ( value ) => updateItem( index, 'content', value ) }
								rows={ 3 }
							/>
							<SelectControl
								label={ __( 'Text Align', 'wbcom-essential' ) }
								value={ item.textAlign }
								options={ [
									{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
									{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
									{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
								] }
								onChange={ ( value ) => updateItem( index, 'textAlign', value ) }
							/>
							<hr />
						</div>
					) ) }
					<Button variant="primary" onClick={ addItem }>
						{ __( 'Add Timeline Item', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout Style', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Two Column', 'wbcom-essential' ), value: 'two-column' },
							{ label: __( 'One Column', 'wbcom-essential' ), value: 'one-column' },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Arrow', 'wbcom-essential' ) }
						checked={ showArrow }
						onChange={ ( value ) => setAttributes( { showArrow: value } ) }
					/>
					<ToggleControl
						label={ __( 'Enable Animation', 'wbcom-essential' ) }
						checked={ attributes.enableAnimation }
						onChange={ ( value ) => setAttributes( { enableAnimation: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Timeline Bar', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Bar Thickness', 'wbcom-essential' ) }
						value={ barThickness }
						onChange={ ( value ) => setAttributes( { barThickness: value } ) }
						min={ 1 }
						max={ 20 }
					/>
					<p className="components-base-control__label">{ __( 'Bar Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ barColor }
						onChange={ ( value ) => setAttributes( { barColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Icon Container', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Container Size', 'wbcom-essential' ) }
						value={ iconContainerSize }
						onChange={ ( value ) => setAttributes( { iconContainerSize: value } ) }
						min={ 30 }
						max={ 120 }
					/>
					<p className="components-base-control__label">
						{ __( 'Container Background', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ iconContainerBackground }
						onChange={ ( value ) => setAttributes( { iconContainerBackground: value } ) }
					/>
					<RangeControl
						label={ __( 'Border Radius (%)', 'wbcom-essential' ) }
						value={ iconContainerBorderRadius }
						onChange={ ( value ) => setAttributes( { iconContainerBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>
					<p className="components-base-control__label">{ __( 'Icon Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconColor }
						onChange={ ( value ) => setAttributes( { iconColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Content Box', 'wbcom-essential' ) } initialOpen={ false }>
					<p className="components-base-control__label">
						{ __( 'Background Color', 'wbcom-essential' ) }
					</p>
					<ColorPalette
						value={ contentBackground }
						onChange={ ( value ) => setAttributes( { contentBackground: value } ) }
					/>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ contentBorderRadius }
						onChange={ ( value ) => setAttributes( { contentBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ contentPadding }
						onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
						min={ 8 }
						max={ 60 }
					/>
					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ contentBoxShadow }
						onChange={ ( value ) => setAttributes( { contentBoxShadow: value } ) }
					/>
					<RangeControl
						label={ __( 'Item Spacing', 'wbcom-essential' ) }
						value={ itemSpacing }
						onChange={ ( value ) => setAttributes( { itemSpacing: value } ) }
						min={ 20 }
						max={ 100 }
						help={ __( 'Space between timeline items', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Date Font Size', 'wbcom-essential' ) }
						value={ dateFontSize }
						onChange={ ( value ) => setAttributes( { dateFontSize: value } ) }
						min={ 10 }
						max={ 24 }
					/>
					<RangeControl
						label={ __( 'Title Font Size', 'wbcom-essential' ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 14 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( 'Text Font Size', 'wbcom-essential' ) }
						value={ textFontSize }
						onChange={ ( value ) => setAttributes( { textFontSize: value } ) }
						min={ 12 }
						max={ 24 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<p className="components-base-control__label">{ __( 'Date Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ dateColor }
						onChange={ ( value ) => setAttributes( { dateColor: value } ) }
					/>
					<p className="components-base-control__label">{ __( 'Title Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
					<p className="components-base-control__label">{ __( 'Text Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } style={ barStyle }>
				{ items.length === 0 ? (
					<Placeholder
						icon="backup"
						label={ __( 'Timeline', 'wbcom-essential' ) }
						instructions={ __( 'Add timeline items in the sidebar.', 'wbcom-essential' ) }
					>
						<Button variant="primary" onClick={ addItem }>
							{ __( 'Add Timeline Item', 'wbcom-essential' ) }
						</Button>
					</Placeholder>
				) : (
					<div className="wbcom-timeline-container">
						{ items.map( ( item, index ) => (
							<div
								key={ item.id }
								className={ `wbcom-timeline-block ${ index % 2 === 0 ? 'even' : 'odd' }` }
							>
								<div className="wbcom-timeline-icon" style={ iconContainerStyle }>
									{ ICONS[ item.icon ] || '★' }
								</div>
								<div
									className={ `wbcom-timeline-content ${ showArrow ? 'show-arrow' : '' }` }
									style={ { ...contentStyle, textAlign: item.textAlign } }
								>
									{ item.imageUrl && (
										<div className="wbcom-timeline-image">
											<img src={ item.imageUrl } alt={ item.title } />
										</div>
									) }
									{ item.date && (
										<span className="wbcom-timeline-date" style={ { color: dateColor } }>
											{ item.date }
										</span>
									) }
									{ item.title && (
										<div
											className="wbcom-timeline-title"
											style={ { color: titleColor } }
										>
											{ item.title }
										</div>
									) }
									{ item.content && (
										<p className="wbcom-timeline-text" style={ { color: textColor } }>
											{ item.content }
										</p>
									) }
								</div>
							</div>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
