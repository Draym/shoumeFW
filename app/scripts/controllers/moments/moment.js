'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MomentCtrl
 * @description
 * # MomentCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MomentCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, TokenManager) {
    $scope.id = $routeParams.id;

    $scope.init = function () {
      RequestAPI.GET("/moment/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.moment = response.data;
          RequestAPI.GET("/moment/" + $scope.moment.id + "/comments", SubmitResult.submitSuccess(function (response) {
              $scope.comments = response.data;
            }),
            SubmitResult.submitFailure(), TokenManager.get());
        }),
        SubmitResult.submitFailure(), TokenManager.get());

    };

    $scope.init();
  });
