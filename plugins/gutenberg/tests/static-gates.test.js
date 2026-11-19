/**
 * Static gates (test plan Wave 2: T0.5 and T0.7).
 *
 * T0.5 Asset handles resolve: every script and style a block.json names exists. A "file:" path must be a real
 * file in the built block folder; a bare handle (shared assets such as the Swiper base) must be registered with
 * wp_register_script() or wp_register_style() somewhere in the plugin. A missing one fails silently in WordPress:
 * the block renders without its CSS or JS.
 *
 * T0.7 Elementor widget names are unique: two widgets with one get_name() overwrite each other in Elementor's
 * registry, and one of them disappears from the panel.
 */

const fs = require( 'fs' );
const path = require( 'path' );

const ROOT = path.resolve( __dirname, '../../..' );
const SRC = path.join( ROOT, 'plugins/gutenberg/src/blocks' );
const BUILD = path.join( ROOT, 'build/blocks' );
const ASSET_KEYS = [ 'script', 'style', 'editorScript', 'editorStyle', 'viewScript', 'viewStyle', 'render' ];

/**
 * Every .php file under a folder.
 *
 * @param {string} dir Folder.
 * @return {string[]} Paths.
 */
function phpFiles( dir ) {
	return fs.readdirSync( dir, { withFileTypes: true } ).flatMap( ( entry ) => {
		const full = path.join( dir, entry.name );
		if ( entry.isDirectory() ) {
			return [ 'node_modules', 'vendor', 'libs', 'build', 'dist', 'tests' ].includes( entry.name ) ? [] : phpFiles( full );
		}
		return entry.name.endsWith( '.php' ) ? [ full ] : [];
	} );
}

const blocks = fs.readdirSync( SRC ).filter( ( slug ) => fs.existsSync( path.join( SRC, slug, 'block.json' ) ) );
const allPhp = phpFiles( ROOT ).map( ( file ) => fs.readFileSync( file, 'utf8' ) ).join( '\n' );

describe( 'T0.5 asset handles resolve', () => {
	it( 'finds the blocks', () => {
		expect( blocks.length ).toBeGreaterThanOrEqual( 35 );
	} );

	describe.each( blocks )( '%s', ( slug ) => {
		const metadata = require( path.join( SRC, slug, 'block.json' ) );
		const refs = ASSET_KEYS.flatMap( ( key ) => ( [] ).concat( metadata[ key ] || [] ).map( ( ref ) => [ key, ref ] ) );

		it.each( refs.length ? refs : [ [ 'none', null ] ] )( '%s: %s', ( key, ref ) => {
			if ( null === ref ) {
				return;
			}
			if ( ref.startsWith( 'file:' ) ) {
				// Built block folders hold the compiled files the plugin ships.
				expect( fs.existsSync( path.join( BUILD, slug, ref.slice( 5 ) ) ) ).toBe( true );
				return;
			}
			const registered = new RegExp( `wp_register_(script|style)\\(\\s*['"]${ ref.replace( /[-/\\^$*+?.()|[\]{}]/g, '\\$&' ) }['"]` );
			expect( registered.test( allPhp ) ).toBe( true );
		} );
	} );
} );

describe( 'T0.7 Elementor widget names are unique', () => {
	const widgetFiles = phpFiles( path.join( ROOT, 'plugins/elementor/widgets' ) );
	const names = widgetFiles
		.map( ( file ) => {
			const match = fs.readFileSync( file, 'utf8' ).match( /function\s+get_name\s*\(\s*\)\s*(?::\s*string\s*)?\{\s*return\s+['"]([^'"]+)['"]/ );
			return match ? { file: path.relative( ROOT, file ), name: match[ 1 ] } : null;
		} )
		.filter( Boolean );

	it( 'finds the widgets', () => {
		expect( names.length ).toBeGreaterThanOrEqual( 43 );
	} );

	it( 'gives every widget its own name', () => {
		const seen = {};
		const duplicates = names.filter( ( { name, file } ) => {
			if ( seen[ name ] ) {
				return true;
			}
			seen[ name ] = file;
			return false;
		} );
		expect( duplicates ).toEqual( [] );
	} );
} );

// SpacingControl finds the tablet and mobile attributes by object identity with the block's padding or margin, so a
// block that passes a copy (a spread, a fallback literal) silently loses its responsive spacing controls.
describe( 'SpacingControl gets the block attribute itself', () => {
	const uses = blocks.flatMap( ( slug ) => {
		const file = path.join( SRC, slug, 'edit.js' );
		const code = fs.existsSync( file ) ? fs.readFileSync( file, 'utf8' ) : '';
		return [ ...code.matchAll( /<SpacingControl[\s\S]*?values=\{\s*([^}]+?)\s*\}/g ) ].map( ( m ) => ( { slug, values: m[ 1 ] } ) );
	} );

	it( 'finds the controls', () => {
		expect( uses.length ).toBeGreaterThanOrEqual( 60 );
	} );

	it( 'passes padding or margin unchanged', () => {
		expect( uses.filter( ( u ) => ! /^(attributes\.)?(padding|margin)$/.test( u.values ) ) ).toEqual( [] );
	} );
} );

// A static block (no render callback) is checked against its save() output when the editor parses it. A
// self-closing comment has no HTML to check, so a pattern written that way inserts a block the editor calls invalid.
describe( 'Patterns give static blocks their saved markup', () => {
	const PATTERNS = path.join( ROOT, 'plugins/gutenberg/patterns' );
	const staticBlocks = blocks.filter( ( slug ) => ! JSON.parse( fs.readFileSync( path.join( SRC, slug, 'block.json' ), 'utf8' ) ).render );

	it( 'finds the static blocks', () => {
		expect( staticBlocks ).toContain( 'cta' );
	} );

	it( 'never self-closes a static block', () => {
		const found = fs.readdirSync( PATTERNS )
			.filter( ( file ) => file.endsWith( '.php' ) )
			.flatMap( ( file ) => {
				const code = fs.readFileSync( path.join( PATTERNS, file ), 'utf8' );
				return [ ...code.matchAll( /<!-- wp:wbcom-essential\/([a-z0-9-]+)\b[^>]*?\/-->/g ) ]
					.filter( ( m ) => staticBlocks.includes( m[ 1 ] ) )
					.map( ( m ) => `${ file }: ${ m[ 1 ] }` );
			} );
		expect( found ).toEqual( [] );
	} );
} );
