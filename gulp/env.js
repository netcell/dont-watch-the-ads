const _      = require('lodash');
const gulp   = require('gulp');
const rename = require('gulp-rename');
const common = require('../config/env.common');

var env = null;
var $type = null;

module.exports = function(){
  return env;
}

function copy(type){
  $type = type;
  env = _.merge({}, common, require(`../config/env.${$type}`));
  // env.config = require(`../config/config.${$type}`);
  return gulp.src([
    `config/env.${$type}.json`,
    `config/config.${$type}.json`
  ]).pipe(rename(function(path){
    path.basename = path.basename.split('.')[0];
  })).pipe(gulp.dest('config'));
}

gulp.task('copy current', function(done){
  return copy($type);
})

gulp.task('env:prod', function(done) {
  return copy('prod');
});

gulp.task('env:dev', function(done) {
  return copy('dev');
});

gulp.task('env:watch', function(done) {
  gulp.watch([
    `config/env.${$type}.json`,
    `config/config.${$type}.json`
	], { interval: 1000 }, ['copy current']);
});
