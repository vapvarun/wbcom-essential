/**
 * Members Grid Block - Editor Component
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
		columns,
		columnsTablet,
		columnsMobile,
		sortType,
		showLastActive,
		showFriendButton,
		gap,
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
		className: `wbe-block-${ uniqueId } wbe-members-grid`,
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

				{ /* Layout */ }
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Columns (Desktop)', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( value ) => setAttributes( { columns: value } ) }
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Columns (Tablet)', 'wbcom-essential' ) }
						value={ columnsTablet }
						onChange={ ( value ) => setAttributes( { columnsTablet: value } ) }
						min={ 1 }
						max={ 4 }
					/>
					<RangeControl
						label={ __( 'Columns (Mobile)', 'wbcom-essential' ) }
						value={ columnsMobile }
						onChange={ ( value ) => setAttributes( { columnsMobile: value } ) }
						min={ 1 }
						max={ 2 }
					/>
					<RangeControl
						label={ __( 'Gap (px)', 'wbcom-essential' ) }
						value={ gap }
						onChange={ ( value ) => setAttributes( { gap: value } ) }
						min={ 0 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Avatar Size (px)', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 40 }
						max={ 200 }
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
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
					block="wbcom-essential/members-grid"
					attributes={ attributes }
				/>
			</div>
		</>
	);
}
