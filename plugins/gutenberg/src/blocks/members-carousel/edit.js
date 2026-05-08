/**
 * Members Carousel Block - Editor Component
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
		totalMembers,
		sortType,
		slidesPerView,
		slidesPerViewTablet,
		slidesPerViewMobile,
		autoplay,
		autoplayDelay,
		loop,
		showDots,
		showArrows,
		showLastActive,
		showFriendButton,
		spaceBetween,
		cardBg,
		nameColor,
		metaColor,
		avatarSize,
		cardBorderRadius,
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
		className: `wbe-block-${ uniqueId } wbe-members-carousel`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Total Members', 'wbcom-essential' ) }
						value={ totalMembers }
						onChange={ ( value ) => setAttributes( { totalMembers: value } ) }
						min={ 1 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Sort By', 'wbcom-essential' ) }
						value={ sortType }
						options={ [
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
							{ label: __( 'Most Active', 'wbcom-essential' ), value: 'active' },
							{ label: __( 'Most Popular', 'wbcom-essential' ), value: 'popular' },
							{ label: __( 'Alphabetical', 'wbcom-essential' ), value: 'alphabetical' },
						] }
						onChange={ ( value ) => setAttributes( { sortType: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Last Active', 'wbcom-essential' ) }
						checked={ showLastActive }
						onChange={ ( value ) => setAttributes( { showLastActive: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Friend Button', 'wbcom-essential' ) }
						checked={ showFriendButton }
						onChange={ ( value ) => setAttributes( { showFriendButton: value } ) }
					/>
				</PanelBody>

				{ /* Carousel Settings */ }
				<PanelBody title={ __( 'Carousel', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Slides Per View (Desktop)', 'wbcom-essential' ) }
						value={ slidesPerView }
						onChange={ ( value ) => setAttributes( { slidesPerView: value } ) }
						min={ 1 }
						max={ 8 }
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
					/>
					<ToggleControl
						label={ __( 'Show Navigation Arrows', 'wbcom-essential' ) }
						checked={ showArrows }
						onChange={ ( value ) => setAttributes( { showArrows: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Pagination Dots', 'wbcom-essential' ) }
						checked={ showDots }
						onChange={ ( value ) => setAttributes( { showDots: value } ) }
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Avatar Size (px)', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 40 }
						max={ 200 }
					/>
					<RangeControl
						label={ __( 'Card Border Radius (px)', 'wbcom-essential' ) }
						value={ cardBorderRadius }
						onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<BaseControl label={ __( 'Card Background', 'wbcom-essential' ) }>
						<ColorPicker
							color={ cardBg }
							onChange={ ( value ) => setAttributes( { cardBg: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Name Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ nameColor }
							onChange={ ( value ) => setAttributes( { nameColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Meta Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ metaColor }
							onChange={ ( value ) => setAttributes( { metaColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
				</PanelBody>

				{ /* Advanced */ }
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
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
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
						onUnitChange={ ( value ) => setAttributes( { borderRadiusUnit: value } ) }
					/>
					<Spacer marginTop={ 3 } />
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
					block="wbcom-essential/members-carousel"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
