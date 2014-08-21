/**
 * Angular app HomeExample module definition file
 *
 * - Top-level configuration
 * - route definitions for the app
 *
 */

'use strict';

require('angular');
require('angular-ui-router');
require('./app-constants');
require('./home/home');

// app module definition
angular.module('HomeExample', [
  'ui.router',
  'HomeExample.constants',
  'HomeExample.home'
])
  // define default `app` route
  .config(function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  });
