'use strict';
module.exports = function (grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	// Ref. https://npmjs.org/package/load-grunt-tasks
	require( 'load-grunt-tasks' )( grunt );

	// Load webpack task
	grunt.loadNpmTasks('grunt-webpack');
	grunt.initConfig(
		{
			// Check text domain
			checktextdomain: {
				options: {
					text_domain: ['wbcom-essential'], // Specify allowed domain(s)
					keywords: [ // List keyword specifications
						'__:1,2d',
						'_e:1,2d',
						'_x:1,2c,3d',
						'esc_html__:1,2d',
						'esc_html_e:1,2d',
						'esc_html_x:1,2c,3d',
						'esc_attr__:1,2d',
						'esc_attr_e:1,2d',
						'esc_attr_x:1,2c,3d',
						'_ex:1,2c,3d',
						'_n:1,2,4d',
						'_nx:1,2,4c,5d',
						'_n_noop:1,2,3d',
						'_nx_noop:1,2,3c,4d'
					]
				},
				target: {
					files: [{
						src: [
							'*.php',
							'**/*.php',
							'!node_modules/**',
							'!options/framework/**',
							'!tests/**'
						], // all php
						expand: true
					}]
				}
			},
			// make po files
			makepot: {
				target: {
					options: {
						cwd: '.', // Directory of files to internationalize.
						domainPath: 'languages/', // Where to save the POT file.
						exclude: ['node_modules/*', 'options/framework/*'], // List of files or directories to ignore.
						mainFile: 'index.php', // Main project file.
						potFilename: 'wbcom-essential.pot', // Name of the POT file.
						potHeaders: { // Headers to add to the generated POT file.
							poedit: true, // Includes common Poedit headers.
							'Last-Translator': 'Varun Dubey',
							'Language-Team': 'Wbcom Designs',
							'report-msgid-bugs-to': '',
							'x-poedit-keywordslist': true // Include a list of all possible gettext functions.
						},
						type: 'wp-plugin', // Type of project (wp-plugin or wp-theme).
						updateTimestamp: true // Whether the POT-Creation-Date should be updated without other changes.
					}
				}
			},
			// Webpack for Gutenberg blocks
			webpack: {
				blocks: {
					mode: 'production',
					entry: {
						'index': './plugins/gutenberg/blocks/branding/src/index.js',
						'style': './plugins/gutenberg/blocks/branding/src/style.scss',
						'editor': './plugins/gutenberg/blocks/branding/src/editor.scss',
					},
					output: {
						path: require('path').resolve(__dirname, 'plugins/gutenberg/blocks/branding/build'),
						filename: (pathData) => {
							const name = pathData.chunk.name;
							if (name === 'index') return 'index.js';
							return '[name].js'; // This shouldn't happen for CSS-only entries
						},
					},
					module: {
						rules: [
							{
								test: /\.js$/,
								exclude: /node_modules/,
								use: {
									loader: 'babel-loader',
									options: {
										presets: ['@babel/preset-env', '@babel/preset-react'],
									},
								},
							},
							{
								test: /\.scss$/,
								use: [
									require('mini-css-extract-plugin').loader,
									'css-loader',
									'sass-loader',
								],
							},
							{
								test: /\.css$/,
								use: [
									require('mini-css-extract-plugin').loader,
									'css-loader',
								],
							},
						],
					},
					plugins: [
						new (require('mini-css-extract-plugin'))({
							filename: (pathData) => {
								const name = pathData.chunk.name;
								if (name === 'editor') return 'editor.css';
								if (name === 'style') return 'style.css';
								return '[name].css';
							},
						}),
						new (require('clean-webpack-plugin').CleanWebpackPlugin)({
							cleanOnceBeforeBuildPatterns: ['**/*'],
						}),
					],
					externals: {
						'react': 'React',
						'react-dom': 'ReactDOM',
						'@wordpress/blocks': 'wp.blocks',
						'@wordpress/i18n': 'wp.i18n',
						'@wordpress/element': 'wp.element',
						'@wordpress/block-editor': 'wp.blockEditor',
						'@wordpress/components': 'wp.components',
						'@wordpress/data': 'wp.data',
						'@wordpress/api-fetch': 'wp.apiFetch',
					},
				}
			}
		}
	);

	// register tasks
	grunt.registerTask( 'default', ['checktextdomain', 'makepot'] );
	grunt.registerTask( 'build-blocks', ['webpack:blocks'] );
};
