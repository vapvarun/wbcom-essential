import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { tabs, accentColor, tabStyle } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wbe-tabs wbe-tabs--${ tabStyle }`,
		'data-accent': accentColor,
	} );

	return (
		<div { ...blockProps }>
			<div className="wbe-tabs__nav" role="tablist">
				{ tabs.map( ( tab, i ) => (
					<button
						key={ i }
						role="tab"
						className={ `wbe-tabs__tab${
							i === 0 ? ' is-active' : ''
						}` }
						aria-selected={ i === 0 ? 'true' : 'false' }
						data-tab={ i }
						style={
							i === 0
								? {
										borderColor: accentColor,
										color: accentColor,
								  }
								: {}
						}
					>
						{ tab.title }
					</button>
				) ) }
			</div>
			<div className="wbe-tabs__panels">
				{ tabs.map( ( tab, i ) => (
					<div
						key={ i }
						className="wbe-tabs__panel"
						role="tabpanel"
						data-panel={ i }
						style={ {
							display: i === 0 ? 'block' : 'none',
						} }
					>
						<p>{ tab.content }</p>
					</div>
				) ) }
			</div>
		</div>
	);
}
