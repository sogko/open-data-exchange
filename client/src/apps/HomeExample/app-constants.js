/**
 * Angular app environment settings
 */
'use strict';
require('angular');

// app module definition
angular.module('HomeExample.constants', [])
  .constant('appName',            'HomeExample')
  .constant('baseTemplateUrl',    '/static/apps/HomeExample/');
