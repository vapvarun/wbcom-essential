
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
	ColorPalette
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
		text,
		size,
		buttonIcon,
		iconPosition,
		buttonId,
		dropdownItems,
		animationStyle,
		dropdownPosition,
		buttonTextColor,
		buttonBgColor,
		buttonHoverTextColor,
		buttonHoverBgColor,
		dropdownTextColor,
		dropdownBgColor,
		dropdownHoverTextColor,
		dropdownHoverBgColor
	} = attributes;

	const [ isOpen, setIsOpen ] = useState( false );

	const wrapperStyle = {
		'--dropdown-hover-text-color': dropdownHoverTextColor || '#2271b1',
		'--dropdown-hover-bg-color': dropdownHoverBgColor || '#f5f5f5'
	};

	const buttonStyle = {
		'--normal-text-color': buttonTextColor || '#ffffff',
		'--normal-bg-color': buttonBgColor || '#2271b1',
		'--hover-text-color': buttonHoverTextColor || 'currentColor',
		'--hover-bg-color': buttonHoverBgColor || 'rgba(0, 0, 0, 0.1)'
	};

	const blockProps = useBlockProps( {
		className: `dropdown-button-wrapper size-${ size } animation-${ animationStyle }`,
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

	const dropdownStyle = {
		color: dropdownTextColor,
		backgroundColor: dropdownBgColor
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

				<PanelBody title={ __( 'Animation Style', 'dropdown-button' ) }>
					<SelectControl
						label={ __( 'Animation Style', 'dropdown-button' ) }
						value={ animationStyle }
						options={ [
							{ label: __( 'None', 'dropdown-button' ), value: 'none' },
							{ label: __( 'Animation 1', 'dropdown-button' ), value: 'animation-1' },
							{ label: __( 'Animation 2', 'dropdown-button' ), value: 'animation-2' },
							{ label: __( 'Animation 3', 'dropdown-button' ), value: 'animation-3' },
							{ label: __( 'Animation 4', 'dropdown-button' ), value: 'animation-4' },
							{ label: __( 'Animation 5', 'dropdown-button' ), value: 'animation-5' },
							{ label: __( 'Animation 6', 'dropdown-button' ), value: 'animation-6' },
							{ label: __( 'Animation 7', 'dropdown-button' ), value: 'animation-7' },
							{ label: __( 'Animation 8', 'dropdown-button' ), value: 'animation-8' }
						] }
						onChange={ ( value ) => setAttributes( { animationStyle: value } ) }
						__next40pxDefaultSize={ true }
						__nextHasNoMarginBottom={ true }
					/>
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
				</PanelBody>

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
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="dropdown-button-container">
					<button
						className={ `dropdown-button ${ animationStyle }` }
						style={ buttonStyle }
						onClick={ () => setIsOpen( ! isOpen ) }
						id={ buttonId || undefined }
					>
						{ iconPosition === 'before' && (
							<span className="button-icon">{ renderIcon( buttonIcon.icon ) }</span>
						) }
						<span className="button-text">{ text }</span>
						{ iconPosition === 'after' && (
							<span className="button-icon">{ renderIcon( buttonIcon.icon ) }</span>
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
