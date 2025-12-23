/**
 * Color Control Component
 *
 * @package wbcom-essential
 */

import { ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ColorControl = ( { label, value, onChange } ) => {
	return (
		<div className="wbcom-color-control">
			<p className="wbcom-color-control__label">{ label }</p>
			<ColorPalette
				value={ value }
				onChange={ onChange }
				clearable={ true }
			/>
		</div>
	);
};

export default ColorControl;
