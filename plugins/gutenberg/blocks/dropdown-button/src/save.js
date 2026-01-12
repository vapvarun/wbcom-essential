
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
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

	// Generate gradient CSS
	const generateGradient = ( type, angle, colorStart, colorEnd, startPos, endPos ) => {
		if ( type === 'linear' ) {
			return `linear-gradient(${ angle }deg, ${ colorStart } ${ startPos }%, ${ colorEnd } ${ endPos }%)`;
		}
		return `radial-gradient(circle, ${ colorStart } ${ startPos }%, ${ colorEnd } ${ endPos }%)`;
	};

	// Build wrapper style - colors only when NOT using theme colors
	const wrapperStyle = {};

	if ( ! useThemeColors ) {
		wrapperStyle['--dropdown-hover-text-color'] = dropdownHoverTextColor || '#2271b1';
		wrapperStyle['--dropdown-hover-bg-color'] = dropdownHoverBgColor || '#f5f5f5';
		wrapperStyle['--separator-color'] = separatorColor || '#eee';
		wrapperStyle['--animation-color'] = animationColor || 'rgba(255, 255, 255, 0.2)';

		// Add hover gradient CSS variable if enabled
		if ( enableHoverGradient ) {
			wrapperStyle['--hover-gradient'] = generateGradient(
				hoverGradientType,
				hoverGradientAngle,
				hoverGradientColorStart,
				hoverGradientColorEnd,
				hoverGradientStartPosition,
				hoverGradientEndPosition
			);
		}

		if ( buttonHoverBgColor && ! enableHoverGradient ) {
			wrapperStyle['--hover-bg-color'] = buttonHoverBgColor;
		}

		if ( buttonHoverTextColor ) {
			wrapperStyle['--hover-text-color'] = buttonHoverTextColor;
		}

		// Set hover border - either to hover values or to normal values to maintain appearance
		if ( borderStyleHover && borderStyleHover !== 'none' ) {
			// User specified a hover border
			wrapperStyle['--hover-border'] = `${ borderWidthHover }px ${ borderStyleHover } ${ borderColorHover || '#000' }`;
		} else if ( borderStyle && borderStyle !== 'none' ) {
			// No hover border specified, use normal border to maintain appearance on hover
			wrapperStyle['--hover-border'] = `${ borderWidth }px ${ borderStyle } ${ borderColor || '#000' }`;
		} else {
			// No border at all
			wrapperStyle['--hover-border'] = 'none';
		}
	}

	// Build button style - colors only when NOT using theme colors
	const buttonStyle = {};

	if ( ! useThemeColors ) {
		buttonStyle.color = buttonTextColor || '#ffffff';
		buttonStyle.backgroundColor = enableGradient ? 'transparent' : ( buttonBgColor || '#2271b1' );
		buttonStyle.border = borderStyle !== 'none' && borderStyle
			? `${ borderWidth }px ${ borderStyle } ${ borderColor || '#000' }`
			: 'none';

		if ( enableGradient ) {
			buttonStyle.backgroundImage = generateGradient(
				gradientType,
				gradientAngle,
				gradientColorStart,
				gradientColorEnd,
				gradientStartPosition,
				gradientEndPosition
			);
		}
	}

	// Build icon style - colors only when NOT using theme colors
	const iconStyle = {};

	if ( ! useThemeColors && iconBgColor ) {
		iconStyle.backgroundColor = iconBgColor;
	}

	// Build dropdown style - colors only when NOT using theme colors
	const dropdownStyle = {};

	if ( ! useThemeColors ) {
		if ( dropdownTextColor ) {
			dropdownStyle.color = dropdownTextColor;
		}
		if ( dropdownBgColor ) {
			dropdownStyle.backgroundColor = dropdownBgColor;
		}
		if ( dropdownShadow ) {
			dropdownStyle.boxShadow = dropdownShadow;
		}
	}

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

	const blockProps = useBlockProps.save( {
		className: `dropdown-button-wrapper size-${ size } ${ buttonSkin !== 'none' ? buttonSkin : '' }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: wrapperStyle
	} );

	return (
		<div { ...blockProps }>
			<div className="dropdown-button-container">
				<button
					className={ `dropdown-button ${ buttonSkin }` }
					style={ buttonStyle }
					id={ buttonId || undefined }
					data-dropdown-position={ dropdownPosition }
				>
					{ iconPosition === 'before' && (
						<span className="button-icon" style={ iconStyle }>{ renderIcon( buttonIcon.icon ) }</span>
					) }
					<span className="button-text">{ text }</span>
					{ iconPosition === 'after' && (
						<span className="button-icon" style={ iconStyle }>{ renderIcon( buttonIcon.icon ) }</span>
					) }
				</button>
				{ dropdownItems.length > 0 && (
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
	);
}
