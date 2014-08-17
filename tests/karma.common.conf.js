'use strict';

module.exports = {

  basePath: '.',
  frameworks: ['mocha', 'chai'],

  exclude: [
  ],
  reporters: ['mocha'],
  port: 9876,
  colors: true,
  logLevel: 'INFO',
  autoWatch: true,
  browsers: ['PhantomJS'],
  singleRun: true,

  files : [
//    //3rd Party Code
//    'bower_components/angular/angular.js',
//    'bower_components/angular-ui-router/angular.js',
////    'bower_components/angularjs-scope.safeapply/src/Scope.SafeApply.js',
////    'app/scripts/lib/router.js',
//
//    //App-specific Code
//    'app/scripts/config/config.js',
//    'app/scripts/services/**/*.js',
//    'app/scripts/directives/**/*.js',
//    'app/scripts/controllers/**/*.js',
//    'app/scripts/filters/**/*.js',
//    'app/scripts/config/routes.js',
//    'app/scripts/app.js',
//
//    //Test-Specific Code
//    'node_modules/chai/chai.js',
//    'test/lib/chai-should.js',
//    'test/lib/chai-expect.js',

    'tests/build/client/dist/js/common.js',
    'tests/build/client/dist/js/apps.min.js'
  ]
};