import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { members, visibleCards, autoplay, autoplaySpeed } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wbe-team',
		'data-visible': visibleCards,
		'data-autoplay': autoplay,
		'data-speed': autoplaySpeed,
	} );

	return (
		<div { ...blockProps }>
			<div className="wbe-team__track">
				{ members.map( ( m, i ) => (
					<div key={ i } className="wbe-team__card">
						{ m.photo ? (
							<img
								className="wbe-team__photo"
								src={ m.photo }
								alt={ m.name }
							/>
						) : (
							<div
								className="wbe-team__photo-placeholder"
								aria-hidden="true"
							/>
						) }
						<h3 className="wbe-team__name">{ m.name }</h3>
						{ m.role && (
							<span className="wbe-team__role">{ m.role }</span>
						) }
						{ m.bio && (
							<p className="wbe-team__bio">{ m.bio }</p>
						) }
					</div>
				) ) }
			</div>
			<div className="wbe-team__nav">
				<button
					className="wbe-team__arrow wbe-team__arrow--prev"
					aria-label="Previous"
				>
					&#8249;
				</button>
				<button
					className="wbe-team__arrow wbe-team__arrow--next"
					aria-label="Next"
				>
					&#8250;
				</button>
			</div>
		</div>
	);
}
