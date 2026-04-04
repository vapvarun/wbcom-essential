/**
 * FAQ Accordion Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	ToggleControl,
	SelectControl,
	TextControl,
	TextareaControl,
	ColorPicker,
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
		faqs,
		allowMultiOpen,
		iconStyle,
		firstOpen,
		enableSchema,
		questionColor,
		answerColor,
		questionBg,
		borderColor,
		iconColor,
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

	const [ selectedIndex, setSelectedIndex ] = useState( 0 );
	const [ openItems, setOpenItems ] = useState( [ 0 ] );

	const blockProps = useBlockProps( {
		className: `wbe-block-${ uniqueId } wbe-faq-accordion`,
	} );

	const css = generateBlockCSS( uniqueId, attributes );

	const addFaq = () => {
		const newFaqs = [
			...faqs,
			{
				question: __( 'New Question?', 'wbcom-essential' ),
				answer: __( 'Your answer goes here.', 'wbcom-essential' ),
			},
		];
		setAttributes( { faqs: newFaqs } );
		setSelectedIndex( newFaqs.length - 1 );
	};

	const removeFaq = ( index ) => {
		const newFaqs = faqs.filter( ( _, i ) => i !== index );
		setAttributes( { faqs: newFaqs } );
		setSelectedIndex( Math.max( 0, index - 1 ) );
	};

	const updateFaq = ( index, field, value ) => {
		const newFaqs = faqs.map( ( faq, i ) =>
			i === index ? { ...faq, [ field ]: value } : faq
		);
		setAttributes( { faqs: newFaqs } );
	};

	const togglePreviewItem = ( index ) => {
		setOpenItems( ( prev ) =>
			prev.includes( index )
				? prev.filter( ( i ) => i !== index )
				: [ ...prev, index ]
		);
	};

	const getIconChar = ( style, isOpen ) => {
		switch ( style ) {
			case 'plus':
				return isOpen ? '−' : '+';
			case 'arrow':
				return isOpen ? '↓' : '→';
			case 'chevron':
			default:
				return isOpen ? '▼' : '▶';
		}
	};

	return (
		<>
			<InspectorControls>
				{ /* Content Panel */ }
				<PanelBody
					title={ __( 'FAQ Items', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<div className="wbe-faq-items-list">
						{ faqs.map( ( faq, index ) => (
							<div
								key={ index }
								className={ `wbe-faq-item-row${ selectedIndex === index ? ' is-selected' : '' }` }
								role="button"
								tabIndex={ 0 }
								onClick={ () => setSelectedIndex( index ) }
								onKeyDown={ ( e ) => {
									if ( e.key === 'Enter' || e.key === ' ' ) {
										e.preventDefault();
										setSelectedIndex( index );
									}
								} }
							>
								<span className="wbe-faq-item-num">{ index + 1 }</span>
								<span className="wbe-faq-item-q">
									{ faq.question || __( 'Untitled', 'wbcom-essential' ) }
								</span>
								<Button
									icon="trash"
									label={ __( 'Remove', 'wbcom-essential' ) }
									isDestructive
									size="small"
									onClick={ ( e ) => {
										e.stopPropagation();
										removeFaq( index );
									} }
								/>
							</div>
						) ) }
					</div>
					<Spacer marginTop={ 2 } />
					<Button variant="secondary" onClick={ addFaq }>
						{ __( '+ Add FAQ Item', 'wbcom-essential' ) }
					</Button>
				</PanelBody>

				{ faqs[ selectedIndex ] && (
					<PanelBody
						title={ __( 'Edit Selected FAQ', 'wbcom-essential' ) }
						initialOpen={ true }
					>
						<TextControl
							label={ __( 'Question', 'wbcom-essential' ) }
							value={ faqs[ selectedIndex ].question }
							onChange={ ( val ) =>
								updateFaq( selectedIndex, 'question', val )
							}
						/>
						<TextareaControl
							label={ __( 'Answer', 'wbcom-essential' ) }
							value={ faqs[ selectedIndex ].answer }
							onChange={ ( val ) =>
								updateFaq( selectedIndex, 'answer', val )
							}
							rows={ 4 }
						/>
					</PanelBody>
				) }

				{ /* Layout Panel */ }
				<PanelBody
					title={ __( 'Layout', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Icon Style', 'wbcom-essential' ) }
						value={ iconStyle }
						options={ [
							{ label: __( 'Chevron (▶/▼)', 'wbcom-essential' ), value: 'chevron' },
							{ label: __( 'Plus (+/−)', 'wbcom-essential' ), value: 'plus' },
							{ label: __( 'Arrow (→/↓)', 'wbcom-essential' ), value: 'arrow' },
						] }
						onChange={ ( val ) => setAttributes( { iconStyle: val } ) }
					/>
					<ToggleControl
						label={ __( 'Allow Multiple Open', 'wbcom-essential' ) }
						help={ __( 'Allow more than one item open at once.', 'wbcom-essential' ) }
						checked={ allowMultiOpen }
						onChange={ ( val ) => setAttributes( { allowMultiOpen: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Open First Item', 'wbcom-essential' ) }
						help={ __( 'Automatically open the first FAQ on load.', 'wbcom-essential' ) }
						checked={ firstOpen }
						onChange={ ( val ) => setAttributes( { firstOpen: val } ) }
						__nextHasNoMarginBottom
					/>
					<ToggleControl
						label={ __( 'Enable FAQ Schema (JSON-LD)', 'wbcom-essential' ) }
						help={ __( 'Output FAQPage structured data for SEO.', 'wbcom-essential' ) }
						checked={ enableSchema }
						onChange={ ( val ) => setAttributes( { enableSchema: val } ) }
						__nextHasNoMarginBottom
					/>
				</PanelBody>

				{ /* Style Panel */ }
				<PanelBody
					title={ __( 'Style', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<p><strong>{ __( 'Question Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ questionColor }
						onChange={ ( val ) => setAttributes( { questionColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Question Background', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ questionBg }
						onChange={ ( val ) => setAttributes( { questionBg: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Answer Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ answerColor }
						onChange={ ( val ) => setAttributes( { answerColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Border Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ borderColor }
						onChange={ ( val ) => setAttributes( { borderColor: val } ) }
						enableAlpha
					/>
					<p><strong>{ __( 'Icon Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ iconColor }
						onChange={ ( val ) => setAttributes( { iconColor: val } ) }
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

				{ /* Advanced Panel */ }
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
				{ css && (
					<style>{ css }</style>
				) }
				<div
					className="wbe-faq-accordion__list"
					style={ {
						'--wbe-faq-question-color': questionColor,
						'--wbe-faq-answer-color': answerColor,
						'--wbe-faq-question-bg': questionBg,
						'--wbe-faq-border-color': borderColor,
						'--wbe-faq-icon-color': iconColor,
					} }
				>
					{ faqs.map( ( faq, index ) => {
						const isOpen = openItems.includes( index );
						return (
							<div
								key={ index }
								className={ `wbe-faq-accordion__item${ isOpen ? ' is-open' : '' }` }
							>
								<button
									type="button"
									className="wbe-faq-accordion__question"
									onClick={ () => togglePreviewItem( index ) }
								>
									<span className="wbe-faq-accordion__question-text">
										{ faq.question }
									</span>
									<span
										className="wbe-faq-accordion__icon"
										aria-hidden="true"
									>
										{ getIconChar( iconStyle, isOpen ) }
									</span>
								</button>
								{ isOpen && (
									<div className="wbe-faq-accordion__answer">
										<p>{ faq.answer }</p>
									</div>
								) }
							</div>
						);
					} ) }
				</div>
			</div>
		</>
	);
}
