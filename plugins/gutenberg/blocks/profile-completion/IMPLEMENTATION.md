# Profile Completion Block - Complete Implementation Guide

This document contains all the code for the remaining files needed for the Profile Completion block.

## File: src/index.js

```javascript
/**
 * Profile Completion Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
} );
```

## File: src/save.js

```javascript
/**
 * Save component - returns null for server-side rendered blocks.
 */
export default function save() {
	return null;
}
```

## File: src/edit.js

```javascript
import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
	ColorPicker,
	Notice,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';
import ServerSideRender from '@wordpress/server-side-render';

export default function Edit( { attributes, setAttributes } ) {
	const {
		skinStyle,
		alignment,
		profilePhoto,
		coverPhoto,
		profileGroups,
		hideWidget,
		showProfileBtn,
		headingText,
		completionText,
		completionButtonText,
		editButtonText,
		showHeading,
		showCompletionIcon,
		showCompletionStatus,
		boxWidth,
		boxBgColor,
		boxBorderStyle,
		boxBorderWidth,
		borderColor,
		boxBorderRadius,
		progressSpacing,
		progressBorderWidth,
		headingColor,
		completionColor,
		incompleteColor,
		ringBorderColor,
		ringNumColor,
		ringTextColor,
		detailsColor,
		buttonColor,
		buttonBgColor,
		buttonBorderColor,
		buttonColorHover,
		buttonBgColorHover,
		buttonBorderColorHover,
		buttonPadding,
		buttonBorderWidth,
		buttonBorderRadius,
		buttonSpacing,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'wp-block-wbcom-essential-profile-completion',
	} );

	// Check if BuddyPress is available
	const isBuddyPressActive = typeof window.wp !== 'undefined' && 
	                           typeof window.wp.apiFetch !== 'undefined';

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Layout', 'wbcom-essential' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Skin Style', 'wbcom-essential' ) }
						value={ skinStyle }
						options={ [
							{ label: __( 'Circle', 'wbcom-essential' ), value: 'circle' },
							{ label: __( 'Linear', 'wbcom-essential' ), value: 'linear' },
						] }
						onChange={ ( value ) => setAttributes( { skinStyle: value } ) }
					/>

					<SelectControl
						label={ __( 'Alignment', 'wbcom-essential' ) }
						value={ alignment }
						options={ [
							{ label: __( 'Left', 'wbcom-essential' ), value: 'left' },
							{ label: __( 'Center', 'wbcom-essential' ), value: 'center' },
							{ label: __( 'Right', 'wbcom-essential' ), value: 'right' },
						] }
						onChange={ ( value ) => setAttributes( { alignment: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Profile Photo', 'wbcom-essential' ) }
						checked={ profilePhoto }
						onChange={ ( value ) => setAttributes( { profilePhoto: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Cover Photo', 'wbcom-essential' ) }
						checked={ coverPhoto }
						onChange={ ( value ) => setAttributes( { coverPhoto: value } ) }
					/>

					<ToggleControl
						label={ __( 'Hide Widget at 100%', 'wbcom-essential' ) }
						help={ __( 'Hide widget once progress hits 100%', 'wbcom-essential' ) }
						checked={ hideWidget }
						onChange={ ( value ) => setAttributes( { hideWidget: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Profile Complete Button', 'wbcom-essential' ) }
						checked={ showProfileBtn }
						onChange={ ( value ) => setAttributes( { showProfileBtn: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Content', 'wbcom-essential' ) } initialOpen={ false }>
					{ skinStyle === 'linear' && (
						<TextControl
							label={ __( 'Heading Text', 'wbcom-essential' ) }
							value={ headingText }
							onChange={ ( value ) => setAttributes( { headingText: value } ) }
						/>
					) }

					<TextControl
						label={ __( 'Completion Text', 'wbcom-essential' ) }
						value={ completionText }
						onChange={ ( value ) => setAttributes( { completionText: value } ) }
					/>

					{ showProfileBtn && (
						<>
							<TextControl
								label={ __( 'Complete Profile Button Text', 'wbcom-essential' ) }
								help={ __( 'Button text if progress is less than 100%', 'wbcom-essential' ) }
								value={ completionButtonText }
								onChange={ ( value ) => setAttributes( { completionButtonText: value } ) }
							/>

							<TextControl
								label={ __( 'Edit Profile Button Text', 'wbcom-essential' ) }
								help={ __( 'Button text once progress hits 100%', 'wbcom-essential' ) }
								value={ editButtonText }
								onChange={ ( value ) => setAttributes( { editButtonText: value } ) }
							/>
						</>
					) }
				</PanelBody>

				{ skinStyle === 'linear' && (
					<PanelBody title={ __( 'Box', 'wbcom-essential' ) } initialOpen={ false }>
						<RangeControl
							label={ __( 'Width (%)', 'wbcom-essential' ) }
							value={ boxWidth }
							onChange={ ( value ) => setAttributes( { boxWidth: value } ) }
							min={ 20 }
							max={ 100 }
						/>

						<p><strong>{ __( 'Background Color', 'wbcom-essential' ) }</strong></p>
						<ColorPicker
							color={ boxBgColor }
							onChangeComplete={ ( value ) => setAttributes( { boxBgColor: value.hex } ) }
						/>

						<SelectControl
							label={ __( 'Border Type', 'wbcom-essential' ) }
							value={ boxBorderStyle }
							options={ [
								{ label: __( 'Solid', 'wbcom-essential' ), value: 'solid' },
								{ label: __( 'Dashed', 'wbcom-essential' ), value: 'dashed' },
								{ label: __( 'Dotted', 'wbcom-essential' ), value: 'dotted' },
								{ label: __( 'Double', 'wbcom-essential' ), value: 'double' },
								{ label: __( 'None', 'wbcom-essential' ), value: 'none' },
							] }
							onChange={ ( value ) => setAttributes( { boxBorderStyle: value } ) }
						/>

						<RangeControl
							label={ __( 'Border Width (px)', 'wbcom-essential' ) }
							value={ boxBorderWidth }
							onChange={ ( value ) => setAttributes( { boxBorderWidth: value } ) }
							min={ 0 }
							max={ 10 }
						/>

						<p><strong>{ __( 'Border Color', 'wbcom-essential' ) }</strong></p>
						<ColorPicker
							color={ borderColor }
							onChangeComplete={ ( value ) => setAttributes( { borderColor: value.hex } ) }
						/>

						<RangeControl
							label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
							value={ boxBorderRadius }
							onChange={ ( value ) => setAttributes( { boxBorderRadius: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					</PanelBody>
				) }

				<PanelBody title={ __( 'Progress Graph', 'wbcom-essential' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Progress Border Width (px)', 'wbcom-essential' ) }
						value={ progressBorderWidth }
						onChange={ ( value ) => setAttributes( { progressBorderWidth: value } ) }
						min={ 1 }
						max={ 10 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Colors', 'wbcom-essential' ) } initialOpen={ false }>
					{ skinStyle === 'linear' && (
						<>
							<p><strong>{ __( 'Heading Color', 'wbcom-essential' ) }</strong></p>
							<ColorPicker
								color={ headingColor }
								onChangeComplete={ ( value ) => setAttributes( { headingColor: value.hex } ) }
							/>
						</>
					) }

					<p><strong>{ __( 'Completion Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ completionColor }
						onChangeComplete={ ( value ) => setAttributes( { completionColor: value.hex } ) }
					/>

					<p><strong>{ __( 'Incomplete Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ incompleteColor }
						onChangeComplete={ ( value ) => setAttributes( { incompleteColor: value.hex } ) }
					/>

					<p><strong>{ __( 'Progress Border Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ ringBorderColor }
						onChangeComplete={ ( value ) => setAttributes( { ringBorderColor: value.hex } ) }
					/>

					<p><strong>{ __( 'Progress Number Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ ringNumColor }
						onChangeComplete={ ( value ) => setAttributes( { ringNumColor: value.hex } ) }
					/>

					<p><strong>{ __( 'Progress Text Color', 'wbcom-essential' ) }</strong></p>
					<ColorPicker
						color={ ringTextColor }
						onChangeComplete={ ( value ) => setAttributes( { ringTextColor: value.hex } ) }
					/>

					{ skinStyle === 'circle' && (
						<>
							<p><strong>{ __( 'Details Background Color', 'wbcom-essential' ) }</strong></p>
							<ColorPicker
								color={ detailsColor }
								onChangeComplete={ ( value ) => setAttributes( { detailsColor: value.hex } ) }
							/>
						</>
					) }
				</PanelBody>

				<PanelBody title={ __( 'Details Dropdown', 'wbcom-essential' ) } initialOpen={ false }>
					{ skinStyle === 'circle' && (
						<ToggleControl
							label={ __( 'Show Header', 'wbcom-essential' ) }
							checked={ showHeading }
							onChange={ ( value ) => setAttributes( { showHeading: value } ) }
						/>
					) }

					<ToggleControl
						label={ __( 'Show Completion Icon', 'wbcom-essential' ) }
						checked={ showCompletionIcon }
						onChange={ ( value ) => setAttributes( { showCompletionIcon: value } ) }
					/>

					<ToggleControl
						label={ __( 'Show Completion Status', 'wbcom-essential' ) }
						checked={ showCompletionStatus }
						onChange={ ( value ) => setAttributes( { showCompletionStatus: value } ) }
					/>
				</PanelBody>

				{ showProfileBtn && (
					<PanelBody title={ __( 'Button', 'wbcom-essential' ) } initialOpen={ false }>
						<p><strong>{ __( 'Normal State', 'wbcom-essential' ) }</strong></p>
						<p>{ __( 'Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonColor }
							onChangeComplete={ ( value ) => setAttributes( { buttonColor: value.hex } ) }
						/>

						<p>{ __( 'Background Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonBgColor }
							onChangeComplete={ ( value ) => setAttributes( { buttonBgColor: value.hex } ) }
						/>

						<p>{ __( 'Border Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonBorderColor }
							onChangeComplete={ ( value ) => setAttributes( { buttonBorderColor: value.hex } ) }
						/>

						<hr />
						<p><strong>{ __( 'Hover State', 'wbcom-essential' ) }</strong></p>
						<p>{ __( 'Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonColorHover }
							onChangeComplete={ ( value ) => setAttributes( { buttonColorHover: value.hex } ) }
						/>

						<p>{ __( 'Background Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonBgColorHover }
							onChangeComplete={ ( value ) => setAttributes( { buttonBgColorHover: value.hex } ) }
						/>

						<p>{ __( 'Border Color', 'wbcom-essential' ) }</p>
						<ColorPicker
							color={ buttonBorderColorHover }
							onChangeComplete={ ( value ) => setAttributes( { buttonBorderColorHover: value.hex } ) }
						/>

						<hr />
						<RangeControl
							label={ __( 'Border Width (px)', 'wbcom-essential' ) }
							value={ buttonBorderWidth }
							onChange={ ( value ) => setAttributes( { buttonBorderWidth: value } ) }
							min={ 0 }
							max={ 10 }
						/>

						<RangeControl
							label={ __( 'Border Radius (px)', 'wbcom-essential' ) }
							value={ buttonBorderRadius }
							onChange={ ( value ) => setAttributes( { buttonBorderRadius: value } ) }
							min={ 0 }
							max={ 100 }
						/>

						<RangeControl
							label={ __( 'Spacing (px)', 'wbcom-essential' ) }
							value={ buttonSpacing }
							onChange={ ( value ) => setAttributes( { buttonSpacing: value } ) }
							min={ 0 }
							max={ 50 }
						/>
					</PanelBody>
				) }
			</InspectorControls>

			<div className="wbcom-essential-profile-completion-preview">
				{ ! isBuddyPressActive ? (
					<Notice status="warning" isDismissible={ false }>
						{ __( 'BuddyPress is required for this block.', 'wbcom-essential' ) }
					</Notice>
				) : (
					<ServerSideRender
						block="wbcom-essential/profile-completion"
						attributes={ attributes }
					/>
				) }
			</div>
		</div>
	);
}
```

