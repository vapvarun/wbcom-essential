
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	BlockControls
} from '@wordpress/block-editor';

import {
	PanelBody,
	TextControl,
	SelectControl,
	Button,
	ColorPalette,
	ToggleControl,
	RangeControl
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		text,
		size,
		buttonIcon,
		iconPosition,
		buttonId,
		dropdownItems,
		buttonSkin,
		dropdownPosition,
		buttonTextColor,
		buttonBgColor,
		enableGradient,
		gradientType,
		gradientAngle,
		gradientColorStart,
		gradientColorEnd,
		gradientStartPosition,
		gradientEndPosition,
		buttonHoverTextColor,
		buttonHoverBgColor,
		enableHoverGradient,
		hoverGradientType,
		hoverGradientAngle,
		hoverGradientColorStart,
		hoverGradientColorEnd,
		hoverGradientStartPosition,
		hoverGradientEndPosition,
		animationColor,
		borderStyle,
		borderWidth,
		borderColor,
		borderStyleHover,
		borderWidthHover,
		borderColorHover,
		iconBgColor,
		dropdownTextColor,
		dropdownBgColor,
		dropdownHoverTextColor,
		dropdownHoverBgColor,
		dropdownShadow,
		separatorColor
	} = attributes;

	const [ isOpen, setIsOpen ] = useState( false );

	// Generate gradient CSS
	const generateGradient = ( type, angle, colorStart, colorEnd, startPos, endPos ) => {
		if ( type === 'linear' ) {
			return `linear-gradient(${ angle }deg, ${ colorStart } ${ startPos }%, ${ colorEnd } ${ endPos }%)`;
		}
		return `radial-gradient(circle, ${ colorStart } ${ startPos }%, ${ colorEnd } ${ endPos }%)`;
	};

	// Build wrapper style - ALL styles as CSS variables (enables :hover to work)
	const wrapperStyle = {};

	if ( ! useThemeColors ) {
		// Normal state button styles - as CSS variables so :hover can override
		wrapperStyle['--button-text'] = buttonTextColor || '#ffffff';
		wrapperStyle['--button-bg'] = enableGradient ? 'transparent' : ( buttonBgColor || '#2271b1' );
		wrapperStyle['--button-border'] = borderStyle !== 'none' && borderStyle
			? `${ borderWidth }px ${ borderStyle } ${ borderColor || '#000' }`
			: 'none';

		// Normal gradient
		if ( enableGradient ) {
			wrapperStyle['--button-gradient'] = generateGradient(
				gradientType,
				gradientAngle,
				gradientColorStart,
				gradientColorEnd,
				gradientStartPosition,
				gradientEndPosition
			);
		} else {
			wrapperStyle['--button-gradient'] = 'none';
		}

		// Hover state button styles
		wrapperStyle['--hover-text-color'] = buttonHoverTextColor || buttonTextColor || '#ffffff';
		wrapperStyle['--hover-bg-color'] = enableHoverGradient ? 'transparent' : ( buttonHoverBgColor || buttonBgColor || '#2271b1' );

		// Hover gradient
		if ( enableHoverGradient ) {
			wrapperStyle['--hover-gradient'] = generateGradient(
				hoverGradientType,
				hoverGradientAngle,
				hoverGradientColorStart,
				hoverGradientColorEnd,
				hoverGradientStartPosition,
				hoverGradientEndPosition
			);
		} else {
			wrapperStyle['--hover-gradient'] = 'none';
		}

		// Hover border
		if ( borderStyleHover && borderStyleHover !== 'none' ) {
			wrapperStyle['--hover-border'] = `${ borderWidthHover }px ${ borderStyleHover } ${ borderColorHover || '#000' }`;
		} else if ( borderStyle && borderStyle !== 'none' ) {
			wrapperStyle['--hover-border'] = `${ borderWidth }px ${ borderStyle } ${ borderColor || '#000' }`;
		} else {
			wrapperStyle['--hover-border'] = 'none';
		}

		// Dropdown styles
		wrapperStyle['--dropdown-hover-text-color'] = dropdownHoverTextColor || '#2271b1';
		wrapperStyle['--dropdown-hover-bg-color'] = dropdownHoverBgColor || '#f5f5f5';
		wrapperStyle['--separator-color'] = separatorColor || '#eee';
		wrapperStyle['--animation-color'] = animationColor || 'rgba(255, 255, 255, 0.2)';
	}

	// Button gets NO inline styles for bg/border - CSS handles everything via variables
	const buttonStyle = {};

	const iconStyle = {
		backgroundColor: iconBgColor || 'transparent'
	};

	const dropdownStyle = {
		color: dropdownTextColor,
		backgroundColor: dropdownBgColor,
		boxShadow: dropdownShadow || '0 4px 12px rgba(0, 0, 0, 0.15)'
	};

	const blockProps = useBlockProps( {
		className: `dropdown-button-wrapper size-${ size } ${ buttonSkin !== 'none' ? buttonSkin : '' }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: wrapperStyle
	} );

	const addDropdownItem = () => {
		const newItems = [ ...dropdownItems ];
		newItems.push( {
			title: `Menu Item #${ newItems.length + 1 }`,
			url: '',
			icon: {},
			iconPosition: 'before'
		} );
		setAttributes( { dropdownItems: newItems } );
	};

	const updateDropdownItem = ( index, field, value ) => {
		const newItems = [ ...dropdownItems ];
		newItems[ index ][ field ] = value;
		setAttributes( { dropdownItems: newItems } );
	};

	const removeDropdownItem = ( index ) => {
		const newItems = [ ...dropdownItems ];
		newItems.splice( index, 1 );
		setAttributes( { dropdownItems: newItems } );
	};

	const renderIcon = ( iconName ) => {
		const iconMap = {
			'arrow-down-alt2': '▼',
			'arrow-up-alt2': '▲',
			'arrow-left-alt2': '◄',
			'arrow-right-alt2': '►',
			'menu': '☰',
			'ellipsis': '⋯'
		};
		return iconMap[ iconName ] || '▼';
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'dropdown-button' ) }>
					<TextControl
						label={ __( 'Button Text', 'dropdown-button' ) }
						value={ text }
						onChange={ ( value ) => setAttributes( { text: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
					<SelectControl
						label={ __( 'Button Size', 'dropdown-button' ) }
						value={ size }
						options={ [
							{ label: __( 'Small', 'dropdown-button' ), value: 'small' },
							{ label: __( 'Medium', 'dropdown-button' ), value: 'medium' },
							{ label: __( 'Large', 'dropdown-button' ), value: 'large' }
						] }
						onChange={ ( value ) => setAttributes( { size: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
					<SelectControl
						label={ __( 'Icon', 'dropdown-button' ) }
						value={ buttonIcon.icon }
						options={ [
							{ label: __( 'Arrow Down', 'dropdown-button' ), value: 'arrow-down-alt2' },
							{ label: __( 'Arrow Up', 'dropdown-button' ), value: 'arrow-up-alt2' },
							{ label: __( 'Arrow Left', 'dropdown-button' ), value: 'arrow-left-alt2' },
							{ label: __( 'Arrow Right', 'dropdown-button' ), value: 'arrow-right-alt2' },
							{ label: __( 'Menu', 'dropdown-button' ), value: 'menu' },
							{ label: __( 'Ellipsis', 'dropdown-button' ), value: 'ellipsis' }
						] }
						onChange={ ( value ) => setAttributes( { buttonIcon: { icon: value } } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
					<SelectControl
						label={ __( 'Icon Position', 'dropdown-button' ) }
						value={ iconPosition }
						options={ [
							{ label: __( 'Before', 'dropdown-button' ), value: 'before' },
							{ label: __( 'After', 'dropdown-button' ), value: 'after' }
						] }
						onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
					<TextControl
						label={ __( 'Button ID', 'dropdown-button' ) }
						value={ buttonId }
						onChange={ ( value ) => setAttributes( { buttonId: value } ) }
						help={ __( 'Optional unique ID for the button', 'dropdown-button' ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Button Skin & Animation', 'dropdown-button' ) }>
					<SelectControl
						label={ __( 'Button Skin', 'dropdown-button' ) }
						value={ buttonSkin }
						options={ [
							{ label: __( 'None', 'dropdown-button' ), value: 'none' },
							{ label: __( 'Animation 1 - Rotate Sweep', 'dropdown-button' ), value: 'wbcom-btn-1' },
							{ label: __( 'Animation 2 - Circle Expand', 'dropdown-button' ), value: 'wbcom-btn-2' },
							{ label: __( 'Animation 3 - Vertical Expand Center', 'dropdown-button' ), value: 'wbcom-btn-3' },
							{ label: __( 'Animation 4 - Horizontal Expand Center', 'dropdown-button' ), value: 'wbcom-btn-4' },
							{ label: __( 'Animation 5 - Slide From Left', 'dropdown-button' ), value: 'wbcom-btn-5' },
							{ label: __( 'Animation 6 - Slide From Bottom', 'dropdown-button' ), value: 'wbcom-btn-6' },
							{ label: __( 'Animation 7 - Slide From Right', 'dropdown-button' ), value: 'wbcom-btn-7' },
							{ label: __( 'Animation 8 - Slide From Top', 'dropdown-button' ), value: 'wbcom-btn-8' }
						] }
						onChange={ ( value ) => setAttributes( { buttonSkin: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
					{ buttonSkin !== 'none' && ! useThemeColors && (
						<>
							<p><strong>{ __( 'Animation Color', 'dropdown-button' ) }</strong></p>
							<ColorPalette
								value={ animationColor }
								onChange={ ( value ) => setAttributes( { animationColor: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Dropdown Items', 'dropdown-button' ) } initialOpen={ false }>
					{ dropdownItems.map( ( item, index ) => (
						<div key={ index } style={ { marginBottom: '20px', padding: '10px', border: '1px solid #ddd' } }>
							<TextControl
								label={ __( 'Title', 'dropdown-button' ) }
								value={ item.title }
								onChange={ ( value ) => updateDropdownItem( index, 'title', value ) }
								__next40pxDefaultSize={ true }
								__nextHasNoMarginBottom={ true }
							/>
							<TextControl
								label={ __( 'URL', 'dropdown-button' ) }
								value={ item.url }
								onChange={ ( value ) => updateDropdownItem( index, 'url', value ) }
								__next40pxDefaultSize={ true }
								__nextHasNoMarginBottom={ true }
							/>
							<Button
								isDestructive
								icon={ trash }
								onClick={ () => removeDropdownItem( index ) }
							>
								{ __( 'Remove', 'dropdown-button' ) }
							</Button>
						</div>
					) ) }
					<Button
						isPrimary
						icon={ plus }
						onClick={ addDropdownItem }
					>
						{ __( 'Add Item', 'dropdown-button' ) }
					</Button>
				</PanelBody>

				<PanelBody title={ __( 'Dropdown Position', 'dropdown-button' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Dropdown Position', 'dropdown-button' ) }
						value={ dropdownPosition }
						options={ [
							{ label: __( 'Bottom', 'dropdown-button' ), value: 'bottom' },
							{ label: __( 'Top', 'dropdown-button' ), value: 'top' },
							{ label: __( 'Left', 'dropdown-button' ), value: 'left' },
							{ label: __( 'Right', 'dropdown-button' ), value: 'right' }
						] }
						onChange={ ( value ) => setAttributes( { dropdownPosition: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Button Colors', 'dropdown-button' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'dropdown-button' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'dropdown-button' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'dropdown-button' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<>
							<p>{ __( 'Normal State', 'dropdown-button' ) }</p>
							<p><strong>{ __( 'Text Color', 'dropdown-button' ) }</strong></p>
							<ColorPalette
								value={ buttonTextColor }
								onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
							/>
							<p><strong>{ __( 'Background Color', 'dropdown-button' ) }</strong></p>
							<ColorPalette
								value={ buttonBgColor }
								onChange={ ( value ) => setAttributes( { buttonBgColor: value } ) }
							/>
							<hr />
							<p>{ __( 'Hover State', 'dropdown-button' ) }</p>
							<p><strong>{ __( 'Text Color', 'dropdown-button' ) }</strong></p>
							<ColorPalette
								value={ buttonHoverTextColor }
								onChange={ ( value ) => setAttributes( { buttonHoverTextColor: value } ) }
							/>
							<p><strong>{ __( 'Background Color', 'dropdown-button' ) }</strong></p>
							<ColorPalette
								value={ buttonHoverBgColor }
								onChange={ ( value ) => setAttributes( { buttonHoverBgColor: value } ) }
							/>
						</>
					) }
				</PanelBody>

				{ ! useThemeColors && (
					<PanelBody title={ __( 'Button Gradient Background', 'dropdown-button' ) } initialOpen={ false }>
						<ToggleControl
							label={ __( 'Enable Gradient', 'dropdown-button' ) }
							checked={ enableGradient }
							onChange={ ( value ) => setAttributes( { enableGradient: value } ) }
						/>
						{ enableGradient && (
							<>
								<SelectControl
									label={ __( 'Gradient Type', 'dropdown-button' ) }
									value={ gradientType }
									options={ [
										{ label: __( 'Linear', 'dropdown-button' ), value: 'linear' },
										{ label: __( 'Radial', 'dropdown-button' ), value: 'radial' }
									] }
									onChange={ ( value ) => setAttributes( { gradientType: value } ) }
								/>
								{ gradientType === 'linear' && (
									<RangeControl
										label={ __( 'Angle', 'dropdown-button' ) }
										value={ gradientAngle }
										onChange={ ( value ) => setAttributes( { gradientAngle: value } ) }
										min={ 0 }
										max={ 360 }
									/>
								) }
								<p><strong>{ __( 'Start Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ gradientColorStart }
									onChange={ ( value ) => setAttributes( { gradientColorStart: value } ) }
								/>
								<RangeControl
									label={ __( 'Start Position (%)', 'dropdown-button' ) }
									value={ gradientStartPosition }
									onChange={ ( value ) => setAttributes( { gradientStartPosition: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<p><strong>{ __( 'End Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ gradientColorEnd }
									onChange={ ( value ) => setAttributes( { gradientColorEnd: value } ) }
								/>
								<RangeControl
									label={ __( 'End Position (%)', 'dropdown-button' ) }
									value={ gradientEndPosition }
									onChange={ ( value ) => setAttributes( { gradientEndPosition: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</>
						) }
						<hr />
						<ToggleControl
							label={ __( 'Enable Hover Gradient', 'dropdown-button' ) }
							checked={ enableHoverGradient }
							onChange={ ( value ) => setAttributes( { enableHoverGradient: value } ) }
						/>
						{ enableHoverGradient && (
							<>
								<SelectControl
									label={ __( 'Hover Gradient Type', 'dropdown-button' ) }
									value={ hoverGradientType }
									options={ [
										{ label: __( 'Linear', 'dropdown-button' ), value: 'linear' },
										{ label: __( 'Radial', 'dropdown-button' ), value: 'radial' }
									] }
									onChange={ ( value ) => setAttributes( { hoverGradientType: value } ) }
								/>
								{ hoverGradientType === 'linear' && (
									<RangeControl
										label={ __( 'Angle', 'dropdown-button' ) }
										value={ hoverGradientAngle }
										onChange={ ( value ) => setAttributes( { hoverGradientAngle: value } ) }
										min={ 0 }
										max={ 360 }
									/>
								) }
								<p><strong>{ __( 'Start Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ hoverGradientColorStart }
									onChange={ ( value ) => setAttributes( { hoverGradientColorStart: value } ) }
								/>
								<RangeControl
									label={ __( 'Start Position (%)', 'dropdown-button' ) }
									value={ hoverGradientStartPosition }
									onChange={ ( value ) => setAttributes( { hoverGradientStartPosition: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<p><strong>{ __( 'End Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ hoverGradientColorEnd }
									onChange={ ( value ) => setAttributes( { hoverGradientColorEnd: value } ) }
								/>
								<RangeControl
									label={ __( 'End Position (%)', 'dropdown-button' ) }
									value={ hoverGradientEndPosition }
									onChange={ ( value ) => setAttributes( { hoverGradientEndPosition: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</>
						) }
					</PanelBody>
				) }

				{ ! useThemeColors && (
					<PanelBody title={ __( 'Button Border', 'dropdown-button' ) } initialOpen={ false }>
						<p>{ __( 'Normal State', 'dropdown-button' ) }</p>
						<SelectControl
							label={ __( 'Border Style', 'dropdown-button' ) }
							value={ borderStyle }
							options={ [
								{ label: __( 'None', 'dropdown-button' ), value: 'none' },
								{ label: __( 'Solid', 'dropdown-button' ), value: 'solid' },
								{ label: __( 'Dashed', 'dropdown-button' ), value: 'dashed' },
								{ label: __( 'Dotted', 'dropdown-button' ), value: 'dotted' },
								{ label: __( 'Double', 'dropdown-button' ), value: 'double' }
							] }
							onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
						/>
						{ borderStyle !== 'none' && (
							<>
								<RangeControl
									label={ __( 'Border Width', 'dropdown-button' ) }
									value={ borderWidth }
									onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
									min={ 1 }
									max={ 10 }
								/>
								<p><strong>{ __( 'Border Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ borderColor }
									onChange={ ( value ) => setAttributes( { borderColor: value } ) }
								/>
							</>
						) }
						<hr />
						<p>{ __( 'Hover State', 'dropdown-button' ) }</p>
						<SelectControl
							label={ __( 'Border Style', 'dropdown-button' ) }
							value={ borderStyleHover }
							options={ [
								{ label: __( 'None', 'dropdown-button' ), value: 'none' },
								{ label: __( 'Solid', 'dropdown-button' ), value: 'solid' },
								{ label: __( 'Dashed', 'dropdown-button' ), value: 'dashed' },
								{ label: __( 'Dotted', 'dropdown-button' ), value: 'dotted' },
								{ label: __( 'Double', 'dropdown-button' ), value: 'double' }
							] }
							onChange={ ( value ) => setAttributes( { borderStyleHover: value } ) }
						/>
						{ borderStyleHover !== 'none' && borderStyleHover && (
							<>
								<RangeControl
									label={ __( 'Border Width', 'dropdown-button' ) }
									value={ borderWidthHover }
									onChange={ ( value ) => setAttributes( { borderWidthHover: value } ) }
									min={ 1 }
									max={ 10 }
								/>
								<p><strong>{ __( 'Border Color', 'dropdown-button' ) }</strong></p>
								<ColorPalette
									value={ borderColorHover }
									onChange={ ( value ) => setAttributes( { borderColorHover: value } ) }
								/>
							</>
						) }
					</PanelBody>
				) }

				{ ! useThemeColors && (
					<PanelBody title={ __( 'Icon Styling', 'dropdown-button' ) } initialOpen={ false }>
						<p><strong>{ __( 'Icon Background Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ iconBgColor }
							onChange={ ( value ) => setAttributes( { iconBgColor: value } ) }
						/>
					</PanelBody>
				) }

				{ ! useThemeColors && (
					<PanelBody title={ __( 'Dropdown Colors', 'dropdown-button' ) } initialOpen={ false }>
						<p>{ __( 'Normal State', 'dropdown-button' ) }</p>
						<p><strong>{ __( 'Text Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ dropdownTextColor }
							onChange={ ( value ) => setAttributes( { dropdownTextColor: value } ) }
						/>
						<p><strong>{ __( 'Background Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ dropdownBgColor }
							onChange={ ( value ) => setAttributes( { dropdownBgColor: value } ) }
						/>
						<hr />
						<p>{ __( 'Hover State', 'dropdown-button' ) }</p>
						<p><strong>{ __( 'Text Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ dropdownHoverTextColor }
							onChange={ ( value ) => setAttributes( { dropdownHoverTextColor: value } ) }
						/>
						<p><strong>{ __( 'Background Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ dropdownHoverBgColor }
							onChange={ ( value ) => setAttributes( { dropdownHoverBgColor: value } ) }
						/>
						<hr />
						<p><strong>{ __( 'Separator Color', 'dropdown-button' ) }</strong></p>
						<ColorPalette
							value={ separatorColor }
							onChange={ ( value ) => setAttributes( { separatorColor: value } ) }
						/>
					</PanelBody>
				) }

				<PanelBody title={ __( 'Dropdown Shadow', 'dropdown-button' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Box Shadow', 'dropdown-button' ) }
						value={ dropdownShadow }
						onChange={ ( value ) => setAttributes( { dropdownShadow: value } ) }
						help={ __( 'e.g., 0 4px 12px rgba(0, 0, 0, 0.15)', 'dropdown-button' ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="dropdown-button-container">
					<button
						className={ `dropdown-button ${ buttonSkin }` }
						style={ buttonStyle }
						onClick={ () => setIsOpen( ! isOpen ) }
						id={ buttonId || undefined }
					>
						{ iconPosition === 'before' && (
							<span className="button-icon" style={ iconStyle }>{ renderIcon( buttonIcon.icon ) }</span>
						) }
						<span className="button-text">{ text }</span>
						{ iconPosition === 'after' && (
							<span className="button-icon" style={ iconStyle }>{ renderIcon( buttonIcon.icon ) }</span>
						) }
					</button>
					{ isOpen && dropdownItems.length > 0 && (
						<ul className={ `dropdown-menu position-${ dropdownPosition }` } style={ dropdownStyle }>
							{ dropdownItems.map( ( item, index ) => (
								<li key={ index }>
									<a href={ item.url || '#' }>
										{ item.title }
									</a>
								</li>
							) ) }
						</ul>
					) }
				</div>
			</div>
		</>
	);
}
