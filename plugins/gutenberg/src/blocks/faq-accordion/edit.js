import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	Button,
	ColorPicker,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { items, firstOpen, allowMultiple, accentColor, iconStyle } =
		attributes;

	const updateItem = ( index, key, value ) => {
		const updated = [ ...items ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { items: updated } );
	};

	const addItem = () => {
		setAttributes( {
			items: [ ...items, { question: '', answer: '' } ],
		} );
	};

	const removeItem = ( index ) => {
		setAttributes( { items: items.filter( ( _, i ) => i !== index ) } );
	};

	const blockProps = useBlockProps( {
		className: 'wbe-faq',
	} );

	const iconChar = iconStyle === 'chevron' ? '\u203A' : '+';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings', 'wbcom-essential' ) }>
					<ToggleControl
						label={ __(
							'First Item Open by Default',
							'wbcom-essential'
						) }
						checked={ firstOpen }
						onChange={ ( val ) =>
							setAttributes( { firstOpen: val } )
						}
					/>
					<ToggleControl
						label={ __(
							'Allow Multiple Open',
							'wbcom-essential'
						) }
						checked={ allowMultiple }
						onChange={ ( val ) =>
							setAttributes( { allowMultiple: val } )
						}
					/>
					<SelectControl
						label={ __( 'Icon Style', 'wbcom-essential' ) }
						value={ iconStyle }
						options={ [
							{ label: 'Plus / Minus', value: 'plus' },
							{ label: 'Chevron', value: 'chevron' },
						] }
						onChange={ ( val ) =>
							setAttributes( { iconStyle: val } )
						}
					/>
					<p className="components-base-control__label">
						{ __( 'Accent Color', 'wbcom-essential' ) }
					</p>
					<ColorPicker
						color={ accentColor }
						onChangeComplete={ ( val ) =>
							setAttributes( { accentColor: val.hex } )
						}
						disableAlpha
					/>
				</PanelBody>
				{ items.map( ( item, i ) => (
					<PanelBody
						key={ i }
						title={
							item.question || `Question ${ i + 1 }`
						}
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Question', 'wbcom-essential' ) }
							value={ item.question }
							onChange={ ( val ) =>
								updateItem( i, 'question', val )
							}
						/>
						<TextareaControl
							label={ __( 'Answer', 'wbcom-essential' ) }
							value={ item.answer }
							onChange={ ( val ) =>
								updateItem( i, 'answer', val )
							}
							rows={ 4 }
						/>
						{ items.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeItem( i ) }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addItem }>
						{ __( 'Add Question', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				{ items.map( ( item, i ) => (
					<div
						key={ i }
						className={ `wbe-faq__item${
							firstOpen && i === 0 ? ' is-open' : ''
						}` }
					>
						<button
							className="wbe-faq__question"
							style={ { color: accentColor } }
						>
							<span>{ item.question || __( 'Question...', 'wbcom-essential' ) }</span>
							<span className="wbe-faq__icon">
								{ firstOpen && i === 0
									? iconStyle === 'chevron'
										? '\u2039'
										: '\u2212'
									: iconChar }
							</span>
						</button>
						<div
							className="wbe-faq__answer"
							style={ {
								display:
									firstOpen && i === 0
										? 'block'
										: 'none',
							} }
						>
							<p>{ item.answer }</p>
						</div>
					</div>
				) ) }
			</div>
		</>
	);
}
