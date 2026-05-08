/**
 * Stats Counter Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		columns,
		stats,
		duration,
		numberColor,
		labelColor,
		separatorColor,
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
		className: `wbe-block-${ uniqueId } wbe-stats-counter${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-sc-number-color: ${ numberColor };`,
		`  --wbe-sc-label-color: ${ labelColor };`,
		`  --wbe-sc-sep-color: ${ separatorColor };`,
		`  --wbe-sc-columns: ${ columns };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			<div className="wbe-stats-counter__grid">
				{ stats.map( ( stat, index ) => (
					<div
						key={ index }
						className="wbe-stats-counter__item"
						data-target={ stat.number }
						data-duration={ duration }
					>
						<div className="wbe-stats-counter__number-wrap">
							{ stat.prefix && (
								<span className="wbe-stats-counter__prefix">{ stat.prefix }</span>
							) }
							<span
								className="wbe-stats-counter__number"
								aria-label={ String( stat.number ) }
							>
								0
							</span>
							{ stat.suffix && (
								<span className="wbe-stats-counter__suffix">{ stat.suffix }</span>
							) }
						</div>
						<div className="wbe-stats-counter__label">{ stat.label }</div>
					</div>
				) ) }
			</div>
		</div>
	);
}
