"use strict"

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var rebundle = require('./rebundle');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var hmr = require('browserify-hmr');
var path = require('path');

var bundle = (sourceMap, watch, minify) => {

	if (!sourceMap) {
		process.stdout.write("Setting NODE_ENV to 'production'" + "\n");
    process.env.NODE_ENV = 'production';
    if (process.env.NODE_ENV != 'production') {
        throw new Error("Failed to set NODE_ENV to production!!!!");
    } else {
        process.stdout.write("Successfully set NODE_ENV to production" + "\n");
    }
	}

	watchify.args.debug = sourceMap;
	// watchify.args.fullPaths = true;//sourceMap;
	// watchify.args.extensions = [ ".js", ".json", ".jsx" ];
	watchify.args.plugin = watchify.args.plugin || [];
	watchify.args.paths = [
		'./src/js/Components',
		'./config',
		'./src/js',
		'./src'
	]
	// watchify.args.plugin.push(hmr);

	let env = require('./env')();
  let dest  = `${env.folder}/${env.js.folder}`;
	let entry = env.js.entry;

	let bundler = browserify(entry, watchify.args);
	if (watch) {
		bundler = bundler.plugin(hmr, {
			hostname: '0.0.0.0',
			mode: 'none',
			supportModes: ['websocket'],
		})
		bundler = bundler.plugin(watchify);
  }

	bundler.transform("babelify", {
		presets: [
			"es2015"
			// "react"
		],
		only: /(src\/js|config|scssify|\.scss|node_modules\/preact\/src)/,
		passPerPreset: true,
		plugins: [
			"syntax-flow",
			"transform-flow-strip-types",
			"syntax-jsx",
			"transform-react-jsx",
			"transform-react-display-name",

			"transform-es2015-destructuring",
			"transform-decorators-legacy",
			"transform-class-properties",
			"transform-object-rest-spread",
			"transform-function-bind",
			"syntax-trailing-function-commas",
		]
	});

	bundler.transform("rfolderify");

	watch && bundler.on('update', function(){
		rebundle(entry, bundler, dest, minify, sourceMap);
	});

	return rebundle(entry, bundler, dest, minify, sourceMap);
}

gulp.task('browserify:build:dev', function(done) {
	return bundle(true, false, false);
});

gulp.task('browserify:build:prod', function(done) {
	return bundle(false, false, true);
});

gulp.task('browserify:serve:dev', function(done) {
	return bundle(true, true, false);
});

gulp.task('browserify:serve:prod', function(done) {
	return bundle(false, true, true);
});
