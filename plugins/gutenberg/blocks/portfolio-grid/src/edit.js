/**
 * Portfolio Grid Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardHeader,
	Flex,
	FlexItem,
	Icon,
	__experimentalBoxControl as BoxControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	TabPanel,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

const generateId = () => `item-${ Date.now() }-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		items,
		filters,
		showFilters,
		layout,
		layoutType,
		showLayoutSwitcher,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		imageSize,
		imageAspectRatio,
		titleHtmlTag,
		descriptionHtmlTag,
		hoverEffect,
		hoverAnimation,
		enableLightbox,
		lightboxIcon,
		textPlacement,
		overlayVerticalAlign,
		textAlign,
		itemBackground,
		itemBorderRadius,
		itemBorderWidth,
		itemBorderColor,
		itemBoxShadow,
		itemHoverBoxShadow,
		overlayColor,
		overlayHoverColor,
		titleColor,
		titleFontSize,
		titleFontWeight,
		titleMargin,
		descriptionColor,
		descriptionFontSize,
		descriptionLineClamp,
		filterActiveColor,
		filterTextColor,
		filterActiveBackground,
		filterBackground,
		filterBorderRadius,
		filterPadding,
		imagePadding,
		imageBorderRadius,
		contentPadding,
		contentMargin,
		contentBackground,
		contentBorderRadius,
	} = attributes;

	const [ activeTab, setActiveTab ] = useState( 'items' );
	const [ expandedItem, setExpandedItem ] = useState( null );
	const [ expandedFilter, setExpandedFilter ] = useState( null );

	const blockProps = useBlockProps();

	const updateItem = ( index, key, value ) => {
		const newItems = [ ...items ];
		newItems[ index ] = { ...newItems[ index ], [ key ]: value };
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		const newItem = {
			id: generateId(),
			image: '',
			imageId: 0,
			title: `Project ${ items.length + 1 }`,
			description: 'A brief description of this project.',
			link: '',
			linkTarget: '_self',
			filters: '',
			columnWidth: 1,
			rowHeight: 1,
		};
		setAttributes( { items: [ ...items, newItem ] } );
		setExpandedItem( items.length );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, i ) => i !== index );
		setAttributes( { items: newItems } );
		setExpandedItem( null );
	};

	const moveItem = ( index, direction ) => {
		const newItems = [ ...items ];
		const newIndex = index + direction;
		if ( newIndex < 0 || newIndex >= items.length ) return;
		[ newItems[ index ], newItems[ newIndex ] ] = [ newItems[ newIndex ], newItems[ index ] ];
		setAttributes( { items: newItems } );
		setExpandedItem( newIndex );
	};

	const updateFilter = ( index, key, value ) => {
		const newFilters = [ ...filters ];
		newFilters[ index ] = { ...newFilters[ index ], [ key ]: value };
		setAttributes( { filters: newFilters } );
	};

	const addFilter = () => {
		const newFilter = {
			id: `filter-${ Date.now() }`,
			label: `Filter ${ filters.length + 1 }`,
			isDefault: false,
		};
		setAttributes( { filters: [ ...filters, newFilter ] } );
		setExpandedFilter( filters.length );
	};

	const removeFilter = ( index ) => {
		if ( filters[ index ].id === 'all' ) return;
		const newFilters = filters.filter( ( _, i ) => i !== index );
		setAttributes( { filters: newFilters } );
		setExpandedFilter( null );
	};

	const updateBoxShadow = ( key, value, isHover = false ) => {
		const shadowKey = isHover ? 'itemHoverBoxShadow' : 'itemBoxShadow';
		const currentShadow = isHover ? itemHoverBoxShadow : itemBoxShadow;
		setAttributes( {
			[ shadowKey ]: { ...currentShadow, [ key ]: value },
		} );
	};

	const imageSizes = [
		{ label: __( 'Thumbnail', 'wbcom-essential' ), value: 'thumbnail' },
		{ label: __( 'Medium', 'wbcom-essential' ), value: 'medium' },
		{ label: __( 'Medium Large', 'wbcom-essential' ), value: 'medium_large' },
		{ label: __( 'Large', 'wbcom-essential' ), value: 'large' },
		{ label: __( 'Full', 'wbcom-essential' ), value: 'full' },
	];

	const aspectRatios = [
		{ label: __( '1:1 Square', 'wbcom-essential' ), value: '1:1' },
		{ label: __( '4:3 Standard', 'wbcom-essential' ), value: '4:3' },
		{ label: __( '16:9 Widescreen', 'wbcom-essential' ), value: '16:9' },
		{ label: __( '3:2 Classic', 'wbcom-essential' ), value: '3:2' },
		{ label: __( '2:3 Portrait', 'wbcom-essential' ), value: '2:3' },
		{ label: __( 'Auto', 'wbcom-essential' ), value: 'auto' },
	];

	const htmlTagOptions = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
		{ label: 'H5', value: 'h5' },
		{ label: 'H6', value: 'h6' },
		{ label: 'div', value: 'div' },
		{ label: 'p', value: 'p' },
	];

	const hoverEffects = [
		{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
		{ label: __( 'Zoom', 'wbcom-essential' ), value: 'zoom' },
		{ label: __( 'Overlay Fade', 'wbcom-essential' ), value: 'overlay' },
		{ label: __( 'Slide Up', 'wbcom-essential' ), value: 'slide-up' },
		{ label: __( 'Fade', 'wbcom-essential' ), value: 'fade' },
	];

	const hoverAnimations = [
		{ label: __( 'None', 'wbcom-essential' ), value: '' },
		{ label: __( 'Grow', 'wbcom-essential' ), value: 'grow' },
		{ label: __( 'Shrink', 'wbcom-essential' ), value: 'shrink' },
		{ label: __( 'Pulse', 'wbcom-essential' ), value: 'pulse' },
		{ label: __( 'Float', 'wbcom-essential' ), value: 'float' },
		{ label: __( 'Sink', 'wbcom-essential' ), value: 'sink' },
		{ label: __( 'Bob', 'wbcom-essential' ), value: 'bob' },
		{ label: __( 'Hang', 'wbcom-essential' ), value: 'hang' },
	];

	return (
		<>
			<InspectorControls>
				{ /* Content Tab */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen>
					<ButtonGroup style={ { marginBottom: '16px', width: '100%' } }>
						<Button
							isPrimary={ activeTab === 'items' }
							isSecondary={ activeTab !== 'items' }
							onClick={ () => setActiveTab( 'items' ) }
							style={ { flex: 1 } }
						>
							{ __( 'Items', 'wbcom-essential' ) }
						</Button>
						<Button
							isPrimary={ activeTab === 'filters' }
							isSecondary={ activeTab !== 'filters' }
							onClick={ () => setActiveTab( 'filters' ) }
							style={ { flex: 1 } }
						>
							{ __( 'Filters', 'wbcom-essential' ) }
						</Button>
					</ButtonGroup>

					{ activeTab === 'items' && (
						<>
							{ items.map( ( item, index ) => (
								<Card key={ item.id } style={ { marginBottom: '12px' } }>
									<CardHeader
										onClick={ () => setExpandedItem( expandedItem === index ? null : index ) }
										style={ { cursor: 'pointer', padding: '12px' } }
									>
										<Flex>
											<FlexItem>
												<strong>{ item.title || `Item ${ index + 1 }` }</strong>
											</FlexItem>
											<FlexItem>
												<Icon icon={ expandedItem === index ? 'arrow-up-alt2' : 'arrow-down-alt2' } />
											</FlexItem>
										</Flex>
									</CardHeader>

									{ expandedItem === index && (
										<CardBody>
											<MediaUploadCheck>
												<MediaUpload
													onSelect={ ( media ) => {
														updateItem( index, 'image', media.url );
														updateItem( index, 'imageId', media.id );
													} }
													allowedTypes={ [ 'image' ] }
													value={ item.imageId }
													render={ ( { open } ) => (
														<div style={ { marginBottom: '12px' } }>
															{ item.image ? (
																<div>
																	<img
																		src={ item.image }
																		alt={ item.title }
																		style={ { maxWidth: '100%', height: 'auto', marginBottom: '8px' } }
																	/>
																	<Flex>
																		<Button isSecondary onClick={ open }>
																			{ __( 'Replace', 'wbcom-essential' ) }
																		</Button>
																		<Button isDestructive onClick={ () => {
																			updateItem( index, 'image', '' );
																			updateItem( index, 'imageId', 0 );
																		} }>
																			{ __( 'Remove', 'wbcom-essential' ) }
																		</Button>
																	</Flex>
																</div>
															) : (
																<Button isPrimary onClick={ open }>
																	{ __( 'Select Image', 'wbcom-essential' ) }
																</Button>
															) }
														</div>
													) }
												/>
											</MediaUploadCheck>

											<TextControl
												label={ __( 'Title', 'wbcom-essential' ) }
												value={ item.title }
												onChange={ ( value ) => updateItem( index, 'title', value ) }
											/>

											<TextareaControl
												label={ __( 'Description', 'wbcom-essential' ) }
												value={ item.description }
												onChange={ ( value ) => updateItem( index, 'description', value ) }
											/>

											<TextControl
												label={ __( 'Link URL', 'wbcom-essential' ) }
												value={ item.link }
												onChange={ ( value ) => updateItem( index, 'link', value ) }
												type="url"
											/>

											<SelectControl
												label={ __( 'Link Target', 'wbcom-essential' ) }
												value={ item.linkTarget || '_self' }
												options={ [
													{ label: __( 'Same Window', 'wbcom-essential' ), value: '_self' },
													{ label: __( 'New Tab', 'wbcom-essential' ), value: '_blank' },
												] }
												onChange={ ( value ) => updateItem( index, 'linkTarget', value ) }
											/>

											<TextControl
												label={ __( 'Filter Categories', 'wbcom-essential' ) }
												help={ __( 'Space-separated filter IDs (e.g., "design development")', 'wbcom-essential' ) }
												value={ item.filters }
												onChange={ ( value ) => updateItem( index, 'filters', value ) }
											/>

											{ layoutType === 'masonry' && (
												<>
													<RangeControl
														label={ __( 'Column Span', 'wbcom-essential' ) }
														value={ item.columnWidth || 1 }
														onChange={ ( value ) => updateItem( index, 'columnWidth', value ) }
														min={ 1 }
														max={ 3 }
													/>
													<RangeControl
														label={ __( 'Row Span', 'wbcom-essential' ) }
														value={ item.rowHeight || 1 }
														onChange={ ( value ) => updateItem( index, 'rowHeight', value ) }
														min={ 1 }
														max={ 3 }
													/>
												</>
											) }

											<Flex style={ { marginTop: '12px' } }>
												<Button
													isSecondary
													icon="arrow-up-alt"
													disabled={ index === 0 }
													onClick={ () => moveItem( index, -1 ) }
												/>
												<Button
													isSecondary
													icon="arrow-down-alt"
													disabled={ index === items.length - 1 }
													onClick={ () => moveItem( index, 1 ) }
												/>
												<Button
													isDestructive
													onClick={ () => removeItem( index ) }
												>
													{ __( 'Delete', 'wbcom-essential' ) }
												</Button>
											</Flex>
										</CardBody>
									) }
								</Card>
							) ) }

							<Button isPrimary onClick={ addItem } style={ { width: '100%' } }>
								{ __( '+ Add Item', 'wbcom-essential' ) }
							</Button>
						</>
					) }

					{ activeTab === 'filters' && (
						<>
							<ToggleControl
								label={ __( 'Show Filters', 'wbcom-essential' ) }
								checked={ showFilters }
								onChange={ ( value ) => setAttributes( { showFilters: value } ) }
							/>

							{ filters.map( ( filter, index ) => (
								<Card key={ filter.id } style={ { marginBottom: '12px' } }>
									<CardHeader
										onClick={ () => setExpandedFilter( expandedFilter === index ? null : index ) }
										style={ { cursor: 'pointer', padding: '12px' } }
									>
										<Flex>
											<FlexItem>
												<strong>{ filter.label }</strong>
											</FlexItem>
											<FlexItem>
												<Icon icon={ expandedFilter === index ? 'arrow-up-alt2' : 'arrow-down-alt2' } />
											</FlexItem>
										</Flex>
									</CardHeader>

									{ expandedFilter === index && (
										<CardBody>
											<TextControl
												label={ __( 'Filter ID', 'wbcom-essential' ) }
												help={ __( 'Used to match items. Use "all" for show all.', 'wbcom-essential' ) }
												value={ filter.id }
												onChange={ ( value ) => updateFilter( index, 'id', value ) }
												disabled={ filter.id === 'all' }
											/>

											<TextControl
												label={ __( 'Label', 'wbcom-essential' ) }
												value={ filter.label }
												onChange={ ( value ) => updateFilter( index, 'label', value ) }
											/>

											<ToggleControl
												label={ __( 'Default Active', 'wbcom-essential' ) }
												checked={ filter.isDefault }
												onChange={ ( value ) => {
													const newFilters = filters.map( ( f, i ) => ( {
														...f,
														isDefault: i === index ? value : false,
													} ) );
													setAttributes( { filters: newFilters } );
												} }
											/>

											{ filter.id !== 'all' && (
												<Button
													isDestructive
													onClick={ () => removeFilter( index ) }
													style={ { marginTop: '12px' } }
												>
													{ __( 'Delete Filter', 'wbcom-essential' ) }
												</Button>
											) }
										</CardBody>
									) }
								</Card>
							) ) }

							<Button isPrimary onClick={ addFilter } style={ { width: '100%' } }>
								{ __( '+ Add Filter', 'wbcom-essential' ) }
							</Button>
						</>
					) }
				</PanelBody>

				{ /* Layout Settings */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout Type', 'wbcom-essential' ) }
						value={ layoutType }
						options={ [
							{ label: __( 'Grid', 'wbcom-essential' ), value: 'grid' },
							{ label: __( 'Masonry', 'wbcom-essential' ), value: 'masonry' },
						] }
						onChange={ ( value ) => setAttributes( { layoutType: value } ) }
					/>

					<SelectControl
						label={ __( 'Default View', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Grid', 'wbcom-essential' ), value: 'grid' },
							{ label: __( 'List', 'wbcom-essential' ), value: 'list' },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Layout Switcher', 'wbcom-essential' ) }
						checked={ showLayoutSwitcher }
						onChange={ ( value ) => setAttributes( { showLayoutSwitcher: value } ) }
					/>

					<RangeControl
						label={ __( 'Columns (Desktop)', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>

					<RangeControl
						label={ __( 'Columns (Tablet)', 'wbcom-essential' ) }
						value={ columnsTablet }
						onChange={ ( value ) => setAttributes( { columnsTablet: value } ) }
						min={ 1 }
						max={ 4 }
					/>

					<RangeControl
						label={ __( 'Columns (Mobile)', 'wbcom-essential' ) }
						value={ columnsMobile }
						onChange={ ( value ) => setAttributes( { columnsMobile: value } ) }
						min={ 1 }
						max={ 2 }
					/>

					<RangeControl
						label={ __( 'Gap (px)', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

				{ /* Image Settings */ }
				<PanelBody title={ __( 'Image Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Image Size', 'wbcom-essential' ) }
						value={ imageSize }
						options={ imageSizes }
						onChange={ ( value ) => setAttributes( { imageSize: value } ) }
					/>

					<SelectControl
						label={ __( 'Aspect Ratio', 'wbcom-essential' ) }
						value={ imageAspectRatio }
						options={ aspectRatios }
						onChange={ ( value ) => setAttributes( { imageAspectRatio: value } ) }
					/>

					<RangeControl
						label={ __( 'Image Border Radius', 'wbcom-essential' ) }
						value={ imageBorderRadius }
						onChange={ ( value ) => setAttributes( { imageBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				{ /* Hover & Effects */ }
				<PanelBody title={ __( 'Hover Effects', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Hover Effect', 'wbcom-essential' ) }
						value={ hoverEffect }
						options={ hoverEffects }
						onChange={ ( value ) => setAttributes( { hoverEffect: value } ) }
					/>

					<SelectControl
						label={ __( 'Hover Animation', 'wbcom-essential' ) }
						value={ hoverAnimation }
						options={ hoverAnimations }
						onChange={ ( value ) => setAttributes( { hoverAnimation: value } ) }
					/>

					<ToggleControl
						label={ __( 'Enable Lightbox', 'wbcom-essential' ) }
						checked={ enableLightbox }
						onChange={ ( value ) => setAttributes( { enableLightbox: value } ) }
					/>

					{ enableLightbox && (
						<SelectControl
							label={ __( 'Lightbox Icon', 'wbcom-essential' ) }
							value={ lightboxIcon }
							options={ [
								{ label: __( 'Search', 'wbcom-essential' ), value: 'search' },
								{ label: __( 'Plus', 'wbcom-essential' ), value: 'plus' },
								{ label: __( 'Expand', 'wbcom-essential' ), value: 'expand' },
								{ label: __( 'Eye', 'wbcom-essential' ), value: 'eye' },
							] }
							onChange={ ( value ) => setAttributes( { lightboxIcon: value } ) }
						/>
					) }
				</PanelBody>

				{ /* Text Settings */ }
				<PanelBody title={ __( 'Text Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Text Placement', 'wbcom-essential' ) }
						value={ textPlacement }
						options={ [
							{ label: __( 'Overlay on Image', 'wbcom-essential' ), value: 'overlay' },
							{ label: __( 'Below Image', 'wbcom-essential' ), value: 'below' },
						] }
						onChange={ ( value ) => setAttributes( { textPlacement: value } ) }
					/>

					{ textPlacement === 'overlay' && (
						<SelectControl
							label={ __( 'Vertical Alignment', 'wbcom-essential' ) }
							value={ overlayVerticalAlign }
							options={ [
								{ label: __( 'Top', 'wbcom-essential' ), value: 'flex-start' },
								{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
								{ label: __( 'Bottom', 'wbcom-essential' ), value: 'flex-end' },
							] }
							onChange={ ( value ) => setAttributes( { overlayVerticalAlign: value } ) }
						/>
					) }

					<SelectControl
						label={ __( 'Text Alignment', 'wbcom-essential' ) }
						value={ textAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { textAlign: value } ) }
					/>

					<SelectControl
						label={ __( 'Title HTML Tag', 'wbcom-essential' ) }
						value={ titleHtmlTag }
						options={ htmlTagOptions }
						onChange={ ( value ) => setAttributes( { titleHtmlTag: value } ) }
					/>

					<RangeControl
						label={ __( 'Title Font Size', 'wbcom-essential' ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 12 }
						max={ 48 }
					/>

					<SelectControl
						label={ __( 'Title Font Weight', 'wbcom-essential' ) }
						value={ titleFontWeight }
						options={ [
							{ label: '400 Normal', value: '400' },
							{ label: '500 Medium', value: '500' },
							{ label: '600 Semi Bold', value: '600' },
							{ label: '700 Bold', value: '700' },
						] }
						onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
					/>

					<SelectControl
						label={ __( 'Description HTML Tag', 'wbcom-essential' ) }
						value={ descriptionHtmlTag }
						options={ htmlTagOptions }
						onChange={ ( value ) => setAttributes( { descriptionHtmlTag: value } ) }
					/>

					<RangeControl
						label={ __( 'Description Font Size', 'wbcom-essential' ) }
						value={ descriptionFontSize }
						onChange={ ( value ) => setAttributes( { descriptionFontSize: value } ) }
						min={ 10 }
						max={ 24 }
					/>

					<RangeControl
						label={ __( 'Description Line Clamp', 'wbcom-essential' ) }
						value={ descriptionLineClamp }
						onChange={ ( value ) => setAttributes( { descriptionLineClamp: value } ) }
						min={ 1 }
						max={ 10 }
					/>
				</PanelBody>

				{ /* Colors */ }
				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
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
							<hr />
							<h4>{ __( 'Item Colors', 'wbcom-essential' ) }</h4>
							<ColorControl
								label={ __( 'Background Color', 'wbcom-essential' ) }
								value={ itemBackground }
								onChange={ ( value ) => setAttributes( { itemBackground: value } ) }
							/>
							{ itemBorderWidth > 0 && (
								<ColorControl
									label={ __( 'Border Color', 'wbcom-essential' ) }
									value={ itemBorderColor }
									onChange={ ( value ) => setAttributes( { itemBorderColor: value } ) }
								/>
							) }
							{ itemBoxShadow.enabled && (
								<ColorControl
									label={ __( 'Shadow Color', 'wbcom-essential' ) }
									value={ itemBoxShadow.color }
									onChange={ ( value ) => updateBoxShadow( 'color', value ) }
								/>
							) }
							{ itemHoverBoxShadow.enabled && (
								<ColorControl
									label={ __( 'Hover Shadow Color', 'wbcom-essential' ) }
									value={ itemHoverBoxShadow.color }
									onChange={ ( value ) => updateBoxShadow( 'color', value, true ) }
								/>
							) }

							<hr />
							<h4>{ __( 'Overlay Colors', 'wbcom-essential' ) }</h4>
							<ColorControl
								label={ __( 'Overlay Color', 'wbcom-essential' ) }
								value={ overlayColor }
								onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Overlay Hover Color', 'wbcom-essential' ) }
								value={ overlayHoverColor }
								onChange={ ( value ) => setAttributes( { overlayHoverColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Content Background', 'wbcom-essential' ) }
								value={ contentBackground }
								onChange={ ( value ) => setAttributes( { contentBackground: value } ) }
							/>

							<hr />
							<h4>{ __( 'Typography Colors', 'wbcom-essential' ) }</h4>
							<ColorControl
								label={ __( 'Title Color', 'wbcom-essential' ) }
								value={ titleColor }
								onChange={ ( value ) => setAttributes( { titleColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Description Color', 'wbcom-essential' ) }
								value={ descriptionColor }
								onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
							/>

							<hr />
							<h4>{ __( 'Filter Colors', 'wbcom-essential' ) }</h4>
							<ColorControl
								label={ __( 'Filter Text Color', 'wbcom-essential' ) }
								value={ filterTextColor }
								onChange={ ( value ) => setAttributes( { filterTextColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Filter Active Color', 'wbcom-essential' ) }
								value={ filterActiveColor }
								onChange={ ( value ) => setAttributes( { filterActiveColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Filter Background', 'wbcom-essential' ) }
								value={ filterBackground }
								onChange={ ( value ) => setAttributes( { filterBackground: value } ) }
							/>
							<ColorControl
								label={ __( 'Filter Active Background', 'wbcom-essential' ) }
								value={ filterActiveBackground }
								onChange={ ( value ) => setAttributes( { filterActiveBackground: value } ) }
							/>
						</>
					) }
				</PanelBody>

				{ /* Item Style */ }
				<PanelBody title={ __( 'Item Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ itemBorderRadius }
						onChange={ ( value ) => setAttributes( { itemBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ itemBorderWidth }
						onChange={ ( value ) => setAttributes( { itemBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>

					<h4>{ __( 'Box Shadow', 'wbcom-essential' ) }</h4>
					<ToggleControl
						label={ __( 'Enable Box Shadow', 'wbcom-essential' ) }
						checked={ itemBoxShadow.enabled }
						onChange={ ( value ) => updateBoxShadow( 'enabled', value ) }
					/>

					{ itemBoxShadow.enabled && (
						<>
							<RangeControl
								label={ __( 'Horizontal', 'wbcom-essential' ) }
								value={ itemBoxShadow.horizontal }
								onChange={ ( value ) => updateBoxShadow( 'horizontal', value ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Vertical', 'wbcom-essential' ) }
								value={ itemBoxShadow.vertical }
								onChange={ ( value ) => updateBoxShadow( 'vertical', value ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Blur', 'wbcom-essential' ) }
								value={ itemBoxShadow.blur }
								onChange={ ( value ) => updateBoxShadow( 'blur', value ) }
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label={ __( 'Spread', 'wbcom-essential' ) }
								value={ itemBoxShadow.spread }
								onChange={ ( value ) => updateBoxShadow( 'spread', value ) }
								min={ -50 }
								max={ 50 }
							/>
						</>
					) }

					<h4>{ __( 'Hover Box Shadow', 'wbcom-essential' ) }</h4>
					<ToggleControl
						label={ __( 'Enable Hover Shadow', 'wbcom-essential' ) }
						checked={ itemHoverBoxShadow.enabled }
						onChange={ ( value ) => updateBoxShadow( 'enabled', value, true ) }
					/>

					{ itemHoverBoxShadow.enabled && (
						<>
							<RangeControl
								label={ __( 'Horizontal', 'wbcom-essential' ) }
								value={ itemHoverBoxShadow.horizontal }
								onChange={ ( value ) => updateBoxShadow( 'horizontal', value, true ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Vertical', 'wbcom-essential' ) }
								value={ itemHoverBoxShadow.vertical }
								onChange={ ( value ) => updateBoxShadow( 'vertical', value, true ) }
								min={ -50 }
								max={ 50 }
							/>
							<RangeControl
								label={ __( 'Blur', 'wbcom-essential' ) }
								value={ itemHoverBoxShadow.blur }
								onChange={ ( value ) => updateBoxShadow( 'blur', value, true ) }
								min={ 0 }
								max={ 100 }
							/>
							<RangeControl
								label={ __( 'Spread', 'wbcom-essential' ) }
								value={ itemHoverBoxShadow.spread }
								onChange={ ( value ) => updateBoxShadow( 'spread', value, true ) }
								min={ -50 }
								max={ 50 }
							/>
						</>
					) }
				</PanelBody>

				{ /* Overlay Style */ }
				<PanelBody title={ __( 'Overlay Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Content Border Radius', 'wbcom-essential' ) }
						value={ contentBorderRadius }
						onChange={ ( value ) => setAttributes( { contentBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
				</PanelBody>

				{ /* Filter Style */ }
				<PanelBody title={ __( 'Filter Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Filter Border Radius', 'wbcom-essential' ) }
						value={ filterBorderRadius }
						onChange={ ( value ) => setAttributes( { filterBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/portfolio-grid"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
