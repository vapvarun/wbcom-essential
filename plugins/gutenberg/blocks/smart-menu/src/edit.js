
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
import { PanelBody, SelectControl, ToggleControl, TextControl, RangeControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
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
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		menuId,
		menuLayout,
		menuAlign,
		verticalMenuWidth,
		mobileBreakpoint,
		showMobileToggle,
		mobileToggleText,
		mobileToggleAlign,
		collapsibleBehavior,
		dropdownIcon,
		subMenuAnimation,
		mainMenuSubOffsetX,
		mainMenuSubOffsetY,
		subMenusSubOffsetX,
		subMenusSubOffsetY,
		rtlSubMenus
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
	}, [] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Menu Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Select Menu', 'wbcom-essential' ) }
						value={ menuId }
						options={ [
							{ label: __( 'Select a menu...', 'wbcom-essential' ), value: 0 },
							...menus,
						] }
						onChange={ ( value ) => setAttributes( { menuId: parseInt( value ) } ) }
					/>

					<SelectControl
						label={ __( 'Menu Layout', 'wbcom-essential' ) }
						value={ menuLayout }
						options={ [
							{ label: __( 'Horizontal', 'wbcom-essential' ), value: 'horizontal' },
							{ label: __( 'Horizontal Justified', 'wbcom-essential' ), value: 'horizontal-justified' },
							{ label: __( 'Vertical', 'wbcom-essential' ), value: 'vertical' },
						] }
						onChange={ ( value ) => setAttributes( { menuLayout: value } ) }
					/>

					{ ( menuLayout === 'horizontal' || menuLayout === 'vertical' ) && (
						<ToggleGroupControl
							label={ __( 'Horizontal Alignment', 'wbcom-essential' ) }
							value={ menuAlign }
							onChange={ ( value ) => setAttributes( { menuAlign: value } ) }
							isBlock
						>
							<ToggleGroupControlOption value="flex-start" label={ __( 'Start', 'wbcom-essential' ) } />
							<ToggleGroupControlOption value="center" label={ __( 'Center', 'wbcom-essential' ) } />
							<ToggleGroupControlOption value="flex-end" label={ __( 'End', 'wbcom-essential' ) } />
						</ToggleGroupControl>
					) }

					{ menuLayout === 'vertical' && (
						<TextControl
							label={ __( 'Vertical Menu Width', 'wbcom-essential' ) }
							value={ verticalMenuWidth }
							onChange={ ( value ) => setAttributes( { verticalMenuWidth: value } ) }
							help={ __( 'e.g., 250px, 30%, 15em', 'wbcom-essential' ) }
						/>
					) }

					<SelectControl
						label={ __( 'Collapsible Behavior', 'wbcom-essential' ) }
						value={ collapsibleBehavior }
						options={ [
							{ label: __( 'Default', 'wbcom-essential' ), value: 'default' },
							{ label: __( 'Toggle', 'wbcom-essential' ), value: 'toggle' },
							{ label: __( 'Link', 'wbcom-essential' ), value: 'link' },
							{ label: __( 'Accordion', 'wbcom-essential' ), value: 'accordion' },
							{ label: __( 'Accordion Toggle', 'wbcom-essential' ), value: 'accordion-toggle' },
							{ label: __( 'Accordion Link', 'wbcom-essential' ), value: 'accordion-link' },
						] }
						onChange={ ( value ) => setAttributes( { collapsibleBehavior: value } ) }
					/>

					<SelectControl
						label={ __( 'Dropdown Icon', 'wbcom-essential' ) }
						value={ dropdownIcon }
						options={ [
							{ label: __( 'Chevron', 'wbcom-essential' ), value: 'chevron-down' },
							{ label: __( 'Caret', 'wbcom-essential' ), value: 'caret-down' },
							{ label: __( 'Plus', 'wbcom-essential' ), value: 'plus' },
							{ label: __( 'Arrow', 'wbcom-essential' ), value: 'arrow-down' },
						] }
						onChange={ ( value ) => setAttributes( { dropdownIcon: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Mobile Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Mobile Breakpoint (px)', 'wbcom-essential' ) }
						value={ mobileBreakpoint }
						onChange={ ( value ) => setAttributes( { mobileBreakpoint: value } ) }
						min={ 320 }
						max={ 1920 }
						step={ 1 }
					/>

					<ToggleControl
						label={ __( 'Show Mobile Toggle', 'wbcom-essential' ) }
						checked={ showMobileToggle }
						onChange={ ( value ) => setAttributes( { showMobileToggle: value } ) }
					/>

					{ showMobileToggle && (
						<>
							<TextControl
								label={ __( 'Mobile Toggle Text', 'wbcom-essential' ) }
								value={ mobileToggleText }
								onChange={ ( value ) => setAttributes( { mobileToggleText: value } ) }
							/>

							<ToggleGroupControl
								label={ __( 'Mobile Toggle Alignment', 'wbcom-essential' ) }
								value={ mobileToggleAlign }
								onChange={ ( value ) => setAttributes( { mobileToggleAlign: value } ) }
								isBlock
							>
								<ToggleGroupControlOption value="flex-start" label={ __( 'Start', 'wbcom-essential' ) } />
								<ToggleGroupControlOption value="center" label={ __( 'Center', 'wbcom-essential' ) } />
								<ToggleGroupControlOption value="flex-end" label={ __( 'End', 'wbcom-essential' ) } />
							</ToggleGroupControl>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Submenu Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Animation', 'wbcom-essential' ) }
						value={ subMenuAnimation }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Fade In', 'wbcom-essential' ), value: 'fadeIn' },
							{ label: __( 'Slide Down', 'wbcom-essential' ), value: 'slideDown' },
							{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoomIn' },
						] }
						onChange={ ( value ) => setAttributes( { subMenuAnimation: value } ) }
					/>

					<RangeControl
						label={ __( 'First Level Offset X (px)', 'wbcom-essential' ) }
						value={ mainMenuSubOffsetX }
						onChange={ ( value ) => setAttributes( { mainMenuSubOffsetX: value } ) }
						min={ -100 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'First Level Offset Y (px)', 'wbcom-essential' ) }
						value={ mainMenuSubOffsetY }
						onChange={ ( value ) => setAttributes( { mainMenuSubOffsetY: value } ) }
						min={ -100 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Second Level Offset X (px)', 'wbcom-essential' ) }
						value={ subMenusSubOffsetX }
						onChange={ ( value ) => setAttributes( { subMenusSubOffsetX: value } ) }
						min={ -100 }
						max={ 100 }
					/>

					<RangeControl
						label={ __( 'Second Level Offset Y (px)', 'wbcom-essential' ) }
						value={ subMenusSubOffsetY }
						onChange={ ( value ) => setAttributes( { subMenusSubOffsetY: value } ) }
						min={ -100 }
						max={ 100 }
					/>

					<ToggleControl
						label={ __( 'Right to Left Submenus', 'wbcom-essential' ) }
						checked={ rtlSubMenus }
						onChange={ ( value ) => setAttributes( { rtlSubMenus: value } ) }
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
						<p>{ __( 'Please select a menu from the block settings.', 'wbcom-essential' ) }</p>
					</div>
				) }
			</div>
		</>
	);
}
