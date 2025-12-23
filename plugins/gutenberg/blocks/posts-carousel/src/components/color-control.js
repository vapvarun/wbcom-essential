/**
 * Color Control Component
 *
 * @package wbcom-essential
 */

import { BaseControl, ColorPalette } from '@wordpress/components';

const COLORS = [
	{ name: 'White', color: '#ffffff' },
	{ name: 'Black', color: '#000000' },
	{ name: 'Gray 100', color: '#f7fafc' },
	{ name: 'Gray 200', color: '#edf2f7' },
	{ name: 'Gray 400', color: '#a0aec0' },
	{ name: 'Gray 600', color: '#718096' },
	{ name: 'Gray 800', color: '#2d3748' },
	{ name: 'Blue', color: '#3182ce' },
	{ name: 'Teal', color: '#319795' },
	{ name: 'Green', color: '#38a169' },
	{ name: 'Red', color: '#e53e3e' },
	{ name: 'Orange', color: '#dd6b20' },
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
