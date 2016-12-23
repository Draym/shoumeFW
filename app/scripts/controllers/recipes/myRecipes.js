'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:MyRecipesCtrl
 * @description
 * # MyRecipesCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('MyRecipesCtrl', function ($scope, $uibModal, toaster, User, SubmitResult, RequestAPI) {

    $scope.init = function () {
      RequestAPI.GET("/user/" + User.getId() + "/recipes", SubmitResult.submitSuccess(function (response) {
          $scope.myRecipes = response.data;
          try {
            for (var i = 0; i < $scope.myRecipes.length; ++i) {
              $scope.myRecipes[i].description = JSON.parse($scope.myRecipes[i].description);
            }
          } catch (e) {}
        }),
        SubmitResult.submitFailure(), User.getToken());
    };


    $scope.openAddRecipeModal = function() {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/recipes/addRecipeModal.html',
        controller: 'AddRecipeModalCtrl',
        size: 'lg',
        scope: $scope
      });
    };

    $scope.init();
  });
