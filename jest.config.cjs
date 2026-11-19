/**
 * Jest config for the block unit tests (npm run test:unit).
 *
 * @wordpress/scripts 36+ no longer bundles Jest; test-unit-jest runs the project's own Jest with this config.
 * Same preset and Babel transform the scripts package used to supply, so snapshots stay byte-identical.
 */
module.exports = {
	preset: '@wordpress/jest-preset-default',
	transform: {
		'\\.[jt]sx?$': [ 'babel-jest', { presets: [ '@wordpress/babel-preset-default' ] } ],
	},
};
