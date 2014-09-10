'use strict';

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
  buildClient: {
    base: require('../client/config').build,
    development: {
      env: 'development',
      watch: [
        'client/src/**/*.js',
        'client/src/**/*.jsx'
      ],
      skipBundles: ['common']
    },
    production: {
      env: 'production'
    },
    test: {
      env: 'test',
      destDir: 'tests/build/client/dist/js',
      skipBundles: ['common']
    }
  },
  buildCSS: {
    glob: [
      'client/src/**/*.css',
      'client/pre-dist/**/*.css',
      '!client/src/static/vendor/**/*.css'
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
      '!client/src/**/*.scss'
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