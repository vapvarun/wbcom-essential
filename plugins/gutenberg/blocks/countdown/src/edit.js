/**
 * Countdown Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	__experimentalBoxControl as BoxControl,
	DateTimePicker,
	Popover,
	Button,
	ColorPalette,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import { format, __experimentalGetSettings } from '@wordpress/date';

export default function Edit( { attributes, setAttributes } ) {
	const {
		dueDate,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		daysLabel,
		hoursLabel,
		minutesLabel,
		secondsLabel,
		expiryMessage,
		contentLayout,
		boxAlign,
		boxBackground,
		boxBorderRadius,
		boxPadding,
		boxGap,
		digitColor,
		digitFontSize,
		labelColor,
		labelFontSize,
		messageColor,
		messageFontSize,
	} = attributes;

	const [ isDatePickerOpen, setIsDatePickerOpen ] = useState( false );
	const [ countdown, setCountdown ] = useState( {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
	} );

	// Calculate countdown values
	useEffect( () => {
		if ( ! dueDate ) {
			return;
		}

		const calculateCountdown = () => {
			const now = new Date().getTime();
			const target = new Date( dueDate ).getTime();
			const diff = target - now;

			if ( diff <= 0 ) {
				setCountdown( { days: 0, hours: 0, minutes: 0, seconds: 0 } );
				return;
			}

			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );

			setCountdown( { days, hours, minutes, seconds } );
		};

		calculateCountdown();
		const interval = setInterval( calculateCountdown, 1000 );

		return () => clearInterval( interval );
	}, [ dueDate ] );

	// Set default due date if not set
	useEffect( () => {
		if ( ! dueDate ) {
			const defaultDate = new Date();
			defaultDate.setMonth( defaultDate.getMonth() + 1 );
			setAttributes( { dueDate: format( 'Y-m-d H:i', defaultDate ) } );
		}
	}, [] );

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-countdown',
	} );

	const containerStyle = {
		justifyContent: boxAlign,
		gap: `${ boxGap }px`,
	};

	const boxStyle = {
		backgroundColor: boxBackground || undefined,
		borderRadius: boxBorderRadius ? `${ boxBorderRadius }px` : undefined,
		padding: boxPadding ? `${ boxPadding.top } ${ boxPadding.right } ${ boxPadding.bottom } ${ boxPadding.left }` : undefined,
	};

	const digitStyle = {
		color: digitColor || undefined,
		fontSize: digitFontSize ? `${ digitFontSize }px` : undefined,
	};

	const labelStyle = {
		color: labelColor || undefined,
		fontSize: labelFontSize ? `${ labelFontSize }px` : undefined,
	};

	const formatNumber = ( num ) => {
		return num.toString().padStart( 2, '0' );
	};

	const settings = __experimentalGetSettings();
	const dateFormat = settings.formats.date;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Countdown Settings', 'wbcom-essential' ) }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Due Date', 'wbcom-essential' ) }
						</label>
						<Button
							variant="secondary"
							onClick={ () => setIsDatePickerOpen( ! isDatePickerOpen ) }
							style={ { width: '100%', justifyContent: 'flex-start' } }
						>
							{ dueDate ? dueDate : __( 'Select Date', 'wbcom-essential' ) }
						</Button>
						{ isDatePickerOpen && (
							<Popover
								position="bottom center"
								onClose={ () => setIsDatePickerOpen( false ) }
							>
								<div style={ { padding: '16px' } }>
									<DateTimePicker
										currentDate={ dueDate ? new Date( dueDate ) : new Date() }
										onChange={ ( date ) => {
											setAttributes( { dueDate: format( 'Y-m-d H:i', date ) } );
										} }
										is12Hour={ true }
									/>
								</div>
							</Popover>
						) }
					</div>

					<ToggleControl
						label={ __( 'Show Days', 'wbcom-essential' ) }
						checked={ showDays }
						onChange={ ( value ) => setAttributes( { showDays: value } ) }
					/>
					{ showDays && (
						<TextControl
							label={ __( 'Days Label', 'wbcom-essential' ) }
							value={ daysLabel }
							onChange={ ( value ) => setAttributes( { daysLabel: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Show Hours', 'wbcom-essential' ) }
						checked={ showHours }
						onChange={ ( value ) => setAttributes( { showHours: value } ) }
					/>
					{ showHours && (
						<TextControl
							label={ __( 'Hours Label', 'wbcom-essential' ) }
							value={ hoursLabel }
							onChange={ ( value ) => setAttributes( { hoursLabel: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Show Minutes', 'wbcom-essential' ) }
						checked={ showMinutes }
						onChange={ ( value ) => setAttributes( { showMinutes: value } ) }
					/>
					{ showMinutes && (
						<TextControl
							label={ __( 'Minutes Label', 'wbcom-essential' ) }
							value={ minutesLabel }
							onChange={ ( value ) => setAttributes( { minutesLabel: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Show Seconds', 'wbcom-essential' ) }
						checked={ showSeconds }
						onChange={ ( value ) => setAttributes( { showSeconds: value } ) }
					/>
					{ showSeconds && (
						<TextControl
							label={ __( 'Seconds Label', 'wbcom-essential' ) }
							value={ secondsLabel }
							onChange={ ( value ) => setAttributes( { secondsLabel: value } ) }
						/>
					) }

					<TextControl
						label={ __( 'Message After Expiry', 'wbcom-essential' ) }
						value={ expiryMessage }
						onChange={ ( value ) => setAttributes( { expiryMessage: value } ) }
						help={ __( 'Message to display when countdown expires', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Content Layout', 'wbcom-essential' ) }
						value={ contentLayout }
						options={ [
							{ label: __( 'Vertical', 'wbcom-essential' ), value: 'v-layout' },
							{ label: __( 'Vertical Reverse', 'wbcom-essential' ), value: 'v-layout-reverse' },
							{ label: __( 'Horizontal', 'wbcom-essential' ), value: 'h-layout' },
							{ label: __( 'Horizontal Reverse', 'wbcom-essential' ), value: 'h-layout-reverse' },
						] }
						onChange={ ( value ) => setAttributes( { contentLayout: value } ) }
					/>

					<SelectControl
						label={ __( 'Box Alignment', 'wbcom-essential' ) }
						value={ boxAlign }
						options={ [
							{ label: __( 'Start', 'wbcom-essential' ), value: 'flex-start' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'End', 'wbcom-essential' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => setAttributes( { boxAlign: value } ) }
					/>

					<RangeControl
						label={ __( 'Box Gap', 'wbcom-essential' ) }
						value={ boxGap }
						onChange={ ( value ) => setAttributes( { boxGap: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Box Style', 'wbcom-essential' ) } initialOpen={ false }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Background Color', 'wbcom-essential' ) }
						</label>
						<ColorPalette
							value={ boxBackground }
							onChange={ ( value ) => setAttributes( { boxBackground: value } ) }
						/>
					</div>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ boxBorderRadius }
						onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
						min={ 0 }
						max={ 100 }
					/>

					<BoxControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ boxPadding }
						onChange={ ( value ) => setAttributes( { boxPadding: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'wbcom-essential' ) } initialOpen={ false }>
					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Digit Color', 'wbcom-essential' ) }
						</label>
						<ColorPalette
							value={ digitColor }
							onChange={ ( value ) => setAttributes( { digitColor: value } ) }
						/>
					</div>

					<RangeControl
						label={ __( 'Digit Font Size', 'wbcom-essential' ) }
						value={ digitFontSize }
						onChange={ ( value ) => setAttributes( { digitFontSize: value } ) }
						min={ 12 }
						max={ 200 }
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Label Color', 'wbcom-essential' ) }
						</label>
						<ColorPalette
							value={ labelColor }
							onChange={ ( value ) => setAttributes( { labelColor: value } ) }
						/>
					</div>

					<RangeControl
						label={ __( 'Label Font Size', 'wbcom-essential' ) }
						value={ labelFontSize }
						onChange={ ( value ) => setAttributes( { labelFontSize: value } ) }
						min={ 8 }
						max={ 100 }
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Message Color', 'wbcom-essential' ) }
						</label>
						<ColorPalette
							value={ messageColor }
							onChange={ ( value ) => setAttributes( { messageColor: value } ) }
						/>
					</div>

					<RangeControl
						label={ __( 'Message Font Size', 'wbcom-essential' ) }
						value={ messageFontSize }
						onChange={ ( value ) => setAttributes( { messageFontSize: value } ) }
						min={ 12 }
						max={ 100 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ `wbcom-countdown ${ contentLayout }` } style={ containerStyle }>
					{ showDays && (
						<div className="wbcom-countdown-days" style={ boxStyle }>
							<span className="wbcom-countdown-value" style={ digitStyle }>
								{ formatNumber( countdown.days ) }
							</span>
							<span className="wbcom-countdown-label" style={ labelStyle }>
								{ daysLabel }
							</span>
						</div>
					) }
					{ showHours && (
						<div className="wbcom-countdown-hours" style={ boxStyle }>
							<span className="wbcom-countdown-value" style={ digitStyle }>
								{ formatNumber( countdown.hours ) }
							</span>
							<span className="wbcom-countdown-label" style={ labelStyle }>
								{ hoursLabel }
							</span>
						</div>
					) }
					{ showMinutes && (
						<div className="wbcom-countdown-minutes" style={ boxStyle }>
							<span className="wbcom-countdown-value" style={ digitStyle }>
								{ formatNumber( countdown.minutes ) }
							</span>
							<span className="wbcom-countdown-label" style={ labelStyle }>
								{ minutesLabel }
							</span>
						</div>
					) }
					{ showSeconds && (
						<div className="wbcom-countdown-seconds" style={ boxStyle }>
							<span className="wbcom-countdown-value" style={ digitStyle }>
								{ formatNumber( countdown.seconds ) }
							</span>
							<span className="wbcom-countdown-label" style={ labelStyle }>
								{ secondsLabel }
							</span>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
