/**
 * Icon Picker Component
 *
 * Custom icon picker for selecting icons from a predefined library.
 * Uses React components for safe SVG rendering.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	Button,
	Popover,
	TextControl,
	TabPanel,
} from '@wordpress/components';
import { useState, useMemo } from '@wordpress/element';

/**
 * SVG Icon Components - Safe rendering without dangerouslySetInnerHTML
 */
const IconSvgs = {
	// General icons
	search: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
		</svg>
	),
	'search-alt': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
		</svg>
	),
	menu: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
		</svg>
	),
	close: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
		</svg>
	),
	settings: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
		</svg>
	),
	home: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
		</svg>
	),

	// Communication icons
	email: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
		</svg>
	),
	'email-alt': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" />
		</svg>
	),
	chat: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
		</svg>
	),
	'chat-bubble': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
		</svg>
	),
	message: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
		</svg>
	),
	forum: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z" />
		</svg>
	),

	// Notification icons
	bell: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
		</svg>
	),
	'bell-outline': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
		</svg>
	),
	'bell-ring': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zM7.58 4.08L6.15 2.65C3.75 4.48 2.17 7.3 2.03 10.5h2c.15-2.65 1.51-4.97 3.55-6.42zm12.39 6.42h2c-.15-3.2-1.73-6.02-4.12-7.85l-1.42 1.43c2.02 1.45 3.39 3.77 3.54 6.42z" />
		</svg>
	),
	notification: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
		</svg>
	),

	// Shopping icons
	cart: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	),
	'cart-outline': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M15.55 13c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6zM7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
		</svg>
	),
	bag: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
		</svg>
	),
	basket: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M17.21 9l-4.38-6.56c-.19-.28-.51-.42-.83-.42-.32 0-.64.14-.83.43L6.79 9H2c-.55 0-1 .45-1 1 0 .09.01.18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h13c.92 0 1.69-.62 1.93-1.46l2.54-9.27L23 10c0-.55-.45-1-1-1h-4.79zM9 9l3-4.4L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
		</svg>
	),
	store: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />
		</svg>
	),

	// User icons
	user: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
		</svg>
	),
	'user-circle': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
		</svg>
	),
	users: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
		</svg>
	),
	login: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" />
		</svg>
	),
	logout: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
		</svg>
	),

	// Theme icons
	sun: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
		</svg>
	),
	moon: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z" />
		</svg>
	),
	'dark-mode': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
		</svg>
	),
	'light-mode': ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
		</svg>
	),
	contrast: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86z" />
		</svg>
	),

	// Placeholder/add icon
	add: ( props ) => (
		<svg viewBox="0 0 24 24" fill="currentColor" { ...props }>
			<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
		</svg>
	),
};

// Icon library organized by category.
const ICON_LIBRARY = {
	general: {
		label: __( 'General', 'wbcom-essential' ),
		icons: [
			{ name: 'search', label: __( 'Search', 'wbcom-essential' ) },
			{ name: 'search-alt', label: __( 'Search Alt', 'wbcom-essential' ) },
			{ name: 'menu', label: __( 'Menu', 'wbcom-essential' ) },
			{ name: 'close', label: __( 'Close', 'wbcom-essential' ) },
			{ name: 'settings', label: __( 'Settings', 'wbcom-essential' ) },
			{ name: 'home', label: __( 'Home', 'wbcom-essential' ) },
		],
	},
	communication: {
		label: __( 'Communication', 'wbcom-essential' ),
		icons: [
			{ name: 'email', label: __( 'Email', 'wbcom-essential' ) },
			{ name: 'email-alt', label: __( 'Email Alt', 'wbcom-essential' ) },
			{ name: 'chat', label: __( 'Chat', 'wbcom-essential' ) },
			{ name: 'chat-bubble', label: __( 'Chat Bubble', 'wbcom-essential' ) },
			{ name: 'message', label: __( 'Message', 'wbcom-essential' ) },
			{ name: 'forum', label: __( 'Forum', 'wbcom-essential' ) },
		],
	},
	notifications: {
		label: __( 'Notifications', 'wbcom-essential' ),
		icons: [
			{ name: 'bell', label: __( 'Bell', 'wbcom-essential' ) },
			{ name: 'bell-outline', label: __( 'Bell Outline', 'wbcom-essential' ) },
			{ name: 'bell-ring', label: __( 'Bell Ring', 'wbcom-essential' ) },
			{ name: 'notification', label: __( 'Notification', 'wbcom-essential' ) },
		],
	},
	shopping: {
		label: __( 'Shopping', 'wbcom-essential' ),
		icons: [
			{ name: 'cart', label: __( 'Cart', 'wbcom-essential' ) },
			{ name: 'cart-outline', label: __( 'Cart Outline', 'wbcom-essential' ) },
			{ name: 'bag', label: __( 'Shopping Bag', 'wbcom-essential' ) },
			{ name: 'basket', label: __( 'Basket', 'wbcom-essential' ) },
			{ name: 'store', label: __( 'Store', 'wbcom-essential' ) },
		],
	},
	user: {
		label: __( 'User', 'wbcom-essential' ),
		icons: [
			{ name: 'user', label: __( 'User', 'wbcom-essential' ) },
			{ name: 'user-circle', label: __( 'User Circle', 'wbcom-essential' ) },
			{ name: 'users', label: __( 'Users', 'wbcom-essential' ) },
			{ name: 'login', label: __( 'Login', 'wbcom-essential' ) },
			{ name: 'logout', label: __( 'Logout', 'wbcom-essential' ) },
		],
	},
	theme: {
		label: __( 'Theme', 'wbcom-essential' ),
		icons: [
			{ name: 'sun', label: __( 'Sun', 'wbcom-essential' ) },
			{ name: 'moon', label: __( 'Moon', 'wbcom-essential' ) },
			{ name: 'dark-mode', label: __( 'Dark Mode', 'wbcom-essential' ) },
			{ name: 'light-mode', label: __( 'Light Mode', 'wbcom-essential' ) },
			{ name: 'contrast', label: __( 'Contrast', 'wbcom-essential' ) },
		],
	},
};

