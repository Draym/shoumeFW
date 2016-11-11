'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyMomentsCtrl
 * @description
 * # MyMomentsCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyMomentsCtrl', function ($scope, toaster, User, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/moments", SubmitResult.submitSuccess(function (response) {
          $scope.myMoments = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
