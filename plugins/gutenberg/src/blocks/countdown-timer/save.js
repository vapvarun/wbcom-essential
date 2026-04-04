import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		targetDate,
		heading,
		expiredMessage,
		backgroundColor,
		textColor,
		accentColor,
		showLabels,
		size,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `wbe-countdown wbe-countdown--${ size }`,
		style: { backgroundColor, color: textColor },
		'data-target': targetDate,
		'data-expired-message': expiredMessage,
	} );

	return (
		<div { ...blockProps }>
			{ heading && (
				<h2 className="wbe-countdown__heading">{ heading }</h2>
			) }
			<div className="wbe-countdown__digits">
				{ [
					{ key: 'days', label: 'Days' },
					{ key: 'hours', label: 'Hours' },
					{ key: 'minutes', label: 'Minutes' },
					{ key: 'seconds', label: 'Seconds' },
				].map( ( { key, label } ) => (
					<div
						key={ key }
						className="wbe-countdown__unit"
						style={ { borderColor: accentColor } }
					>
						<span
							className="wbe-countdown__number"
							data-unit={ key }
						>
							00
						</span>
						{ showLabels && (
							<span className="wbe-countdown__label">
								{ label }
							</span>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
