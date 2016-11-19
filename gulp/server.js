"use strict"

var gulp     = require('gulp');
var plumber  = require('gulp-plumber');
var webserver = require('gulp-webserver');

gulp.task('server:dev', function() {
  let env = require('./env')();
  gulp.src(env.folder)
  .pipe(webserver({
    host: '0.0.0.0',
    port: '8000',
    fallback: 'index.html'
  }));
});
