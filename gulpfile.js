'use strict';

var gulp = require('gulp');

// load tasks from ./gulp/tasks/*.js
[
  'browser-sync',
  'nodemon',
  'csslint',
  'jshint',
  'build-client'

].forEach(function (name) {
    require('./gulp/tasks/' + name);
  });

gulp.task('lint', ['jshint', 'csslint']);
gulp.task('lint:watch', ['jshint:watch', 'csslint:watch']);
gulp.task('build', ['build-client']);
gulp.task('build:production', ['build-client:production']);
gulp.task('default', ['lint:watch', 'build', 'nodemon', 'browser-sync']);
