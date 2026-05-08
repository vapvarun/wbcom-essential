/**
 * Feature Grid Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
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
		cardStyle,
		features,
		cardBg,
		titleColor,
		descriptionColor,
		iconSize,
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
		className: `wbe-block-${ uniqueId } wbe-feature-grid`,
	} );

	/** Update a single feature field */
	const updateFeature = ( index, key, value ) => {
		const updated = features.map( ( feat, i ) =>
			i === index ? { ...feat, [ key ]: value } : feat
		);
		setAttributes( { features: updated } );
	};

	const addFeature = () => {
		setAttributes( {
			features: [
				...features,
				{ icon: '✨', title: 'New Feature', description: 'Describe your feature here.' },
			],
		} );
	};

	const removeFeature = ( index ) => {
		if ( features.length <= 1 ) return;
		setAttributes( { features: features.filter( ( _, i ) => i !== index ) } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					{ features.map( ( feat, index ) => (
						<PanelBody
							key={ index }
							title={ feat.title || `${ __( 'Feature', 'wbcom-essential' ) } ${ index + 1 }` }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'Icon / Emoji', 'wbcom-essential' ) }
								value={ feat.icon }
								onChange={ ( value ) => updateFeature( index, 'icon', value ) }
							/>
							<TextControl
								label={ __( 'Title', 'wbcom-essential' ) }
								value={ feat.title }
								onChange={ ( value ) => updateFeature( index, 'title', value ) }
							/>
							<TextControl
								label={ __( 'Description', 'wbcom-essential' ) }
								value={ feat.description }
								onChange={ ( value ) => updateFeature( index, 'description', value ) }
							/>
							{ features.length > 1 && (
								<Button
									isDestructive
									variant="link"
									onClick={ () => removeFeature( index ) }
									style={ { marginTop: 4 } }
								>
									{ __( 'Remove feature', 'wbcom-essential' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button
						variant="primary"
						onClick={ addFeature }
						style={ { marginTop: 8, width: '100%', justifyContent: 'center' } }
					>
						{ __( '+ Add Feature', 'wbcom-essential' ) }
					</Button>
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
					<SelectControl
						label={ __( 'Card Style', 'wbcom-essential' ) }
						value={ cardStyle }
						options={ [
							{ value: 'elevated', label: __( 'Elevated (Shadow)', 'wbcom-essential' ) },
							{ value: 'bordered', label: __( 'Bordered', 'wbcom-essential' ) },
							{ value: 'flat', label: __( 'Flat', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { cardStyle: value } ) }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Icon Size (px)', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( value ) => setAttributes( { iconSize: value } ) }
						min={ 24 }
						max={ 96 }
					/>
					<BaseControl label={ __( 'Card Background', 'wbcom-essential' ) }>
						<ColorPalette
							value={ cardBg }
							onChange={ ( value ) => setAttributes( { cardBg: value || '#ffffff' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Title Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ titleColor }
							onChange={ ( value ) => setAttributes( { titleColor: value || '#1e1e2e' } ) }
							clearable={ false }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Description Color', 'wbcom-essential' ) }>
						<ColorPalette
							value={ descriptionColor }
							onChange={ ( value ) => setAttributes( { descriptionColor: value || '#6c757d' } ) }
							clearable={ false }
						/>
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
					className={ `wbe-feature-grid__grid wbe-feature-grid__grid--style-${ cardStyle }` }
					style={ { '--wbe-feature-cols': columns } }
				>
					{ features.map( ( feat, index ) => (
						<div
							key={ index }
							className={ `wbe-feature-grid__card wbe-feature-grid__card--${ cardStyle }` }
							style={ { backgroundColor: cardBg } }
						>
							<div
								className="wbe-feature-grid__icon"
								style={ { fontSize: iconSize } }
								aria-hidden="true"
							>
								{ feat.icon }
							</div>
							<RichText
								tagName="h3"
								className="wbe-feature-grid__title"
								value={ feat.title }
								onChange={ ( value ) => updateFeature( index, 'title', value ) }
								placeholder={ __( 'Feature title', 'wbcom-essential' ) }
								style={ { color: titleColor } }
							/>
							<RichText
								tagName="p"
								className="wbe-feature-grid__description"
								value={ feat.description }
								onChange={ ( value ) => updateFeature( index, 'description', value ) }
								placeholder={ __( 'Feature description', 'wbcom-essential' ) }
								style={ { color: descriptionColor } }
							/>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
