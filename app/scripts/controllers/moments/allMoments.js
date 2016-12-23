'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AllMomentsCtrl
 * @description
 * # AllMomentsCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AllMomentsCtrl', function ($scope, toaster, SubmitResult, RequestAPI, User) {
    $scope.idMoment = 9;

    $scope.init = function () {
      RequestAPI.GET("/moments", SubmitResult.submitSuccess(function (response) {
          $scope.moments = response.data;
        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.init();
  });
