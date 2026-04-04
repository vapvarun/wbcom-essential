import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { plans, columns } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wbe-pricing',
	} );

	return (
		<div { ...blockProps }>
			<div
				className="wbe-pricing__grid"
				style={ {
					gridTemplateColumns: `repeat(${ columns }, 1fr)`,
				} }
			>
				{ plans.map( ( plan, i ) => (
					<div
						key={ i }
						className={ `wbe-pricing__card${
							plan.featured
								? ' wbe-pricing__card--featured'
								: ''
						}` }
						style={ {
							borderTopColor: plan.accentColor,
						} }
					>
						{ plan.featured && (
							<span className="wbe-pricing__badge">
								Most Popular
							</span>
						) }
						<h3 className="wbe-pricing__name">{ plan.name }</h3>
						<div className="wbe-pricing__price">
							<span className="wbe-pricing__amount">
								{ plan.price }
							</span>
							<span className="wbe-pricing__period">
								{ plan.period }
							</span>
						</div>
						<ul className="wbe-pricing__features">
							{ plan.features
								.split( '\n' )
								.filter( Boolean )
								.map( ( f, fi ) => (
									<li key={ fi }>{ f }</li>
								) ) }
						</ul>
						{ plan.buttonText && (
							<a
								className="wbe-btn wbe-btn--pricing"
								href={ plan.buttonUrl || '#' }
								rel="noopener"
								style={ {
									backgroundColor: plan.featured
										? plan.accentColor
										: 'transparent',
									color: plan.featured
										? '#fff'
										: plan.accentColor,
									borderColor: plan.accentColor,
								} }
							>
								{ plan.buttonText }
							</a>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
