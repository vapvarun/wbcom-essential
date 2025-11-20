/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * Since this is a dynamic block, we return null and handle rendering in PHP.
 *
 * @return {null} Null for dynamic blocks.
 */
export default function save() {
	return null;
}