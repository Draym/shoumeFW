'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AllRecipesCtrl
 * @description
 * # AllRecipesCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AllRecipesCtrl', function ($scope, toaster, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/recipes", SubmitResult.submitSuccess(function (response) {
          $scope.recipes = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
