/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `editor` keyword are bundled together. The code used
 * gets applied to the editor.
 */
import './editor.scss';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

// CSS files are built separately and enqueued via PHP

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * @param {Object} props Props.
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		brandingType,
		alignment,
		titleColor,
		titleHoverColor,
		descriptionColor,
		titlePadding,
		descriptionPadding,
		logoPadding,
		logoWidth,
		logoHeight,
		titleTypography,
		descriptionTypography,
		titleLinkUrl,
		titleLinkTarget,
		border,
		borderRadius,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wp-block-wbcom-essential-branding align${ alignment }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: {
			border: `${ border.width } ${ border.style } ${ border.color }`,
			borderRadius: `${ borderRadius.top } ${ borderRadius.right } ${ borderRadius.bottom } ${ borderRadius.left }`,
		},
	} );

	// Preview data for editor
	const siteTitle = 'Site Title';
	const siteDescription = 'Site Description';
	const customLogoUrl = '';

	return (
		<>
			<InspectorControls>
				<wp.components.PanelBody title={ __( 'Branding', 'wbcom-essential' ) }>
					<wp.components.SelectControl
						label={ __( 'Branding Type', 'wbcom-essential' ) }
						value={ brandingType }
						options={ [
							{ label: __( 'Title', 'wbcom-essential' ), value: 'title' },
							{ label: __( 'Logo', 'wbcom-essential' ), value: 'logo' },
						] }
						onChange={ ( value ) => setAttributes( { brandingType: value } ) }
						help={ __( 'Your theme must declare the "add_theme_support( \'custom-logo\' )" for the logo to work', 'wbcom-essential' ) }
					/>
				</wp.components.PanelBody>

				<wp.components.PanelBody title={ __( 'Brand', 'wbcom-essential' ) }>
					<wp.components.ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ brandingType === 'title' && ! useThemeColors && (
						<>
							<wp.components.BaseControl label={ __( 'Title Color', 'wbcom-essential' ) }>
								<wp.components.ColorPicker
									color={ titleColor }
									onChange={ ( color ) => setAttributes( { titleColor: color } ) }
									enableAlpha
									defaultValue="#333333"
								/>
							</wp.components.BaseControl>
							<wp.components.BaseControl label={ __( 'Title Hover Color', 'wbcom-essential' ) }>
								<wp.components.ColorPicker
									color={ titleHoverColor }
									onChange={ ( color ) => setAttributes( { titleHoverColor: color } ) }
									enableAlpha
									defaultValue="#333333"
								/>
							</wp.components.BaseControl>
						</>
					) }
					{ brandingType === 'title' && (
						<>
							<wp.components.TextControl
								label={ __( 'Title Padding Top', 'wbcom-essential' ) }
								value={ titlePadding.top }
								onChange={ ( value ) => setAttributes( { titlePadding: { ...titlePadding, top: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Title Padding Right', 'wbcom-essential' ) }
								value={ titlePadding.right }
								onChange={ ( value ) => setAttributes( { titlePadding: { ...titlePadding, right: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Title Padding Bottom', 'wbcom-essential' ) }
								value={ titlePadding.bottom }
								onChange={ ( value ) => setAttributes( { titlePadding: { ...titlePadding, bottom: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Title Padding Left', 'wbcom-essential' ) }
								value={ titlePadding.left }
								onChange={ ( value ) => setAttributes( { titlePadding: { ...titlePadding, left: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.PanelBody title={ __( 'Typography', 'wbcom-essential' ) } initialOpen={ false }>
								<wp.components.TextControl
									label={ __( 'Font Family', 'wbcom-essential' ) }
									value={ titleTypography.fontFamily }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, fontFamily: value } } ) }
									placeholder={ __( 'e.g., Arial, sans-serif', 'wbcom-essential' ) }
								/>
								<wp.components.TextControl
									label={ __( 'Font Size', 'wbcom-essential' ) }
									value={ titleTypography.fontSize }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, fontSize: value } } ) }
									placeholder={ __( 'e.g., 24px, 1.5em', 'wbcom-essential' ) }
								/>
								<wp.components.SelectControl
									label={ __( 'Font Weight', 'wbcom-essential' ) }
									value={ titleTypography.fontWeight }
									options={ [
										{ label: __( 'Default', 'wbcom-essential' ), value: '' },
										{ label: '100', value: '100' },
										{ label: '200', value: '200' },
										{ label: '300', value: '300' },
										{ label: '400', value: '400' },
										{ label: '500', value: '500' },
										{ label: '600', value: '600' },
										{ label: '700', value: '700' },
										{ label: '800', value: '800' },
										{ label: '900', value: '900' },
										{ label: __( 'Normal', 'wbcom-essential' ), value: 'normal' },
										{ label: __( 'Bold', 'wbcom-essential' ), value: 'bold' },
										{ label: __( 'Bolder', 'wbcom-essential' ), value: 'bolder' },
										{ label: __( 'Lighter', 'wbcom-essential' ), value: 'lighter' },
									] }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, fontWeight: value } } ) }
								/>
								<wp.components.TextControl
									label={ __( 'Line Height', 'wbcom-essential' ) }
									value={ titleTypography.lineHeight }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, lineHeight: value } } ) }
									placeholder={ __( 'e.g., 1.2, 24px', 'wbcom-essential' ) }
								/>
								<wp.components.TextControl
									label={ __( 'Letter Spacing', 'wbcom-essential' ) }
									value={ titleTypography.letterSpacing }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, letterSpacing: value } } ) }
									placeholder={ __( 'e.g., 1px, 0.1em', 'wbcom-essential' ) }
								/>
								<wp.components.SelectControl
									label={ __( 'Text Transform', 'wbcom-essential' ) }
									value={ titleTypography.textTransform }
									options={ [
										{ label: __( 'Default', 'wbcom-essential' ), value: '' },
										{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
										{ label: __( 'Capitalize', 'wbcom-essential' ), value: 'capitalize' },
										{ label: __( 'Uppercase', 'wbcom-essential' ), value: 'uppercase' },
										{ label: __( 'Lowercase', 'wbcom-essential' ), value: 'lowercase' },
									] }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, textTransform: value } } ) }
								/>
								<wp.components.SelectControl
									label={ __( 'Text Decoration', 'wbcom-essential' ) }
									value={ titleTypography.textDecoration }
									options={ [
										{ label: __( 'Default', 'wbcom-essential' ), value: '' },
										{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
										{ label: __( 'Underline', 'wbcom-essential' ), value: 'underline' },
										{ label: __( 'Overline', 'wbcom-essential' ), value: 'overline' },
										{ label: __( 'Line Through', 'wbcom-essential' ), value: 'line-through' },
									] }
									onChange={ ( value ) => setAttributes( { titleTypography: { ...titleTypography, textDecoration: value } } ) }
								/>
							</wp.components.PanelBody>
							<wp.components.PanelBody title={ __( 'Link Settings', 'wbcom-essential' ) } initialOpen={ false }>
								<wp.components.TextControl
									label={ __( 'Custom Link URL', 'wbcom-essential' ) }
									value={ titleLinkUrl }
									onChange={ ( value ) => setAttributes( { titleLinkUrl: value } ) }
									placeholder={ __( 'Leave empty to use home URL', 'wbcom-essential' ) }
									help={ __( 'Optional custom URL for the title link', 'wbcom-essential' ) }
								/>
								<wp.components.SelectControl
									label={ __( 'Link Target', 'wbcom-essential' ) }
									value={ titleLinkTarget }
									options={ [
										{ label: __( 'Same Window', 'wbcom-essential' ), value: '_self' },
										{ label: __( 'New Window', 'wbcom-essential' ), value: '_blank' },
									] }
									onChange={ ( value ) => setAttributes( { titleLinkTarget: value } ) }
								/>
							</wp.components.PanelBody>
						</>
					) }
					{ brandingType === 'logo' && (
						<>
							<wp.components.TextControl
								label={ __( 'Logo Padding Top', 'wbcom-essential' ) }
								value={ logoPadding.top }
								onChange={ ( value ) => setAttributes( { logoPadding: { ...logoPadding, top: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Logo Padding Right', 'wbcom-essential' ) }
								value={ logoPadding.right }
								onChange={ ( value ) => setAttributes( { logoPadding: { ...logoPadding, right: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Logo Padding Bottom', 'wbcom-essential' ) }
								value={ logoPadding.bottom }
								onChange={ ( value ) => setAttributes( { logoPadding: { ...logoPadding, bottom: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Logo Padding Left', 'wbcom-essential' ) }
								value={ logoPadding.left }
								onChange={ ( value ) => setAttributes( { logoPadding: { ...logoPadding, left: value } } ) }
								help={ __( 'Default: 0', 'wbcom-essential' ) }
							/>
							<wp.components.PanelBody title={ __( 'Logo Size', 'wbcom-essential' ) } initialOpen={ true }>
								<wp.components.BaseControl label={ __( 'Logo Width', 'wbcom-essential' ) }>
									<div style={ { display: 'flex', gap: '8px', alignItems: 'flex-start' } }>
										{ logoWidth !== 'auto' && (
											<wp.components.RangeControl
												value={ parseInt( logoWidth ) || 200 }
												onChange={ ( value ) => {
													const unit = logoWidth.replace( /[\d.]/g, '' ) || 'px';
													setAttributes( { logoWidth: `${ value }${ unit }` } );
												} }
												min={ 0 }
												max={ logoWidth.includes( '%' ) ? 100 : 500 }
												step={ 1 }
												withInputField={ true }
												style={ { flex: 1 } }
											/>
										) }
										<wp.components.SelectControl
											value={ logoWidth === 'auto' ? 'auto' : ( logoWidth.replace( /[\d.]/g, '' ) || 'px' ) }
											options={ [
												{ label: 'px', value: 'px' },
												{ label: '%', value: '%' },
												{ label: 'em', value: 'em' },
												{ label: 'rem', value: 'rem' },
												{ label: 'vw', value: 'vw' },
												{ label: __( 'Auto', 'wbcom-essential' ), value: 'auto' },
											] }
											onChange={ ( unit ) => {
												if ( unit === 'auto' ) {
													setAttributes( { logoWidth: 'auto' } );
												} else {
													const value = parseInt( logoWidth ) || 200;
													setAttributes( { logoWidth: `${ value }${ unit }` } );
												}
											} }
											style={ { width: '80px' } }
										/>
									</div>
								</wp.components.BaseControl>
								<wp.components.BaseControl label={ __( 'Logo Height', 'wbcom-essential' ) }>
									<div style={ { display: 'flex', gap: '8px', alignItems: 'flex-start' } }>
										{ logoHeight !== 'auto' && (
											<wp.components.RangeControl
												value={ parseInt( logoHeight ) || 100 }
												onChange={ ( value ) => {
													const unit = logoHeight.replace( /[\d.]/g, '' ) || 'px';
													setAttributes( { logoHeight: `${ value }${ unit }` } );
												} }
												min={ 0 }
												max={ logoHeight.includes( '%' ) ? 100 : 500 }
												step={ 1 }
												withInputField={ true }
												style={ { flex: 1 } }
											/>
										) }
										<wp.components.SelectControl
											value={ logoHeight === 'auto' ? 'auto' : ( logoHeight.replace( /[\d.]/g, '' ) || 'px' ) }
											options={ [
												{ label: 'px', value: 'px' },
												{ label: '%', value: '%' },
												{ label: 'em', value: 'em' },
												{ label: 'rem', value: 'rem' },
												{ label: 'vh', value: 'vh' },
												{ label: __( 'Auto', 'wbcom-essential' ), value: 'auto' },
											] }
											onChange={ ( unit ) => {
												if ( unit === 'auto' ) {
													setAttributes( { logoHeight: 'auto' } );
												} else {
													const value = parseInt( logoHeight ) || 100;
													setAttributes( { logoHeight: `${ value }${ unit }` } );
												}
											} }
											style={ { width: '80px' } }
										/>
									</div>
								</wp.components.BaseControl>
								<p className="components-base-control__help" style={ { marginTop: '8px', fontSize: '12px', color: '#757575' } }>
									{ __( 'Select "Auto" to let the logo scale naturally.', 'wbcom-essential' ) }
								</p>
							</wp.components.PanelBody>
						</>
					) }
				</wp.components.PanelBody>

				{ brandingType === 'title' && (
					<wp.components.PanelBody title={ __( 'Description Options', 'wbcom-essential' ) }>
						{ ! useThemeColors && (
							<wp.components.BaseControl label={ __( 'Description Color', 'wbcom-essential' ) }>
								<wp.components.ColorPicker
									color={ descriptionColor }
									onChange={ ( color ) => setAttributes( { descriptionColor: color } ) }
									enableAlpha
									defaultValue="#333333"
								/>
							</wp.components.BaseControl>
						) }
						<wp.components.TextControl
							label={ __( 'Description Padding Top', 'wbcom-essential' ) }
							value={ descriptionPadding.top }
							onChange={ ( value ) => setAttributes( { descriptionPadding: { ...descriptionPadding, top: value } } ) }
							help={ __( 'Default: 0', 'wbcom-essential' ) }
						/>
						<wp.components.TextControl
							label={ __( 'Description Padding Right', 'wbcom-essential' ) }
							value={ descriptionPadding.right }
							onChange={ ( value ) => setAttributes( { descriptionPadding: { ...descriptionPadding, right: value } } ) }
							help={ __( 'Default: 0', 'wbcom-essential' ) }
						/>
						<wp.components.TextControl
							label={ __( 'Description Padding Bottom', 'wbcom-essential' ) }
							value={ descriptionPadding.bottom }
							onChange={ ( value ) => setAttributes( { descriptionPadding: { ...descriptionPadding, bottom: value } } ) }
							help={ __( 'Default: 0', 'wbcom-essential' ) }
						/>
						<wp.components.TextControl
							label={ __( 'Description Padding Left', 'wbcom-essential' ) }
							value={ descriptionPadding.left }
							onChange={ ( value ) => setAttributes( { descriptionPadding: { ...descriptionPadding, left: value } } ) }
							help={ __( 'Default: 0', 'wbcom-essential' ) }
						/>
						<wp.components.PanelBody title={ __( 'Description Typography', 'wbcom-essential' ) } initialOpen={ false }>
							<wp.components.TextControl
								label={ __( 'Font Family', 'wbcom-essential' ) }
								value={ descriptionTypography.fontFamily }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, fontFamily: value } } ) }
								placeholder={ __( 'e.g., Arial, sans-serif', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Font Size', 'wbcom-essential' ) }
								value={ descriptionTypography.fontSize }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, fontSize: value } } ) }
								placeholder={ __( 'e.g., 14px, 1em', 'wbcom-essential' ) }
							/>
							<wp.components.SelectControl
								label={ __( 'Font Weight', 'wbcom-essential' ) }
								value={ descriptionTypography.fontWeight }
								options={ [
									{ label: __( 'Default', 'wbcom-essential' ), value: '' },
									{ label: '100', value: '100' },
									{ label: '200', value: '200' },
									{ label: '300', value: '300' },
									{ label: '400', value: '400' },
									{ label: '500', value: '500' },
									{ label: '600', value: '600' },
									{ label: '700', value: '700' },
									{ label: '800', value: '800' },
									{ label: '900', value: '900' },
									{ label: __( 'Normal', 'wbcom-essential' ), value: 'normal' },
									{ label: __( 'Bold', 'wbcom-essential' ), value: 'bold' },
									{ label: __( 'Bolder', 'wbcom-essential' ), value: 'bolder' },
									{ label: __( 'Lighter', 'wbcom-essential' ), value: 'lighter' },
								] }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, fontWeight: value } } ) }
							/>
							<wp.components.TextControl
								label={ __( 'Line Height', 'wbcom-essential' ) }
								value={ descriptionTypography.lineHeight }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, lineHeight: value } } ) }
								placeholder={ __( 'e.g., 1.5, 24px', 'wbcom-essential' ) }
							/>
							<wp.components.TextControl
								label={ __( 'Letter Spacing', 'wbcom-essential' ) }
								value={ descriptionTypography.letterSpacing }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, letterSpacing: value } } ) }
								placeholder={ __( 'e.g., 1px, 0.1em', 'wbcom-essential' ) }
							/>
							<wp.components.SelectControl
								label={ __( 'Text Transform', 'wbcom-essential' ) }
								value={ descriptionTypography.textTransform }
								options={ [
									{ label: __( 'Default', 'wbcom-essential' ), value: '' },
									{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
									{ label: __( 'Capitalize', 'wbcom-essential' ), value: 'capitalize' },
									{ label: __( 'Uppercase', 'wbcom-essential' ), value: 'uppercase' },
									{ label: __( 'Lowercase', 'wbcom-essential' ), value: 'lowercase' },
								] }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, textTransform: value } } ) }
							/>
							<wp.components.SelectControl
								label={ __( 'Text Decoration', 'wbcom-essential' ) }
								value={ descriptionTypography.textDecoration }
								options={ [
									{ label: __( 'Default', 'wbcom-essential' ), value: '' },
									{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
									{ label: __( 'Underline', 'wbcom-essential' ), value: 'underline' },
									{ label: __( 'Overline', 'wbcom-essential' ), value: 'overline' },
									{ label: __( 'Line Through', 'wbcom-essential' ), value: 'line-through' },
								] }
								onChange={ ( value ) => setAttributes( { descriptionTypography: { ...descriptionTypography, textDecoration: value } } ) }
							/>
						</wp.components.PanelBody>
					</wp.components.PanelBody>
				) }

				<wp.components.PanelBody title={ __( 'Branding Border', 'wbcom-essential' ) }>
					<wp.components.TextControl
						label={ __( 'Border Width', 'wbcom-essential' ) }
						value={ border.width }
						onChange={ ( value ) => setAttributes( { border: { ...border, width: value } } ) }
					/>
					<wp.components.SelectControl
						label={ __( 'Border Style', 'wbcom-essential' ) }
						value={ border.style }
						options={ [
							{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
							{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
							{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( value ) => setAttributes( { border: { ...border, style: value } } ) }
					/>
					<wp.components.BaseControl label={ __( 'Border Color', 'wbcom-essential' ) }>
						<wp.components.ColorPicker
							color={ border.color }
							onChange={ ( color ) => setAttributes( { border: { ...border, color: color } } ) }
							enableAlpha
							defaultValue="#000000"
						/>
					</wp.components.BaseControl>
					<wp.components.TextControl
						label={ __( 'Border Radius Top', 'wbcom-essential' ) }
						value={ borderRadius.top }
						onChange={ ( value ) => setAttributes( { borderRadius: { ...borderRadius, top: value } } ) }
					/>
					<wp.components.TextControl
						label={ __( 'Border Radius Right', 'wbcom-essential' ) }
						value={ borderRadius.right }
						onChange={ ( value ) => setAttributes( { borderRadius: { ...borderRadius, right: value } } ) }
					/>
					<wp.components.TextControl
						label={ __( 'Border Radius Bottom', 'wbcom-essential' ) }
						value={ borderRadius.bottom }
						onChange={ ( value ) => setAttributes( { borderRadius: { ...borderRadius, bottom: value } } ) }
					/>
					<wp.components.TextControl
						label={ __( 'Border Radius Left', 'wbcom-essential' ) }
						value={ borderRadius.left }
						onChange={ ( value ) => setAttributes( { borderRadius: { ...borderRadius, left: value } } ) }
					/>
				</wp.components.PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
			<div className="header-title">
				{ brandingType === 'title' ? (
					<>
						<span className="site-title">
							<a
								href="#"
								style={ {
									color: titleColor,
									padding: `${ titlePadding.top } ${ titlePadding.right } ${ titlePadding.bottom } ${ titlePadding.left }`,
									fontFamily: titleTypography.fontFamily || undefined,
									fontSize: titleTypography.fontSize || undefined,
									fontWeight: titleTypography.fontWeight || undefined,
									lineHeight: titleTypography.lineHeight || undefined,
									letterSpacing: titleTypography.letterSpacing || undefined,
									textTransform: titleTypography.textTransform || undefined,
									textDecoration: titleTypography.textDecoration || undefined,
								} }
								onMouseEnter={ ( e ) => ( e.target.style.color = titleHoverColor ) }
								onMouseLeave={ ( e ) => ( e.target.style.color = titleColor ) }
							>
								{ siteTitle }
							</a>
						</span>
							<p
								className="site-description"
								style={ {
									color: descriptionColor,
									padding: `${ descriptionPadding.top } ${ descriptionPadding.right } ${ descriptionPadding.bottom } ${ descriptionPadding.left }`,
									fontFamily: descriptionTypography.fontFamily || undefined,
									fontSize: descriptionTypography.fontSize || undefined,
									fontWeight: descriptionTypography.fontWeight || undefined,
									lineHeight: descriptionTypography.lineHeight || undefined,
									letterSpacing: descriptionTypography.letterSpacing || undefined,
									textTransform: descriptionTypography.textTransform || undefined,
									textDecoration: descriptionTypography.textDecoration || undefined,
								} }
							>
								{ siteDescription }
							</p>
						</>
					) : (
						customLogoUrl ? (
							<img
								src={ customLogoUrl }
								alt={ siteTitle }
								className="custom-logo"
								style={ {
									padding: `${ logoPadding.top } ${ logoPadding.right } ${ logoPadding.bottom } ${ logoPadding.left }`,
									width: logoWidth,
									height: logoHeight,
								} }
							/>
						) : (
							<span className="site-title">
								<a
									href="#"
									style={ {
										color: titleColor,
										padding: `${ logoPadding.top } ${ logoPadding.right } ${ logoPadding.bottom } ${ logoPadding.left }`,
									} }
								>
									{ 'Site Logo' }
								</a>
							</span>
						)
					) }
				</div>
			</div>
		</>
	);
}