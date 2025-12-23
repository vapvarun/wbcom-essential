import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ToggleControl,
	RangeControl,
	SelectControl,
	ColorPicker,
	TextControl,
	TextareaControl,
	Notice,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element'; // Added useEffect
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		items,
		openSingle,
		selfClose,
		autoScroll,
		scrollOffset,
		scrollSpeed,
		openSpeed,
		closeSpeed,
		enableFaqSchema,
		titleTag,
		itemSpacing,
		borderRadius,
		borderWidth,
		titleColor,
		titleBgColor,
		contentColor,
		contentBgColor,
		borderColor,
		titleFontSize,
		titleFontWeight,
		titleLineHeight,
		contentFontSize,
		contentFontWeight,
		contentLineHeight,
	} = attributes;

	const [ selectedItemId, setSelectedItemId ] = useState(
		items.length > 0 ? items[ 0 ].id : null
	);

	// Fix: Ensure all items have valid IDs
	useEffect( () => {
		const itemsWithValidIds = items.map( ( item, index ) => ( {
			...item,
			id: item.id && item.id !== 'undefined' ? item.id : `item-${ Date.now() }-${ index }`,
		} ) );
		
		// Only update if there are changes to avoid infinite loop
		if ( JSON.stringify( itemsWithValidIds ) !== JSON.stringify( items ) ) {
			setAttributes( { items: itemsWithValidIds } );
		}
	}, [ items ] );

	const blockProps = useBlockProps( {
		className: 'wp-block-wbcom-essential-accordion',
	} );

	const addItem = () => {
		const newId = `item-${ Date.now() }-${ items.length }`; // More robust ID generation
		const newItems = [
			...items,
			{
				id: newId,
				title: __( 'New Accordion Item', 'wbcom-essential' ),
				content: __( 'Add your content here…', 'wbcom-essential' ),
				isOpen: false,
				selfBlock: false,
				iconType: 'icon',
				icon: 'dashicons-arrow-down',
				iconText: ( items.length + 1 ).toString(),
			},
		];
		setAttributes( { items: newItems } );
		setSelectedItemId( newId );
	};

	const removeItem = ( id ) => {
		const newItems = items.filter( ( item ) => item.id !== id );
		setAttributes( { items: newItems } );
		if ( selectedItemId === id ) {
			setSelectedItemId( newItems.length > 0 ? newItems[ 0 ].id : null );
		}
	};

	const updateItem = ( id, field, value ) => {
		const newItems = items.map( ( item ) => {
			if ( item.id === id ) {
				return { ...item, [ field ]: value };
			}
			return item;
		} );
		setAttributes( { items: newItems } );
	};

	const selectedItem = items.find( ( item ) => item.id === selectedItemId );

	// Fix: Safe key generation function
	const getSafeKey = ( item, prefix = 'item' ) => {
		const itemId = item.id && item.id !== 'undefined' ? item.id : `temp-${ Date.now() }-${ Math.random() }`;
		return `${ prefix }-${ itemId }`;
	};

	return (
		<div>
			<InspectorControls>
				<PanelBody
					title={ __( 'Accordion Items', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<div className="accordion-items-list">
						{ items.map( ( item, index ) => (
							<div
								key={ getSafeKey( item, 'sidebar' ) } // Fixed: Using safe key function
								className={ `accordion-item-selector ${
									selectedItemId === item.id
										? 'is-selected'
										: ''
								}` }
								onClick={ () => setSelectedItemId( item.id ) }
								onKeyDown={ ( event ) => {
									if (
										event.key === 'Enter' ||
										event.key === ' '
									) {
										event.preventDefault();
										setSelectedItemId( item.id );
									}
								} }
								tabIndex={ 0 }
								role="button"
							>
								<span className="item-number">
									{ index + 1 }
								</span>
								<span className="item-title">
									{ item.title ||
										__( 'Untitled', 'wbcom-essential' ) }
								</span>
								<Button
									icon="trash"
									onClick={ ( e ) => {
										e.stopPropagation();
										removeItem( item.id );
									} }
									label={ __( 'Remove', 'wbcom-essential' ) }
									isDestructive
									isSmall
								/>
							</div>
						) ) }
					</div>
					<Button
						variant="secondary"
						onClick={ addItem }
						className="add-accordion-item-sidebar"
					>
						{ __( '+ Add Item', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ selectedItem && (
					<PanelBody
						title={ __( 'Edit Selected Item', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Accordion Title', 'wbcom-essential' ) }
							value={ selectedItem.title }
							onChange={ ( value ) =>
								updateItem( selectedItem.id, 'title', value )
							}
							help={ __(
								'Enter the title for this accordion item',
								'wbcom-essential'
							) }
						/>
						<hr />
						<TextareaControl
							label={ __(
								'Accordion Content',
								'wbcom-essential'
							) }
							value={ selectedItem.content }
							onChange={ ( value ) =>
								updateItem( selectedItem.id, 'content', value )
							}
							help={ __(
								'Enter the content for this accordion item',
								'wbcom-essential'
							) }
							rows={ 8 }
						/>
						<hr />
						<SelectControl
							label={ __( 'Icon Type', 'wbcom-essential' ) }
							value={ selectedItem.iconType || 'icon' }
							options={ [
								{
									label: __( 'Icon', 'wbcom-essential' ),
									value: 'icon',
								},
								{
									label: __(
										'Text/Number',
										'wbcom-essential'
									),
									value: 'text',
								},
								{
									label: __( 'None', 'wbcom-essential' ),
									value: 'none',
								},
							] }
							onChange={ ( value ) =>
								updateItem( selectedItem.id, 'iconType', value )
							}
						/>
						{ selectedItem.iconType === 'text' && (
							<TextControl
								label={ __( 'Icon Text', 'wbcom-essential' ) }
								value={ selectedItem.iconText || '' }
								onChange={ ( value ) =>
									updateItem(
										selectedItem.id,
										'iconText',
										value
									)
								}
							/>
						) }
						{ selectedItem.iconType === 'icon' && (
							<TextControl
								label={ __(
									'Dashicon Class',
									'wbcom-essential'
								) }
								value={
									selectedItem.icon || 'dashicons-arrow-down'
								}
								onChange={ ( value ) =>
									updateItem( selectedItem.id, 'icon', value )
								}
								help={ __(
									'e.g., dashicons-arrow-down',
									'wbcom-essential'
								) }
							/>
						) }
						<hr />
						<ToggleControl
							label={ __( 'Open by Default', 'wbcom-essential' ) }
							checked={ selectedItem.isOpen || false }
							onChange={ ( value ) =>
								updateItem( selectedItem.id, 'isOpen', value )
							}
						/>
					</PanelBody>
				) }

				<PanelBody
					title={ __( 'Accordion Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Title HTML Tag', 'wbcom-essential' ) }
						value={ titleTag }
						options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
							{ label: 'div', value: 'div' },
							{ label: 'p', value: 'p' },
						] }
						onChange={ ( value ) =>
							setAttributes( { titleTag: value } )
						}
					/>
					<hr />
					<ToggleControl
						label={ __( 'Open Single', 'wbcom-essential' ) }
						help={ __(
							'Only one accordion item can be open at a time',
							'wbcom-essential'
						) }
						checked={ openSingle }
						onChange={ ( value ) =>
							setAttributes( { openSingle: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Self Close', 'wbcom-essential' ) }
						help={ __(
							'Close accordion when clicking outside',
							'wbcom-essential'
						) }
						checked={ selfClose }
						onChange={ ( value ) =>
							setAttributes( { selfClose: value } )
						}
					/>
					<ToggleControl
						label={ __( 'Enable FAQ Schema', 'wbcom-essential' ) }
						help={ __(
							'Add FAQ schema markup for SEO',
							'wbcom-essential'
						) }
						checked={ enableFaqSchema }
						onChange={ ( value ) =>
							setAttributes( { enableFaqSchema: value } )
						}
					/>
					<hr />
					<ToggleControl
						label={ __( 'Auto Scroll', 'wbcom-essential' ) }
						help={ __(
							'Scroll to accordion item when opened',
							'wbcom-essential'
						) }
						checked={ autoScroll }
						onChange={ ( value ) =>
							setAttributes( { autoScroll: value } )
						}
					/>
					{ autoScroll && (
						<>
							<RangeControl
								label={ __(
									'Scroll Offset (px)',
									'wbcom-essential'
								) }
								value={ scrollOffset }
								onChange={ ( value ) =>
									setAttributes( { scrollOffset: value } )
								}
								min={ 0 }
								max={ 500 }
							/>
							<RangeControl
								label={ __(
									'Scroll Speed (ms)',
									'wbcom-essential'
								) }
								value={ scrollSpeed }
								onChange={ ( value ) =>
									setAttributes( { scrollSpeed: value } )
								}
								min={ 0 }
								max={ 2000 }
								step={ 50 }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Animation Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Open Speed (ms)', 'wbcom-essential' ) }
						value={ openSpeed }
						onChange={ ( value ) =>
							setAttributes( { openSpeed: value } )
						}
						min={ 0 }
						max={ 1000 }
						step={ 50 }
					/>
					<RangeControl
						label={ __( 'Close Speed (ms)', 'wbcom-essential' ) }
						value={ closeSpeed }
						onChange={ ( value ) =>
							setAttributes( { closeSpeed: value } )
						}
						min={ 0 }
						max={ 1000 }
						step={ 50 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Spacing Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Item Spacing (px)', 'wbcom-essential' ) }
						value={ itemSpacing }
						onChange={ ( value ) =>
							setAttributes( { itemSpacing: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Border Width (px)', 'wbcom-essential' ) }
						value={ borderWidth }
						onChange={ ( value ) =>
							setAttributes( { borderWidth: value } )
						}
						min={ 0 }
						max={ 10 }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Typography Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<p>
						<strong>
							{ __( 'Title Typography', 'wbcom-essential' ) }
						</strong>
					</p>
					<RangeControl
						label={ __( 'Font Size (px)', 'wbcom-essential' ) }
						value={ titleFontSize }
						onChange={ ( value ) =>
							setAttributes( { titleFontSize: value } )
						}
						min={ 10 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Font Weight', 'wbcom-essential' ) }
						value={ titleFontWeight }
						options={ [
							{ label: 'Light', value: '300' },
							{ label: 'Normal', value: '400' },
							{ label: 'Medium', value: '500' },
							{ label: 'Semi Bold', value: '600' },
							{ label: 'Bold', value: '700' },
							{ label: 'Extra Bold', value: '800' },
						] }
						onChange={ ( value ) =>
							setAttributes( { titleFontWeight: value } )
						}
					/>
					<RangeControl
						label={ __( 'Line Height', 'wbcom-essential' ) }
						value={ titleLineHeight }
						onChange={ ( value ) =>
							setAttributes( { titleLineHeight: value } )
						}
						min={ 1 }
						max={ 3 }
						step={ 0.1 }
					/>
					<hr />
					<p>
						<strong>
							{ __( 'Content Typography', 'wbcom-essential' ) }
						</strong>
					</p>
					<RangeControl
						label={ __( 'Font Size (px)', 'wbcom-essential' ) }
						value={ contentFontSize }
						onChange={ ( value ) =>
							setAttributes( { contentFontSize: value } )
						}
						min={ 10 }
						max={ 30 }
					/>
					<SelectControl
						label={ __( 'Font Weight', 'wbcom-essential' ) }
						value={ contentFontWeight }
						options={ [
							{ label: 'Light', value: '300' },
							{ label: 'Normal', value: '400' },
							{ label: 'Medium', value: '500' },
							{ label: 'Semi Bold', value: '600' },
							{ label: 'Bold', value: '700' },
						] }
						onChange={ ( value ) =>
							setAttributes( { contentFontWeight: value } )
						}
					/>
					<RangeControl
						label={ __( 'Line Height', 'wbcom-essential' ) }
						value={ contentLineHeight }
						onChange={ ( value ) =>
							setAttributes( { contentLineHeight: value } )
						}
						min={ 1 }
						max={ 3 }
						step={ 0.1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Color Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p>
						<strong>
							{ __( 'Title Color', 'wbcom-essential' ) }
						</strong>
					</p>
					<ColorPicker
						color={ titleColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { titleColor: value.hex } )
						}
					/>
					<hr />
					<p>
						<strong>
							{ __(
								'Title Background Color',
								'wbcom-essential'
							) }
						</strong>
					</p>
					<ColorPicker
						color={ titleBgColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { titleBgColor: value.hex } )
						}
					/>
					<hr />
					<p>
						<strong>
							{ __( 'Content Color', 'wbcom-essential' ) }
						</strong>
					</p>
					<ColorPicker
						color={ contentColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { contentColor: value.hex } )
						}
					/>
					<hr />
					<p>
						<strong>
							{ __(
								'Content Background Color',
								'wbcom-essential'
							) }
						</strong>
					</p>
					<ColorPicker
						color={ contentBgColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { contentBgColor: value.hex } )
						}
					/>
					<hr />
					<p>
						<strong>
							{ __( 'Border Color', 'wbcom-essential' ) }
						</strong>
					</p>
					<ColorPicker
						color={ borderColor }
						onChangeComplete={ ( value ) =>
							setAttributes( { borderColor: value.hex } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<Notice
					status="info"
					isDismissible={ false }
					className="accordion-help-notice"
				>
					{ __(
						'Use the sidebar panel to manage accordion items and edit their title and content. Select an item from the list to edit it.',
						'wbcom-essential'
					) }
				</Notice>
				<div className="accordion-wrapper">
					{ items.map( ( item, index ) => {
						const itemStyle = {
							marginBottom:
								index < items.length - 1
									? `${ itemSpacing }px`
									: 0,
							borderRadius: `${ borderRadius }px`,
							borderWidth: `${ borderWidth }px`,
							borderColor: borderColor || '#ddd',
						};

						const headerStyle = {
							color: titleColor,
							backgroundColor: titleBgColor || '#f8f9fa',
							fontSize: `${ titleFontSize }px`,
							fontWeight: titleFontWeight,
							lineHeight: titleLineHeight,
						};

						const contentStyle = {
							color: contentColor,
							backgroundColor: contentBgColor || '#fff',
							fontSize: `${ contentFontSize }px`,
							fontWeight: contentFontWeight,
							lineHeight: contentLineHeight,
							padding: '20px',
							borderTop: '1px solid #e0e0e0',
						};

						const isSelected = selectedItemId === item.id;

						return (
							<div
								key={ getSafeKey( item, 'preview' ) } // Fixed: Using safe key function
								className={ `accordion-item-preview ${
									isSelected ? 'is-selected' : ''
								} ${ item.isOpen ? 'is-open' : '' }` }
								style={ itemStyle }
								onClick={ () => setSelectedItemId( item.id ) }
								onKeyDown={ ( event ) => {
									if (
										event.key === 'Enter' ||
										event.key === ' '
									) {
										event.preventDefault();
										setSelectedItemId( item.id );
									}
								} }
								tabIndex={ 0 }
								role="button"
							>
								<div
									className="accordion-header-preview"
									style={ headerStyle }
								>
									<span className="accordion-icon">
										<span
											className={
												item.iconType === 'icon' && item.icon
													? `dashicons ${ item.icon }`
													: item.iconType === 'text'
													? 'accordion-text-icon'
													: ''
											}
										>
											{ item.iconType === 'text' && item.iconText
												? item.iconText
												: '' }
										</span>
									</span>
									<span className="accordion-title-preview">
										{ item.title ||
											__(
												'Untitled',
												'wbcom-essential'
											) }
									</span>
									<span className="accordion-arrow"></span>
								</div>
								{ item.isOpen && (
									<div
										key={ getSafeKey( item, 'content' ) } // Fixed: Using safe key function
										className="accordion-content-preview"
										style={ contentStyle }
									>
										{ item.content ||
											__(
												'No content',
												'wbcom-essential'
											) }
									</div>
								) }
								{ isSelected && (
									<div
										key={ getSafeKey( item, 'selected' ) } // Fixed: Using safe key function
										className="selected-indicator"
									>
										{ __(
											'✓ Selected - Edit in sidebar',
											'wbcom-essential'
										) }
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			</div>
		</div>
	);
}