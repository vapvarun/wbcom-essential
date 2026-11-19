import { __, sprintf } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { useBlockEditContext } from '@wordpress/block-editor';
import {
	__experimentalNumberControl as NumberControl,
	Button,
	SelectControl,
	Flex,
	FlexItem,
	BaseControl,
} from '@wordpress/components';
import { link, linkOff } from '@wordpress/icons';
import ResponsiveControl from './ResponsiveControl';
import { useResponsiveValue } from '../hooks/useResponsiveValue';

const SIDES = [
	{ key: 'top', label: __( 'Top', 'wbcom-essential' ) },
	{ key: 'right', label: __( 'Right', 'wbcom-essential' ) },
	{ key: 'bottom', label: __( 'Bottom', 'wbcom-essential' ) },
	{ key: 'left', label: __( 'Left', 'wbcom-essential' ) },
];

const UNITS = [
	{ label: 'px', value: 'px' },
	{ label: 'em', value: 'em' },
	{ label: 'rem', value: 'rem' },
	{ label: '%', value: '%' },
];

const DEVICE_LABELS = {
	Tablet: __( 'Tablet', 'wbcom-essential' ),
	Mobile: __( 'Mobile', 'wbcom-essential' ),
};

const allEqual = ( v ) => v.top === v.right && v.top === v.bottom && v.top === v.left;

/**
 * Find which responsive attribute set these values belong to.
 *
 * Blocks pass `values={ padding }` or `values={ margin }` straight from their
 * attributes, so the object is the same one the block editor store holds.
 * When the block type also declares `<base>Tablet`, the control can edit the
 * tablet and mobile overrides itself, with no change in any block.
 *
 * @param {Object} values The values the block passed in.
 * @return {Object|null} Target, or null to behave as a desktop-only control.
 */
function useResponsiveTarget( values ) {
	const { clientId, name } = useBlockEditContext();
	const attributes = useSelect(
		( select ) => ( clientId ? select( 'core/block-editor' ).getBlockAttributes( clientId ) : null ),
		[ clientId ]
	);
	const blockType = useSelect(
		( select ) => ( name ? select( 'core/blocks' ).getBlockType( name ) : null ),
		[ name ]
	);
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	if ( ! attributes || ! blockType ) {
		return null;
	}
	const base = [ 'padding', 'margin' ].find( ( key ) => attributes[ key ] === values );
	if ( ! base || ! blockType.attributes?.[ base + 'Tablet' ] ) {
		return null;
	}
	return {
		tablet: attributes[ base + 'Tablet' ],
		mobile: attributes[ base + 'Mobile' ],
		set: ( device, next ) => updateBlockAttributes( clientId, { [ base + device ]: next } ),
	};
}

export default function SpacingControl( props ) {
	const target = useResponsiveTarget( props.values );
	const shown = useResponsiveValue( props.values, target?.tablet, target?.mobile );

	if ( ! target ) {
		return <SpacingInputs { ...props } />;
	}

	return (
		<ResponsiveControl label={ props.label }>
			{ ( device ) => {
				if ( device === 'Desktop' ) {
					return <SpacingInputs key={ device } { ...props } label={ undefined } />;
				}
				const override = device === 'Tablet' ? target.tablet : target.mobile;
				return (
					<>
						<SpacingInputs
							key={ device }
							{ ...props }
							label={ undefined }
							device={ DEVICE_LABELS[ device ] }
							values={ shown }
							onChange={ ( next ) => target.set( device, next ) }
						/>
						{ override && (
							<Button variant="link" onClick={ () => target.set( device, undefined ) }>
								{ __( 'Reset to the larger screen value', 'wbcom-essential' ) }
							</Button>
						) }
					</>
				);
			} }
		</ResponsiveControl>
	);
}

function SpacingInputs( {
	label,
	device,
	values = { top: 0, right: 0, bottom: 0, left: 0 },
	unit = 'px',
	onChange,
	onUnitChange,
} ) {
	const [ linked, setLinked ] = useState( () => allEqual( values ) );
	/* translators: 1: side such as Top, 2: device such as Tablet. */
	const withDevice = ( text ) => ( device ? sprintf( __( '%1$s (%2$s)', 'wbcom-essential' ), text, device ) : text );

	const handleChange = ( side, val ) => {
		const num = val !== '' ? Number( val ) : 0;
		if ( linked ) {
			onChange( { top: num, right: num, bottom: num, left: num } );
		} else {
			onChange( { ...values, [ side ]: num } );
		}
	};

	const tools = (
		<>
			<FlexItem>
				<Button
					icon={ linked ? link : linkOff }
					label={ linked
						? __( 'Unlink sides', 'wbcom-essential' )
						: __( 'Link sides', 'wbcom-essential' )
					}
					onClick={ () => setLinked( ! linked ) }
					isPressed={ linked }
					size="small"
				/>
			</FlexItem>
			<FlexItem>
				<SelectControl
					value={ unit }
					options={ UNITS }
					onChange={ onUnitChange }
					hideLabelFromVision
					label={ __( 'Unit', 'wbcom-essential' ) }
					__nextHasNoMarginBottom
				/>
			</FlexItem>
		</>
	);

	// Linked: one input beside the tools. Unlinked: the four sides two by two with visible labels, because four
	// boxes plus the tools in one row of the 280px sidebar left each box 15px wide (80 showed as "8").
	return (
		<BaseControl label={ label } className="wbe-spacing-control">
			{ linked ? (
				<Flex align="flex-end" gap={ 2 }>
					<FlexItem>
						<NumberControl
							label={ withDevice( __( 'All', 'wbcom-essential' ) ) }
							value={ values.top }
							onChange={ ( val ) => handleChange( 'top', val ) }
							min={ -200 }
							max={ 500 }
							hideLabelFromVision
						/>
					</FlexItem>
					{ tools }
				</Flex>
			) : (
				<>
					<div style={ { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' } }>
						{ SIDES.map( ( { key, label: sideLabel } ) => (
							<NumberControl
								key={ key }
								label={ sideLabel }
								aria-label={ withDevice( sideLabel ) }
								value={ values[ key ] }
								onChange={ ( val ) => handleChange( key, val ) }
								min={ -200 }
								max={ 500 }
							/>
						) ) }
					</div>
					<Flex justify="flex-start" gap={ 2 }>
						{ tools }
					</Flex>
				</>
			) }
		</BaseControl>
	);
}
