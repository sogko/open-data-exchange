'use strict';

var gulp = require('gulp');

// load tasks from ./gulp/tasks/*.js
[
  'browser-sync',
  'nodemon',
  'csslint',
  'jshint',
  'test',
  'assets',
  'clean'

].forEach(function (name) {
    require('./gulp/tasks/' + name);
  });

// Composite tasks
gulp.task('lint', ['jshint', 'csslint']);
gulp.task('lint:watch', ['jshint:watch', 'csslint:watch']);

gulp.task('tdd', ['lint:watch', 'test:watch']);
//gulp.task('default', ['build', 'nodemon', 'browser-sync', 'build:watch']);
gulp.task('default', ['nodemon', 'browser-sync']);

