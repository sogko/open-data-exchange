'use strict';

var path = require('path');
var gulp = require('gulp');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var CleanCSS = require('clean-css');
var map = require('vinyl-map');
var config = require('../config');

function taskMinify() {
  var minify = map(function (code) {
    code = code.toString();
    return new CleanCSS({
      keepSpecialComments: 0,
      keepBreaks: false
    }).minify(code);
  });

  return gulp.src(config.buildCSS.glob)
    .pipe(concat(config.buildCSS.filename))
    .pipe(minify)
    .pipe(gulp.dest(config.buildCSS.dest));
}

/**
 * Build minified + concatenated css using `clean-css`
 */
gulp.task('build-css', ['copy-static-assets'], function buildCSSTask() {
  return taskMinify();
});

/**
 * Watch and re-build minified+concatenated css if there is any changes in css files
 *
 * Note: that `build-css` depends on `copy-static-assets`, while `build-css:watch` does not
 */
gulp.task('build-css:watch', function buildCSSTaskWatch() {

  gulp.watch(config.buildCSS.glob, function () {
    taskMinify();
  })
    .on('change', function (event) {
      gutil.log(gutil.colors.cyan('build-css-changed'), 'saw', gutil.colors.magenta(path.basename(event.path)), 'was', event.type);
    });
});