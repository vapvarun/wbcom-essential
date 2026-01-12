/**
 * Header Bar Block - Editor
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
	Placeholder,
	Spinner,
	TextControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ColorControl from './components/color-control';
import IconPicker, { RenderIcon } from './components/icon-picker';

const ALIGNMENT_OPTIONS = [
	{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
	{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
	{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		alignment,
		showProfileDropdown,
		profileMenu,
		showSeparator,
		showSearch,
		showMessages,
		showNotifications,
		showCart,
		showDarkModeToggle,
		spaceBetween,
		iconSize,
		avatarSize,
		avatarBorderRadius,
		separatorColor,
		separatorWidth,
		iconColor,
		searchIcon,
		searchIconColor,
		messagesIcon,
		messagesIconColor,
		notificationsIcon,
		notificationsIconColor,
		cartIcon,
		cartIconColor,
		darkModeIcon,
		darkModeIconColor,
		iconTextShadow,
		counterBgColor,
		counterTextColor,
		counterBoxShadow,
		dropdownBgColor,
		dropdownTextColor,
		dropdownHoverBgColor,
		dropdownHoverTextColor,
		dropdownBorderColor,
		dropdownBorderWidth,
		dropdownBorderRadius,
		dropdownBoxShadow,
		userNameColor,
		userNameHoverColor,
		signInColor,
		signInHoverColor,
		signUpBgColor,
		signUpTextColor,
		signUpHoverBgColor,
		signUpHoverTextColor,
		signUpBorderRadius,
	} = attributes;

	const [ menus, setMenus ] = useState( [] );
	const [ loading, setLoading ] = useState( true );

	// Fetch available menus.
	useEffect( () => {
		apiFetch( { path: '/wbcom-essential/v1/nav-menus' } )
			.then( ( data ) => {
				setMenus( data || [] );
				setLoading( false );
			} )
			.catch( () => {
				setMenus( [] );
				setLoading( false );
			} );
	}, [] );

	// Build inline styles - colors only when NOT using theme colors
	const blockStyle = {
		// Layout dimensions (always applied)
		'--space-between': `${ spaceBetween }px`,
		'--icon-size': `${ iconSize }px`,
		'--avatar-size': `${ avatarSize }px`,
		'--avatar-radius': `${ avatarBorderRadius }%`,
		'--separator-width': separatorWidth ? `${ separatorWidth }px` : undefined,
		'--dropdown-border-width': dropdownBorderWidth ? `${ dropdownBorderWidth }px` : undefined,
		'--dropdown-border-radius': `${ dropdownBorderRadius }px`,
		// Colors - only when NOT using theme colors
		...( ! useThemeColors && {
			'--separator-color': separatorColor || undefined,
			'--icon-color': iconColor || undefined,
			'--search-icon-color': searchIconColor || undefined,
			'--messages-icon-color': messagesIconColor || undefined,
			'--notifications-icon-color': notificationsIconColor || undefined,
			'--cart-icon-color': cartIconColor || undefined,
			'--dark-mode-icon-color': darkModeIconColor || undefined,
			'--icon-text-shadow': iconTextShadow || undefined,
			'--counter-bg': counterBgColor || undefined,
			'--counter-text': counterTextColor || undefined,
			'--counter-shadow': counterBoxShadow || undefined,
			'--dropdown-bg': dropdownBgColor || undefined,
			'--dropdown-text': dropdownTextColor || undefined,
			'--dropdown-hover-bg': dropdownHoverBgColor || undefined,
			'--dropdown-hover-text': dropdownHoverTextColor || undefined,
			'--dropdown-border-color': dropdownBorderColor || undefined,
			'--dropdown-shadow': dropdownBoxShadow || undefined,
			'--user-name-color': userNameColor || undefined,
			'--user-name-hover-color': userNameHoverColor || undefined,
		} ),
	};

	const blockProps = useBlockProps( {
		className: `wbcom-essential-header-bar wbcom-header-bar-align-${ alignment }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: blockStyle,
	} );

	const menuOptions = [
		{ label: __( 'Select a menu', 'wbcom-essential' ), value: '' },
		...menus,
	];

	// Render icon with fallback to dashicon.
	const renderIconPreview = ( customIcon, dashiconClass, color ) => {
		const style = color ? { color } : {};
		if ( customIcon ) {
			return (
				<span className="wbcom-header-bar-icon wbcom-header-bar-custom-icon" style={ style }>
					<RenderIcon name={ customIcon } size={ iconSize } />
				</span>
			);
		}
		return (
			<span
				className={ `wbcom-header-bar-icon dashicons ${ dashiconClass }` }
				style={ style }
			></span>
		);
	};

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ALIGNMENT_OPTIONS.map( ( option ) => (
						<ToolbarButton
							key={ option.value }
							icon={
								option.value === 'left'
									? 'align-left'
									: option.value === 'center'
									? 'align-center'
									: 'align-right'
							}
							isActive={ alignment === option.value }
							onClick={ () =>
								setAttributes( { alignment: option.value } )
							}
							label={ option.label }
						/>
					) ) }
				</ToolbarGroup>
			</BlockControls>

			<InspectorControls>
				{ /* Content Settings Panel */ }
				<PanelBody
					title={ __( 'Content Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<ToggleControl
						label={ __( 'Profile Dropdown', 'wbcom-essential' ) }
						checked={ showProfileDropdown }
						onChange={ ( value ) =>
							setAttributes( { showProfileDropdown: value } )
						}
						help={ __(
							'Show user avatar and profile dropdown menu',
							'wbcom-essential'
						) }
					/>

					{ showProfileDropdown && (
						<SelectControl
							label={ __( 'Profile Menu', 'wbcom-essential' ) }
							value={ profileMenu }
							options={ menuOptions }
							onChange={ ( value ) =>
								setAttributes( { profileMenu: value } )
							}
							help={ __(
								'Select a menu to show in the dropdown',
								'wbcom-essential'
							) }
						/>
					) }

					<ToggleControl
						label={ __( 'Show Separator', 'wbcom-essential' ) }
						checked={ showSeparator }
						onChange={ ( value ) =>
							setAttributes( { showSeparator: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Search', 'wbcom-essential' ) }
						checked={ showSearch }
						onChange={ ( value ) =>
							setAttributes( { showSearch: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Messages', 'wbcom-essential' ) }
						checked={ showMessages }
						onChange={ ( value ) =>
							setAttributes( { showMessages: value } )
						}
						help={ __(
							'Requires BuddyPress Messages component',
							'wbcom-essential'
						) }
					/>

					<ToggleControl
						label={ __( 'Show Notifications', 'wbcom-essential' ) }
						checked={ showNotifications }
						onChange={ ( value ) =>
							setAttributes( { showNotifications: value } )
						}
						help={ __(
							'Requires BuddyPress Notifications component',
							'wbcom-essential'
						) }
					/>

					<ToggleControl
						label={ __( 'Show Cart', 'wbcom-essential' ) }
						checked={ showCart }
						onChange={ ( value ) =>
							setAttributes( { showCart: value } )
						}
						help={ __(
							'Requires WooCommerce',
							'wbcom-essential'
						) }
					/>

					<ToggleControl
						label={ __( 'Show Dark Mode Toggle', 'wbcom-essential' ) }
						checked={ showDarkModeToggle }
						onChange={ ( value ) =>
							setAttributes( { showDarkModeToggle: value } )
						}
						help={ __(
							'Show dark/light mode toggle button',
							'wbcom-essential'
						) }
					/>
				</PanelBody>

				{ /* Icons Selection Panel */ }
				<PanelBody
					title={ __( 'Icon Selection', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ showSearch && (
						<IconPicker
							label={ __( 'Search Icon', 'wbcom-essential' ) }
							value={ searchIcon }
							onChange={ ( value ) =>
								setAttributes( { searchIcon: value } )
							}
							help={ __( 'Replace default search icon', 'wbcom-essential' ) }
						/>
					) }

					{ showMessages && (
						<IconPicker
							label={ __( 'Messages Icon', 'wbcom-essential' ) }
							value={ messagesIcon }
							onChange={ ( value ) =>
								setAttributes( { messagesIcon: value } )
							}
							help={ __( 'Replace default messages icon', 'wbcom-essential' ) }
						/>
					) }

					{ showNotifications && (
						<IconPicker
							label={ __( 'Notifications Icon', 'wbcom-essential' ) }
							value={ notificationsIcon }
							onChange={ ( value ) =>
								setAttributes( { notificationsIcon: value } )
							}
							help={ __( 'Replace default notifications icon', 'wbcom-essential' ) }
						/>
					) }

					{ showCart && (
						<IconPicker
							label={ __( 'Cart Icon', 'wbcom-essential' ) }
							value={ cartIcon }
							onChange={ ( value ) =>
								setAttributes( { cartIcon: value } )
							}
							help={ __( 'Replace default cart icon', 'wbcom-essential' ) }
						/>
					) }

					{ showDarkModeToggle && (
						<IconPicker
							label={ __( 'Dark Mode Icon', 'wbcom-essential' ) }
							value={ darkModeIcon }
							onChange={ ( value ) =>
								setAttributes( { darkModeIcon: value } )
							}
							help={ __( 'Replace default dark mode icon', 'wbcom-essential' ) }
						/>
					) }
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ ALIGNMENT_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>

					<RangeControl
						label={ __( 'Space Between', 'wbcom-essential' ) }
						value={ spaceBetween }
						onChange={ ( value ) =>
							setAttributes( { spaceBetween: value } )
						}
						min={ 5 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) =>
							setAttributes( { iconSize: value } )
						}
						min={ 15 }
						max={ 40 }
					/>

					<RangeControl
						label={ __( 'Avatar Size', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) =>
							setAttributes( { avatarSize: value } )
						}
						min={ 25 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Avatar Border Radius', 'wbcom-essential' ) }
						value={ avatarBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { avatarBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Separator Width', 'wbcom-essential' ) }
						value={ separatorWidth }
						onChange={ ( value ) =>
							setAttributes( { separatorWidth: value } )
						}
						min={ 1 }
						max={ 10 }
					/>
				</PanelBody>

				{ /* Theme Colors Panel */ }
				<PanelBody
					title={ __( 'Theme Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
				</PanelBody>

				{ /* Icon Colors Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Icon Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'All Icons Color', 'wbcom-essential' ) }
						value={ iconColor }
						onChange={ ( value ) =>
							setAttributes( { iconColor: value } )
						}
					/>

					{ showSearch && (
						<ColorControl
							label={ __( 'Search Icon Color', 'wbcom-essential' ) }
							value={ searchIconColor }
							onChange={ ( value ) =>
								setAttributes( { searchIconColor: value } )
							}
						/>
					) }

					{ showMessages && (
						<ColorControl
							label={ __( 'Messages Icon Color', 'wbcom-essential' ) }
							value={ messagesIconColor }
							onChange={ ( value ) =>
								setAttributes( { messagesIconColor: value } )
							}
						/>
					) }

					{ showNotifications && (
						<ColorControl
							label={ __( 'Notifications Icon Color', 'wbcom-essential' ) }
							value={ notificationsIconColor }
							onChange={ ( value ) =>
								setAttributes( { notificationsIconColor: value } )
							}
						/>
					) }

					{ showCart && (
						<ColorControl
							label={ __( 'Cart Icon Color', 'wbcom-essential' ) }
							value={ cartIconColor }
							onChange={ ( value ) =>
								setAttributes( { cartIconColor: value } )
							}
						/>
					) }

					{ showDarkModeToggle && (
						<ColorControl
							label={ __( 'Dark Mode Icon Color', 'wbcom-essential' ) }
							value={ darkModeIconColor }
							onChange={ ( value ) =>
								setAttributes( { darkModeIconColor: value } )
							}
						/>
					) }

					<TextControl
						label={ __( 'Icon Text Shadow', 'wbcom-essential' ) }
						value={ iconTextShadow }
						onChange={ ( value ) =>
							setAttributes( { iconTextShadow: value } )
						}
						help={ __( 'Example: 1px 1px 2px rgba(0,0,0,0.3)', 'wbcom-essential' ) }
						placeholder="1px 1px 2px rgba(0,0,0,0.3)"
					/>
				</PanelBody>
				) }

				{ /* Counter Style Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Counter Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Counter Background', 'wbcom-essential' ) }
						value={ counterBgColor }
						onChange={ ( value ) =>
							setAttributes( { counterBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Counter Text Color', 'wbcom-essential' ) }
						value={ counterTextColor }
						onChange={ ( value ) =>
							setAttributes( { counterTextColor: value } )
						}
					/>

					<TextControl
						label={ __( 'Counter Box Shadow', 'wbcom-essential' ) }
						value={ counterBoxShadow }
						onChange={ ( value ) =>
							setAttributes( { counterBoxShadow: value } )
						}
						help={ __( 'Example: 0 2px 4px rgba(0,0,0,0.2)', 'wbcom-essential' ) }
						placeholder="0 2px 4px rgba(0,0,0,0.2)"
					/>
				</PanelBody>
				) }

				{ /* Dropdown Style Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Dropdown Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ dropdownBgColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ dropdownTextColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownTextColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Hover Background', 'wbcom-essential' ) }
						value={ dropdownHoverBgColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownHoverBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Hover Text Color', 'wbcom-essential' ) }
						value={ dropdownHoverTextColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownHoverTextColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ dropdownBorderColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownBorderColor: value } )
						}
					/>

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ dropdownBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { dropdownBorderWidth: value } )
						}
						min={ 0 }
						max={ 5 }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ dropdownBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { dropdownBorderRadius: value } )
						}
						min={ 0 }
						max={ 20 }
					/>

					<TextControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						value={ dropdownBoxShadow }
						onChange={ ( value ) =>
							setAttributes( { dropdownBoxShadow: value } )
						}
						help={ __( 'Example: 0 4px 20px rgba(0,0,0,0.15)', 'wbcom-essential' ) }
						placeholder="0 4px 20px rgba(0,0,0,0.15)"
					/>
				</PanelBody>
				) }

				{ /* Separator Style Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Separator', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Separator Color', 'wbcom-essential' ) }
						value={ separatorColor }
						onChange={ ( value ) =>
							setAttributes( { separatorColor: value } )
						}
					/>
				</PanelBody>
				) }

				{ /* Profile Dropdown Style Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Profile Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'User Name Color', 'wbcom-essential' ) }
						value={ userNameColor }
						onChange={ ( value ) =>
							setAttributes( { userNameColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'User Name Hover Color', 'wbcom-essential' ) }
						value={ userNameHoverColor }
						onChange={ ( value ) =>
							setAttributes( { userNameHoverColor: value } )
						}
					/>
				</PanelBody>
				) }

				{ /* Logged Out State Panel - only show when NOT using theme colors */ }
				{ ! useThemeColors && (
				<PanelBody
					title={ __( 'Logged Out State', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Sign In Color', 'wbcom-essential' ) }
						value={ signInColor }
						onChange={ ( value ) =>
							setAttributes( { signInColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Sign In Hover Color', 'wbcom-essential' ) }
						value={ signInHoverColor }
						onChange={ ( value ) =>
							setAttributes( { signInHoverColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Sign Up Background', 'wbcom-essential' ) }
						value={ signUpBgColor }
						onChange={ ( value ) =>
							setAttributes( { signUpBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Sign Up Text Color', 'wbcom-essential' ) }
						value={ signUpTextColor }
						onChange={ ( value ) =>
							setAttributes( { signUpTextColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Sign Up Hover Background', 'wbcom-essential' ) }
						value={ signUpHoverBgColor }
						onChange={ ( value ) =>
							setAttributes( { signUpHoverBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Sign Up Hover Text Color', 'wbcom-essential' ) }
						value={ signUpHoverTextColor }
						onChange={ ( value ) =>
							setAttributes( { signUpHoverTextColor: value } )
						}
					/>

					<RangeControl
						label={ __( 'Sign Up Border Radius', 'wbcom-essential' ) }
						value={ signUpBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { signUpBorderRadius: value } )
						}
						min={ 0 }
						max={ 25 }
					/>
				</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				{ loading ? (
					<Placeholder
						icon="menu-alt3"
						label={ __( 'Header Bar', 'wbcom-essential' ) }
					>
						<Spinner />
					</Placeholder>
				) : (
					<div className="wbcom-header-bar-preview">
						<div className="wbcom-header-bar-inner">
							{ showProfileDropdown && (
								<div className="wbcom-header-bar-profile">
									<span className="wbcom-profile-name">
										{ __( 'User Name', 'wbcom-essential' ) }
									</span>
									<span className="wbcom-profile-avatar"></span>
								</div>
							) }

							{ showSeparator && showProfileDropdown && (
								<span className="wbcom-header-bar-separator"></span>
							) }

							{ showSearch && (
								renderIconPreview( searchIcon, 'dashicons-search', searchIconColor || iconColor )
							) }

							{ showMessages && (
								<span className="wbcom-header-bar-icon-wrapper">
									{ renderIconPreview( messagesIcon, 'dashicons-email', messagesIconColor || iconColor ) }
									<span className="wbcom-header-bar-count">3</span>
								</span>
							) }

							{ showNotifications && (
								<span className="wbcom-header-bar-icon-wrapper">
									{ renderIconPreview( notificationsIcon, 'dashicons-bell', notificationsIconColor || iconColor ) }
									<span className="wbcom-header-bar-count">5</span>
								</span>
							) }

							{ showCart && (
								<span className="wbcom-header-bar-icon-wrapper">
									{ renderIconPreview( cartIcon, 'dashicons-cart', cartIconColor || iconColor ) }
									<span className="wbcom-header-bar-count">2</span>
								</span>
							) }

							{ showDarkModeToggle && (
								renderIconPreview( darkModeIcon, 'dashicons-lightbulb', darkModeIconColor || iconColor )
							) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}
