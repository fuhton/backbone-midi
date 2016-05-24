var gulp   = require('gulp'),
connect    = require('gulp-connect'),
jshint     = require('gulp-jshint'),
rename     = require('gulp-rename');
browserify = require('browserify'),
stringify  = require('stringify'),
strictify  = require('strictify'),
source     = require('vinyl-source-stream'),
fs         = require('fs');


gulp.task( 'connect', function() {
	connect.server();
});


gulp.task( 'watch', function () {
	gulp.watch(
		[
		'./app/js/main.js',
		'./app/js/*/*.js',
		'./app/partials/*.html'
		],
		[ 'hint', 'browserify']
	);
});

gulp.task( 'hint', function() {
	return gulp.src([
		'./app/js/main.js',
		'./app/js/models/*.js',
		'./app/js/collections/*.js',
		'./app/js/views/*.js', ]
	)
	.pipe( jshint() )
	.pipe( jshint.reporter( 'default' ) )
	.pipe( connect.reload() ) }
);

// Basic usage
gulp.task( 'browserify', function() {
	var b = browserify();
	b.transform(stringify(['.html']));
	b.add('./app/js/main.js');

	return b.bundle()
	.pipe( source('bundle.js') )
	.pipe( gulp.dest('./build/') );
});

gulp.task( 'default', ['connect', 'browserify', 'watch'] );
