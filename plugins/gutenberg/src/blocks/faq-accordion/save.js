/**
 * FAQ Accordion Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

/**
 * Build the FAQPage JSON-LD string from block attributes.
 * Content comes from editor-controlled attributes, not user input.
 *
 * @param {Array} faqs Array of FAQ objects with question and answer strings.
 * @return {string} Serialized JSON-LD string.
 */
function buildFaqSchemaJson( faqs ) {
	const schema = {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: faqs.map( ( faq ) => ( {
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				text: faq.answer,
			},
		} ) ),
	};
	return JSON.stringify( schema );
}

export default function save( { attributes } ) {
	const {
		uniqueId,
		faqs,
		allowMultiOpen,
		iconStyle,
		firstOpen,
		enableSchema,
		questionColor,
		answerColor,
		questionBg,
		borderColor,
		iconColor,
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
		className: `wbe-block-${ uniqueId } wbe-faq-accordion${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
		'data-allow-multi': allowMultiOpen ? 'true' : 'false',
		'data-first-open': firstOpen ? 'true' : 'false',
		'data-icon-style': iconStyle,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const getIconChar = ( style ) => {
		switch ( style ) {
			case 'plus':
				return '+';
			case 'arrow':
				return '→';
			case 'chevron':
			default:
				return '▶';
		}
	};

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-faq-question-color: ${ questionColor };`,
		`  --wbe-faq-answer-color: ${ answerColor };`,
		`  --wbe-faq-question-bg: ${ questionBg };`,
		`  --wbe-faq-border-color: ${ borderColor };`,
		`  --wbe-faq-icon-color: ${ iconColor };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			<div className="wbe-faq-accordion__list">
				{ faqs.map( ( faq, index ) => {
					const itemId = `wbe-faq-${ uniqueId }-${ index }`;
					const panelId = `wbe-faq-panel-${ uniqueId }-${ index }`;
					const isFirstAndOpen = index === 0 && firstOpen;

					return (
						<div
							key={ index }
							className={ `wbe-faq-accordion__item${ isFirstAndOpen ? ' is-open' : '' }` }
						>
							<button
								id={ itemId }
								type="button"
								className="wbe-faq-accordion__question"
								aria-expanded={ isFirstAndOpen ? 'true' : 'false' }
								aria-controls={ panelId }
							>
								<span className="wbe-faq-accordion__question-text">
									{ faq.question }
								</span>
								<span
									className="wbe-faq-accordion__icon"
									aria-hidden="true"
								>
									{ getIconChar( iconStyle ) }
								</span>
							</button>
							<div
								id={ panelId }
								role="region"
								aria-labelledby={ itemId }
								className="wbe-faq-accordion__answer"
								hidden={ ! isFirstAndOpen }
							>
								<p>{ faq.answer }</p>
							</div>
						</div>
					);
				} ) }
			</div>

			{ enableSchema && (
				<script
					type="application/ld+json"
					// Schema data is constructed from editor-controlled attributes only.
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={ { __html: buildFaqSchemaJson( faqs ) } }
				/>
			) }
		</div>
	);
}
