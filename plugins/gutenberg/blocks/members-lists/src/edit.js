/**
 * Members Lists Block - Editor Component
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
	TextControl,
	ButtonGroup,
	Button,
	FormTokenField,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		membersOrder,
		profileTypes,
		membersCount,
		rowSpace,
		alignment,
		showAllMembersLink,
		showFilterTypes,
		showAvatar,
		showName,
		showOnlineStatus,
		headingText,
		memberLinkText,
		boxBorderColor,
		boxBorderRadius,
		boxBackgroundColor,
		allMembersLinkColor,
		filterBorderStyle,
		filterBorderColor,
		avatarSize,
		avatarBorderRadius,
		avatarSpacing,
		onlineStatusColor,
		onlineStatusSize,
		nameColor,
	} = attributes;

	const [ memberTypeOptions, setMemberTypeOptions ] = useState( [] );
	const [ activeTab, setActiveTab ] = useState( membersOrder );

	// Fetch member types.
	useEffect( () => {
		apiFetch( { path: '/wbcom-essential/v1/member-types' } )
			.then( ( types ) => {
				setMemberTypeOptions( types );
			} )
			.catch( () => {
				setMemberTypeOptions( [] );
			} );
	}, [] );

	const blockProps = useBlockProps( {
		className: useThemeColors ? 'use-theme-colors' : '',
	} );

	// Build inline styles - layout always applied, colors only when not using theme colors.
	const containerStyle = {
		// Layout styles - always applied.
		'--box-border-radius': `${ boxBorderRadius }px`,
		'--avatar-size': `${ avatarSize }px`,
		'--avatar-radius': `${ avatarBorderRadius }%`,
		'--avatar-spacing': `${ avatarSpacing }px`,
		'--online-size': `${ onlineStatusSize }px`,
		'--row-space': `${ rowSpace }px`,
		// Color styles - only when not using theme colors.
		...( ! useThemeColors && {
			'--box-border-color': boxBorderColor,
			'--box-bg-color': boxBackgroundColor,
			'--filter-border-color': filterBorderColor,
			'--online-color': onlineStatusColor,
			'--name-color': nameColor,
			'--link-color': allMembersLinkColor || 'inherit',
		} ),
	};

	// Demo members data for preview.
	const demoMembers = [
		{ id: 1, name: 'John Doe', avatar: 'JD', online: true },
		{ id: 2, name: 'Jane Smith', avatar: 'JS', online: false },
		{ id: 3, name: 'Mike Johnson', avatar: 'MJ', online: true },
		{ id: 4, name: 'Sarah Williams', avatar: 'SW', online: false },
		{ id: 5, name: 'Chris Brown', avatar: 'CB', online: true },
	];

	const memberTypeSuggestions = memberTypeOptions.map( ( type ) => type.label );
	const selectedTypeLabels = profileTypes.map( ( value ) => {
		const found = memberTypeOptions.find( ( t ) => t.value === value );
		return found ? found.label : value;
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Default Members Order', 'wbcom-essential' ) }
						value={ membersOrder }
						options={ [
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
							{ label: __( 'Popular', 'wbcom-essential' ), value: 'popular' },
							{ label: __( 'Active', 'wbcom-essential' ), value: 'active' },
						] }
						onChange={ ( value ) => {
							setAttributes( { membersOrder: value } );
							setActiveTab( value );
						} }
					/>

					{ memberTypeOptions.length > 0 && (
						<FormTokenField
							label={ __( 'Profile Types', 'wbcom-essential' ) }
							value={ selectedTypeLabels }
							suggestions={ memberTypeSuggestions }
							onChange={ ( tokens ) => {
								const values = tokens.map( ( token ) => {
									const found = memberTypeOptions.find( ( t ) => t.label === token );
									return found ? found.value : token;
								} );
								setAttributes( { profileTypes: values } );
							} }
						/>
					) }

					<RangeControl
						label={ __( 'Members Count', 'wbcom-essential' ) }
						value={ membersCount }
						onChange={ ( value ) => setAttributes( { membersCount: value } ) }
						min={ 1 }
						max={ 20 }
					/>

					<RangeControl
						label={ __( 'Row Space', 'wbcom-essential' ) }
						value={ rowSpace }
						onChange={ ( value ) => setAttributes( { rowSpace: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<div className="components-base-control">
						<label className="components-base-control__label">
							{ __( 'Alignment', 'wbcom-essential' ) }
						</label>
						<ButtonGroup>
							<Button
								variant={ alignment === 'left' ? 'primary' : 'secondary' }
								onClick={ () => setAttributes( { alignment: 'left' } ) }
							>
								{ __( 'Left', 'wbcom-essential' ) }
							</Button>
							<Button
								variant={ alignment === 'right' ? 'primary' : 'secondary' }
								onClick={ () => setAttributes( { alignment: 'right' } ) }
							>
								{ __( 'Right', 'wbcom-essential' ) }
							</Button>
						</ButtonGroup>
					</div>

					<ToggleControl
						label={ __( 'Show All Members Link', 'wbcom-essential' ) }
						checked={ showAllMembersLink }
						onChange={ ( value ) => setAttributes( { showAllMembersLink: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Filter Types', 'wbcom-essential' ) }
						checked={ showFilterTypes }
						onChange={ ( value ) => setAttributes( { showFilterTypes: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Avatar', 'wbcom-essential' ) }
						checked={ showAvatar }
						onChange={ ( value ) => setAttributes( { showAvatar: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Name', 'wbcom-essential' ) }
						checked={ showName }
						onChange={ ( value ) => setAttributes( { showName: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Online Status', 'wbcom-essential' ) }
						checked={ showOnlineStatus }
						onChange={ ( value ) => setAttributes( { showOnlineStatus: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Heading Text', 'wbcom-essential' ) }
						value={ headingText }
						onChange={ ( value ) => setAttributes( { headingText: value } ) }
					/>

					{ showAllMembersLink && (
						<TextControl
							label={ __( 'Member Link Text', 'wbcom-essential' ) }
							value={ memberLinkText }
							onChange={ ( value ) => setAttributes( { memberLinkText: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Box Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ boxBorderRadius }
						onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>

					<SelectControl
						label={ __( 'Filter Border Style', 'wbcom-essential' ) }
						value={ filterBorderStyle }
						options={ [
							{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
							{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
							{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
							{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
						] }
						onChange={ ( value ) => setAttributes( { filterBorderStyle: value } ) }
					/>
				</PanelBody>

				{ showAvatar && (
					<PanelBody title={ __( 'Avatar Style', 'wbcom-essential' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Size', 'wbcom-essential' ) }
							value={ avatarSize }
							onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
							min={ 20 }
							max={ 100 }
						/>

						<RangeControl
							label={ __( 'Border Radius', 'wbcom-essential' ) }
							value={ avatarBorderRadius }
							onChange={ ( value ) => setAttributes( { avatarBorderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>

						<RangeControl
							label={ __( 'Spacing', 'wbcom-essential' ) }
							value={ avatarSpacing }
							onChange={ ( value ) => setAttributes( { avatarSpacing: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					</PanelBody>
				) }

				{ showOnlineStatus && (
					<PanelBody title={ __( 'Online Status', 'wbcom-essential' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Size', 'wbcom-essential' ) }
							value={ onlineStatusSize }
							onChange={ ( value ) => setAttributes( { onlineStatusSize: value } ) }
							min={ 5 }
							max={ 30 }
						/>
					</PanelBody>
				) }

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
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
							<ColorControl
								label={ __( 'Background Color', 'wbcom-essential' ) }
								value={ boxBackgroundColor }
								onChange={ ( value ) => setAttributes( { boxBackgroundColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Border Color', 'wbcom-essential' ) }
								value={ boxBorderColor }
								onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Filter Border Color', 'wbcom-essential' ) }
								value={ filterBorderColor }
								onChange={ ( value ) => setAttributes( { filterBorderColor: value } ) }
							/>
							{ showName && (
								<ColorControl
									label={ __( 'Name Color', 'wbcom-essential' ) }
									value={ nameColor }
									onChange={ ( value ) => setAttributes( { nameColor: value } ) }
								/>
							) }
							{ showAllMembersLink && (
								<ColorControl
									label={ __( 'All Members Link Color', 'wbcom-essential' ) }
									value={ allMembersLinkColor }
									onChange={ ( value ) => setAttributes( { allMembersLinkColor: value } ) }
								/>
							) }
							{ showOnlineStatus && (
								<ColorControl
									label={ __( 'Online Status Color', 'wbcom-essential' ) }
									value={ onlineStatusColor }
									onChange={ ( value ) => setAttributes( { onlineStatusColor: value } ) }
								/>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-members-lists-preview" style={ containerStyle }>
					<div className="wbcom-members-lists-box">
						{ ( headingText || ( showAllMembersLink && memberLinkText ) ) && (
							<div className="wbcom-members-lists-header">
								{ headingText && (
									<h3 className="wbcom-members-lists-title">{ headingText }</h3>
								) }
								{ showAllMembersLink && memberLinkText && (
									<span className="wbcom-members-lists-link">
										{ memberLinkText }
										<span className="dashicons dashicons-arrow-right-alt2"></span>
									</span>
								) }
							</div>
						) }

						{ showFilterTypes && (
							<div className={ `wbcom-members-lists-filters border-${ filterBorderStyle }` }>
								<button
									className={ `wbcom-filter-tab ${ activeTab === 'active' ? 'selected' : '' }` }
									onClick={ () => setActiveTab( 'active' ) }
								>
									{ __( 'Active', 'wbcom-essential' ) }
								</button>
								<button
									className={ `wbcom-filter-tab ${ activeTab === 'popular' ? 'selected' : '' }` }
									onClick={ () => setActiveTab( 'popular' ) }
								>
									{ __( 'Popular', 'wbcom-essential' ) }
								</button>
								<button
									className={ `wbcom-filter-tab ${ activeTab === 'newest' ? 'selected' : '' }` }
									onClick={ () => setActiveTab( 'newest' ) }
								>
									{ __( 'Newest', 'wbcom-essential' ) }
								</button>
							</div>
						) }

						<div className={ `wbcom-members-list wbcom-members-list--align-${ alignment }` }>
							{ demoMembers.slice( 0, membersCount ).map( ( member ) => (
								<div
									key={ member.id }
									className="wbcom-member-item"
									style={ { marginBottom: `${ rowSpace }px` } }
								>
									{ showAvatar && (
										<div className="wbcom-member-avatar">
											<span className="wbcom-avatar-placeholder">
												{ member.avatar }
											</span>
										</div>
									) }
									{ showName && (
										<div className="wbcom-member-name">
											{ member.name }
										</div>
									) }
									{ showOnlineStatus && member.online && (
										<span className="wbcom-member-online"></span>
									) }
								</div>
							) ) }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
