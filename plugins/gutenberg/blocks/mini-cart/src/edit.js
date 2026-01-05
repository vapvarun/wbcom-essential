/**
 * Mini Cart Block - Edit Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { Dashicon } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		showIcon,
		showCount,
		showTotal,
		showDropdown,
		iconSize,
		iconColor,
		countBgColor,
		countTextColor,
		totalColor,
		dropdownBgColor,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-mini-cart',
		style: {
			'--icon-size': `${ iconSize }px`,
			'--icon-color': iconColor || 'inherit',
			'--count-bg-color': countBgColor,
			'--count-text-color': countTextColor,
			'--total-color': totalColor || 'inherit',
			'--dropdown-bg-color': dropdownBgColor,
		},
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Show Cart Icon', 'wbcom-essential' ) }
						checked={ showIcon }
						onChange={ ( value ) => setAttributes( { showIcon: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Item Count', 'wbcom-essential' ) }
						checked={ showCount }
						onChange={ ( value ) => setAttributes( { showCount: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Total', 'wbcom-essential' ) }
						checked={ showTotal }
						onChange={ ( value ) => setAttributes( { showTotal: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Dropdown on Hover', 'wbcom-essential' ) }
						checked={ showDropdown }
						onChange={ ( value ) => setAttributes( { showDropdown: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Icon Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Icon Size (px)', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 16 }
						max={ 48 }
					/>
					<p>{ __( 'Icon Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ iconColor }
						onChange={ ( value ) => setAttributes( { iconColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Count Badge Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Background Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ countBgColor }
						onChange={ ( value ) => setAttributes( { countBgColor: value } ) }
					/>
					<p>{ __( 'Text Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ countTextColor }
						onChange={ ( value ) => setAttributes( { countTextColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Total Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Total Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ totalColor }
						onChange={ ( value ) => setAttributes( { totalColor: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Dropdown Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p>{ __( 'Dropdown Background Color', 'wbcom-essential' ) }</p>
					<ColorPalette
						value={ dropdownBgColor }
						onChange={ ( value ) => setAttributes( { dropdownBgColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-mini-cart__trigger">
					{ showIcon && (
						<span className="wbcom-essential-mini-cart__icon">
							<Dashicon icon="cart" />
						</span>
					) }
					{ showCount && (
						<span className="wbcom-essential-mini-cart__count">3</span>
					) }
					{ showTotal && (
						<span className="wbcom-essential-mini-cart__total">$49.99</span>
					) }
				</div>
				<p className="wbcom-essential-mini-cart__editor-note">
					{ __( 'Mini Cart (Preview)', 'wbcom-essential' ) }
				</p>
			</div>
		</>
	);
}
