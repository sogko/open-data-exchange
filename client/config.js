'use strict';

module.exports = {
  build: {

    baseDir: __dirname,
    destDir: 'dist',
    bundles: [
      {
        name: 'common',
        require: [
          { type: 'bower', name: 'angular' },
          { type: 'bower', name: 'angular-ui-router' },
          { type: 'npm', name: 'lodash' },
          { type: 'npm', name: 'path' }
        ]
      },
      {
        name: 'path',
        require: [
          { type: 'npm', name: 'path' }
        ]
      },
      {
        name: 'apps.min',
        entries: 'src/apps/*/app.js',
        concat: true,
        external: ['common']
      },
      {
        name: 'apps',
        entries: 'src/apps/*/app.js',
        concat: false,
        external: ['common']

      }
    ]
  }

};