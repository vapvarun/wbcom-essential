/**
 * Icon Box Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	Dashicon,
	ColorPalette,
	__experimentalDivider as Divider,
} from '@wordpress/components';

// Common dashicons for icon selection.
const ICON_OPTIONS = [
	{ value: 'star-filled', label: 'Star' },
	{ value: 'heart', label: 'Heart' },
	{ value: 'admin-users', label: 'Users' },
	{ value: 'admin-tools', label: 'Tools' },
	{ value: 'admin-site', label: 'Globe' },
	{ value: 'shield', label: 'Shield' },
	{ value: 'lightbulb', label: 'Lightbulb' },
	{ value: 'chart-bar', label: 'Chart' },
	{ value: 'money-alt', label: 'Money' },
	{ value: 'clock', label: 'Clock' },
	{ value: 'email', label: 'Email' },
	{ value: 'phone', label: 'Phone' },
	{ value: 'location', label: 'Location' },
	{ value: 'cart', label: 'Cart' },
	{ value: 'format-chat', label: 'Chat' },
	{ value: 'megaphone', label: 'Megaphone' },
	{ value: 'thumbs-up', label: 'Thumbs Up' },
	{ value: 'awards', label: 'Award' },
	{ value: 'visibility', label: 'Eye' },
	{ value: 'admin-appearance', label: 'Palette' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		icon,
		iconType,
		customIconUrl,
		title,
		description,
		titleTag,
		linkUrl,
		linkTarget,
		layout,
		alignment,
		iconSize,
		iconColor,
		iconBgColor,
		iconBorderRadius,
		iconPadding,
		titleColor,
		descriptionColor,
		iconSpacing,
		titleSpacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-icon-box layout-${ layout } align-${ alignment }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: {
			'--icon-size': `${ iconSize }px`,
			'--icon-border-radius': `${ iconBorderRadius }%`,
			'--icon-padding': `${ iconPadding }px`,
			'--icon-spacing': `${ iconSpacing }px`,
			'--title-spacing': `${ titleSpacing }px`,
			// Only apply color styles when not using theme colors.
			...( ! useThemeColors && {
				'--icon-color': iconColor || undefined,
				'--icon-bg-color': iconBgColor || undefined,
				'--title-color': titleColor || undefined,
				'--description-color': descriptionColor || undefined,
			} ),
		},
	} );

	const TitleTag = titleTag;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Icon Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Icon Type', 'wbcom-essential' ) }
						value={ iconType }
						options={ [
							{ value: 'dashicon', label: __( 'Dashicon', 'wbcom-essential' ) },
							{ value: 'custom', label: __( 'Custom Image', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { iconType: value } ) }
					/>

					{ iconType === 'dashicon' && (
						<SelectControl
							label={ __( 'Select Icon', 'wbcom-essential' ) }
							value={ icon }
							options={ ICON_OPTIONS }
							onChange={ ( value ) => setAttributes( { icon: value } ) }
						/>
					) }

					{ iconType === 'custom' && (
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => setAttributes( { customIconUrl: media.url } ) }
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<div className="wbcom-icon-upload">
										{ customIconUrl ? (
											<>
												<img src={ customIconUrl } alt="" style={ { maxWidth: '60px' } } />
												<Button isSecondary onClick={ open }>
													{ __( 'Replace', 'wbcom-essential' ) }
												</Button>
												<Button isDestructive onClick={ () => setAttributes( { customIconUrl: '' } ) }>
													{ __( 'Remove', 'wbcom-essential' ) }
												</Button>
											</>
										) : (
											<Button isPrimary onClick={ open }>
												{ __( 'Upload Icon', 'wbcom-essential' ) }
											</Button>
										) }
									</div>
								) }
							/>
						</MediaUploadCheck>
					) }

					<RangeControl
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 16 }
						max={ 120 }
					/>

					<RangeControl
						label={ __( 'Icon Padding', 'wbcom-essential' ) }
						value={ iconPadding }
						onChange={ ( value ) => setAttributes( { iconPadding: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					<RangeControl
						label={ __( 'Icon Border Radius (%)', 'wbcom-essential' ) }
						value={ iconBorderRadius }
						onChange={ ( value ) => setAttributes( { iconBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Icon Spacing', 'wbcom-essential' ) }
						value={ iconSpacing }
						onChange={ ( value ) => setAttributes( { iconSpacing: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Icon Position', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ value: 'top', label: __( 'Top', 'wbcom-essential' ) },
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>

					<SelectControl
						label={ __( 'Content Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>

					<SelectControl
						label={ __( 'Title Tag', 'wbcom-essential' ) }
						value={ titleTag }
						options={ [
							{ value: 'h2', label: 'H2' },
							{ value: 'h3', label: 'H3' },
							{ value: 'h4', label: 'H4' },
							{ value: 'h5', label: 'H5' },
							{ value: 'h6', label: 'H6' },
							{ value: 'p', label: 'P' },
						] }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
					/>

					<RangeControl
						label={ __( 'Title Spacing', 'wbcom-essential' ) }
						value={ titleSpacing }
						onChange={ ( value ) => setAttributes( { titleSpacing: value } ) }
						min={ 0 }
						max={ 40 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Link', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Link URL', 'wbcom-essential' ) }
						value={ linkUrl }
						onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
						placeholder="https://"
					/>
					{ linkUrl && (
						<ToggleControl
							label={ __( 'Open in new tab', 'wbcom-essential' ) }
							checked={ linkTarget }
							onChange={ ( value ) => setAttributes( { linkTarget: value } ) }
						/>
					) }
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
					{ ! useThemeColors && (
						<>
							<Divider />

							<p>{ __( 'Icon Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
							/>

							<Divider />

							<p>{ __( 'Icon Background', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ iconBgColor }
								onChange={ ( value ) => setAttributes( { iconBgColor: value } ) }
							/>

							<Divider />

							<p>{ __( 'Title Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ titleColor }
								onChange={ ( value ) => setAttributes( { titleColor: value } ) }
							/>

							<Divider />

							<p>{ __( 'Description Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ descriptionColor }
								onChange={ ( value ) => setAttributes( { descriptionColor: value } ) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-icon-box__icon">
					{ iconType === 'dashicon' ? (
						<Dashicon icon={ icon } />
					) : customIconUrl ? (
						<img src={ customIconUrl } alt="" />
					) : (
						<Dashicon icon="star-filled" />
					) }
				</div>
				<div className="wbcom-essential-icon-box__content">
					<RichText
						tagName={ TitleTag }
						className="wbcom-essential-icon-box__title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						placeholder={ __( 'Feature Title', 'wbcom-essential' ) }
					/>
					<RichText
						tagName="p"
						className="wbcom-essential-icon-box__description"
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
						placeholder={ __( 'Add description...', 'wbcom-essential' ) }
					/>
				</div>
			</div>
		</>
	);
}
