/**
 * Forums Activity Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		showForumTitle,
		showMeta,
		showExcerpt,
		showViewButton,
		viewButtonText,
		showMyDiscussionsButton,
		myDiscussionsButtonText,
		noForumsText,
		noForumsButtonText,
		boxBgColor,
		boxBorderColor,
		boxBorderRadius,
		boxPadding,
		forumTitleColor,
		topicTitleColor,
		metaColor,
		excerptColor,
		buttonColor,
		buttonBorderColor,
		buttonAlign,
	} = attributes;

	// Preview styles - layout always applied, colors only when not using theme colors.
	const containerStyle = {
		// Layout styles - always applied.
		'--box-radius': `${ boxBorderRadius }px`,
		'--box-padding': `${ boxPadding }px`,
		// Color styles - only when not using theme colors.
		...( ! useThemeColors && {
			'--box-bg': boxBgColor,
			'--box-border-color': boxBorderColor,
			'--forum-title-color': forumTitleColor,
			'--topic-title-color': topicTitleColor,
			'--meta-color': metaColor,
			'--excerpt-color': excerptColor,
			'--button-color': buttonColor,
			'--button-border-color': buttonBorderColor,
		} ),
	};

	// Container classes.
	const containerClasses = [
		'wbcom-essential-forums-activity-editor',
		`button-align-${ buttonAlign }`,
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		className: containerClasses,
		style: containerStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __( 'Show Forum Title', 'wbcom-essential' ) }
						checked={ showForumTitle }
						onChange={ ( value ) => setAttributes( { showForumTitle: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Meta Data', 'wbcom-essential' ) }
						checked={ showMeta }
						onChange={ ( value ) => setAttributes( { showMeta: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Excerpt', 'wbcom-essential' ) }
						checked={ showExcerpt }
						onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show View Discussion Button', 'wbcom-essential' ) }
						checked={ showViewButton }
						onChange={ ( value ) => setAttributes( { showViewButton: value } ) }
					/>
					{ showViewButton && (
						<TextControl
							label={ __( 'Button Text', 'wbcom-essential' ) }
							value={ viewButtonText }
							onChange={ ( value ) => setAttributes( { viewButtonText: value } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show My Discussions Button', 'wbcom-essential' ) }
						checked={ showMyDiscussionsButton }
						onChange={ ( value ) => setAttributes( { showMyDiscussionsButton: value } ) }
					/>
					{ showMyDiscussionsButton && (
						<TextControl
							label={ __( 'My Discussions Text', 'wbcom-essential' ) }
							value={ myDiscussionsButtonText }
							onChange={ ( value ) => setAttributes( { myDiscussionsButtonText: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Empty State', 'wbcom-essential' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'No Forums Message', 'wbcom-essential' ) }
						value={ noForumsText }
						onChange={ ( value ) => setAttributes( { noForumsText: value } ) }
					/>
					<TextControl
						label={ __( 'Explore Button Text', 'wbcom-essential' ) }
						value={ noForumsButtonText }
						onChange={ ( value ) => setAttributes( { noForumsButtonText: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Box Style', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						value={ boxBorderRadius }
						onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
						min={ 0 }
						max={ 30 }
					/>
					<RangeControl
						label={ __( 'Padding', 'wbcom-essential' ) }
						value={ boxPadding }
						onChange={ ( value ) => setAttributes( { boxPadding: value } ) }
						min={ 0 }
						max={ 60 }
					/>
				</PanelBody>

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
								value={ boxBgColor }
								onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Border Color', 'wbcom-essential' ) }
								value={ boxBorderColor }
								onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Forum Title Color', 'wbcom-essential' ) }
								value={ forumTitleColor }
								onChange={ ( value ) => setAttributes( { forumTitleColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Topic Title Color', 'wbcom-essential' ) }
								value={ topicTitleColor }
								onChange={ ( value ) => setAttributes( { topicTitleColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Meta Color', 'wbcom-essential' ) }
								value={ metaColor }
								onChange={ ( value ) => setAttributes( { metaColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Excerpt Color', 'wbcom-essential' ) }
								value={ excerptColor }
								onChange={ ( value ) => setAttributes( { excerptColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Button Color', 'wbcom-essential' ) }
								value={ buttonColor }
								onChange={ ( value ) => setAttributes( { buttonColor: value } ) }
							/>
							<ColorControl
								label={ __( 'Button Border Color', 'wbcom-essential' ) }
								value={ buttonBorderColor }
								onChange={ ( value ) => setAttributes( { buttonBorderColor: value } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Button Style', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Button Alignment', 'wbcom-essential' ) }
						value={ buttonAlign }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { buttonAlign: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-forums-activity-wrapper">
					{ showMyDiscussionsButton && (
						<div className="wbcom-essential-forums-activity-btn">
							<span className="wbcom-essential-forums-activity-btn__link">
								{ myDiscussionsButtonText }
								<svg viewBox="0 0 24 24" width="20" height="20">
									<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
								</svg>
							</span>
						</div>
					) }

					<div className="wbcom-essential-forums-activity">
						<div className="wbcom-essential-fa wbcom-essential-fa--item">
							{ showForumTitle && (
								<div className="wbcom-essential-fa__forum-title">
									{ __( 'General Discussion', 'wbcom-essential' ) }
								</div>
							) }
							<div className="wbcom-essential-fa__topic-title">
								<h2>{ __( 'Your Most Recent Discussion Topic', 'wbcom-essential' ) }</h2>
							</div>
							{ showMeta && (
								<div className="wbcom-essential-fa__meta">
									<span className="wbcom-essential-fa__meta-count">5 replies</span>
									<span className="bs-separator">·</span>
									<span className="wbcom-essential-fa__meta-who">User replied</span>
									<span className="wbcom-essential-fa__meta-when"> 2 hours ago</span>
								</div>
							) }
							{ showExcerpt && (
								<div className="wbcom-essential-fa__excerpt">
									{ __( 'This is a preview of the last reply excerpt in your discussion...', 'wbcom-essential' ) }
								</div>
							) }
							{ showViewButton && (
								<div className="wbcom-essential-fa__link">
									<span className="button-preview">{ viewButtonText }</span>
								</div>
							) }
						</div>
					</div>
				</div>

				<p className="wbcom-forums-activity-notice">
					{ __( 'Note: This block displays the logged-in user\'s most recent forum discussion.', 'wbcom-essential' ) }
				</p>
			</div>
		</>
	);
}
