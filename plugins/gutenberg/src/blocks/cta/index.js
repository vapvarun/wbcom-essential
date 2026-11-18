/**
 * CTA Section Block
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
		// Saved by 4.7.2: neutral colours already empty, button colours still fixed.
		legacyColorDeprecation( metadata, save, null, true ),
		// Saved before 4.7.2: every colour fixed.
		legacyColorDeprecation( metadata, save ),
	],
} );
