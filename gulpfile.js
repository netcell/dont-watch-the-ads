require("babel-register")({
  only: [
    './gulp/**/*.*',
    './src/js/**/*.*',
    './config/**/*.*'
  ]
});

var gulp      = require('gulp');
var runSequence = require('run-sequence');

require('./gulp/browserify');
require('./gulp/clean');
require('./gulp/copy');
require('./gulp/html');
require('./gulp/server');
var env = require('./gulp/env');

gulp.task('build:prod', function(callback){ runSequence(
  ['env:prod'],
  ['clean'],
  ['copy:build', 'html:build', 'browserify:build:prod'],
  callback
) });

gulp.task('serve:dev', function(callback){ runSequence(
  ['env:dev'],
  ['clean'],
  ['html:serve'],
  ['copy:serve', 'html:watch', 'browserify:serve:dev', 'env:watch', 'server:dev'],
  callback
) });
