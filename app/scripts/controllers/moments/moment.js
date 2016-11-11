'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MomentCtrl
 * @description
 * # MomentCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MomentCtrl', function ($scope, $routeParams) {
    $scope.id = $routeParams.id;

    $scope.init = function() {
      //get the moment by ID
    };

    $scope.init();
  });
