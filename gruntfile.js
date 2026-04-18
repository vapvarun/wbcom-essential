'use strict';
module.exports = function (grunt) {

	// load all grunt tasks matching the `grunt-*` pattern
	// Ref. https://npmjs.org/package/load-grunt-tasks
	require( 'load-grunt-tasks' )( grunt );

	// Load webpack task
	grunt.loadNpmTasks('grunt-webpack');

	// Project configuration.
	// Keep pluginVersion in sync with loader.php / readme.txt when releasing.
	var pluginSlug    = 'wbcom-essential';
	var pluginVersion = '4.5.0';

	grunt.initConfig(
		{
			pkg: grunt.file.readJSON('package.json'),

			// Clean dist folder.
			clean: {
				dist: ['dist/'],
				post: ['dist/' + pluginSlug + '/']
			},

			// Copy production files to dist/.
			// Strategy: whitelist what ships, then blacklist dev-only artefacts.
			// Anything added to the repo must be explicitly listed here, so
			// /docs, /marketing, /plan, /plan/audit, *.md, node_modules, etc.
			// never leak into the released zip.
			copy: {
				dist: {
					files: [
						{
							expand: true,
							src: [
								// --- Whitelist (production code only) ---
								'wbcom-essential.php',
								'loader.php',
								'readme.txt',
								'admin/**',
								'assets/**',
								'build/**',                 // Compiled block assets.
								'includes/**',
								'languages/**',
								'templates/**',
								'vendor/**',                // Composer runtime deps (EDD SDK, etc.).
								// Plugins (Elementor + Gutenberg runtime only).
								'plugins/**/*.php',
								'plugins/**/*.css',
								'plugins/**/*.js',
								'plugins/**/*.json',
								'plugins/**/*.png',
								'plugins/**/*.jpg',
								'plugins/**/*.jpeg',
								'plugins/**/*.svg',
								'plugins/**/*.gif',
								'plugins/**/*.webp',

								// --- Blacklist (dev-only artefacts) ---
								// Top-level dev folders — never shipped.
								'!docs/**',
								'!marketing/**',
								'!plan/**',
								'!scripts/**',
								'!tests/**',
								'!node_modules/**',
								'!.github/**',
								'!.vscode/**',
								'!.idea/**',
								'!dist/**',

								// Gutenberg block sources (only /build ships).
								'!plugins/gutenberg/src/**',
								'!plugins/**/node_modules/**',
								'!plugins/**/package.json',
								'!plugins/**/package-lock.json',

								// Top-level tooling / manifest files.
								'!composer.json',
								'!composer.lock',
								'!package.json',
								'!package-lock.json',
								'!gruntfile.js',
								'!Gruntfile.js',
								'!phpcs.xml',
								'!phpcs.xml.dist',
								'!phpstan.neon',
								'!phpstan.neon.dist',
								'!phpunit.xml',
								'!phpunit.xml.dist',
								'!webpack.config.js',

								// Strip every markdown/doc/env file anywhere in the tree.
								'!**/*.md',
								'!**/*.markdown',
								'!**/*.map',
								'!**/.DS_Store',
								'!**/.gitignore',
								'!**/.gitattributes',
								'!**/.editorconfig',
								'!**/.eslintrc*',
								'!**/.prettierrc*',
								'!**/.stylelintrc*',
								'!**/.babelrc*',
								'!**/.nvmrc',
								'!**/CHANGELOG*',
								'!**/CONTRIBUTING*',
								'!**/LICENSE*',
								'!**/LICENCE*',
								'!**/phpunit.xml*',
								// Note: README.md is caught by !**/*.md. Do NOT add
								// !**/README* — it would match readme.txt on
								// case-insensitive filesystems (macOS/Windows) and
								// drop the WordPress.org plugin readme.
							],
							dest: 'dist/' + pluginSlug + '/'
						}
					]
				}
			},

			// Create zip file
			compress: {
				dist: {
					options: {
						archive: 'dist/' + pluginSlug + '-' + pluginVersion + '.zip',
						mode: 'zip'
					},
					files: [
						{
							expand: true,
							cwd: 'dist/',
							src: [pluginSlug + '/**'],
							dest: ''
						}
					]
				}
			},

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
							'!vendor/**',
							'!options/framework/**',
							'!tests/**',
							'!dist/**'
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
						exclude: ['node_modules/*', 'vendor/*', 'options/framework/*', 'dist/*'], // List of files or directories to ignore.
						mainFile: 'wbcom-essential.php', // Main project file.
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

		}
	);

	// register tasks
	grunt.registerTask( 'default', ['checktextdomain', 'makepot'] );
	grunt.registerTask( 'i18n', ['checktextdomain', 'makepot'] );
	grunt.registerTask( 'dist', ['clean:dist', 'copy:dist', 'compress:dist', 'clean:post'] );
	grunt.registerTask( 'release', ['i18n', 'dist'] );
};
