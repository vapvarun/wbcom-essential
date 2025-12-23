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
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

const generateId = () => `item-${ Date.now() }-${ Math.random().toString( 36 ).substr( 2, 9 ) }`;

export default function Edit( { attributes, setAttributes } ) {
	const {
		items,
		filters,
		showFilters,
		layout,
		showLayoutSwitcher,
		columns,
		columnsTablet,
		columnsMobile,
		gap,
		itemBackground,
		itemBorderRadius,
		overlayColor,
		titleColor,
		descriptionColor,
		filterActiveColor,
		filterTextColor,
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
			title: `Project ${ items.length + 1 }`,
			description: 'A brief description of this project.',
			link: '',
			filters: '',
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
		if ( filters[ index ].id === 'all' ) return; // Don't remove "All" filter
		const newFilters = filters.filter( ( _, i ) => i !== index );
		setAttributes( { filters: newFilters } );
		setExpandedFilter( null );
	};

	return (
		<>
			<InspectorControls>
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
													onSelect={ ( media ) => updateItem( index, 'image', media.url ) }
													allowedTypes={ [ 'image' ] }
													value={ item.image }
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
																		<Button isDestructive onClick={ () => updateItem( index, 'image', '' ) }>
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

											<TextControl
												label={ __( 'Filter Categories', 'wbcom-essential' ) }
												help={ __( 'Space-separated filter IDs (e.g., "design development")', 'wbcom-essential' ) }
												value={ item.filters }
												onChange={ ( value ) => updateItem( index, 'filters', value ) }
											/>

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
													// Only one filter can be default
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

				<PanelBody title={ __( 'Display Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Filters', 'wbcom-essential' ) }
						checked={ showFilters }
						onChange={ ( value ) => setAttributes( { showFilters: value } ) }
					/>

					<SelectControl
						label={ __( 'Default Layout', 'wbcom-essential' ) }
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
				</PanelBody>

				<PanelBody title={ __( 'Grid Settings', 'wbcom-essential' ) } initialOpen={ false }>
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
						max={ 60 }
					/>

					<RangeControl
						label={ __( 'Item Border Radius', 'wbcom-essential' ) }
						value={ itemBorderRadius }
						onChange={ ( value ) => setAttributes( { itemBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Item Background', 'wbcom-essential' ) }
						value={ itemBackground }
						onChange={ ( value ) => setAttributes( { itemBackground: value } ) }
					/>

					<ColorControl
						label={ __( 'Overlay Color', 'wbcom-essential' ) }
						value={ overlayColor }
						onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
					/>

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

					<ColorControl
						label={ __( 'Filter Active Color', 'wbcom-essential' ) }
						value={ filterActiveColor }
						onChange={ ( value ) => setAttributes( { filterActiveColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Filter Text Color', 'wbcom-essential' ) }
						value={ filterTextColor }
						onChange={ ( value ) => setAttributes( { filterTextColor: value } ) }
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
