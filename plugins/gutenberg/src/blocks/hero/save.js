import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		heading,
		subheading,
		gradientFrom,
		gradientTo,
		gradientAngle,
		overlayOpacity,
		backgroundImage,
		minHeight,
		textColor,
		textAlign,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		showSecondaryButton,
	} = attributes;

	const gradient = `linear-gradient(${ gradientAngle }deg, ${ gradientFrom }, ${ gradientTo })`;

	const sectionStyle = {
		background: backgroundImage
			? `${ gradient }, url(${ backgroundImage }) center/cover no-repeat`
			: gradient,
		minHeight: `${ minHeight }px`,
		color: textColor,
		textAlign,
	};

	const blockProps = useBlockProps.save( {
		className: 'wbe-hero',
		style: sectionStyle,
	} );

	return (
		<div { ...blockProps }>
			{ backgroundImage && overlayOpacity > 0 && (
				<div
					className="wbe-hero__overlay"
					style={ { opacity: overlayOpacity / 100 } }
					aria-hidden="true"
				/>
			) }
			<div className="wbe-hero__content">
				{ heading && (
					<RichText.Content
						tagName="h1"
						className="wbe-hero__heading"
						value={ heading }
					/>
				) }
				{ subheading && (
					<RichText.Content
						tagName="p"
						className="wbe-hero__subheading"
						value={ subheading }
					/>
				) }
				<div className="wbe-hero__buttons">
					{ primaryButtonText && (
						<a
							className="wbe-btn wbe-btn--primary"
							href={ primaryButtonUrl || '#' }
							rel="noopener"
						>
							{ primaryButtonText }
						</a>
					) }
					{ showSecondaryButton && secondaryButtonText && (
						<a
							className="wbe-btn wbe-btn--secondary"
							href={ secondaryButtonUrl || '#' }
							rel="noopener"
						>
							{ secondaryButtonText }
						</a>
					) }
				</div>
			</div>
		</div>
	);
}
