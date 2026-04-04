/**
 * Countdown Timer Block - Save Component
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		targetDate,
		expireMessage,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		separatorStyle,
		layout,
		numberColor,
		labelColor,
		boxBg,
		boxBorderColor,
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
		className: `wbe-block-${ uniqueId } wbe-countdown-timer wbe-countdown-timer--${ layout }${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
		'data-target-date': targetDate,
		'data-expire-message': expireMessage,
		'data-show-days': showDays ? 'true' : 'false',
		'data-show-hours': showHours ? 'true' : 'false',
		'data-show-minutes': showMinutes ? 'true' : 'false',
		'data-show-seconds': showSeconds ? 'true' : 'false',
		'data-separator': separatorStyle,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-cd-number-color: ${ numberColor };`,
		`  --wbe-cd-label-color: ${ labelColor };`,
		`  --wbe-cd-box-bg: ${ boxBg };`,
		`  --wbe-cd-box-border: ${ boxBorderColor };`,
		`}`,
	].join( '\n' );

	const getSepChar = () => {
		switch ( separatorStyle ) {
			case 'dot':
				return '\u00B7'; // ·
			case 'none':
				return '';
			case 'colon':
			default:
				return ':';
		}
	};

	const visibleUnits = [
		{ key: 'days', show: showDays, label: 'Days' },
		{ key: 'hours', show: showHours, label: 'Hours' },
		{ key: 'minutes', show: showMinutes, label: 'Mins' },
		{ key: 'seconds', show: showSeconds, label: 'Secs' },
	].filter( ( u ) => u.show );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			{ /* Expire message - hidden until countdown reaches 0 */ }
			<div
				className="wbe-countdown-timer__expire"
				aria-live="polite"
				hidden
			>
				{ expireMessage }
			</div>

			{ /* Unit boxes - view.js populates the number spans */ }
			<div className="wbe-countdown-timer__units">
				{ visibleUnits.map( ( unit, idx ) => (
					<>
						<div
							key={ unit.key }
							className={ `wbe-countdown-timer__unit wbe-countdown-timer__unit--${ unit.key }` }
						>
							<span
								className="wbe-countdown-timer__number"
								aria-label={ unit.label }
							>
								00
							</span>
							<span className="wbe-countdown-timer__label">
								{ unit.label }
							</span>
						</div>
						{ idx < visibleUnits.length - 1 && separatorStyle !== 'none' && (
							<span
								className="wbe-countdown-timer__sep"
								aria-hidden="true"
							>
								{ getSepChar() }
							</span>
						) }
					</>
				) ) }
			</div>
		</div>
	);
}
