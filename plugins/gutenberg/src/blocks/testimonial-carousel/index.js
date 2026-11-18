/**
 * Testimonial Carousel Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';

import './style.css';
import './editor.css';

import Edit from './edit';
import save from './save';
import { legacyColorDeprecation } from '../../shared/utils/legacy-colors';
import metadata from './block.json';

registerBlockType( metadata.name, {
	edit: Edit,
	save,
	deprecated: [
		// Saved after the neutral colours moved to the theme, with the old fixed accent.
		legacyColorDeprecation( metadata, save, {
			accentColor: '#667eea',
		} ),
		// Saved before that, with every colour at its old fixed default.
		legacyColorDeprecation( metadata, save ),
	],
} );
