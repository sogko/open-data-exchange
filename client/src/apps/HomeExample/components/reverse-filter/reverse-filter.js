/**
 * HomeExample.controllers.HomeController
 * https://docs.angularjs.org/guide/filter
 */
'use strict';

require('angular');

angular.module('HomeExample.components.reverseFilter', [])

  .filter('reverse', function () {
    return function (input, uppercase) {
      input = input || '';
      var out = '';
      for (var i = 0; i < input.length; i++) {
        out = input.charAt(i) + out;
      }
      // conditional based on optional argument
      if (uppercase) {
        out = out.toUpperCase();
      }
      return out;
    };
  });