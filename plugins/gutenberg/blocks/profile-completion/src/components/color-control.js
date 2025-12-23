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
	{ name: __( 'Success', 'wbcom-essential' ), color: '#1CD991' },
	{ name: __( 'Danger', 'wbcom-essential' ), color: '#EF3E46' },
	{ name: __( 'Primary', 'wbcom-essential' ), color: '#3182ce' },
	{ name: __( 'Secondary', 'wbcom-essential' ), color: '#718096' },
	{ name: __( 'Warning', 'wbcom-essential' ), color: '#d69e2e' },
	{ name: __( 'Info', 'wbcom-essential' ), color: '#00b5d8' },
	{ name: __( 'Light Gray', 'wbcom-essential' ), color: '#DEDFE2' },
	{ name: __( 'Dark', 'wbcom-essential' ), color: '#122B46' },
	{ name: __( 'Gray', 'wbcom-essential' ), color: '#A3A5A9' },
	{ name: __( 'White', 'wbcom-essential' ), color: '#ffffff' },
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
