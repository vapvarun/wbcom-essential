/**
 * Activity Feed Block - Editor Component
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
		totalActivities,
		activityType,
		showAvatar,
		showTime,
		showAction,
		showContent,
		avatarSize,
		cardBg,
		nameColor,
		contentColor,
		timeColor,
		borderColor,
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
		className: `wbe-block-${ uniqueId } wbe-activity-feed`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<RangeControl
						label={ __( 'Number of Activities', 'wbcom-essential' ) }
						value={ totalActivities }
						onChange={ ( value ) => setAttributes( { totalActivities: value } ) }
						min={ 1 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Activity Type', 'wbcom-essential' ) }
						value={ activityType }
						options={ [
							{ label: __( 'All Activity', 'wbcom-essential' ), value: '' },
							{ label: __( 'Status Updates', 'wbcom-essential' ), value: 'activity_update' },
							{ label: __( 'New Members', 'wbcom-essential' ), value: 'new_member' },
							{ label: __( 'Friendships', 'wbcom-essential' ), value: 'friendship_created' },
							{ label: __( 'Joined Group', 'wbcom-essential' ), value: 'joined_group' },
							{ label: __( 'Created Group', 'wbcom-essential' ), value: 'created_group' },
							{ label: __( 'New Blog Post', 'wbcom-essential' ), value: 'new_blog_post' },
						] }
						onChange={ ( value ) => setAttributes( { activityType: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Action Text', 'wbcom-essential' ) }
						checked={ showAction }
						onChange={ ( value ) => setAttributes( { showAction: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Content', 'wbcom-essential' ) }
						checked={ showContent }
						onChange={ ( value ) => setAttributes( { showContent: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Timestamp', 'wbcom-essential' ) }
						checked={ showTime }
						onChange={ ( value ) => setAttributes( { showTime: value } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					{ showAvatar && (
						<RangeControl
							label={ __( 'Avatar Size (px)', 'wbcom-essential' ) }
							value={ avatarSize }
							onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
							min={ 30 }
							max={ 100 }
						/>
					) }
					<BaseControl label={ __( 'Item Background', 'wbcom-essential' ) }>
						<ColorPicker
							color={ cardBg }
							onChange={ ( value ) => setAttributes( { cardBg: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Name / Link Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ nameColor }
							onChange={ ( value ) => setAttributes( { nameColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Content Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ contentColor }
							onChange={ ( value ) => setAttributes( { contentColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Timestamp Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ timeColor }
							onChange={ ( value ) => setAttributes( { timeColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Separator Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ borderColor }
							onChange={ ( value ) => setAttributes( { borderColor: value } ) }
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
					block="wbcom-essential/activity-feed"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-activity-feed__loading">
							<p>{ __( 'Loading activity…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-activity-feed__error">
							<p>{ __( 'Could not load activity preview. The block will render correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
