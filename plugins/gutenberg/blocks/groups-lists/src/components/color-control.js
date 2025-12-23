/**
 * Color Control Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	ColorPalette,
	Button,
	Popover,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const THEME_COLORS = [
	{ name: __( 'Primary', 'wbcom-essential' ), color: '#1d76da' },
	{ name: __( 'Dark', 'wbcom-essential' ), color: '#303030' },
	{ name: __( 'Gray', 'wbcom-essential' ), color: '#9c9c9c' },
	{ name: __( 'Light Gray', 'wbcom-essential' ), color: '#a3a5a9' },
	{ name: __( 'Border', 'wbcom-essential' ), color: '#e3e3e3' },
	{ name: __( 'White', 'wbcom-essential' ), color: '#ffffff' },
	{ name: __( 'Success', 'wbcom-essential' ), color: '#1CD991' },
	{ name: __( 'Danger', 'wbcom-essential' ), color: '#EF3E46' },
	{ name: __( 'Warning', 'wbcom-essential' ), color: '#d69e2e' },
	{ name: __( 'Info', 'wbcom-essential' ), color: '#00b5d8' },
];

export default function ColorControl( { label, value, onChange } ) {
	const [ isOpen, setIsOpen ] = useState( false );

	return (
		<BaseControl label={ label } className="wbcom-color-control">
			<div className="wbcom-color-control-inner">
				<Button
					className="wbcom-color-indicator"
					onClick={ () => setIsOpen( ! isOpen ) }
					style={ { backgroundColor: value || '#ccc' } }
				/>
				{ value && (
					<Button
						isSmall
						variant="tertiary"
						onClick={ () => onChange( '' ) }
					>
						{ __( 'Clear', 'wbcom-essential' ) }
					</Button>
				) }
				{ isOpen && (
					<Popover
						position="bottom left"
						onClose={ () => setIsOpen( false ) }
					>
						<div style={ { padding: '12px', minWidth: '200px' } }>
							<ColorPalette
								colors={ THEME_COLORS }
								value={ value }
								onChange={ ( color ) => {
									onChange( color );
									setIsOpen( false );
								} }
								clearable={ false }
							/>
						</div>
					</Popover>
				) }
			</div>
		</BaseControl>
	);
}
