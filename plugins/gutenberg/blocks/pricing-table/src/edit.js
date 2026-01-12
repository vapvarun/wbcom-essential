/**
 * Pricing Table Block - Edit Component
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
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	Button,
	ColorPalette,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		title,
		description,
		headingTag,
		pricePrefix,
		price,
		priceSuffix,
		originalPrice,
		period,
		features,
		buttonText,
		buttonUrl,
		buttonTarget,
		footerText,
		showRibbon,
		ribbonText,
		ribbonStyle,
		headerBackground,
		headerTextColor,
		containerBackground,
		priceColor,
		buttonBackground,
		buttonTextColor,
		buttonHoverBackground,
		buttonHoverTextColor,
		buttonHoverBorder,
		buttonSkin,
		buttonSize,
		ribbonBackground,
		ribbonTextColor,
		borderRadius,
	} = attributes;

	const wrapperClasses = [
		'wbcom-essential-pricing-table',
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		className: wrapperClasses,
	} );

	const addFeature = () => {
		const newFeatures = [ ...features, { text: 'New Feature', icon: 'yes' } ];
		setAttributes( { features: newFeatures } );
	};

	const updateFeature = ( index, key, value ) => {
		const newFeatures = [ ...features ];
		newFeatures[ index ] = { ...newFeatures[ index ], [ key ]: value };
		setAttributes( { features: newFeatures } );
	};

	const removeFeature = ( index ) => {
		const newFeatures = features.filter( ( _, i ) => i !== index );
		setAttributes( { features: newFeatures } );
	};

	const containerStyle = {
		backgroundColor: containerBackground || undefined,
		borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
	};

	const headerStyle = {
		backgroundColor: headerBackground || undefined,
		color: headerTextColor || undefined,
		borderRadius: borderRadius ? `${ borderRadius }px ${ borderRadius }px 0 0` : undefined,
	};

	const priceStyle = {
		color: priceColor || undefined,
	};

	const buttonStyle = {
		backgroundColor: buttonBackground || undefined,
		color: buttonTextColor || undefined,
	};

	const ribbonClasses = [
		'wbcom-price-table-ribbon-badge',
		`ribbon-style-${ ribbonStyle }`,
	].join( ' ' );

	const ribbonStyleObj = {
		backgroundColor: ribbonBackground || undefined,
		color: ribbonTextColor || undefined,
	};

	const HeadingTag = headingTag;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Header Settings', 'wbcom-essential' ) }>
					<TextControl
						label={ __( 'Title', 'wbcom-essential' ) }
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>
					<TextControl
						label={ __( 'Description', 'wbcom-essential' ) }
						value={ description }
						onChange={ ( value ) => setAttributes( { description: value } ) }
					/>
					<SelectControl
						label={ __( 'Heading Tag', 'wbcom-essential' ) }
						value={ headingTag }
						options={ [
							{ label: 'H1', value: 'h1' },
							{ label: 'H2', value: 'h2' },
							{ label: 'H3', value: 'h3' },
							{ label: 'H4', value: 'h4' },
							{ label: 'H5', value: 'h5' },
							{ label: 'H6', value: 'h6' },
						] }
						onChange={ ( value ) => setAttributes( { headingTag: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Pricing', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Price Prefix', 'wbcom-essential' ) }
						value={ pricePrefix }
						onChange={ ( value ) => setAttributes( { pricePrefix: value } ) }
					/>
					<TextControl
						label={ __( 'Price', 'wbcom-essential' ) }
						value={ price }
						onChange={ ( value ) => setAttributes( { price: value } ) }
					/>
					<TextControl
						label={ __( 'Price Suffix', 'wbcom-essential' ) }
						value={ priceSuffix }
						onChange={ ( value ) => setAttributes( { priceSuffix: value } ) }
					/>
					<TextControl
						label={ __( 'Original Price (for sale)', 'wbcom-essential' ) }
						value={ originalPrice }
						onChange={ ( value ) => setAttributes( { originalPrice: value } ) }
					/>
					<TextControl
						label={ __( 'Period', 'wbcom-essential' ) }
						value={ period }
						onChange={ ( value ) => setAttributes( { period: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Features', 'wbcom-essential' ) } initialOpen={ false }>
					{ features.map( ( feature, index ) => (
						<div key={ index } style={ { marginBottom: '15px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' } }>
							<TextControl
								label={ __( 'Feature Text', 'wbcom-essential' ) }
								value={ feature.text }
								onChange={ ( value ) => updateFeature( index, 'text', value ) }
							/>
							<SelectControl
								label={ __( 'Icon', 'wbcom-essential' ) }
								value={ feature.icon }
								options={ [
									{ label: __( 'Check', 'wbcom-essential' ), value: 'yes' },
									{ label: __( 'Cross', 'wbcom-essential' ), value: 'no' },
								] }
								onChange={ ( value ) => updateFeature( index, 'icon', value ) }
							/>
							<Button
								isDestructive
								isSmall
								onClick={ () => removeFeature( index ) }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						</div>
					) ) }
					<Button
						variant="secondary"
						onClick={ addFeature }
					>
						{ __( 'Add Feature', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				<PanelBody title={ __( 'Button', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Button Text', 'wbcom-essential' ) }
						value={ buttonText }
						onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'wbcom-essential' ) }
						value={ buttonUrl }
						onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'wbcom-essential' ) }
						checked={ buttonTarget }
						onChange={ ( value ) => setAttributes( { buttonTarget: value } ) }
					/>
					<SelectControl
						label={ __( 'Button Size', 'wbcom-essential' ) }
						value={ buttonSize }
						options={ [
							{ label: __( 'Small', 'wbcom-essential' ), value: 'wbcom-btn-sm' },
							{ label: __( 'Medium', 'wbcom-essential' ), value: 'wbcom-btn-md' },
							{ label: __( 'Large', 'wbcom-essential' ), value: 'wbcom-btn-lg' },
						] }
						onChange={ ( value ) => setAttributes( { buttonSize: value } ) }
					/>
					<SelectControl
						label={ __( 'Button Animation', 'wbcom-essential' ) }
						value={ buttonSkin }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: '' },
							{ label: __( 'Animation 1 - Rotate Fill', 'wbcom-essential' ), value: 'wbcom-btn-1' },
							{ label: __( 'Animation 2 - Ripple', 'wbcom-essential' ), value: 'wbcom-btn-2' },
							{ label: __( 'Animation 3 - Vertical Expand', 'wbcom-essential' ), value: 'wbcom-btn-3' },
							{ label: __( 'Animation 4 - Horizontal Expand', 'wbcom-essential' ), value: 'wbcom-btn-4' },
							{ label: __( 'Animation 5 - Slide Left', 'wbcom-essential' ), value: 'wbcom-btn-5' },
							{ label: __( 'Animation 6 - Slide Up', 'wbcom-essential' ), value: 'wbcom-btn-6' },
							{ label: __( 'Animation 7 - Slide Right', 'wbcom-essential' ), value: 'wbcom-btn-7' },
							{ label: __( 'Animation 8 - Slide Down', 'wbcom-essential' ), value: 'wbcom-btn-8' },
						] }
						onChange={ ( value ) => setAttributes( { buttonSkin: value } ) }
					/>
					<TextControl
						label={ __( 'Footer Text', 'wbcom-essential' ) }
						value={ footerText }
						onChange={ ( value ) => setAttributes( { footerText: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Ribbon', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Ribbon', 'wbcom-essential' ) }
						checked={ showRibbon }
						onChange={ ( value ) => setAttributes( { showRibbon: value } ) }
					/>
					{ showRibbon && (
						<>
							<TextControl
								label={ __( 'Ribbon Text', 'wbcom-essential' ) }
								value={ ribbonText }
								onChange={ ( value ) => setAttributes( { ribbonText: value } ) }
							/>
							<SelectControl
								label={ __( 'Ribbon Style', 'wbcom-essential' ) }
								value={ ribbonStyle }
								options={ [
									{ label: __( 'Corner Ribbon', 'wbcom-essential' ), value: 'ribbon' },
									{ label: __( 'Vertical', 'wbcom-essential' ), value: 'vertical' },
									{ label: __( 'Horizontal', 'wbcom-essential' ), value: 'horizontal' },
								] }
								onChange={ ( value ) => setAttributes( { ribbonStyle: value } ) }
							/>
						</>
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
							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Container Background', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ containerBackground }
									onChange={ ( value ) => setAttributes( { containerBackground: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Header Background', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ headerBackground }
									onChange={ ( value ) => setAttributes( { headerBackground: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Header Text Color', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ headerTextColor }
									onChange={ ( value ) => setAttributes( { headerTextColor: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Price Color', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ priceColor }
									onChange={ ( value ) => setAttributes( { priceColor: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Button Background', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ buttonBackground }
									onChange={ ( value ) => setAttributes( { buttonBackground: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Button Text Color', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ buttonTextColor }
									onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Button Hover Background', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ buttonHoverBackground }
									onChange={ ( value ) => setAttributes( { buttonHoverBackground: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Button Hover Text Color', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ buttonHoverTextColor }
									onChange={ ( value ) => setAttributes( { buttonHoverTextColor: value } ) }
								/>
							</div>

							<div className="components-base-control">
								<label className="components-base-control__label">
									{ __( 'Button Hover Border Color', 'wbcom-essential' ) }
								</label>
								<ColorPalette
									value={ buttonHoverBorder }
									onChange={ ( value ) => setAttributes( { buttonHoverBorder: value } ) }
								/>
							</div>

							{ showRibbon && (
								<>
									<div className="components-base-control">
										<label className="components-base-control__label">
											{ __( 'Ribbon Background', 'wbcom-essential' ) }
										</label>
										<ColorPalette
											value={ ribbonBackground }
											onChange={ ( value ) => setAttributes( { ribbonBackground: value } ) }
										/>
									</div>

									<div className="components-base-control">
										<label className="components-base-control__label">
											{ __( 'Ribbon Text Color', 'wbcom-essential' ) }
										</label>
										<ColorPalette
											value={ ribbonTextColor }
											onChange={ ( value ) => setAttributes( { ribbonTextColor: value } ) }
										/>
									</div>
								</>
							) }
						</>
					) }

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-price-table" style={ containerStyle }>
					{ showRibbon && (
						<div className={ ribbonClasses } style={ ribbonStyleObj }>
							{ ribbonText }
						</div>
					) }

					<div className="wbcom-price-table-header" style={ headerStyle }>
						<HeadingTag className="wbcom-price-table-title">
							{ title }
						</HeadingTag>
						{ description && (
							<span className="wbcom-price-table-desc">{ description }</span>
						) }
					</div>

					<div className="wbcom-price-table-subheader">
						<div className="wbcom-price-table-price" style={ priceStyle }>
							{ originalPrice && (
								<div className="wbcom-price-table-original-price">
									<del>{ originalPrice }</del>
								</div>
							) }
							{ pricePrefix && (
								<span className="wbcom-price-table-price-prefix">{ pricePrefix }</span>
							) }
							<span className="wbcom-price-table-price-value">{ price }</span>
							{ priceSuffix && (
								<span className="wbcom-price-table-price-suffix">{ priceSuffix }</span>
							) }
						</div>
						{ period && (
							<div className="wbcom-price-table-period">{ period }</div>
						) }
					</div>

					<div className="wbcom-price-table-content">
						<ul className="wbcom-price-table-features">
							{ features.map( ( feature, index ) => (
								<li key={ index } className={ `feature-${ feature.icon }` }>
									<span className={ `feature-icon icon-${ feature.icon }` }>
										{ feature.icon === 'yes' ? '✓' : '✗' }
									</span>
									<span>{ feature.text }</span>
								</li>
							) ) }
						</ul>
					</div>

					<div className="wbcom-price-table-footer">
						<div className="wbcom-btn-wrapper">
							<span className={ `wbcom-price-table-btn ${ buttonSize } ${ buttonSkin }` } style={ buttonStyle }>
								{ buttonText }
							</span>
						</div>
						{ footerText && (
							<span className="wbcom-price-table-footer-desc">{ footerText }</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