## File: src/view.js

```javascript
/**
 * Profile Completion Block Frontend Script
 */

( function() {
	'use strict';

	function initProfileCompletion() {
		const profileBits = document.querySelectorAll( '.wbcom-essential-profile-completion .profile_bit' );

		profileBits.forEach( ( profileBit ) => {
			let readyStateProfile = true;

			// Click handler
			profileBit.addEventListener( 'click', function( event ) {
				event.stopPropagation();

				const details = this.querySelector( '.profile_bit__details' );
				if ( ! details ) return;

				const isVisible = details.style.display === 'block';

				if ( ! isVisible && readyStateProfile ) {
					details.style.display = 'block';
					this.classList.add( 'active' );
					setTimeout( () => {
						readyStateProfile = false;
					}, 300 );
				} else if ( isVisible && ! readyStateProfile ) {
					details.style.display = 'none';
					this.classList.remove( 'active' );
					setTimeout( () => {
						readyStateProfile = true;
					}, 300 );
				}
			} );

			// Hover handler
			profileBit.addEventListener( 'mouseenter', function() {
				const details = this.querySelector( '.profile_bit__details' );
				if ( ! details ) return;

				const isVisible = details.style.display === 'block';

				if ( ! isVisible && readyStateProfile ) {
					details.style.display = 'block';
					this.classList.add( 'active' );
					setTimeout( () => {
						readyStateProfile = false;
					}, 300 );
				}
			} );

			profileBit.addEventListener( 'mouseleave', function() {
				const details = this.querySelector( '.profile_bit__details' );
				if ( ! details ) return;

				const isVisible = details.style.display === 'block';

				if ( isVisible && ! readyStateProfile ) {
					details.style.display = 'none';
					this.classList.remove( 'active' );
					setTimeout( () => {
						readyStateProfile = true;
					}, 300 );
				}
			} );
		} );
	}

	// Initialize on DOMContentLoaded
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', initProfileCompletion );
	} else {
		initProfileCompletion();
	}
} )();
```

