/**
 * Profile Completion Block - Editor Component
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
	ToggleControl,
	ColorPicker,
	BaseControl,
	Notice,
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
		selectedGroups,
		checkProfilePhoto,
		checkCoverPhoto,
		skin,
		progressColor,
		trackColor,
		textColor,
		completedColor,
		incompleteColor,
		showGroupList,
		showPercentage,
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
		className: `wbe-block-${ uniqueId } wbe-profile-completion`,
	} );

	return (
		<>
			<InspectorControls>
				{ /* Content */ }
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ true }>
					<Notice status="info" isDismissible={ false }>
						{ __( 'This block is visible to logged-in users only. Logged-out visitors will see nothing.', 'wbcom-essential' ) }
					</Notice>
					<Spacer marginTop={ 3 } />
					<SelectControl
						label={ __( 'Progress Style', 'wbcom-essential' ) }
						value={ skin }
						options={ [
							{ label: __( 'Circle Ring', 'wbcom-essential' ), value: 'circle' },
							{ label: __( 'Linear Bar', 'wbcom-essential' ), value: 'linear' },
						] }
						onChange={ ( value ) => setAttributes( { skin: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Percentage', 'wbcom-essential' ) }
						checked={ showPercentage }
						onChange={ ( value ) => setAttributes( { showPercentage: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Check Profile Photo', 'wbcom-essential' ) }
						checked={ checkProfilePhoto }
						onChange={ ( value ) => setAttributes( { checkProfilePhoto: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Check Cover Photo', 'wbcom-essential' ) }
						checked={ checkCoverPhoto }
						onChange={ ( value ) => setAttributes( { checkCoverPhoto: value } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Show Field Group Checklist', 'wbcom-essential' ) }
						checked={ showGroupList }
						onChange={ ( value ) => setAttributes( { showGroupList: value } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style */ }
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<BaseControl label={ __( 'Progress Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ progressColor }
							onChange={ ( value ) => setAttributes( { progressColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Track Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ trackColor }
							onChange={ ( value ) => setAttributes( { trackColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Text Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ textColor }
							onChange={ ( value ) => setAttributes( { textColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Completed Item Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ completedColor }
							onChange={ ( value ) => setAttributes( { completedColor: value } ) }
							enableAlpha
						/>
					</BaseControl>
					<BaseControl label={ __( 'Incomplete Item Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ incompleteColor }
							onChange={ ( value ) => setAttributes( { incompleteColor: value } ) }
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
					block="wbcom-essential/profile-completion"
					attributes={ attributes }
					LoadingResponsePlaceholder={ () => (
						<div className="wbe-profile-completion__loading">
							<p>{ __( 'Loading profile completion…', 'wbcom-essential' ) }</p>
						</div>
					) }
					ErrorResponsePlaceholder={ () => (
						<div className="wbe-profile-completion__error">
							<p>{ __( 'Could not load profile completion preview. Log in as a member to see the block.', 'wbcom-essential' ) }</p>
						</div>
					) }
				/>
			</div>
		</>
	);
}
