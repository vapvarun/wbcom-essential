const path = require('path');

const baseConfig = {
	mode: 'production',
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
		],
	},
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
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'plugins/gutenberg/blocks'),
		},
	},
};

module.exports = [
	{
		...baseConfig,
		name: 'branding',
		entry: './plugins/gutenberg/blocks/branding/src/index.js',
		output: {
			path: path.resolve(__dirname, 'plugins/gutenberg/blocks/branding/build'),
			filename: 'index.js',
		},
	},
	{
		...baseConfig,
		name: 'dropdown-button',
		entry: './plugins/gutenberg/blocks/dropdown-button/src/index.js',
		output: {
			path: path.resolve(__dirname, 'plugins/gutenberg/blocks/dropdown-button/build'),
			filename: 'index.js',
		},
	},
	{
		...baseConfig,
		name: 'advanced-tabs',
		entry: './plugins/gutenberg/blocks/advanced-tabs/src/index.js',
		output: {
			path: path.resolve(__dirname, 'plugins/gutenberg/blocks/advanced-tabs/build'),
			filename: 'index.js',
		},
	},
];