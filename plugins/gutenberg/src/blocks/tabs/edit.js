/**
 * Tabs Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	SelectControl,
	TextControl,
	TextareaControl,
	ColorPicker,
	ButtonGroup,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

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
		tabs,
		activeTab,
		tabStyle,
		tabAlign,
		activeColor,
		inactiveColor,
		contentBg,
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

	const [ previewTab, setPreviewTab ] = useState( 0 );
	const [ selectedIndex, setSelectedIndex ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-tabs wbe-tabs--${ tabStyle } wbe-tabs--align-${ tabAlign }`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const tokenPropsCss = [
		`.wbe-block-${ uniqueId } {`,
		`  --wbe-tabs-active-color: ${ activeColor };`,
		`  --wbe-tabs-inactive-color: ${ inactiveColor };`,
		`  --wbe-tabs-content-bg: ${ contentBg };`,
		`  --wbe-tabs-border-color: ${ borderColor };`,
		`}`,
	].join( '\n' );

	const addTab = () => {
		const newTabs = [
			...tabs,
			{
				title: `${ __( 'Tab', 'wbcom-essential' ) } ${ tabs.length + 1 }`,
				content: __( 'Add your content here.', 'wbcom-essential' ),
			},
		];
		setAttributes( { tabs: newTabs } );
		setSelectedIndex( newTabs.length - 1 );
		setPreviewTab( newTabs.length - 1 );
	};

	const removeTab = ( index ) => {
		if ( tabs.length <= 1 ) {
			return;
		}
		const newTabs = tabs.filter( ( _, i ) => i !== index );
		setAttributes( { tabs: newTabs } );
		const newSelected = Math.max( 0, index - 1 );
		setSelectedIndex( newSelected );
		setPreviewTab( newSelected );
	};

	const updateTab = ( index, field, value ) => {
		const newTabs = tabs.map( ( tab, i ) =>
			i === index ? { ...tab, [ field ]: value } : tab
		);
		setAttributes( { tabs: newTabs } );
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody
					title={ __( 'Tab Items', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<div className="wbe-tabs-list">
						{ tabs.map( ( tab, index ) => (
							<div
								key={ index }
								className={ `wbe-tabs-list__row${ selectedIndex === index ? ' is-selected' : '' }` }
								role="button"
								tabIndex={ 0 }
								onClick={ () => {
									setSelectedIndex( index );
									setPreviewTab( index );
								} }
								onKeyDown={ ( e ) => {
									if ( e.key === 'Enter' || e.key === ' ' ) {
										e.preventDefault();
										setSelectedIndex( index );
										setPreviewTab( index );
									}
								} }
							>
								<span className="wbe-tabs-list__num">{ index + 1 }</span>
								<span className="wbe-tabs-list__title">
									{ tab.title || __( 'Untitled', 'wbcom-essential' ) }
								</span>
								<Button
									icon="trash"
									label={ __( 'Remove tab', 'wbcom-essential' ) }
									isDestructive
									size="small"
									disabled={ tabs.length <= 1 }
									onClick={ ( e ) => {
										e.stopPropagation();
										removeTab( index );
									} }
								/>
							</div>
						) ) }
					</div>
					<Spacer marginTop={ 2 } />
					<Button variant="secondary" onClick={ addTab }>
						{ __( '+ Add Tab', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ tabs[ selectedIndex ] && (
					<PanelBody
						title={ __( 'Edit Selected Tab', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Tab Title', 'wbcom-essential' ) }
							value={ tabs[ selectedIndex ].title }
							onChange={ ( val ) => updateTab( selectedIndex, 'title', val ) }
						/>
						<TextareaControl
							label={ __( 'Tab Content', 'wbcom-essential' ) }
							value={ tabs[ selectedIndex ].content }
							onChange={ ( val ) => updateTab( selectedIndex, 'content', val ) }
							rows={ 5 }
						/>
					</PanelBody>
				) }

				{ /* Layout Panel */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Tab Style', 'wbcom-essential' ) }
						value={ tabStyle }
						options={ [
							{ label: __( 'Underline', 'wbcom-essential' ), value: 'underline' },
							{ label: __( 'Boxed', 'wbcom-essential' ), value: 'boxed' },
						] }
						onChange={ ( val ) => setAttributes( { tabStyle: val } ) }
					/>
					<SelectControl
						label={ __( 'Tab Alignment', 'wbcom-essential' ) }
						value={ tabAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { tabAlign: val } ) }
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Active Tab Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ activeColor }
						onChange={ ( val ) => setAttributes( { activeColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Inactive Tab Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ inactiveColor }
						onChange={ ( val ) => setAttributes( { inactiveColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Content Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ contentBg }
						onChange={ ( val ) => setAttributes( { contentBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Border Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ borderColor }
						onChange={ ( val ) => setAttributes( { borderColor: val } ) }
						enableAlpha
					/>
					<Spacer marginTop={ 3 } />
					<BorderRadiusControl
						values={ borderRadius }
						unit={ borderRadiusUnit }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						onUnitChange={ ( val ) => setAttributes( { borderRadiusUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<BoxShadowControl
						enabled={ boxShadow }
						horizontal={ shadowHorizontal }
						vertical={ shadowVertical }
						blur={ shadowBlur }
						spread={ shadowSpread }
						color={ shadowColor }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>

				{ /* Spacing Panel */ }
				<PanelBody
					title={ __( 'Spacing', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SpacingControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						values={ padding }
						unit={ paddingUnit }
						onChange={ ( val ) => setAttributes( { padding: val } ) }
						onUnitChange={ ( val ) => setAttributes( { paddingUnit: val } ) }
					/>
					<Spacer marginTop={ 3 } />
					<SpacingControl
						label={ __( 'Margin', 'wbcom-essential' ) }
						values={ margin }
						unit={ marginUnit }
						onChange={ ( val ) => setAttributes( { margin: val } ) }
						onUnitChange={ ( val ) => setAttributes( { marginUnit: val } ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Advanced', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<DeviceVisibility
						hideOnDesktop={ hideOnDesktop }
						hideOnTablet={ hideOnTablet }
						hideOnMobile={ hideOnMobile }
						onChange={ ( val ) => setAttributes( val ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ css && <style>{ css }</style> }
				<style>{ tokenPropsCss }</style>

				{ /* Tab list */ }
				<div className="wbe-tabs__nav" role="tablist" aria-label={ __( 'Tabs', 'wbcom-essential' ) }>
					{ tabs.map( ( tab, index ) => (
						<button
							key={ index }
							role="tab"
							type="button"
							className={ `wbe-tabs__tab${ previewTab === index ? ' is-active' : '' }` }
							aria-selected={ previewTab === index }
							onClick={ () => {
								setPreviewTab( index );
								setSelectedIndex( index );
							} }
						>
							{ tab.title }
						</button>
					) ) }
				</div>

				{ /* Tab panels */ }
				<div className="wbe-tabs__panels">
					{ tabs.map( ( tab, index ) => (
						<div
							key={ index }
							role="tabpanel"
							className={ `wbe-tabs__panel${ previewTab === index ? ' is-active' : '' }` }
							hidden={ previewTab !== index }
						>
							<p>{ tab.content }</p>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
