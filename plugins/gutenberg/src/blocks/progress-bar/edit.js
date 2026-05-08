/**
 * Progress Bar Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	RangeControl,
	ToggleControl,
	ColorPicker,
	TextControl,
	BaseControl,
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
		bars,
		height,
		showPercentage,
		showLabel,
		animateOnScroll,
		trackColor,
		labelColor,
		percentColor,
		barBorderRadius,
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

	const blockCSS = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-pb-track-color: ${ trackColor };`,
		`  --wbe-pb-label-color: ${ labelColor };`,
		`  --wbe-pb-percent-color: ${ percentColor };`,
		`  --wbe-pb-height: ${ height }px;`,
		`  --wbe-pb-radius: ${ barBorderRadius }px;`,
		`}`,
	].join( '\n' );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-progress-bar`,
	} );

	const addBar = () => {
		setAttributes( {
			bars: [
				...bars,
				{ label: __( 'New Skill', 'wbcom-essential' ), percentage: 70, color: '#667eea' },
			],
		} );
	};

	const removeBar = ( index ) => {
		setAttributes( { bars: bars.filter( ( _, i ) => i !== index ) } );
	};

	const updateBar = ( index, field, value ) => {
		const updated = bars.map( ( bar, i ) =>
			i === index ? { ...bar, [ field ]: value } : bar
		);
		setAttributes( { bars: updated } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Bars Panel */ }
				<PanelBody title={ __( 'Progress Bars', 'wbcom-essential' ) } initialOpen={ true }>
					{ bars.map( ( bar, index ) => (
						<div key={ index } className="wbe-pb-editor-row">
							<div className="wbe-pb-editor-row__header">
								<strong>{ __( 'Bar', 'wbcom-essential' ) } { index + 1 }</strong>
								<Button
									icon="trash"
									label={ __( 'Remove bar', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ () => removeBar( index ) }
									disabled={ bars.length <= 1 }
								/>
							</div>
							<TextControl
								label={ __( 'Label', 'wbcom-essential' ) }
								value={ bar.label }
								onChange={ ( val ) => updateBar( index, 'label', val ) }
							/>
							<RangeControl
								label={ __( 'Percentage', 'wbcom-essential' ) }
								value={ bar.percentage }
								onChange={ ( val ) => updateBar( index, 'percentage', val ) }
								min={ 0 }
								max={ 100 }
							/>
							<BaseControl label={ __( 'Bar Color', 'wbcom-essential' ) } id={ `wbe-pb-color-${ index }` }>
								<ColorPicker
									color={ bar.color }
									onChange={ ( val ) => updateBar( index, 'color', val ) }
									enableAlpha
								/>
							</BaseControl>
						</div>
					) ) }
					<Button variant="secondary" onClick={ addBar }>
						{ __( '+ Add Bar', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Bar Height (px)', 'wbcom-essential' ) }
						value={ height }
						onChange={ ( val ) => setAttributes( { height: val } ) }
						min={ 4 }
						max={ 40 }
					/>
					<RangeControl
						label={ __( 'Bar Border Radius (px)', 'wbcom-essential' ) }
						value={ barBorderRadius }
						onChange={ ( val ) => setAttributes( { barBorderRadius: val } ) }
						min={ 0 }
						max={ 40 }
					/>
					<ToggleControl
						label={ __( 'Show Label', 'wbcom-essential' ) }
						checked={ showLabel }
						onChange={ ( val ) => setAttributes( { showLabel: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Percentage', 'wbcom-essential' ) }
						checked={ showPercentage }
						onChange={ ( val ) => setAttributes( { showPercentage: val } ) }
					/>
					<ToggleControl
						label={ __( 'Animate on Scroll', 'wbcom-essential' ) }
						checked={ animateOnScroll }
						onChange={ ( val ) => setAttributes( { animateOnScroll: val } ) }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Track Color', 'wbcom-essential' ) } id="wbe-pb-track">
						<ColorPicker
							color={ trackColor }
							onChange={ ( val ) => setAttributes( { trackColor: val } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Label Color', 'wbcom-essential' ) } id="wbe-pb-label">
						<ColorPicker
							color={ labelColor }
							onChange={ ( val ) => setAttributes( { labelColor: val } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Percentage Color', 'wbcom-essential' ) } id="wbe-pb-percent">
						<ColorPicker
							color={ percentColor }
							onChange={ ( val ) => setAttributes( { percentColor: val } ) }
							enableAlpha
						/>
					</BaseControl>
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
				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
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

				{ /* Advanced Panel */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ blockCSS && <style>{ blockCSS }</style> }
				<style>{ tokenPropsCss }</style>

				<div className="wbe-progress-bar__list">
					{ bars.map( ( bar, index ) => (
						<div key={ index } className="wbe-progress-bar__item">
							{ ( showLabel || showPercentage ) && (
								<div className="wbe-progress-bar__meta">
									{ showLabel && (
										<span className="wbe-progress-bar__label">
											{ bar.label }
										</span>
									) }
									{ showPercentage && (
										<span className="wbe-progress-bar__percent">
											{ bar.percentage }%
										</span>
									) }
								</div>
							) }
							<div
								className="wbe-progress-bar__track"
								role="progressbar"
								aria-valuenow={ bar.percentage }
								aria-valuemin={ 0 }
								aria-valuemax={ 100 }
								aria-label={ bar.label }
							>
								<div
									className="wbe-progress-bar__fill"
									style={ {
										width: `${ bar.percentage }%`,
										background: bar.color,
									} }
								/>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
