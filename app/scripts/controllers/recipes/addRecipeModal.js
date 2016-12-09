'use strict';

/**
 * @ngdoc function
 * @name shoumeApp.controller:AddRecipeModalCtrl
 * @description
 * # AddRecipeModalCtrl
 * Controller of the shoumeApp
 */
angular.module('shoumeApp')
  .controller('AddRecipeModalCtrl', function ($scope, $uibModalInstance, RequestAPI, SubmitResult, TokenManager, FileUploader, CloneUtilsCustom) {
    $scope.flow = {};
    $scope.uploader = new FileUploader();

    $scope.isBusy = false;
    $scope.recipe = {
      name: "",
      description: {description: "", difficulty: "", preparation: 0, cooking: 0, people: 0, steps:[]},
      image: "",
      ingredients: []
    };

    $scope.addStep = function() {
      $scope.recipe.description.steps.push({index: $scope.recipe.description.steps.length + 1, value: ""});
    };

    $scope.removeStep = function(index) {
      $scope.recipe.description.steps.splice(index, 1);
      for (var i = 0; i < $scope.recipe.description.steps.length; ++i) {
        $scope.recipe.description.steps[i].index = i + 1;
      }
    };

    $scope.addStep();

    $scope.save = function () {
      $scope.isBusy = true;
      /*
       console.log("images: ", $scope.flow);
       RequestAPI.POST("/upload", $scope.flow.content.files[0].file, SubmitResult.submitSuccess(function (response) {
       console.log("YEAH: ", response);
       }),
       SubmitResult.submitFailure(), TokenManager.get());
       */
      var recipeFormat = CloneUtilsCustom.cloneObject($scope.recipe);
      recipeFormat.description = JSON.stringify(recipeFormat.description);

      RequestAPI.POST("/recipe", recipeFormat, SubmitResult.submitSuccess(function (response) {
          $scope.init();
          $scope.clear();
          $scope.isBusy = false;
        }, "Recipe created"),
        SubmitResult.submitFailure(), TokenManager.get());
    };

    $scope.clear = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
