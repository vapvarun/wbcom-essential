/**
 * FAQ Accordion Block
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
			questionColor: '#1e1e2e',
			answerColor: '#6c757d',
			questionBg: '#f8f9fa',
			borderColor: '#e9ecef',
		} ),
	],
} );
