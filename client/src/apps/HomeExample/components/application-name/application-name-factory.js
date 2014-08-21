/**
 * HomeExample.controllers.HomeController
 */
'use strict';

require('angular');

angular.module('HomeExample.components.applicationNameFactory', [])

  // a very contrived example of a factory
  .factory('applicationNameFactory', function applicationNameFactory(appName) {
    return appName;
  });
