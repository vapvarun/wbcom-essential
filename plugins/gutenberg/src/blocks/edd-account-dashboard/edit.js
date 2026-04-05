/**
 * EDD Account Dashboard Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	__experimentalDivider as Divider,
} from '@wordpress/components';

import {
	SpacingControl,
	BoxShadowControl,
	BorderRadiusControl,
	DeviceVisibility,
} from '../../shared/components';
import { useUniqueId } from '../../shared/hooks';
import { generateBlockCSS } from '../../shared/utils/css';

import './editor.scss';

/**
 * Editor component for the EDD Account Dashboard block.
 *
 * @param {Object}   props               Block properties.
 * @param {Object}   props.attributes    Block attributes.
 * @param {Function} props.setAttributes Attribute setter.
 * @param {string}   props.clientId      Block client ID.
 * @return {JSX.Element} Editor UI.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
	const {
		uniqueId,
		defaultTab,
		showSupport,
		supportUrl,
		supportLabel,
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
		className: `wbe-block-${ uniqueId } wbcom-edd-account-editor-wrapper`,
	} );

	// Tabs shown in the SelectControl (only tabs guaranteed to exist without add-ons).
	const tabOptions = [
		{ label: __( 'Dashboard', 'wbcom-essential' ), value: 'dashboard' },
		{ label: __( 'Downloads', 'wbcom-essential' ), value: 'downloads' },
		{ label: __( 'Order History', 'wbcom-essential' ), value: 'purchases' },
		{ label: __( 'Edit Profile', 'wbcom-essential' ), value: 'profile' },
	];

	// Static pill labels for the preview (mirrors what the frontend renders).
	const previewTabs = [
		__( 'Dashboard', 'wbcom-essential' ),
		__( 'Downloads', 'wbcom-essential' ),
		__( 'Order History', 'wbcom-essential' ),
		__( 'Licenses', 'wbcom-essential' ),
		__( 'Subscriptions', 'wbcom-essential' ),
		__( 'Edit Profile', 'wbcom-essential' ),
	];

	return (
		<div { ...blockProps }>
			{ blockCSS && <style>{ blockCSS }</style> }

			{ /* ---- Inspector Controls ---- */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Default Tab', 'wbcom-essential' ) }
						help={ __(
							'The tab shown when the page first loads.',
							'wbcom-essential'
						) }
						value={ defaultTab }
						options={ tabOptions }
						onChange={ ( value ) =>
							setAttributes( { defaultTab: value } )
						}
					/>

					<hr />

					<ToggleControl
						label={ __( 'Show Support Link', 'wbcom-essential' ) }
						help={
							showSupport
								? __(
										'A support link is visible in the sidebar.',
										'wbcom-essential'
								  )
								: __(
										'Enable to add a support link to the sidebar.',
										'wbcom-essential'
								  )
						}
						checked={ showSupport }
						onChange={ ( value ) =>
							setAttributes( { showSupport: value } )
						}
					/>

					{ showSupport && (
						<>
							<TextControl
								label={ __(
									'Support URL',
									'wbcom-essential'
								) }
								help={ __(
									'Full URL to your support portal or helpdesk.',
									'wbcom-essential'
								) }
								value={ supportUrl }
								type="url"
								placeholder="https://example.com/support"
								onChange={ ( value ) =>
									setAttributes( { supportUrl: value } )
								}
							/>

							<TextControl
								label={ __(
									'Support Link Label',
									'wbcom-essential'
								) }
								value={ supportLabel }
								placeholder={ __(
									'My Tickets',
									'wbcom-essential'
								) }
								onChange={ ( value ) =>
									setAttributes( { supportLabel: value } )
								}
							/>
						</>
					) }
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

			{ /* ---- Editor Preview ---- */ }
			<div className="wbcom-edd-account-editor">
				<div className="wbcom-edd-account-editor__icon">
					{ /* SVG: person with dashboard grid */ }
					<svg
						width="52"
						height="52"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
						aria-hidden="true"
					>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				</div>

				<p className="wbcom-edd-account-editor__title">
					{ __( 'EDD Account Dashboard', 'wbcom-essential' ) }
				</p>

				<p className="wbcom-edd-account-editor__description">
					{ __(
						'Displays a unified My Account page for Easy Digital Downloads with a sidebar navigation. Configure the default tab and optional support link in the block settings.',
						'wbcom-essential'
					) }
				</p>

				<div className="wbcom-edd-account-editor__tabs-preview">
					{ previewTabs.map( ( label ) => (
						<span
							key={ label }
							className="wbcom-edd-account-editor__tab-pill"
						>
							{ label }
						</span>
					) ) }
					{ showSupport && supportLabel && (
						<span className="wbcom-edd-account-editor__tab-pill">
							{ supportLabel }
						</span>
					) }
				</div>
			</div>
		</div>
	);
}
