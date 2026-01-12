/**
 * Flip Box Block - Edit Component
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
	SelectControl,
	RangeControl,
	ToggleControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

const FLIP_DIRECTIONS = [
	{ label: __( 'Flip Right', 'wbcom-essential' ), value: 'flip-right' },
	{ label: __( 'Flip Left', 'wbcom-essential' ), value: 'flip-left' },
	{ label: __( 'Flip Up', 'wbcom-essential' ), value: 'flip-up' },
	{ label: __( 'Flip Down', 'wbcom-essential' ), value: 'flip-down' },
	{ label: __( 'Diagonal Right', 'wbcom-essential' ), value: 'flip-diagonal-right' },
	{ label: __( 'Diagonal Left', 'wbcom-essential' ), value: 'flip-diagonal-left' },
	{ label: __( 'Inverted Diagonal Right', 'wbcom-essential' ), value: 'flip-inverted-diagonal-right' },
	{ label: __( 'Inverted Diagonal Left', 'wbcom-essential' ), value: 'flip-inverted-diagonal-left' },
	{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoom-in' },
	{ label: __( 'Zoom Out', 'wbcom-essential' ), value: 'zoom-out' },
	{ label: __( 'Rotate', 'wbcom-essential' ), value: 'rotate' },
];

const TIMING_FUNCTIONS = [
	{ label: __( 'Linear', 'wbcom-essential' ), value: 'linear' },
	{ label: __( 'Ease', 'wbcom-essential' ), value: 'ease' },
	{ label: __( 'Ease In', 'wbcom-essential' ), value: 'ease-in' },
	{ label: __( 'Ease Out', 'wbcom-essential' ), value: 'ease-out' },
	{ label: __( 'Ease In Out', 'wbcom-essential' ), value: 'ease-in-out' },
];

const HEADING_TAGS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
];

const BUTTON_SKINS = [
	{ label: __( 'None', 'wbcom-essential' ), value: '' },
	{ label: __( 'Animation 1', 'wbcom-essential' ), value: 'wbcom-btn-1' },
	{ label: __( 'Animation 2', 'wbcom-essential' ), value: 'wbcom-btn-2' },
	{ label: __( 'Animation 3', 'wbcom-essential' ), value: 'wbcom-btn-3' },
	{ label: __( 'Animation 4', 'wbcom-essential' ), value: 'wbcom-btn-4' },
	{ label: __( 'Animation 5', 'wbcom-essential' ), value: 'wbcom-btn-5' },
	{ label: __( 'Animation 6', 'wbcom-essential' ), value: 'wbcom-btn-6' },
	{ label: __( 'Animation 7', 'wbcom-essential' ), value: 'wbcom-btn-7' },
	{ label: __( 'Animation 8', 'wbcom-essential' ), value: 'wbcom-btn-8' },
];

const DASHICONS = [
	{ label: __( 'None', 'wbcom-essential' ), value: '' },
	{ label: __( 'Star', 'wbcom-essential' ), value: 'star-filled' },
	{ label: __( 'Heart', 'wbcom-essential' ), value: 'heart' },
	{ label: __( 'Flag', 'wbcom-essential' ), value: 'flag' },
	{ label: __( 'Award', 'wbcom-essential' ), value: 'awards' },
	{ label: __( 'Lightbulb', 'wbcom-essential' ), value: 'lightbulb' },
	{ label: __( 'Chart', 'wbcom-essential' ), value: 'chart-bar' },
	{ label: __( 'Cart', 'wbcom-essential' ), value: 'cart' },
	{ label: __( 'Admin Users', 'wbcom-essential' ), value: 'admin-users' },
	{ label: __( 'Shield', 'wbcom-essential' ), value: 'shield' },
	{ label: __( 'Performance', 'wbcom-essential' ), value: 'performance' },
	{ label: __( 'Visibility', 'wbcom-essential' ), value: 'visibility' },
	{ label: __( 'Email', 'wbcom-essential' ), value: 'email' },
	{ label: __( 'Location', 'wbcom-essential' ), value: 'location' },
	{ label: __( 'Phone', 'wbcom-essential' ), value: 'phone' },
	{ label: __( 'Calendar', 'wbcom-essential' ), value: 'calendar-alt' },
	{ label: __( 'Clock', 'wbcom-essential' ), value: 'clock' },
	{ label: __( 'Thumbs Up', 'wbcom-essential' ), value: 'thumbs-up' },
	{ label: __( 'Rocket', 'wbcom-essential' ), value: 'airplane' },
	{ label: __( 'Portfolio', 'wbcom-essential' ), value: 'portfolio' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		frontIcon,
		frontTitle,
		frontTitleTag,
		frontContent,
		backIcon,
		backTitle,
		backTitleTag,
		backContent,
		buttonText,
		buttonUrl,
		buttonNewTab,
		flipDirection,
		animationDuration,
		animationTiming,
		boxWidth,
		boxHeight,
		boxAlign,
		frontBackground,
		frontTitleColor,
		frontContentColor,
		frontIconColor,
		frontIconSize,
		backBackground,
		backTitleColor,
		backContentColor,
		backIconColor,
		backIconSize,
		buttonBackground,
		buttonTextColor,
		borderRadius,
		buttonSkin,
		buttonHoverBackground,
		buttonHoverTextColor,
		frontBorderWidth,
		frontBorderColor,
		frontBoxShadow,
		backBorderWidth,
		backBorderColor,
		backBoxShadow,
	} = attributes;

	const [ activeTab, setActiveTab ] = useState( 'front' );

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen>
					<ToggleGroupControl
						label={ __( 'Side', 'wbcom-essential' ) }
						value={ activeTab }
						onChange={ setActiveTab }
						isBlock
					>
						<ToggleGroupControlOption value="front" label={ __( 'Front', 'wbcom-essential' ) } />
						<ToggleGroupControlOption value="back" label={ __( 'Back', 'wbcom-essential' ) } />
					</ToggleGroupControl>

					{ activeTab === 'front' && (
						<>
							<SelectControl
								label={ __( 'Icon', 'wbcom-essential' ) }
								value={ frontIcon }
								options={ DASHICONS }
								onChange={ ( value ) => setAttributes( { frontIcon: value } ) }
							/>

							<TextControl
								label={ __( 'Title', 'wbcom-essential' ) }
								value={ frontTitle }
								onChange={ ( value ) => setAttributes( { frontTitle: value } ) }
							/>

							<SelectControl
								label={ __( 'Title Tag', 'wbcom-essential' ) }
								value={ frontTitleTag }
								options={ HEADING_TAGS }
								onChange={ ( value ) => setAttributes( { frontTitleTag: value } ) }
							/>

							<TextareaControl
								label={ __( 'Content', 'wbcom-essential' ) }
								value={ frontContent }
								onChange={ ( value ) => setAttributes( { frontContent: value } ) }
							/>
						</>
					) }

					{ activeTab === 'back' && (
						<>
							<SelectControl
								label={ __( 'Icon', 'wbcom-essential' ) }
								value={ backIcon }
								options={ DASHICONS }
								onChange={ ( value ) => setAttributes( { backIcon: value } ) }
							/>

							<TextControl
								label={ __( 'Title', 'wbcom-essential' ) }
								value={ backTitle }
								onChange={ ( value ) => setAttributes( { backTitle: value } ) }
							/>

							<SelectControl
								label={ __( 'Title Tag', 'wbcom-essential' ) }
								value={ backTitleTag }
								options={ HEADING_TAGS }
								onChange={ ( value ) => setAttributes( { backTitleTag: value } ) }
							/>

							<TextareaControl
								label={ __( 'Content', 'wbcom-essential' ) }
								value={ backContent }
								onChange={ ( value ) => setAttributes( { backContent: value } ) }
							/>

							<TextControl
								label={ __( 'Button Text', 'wbcom-essential' ) }
								value={ buttonText }
								onChange={ ( value ) => setAttributes( { buttonText: value } ) }
							/>

							<TextControl
								label={ __( 'Button URL', 'wbcom-essential' ) }
								value={ buttonUrl }
								onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
								type="url"
							/>

							<ToggleControl
								label={ __( 'Open in New Tab', 'wbcom-essential' ) }
								checked={ buttonNewTab }
								onChange={ ( value ) => setAttributes( { buttonNewTab: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Animation', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Flip Direction', 'wbcom-essential' ) }
						value={ flipDirection }
						options={ FLIP_DIRECTIONS }
						onChange={ ( value ) => setAttributes( { flipDirection: value } ) }
					/>

					<RangeControl
						label={ __( 'Duration (seconds)', 'wbcom-essential' ) }
						value={ animationDuration }
						onChange={ ( value ) => setAttributes( { animationDuration: value } ) }
						min={ 0.1 }
						max={ 2 }
						step={ 0.1 }
					/>

					<SelectControl
						label={ __( 'Timing Function', 'wbcom-essential' ) }
						value={ animationTiming }
						options={ TIMING_FUNCTIONS }
						onChange={ ( value ) => setAttributes( { animationTiming: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Box Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Width (px)', 'wbcom-essential' ) }
						value={ boxWidth }
						onChange={ ( value ) => setAttributes( { boxWidth: value } ) }
						min={ 150 }
						max={ 600 }
					/>

					<RangeControl
						label={ __( 'Height (px)', 'wbcom-essential' ) }
						value={ boxHeight }
						onChange={ ( value ) => setAttributes( { boxHeight: value } ) }
						min={ 150 }
						max={ 600 }
					/>

					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ boxAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'flex-start' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => setAttributes( { boxAlign: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
				</PanelBody>

				{ ! useThemeColors && (
				<PanelBody title={ __( 'Front Side Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Background', 'wbcom-essential' ) }
						value={ frontBackground }
						onChange={ ( value ) => setAttributes( { frontBackground: value } ) }
					/>

					<ColorControl
						label={ __( 'Icon Color', 'wbcom-essential' ) }
						value={ frontIconColor }
						onChange={ ( value ) => setAttributes( { frontIconColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ frontIconSize }
						onChange={ ( value ) => setAttributes( { frontIconSize: value } ) }
						min={ 16 }
						max={ 128 }
					/>

					<ColorControl
						label={ __( 'Title Color', 'wbcom-essential' ) }
						value={ frontTitleColor }
						onChange={ ( value ) => setAttributes( { frontTitleColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Content Color', 'wbcom-essential' ) }
						value={ frontContentColor }
						onChange={ ( value ) => setAttributes( { frontContentColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ frontBorderWidth }
						onChange={ ( value ) => setAttributes( { frontBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>

					{ frontBorderWidth > 0 && (
						<ColorControl
							label={ __( 'Border Color', 'wbcom-essential' ) }
							value={ frontBorderColor }
							onChange={ ( value ) => setAttributes( { frontBorderColor: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ frontBoxShadow }
						onChange={ ( value ) => setAttributes( { frontBoxShadow: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Back Side Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Background', 'wbcom-essential' ) }
						value={ backBackground }
						onChange={ ( value ) => setAttributes( { backBackground: value } ) }
					/>

					<ColorControl
						label={ __( 'Icon Color', 'wbcom-essential' ) }
						value={ backIconColor }
						onChange={ ( value ) => setAttributes( { backIconColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ backIconSize }
						onChange={ ( value ) => setAttributes( { backIconSize: value } ) }
						min={ 16 }
						max={ 128 }
					/>

					<ColorControl
						label={ __( 'Title Color', 'wbcom-essential' ) }
						value={ backTitleColor }
						onChange={ ( value ) => setAttributes( { backTitleColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Content Color', 'wbcom-essential' ) }
						value={ backContentColor }
						onChange={ ( value ) => setAttributes( { backContentColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ backBorderWidth }
						onChange={ ( value ) => setAttributes( { backBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>

					{ backBorderWidth > 0 && (
						<ColorControl
							label={ __( 'Border Color', 'wbcom-essential' ) }
							value={ backBorderColor }
							onChange={ ( value ) => setAttributes( { backBorderColor: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ backBoxShadow }
						onChange={ ( value ) => setAttributes( { backBoxShadow: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Button Style', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Animation Skin', 'wbcom-essential' ) }
						value={ buttonSkin }
						options={ BUTTON_SKINS }
						onChange={ ( value ) => setAttributes( { buttonSkin: value } ) }
					/>

					<ColorControl
						label={ __( 'Button Background', 'wbcom-essential' ) }
						value={ buttonBackground }
						onChange={ ( value ) => setAttributes( { buttonBackground: value } ) }
					/>

					<ColorControl
						label={ __( 'Button Text Color', 'wbcom-essential' ) }
						value={ buttonTextColor }
						onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Hover Background', 'wbcom-essential' ) }
						value={ buttonHoverBackground }
						onChange={ ( value ) => setAttributes( { buttonHoverBackground: value } ) }
					/>

					<ColorControl
						label={ __( 'Hover Text Color', 'wbcom-essential' ) }
						value={ buttonHoverTextColor }
						onChange={ ( value ) => setAttributes( { buttonHoverTextColor: value } ) }
					/>
				</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/flip-box"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