// Flatten icons for search.
const getAllIcons = () => {
	const allIcons = [];
	Object.values( ICON_LIBRARY ).forEach( ( category ) => {
		category.icons.forEach( ( icon ) => {
			allIcons.push( { ...icon, category: category.label } );
		} );
	} );
	return allIcons;
};

/**
 * Render Icon Component
 *
 * @param {Object} props      - Component props.
 * @param {string} props.name - Icon name.
 * @param {number} props.size - Icon size.
 */
export function RenderIcon( { name, size = 20 } ) {
	const IconComponent = IconSvgs[ name ];
	if ( ! IconComponent ) {
		return null;
	}
	return <IconComponent width={ size } height={ size } />;
}

/**
 * Icon Picker Component
 *
 * @param {Object}   props          - Component props.
 * @param {string}   props.label    - Control label.
 * @param {string}   props.value    - Selected icon name.
 * @param {Function} props.onChange - Change callback.
 * @param {string}   props.help     - Help text.
 */
export default function IconPicker( { label, value, onChange, help } ) {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ searchTerm, setSearchTerm ] = useState( '' );

	const allIcons = useMemo( () => getAllIcons(), [] );

	const filteredIcons = useMemo( () => {
		if ( ! searchTerm ) {
			return null;
		}
		const term = searchTerm.toLowerCase();
		return allIcons.filter(
			( icon ) =>
				icon.name.toLowerCase().includes( term ) ||
				icon.label.toLowerCase().includes( term ) ||
				icon.category.toLowerCase().includes( term )
		);
	}, [ searchTerm, allIcons ] );

	const handleSelect = ( iconName ) => {
		onChange( iconName );
		setIsOpen( false );
		setSearchTerm( '' );
	};

	const handleClear = () => {
		onChange( '' );
	};

	const renderIconGrid = ( icons ) => (
		<div className="wbcom-icon-picker-grid">
			{ icons.map( ( icon ) => (
				<Button
					key={ icon.name }
					className={ `wbcom-icon-picker-item ${ value === icon.name ? 'is-selected' : '' }` }
					onClick={ () => handleSelect( icon.name ) }
					title={ icon.label }
				>
					<RenderIcon name={ icon.name } size={ 24 } />
				</Button>
			) ) }
		</div>
	);

	const tabs = Object.entries( ICON_LIBRARY ).map( ( [ key, category ] ) => ( {
		name: key,
		title: category.label,
		className: 'wbcom-icon-picker-tab',
	} ) );

	return (
		<BaseControl label={ label } help={ help } className="wbcom-icon-picker-control">
			<div className="wbcom-icon-picker-inner">
				<Button
					className="wbcom-icon-picker-button"
					onClick={ () => setIsOpen( ! isOpen ) }
				>
					{ value && IconSvgs[ value ] ? (
						<>
							<RenderIcon name={ value } size={ 20 } />
							<span className="wbcom-icon-picker-label">
								{ __( 'Change Icon', 'wbcom-essential' ) }
							</span>
						</>
					) : (
						<>
							<span className="wbcom-icon-picker-placeholder">
								<RenderIcon name="add" size={ 20 } />
							</span>
							<span className="wbcom-icon-picker-label">
								{ __( 'Select Icon', 'wbcom-essential' ) }
							</span>
						</>
					) }
				</Button>

				{ value && (
					<Button
						isSmall
						variant="tertiary"
						onClick={ handleClear }
						className="wbcom-icon-picker-clear"
					>
						{ __( 'Clear', 'wbcom-essential' ) }
					</Button>
				) }

				{ isOpen && (
					<Popover
						position="bottom left"
						onClose={ () => {
							setIsOpen( false );
							setSearchTerm( '' );
						} }
						className="wbcom-icon-picker-popover"
					>
						<div className="wbcom-icon-picker-content">
							<TextControl
								placeholder={ __( 'Search icons...', 'wbcom-essential' ) }
								value={ searchTerm }
								onChange={ setSearchTerm }
								className="wbcom-icon-picker-search"
							/>

							{ filteredIcons ? (
								<div className="wbcom-icon-picker-results">
									{ filteredIcons.length > 0 ? (
										renderIconGrid( filteredIcons )
									) : (
										<p className="wbcom-icon-picker-no-results">
											{ __( 'No icons found.', 'wbcom-essential' ) }
										</p>
									) }
								</div>
							) : (
								<TabPanel
									className="wbcom-icon-picker-tabs"
									tabs={ tabs }
								>
									{ ( tab ) => renderIconGrid( ICON_LIBRARY[ tab.name ].icons ) }
								</TabPanel>
							) }
						</div>
					</Popover>
				) }
			</div>
		</BaseControl>
	);
}

// Export the icon components for use in render.
export { IconSvgs };
