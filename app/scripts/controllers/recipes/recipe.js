'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('RecipeCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, TokenManager) {
    $scope.id = $routeParams.id;

    $scope.init = function() {
      RequestAPI.GET("/recipe/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.recipe = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
