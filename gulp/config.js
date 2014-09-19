'use strict';

module.exports = {
  jshint: {
    glob: [
      '*.js',
      'bin/**/*.js',
      'client/**/*.js',
      '!client/dist/**/*.js',
      '!client/src/static/vendor/**/*.js',
      'gulp/**/*.js',
      'server/**/*.js',
      'tests/**/*.js',
      '!tests/build/**/*.js'
    ]
  },
  csslint: {
    glob: [
      'client/src/**/*.css',
      '!client/src/static/vendor/**/*.css',
      '!client/pre-dist/**/*.css',
      'client/dist/**/*.css',
      '!client/dist/vendor/**/*.css',
      '!client/dist/all.css'   // minified css bundle
    ]
  },
  browserSync: {
    files: [
      'client/dist/**/*.css',
      'client/dist/**/*.html',
      'server/**/*.hbs',
      'server/**/*.html'
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
  karma: {
    unit: require('../tests/karma.unit.conf'),
    midway: require('../tests/karma.midway.conf'),
    e2e: require('../tests/karma.e2e.conf')
  },
  clean: {
    glob: [
      'client/pre-dist/',
      'client/dist/',
      'tests/build/'
    ]
  }
};