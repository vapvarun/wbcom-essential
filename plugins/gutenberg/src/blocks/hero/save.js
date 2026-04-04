/**
 * Hero Section Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		uniqueId,
		heading,
		subheading,
		buttonOneText,
		buttonOneUrl,
		buttonTwoText,
		buttonTwoUrl,
		backgroundType,
		backgroundColor,
		gradientStart,
		gradientEnd,
		backgroundImage,
		overlayColor,
		overlayOpacity,
		headingColor,
		subheadingColor,
		buttonOneBg,
		buttonOneColor,
		buttonTwoBg,
		buttonTwoColor,
		contentAlign,
		minHeight,
		minHeightUnit,
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

	const backgroundStyle = {};
	if ( backgroundType === 'gradient' ) {
		backgroundStyle.background = `linear-gradient(135deg, ${ gradientStart } 0%, ${ gradientEnd } 100%)`;
	} else if ( backgroundType === 'color' ) {
		backgroundStyle.backgroundColor = backgroundColor;
	} else if ( backgroundType === 'image' && backgroundImage && backgroundImage.url ) {
		backgroundStyle.backgroundImage = `url(${ backgroundImage.url })`;
		backgroundStyle.backgroundSize = 'cover';
		backgroundStyle.backgroundPosition = 'center';
	}

	const blockProps = useBlockProps.save( {
		className: `wbe-block-${ uniqueId } wbe-hero${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
		style: {
			minHeight: `${ minHeight }${ minHeightUnit }`,
			...backgroundStyle,
		},
	} );

	return (
		<div { ...blockProps }>
			{ backgroundType === 'image' && backgroundImage?.url && (
				<div
					className="wbe-hero__overlay"
					style={ { backgroundColor: overlayColor, opacity: overlayOpacity / 100 } }
				/>
			) }
			<div className={ `wbe-hero__content wbe-hero__content--${ contentAlign }` }>
				<RichText.Content
					tagName="h1"
					className="wbe-hero__heading"
					value={ heading }
					style={ { color: headingColor } }
				/>
				<RichText.Content
					tagName="p"
					className="wbe-hero__subheading"
					value={ subheading }
					style={ { color: subheadingColor } }
				/>
				<div className="wbe-hero__buttons">
					<a
						className="wbe-hero__btn wbe-hero__btn--primary"
						href={ buttonOneUrl }
						style={ { backgroundColor: buttonOneBg, color: buttonOneColor } }
					>
						<RichText.Content value={ buttonOneText } />
					</a>
					<a
						className="wbe-hero__btn wbe-hero__btn--secondary"
						href={ buttonTwoUrl }
						style={ {
							backgroundColor: buttonTwoBg,
							color: buttonTwoColor,
							border: `2px solid ${ buttonTwoColor }`,
						} }
					>
						<RichText.Content value={ buttonTwoText } />
					</a>
				</div>
			</div>
		</div>
	);
}
