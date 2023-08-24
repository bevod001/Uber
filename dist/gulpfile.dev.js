"use strict";

var gulp = require('gulp');

var browserSync = require('browser-sync');

var sass = require('gulp-sass')(require('sass'));

var cleanCSS = require('gulp-clean-css');

var autoprefixer = require('gulp-autoprefixer');

var rename = require("gulp-rename");

gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: "."
    }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});
gulp.task('styles', function () {
  return gulp.src("./sass/**/*.+(scss|sass)").pipe(sass({
    outputStyle: 'compressed'
  }).on('error', sass.logError)).pipe(rename({
    suffix: '.min',
    prefix: ''
  })).pipe(autoprefixer()).pipe(cleanCSS({
    compatibility: 'ie8'
  })).pipe(gulp.dest("./css")).pipe(browserSync.stream());
});
gulp.task('watch', function () {
  gulp.watch("./sass/**/*.+(scss|sass)", gulp.parallel('styles'));
});
gulp.task('default', gulp.parallel('watch', 'server', 'styles'));