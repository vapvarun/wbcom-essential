
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
		dropdownTextColor,
		dropdownBgColor
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `dropdown-button-wrapper size-${ size } animation-${ animationStyle }`
	} );

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

	const buttonStyle = {
		color: buttonTextColor,
		backgroundColor: buttonBgColor
	};

	const dropdownStyle = {
		color: dropdownTextColor,
		backgroundColor: dropdownBgColor
	};

	return (
		<div { ...blockProps }>
			<div className="dropdown-button-container">
				<button
					className={ `dropdown-button ${ animationStyle }` }
					style={ buttonStyle }
					id={ buttonId || undefined }
					data-dropdown-position={ dropdownPosition }
				>
					{ iconPosition === 'before' && (
						<span className="button-icon">{ renderIcon( buttonIcon.icon ) }</span>
					) }
					<span className="button-text">{ text }</span>
					{ iconPosition === 'after' && (
						<span className="button-icon">{ renderIcon( buttonIcon.icon ) }</span>
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
