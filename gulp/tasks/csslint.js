'use strict';

var gulp = require('gulp');
var csslint = require('gulp-csslint');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('csslint', function taskCSSLint() {
  return gulp.src(config.csslint.glob)
    .pipe(plumber())
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('csslint:watch', function taskCSSLintWatch() {
  watch({
    name: 'csslint-changed',
    glob: config.csslint.glob
  }, function (files) {
    return files
      .pipe(plumber())
      .pipe(csslint('.csslintrc'))
      .pipe(csslint.reporter());
  });
});