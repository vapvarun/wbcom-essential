/**
 * CTA Section Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		heading,
		description,
		buttonText,
		buttonUrl,
		layout,
		backgroundColor,
		headingColor,
		descriptionColor,
		buttonBg,
		buttonColor,
		buttonBgHover,
		contentAlign,
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
		className: `wbe-block-${ uniqueId } wbe-cta wbe-cta--${ layout } wbe-cta--align-${ contentAlign }${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
		style: {
			backgroundColor,
			'--wbe-cta-btn-hover-bg': buttonBgHover,
		},
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<div className="wbe-cta__body">
				<RichText.Content
					tagName="h2"
					className="wbe-cta__heading"
					value={ heading }
					style={ { color: headingColor } }
				/>
				<RichText.Content
					tagName="p"
					className="wbe-cta__description"
					value={ description }
					style={ { color: descriptionColor } }
				/>
			</div>
			<div className="wbe-cta__action">
				<a
					className="wbe-cta__btn"
					href={ buttonUrl }
					role="button"
					style={ { backgroundColor: buttonBg, color: buttonColor } }
				>
					<RichText.Content value={ buttonText } />
				</a>
			</div>
		</div>
	);
}
