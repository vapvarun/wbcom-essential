/**
 * Groups Lists Block - Editor Component
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
	FormTokenField,
	Spinner,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import ServerSideRender from '@wordpress/server-side-render';
import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		groupsOrder,
		groupTypes,
		groupsCount,
		showAllGroupsLink,
		showFilterTypes,
		showAvatar,
		showMeta,
		headingText,
		allGroupsLinkText,
		boxBgColor,
		boxBorderColor,
		boxBorderRadius,
		avatarSize,
		avatarBorderRadius,
		titleColor,
		metaColor,
		linkColor,
		filterNormalColor,
		filterActiveColor,
		filterActiveBorderColor,
	} = attributes;

	const [ availableGroupTypes, setAvailableGroupTypes ] = useState( [] );
	const [ isLoading, setIsLoading ] = useState( true );

	// Fetch available group types.
	useEffect( () => {
		setIsLoading( true );
		apiFetch( { path: '/wbcom-essential/v1/group-types' } )
			.then( ( types ) => {
				setAvailableGroupTypes( types || [] );
				setIsLoading( false );
			} )
			.catch( () => {
				setAvailableGroupTypes( [] );
				setIsLoading( false );
			} );
	}, [] );

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-groups-lists-editor',
	} );

	// Build inline styles for editor preview.
	const containerStyle = {
		'--box-border-radius'        : `${ boxBorderRadius }px`,
		'--avatar-size'              : `${ avatarSize }px`,
		'--avatar-border-radius'     : `${ avatarBorderRadius }px`,
		// User-selected colors
		'--box-bg'                  : boxBgColor,
		'--box-border-color'         : boxBorderColor,
		'--title-color'              : titleColor,
		'--meta-color'               : metaColor,
		'--link-color'               : linkColor,
		'--filter-normal-color'      : filterNormalColor,
		'--filter-active-color'      : filterActiveColor,
		'--filter-active-border'     : filterActiveBorderColor,
	};

	// Get labels for FormTokenField.
	const getGroupTypeLabels = () => {
		return groupTypes.map( ( type ) => {
			const found = availableGroupTypes.find( ( t ) => t.value === type );
			return found ? found.label : type;
		} );
	};

	const suggestions = availableGroupTypes.map( ( type ) => type.label );

	const onGroupTypesChange = ( tokens ) => {
		const newTypes = tokens.map( ( token ) => {
			const found = availableGroupTypes.find( ( t ) => t.label === token );
			return found ? found.value : token;
		} );
		setAttributes( { groupTypes: newTypes } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout Settings', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Default Groups Order', 'wbcom-essential' ) }
						value={ groupsOrder }
						options={ [
							{ label: __( 'Active', 'wbcom-essential' ), value: 'active' },
							{ label: __( 'Popular', 'wbcom-essential' ), value: 'popular' },
							{ label: __( 'Newest', 'wbcom-essential' ), value: 'newest' },
						] }
						onChange={ ( value ) => setAttributes( { groupsOrder: value } ) }
					/>

					{ isLoading ? (
						<div style={ { display: 'flex', alignItems: 'center', gap: '8px' } }>
							<Spinner />
							<span>{ __( 'Loading group types...', 'wbcom-essential' ) }</span>
						</div>
					) : availableGroupTypes.length > 0 ? (
						<FormTokenField
							label={ __( 'Group Types', 'wbcom-essential' ) }
							value={ getGroupTypeLabels() }
							suggestions={ suggestions }
							onChange={ onGroupTypesChange }
							__experimentalExpandOnFocus={ true }
						/>
					) : null }

					<RangeControl
						label={ __( 'Groups Count', 'wbcom-essential' ) }
						value={ groupsCount }
						onChange={ ( value ) => setAttributes( { groupsCount: value } ) }
						min={ 1 }
						max={ 20 }
					/>

					<ToggleControl
						label={ __( 'Show All Groups Link', 'wbcom-essential' ) }
						checked={ showAllGroupsLink }
						onChange={ ( value ) => setAttributes( { showAllGroupsLink: value } ) }
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
						label={ __( 'Show Meta Data', 'wbcom-essential' ) }
						checked={ showMeta }
						onChange={ ( value ) => setAttributes( { showMeta: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Content', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Heading Text', 'wbcom-essential' ) }
						value={ headingText }
						onChange={ ( value ) => setAttributes( { headingText: value } ) }
					/>

					{ showAllGroupsLink && (
						<TextControl
							label={ __( 'All Groups Link Text', 'wbcom-essential' ) }
							value={ allGroupsLinkText }
							onChange={ ( value ) => setAttributes( { allGroupsLinkText: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Box Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ boxBgColor }
						onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Border Color', 'wbcom-essential' ) }
						value={ boxBorderColor }
						onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
					/>

					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ boxBorderRadius }
						onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
						min={ 0 }
						max={ 50 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Avatar Styling', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Avatar Size', 'wbcom-essential' ) }
						value={ avatarSize }
						onChange={ ( value ) => setAttributes( { avatarSize: value } ) }
						min={ 20 }
						max={ 200 }
					/>

					<RangeControl
						label={ __( 'Avatar Border Radius', 'wbcom-essential' ) }
						value={ avatarBorderRadius }
						onChange={ ( value ) => setAttributes( { avatarBorderRadius: value } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Title Color', 'wbcom-essential' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Meta Color', 'wbcom-essential' ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Link Color', 'wbcom-essential' ) }
						value={ linkColor }
						onChange={ ( value ) => setAttributes( { linkColor: value } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Filter Tab Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Normal Color', 'wbcom-essential' ) }
						value={ filterNormalColor }
						onChange={ ( value ) => setAttributes( { filterNormalColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Active Color', 'wbcom-essential' ) }
						value={ filterActiveColor }
						onChange={ ( value ) => setAttributes( { filterActiveColor: value } ) }
					/>

					<ColorControl
						label={ __( 'Active Border Color', 'wbcom-essential' ) }
						value={ filterActiveBorderColor }
						onChange={ ( value ) => setAttributes( { filterActiveBorderColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-groups-lists-preview" style={ containerStyle }>
					<ServerSideRender
						block="wbcom-essential/groups-lists"
						attributes={ attributes }
					/>
				</div>
			</div>
		</>
	);
}
