import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { items, firstOpen, allowMultiple, accentColor, iconStyle } =
		attributes;

	const blockProps = useBlockProps.save( {
		className: 'wbe-faq',
		'data-first-open': firstOpen,
		'data-allow-multiple': allowMultiple,
		'data-icon': iconStyle,
	} );

	const iconOpen = iconStyle === 'chevron' ? '\u2039' : '\u2212';
	const iconClosed = iconStyle === 'chevron' ? '\u203A' : '+';

	return (
		<div { ...blockProps }>
			{ items.map( ( item, i ) => (
				<div
					key={ i }
					className={ `wbe-faq__item${
						firstOpen && i === 0 ? ' is-open' : ''
					}` }
				>
					<button
						className="wbe-faq__question"
						aria-expanded={ firstOpen && i === 0 ? 'true' : 'false' }
						style={ { color: accentColor } }
					>
						<span>{ item.question }</span>
						<span className="wbe-faq__icon">
							{ firstOpen && i === 0 ? iconOpen : iconClosed }
						</span>
					</button>
					<div
						className="wbe-faq__answer"
						style={ {
							display:
								firstOpen && i === 0 ? 'block' : 'none',
						} }
					>
						<p>{ item.answer }</p>
					</div>
				</div>
			) ) }
		</div>
	);
}
