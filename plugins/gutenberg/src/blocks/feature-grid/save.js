/**
 * Feature Grid Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		uniqueId,
		columns,
		cardStyle,
		features,
		cardBg,
		titleColor,
		descriptionColor,
		iconSize,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
	} = attributes;

	const visibilityClasses = [
		hideOnDesktop ? 'wbe-hide-desktop' : '',
		hideOnTablet ? 'wbe-hide-tablet' : '',
		hideOnMobile ? 'wbe-hide-mobile' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const blockProps = useBlockProps.save( {
		className: `wbe-block-${ uniqueId } wbe-feature-grid${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
	} );

	return (
		<div { ...blockProps }>
			<div
				className={ `wbe-feature-grid__grid wbe-feature-grid__grid--style-${ cardStyle }` }
				style={ { '--wbe-feature-cols': columns } }
			>
				{ features.map( ( feat, index ) => (
					<div
						key={ index }
						className={ `wbe-feature-grid__card wbe-feature-grid__card--${ cardStyle }` }
						style={ { backgroundColor: cardBg } }
					>
						<div
							className="wbe-feature-grid__icon"
							style={ { fontSize: iconSize } }
							aria-hidden="true"
						>
							{ feat.icon }
						</div>
						<RichText.Content
							tagName="h3"
							className="wbe-feature-grid__title"
							value={ feat.title }
							style={ { color: titleColor } }
						/>
						<RichText.Content
							tagName="p"
							className="wbe-feature-grid__description"
							value={ feat.description }
							style={ { color: descriptionColor } }
						/>
					</div>
				) ) }
			</div>
		</div>
	);
}
