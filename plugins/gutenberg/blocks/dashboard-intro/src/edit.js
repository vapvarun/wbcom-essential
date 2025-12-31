/**
 * Dashboard Intro Block - Editor Component
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
	TextareaControl,
	ToggleControl,
	RangeControl,
	SelectControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		greetingText,
		descriptionText,
		showAvatar,
		avatarSize,
		avatarBorderRadius,
		avatarBorderStyle,
		avatarBorderWidth,
		avatarBorderColor,
		avatarPadding,
		avatarShadow,
		layout,
		contentAlign,
		greetingColor,
		greetingFontSize,
		nameColor,
		nameFontSize,
		descriptionColor,
		descriptionFontSize,
		gap,
		containerBgColor,
		containerPadding,
		containerBorderRadius,
		showLoggedOutMessage,
		loggedOutMessage,
	} = attributes;

	// Preview styles.
	const containerStyle = {
		'--greeting-color': greetingColor,
		'--greeting-font-size': `${ greetingFontSize }px`,
		'--name-color': nameColor,
		'--name-font-size': `${ nameFontSize }px`,
		'--description-color': descriptionColor,
		'--description-font-size': `${ descriptionFontSize }px`,
		'--gap': `${ gap }px`,
		'--container-bg': containerBgColor || 'transparent',
		'--container-padding': `${ containerPadding }px`,
		'--container-radius': `${ containerBorderRadius }px`,
		'--avatar-size': `${ avatarSize }px`,
		'--avatar-radius': `${ avatarBorderRadius }%`,
		'--avatar-border-style': avatarBorderStyle,
		'--avatar-border-width': `${ avatarBorderWidth }px`,
		'--avatar-border-color': avatarBorderColor,
		'--avatar-padding': `${ avatarPadding }px`,
		'--avatar-shadow': `${ avatarShadow.horizontal }px ${ avatarShadow.vertical }px ${ avatarShadow.blur }px ${ avatarShadow.spread }px ${ avatarShadow.color }`,
	};

	const blockProps = useBlockProps( {
		className: `wbcom-essential-dashboard-intro layout-${ layout } align-${ contentAlign }`,
		style: containerStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content Settings', 'wbcom-essential' ) }>
					<TextControl
						label={ __( 'Greeting Text', 'wbcom-essential' ) }
						value={ greetingText }
						onChange={ ( value ) => setAttributes( { greetingText: value } ) }
						help={ __( 'Text shown before the user name', 'wbcom-essential' ) }
					/>
					<TextareaControl
						label={ __( 'Description Text', 'wbcom-essential' ) }
						value={ descriptionText }
						onChange={ ( value ) => setAttributes( { descriptionText: value } ) }
						help={ __( 'Message shown below the user name', 'wbcom-essential' ) }
					/>
					<ToggleControl
						label={ __( 'Show Logged Out Message', 'wbcom-essential' ) }
						checked={ showLoggedOutMessage }
						onChange={ ( value ) => setAttributes( { showLoggedOutMessage: value } ) }
						help={ __( 'Show a message for logged out users', 'wbcom-essential' ) }
					/>
					{ showLoggedOutMessage && (
						<TextControl
							label={ __( 'Logged Out Message', 'wbcom-essential' ) }
							value={ loggedOutMessage }
							onChange={ ( value ) => setAttributes( { loggedOutMessage: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Avatar Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
					/>
					{ showAvatar && (
						<>
							<RangeControl
								label={ __( 'Avatar Size', 'wbcom-essential' ) }
								value={ avatarSize }
								onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
								min={ 40 }
								max={ 200 }
							/>
							<RangeControl
								label={ __( 'Border Radius (%)', 'wbcom-essential' ) }
								value={ avatarBorderRadius }
								onChange={ ( value ) => setAttributes( { avatarBorderRadius: value } ) }
								min={ 0 }
								max={ 50 }
							/>
							<SelectControl
								label={ __( 'Border Style', 'wbcom-essential' ) }
								value={ avatarBorderStyle }
								options={ [
									{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
									{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
									{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
									{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
									{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
									{ label: __( 'Groove', 'wbcom-essential' ), value: 'groove' },
									{ label: __( 'Ridge', 'wbcom-essential' ), value: 'ridge' },
								] }
								onChange={ ( value ) => setAttributes( { avatarBorderStyle: value } ) }
							/>
							{ avatarBorderStyle !== 'none' && (
								<>
									<RangeControl
										label={ __( 'Border Width', 'wbcom-essential' ) }
										value={ avatarBorderWidth }
										onChange={ ( value ) => setAttributes( { avatarBorderWidth: value } ) }
										min={ 1 }
										max={ 20 }
									/>
									<ColorControl
										label={ __( 'Border Color', 'wbcom-essential' ) }
										value={ avatarBorderColor }
										onChange={ ( value ) => setAttributes( { avatarBorderColor: value } ) }
									/>
								</>
							) }
							<RangeControl
								label={ __( 'Padding', 'wbcom-essential' ) }
								value={ avatarPadding }
								onChange={ ( value ) => setAttributes( { avatarPadding: value } ) }
								min={ 0 }
								max={ 50 }
								help={ __( 'Space between avatar and border', 'wbcom-essential' ) }
							/>
							<div style={ { marginBottom: '16px' } }>
								<p style={ { marginBottom: '8px', fontWeight: '500' } }>
									{ __( 'Box Shadow', 'wbcom-essential' ) }
								</p>
								<RangeControl
									label={ __( 'Horizontal', 'wbcom-essential' ) }
									value={ avatarShadow.horizontal }
									onChange={ ( value ) =>
										setAttributes( {
											avatarShadow: { ...avatarShadow, horizontal: value },
										} )
									}
									min={ -50 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Vertical', 'wbcom-essential' ) }
									value={ avatarShadow.vertical }
									onChange={ ( value ) =>
										setAttributes( {
											avatarShadow: { ...avatarShadow, vertical: value },
										} )
									}
									min={ -50 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Blur', 'wbcom-essential' ) }
									value={ avatarShadow.blur }
									onChange={ ( value ) =>
										setAttributes( {
											avatarShadow: { ...avatarShadow, blur: value },
										} )
									}
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Spread', 'wbcom-essential' ) }
									value={ avatarShadow.spread }
									onChange={ ( value ) =>
										setAttributes( {
											avatarShadow: { ...avatarShadow, spread: value },
										} )
									}
									min={ -50 }
									max={ 50 }
								/>
								<ColorControl
									label={ __( 'Shadow Color', 'wbcom-essential' ) }
									value={ avatarShadow.color }
									onChange={ ( value ) =>
										setAttributes( {
											avatarShadow: { ...avatarShadow, color: value },
										} )
									}
								/>
							</div>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Avatar Position', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Above', 'wbcom-essential' ), value: 'above' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>
					<ToggleGroupControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ contentAlign }
						onChange={ ( value ) => setAttributes( { contentAlign: value } ) }
						isBlock
					>
						<ToggleGroupControlOption value="left" label={ __( 'Left', 'wbcom-essential' ) } />
						<ToggleGroupControlOption value="center" label={ __( 'Center', 'wbcom-essential' ) } />
						<ToggleGroupControlOption value="right" label={ __( 'Right', 'wbcom-essential' ) } />
					</ToggleGroupControl>
					<RangeControl
						label={ __( 'Gap', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Container Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ containerBgColor }
						onChange={ ( value ) => setAttributes( { containerBgColor: value } ) }
					/>
					<RangeControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ containerPadding }
						onChange={ ( value ) => setAttributes( { containerPadding: value } ) }
						min={ 0 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ containerBorderRadius }
						onChange={ ( value ) => setAttributes( { containerBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography & Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<h3>{ __( 'Greeting Text', 'wbcom-essential' ) }</h3>
					<ColorControl
						label={ __( 'Color', 'wbcom-essential' ) }
						value={ greetingColor }
						onChange={ ( value ) => setAttributes( { greetingColor: value } ) }
					/>
					<RangeControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ greetingFontSize }
						onChange={ ( value ) => setAttributes( { greetingFontSize: value } ) }
						min={ 10 }
						max={ 48 }
					/>
					<hr />
					<h3>{ __( 'User Name', 'wbcom-essential' ) }</h3>
					<ColorControl
						label={ __( 'Color', 'wbcom-essential' ) }
						value={ nameColor }
						onChange={ ( value ) => setAttributes( { nameColor: value } ) }
					/>
					<RangeControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ nameFontSize }
						onChange={ ( value ) => setAttributes( { nameFontSize: value } ) }
						min={ 12 }
						max={ 72 }
					/>
					<hr />
					<h3>{ __( 'Description Text', 'wbcom-essential' ) }</h3>
					<ColorControl
						label={ __( 'Color', 'wbcom-essential' ) }
						value={ descriptionColor }
						onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
					/>
					<RangeControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ descriptionFontSize }
						onChange={ ( value ) => setAttributes( { descriptionFontSize: value } ) }
						min={ 10 }
						max={ 32 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-dashboard-intro-inner">
					{ showAvatar && (
						<div className="wbcom-dashboard-intro-avatar">
							<div
								className="avatar-placeholder"
								style={ {
									width: avatarSize,
									height: avatarSize,
									borderRadius: `${ avatarBorderRadius }%`,
									borderStyle: avatarBorderStyle,
									borderWidth: avatarBorderStyle !== 'none' ? `${ avatarBorderWidth }px` : 0,
									borderColor: avatarBorderColor,
									padding: `${ avatarPadding }px`,
									boxShadow:
										avatarShadow.blur > 0 || avatarShadow.spread > 0
											? `${ avatarShadow.horizontal }px ${ avatarShadow.vertical }px ${ avatarShadow.blur }px ${ avatarShadow.spread }px ${ avatarShadow.color }`
											: 'none',
								} }
							>
								<svg viewBox="0 0 24 24" width={ avatarSize * 0.5 } height={ avatarSize * 0.5 }>
									<path
										fill="currentColor"
										d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
									/>
								</svg>
							</div>
						</div>
					) }
					<div className="wbcom-dashboard-intro-content">
						<p className="wbcom-dashboard-intro-greeting">
							{ greetingText }
						</p>
						<h2 className="wbcom-dashboard-intro-name">
							{ __( 'User Name', 'wbcom-essential' ) }
						</h2>
						{ descriptionText && (
							<p className="wbcom-dashboard-intro-description">
								{ descriptionText }
							</p>
						) }
					</div>
				</div>
				<p className="wbcom-dashboard-intro-notice">
					{ __( 'Note: This block displays personalized content for logged-in users.', 'wbcom-essential' ) }
				</p>
			</div>
		</>
	);
}
