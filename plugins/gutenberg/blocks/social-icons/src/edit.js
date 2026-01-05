/**
 * Social Icons Block - Editor Component
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
	SelectControl,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	ColorPalette,
	Dashicon,
	__experimentalDivider as Divider,
} from '@wordpress/components';

// Platform options with dashicon mappings.
const PLATFORMS = {
	facebook: { label: 'Facebook', dashicon: 'facebook-alt' },
	twitter: { label: 'Twitter/X', dashicon: 'twitter' },
	instagram: { label: 'Instagram', dashicon: 'instagram' },
	linkedin: { label: 'LinkedIn', dashicon: 'linkedin' },
	youtube: { label: 'YouTube', dashicon: 'video-alt3' },
	pinterest: { label: 'Pinterest', dashicon: 'pinterest' },
	github: { label: 'GitHub', dashicon: 'admin-site-alt3' },
	email: { label: 'Email', dashicon: 'email' },
	rss: { label: 'RSS', dashicon: 'rss' },
	whatsapp: { label: 'WhatsApp', dashicon: 'phone' },
};

const PLATFORM_OPTIONS = Object.keys( PLATFORMS ).map( ( key ) => ( {
	value: key,
	label: PLATFORMS[ key ].label,
} ) );

export default function Edit( { attributes, setAttributes } ) {
	const {
		icons,
		alignment,
		iconSize,
		iconGap,
		iconPadding,
		iconColor,
		iconBgColor,
		iconHoverColor,
		iconHoverBgColor,
		borderRadius,
		style,
		openInNewTab,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-social-icons align-${ alignment } style-${ style }`,
		style: {
			'--icon-size': `${ iconSize }px`,
			'--icon-gap': `${ iconGap }px`,
			'--icon-padding': `${ iconPadding }px`,
			'--icon-color': iconColor || undefined,
			'--icon-bg-color': iconBgColor || undefined,
			'--icon-hover-color': iconHoverColor || undefined,
			'--icon-hover-bg': iconHoverBgColor || undefined,
			'--border-radius': `${ borderRadius }%`,
		},
	} );

	const updateIcon = ( index, field, value ) => {
		const newIcons = [ ...icons ];
		newIcons[ index ] = { ...newIcons[ index ], [ field ]: value };
		setAttributes( { icons: newIcons } );
	};

	const addIcon = () => {
		setAttributes( {
			icons: [ ...icons, { platform: 'facebook', url: '' } ],
		} );
	};

	const removeIcon = ( index ) => {
		const newIcons = icons.filter( ( _, i ) => i !== index );
		setAttributes( { icons: newIcons } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Social Links', 'wbcom-essential' ) }>
					{ icons.map( ( icon, index ) => (
						<div key={ index } className="wbcom-social-icon-item">
							<SelectControl
								label={ __( 'Platform', 'wbcom-essential' ) }
								value={ icon.platform }
								options={ PLATFORM_OPTIONS }
								onChange={ ( value ) => updateIcon( index, 'platform', value ) }
							/>
							<TextControl
								label={ __( 'URL', 'wbcom-essential' ) }
								value={ icon.url }
								onChange={ ( value ) => updateIcon( index, 'url', value ) }
								placeholder="https://"
							/>
							<Button
								isDestructive
								isSmall
								onClick={ () => removeIcon( index ) }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
							<Divider />
						</div>
					) ) }
					<Button isPrimary onClick={ addIcon }>
						{ __( 'Add Icon', 'wbcom-essential' ) }
					</Button>

					<Divider />

					<ToggleControl
						label={ __( 'Open links in new tab', 'wbcom-essential' ) }
						checked={ openInNewTab }
						onChange={ ( value ) => setAttributes( { openInNewTab: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Style', 'wbcom-essential' ) }
						value={ style }
						options={ [
							{ value: 'filled', label: __( 'Filled', 'wbcom-essential' ) },
							{ value: 'outline', label: __( 'Outline', 'wbcom-essential' ) },
							{ value: 'minimal', label: __( 'Minimal', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { style: value } ) }
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
						label={ __( 'Icon Size', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>

					<RangeControl
						label={ __( 'Icon Gap', 'wbcom-essential' ) }
						value={ iconGap }
						onChange={ ( value ) => setAttributes( { iconGap: value } ) }
						min={ 0 }
						max={ 40 }
					/>

					<RangeControl
						label={ __( 'Icon Padding', 'wbcom-essential' ) }
						value={ iconPadding }
						onChange={ ( value ) => setAttributes( { iconPadding: value } ) }
						min={ 0 }
						max={ 30 }
					/>

					<RangeControl
						label={ __( 'Border Radius (%)', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Icon Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconColor }
						onChange={ ( value ) => setAttributes( { iconColor: value } ) }
					/>

					<Divider />

					<p>{ __( 'Background Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconBgColor }
						onChange={ ( value ) => setAttributes( { iconBgColor: value } ) }
					/>

					<Divider />

					<p>{ __( 'Hover Icon Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconHoverColor }
						onChange={ ( value ) => setAttributes( { iconHoverColor: value } ) }
					/>

					<p>{ __( 'Hover Background', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconHoverBgColor }
						onChange={ ( value ) => setAttributes( { iconHoverBgColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ icons.map( ( icon, index ) => (
					<span
						key={ index }
						className={ `wbcom-essential-social-icons__item wbcom-essential-social-icons__item--${ icon.platform }` }
					>
						<Dashicon icon={ PLATFORMS[ icon.platform ]?.dashicon || 'share' } />
					</span>
				) ) }
			</div>
		</>
	);
}
