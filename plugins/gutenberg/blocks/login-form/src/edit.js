/**
 * Login Form Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	__experimentalDivider as Divider,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		// Logo settings.
		showLogo,
		logoUrl,
		logoId,
		logoWidth,
		logoAlign,
		logoBorderRadius,
		logoMarginBottom,
		// Title settings.
		showTitle,
		title,
		titleTag,
		titleAlign,
		titleMarginBottom,
		// Subtitle settings.
		showSubtitle,
		subtitle,
		subtitleTag,
		subtitleAlign,
		subtitleMarginBottom,
		// Form labels.
		usernameLabel,
		usernamePlaceholder,
		passwordLabel,
		passwordPlaceholder,
		showLabels,
		buttonText,
		// Options.
		showRememberMe,
		rememberMeLabel,
		showLostPassword,
		lostPasswordText,
		showRegister,
		registerText,
		linkSeparator,
		// Redirect.
		redirectEnabled,
		redirectUrl,
		// Logged in.
		showLoggedInMessage,
		loggedInMessage,
		testMode,
		// Form container.
		formWidth,
		formWidthUnit,
		formAlign,
		rowsGap,
		formBgColor,
		formPadding,
		formBorderRadius,
		formBorderColor,
		formBorderWidth,
		formBoxShadow,
		// Typography colors.
		titleColor,
		subtitleColor,
		labelColor,
		labelAlign,
		// Input styling.
		inputBgColor,
		inputBorderColor,
		inputTextColor,
		inputPlaceholderColor,
		inputFocusBorderColor,
		inputFocusBgColor,
		inputBorderRadius,
		inputPaddingV,
		inputPaddingH,
		inputWidth,
		inputAlign,
		// Button styling.
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		buttonHoverTextColor,
		buttonBorderColor,
		buttonHoverBorderColor,
		buttonBorderRadius,
		buttonBorderWidth,
		buttonPaddingV,
		buttonPaddingH,
		buttonWidth,
		buttonAlign,
		// Links styling.
		linkColor,
		linkHoverColor,
		linksAlign,
		linksMarginTop,
		checkboxColor,
		// Logged in message styling.
		loggedInMsgColor,
		loggedInMsgAlign,
	} = attributes;

	const TitleTag = titleTag || 'h2';
	const SubtitleTag = subtitleTag || 'p';

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-login-form-editor',
	} );

	// Build inline styles for preview.
	const inlineStyles = {
		'--form-bg-color': formBgColor || '#ffffff',
		'--form-padding': `${ formPadding }px`,
		'--form-border-radius': `${ formBorderRadius }px`,
		'--form-width': `${ formWidth }${ formWidthUnit }`,
		'--form-border-color': formBorderColor || 'transparent',
		'--form-border-width': `${ formBorderWidth }px`,
		'--form-box-shadow': formBoxShadow ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
		'--form-align': formAlign,
		'--rows-gap': `${ rowsGap }px`,
		'--logo-width': `${ logoWidth }px`,
		'--logo-align': logoAlign,
		'--logo-border-radius': `${ logoBorderRadius }px`,
		'--logo-margin-bottom': `${ logoMarginBottom }px`,
		'--title-color': titleColor || '#122B46',
		'--title-align': titleAlign,
		'--title-margin-bottom': `${ titleMarginBottom }px`,
		'--subtitle-color': subtitleColor || '#666666',
		'--subtitle-align': subtitleAlign,
		'--subtitle-margin-bottom': `${ subtitleMarginBottom }px`,
		'--label-color': labelColor || '#122B46',
		'--label-align': labelAlign,
		'--input-bg-color': inputBgColor || '#f8f9fa',
		'--input-border-color': inputBorderColor || '#e3e3e3',
		'--input-text-color': inputTextColor || '#122B46',
		'--input-placeholder-color': inputPlaceholderColor || '#a0aec0',
		'--input-focus-border-color': inputFocusBorderColor || '#1d76da',
		'--input-focus-bg-color': inputFocusBgColor || '',
		'--input-border-radius': `${ inputBorderRadius }px`,
		'--input-padding-v': `${ inputPaddingV }px`,
		'--input-padding-h': `${ inputPaddingH }px`,
		'--input-width': `${ inputWidth }%`,
		'--input-align': inputAlign,
		'--button-bg-color': buttonBgColor || '#1d76da',
		'--button-text-color': buttonTextColor || '#ffffff',
		'--button-hover-bg-color': buttonHoverBgColor || '#1557a0',
		'--button-hover-text-color': buttonHoverTextColor || '#ffffff',
		'--button-border-color': buttonBorderColor || 'transparent',
		'--button-hover-border-color': buttonHoverBorderColor || 'transparent',
		'--button-border-radius': `${ buttonBorderRadius }px`,
		'--button-border-width': `${ buttonBorderWidth }px`,
		'--button-padding-v': `${ buttonPaddingV }px`,
		'--button-padding-h': `${ buttonPaddingH }px`,
		'--button-width': `${ buttonWidth }%`,
		'--button-align': buttonAlign,
		'--link-color': linkColor || '#1d76da',
		'--link-hover-color': linkHoverColor || '#1557a0',
		'--links-align': linksAlign,
		'--links-margin-top': `${ linksMarginTop }px`,
		'--checkbox-color': checkboxColor || '#1d76da',
		'--logged-in-msg-color': loggedInMsgColor || '#122B46',
		'--logged-in-msg-align': loggedInMsgAlign,
	};

	const onSelectLogo = ( media ) => {
		setAttributes( {
			logoUrl: media.url,
			logoId: media.id,
		} );
	};

	const onRemoveLogo = () => {
		setAttributes( {
			logoUrl: '',
			logoId: 0,
		} );
	};

	const htmlTagOptions = [
		{ label: 'H1', value: 'h1' },
		{ label: 'H2', value: 'h2' },
		{ label: 'H3', value: 'h3' },
		{ label: 'H4', value: 'h4' },
		{ label: 'H5', value: 'h5' },
		{ label: 'H6', value: 'h6' },
		{ label: 'Div', value: 'div' },
		{ label: 'Span', value: 'span' },
		{ label: 'P', value: 'p' },
	];

	const alignOptions = [
		{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
		{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
		{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
	];

	const flexAlignOptions = [
		{ label: __( 'Start', 'wbcom-essential' ), value: 'flex-start' },
		{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
		{ label: __( 'End', 'wbcom-essential' ), value: 'flex-end' },
	];

	return (
		<>
			<InspectorControls>
				{ /* Login Form Content Panel */ }
				<PanelBody title={ __( 'Login Form', 'wbcom-essential' ) }>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectLogo }
							allowedTypes={ [ 'image' ] }
							value={ logoId }
							render={ ( { open } ) => (
								<div className="wbcom-media-upload">
									<p className="components-base-control__label">
										{ __( 'Logo', 'wbcom-essential' ) }
									</p>
									{ logoUrl ? (
										<div className="wbcom-media-preview">
											<img src={ logoUrl } alt="" />
											<div className="wbcom-media-actions">
												<Button
													variant="secondary"
													onClick={ open }
													isSmall
												>
													{ __( 'Replace', 'wbcom-essential' ) }
												</Button>
												<Button
													variant="tertiary"
													onClick={ onRemoveLogo }
													isSmall
													isDestructive
												>
													{ __( 'Remove', 'wbcom-essential' ) }
												</Button>
											</div>
										</div>
									) : (
										<Button
											variant="secondary"
											onClick={ open }
										>
											{ __( 'Select Logo', 'wbcom-essential' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>

					<Divider />

					<TextControl
						label={ __( 'Title', 'wbcom-essential' ) }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>

					<SelectControl
						label={ __( 'Title HTML Tag', 'wbcom-essential' ) }
						value={ titleTag }
						options={ htmlTagOptions }
						onChange={ ( value ) => setAttributes( { titleTag: value } ) }
					/>

					<TextControl
						label={ __( 'Sub Title', 'wbcom-essential' ) }
						value={ subtitle }
						onChange={ ( value ) => setAttributes( { subtitle: value } ) }
					/>

					<SelectControl
						label={ __( 'Sub Title HTML Tag', 'wbcom-essential' ) }
						value={ subtitleTag }
						options={ htmlTagOptions }
						onChange={ ( value ) => setAttributes( { subtitleTag: value } ) }
					/>

					<Divider />

					<TextControl
						label={ __( 'Username', 'wbcom-essential' ) }
						value={ usernameLabel }
						onChange={ ( value ) => setAttributes( { usernameLabel: value } ) }
					/>

					<TextControl
						label={ __( 'Password', 'wbcom-essential' ) }
						value={ passwordLabel }
						onChange={ ( value ) => setAttributes( { passwordLabel: value } ) }
					/>

					<TextControl
						label={ __( 'Remember Me', 'wbcom-essential' ) }
						value={ rememberMeLabel }
						onChange={ ( value ) => setAttributes( { rememberMeLabel: value } ) }
					/>

					<TextControl
						label={ __( 'Register', 'wbcom-essential' ) }
						value={ registerText }
						onChange={ ( value ) => setAttributes( { registerText: value } ) }
					/>

					<TextControl
						label={ __( 'Link Separator', 'wbcom-essential' ) }
						value={ linkSeparator }
						onChange={ ( value ) => setAttributes( { linkSeparator: value } ) }
					/>

					<TextControl
						label={ __( 'Lost Password', 'wbcom-essential' ) }
						value={ lostPasswordText }
						onChange={ ( value ) => setAttributes( { lostPasswordText: value } ) }
					/>

					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
				</PanelBody>

				{ /* Additional Options Panel */ }
				<PanelBody title={ __( 'Additional Options', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Redirect After Login', 'wbcom-essential' ) }
						checked={ redirectEnabled }
						onChange={ ( value ) => setAttributes( { redirectEnabled: value } ) }
					/>

					{ redirectEnabled && (
						<TextControl
							label={ __( 'Redirect URL', 'wbcom-essential' ) }
							value={ redirectUrl }
							onChange={ ( value ) => setAttributes( { redirectUrl: value } ) }
							help={ __( 'Note: Because of security reasons, you can ONLY use your current domain here.', 'wbcom-essential' ) }
							placeholder="https://your-link.com"
						/>
					) }

					<ToggleControl
						label={ __( 'Lost Password', 'wbcom-essential' ) }
						checked={ showLostPassword }
						onChange={ ( value ) => setAttributes( { showLostPassword: value } ) }
					/>

					<ToggleControl
						label={ __( 'Register', 'wbcom-essential' ) }
						help={ __( 'You must enable "membership" from WordPress settings.', 'wbcom-essential' ) }
						checked={ showRegister }
						onChange={ ( value ) => setAttributes( { showRegister: value } ) }
					/>

					<ToggleControl
						label={ __( 'Remember Me', 'wbcom-essential' ) }
						checked={ showRememberMe }
						onChange={ ( value ) => setAttributes( { showRememberMe: value } ) }
					/>

					<ToggleControl
						label={ __( 'Logged in Message', 'wbcom-essential' ) }
						checked={ showLoggedInMessage }
						onChange={ ( value ) => setAttributes( { showLoggedInMessage: value } ) }
					/>

					{ showLoggedInMessage && (
						<TextControl
							label={ __( 'Logged in Message', 'wbcom-essential' ) }
							value={ loggedInMessage }
							onChange={ ( value ) => setAttributes( { loggedInMessage: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Test Mode', 'wbcom-essential' ) }
						checked={ testMode }
						onChange={ ( value ) => setAttributes( { testMode: value } ) }
						help={ __( 'Enable to preview the form while logged in.', 'wbcom-essential' ) }
					/>
				</PanelBody>

				{ /* Form Container Style */ }
				<PanelBody title={ __( 'Form Container', 'wbcom-essential' ) } initialOpen={ false }>
					<div className="wbcom-control-row">
						<RangeControl
							label={ __( 'Maximum Width', 'wbcom-essential' ) }
							value={ formWidth }
							onChange={ ( value ) => setAttributes( { formWidth: value } ) }
							min={ 200 }
							max={ formWidthUnit === '%' ? 100 : 1000 }
						/>
						<SelectControl
							value={ formWidthUnit }
							options={ [
								{ label: '%', value: '%' },
								{ label: 'px', value: 'px' },
								{ label: 'rem', value: 'rem' },
							] }
							onChange={ ( value ) => setAttributes( { formWidthUnit: value } ) }
							__nextHasNoMarginBottom
						/>
					</div>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Horizontal Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ flexAlignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ formAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { formAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<RangeControl
						label={ __( 'Rows Gap', 'wbcom-essential' ) }
						value={ rowsGap }
						onChange={ ( value ) => setAttributes( { rowsGap: value } ) }
						min={ 0 }
						max={ 100 }
					/>

					<Divider />

					<ColorControl
						label={ __( 'Background', 'wbcom-essential' ) }
						value={ formBgColor }
						onChange={ ( value ) => setAttributes( { formBgColor: value } ) }
					/>

					<Divider />

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ formBorderColor }
						onChange={ ( value ) => setAttributes( { formBorderColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ formBorderWidth }
						onChange={ ( value ) => setAttributes( { formBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ formBorderRadius }
						onChange={ ( value ) => setAttributes( { formBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<ToggleControl
						label={ __( 'Box Shadow', 'wbcom-essential' ) }
						checked={ formBoxShadow }
						onChange={ ( value ) => setAttributes( { formBoxShadow: value } ) }
					/>

					<Divider />

					<RangeControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ formPadding }
						onChange={ ( value ) => setAttributes( { formPadding: value } ) }
						min={ 0 }
						max={ 80 }
					/>
				</PanelBody>

				{ /* Logo Style */ }
				<PanelBody title={ __( 'Logo', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Maximum Width', 'wbcom-essential' ) }
						value={ logoWidth }
						onChange={ ( value ) => setAttributes( { logoWidth: value } ) }
						min={ 50 }
						max={ 400 }
					/>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Horizontal Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ flexAlignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ logoAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { logoAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<Divider />

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ logoBorderRadius }
						onChange={ ( value ) => setAttributes( { logoBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<RangeControl
						label={ __( 'Margin Bottom', 'wbcom-essential' ) }
						value={ logoMarginBottom }
						onChange={ ( value ) => setAttributes( { logoMarginBottom: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

				{ /* Title Style */ }
				<PanelBody title={ __( 'Title', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Text Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ alignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ titleAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { titleAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<Divider />

					<RangeControl
						label={ __( 'Margin Bottom', 'wbcom-essential' ) }
						value={ titleMarginBottom }
						onChange={ ( value ) => setAttributes( { titleMarginBottom: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

				{ /* Subtitle Style */ }
				<PanelBody title={ __( 'Sub Title', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ subtitleColor }
						onChange={ ( value ) => setAttributes( { subtitleColor: value } ) }
					/>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Text Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ alignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ subtitleAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { subtitleAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<Divider />

					<RangeControl
						label={ __( 'Margin Bottom', 'wbcom-essential' ) }
						value={ subtitleMarginBottom }
						onChange={ ( value ) => setAttributes( { subtitleMarginBottom: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

				{ /* Labels Style */ }
				<PanelBody title={ __( 'Labels', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Labels', 'wbcom-essential' ) }
						checked={ showLabels }
						onChange={ ( value ) => setAttributes( { showLabels: value } ) }
					/>

					<ColorControl
						label={ __( 'Color', 'wbcom-essential' ) }
						value={ labelColor }
						onChange={ ( value ) => setAttributes( { labelColor: value } ) }
					/>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Text Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ alignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ labelAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { labelAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>
				</PanelBody>

				{ /* Input & Textarea Style */ }
				<PanelBody title={ __( 'Input & Textarea', 'wbcom-essential' ) } initialOpen={ false }>
					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Text Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ alignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ inputAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { inputAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<RangeControl
						label={ __( 'Width (%)', 'wbcom-essential' ) }
						value={ inputWidth }
						onChange={ ( value ) => setAttributes( { inputWidth: value } ) }
						min={ 50 }
						max={ 100 }
					/>

					<Divider />

					<p className="wbcom-panel-subtitle">{ __( 'Normal', 'wbcom-essential' ) }</p>

					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ inputTextColor }
						onChange={ ( value ) => setAttributes( { inputTextColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Placeholder Color', 'wbcom-essential' ) }
						value={ inputPlaceholderColor }
						onChange={ ( value ) => setAttributes( { inputPlaceholderColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ inputBgColor }
						onChange={ ( value ) => setAttributes( { inputBgColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ inputBorderColor }
						onChange={ ( value ) => setAttributes( { inputBorderColor: value } ) }
					/>

					<Divider />

					<p className="wbcom-panel-subtitle">{ __( 'Focus', 'wbcom-essential' ) }</p>

					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ inputFocusBgColor }
						onChange={ ( value ) => setAttributes( { inputFocusBgColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ inputFocusBorderColor }
						onChange={ ( value ) => setAttributes( { inputFocusBorderColor: value } ) }
					/>

					<Divider />

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ inputBorderRadius }
						onChange={ ( value ) => setAttributes( { inputBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>

					<RangeControl
						label={ __( 'Vertical Padding', 'wbcom-essential' ) }
						value={ inputPaddingV }
						onChange={ ( value ) => setAttributes( { inputPaddingV: value } ) }
						min={ 4 }
						max={ 30 }
					/>

					<RangeControl
						label={ __( 'Horizontal Padding', 'wbcom-essential' ) }
						value={ inputPaddingH }
						onChange={ ( value ) => setAttributes( { inputPaddingH: value } ) }
						min={ 8 }
						max={ 40 }
					/>
				</PanelBody>

				{ /* Submit Button Style */ }
				<PanelBody title={ __( 'Submit Button', 'wbcom-essential' ) } initialOpen={ false }>
					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Horizontal Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ flexAlignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ buttonAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { buttonAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<RangeControl
						label={ __( 'Button Width (%)', 'wbcom-essential' ) }
						value={ buttonWidth }
						onChange={ ( value ) => setAttributes( { buttonWidth: value } ) }
						min={ 20 }
						max={ 100 }
					/>

					<Divider />

					<p className="wbcom-panel-subtitle">{ __( 'Normal', 'wbcom-essential' ) }</p>

					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ buttonTextColor }
						onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ buttonBgColor }
						onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ buttonBorderColor }
						onChange={ ( value ) => setAttributes( { buttonBorderColor: value } ) }
					/>

					<Divider />

					<p className="wbcom-panel-subtitle">{ __( 'Hover', 'wbcom-essential' ) }</p>

					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ buttonHoverTextColor }
						onChange={ ( value ) => setAttributes( { buttonHoverTextColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ buttonHoverBgColor }
						onChange={ ( value ) => setAttributes( { buttonHoverBgColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ buttonHoverBorderColor }
						onChange={ ( value ) => setAttributes( { buttonHoverBorderColor: value } ) }
					/>

					<Divider />

					<RangeControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ buttonBorderWidth }
						onChange={ ( value ) => setAttributes( { buttonBorderWidth: value } ) }
						min={ 0 }
						max={ 10 }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ buttonBorderRadius }
						onChange={ ( value ) => setAttributes( { buttonBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>

					<RangeControl
						label={ __( 'Vertical Padding', 'wbcom-essential' ) }
						value={ buttonPaddingV }
						onChange={ ( value ) => setAttributes( { buttonPaddingV: value } ) }
						min={ 6 }
						max={ 30 }
					/>

					<RangeControl
						label={ __( 'Horizontal Padding', 'wbcom-essential' ) }
						value={ buttonPaddingH }
						onChange={ ( value ) => setAttributes( { buttonPaddingH: value } ) }
						min={ 12 }
						max={ 60 }
					/>
				</PanelBody>

				{ /* Links Style */ }
				<PanelBody title={ __( 'Links', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Link Color', 'wbcom-essential' ) }
						value={ linkColor }
						onChange={ ( value ) => setAttributes( { linkColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Link Hover Color', 'wbcom-essential' ) }
						value={ linkHoverColor }
						onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
					/>

					<div className="wbcom-control-group">
						<p className="components-base-control__label">
							{ __( 'Horizontal Align', 'wbcom-essential' ) }
						</p>
						<ButtonGroup>
							{ flexAlignOptions.map( ( option ) => (
								<Button
									key={ option.value }
									variant={ linksAlign === option.value ? 'primary' : 'secondary' }
									onClick={ () => setAttributes( { linksAlign: option.value } ) }
								>
									{ option.label }
								</Button>
							) ) }
						</ButtonGroup>
					</div>

					<Divider />

					<RangeControl
						label={ __( 'Margin Top', 'wbcom-essential' ) }
						value={ linksMarginTop }
						onChange={ ( value ) => setAttributes( { linksMarginTop: value } ) }
						min={ 0 }
						max={ 60 }
					/>

					<Divider />

					<ColorControl
						label={ __( 'Checkbox Color', 'wbcom-essential' ) }
						value={ checkboxColor }
						onChange={ ( value ) => setAttributes( { checkboxColor: value } ) }
					/>
				</PanelBody>

				{ /* Logged in Message Style */ }
				{ showLoggedInMessage && (
					<PanelBody title={ __( 'Logged in Message', 'wbcom-essential' ) } initialOpen={ false }>
						<ColorControl
							label={ __( 'Color', 'wbcom-essential' ) }
							value={ loggedInMsgColor }
							onChange={ ( value ) => setAttributes( { loggedInMsgColor: value } ) }
						/>

						<div className="wbcom-control-group">
							<p className="components-base-control__label">
								{ __( 'Text Align', 'wbcom-essential' ) }
							</p>
							<ButtonGroup>
								{ alignOptions.map( ( option ) => (
									<Button
										key={ option.value }
										variant={ loggedInMsgAlign === option.value ? 'primary' : 'secondary' }
										onClick={ () => setAttributes( { loggedInMsgAlign: option.value } ) }
									>
										{ option.label }
									</Button>
								) ) }
							</ButtonGroup>
						</div>
					</PanelBody>
				) }
			</InspectorControls>

			<div { ...blockProps } style={ inlineStyles }>
				<div className="wbcom-essential-login-form">
					{ showLogo && logoUrl && (
						<div className="wbcom-essential-login-form__logo">
							<img src={ logoUrl } alt="" />
						</div>
					) }

					{ showTitle && title && (
						<TitleTag className="wbcom-essential-login-form__title">
							{ title }
						</TitleTag>
					) }

					{ showSubtitle && subtitle && (
						<SubtitleTag className="wbcom-essential-login-form__subtitle">
							{ subtitle }
						</SubtitleTag>
					) }

					<div className="wbcom-essential-login-form__fields">
						<div className="wbcom-essential-login-form__field">
							{ showLabels && (
								<label className="wbcom-essential-login-form__label">
									{ usernameLabel }
								</label>
							) }
							<input
								type="text"
								className="wbcom-essential-login-form__input"
								placeholder={ usernamePlaceholder }
								disabled
							/>
						</div>

						<div className="wbcom-essential-login-form__field">
							{ showLabels && (
								<label className="wbcom-essential-login-form__label">
									{ passwordLabel }
								</label>
							) }
							<input
								type="password"
								className="wbcom-essential-login-form__input"
								placeholder={ passwordPlaceholder }
								disabled
							/>
						</div>

						<div className="wbcom-essential-login-form__options">
							{ showRememberMe && (
								<label className="wbcom-essential-login-form__remember">
									<input type="checkbox" disabled />
									<span>{ rememberMeLabel }</span>
								</label>
							) }

							{ showLostPassword && (
								<a href="#" className="wbcom-essential-login-form__lost-password">
									{ lostPasswordText }
								</a>
							) }
						</div>

						<div className="wbcom-essential-login-form__button-wrapper">
							<button
								type="button"
								className="wbcom-essential-login-form__button"
								disabled
							>
								{ buttonText }
							</button>
						</div>

						{ ( showRegister || showLostPassword ) && (
							<ul className="wbcom-essential-login-form__links">
								{ showRegister && (
									<li>
										<a href="#">{ registerText }</a>
									</li>
								) }
								{ showRegister && showLostPassword && linkSeparator && (
									<li className="wbcom-essential-login-form__separator">
										{ linkSeparator }
									</li>
								) }
							</ul>
						) }
					</div>
				</div>

				<p className="wbcom-login-form-notice">
					{ __( 'This is a preview. The actual form will be rendered on the frontend.', 'wbcom-essential' ) }
				</p>
			</div>
		</>
	);
}
