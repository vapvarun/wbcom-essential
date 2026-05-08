/**
 * Pricing Cards Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	TextControl,
	ToggleControl,
	Button,
	ColorPalette,
	BaseControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../../src/shared/components';
import { useUniqueId } from '../../../src/shared/hooks';
import { generateBlockCSS } from '../../../src/shared/utils/css';
import '../../../assets/shared/design-tokens.css';
import '../../../assets/shared/base.css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		columns,
		plans,
		currency,
		cardBg,
		featuredBg,
		featuredColor,
		priceColor,
		featureColor,
		buttonBg,
		buttonColor,
		padding,
		paddingUnit,
		paddingTablet,
		paddingMobile,
		margin,
		marginUnit,
		marginTablet,
		marginMobile,
		boxShadow,
		shadowHorizontal,
		shadowVertical,
		shadowBlur,
		shadowSpread,
		shadowColor,
		borderRadius,
		borderRadiusUnit,
		hideOnDesktop,
		hideOnTablet,
		hideOnMobile,
	} = attributes;

	useUniqueId( clientId, uniqueId, setAttributes );

	const blockCSS = generateBlockCSS( uniqueId, attributes );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-pricing-cards`,
	} );

	/** Update a single plan by index */
	const updatePlan = ( index, key, value ) => {
		const updated = plans.map( ( plan, i ) =>
			i === index ? { ...plan, [ key ]: value } : plan
		);
		setAttributes( { plans: updated } );
	};

	/** Update a feature string within a plan */
	const updateFeature = ( planIndex, featIndex, value ) => {
		const updatedPlans = plans.map( ( plan, i ) => {
			if ( i !== planIndex ) return plan;
			const updatedFeatures = plan.features.map( ( f, j ) =>
				j === featIndex ? value : f
			);
			return { ...plan, features: updatedFeatures };
		} );
		setAttributes( { plans: updatedPlans } );
	};

	const addFeature = ( planIndex ) => {
		const updatedPlans = plans.map( ( plan, i ) => {
			if ( i !== planIndex ) return plan;
			return { ...plan, features: [ ...plan.features, 'New feature' ] };
		} );
		setAttributes( { plans: updatedPlans } );
	};

	const removeFeature = ( planIndex, featIndex ) => {
		const updatedPlans = plans.map( ( plan, i ) => {
			if ( i !== planIndex ) return plan;
			return { ...plan, features: plan.features.filter( ( _, j ) => j !== featIndex ) };
		} );
		setAttributes( { plans: updatedPlans } );
	};

	const addPlan = () => {
		if ( plans.length >= 4 ) return;
		setAttributes( {
			plans: [
				...plans,
				{
					name: `Plan ${ plans.length + 1 }`,
					price: '0',
					period: '/mo',
					features: [ 'Feature 1' ],
					buttonText: 'Get Started',
					buttonUrl: '#',
					featured: false,
				},
			],
			columns: plans.length + 1,
		} );
	};

	const removePlan = ( index ) => {
		if ( plans.length <= 1 ) return;
		const updated = plans.filter( ( _, i ) => i !== index );
		setAttributes( { plans: updated, columns: updated.length } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Currency Symbol', 'wbcom-essential' ) }
						value={ currency }
						onChange={ ( value ) => setAttributes( { currency: value } ) }
					/>
					{ plans.map( ( plan, planIndex ) => (
						<PanelBody
							key={ planIndex }
							title={ plan.name || `${ __( 'Plan', 'wbcom-essential' ) } ${ planIndex + 1 }` }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'Plan Name', 'wbcom-essential' ) }
								value={ plan.name }
								onChange={ ( value ) => updatePlan( planIndex, 'name', value ) }
							/>
							<TextControl
								label={ __( 'Price', 'wbcom-essential' ) }
								value={ plan.price }
								onChange={ ( value ) => updatePlan( planIndex, 'price', value ) }
							/>
							<TextControl
								label={ __( 'Period (e.g. /mo)', 'wbcom-essential' ) }
								value={ plan.period }
								onChange={ ( value ) => updatePlan( planIndex, 'period', value ) }
							/>
							<TextControl
								label={ __( 'Button Text', 'wbcom-essential' ) }
								value={ plan.buttonText }
								onChange={ ( value ) => updatePlan( planIndex, 'buttonText', value ) }
							/>
							<TextControl
								label={ __( 'Button URL', 'wbcom-essential' ) }
								value={ plan.buttonUrl }
								onChange={ ( value ) => updatePlan( planIndex, 'buttonUrl', value ) }
								placeholder="https://"
							/>
							<ToggleControl
								label={ __( 'Featured Plan', 'wbcom-essential' ) }
								checked={ plan.featured }
								onChange={ ( value ) => updatePlan( planIndex, 'featured', value ) }
							/>
							<BaseControl label={ __( 'Features', 'wbcom-essential' ) }>
								{ plan.features.map( ( feat, featIndex ) => (
									<div
										key={ featIndex }
										style={ { display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' } }
									>
										<TextControl
											value={ feat }
											onChange={ ( value ) => updateFeature( planIndex, featIndex, value ) }
											style={ { flex: 1, margin: 0 } }
											__nextHasNoMarginBottom
										/>
										<Button
											isDestructive
											variant="tertiary"
											size="small"
											onClick={ () => removeFeature( planIndex, featIndex ) }
											label={ __( 'Remove feature', 'wbcom-essential' ) }
										>
											&times;
										</Button>
									</div>
								) ) }
								<Button
									variant="secondary"
									size="small"
									onClick={ () => addFeature( planIndex ) }
									style={ { marginTop: 4 } }
								>
									{ __( '+ Add Feature', 'wbcom-essential' ) }
								</Button>
							</BaseControl>
							{ plans.length > 1 && (
								<Button
									isDestructive
									variant="link"
									onClick={ () => removePlan( planIndex ) }
									style={ { marginTop: 8 } }
								>
									{ __( 'Remove this plan', 'wbcom-essential' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					{ plans.length < 4 && (
						<Button variant="primary" onClick={ addPlan } style={ { marginTop: 8, width: '100%', justifyContent: 'center' } }>
							{ __( '+ Add Plan', 'wbcom-essential' ) }
						</Button>
					) }
				</PanelBody>

				{ /* Layout Panel */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 4 }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Card Background', 'wbcom-essential' ) }>
						<ColorPalette value={ cardBg } onChange={ ( v ) => setAttributes( { cardBg: v || '#ffffff' } ) } clearable={ false } />
					</BaseControl>
					<BaseControl label={ __( 'Featured Card Background', 'wbcom-essential' ) }>
						<ColorPalette value={ featuredBg } onChange={ ( v ) => setAttributes( { featuredBg: v || '#667eea' } ) } clearable={ false } />
					</BaseControl>
					<BaseControl label={ __( 'Featured Card Text Color', 'wbcom-essential' ) }>
						<ColorPalette value={ featuredColor } onChange={ ( v ) => setAttributes( { featuredColor: v || '#ffffff' } ) } clearable={ false } />
					</BaseControl>
					<Divider />
					<BaseControl label={ __( 'Price Color', 'wbcom-essential' ) }>
						<ColorPalette value={ priceColor } onChange={ ( v ) => setAttributes( { priceColor: v || '#1e1e2e' } ) } clearable={ false } />
					</BaseControl>
					<BaseControl label={ __( 'Feature Text Color', 'wbcom-essential' ) }>
						<ColorPalette value={ featureColor } onChange={ ( v ) => setAttributes( { featureColor: v || '#6c757d' } ) } clearable={ false } />
					</BaseControl>
					<Divider />
					<BaseControl label={ __( 'Button Background', 'wbcom-essential' ) }>
						<ColorPalette value={ buttonBg } onChange={ ( v ) => setAttributes( { buttonBg: v || '#667eea' } ) } clearable={ false } />
					</BaseControl>
					<BaseControl label={ __( 'Button Text Color', 'wbcom-essential' ) }>
						<ColorPalette value={ buttonColor } onChange={ ( v ) => setAttributes( { buttonColor: v || '#ffffff' } ) } clearable={ false } />
					</BaseControl>
				</PanelBody>

				{ /* Advanced Panel */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( value ) => setAttributes( { margin: value } ) }
						onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
					<Divider />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onToggle={ ( value ) => setAttributes( { boxShadow: value } ) }
						onChangeHorizontal={ ( value ) => setAttributes( { shadowHorizontal: value } ) }
						onChangeVertical={ ( value ) => setAttributes( { shadowVertical: value } ) }
						onChangeBlur={ ( value ) => setAttributes( { shadowBlur: value } ) }
						onChangeSpread={ ( value ) => setAttributes( { shadowSpread: value } ) }
						onChangeColor={ ( value ) => setAttributes( { shadowColor: value } ) }
					/>
					<Divider />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
					/>
					<Divider />
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( value ) => setAttributes( value ) }
					/>
				</PanelBody>
			</InspectorControls>

			{ blockCSS && <style>{ blockCSS }</style> }

			<div { ...blockProps }>
				<div
					className="wbe-pricing-cards__grid"
					style={ { '--wbe-pricing-cols': columns } }
				>
					{ plans.map( ( plan, index ) => (
						<div
							key={ index }
							className={ `wbe-pricing-cards__card${ plan.featured ? ' wbe-pricing-cards__card--featured' : '' }` }
							style={ {
								backgroundColor: plan.featured ? featuredBg : cardBg,
								color: plan.featured ? featuredColor : 'inherit',
							} }
						>
							{ plan.featured && (
								<div className="wbe-pricing-cards__badge">
									{ __( 'Most Popular', 'wbcom-essential' ) }
								</div>
							) }
							<div className="wbe-pricing-cards__header">
								<div className="wbe-pricing-cards__name">{ plan.name }</div>
								<div
									className="wbe-pricing-cards__price"
									style={ { color: plan.featured ? featuredColor : priceColor } }
								>
									<span className="wbe-pricing-cards__currency">{ currency }</span>
									<span className="wbe-pricing-cards__amount">{ plan.price }</span>
									<span className="wbe-pricing-cards__period">{ plan.period }</span>
								</div>
							</div>
							<ul className="wbe-pricing-cards__features">
								{ plan.features.map( ( feat, fi ) => (
									<li
										key={ fi }
										className="wbe-pricing-cards__feature"
										style={ { color: plan.featured ? featuredColor : featureColor } }
									>
										<span className="wbe-pricing-cards__feature-check" aria-hidden="true">&#10003;</span>
										{ feat }
									</li>
								) ) }
							</ul>
							<div className="wbe-pricing-cards__footer">
								<a
									className="wbe-pricing-cards__btn"
									href={ plan.buttonUrl }
									style={ {
										backgroundColor: plan.featured ? '#ffffff' : buttonBg,
										color: plan.featured ? featuredBg : buttonColor,
									} }
								>
									{ plan.buttonText }
								</a>
							</div>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
