/**
 * Product Filter Block (v2)
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	TextControl,
	Button,
	__experimentalDivider as Divider,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

import './style.scss';
import './editor.scss';

registerBlockType( 'wbcom-essential/product-filter', {
	edit( { attributes, setAttributes, clientId } ) {
		const {
			uniqueId,
			filters,
			sticky,
			stopAtCover,
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
			className: `wbe-block-${ uniqueId } wbcom-product-filter-editor`,
		} );

		const updateFilter = ( index, key, value ) => {
			const updated = [ ...filters ];
			updated[ index ] = { ...updated[ index ], [ key ]: value };
			setAttributes( { filters: updated } );
		};

		const addFilter = () => {
			setAttributes( {
				filters: [
					...filters,
					{ label: 'New Filter', target: 'new-section' },
				],
			} );
		};

		const removeFilter = ( index ) => {
			setAttributes( {
				filters: filters.filter( ( _, i ) => i !== index ),
			} );
		};

		const moveFilter = ( index, direction ) => {
			const updated = [ ...filters ];
			const newIndex = index + direction;
			if ( newIndex < 0 || newIndex >= updated.length ) {
				return;
			}
			[ updated[ index ], updated[ newIndex ] ] = [
				updated[ newIndex ],
				updated[ index ],
			];
			setAttributes( { filters: updated } );
		};

		return (
			<>
				<InspectorControls>
					<PanelBody title={ __( 'Behavior', 'wbcom-essential' ) }>
						<ToggleControl
							label={ __( 'Sticky on scroll', 'wbcom-essential' ) }
							help={ __( 'Keep the filter bar visible while scrolling.', 'wbcom-essential' ) }
							checked={ sticky }
							onChange={ ( val ) => setAttributes( { sticky: val } ) }
						/>
						<ToggleControl
							label={ __( 'Stop at bottom CTA', 'wbcom-essential' ) }
							help={ __( 'Stop filtering at the next full-width cover block (bottom CTA).', 'wbcom-essential' ) }
							checked={ stopAtCover }
							onChange={ ( val ) => setAttributes( { stopAtCover: val } ) }
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Filter Items', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						{ filters.map( ( filter, i ) => (
							<div key={ i } className="wbcom-filter-item-panel">
								<div className="wbcom-filter-item-header">
									<strong>{ filter.label }</strong>
									<span className="wbcom-filter-item-actions">
										{ i > 0 && (
											<Button
												size="small"
												icon="arrow-up-alt2"
												label={ __( 'Move up' ) }
												onClick={ () => moveFilter( i, -1 ) }
											/>
										) }
										{ i < filters.length - 1 && (
											<Button
												size="small"
												icon="arrow-down-alt2"
												label={ __( 'Move down' ) }
												onClick={ () => moveFilter( i, 1 ) }
											/>
										) }
									</span>
								</div>
								<TextControl
									label={ __( 'Label', 'wbcom-essential' ) }
									value={ filter.label }
									onChange={ ( val ) => updateFilter( i, 'label', val ) }
								/>
								<TextControl
									label={ __( 'Target anchor', 'wbcom-essential' ) }
									value={ filter.target }
									onChange={ ( val ) => updateFilter( i, 'target', val ) }
									help={
										filter.target === 'all'
											? __( '"all" shows every section.', 'wbcom-essential' )
											: __( "Must match the section's anchor ID.", 'wbcom-essential' )
									}
								/>
								{ i > 0 && (
									<Button
										isDestructive
										size="small"
										onClick={ () => removeFilter( i ) }
									>
										{ __( 'Remove', 'wbcom-essential' ) }
									</Button>
								) }
							</div>
						) ) }
						<Button
							variant="primary"
							size="small"
							onClick={ addFilter }
							style={ { marginTop: '8px' } }
						>
							{ __( 'Add Filter', 'wbcom-essential' ) }
						</Button>
					</PanelBody>

					<PanelBody
						title={ __( 'Advanced', 'wbcom-essential' ) }
						initialOpen={ false }
					>
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

				<div { ...blockProps }>
					{ blockCSS && <style>{ blockCSS }</style> }
					<div className="wbcom-filter-wrap">
						{ filters.map( ( filter, i ) => (
							<span
								key={ i }
								className={ `wbcom-filter-btn${ i === 0 ? ' active' : '' }` }
							>
								{ filter.label }
							</span>
						) ) }
					</div>
				</div>
			</>
		);
	},

	save: () => null, // Server-side rendered via render.php.
} );
