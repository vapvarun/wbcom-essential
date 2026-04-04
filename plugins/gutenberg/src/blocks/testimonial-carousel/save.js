import { useBlockProps } from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const {
		testimonials,
		autoplay,
		autoplaySpeed,
		showDots,
		showArrows,
		backgroundColor,
		textColor,
		accentColor,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: 'wbe-testimonials',
		style: { backgroundColor, color: textColor },
		'data-autoplay': autoplay,
		'data-speed': autoplaySpeed,
		'data-dots': showDots,
		'data-arrows': showArrows,
		'data-accent': accentColor,
	} );

	return (
		<div { ...blockProps }>
			<div className="wbe-testimonials__track">
				{ testimonials.map( ( t, i ) => (
					<div
						key={ i }
						className="wbe-testimonials__slide"
						style={ { display: i === 0 ? 'block' : 'none' } }
					>
						<blockquote className="wbe-testimonials__quote">
							{ t.quote }
						</blockquote>
						<div className="wbe-testimonials__author">
							{ t.avatar && (
								<img
									className="wbe-testimonials__avatar"
									src={ t.avatar }
									alt={ t.name }
								/>
							) }
							<div>
								<strong className="wbe-testimonials__name">
									{ t.name }
								</strong>
								{ t.role && (
									<span className="wbe-testimonials__role">
										{ t.role }
									</span>
								) }
							</div>
						</div>
					</div>
				) ) }
			</div>
			{ showArrows && (
				<div className="wbe-testimonials__arrows">
					<button
						className="wbe-testimonials__arrow wbe-testimonials__arrow--prev"
						aria-label="Previous testimonial"
					>
						&#8249;
					</button>
					<button
						className="wbe-testimonials__arrow wbe-testimonials__arrow--next"
						aria-label="Next testimonial"
					>
						&#8250;
					</button>
				</div>
			) }
			{ showDots && (
				<div className="wbe-testimonials__dots">
					{ testimonials.map( ( _, i ) => (
						<button
							key={ i }
							className={ `wbe-testimonials__dot${
								i === 0 ? ' is-active' : ''
							}` }
							aria-label={ `Go to testimonial ${ i + 1 }` }
						/>
					) ) }
				</div>
			) }
		</div>
	);
}
