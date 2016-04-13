'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var notify = require('gulp-notify');

// Static Server + watching scss/html files. Serves files from the /dist folder
gulp.task('serve', ['sass', 'scripts', 'assets', 'templates'], function() {

    browserSync.init({
        server: './dist'
    });

    gulp.watch('STYLES/SASS/**/*.scss', ['sass']);
    gulp.watch('SCRIPTS/*.js', ['scripts']);
    gulp.watch('*.html', ['templates']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src('STYLES/SASS/*.scss')
        .pipe(sass())
        .pipe(concat('superhero.css'))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/STYLES'))
        .pipe(notify({ message: 'Style task complete' }))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('SCRIPTS/*.js')
    .pipe(gulp.dest('dist/SCRIPTS'))
    .pipe(notify({ message: 'Scripts task complete' }))
    .pipe(browserSync.stream());
});

gulp.task('assets', function() {
  return gulp.src('src/ASSETS/**/**/*')
    .pipe(gulp.dest('dist/ASSETS'))
    .pipe(notify({ message: 'Assets task complete' }));
});

gulp.task('templates', function() {
    return gulp.src('*.html')
        .pipe(gulp.dest('dist/'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
