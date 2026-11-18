/**
 * Deprecation for blocks whose colours used to default to fixed hex values.
 *
 * Those colours now default to empty, so the stylesheet falls back to the theme tokens (light and dark).
 * Content saved with the old defaults still validates through this deprecation, then migrates: a neutral
 * colour (text, card, border) becomes empty and follows the theme; a colour marked "keep" (accents and the
 * text on them) is written out as the old value, so pages the owner already built keep their look. A colour
 * the owner chose is never touched.
 *
 * The old values live in block.json under "wbeLegacyColors" ({ attribute: [ cssVar, oldValue, "keep"? ] }),
 * which BlockRegistrar.php also reads to drop the old neutral lines from saved pages at render time.
 *
 * @param {Object}   metadata   The block.json metadata.
 * @param {Function} save       The block's save function (its output is unchanged).
 * @param {Object}   oldDefault Optional map of attribute name to old default (blocks without wbeLegacyColors).
 * @param {boolean}  keptOnly   Read only the "keep" entries: content saved after the neutral colours were
 *                              already emptied but while the accents still had fixed defaults.
 * @return {Object} Block deprecation definition.
 */
export function legacyColorDeprecation( metadata, save, oldDefault, keptOnly = false ) {
	const entries = oldDefault
		? Object.entries( oldDefault ).map( ( [ name, value ] ) => [ name, value, false ] )
		: Object.entries( metadata.wbeLegacyColors || {} )
			.map( ( [ name, [ , value, keep ] ] ) => [ name, value, 'keep' === keep ] )
			.filter( ( [ , , keep ] ) => ! keptOnly || keep );

	const legacy = {};
	entries.forEach( ( [ name, value ] ) => {
		legacy[ name ] = { type: 'string', default: value };
	} );

	return {
		attributes: { ...metadata.attributes, ...legacy },
		save,
		migrate( attributes ) {
			const migrated = { ...attributes };
			entries.forEach( ( [ name, value, keep ] ) => {
				if ( ! keep && attributes[ name ] === value ) {
					migrated[ name ] = '';
				}
			} );
			return migrated;
		},
	};
}
