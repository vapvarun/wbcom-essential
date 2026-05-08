/**
 * Promo Banner Block - Save Component
 *
 * Static block: markup is serialized to the post content.
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
		backgroundImage,
		overlayColor,
		headingColor,
		descriptionColor,
		buttonBg,
		buttonColor,
		contentAlign,
		minHeight,
		bannerStyle,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
	} = attributes;

	const isOverlay = bannerStyle === 'overlay';
	const hasBgImage = backgroundImage && backgroundImage.url;

	const visibilityClasses = [
		hideOnDesktop ? 'wbe-hide-desktop' : '',
		hideOnTablet ? 'wbe-hide-tablet' : '',
		hideOnMobile ? 'wbe-hide-mobile' : '',
	]
		.filter( Boolean )
		.join( ' ' );

	const wrapperStyle = {
		minHeight: `${ minHeight }px`,
	};

	if ( isOverlay && hasBgImage ) {
		wrapperStyle.backgroundImage = `url(${ backgroundImage.url })`;
		wrapperStyle.backgroundSize = 'cover';
		wrapperStyle.backgroundPosition = 'center';
	}

	const blockProps = useBlockProps.save( {
		className: [
			`wbe-block-${ uniqueId }`,
			'wbe-promo-banner',
			`wbe-promo-banner--${ bannerStyle }`,
			visibilityClasses,
		]
			.filter( Boolean )
			.join( ' ' ),
		style: wrapperStyle,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			{ /* Overlay layer (overlay mode only) */ }
			{ isOverlay && hasBgImage && (
				<div
					className="wbe-promo-banner__overlay"
					style={ { backgroundColor: overlayColor } }
					aria-hidden="true"
				/>
			) }

			{ /* Split mode: image pane */ }
			{ ! isOverlay && hasBgImage && (
				<div className="wbe-promo-banner__image-pane" aria-hidden="true">
					<img
						src={ backgroundImage.url }
						alt={ backgroundImage.alt || '' }
						className="wbe-promo-banner__bg-img"
						loading="lazy"
						decoding="async"
					/>
				</div>
			) }

			{ /* Content */ }
			<div className={ `wbe-promo-banner__content wbe-promo-banner__content--${ contentAlign }` }>
				<RichText.Content
					tagName="h2"
					className="wbe-promo-banner__heading"
					value={ heading }
					style={ { color: headingColor } }
				/>
				<RichText.Content
					tagName="p"
					className="wbe-promo-banner__description"
					value={ description }
					style={ { color: descriptionColor } }
				/>
				<div className="wbe-promo-banner__cta">
					<a
						className="wbe-promo-banner__btn"
						href={ buttonUrl }
						style={ { backgroundColor: buttonBg, color: buttonColor } }
					>
						<RichText.Content value={ buttonText } />
					</a>
				</div>
			</div>
		</div>
	);
}
