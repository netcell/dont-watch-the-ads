"use strict"

var gulp      = require('gulp');
var useref    = require('gulp-useref');
var gulpif    = require('gulp-if');
var uglify    = require('gulp-uglify');
var sass      = require('gulp-sass');
var plumber   = require('gulp-plumber');
var cachebust = require('gulp-cache-bust');

function html(minify, watch){
  let env  = require('./env')();
	var stream = gulp.src(env.html.entry);
  if (watch) stream = stream.pipe(plumber());
  stream = stream.pipe(useref());
	if (minify) stream = stream.pipe(gulpif('*.js', uglify()))
	return stream.pipe(gulp.dest(env.folder));
}

gulp.task('html:build', function () {
	return html(true);
});

gulp.task('html:serve', function () {
	return html(false, true);
});

gulp.task('html:watch', function(){
  let env  = require('./env')();
	return gulp.watch([
    env.html.entry,
    './bower_components/**/*.*',
    './src/**/*.css'
	], { interval: 1000 }, ['html:serve']);
})
