"use strict"

var gulp   = require('gulp');
var clean  = require('gulp-clean');

gulp.task('clean', function () {
  let env  = require('./env')();
  let dest = env.folder;
	return gulp.src([
		`${env.folder}/**/*.*`
	], {read: false}).pipe(clean({force: true}));
});
