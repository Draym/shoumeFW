'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('RecipeCtrl', function ($scope, $routeParams, RequestAPI, SubmitResult, User) {
    $scope.id = $routeParams.id;

    $scope.init = function () {
      RequestAPI.GET("/recipe/" + $scope.id, SubmitResult.submitSuccess(function (response) {
          $scope.recipe = response.data;
          try {
            $scope.recipe.description = JSON.parse($scope.recipe.description);
            $scope.recipe.description.total = $scope.recipe.description.preparation + $scope.recipe.description.cooking;
            $scope.recipe.tags = ["tutu", "titi", "tata", "toto"]
            console.log($scope.recipe);
          } catch (e) {}
          RequestAPI.GET("/recipe/" + $scope.recipe.id + "/comments", SubmitResult.submitSuccess(function (response) {
              $scope.comments = response.data;
            }),
            SubmitResult.submitFailure(), User.getToken());
        }),
        SubmitResult.submitFailure(), User.getToken());
    };

    $scope.init();
  });
