import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { features, columns, cardStyle, iconSize, textAlign } = attributes;

	const blockProps = useBlockProps.save( {
		className: `wbe-features wbe-features--${ cardStyle }`,
	} );

	return (
		<div { ...blockProps }>
			<div
				className="wbe-features__grid"
				style={ {
					gridTemplateColumns: `repeat(${ columns }, 1fr)`,
					textAlign,
				} }
			>
				{ features.map( ( f, i ) => (
					<div key={ i } className="wbe-features__card">
						<span
							className="wbe-features__icon"
							style={ { fontSize: `${ iconSize }px` } }
							role="img"
							aria-hidden="true"
						>
							{ f.icon }
						</span>
						{ f.title && (
							<h3 className="wbe-features__title">
								{ f.title }
							</h3>
						) }
						{ f.description && (
							<p className="wbe-features__description">
								{ f.description }
							</p>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
