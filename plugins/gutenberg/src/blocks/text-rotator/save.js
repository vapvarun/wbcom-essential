/**
 * Text Rotator Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		beforeText,
		rotatingTexts,
		afterText,
		animationType,
		speed,
		textColor,
		rotatingColor,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		fontSizeUnit,
		textAlign,
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
		className: `wbe-block-${ uniqueId } wbe-text-rotator${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tr-text-color: ${ textColor };`,
		`  --wbe-tr-rotating-color: ${ rotatingColor };`,
		`  --wbe-tr-font-size: ${ fontSize }${ fontSizeUnit };`,
		`  --wbe-tr-font-size-tablet: ${ fontSizeTablet }${ fontSizeUnit };`,
		`  --wbe-tr-font-size-mobile: ${ fontSizeMobile }${ fontSizeUnit };`,
		`  --wbe-tr-text-align: ${ textAlign };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			<p className="wbe-text-rotator__sentence">
				{ beforeText && (
					<span className="wbe-text-rotator__before">{ beforeText } </span>
				) }
				<span
					className="wbe-text-rotator__rotating"
					data-texts={ JSON.stringify( rotatingTexts ) }
					data-animation={ animationType }
					data-speed={ speed }
				>
					{ rotatingTexts[ 0 ] }
				</span>
				{ afterText && (
					<span className="wbe-text-rotator__after"> { afterText }</span>
				) }
			</p>
		</div>
	);
}
