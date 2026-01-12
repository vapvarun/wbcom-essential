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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

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
 * @param {Object}   props               Block props.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Function to set block attributes.
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		menuId,
		menuLayout,
		menuAlign,
		verticalMenuWidth,
		mobileBreakpoint,
		showMobileToggle,
		mobileToggleText,
		mobileToggleAlign,
		dropdownIcon,
		mainMenuBackground,
		mainMenuTransitionDuration,
		mainMenuIcon,
		mainMenuIconSize,
		mainMenuItemColor,
		mainMenuItemBg,
		mainMenuItemColorHover,
		mainMenuItemBgHover,
		mainMenuItemColorActive,
		mainMenuItemBgActive,
		subMenuBg,
		subMenuItemColor,
		subMenuItemBg,
		subMenuItemColorHover,
		subMenuItemBgHover,
		subMenuItemColorActive,
		subMenuItemBgActive,
		mobileMenuColor,
		mobileMenuBackground,
		mobileMenuWidth,
		collapsibleBehavior,
		submenuAnimation,
		submenuMinWidth,
		submenuMaxWidth,
		submenuOffsetX,
		submenuOffsetY,
		submenuLevel2OffsetX,
		submenuLevel2OffsetY,
		submenuTransitionDuration,
		submenuIndicatorIcon,
		submenuIndicatorIconSize,
	} = attributes;

	const [ menus, setMenus ] = useState( [] );

	const blockProps = useBlockProps();

	// Fetch available menus
	useEffect( () => {
		wp.apiFetch( { path: '/wp/v2/menus' } ).then( ( fetchedMenus ) => {
			const menuOptions = fetchedMenus.map( ( menu ) => ( {
				label: menu.name,
				value: menu.id,
			} ) );
			setMenus( menuOptions );

			// Set first menu as default if none selected
			if ( ! menuId && menuOptions.length > 0 ) {
				setAttributes( { menuId: menuOptions[ 0 ].value } );
			}
		} );
	}, [ menuId, setAttributes ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Menu Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Select Menu', 'wbcom-essential' ) }
						value={ menuId }
						options={ [
							{
								label: __(
									'Select a menu…',
									'wbcom-essential'
								),
								value: 0,
							},
							...menus,
						] }
						onChange={ ( value ) =>
							setAttributes( { menuId: parseInt( value ) } )
						}
					/>

					<SelectControl
						label={ __( 'Menu Layout', 'wbcom-essential' ) }
						value={ menuLayout }
						options={ [
							{
								label: __( 'Horizontal', 'wbcom-essential' ),
								value: 'horizontal',
							},
							{
								label: __(
									'Horizontal Justified',
									'wbcom-essential'
								),
								value: 'horizontal-justified',
							},
							{
								label: __( 'Vertical', 'wbcom-essential' ),
								value: 'vertical',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { menuLayout: value } )
						}
					/>

					{ ( menuLayout === 'horizontal' ||
						menuLayout === 'vertical' ) && (
						<SelectControl
							label={ __(
								'Horizontal Alignment',
								'wbcom-essential'
							) }
							value={ menuAlign }
							options={ [
								{
									label: __( 'Start', 'wbcom-essential' ),
									value: 'flex-start',
								},
								{
									label: __( 'Center', 'wbcom-essential' ),
									value: 'center',
								},
								{
									label: __( 'End', 'wbcom-essential' ),
									value: 'flex-end',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { menuAlign: value } )
							}
						/>
					) }

					{ menuLayout === 'vertical' && (
						<TextControl
							label={ __(
								'Vertical Menu Width',
								'wbcom-essential'
							) }
							value={ verticalMenuWidth }
							onChange={ ( value ) =>
								setAttributes( { verticalMenuWidth: value } )
							}
							help={ __(
								'e.g., 250px, 30%, 15em',
								'wbcom-essential'
							) }
						/>
					) }

					<SelectControl
						label={ __( 'Dropdown Icon', 'wbcom-essential' ) }
						value={ dropdownIcon }
						options={ [
							{
								label: __( 'Chevron', 'wbcom-essential' ),
								value: 'chevron-down',
							},
							{
								label: __( 'Caret', 'wbcom-essential' ),
								value: 'caret-down',
							},
							{
								label: __( 'Plus', 'wbcom-essential' ),
								value: 'plus',
							},
							{
								label: __( 'Arrow', 'wbcom-essential' ),
								value: 'arrow-down',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { dropdownIcon: value } )
						}
					/>

					<SelectControl
						label={ __( 'Collapsible Behavior', 'wbcom-essential' ) }
						value={ collapsibleBehavior }
						options={ [
							{
								label: __( 'Default', 'wbcom-essential' ),
								value: 'default',
							},
							{
								label: __( 'Toggle', 'wbcom-essential' ),
								value: 'toggle',
							},
							{
								label: __( 'Link', 'wbcom-essential' ),
								value: 'link',
							},
							{
								label: __( 'Accordion', 'wbcom-essential' ),
								value: 'accordion',
							},
							{
								label: __( 'Accordion Toggle', 'wbcom-essential' ),
								value: 'accordion-toggle',
							},
							{
								label: __( 'Accordion Link', 'wbcom-essential' ),
								value: 'accordion-link',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { collapsibleBehavior: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Mobile Settings', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Mobile Breakpoint (px)',
							'wbcom-essential'
						) }
						value={ mobileBreakpoint }
						onChange={ ( value ) =>
							setAttributes( { mobileBreakpoint: value } )
						}
						min={ 320 }
						max={ 1920 }
						step={ 1 }
					/>

					<ToggleControl
						label={ __( 'Show Mobile Toggle', 'wbcom-essential' ) }
						checked={ showMobileToggle }
						onChange={ ( value ) =>
							setAttributes( { showMobileToggle: value } )
						}
					/>

					{ showMobileToggle && (
						<>
							<TextControl
								label={ __(
									'Mobile Toggle Text',
									'wbcom-essential'
								) }
								value={ mobileToggleText }
								onChange={ ( value ) =>
									setAttributes( { mobileToggleText: value } )
								}
							/>

							<SelectControl
								label={ __(
									'Mobile Toggle Alignment',
									'wbcom-essential'
								) }
								value={ mobileToggleAlign }
								options={ [
									{
										label: __( 'Start', 'wbcom-essential' ),
										value: 'flex-start',
									},
									{
										label: __(
											'Center',
											'wbcom-essential'
										),
										value: 'center',
									},
									{
										label: __( 'End', 'wbcom-essential' ),
										value: 'flex-end',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										mobileToggleAlign: value,
									} )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Menu Container', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme palette.', 'wbcom-essential' )
							: __( 'Enable to use theme colors instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<TextControl
							label={ __( 'Background Color', 'wbcom-essential' ) }
							value={ mainMenuBackground?.color || '' }
							onChange={ ( value ) =>
								setAttributes( {
									mainMenuBackground: {
										...mainMenuBackground,
										color: value,
									},
								} )
							}
							type="color"
						/>
					) }
					<RangeControl
						label={ __(
							'Transition Duration (ms)',
							'wbcom-essential'
						) }
						value={ mainMenuTransitionDuration * 1000 }
						onChange={ ( value ) =>
							setAttributes( {
								mainMenuTransitionDuration: value / 1000,
							} )
						}
						min={ 0 }
						max={ 10000 }
						step={ 100 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Main Menu Items', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Dropdown Menu Icon', 'wbcom-essential' ) }
						value={ mainMenuIcon }
						options={ [
							{
								label: __( 'Caret', 'wbcom-essential' ),
								value: 'caret',
							},
							{
								label: __( 'Caret-Square', 'wbcom-essential' ),
								value: 'caret-square',
							},
							{
								label: __( 'Chevron', 'wbcom-essential' ),
								value: 'chevron',
							},
							{
								label: __(
									'Chevron-Circle',
									'wbcom-essential'
								),
								value: 'chevron-circle',
							},
							{
								label: __( 'Plus', 'wbcom-essential' ),
								value: 'plus',
							},
							{
								label: __( 'Plus-Circle', 'wbcom-essential' ),
								value: 'plus-circle',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { mainMenuIcon: value } )
						}
					/>
					<RangeControl
						label={ __(
							'Dropdown Menu Icon Size',
							'wbcom-essential'
						) }
						value={ mainMenuIconSize }
						onChange={ ( value ) =>
							setAttributes( { mainMenuIconSize: value } )
						}
						min={ 8 }
						max={ 50 }
						step={ 1 }
					/>
					{ ! useThemeColors && (
						<>
							<PanelBody
								title={ __( 'Normal', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ mainMenuItemColor }
									onChange={ ( value ) =>
										setAttributes( { mainMenuItemColor: value } )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ mainMenuItemBg }
									onChange={ ( value ) =>
										setAttributes( { mainMenuItemBg: value } )
									}
									type="color"
								/>
							</PanelBody>
							<PanelBody
								title={ __( 'Hover', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ mainMenuItemColorHover }
									onChange={ ( value ) =>
										setAttributes( {
											mainMenuItemColorHover: value,
										} )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ mainMenuItemBgHover }
									onChange={ ( value ) =>
										setAttributes( { mainMenuItemBgHover: value } )
									}
									type="color"
								/>
							</PanelBody>
							<PanelBody
								title={ __( 'Active', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ mainMenuItemColorActive }
									onChange={ ( value ) =>
										setAttributes( {
											mainMenuItemColorActive: value,
										} )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ mainMenuItemBgActive }
									onChange={ ( value ) =>
										setAttributes( { mainMenuItemBgActive: value } )
									}
									type="color"
								/>
							</PanelBody>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Sub Menus', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Submenu Animation', 'wbcom-essential' ) }
						value={ submenuAnimation }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: '' },
							{ label: __( 'Fade In', 'wbcom-essential' ), value: 'fadeIn' },
							{ label: __( 'Fade In Up', 'wbcom-essential' ), value: 'fadeInUp' },
							{ label: __( 'Fade In Down', 'wbcom-essential' ), value: 'fadeInDown' },
							{ label: __( 'Fade In Left', 'wbcom-essential' ), value: 'fadeInLeft' },
							{ label: __( 'Fade In Right', 'wbcom-essential' ), value: 'fadeInRight' },
							{ label: __( 'Slide In Up', 'wbcom-essential' ), value: 'slideInUp' },
							{ label: __( 'Slide In Down', 'wbcom-essential' ), value: 'slideInDown' },
							{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoomIn' },
							{ label: __( 'Bounce In', 'wbcom-essential' ), value: 'bounceIn' },
						] }
						onChange={ ( value ) =>
							setAttributes( { submenuAnimation: value } )
						}
					/>

					<TextControl
						label={ __( 'Minimum Width', 'wbcom-essential' ) }
						value={ `${ submenuMinWidth?.size || '' }${
							submenuMinWidth?.unit || ''
						}` }
						onChange={ ( value ) => {
							const match = value.match(
								/^(\d+(?:\.\d+)?)(px|%|em|rem)?$/
							);
							if ( match ) {
								setAttributes( {
									submenuMinWidth: {
										size: parseFloat( match[ 1 ] ),
										unit: match[ 2 ] || 'em',
									},
								} );
							}
						} }
						help={ __(
							'e.g., 10em, 200px, 50%',
							'wbcom-essential'
						) }
					/>

					<TextControl
						label={ __( 'Maximum Width', 'wbcom-essential' ) }
						value={ `${ submenuMaxWidth?.size || '' }${
							submenuMaxWidth?.unit || ''
						}` }
						onChange={ ( value ) => {
							const match = value.match(
								/^(\d+(?:\.\d+)?)(px|%|em|rem)?$/
							);
							if ( match ) {
								setAttributes( {
									submenuMaxWidth: {
										size: parseFloat( match[ 1 ] ),
										unit: match[ 2 ] || 'em',
									},
								} );
							}
						} }
						help={ __(
							'e.g., 20em, 400px, 100%',
							'wbcom-essential'
						) }
					/>

					<RangeControl
						label={ __(
							'First-level Offset X (px)',
							'wbcom-essential'
						) }
						value={ submenuOffsetX }
						onChange={ ( value ) =>
							setAttributes( { submenuOffsetX: value } )
						}
						min={ -100 }
						max={ 100 }
						step={ 1 }
					/>

					<RangeControl
						label={ __(
							'First-level Offset Y (px)',
							'wbcom-essential'
						) }
						value={ submenuOffsetY }
						onChange={ ( value ) =>
							setAttributes( { submenuOffsetY: value } )
						}
						min={ -100 }
						max={ 100 }
						step={ 1 }
					/>

					<RangeControl
						label={ __(
							'Second-level Offset X (px)',
							'wbcom-essential'
						) }
						value={ submenuLevel2OffsetX }
						onChange={ ( value ) =>
							setAttributes( { submenuLevel2OffsetX: value } )
						}
						min={ -100 }
						max={ 100 }
						step={ 1 }
					/>

					<RangeControl
						label={ __(
							'Second-level Offset Y (px)',
							'wbcom-essential'
						) }
						value={ submenuLevel2OffsetY }
						onChange={ ( value ) =>
							setAttributes( { submenuLevel2OffsetY: value } )
						}
						min={ -100 }
						max={ 100 }
						step={ 1 }
					/>

					<RangeControl
						label={ __(
							'Transition Duration (ms)',
							'wbcom-essential'
						) }
						value={ submenuTransitionDuration * 1000 }
						onChange={ ( value ) =>
							setAttributes( {
								submenuTransitionDuration: value / 1000,
							} )
						}
						min={ 0 }
						max={ 2000 }
						step={ 100 }
					/>

					{ ! useThemeColors && (
						<TextControl
							label={ __( 'Background Color', 'wbcom-essential' ) }
							value={ subMenuBg }
							onChange={ ( value ) =>
								setAttributes( { subMenuBg: value } )
							}
							type="color"
						/>
					) }

					<SelectControl
						label={ __( 'Submenu Indicator Icon', 'wbcom-essential' ) }
						value={ submenuIndicatorIcon }
						options={ [
							{
								label: __( 'Caret', 'wbcom-essential' ),
								value: 'caret',
							},
							{
								label: __( 'Caret Square', 'wbcom-essential' ),
								value: 'caret-square',
							},
							{
								label: __( 'Chevron', 'wbcom-essential' ),
								value: 'chevron',
							},
							{
								label: __( 'Chevron Circle', 'wbcom-essential' ),
								value: 'chevron-circle',
							},
							{
								label: __( 'Plus', 'wbcom-essential' ),
								value: 'plus',
							},
							{
								label: __( 'Plus Circle', 'wbcom-essential' ),
								value: 'plus-circle',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { submenuIndicatorIcon: value } )
						}
					/>

					<RangeControl
						label={ __(
							'Submenu Indicator Icon Size',
							'wbcom-essential'
						) }
						value={ submenuIndicatorIconSize }
						onChange={ ( value ) =>
							setAttributes( { submenuIndicatorIconSize: value } )
						}
						min={ 8 }
						max={ 50 }
						step={ 1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Sub Menu Items', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ ! useThemeColors && (
						<>
							<PanelBody
								title={ __( 'Normal', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ subMenuItemColor }
									onChange={ ( value ) =>
										setAttributes( { subMenuItemColor: value } )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ subMenuItemBg }
									onChange={ ( value ) =>
										setAttributes( { subMenuItemBg: value } )
									}
									type="color"
								/>
							</PanelBody>
							<PanelBody
								title={ __( 'Hover', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ subMenuItemColorHover }
									onChange={ ( value ) =>
										setAttributes( {
											subMenuItemColorHover: value,
										} )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ subMenuItemBgHover }
									onChange={ ( value ) =>
										setAttributes( { subMenuItemBgHover: value } )
									}
									type="color"
								/>
							</PanelBody>
							<PanelBody
								title={ __( 'Active', 'wbcom-essential' ) }
								initialOpen={ false }
							>
								<TextControl
									label={ __( 'Color', 'wbcom-essential' ) }
									value={ subMenuItemColorActive }
									onChange={ ( value ) =>
										setAttributes( {
											subMenuItemColorActive: value,
										} )
									}
									type="color"
								/>
								<TextControl
									label={ __(
										'Background Color',
										'wbcom-essential'
									) }
									value={ subMenuItemBgActive }
									onChange={ ( value ) =>
										setAttributes( { subMenuItemBgActive: value } )
									}
									type="color"
								/>
							</PanelBody>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Mobile Menu Toggle', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ ! useThemeColors && (
						<>
							<TextControl
								label={ __( 'Color', 'wbcom-essential' ) }
								value={ mobileMenuColor }
								onChange={ ( value ) =>
									setAttributes( { mobileMenuColor: value } )
								}
								type="color"
							/>
							<TextControl
								label={ __( 'Background Color', 'wbcom-essential' ) }
								value={ mobileMenuBackground?.color || '' }
								onChange={ ( value ) =>
									setAttributes( {
										mobileMenuBackground: {
											...mobileMenuBackground,
											color: value,
										},
									} )
								}
								type="color"
							/>
						</>
					) }
					<TextControl
						label={ __( 'Width', 'wbcom-essential' ) }
						value={ `${ mobileMenuWidth?.size || '' }${
							mobileMenuWidth?.unit || ''
						}` }
						onChange={ ( value ) => {
							const match = value.match(
								/^(\d+(?:\.\d+)?)(px|%|em|rem)?$/
							);
							if ( match ) {
								setAttributes( {
									mobileMenuWidth: {
										size: parseFloat( match[ 1 ] ),
										unit: match[ 2 ] || 'px',
									},
								} );
							}
						} }
						help={ __(
							'e.g., 200px, 100%, 15em',
							'wbcom-essential'
						) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ menuId ? (
					<ServerSideRender
						block="wbcom-essential/smart-menu"
						attributes={ attributes }
					/>
				) : (
					<div className="smart-menu-placeholder">
						<p>
							{ __(
								'Please select a menu from the block settings.',
								'wbcom-essential'
							) }
						</p>
					</div>
				) }
			</div>
		</>
	);
}
