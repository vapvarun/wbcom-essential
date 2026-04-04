import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	Button,
	ColorPicker,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const { tabs, accentColor, tabStyle } = attributes;
	const [ editorActive, setEditorActive ] = useState( 0 );

	const updateTab = ( index, key, value ) => {
		const updated = [ ...tabs ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { tabs: updated } );
	};

	const addTab = () => {
		setAttributes( {
			tabs: [ ...tabs, { title: `Tab ${ tabs.length + 1 }`, content: '' } ],
		} );
	};

	const removeTab = ( index ) => {
		setAttributes( { tabs: tabs.filter( ( _, i ) => i !== index ) } );
		if ( editorActive >= tabs.length - 1 ) {
			setEditorActive( Math.max( 0, tabs.length - 2 ) );
		}
	};

	const blockProps = useBlockProps( {
		className: `wbe-tabs wbe-tabs--${ tabStyle }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) }>
					<SelectControl
						label={ __( 'Tab Style', 'wbcom-essential' ) }
						value={ tabStyle }
						options={ [
							{ label: 'Underline', value: 'underline' },
							{ label: 'Boxed', value: 'boxed' },
						] }
						onChange={ ( val ) =>
							setAttributes( { tabStyle: val } )
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
				{ tabs.map( ( tab, i ) => (
					<PanelBody
						key={ i }
						title={ tab.title || `Tab ${ i + 1 }` }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Title', 'wbcom-essential' ) }
							value={ tab.title }
							onChange={ ( val ) =>
								updateTab( i, 'title', val )
							}
						/>
						<TextareaControl
							label={ __( 'Content', 'wbcom-essential' ) }
							value={ tab.content }
							onChange={ ( val ) =>
								updateTab( i, 'content', val )
							}
							rows={ 5 }
						/>
						{ tabs.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeTab( i ) }
							>
								{ __( 'Remove Tab', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addTab }>
						{ __( 'Add Tab', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbe-tabs__nav" role="tablist">
					{ tabs.map( ( tab, i ) => (
						<button
							key={ i }
							role="tab"
							className={ `wbe-tabs__tab${
								i === editorActive ? ' is-active' : ''
							}` }
							style={
								i === editorActive
									? { borderColor: accentColor, color: accentColor }
									: {}
							}
							onClick={ () => setEditorActive( i ) }
						>
							{ tab.title }
						</button>
					) ) }
				</div>
				<div className="wbe-tabs__panels">
					{ tabs.map( ( tab, i ) => (
						<div
							key={ i }
							className="wbe-tabs__panel"
							role="tabpanel"
							style={ {
								display: i === editorActive ? 'block' : 'none',
							} }
						>
							<p>{ tab.content || __( 'Tab content...', 'wbcom-essential' ) }</p>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
