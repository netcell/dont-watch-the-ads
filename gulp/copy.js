"use strict"

var gulp     = require('gulp');
var watch    = require('gulp-watch');
var plumber  = require('gulp-plumber');
var rename  = require('gulp-rename');

function copy(doWatch){
  let env  = require('./env')();
  let base = env.src.entry;
	var srcAsset = [
		env.fonts.entry,
		env.assets.entry
	];
	var stream = gulp.src(srcAsset, { base }).pipe(plumber());
	if (doWatch) stream = stream.pipe(
		watch(srcAsset, {
			base          : base,
			ignoreInitial : true,
			interval      : 1000
		})
  ).pipe(plumber());
	return stream.pipe(gulp.dest(env.folder));
}

gulp.task('copy:build', function(callback){
	return copy(false);
});

gulp.task('copy:serve', function(callback){
	return copy(true);
});
