/**
 * HomeExample.controllers.HomeController
 */
'use strict';

require('angular');
var path = require('path');

angular.module('HomeExample.components.applicationNameDirective', [])

  .directive('applicationName', function (baseTemplateUrl) {
    return {
      restrict: 'AE',
      templateUrl: path.join(baseTemplateUrl, 'components/application-name/application-name.html')
    };
  });
