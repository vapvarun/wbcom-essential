import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		heading,
		description,
		buttonText,
		buttonUrl,
		backgroundColor,
		textColor,
		buttonColor,
		buttonTextColor,
		backgroundImage,
		textAlign,
		layout,
	} = attributes;

	const sectionStyle = {
		backgroundColor,
		backgroundImage: backgroundImage
			? `url(${ backgroundImage })`
			: undefined,
		backgroundSize: backgroundImage ? 'cover' : undefined,
		backgroundPosition: backgroundImage ? 'center' : undefined,
		color: textColor,
		textAlign: layout === 'stacked' ? textAlign : undefined,
	};

	const blockProps = useBlockProps.save( {
		className: `wbe-cta wbe-cta--${ layout }`,
		style: sectionStyle,
	} );

	return (
		<div { ...blockProps }>
			<div className="wbe-cta__text">
				{ heading && (
					<RichText.Content
						tagName="h2"
						className="wbe-cta__heading"
						value={ heading }
					/>
				) }
				{ description && (
					<RichText.Content
						tagName="p"
						className="wbe-cta__description"
						value={ description }
					/>
				) }
			</div>
			<div className="wbe-cta__action">
				{ buttonText && (
					<a
						className="wbe-btn wbe-btn--cta"
						href={ buttonUrl || '#' }
						rel="noopener"
						style={ {
							backgroundColor: buttonColor,
							color: buttonTextColor,
						} }
					>
						{ buttonText }
					</a>
				) }
			</div>
		</div>
	);
}
