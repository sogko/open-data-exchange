'use strict';

var _ = require('lodash');
var configUtils = require('./utils/config-utils');
var baseBuildClientConfig = configUtils.parseClientBuildConfig(require('../client/config').build);

module.exports = {
  sass: {
    glob: [
      'client/src/**/*.scss'
    ],
    // temporary intermediate folder for compiled files ready for build
    dest: 'client/pre-dist/sass'
  },
  jshint: {
    glob: [
      '*.js',
      'bin/**/*.js',
      'client/**/*.js',
      '!client/dist/**/*.js',
      'gulp/**/*.js',
      'server/**/*.js',
      'tests/**/*.js',
      '!tests/build/**/*.js'
    ]
  },
  csslint: {
    glob: [
      'client/src/**/*.css',
      '!client/pre-dist/**/*.css',
      'client/dist/**/*.css',
      '!client/dist/all.css'   // minified css bundle
    ]
  },
  browserSync: {
    files: [
      'client/dist/**/*.css',
      'client/dist/**/*.html',
      'server/views/**/*.*'
    ],
    proxy: 'http://localhost:3000',
    browser: ['google chrome'],
    port: 4000,
    reloadDelay: 500
  },
  nodemon: {
    script: 'server/app.js',
    watch: [
      'server/**/*.js'
    ]
  },
  buildClient: {
    development: _.assign({}, baseBuildClientConfig, {
      env: 'development',
      watch: [
        'client/src/**/*.js'
      ]
    }),
    production: _.assign({}, baseBuildClientConfig, {
      env: 'production'
    }),
    test: _.assign({}, baseBuildClientConfig, {
      env: 'test',
      destDir: 'tests/build/client/dist/js',
      skipBundles: ['common']
    })
  },
  buildCSS: {
    glob: [
      'client/src/**/*.css',
      'client/pre-dist/**/*.css'
    ],
    filename: 'all.css',
    dest: 'client/dist'
  },
  karma: {
    unit: require('../tests/karma.unit.conf'),
    midway: require('../tests/karma.midway.conf'),
    e2e: require('../tests/karma.e2e.conf')
  },
  copyStaticAssets: {
    glob: [
      'client/src/static/**/*',
      'client/src/**/*.html',
      '!client/src/**/*.md',
      '!client/src/**/*.scss',
      '!client/src/**/*.css' // would be handled by build-cssx
    ],
    dest: './client/dist'
  },
  clean: {
    glob: [
      'client/pre-dist/',
      'client/dist/',
      'tests/build/'
    ]
  }
};