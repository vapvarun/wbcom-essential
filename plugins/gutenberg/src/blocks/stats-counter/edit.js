import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	RangeControl,
	Button,
	ColorPicker,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { stats, columns, duration, textColor, accentColor } = attributes;

	const updateStat = ( index, key, value ) => {
		const updated = [ ...stats ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { stats: updated } );
	};

	const addStat = () => {
		setAttributes( {
			stats: [
				...stats,
				{ number: 0, label: '', prefix: '', suffix: '' },
			],
		} );
	};

	const removeStat = ( index ) => {
		setAttributes( {
			stats: stats.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useBlockProps( {
		className: 'wbe-stats',
		style: { color: textColor },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( val ) =>
							setAttributes( { columns: val } )
						}
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __(
							'Animation Duration (ms)',
							'wbcom-essential'
						) }
						value={ duration }
						onChange={ ( val ) =>
							setAttributes( { duration: val } )
						}
						min={ 500 }
						max={ 5000 }
						step={ 100 }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Text Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ textColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { textColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Number Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ accentColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { accentColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>
				{ stats.map( ( stat, i ) => (
					<PanelBody
						key={ i }
						title={ stat.label || `Stat ${ i + 1 }` }
						initialOpen={ false }
					>
						<NumberControl
							label={ __( 'Number', 'wbcom-essential' ) }
							value={ stat.number }
							onChange={ ( val ) =>
								updateStat( i, 'number', parseInt( val, 10 ) || 0 )
							}
						/>
						<TextControl
							label={ __( 'Label', 'wbcom-essential' ) }
							value={ stat.label }
							onChange={ ( val ) =>
								updateStat( i, 'label', val )
							}
						/>
						<TextControl
							label={ __( 'Prefix', 'wbcom-essential' ) }
							value={ stat.prefix }
							onChange={ ( val ) =>
								updateStat( i, 'prefix', val )
							}
							help={ __(
								'e.g. $ or #',
								'wbcom-essential'
							) }
						/>
						<TextControl
							label={ __( 'Suffix', 'wbcom-essential' ) }
							value={ stat.suffix }
							onChange={ ( val ) =>
								updateStat( i, 'suffix', val )
							}
							help={ __(
								'e.g. +, %, /7',
								'wbcom-essential'
							) }
						/>
						{ stats.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeStat( i ) }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addStat }>
						{ __( 'Add Stat', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="wbe-stats__grid"
					style={ {
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
					} }
				>
					{ stats.map( ( stat, i ) => (
						<div key={ i } className="wbe-stats__item">
							<span
								className="wbe-stats__number"
								style={ { color: accentColor } }
							>
								{ stat.prefix }
								{ stat.number.toLocaleString() }
								{ stat.suffix }
							</span>
							<span className="wbe-stats__label">
								{ stat.label }
							</span>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