## Next Steps

1. **Copy the Elementor CSS** from `/wp-content/plugins/wbcom-essential/plugins/elementor/assets/css/profile-completion.css` to `src/style.scss`

2. **Create editor.scss** with minimal editor-specific styles:
```scss
.wp-block-wbcom-essential-profile-completion {
	min-height: 200px;
}
```

3. **Build the block**:
```bash
npm run build
```

4. **Register in wbcom-gutenberg.php**:
Add this line to the file that registers all blocks:
```php
require_once WBCOM_ESSENTIAL_PATH . 'plugins/gutenberg/blocks/profile-completion/profile-completion.php';
```

5. **Test**:
- Create a new post/page
- Add the Profile Completion block
- Configure settings in sidebar
- Preview and test both circle and linear skins
- Test with logged-in and logged-out users

## Key Differences from Elementor

- Uses `ServerSideRender` for live preview in editor
- Attributes stored in block.json instead of PHP
- Frontend JavaScript uses vanilla JS instead of jQuery
- Styling applied via SCSS compilation
- BuddyPress detection happens at registration time

## CSS Import Note

The original CSS file is 2700+ lines with extensive keyframe animations (0-100%). This should be copied directly to `style.scss` and adapted to use SCSS variables for customization.

## Profile Groups Attribute

Unlike Elementor which dynamically creates controls for each group, the Gutenberg block stores enabled groups in a `profileGroups` object attribute like:
```javascript
{
	"1": true,
	"2": false,
	"3": true
}
```

This can be extended in the future to add a custom control for selecting profile groups dynamically.
