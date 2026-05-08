/**
 * Tabs Block - Save Component
 * Implements WAI-ARIA Tabs Pattern.
 *
 * @package wbcom-essential
 */

import { useBlockProps } from '@wordpress/block-editor';
import { generateBlockCSS } from '../../shared/utils/css';

export default function save( { attributes } ) {
	const {
		uniqueId,
		tabs,
		tabStyle,
		tabAlign,
		activeColor,
		inactiveColor,
		contentBg,
		borderColor,
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
		className: `wbe-block-${ uniqueId } wbe-tabs wbe-tabs--${ tabStyle } wbe-tabs--align-${ tabAlign }${ visibilityClasses ? ' ' + visibilityClasses : '' }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tabs-active-color: ${ activeColor };`,
		`  --wbe-tabs-inactive-color: ${ inactiveColor };`,
		`  --wbe-tabs-content-bg: ${ contentBg };`,
		`  --wbe-tabs-border-color: ${ borderColor };`,
		`}`,
	].join( '\n' );

	return (
		<div { ...blockProps }>
			{ css && <style>{ css }</style> }
			<style>{ tokenPropsCss }</style>

			{ /* Tab list - WAI-ARIA tablist pattern */ }
			<div
				className="wbe-tabs__nav"
				role="tablist"
			>
				{ tabs.map( ( tab, index ) => {
					const tabId = `wbe-tab-${ uniqueId }-${ index }`;
					const panelId = `wbe-panel-${ uniqueId }-${ index }`;
					const isFirst = index === 0;

					return (
						<button
							key={ index }
							id={ tabId }
							role="tab"
							type="button"
							className={ `wbe-tabs__tab components-button${ isFirst ? ' is-active' : '' }` }
							aria-selected={ isFirst ? 'true' : 'false' }
							aria-controls={ panelId }
							tabIndex={ isFirst ? '0' : '-1' }
						>
							{ tab.title }
						</button>
					);
				} ) }
			</div>

			{ /* Tab panels */ }
			<div className="wbe-tabs__panels">
				{ tabs.map( ( tab, index ) => {
					const tabId = `wbe-tab-${ uniqueId }-${ index }`;
					const panelId = `wbe-panel-${ uniqueId }-${ index }`;
					const isFirst = index === 0;

					return (
						<div
							key={ index }
							id={ panelId }
							role="tabpanel"
							aria-labelledby={ tabId }
							className={ `wbe-tabs__panel${ isFirst ? ' is-active' : '' }` }
							hidden={ ! isFirst }
							tabIndex={ 0 }
						>
							<p>{ tab.content }</p>
						</div>
					);
				} ) }
			</div>
		</div>
	);
}
