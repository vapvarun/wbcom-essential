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
		skinStyle,
		alignment,
		hideOnComplete,
		showProfileButton,
		showProfilePhoto,
		showCoverPhoto,
		selectedFieldGroups,
		fieldGroupsInitialized,
		showHeader,
		showCompletionIcon,
		showCompletionStatus,
		headingText,
		completionText,
		completeButtonText,
		editButtonText,
		progressSize,
		progressWidth,
		completionColor,
		incompleteColor,
		progressBorderColor,
		numberColor,
		textColor,
		detailsBgColor,
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
				if ( ! fieldGroupsInitialized && groups.length > 0 ) {
					const allGroupIds = groups.map( ( g ) => g.id );
					setAttributes( {
						selectedFieldGroups: allGroupIds,
						fieldGroupsInitialized: true,
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
		const isSelected = selectedFieldGroups.includes( groupId );
		const newSelection = isSelected
			? selectedFieldGroups.filter( ( id ) => id !== groupId )
			: [ ...selectedFieldGroups, groupId ];
		setAttributes( { selectedFieldGroups: newSelection } );
	};

	// Demo progress for preview.
	const demoPercent = 65;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-profile-completion wbcom-profile-completion-skin-${ skinStyle } wbcom-profile-completion-align-${ alignment }`,
		style: {
			'--progress-size': `${ progressSize }px`,
			'--progress-width': `${ progressWidth }px`,
			'--completion-color': completionColor,
			'--incomplete-color': incompleteColor,
			'--progress-border': progressBorderColor,
			'--number-color': numberColor,
			'--text-color': textColor,
			'--details-bg': detailsBgColor,
			'--button-color': buttonColor,
			'--button-bg': buttonBgColor,
			'--button-border': buttonBorderColor,
			'--progress-percent': demoPercent,
		},
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
						checked={ hideOnComplete }
						onChange={ ( value ) =>
							setAttributes( { hideOnComplete: value } )
						}
					/>

					<ToggleControl
						label={ __( 'Show Profile Button', 'wbcom-essential' ) }
						checked={ showProfileButton }
						onChange={ ( value ) =>
							setAttributes( { showProfileButton: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Progress Items', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Include Profile Photo', 'wbcom-essential' ) }
						checked={ showProfilePhoto }
						onChange={ ( value ) =>
							setAttributes( { showProfilePhoto: value } )
						}
						help={ __(
							'Track profile photo upload in progress',
							'wbcom-essential'
						) }
					/>

					<ToggleControl
						label={ __( 'Include Cover Photo', 'wbcom-essential' ) }
						checked={ showCoverPhoto }
						onChange={ ( value ) =>
							setAttributes( { showCoverPhoto: value } )
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
									checked={ selectedFieldGroups.includes( group.id ) }
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
							label={ __( 'Show Header', 'wbcom-essential' ) }
							checked={ showHeader }
							onChange={ ( value ) =>
								setAttributes( { showHeader: value } )
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

					{ showProfileButton && (
						<>
							<TextControl
								label={ __(
									'Complete Button Text',
									'wbcom-essential'
								) }
								value={ completeButtonText }
								onChange={ ( value ) =>
									setAttributes( {
										completeButtonText: value,
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
					{ skinStyle === 'circle' && (
						<RangeControl
							label={ __(
								'Circle Size (px)',
								'wbcom-essential'
							) }
							value={ progressSize }
							onChange={ ( value ) =>
								setAttributes( { progressSize: value } )
							}
							min={ 60 }
							max={ 150 }
						/>
					) }

					<RangeControl
						label={ __(
							'Progress Bar Width (px)',
							'wbcom-essential'
						) }
						value={ progressWidth }
						onChange={ ( value ) =>
							setAttributes( { progressWidth: value } )
						}
						min={ 3 }
						max={ 12 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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
						value={ progressBorderColor }
						onChange={ ( value ) =>
							setAttributes( { progressBorderColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Number Color', 'wbcom-essential' ) }
						value={ numberColor }
						onChange={ ( value ) =>
							setAttributes( { numberColor: value } )
						}
					/>

					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ textColor }
						onChange={ ( value ) =>
							setAttributes( { textColor: value } )
						}
					/>

					<ColorControl
						label={ __(
							'Details Background',
							'wbcom-essential'
						) }
						value={ detailsBgColor }
						onChange={ ( value ) =>
							setAttributes( { detailsBgColor: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Button Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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

					{ showProfileButton && (
						<div className="wbcom-profile-completion-button">
							<span className="wbcom-profile-button">
								{ completeButtonText }
								<span className="dashicons dashicons-arrow-right-alt2"></span>
							</span>
						</div>
					) }
				</div>
			</div>
		</>
	);
}
