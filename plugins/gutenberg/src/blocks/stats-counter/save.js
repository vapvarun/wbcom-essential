import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { stats, columns, duration, textColor, accentColor } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wbe-stats',
		style: { color: textColor },
		'data-duration': duration,
	} );

	return (
		<div { ...blockProps }>
			<div
				className="wbe-stats__grid"
				style={ {
					gridTemplateColumns: `repeat(${ columns }, 1fr)`,
				} }
			>
				{ stats.map( ( stat, i ) => (
					<div key={ i } className="wbe-stats__item">
						<span
							className="wbe-stats__number"
							style={ { color: accentColor } }
							data-target={ stat.number }
							data-prefix={ stat.prefix }
							data-suffix={ stat.suffix }
						>
							{ stat.prefix }0{ stat.suffix }
						</span>
						<span className="wbe-stats__label">
							{ stat.label }
						</span>
					</div>
				) ) }
			</div>
		</div>
	);
}
