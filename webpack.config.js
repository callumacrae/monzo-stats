const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
	src: path.join(__dirname, 'src'),
	dest: path.join(__dirname, 'dist')
};

module.exports = function (task) {
	const entries = [
		'babel-polyfill',
		path.join(PATHS.src, 'js/app.js'),
		path.join(PATHS.src, 'scss/app.scss')
	];
	const babelPresets = ['es2015', 'react'];
	const plugins = [];

	if (task === 'js:dev') {
		entries.unshift('webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server');

		babelPresets.push('react-hmre');

		plugins.push(...[
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new HtmlWebpackPlugin({
				template: path.join(PATHS.src, 'index.html'),
				inject: true
			})
		])
	}

	return {
		entry: entries,
		output: {
			path: PATHS.dest,
			filename: 'bundle.js'
		},
		plugins: plugins,
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel',
					include: PATHS.src,
					query: {
						presets: babelPresets
					}
				},
				{
					test: /\.css$/,
					loaders: ['style', 'css?modules']
				},
				{
					test: /\.scss$/,
					loaders: ['style', 'css?modules', 'sass']
				},
				{
					test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'url-loader?limit=10000&minetype=application/font-woff'
				},
				{
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					loader: 'file-loader'
				}
			]
		}
	};
};