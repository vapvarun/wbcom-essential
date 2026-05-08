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
			//
			// Strategy: SHIP EVERYTHING BY DEFAULT, then blacklist only
			// dev-only artefacts. This is deliberate — the previous
			// extension-whitelist approach silently dropped any asset type
			// not explicitly listed (fonts, webp, mp4, etc.), breaking
			// styling on live sites. With an "everything + blacklist" model,
			// a new file type added to the repo ships automatically; only
			// known dev paths are stripped.
			//
			// If you need to exclude something new, add it to the BLACKLIST
			// below. NEVER use bare prefix globs like `!**/LICENSE*` or
			// `!**/README*` — those can match legitimate code files like
			// `license.js`, `license-control.php`, or (on case-insensitive
			// filesystems) the WordPress `readme.txt`.
			copy: {
				dist: {
					files: [
						{
							expand: true,
							dot: true, // ensure dotfile excludes below take effect
							src: [
								// --- Ship everything by default ---
								'**',

								// --- Blacklist: dev-only top-level folders ---
								'!docs/**',
								'!marketing/**',
								'!plan/**',
								'!scripts/**',
								'!tests/**',
								'!node_modules/**',
								'!.git/**',
								'!.github/**',
								'!.vscode/**',
								'!.idea/**',
								'!dist/**',

								// --- Blacklist: block sources (only /build ships) ---
								// Block JS/PHP sources under plugins/gutenberg/src/blocks/.
								// Shared runtime CSS (design tokens, base, theme isolation)
								// was moved to plugins/gutenberg/assets/shared/ so it ships.
								'!plugins/gutenberg/src/**',
								// Belt-and-braces: a stray build/ output sometimes appears
								// under plugins/gutenberg/ from older toolchain runs. Only
								// the top-level /build/ is canonical for block output.
								'!plugins/gutenberg/build/**',

								// --- Blacklist: nested node_modules / package manifests ---
								'!**/node_modules/**',
								'!**/package.json',
								'!**/package-lock.json',
								'!**/yarn.lock',
								'!**/pnpm-lock.yaml',

								// --- Blacklist: top-level tooling / manifests ---
								'!composer.json',
								'!composer.lock',
								'!gruntfile.js',
								'!Gruntfile.js',
								'!phpcs.xml',
								'!phpcs.xml.dist',
								'!phpstan.neon',
								'!phpstan.neon.dist',
								'!phpunit.xml',
								'!phpunit.xml.dist',
								'!webpack.config.js',
								'!webpack.config.*.js',
								'!rollup.config.js',
								'!babel.config.js',
								'!jest.config.js',
								'!playwright.config.*',

								// --- Blacklist: docs/markdown anywhere in tree ---
								'!**/*.md',
								'!**/*.markdown',

								// --- Blacklist: sourcemaps + editor/os junk ---
								'!**/*.map',
								'!**/.DS_Store',
								'!**/Thumbs.db',
								'!**/.gitignore',
								'!**/.gitattributes',
								'!**/.gitkeep',
								'!**/.editorconfig',
								'!**/.eslintrc*',
								'!**/.eslintignore',
								'!**/.prettierrc*',
								'!**/.prettierignore',
								'!**/.stylelintrc*',
								'!**/.babelrc*',
								'!**/.browserslistrc',
								'!**/.nvmrc',
								'!**/.env',
								'!**/.env.*',

								// IMPORTANT: Do NOT blacklist `**/LICENSE*`,
								// `**/LICENCE*`, `**/CHANGELOG*`, `**/CONTRIBUTING*`,
								// or `**/README*` — those could match legitimate code
								// files (e.g. vendor/.../license.js,
								// includes/license-control.php) and, on
								// case-insensitive filesystems, the WordPress
								// `readme.txt` (which MUST ship).
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
