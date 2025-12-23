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
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes } ) {
	const {
		logoSource,
		desktopLogoId,
		desktopLogoUrl,
		mobileLogoId,
		mobileLogoUrl,
		linkUrl,
		linkHome,
		linkNewTab,
		mobileBreakpoint,
		alignment,
		maxWidth,
		backgroundColor,
		borderRadius,
	} = attributes;

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
								<RangeControl
									label={ __( 'Mobile Breakpoint (px)', 'wbcom-essential' ) }
									help={ __( 'Screen width below which mobile logo is shown', 'wbcom-essential' ) }
									value={ mobileBreakpoint }
									onChange={ ( value ) => setAttributes( { mobileBreakpoint: value } ) }
									min={ 320 }
									max={ 1200 }
								/>
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
				</PanelBody>

				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
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

					<RangeControl
						label={ __( 'Max Width (px)', 'wbcom-essential' ) }
						value={ maxWidth }
						onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
						min={ 50 }
						max={ 500 }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

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
