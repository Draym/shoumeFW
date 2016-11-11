'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyAccountCtrl
 * @description
 * # MyAccountCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyAccountCtrl', function ($scope, toaster, User, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/user", SubmitResult.submitSuccess(function (response) {
          $scope.user = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
