/**
 * Stats Counter Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	ColorPicker,
	TextControl,
	__experimentalNumberControl as NumberControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		columns,
		stats,
		duration,
		numberColor,
		labelColor,
		separatorColor,
		padding,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		margin,
		marginTablet,
		marginMobile,
		marginUnit,
		boxShadow,
		shadowHorizontal,
		shadowVertical,
		shadowBlur,
		shadowSpread,
		shadowColor,
		borderRadius,
		borderRadiusUnit,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
	} = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-stats-counter`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-sc-number-color: ${ numberColor };`,
		`  --wbe-sc-label-color: ${ labelColor };`,
		`  --wbe-sc-sep-color: ${ separatorColor };`,
		`  --wbe-sc-columns: ${ columns };`,
		`}`,
	].join( '\n' );

	const addStat = () => {
		setAttributes( {
			stats: [
				...stats,
				{ number: 100, prefix: '', suffix: '', label: 'New Stat' },
			],
		} );
	};

	const removeStat = ( index ) => {
		setAttributes( { stats: stats.filter( ( _, i ) => i !== index ) } );
	};

	const updateStat = ( index, field, value ) => {
		const newStats = stats.map( ( stat, i ) =>
			i === index ? { ...stat, [ field ]: value } : stat
		);
		setAttributes( { stats: newStats } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody
					title={ __( 'Stats', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					{ stats.map( ( stat, index ) => (
						<div key={ index } className="wbe-stat-editor-row">
							<div className="wbe-stat-editor-row__header">
								<strong>{ __( 'Stat', 'wbcom-essential' ) } { index + 1 }</strong>
								<Button
									icon="trash"
									label={ __( 'Remove stat', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ () => removeStat( index ) }
									disabled={ stats.length <= 1 }
								/>
							</div>
							<NumberControl
								label={ __( 'Number', 'wbcom-essential' ) }
								value={ stat.number }
								onChange={ ( val ) =>
									updateStat( index, 'number', Number( val ) )
								}
								min={ 0 }
							/>
							<TextControl
								label={ __( 'Prefix', 'wbcom-essential' ) }
								value={ stat.prefix }
								onChange={ ( val ) => updateStat( index, 'prefix', val ) }
								placeholder="$"
							/>
							<TextControl
								label={ __( 'Suffix', 'wbcom-essential' ) }
								value={ stat.suffix }
								onChange={ ( val ) => updateStat( index, 'suffix', val ) }
								placeholder="+"
							/>
							<TextControl
								label={ __( 'Label', 'wbcom-essential' ) }
								value={ stat.label }
								onChange={ ( val ) => updateStat( index, 'label', val ) }
							/>
						</div>
					) ) }
					{ stats.length < 6 && (
						<Button variant="secondary" onClick={ addStat }>
							{ __( '+ Add Stat', 'wbcom-essential' ) }
						</Button>
					) }
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( val ) => setAttributes( { columns: val } ) }
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Animation Duration (ms)', 'wbcom-essential' ) }
						value={ duration }
						onChange={ ( val ) => setAttributes( { duration: val } ) }
						min={ 500 }
						max={ 5000 }
						step={ 100 }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Number Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ numberColor }
						onChange={ ( val ) => setAttributes( { numberColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Label Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ labelColor }
						onChange={ ( val ) => setAttributes( { labelColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Separator Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ separatorColor }
						onChange={ ( val ) => setAttributes( { separatorColor: val } ) }
						enableAlpha
					/>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>

				{ /* Spacing Panel */ }
				<PanelBody
					title={ __( 'Spacing', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
						onUnitChange={ ( val ) => setAttributes( { paddingUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
						onUnitChange={ ( val ) => setAttributes( { marginUnit: val } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Advanced', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ css && <style>{ css }</style> }
				<style>{ tokenPropsCss }</style>

				<div
					className="wbe-stats-counter__grid"
					style={ { '--wbe-sc-columns': columns } }
				>
					{ stats.map( ( stat, index ) => (
						<div
							key={ index }
							className="wbe-stats-counter__item"
						>
							<div className="wbe-stats-counter__number-wrap">
								<span className="wbe-stats-counter__prefix">{ stat.prefix }</span>
								<span className="wbe-stats-counter__number">
									{ stat.number.toLocaleString() }
								</span>
								<span className="wbe-stats-counter__suffix">{ stat.suffix }</span>
							</div>
							<div className="wbe-stats-counter__label">{ stat.label }</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
