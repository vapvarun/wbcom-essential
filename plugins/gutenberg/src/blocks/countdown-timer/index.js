/**
 * Countdown Timer Block
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
			numberColor: '#1e1e2e',
			labelColor: '#6c757d',
			boxBg: '#f8f9fa',
			boxBorderColor: '#e9ecef',
		} ),
	],
} );
