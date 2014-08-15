'use strict';

var files = {
  server: {
    views: [
      'server/views/**/*.*'
    ],
    js: [
      'server/**/*.js'
    ]
  },
  client: {
    dist: ['client/dist/js/app.js'],
    entryPoint: 'client/app.js',
    views: [
      'client/apps/**/partials/**/*.html'
    ],
    js: [
      'client/*.js',
      'client/apps/**/*.js',
      'client/assets/js/lib/**/*.js',
      '!client/assets/js/vendor/**/*.js',
      '!client/dist/js/*.js'
    ],
    vendor: ['client/assets/js/vendor/**/*.js'],
    css: [
      'client/assets/css/**/*.css'
    ]
  },
  tests: {
    mocha: [
      '/tests/mocha/**/*.js'
    ]
  },
  gulp: {
    js: ['gulp/**/*.js']
  },
  allJS: function allJS() {
    return this.server.js
      .concat(this.client.js);
  },
  allCSS: function allCSS() {
    return this.client.css;
  },
  allViews: function allCSS() {
    return this.server.views
      .concat(this.client.views);
  },
  nodemonWatchFiles: function browserSyncFiles() {
    return this.server.js
      .concat(this.client.js);
  },
  browserSyncFiles: function browserSyncFiles() {
    // preferably file that can be injected or does not require a build
    return this.allCSS()
      .concat(this.allViews());
  },
  all: function all() {
    return this.allJS()
      .concat(this.allCSS())
      .concat(this.allViews())
      .concat(this.client.dist);
  }
};

module.exports = {
  files: files,
  jshint: {
    glob: files.allJS()
      .concat(files.gulp.js)
  },
  csslint:{
    glob: files.allCSS()
  },
  browserSync: {
    files: files.browserSyncFiles(),
    proxy: 'http://localhost:3000',
    browser: ['google chrome'],
    port: 4000,
    reloadDelay: 500
  },
  nodemon: {
    script: 'server/app.js',
    watch: files.nodemonWatchFiles()
  },
  buildClient: require('../client/config').build || {}
};