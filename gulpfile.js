var gulp = require('gulp'),
	concat = require("gulp-concat"),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	connect = require('gulp-connect');

/*
	JavaScript
*/ 
gulp.task('concatJs', function () {
    gulp.src('app/**/*.js')
    .pipe(concat('compiled-app.js'))
    .pipe(gulp.dest('assets/js/'))
    .pipe(connect.reload());;
});

gulp.task('watchJs', function(){
	gulp.watch('app/**/*.js', ['concatJs']);
});



/*
	Sass
*/ 
gulp.task('styles', function() {
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css/'))
		.pipe(connect.reload());
});

gulp.task('watchScss', function(){
	gulp.watch('assets/css/sass/**/*.scss', ['styles']);
});

/*
	Webserver
*/ 
gulp.task('connect', function() {
  connect.server({
    livereload: true
  });
});


gulp.task('default', ['concatJs', 'watchJs', 'styles', 'watchScss', 'connect'], function(){});