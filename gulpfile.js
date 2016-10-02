const gulp = require('gulp');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

gulp.task('js:build', function (done) {
	webpack(webpackConfig('js:build'), function (err, stats) {
		if (err) {
			throw err;
		}

		console.log(stats.toString({ colors: true }));

		done();
	});
});

gulp.task('js:dev', function (done) {
	const compiler = webpack(webpackConfig('js:dev'));

	new WebpackDevServer(compiler, {
		stats: { colors: true },
		hot: true,
		historyApiFallback: true
	}).listen(8080, 'localhost', function (err) {
		if (err) {
			throw err;
		}

		console.log('Server started. http://localhost:8080/');
	})
});