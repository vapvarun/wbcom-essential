/**
 * Saved-markup snapshots for every static block.
 *
 * A static block's save() output is stored in post content. If it changes without a deprecation, every existing
 * block on every site shows "This block contains unexpected or invalid content" in the editor. These snapshots
 * turn that silent breakage into a failing test: a change to save() must either keep the markup identical or come
 * with a deprecation and a deliberately updated snapshot (npm run test:unit -- -u).
 *
 * save() is rendered with @wordpress/element. The two editor helpers save() uses get faithful stand-ins:
 * useBlockProps.save() passes the block's own props through (WordPress only adds the constant wp-block-* class),
 * and RichText.Content prints its value as raw HTML in its tag, as WordPress does.
 */

import { createElement, renderToString } from '@wordpress/element';

jest.mock(
	'@wordpress/block-editor',
	() => {
		const { createElement: el } = require( '@wordpress/element' );
		return {
			useBlockProps: { save: ( props = {} ) => props },
			RichText: {
				Content: ( { tagName = 'div', value = '', ...rest } ) =>
					el( tagName, { ...rest, dangerouslySetInnerHTML: { __html: value } } ),
			},
		};
	},
	{ virtual: true }
);

const STATIC_BLOCKS = [
	'countdown-timer',
	'cta',
	'faq-accordion',
	'feature-grid',
	'flip-box',
	'hero',
	'pricing-table',
	'progress-bar',
	'promo-banner',
	'stats-counter',
	'tabs',
	'testimonial-carousel',
	'text-rotator',
	'timeline',
];

/**
 * Attribute values from block.json defaults, with a fixed uniqueId so class names are stable.
 *
 * @param {Object} metadata block.json.
 * @return {Object} Attributes.
 */
function defaults( metadata ) {
	const out = {};
	Object.entries( metadata.attributes || {} ).forEach( ( [ name, def ] ) => {
		if ( undefined !== def.default ) {
			out[ name ] = def.default;
		}
	} );
	out.uniqueId = 'snap1234';
	return out;
}

describe.each( STATIC_BLOCKS )( 'static block %s', ( slug ) => {
	const metadata = require( `../src/blocks/${ slug }/block.json` );
	const save = require( `../src/blocks/${ slug }/save.js` ).default;
	const render = ( attributes ) => renderToString( createElement( save, { attributes } ) );

	it( 'saves the same markup at its defaults', () => {
		expect( render( defaults( metadata ) ) ).toMatchSnapshot();
	} );

	it( 'saves an owner-picked colour', () => {
		const attributes = defaults( metadata );
		Object.keys( attributes ).forEach( ( name ) => {
			if ( /Color$|Bg$/.test( name ) && '' === attributes[ name ] ) {
				attributes[ name ] = '#123456';
			}
		} );
		expect( render( attributes ) ).toMatchSnapshot();
	} );
} );
