/**
 * Text Rotator Block - Editor
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	BlockControls,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	SelectControl,
	RangeControl,
	Button,
} from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import ColorControl from './components/color-control';

const ANIMATION_OPTIONS = [
	{ label: __( 'Fade In', 'wbcom-essential' ), value: 'fadeIn' },
	{ label: __( 'Slide Up', 'wbcom-essential' ), value: 'slideUp' },
	{ label: __( 'Slide Down', 'wbcom-essential' ), value: 'slideDown' },
	{ label: __( 'Zoom In', 'wbcom-essential' ), value: 'zoomIn' },
	{ label: __( 'Flip', 'wbcom-essential' ), value: 'flip' },
	{ label: __( 'Typing', 'wbcom-essential' ), value: 'typing' },
];

const TAG_OPTIONS = [
	{ label: 'H1', value: 'h1' },
	{ label: 'H2', value: 'h2' },
	{ label: 'H3', value: 'h3' },
	{ label: 'H4', value: 'h4' },
	{ label: 'H5', value: 'h5' },
	{ label: 'H6', value: 'h6' },
	{ label: 'Div', value: 'div' },
	{ label: 'Span', value: 'span' },
	{ label: 'P', value: 'p' },
];

export default function Edit( { attributes, setAttributes } ) {
	const {
		prefixText,
		rotatingTexts,
		suffixText,
		htmlTag,
		textAlign,
		animation,
		duration,
		textColor,
		rotatingTextColor,
		rotatingTextBg,
	} = attributes;

	const [ activeIndex, setActiveIndex ] = useState( 0 );

	// Preview rotation in editor
	useEffect( () => {
		if ( rotatingTexts.length <= 1 ) return;

		const interval = setInterval( () => {
			setActiveIndex( ( prev ) => ( prev + 1 ) % rotatingTexts.length );
		}, duration );

		return () => clearInterval( interval );
	}, [ rotatingTexts.length, duration ] );

	const blockProps = useBlockProps( {
		className: 'wbcom-essential-text-rotator',
		style: {
			textAlign,
			'--text-color': textColor || undefined,
			'--rotating-color': rotatingTextColor || undefined,
			'--rotating-bg': rotatingTextBg || undefined,
		},
	} );

	const TagName = htmlTag;

	const addRotatingText = () => {
		const newId = `text-${ Date.now() }`;
		setAttributes( {
			rotatingTexts: [
				...rotatingTexts,
				{ id: newId, text: __( 'New Text', 'wbcom-essential' ) },
			],
		} );
	};

	const updateRotatingText = ( index, text ) => {
		const updated = [ ...rotatingTexts ];
		updated[ index ] = { ...updated[ index ], text };
		setAttributes( { rotatingTexts: updated } );
	};

	const removeRotatingText = ( index ) => {
		if ( rotatingTexts.length <= 1 ) return;
		const updated = rotatingTexts.filter( ( _, i ) => i !== index );
		setAttributes( { rotatingTexts: updated } );
		if ( activeIndex >= updated.length ) {
			setActiveIndex( 0 );
		}
	};

	const moveRotatingText = ( index, direction ) => {
		const newIndex = index + direction;
		if ( newIndex < 0 || newIndex >= rotatingTexts.length ) return;
		const updated = [ ...rotatingTexts ];
		[ updated[ index ], updated[ newIndex ] ] = [
			updated[ newIndex ],
			updated[ index ],
		];
		setAttributes( { rotatingTexts: updated } );
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( value ) =>
						setAttributes( { textAlign: value } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody
					title={ __( 'Content', 'wbcom-essential' ) }
					initialOpen={ true }
				>
					<TextControl
						label={ __( 'Prefix Text', 'wbcom-essential' ) }
						value={ prefixText }
						onChange={ ( value ) =>
							setAttributes( { prefixText: value } )
						}
					/>

					<div className="wbcom-repeater-control">
						<label className="components-base-control__label">
							{ __( 'Rotating Texts', 'wbcom-essential' ) }
						</label>
						{ rotatingTexts.map( ( item, index ) => (
							<div
								key={ item.id }
								className="wbcom-repeater-item"
							>
								<TextControl
									value={ item.text }
									onChange={ ( value ) =>
										updateRotatingText( index, value )
									}
									placeholder={ __(
										'Enter text...',
										'wbcom-essential'
									) }
								/>
								<div className="wbcom-repeater-actions">
									<Button
										icon="arrow-up-alt2"
										disabled={ index === 0 }
										onClick={ () =>
											moveRotatingText( index, -1 )
										}
										label={ __(
											'Move up',
											'wbcom-essential'
										) }
										size="small"
									/>
									<Button
										icon="arrow-down-alt2"
										disabled={
											index === rotatingTexts.length - 1
										}
										onClick={ () =>
											moveRotatingText( index, 1 )
										}
										label={ __(
											'Move down',
											'wbcom-essential'
										) }
										size="small"
									/>
									<Button
										icon="trash"
										isDestructive
										disabled={ rotatingTexts.length <= 1 }
										onClick={ () =>
											removeRotatingText( index )
										}
										label={ __(
											'Remove',
											'wbcom-essential'
										) }
										size="small"
									/>
								</div>
							</div>
						) ) }
						<Button
							variant="secondary"
							onClick={ addRotatingText }
							className="wbcom-repeater-add"
						>
							{ __( 'Add Text', 'wbcom-essential' ) }
						</Button>
					</div>

					<TextControl
						label={ __( 'Suffix Text', 'wbcom-essential' ) }
						value={ suffixText }
						onChange={ ( value ) =>
							setAttributes( { suffixText: value } )
						}
					/>

					<SelectControl
						label={ __( 'HTML Tag', 'wbcom-essential' ) }
						value={ htmlTag }
						options={ TAG_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { htmlTag: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Animation', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Animation Type', 'wbcom-essential' ) }
						value={ animation }
						options={ ANIMATION_OPTIONS }
						onChange={ ( value ) =>
							setAttributes( { animation: value } )
						}
					/>

					<RangeControl
						label={ __( 'Duration (ms)', 'wbcom-essential' ) }
						value={ duration }
						onChange={ ( value ) =>
							setAttributes( { duration: value } )
						}
						min={ 500 }
						max={ 10000 }
						step={ 100 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ColorControl
						label={ __( 'Text Color', 'wbcom-essential' ) }
						value={ textColor }
						onChange={ ( value ) =>
							setAttributes( { textColor: value } )
						}
					/>

					<ColorControl
						label={ __(
							'Rotating Text Color',
							'wbcom-essential'
						) }
						value={ rotatingTextColor }
						onChange={ ( value ) =>
							setAttributes( { rotatingTextColor: value } )
						}
					/>

					<ColorControl
						label={ __(
							'Rotating Text Background',
							'wbcom-essential'
						) }
						value={ rotatingTextBg }
						onChange={ ( value ) =>
							setAttributes( { rotatingTextBg: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<TagName className="wbcom-text-rotator-wrapper">
					{ prefixText && (
						<span className="wbcom-text-rotator-prefix">
							{ prefixText }{ ' ' }
						</span>
					) }
					<span
						className={ `wbcom-text-rotator-rotating wbcom-animation-${ animation }` }
					>
						{ rotatingTexts[ activeIndex ]?.text || '' }
					</span>
					{ suffixText && (
						<span className="wbcom-text-rotator-suffix">
							{ ' ' }{ suffixText }
						</span>
					) }
				</TagName>
			</div>
		</>
	);
}
