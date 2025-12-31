/**
 * Notification Area Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	RangeControl,
	ButtonGroup,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import { desktop, tablet, mobile } from '@wordpress/icons';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		showSearchDesktop,
		showSearchTablet,
		showSearchMobile,
		showCartDesktop,
		showCartTablet,
		showCartMobile,
		showMessagesDesktop,
		showMessagesTablet,
		showMessagesMobile,
		showNotificationsDesktop,
		showNotificationsTablet,
		showNotificationsMobile,
		showAvatarDesktop,
		showAvatarTablet,
		showAvatarMobile,
		showUserName,
		iconColor,
		iconHoverColor,
		userNameColor,
		userNameHoverColor,
		badgeColor,
		badgeTextColor,
		dropdownBgColor,
		dropdownBorderColor,
		dropdownLinkColor,
		dropdownLinkHoverColor,
		dropdownLinkHoverBg,
		iconSize,
		avatarSize,
		itemGap,
		lineHeight,
		counterTopSpace,
	} = attributes;

	// Current preview device.
	const [ previewDevice, setPreviewDevice ] = useState( 'desktop' );

	// Preview styles.
	const containerStyle = {
		'--icon-color': iconColor,
		'--icon-hover-color': iconHoverColor,
		'--username-color': userNameColor,
		'--username-hover-color': userNameHoverColor,
		'--badge-color': badgeColor,
		'--badge-text-color': badgeTextColor,
		'--dropdown-bg-color': dropdownBgColor,
		'--dropdown-border-color': dropdownBorderColor,
		'--dropdown-link-color': dropdownLinkColor,
		'--dropdown-link-hover-color': dropdownLinkHoverColor,
		'--dropdown-link-hover-bg': dropdownLinkHoverBg,
		'--icon-size': `${ iconSize }px`,
		'--avatar-size': `${ avatarSize }px`,
		'--item-gap': `${ itemGap }px`,
		'--line-height': `${ lineHeight }px`,
		'--counter-top': `${ counterTopSpace }px`,
	};

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-notification-area-editor',
		style: containerStyle,
	} );

	// Get visibility based on current preview device.
	const isSearchVisible = previewDevice === 'desktop' ? showSearchDesktop :
		previewDevice === 'tablet' ? showSearchTablet : showSearchMobile;
	const isCartVisible = previewDevice === 'desktop' ? showCartDesktop :
		previewDevice === 'tablet' ? showCartTablet : showCartMobile;
	const isMessagesVisible = previewDevice === 'desktop' ? showMessagesDesktop :
		previewDevice === 'tablet' ? showMessagesTablet : showMessagesMobile;
	const isNotificationsVisible = previewDevice === 'desktop' ? showNotificationsDesktop :
		previewDevice === 'tablet' ? showNotificationsTablet : showNotificationsMobile;
	const isAvatarVisible = previewDevice === 'desktop' ? showAvatarDesktop :
		previewDevice === 'tablet' ? showAvatarTablet : showAvatarMobile;

	// SVG Icons.
	const SearchIcon = () => (
		<svg viewBox="0 0 24 24" width={ iconSize } height={ iconSize } fill="currentColor">
			<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
		</svg>
	);

	const CartIcon = () => (
		<svg viewBox="0 0 24 24" width={ iconSize } height={ iconSize } fill="currentColor">
			<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	);

	const MessageIcon = () => (
		<svg viewBox="0 0 24 24" width={ iconSize } height={ iconSize } fill="currentColor">
			<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
		</svg>
	);

	const BellIcon = () => (
		<svg viewBox="0 0 24 24" width={ iconSize } height={ iconSize } fill="currentColor">
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
		</svg>
	);

	const UserIcon = () => (
		<svg viewBox="0 0 24 24" width={ iconSize } height={ iconSize } fill="currentColor">
			<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
		</svg>
	);

	// Device visibility control component.
	const DeviceVisibilityControl = ( { label, desktopAttr, tabletAttr, mobileAttr } ) => (
		<div className="wbcom-device-visibility-control">
			<span className="wbcom-device-visibility-label">{ label }</span>
			<div className="wbcom-device-visibility-toggles">
				<Button
					icon={ desktop }
					label={ __( 'Desktop', 'wbcom-essential' ) }
					isPressed={ attributes[ desktopAttr ] }
					onClick={ () => setAttributes( { [ desktopAttr ]: ! attributes[ desktopAttr ] } ) }
					className={ attributes[ desktopAttr ] ? 'is-active' : '' }
				/>
				<Button
					icon={ tablet }
					label={ __( 'Tablet', 'wbcom-essential' ) }
					isPressed={ attributes[ tabletAttr ] }
					onClick={ () => setAttributes( { [ tabletAttr ]: ! attributes[ tabletAttr ] } ) }
					className={ attributes[ tabletAttr ] ? 'is-active' : '' }
				/>
				<Button
					icon={ mobile }
					label={ __( 'Mobile', 'wbcom-essential' ) }
					isPressed={ attributes[ mobileAttr ] }
					onClick={ () => setAttributes( { [ mobileAttr ]: ! attributes[ mobileAttr ] } ) }
					className={ attributes[ mobileAttr ] ? 'is-active' : '' }
				/>
			</div>
		</div>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) }>
					<p className="components-base-control__help" style={ { marginBottom: '16px' } }>
						{ __( 'Toggle visibility per device. Green = visible, gray = hidden.', 'wbcom-essential' ) }
					</p>

					<DeviceVisibilityControl
						label={ __( 'Search Form', 'wbcom-essential' ) }
						desktopAttr="showSearchDesktop"
						tabletAttr="showSearchTablet"
						mobileAttr="showSearchMobile"
					/>

					<DeviceVisibilityControl
						label={ __( 'Cart (WooCommerce)', 'wbcom-essential' ) }
						desktopAttr="showCartDesktop"
						tabletAttr="showCartTablet"
						mobileAttr="showCartMobile"
					/>

					<DeviceVisibilityControl
						label={ __( 'Messages (BuddyPress)', 'wbcom-essential' ) }
						desktopAttr="showMessagesDesktop"
						tabletAttr="showMessagesTablet"
						mobileAttr="showMessagesMobile"
					/>

					<DeviceVisibilityControl
						label={ __( 'Notifications (BuddyPress)', 'wbcom-essential' ) }
						desktopAttr="showNotificationsDesktop"
						tabletAttr="showNotificationsTablet"
						mobileAttr="showNotificationsMobile"
					/>

					<DeviceVisibilityControl
						label={ __( 'User Avatar', 'wbcom-essential' ) }
						desktopAttr="showAvatarDesktop"
						tabletAttr="showAvatarTablet"
						mobileAttr="showAvatarMobile"
					/>

					<Divider />

					<ToggleControl
						label={ __( 'Show User Name', 'wbcom-essential' ) }
						checked={ showUserName }
						onChange={ ( value ) => setAttributes( { showUserName: value } ) }
						help={ __( 'Display user name next to avatar.', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Sizing', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 14 }
						max={ 32 }
					/>
					<RangeControl
						label={ __( 'Avatar Size', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 24 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Item Gap', 'wbcom-essential' ) }
						value={ itemGap }
						onChange={ ( value ) => setAttributes( { itemGap: value } ) }
						min={ 8 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( 'Line Height (px)', 'wbcom-essential' ) }
						value={ lineHeight }
						onChange={ ( value ) => setAttributes( { lineHeight: value } ) }
						min={ 40 }
						max={ 150 }
						help={ __( 'Controls overall height of the notification area.', 'wbcom-essential' ) }
					/>
					<RangeControl
						label={ __( 'Counter Top Space (px)', 'wbcom-essential' ) }
						value={ counterTopSpace }
						onChange={ ( value ) => setAttributes( { counterTopSpace: value } ) }
						min={ 0 }
						max={ 50 }
						help={ __( 'Position of badge counters from top.', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Icon Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Icon Color', 'wbcom-essential' ) }
						value={ iconColor }
						onChange={ ( value ) => setAttributes( { iconColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Icon Hover Color', 'wbcom-essential' ) }
						value={ iconHoverColor }
						onChange={ ( value ) => setAttributes( { iconHoverColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'User Name Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'User Name Color', 'wbcom-essential' ) }
						value={ userNameColor }
						onChange={ ( value ) => setAttributes( { userNameColor: value } ) }
					/>
					<ColorControl
						label={ __( 'User Name Hover Color', 'wbcom-essential' ) }
						value={ userNameHoverColor }
						onChange={ ( value ) => setAttributes( { userNameHoverColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Badge Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Badge Background', 'wbcom-essential' ) }
						value={ badgeColor }
						onChange={ ( value ) => setAttributes( { badgeColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Badge Text Color', 'wbcom-essential' ) }
						value={ badgeTextColor }
						onChange={ ( value ) => setAttributes( { badgeTextColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Dropdown Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ dropdownBgColor }
						onChange={ ( value ) => setAttributes( { dropdownBgColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ dropdownBorderColor }
						onChange={ ( value ) => setAttributes( { dropdownBorderColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Link Color', 'wbcom-essential' ) }
						value={ dropdownLinkColor }
						onChange={ ( value ) => setAttributes( { dropdownLinkColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Link Hover Color', 'wbcom-essential' ) }
						value={ dropdownLinkHoverColor }
						onChange={ ( value ) => setAttributes( { dropdownLinkHoverColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Link Hover Background', 'wbcom-essential' ) }
						value={ dropdownLinkHoverBg }
						onChange={ ( value ) => setAttributes( { dropdownLinkHoverBg: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-notification-area-preview-header">
					<span>{ __( 'Preview Device:', 'wbcom-essential' ) }</span>
					<ButtonGroup>
						<Button
							icon={ desktop }
							label={ __( 'Desktop', 'wbcom-essential' ) }
							isPressed={ previewDevice === 'desktop' }
							onClick={ () => setPreviewDevice( 'desktop' ) }
						/>
						<Button
							icon={ tablet }
							label={ __( 'Tablet', 'wbcom-essential' ) }
							isPressed={ previewDevice === 'tablet' }
							onClick={ () => setPreviewDevice( 'tablet' ) }
						/>
						<Button
							icon={ mobile }
							label={ __( 'Mobile', 'wbcom-essential' ) }
							isPressed={ previewDevice === 'mobile' }
							onClick={ () => setPreviewDevice( 'mobile' ) }
						/>
					</ButtonGroup>
				</div>

				<div className="wbcom-essential-notification-area">
					{ isSearchVisible && (
						<div className="wbcom-essential-na__item wbcom-essential-na__search">
							<SearchIcon />
						</div>
					) }

					{ isCartVisible && (
						<div className="wbcom-essential-na__item wbcom-essential-na__cart">
							<CartIcon />
							<span className="wbcom-essential-na__badge">3</span>
						</div>
					) }

					{ isMessagesVisible && (
						<div className="wbcom-essential-na__item wbcom-essential-na__messages">
							<MessageIcon />
							<span className="wbcom-essential-na__badge">2</span>
						</div>
					) }

					{ isNotificationsVisible && (
						<div className="wbcom-essential-na__item wbcom-essential-na__notifications">
							<BellIcon />
							<span className="wbcom-essential-na__badge">5</span>
						</div>
					) }

					{ isAvatarVisible && (
						<div className="wbcom-essential-na__item wbcom-essential-na__user">
							<div className="wbcom-essential-na__avatar">
								<UserIcon />
							</div>
							{ showUserName && (
								<span className="wbcom-essential-na__username">
									{ __( 'Username', 'wbcom-essential' ) }
								</span>
							) }
						</div>
					) }

					{ ! isSearchVisible && ! isCartVisible && ! isMessagesVisible && ! isNotificationsVisible && ! isAvatarVisible && (
						<p className="wbcom-essential-na__empty">
							{ __( 'All items hidden on this device.', 'wbcom-essential' ) }
						</p>
					) }
				</div>

				<p className="wbcom-notification-area-notice">
					{ __( 'Icons display based on active plugins (WooCommerce, BuddyPress). User menu shows for logged-in users.', 'wbcom-essential' ) }
				</p>
			</div>
		</>
	);
}
