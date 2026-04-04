/**
 * Group Carousel Block - Editor Component
 *
 * Uses ServerSideRender for live preview since this is a dynamic block.
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	ColorPicker,
	BaseControl,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		totalGroups,
		sortType,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		autoplay,
		autoplayDelay,
		loop,
		showDots,
		showArrows,
		showDescription,
		showMemberCount,
		spaceBetween,
		cardBg,
		nameColor,
		avatarSize,
		padding,
		paddingTablet,
		paddingMobile,
		paddingUnit,
		margin,
		marginTablet,
		marginMobile,
		marginUnit,
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
		className: `wbe-block-${ uniqueId } wbe-group-carousel`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Total Groups', 'wbcom-essential' ) }
						value={ totalGroups }
						onChange={ ( value ) => setAttributes( { totalGroups: value } ) }
						min={ 1 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Sort By', 'wbcom-essential' ) }
						value={ sortType }
						options={ [
							{ label: __( 'Most Active', 'wbcom-essential' ), value: 'active' },
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
							{ label: __( 'Most Members', 'wbcom-essential' ), value: 'popular' },
							{ label: __( 'Alphabetical', 'wbcom-essential' ), value: 'alphabetical' },
							{ label: __( 'Random', 'wbcom-essential' ), value: 'random' },
						] }
						onChange={ ( value ) => setAttributes( { sortType: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Member Count', 'wbcom-essential' ) }
						checked={ showMemberCount }
						onChange={ ( value ) => setAttributes( { showMemberCount: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Description', 'wbcom-essential' ) }
						checked={ showDescription }
						onChange={ ( value ) => setAttributes( { showDescription: value } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Carousel Settings */ }
				<PanelBody title={ __( 'Carousel', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Slides Per View (Desktop)', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( value ) => setAttributes( { slidesPerView: value } ) }
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Slides Per View (Tablet)', 'wbcom-essential' ) }
						value={ slidesPerViewTablet }
						onChange={ ( value ) => setAttributes( { slidesPerViewTablet: value } ) }
						min={ 1 }
						max={ 4 }
					/>
					<RangeControl
						label={ __( 'Slides Per View (Mobile)', 'wbcom-essential' ) }
						value={ slidesPerViewMobile }
						onChange={ ( value ) => setAttributes( { slidesPerViewMobile: value } ) }
						min={ 1 }
						max={ 2 }
					/>
					<RangeControl
						label={ __( 'Space Between (px)', 'wbcom-essential' ) }
						value={ spaceBetween }
						onChange={ ( value ) => setAttributes( { spaceBetween: value } ) }
						min={ 0 }
						max={ 60 }
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
						__nextHasNoMarginBottom
					/>
					{ autoplay && (
						<RangeControl
							label={ __( 'Autoplay Delay (ms)', 'wbcom-essential' ) }
							value={ autoplayDelay }
							onChange={ ( value ) => setAttributes( { autoplayDelay: value } ) }
							min={ 500 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
					<ToggleControl
						label={ __( 'Loop', 'wbcom-essential' ) }
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Navigation Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( value ) => setAttributes( { showArrows: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Pagination Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( value ) => setAttributes( { showDots: value } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Avatar Size (px)', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 40 }
						max={ 160 }
					/>
					<BaseControl label={ __( 'Card Background', 'wbcom-essential' ) }>
						<ColorPicker
							color={ cardBg }
							onChange={ ( value ) => setAttributes( { cardBg: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Group Name Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ nameColor }
							onChange={ ( value ) => setAttributes( { nameColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( value ) => setAttributes( value ) }
					/>
				</PanelBody>

				{ /* Spacing */ }
				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( value ) => setAttributes( { padding: value } ) }
						onUnitChange={ ( value ) => setAttributes( { paddingUnit: value } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( value ) => setAttributes( { margin: value } ) }
						onUnitChange={ ( value ) => setAttributes( { marginUnit: value } ) }
					/>
				</PanelBody>

				{ /* Advanced */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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
				<ServerSideRender
					block="wbcom-essential/group-carousel"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-group-carousel__loading">
							<p>{ __( 'Loading groups…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-group-carousel__error">
							<p>{ __( 'Could not load groups preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
