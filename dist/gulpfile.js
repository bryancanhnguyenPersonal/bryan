"use strict";

var gulp = require('gulp');
var connect = require('gulp-connect'); //Runs a local dev server
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify');  // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); //Concatenates files
var lint = require('gulp-eslint'); //Lint JS files, including JSX
var less = require('gulp-less');
var path = require('path');


var config = {
	port: 9005,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		pages: './src/pages/*.html',
		js: './src/main.js',
		images: './src/images/*',
		fonts: './src/fonts/*',
		less: './src/css/*.css',
		css: [
          './src/css/style.css',
					'./src/css/grid.css',
					'node_modules/bootstrap/dist/css/bootstrap.css',
					'./src/css/ionicons.min.css'
    	],
		dist: './dist',
	}
}

//Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	});
});

gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});

gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
	gulp.src(config.paths.pages)
		.pipe(gulp.dest(config.paths.dist + '/pages'))
		.pipe(connect.reload());
});


gulp.task('js', function() {
	browserify(config.paths.js)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});


gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('images', function() {
	gulp.src(config.paths.images)
		.pipe(gulp.dest(config.paths.dist + '/images'))
		.pipe(connect.reload());
});

gulp.task('lint', function() {
	return gulp.src(config.paths.js)
		.pipe(lint({config: 'eslint.config.json'}))
		.pipe(lint.format());
});

gulp.task('fonts', function() {
    return gulp.src(config.paths.fonts)
      .pipe(gulp.dest(config.paths.dist + '/fonts'));
});

gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.pages, ['html']);
	//gulp.watch(config.paths.css, ['less']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});



gulp.task('default', ['html', 'js', 'lint', 'open', 'watch', 'images','fonts','css']);
