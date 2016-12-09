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

          try {
            for (var i = 0; i < $scope.recipes.length; ++i) {
              $scope.recipes[i].description = JSON.parse($scope.recipes[i].description);
            }
          } catch (e) {}
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
