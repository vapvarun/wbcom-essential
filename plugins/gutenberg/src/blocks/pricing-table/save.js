/**
 * Pricing Cards Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		columns,
		plans,
		currency,
		cardBg,
		featuredBg,
		featuredColor,
		priceColor,
		featureColor,
		buttonBg,
		buttonColor,
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
		className: `wbe-block-${ uniqueId } wbe-pricing-cards${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<div
				className="wbe-pricing-cards__grid"
				style={ { '--wbe-pricing-cols': columns } }
			>
				{ plans.map( ( plan, index ) => (
					<div
						key={ index }
						className={ `wbe-pricing-cards__card${ plan.featured ? ' wbe-pricing-cards__card--featured' : '' }` }
						style={ {
							backgroundColor: plan.featured ? featuredBg : cardBg,
							color: plan.featured ? featuredColor : 'inherit',
						} }
					>
						{ plan.featured && (
							<div className="wbe-pricing-cards__badge">Most Popular</div>
						) }
						<div className="wbe-pricing-cards__header">
							<div className="wbe-pricing-cards__name">{ plan.name }</div>
							<div
								className="wbe-pricing-cards__price"
								style={ { color: plan.featured ? featuredColor : priceColor } }
							>
								<span className="wbe-pricing-cards__currency">{ currency }</span>
								<span className="wbe-pricing-cards__amount">{ plan.price }</span>
								<span className="wbe-pricing-cards__period">{ plan.period }</span>
							</div>
						</div>
						<ul className="wbe-pricing-cards__features">
							{ plan.features.map( ( feat, fi ) => (
								<li
									key={ fi }
									className="wbe-pricing-cards__feature"
									style={ { color: plan.featured ? featuredColor : featureColor } }
								>
									<span className="wbe-pricing-cards__feature-check" aria-hidden="true">&#10003;</span>
									{ feat }
								</li>
							) ) }
						</ul>
						<div className="wbe-pricing-cards__footer">
							<a
								className="wbe-pricing-cards__btn"
								href={ plan.buttonUrl }
								role="button"
								style={ {
									backgroundColor: plan.featured ? '#ffffff' : buttonBg,
									color: plan.featured ? featuredBg : buttonColor,
								} }
							>
								{ plan.buttonText }
							</a>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
