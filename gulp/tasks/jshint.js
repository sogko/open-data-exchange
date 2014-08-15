'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var config = require('../config');

gulp.task('jshint', function taskJSHint() {
  return gulp.src(config.jshint.glob)
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});


gulp.task('jshint:watch', function taskJSHint() {
  watch({
    glob: config.jshint.glob,
    name: 'jshint'
  }, function (files) {
    return files
      .pipe(plumber())
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish));
  });

});
