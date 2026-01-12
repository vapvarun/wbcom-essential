/**
 * Site Logo Block - Edit Component
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
	TextControl,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
	Flex,
	ColorPalette,
	CheckboxControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		logoSource,
		desktopLogoId,
		desktopLogoUrl,
		mobileLogoId,
		mobileLogoUrl,
		imageSize,
		mobileImageSize,
		linkUrl,
		linkHome,
		linkNewTab,
		linkRel,
		mobileBreakpoint,
		alignment,
		maxWidth,
		maxWidthTablet,
		maxWidthMobile,
		backgroundColor,
		borderStyle,
		borderWidth,
		borderColor,
		borderRadius,
		boxShadow,
	} = attributes;

	// State for image sizes
	const [ imageSizes, setImageSizes ] = useState( [
		{ label: __( 'Full', 'wbcom-essential' ), value: 'full' },
		{ label: __( 'Large', 'wbcom-essential' ), value: 'large' },
		{ label: __( 'Medium', 'wbcom-essential' ), value: 'medium' },
		{ label: __( 'Thumbnail', 'wbcom-essential' ), value: 'thumbnail' },
	] );

	const blockProps = useBlockProps();

	const onSelectDesktopLogo = ( media ) => {
		setAttributes( {
			desktopLogoId: media.id,
			desktopLogoUrl: media.url,
		} );
	};

	const onSelectMobileLogo = ( media ) => {
		setAttributes( {
			mobileLogoId: media.id,
			mobileLogoUrl: media.url,
		} );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Logo Settings', 'wbcom-essential' ) } initialOpen>
					<SelectControl
						label={ __( 'Logo Source', 'wbcom-essential' ) }
						value={ logoSource }
						options={ [
							{ label: __( 'Site Customizer Logo', 'wbcom-essential' ), value: 'customizer' },
							{ label: __( 'Custom Logo', 'wbcom-essential' ), value: 'custom' },
						] }
						onChange={ ( value ) => setAttributes( { logoSource: value } ) }
					/>

					{ logoSource === 'custom' && (
						<>
							<div style={ { marginBottom: '16px' } }>
								<p style={ { fontWeight: '500', marginBottom: '8px' } }>
									{ __( 'Desktop Logo', 'wbcom-essential' ) }
								</p>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ onSelectDesktopLogo }
										allowedTypes={ [ 'image' ] }
										value={ desktopLogoId }
										render={ ( { open } ) => (
											<div>
												{ desktopLogoUrl ? (
													<>
														<img
															src={ desktopLogoUrl }
															alt={ __( 'Desktop Logo', 'wbcom-essential' ) }
															style={ { maxWidth: '100%', height: 'auto', marginBottom: '8px' } }
														/>
														<Flex>
															<Button isSecondary onClick={ open }>
																{ __( 'Replace', 'wbcom-essential' ) }
															</Button>
															<Button
																isDestructive
																onClick={ () => setAttributes( { desktopLogoId: 0, desktopLogoUrl: '' } ) }
															>
																{ __( 'Remove', 'wbcom-essential' ) }
															</Button>
														</Flex>
													</>
												) : (
													<Button isPrimary onClick={ open }>
														{ __( 'Select Desktop Logo', 'wbcom-essential' ) }
													</Button>
												) }
											</div>
										) }
									/>
								</MediaUploadCheck>
							</div>

							{ desktopLogoUrl && (
								<SelectControl
									label={ __( 'Desktop Image Size', 'wbcom-essential' ) }
									value={ imageSize }
									options={ imageSizes }
									onChange={ ( value ) => setAttributes( { imageSize: value } ) }
								/>
							) }

							<div style={ { marginBottom: '16px' } }>
								<p style={ { fontWeight: '500', marginBottom: '8px' } }>
									{ __( 'Mobile Logo (Optional)', 'wbcom-essential' ) }
								</p>
								<MediaUploadCheck>
									<MediaUpload
										onSelect={ onSelectMobileLogo }
										allowedTypes={ [ 'image' ] }
										value={ mobileLogoId }
										render={ ( { open } ) => (
											<div>
												{ mobileLogoUrl ? (
													<>
														<img
															src={ mobileLogoUrl }
															alt={ __( 'Mobile Logo', 'wbcom-essential' ) }
															style={ { maxWidth: '100%', height: 'auto', marginBottom: '8px' } }
														/>
														<Flex>
															<Button isSecondary onClick={ open }>
																{ __( 'Replace', 'wbcom-essential' ) }
															</Button>
															<Button
																isDestructive
																onClick={ () => setAttributes( { mobileLogoId: 0, mobileLogoUrl: '' } ) }
															>
																{ __( 'Remove', 'wbcom-essential' ) }
															</Button>
														</Flex>
													</>
												) : (
													<Button isSecondary onClick={ open }>
														{ __( 'Select Mobile Logo', 'wbcom-essential' ) }
													</Button>
												) }
											</div>
										) }
									/>
								</MediaUploadCheck>
							</div>

							{ mobileLogoUrl && (
								<>
									<SelectControl
										label={ __( 'Mobile Image Size', 'wbcom-essential' ) }
										value={ mobileImageSize }
										options={ imageSizes }
										onChange={ ( value ) => setAttributes( { mobileImageSize: value } ) }
									/>
									<RangeControl
										label={ __( 'Mobile Breakpoint (px)', 'wbcom-essential' ) }
										help={ __( 'Screen width below which mobile logo is shown', 'wbcom-essential' ) }
										value={ mobileBreakpoint }
										onChange={ ( value ) => setAttributes( { mobileBreakpoint: value } ) }
										min={ 320 }
										max={ 1200 }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Link Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Link to Home Page', 'wbcom-essential' ) }
						checked={ linkHome }
						onChange={ ( value ) => setAttributes( { linkHome: value } ) }
					/>

					{ ! linkHome && (
						<TextControl
							label={ __( 'Custom Link URL', 'wbcom-essential' ) }
							value={ linkUrl }
							onChange={ ( value ) => setAttributes( { linkUrl: value } ) }
							type="url"
						/>
					) }

					<ToggleControl
						label={ __( 'Open in New Tab', 'wbcom-essential' ) }
						checked={ linkNewTab }
						onChange={ ( value ) => setAttributes( { linkNewTab: value } ) }
					/>

					<div style={ { marginTop: '16px' } }>
						<p style={ { fontWeight: '500', marginBottom: '8px' } }>
							{ __( 'Link Relationship (rel)', 'wbcom-essential' ) }
						</p>
						<CheckboxControl
							label={ __( 'nofollow', 'wbcom-essential' ) }
							checked={ linkRel.includes( 'nofollow' ) }
							onChange={ ( checked ) => {
								const rels = linkRel.split( ' ' ).filter( Boolean );
								if ( checked ) {
									rels.push( 'nofollow' );
								} else {
									const index = rels.indexOf( 'nofollow' );
									if ( index > -1 ) rels.splice( index, 1 );
								}
								setAttributes( { linkRel: rels.join( ' ' ) } );
							} }
						/>
						<CheckboxControl
							label={ __( 'noreferrer', 'wbcom-essential' ) }
							checked={ linkRel.includes( 'noreferrer' ) }
							onChange={ ( checked ) => {
								const rels = linkRel.split( ' ' ).filter( Boolean );
								if ( checked ) {
									rels.push( 'noreferrer' );
								} else {
									const index = rels.indexOf( 'noreferrer' );
									if ( index > -1 ) rels.splice( index, 1 );
								}
								setAttributes( { linkRel: rels.join( ' ' ) } );
							} }
						/>
						<CheckboxControl
							label={ __( 'sponsored', 'wbcom-essential' ) }
							checked={ linkRel.includes( 'sponsored' ) }
							onChange={ ( checked ) => {
								const rels = linkRel.split( ' ' ).filter( Boolean );
								if ( checked ) {
									rels.push( 'sponsored' );
								} else {
									const index = rels.indexOf( 'sponsored' );
									if ( index > -1 ) rels.splice( index, 1 );
								}
								setAttributes( { linkRel: rels.join( ' ' ) } );
							} }
						/>
					</div>
				</PanelBody>

				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme palette.', 'wbcom-essential' )
							: __( 'Enable to use theme colors instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>

					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'flex-start' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'flex-end' },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>

					<p style={ { fontWeight: '500', marginTop: '16px', marginBottom: '8px' } }>
						{ __( 'Maximum Width', 'wbcom-essential' ) }
					</p>
					<RangeControl
						label={ __( 'Desktop (px)', 'wbcom-essential' ) }
						value={ maxWidth }
						onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
						min={ 50 }
						max={ 800 }
					/>
					<RangeControl
						label={ __( 'Tablet (px)', 'wbcom-essential' ) }
						value={ maxWidthTablet }
						onChange={ ( value ) => setAttributes( { maxWidthTablet: value } ) }
						min={ 50 }
						max={ 600 }
					/>
					<RangeControl
						label={ __( 'Mobile (px)', 'wbcom-essential' ) }
						value={ maxWidthMobile }
						onChange={ ( value ) => setAttributes( { maxWidthMobile: value } ) }
						min={ 50 }
						max={ 400 }
					/>

					{ ! useThemeColors && (
						<div style={ { marginTop: '16px' } }>
							<p style={ { fontWeight: '500', marginBottom: '8px' } }>
								{ __( 'Background Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
								clearable={ true }
							/>
						</div>
					) }

					<div style={ { marginTop: '16px' } }>
						<p style={ { fontWeight: '500', marginBottom: '8px' } }>
							{ __( 'Border', 'wbcom-essential' ) }
						</p>
						<SelectControl
							label={ __( 'Border Style', 'wbcom-essential' ) }
							value={ borderStyle }
							options={ [
								{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
								{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
								{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
								{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
								{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
							] }
							onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
						/>

						{ borderStyle !== 'none' && (
							<>
								<RangeControl
									label={ __( 'Border Width (px)', 'wbcom-essential' ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 0 }
									max={ 20 }
								/>
								{ ! useThemeColors && (
									<>
										<p style={ { fontWeight: '500', marginTop: '8px', marginBottom: '8px' } }>
											{ __( 'Border Color', 'wbcom-essential' ) }
										</p>
										<ColorPalette
											value={ borderColor }
											onChange={ ( value ) => setAttributes( { borderColor: value } ) }
											clearable={ true }
										/>
									</>
								) }
							</>
						) }

						<RangeControl
							label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
							value={ borderRadius }
							onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</div>

					{ ! useThemeColors && (
						<div style={ { marginTop: '16px' } }>
							<TextControl
								label={ __( 'Box Shadow', 'wbcom-essential' ) }
								help={ __( 'CSS box-shadow value (e.g., 0 4px 6px rgba(0,0,0,0.1))', 'wbcom-essential' ) }
								value={ boxShadow }
								onChange={ ( value ) => setAttributes( { boxShadow: value } ) }
								placeholder="0 4px 6px rgba(0,0,0,0.1)"
							/>
						</div>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender
					block="wbcom-essential/site-logo"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
