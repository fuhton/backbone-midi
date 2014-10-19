var gulp            = require('gulp'),
    connect         = require('gulp-connect'),
    jshint          = require('gulp-jshint'),
    rename          = require('gulp-rename');
    browserify      = require('gulp-browserify');


gulp.task( 'connect', function() {
    connect.server();
});


gulp.task( 'watch', function () {
    gulp.watch( [
        './app/js/main.js',
        './app/js/models/*.js',
        './app/js/collections/*.js',
        './app/js/views/*.js',
    ], [ 'hint', 'browserify'] );
});

gulp.task( 'hint', function() {
    return gulp.src([
        './app/js/main.js',
        './app/js/models/*.js',
        './app/js/collections/*.js',
        './app/js/views/*.js',
    ])
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) )
    .pipe( connect.reload() )
});

// Basic usage
gulp.task( 'browserify', function() {
    // Single entry point to browserify
    return gulp.src( './app/js/main.js' )
        .pipe( browserify({
          insertGlobals : true,
        }))
        .pipe( rename( 'bundle.js' ) )
        .pipe( gulp.dest( './app') )
});

gulp.task( 'default', ['connect', 'browserify', 'watch'] );
