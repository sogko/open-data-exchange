'use strict';

var gulp = require('gulp');
var del = require('del');
var config = require('../config');

/**
 * Clean build and all related files
 */
gulp.task('clean', function taskClean(cb) {
  del(config.clean.glob, function () {
    cb();
  });
});
