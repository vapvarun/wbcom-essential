/**
 * Star Rating Block - Editor Component
 *
 * @package wbcom-essential
 */

import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	ColorPalette,
	Dashicon,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors, rating, maxRating, starSize, starGap, filledColor, emptyColor,
		alignment, showLabel, label, labelPosition, labelColor, labelSize,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `wbcom-essential-star-rating align-${ alignment } label-${ labelPosition }${ useThemeColors ? ' use-theme-colors' : '' }`,
		style: {
			'--star-size': `${ starSize }px`,
			'--star-gap': `${ starGap }px`,
			...( ! useThemeColors && {
				'--filled-color': filledColor || '#ffc107',
				'--empty-color': emptyColor || '#e0e0e0',
				'--label-color': labelColor || undefined,
			} ),
			'--label-size': `${ labelSize }px`,
		},
	} );

	const renderStars = () => {
		const stars = [];
		for ( let i = 1; i <= maxRating; i++ ) {
			const isFilled = i <= Math.floor( rating );
			const isHalf = ! isFilled && i - 0.5 <= rating;
			stars.push(
				<span
					key={ i }
					className={ `wbcom-essential-star-rating__star ${ isFilled ? 'filled' : isHalf ? 'half' : 'empty' }` }
				>
					<Dashicon icon="star-filled" />
				</span>
			);
		}
		return stars;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Rating Settings', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Rating', 'wbcom-essential' ) }
						value={ rating }
						onChange={ ( value ) => setAttributes( { rating: value } ) }
						min={ 0 }
						max={ maxRating }
						step={ 0.5 }
					/>
					<RangeControl
						label={ __( 'Max Stars', 'wbcom-essential' ) }
						value={ maxRating }
						onChange={ ( value ) => setAttributes( { maxRating: value } ) }
						min={ 1 }
						max={ 10 }
					/>
					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ value: 'left', label: __( 'Left', 'wbcom-essential' ) },
							{ value: 'center', label: __( 'Center', 'wbcom-essential' ) },
							{ value: 'right', label: __( 'Right', 'wbcom-essential' ) },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Style', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Use Theme Colors', 'wbcom-essential' ) }
						help={ useThemeColors
							? __( 'Colors inherit from your theme color palette.', 'wbcom-essential' )
							: __( 'Enable to use theme color scheme instead of custom colors.', 'wbcom-essential' )
						}
						checked={ useThemeColors }
						onChange={ ( value ) => setAttributes( { useThemeColors: value } ) }
					/>
					<RangeControl
						label={ __( 'Star Size', 'wbcom-essential' ) }
						value={ starSize }
						onChange={ ( value ) => setAttributes( { starSize: value } ) }
						min={ 12 }
						max={ 60 }
					/>
					<RangeControl
						label={ __( 'Star Gap', 'wbcom-essential' ) }
						value={ starGap }
						onChange={ ( value ) => setAttributes( { starGap: value } ) }
						min={ 0 }
						max={ 20 }
					/>
					{ ! useThemeColors && (
						<>
							<p>{ __( 'Filled Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ filledColor }
								onChange={ ( value ) => setAttributes( { filledColor: value } ) }
							/>
							<p>{ __( 'Empty Color', 'wbcom-essential' ) }</p>
							<ColorPalette
								value={ emptyColor }
								onChange={ ( value ) => setAttributes( { emptyColor: value } ) }
							/>
						</>
					) }
				</PanelBody>
				<PanelBody title={ __( 'Label', 'wbcom-essential' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Show Label', 'wbcom-essential' ) }
						checked={ showLabel }
						onChange={ ( value ) => setAttributes( { showLabel: value } ) }
					/>
					{ showLabel && (
						<>
							<SelectControl
								label={ __( 'Label Position', 'wbcom-essential' ) }
								value={ labelPosition }
								options={ [
									{ value: 'before', label: __( 'Before Stars', 'wbcom-essential' ) },
									{ value: 'after', label: __( 'After Stars', 'wbcom-essential' ) },
								] }
								onChange={ ( value ) => setAttributes( { labelPosition: value } ) }
							/>
							<RangeControl
								label={ __( 'Label Size', 'wbcom-essential' ) }
								value={ labelSize }
								onChange={ ( value ) => setAttributes( { labelSize: value } ) }
								min={ 10 }
								max={ 32 }
							/>
							{ ! useThemeColors && (
								<>
									<p>{ __( 'Label Color', 'wbcom-essential' ) }</p>
									<ColorPalette
										value={ labelColor }
										onChange={ ( value ) => setAttributes( { labelColor: value } ) }
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				{ showLabel && labelPosition === 'before' && (
					<RichText
						tagName="span"
						className="wbcom-essential-star-rating__label"
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						placeholder={ __( 'Label', 'wbcom-essential' ) }
					/>
				) }
				<div className="wbcom-essential-star-rating__stars">
					{ renderStars() }
				</div>
				{ showLabel && labelPosition === 'after' && (
					<RichText
						tagName="span"
						className="wbcom-essential-star-rating__label"
						value={ label }
						onChange={ ( value ) => setAttributes( { label: value } ) }
						placeholder={ `${ rating }/${ maxRating }` }
					/>
				) }
			</div>
		</>
	);
}
