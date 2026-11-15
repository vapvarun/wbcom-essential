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
		legacyColorDeprecation( metadata, save, {
			backgroundColor: '#f8f9fa',
			headingColor: '#1e1e2e',
			descriptionColor: '#6c757d',
		} ),
	],
} );
