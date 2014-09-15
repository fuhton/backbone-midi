var gulp = require('gulp'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint');

gulp.task('connect', function() {
    connect.server();
});

gulp.task('lint', function() {
  return gulp.src( ['!./app/bower_components', './app/*.js', './app/*/*.js'] )
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(connect.reload())
});

gulp.task('watch', function () {
  gulp.watch(['./app/*.js', './app/*/*.js'], ['lint']);
});

gulp.task('default', ['connect']);
