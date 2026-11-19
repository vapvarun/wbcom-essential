/**
 * Block uniqueId: duplicates get their own id, unique ids are left alone.
 *
 * @package wbcom-essential
 */

// The editor store is provided by WordPress at runtime (a webpack external), not installed for tests.
jest.mock( '@wordpress/data', () => ( { select: jest.fn(), dispatch: jest.fn() } ), { virtual: true } );

import { needsNewId, pickId } from '../src/shared/hooks/useUniqueId';

describe( 'needsNewId', () => {
	it( 'assigns an id on first insert', () => {
		expect( needsNewId( '', [] ) ).toBe( true );
	} );

	it( 'keeps an id no other block uses', () => {
		expect( needsNewId( 'aaaa1111', [ 'bbbb2222' ] ) ).toBe( false );
	} );

	it( 'replaces an id another block already uses (duplicate, copy/paste)', () => {
		expect( needsNewId( 'aaaa1111', [ 'bbbb2222', 'aaaa1111' ] ) ).toBe( true );
	} );

	it( 'leaves blocks inside a synced pattern alone', () => {
		expect( needsNewId( 'aaaa1111', [ 'aaaa1111' ], false ) ).toBe( false );
	} );
} );

describe( 'pickId', () => {
	it( 'uses the first 8 characters of the clientId, as before', () => {
		expect( pickId( '03e5186b-1234-4abc-9def-0123456789ab', [] ) ).toBe( '03e5186b' );
	} );

	it( 'moves on when that id is taken', () => {
		expect( pickId( '03e5186b-1234-4abc-9def-0123456789ab', [ '03e5186b' ] ) ).toBe( '12344abc' );
	} );
} );
