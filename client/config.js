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
          { type: 'bower', name: 'ngReactGrid' },
          { type: 'npm', name: 'lodash' },
          { type: 'npm', name: 'url' },
          { type: 'npm', name: 'path' },
          { type: 'default', name: 'humanable-json', location: './src/components/humanable-json/humanable-json' },
          { type: 'default', name: 'faceted-search', location: './src/components/faceted-search/faceted-search' }
        ],
        transform: [
          {
            opts: {},
            fn: 'browserify-shim',
            fnOpts: {
              'angular-resource': 'angular-resource'
            }
          },
          {
            opts: {
              global: true
            },
            fn: 'reactify',
            fnOpts: {}
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
            opts: {},
            fn: 'reactify',
            fnOpts: {}
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
            opts: {},
            fn: 'reactify',
            fnOpts: {}
          }
        ]

      }
    ]
  }

};