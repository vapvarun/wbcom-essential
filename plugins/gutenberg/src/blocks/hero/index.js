/**
 * Hero Section Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';

import './style.css';
import './editor.css';

import Edit from './edit';
import save from './save';
import metadata from './block.json';

/*
 * Until 4.7.3 the default gradient was #667eea -> #764ba2 with an 80% white subheading, which failed AA
 * (2.93:1). Heroes saved with those defaults validate here. On the default background they move to the new,
 * darker defaults; a hero on the owner's own background keeps its old subheading colour, so its look is
 * unchanged. BlockRegistrar.php makes the same swap at render time for pages nobody reopens.
 */
const OLD_DEFAULTS = {
	gradientStart: '#667eea',
	gradientEnd: '#764ba2',
	subheadingColor: 'rgba(255,255,255,0.8)',
};

const oldDefaultColours = {
	attributes: {
		...metadata.attributes,
		...Object.fromEntries(
			Object.entries( OLD_DEFAULTS ).map( ( [ name, value ] ) => [
				name,
				{ ...metadata.attributes[ name ], default: value },
			] )
		),
	},
	supports: metadata.supports,
	save,
	migrate( attrs ) {
		// An unset object attribute (backgroundImage) parses here as {}; drop it so it stays unset on save.
		const attributes = Object.fromEntries(
			Object.entries( attrs ).filter(
				( [ , value ] ) => ! ( value && 'object' === typeof value && ! Array.isArray( value ) && ! Object.keys( value ).length )
			)
		);
		const onDefaultBackground =
			'gradient' === attributes.backgroundType &&
			OLD_DEFAULTS.gradientStart === attributes.gradientStart &&
			OLD_DEFAULTS.gradientEnd === attributes.gradientEnd;
		if ( ! onDefaultBackground ) {
			return attributes;
		}
		const migrated = {
			...attributes,
			gradientStart: metadata.attributes.gradientStart.default,
			gradientEnd: metadata.attributes.gradientEnd.default,
		};
		if ( OLD_DEFAULTS.subheadingColor === attributes.subheadingColor ) {
			migrated.subheadingColor = metadata.attributes.subheadingColor.default;
		}
		return migrated;
	},
};

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated: [ oldDefaultColours ],
} );
