/**
 * Countdown Timer Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	ColorPicker,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { DateTimePicker } from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

/**
 * Compute a static preview delta from today + 7 days.
 *
 * @return {Object} { days, hours, minutes, seconds }
 */
function getPreviewValues() {
	return { days: 7, hours: 14, minutes: 32, seconds: 55 };
}

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		targetDate,
		expireMessage,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		separatorStyle,
		layout,
		numberColor,
		labelColor,
		boxBg,
		boxBorderColor,
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
		className: `wbe-block-${ uniqueId } wbe-countdown-timer wbe-countdown-timer--${ layout }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const preview = getPreviewValues();

	const getSeparator = () => {
		switch ( separatorStyle ) {
			case 'dot':
				return <span className="wbe-countdown-timer__sep" aria-hidden="true">·</span>;
			case 'none':
				return null;
			case 'colon':
			default:
				return <span className="wbe-countdown-timer__sep" aria-hidden="true">:</span>;
		}
	};

	const units = [
		{ key: 'days', show: showDays, value: preview.days, label: __( 'Days', 'wbcom-essential' ) },
		{ key: 'hours', show: showHours, value: preview.hours, label: __( 'Hours', 'wbcom-essential' ) },
		{ key: 'minutes', show: showMinutes, value: preview.minutes, label: __( 'Mins', 'wbcom-essential' ) },
		{ key: 'seconds', show: showSeconds, value: preview.seconds, label: __( 'Secs', 'wbcom-essential' ) },
	].filter( ( u ) => u.show );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-cd-number-color: ${ numberColor };`,
		`  --wbe-cd-label-color: ${ labelColor };`,
		`  --wbe-cd-box-bg: ${ boxBg };`,
		`  --wbe-cd-box-border: ${ boxBorderColor };`,
		`}`,
	].join( '\n' );

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody
					title={ __( 'Countdown Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<p className="wbe-field-label">
						<strong>{ __( 'Target Date & Time', 'wbcom-essential' ) }</strong>
					</p>
					<DateTimePicker
						currentDate={ targetDate || null }
						onChange={ ( val ) => setAttributes( { targetDate: val } ) }
						is12Hour={ false }
					/>
					<Spacer marginTop={ 3 } />
					<TextControl
						label={ __( 'Expiry Message', 'wbcom-essential' ) }
						value={ expireMessage }
						onChange={ ( val ) => setAttributes( { expireMessage: val } ) }
						help={ __( 'Shown when the countdown reaches zero.', 'wbcom-essential' ) }
					/>
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Display Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Boxes', 'wbcom-essential' ), value: 'boxes' },
							{ label: __( 'Inline', 'wbcom-essential' ), value: 'inline' },
							{ label: __( 'Minimal', 'wbcom-essential' ), value: 'minimal' },
						] }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
					/>
					<SelectControl
						label={ __( 'Separator Style', 'wbcom-essential' ) }
						value={ separatorStyle }
						options={ [
							{ label: __( 'Colon (:)', 'wbcom-essential' ), value: 'colon' },
							{ label: __( 'Dot (·)', 'wbcom-essential' ), value: 'dot' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( val ) => setAttributes( { separatorStyle: val } ) }
					/>
					<ToggleControl
						label={ __( 'Show Days', 'wbcom-essential' ) }
						checked={ showDays }
						onChange={ ( val ) => setAttributes( { showDays: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Hours', 'wbcom-essential' ) }
						checked={ showHours }
						onChange={ ( val ) => setAttributes( { showHours: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Minutes', 'wbcom-essential' ) }
						checked={ showMinutes }
						onChange={ ( val ) => setAttributes( { showMinutes: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Seconds', 'wbcom-essential' ) }
						checked={ showSeconds }
						onChange={ ( val ) => setAttributes( { showSeconds: val } ) }
						__nextHasNoMarginBottom
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
					<p><strong>{ __( 'Box Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ boxBg }
						onChange={ ( val ) => setAttributes( { boxBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Box Border Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ boxBorderColor }
						onChange={ ( val ) => setAttributes( { boxBorderColor: val } ) }
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

				{ ! targetDate && (
					<p className="wbe-countdown-timer__placeholder">
						{ __( 'Set a target date in the block settings to activate the countdown.', 'wbcom-essential' ) }
					</p>
				) }

				{ targetDate && (
					<div className="wbe-countdown-timer__units">
						{ units.map( ( unit, idx ) => (
							<>
								<div
									key={ unit.key }
									className={ `wbe-countdown-timer__unit wbe-countdown-timer__unit--${ unit.key }` }
								>
									<span className="wbe-countdown-timer__number">
										{ String( unit.value ).padStart( 2, '0' ) }
									</span>
									<span className="wbe-countdown-timer__label">
										{ unit.label }
									</span>
								</div>
								{ idx < units.length - 1 && getSeparator() }
							</>
						) ) }
					</div>
				) }
			</div>
		</>
	);
}
