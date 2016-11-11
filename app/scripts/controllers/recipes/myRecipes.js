'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyRecipesCtrl
 * @description
 * # MyRecipesCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyRecipesCtrl', function ($scope, toaster, User, SubmitResult, RequestAPI, TokenManager) {

    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/recipes", SubmitResult.submitSuccess(function (response) {
          $scope.myRecipes = response.data;
        }),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.init();
  });
