/**
 * Forums Block - Editor Component
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
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import ColorControl from './components/color-control';

export default function Edit( { attributes, setAttributes } ) {
	const {
		headingText,
		forumsCount,
		rowSpace,
		showAllForumsLink,
		allForumsLinkText,
		showAvatar,
		avatarSize,
		avatarBorderType,
		avatarBorderWidth,
		avatarBorderColor,
		avatarBorderRadius,
		avatarOpacity,
		avatarSpacing,
		showMeta,
		showMetaReplies,
		showLastReply,
		boxBorderType,
		boxBorderWidth,
		boxBgColor,
		boxBorderColor,
		boxBorderRadius,
		allForumsLinkColor,
		titleFontSize,
		titleFontWeight,
		titleLineHeight,
		titleColor,
		titleHoverColor,
		metaFontSize,
		metaColor,
		lastReplyColor,
	} = attributes;

	// Helper to get dimension value.
	const getDimensionValue = ( dimension ) => {
		if ( typeof dimension === 'object' && dimension !== null ) {
			const unit = dimension.unit || 'px';
			return `${ dimension.top || 0 }${ unit } ${ dimension.right || 0 }${ unit } ${ dimension.bottom || 0 }${ unit } ${ dimension.left || 0 }${ unit }`;
		}
		return `${ dimension || 0 }px`;
	};

	// Preview styles.
	const containerStyle = {
		'--box-bg': boxBgColor,
		'--box-border-type': boxBorderType,
		'--box-border-width': `${ boxBorderWidth }px`,
		'--box-border-color': boxBorderColor,
		'--box-radius': getDimensionValue( boxBorderRadius ),
		'--title-font-size': `${ titleFontSize }px`,
		'--title-font-weight': titleFontWeight,
		'--title-line-height': titleLineHeight,
		'--title-color': titleColor,
		'--title-hover': titleHoverColor,
		'--meta-font-size': `${ metaFontSize }px`,
		'--meta-color': metaColor,
		'--last-reply-color': lastReplyColor,
		'--link-color': allForumsLinkColor || titleColor,
		'--avatar-size': `${ avatarSize }px`,
		'--avatar-border-type': avatarBorderType,
		'--avatar-border-width': `${ avatarBorderWidth }px`,
		'--avatar-border-color': avatarBorderColor,
		'--avatar-radius': getDimensionValue( avatarBorderRadius ),
		'--avatar-opacity': avatarOpacity,
		'--avatar-spacing': `${ avatarSpacing }px`,
		'--row-space': `${ rowSpace }px`,
	};

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-forums-editor',
		style: containerStyle,
	} );

	// Generate preview items.
	const previewItems = Array.from( { length: Math.min( forumsCount, 3 ) }, ( _, i ) => ( {
		id: i + 1,
		title: `Discussion Topic ${ i + 1 }`,
		author: `User ${ i + 1 }`,
		time: `${ i + 1 } hours ago`,
		voices: 3 + i,
		replies: 5 + i * 2,
		excerpt: 'This is a preview of the last reply in this topic...',
	} ) );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content Settings', 'wbcom-essential' ) }>
					<TextControl
						label={ __( 'Heading Text', 'wbcom-essential' ) }
						value={ headingText }
						onChange={ ( value ) => setAttributes( { headingText: value } ) }
					/>
					<RangeControl
						label={ __( 'Topics Count', 'wbcom-essential' ) }
						value={ forumsCount }
						onChange={ ( value ) => setAttributes( { forumsCount: value } ) }
						min={ 1 }
						max={ 20 }
					/>
					<RangeControl
						label={ __( 'Row Spacing', 'wbcom-essential' ) }
						value={ rowSpace }
						onChange={ ( value ) => setAttributes( { rowSpace: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<ToggleControl
						label={ __( 'Show All Forums Link', 'wbcom-essential' ) }
						checked={ showAllForumsLink }
						onChange={ ( value ) => setAttributes( { showAllForumsLink: value } ) }
					/>
					{ showAllForumsLink && (
						<TextControl
							label={ __( 'Link Text', 'wbcom-essential' ) }
							value={ allForumsLinkText }
							onChange={ ( value ) => setAttributes( { allForumsLinkText: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Display Options', 'wbcom-essential' ) } initialOpen={ false }>
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
					{ showMeta && (
						<ToggleControl
							label={ __( 'Show Replies Count', 'wbcom-essential' ) }
							checked={ showMetaReplies }
							onChange={ ( value ) => setAttributes( { showMetaReplies: value } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Show Last Reply', 'wbcom-essential' ) }
						checked={ showLastReply }
						onChange={ ( value ) => setAttributes( { showLastReply: value } ) }
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
						<SelectControl
							label={ __( 'Border Type', 'wbcom-essential' ) }
							value={ avatarBorderType }
							options={ [
								{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
								{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
								{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
								{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
								{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
							] }
							onChange={ ( value ) => setAttributes( { avatarBorderType: value } ) }
						/>
						{ avatarBorderType !== 'none' && (
							<>
								<RangeControl
									label={ __( 'Border Width', 'wbcom-essential' ) }
									value={ avatarBorderWidth }
									onChange={ ( value ) => setAttributes( { avatarBorderWidth: value } ) }
									min={ 0 }
									max={ 10 }
								/>
								<ColorControl
									label={ __( 'Border Color', 'wbcom-essential' ) }
									value={ avatarBorderColor }
									onChange={ ( value ) => setAttributes( { avatarBorderColor: value } ) }
								/>
							</>
						) }
						<BoxControl
							label={ __( 'Border Radius', 'wbcom-essential' ) }
							values={ avatarBorderRadius }
							onChange={ ( value ) => setAttributes( { avatarBorderRadius: value } ) }
						/>
						<RangeControl
							label={ __( 'Opacity', 'wbcom-essential' ) }
							value={ avatarOpacity }
							onChange={ ( value ) => setAttributes( { avatarOpacity: value } ) }
							min={ 0.1 }
							max={ 1 }
							step={ 0.01 }
						/>
						<RangeControl
							label={ __( 'Spacing', 'wbcom-essential' ) }
							value={ avatarSpacing }
							onChange={ ( value ) => setAttributes( { avatarSpacing: value } ) }
							min={ 0 }
							max={ 100 }
						/>
					</PanelBody>
				) }

				<PanelBody title={ __( 'Box Style', 'wbcom-essential' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Border Type', 'wbcom-essential' ) }
						value={ boxBorderType }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
							{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
							{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
							{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
						] }
						onChange={ ( value ) => setAttributes( { boxBorderType: value } ) }
					/>
					{ boxBorderType !== 'none' && (
						<>
							<RangeControl
								label={ __( 'Border Width', 'wbcom-essential' ) }
								value={ boxBorderWidth }
								onChange={ ( value ) => setAttributes( { boxBorderWidth: value } ) }
								min={ 0 }
								max={ 10 }
							/>
							<ColorControl
								label={ __( 'Border Color', 'wbcom-essential' ) }
								value={ boxBorderColor }
								onChange={ ( value ) => setAttributes( { boxBorderColor: value } ) }
							/>
						</>
					) }
					<BoxControl
						label={ __( 'Border Radius', 'wbcom-essential' ) }
						values={ boxBorderRadius }
						onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
					/>
					<ColorControl
						label={ __( 'Background Color', 'wbcom-essential' ) }
						value={ boxBgColor }
						onChange={ ( value ) => setAttributes( { boxBgColor: value } ) }
					/>
					{ showAllForumsLink && (
						<ColorControl
							label={ __( 'All Forums Link Color', 'wbcom-essential' ) }
							value={ allForumsLinkColor }
							onChange={ ( value ) => setAttributes( { allForumsLinkColor: value } ) }
						/>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Content Style', 'wbcom-essential' ) } initialOpen={ false }>
					<p><strong>{ __( 'Title Typography', 'wbcom-essential' ) }</strong></p>
					<RangeControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ titleFontSize }
						onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
						min={ 10 }
						max={ 50 }
					/>
					<SelectControl
						label={ __( 'Font Weight', 'wbcom-essential' ) }
						value={ titleFontWeight }
						options={ [
							{ label: __( 'Light', 'wbcom-essential' ), value: '300' },
							{ label: __( 'Normal', 'wbcom-essential' ), value: '400' },
							{ label: __( 'Medium', 'wbcom-essential' ), value: '500' },
							{ label: __( 'Semi Bold', 'wbcom-essential' ), value: '600' },
							{ label: __( 'Bold', 'wbcom-essential' ), value: '700' },
							{ label: __( 'Extra Bold', 'wbcom-essential' ), value: '800' },
						] }
						onChange={ ( value ) => setAttributes( { titleFontWeight: value } ) }
					/>
					<RangeControl
						label={ __( 'Line Height', 'wbcom-essential' ) }
						value={ titleLineHeight }
						onChange={ ( value ) => setAttributes( { titleLineHeight: value } ) }
						min={ 1 }
						max={ 3 }
						step={ 0.1 }
					/>
					<ColorControl
						label={ __( 'Title Color (Normal)', 'wbcom-essential' ) }
						value={ titleColor }
						onChange={ ( value ) => setAttributes( { titleColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Title Color (Hover)', 'wbcom-essential' ) }
						value={ titleHoverColor }
						onChange={ ( value ) => setAttributes( { titleHoverColor: value } ) }
					/>
					<hr />
					<p><strong>{ __( 'Meta Typography', 'wbcom-essential' ) }</strong></p>
					<RangeControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ metaFontSize }
						onChange={ ( value ) => setAttributes( { metaFontSize: value } ) }
						min={ 10 }
						max={ 30 }
					/>
					<ColorControl
						label={ __( 'Meta Data Color', 'wbcom-essential' ) }
						value={ metaColor }
						onChange={ ( value ) => setAttributes( { metaColor: value } ) }
					/>
					<ColorControl
						label={ __( 'Last Reply Color', 'wbcom-essential' ) }
						value={ lastReplyColor }
						onChange={ ( value ) => setAttributes( { lastReplyColor: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-essential-forums">
					<div className="wbcom-essential-block-header">
						<div className="wbcom-essential-block-header__title">
							<h3>{ headingText }</h3>
						</div>
						{ showAllForumsLink && (
							<div className="wbcom-essential-block-header__extra">
								<span className="count-more">
									{ allForumsLinkText }
									<svg viewBox="0 0 24 24" width="16" height="16">
										<path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" fill="currentColor" />
									</svg>
								</span>
							</div>
						) }
					</div>

					<ul className="wbcom-essential-forums__list">
						{ previewItems.map( ( item ) => (
							<li key={ item.id } style={ { marginBottom: rowSpace, paddingBottom: rowSpace } }>
								<div className="wbcom-essential-forums__item">
									<div className="wbcom-forums-flex">
										{ showAvatar && (
											<div className="wbcom-essential-forums__avatar">
												<div
													className="avatar-placeholder"
													style={ {
														width: avatarSize,
														height: avatarSize,
													} }
												>
													<svg viewBox="0 0 24 24" width={ avatarSize * 0.4 } height={ avatarSize * 0.4 }>
														<path
															fill="currentColor"
															d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
														/>
													</svg>
												</div>
											</div>
										) }
										<div className="wbcom-essential-forums__content">
											<div className="item-title">
												<span className="topic-link">{ item.title }</span>
											</div>
											<div className="item-meta">
												{ showMeta && (
													<div className="wbcom-essential-forums__ww">
														<span className="bs-replied">
															replied { item.time }
														</span>
														{ showMetaReplies && (
															<span className="bs-voices-wrap">
																<span className="bs-voices">{ item.voices } Members</span>
																<span className="bs-separator">&middot;</span>
																<span className="bs-replies">{ item.replies } Replies</span>
															</span>
														) }
													</div>
												) }
												{ showLastReply && (
													<div className="wbcom-essential-forums__last-reply">
														<span className="bs-last-reply">
															{ item.excerpt }
														</span>
													</div>
												) }
											</div>
										</div>
									</div>
								</div>
							</li>
						) ) }
					</ul>
				</div>
			</div>
		</>
	);
}
