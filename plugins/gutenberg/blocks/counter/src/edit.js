/**
 * Counter Block - Editor Component
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
	{ value: '', label: 'None' },
	{ value: 'star-filled', label: 'Star' },
	{ value: 'heart', label: 'Heart' },
	{ value: 'admin-users', label: 'Users' },
	{ value: 'groups', label: 'Groups' },
	{ value: 'chart-bar', label: 'Chart' },
	{ value: 'money-alt', label: 'Money' },
	{ value: 'clock', label: 'Clock' },
	{ value: 'awards', label: 'Award' },
	{ value: 'thumbs-up', label: 'Thumbs Up' },
	{ value: 'cart', label: 'Cart' },
	{ value: 'products', label: 'Products' },
	{ value: 'visibility', label: 'Eye' },
	{ value: 'building', label: 'Building' },
	{ value: 'location', label: 'Location' },
	{ value: 'admin-site', label: 'Globe' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		startNumber,
		endNumber,
		prefix,
		suffix,
		title,
		duration,
		useGrouping,
		layout,
		alignment,
		numberColor,
		titleColor,
		prefixSuffixColor,
		numberSize,
		titleSize,
		prefixSuffixSize,
		numberWeight,
		titleSpacing,
		icon,
		iconType,
		customIconUrl,
		iconSize,
		iconColor,
		iconSpacing,
		showIcon,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-counter layout-${ layout } align-${ alignment }`,
		style: {
			'--number-color': numberColor || undefined,
			'--title-color': titleColor || undefined,
			'--prefix-suffix-color': prefixSuffixColor || undefined,
			'--number-size': `${ numberSize }px`,
			'--title-size': `${ titleSize }px`,
			'--prefix-suffix-size': `${ prefixSuffixSize }px`,
			'--number-weight': numberWeight,
			'--title-spacing': `${ titleSpacing }px`,
			'--icon-size': `${ iconSize }px`,
			'--icon-color': iconColor || undefined,
			'--icon-spacing': `${ iconSpacing }px`,
		},
	} );

	// Format number with grouping.
	const formatNumber = ( num ) => {
		if ( useGrouping ) {
			return num.toLocaleString();
		}
		return num.toString();
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Counter Settings', 'wbcom-essential' ) }>
					<TextControl
						label={ __( 'Start Number', 'wbcom-essential' ) }
						type="number"
						value={ startNumber }
						onChange={ ( value ) => setAttributes( { startNumber: parseInt( value, 10 ) || 0 } ) }
					/>

					<TextControl
						label={ __( 'End Number', 'wbcom-essential' ) }
						type="number"
						value={ endNumber }
						onChange={ ( value ) => setAttributes( { endNumber: parseInt( value, 10 ) || 0 } ) }
					/>

					<TextControl
						label={ __( 'Prefix', 'wbcom-essential' ) }
						value={ prefix }
						onChange={ ( value ) => setAttributes( { prefix: value } ) }
						placeholder="$"
					/>

					<TextControl
						label={ __( 'Suffix', 'wbcom-essential' ) }
						value={ suffix }
						onChange={ ( value ) => setAttributes( { suffix: value } ) }
						placeholder="+, %, K"
					/>

					<RangeControl
						label={ __( 'Animation Duration (ms)', 'wbcom-essential' ) }
						value={ duration }
						onChange={ ( value ) => setAttributes( { duration: value } ) }
						min={ 500 }
						max={ 5000 }
						step={ 100 }
					/>

					<ToggleControl
						label={ __( 'Use Thousand Separators', 'wbcom-essential' ) }
						checked={ useGrouping }
						onChange={ ( value ) => setAttributes( { useGrouping: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Icon Settings', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Icon', 'wbcom-essential' ) }
						checked={ showIcon }
						onChange={ ( value ) => setAttributes( { showIcon: value } ) }
					/>

					{ showIcon && (
						<>
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
								max={ 100 }
							/>

							<RangeControl
								label={ __( 'Icon Spacing', 'wbcom-essential' ) }
								value={ iconSpacing }
								onChange={ ( value ) => setAttributes( { iconSpacing: value } ) }
								min={ 0 }
								max={ 60 }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout', 'wbcom-essential' ) }
						value={ layout }
						options={ [
							{ value: 'vertical', label: __( 'Vertical', 'wbcom-essential' ) },
							{ value: 'horizontal', label: __( 'Horizontal', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
					/>

					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>

					<RangeControl
						label={ __( 'Title Spacing', 'wbcom-essential' ) }
						value={ titleSpacing }
						onChange={ ( value ) => setAttributes( { titleSpacing: value } ) }
						min={ 0 }
						max={ 40 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Typography', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Number Size', 'wbcom-essential' ) }
						value={ numberSize }
						onChange={ ( value ) => setAttributes( { numberSize: value } ) }
						min={ 16 }
						max={ 120 }
					/>

					<SelectControl
						label={ __( 'Number Weight', 'wbcom-essential' ) }
						value={ numberWeight }
						options={ [
							{ value: '400', label: __( 'Normal', 'wbcom-essential' ) },
							{ value: '500', label: __( 'Medium', 'wbcom-essential' ) },
							{ value: '600', label: __( 'Semi Bold', 'wbcom-essential' ) },
							{ value: '700', label: __( 'Bold', 'wbcom-essential' ) },
							{ value: '800', label: __( 'Extra Bold', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { numberWeight: value } ) }
					/>

					<RangeControl
						label={ __( 'Title Size', 'wbcom-essential' ) }
						value={ titleSize }
						onChange={ ( value ) => setAttributes( { titleSize: value } ) }
						min={ 12 }
						max={ 48 }
					/>

					<RangeControl
						label={ __( 'Prefix/Suffix Size', 'wbcom-essential' ) }
						value={ prefixSuffixSize }
						onChange={ ( value ) => setAttributes( { prefixSuffixSize: value } ) }
						min={ 12 }
						max={ 80 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Number Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ numberColor }
						onChange={ ( value ) => setAttributes( { numberColor: value } ) }
					/>

					<Divider />

					<p>{ __( 'Prefix/Suffix Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ prefixSuffixColor }
						onChange={ ( value ) => setAttributes( { prefixSuffixColor: value } ) }
					/>

					<Divider />

					<p>{ __( 'Title Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>

					{ showIcon && (
						<>
							<Divider />

							<p>{ __( 'Icon Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ iconColor }
								onChange={ ( value ) => setAttributes( { iconColor: value } ) }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ showIcon && icon && (
					<div className="wbcom-essential-counter__icon">
						{ iconType === 'dashicon' ? (
							<Dashicon icon={ icon } />
						) : customIconUrl ? (
							<img src={ customIconUrl } alt="" />
						) : null }
					</div>
				) }

				<div className="wbcom-essential-counter__content">
					<div className="wbcom-essential-counter__number-wrap">
						{ prefix && (
							<span className="wbcom-essential-counter__prefix">
								{ prefix }
							</span>
						) }
						<span className="wbcom-essential-counter__number">
							{ formatNumber( endNumber ) }
						</span>
						{ suffix && (
							<span className="wbcom-essential-counter__suffix">
								{ suffix }
							</span>
						) }
					</div>

					<RichText
						tagName="div"
						className="wbcom-essential-counter__title"
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
						placeholder={ __( 'Counter Title', 'wbcom-essential' ) }
					/>
				</div>
			</div>
		</>
	);
}
