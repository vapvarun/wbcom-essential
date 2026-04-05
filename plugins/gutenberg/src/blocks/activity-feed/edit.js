/**
 * Activity Feed Block — Editor Component (v2 Premium)
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
	ColorPalette,
	BaseControl,
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

const LAYOUT_OPTIONS = [
	{ label: __( 'Cards', 'wbcom-essential' ), value: 'cards' },
	{ label: __( 'Timeline', 'wbcom-essential' ), value: 'timeline' },
	{ label: __( 'Compact', 'wbcom-essential' ), value: 'compact' },
];

const ACTIVITY_TYPES = [
	{ label: __( 'All Activity', 'wbcom-essential' ), value: '' },
	{ label: __( 'Status Updates', 'wbcom-essential' ), value: 'activity_update' },
	{ label: __( 'New Members', 'wbcom-essential' ), value: 'new_member' },
	{ label: __( 'Friendships', 'wbcom-essential' ), value: 'friendship_created' },
	{ label: __( 'Joined Group', 'wbcom-essential' ), value: 'joined_group' },
	{ label: __( 'Created Group', 'wbcom-essential' ), value: 'created_group' },
	{ label: __( 'New Blog Post', 'wbcom-essential' ), value: 'new_blog_post' },
];

const COLORS = [
	{ name: 'Primary', color: '#667eea' },
	{ name: 'Purple', color: '#764ba2' },
	{ name: 'Dark', color: '#1e1e2e' },
	{ name: 'Gray', color: '#4a5568' },
	{ name: 'Light Gray', color: '#a0aec0' },
	{ name: 'White', color: '#ffffff' },
	{ name: 'Red', color: '#e53e3e' },
	{ name: 'Green', color: '#38a169' },
	{ name: 'Blue BG', color: '#eef2ff' },
	{ name: 'Light BG', color: '#f7fafc' },
];

export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		totalActivities,
		activityType,
		layout,
		showAvatar,
		showTime,
		showAction,
		showContent,
		showTypeIcon,
		showFavoriteBtn,
		showCommentCount,
		showMediaPreview,
		avatarSize,
		cardBg,
		nameColor,
		contentColor,
		timeColor,
		borderColor,
		accentColor,
		iconBg,
		padding,
		paddingUnit,
		margin,
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
		className: `wbe-block-${ uniqueId } wbe-activity-feed wbe-activity-feed--${ layout }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen>
					<RangeControl
						label={ __( 'Number of Activities', 'wbcom-essential' ) }
						value={ totalActivities }
						onChange={ ( v ) => setAttributes( { totalActivities: v } ) }
						min={ 1 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Activity Type', 'wbcom-essential' ) }
						value={ activityType }
						options={ ACTIVITY_TYPES }
						onChange={ ( v ) => setAttributes( { activityType: v } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout Style', 'wbcom-essential' ) }
						value={ layout }
						options={ LAYOUT_OPTIONS }
						onChange={ ( v ) => setAttributes( { layout: v } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				<PanelBody title={ __( 'Display', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( v ) => setAttributes( { showAvatar: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Type Icon', 'wbcom-essential' ) }
						checked={ showTypeIcon }
						onChange={ ( v ) => setAttributes( { showTypeIcon: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Action Text', 'wbcom-essential' ) }
						checked={ showAction }
						onChange={ ( v ) => setAttributes( { showAction: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Content', 'wbcom-essential' ) }
						checked={ showContent }
						onChange={ ( v ) => setAttributes( { showContent: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Media Preview', 'wbcom-essential' ) }
						checked={ showMediaPreview }
						onChange={ ( v ) => setAttributes( { showMediaPreview: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Timestamp', 'wbcom-essential' ) }
						checked={ showTime }
						onChange={ ( v ) => setAttributes( { showTime: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Favorite Button', 'wbcom-essential' ) }
						checked={ showFavoriteBtn }
						onChange={ ( v ) => setAttributes( { showFavoriteBtn: v } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Comment Count', 'wbcom-essential' ) }
						checked={ showCommentCount }
						onChange={ ( v ) => setAttributes( { showCommentCount: v } ) }
						__nextHasNoMarginBottom
					/>
					{ showAvatar && (
						<RangeControl
							label={ __( 'Avatar Size', 'wbcom-essential' ) }
							value={ avatarSize }
							onChange={ ( v ) => setAttributes( { avatarSize: v } ) }
							min={ 28 }
							max={ 80 }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Accent Color', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ accentColor }
							onChange={ ( v ) => setAttributes( { accentColor: v || '#667eea' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Card Background', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ cardBg }
							onChange={ ( v ) => setAttributes( { cardBg: v || '#ffffff' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Name Color', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ nameColor }
							onChange={ ( v ) => setAttributes( { nameColor: v || '#1e1e2e' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Content Color', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ contentColor }
							onChange={ ( v ) => setAttributes( { contentColor: v || '#4a5568' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Timestamp Color', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ timeColor }
							onChange={ ( v ) => setAttributes( { timeColor: v || '#a0aec0' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Border Color', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ borderColor }
							onChange={ ( v ) => setAttributes( { borderColor: v || '#edf2f7' } ) }
						/>
					</BaseControl>
					<BaseControl label={ __( 'Icon Background', 'wbcom-essential' ) }>
						<ColorPalette
							colors={ COLORS }
							value={ iconBg }
							onChange={ ( v ) => setAttributes( { iconBg: v || '#eef2ff' } ) }
						/>
					</BaseControl>
				</PanelBody>

				<PanelBody title={ __( 'Spacing', 'wbcom-essential' ) } initialOpen={ false }>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( v ) => setAttributes( { padding: v } ) }
						onUnitChange={ ( v ) => setAttributes( { paddingUnit: v } ) }
					/>
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( v ) => setAttributes( { margin: v } ) }
						onUnitChange={ ( v ) => setAttributes( { marginUnit: v } ) }
					/>
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( v ) => setAttributes( { borderRadius: v } ) }
						onUnitChange={ ( v ) => setAttributes( { borderRadiusUnit: v } ) }
					/>
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onToggle={ ( v ) => setAttributes( { boxShadow: v } ) }
						onChangeHorizontal={ ( v ) => setAttributes( { shadowHorizontal: v } ) }
						onChangeVertical={ ( v ) => setAttributes( { shadowVertical: v } ) }
						onChangeBlur={ ( v ) => setAttributes( { shadowBlur: v } ) }
						onChangeSpread={ ( v ) => setAttributes( { shadowSpread: v } ) }
						onChangeColor={ ( v ) => setAttributes( { shadowColor: v } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) } initialOpen={ false }>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( v ) => setAttributes( v ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ blockCSS && <style>{ blockCSS }</style> }
				<ServerSideRender
					block="wbcom-essential/activity-feed"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-af__loading">
							<p>{ __( 'Loading activity...', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-af__error">
							<p>{ __( 'Could not load preview. The block renders correctly on the frontend.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
