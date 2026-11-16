/**
 * block.json checks for every block (test plan wave 2): the fields WordPress needs to register it, attribute
 * defaults that match their declared type (a mismatch is silently dropped by the editor), and every file the
 * block points at existing.
 */

const fs = require( 'fs' );
const path = require( 'path' );

const SRC = path.join( __dirname, '../src/blocks' );
const BLOCKS = fs.readdirSync( SRC ).filter( ( d ) => fs.existsSync( path.join( SRC, d, 'block.json' ) ) );

const TYPE_OK = {
	string: ( v ) => 'string' === typeof v,
	number: ( v ) => 'number' === typeof v,
	integer: ( v ) => Number.isInteger( v ),
	boolean: ( v ) => 'boolean' === typeof v,
	array: ( v ) => Array.isArray( v ),
	object: ( v ) => null !== v && 'object' === typeof v && ! Array.isArray( v ),
	null: ( v ) => null === v,
};

const fileRefs = ( value ) =>
	( Array.isArray( value ) ? value : [ value ] ).filter( ( v ) => 'string' === typeof v && v.startsWith( 'file:' ) );

test( 'finds every block', () => {
	expect( BLOCKS.length ).toBeGreaterThanOrEqual( 35 );
} );

describe.each( BLOCKS )( 'block.json of %s', ( slug ) => {
	const dir = path.join( SRC, slug );
	const meta = JSON.parse( fs.readFileSync( path.join( dir, 'block.json' ), 'utf8' ) );

	it( 'has what WordPress needs to register it', () => {
		expect( meta.name ).toBe( `wbcom-essential/${ slug }` );
		expect( meta.apiVersion ).toBe( 3 );
		expect( typeof meta.title ).toBe( 'string' );
		expect( typeof meta.category ).toBe( 'string' );
		expect( meta.textdomain ).toBe( 'wbcom-essential' );
	} );

	it( 'has attribute defaults that match their type', () => {
		const bad = Object.entries( meta.attributes || {} )
			.filter( ( [ , def ] ) => undefined !== def.default && def.type )
			.filter( ( [ , def ] ) => {
				const types = Array.isArray( def.type ) ? def.type : [ def.type ];
				return ! types.some( ( t ) => TYPE_OK[ t ] && TYPE_OK[ t ]( def.default ) );
			} )
			.map( ( [ name, def ] ) => `${ name }: ${ JSON.stringify( def.default ) } is not ${ def.type }` );
		expect( bad ).toEqual( [] );
	} );

	it( 'points only at files that exist', () => {
		const refs = [ 'render', 'editorScript', 'script', 'viewScript', 'editorStyle', 'style', 'viewStyle' ]
			.flatMap( ( key ) => fileRefs( meta[ key ] ) )
			.map( ( ref ) => ref.slice( 5 ) );
		// Built files map back to their sources: index.js from index.js, style-index.css from style.(s)css,
		// index.css from editor.(s)css, view.js from view.js; render.php is copied as is.
		const SOURCES = {
			'index.js': [ 'index.js' ],
			'style-index.css': [ 'style.css', 'style.scss' ],
			'index.css': [ 'editor.css', 'editor.scss' ],
			'view.js': [ 'view.js' ],
		};
		const missing = refs.filter( ( ref ) => {
			const file = path.basename( ref );
			const candidates = SOURCES[ file ] || [ file ];
			return ! candidates.some( ( c ) => fs.existsSync( path.join( dir, c ) ) );
		} );
		expect( missing ).toEqual( [] );
	} );
} );
