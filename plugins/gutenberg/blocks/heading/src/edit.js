/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `editor` keyword are bundled together. The code used
 * gets applied to the editor.
 */
import './editor.scss';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * WordPress components
 */
import { ColorPicker, BaseControl, TextareaControl, SelectControl, TextControl, ToggleControl, RangeControl, PanelBody } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 *
 * @param {Object} props Props.
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		useThemeColors,
		headingText,
		htmlTag,
		link,
		titleColor,
		typography,
		textShadow,
		blendMode,
		flexDirection,
		textAlign,
		maxWidth,
		margin,
		padding,
		gradientHeading,
		gradientColorStart,
		gradientColorEnd,
		gradientType,
		gradientDirection,
		rotateSwitch,
		textRotate,
		beforeLine,
		afterLine,
	} = attributes;

  const blockProps = useBlockProps( {
    className: `wp-block-wbcom-essential-heading${ useThemeColors ? ' use-theme-colors' : '' }`,
  } );

  // Wrapper styles (layout, spacing)
  const wrapperStyles = {
    flexDirection: flexDirection,
    textAlign: textAlign,
    maxWidth: maxWidth.value ? `${maxWidth.value}${maxWidth.unit}` : undefined,
    margin: `${margin.top}${margin.unit} ${margin.right}${margin.unit} ${margin.bottom}${margin.unit} ${margin.left}${margin.unit}`,
    padding: `${padding.top}${padding.unit} ${padding.right}${padding.unit} ${padding.bottom}${padding.unit} ${padding.left}${padding.unit}`,
  };

	// Generate gradient CSS
	let gradientCSS = undefined;
	if (gradientHeading && gradientColorStart && gradientColorEnd) {
		if (gradientType === 'linear') {
			gradientCSS = `linear-gradient(${gradientDirection}, ${gradientColorStart}, ${gradientColorEnd})`;
		} else if (gradientType === 'radial') {
			// For radial, use circle or ellipse
			const shape = gradientDirection.includes('circle') ? 'circle' : 'ellipse';
			gradientCSS = `radial-gradient(${shape} at center, ${gradientColorStart}, ${gradientColorEnd})`;
		}
	}

  // Heading styles (typography, colors, effects)
  const headingStyles = {
    ...(gradientHeading ? {} : {
      color: titleColor,
    }),
    mixBlendMode: blendMode,
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,
    textTransform: typography.textTransform,
    textDecoration: typography.textDecoration,
    textShadow: textShadow.horizontal || textShadow.vertical || textShadow.blur || textShadow.color
      ? `${textShadow.horizontal}px ${textShadow.vertical}px ${textShadow.blur}px ${textShadow.color}`
      : undefined,
    writingMode: rotateSwitch ? 'vertical-rl' : undefined,
    transform: rotateSwitch ? `rotate(${textRotate}deg)` : undefined,
  };

	// Apply gradient styles separately for better control
	if (gradientHeading && gradientCSS) {
		headingStyles.backgroundImage = gradientCSS;
		headingStyles.WebkitBackgroundClip = 'text';
		headingStyles.WebkitTextFillColor = 'transparent';
		headingStyles.backgroundClip = 'text';
	}

	// Before line styles
	const beforeLineStyles = {
		width: beforeLine.width.value ? `${beforeLine.width.value}${beforeLine.width.unit}` : undefined,
		minWidth: beforeLine.width.value ? `${beforeLine.width.value}${beforeLine.width.unit}` : undefined,
		height: beforeLine.height.value ? `${beforeLine.height.value}${beforeLine.height.unit}` : undefined,
		background: beforeLine.color,
		alignSelf: beforeLine.align,
	};

	// After line styles
	const afterLineStyles = {
		width: afterLine.width.value ? `${afterLine.width.value}${afterLine.width.unit}` : undefined,
		minWidth: afterLine.width.value ? `${afterLine.width.value}${afterLine.width.unit}` : undefined,
		height: afterLine.height.value ? `${afterLine.height.value}${afterLine.height.unit}` : undefined,
		background: afterLine.color,
		alignSelf: afterLine.align,
	};

	const HeadingTag = htmlTag;

	return (
		<>
            <InspectorControls>
              {/* Content Section */}
              <PanelBody title={ __( 'Content', 'wbcom-essential' ) }>
                <TextareaControl
                  label={ __( 'Heading Text', 'wbcom-essential' ) }
                  value={ headingText }
                  onChange={ ( value ) => setAttributes( { headingText: value } ) }
                  placeholder={ __( 'Enter your title', 'wbcom-essential' ) }
                />
                <SelectControl
                  label={ __( 'HTML Tag', 'wbcom-essential' ) }
                  value={ htmlTag }
                  options={ [
                    { label: 'H1', value: 'h1' },
                    { label: 'H2', value: 'h2' },
                    { label: 'H3', value: 'h3' },
                    { label: 'H4', value: 'h4' },
                    { label: 'H5', value: 'h5' },
                    { label: 'H6', value: 'h6' },
                    { label: 'div', value: 'div' },
                    { label: 'span', value: 'span' },
                    { label: 'p', value: 'p' },
                  ] }
                  onChange={ ( value ) => setAttributes( { htmlTag: value } ) }
                />
                <TextControl
                  label={ __( 'Link', 'wbcom-essential' ) }
                  value={ link.url }
                  onChange={ ( value ) => setAttributes( { link: { ...link, url: value } } ) }
                  placeholder={ __( 'https://example.com', 'wbcom-essential' ) }
                />
              </PanelBody>

              {/* Style Section */}
              <PanelBody title={ __( 'Style', 'wbcom-essential' ) }>
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
                    <hr />
                    <BaseControl label={ __( 'Text Color', 'wbcom-essential' ) }>
                      <ColorPicker
                        color={ titleColor }
                        onChange={ ( color ) => setAttributes( { titleColor: typeof color === 'object' ? color.color || color.hex || '' : color } ) }
                        enableAlpha
                      />
                    </BaseControl>
                  </>
                ) }

					{/* Typography */}
					<TextControl
						label={ __( 'Font Family', 'wbcom-essential' ) }
						value={ typography.fontFamily }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, fontFamily: value } } ) }
						placeholder={ __( 'e.g., Arial, sans-serif or "Open Sans", sans-serif', 'wbcom-essential' ) }
						help={ __( '⚠️ For Google Fonts/web fonts: Load them via theme/plugin first, then enter the exact font name here.', 'wbcom-essential' ) }
					/>
					<TextControl
						label={ __( 'Font Size', 'wbcom-essential' ) }
						value={ typography.fontSize }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, fontSize: value } } ) }
						placeholder={ __( 'e.g., 16px, 1.2em', 'wbcom-essential' ) }
					/>
					<SelectControl
						label={ __( 'Font Weight', 'wbcom-essential' ) }
						value={ typography.fontWeight }
						options={ [
							{ label: __( 'Default', 'wbcom-essential' ), value: '' },
							{ label: '100', value: '100' },
							{ label: '200', value: '200' },
							{ label: '300', value: '300' },
							{ label: '400', value: '400' },
							{ label: '500', value: '500' },
							{ label: '600', value: '600' },
							{ label: '700', value: '700' },
							{ label: '800', value: '800' },
							{ label: '900', value: '900' },
							{ label: __( 'Normal', 'wbcom-essential' ), value: 'normal' },
							{ label: __( 'Bold', 'wbcom-essential' ), value: 'bold' },
							{ label: __( 'Bolder', 'wbcom-essential' ), value: 'bolder' },
							{ label: __( 'Lighter', 'wbcom-essential' ), value: 'lighter' },
						] }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, fontWeight: value } } ) }
					/>
					<TextControl
						label={ __( 'Line Height', 'wbcom-essential' ) }
						value={ typography.lineHeight }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, lineHeight: value } } ) }
						placeholder={ __( 'e.g., 1.5, 1.2em', 'wbcom-essential' ) }
					/>
					<TextControl
						label={ __( 'Letter Spacing', 'wbcom-essential' ) }
						value={ typography.letterSpacing }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, letterSpacing: value } } ) }
						placeholder={ __( 'e.g., 1px, 0.1em', 'wbcom-essential' ) }
					/>
					<SelectControl
						label={ __( 'Text Transform', 'wbcom-essential' ) }
						value={ typography.textTransform }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: '' },
							{ label: __( 'Uppercase', 'wbcom-essential' ), value: 'uppercase' },
							{ label: __( 'Lowercase', 'wbcom-essential' ), value: 'lowercase' },
							{ label: __( 'Capitalize', 'wbcom-essential' ), value: 'capitalize' },
						] }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, textTransform: value } } ) }
					/>
					<SelectControl
						label={ __( 'Text Decoration', 'wbcom-essential' ) }
						value={ typography.textDecoration }
						options={ [
							{ label: __( 'None', 'wbcom-essential' ), value: '' },
							{ label: __( 'Underline', 'wbcom-essential' ), value: 'underline' },
							{ label: __( 'Line Through', 'wbcom-essential' ), value: 'line-through' },
							{ label: __( 'Overline', 'wbcom-essential' ), value: 'overline' },
						] }
						onChange={ ( value ) => setAttributes( { typography: { ...typography, textDecoration: value } } ) }
					/>
				</PanelBody>

				{/* Text Shadow Section */}
				<PanelBody title={ __( 'Text Shadow', 'wbcom-essential' ) }>
					<RangeControl
						label={ __( 'Horizontal Offset', 'wbcom-essential' ) }
						value={ textShadow.horizontal }
						onChange={ ( value ) => setAttributes( { textShadow: { ...textShadow, horizontal: value } } ) }
						min={ -50 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Vertical Offset', 'wbcom-essential' ) }
						value={ textShadow.vertical }
						onChange={ ( value ) => setAttributes( { textShadow: { ...textShadow, vertical: value } } ) }
						min={ -50 }
						max={ 50 }
					/>
					<RangeControl
						label={ __( 'Blur Radius', 'wbcom-essential' ) }
						value={ textShadow.blur }
						onChange={ ( value ) => setAttributes( { textShadow: { ...textShadow, blur: value } } ) }
						min={ 0 }
						max={ 50 }
					/>
					<BaseControl label={ __( 'Shadow Color', 'wbcom-essential' ) }>
						<ColorPicker
							color={ textShadow.color }
							onChange={ ( color ) => setAttributes( { textShadow: { ...textShadow, color: typeof color === 'object' ? color.color || color.hex || '' : color } } ) }
							enableAlpha
						/>
					</BaseControl>
				</PanelBody>

				{/* Advanced Section */}
				<PanelBody title={ __( 'Advanced', 'wbcom-essential' ) }>
                  {/* Blend mode */}
                  <SelectControl
                    label={ __( 'Blend Mode', 'wbcom-essential' ) }
                    value={ blendMode }
                    options={ [
                      { label: __( 'Normal', 'wbcom-essential' ), value: '' },
                      { label: 'Multiply', value: 'multiply' },
                      { label: 'Screen', value: 'screen' },
                      { label: 'Overlay', value: 'overlay' },
                      { label: 'Darken', value: 'darken' },
                      { label: 'Lighten', value: 'lighten' },
                      { label: 'Color Dodge', value: 'color-dodge' },
                      { label: 'Saturation', value: 'saturation' },
                      { label: 'Color', value: 'color' },
                      { label: 'Difference', value: 'difference' },
                      { label: 'Exclusion', value: 'exclusion' },
                      { label: 'Hue', value: 'hue' },
                      { label: 'Luminosity', value: 'luminosity' },
                    ] }
                    onChange={ ( value ) => setAttributes( { blendMode: value } ) }
                  />

                  {/* Layout */}
                  <SelectControl
                    label={ __( 'Layout', 'wbcom-essential' ) }
                    value={ flexDirection }
                    options={ [
                      { label: __( 'Vertical', 'wbcom-essential' ), value: 'column' },
                      { label: __( 'Horizontal', 'wbcom-essential' ), value: 'row' },
                    ] }
                    onChange={ ( value ) => setAttributes( { flexDirection: value } ) }
                  />

                  {/* Text align */}
                  <SelectControl
                    label={ __( 'Text Align', 'wbcom-essential' ) }
                    value={ textAlign }
                    options={ [
                      { label: __( 'Left', 'wbcom-essential' ), value: 'left' },
                      { label: __( 'Center', 'wbcom-essential' ), value: 'center' },
                      { label: __( 'Right', 'wbcom-essential' ), value: 'right' },
                    ] }
                    onChange={ ( value ) => setAttributes( { textAlign: value } ) }
                  />

                  {/* Gradient */}
                  <ToggleControl
                    label={ __( 'Gradient Heading', 'wbcom-essential' ) }
                    checked={ gradientHeading }
                    onChange={ ( value ) => setAttributes( { gradientHeading: value } ) }
                  />
                  { gradientHeading && (
                    <>
                      <BaseControl label={ __( 'Gradient Start Color', 'wbcom-essential' ) }>
                        <ColorPicker
                          color={ gradientColorStart }
                          onChange={ ( color ) => setAttributes( { gradientColorStart: typeof color === 'object' ? color.color || color.hex || '' : color } ) }
                          enableAlpha
                        />
                      </BaseControl>
                      <BaseControl label={ __( 'Gradient End Color', 'wbcom-essential' ) }>
                        <ColorPicker
                          color={ gradientColorEnd }
                          onChange={ ( color ) => setAttributes( { gradientColorEnd: typeof color === 'object' ? color.color || color.hex || '' : color } ) }
                          enableAlpha
                        />
                      </BaseControl>
                      <SelectControl
                        label={ __( 'Gradient Type', 'wbcom-essential' ) }
                        value={ gradientType }
                        options={ [
                          { label: __( 'Linear', 'wbcom-essential' ), value: 'linear' },
                          { label: __( 'Radial', 'wbcom-essential' ), value: 'radial' },
                        ] }
                        onChange={ ( value ) => setAttributes( { gradientType: value } ) }
                      />
                      { gradientType === 'linear' && (
                        <SelectControl
                          label={ __( 'Gradient Direction', 'wbcom-essential' ) }
                          value={ gradientDirection }
                          options={ [
                            { label: __( 'To Right', 'wbcom-essential' ), value: 'to right' },
                            { label: __( 'To Left', 'wbcom-essential' ), value: 'to left' },
                            { label: __( 'To Bottom', 'wbcom-essential' ), value: 'to bottom' },
                            { label: __( 'To Top', 'wbcom-essential' ), value: 'to top' },
                            { label: __( 'To Bottom Right', 'wbcom-essential' ), value: 'to bottom right' },
                            { label: __( 'To Bottom Left', 'wbcom-essential' ), value: 'to bottom left' },
                            { label: __( 'To Top Right', 'wbcom-essential' ), value: 'to top right' },
                            { label: __( 'To Top Left', 'wbcom-essential' ), value: 'to top left' },
                          ] }
                          onChange={ ( value ) => setAttributes( { gradientDirection: value } ) }
                        />
                      ) }
                      { gradientType === 'radial' && (
                        <SelectControl
                          label={ __( 'Gradient Shape', 'wbcom-essential' ) }
                          value={ gradientDirection }
                          options={ [
                            { label: __( 'Circle', 'wbcom-essential' ), value: 'circle at center' },
                            { label: __( 'Ellipse', 'wbcom-essential' ), value: 'ellipse at center' },
                          ] }
                          onChange={ ( value ) => setAttributes( { gradientDirection: value } ) }
                        />
                      ) }
                    </>
                  ) }

                  {/* Rotation */}
                  <ToggleControl
                    label={ __( 'Rotate Text', 'wbcom-essential' ) }
                    checked={ rotateSwitch }
                    onChange={ ( value ) => setAttributes( { rotateSwitch: value } ) }
                  />
                  { rotateSwitch && (
                    <RangeControl
                      label={ __( 'Rotation', 'wbcom-essential' ) }
                      value={ textRotate }
                      onChange={ ( value ) => setAttributes( { textRotate: value } ) }
                      min={ 0 }
                      max={ 360 }
                    />
                  ) }
				</PanelBody>

              {/* Before Line Section */}
              <PanelBody title={ __( 'Before', 'wbcom-essential' ) }>
                <RangeControl
                  label={ __( 'Width', 'wbcom-essential' ) }
                  value={ beforeLine.width.value }
                  onChange={ ( value ) => setAttributes( { beforeLine: { ...beforeLine, width: { ...beforeLine.width, value } } } ) }
                  min={ 0 }
                  max={ 1000 }
                />
                <RangeControl
                  label={ __( 'Height', 'wbcom-essential' ) }
                  value={ beforeLine.height.value }
                  onChange={ ( value ) => setAttributes( { beforeLine: { ...beforeLine, height: { ...beforeLine.height, value } } } ) }
                  min={ 0 }
                  max={ 1000 }
                />
                <ColorPicker
                  color={ beforeLine.color }
                  onChange={ ( color ) => setAttributes( { beforeLine: { ...beforeLine, color: typeof color === 'object' ? color.color || color.hex || '' : color } } ) }
                  enableAlpha
                />
              </PanelBody>

               {/* After Line Section */}
               <PanelBody title={ __( 'After', 'wbcom-essential' ) }>
                 <RangeControl
                   label={ __( 'Width', 'wbcom-essential' ) }
                   value={ afterLine.width.value }
                   onChange={ ( value ) => setAttributes( { afterLine: { ...afterLine, width: { ...afterLine.width, value } } } ) }
                   min={ 0 }
                   max={ 1000 }
                 />
                 <RangeControl
                   label={ __( 'Height', 'wbcom-essential' ) }
                   value={ afterLine.height.value }
                   onChange={ ( value ) => setAttributes( { afterLine: { ...afterLine, height: { ...afterLine.height, value } } } ) }
                   min={ 0 }
                   max={ 1000 }
                 />
                 <ColorPicker
                   color={ afterLine.color }
                   onChange={ ( color ) => setAttributes( { afterLine: { ...afterLine, color: typeof color === 'object' ? color.color || color.hex || '' : color } } ) }
                   enableAlpha
                 />
               </PanelBody>
			</InspectorControls>

          <div { ...blockProps }>
            <div className="wbcom-heading-wrapper" style={ wrapperStyles }>
              <HeadingTag
                className="wbcom-heading"
                style={ headingStyles }
              >
                { beforeLine.width.value > 0 && (
                  <span className="wbcom-heading-before" style={ beforeLineStyles }></span>
                ) }
                <span className="wbcom-heading-text">
                  { link.url ? (
                    <a href={ link.url } target={ link.isExternal ? '_blank' : undefined } rel={ link.nofollow ? 'nofollow' : undefined }>
                      { headingText }
                    </a>
                  ) : (
                    headingText
                  ) }
                </span>
                { afterLine.width.value > 0 && (
                  <span className="wbcom-heading-after" style={ afterLineStyles }></span>
                ) }
              </HeadingTag>
            </div>
          </div>
		</>
	);
}