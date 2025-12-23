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
	__experimentalDivider as Divider,
} from '@wordpress/components';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		showLogo,
		logoUrl,
		logoId,
		logoWidth,
		showTitle,
		title,
		titleTag,
		showSubtitle,
		subtitle,
		usernameLabel,
		usernamePlaceholder,
		passwordLabel,
		passwordPlaceholder,
		showLabels,
		showRememberMe,
		rememberMeLabel,
		buttonText,
		showLostPassword,
		lostPasswordText,
		showRegister,
		registerText,
		registerLinkText,
		redirectUrl,
		showLoggedInMessage,
		loggedInMessage,
		testMode,
		formBgColor,
		formPadding,
		formBorderRadius,
		titleColor,
		subtitleColor,
		labelColor,
		inputBgColor,
		inputBorderColor,
		inputTextColor,
		inputFocusBorderColor,
		buttonBgColor,
		buttonTextColor,
		buttonHoverBgColor,
		linkColor,
		linkHoverColor,
		formWidth,
		formBorderColor,
		formBorderWidth,
		formBoxShadow,
		inputBorderRadius,
		inputPaddingV,
		inputPaddingH,
		buttonBorderRadius,
		buttonPaddingV,
		buttonPaddingH,
		checkboxColor,
	} = attributes;

	const TitleTag = titleTag || 'h2';

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-login-form-editor',
	} );

	const inlineStyles = {
		'--form-bg-color': formBgColor,
		'--form-padding': `${ formPadding }px`,
		'--form-border-radius': `${ formBorderRadius }px`,
		'--form-width': `${ formWidth }px`,
		'--form-border-color': formBorderColor || 'transparent',
		'--form-border-width': `${ formBorderWidth }px`,
		'--form-box-shadow': formBoxShadow ? '0 4px 20px rgba(0, 0, 0, 0.08)' : 'none',
		'--title-color': titleColor,
		'--subtitle-color': subtitleColor,
		'--label-color': labelColor,
		'--input-bg-color': inputBgColor,
		'--input-border-color': inputBorderColor,
		'--input-text-color': inputTextColor,
		'--input-focus-border-color': inputFocusBorderColor,
		'--input-border-radius': `${ inputBorderRadius }px`,
		'--input-padding-v': `${ inputPaddingV }px`,
		'--input-padding-h': `${ inputPaddingH }px`,
		'--button-bg-color': buttonBgColor,
		'--button-text-color': buttonTextColor,
		'--button-hover-bg-color': buttonHoverBgColor,
		'--button-border-radius': `${ buttonBorderRadius }px`,
		'--button-padding-v': `${ buttonPaddingV }px`,
		'--button-padding-h': `${ buttonPaddingH }px`,
		'--link-color': linkColor,
		'--link-hover-color': linkHoverColor,
		'--logo-width': `${ logoWidth }px`,
		'--checkbox-color': checkboxColor,
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

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Logo Settings', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Show Logo', 'wbcom-essential' ) }
						checked={ showLogo }
						onChange={ ( value ) => setAttributes( { showLogo: value } ) }
					/>
					{ showLogo && (
						<>
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onSelectLogo }
									allowedTypes={ [ 'image' ] }
									value={ logoId }
									render={ ( { open } ) => (
										<div className="wbcom-media-upload">
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
							<RangeControl
								label={ __( 'Logo Width', 'wbcom-essential' ) }
								value={ logoWidth }
								onChange={ ( value ) => setAttributes( { logoWidth: value } ) }
								min={ 50 }
								max={ 400 }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Title Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Title', 'wbcom-essential' ) }
						checked={ showTitle }
						onChange={ ( value ) => setAttributes( { showTitle: value } ) }
					/>
					{ showTitle && (
						<>
							<TextControl
								label={ __( 'Title', 'wbcom-essential' ) }
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
							/>
							<SelectControl
								label={ __( 'Title Tag', 'wbcom-essential' ) }
								value={ titleTag }
								options={ [
									{ label: 'H1', value: 'h1' },
									{ label: 'H2', value: 'h2' },
									{ label: 'H3', value: 'h3' },
									{ label: 'H4', value: 'h4' },
									{ label: 'H5', value: 'h5' },
									{ label: 'H6', value: 'h6' },
									{ label: 'Div', value: 'div' },
									{ label: 'Span', value: 'span' },
								] }
								onChange={ ( value ) => setAttributes( { titleTag: value } ) }
							/>
						</>
					) }
					<Divider />
					<ToggleControl
						label={ __( 'Show Subtitle', 'wbcom-essential' ) }
						checked={ showSubtitle }
						onChange={ ( value ) => setAttributes( { showSubtitle: value } ) }
					/>
					{ showSubtitle && (
						<TextControl
							label={ __( 'Subtitle', 'wbcom-essential' ) }
							value={ subtitle }
							onChange={ ( value ) => setAttributes( { subtitle: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Form Labels', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Labels', 'wbcom-essential' ) }
						checked={ showLabels }
						onChange={ ( value ) => setAttributes( { showLabels: value } ) }
					/>
					<TextControl
						label={ __( 'Username Label', 'wbcom-essential' ) }
						value={ usernameLabel }
						onChange={ ( value ) => setAttributes( { usernameLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Username Placeholder', 'wbcom-essential' ) }
						value={ usernamePlaceholder }
						onChange={ ( value ) => setAttributes( { usernamePlaceholder: value } ) }
					/>
					<TextControl
						label={ __( 'Password Label', 'wbcom-essential' ) }
						value={ passwordLabel }
						onChange={ ( value ) => setAttributes( { passwordLabel: value } ) }
					/>
					<TextControl
						label={ __( 'Password Placeholder', 'wbcom-essential' ) }
						value={ passwordPlaceholder }
						onChange={ ( value ) => setAttributes( { passwordPlaceholder: value } ) }
					/>
					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Form Options', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Remember Me', 'wbcom-essential' ) }
						checked={ showRememberMe }
						onChange={ ( value ) => setAttributes( { showRememberMe: value } ) }
					/>
					{ showRememberMe && (
						<TextControl
							label={ __( 'Remember Me Label', 'wbcom-essential' ) }
							value={ rememberMeLabel }
							onChange={ ( value ) => setAttributes( { rememberMeLabel: value } ) }
						/>
					) }
					<Divider />
					<ToggleControl
						label={ __( 'Show Lost Password Link', 'wbcom-essential' ) }
						checked={ showLostPassword }
						onChange={ ( value ) => setAttributes( { showLostPassword: value } ) }
					/>
					{ showLostPassword && (
						<TextControl
							label={ __( 'Lost Password Text', 'wbcom-essential' ) }
							value={ lostPasswordText }
							onChange={ ( value ) => setAttributes( { lostPasswordText: value } ) }
						/>
					) }
					<Divider />
					<ToggleControl
						label={ __( 'Show Register Link', 'wbcom-essential' ) }
						checked={ showRegister }
						onChange={ ( value ) => setAttributes( { showRegister: value } ) }
					/>
					{ showRegister && (
						<>
							<TextControl
								label={ __( 'Register Text', 'wbcom-essential' ) }
								value={ registerText }
								onChange={ ( value ) => setAttributes( { registerText: value } ) }
							/>
							<TextControl
								label={ __( 'Register Link Text', 'wbcom-essential' ) }
								value={ registerLinkText }
								onChange={ ( value ) => setAttributes( { registerLinkText: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Redirect Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Redirect URL After Login', 'wbcom-essential' ) }
						value={ redirectUrl }
						onChange={ ( value ) => setAttributes( { redirectUrl: value } ) }
						help={ __( 'Leave empty for default behavior (profile page or admin dashboard)', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Logged In Display', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Logged In Message', 'wbcom-essential' ) }
						checked={ showLoggedInMessage }
						onChange={ ( value ) => setAttributes( { showLoggedInMessage: value } ) }
					/>
					{ showLoggedInMessage && (
						<TextControl
							label={ __( 'Logged In Message', 'wbcom-essential' ) }
							value={ loggedInMessage }
							onChange={ ( value ) => setAttributes( { loggedInMessage: value } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Test Mode (Show form when logged in)', 'wbcom-essential' ) }
						checked={ testMode }
						onChange={ ( value ) => setAttributes( { testMode: value } ) }
						help={ __( 'Enable to preview the form while logged in', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Form Styling', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Form Width', 'wbcom-essential' ) }
						value={ formWidth }
						onChange={ ( value ) => setAttributes( { formWidth: value } ) }
						min={ 280 }
						max={ 800 }
					/>
					<ColorControl
						label={ __( 'Form Background', 'wbcom-essential' ) }
						value={ formBgColor }
						onChange={ ( value ) => setAttributes( { formBgColor: value } ) }
					/>
					<RangeControl
						label={ __( 'Form Padding', 'wbcom-essential' ) }
						value={ formPadding }
						onChange={ ( value ) => setAttributes( { formPadding: value } ) }
						min={ 0 }
						max={ 80 }
					/>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ formBorderRadius }
						onChange={ ( value ) => setAttributes( { formBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
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
					<ToggleControl
						label={ __( 'Enable Box Shadow', 'wbcom-essential' ) }
						checked={ formBoxShadow }
						onChange={ ( value ) => setAttributes( { formBoxShadow: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Title Color', 'wbcom-essential' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Subtitle Color', 'wbcom-essential' ) }
						value={ subtitleColor }
						onChange={ ( value ) => setAttributes( { subtitleColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Label Color', 'wbcom-essential' ) }
						value={ labelColor }
						onChange={ ( value ) => setAttributes( { labelColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Input Styling', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Input Background', 'wbcom-essential' ) }
						value={ inputBgColor }
						onChange={ ( value ) => setAttributes( { inputBgColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Input Border Color', 'wbcom-essential' ) }
						value={ inputBorderColor }
						onChange={ ( value ) => setAttributes( { inputBorderColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Input Text Color', 'wbcom-essential' ) }
						value={ inputTextColor }
						onChange={ ( value ) => setAttributes( { inputTextColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Focus Border Color', 'wbcom-essential' ) }
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

				<PanelBody title={ __( 'Button Styling', 'wbcom-essential' ) } initialOpen={ false }>
					<ColorControl
						label={ __( 'Button Background', 'wbcom-essential' ) }
						value={ buttonBgColor }
						onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Button Text Color', 'wbcom-essential' ) }
						value={ buttonTextColor }
						onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Button Hover Background', 'wbcom-essential' ) }
						value={ buttonHoverBgColor }
						onChange={ ( value ) => setAttributes( { buttonHoverBgColor: value } ) }
					/>
					<Divider />
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

				<PanelBody title={ __( 'Link Styling', 'wbcom-essential' ) } initialOpen={ false }>
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
					<Divider />
					<ColorControl
						label={ __( 'Checkbox Color', 'wbcom-essential' ) }
						value={ checkboxColor }
						onChange={ ( value ) => setAttributes( { checkboxColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps } style={ inlineStyles }>
				<div className="wbcom-essential-login-form">
					{ showLogo && logoUrl && (
						<div className="wbcom-essential-login-form__logo">
							<img src={ logoUrl } alt="" style={ { width: logoWidth } } />
						</div>
					) }

					{ showTitle && (
						<TitleTag className="wbcom-essential-login-form__title">
							{ title }
						</TitleTag>
					) }

					{ showSubtitle && (
						<p className="wbcom-essential-login-form__subtitle">
							{ subtitle }
						</p>
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

						<button
							type="button"
							className="wbcom-essential-login-form__button"
							disabled
						>
							{ buttonText }
						</button>

						{ showRegister && (
							<p className="wbcom-essential-login-form__register">
								{ registerText }{ ' ' }
								<a href="#">{ registerLinkText }</a>
							</p>
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
