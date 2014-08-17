/* jshint expr: true */
/* global angular */
'use strict';

describe('Unit: Collections.controllers.HomeControllers', function () {
  var $scope;
  var controller;
  beforeEach(angular.mock.module('Collections.controllers'));
  beforeEach(angular.mock.inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    controller = $controller('HomeController', {
      $scope : $scope
    });
  }));

  it('should have a properly working VideosCtrl controller', function (done) {
    expect($scope.greetings).exists;
    done();
  });
});
