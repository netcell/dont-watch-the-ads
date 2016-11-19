var gulp       = require('gulp');
var duration   = require('gulp-duration');
var uglify     = require('gulp-uglify');
var notifier   = require('node-notifier');
var notify     = require('gulp-notify');
var rename     = require('gulp-rename');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var jScrambler = require('gulp-jscrambler');
var replace    = require('gulp-replace');

module.exports = function rebundle(entry, bundler, dest, minify, sourceMap) {

	entry = entry.split('.');
	entry[entry.length-1] = 'js';
	entry = entry.join('.');

	var stream = bundler.bundle()
	.on('error', function(err) {
		var message = err.toString();
		notifier.notify({
			title   : 'BUILD FAILED',
			message : message
		});
		console.error(message);
	})
	.pipe(duration('rebundle'))
	.pipe(source(entry))
	.pipe(buffer());
	if (sourceMap) {
		// stream = stream.pipe(sourcemaps.init({loadMaps: true}));
	}
	if (minify) {
		stream = stream.pipe(uglify());
	}
	if (sourceMap) {
		// stream = stream.pipe(sourcemaps.write(dest));
	}
	stream.pipe(rename({dirname: ''}))
	.pipe(gulp.dest(dest));

	return stream;
}
