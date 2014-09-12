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
          { type: 'bower', name: 'angular-resource'},
          { type: 'bower', name: 'angular-bootstrap'},
          { type: 'bower', name: 'react', location: '../bower_components/react/react-with-addons.js'},
          { type: 'npm', name: 'lodash' },
          { type: 'npm', name: 'url' },
          { type: 'npm', name: 'path' }
        ],
        transform: [
          {
            fn: 'browserify-shim',
            opts: {
              'angular-resource': 'angular-resource'
            }
          }
        ]
      },
      {
        name: 'apps.min',
        entries: 'src/apps/*/app.js',
        concat: true,
        external: ['common'],
        transform: [
          {
            fn: 'reactify',
            opts: {}
          }
        ]
      },
      {
        name: 'apps',
        entries: 'src/apps/*/app.js',
        concat: false,
        external: ['common'],
        transform: [
          {
            fn: 'reactify',
            opts: {}
          }
        ]

      }
    ]
  }

};