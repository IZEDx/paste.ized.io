const webpack = require('webpack');
const path = require('path');
const config = require('sapper/config/webpack.js');
const pkg = require('./package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const preprocess = require('svelte-preprocess');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const alias = { svelte: path.resolve('node_modules', 'svelte') };
const extensions = ['.mjs', '.js', '.json', '.svelte', '.html', '.ts', '.tsx', '.css'];
const mainFields = ['svelte', 'module', 'browser', 'main'];

module.exports = {
	client: {
		entry: {
			...config.client.entry(),
			"editor.worker": "monaco-editor/esm/vs/editor/editor.worker.js",
			"json.worker": "monaco-editor/esm/vs/language/json/json.worker",
			"css.worker": "monaco-editor/esm/vs/language/css/css.worker",
			"html.worker": "monaco-editor/esm/vs/language/html/html.worker",
			"ts.worker": "monaco-editor/esm/vs/language/typescript/ts.worker"
		},
		output: config.client.output(),
		resolve: { alias, extensions, mainFields },
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev,
							hydratable: true,
							hotReload: false, // pending https://github.com/sveltejs/svelte/issues/2377
							preprocess: preprocess({
								scss: {
									quiet: true
								}
							})
						}
					}
				},
				{
				  test: /\.tsx?$/,
				  use: 'ts-loader',
				  exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: process.env.NODE_ENV === 'development',
							},
						},
						'css-loader'
					],
				},
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: process.env.NODE_ENV === 'development',
							},
						},
						'css-loader',
						'sass-loader'
					],
				},
			]
		},
		mode,
		plugins: [
			// pending https://github.com/sveltejs/svelte/issues/2377
			// dev && new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.browser': true,
				'process.env.NODE_ENV': JSON.stringify(mode)
			}),
			new MiniCssExtractPlugin({
			  filename: '[name].css',
			  chunkFilename: '[id].css',
			  ignoreOrder: false, // Enable to remove warnings about conflicting order
			})
		].filter(Boolean),
		devtool: dev && 'inline-source-map'
	},

	server: {
		entry: config.server.entry(),
		output: config.server.output(),
		target: 'node',
		resolve: { alias, extensions, mainFields },
		externals: Object.keys(pkg.dependencies).concat('encoding'),
		module: {
			rules: [
				{
					test: /\.(svelte|html)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							css: false,
							generate: 'ssr',
							dev,
							preprocess: preprocess({
								scss: {
									quiet: true
								}
							})
						}
					}
				},
				{
				  test: /\.tsx?$/,
				  use: 'ts-loader',
				  exclude: /node_modules/
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: process.env.NODE_ENV === 'development',
							},
						},
						'css-loader',
					],
				},
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
			  filename: '[name].css',
			  chunkFilename: '[id].css',
			  ignoreOrder: false, // Enable to remove warnings about conflicting order
			})
		],
		mode: process.env.NODE_ENV,
		performance: {
			hints: false // it doesn't matter if server.js is large
		}
	},

	serviceworker: {
		entry: config.serviceworker.entry(),
		output: config.serviceworker.output(),
		mode: process.env.NODE_ENV,
		module: {
			rules: [
				{
				  test: /\.ts$/,
				  use: 'ts-loader',
				  exclude: /node_modules/
				}
			]
		},
	}
};
