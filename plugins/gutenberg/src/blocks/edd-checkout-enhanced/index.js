/**
 * EDD Enhanced Checkout Block
 *
 * @package wbcom-essential
 */

import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	/*
	 * Server-side rendered via render.php, but save() still has to emit the
	 * inner blocks so `wp:edd/checkout` ends up in post_content. EDD reads
	 * post_content — not our rendered output — to decide whether the page is a
	 * block checkout, so an empty save() puts it back on the legacy shortcode
	 * path and re-creates the stacked login/registration bug.
	 */
	save: () => <InnerBlocks.Content />,
	deprecated: [
		{
			// 4.6.x and earlier wrapped EDD's checkout SHORTCODE from render.php
			// and saved nothing. Keeps those pages from tripping block
			// validation before the 4.7.0 upgrade routine rewrites them.
			attributes: metadata.attributes,
			supports: metadata.supports,
			save: () => null,
		},
	],
} );
