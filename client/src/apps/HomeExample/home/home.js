/**
 * HomeExample.home
 * App route definitions for /home
 */
'use strict';

var path = require('path');
require('angular');
require('angular-ui-router');
require('../app-constants');
require('../components/application-name/application-name');
require('../components/reverse-filter/reverse-filter');
require('./home-controller');

angular.module('HomeExample.home', [
  'ui.router',
  'HomeExample.constants',
  'HomeExample.components.applicationName',
  'HomeExample.components.reverseFilter',
  'HomeExample.home.HomeController'
])
  .config(function ($stateProvider, baseTemplateUrl) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: path.join(baseTemplateUrl, 'home/home.html'),
        controller: 'HomeController'
      });
  });