/**
 * Progress Bar Block - Editor Component
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
	RangeControl,
	SelectControl,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		title,
		percent,
		displayPercent,
		showStripes,
		animateStripes,
		animationDuration,
		scrollAnimation,
		barHeight,
		borderRadius,
		barColor,
		barBackground,
		titleColor,
		percentColor,
		percentOutColor,
		innerBorderRadius,
		boxShadow,
		backgroundHeight,
	} = attributes;

	const wrapperClasses = [
		'wbcom-essential-progress-bar',
		useThemeColors ? 'use-theme-colors' : '',
	].filter( Boolean ).join( ' ' );

	const blockProps = useBlockProps( {
		className: wrapperClasses,
	} );

	const wrapperStyle = {
		backgroundColor: barBackground,
		borderRadius: `${ borderRadius }px`,
		height: `${ backgroundHeight }px`,
		boxShadow: boxShadow ? 'inset 0 1px 3px rgba(0, 0, 0, 0.15)' : 'none',
	};

	const barStyle = {
		width: `${ percent }%`,
		backgroundColor: barColor,
		borderRadius: `${ innerBorderRadius }px`,
		height: `${ barHeight }px`,
	};

	const stripesClass = showStripes
		? animateStripes
			? ' has-stripes stripes-animated'
			: ' has-stripes'
		: '';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'wbcom-essential' ) }>
					<TextControl
						label={ __( 'Title', 'wbcom-essential' ) }
						value={ title }
						onChange={ ( value ) =>
							setAttributes( { title: value } )
						}
					/>
					<RangeControl
						label={ __( 'Percentage', 'wbcom-essential' ) }
						value={ percent }
						onChange={ ( value ) =>
							setAttributes( { percent: value } )
						}
						min={ 0 }
						max={ 100 }
					/>
					<SelectControl
						label={ __( 'Display Percentage', 'wbcom-essential' ) }
						value={ displayPercent }
						options={ [
							{ label: __( 'Inside Bar', 'wbcom-essential' ), value: 'in' },
							{ label: __( 'Outside Bar', 'wbcom-essential' ), value: 'out' },
							{ label: __( 'Hidden', 'wbcom-essential' ), value: 'hidden' },
						] }
						onChange={ ( value ) =>
							setAttributes( { displayPercent: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Animation', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show Stripes', 'wbcom-essential' ) }
						checked={ showStripes }
						onChange={ ( value ) =>
							setAttributes( { showStripes: value } )
						}
					/>
					{ showStripes && (
						<ToggleControl
							label={ __( 'Animate Stripes', 'wbcom-essential' ) }
							checked={ animateStripes }
							onChange={ ( value ) =>
								setAttributes( { animateStripes: value } )
							}
						/>
					) }
					<ToggleControl
						label={ __( 'Animate on Scroll', 'wbcom-essential' ) }
						checked={ scrollAnimation }
						onChange={ ( value ) =>
							setAttributes( { scrollAnimation: value } )
						}
						help={ __(
							'Bar animates when it comes into view',
							'wbcom-essential'
						) }
					/>
					{ scrollAnimation && (
						<RangeControl
							label={ __( 'Animation Duration (ms)', 'wbcom-essential' ) }
							value={ animationDuration }
							onChange={ ( value ) =>
								setAttributes( { animationDuration: value } )
							}
							min={ 100 }
							max={ 5000 }
							step={ 100 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Dimensions', 'wbcom-essential' ) }
					initialOpen={ false }
				>
					<RangeControl
						label={ __( 'Background Height', 'wbcom-essential' ) }
						value={ backgroundHeight }
						onChange={ ( value ) =>
							setAttributes( { backgroundHeight: value } )
						}
						min={ 4 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Bar Height', 'wbcom-essential' ) }
						value={ barHeight }
						onChange={ ( value ) =>
							setAttributes( { barHeight: value } )
						}
						min={ 4 }
						max={ 100 }
					/>
					<RangeControl
						label={ __( 'Background Radius', 'wbcom-essential' ) }
						value={ borderRadius }
						onChange={ ( value ) =>
							setAttributes( { borderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Bar Radius', 'wbcom-essential' ) }
						value={ innerBorderRadius }
						onChange={ ( value ) =>
							setAttributes( { innerBorderRadius: value } )
						}
						min={ 0 }
						max={ 50 }
					/>
					<ToggleControl
						label={ __( 'Inset Shadow', 'wbcom-essential' ) }
						checked={ boxShadow }
						onChange={ ( value ) =>
							setAttributes( { boxShadow: value } )
						}
						help={ __( 'Add subtle inset shadow to the background', 'wbcom-essential' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Colors', 'wbcom-essential' ) }
					initialOpen={ false }
				>
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
							<p className="components-base-control__label">
								{ __( 'Bar Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ barColor }
								onChange={ ( value ) =>
									setAttributes( { barColor: value } )
								}
							/>

							<p className="components-base-control__label">
								{ __( 'Background Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ barBackground }
								onChange={ ( value ) =>
									setAttributes( { barBackground: value } )
								}
							/>

							<p className="components-base-control__label">
								{ __( 'Title Color', 'wbcom-essential' ) }
							</p>
							<ColorPalette
								value={ titleColor }
								onChange={ ( value ) =>
									setAttributes( { titleColor: value } )
								}
							/>

							{ displayPercent === 'in' && (
								<>
									<p className="components-base-control__label">
										{ __( 'Percentage Color (Inside)', 'wbcom-essential' ) }
									</p>
									<ColorPalette
										value={ percentColor }
										onChange={ ( value ) =>
											setAttributes( { percentColor: value } )
										}
									/>
								</>
							) }

							{ displayPercent === 'out' && (
								<>
									<p className="components-base-control__label">
										{ __( 'Percentage Color (Outside)', 'wbcom-essential' ) }
									</p>
									<ColorPalette
										value={ percentOutColor }
										onChange={ ( value ) =>
											setAttributes( { percentOutColor: value } )
										}
									/>
								</>
							) }
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="wbcom-progress-bar-header">
					{ title && (
						<span
							className="wbcom-progress-bar-title"
							style={ { color: titleColor } }
						>
							{ title }
						</span>
					) }
					{ displayPercent === 'out' && (
						<span
							className="wbcom-progress-bar-percent-out"
							style={ { color: percentOutColor } }
						>
							{ percent }%
						</span>
					) }
				</div>
				<div className="wbcom-progress-bar-wrapper" style={ wrapperStyle }>
					<div
						className={ `wbcom-progress-bar-fill${ stripesClass }` }
						style={ barStyle }
					>
						{ displayPercent === 'in' && (
							<span
								className="wbcom-progress-bar-percent-in"
								style={ { color: percentColor } }
							>
								{ percent }%
							</span>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
