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
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ColorControl from './components/color-control';

const ALIGNMENT_OPTIONS = [
	{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
	{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
	{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		alignment,
		showProfileDropdown,
		profileMenu,
		showSeparator,
		showSearch,
		showMessages,
		showNotifications,
		showCart,
		spaceBetween,
		iconSize,
		avatarSize,
		avatarBorderRadius,
		separatorColor,
		iconColor,
		counterBgColor,
		dropdownBgColor,
		dropdownTextColor,
		userNameColor,
		signInColor,
		signUpBgColor,
		signUpTextColor,
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

	const blockProps = useBlockProps( {
		className: `wbcom-essential-header-bar wbcom-header-bar-align-${ alignment }`,
		style: {
			'--space-between': `${ spaceBetween }px`,
			'--icon-size': `${ iconSize }px`,
			'--avatar-size': `${ avatarSize }px`,
			'--avatar-radius': `${ avatarBorderRadius }%`,
			'--separator-color': separatorColor || undefined,
			'--icon-color': iconColor || undefined,
			'--counter-bg': counterBgColor || undefined,
			'--dropdown-bg': dropdownBgColor || undefined,
			'--dropdown-text': dropdownTextColor || undefined,
			'--user-name-color': userNameColor || undefined,
		},
	} );

	const menuOptions = [
		{ label: __( 'Select a menu', 'wbcom-essential' ), value: '' },
		...menus,
	];

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
				</PanelBody>

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
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Icon Color', 'wbcom-essential' ) }
						value={ iconColor }
						onChange={ ( value ) =>
							setAttributes( { iconColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Separator Color', 'wbcom-essential' ) }
						value={ separatorColor }
						onChange={ ( value ) =>
							setAttributes( { separatorColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Counter Background', 'wbcom-essential' ) }
						value={ counterBgColor }
						onChange={ ( value ) =>
							setAttributes( { counterBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'User Name Color', 'wbcom-essential' ) }
						value={ userNameColor }
						onChange={ ( value ) =>
							setAttributes( { userNameColor: value } )
						}
					/>

					<ColorControl
						label={ __(
							'Dropdown Background',
							'wbcom-essential'
						) }
						value={ dropdownBgColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownBgColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Dropdown Text Color', 'wbcom-essential' ) }
						value={ dropdownTextColor }
						onChange={ ( value ) =>
							setAttributes( { dropdownTextColor: value } )
						}
					/>
				</PanelBody>

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
						label={ __(
							'Sign Up Background',
							'wbcom-essential'
						) }
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
				</PanelBody>
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
								<span
									className="wbcom-header-bar-icon dashicons dashicons-search"
									title={ __( 'Search', 'wbcom-essential' ) }
								></span>
							) }

							{ showMessages && (
								<span
									className="wbcom-header-bar-icon dashicons dashicons-email"
									title={ __( 'Messages', 'wbcom-essential' ) }
								>
									<span className="wbcom-header-bar-count">
										3
									</span>
								</span>
							) }

							{ showNotifications && (
								<span
									className="wbcom-header-bar-icon dashicons dashicons-bell"
									title={ __(
										'Notifications',
										'wbcom-essential'
									) }
								>
									<span className="wbcom-header-bar-count">
										5
									</span>
								</span>
							) }

							{ showCart && (
								<span
									className="wbcom-header-bar-icon dashicons dashicons-cart"
									title={ __( 'Cart', 'wbcom-essential' ) }
								>
									<span className="wbcom-header-bar-count">
										2
									</span>
								</span>
							) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}
