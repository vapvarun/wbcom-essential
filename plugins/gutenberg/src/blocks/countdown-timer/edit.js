import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	ColorPicker,
	DateTimePicker,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		targetDate,
		heading,
		expiredMessage,
		backgroundColor,
		textColor,
		accentColor,
		showLabels,
		size,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbe-countdown wbe-countdown--${ size }`,
		style: { backgroundColor, color: textColor },
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Timer Settings', 'wbcom-essential' ) }>
					<p className="components-base-control__label">
						{ __( 'Target Date & Time', 'wbcom-essential' ) }
					</p>
					<DateTimePicker
						currentDate={ targetDate || undefined }
						onChange={ ( val ) =>
							setAttributes( { targetDate: val } )
						}
						is12Hour={ false }
					/>
					<TextControl
						label={ __( 'Heading', 'wbcom-essential' ) }
						value={ heading }
						onChange={ ( val ) =>
							setAttributes( { heading: val } )
						}
					/>
					<TextControl
						label={ __( 'Expired Message', 'wbcom-essential' ) }
						value={ expiredMessage }
						onChange={ ( val ) =>
							setAttributes( { expiredMessage: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Show Labels', 'wbcom-essential' ) }
						checked={ showLabels }
						onChange={ ( val ) =>
							setAttributes( { showLabels: val } )
						}
					/>
					<SelectControl
						label={ __( 'Size', 'wbcom-essential' ) }
						value={ size }
						options={ [
							{ label: 'Small', value: 'small' },
							{ label: 'Large', value: 'large' },
						] }
						onChange={ ( val ) =>
							setAttributes( { size: val } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p className="components-base-control__label">
						{ __( 'Background', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ backgroundColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { backgroundColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Text', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ textColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { textColor: val.hex } )
						}
						disableAlpha
					/>
					<p className="components-base-control__label">
						{ __( 'Accent', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ accentColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { accentColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ heading && <h2 className="wbe-countdown__heading">{ heading }</h2> }
				<div className="wbe-countdown__digits">
					{ [ 'Days', 'Hours', 'Minutes', 'Seconds' ].map(
						( label ) => (
							<div
								key={ label }
								className="wbe-countdown__unit"
								style={ { borderColor: accentColor } }
							>
								<span className="wbe-countdown__number">
									00
								</span>
								{ showLabels && (
									<span className="wbe-countdown__label">
										{ label }
									</span>
								) }
							</div>
						)
					) }
				</div>
				{ ! targetDate && (
					<p className="wbe-countdown__editor-note">
						{ __(
							'Set a target date in the sidebar to start the countdown.',
							'wbcom-essential'
						) }
					</p>
				) }
			</div>
		</>
	);
}
