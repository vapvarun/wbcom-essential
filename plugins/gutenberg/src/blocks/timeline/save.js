/**
 * Timeline Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		items,
		layout,
		lineColor,
		dotColor,
		dotSize,
		cardBg,
		dateColor,
		titleColor,
		descriptionColor,
		borderRadius,
		borderRadiusUnit,
		boxShadow,
		shadowHorizontal,
		shadowVertical,
		shadowBlur,
		shadowSpread,
		shadowColor,
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
		className: `wbe-block-${ uniqueId } wbe-timeline wbe-timeline--${ layout }${
			visibilityClasses ? ' ' + visibilityClasses : ''
		}`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const cardBorderRadius = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '8px';

	const cardShadow = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tl-line-color: ${ lineColor };`,
		`  --wbe-tl-dot-color: ${ dotColor };`,
		`  --wbe-tl-dot-size: ${ dotSize }px;`,
		`  --wbe-tl-card-bg: ${ cardBg };`,
		`  --wbe-tl-date-color: ${ dateColor };`,
		`  --wbe-tl-title-color: ${ titleColor };`,
		`  --wbe-tl-desc-color: ${ descriptionColor };`,
		`  --wbe-tl-card-radius: ${ cardBorderRadius };`,
		`  --wbe-tl-card-shadow: ${ cardShadow };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenCss }</style>

			<div className="wbe-timeline__track">
				{ items.map( ( item, index ) => (
					<div
						key={ index }
						className={ `wbe-timeline__item wbe-timeline__item--${ index + 1 }` }
					>
						<div
							className="wbe-timeline__dot"
							aria-hidden="true"
						>
							<span className="wbe-timeline__dot-icon">
								{ item.icon || '●' }
							</span>
						</div>
						<div className="wbe-timeline__card">
							<time className="wbe-timeline__date" dateTime={ item.date }>
								{ item.date }
							</time>
							<h3 className="wbe-timeline__title">
								{ item.title }
							</h3>
							<p className="wbe-timeline__description">
								{ item.description }
							</p>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
