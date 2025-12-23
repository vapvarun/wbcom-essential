/**
 * Color Control Component
 *
 * @package wbcom-essential
 */

import { BaseControl, ColorPalette } from '@wordpress/components';

const COLORS = [
	{ name: 'White', color: '#ffffff' },
	{ name: 'Black', color: '#000000' },
	{ name: 'Overlay Light', color: 'rgba(0, 0, 0, 0.3)' },
	{ name: 'Overlay Medium', color: 'rgba(0, 0, 0, 0.5)' },
	{ name: 'Overlay Dark', color: 'rgba(0, 0, 0, 0.7)' },
	{ name: 'White 90%', color: 'rgba(255, 255, 255, 0.9)' },
	{ name: 'White 80%', color: 'rgba(255, 255, 255, 0.8)' },
	{ name: 'Gray 800', color: '#1a202c' },
	{ name: 'Gray 700', color: '#2d3748' },
	{ name: 'Blue', color: '#3182ce' },
	{ name: 'Teal', color: '#319795' },
	{ name: 'Purple', color: '#805ad5' },
];

export function ColorControl( { label, value, onChange } ) {
	return (
		<BaseControl label={ label }>
			<ColorPalette
				colors={ COLORS }
				value={ value }
				onChange={ onChange }
				clearable={ false }
			/>
		</BaseControl>
	);
}
