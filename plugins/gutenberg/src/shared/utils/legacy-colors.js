/**
 * Deprecation for blocks whose neutral colours used to default to fixed light hex values.
 * They now default to empty so the stylesheet tokens (light and dark) apply; content saved
 * with the old defaults is read with them, then migrated to empty. A colour the owner
 * chose is kept.
 *
 * @param {Object}   metadata   The block.json metadata.
 * @param {Function} save       The block's save function (its output is unchanged).
 * @param {Object}   oldDefault Map of attribute name to the old default value.
 * @return {Object} Block deprecation definition.
 */
export function legacyColorDeprecation( metadata, save, oldDefault ) {
	const legacy = {};
	Object.entries( oldDefault ).forEach( ( [ name, value ] ) => {
		legacy[ name ] = { type: 'string', default: value };
	} );

	return {
		attributes: { ...metadata.attributes, ...legacy },
		save,
		migrate( attributes ) {
			const migrated = { ...attributes };
			Object.entries( oldDefault ).forEach( ( [ name, value ] ) => {
				if ( attributes[ name ] === value ) {
					migrated[ name ] = '';
				}
			} );
			return migrated;
		},
	};
}
