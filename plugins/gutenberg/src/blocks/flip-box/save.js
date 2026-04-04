/**
 * Flip Box Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		frontTitle,
		frontDescription,
		frontIcon,
		frontBg,
		frontColor,
		backTitle,
		backDescription,
		backButtonText,
		backButtonUrl,
		backBg,
		backColor,
		flipDirection,
		height,
		heightUnit,
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
		className: `wbe-block-${ uniqueId } wbe-flip-box wbe-flip-box--${ flipDirection }${
			visibilityClasses ? ' ' + visibilityClasses : ''
		}`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const borderRadiusVal = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '12px';

	const shadowVal = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-flip-front-bg: ${ frontBg };`,
		`  --wbe-flip-front-color: ${ frontColor };`,
		`  --wbe-flip-back-bg: ${ backBg };`,
		`  --wbe-flip-back-color: ${ backColor };`,
		`  --wbe-flip-height: ${ height }${ heightUnit };`,
		`  --wbe-flip-radius: ${ borderRadiusVal };`,
		`  --wbe-flip-shadow: ${ shadowVal };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenCss }</style>

			<div
				className="wbe-flip-box__inner"
				aria-hidden="false"
			>
				{ /* Front face */ }
				<div
					className="wbe-flip-box__front"
					aria-label={ frontTitle }
				>
					{ frontIcon && (
						<span className="wbe-flip-box__icon" aria-hidden="true">
							{ frontIcon }
						</span>
					) }
					<h3 className="wbe-flip-box__title">{ frontTitle }</h3>
					<p className="wbe-flip-box__description">{ frontDescription }</p>
				</div>

				{ /* Back face */ }
				<div
					className="wbe-flip-box__back"
					aria-label={ backTitle }
				>
					<h3 className="wbe-flip-box__title">{ backTitle }</h3>
					<p className="wbe-flip-box__description">{ backDescription }</p>
					{ backButtonText && (
						<a
							href={ backButtonUrl }
							className="wbe-flip-box__btn"
						>
							{ backButtonText }
						</a>
					) }
				</div>
			</div>
		</div>
	);
}
