import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
	ColorPicker,
	RangeControl,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { plans, columns } = attributes;

	const updatePlan = ( index, key, value ) => {
		const updated = [ ...plans ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { plans: updated } );
	};

	const addPlan = () => {
		setAttributes( {
			plans: [
				...plans,
				{
					name: 'New Plan',
					price: '$0',
					period: '/month',
					features: '',
					buttonText: 'Get Started',
					buttonUrl: '',
					featured: false,
					accentColor: '#6366f1',
				},
			],
		} );
	};

	const removePlan = ( index ) => {
		setAttributes( { plans: plans.filter( ( _, i ) => i !== index ) } );
	};

	const blockProps = useBlockProps( {
		className: 'wbe-pricing',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( val ) =>
							setAttributes( { columns: val } )
						}
						min={ 1 }
						max={ 4 }
					/>
				</PanelBody>
				{ plans.map( ( plan, i ) => (
					<PanelBody
						key={ i }
						title={ plan.name || `Plan ${ i + 1 }` }
						initialOpen={ i === 0 }
					>
						<TextControl
							label={ __( 'Plan Name', 'wbcom-essential' ) }
							value={ plan.name }
							onChange={ ( val ) =>
								updatePlan( i, 'name', val )
							}
						/>
						<TextControl
							label={ __( 'Price', 'wbcom-essential' ) }
							value={ plan.price }
							onChange={ ( val ) =>
								updatePlan( i, 'price', val )
							}
						/>
						<TextControl
							label={ __( 'Period', 'wbcom-essential' ) }
							value={ plan.period }
							onChange={ ( val ) =>
								updatePlan( i, 'period', val )
							}
						/>
						<TextareaControl
							label={ __(
								'Features (one per line)',
								'wbcom-essential'
							) }
							value={ plan.features }
							onChange={ ( val ) =>
								updatePlan( i, 'features', val )
							}
							rows={ 5 }
						/>
						<TextControl
							label={ __( 'Button Text', 'wbcom-essential' ) }
							value={ plan.buttonText }
							onChange={ ( val ) =>
								updatePlan( i, 'buttonText', val )
							}
						/>
						<TextControl
							label={ __( 'Button URL', 'wbcom-essential' ) }
							value={ plan.buttonUrl }
							onChange={ ( val ) =>
								updatePlan( i, 'buttonUrl', val )
							}
							type="url"
						/>
						<ToggleControl
							label={ __(
								'Featured / Highlighted',
								'wbcom-essential'
							) }
							checked={ plan.featured }
							onChange={ ( val ) =>
								updatePlan( i, 'featured', val )
							}
						/>
						<p className="components-base-control__label">
							{ __( 'Accent Color', 'wbcom-essential' ) }
						</p>
						<ColorPicker
							color={ plan.accentColor }
							onChangeComplete={ ( val ) =>
								updatePlan( i, 'accentColor', val.hex )
							}
							disableAlpha
						/>
						{ plans.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removePlan( i ) }
								style={ { marginTop: '8px' } }
							>
								{ __( 'Remove Plan', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addPlan }>
						{ __( 'Add Plan', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

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
									{ __( 'Most Popular', 'wbcom-essential' ) }
								</span>
							) }
							<h3 className="wbe-pricing__name">
								{ plan.name }
							</h3>
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
							<span
								className="wbe-btn wbe-btn--pricing"
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
							</span>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
