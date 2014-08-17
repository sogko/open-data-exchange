'use strict';

var gulp = require('gulp');
var _ = require('lodash');
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

  if (typeof opts === 'function') {
    done = opts;
    opts = {};
  }

  var buildConfig = _.assign(
    {
      baseDir: process.cwd(),
      destDir: path.join(process.cwd(), 'build'),
      env: 'development',
      skipBundles: []
    },
    configUtils.parseClientBuildConfig(config.buildClient),
    opts
  );

  if (!buildConfig.bundles) { return done(); }

  async.each(buildConfig.bundles, function(opts, callback) {

    // skip bundles
    if (_.indexOf(buildConfig.skipBundles, opts.name) > -1) {
      return callback();
    }

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

gulp.task('build-client', ['build-client:development']);

gulp.task('build-client:development', function (done) {
  asyncTaskBuildClient(done);
});

gulp.task('build-client:test', function (done) {
  asyncTaskBuildClient({
    env: 'test',
    destDir: 'tests/build/client/dist/js',
    skipBundles: ['common', 'apps']
  }, done);
});

gulp.task('build-client:production', function (done) {
  asyncTaskBuildClient({
    env: 'production'
  }, done);

});