import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	RangeControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { members, visibleCards, autoplay, autoplaySpeed } = attributes;

	const updateMember = ( index, key, value ) => {
		const updated = [ ...members ];
		updated[ index ] = { ...updated[ index ], [ key ]: value };
		setAttributes( { members: updated } );
	};

	const addMember = () => {
		setAttributes( {
			members: [
				...members,
				{ name: '', role: '', bio: '', photo: '' },
			],
		} );
	};

	const removeMember = ( index ) => {
		setAttributes( {
			members: members.filter( ( _, i ) => i !== index ),
		} );
	};

	const blockProps = useBlockProps( {
		className: 'wbe-team',
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Carousel Settings', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Visible Cards', 'wbcom-essential' ) }
						value={ visibleCards }
						onChange={ ( val ) =>
							setAttributes( { visibleCards: val } )
						}
						min={ 1 }
						max={ 5 }
					/>
					<ToggleControl
						label={ __( 'Autoplay', 'wbcom-essential' ) }
						checked={ autoplay }
						onChange={ ( val ) =>
							setAttributes( { autoplay: val } )
						}
					/>
					{ autoplay && (
						<RangeControl
							label={ __(
								'Speed (ms)',
								'wbcom-essential'
							) }
							value={ autoplaySpeed }
							onChange={ ( val ) =>
								setAttributes( { autoplaySpeed: val } )
							}
							min={ 2000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
				</PanelBody>
				{ members.map( ( m, i ) => (
					<PanelBody
						key={ i }
						title={ m.name || `Member ${ i + 1 }` }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Name', 'wbcom-essential' ) }
							value={ m.name }
							onChange={ ( val ) =>
								updateMember( i, 'name', val )
							}
						/>
						<TextControl
							label={ __( 'Role', 'wbcom-essential' ) }
							value={ m.role }
							onChange={ ( val ) =>
								updateMember( i, 'role', val )
							}
						/>
						<TextareaControl
							label={ __( 'Bio', 'wbcom-essential' ) }
							value={ m.bio }
							onChange={ ( val ) =>
								updateMember( i, 'bio', val )
							}
							rows={ 3 }
						/>
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) =>
									updateMember( i, 'photo', media.url )
								}
								allowedTypes={ [ 'image' ] }
								render={ ( { open } ) => (
									<Button
										onClick={ open }
										variant="secondary"
									>
										{ m.photo
											? __(
													'Replace Photo',
													'wbcom-essential'
											  )
											: __(
													'Add Photo',
													'wbcom-essential'
											  ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
						{ members.length > 1 && (
							<Button
								variant="link"
								isDestructive
								onClick={ () => removeMember( i ) }
								style={ { marginTop: '8px' } }
							>
								{ __( 'Remove', 'wbcom-essential' ) }
							</Button>
						) }
					</PanelBody>
				) ) }
				<PanelBody>
					<Button variant="secondary" onClick={ addMember }>
						{ __( 'Add Member', 'wbcom-essential' ) }
					</Button>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="wbe-team__grid"
					style={ {
						gridTemplateColumns: `repeat(${ visibleCards }, 1fr)`,
					} }
				>
					{ members.map( ( m, i ) => (
						<div key={ i } className="wbe-team__card">
							{ m.photo ? (
								<img
									className="wbe-team__photo"
									src={ m.photo }
									alt={ m.name }
								/>
							) : (
								<div className="wbe-team__photo-placeholder" />
							) }
							<h3 className="wbe-team__name">{ m.name }</h3>
							<span className="wbe-team__role">{ m.role }</span>
							<p className="wbe-team__bio">{ m.bio }</p>
						</div>
					) ) }
				</div>
				<p className="wbe-team__editor-note">
					{ __(
						'All members shown — carousel active on frontend.',
						'wbcom-essential'
					) }
				</p>
			</div>
		</>
	);
}
