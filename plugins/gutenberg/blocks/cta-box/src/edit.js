/**
 * CTA Box Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	TextControl,
	ToggleControl,
	ColorPalette,
	__experimentalDivider as Divider,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		title,
		titleTag,
		description,
		buttonText,
		buttonUrl,
		buttonTarget,
		showSecondButton,
		secondButtonText,
		secondButtonUrl,
		secondButtonTarget,
		layout,
		titleColor,
		descriptionColor,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonHoverTextColor,
		secondButtonBgColor,
		secondButtonTextColor,
		buttonBorderRadius,
		buttonPadding,
		titleSize,
		descriptionSize,
		contentSpacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-cta-box layout-${ layout }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: {
			...( ! useThemeColors && {
				'--title-color': titleColor || undefined,
				'--description-color': descriptionColor || undefined,
				'--button-bg-color': buttonBgColor || undefined,
				'--button-text-color': buttonTextColor || undefined,
				'--button-hover-bg': buttonHoverBgColor || undefined,
				'--button-hover-text': buttonHoverTextColor || undefined,
				'--second-button-bg': secondButtonBgColor || undefined,
				'--second-button-text': secondButtonTextColor || undefined,
			} ),
			'--button-radius': `${ buttonBorderRadius }px`,
			'--button-padding': `${ buttonPadding.top }px ${ buttonPadding.right }px ${ buttonPadding.bottom }px ${ buttonPadding.left }px`,
			'--title-size': `${ titleSize }px`,
			'--description-size': `${ descriptionSize }px`,
			'--content-spacing': `${ contentSpacing }px`,
		},
	} );

	const TitleTag = titleTag;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content Settings', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Title Tag', 'wbcom-essential' ) }
						value={ titleTag }
						options={ [
							{ value: 'h1', label: 'H1' },
							{ value: 'h2', label: 'H2' },
							{ value: 'h3', label: 'H3' },
							{ value: 'h4', label: 'H4' },
							{ value: 'p', label: 'P' },
						] }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
					/>

					<SelectControl
						label={ __( 'Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ value: 'centered', label: __( 'Centered', 'wbcom-essential' ) },
							{ value: 'left', label: __( 'Left Aligned', 'wbcom-essential' ) },
							{ value: 'inline', label: __( 'Inline (Side by Side)', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>

					<RangeControl
						label={ __( 'Content Spacing', 'wbcom-essential' ) }
						value={ contentSpacing }
						onChange={ ( value ) => setAttributes( { contentSpacing: value } ) }
						min={ 8 }
						max={ 60 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Primary Button', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
						placeholder="https://"
					/>

					{ buttonUrl && (
						<ToggleControl
							label={ __( 'Open in new tab', 'wbcom-essential' ) }
							checked={ buttonTarget }
							onChange={ ( value ) => setAttributes( { buttonTarget: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Secondary Button', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Secondary Button', 'wbcom-essential' ) }
						checked={ showSecondButton }
						onChange={ ( value ) => setAttributes( { showSecondButton: value } ) }
					/>

					{ showSecondButton && (
						<>
							<TextControl
								label={ __( 'Button URL', 'wbcom-essential' ) }
								value={ secondButtonUrl }
								onChange={ ( value ) => setAttributes( { secondButtonUrl: value } ) }
								placeholder="https://"
							/>

							{ secondButtonUrl && (
								<ToggleControl
									label={ __( 'Open in new tab', 'wbcom-essential' ) }
									checked={ secondButtonTarget }
									onChange={ ( value ) => setAttributes( { secondButtonTarget: value } ) }
								/>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Button Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ buttonBorderRadius }
						onChange={ ( value ) => setAttributes( { buttonBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Vertical Padding', 'wbcom-essential' ) }
						value={ buttonPadding.top }
						onChange={ ( value ) => setAttributes( {
							buttonPadding: { ...buttonPadding, top: value, bottom: value },
						} ) }
						min={ 4 }
						max={ 32 }
					/>

					<RangeControl
						label={ __( 'Horizontal Padding', 'wbcom-essential' ) }
						value={ buttonPadding.right }
						onChange={ ( value ) => setAttributes( {
							buttonPadding: { ...buttonPadding, left: value, right: value },
						} ) }
						min={ 8 }
						max={ 60 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Title Size', 'wbcom-essential' ) }
						value={ titleSize }
						onChange={ ( value ) => setAttributes( { titleSize: value } ) }
						min={ 16 }
						max={ 72 }
					/>

					<RangeControl
						label={ __( 'Description Size', 'wbcom-essential' ) }
						value={ descriptionSize }
						onChange={ ( value ) => setAttributes( { descriptionSize: value } ) }
						min={ 12 }
						max={ 32 }
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

					{ ! useThemeColors && (
						<>
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

							<Divider />

							<p>{ __( 'Primary Button Background', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ buttonBgColor }
								onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
							/>

							<p>{ __( 'Primary Button Text', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ buttonTextColor }
								onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
							/>

							{ showSecondButton && (
								<>
									<Divider />

									<p>{ __( 'Secondary Button Background', 'wbcom-essential' ) }</p>
									<ColorPalette
										value={ secondButtonBgColor }
										onChange={ ( value ) => setAttributes( { secondButtonBgColor: value } ) }
									/>

									<p>{ __( 'Secondary Button Text', 'wbcom-essential' ) }</p>
									<ColorPalette
										value={ secondButtonTextColor }
										onChange={ ( value ) => setAttributes( { secondButtonTextColor: value } ) }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-cta-box__content">
					<RichText
						tagName={ TitleTag }
						className="wbcom-essential-cta-box__title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						placeholder={ __( 'CTA Title', 'wbcom-essential' ) }
					/>

					<RichText
						tagName="p"
						className="wbcom-essential-cta-box__description"
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
						placeholder={ __( 'Add a compelling description...', 'wbcom-essential' ) }
					/>
				</div>

				<div className="wbcom-essential-cta-box__buttons">
					<RichText
						tagName="span"
						className="wbcom-essential-cta-box__button wbcom-essential-cta-box__button--primary"
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
						placeholder={ __( 'Button Text', 'wbcom-essential' ) }
					/>

					{ showSecondButton && (
						<RichText
							tagName="span"
							className="wbcom-essential-cta-box__button wbcom-essential-cta-box__button--secondary"
							value={ secondButtonText }
							onChange={ ( value ) => setAttributes( { secondButtonText: value } ) }
							placeholder={ __( 'Button Text', 'wbcom-essential' ) }
						/>
					) }
				</div>
			</div>
		</>
	);
}
