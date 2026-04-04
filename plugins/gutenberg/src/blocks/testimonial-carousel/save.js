/**
 * Testimonial Carousel Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		testimonials,
		slidesPerView,
		autoplay,
		autoplayDelay,
		showDots,
		showArrows,
		loop,
		quoteBg,
		quoteColor,
		nameColor,
		roleColor,
		accentColor,
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
		className: `wbe-block-${ uniqueId } wbe-testimonial-carousel${
			visibilityClasses ? ' ' + visibilityClasses : ''
		}`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const cardRadius = borderRadius
		? `${ borderRadius.top }${ borderRadiusUnit } ${ borderRadius.right }${ borderRadiusUnit } ${ borderRadius.bottom }${ borderRadiusUnit } ${ borderRadius.left }${ borderRadiusUnit }`
		: '12px';

	const cardShadow = boxShadow
		? `${ shadowHorizontal }px ${ shadowVertical }px ${ shadowBlur }px ${ shadowSpread }px ${ shadowColor }`
		: 'none';

	const tokenCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tc-quote-bg: ${ quoteBg };`,
		`  --wbe-tc-quote-color: ${ quoteColor };`,
		`  --wbe-tc-name-color: ${ nameColor };`,
		`  --wbe-tc-role-color: ${ roleColor };`,
		`  --wbe-tc-accent: ${ accentColor };`,
		`  --wbe-tc-card-radius: ${ cardRadius };`,
		`  --wbe-tc-card-shadow: ${ cardShadow };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenCss }</style>

			<div
				className="swiper"
				data-autoplay={ String( autoplay ) }
				data-delay={ String( autoplayDelay ) }
				data-loop={ String( loop ) }
				data-slides={ String( slidesPerView ) }
				data-show-dots={ String( showDots ) }
				data-show-arrows={ String( showArrows ) }
			>
				<div className="swiper-wrapper">
					{ testimonials.map( ( item, index ) => (
						<div
							key={ index }
							className="swiper-slide"
						>
							<div className="wbe-testimonial-carousel__card">
								<blockquote className="wbe-testimonial-carousel__quote">
									<p>{ item.quote }</p>
								</blockquote>
								<div className="wbe-testimonial-carousel__author">
									{ item.avatar ? (
										<img
											src={ item.avatar }
											alt={ item.name }
											className="wbe-testimonial-carousel__avatar"
											width="48"
											height="48"
											loading="lazy"
										/>
									) : (
										<div
											className="wbe-testimonial-carousel__avatar-placeholder"
											aria-hidden="true"
										>
											{ ( item.name || 'A' ).charAt( 0 ).toUpperCase() }
										</div>
									) }
									<div className="wbe-testimonial-carousel__author-info">
										<strong className="wbe-testimonial-carousel__name">
											{ item.name }
										</strong>
										<span className="wbe-testimonial-carousel__role">
											{ item.role }
										</span>
									</div>
								</div>
							</div>
						</div>
					) ) }
				</div>

				{ showDots && (
					<div
						className="swiper-pagination"
						aria-label={ 'Testimonial navigation' }
					/>
				) }

				{ showArrows && (
					<>
						<button
							className="swiper-button-prev"
							aria-label={ 'Previous testimonial' }
						/>
						<button
							className="swiper-button-next"
							aria-label={ 'Next testimonial' }
						/>
					</>
				) }
			</div>
		</div>
	);
}
