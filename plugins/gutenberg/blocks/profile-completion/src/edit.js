/**
 * Profile Completion Block - Editor
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	RangeControl,
	Spinner,
	Notice,
} from '@wordpress/components';
import ColorControl from './components/color-control';

const SKIN_OPTIONS = [
	{ label: __( 'Circle', 'wbcom-essential' ), value: 'circle' },
	{ label: __( 'Linear', 'wbcom-essential' ), value: 'linear' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		skinStyle,
		alignment,
		hideWidget,
		showProfileBtn,
		profilePhoto,
		coverPhoto,
		profileGroups,
		profileGroupsInitialized,
		showHeading,
		showCompletionIcon,
		showCompletionStatus,
		headingText,
		completionText,
		completionButtonText,
		editButtonText,
		progressBorderWidth,
		completionColor,
		incompleteColor,
		ringBorderColor,
		ringNumColor,
		ringTextColor,
		detailsColor,
		buttonColor,
		buttonBgColor,
		buttonBorderColor,
	} = attributes;

	// State for xProfile groups from REST API.
	const [ fieldGroups, setFieldGroups ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );
	const [ hasError, setHasError ] = useState( false );

	// Fetch xProfile groups on mount.
	useEffect( () => {
		apiFetch( { path: '/wbcom-essential/v1/xprofile-groups' } )
			.then( ( response ) => {
				const groups = response.fieldGroups || [];
				setFieldGroups( groups );
				setIsLoading( false );

				// Initialize selected groups if not already done.
				if ( ! profileGroupsInitialized && groups.length > 0 ) {
					const initialGroups = {};
					groups.forEach( ( g ) => {
						initialGroups[ g.id ] = true;
					} );
					setAttributes( {
						profileGroups: initialGroups,
						profileGroupsInitialized: true,
					} );
				}
			} )
			.catch( () => {
				setHasError( true );
				setIsLoading( false );
			} );
	}, [] );

	// Toggle a field group in the selection.
	const toggleFieldGroup = ( groupId ) => {
		const newGroups = { ...profileGroups };
		newGroups[ groupId ] = ! newGroups[ groupId ];
		setAttributes( { profileGroups: newGroups } );
	};

	// Demo progress for preview.
	const demoPercent = 65;

	// Build style object - layout always applied, colors only when not using theme colors.
	const blockStyle = {
		// Layout styles - always applied.
		'--progress-width': `${ progressBorderWidth }px`,
		'--progress-percent': demoPercent,
		// Color styles - only when not using theme colors.
		...( ! useThemeColors && {
			'--completion-color': completionColor,
			'--incomplete-color': incompleteColor,
			'--ring-border-color': ringBorderColor,
			'--ring-num-color': ringNumColor,
			'--ring-text-color': ringTextColor,
			'--details-color': detailsColor,
			'--button-color': buttonColor,
			'--button-bg': buttonBgColor,
			'--button-border': buttonBorderColor,
		} ),
	};

	const blockProps = useBlockProps( {
		className: `wbcom-essential-profile-completion wbcom-profile-completion-skin-${ skinStyle } wbcom-profile-completion-align-${ alignment }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: blockStyle,
	} );

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) =>
						setAttributes( { alignment: value } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Skin Style', 'wbcom-essential' ) }
						value={ skinStyle }
						options={ SKIN_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { skinStyle: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Hide on 100% Complete', 'wbcom-essential' ) }
						checked={ hideWidget }
						onChange={ ( value ) =>
							setAttributes( { hideWidget: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Profile Button', 'wbcom-essential' ) }
						checked={ showProfileBtn }
						onChange={ ( value ) =>
							setAttributes( { showProfileBtn: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Progress Items', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Include Profile Photo', 'wbcom-essential' ) }
						checked={ profilePhoto }
						onChange={ ( value ) =>
							setAttributes( { profilePhoto: value } )
						}
						help={ __(
							'Track profile photo upload in progress',
							'wbcom-essential'
						) }
					/>

					<ToggleControl
						label={ __( 'Include Cover Photo', 'wbcom-essential' ) }
						checked={ coverPhoto }
						onChange={ ( value ) =>
							setAttributes( { coverPhoto: value } )
						}
						help={ __(
							'Track cover photo upload in progress',
							'wbcom-essential'
						) }
					/>

					{ /* Dynamic xProfile Field Groups */ }
					{ isLoading && (
						<div style={ { textAlign: 'center', padding: '10px' } }>
							<Spinner />
							<p>{ __( 'Loading field groups...', 'wbcom-essential' ) }</p>
						</div>
					) }

					{ hasError && (
						<Notice status="warning" isDismissible={ false }>
							{ __( 'Could not load xProfile groups. BuddyPress may not be active.', 'wbcom-essential' ) }
						</Notice>
					) }

					{ ! isLoading && ! hasError && fieldGroups.length > 0 && (
						<>
							<p className="components-base-control__help" style={ { marginTop: '16px', marginBottom: '8px' } }>
								{ __( 'xProfile Field Groups:', 'wbcom-essential' ) }
							</p>
							{ fieldGroups.map( ( group ) => (
								<ToggleControl
									key={ group.id }
									label={ group.name }
									checked={ profileGroups[ group.id ] || false }
									onChange={ () => toggleFieldGroup( group.id ) }
								/>
							) ) }
						</>
					) }

					{ ! isLoading && ! hasError && fieldGroups.length === 0 && (
						<Notice status="info" isDismissible={ false }>
							{ __( 'No xProfile field groups found. Create field groups in BuddyPress settings.', 'wbcom-essential' ) }
						</Notice>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Details Dropdown', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ skinStyle === 'circle' && (
						<ToggleControl
							label={ __( 'Show Heading', 'wbcom-essential' ) }
							checked={ showHeading }
							onChange={ ( value ) =>
								setAttributes( { showHeading: value } )
							}
						/>
					) }

					<ToggleControl
						label={ __( 'Show Completion Icon', 'wbcom-essential' ) }
						checked={ showCompletionIcon }
						onChange={ ( value ) =>
							setAttributes( { showCompletionIcon: value } )
						}
					/>

					<ToggleControl
						label={ __(
							'Show Completion Status',
							'wbcom-essential'
						) }
						checked={ showCompletionStatus }
						onChange={ ( value ) =>
							setAttributes( { showCompletionStatus: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Labels', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ skinStyle === 'linear' && (
						<TextControl
							label={ __( 'Heading Text', 'wbcom-essential' ) }
							value={ headingText }
							onChange={ ( value ) =>
								setAttributes( { headingText: value } )
							}
						/>
					) }

					<TextControl
						label={ __( 'Completion Text', 'wbcom-essential' ) }
						value={ completionText }
						onChange={ ( value ) =>
							setAttributes( { completionText: value } )
						}
					/>

					{ showProfileBtn && (
						<>
							<TextControl
								label={ __(
									'Complete Button Text',
									'wbcom-essential'
								) }
								value={ completionButtonText }
								onChange={ ( value ) =>
									setAttributes( {
										completionButtonText: value,
									} )
								}
								help={ __(
									'Shown when progress is below 100%',
									'wbcom-essential'
								) }
							/>

							<TextControl
								label={ __(
									'Edit Button Text',
									'wbcom-essential'
								) }
								value={ editButtonText }
								onChange={ ( value ) =>
									setAttributes( { editButtonText: value } )
								}
								help={ __(
									'Shown when progress is 100%',
									'wbcom-essential'
								) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Progress Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __(
							'Progress Border Width (px)',
							'wbcom-essential'
						) }
						value={ progressBorderWidth }
						onChange={ ( value ) =>
							setAttributes( { progressBorderWidth: value } )
						}
						min={ 3 }
						max={ 12 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					{ ! useThemeColors && (
						<>
							<hr />
							<ColorControl
								label={ __( 'Completion Color', 'wbcom-essential' ) }
								value={ completionColor }
								onChange={ ( value ) =>
									setAttributes( { completionColor: value } )
								}
							/>

							<ColorControl
								label={ __( 'Incomplete Color', 'wbcom-essential' ) }
								value={ incompleteColor }
								onChange={ ( value ) =>
									setAttributes( { incompleteColor: value } )
								}
							/>

							<ColorControl
								label={ __(
									'Progress Background',
									'wbcom-essential'
								) }
								value={ ringBorderColor }
								onChange={ ( value ) =>
									setAttributes( { ringBorderColor: value } )
								}
							/>

							<ColorControl
								label={ __( 'Number Color', 'wbcom-essential' ) }
								value={ ringNumColor }
								onChange={ ( value ) =>
									setAttributes( { ringNumColor: value } )
								}
							/>

							<ColorControl
								label={ __( 'Text Color', 'wbcom-essential' ) }
								value={ ringTextColor }
								onChange={ ( value ) =>
									setAttributes( { ringTextColor: value } )
								}
							/>

							<ColorControl
								label={ __(
									'Details Background',
									'wbcom-essential'
								) }
								value={ detailsColor }
								onChange={ ( value ) =>
									setAttributes( { detailsColor: value } )
								}
							/>
						</>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Button Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					{ ! useThemeColors && (
						<>
							<ColorControl
								label={ __( 'Button Color', 'wbcom-essential' ) }
								value={ buttonColor }
								onChange={ ( value ) =>
									setAttributes( { buttonColor: value } )
								}
							/>

							<ColorControl
								label={ __(
									'Button Background',
									'wbcom-essential'
								) }
								value={ buttonBgColor }
								onChange={ ( value ) =>
									setAttributes( { buttonBgColor: value } )
								}
							/>

							<ColorControl
								label={ __( 'Button Border', 'wbcom-essential' ) }
								value={ buttonBorderColor }
								onChange={ ( value ) =>
									setAttributes( { buttonBorderColor: value } )
								}
							/>
						</>
					) }
					{ useThemeColors && (
						<p className="components-base-control__help">
							{ __( 'Button colors are inherited from theme when using theme colors.', 'wbcom-essential' ) }
						</p>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-profile-completion-wrapper">
					{ skinStyle === 'circle' ? (
						<div className="wbcom-profile-completion-circle">
							<div className="wbcom-progress-ring">
								<div className="wbcom-progress-ring-inner"></div>
								<div className="wbcom-progress-data">
									<span className="wbcom-progress-num">
										{ demoPercent }
										<span>%</span>
									</span>
									<span className="wbcom-progress-text">
										{ completionText }
									</span>
								</div>
							</div>
						</div>
					) : (
						<div className="wbcom-profile-completion-linear">
							<div className="wbcom-progress-header">
								<h3>{ headingText }</h3>
								<span className="dashicons dashicons-arrow-right-alt2"></span>
							</div>
							<div className="wbcom-progress-bar">
								<div
									className="wbcom-progress-bar-fill"
									style={ { width: `${ demoPercent }%` } }
								></div>
							</div>
							<div className="wbcom-progress-info">
								<span className="wbcom-progress-num">
									{ demoPercent }%
								</span>
								<span className="wbcom-progress-text">
									{ completionText }
								</span>
							</div>
						</div>
					) }

					{ showProfileBtn && (
						<div className="wbcom-profile-completion-button">
							<span className="wbcom-profile-button">
								{ completionButtonText }
								<span className="dashicons dashicons-arrow-right-alt2"></span>
							</span>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
