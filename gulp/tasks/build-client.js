'use strict';

var gulp = require('gulp');
var path = require('path');
var async = require('async');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var configUtils = require('../utils/config-utils');
var config = require('../config');

function asyncTaskBuildClient(opts, done) {

  if (!opts) { opts = {}; }
  opts.env = opts.env || 'development';

  var buildConfig = configUtils.parseClientBuildConfig(config.buildClient);

  console.log('buildConfig.bundles', buildConfig.bundles);

  if (!buildConfig.bundles) { return done(); }

  async.each(buildConfig.bundles, function(opts, callback) {

    var outputName = opts.name + '.js';

    function doBundle(filename) {
      // Note: filename allowed to be `null`
      var b = browserify(filename, {
        debug: (opts.env === 'production')
      });
      if (opts.entries) {

      }
      opts.require.forEach(function (req) {
        b.require(req.location, { expose: req.expose });
      });

      opts.external.forEach(function (name) {
        b.external(name);
      });

      return b.bundle();
    }

    if (opts.entries) {
      var browserified = transform(function (filename) {
        return doBundle(filename);
      });

      var stream = gulp.src(opts.entries)
        .pipe(browserified);

      if (opts.concat) {
        stream = stream
          .pipe(concat(outputName));
      } else {
        stream = stream
          .pipe(rename(function (p) {
            p.dirname = path.join(opts.name, p.dirname);
          }));
      }
      stream
        .pipe(gulp.dest(buildConfig.destDir))
        .on('end', function () {
          callback();
        });

    } else {
      doBundle(null)
        .pipe(source(outputName))
        .pipe(buffer())
        .pipe(concat(outputName))
        .pipe(gulp.dest(buildConfig.destDir))
        .on('end', function () {
          callback();
        });
    }
  }, function(err){
    done(err);
  });
}

gulp.task('build-client', function (done) {
  asyncTaskBuildClient({
    env: 'development'
  }, done);
});
gulp.task('build-client:development', function (done) {
  asyncTaskBuildClient({
    env: 'development'
  }, done);
});
gulp.task('build-client:production', function (done) {

  asyncTaskBuildClient({
    env: 'production'
  }, done);

});