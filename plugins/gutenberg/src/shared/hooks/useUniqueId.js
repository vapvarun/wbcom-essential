import { useEffect } from '@wordpress/element';
import { select, dispatch } from '@wordpress/data';

/**
 * Decide whether a block needs a new uniqueId.
 *
 * A block needs one when it has none (first insert) or when another block in the same editor already uses
 * it (Duplicate, copy/paste or a pattern inserted twice copy the attribute, and two blocks with one id share
 * one set of generated styles, so editing either changed both).
 *
 * @param {string}   uniqueId    Current uniqueId attribute value.
 * @param {string[]} otherIds    uniqueIds of the other Wbcom blocks in the editor.
 * @param {boolean}  checkOthers False inside a synced pattern or template part, whose copies mirror one entity.
 * @return {boolean} True when a new id should be assigned.
 */
export function needsNewId( uniqueId, otherIds, checkOthers = true ) {
	if ( ! uniqueId ) {
		return true;
	}
	return checkOthers && otherIds.includes( uniqueId );
}

/**
 * Pick an id for the block from its clientId, avoiding ids already in use.
 *
 * @param {string}   clientId Block client ID.
 * @param {string[]} taken    uniqueIds already used by other blocks.
 * @return {string} An 8-character id.
 */
export function pickId( clientId, taken ) {
	const hex = clientId.replace( /-/g, '' );
	for ( let start = 0; start + 8 <= hex.length; start += 8 ) {
		const id = hex.substring( start, start + 8 );
		if ( ! taken.includes( id ) ) {
			return id;
		}
	}
	return hex.substring( 0, 8 );
}

/**
 * Give every Wbcom block instance its own uniqueId: on first insert, and again when the id it carries is
 * already used by another block (duplicate, copy/paste, pattern inserted twice, or a page saved with such a
 * copy before this check existed). Only the block whose effect runs is changed, so a block with a unique id
 * is never touched and saved pages without duplicates do not change. The write is not added to undo history.
 *
 * Blocks inside a synced pattern or template part are not checked against others: their copies mirror one
 * stored entity, so changing one would rewrite the entity and loop; identical ids there emit identical CSS.
 *
 * @param {string}   clientId      Block client ID.
 * @param {string}   uniqueId      Current uniqueId attribute value.
 * @param {Function} setAttributes Block setAttributes function.
 */
export function useUniqueId( clientId, uniqueId, setAttributes ) {
	useEffect( () => {
		const editor = select( 'core/block-editor' );
		const checkOthers = ! editor.getBlockParentsByBlockName( clientId, [ 'core/block', 'core/template-part' ] ).length;
		const otherIds = [];
		if ( uniqueId && checkOthers ) {
			editor.getClientIdsWithDescendants().forEach( ( id ) => {
				if ( id !== clientId && 0 === ( editor.getBlockName( id ) || '' ).indexOf( 'wbcom-essential/' ) ) {
					const other = editor.getBlockAttributes( id );
					if ( other && other.uniqueId ) {
						otherIds.push( other.uniqueId );
					}
				}
			} );
		}
		if ( needsNewId( uniqueId, otherIds, checkOthers ) ) {
			const { __unstableMarkNextChangeAsNotPersistent: notPersistent } = dispatch( 'core/block-editor' );
			if ( notPersistent ) {
				notPersistent();
			}
			setAttributes( { uniqueId: pickId( clientId, otherIds ) } );
		}
	}, [ clientId, uniqueId, setAttributes ] );
}
