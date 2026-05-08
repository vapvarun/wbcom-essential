/**
 * Progress Bar Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		bars,
		height,
		showPercentage,
		showLabel,
		animateOnScroll,
		trackColor,
		labelColor,
		percentColor,
		barBorderRadius,
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
		className: `wbe-block-${ uniqueId } wbe-progress-bar${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
		'data-animate': animateOnScroll ? 'true' : 'false',
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-pb-track-color: ${ trackColor };`,
		`  --wbe-pb-label-color: ${ labelColor };`,
		`  --wbe-pb-percent-color: ${ percentColor };`,
		`  --wbe-pb-height: ${ height }px;`,
		`  --wbe-pb-radius: ${ barBorderRadius }px;`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			<div className="wbe-progress-bar__list">
				{ bars.map( ( bar, index ) => (
					<div key={ index } className="wbe-progress-bar__item">
						{ ( showLabel || showPercentage ) && (
							<div className="wbe-progress-bar__meta">
								{ showLabel && (
									<span className="wbe-progress-bar__label">
										{ bar.label }
									</span>
								) }
								{ showPercentage && (
									<span className="wbe-progress-bar__percent">
										{ bar.percentage }%
									</span>
								) }
							</div>
						) }
						<div
							className="wbe-progress-bar__track"
							role="progressbar"
							aria-valuenow={ bar.percentage }
							aria-valuemin={ 0 }
							aria-valuemax={ 100 }
							aria-label={ bar.label }
						>
							<div
								className="wbe-progress-bar__fill"
								data-percentage={ bar.percentage }
								style={ {
									width: '0',
									background: bar.color,
								} }
							/>
						</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
