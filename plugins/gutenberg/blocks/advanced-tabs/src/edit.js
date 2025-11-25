/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	SelectControl,
	ToggleControl,
	Button,
	Dashicon,
	RangeControl,
	ColorPalette,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack
} from '@wordpress/components';

import { useState } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		tabs,
		layout,
		enableUrlHash,
		titleColor,
		titleActiveColor,
		titleBgColor,
		titleActiveBgColor,
		titleBorderColor,
		titleActiveBorderColor,
		contentColor,
		contentBgColor,
		contentBorderColor,
		iconColor,
		iconActiveColor,
		iconSize,
		titleAlignment
	} = attributes;

	const [ activeTab, setActiveTab ] = useState( 0 );

	const blockProps = useBlockProps(
		{
			className: `advanced-tabs-block layout-${layout}`
		}
	);

	/**
	 * Ensures all tabs have valid IDs
	 */
	const ensureTabIds = (tabsArray) => {
		return tabsArray.map((tab, index) => {
			if (!tab.id || tab.id === 'undefined') {
				return {
					...tab,
					id: `tab-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`
				};
			}
			return tab;
		});
	};

	/**
	 * Updates a specific field of a tab at the given index
	 *
	 * @param {number} index - The index of the tab to update
	 * @param {string} field - The field name to update (title, content, etc.)
	 * @param {any} value - The new value for the field
	 */
	const updateTab = ( index, field, value ) => {
		const newTabs = tabs.map( ( tab, i ) => i === index ? { ...tab, [field]: value } : tab );
		setAttributes( { tabs: newTabs } );
	};

	/**
	 * Adds a new tab to the tabs array
	 */
		const addTab = () => {
			const newTabs = ensureTabIds([ ...tabs ]);
			newTabs.push(
				{
					id: `tab-${Date.now()}-${tabs.length}-${Math.random().toString(36).substr(2, 9)}`,
					title: `Tab ${tabs.length + 1}`,
					icon: '',
					content: 'New tab content',
					imageUrl: '',
					imageId: null
				}
			);
			setAttributes( { tabs: newTabs } );
		};

	/**
	 * Removes a tab at the specified index
	 *
	 * @param {number} index - The index of the tab to remove
	 */
	const removeTab = ( index ) => {
		const newTabs = [ ...tabs ];
		newTabs.splice( index, 1 );
		setAttributes( { tabs: newTabs } );
		if ( activeTab >= newTabs.length ) {
			setActiveTab( Math.max( 0, newTabs.length - 1 ) );
		}
	};

	/**
	 * Moves a tab up or down in the order
	 *
	 * @param {number} index - The index of the tab to move
	 * @param {number} direction - The direction to move (-1 for up, 1 for down)
	 */
	const moveTab = ( index, direction ) => {
		const newTabs  = [ ...tabs ];
		const newIndex = index + direction;
		if ( newIndex >= 0 && newIndex < newTabs.length ) {
			[ newTabs[ index ], newTabs[ newIndex ] ] = [ newTabs[ newIndex ], newTabs[ index ] ];
			setAttributes( { tabs: newTabs } );
			setActiveTab( newIndex );
		}
	};

	// Ensure all tabs have valid IDs
	const safeTabs = ensureTabIds(tabs);

	const colors = [
		{ name: 'Black', color: '#000000' },
		{ name: 'White', color: '#ffffff' },
		{ name: 'Red', color: '#ff0000' },
		{ name: 'Green', color: '#00ff00' },
		{ name: 'Blue', color: '#0000ff' },
		{ name: 'Yellow', color: '#ffff00' },
		{ name: 'Gray', color: '#cccccc' }
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={__( 'Tab Settings', 'advanced-tabs-block' )} initialOpen={true}>
					<SelectControl
						label= { __( 'Layout', 'advanced-tabs-block' ) }
						value= { layout }
						options= { [
							{ label: __( 'Horizontal', 'advanced-tabs-block' ), value: 'horizontal' },
							{ label: __( 'Vertical', 'advanced-tabs-block' ), value: 'vertical' },
							{ label: __( 'Vertical Reverse', 'advanced-tabs-block' ), value: 'vertical-reverse' }
							] }
						onChange= {( value ) => setAttributes( { layout: value } ) }
					/>
					<ToggleControl
						label= { __( 'Enable URL Hash', 'advanced-tabs-block' ) }
						help= { __( 'Allow direct linking to specific tabs via URL hash', 'advanced-tabs-block' ) }
						checked= { enableUrlHash }
						onChange= {( value ) => setAttributes( { enableUrlHash: value } ) }
					/>
				</PanelBody>

				<PanelBody title= { __( 'Manage Tabs', 'advanced-tabs-block' ) } initialOpen= { false }>
					{ safeTabs.map(
						( tab, index ) => (
						<VStack key= { `tab-manage-${tab.id}` } spacing= { 2 } style= { { marginBottom: '20px', padding: '10px', border: '1px solid #ddd' } }>
							<HStack key= { `header-${tab.id}` }>
								<strong> { __( 'Tab', 'advanced-tabs-block' ) } { index + 1 } </strong>
							</HStack>
							<TextControl
								key= { `title-control-${tab.id}` }
								label= { __( 'Title', 'advanced-tabs-block' ) }
								value= { tab.title }
								onChange= { ( value ) => updateTab( index, 'title', value ) }
							/>
							<TextControl
								key= { `icon-control-${tab.id}` }
								label= { __( 'Dashicon Name', 'advanced-tabs-block' ) }
								help= { __( 'e.g., star-filled, admin-post, format-aside', 'advanced-tabs-block' ) }
								value= { tab.icon }
								onChange= { ( value ) => updateTab( index, 'icon', value ) }
							/>
							<MediaUploadCheck>
								<MediaUpload
									onSelect= { ( media ) => {
										const newTabs = tabs.map( ( tab, i ) => i === index ? { ...tab, imageUrl: media.url, imageId: media.id } : tab );
										setAttributes( { tabs: newTabs } );
										} }
									allowedTypes= { [ 'image' ] }
									value= { tab.imageId || undefined }
									render= { ( { open } ) => (
										<div>
											<Button onClick= { open } variant = "secondary" style= { { textAlign: 'center', width: '100%' } }>
												{ tab.imageUrl ? __( 'Change Image', 'advanced-tabs-block' ) : __( 'Select Image', 'advanced-tabs-block' ) }
											</Button>
											{ tab.imageUrl && (
												<div key= { `media-preview-${tab.id}` }>
													<img src= { tab.imageUrl } alt = "" style= { { maxWidth: '100%', marginTop: '10px' } } />
													<Button
														onClick= { () => {
															const newTabs = tabs.map( ( tab, i ) => i === index ? { ...tab, imageUrl: '', imageId: null } : tab );
															setAttributes( { tabs: newTabs } );
															} }
														variant = "link"
														isDestructive
														style= { { textAlign: 'center', width: '100%' } }
													>
														{ __( 'Remove Image', 'advanced-tabs-block' ) }
													</Button>
												</div>
											) }
										</div>
									) }
								/>
							</MediaUploadCheck>
							<VStack key= { `actions-${tab.id}` } spacing= { 1 }>
								<HStack key= { `move-buttons-${tab.id}` } spacing= { 1 }>
									{ index > 0 && (
										<Button
											key= { `up-${tab.id}` }
											onClick= { () => moveTab( index, -1 ) }
											variant = "secondary"
											icon = "arrow-up-alt2"
										>
											{ __( 'Move Up', 'advanced-tabs-block' ) }
										</Button>
									) }
									{ index < safeTabs.length - 1 && (
										<Button
											key= { `down-${tab.id}` }
											onClick= { () => moveTab( index, 1 ) }
											variant = "secondary"
											icon = "arrow-down-alt2"
										>
											{ __( 'Move Down', 'advanced-tabs-block' ) }
										</Button>
									) }
								</HStack>
								{ safeTabs.length> 1 && (
									<Button
										key= { `remove-${tab.id}` }
										onClick= { () => removeTab( index ) }
										variant = "secondary"
										isDestructive
									>
										{ __( 'Remove', 'advanced-tabs-block' ) }
									</Button>
								) }
							</VStack>
							</VStack>
						)
					) }
					<Button onClick= { addTab } variant = "primary">
						{ __( 'Add Tab', 'advanced-tabs-block' ) }
					</Button>
				</PanelBody>

				<PanelBody title= { __( 'Title Styling', 'advanced-tabs-block' ) } initialOpen= { false }>
					<VStack spacing= { 3 }>
						<div>
							<p> { __( 'Normal Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleColor }
								onChange= { ( value ) => setAttributes( { titleColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Active Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleActiveColor }
								onChange= { ( value ) => setAttributes( { titleActiveColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Background Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleBgColor }
								onChange= { ( value ) => setAttributes( { titleBgColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Active Background', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleActiveBgColor }
								onChange= { ( value ) => setAttributes( { titleActiveBgColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Border Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleBorderColor }
								onChange= { ( value ) => setAttributes( { titleBorderColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Active Border Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { titleActiveBorderColor }
								onChange= { ( value ) => setAttributes( { titleActiveBorderColor: value } ) }
							/>
						</div>
						<SelectControl
							label= { __( 'Text Alignment', 'advanced-tabs-block' ) }
							value= { titleAlignment }
							options= { [
								{ label: __( 'Left', 'advanced-tabs-block' ), value: 'left' },
								{ label: __( 'Center', 'advanced-tabs-block' ), value: 'center' },
								{ label: __( 'Right', 'advanced-tabs-block' ), value: 'right' }
								] }
							onChange= { ( value ) => setAttributes( { titleAlignment: value } ) }
						/>
					</VStack>
				</PanelBody>

				<PanelBody title= { __( 'Icon Styling', 'advanced-tabs-block' ) } initialOpen= { false }>
					<VStack spacing= { 3 }>
						<div>
							<p> { __( 'Icon Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { iconColor }
								onChange= { ( value ) => setAttributes( { iconColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Active Icon Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { iconActiveColor }
								onChange= { ( value ) => setAttributes( { iconActiveColor: value } ) }
							/>
						</div>
						<RangeControl
							label= { __( 'Icon Size', 'advanced-tabs-block' ) }
							value= { iconSize }
							onChange= { ( value ) => setAttributes( { iconSize: value } ) }
							min= { 12 }
							max= { 48 }
						/>
					</VStack>
				</PanelBody>

				<PanelBody title= { __( 'Content Styling', 'advanced-tabs-block' ) } initialOpen= { false }>
					<VStack spacing= { 3 }>
						<div>
							<p> { __( 'Text Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { contentColor }
								onChange= { ( value ) => setAttributes( { contentColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Background Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { contentBgColor }
								onChange= { ( value ) => setAttributes( { contentBgColor: value } ) }
							/>
						</div>
						<div>
							<p> { __( 'Border Color', 'advanced-tabs-block' ) } </p>
							<ColorPalette
								colors= { colors }
								value= { contentBorderColor }
								onChange= { ( value ) => setAttributes( { contentBorderColor: value } ) }
							/>
						</div>
					</VStack>
				</PanelBody>

			</InspectorControls>

			<div { ...blockProps }>
				<style>
					{ `
						.advanced-tabs-block .tab-title {
							${titleColor ? `color: ${titleColor};` : ''}
							${titleBgColor ? `background-color: ${titleBgColor};` : ''}
							${titleBorderColor ? `border-color: ${titleBorderColor};` : ''}
							text-align: ${titleAlignment};
						}
						.advanced-tabs-block .tab-title.active {
							${titleActiveColor ? `color: ${titleActiveColor};` : ''}
							${titleActiveBgColor ? `background-color: ${titleActiveBgColor};` : ''}
							${titleActiveBorderColor ? `border-color: ${titleActiveBorderColor};` : ''}
						}
						.advanced-tabs-block .tab-title .dashicon {
							${iconColor ? `color: ${iconColor};` : ''}
							font-size: ${iconSize}px;
						}
						.advanced-tabs-block .tab-title.active .dashicon {
							${iconActiveColor ? `color: ${iconActiveColor};` : ''}
						}
						.advanced-tabs-block .tab-content {
							${contentColor ? `color: ${contentColor};` : ''}
							${contentBgColor ? `background-color: ${contentBgColor};` : ''}
							${contentBorderColor ? `border-color: ${contentBorderColor};` : ''}
						}
						` }
				</style>
				<div className = "tabs-header">
					{ safeTabs.map(
						( tab, index ) => (
						<div
							key= { `tab-header-${tab.id}` }
							className= { `tab-title ${index === activeTab ? 'active' : ''}` }
							onClick= { () => setActiveTab( index ) }
							role = "button"
							tabIndex= { 0 }
						>
							{ tab.icon && <Dashicon icon= { tab.icon } className = "dashicon" /> }
							<span> { tab.title } </span>
						</div>
						)
					) }
				</div>
				<div className = "tab-content">
					{ safeTabs[ activeTab ] && (
						<div className = "tab-content-inner">
							{ safeTabs[ activeTab ].imageUrl && (
								<div className = "tab-image">
									<img src= { safeTabs[ activeTab ].imageUrl } alt= { safeTabs[ activeTab ].title } />
								</div>
							) }
							<div className = "tab-text">
								<RichText
									key= { `richtext-${safeTabs[ activeTab ].id}` }
									tagName = "div"
									value= { safeTabs[ activeTab ].content }
									onChange= { ( value ) => updateTab( activeTab, 'content', value ) }
									placeholder= { __( 'Add content...', 'advanced-tabs-block' ) }
								/>
							</div>
						</div>
					) }
				</div>
			</div>
		</>
	);
}