'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    webserver = require('gulp-webserver');

gulp.task('sass', function() {
  return gulp.src('./src/css/*.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/css/*.scss', ['sass']);
});

gulp.task('minify-css', function () {
  return gulp.src('src/css/main.css')
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulp.dest('dist/css'));
});

gulp.task('min-js', function () {
  return gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'));
});

gulp.task('webserver', function() {
  gulp.src('src')
      .pipe(webserver({
        livereload: true,
        open: false,
        port: 1337
      }));
});

gulp.task('main', ['sass:watch', 'webserver'])

gulp.task('default', ['main']);
