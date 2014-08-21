/**
 * Angular app HomeExample module definition file
 *
 * - Top-level configuration
 * - route definitions for the app
 *
 */

'use strict';
require('angular');
require('../../app-constants');
require('./application-name-directive');
require('./application-name-factory');

angular.module('HomeExample.components.applicationName', [
  'HomeExample.constants',
  'HomeExample.components.applicationNameDirective',
  'HomeExample.components.applicationNameFactory'
]);
