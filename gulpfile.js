var gulp   = require('gulp');

// Basic usage
gulp.task( 'log', function() {
	console.log('RUN');
});

gulp.task( 'default', ['log'] );
