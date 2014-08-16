'use strict';
var gulp = require('gulp');
var _ = require('lodash');
var karma = require('karma').server;
var config = require('../config');

gulp.task('test', function (done) {
  karma.start(_.assign({}, config.karma, { singleRun: true } ), done);
});

gulp.task('test:watch', function (done) {
  karma.start(_.assign({}, config.karma, { singleRun: false }), done);
});
