import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	RangeControl,
	SelectControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { features, columns, cardStyle, iconSize, textAlign } = attributes;

	const updateFeature = ( index, key, value ) => {
		const updated = [ ...features ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { features: updated } );
	};

	const addFeature = () => {
		setAttributes( {
			features: [
				...features,
				{ icon: '⭐', title: '', description: '' },
			],
		} );
	};

	const removeFeature = ( index ) => {
		setAttributes( {
			features: features.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useBlockProps( {
		className: `wbe-features wbe-features--${ cardStyle }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Columns', 'wbcom-essential' ) }
						value={ columns }
						onChange={ ( val ) =>
							setAttributes( { columns: val } )
						}
						min={ 1 }
						max={ 4 }
					/>
					<SelectControl
						label={ __( 'Card Style', 'wbcom-essential' ) }
						value={ cardStyle }
						options={ [
							{ label: 'Bordered', value: 'bordered' },
							{ label: 'Shadow', value: 'shadow' },
							{ label: 'Flat', value: 'flat' },
						] }
						onChange={ ( val ) =>
							setAttributes( { cardStyle: val } )
						}
					/>
					<RangeControl
						label={ __( 'Icon Size (px)', 'wbcom-essential' ) }
						value={ iconSize }
						onChange={ ( val ) =>
							setAttributes( { iconSize: val } )
						}
						min={ 24 }
						max={ 80 }
					/>
					<SelectControl
						label={ __( 'Text Alignment', 'wbcom-essential' ) }
						value={ textAlign }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
						] }
						onChange={ ( val ) =>
							setAttributes( { textAlign: val } )
						}
					/>
				</PanelBody>
				{ features.map( ( f, i ) => (
					<PanelBody
						key={ i }
						title={ f.title || `Feature ${ i + 1 }` }
						initialOpen={ false }
					>
						<TextControl
							label={ __(
								'Icon (emoji or text)',
								'wbcom-essential'
							) }
							value={ f.icon }
							onChange={ ( val ) =>
								updateFeature( i, 'icon', val )
							}
						/>
						<TextControl
							label={ __( 'Title', 'wbcom-essential' ) }
							value={ f.title }
							onChange={ ( val ) =>
								updateFeature( i, 'title', val )
							}
						/>
						<TextareaControl
							label={ __( 'Description', 'wbcom-essential' ) }
							value={ f.description }
							onChange={ ( val ) =>
								updateFeature( i, 'description', val )
							}
							rows={ 3 }
						/>
						{ features.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeFeature( i ) }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addFeature }>
						{ __( 'Add Feature', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="wbe-features__grid"
					style={ {
						gridTemplateColumns: `repeat(${ columns }, 1fr)`,
						textAlign,
					} }
				>
					{ features.map( ( f, i ) => (
						<div key={ i } className="wbe-features__card">
							<span
								className="wbe-features__icon"
								style={ { fontSize: `${ iconSize }px` } }
							>
								{ f.icon }
							</span>
							<h3 className="wbe-features__title">
								{ f.title }
							</h3>
							<p className="wbe-features__description">
								{ f.description }
							</p>
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}
